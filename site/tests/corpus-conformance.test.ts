import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { describe, it, expect } from 'vitest';
import { COLLECTIONS } from '../src/lib/frontmatter-schema';

// Standalone validator: every real content file, validated against the same shared
// schema the site builds with. This is the second consumer that makes "one schema, two
// consumers" real (issue #89 rung 3), and it supersedes the hand-rolled prebuild guard
// (scripts/check-source-frontmatter.mjs) — broader coverage, one encoding.
//
// yaml.load parses an unquoted `access_date: 2026-07-13` to a Date (as Astro's loader
// does), so the #87-class footgun surfaces here exactly as it would at build.

function walkIndexFiles(baseAbs: string): string[] {
  if (!fs.existsSync(baseAbs)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(baseAbs, { withFileTypes: true })) {
    const full = path.join(baseAbs, entry.name);
    if (entry.isDirectory()) out.push(...walkIndexFiles(full));
    else if (entry.isFile() && entry.name === 'index.md') out.push(full);
  }
  return out;
}

function readFrontmatter(file: string): { data?: unknown; error?: string } {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return { error: 'missing YAML frontmatter block' };
  try {
    const data = yaml.load(match[1]);
    if (!data || typeof data !== 'object' || Array.isArray(data)) return { error: 'frontmatter must be a mapping' };
    return { data };
  } catch (e) {
    return { error: `invalid YAML: ${(e as Error).message}` };
  }
}

describe('corpus conformance (every content file against the shared schema)', () => {
  for (const [name, { base, schema }] of Object.entries(COLLECTIONS)) {
    it(`${name}: all index.md validate`, () => {
      const baseAbs = path.resolve(base);
      const files = walkIndexFiles(baseAbs);
      const problems: string[] = [];
      for (const file of files) {
        const rel = path.relative(path.resolve('..'), file);
        const { data, error } = readFrontmatter(file);
        if (error) {
          problems.push(`${rel}: ${error}`);
          continue;
        }
        const result = schema.safeParse(data);
        if (!result.success) {
          for (const issue of result.error.issues) problems.push(`${rel}: ${issue.path.join('.') || '(root)'}: ${issue.message}`);
        }
      }
      expect(problems, `\n${problems.join('\n')}`).toEqual([]);
    });
  }
});
