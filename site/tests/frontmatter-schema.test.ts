import { describe, it, expect } from 'vitest';
import { sourceNoteSchema, moldSchema, patternSchema } from '../src/lib/frontmatter-schema';

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
const validSourceNote = (overrides: Record<string, unknown> = {}) => ({
  title: 'A Note',
  type: 'paper',
  source_id: 'x-2020',
  source_url: 'https://example.org/x',
  access_date: '2026-01-01',
  license: 'MIT',
  attribution: 'X et al. 2020',
  derived: 'own-words-summary',
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
    expect(issuesOf(patternSchema, { type: 'pattern', name: 'double-dipping' })).toEqual([]);
  });

  it('rejects a non-corpus pole value', () => {
    const issues = atPath(issuesOf(patternSchema, { type: 'pattern', name: 'x', pole: 'neither' }), 'pole');
    expect(issues.length).toBeGreaterThan(0);
  });
});
