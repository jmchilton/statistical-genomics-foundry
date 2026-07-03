import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { isValidLicenseId } from './lib/license-policy';

// An SPDX id from license-policy.yml, or a LicenseRef-<slug> escape hatch.
// The license → redistribution-policy table (galaxyproject/foundry-pattern#4)
// is the source of truth for what each id means.
const licenseId = z.string().refine(isValidLicenseId, {
  message: 'must be an SPDX id from license-policy.yml or a LicenseRef-<slug>',
});

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
    license: licenseId,
    license_file: z.string(),
    attribution: z.string(),
    derived: z.string(),
  }),
});

// Source notes for papers + tutorials: faithful summaries with short load-bearing
// quotes (where the license permits), not own-words-only like books. `license` is a
// normalized id whose redistribution policy is resolved from license-policy.yml.
// `license_file` is optional: own-words-only notes redistribute no text and carry
// none; notes that reproduce verbatim quotes under a verbatim-ok license (e.g. CC-BY)
// point to the upstream LICENSE copy in LICENSES/, honoring the notice obligation.
// `derived` records what modification was made (the CC-BY "changes" indication), and
// is foregrounded in the UI. Provenance is descriptive (url/doi/version/access_date);
// the sync-script + checksum layer is deferred to repo standup.
const sourceNote = z.object({
  title: z.string(),
  type: z.enum(['paper', 'tutorial']),
  source_id: z.string(),
  source_url: z.string().url(),
  doi: z.string().optional(),
  version: z.string().optional(),
  access_date: z.string(),
  license: licenseId,
  license_file: z.string().optional(),
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
