import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';

// Tag registry at the repo root (../meta_tags.yml), shared between the schema and
// any future validator. Adapted from galaxyproject/foundry's meta_tags.yml, but
// namespaced (`family/*`, `role/*`, `domain/*`).
const TAGS_FILE = path.resolve('../meta_tags.yml');

interface Namespace {
  label: string;
  description: string;
  values?: Record<string, string>;
  open?: boolean;
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

const OPEN_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** A tag is valid if its namespace is registered and either the full tag is an
 *  enumerated value, or the namespace is `open` and the leaf is a kebab-case slug. */
export function isValidTag(tag: string): boolean {
  const slash = tag.indexOf('/');
  if (slash < 0) return false;
  const ns = load().namespaces[tag.slice(0, slash)];
  if (!ns) return false;
  if (ns.values && tag in ns.values) return true;
  if (ns.open) return OPEN_SLUG_RE.test(tag.slice(slash + 1));
  return false;
}
