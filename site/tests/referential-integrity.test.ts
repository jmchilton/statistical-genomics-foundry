import { describe, it, expect } from 'vitest';
import { checkReference, collectReferenceIssues, type Target } from '../src/lib/referential-integrity';

// Rung 4 (issue #89): cross-file referential integrity.
// Unit fixtures pin the two rules against a synthetic index; the corpus scan is the hard
// gate — every real ref must resolve and declare a license-permitted mode.

const index = new Map<string, Target>([
  ['double-dipping', { collection: 'patterns', id: 'double-dipping' }],
  ['leek-2010', { collection: 'papers', id: 'leek-2010', license: 'LicenseRef-all-rights-reserved' }], // allowed: condense
  ['nygaard-2016', { collection: 'papers', id: 'nygaard-2016', license: 'CC-BY-4.0' }], // allowed: verbatim/condense/sidecar
  ['deseq2', { collection: 'tutorials', id: 'deseq2', license: 'LGPL-3.0-or-later' }], // copyleft: verbatim/sidecar
]);
const ctx = { file: 'molds/x/index.md', collection: 'molds' };

describe('checkReference', () => {
  it('passes a resolvable ref with a permitted mode', () => {
    expect(checkReference({ kind: 'pattern', ref: '[[double-dipping]]', mode: 'condense' }, index, ctx)).toBeNull();
    expect(checkReference({ kind: 'research', ref: '[[nygaard-2016]]', mode: 'verbatim' }, index, ctx)).toBeNull();
  });

  it('flags an unresolvable ref', () => {
    const issue = checkReference({ kind: 'research', ref: '[[does-not-exist]]', mode: 'condense' }, index, ctx);
    expect(issue?.problem).toBe('unresolved');
  });

  it('flags a mode its target license forbids (own-words-only)', () => {
    const issue = checkReference({ kind: 'research', ref: '[[leek-2010]]', mode: 'verbatim' }, index, ctx);
    expect(issue?.problem).toBe('mode-forbidden');
    expect(issue?.detail).toMatch(/allowed: condense/);
  });

  it('flags condense against a copyleft target (no own-words launder)', () => {
    const issue = checkReference({ kind: 'research', ref: '[[deseq2]]', mode: 'condense' }, index, ctx);
    expect(issue?.problem).toBe('mode-forbidden');
  });

  it('does not resolve non-wiki-link refs (bare citation strings)', () => {
    expect(checkReference({ kind: 'research', ref: 'Leek et al. 2010', mode: 'condense' }, index, ctx)).toBeNull();
  });

  it('skips the mode check when the target carries no license (foundry leaf)', () => {
    expect(checkReference({ kind: 'pattern', ref: '[[double-dipping]]', mode: 'verbatim' }, index, ctx)).toBeNull();
  });
});

describe('corpus referential integrity', () => {
  it('every reference resolves and declares a permitted mode', () => {
    const issues = collectReferenceIssues();
    const lines = issues.map((i) => `${i.file}: ${i.ref} [${i.problem}] ${i.detail}`);
    expect(issues, `\n${lines.join('\n')}`).toEqual([]);
  });
});
