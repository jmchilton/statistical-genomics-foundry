import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Corpus notes: own-words summaries of external sources (e.g. MSMB chapters),
// carrying per-note license + attribution. Source of truth is ../content/corpus.
const corpus = defineCollection({
  loader: glob({
    pattern: ['**/*.md'],
    base: '../content/corpus',
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
