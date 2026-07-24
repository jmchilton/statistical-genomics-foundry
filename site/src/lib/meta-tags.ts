import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';

// Tag registry at the repo root (../meta_tags.yml), shared between the schema and
// any future validator. Adapted from galaxyproject/foundry's meta_tags.yml, but
// namespaced (`family/*`, `role/*`, `domain/*`, `topic/*`).
const TAGS_FILE = path.resolve('../meta_tags.yml');

interface Namespace {
  label: string;
  description: string;
  values?: Record<string, string>;
}

interface TagRegistry {
  version: number;
  namespaces: Record<string, Namespace>;
}

let cached: TagRegistry | undefined;

function load(): TagRegistry {
  if (!cached) cached = yaml.load(fs.readFileSync(TAGS_FILE, 'utf-8')) as TagRegistry;
  return cached;
}

/** A tag is valid if its namespace is registered AND the full tag is an enumerated
 *  value of it. Every namespace is closed — there is no free-form/open escape hatch,
 *  so every tag the corpus can carry has a registry gloss to render and browse by. */
export function isValidTag(tag: string): boolean {
  const slash = tag.indexOf('/');
  if (slash < 0) return false;
  const ns = load().namespaces[tag.slice(0, slash)];
  return !!ns?.values && tag in ns.values;
}

export interface NamespaceInfo {
  key: string;
  label: string;
  description: string;
}

/** Registry namespaces in declared order — the tag index groups by these. */
export function namespaces(): NamespaceInfo[] {
  return Object.entries(load().namespaces).map(([key, ns]) => ({
    key,
    label: ns.label,
    description: ns.description,
  }));
}

export function namespaceLabel(key: string): string {
  return load().namespaces[key]?.label ?? key;
}

/** A tag's registry gloss. Every valid tag has one; undefined means unregistered. */
export function tagValueDescription(tag: string): string | undefined {
  const slash = tag.indexOf('/');
  if (slash < 0) return undefined;
  return load().namespaces[tag.slice(0, slash)]?.values?.[tag];
}
