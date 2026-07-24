import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';

// Tag registry at the repo root (../meta_tags.yml), shared between the schema and the
// validator. The FORMAT is shared across Foundry instances — spec in galaxyproject/
// foundry-pattern, `content/pattern/standing-up-a-foundry.instructions.txt` — so treat a
// format change as a cross-repo change; the facet VOCABULARY (family/role/domain/topic)
// is ours alone.
const TAGS_FILE = path.resolve('../meta_tags.yml');

export interface Facet {
  label: string;
  description: string;
  values?: Record<string, string>;
}

export interface TagRegistry {
  version: number;
  facets: Record<string, Facet>;
}

interface TagEntry {
  /** The facet that DECLARED this tag — not whatever precedes its slash. */
  facet: string;
  gloss: string;
}

let cached: TagRegistry | undefined;
let cachedIndex: Map<string, TagEntry> | undefined;

function load(): TagRegistry {
  if (!cached) cached = yaml.load(fs.readFileSync(TAGS_FILE, 'utf-8')) as TagRegistry;
  return cached;
}

/**
 * Flatten a registry to `tag → { facet, gloss }`.
 *
 * This is the one place membership is decided, and it is decided by DECLARATION: a tag
 * is valid because some facet lists it under `values`, never because its text happens to
 * start with a facet name. So the slash in `domain/batch-effects` is a naming convention
 * rather than a rule, and a bare key (no slash) is an ordinary member of its facet.
 *
 * Exported for tests — a bare key must resolve exactly like a slashed one, and that
 * cannot be proven against the real registry while our vocabulary is entirely slashed.
 */
export function buildTagIndex(registry: TagRegistry): Map<string, TagEntry> {
  const index = new Map<string, TagEntry>();
  for (const [facet, f] of Object.entries(registry.facets ?? {}))
    for (const [tag, gloss] of Object.entries(f.values ?? {})) index.set(tag, { facet, gloss });
  return index;
}

function tagIndex(): Map<string, TagEntry> {
  if (!cachedIndex) cachedIndex = buildTagIndex(load());
  return cachedIndex;
}

/** A tag is valid when it is an exact key under some facet's `values`. Nothing else
 *  validates: every facet is closed, so every usable tag has a gloss to browse by. */
export function isValidTag(tag: string): boolean {
  return tagIndex().has(tag);
}

export interface FacetInfo {
  key: string;
  label: string;
  description: string;
}

/** Registry facets in declared order — the tag index groups by these. */
export function facets(): FacetInfo[] {
  return Object.entries(load().facets).map(([key, f]) => ({
    key,
    label: f.label,
    description: f.description,
  }));
}

/** The facet that declared this tag; undefined if unregistered. Callers group by this
 *  rather than by prefix, which is what makes an "other" bucket impossible. */
export function facetOf(tag: string): string | undefined {
  return tagIndex().get(tag)?.facet;
}

export function facetLabel(key: string | undefined): string {
  return (key && load().facets[key]?.label) || (key ?? '');
}

/** A tag's registry gloss. Every valid tag has one; undefined means unregistered. */
export function tagDescription(tag: string): string | undefined {
  return tagIndex().get(tag)?.gloss;
}
