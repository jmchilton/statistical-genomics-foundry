import { z } from 'zod';

import { defineKind } from '../context';
import type { KindContext } from '../context';

export const kind = defineKind({
  kind: 'book',
  title: 'Book Chapter',
  layer: 'instance',
  summary:
    'An own-words summary of one chapter of an external textbook, carrying the book-level licence record it was made under.',

  // Chapter frontmatter declares its kind (`type: book`) and otherwise carries only what
  // varies per chapter — the kind is per-note, not per-book, so it is not a book.yml field
  // even though it is constant within a book: every note in the corpus names its own kind.
  //
  // The four licence fields are constant WITHIN a book and authored once in
  // content/research/books/<id>/book.yml, but they are MATERIALIZED into every chapter by
  // `npm run books` rather than merged in at validation time. book.yml stays the source of
  // truth; the frontmatter is a derived copy `npm run check:books` keeps honest — the same
  // trade kinds.generated.json already makes.
  //
  // Materializing rather than merging is what lets this be a plain object like every other
  // kind: the note validates from its own frontmatter, so the schema does no file I/O, the
  // kind manifest reports what a book chapter actually carries, and nothing downstream has
  // to special-case a note whose record is only complete after a merge.
  build: (ctx: KindContext) =>
    z
      .object({
        type: z.literal('book'),
        title: z.string(),
        source: z.string(),
        source_chapter: z.number().int().optional(),
        source_url: z.string().url(),
        license: ctx.licenseId,
        license_file: z.string().optional(),
        attribution: z.string(),
        derived: z.string(),
        ...ctx.base,
      })
      .strict(),

  // The same licence coherence the other source kinds get — now a plain refine over the
  // note's own fields, because the fields are the note's own.
  refine: (d, ctx, kctx) => kctx.licenseCoherence(d, ctx),
});
