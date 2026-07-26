// The shared kind context — everything a kind directory draws from, in one place.
//
// This is the substrate half of the frontmatter contract. A field primitive lives here when
// MORE THAN ONE kind uses it; a primitive used by exactly one kind lives in that kind's own
// directory, where the only reader who needs it will find it.
//
// `base` is the note envelope every kind carries. Ours is ONE field. The parent Foundry's is
// seven (`status`, `created`, `revised`, `revision`, `ai_generated`, `summary`, `tags`), and
// the gap is deliberate rather than unfinished: `created`/`revised`/`revision` would have to
// be backfilled from git history to be true, and stamping today's date across a corpus we did
// not author today manufactures provenance instead of recording it; `ai_generated` needs a
// per-note truth we do not track. `summary` and `status` ARE carried — by the kinds that
// earned them (mold, pattern), which is why they sit in those directories and not here.
// The kind catalog renders this difference; it is not meant to be hidden.

import { z } from 'zod';

import { isValidLicenseId, resolveLicenseRow } from '../lib/license-policy';
import {
  referenceKinds,
  referenceUsedAt,
  referenceLoad,
  referenceModes,
  referenceEvidence,
} from '../lib/reference-contract';
import { isValidTag } from '../lib/meta-tags';

/**
 * What a `types/<kind>/schema.ts` exports.
 *
 * Generic over its shape `T` and its assembled output `O`, and that is not decoration: a
 * definition annotated `: KindDefinition` widens both, and the erasure travels all the way to
 * the Astro pages as `entry.data` of type `unknown`. Kinds go through `defineKind` so both are
 * INFERRED. (Learned the expensive way — the widened version produced 100 `astro check`
 * errors across every page that touched a collection.)
 */
export interface KindDefinition<
  T extends z.ZodRawShape = z.ZodRawShape,
  O = z.infer<z.ZodObject<T, 'strict'>>,
> {
  /** The `type:` discriminator value. MUST equal the directory name. */
  kind: string;
  /** Display name for the kind catalog. */
  title: string;
  /** `substrate` = a kind the Foundry pattern's other instances also declare;
   *  `instance` = one this domain added. The cross-instance catalog groups by this. */
  origin: 'substrate' | 'instance';
  /** One line: what a note of this kind IS. Rendered in the catalog. */
  summary: string;
  /** The strict object this kind validates. Its `.shape` is what the manifest generator
   *  walks to derive the required-metadata table, so `build` returns the OBJECT — any
   *  refinement or transform goes in the two slots below. */
  build: (ctx: KindContext) => z.ZodObject<T, 'strict'>;
  /** Cross-field rules over this kind's own fields. */
  refine?: (
    data: z.infer<z.ZodObject<T, 'strict'>>,
    ctx: z.RefinementCtx,
    kctx: KindContext,
  ) => void;
  /** For a kind whose entry is ASSEMBLED from more than its own frontmatter (a book chapter
   *  merging book.yml). Applied after `build`, and it may raise issues of its own. */
  transform?: (
    data: z.infer<z.ZodObject<T, 'strict'>>,
    ctx: z.RefinementCtx,
    kctx: KindContext,
  ) => O;
}

/** Identity helper a kind directory wraps its definition in, purely to INFER rather than
 *  widen the shape and output types. See the note on `KindDefinition`. */
export function defineKind<T extends z.ZodRawShape, O = z.infer<z.ZodObject<T, 'strict'>>>(
  definition: KindDefinition<T, O>,
): KindDefinition<T, O> {
  return definition;
}

// A `tags:` value must resolve to a documented entry in meta_tags.yml. Every namespace is a
// closed enum — there is no free-form slug escape hatch.
const tag = z.string().refine(isValidTag, {
  message:
    'tag must be registered in meta_tags.yml (e.g. family/b, role/critique, domain/batch-effects)',
});

// `.min(1)`: every note MUST carry ≥1 facet tag (issue #100 — converges with the Galaxy
// Workflow Foundry's "min(1) everywhere"). Molds/experiments take family/role; source notes
// and patterns take domain/topic subject facets.
const tagsArray = z.array(tag).min(1, {
  message:
    'every note must carry ≥1 facet tag registered in meta_tags.yml (e.g. domain/batch-effects)',
});

// The license → redistribution-policy table (galaxyproject/foundry-pattern#4) is the source
// of truth for what each id means.
const licenseId = z.string().refine(isValidLicenseId, {
  message: 'must be an SPDX id from license-policy.yml or a LicenseRef-<slug>',
});

// Typed reference manifest (reference_contract.yml). The vocabularies are the authority; the
// two cross-field rules (`on-demand` needs a trigger, `hypothesis` evidence needs a
// verification) are stated in MOLD_SPEC prose and enforced here.
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

// A `derived` value declares verbatim carry when it is license-aware / keeps quotes and is not
// explicitly own-words. own-words paraphrases redistribute no protected expression, so they
// never need a license_file and never violate an NC/own-words row.
const declaresVerbatimCarry = (derived: string): boolean =>
  /license-aware|with-quotes|verbatim/i.test(derived) && !/own-words/i.test(derived);

// License coherence: the id must resolve to a real row (not the defect/default row); a note may
// not carry verbatim under an own-words-only license (the NC/copyleft propagation the policy
// table exists to prevent); and verbatim carry under a row that requires a license_file must
// declare one. Keys off `derived`, the recorded posture.
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

// Source notes for papers + tutorials: faithful summaries with short load-bearing quotes (where
// the license permits), not own-words-only like books. `license` is a normalized id whose
// redistribution policy is resolved from license-policy.yml. `license_file` is optional:
// own-words-only notes redistribute no text and carry none; notes that reproduce verbatim
// quotes under a verbatim-ok license (e.g. CC-BY) point to the upstream LICENSE copy in
// LICENSES/, honoring the notice obligation. `derived` records what modification was made (the
// CC-BY "changes" indication), and is foregrounded in the UI. Provenance is descriptive
// (url/doi/version/access_date); the sync-script + checksum layer is deferred to repo standup.
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
  // The source's own licence wording, verbatim, when the posture is not obvious from the id
  // alone (e.g. an "Author's Choice" CC-BY notice on an otherwise subscription journal).
  // Evidence for the `license` id above, not a substitute for it.
  license_statement: z.string().optional(),
  tags: tagsArray,
};

/**
 * Everything a kind directory draws from.
 *
 * Its members are typed by INFERENCE off the primitives above (`typeof sourceNoteFields`, not
 * `z.ZodRawShape`). An index-signature annotation here erases which fields a kind spreads in,
 * and the erasure surfaces far away as `Property 'title' does not exist` on the paper pages.
 */
export interface KindContext {
  /** One registered tag. */
  tag: typeof tag;
  /** An SPDX id from license-policy.yml, or a LicenseRef-<slug> escape hatch. */
  licenseId: typeof licenseId;
  /** One entry of a Mold's typed reference manifest. */
  reference: typeof reference;
  /** The provenance/licence block every SOURCE note carries (paper, tutorial). */
  sourceNoteFields: typeof sourceNoteFields;
  /** License coherence, shared by every kind that redistributes someone else's text. */
  licenseCoherence: typeof licenseCoherence;

  /** THE BASE ENVELOPE — the fields every kind in this instance carries. Kinds spread it. */
  base: { tags: typeof tagsArray };
}

export function buildKindContext(): KindContext {
  return {
    tag,
    licenseId,
    reference,
    sourceNoteFields,
    licenseCoherence,
    base: { tags: tagsArray },
  };
}
