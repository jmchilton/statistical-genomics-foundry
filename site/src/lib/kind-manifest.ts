// This Foundry's kind manifest — the machine-readable form of "what kinds does this
// Foundry define, and what metadata does each require".
//
// The FORMAT, the zod-shape deriver, and the reader all live in
// @galaxy-foundry/kind-manifest, because they are shared across instances (spec:
// galaxyproject/foundry-pattern, `content/pattern/standing-up-a-foundry.instructions.txt`).
// The bridge between the two — turning kind definitions into the deriver's input — is
// `manifestKinds` in @galaxy-foundry/kind-schema, because both instances had written it
// identically. What stays here is the part that is genuinely ours: which kinds exist, and how
// this instance's registries resolve into the context they are built against.
//
// `fields` is still DERIVED from the zod shape, never hand-written — that has just moved
// one repo over, along with the synthetic-shape tests that prove the deriver right.

import {
  buildKindManifest as deriveKindManifest,
  type KindManifest,
  type ManifestSource,
} from '@galaxy-foundry/kind-manifest';
import { manifestKinds } from '@galaxy-foundry/kind-schema';

import { COLLECTIONS } from './frontmatter-schema';
import { buildKindContext, KINDS } from '../types/index';
import { REGISTRIES } from './registries';

export {
  describeFields,
  describeType,
  KIND_MANIFEST_VERSION,
  parseKindManifest,
  withRevision,
  type KindManifest,
  type ManifestField,
  type ManifestKind,
  type ManifestSource,
} from '@galaxy-foundry/kind-manifest';

/**
 * Where this Foundry's manifest lives, so a consumer vendoring a copy does not have to
 * hard-code our identity on our behalf.
 *
 * Deliberately no `revision`: the manifest is a committed artifact whose CI gate
 * regenerates it and string-compares, so anything in it that varies with the current
 * commit makes `--check` fail on every commit. Whoever takes a snapshot records that.
 */
export const MANIFEST_SOURCE: ManifestSource = {
  repo: 'jmchilton/statistical-genomics-foundry',
  path: 'site/src/types/kinds.generated.json',
};

export function buildKindManifest(
  instance: string,
  docs: Record<string, string> = {},
): KindManifest {
  return deriveKindManifest({
    instance,
    source: MANIFEST_SOURCE,
    // `COLLECTIONS` rather than a hand-written location list per kind: the bridge derives each
    // kind's `locations` from the routing table, which is also what makes `experiments` and
    // `molds` both show up under `mold` without anyone remembering to say so.
    kinds: manifestKinds(KINDS, buildKindContext(REGISTRIES), { docs, collections: COLLECTIONS }),
  });
}
