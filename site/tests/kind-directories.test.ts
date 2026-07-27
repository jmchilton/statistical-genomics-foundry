// The types/ layout must actually hold, or the isolation it buys is imaginary.
//
// Four things are asserted per kind: the barrel and the directory listing agree BOTH ways,
// `kind` matches the directory name, kind.md and example.md exist, and example.md's
// frontmatter parses against that kind's own schema. The last one is what keeps the
// documentation executable — an example that stopped validating is a kind whose docs lie.
//
// Shared contract: galaxyproject/foundry-pattern#13 (PART 3 + PART 4 of the standing-up
// checklist).

import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';
import { describe, it, expect } from 'vitest';
import type { z } from 'zod';

import { NOTE_KINDS, type NoteKind } from '../src/lib/frontmatter-schema';
import { buildKindContext, KINDS } from '../src/types/index';

const TYPES_DIR = path.resolve('src/types');

/** Directories under types/ are kinds; loose files (context.ts, index.ts) are not. */
const kindDirs = fs
  .readdirSync(TYPES_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

// js-yaml, not a bespoke parser: an unquoted date must coerce exactly as Astro's loader does,
// so the footgun surfaces here rather than in production.
function frontmatter(file: string): Record<string, unknown> {
  const text = fs.readFileSync(file, 'utf-8');
  const m = /^---\n([\s\S]*?)\n---/.exec(text);
  if (!m) throw new Error(`${file} has no frontmatter block`);
  return yaml.load(m[1]) as Record<string, unknown>;
}

describe('types/ kind directories', () => {
  // Guards against a path change turning every assertion below into a vacuous pass.
  it('finds kind directories at all', () => {
    expect(kindDirs.length).toBeGreaterThan(1);
  });

  it('the barrel enumerates exactly the directories on disk', () => {
    // Both directions. A directory the barrel forgot is a kind that silently does not exist;
    // a barrel entry with no directory is a stale import.
    expect(KINDS.map((k) => k.kind).sort()).toEqual(kindDirs);
  });

  it('declares no duplicate kind names', () => {
    expect(new Set(KINDS.map((k) => k.kind)).size).toBe(KINDS.length);
  });

  for (const definition of KINDS) {
    describe(definition.kind, () => {
      const dir = path.join(TYPES_DIR, definition.kind);

      it('has kind.md and example.md beside its schema', () => {
        expect(fs.existsSync(path.join(dir, 'schema.ts'))).toBe(true);
        expect(fs.existsSync(path.join(dir, 'kind.md'))).toBe(true);
        expect(fs.existsSync(path.join(dir, 'example.md'))).toBe(true);
      });

      it('declares a summary the catalog can render', () => {
        expect(definition.summary.length).toBeGreaterThan(20);
        expect(definition.title.length).toBeGreaterThan(0);
      });

      it('declares which layer it belongs to', () => {
        expect(['substrate', 'instance']).toContain(definition.layer);
      });

      it('carries the base envelope', () => {
        // Every kind spreads `base`, so every kind has every envelope field. A kind that
        // spreads only a field GROUP (sourceNoteFields) and skips `base` would pass today
        // and silently miss the next field added to the envelope.
        const ctx = buildKindContext();
        const shape = Object.keys(definition.build(ctx).shape);
        for (const field of Object.keys(ctx.base)) {
          expect(shape).toContain(field);
        }
      });

      it('example.md declares this kind and validates against it', () => {
        const fm = frontmatter(path.join(dir, 'example.md'));
        expect(fm.type).toBe(definition.kind);

        const result = NOTE_KINDS[definition.kind as NoteKind].safeParse(fm);
        if (!result.success) {
          throw new Error(
            `${definition.kind}/example.md does not validate:\n` +
              result.error.issues
                .map((i: z.ZodIssue) => `  ${i.path.join('.') || '(root)'}: ${i.message}`)
                .join('\n'),
          );
        }
      });
    });
  }
});
