import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { describe, it, expect } from 'vitest';
import { noteFiles } from '../src/lib/corpus-files';
import {
  COLLECTIONS,
  COLLECTION_NAMES,
  NOTE_KINDS,
  contentPath,
  type NoteKind,
} from '../src/lib/frontmatter-schema';
import { tagRegistry } from '../src/lib/meta-tags';
import { groupTagsInUse } from '../src/lib/tag-browse';
import { NARROWED_GROUPS, referenceKinds, referenceModes } from '../src/lib/reference-contract';

// The registries and the corpus must agree BOTH ways.
//
// The schema already rejects a note carrying an unregistered value; that is the easy
// direction. This file asserts the other one — that nothing we AUTHORED is carried by
// zero notes. Dead vocabulary is drift you otherwise only find by diffing two instances
// by hand, which is exactly the manual pass this check exists to retire
// (galaxyproject/foundry-pattern#12).
//
// Scope is deliberate: only the vocabularies this instance authors. A registry we inherit
// whole — the installed @galaxy-foundry/license-policy table, and the reference contract's
// used_at/load/evidence — arrives complete and carries rows this corpus does not use yet.
// Unused entries there are inheritance, not drift, and asserting on them would cry wolf.
//
// NARROWING moves a group across that line. `modes` is inherited but declined down to what
// our caster will support, and a term we chose to keep is a term we authored — so it owes
// the same account of itself that `kinds` does.

interface NoteFrontmatter {
  type?: unknown;
  tags?: unknown;
  references?: unknown;
}

function allFrontmatter(): NoteFrontmatter[] {
  const out: NoteFrontmatter[] = [];
  for (const name of COLLECTION_NAMES)
    for (const rel of noteFiles(name)) {
      const text = fs.readFileSync(contentPath(rel), 'utf8');
      const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
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

// Note kinds (the `type:` discriminator) — distinct from the REFERENCE kinds below, which
// are a reference_contract.yml vocabulary. Both are called "kind"; only these name a note.
const noteKindsInUse = new Set(notes.map(n => n.type).filter((t): t is string => typeof t === 'string'));

const refField = (field: 'kind' | 'mode') =>
  new Set(
    notes.flatMap(n =>
      Array.isArray(n.references)
        ? n.references
            .map(r => (r && typeof r === 'object' ? (r as Record<string, unknown>)[field] : undefined))
            .filter((k): k is string => typeof k === 'string')
        : [],
    ),
  );

const referenceKindsInUse = refField('kind');
const referenceModesInUse = refField('mode');

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
  it('found tags, note kinds and reference kinds to check', () => {
    expect(notes.length).toBeGreaterThan(0);
    expect(tagsInUse.size).toBeGreaterThan(0);
    expect(noteKindsInUse.size).toBeGreaterThan(0);
    expect(referenceKindsInUse.size).toBeGreaterThan(0);
    expect(referenceModesInUse.size).toBeGreaterThan(0);
  });

  it('has no registered tag carried by zero notes', () => {
    const dead = registeredTags().filter(t => !tagsInUse.has(t));
    expect(dead, `\nregistered but unused: ${dead.join(', ')}`).toEqual([]);
  });

  // A facet whose members are all unused renders as nothing on /tags — it is a browse axis that
  // exists only in the registry. Asked OF the grouping rather than recomputed alongside it: this
  // check reasons about what the tags index shows, and it used to reach that conclusion by its
  // own route, which is a second answer to the question dressed up as a test of the first.
  it('has no facet with zero members in use', () => {
    const registry = tagRegistry();
    const shown = new Set(
      groupTagsInUse(registry, new Map([...tagsInUse].map(t => [t, 1] as const))).map(g => g.key),
    );
    const empty = registry
      .facets()
      .map(f => f.key)
      .filter(key => !shown.has(key));
    expect(empty, `\nfacets with no tags in use: ${empty.join(', ')}`).toEqual([]);
  });

  // `kinds` is the one reference-contract vocabulary this instance trims rather than
  // inherits, so it is ours to keep honest — and it is now exactly the kinds real Molds
  // reference. Re-add a kind when a Mold needs it, not before.
  it('has no reference kind used by zero notes', () => {
    const dead = referenceKinds().filter(k => !referenceKindsInUse.has(k));
    expect(dead, `\nreference kinds registered but unused: ${dead.join(', ')}`).toEqual([]);
  });

  // The narrowed half of `modes`. Keeping a mode we decline to build is the same mistake as
  // registering a kind no Mold references — it advertises a caster capability that does not
  // exist.
  it('has no supported reference mode used by zero notes', () => {
    const dead = referenceModes().filter(m => !referenceModesInUse.has(m));
    expect(dead, `\nreference modes registered but unused: ${dead.join(', ')}`).toEqual([]);
  });

  // Guards the two checks above against the drift they exist to catch. Narrowing a third
  // group later is a one-line edit in reference-contract.ts; without this, that group would
  // silently go unchecked and the omission would look exactly like a decision.
  it('drift-checks every group this instance narrows', () => {
    expect([...NARROWED_GROUPS].sort()).toEqual(['kinds', 'modes']);
  });

  // The same both-ways rule applied to the note kinds. A kind defined in NOTE_KINDS but
  // declared by no note is a schema with no corpus — the per-kind docs and examples a kind
  // catalog renders would describe something that does not exist here.
  it('has no note kind declared by zero notes', () => {
    const dead = Object.keys(NOTE_KINDS).filter(k => !noteKindsInUse.has(k));
    expect(dead, `\nnote kinds defined but unused: ${dead.join(', ')}`).toEqual([]);
  });

  // The converse of "every kind has notes": every kind must have somewhere to PUT notes.
  // A kind no collection routes to is unauthorable — its schema can never run, so the
  // check above would be the only thing that ever noticed.
  it('routes every note kind to at least one collection', () => {
    const routed = new Set(Object.values(COLLECTIONS).map(c => c.kind));
    const unroutable = Object.keys(NOTE_KINDS).filter(k => !routed.has(k as NoteKind));
    expect(unroutable, `\nnote kinds with no collection: ${unroutable.join(', ')}`).toEqual([]);
  });
});
