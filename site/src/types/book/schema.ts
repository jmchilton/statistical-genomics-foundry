import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';
import { z } from 'zod';

import { isValidLicenseId } from '../../lib/license-policy';
import { defineKind } from '../context';
import type { KindContext } from '../context';

// Book-level metadata (license/license_file/attribution/derived) lives ONCE per book in
// content/research/books/<id>/book.yml — not repeated in every chapter's frontmatter — and is
// merged into each chapter entry so downstream pages read a full record.
const BOOKS_DIR = path.resolve('../content/research/books');
const bookMetaCache = new Map<string, Record<string, unknown>>();

function loadBookMeta(source: string): Record<string, unknown> {
  let meta = bookMetaCache.get(source);
  if (!meta) {
    meta = yaml.load(
      fs.readFileSync(path.join(BOOKS_DIR, source, 'book.yml'), 'utf-8'),
    ) as Record<string, unknown>;
    bookMetaCache.set(source, meta);
  }
  return meta;
}

export const kind = defineKind({
  kind: 'book',
  title: 'Book Chapter',
  origin: 'instance',
  summary:
    'An own-words summary of one chapter of an external textbook, merged with the book-level licence record it belongs to.',

  // Chapter frontmatter declares its kind (`type: book`) and otherwise carries only what
  // varies per chapter — the kind is per-note, not per-book, so it is not a book.yml field
  // even though it is constant within a book: every note in the corpus names its own kind.
  // `.strict()` keeps the merge one-way: a chapter restating `license`/`attribution`/`derived`
  // is rejected rather than silently shadowing the book.
  build: (ctx: KindContext) =>
    z
      .object({
        type: z.literal('book'),
        title: z.string(),
        source: z.string(),
        source_chapter: z.number().int().optional(),
        source_url: z.string().url(),
        ...ctx.base,
      })
      .strict(),

  // The only kind whose entry is ASSEMBLED rather than validated in place: the book-level
  // record is merged in here, so downstream pages read one complete note.
  transform: (data, ctx, kctx) => {
    const book = loadBookMeta(data.source);
    if (!isValidLicenseId(book.license as string)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `book.yml license "${String(book.license)}" is not a valid id (source: ${data.source})`,
      });
      return z.NEVER;
    }
    // `attribution` may be a template ({n}/{title} filled from the chapter).
    const attribution = String(book.attribution)
      .replace(/\{n\}/g, String(data.source_chapter ?? ''))
      .replace(/\{title\}/g, data.title);
    const merged = {
      ...data,
      license: book.license as string,
      license_file: book.license_file as string | undefined,
      attribution,
      derived: String(book.derived),
    };
    // The same licence coherence the source notes get — keyed on book.yml's posture.
    kctx.licenseCoherence(merged, ctx);
    return merged;
  },
});
