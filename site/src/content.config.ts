import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { COLLECTIONS, stripIndex } from './lib/frontmatter-schema';

// Thin consumer of the shared frontmatter contract (src/lib/frontmatter-schema.ts).
// The schema is authored ONCE there and imported here + by the standalone validator
// (tests/) — one encoding, no mirror (issue #89, the "beat the parent" adapt). Written
// out per collection (not a loop) so Astro infers each schema's type for the pages.
const load = (base: string) => glob({ pattern: ['**/index.md'], base, generateId: stripIndex });

export const collections = {
  books: defineCollection({ loader: load(COLLECTIONS.books.base), schema: COLLECTIONS.books.schema }),
  papers: defineCollection({ loader: load(COLLECTIONS.papers.base), schema: COLLECTIONS.papers.schema }),
  tutorials: defineCollection({ loader: load(COLLECTIONS.tutorials.base), schema: COLLECTIONS.tutorials.schema }),
  molds: defineCollection({ loader: load(COLLECTIONS.molds.base), schema: COLLECTIONS.molds.schema }),
  patterns: defineCollection({ loader: load(COLLECTIONS.patterns.base), schema: COLLECTIONS.patterns.schema }),
  experiments: defineCollection({ loader: load(COLLECTIONS.experiments.base), schema: COLLECTIONS.experiments.schema }),
};
