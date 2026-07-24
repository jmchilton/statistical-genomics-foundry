import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import yaml from 'js-yaml';
import { sourceNoteSchema, moldSchema, patternSchema } from '../src/lib/frontmatter-schema';
import { buildTagIndex, facetOf, type TagRegistry } from '../src/lib/meta-tags';

// Negative-fixtures table: each deliberately-broken frontmatter asserts the SPECIFIC
// error it must raise, against the same schema the site builds with (issue #89 rung 3).
// Positive baselines guard against the fixtures failing for the wrong reason.

const issuesOf = (schema: { safeParse: (v: unknown) => any }, value: unknown) => {
  const r = schema.safeParse(value);
  return r.success ? [] : (r.error.issues as Array<{ path: (string | number)[]; message: string }>);
};
const atPath = (issues: ReturnType<typeof issuesOf>, p: string) =>
  issues.filter((i) => i.path.join('.') === p);

// own-words note under a permissive license: no verbatim carry, so no license_file needed.
// Carries a facet tag so it satisfies the `tags` min(1) rule (issue #100) by default.
const validSourceNote = (overrides: Record<string, unknown> = {}) => ({
  title: 'A Note',
  type: 'paper',
  source_id: 'x-2020',
  source_url: 'https://example.org/x',
  access_date: '2026-01-01',
  license: 'MIT',
  attribution: 'X et al. 2020',
  derived: 'own-words-summary',
  tags: ['domain/batch-effects'],
  ...overrides,
});

const validReference = (overrides: Record<string, unknown> = {}) => ({
  kind: 'research',
  ref: 'leek-2010',
  used_at: 'cast-time',
  load: 'upfront',
  mode: 'condense',
  evidence: 'corpus-observed',
  ...overrides,
});

const validMold = (overrides: Record<string, unknown> = {}) => ({
  type: 'mold',
  name: 'double-dip-referee',
  tags: ['family/b', 'role/critique'],
  references: [validReference()],
  ...overrides,
});

describe('sourceNote schema', () => {
  it('accepts a minimal own-words note', () => {
    expect(issuesOf(sourceNoteSchema, validSourceNote())).toEqual([]);
  });

  // The #87-class footgun: an unquoted `access_date: 2026-07-13` parses to a Date, not a
  // string, and used to survive until deploy. z.string() must reject it.
  it('rejects an unquoted date (YAML Date, not string) in a required field', () => {
    const issues = issuesOf(sourceNoteSchema, validSourceNote({ access_date: new Date('2026-07-13') }));
    expect(atPath(issues, 'access_date').length).toBeGreaterThan(0);
  });

  it('rejects a missing required field', () => {
    const bad = validSourceNote();
    delete (bad as Record<string, unknown>).license;
    expect(atPath(issuesOf(sourceNoteSchema, bad), 'license').length).toBeGreaterThan(0);
  });

  it('rejects an unknown license id', () => {
    const issues = atPath(issuesOf(sourceNoteSchema, validSourceNote({ license: 'not-a-real-license' })), 'license');
    expect(issues.some((i) => /SPDX|license-policy/.test(i.message))).toBe(true);
  });

  it('flags a LicenseRef that resolves to the defect/default row', () => {
    const issues = atPath(issuesOf(sourceNoteSchema, validSourceNote({ license: 'LicenseRef-unregistered-xyz' })), 'license');
    expect(issues.some((i) => /default row|defect/.test(i.message))).toBe(true);
  });

  it('rejects verbatim carry under an own-words-only (NC) license', () => {
    const issues = atPath(
      issuesOf(sourceNoteSchema, validSourceNote({ license: 'CC-BY-NC-4.0', derived: 'license-aware-summary' })),
      'derived',
    );
    expect(issues.some((i) => /own-words-only/.test(i.message))).toBe(true);
  });

  it('requires a license_file when carrying verbatim under a verbatim-ok license', () => {
    const issues = atPath(
      issuesOf(sourceNoteSchema, validSourceNote({ license: 'CC-BY-4.0', derived: 'license-aware-summary' })),
      'license_file',
    );
    expect(issues.some((i) => /license_file/.test(i.message))).toBe(true);
  });

  it('accepts a registered tag', () => {
    expect(issuesOf(sourceNoteSchema, validSourceNote({ tags: ['domain/batch-effects'] }))).toEqual([]);
  });

  // issue #100: `tags` is min(1) — an empty array (or omitted tags) fails, so every
  // note carries ≥1 facet. The negative fixture the issue asks for.
  it('rejects an empty tags array (min 1)', () => {
    const issues = atPath(issuesOf(sourceNoteSchema, validSourceNote({ tags: [] })), 'tags');
    expect(issues.some((i) => /≥1 facet tag|meta_tags\.yml/.test(i.message))).toBe(true);
  });

  it('rejects a note with no tags field (min 1)', () => {
    const bad = validSourceNote();
    delete (bad as Record<string, unknown>).tags;
    expect(atPath(issuesOf(sourceNoteSchema, bad), 'tags').length).toBeGreaterThan(0);
  });

  it('rejects an unregistered tag on a source note', () => {
    const issues = atPath(issuesOf(sourceNoteSchema, validSourceNote({ tags: ['not/a-real-namespace'] })), 'tags.0');
    expect(issues.some((i) => /meta_tags\.yml/.test(i.message))).toBe(true);
  });

  // domain/* is a closed enum: a known prefix with an unregistered leaf is drift,
  // not a free-form slug. Guards the closed-registry posture.
  it('rejects an unregistered leaf under the closed domain namespace', () => {
    const issues = atPath(issuesOf(sourceNoteSchema, validSourceNote({ tags: ['domain/not-a-real-domain'] })), 'tags.0');
    expect(issues.some((i) => /meta_tags\.yml/.test(i.message))).toBe(true);
  });
});

const readRegistry = () =>
  yaml.load(fs.readFileSync(path.resolve('../meta_tags.yml'), 'utf-8')) as {
    facets: Record<string, { values?: Record<string, string>; [k: string]: unknown }>;
  };

// EVERY facet is closed, forever: every tag the corpus can carry must have a registry
// gloss to document and browse by. The loader does not honor `open:`, so a re-added
// `open: true` would be a SILENT no-op — this asserts the registry never grows one,
// turning that silent footgun into a failing test.
describe('closed-registry invariant', () => {
  it('declares no open facets in meta_tags.yml', () => {
    const open = Object.entries(readRegistry().facets)
      .filter(([, f]) => 'open' in f)
      .map(([key]) => key);
    expect(open).toEqual([]);
  });

  it('gives every registered tag a non-empty gloss', () => {
    const undocumented = Object.values(readRegistry().facets).flatMap(f =>
      Object.entries(f.values ?? {})
        .filter(([, gloss]) => !gloss || !String(gloss).trim())
        .map(([tag]) => tag),
    );
    expect(undocumented).toEqual([]);
  });
});

// Membership is DECLARED, not parsed off the `/` prefix. Against the real registry a
// bare tag is indistinguishable from an unregistered one (both invalid), so the shared
// format's key property is proven here on a synthetic registry instead.
describe('declared membership (shared registry format)', () => {
  const synthetic: TagRegistry = {
    version: 1,
    facets: {
      meta: { label: 'Meta', description: 'Foundry-meta notes.', values: { meta: 'A meta note.' } },
      domain: { label: 'Domain', description: 'Subject area.', values: { 'domain/x': 'An X.' } },
    },
  };

  it('resolves a bare key exactly like a slashed one', () => {
    const index = buildTagIndex(synthetic);
    expect(index.get('meta')).toEqual({ facet: 'meta', gloss: 'A meta note.' });
    expect(index.get('domain/x')).toEqual({ facet: 'domain', gloss: 'An X.' });
  });

  // A tag whose text starts with a facet name but which no facet declares must NOT
  // validate — otherwise membership would be prefix-parsing wearing a new name.
  it('does not admit an undeclared tag that merely looks namespaced', () => {
    expect(buildTagIndex(synthetic).has('domain/unlisted')).toBe(false);
  });

  it('attributes each real tag to the facet that declared it', () => {
    expect(facetOf('domain/batch-effects')).toBe('domain');
    expect(facetOf('family/b')).toBe('family');
    expect(facetOf('domain/not-a-real-domain')).toBeUndefined();
  });

  // The /tags index groups by declaring facet, so every tag in use must resolve to one
  // — a tag that resolved to none would silently vanish from the browse surface.
  it('gives every registered tag a declaring facet', () => {
    const orphans = Object.values(readRegistry().facets)
      .flatMap(f => Object.keys(f.values ?? {}))
      .filter(tag => facetOf(tag) === undefined);
    expect(orphans).toEqual([]);
  });
});

describe('reference manifest (via mold schema)', () => {
  it('accepts a minimal mold with a valid reference', () => {
    expect(issuesOf(moldSchema, validMold())).toEqual([]);
  });

  // The 22%-drift class: `eager`/`always` were invented synonyms for `upfront`.
  it('rejects an out-of-vocabulary load value', () => {
    const issues = issuesOf(moldSchema, validMold({ references: [validReference({ load: 'eager' })] }));
    expect(issues.some((i) => i.path.join('.').startsWith('references.0.load'))).toBe(true);
  });

  it('requires a trigger for an on-demand reference', () => {
    const issues = issuesOf(moldSchema, validMold({ references: [validReference({ load: 'on-demand' })] }));
    expect(issues.some((i) => /requires a trigger/.test(i.message))).toBe(true);
  });

  it('requires a verification for a hypothesis-evidence reference', () => {
    const issues = issuesOf(moldSchema, validMold({ references: [validReference({ evidence: 'hypothesis' })] }));
    expect(issues.some((i) => /requires a verification/.test(i.message))).toBe(true);
  });

  it('rejects an unknown key on a reference (strict manifest)', () => {
    const issues = issuesOf(moldSchema, validMold({ references: [validReference({ loade: 'upfront' })] }));
    expect(issues.some((i) => i.message.toLowerCase().includes('unrecognized'))).toBe(true);
  });

  it('rejects a tag not registered in meta_tags.yml', () => {
    const issues = issuesOf(moldSchema, validMold({ tags: ['not/a-real-namespace'] }));
    expect(issues.some((i) => /meta_tags\.yml/.test(i.message))).toBe(true);
  });

  it('rejects a mold missing its name', () => {
    const bad = validMold();
    delete (bad as Record<string, unknown>).name;
    expect(atPath(issuesOf(moldSchema, bad), 'name').length).toBeGreaterThan(0);
  });
});

describe('pattern schema', () => {
  it('accepts a minimal pattern', () => {
    expect(issuesOf(patternSchema, { type: 'pattern', name: 'double-dipping', tags: ['domain/statistical-inference'] })).toEqual([]);
  });

  // issue #100: patterns are min(1) too — a tagless pattern fails.
  it('rejects a pattern with no tags (min 1)', () => {
    expect(atPath(issuesOf(patternSchema, { type: 'pattern', name: 'x' }), 'tags').length).toBeGreaterThan(0);
  });

  it('rejects a non-corpus pole value', () => {
    const issues = atPath(issuesOf(patternSchema, { type: 'pattern', name: 'x', pole: 'neither', tags: ['domain/batch-effects'] }), 'pole');
    expect(issues.length).toBeGreaterThan(0);
  });

  it('rejects an unregistered tag on a pattern', () => {
    const issues = atPath(issuesOf(patternSchema, { type: 'pattern', name: 'x', tags: ['not/a-real-namespace'] }), 'tags.0');
    expect(issues.some((i) => /meta_tags\.yml/.test(i.message))).toBe(true);
  });
});
