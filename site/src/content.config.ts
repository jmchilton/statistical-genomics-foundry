import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Corpus notes: own-words summaries of external sources (e.g. MSMB book chapters),
// carrying per-note license + attribution. Source of truth is ../research/books.
// NOTE: routing + wiki-link resolution still assume the old flat `chNN-slug.md` layout
// (see site/src/lib/wiki-links.ts: entry.id.split('/').pop() becomes "index" under the new
// chapN/index.md layout). Rewire before relying on the site — tracked as a reconciliation item.
const corpus = defineCollection({
  loader: glob({
    pattern: ['**/index.md'],
    base: '../research/books',
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

export const collections = { corpus };
