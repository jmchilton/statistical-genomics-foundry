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
//
// Kinds receive the registries rather than importing them, so a kind can be tested against a
// synthetic registry — which is the one thing a kind test always needs. It also means this
// module reads no files: what used to be three module-scope loads of the repo's YAML is now
// three arguments, supplied once by src/lib/registries.ts.

import { z } from 'zod';

import {
  isValidLicenseId,
  resolveLicenseRow,
  type LicensePolicy,
} from '@galaxy-foundry/license-policy';
import {
  contractKeys,
  type ContractGroup,
  type ReferenceContract,
} from '@galaxy-foundry/reference-contract';
import { type TagRegistry } from '@galaxy-foundry/tag-registry';

export interface BuildKindContextOptions {
  /** Controlled tag vocabulary (meta_tags.yml). Membership is declared by the registry's
   *  facets, so the schema asks the registry rather than matching a prefix itself. */
  tags: TagRegistry;
  /** The five reference vocabularies a Mold's `references[]` draws from. */
  contract: ReferenceContract;
  /** License → redistribution-policy table, shared across Foundry instances. */
  licensePolicy: LicensePolicy;
}

/**
 * Any shape a kind may have: an object carrying the `type` discriminator.
 *
 * `type` is the SOLE discriminator — the kind picks the schema, and nothing infers a kind from
 * a directory, a filename or a tag. Stating that in the bound is what makes it a property of
 * the contract rather than a convention every kind happens to follow, and it is what lets a
 * consumer route on `type` knowing every kind has one. The parent Foundry uses the same bound,
 * where it additionally lets the kinds compose into a `z.discriminatedUnion`.
 */
export type KindShape = { type: z.ZodTypeAny } & z.ZodRawShape;

/**
 * What a `types/<kind>/schema.ts` exports.
 *
 * Generic over its shape `T`, and that is not decoration: a definition annotated
 * `: KindDefinition` widens it, and the erasure travels all the way to the Astro pages as
 * `entry.data` of type `unknown` — one widened annotation here costs ~100 `astro check`
 * errors on pages that never mention this file. Kinds go through `defineKind` so it stays
 * INFERRED.
 *
 * A kind is `build` plus an optional `refine`, and nothing else. There is deliberately no
 * hook for assembling an entry out of anything but its own frontmatter: a note that needed
 * a sibling file's fields (a book chapter and its book.yml) gets them materialized into its
 * frontmatter by a generator instead. That keeps every kind a plain object — no file I/O
 * inside a schema, and a kind manifest that reports what a note actually carries.
 */
export interface KindDefinition<T extends KindShape = KindShape> {
  /** The `type:` discriminator value. MUST equal the directory name. */
  kind: string;
  /** Display name for the kind catalog. */
  title: string;
  /** `substrate` = a kind the Foundry pattern's other instances also declare;
   *  `instance` = one this domain added. The cross-instance catalog groups by this.
   *
   *  Named `layer`, not `origin`: a kind is free to declare a frontmatter field called
   *  `origin`, and one manifest carrying both meanings under one word is a trap for anything
   *  reading across instances. */
  layer: 'substrate' | 'instance';
  /** One line: what a note of this kind IS. Rendered in the catalog. */
  summary: string;
  /** The strict object this kind validates. Its `.shape` is what the manifest generator
   *  walks to derive the required-metadata table, so `build` returns the OBJECT — any
   *  refinement goes in the slot below. */
  build: (ctx: KindContext) => z.ZodObject<T, 'strict'>;
  /** Cross-field rules over this kind's own fields. */
  refine?: (
    data: z.infer<z.ZodObject<T, 'strict'>>,
    ctx: z.RefinementCtx,
    kctx: KindContext,
  ) => void;
}

/** Identity helper a kind directory wraps its definition in, purely to INFER rather than
 *  widen the shape type. See the note on `KindDefinition`. */
export function defineKind<T extends KindShape>(
  definition: KindDefinition<T>,
): KindDefinition<T> {
  return definition;
}

// A `derived` value declares verbatim carry when it is license-aware / keeps quotes and is not
// explicitly own-words. own-words paraphrases redistribute no protected expression, so they
// never need a license_file and never violate an NC/own-words row.
//
// Registry-free, so it stays out of the factory below.
const declaresVerbatimCarry = (derived: string): boolean =>
  /license-aware|with-quotes|verbatim/i.test(derived) && !/own-words/i.test(derived);

/**
 * The field primitives, built against ONE set of registries.
 *
 * Split out from `buildKindContext` so `KindContext` can be typed off its return
 * (`Primitives['sourceNoteFields']`) rather than off module-scope consts. That indirection is
 * load-bearing: annotating these members as `z.ZodRawShape` erases which fields a kind spreads
 * in, and the erasure surfaces far away as `Property 'title' does not exist` on the paper pages.
 */
function buildPrimitives(options: BuildKindContextOptions) {
  const { tags, contract, licensePolicy } = options;

  // A `tags:` value must resolve to a documented entry in the registry. Every namespace is a
  // closed enum — there is no free-form slug escape hatch. Membership is the registry's
  // answer, declared by its facets, never a prefix match on the `/`.
  const tag = z.string().refine((t: string) => tags.isValidTag(t), {
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
  // of truth for what each id means. It is INSTALLED, not vendored — @galaxy-foundry/license-policy
  // ships the table both Foundry instances used to hand-mirror. What the package deliberately does
  // NOT ship is `licenseCoherence` below: whether a note is coherent with its license is still an
  // instance-local rule (ours keys off the recorded `derived` posture).
  const licenseId = z.string().refine((id: string) => isValidLicenseId(licensePolicy, id), {
    message: 'must be an SPDX id in @galaxy-foundry/license-policy or a LicenseRef-<slug>',
  });

  // The package already refuses an empty group, so this cannot throw in practice. It stays
  // because the cast has to be justified by something: `z.enum` needs a non-empty tuple, and
  // no amount of upstream validation proves that to the type checker here.
  const keys = (group: ContractGroup): [string, ...string[]] => {
    const k = contractKeys(contract, group);
    if (k.length === 0) throw new Error(`reference contract: \`${group}\` is empty`);
    return k as [string, ...string[]];
  };

  // Typed reference manifest (reference_contract.yml). The vocabularies are the authority; the
  // two cross-field rules (`on-demand` needs a trigger, `hypothesis` evidence needs a
  // verification) are stated in MOLD_SPEC prose and enforced here.
  const reference = z
    .object({
      kind: z.enum(keys('kinds')),
      ref: z.string(),
      used_at: z.enum(keys('used_at')),
      load: z.enum(keys('load')),
      mode: z.enum(keys('modes')),
      evidence: z.enum(keys('evidence')),
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

  // License coherence: the id must resolve to a real row (not the defect/default row); a note may
  // not carry verbatim under an own-words-only license (the NC/copyleft propagation the policy
  // table exists to prevent); and verbatim carry under a row that requires a license_file must
  // declare one. Keys off `derived`, the recorded posture.
  const licenseCoherence = <T extends { license: string; license_file?: string; derived: string }>(
    note: T,
    ctx: z.RefinementCtx,
  ) => {
    const row = resolveLicenseRow(licensePolicy, note.license);
    if (row.defect)
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['license'], message: `license "${note.license}" resolves to the default row (unresolved/defect) — fix the id, or add a row upstream in @galaxy-foundry/license-policy and bump it` });
    const carries = declaresVerbatimCarry(note.derived);
    if (carries && row.policy === 'own-words-only')
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['derived'], message: `derived "${note.derived}" declares verbatim carry but license ${note.license} is own-words-only (paraphrase, or fix the license)` });
    if (carries && row.license_file && !note.license_file)
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['license_file'], message: `verbatim carry under ${note.license} requires a license_file (vendored in LICENSES/)` });
  };

  // Source notes for papers + tutorials: faithful summaries with short load-bearing quotes (where
  // the license permits), not own-words-only like books. `license` is a normalized id whose
  // redistribution policy is resolved from the shared policy table. `license_file` is optional:
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
  };

  return { tag, tagsArray, licenseId, reference, licenseCoherence, sourceNoteFields };
}

type Primitives = ReturnType<typeof buildPrimitives>;

/**
 * Everything a kind directory draws from.
 *
 * Its members are typed by INFERENCE off the primitives (`Primitives['sourceNoteFields']`, not
 * `z.ZodRawShape`). An index-signature annotation here erases which fields a kind spreads in,
 * and the erasure surfaces far away as `Property 'title' does not exist` on the paper pages.
 */
export interface KindContext {
  /** The registries this context was built from, for the few rules that must consult a row. */
  registries: BuildKindContextOptions;
  /** One registered tag. */
  tag: Primitives['tag'];
  /** An SPDX id from the shared policy table, or a LicenseRef-<slug> escape hatch. */
  licenseId: Primitives['licenseId'];
  /** One entry of a Mold's typed reference manifest. */
  reference: Primitives['reference'];
  /** The provenance/licence block every SOURCE note carries (paper, tutorial). Spread it
   *  ALONGSIDE `base`, not instead of it — it holds no envelope fields of its own. */
  sourceNoteFields: Primitives['sourceNoteFields'];
  /** License coherence, shared by every kind that redistributes someone else's text. */
  licenseCoherence: Primitives['licenseCoherence'];

  /** THE BASE ENVELOPE — the fields every kind in this instance carries. Kinds spread it. */
  base: { tags: Primitives['tagsArray'] };
}

export function buildKindContext(options: BuildKindContextOptions): KindContext {
  const { tag, tagsArray, licenseId, reference, licenseCoherence, sourceNoteFields } =
    buildPrimitives(options);
  return {
    registries: options,
    tag,
    licenseId,
    reference,
    sourceNoteFields,
    licenseCoherence,
    base: { tags: tagsArray },
  };
}
