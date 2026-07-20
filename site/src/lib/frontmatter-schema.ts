// The frontmatter contract — authored ONCE here, consumed by two callers:
//   1. the Astro site (`content.config.ts`) — validates real content at build time;
//   2. the standalone validator (`tests/`) — negative fixtures + corpus conformance.
// The parent Foundry keeps two encodings (an ajv `meta_schema.yml` and a hand-written
// site zod schema) and they have already drifted (issue #89). We adapt: one zod module,
// no mirror. It imports `z` from `zod` (not `astro:content`) so it loads outside Astro.
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { z } from 'zod';
import { isValidLicenseId, resolveLicenseRow } from './license-policy';
import {
  referenceKinds,
  referenceUsedAt,
  referenceLoad,
  referenceModes,
  referenceEvidence,
} from './reference-contract';
import { isValidTag } from './meta-tags';

// Strip the trailing `/index` so entry ids stay clean (`msmb/chap1`, `leek-2010`)
// rather than `.../index` — keeps URLs and wiki-link basenames unique per note.
export const stripIndex = ({ entry }: { entry: string }) =>
  entry.replace(/\.md$/, '').replace(/\/index$/, '');

// Typed reference manifest (reference_contract.yml). The vocabularies are the
// authority; the two cross-field rules (`on-demand` needs a trigger, `hypothesis`
// evidence needs a verification) are stated in MOLD_SPEC prose and enforced here.
const reference = z
  .object({
    kind: z.enum(referenceKinds()),
    ref: z.string(),
    used_at: z.enum(referenceUsedAt()),
    load: z.enum(referenceLoad()),
    mode: z.enum(referenceModes()),
    evidence: z.enum(referenceEvidence()),
    purpose: z.string().optional(),
    trigger: z.string().optional(),
    verification: z.string().optional(),
    recheck: z.string().optional(),
  })
  .strict()
  .superRefine((ref, ctx) => {
    if (ref.load === 'on-demand' && !ref.trigger)
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['trigger'], message: `on-demand ref "${ref.ref}" requires a trigger` });
    if (ref.evidence === 'hypothesis' && !ref.verification)
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['verification'], message: `hypothesis-evidence ref "${ref.ref}" requires a verification` });
  });

// A `tags:` value must resolve in meta_tags.yml (namespaced enum or open slug).
const tag = z.string().refine(isValidTag, {
  message: 'tag must be registered in meta_tags.yml (e.g. family/b, role/critique, domain/<slug>)',
});

// `tags:` on every content type — the browse axis the site's /tags pages index.
// Seeded on Molds; extended to source notes + patterns so the corpus is tag-navigable.
const tagsArray = z.array(tag).default([]);

// An SPDX id from license-policy.yml, or a LicenseRef-<slug> escape hatch.
// The license → redistribution-policy table (galaxyproject/foundry-pattern#4)
// is the source of truth for what each id means.
const licenseId = z.string().refine(isValidLicenseId, {
  message: 'must be an SPDX id from license-policy.yml or a LicenseRef-<slug>',
});

// A `derived` value declares verbatim carry when it is license-aware / keeps quotes
// and is not explicitly own-words. own-words paraphrases redistribute no protected
// expression, so they never need a license_file and never violate an NC/own-words row.
const declaresVerbatimCarry = (derived: string): boolean =>
  /license-aware|with-quotes|verbatim/i.test(derived) && !/own-words/i.test(derived);

// License coherence: the id must resolve to a real row (not the defect/default row);
// a note may not carry verbatim under an own-words-only license (the NC/copyleft
// propagation the policy table exists to prevent); and verbatim carry under a row that
// requires a license_file must declare one. Keys off `derived`, the recorded posture.
const licenseCoherence = <T extends { license: string; license_file?: string; derived: string }>(
  note: T,
  ctx: z.RefinementCtx,
) => {
  const row = resolveLicenseRow(note.license);
  if (row.defect)
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['license'], message: `license "${note.license}" resolves to the default row (unresolved/defect) — add a real row to license-policy.yml or fix the id` });
  const carries = declaresVerbatimCarry(note.derived);
  if (carries && row.policy === 'own-words-only')
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['derived'], message: `derived "${note.derived}" declares verbatim carry but license ${note.license} is own-words-only (paraphrase, or fix the license)` });
  if (carries && row.license_file && !note.license_file)
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['license_file'], message: `verbatim carry under ${note.license} requires a license_file (vendored in LICENSES/)` });
};

// Source notes for papers + tutorials: faithful summaries with short load-bearing
// quotes (where the license permits), not own-words-only like books. `license` is a
// normalized id whose redistribution policy is resolved from license-policy.yml.
// `license_file` is optional: own-words-only notes redistribute no text and carry
// none; notes that reproduce verbatim quotes under a verbatim-ok license (e.g. CC-BY)
// point to the upstream LICENSE copy in LICENSES/, honoring the notice obligation.
// `derived` records what modification was made (the CC-BY "changes" indication), and
// is foregrounded in the UI. Provenance is descriptive (url/doi/version/access_date);
// the sync-script + checksum layer is deferred to repo standup.
export const sourceNoteSchema = z
  .object({
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
    tags: tagsArray,
  })
  .superRefine(licenseCoherence);

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

// Chapter frontmatter carries only what varies per chapter; book-level fields are merged
// from book.yml. `attribution` may be a template ({n}/{title} filled from the chapter).
export const bookSchema = z
  .object({
    title: z.string(),
    source: z.string(),
    source_chapter: z.number().int().optional(),
    source_url: z.string().url(),
    tags: tagsArray,
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
    const merged = {
      ...data,
      license: book.license as string,
      license_file: book.license_file as string | undefined,
      attribution,
      derived: String(book.derived),
    };
    // Same license coherence the source notes get — keyed on book.yml's posture.
    licenseCoherence(merged, ctx);
    return merged;
  });

// Molds: abstract action templates (the Mold-primary core). Only `index.md` bears
// frontmatter; eval/scenarios live in siblings. Parent drops `axis` here — we group by
// the namespaced `family/*` + `role/*` tags instead (MOLD_SPEC adaptation). `references`
// is the typed manifest (reference_contract.yml). Experiment artifacts (the blind-assembly
// candidate/doer/audit Molds) are structurally Molds, so they share this schema.
export const moldSchema = z.object({
  type: z.literal('mold'),
  name: z.string(),
  summary: z.string().optional(),
  tags: tagsArray,
  references: z.array(reference).optional(),
});

// Patterns: the cautionary-bad / established-good corpus leaves referenced by referee
// Molds (`[[double-dipping]]`, `[[garden-of-forking-paths]]`, …). Only `index.md` bears
// frontmatter. Kept loose — corpus-first stubs grow as real cases demand. (`status` stays
// free text: the inherited status lifecycle is a rung-6 port, not tightened here.)
export const patternSchema = z.object({
  type: z.literal('pattern'),
  name: z.string(),
  pole: z.enum(['cautionary-bad', 'established-good']).optional(),
  status: z.string().optional(),
  tags: tagsArray,
});

// Single source for the collection ⇒ (glob base, schema) mapping, so `content.config.ts`
// and the corpus-conformance validator route files the same way. Bases are relative to
// the Astro project root (site/), matching the loaders' cwd.
export const COLLECTIONS = {
  books: { base: '../content/research/books', schema: bookSchema },
  papers: { base: '../content/research/papers', schema: sourceNoteSchema },
  tutorials: { base: '../content/research/tutorials', schema: sourceNoteSchema },
  molds: { base: '../content/molds', schema: moldSchema },
  patterns: { base: '../content/patterns', schema: patternSchema },
  experiments: { base: '../content/research/experiments', schema: moldSchema },
} as const;
