import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { COLLECTIONS } from '../src/lib/frontmatter-schema';
import { walkIndexFiles, readFrontmatter } from '../src/lib/content-files';

// Standalone validator: every real content file, validated against the same shared
// schema the site builds with. This is the second consumer that makes "one schema, two
// consumers" real (issue #89 rung 3), and it supersedes the hand-rolled prebuild guard
// (scripts/check-source-frontmatter.mjs) — broader coverage, one encoding.

describe('corpus conformance (every content file against the shared schema)', () => {
  for (const [name, { base, schema }] of Object.entries(COLLECTIONS)) {
    it(`${name}: all index.md validate`, () => {
      const files = walkIndexFiles(path.resolve(base));
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
