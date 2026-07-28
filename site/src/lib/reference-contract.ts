// This Foundry's typed-reference vocabulary — the five controlled lists an entry in a
// Mold's `references[]` manifest draws from.
//
// Four of the five describe the compilation machinery rather than any domain, so they
// are the same in every Foundry and ship as data in @galaxy-foundry/reference-contract
// (spec: galaxyproject/foundry-pattern, `content/pattern/anatomy-of-an-instance.md`).
// The fifth, `kinds`, is exactly what varies by domain, so it stays at the repo root in
// ../reference_contract.yml — outside the Astro project, so the schema grammar and any
// future validator share one source.
//
// What is left here is the composition, and the one place this instance disagrees with
// what it inherits.

import path from 'node:path';

import {
  buildReferenceContract,
  contractKeys,
  loadInstanceKinds,
  type ContractGroup,
  type ReferenceContract,
} from '@galaxy-foundry/reference-contract';

const CONTRACT_FILE = path.resolve('../reference_contract.yml');

/**
 * The casting transforms this Foundry supports — the inherited `modes` vocabulary minus
 * `condense`.
 *
 * `condense` is not description, it is capacity: it commits a Foundry to an LLM phase in
 * its caster, and with it the unfilled-slot bookkeeping, the prompt/model provenance a
 * reproducible cast needs, and the loss of byte-stable output that makes a `--check` gate
 * possible at all. We have no caster, so that capacity has earned nothing.
 *
 * The corpus agreed before this was written: every `condense` ref here was
 * `load: on-demand` — progressive disclosure, not condensation, was already doing the size
 * work — and the parent Foundry, which DID build the LLM phase, has since gone to zero
 * condense refs of its own ("the prior condense was always a verbatim passthrough, so the
 * cast is fully deterministic"). Re-add it the day a Mold genuinely needs an LLM pass, and
 * build the phase then.
 *
 * Note that `mode` does NOT answer "may this text be redistributed" — that is a question
 * about the SOURCE, decided at ingestion and recorded in a note's `derived:` posture. A
 * note that is our own-words summary is our prose, and casting it verbatim redistributes
 * our words, not the paper's. The license table governs third-party pass-through content
 * only, and says so in its own `global_rules` (`foundry_content_out_of_scope`).
 */
export const SUPPORTED_MODES = ['verbatim', 'sidecar'] as const;

/**
 * The groups this instance narrows rather than inherits whole. Unlike the inherited four,
 * a narrowed group is authored — which makes it ours to keep free of dead entries, the
 * same way `kinds` is. site/tests/registry-drift.test.ts reads this.
 */
export const NARROWED_GROUPS = ['kinds', 'modes'] as const satisfies readonly ContractGroup[];

let cached: ReferenceContract | undefined;

/** The composed contract itself — what `buildKindContext` is handed. */
export function referenceContract(): ReferenceContract {
  if (!cached) {
    cached = buildReferenceContract({
      kinds: loadInstanceKinds(CONTRACT_FILE),
      narrow: { modes: SUPPORTED_MODES },
    });
  }
  return cached;
}

// The package already refuses an empty group, so this cannot throw in practice. It stays
// because the cast below has to be justified by something: `z.enum` needs a non-empty
// tuple, and no amount of upstream validation proves that to the type checker here.
const keys = (group: ContractGroup): [string, ...string[]] => {
  const k = contractKeys(referenceContract(), group);
  if (k.length === 0) throw new Error(`reference contract: \`${group}\` is empty`);
  return k as [string, ...string[]];
};

// Only the two the drift test reads. The other three (`used_at`, `load`, `evidence`) existed
// solely for the kind context, which now takes the contract itself.
export const referenceKinds = () => keys('kinds');
export const referenceModes = () => keys('modes');
