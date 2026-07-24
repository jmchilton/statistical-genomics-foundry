import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { describe, it, expect } from 'vitest';
import { COLLECTIONS } from '../src/lib/frontmatter-schema';
import { facets, facetOf } from '../src/lib/meta-tags';
import { referenceKinds } from '../src/lib/reference-contract';

// The registries and the corpus must agree BOTH ways.
//
// The schema already rejects a note carrying an unregistered value; that is the easy
// direction. This file asserts the other one — that nothing we AUTHORED is carried by
// zero notes. Dead vocabulary is drift you otherwise only find by diffing two instances
// by hand, which is exactly the manual pass this check exists to retire
// (galaxyproject/foundry-pattern#12).
//
// Scope is deliberate: only the per-instance vocabularies. The inherited registries
// (license-policy.yml, and reference_contract.yml's used_at/load/modes/evidence) are
// copied complete and deliberately carry rows this corpus does not use yet — unused
// entries there are inheritance, not drift, and asserting on them would cry wolf.

function walkIndexFiles(baseAbs: string): string[] {
  if (!fs.existsSync(baseAbs)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(baseAbs, { withFileTypes: true })) {
    const full = path.join(baseAbs, entry.name);
    if (entry.isDirectory()) out.push(...walkIndexFiles(full));
    else if (entry.isFile() && entry.name === 'index.md') out.push(full);
  }
  return out;
}

interface NoteFrontmatter {
  tags?: unknown;
  references?: unknown;
}

function allFrontmatter(): NoteFrontmatter[] {
  const out: NoteFrontmatter[] = [];
  for (const { base } of Object.values(COLLECTIONS))
    for (const file of walkIndexFiles(path.resolve(base))) {
      const match = fs.readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
      if (!match) continue;
      const data = yaml.load(match[1]);
      if (data && typeof data === 'object' && !Array.isArray(data)) out.push(data as NoteFrontmatter);
    }
  return out;
}

const notes = allFrontmatter();

const tagsInUse = new Set(
  notes.flatMap(n => (Array.isArray(n.tags) ? n.tags.filter((t): t is string => typeof t === 'string') : [])),
);

const kindsInUse = new Set(
  notes.flatMap(n =>
    Array.isArray(n.references)
      ? n.references
          .map(r => (r && typeof r === 'object' ? (r as { kind?: unknown }).kind : undefined))
          .filter((k): k is string => typeof k === 'string')
      : [],
  ),
);

const registeredTags = () =>
  Object.values(
    (
      yaml.load(fs.readFileSync(path.resolve('../meta_tags.yml'), 'utf-8')) as {
        facets: Record<string, { values?: Record<string, string> }>;
      }
    ).facets,
  ).flatMap(f => Object.keys(f.values ?? {}));

describe('registry drift (authored vocabulary vs corpus)', () => {
  // Guards the walk itself: if the frontmatter reader silently stopped matching, every
  // set below would be empty and every assertion would pass vacuously.
  it('found tags and reference kinds to check', () => {
    expect(notes.length).toBeGreaterThan(0);
    expect(tagsInUse.size).toBeGreaterThan(0);
    expect(kindsInUse.size).toBeGreaterThan(0);
  });

  it('has no registered tag carried by zero notes', () => {
    const dead = registeredTags().filter(t => !tagsInUse.has(t));
    expect(dead, `\nregistered but unused: ${dead.join(', ')}`).toEqual([]);
  });

  // A facet whose members are all unused renders as nothing on /tags — it is a browse
  // axis that exists only in the registry.
  it('has no facet with zero members in use', () => {
    const empty = facets()
      .map(f => f.key)
      .filter(key => ![...tagsInUse].some(t => facetOf(t) === key));
    expect(empty, `\nfacets with no tags in use: ${empty.join(', ')}`).toEqual([]);
  });

  // `kinds` is the one reference-contract vocabulary this instance trims rather than
  // inherits, so it is ours to keep honest — and it is now exactly the kinds real Molds
  // reference. Re-add a kind when a Mold needs it, not before.
  it('has no reference kind used by zero notes', () => {
    const dead = referenceKinds().filter(k => !kindsInUse.has(k));
    expect(dead, `\nreference kinds registered but unused: ${dead.join(', ')}`).toEqual([]);
  });
});
