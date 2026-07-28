// The kind context is built from INJECTED registries, not from the repo's YAML files.
//
// That is the whole point of the seam: a kind can be exercised against a registry written
// for the test, so a test about tag validation does not have to add a tag to the real
// meta_tags.yml — and reading the repo's files from module scope is what made that
// impossible before. The parent Foundry states the same rationale on its own context:
// "so a kind can be tested against a synthetic registry — which is the one thing a kind
// test always needs."

import { describe, expect, it } from 'vitest';

import { tagRegistry } from '@galaxy-foundry/tag-registry';
import { buildReferenceContract } from '@galaxy-foundry/reference-contract';
import { bundledPolicy } from '@galaxy-foundry/license-policy';

import { buildKindContext, DEFINITIONS } from '../src/types/index';

// A vocabulary that exists nowhere in this repo. If a schema built against it accepts
// `flavour/mango`, the schema is consulting the registry it was handed.
//
// The `values` keys are the FULL tags, not leaf names — the registry declares membership,
// and nothing here parses the `/`.
const syntheticTags = tagRegistry({
  facets: {
    flavour: {
      label: 'Flavour',
      description: 'A vocabulary invented by this test.',
      values: { 'flavour/mango': 'A tag no note in the corpus carries.' },
    },
  },
});

const syntheticContext = () =>
  buildKindContext({
    tags: syntheticTags,
    contract: buildReferenceContract({
      kinds: { research: { label: 'Research', description: 'A research note.' } },
    }),
    licensePolicy: bundledPolicy(),
  });

describe('buildKindContext (injected registries)', () => {
  it('validates tags against the registry it was handed, not meta_tags.yml', () => {
    const schema = DEFINITIONS.pattern.build(syntheticContext());
    const note = { type: 'pattern', name: 'x', status: 'draft', tags: ['flavour/mango'] };
    expect(schema.safeParse(note).success).toBe(true);
  });

  // The other direction, so the test above cannot pass by the registry being ignored
  // altogether: a tag the REAL registry declares is unknown to the synthetic one.
  it('rejects a tag the synthetic registry does not declare', () => {
    const schema = DEFINITIONS.pattern.build(syntheticContext());
    const note = { type: 'pattern', name: 'x', status: 'draft', tags: ['domain/batch-effects'] };
    expect(schema.safeParse(note).success).toBe(false);
  });

  // Same seam, second registry: the reference vocabulary a Mold's `references[]` draws from
  // is the injected contract's, so a kind narrowed for a test stays narrowed.
  it('validates reference kinds against the injected contract', () => {
    const ctx = syntheticContext();
    expect(ctx.reference.safeParse({
      kind: 'research', ref: 'x', used_at: 'cast-time',
      load: 'upfront', mode: 'verbatim', evidence: 'corpus-observed',
    }).success).toBe(true);
    expect(ctx.reference.safeParse({
      kind: 'not-a-declared-kind', ref: 'x', used_at: 'cast-time',
      load: 'upfront', mode: 'verbatim', evidence: 'corpus-observed',
    }).success).toBe(false);
  });
});
