import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Book notes: own-words summaries of external textbooks (e.g. MSMB chapters),
// carrying per-note license + attribution. Source of truth is ../research/books.
// Layout is `<source>/<id>/index.md`; generateId strips the trailing `/index` so entry
// ids stay clean (`msmb/chap1`, not `msmb/chap1/index`) — keeps URLs and wiki-link
// basenames (see site/src/lib/wiki-links.ts) unique per chapter.
// Papers/tutorials become sibling collections later, once their copyright/frontmatter
// policy is settled.
const books = defineCollection({
  loader: glob({
    pattern: ['**/index.md'],
    base: '../research/books',
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/\/index$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    source: z.string(),
    source_chapter: z.number().int().optional(),
    source_url: z.string().url(),
    license: z.string(),
    license_file: z.string(),
    attribution: z.string(),
    derived: z.string(),
  }),
});

export const collections = { books };
