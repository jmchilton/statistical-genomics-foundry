import fs from 'node:fs';
import yaml from 'js-yaml';
import { describe, it, expect } from 'vitest';
import { noteFiles } from '../src/lib/content-files';
import { COLLECTIONS, COLLECTION_NAMES, contentPath } from '../src/lib/frontmatter-schema';

// Standalone validator: every real content file, validated against the same shared
// schema the site builds with. This is the second consumer that makes "one schema, two
// consumers" real (issue #89 rung 3), and it supersedes the hand-rolled prebuild guard
// (scripts/check-source-frontmatter.mjs) — broader coverage, one encoding.
//
// yaml.load parses an unquoted `access_date: 2026-07-13` to a Date (as Astro's loader
// does), so the #87-class footgun surfaces here exactly as it would at build.

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
  for (const name of COLLECTION_NAMES) {
    const { schema } = COLLECTIONS[name];
    it(`${name}: all notes validate`, () => {
      const problems: string[] = [];
      // Content-relative already — the frame the table is written in, and the frame a problem
      // is worth reporting in. No resolve-then-relativize round trip to get back to it.
      for (const rel of noteFiles(name)) {
        const { data, error } = readFrontmatter(contentPath(rel));
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
