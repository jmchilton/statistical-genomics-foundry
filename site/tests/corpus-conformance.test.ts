import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { describe, it, expect } from 'vitest';
import { checkCompanions } from '@galaxy-foundry/kind-schema';
import { kindOf } from '@galaxy-foundry/kind-schema/collections';
import { noteFiles } from '../src/lib/content-files';
import { COLLECTIONS, COLLECTION_NAMES, contentPath } from '../src/lib/frontmatter-schema';
import { DEFINITIONS } from '../src/types/index';

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

// The other half of conformance: not what a note SAYS but where it IS. Every kind declares the
// non-note files that may sit beside it, and this is the check that the corpus agrees.
//
// `guidance.md` is the reason it earns its keep. It sits beside 76 of 76 papers and 8 of 8
// tutorials, is written by the same generator that writes the summary, and until the kinds
// declared it its only mention anywhere in either Foundry was a passing comment in
// `scripts/generate-book-frontmatter.ts`. Nothing checked that it was there.
describe('corpus layout (every note directory against its kind declaration)', () => {
  for (const name of COLLECTION_NAMES) {
    const definition = DEFINITIONS[COLLECTIONS[name].kind];

    // Only a DIRECTORY-shaped kind has a layout to check. A flat note's `dirname` is the
    // collection's own directory, shared with every sibling note, so checking it against a
    // companion declaration would report each of those siblings as an undeclared file. The
    // shared checker refuses a file-shaped kind outright rather than answer a question that
    // has no meaning, and this is the branch that respects the refusal instead of skipping
    // the kind quietly: what a file-shaped kind CAN be held to is that it claims no
    // companions, and that is asserted.
    if (definition.shape === 'file') {
      it(`${name}: is file-shaped, so declares no companions`, () => {
        expect(definition.companions).toEqual([]);
      });
      continue;
    }

    it(`${name}: every note directory matches its kind`, () => {
      const problems: string[] = [];
      for (const rel of noteFiles(name)) {
        const dir = path.posix.dirname(rel);
        const entries = fs
          .readdirSync(contentPath(dir), { withFileTypes: true })
          // Dotfiles are the one exclusion a declaration cannot express: editor and OS state,
          // not something a kind forgot to declare.
          .filter((entry) => !entry.name.startsWith('.'))
          .map((entry) => ({
            name: entry.name,
            directory: entry.isDirectory(),
            // Which entries are NOTES comes from the routing table, never from the extension.
            note: kindOf(COLLECTIONS, `${dir}/${entry.name}`) !== undefined,
          }));

        const layout = checkCompanions(entries, definition);
        for (const companion of layout.missingRequired) {
          problems.push(`${dir}: missing required companion ${companion.file}`);
        }
        for (const entry of layout.unknown) {
          problems.push(`${dir}: undeclared ${entry.directory ? 'directory' : 'file'} ${entry.name}`);
        }
        // `missingRecommended` is deliberately not a failure — `recommended` is the level that
        // says "expected, but its absence is not a defect", and a test has only pass and fail.
      }
      expect(problems, `\n${problems.join('\n')}`).toEqual([]);
    });
  }
});
