import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
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

// Book notes: summaries of external textbooks (e.g. MSMB chapters). Book-level metadata
// (license/license_file/attribution/derived) lives ONCE per book in
// content/research/books/<id>/book.yml — not repeated in every chapter's frontmatter —
// and is merged into each chapter entry below so downstream pages read a full record.
const BOOKS_DIR = path.resolve('../content/research/books');
const bookMetaCache = new Map<string, Record<string, unknown>>();
function loadBookMeta(source: string): Record<string, unknown> {
  let meta = bookMetaCache.get(source);
  if (!meta) {
    meta = yaml.load(fs.readFileSync(path.join(BOOKS_DIR, source, 'book.yml'), 'utf-8')) as Record<string, unknown>;
    bookMetaCache.set(source, meta);
  }
  return meta;
}

const books = defineCollection({
  loader: glob({ pattern: ['**/index.md'], base: '../content/research/books', generateId: stripIndex }),
  // Chapter frontmatter carries only what varies per chapter; book-level fields are merged
  // from book.yml. `attribution` may be a template ({n}/{title} filled from the chapter).
  schema: z
    .object({
      title: z.string(),
      source: z.string(),
      source_chapter: z.number().int().optional(),
      source_url: z.string().url(),
    })
    .transform((data, ctx) => {
      const book = loadBookMeta(data.source);
      if (!isValidLicenseId(book.license as string)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `book.yml license "${String(book.license)}" is not a valid id (source: ${data.source})` });
        return z.NEVER;
      }
      const attribution = String(book.attribution)
        .replace(/\{n\}/g, String(data.source_chapter ?? ''))
        .replace(/\{title\}/g, data.title);
      return {
        ...data,
        license: book.license as string,
        license_file: book.license_file as string,
        attribution,
        derived: book.derived as string,
      };
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
  loader: glob({ pattern: ['**/index.md'], base: '../content/research/papers', generateId: stripIndex }),
  schema: sourceNote,
});

const tutorials = defineCollection({
  loader: glob({ pattern: ['**/index.md'], base: '../content/research/tutorials', generateId: stripIndex }),
  schema: sourceNote,
});

// Molds: abstract action templates (the Mold-primary core). Only `index.md` bears
// frontmatter; eval/scenarios live in siblings. Parent drops `axis` here — we group by
// the soft `family/*` + `role/*` tags instead (MOLD_SPEC adaptation). `references` is the
// typed manifest, kept loose for display (count only); full validation deferred to standup.
const molds = defineCollection({
  loader: glob({ pattern: ['**/index.md'], base: '../content/molds', generateId: stripIndex }),
  schema: z.object({
    type: z.literal('mold'),
    name: z.string(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    references: z.array(z.any()).optional(),
  }),
});

// Patterns: the cautionary-bad / established-good corpus leaves referenced by referee
// Molds (`[[double-dipping]]`, `[[garden-of-forking-paths]]`, …). Only `index.md` bears
// frontmatter. Kept loose — corpus-first stubs grow as real cases demand.
const patterns = defineCollection({
  loader: glob({ pattern: ['**/index.md'], base: '../content/patterns', generateId: stripIndex }),
  schema: z.object({
    type: z.literal('pattern'),
    name: z.string(),
    pole: z.enum(['cautionary-bad', 'established-good']).optional(),
    status: z.string().optional(),
  }),
});

export const collections = { books, papers, tutorials, molds, patterns };
