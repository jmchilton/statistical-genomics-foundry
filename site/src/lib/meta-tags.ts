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

// The accessors below are for the PAGES (the tag index, the browse routes), which read the
// one real registry. The schema no longer goes through them — it is handed the registry
// object above instead.

/** A tag is valid when it is an exact key under some facet's `values`. Nothing else
 *  validates: every facet is closed, so every usable tag has a gloss to browse by. */
export const isValidTag = (tag: string): boolean => tagRegistry().isValidTag(tag);

/** Registry facets in declared order — the tag index groups by these. */
export const facets = () => tagRegistry().facets();

/** The facet that declared this tag; undefined if unregistered. Callers group by this
 *  rather than by prefix, which is what makes an "other" bucket impossible. */
export const facetOf = (tag: string): string | undefined => tagRegistry().facetOf(tag);

export const facetLabel = (key: string | undefined): string => tagRegistry().facetLabel(key);

/** A tag's registry gloss. Every valid tag has one; undefined means unregistered. */
export const tagDescription = (tag: string): string | undefined =>
  tagRegistry().tagDescription(tag);
