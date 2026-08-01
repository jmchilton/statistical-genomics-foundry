import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { COLLECTIONS, contentPath, stripIndex } from './lib/frontmatter-schema';

// Thin consumer of the shared frontmatter contract (src/lib/frontmatter-schema.ts).
// The schema is authored ONCE there and imported here + by the standalone validator
// (tests/) — one encoding, no mirror (issue #89, the "beat the parent" adapt). Written
// out per collection (not a loop) so Astro infers each schema's type for the pages.
//
// The glob no longer spells out `**/index.md`. The pattern belongs to the table, so a
// collection that ever selects its notes differently changes in one place rather than in the
// four that each used to carry their own copy of the rule. This is also the one place the
// site-relative frame is applied: `contentPath` is the single hop from the content root.
const load = (row: { base: string; pattern: readonly string[] }) =>
  glob({ pattern: [...row.pattern], base: contentPath(row.base), generateId: stripIndex });

export const collections = {
  meta: defineCollection({ loader: load(COLLECTIONS.meta), schema: COLLECTIONS.meta.schema }),
  books: defineCollection({ loader: load(COLLECTIONS.books), schema: COLLECTIONS.books.schema }),
  papers: defineCollection({ loader: load(COLLECTIONS.papers), schema: COLLECTIONS.papers.schema }),
  tutorials: defineCollection({
    loader: load(COLLECTIONS.tutorials),
    schema: COLLECTIONS.tutorials.schema,
  }),
  molds: defineCollection({ loader: load(COLLECTIONS.molds), schema: COLLECTIONS.molds.schema }),
  patterns: defineCollection({
    loader: load(COLLECTIONS.patterns),
    schema: COLLECTIONS.patterns.schema,
  }),
};
