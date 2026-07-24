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

// A `tags:` value must resolve to a documented entry in meta_tags.yml. Every
// namespace is a closed enum — there is no free-form slug escape hatch.
const tag = z.string().refine(isValidTag, {
  message: 'tag must be registered in meta_tags.yml (e.g. family/b, role/critique, domain/batch-effects)',
});

// `tags:` on every content type — the browse axis the site's /tags pages index.
// `.min(1)`: every note MUST carry ≥1 facet tag (issue #100 — converges with the
// Galaxy Workflow Foundry's "min(1) everywhere"). Molds/experiments take family/role;
// source notes + patterns take domain/topic subject facets.
const tagsArray = z.array(tag).min(1, {
  message: 'every note must carry ≥1 facet tag registered in meta_tags.yml (e.g. domain/batch-effects)',
});

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
const sourceNoteFields = {
  title: z.string(),
  source_id: z.string(),
  source_url: z.string().url(),
  doi: z.string().optional(),
  version: z.string().optional(),
  access_date: z.string(),
  license: licenseId,
  license_file: z.string().optional(),
  attribution: z.string(),
  derived: z.string(),
  // The source's own licence wording, verbatim, when the posture is not obvious from the
  // id alone (e.g. an "Author's Choice" CC-BY notice on an otherwise subscription journal).
  // Evidence for the `license` id above, not a substitute for it.
  license_statement: z.string().optional(),
  tags: tagsArray,
};

// Papers and tutorials build on the shared set above but are TWO schemas, not one schema
// with a `z.enum(['paper','tutorial'])`, because `type` is the SOLE note-kind discriminator
// (converging with the parent Foundry's #374): one kind, one schema. The enum let a
// `type: paper` note sit in content/research/tutorials/ and still validate; a literal per
// kind makes the collection and the declared kind agree, or fail.
//
// The split is also what lets the two DIFFER: a paper carries bibliographic identifiers, a
// tutorial the release it documents. Under one shared enum every field had to be legal on
// both. Identifiers are strings, never numbers — an unquoted `pmid: 33015620` is an integer
// to YAML, and an id is an opaque label we never do arithmetic on.
export const paperSchema = z
  .object({
    type: z.literal('paper'),
    ...sourceNoteFields,
    pmid: z.string().optional(),
    pmcid: z.string().optional(),
    arxiv: z.string().url().optional(),
    // Free mirror of a paywalled record (PMC, institutional repository).
    oa_url: z.string().url().optional(),
  })
  .strict()
  .superRefine(licenseCoherence);

export const tutorialSchema = z
  .object({
    type: z.literal('tutorial'),
    ...sourceNoteFields,
    // Docs site distinct from `source_url` (which points at the package record).
    docs_url: z.string().url().optional(),
    // The Bioconductor release `version` belongs to — the pair pins the vignette.
    bioconductor_release: z.string().optional(),
    // Quoted, like `access_date`: bare `2024-03-21` is a Date to YAML, not a string (#87).
    published: z.string().optional(),
  })
  .strict()
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

// Chapter frontmatter declares its kind (`type: book`) and otherwise carries only what
// varies per chapter — the kind is per-note, not per-book, so it is not a book.yml field
// even though it is constant within a book: every note in the corpus names its own kind.
// Book-level fields are merged from book.yml, and `.strict()` keeps that one-way: a chapter
// restating `license`/`attribution`/`derived` is rejected rather than silently shadowing the
// book. `attribution` may be a template ({n}/{title} filled from the chapter).
export const bookSchema = z
  .object({
    type: z.literal('book'),
    title: z.string(),
    source: z.string(),
    source_chapter: z.number().int().optional(),
    source_url: z.string().url(),
    tags: tagsArray,
  })
  .strict()
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
}).strict();

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
}).strict();

// The note KINDS this Foundry defines — the complete set of `type` values the corpus may
// declare, each with the one schema that validates it. `type` is the SOLE discriminator:
// every note declares its kind exactly once, in frontmatter, and the kind picks the schema.
// Nothing infers a kind from a directory or a tag.
export const NOTE_KINDS = {
  book: bookSchema,
  paper: paperSchema,
  tutorial: tutorialSchema,
  mold: moldSchema,
  pattern: patternSchema,
} as const;

export type NoteKind = keyof typeof NOTE_KINDS;

// Single source for the collection ⇒ (glob base, kind) mapping, so `content.config.ts`
// and the corpus-conformance validator route files the same way. Bases are relative to
// the Astro project root (site/), matching the loaders' cwd.
//
// Collection and kind are DELIBERATELY not one-to-one: `experiments` holds candidate Molds
// produced by the blind-assembly runs, which are structurally Molds and declare `type: mold`.
// The collection is a location (it gets its own browse route and its notes sit beside their
// comparison/gap-closing narratives); the kind is what the note IS. Keeping the mapping
// explicit is what lets a kind catalog enumerate 5 kinds while the site routes 6 collections.
export const COLLECTIONS = {
  books: { base: '../content/research/books', kind: 'book', schema: NOTE_KINDS.book },
  papers: { base: '../content/research/papers', kind: 'paper', schema: NOTE_KINDS.paper },
  tutorials: { base: '../content/research/tutorials', kind: 'tutorial', schema: NOTE_KINDS.tutorial },
  molds: { base: '../content/molds', kind: 'mold', schema: NOTE_KINDS.mold },
  patterns: { base: '../content/patterns', kind: 'pattern', schema: NOTE_KINDS.pattern },
  experiments: { base: '../content/research/experiments', kind: 'mold', schema: NOTE_KINDS.mold },
} as const satisfies Record<string, { base: string; kind: NoteKind; schema: unknown }>;
