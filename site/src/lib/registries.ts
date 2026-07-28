// The controlled registries the frontmatter contract is built from, loaded once for the whole
// site build and handed to `buildKindContext`.
//
// This module exists so exactly ONE place reads the repo's YAML. The kind context used to load
// all three itself at module scope, which meant no kind could be exercised against anything but
// the real registries — and a test about tag validation had to add a tag to meta_tags.yml to
// run. Naming the registries here and injecting them is what opens that seam.
//
// Named to match the parent Foundry's `site/src/lib/registries.ts`, which does the same job.

import { bundledPolicy } from '@galaxy-foundry/license-policy';

import { referenceContract } from './reference-contract';
import { tagRegistry } from './meta-tags';
import type { BuildKindContextOptions } from '../types/context';

/** The license table is shared across Foundry instances rather than authored here, so it
 *  ships in @galaxy-foundry/license-policy instead of at our repo root. */
export const licensePolicy = bundledPolicy();

export const REGISTRIES: BuildKindContextOptions = {
  tags: tagRegistry(),
  contract: referenceContract(),
  licensePolicy,
};
