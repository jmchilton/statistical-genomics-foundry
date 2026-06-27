import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Strip the trailing `/index` so entry ids stay clean (`msmb/chap1`, `leek-2010`)
// rather than `.../index` — keeps URLs and wiki-link basenames unique per note.
const stripIndex = ({ entry }: { entry: string }) =>
  entry.replace(/\.md$/, '').replace(/\/index$/, '');

// Book notes: own-words summaries of external textbooks (e.g. MSMB chapters),
// carrying per-note license + attribution. Source of truth is ../research/books.
const books = defineCollection({
  loader: glob({ pattern: ['**/index.md'], base: '../research/books', generateId: stripIndex }),
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

// Source notes for papers + tutorials: faithful summaries with short load-bearing
// quotes (fair use), not own-words-only like books. Looser schema — license is a free
// string (no LICENSES/ file required), citation lives in `attribution`, and DOI/version
// are optional pins. Provenance is descriptive (url/doi/version/access_date); the
// sync-script + checksum layer is deferred to repo standup.
const sourceNote = z.object({
  title: z.string(),
  type: z.enum(['paper', 'tutorial']),
  source_id: z.string(),
  source_url: z.string().url(),
  doi: z.string().optional(),
  version: z.string().optional(),
  access_date: z.string(),
  license: z.string(),
  attribution: z.string(),
  derived: z.string(),
});

const papers = defineCollection({
  loader: glob({ pattern: ['**/index.md'], base: '../research/papers', generateId: stripIndex }),
  schema: sourceNote,
});

const tutorials = defineCollection({
  loader: glob({ pattern: ['**/index.md'], base: '../research/tutorials', generateId: stripIndex }),
  schema: sourceNote,
});

export const collections = { books, papers, tutorials };
