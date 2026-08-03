import path from 'node:path';

import { loadTagRegistry, type TagRegistry } from '@galaxy-foundry/tag-registry';

// Tag registry at the repo root (../meta_tags.yml), shared between the schema and the
// validator. The FORMAT and its rules — declared membership, closed facets, browse by
// declaring facet — now live in @galaxy-foundry/tag-registry, which also validates them;
// the facet VOCABULARY (family/role/domain/topic) is ours alone and stays here.
//
// This module exists only to bind that package to our one registry file and cache the
// result. Everything it exports is the same call the pages and the schema already made.
const TAGS_FILE = path.resolve('../meta_tags.yml');

export type { Facet, FacetInfo, TagRegistryFile } from '@galaxy-foundry/tag-registry';
export { buildTagIndex } from '@galaxy-foundry/tag-registry';

let cached: TagRegistry | undefined;

/** The parsed registry itself — what `buildKindContext` is handed, so the schema validates
 *  tags against a registry it was GIVEN rather than one it went and read. */
export function tagRegistry(): TagRegistry {
  if (!cached) cached = loadTagRegistry(TAGS_FILE);
  return cached;
}

// Five of the registry's accessors used to be re-exported here as free functions — `facets()`,
// `facetOf`, `facetLabel`, `tagDescription`, `isValidTag` — each the same call to the object
// above with the object taken out of the caller's hands. Nothing was gained and something was
// lost: the sibling instance passes the registry and calls those five as methods, so two repos
// consuming ONE package had disagreed about how to call it, and comparing their tag pages read
// as two designs rather than one design written twice. Callers take `tagRegistry()` and ask it.
