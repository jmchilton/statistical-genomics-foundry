// The `cast:` half of this instance's reference contract.
//
// `content/meta/casting.md` has always said what casting does here, and until now nothing
// checked it — the record's own words are "No caster exists here yet. The contract below is a
// commitment, written so that the code, when it lands, has something to be checked against."
// These are the first checks against it.
//
// The narrowing test is the one that matters. This Foundry declines `sidecar` from the
// inherited `modes` vocabulary because it would be a renderer nobody has written, and
// `casting.md` calls a narrowed vocabulary "a gate, not a note-to-self". A gate that exists
// only in prose is the note-to-self it says it isn't.

import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { loadCastReferenceContract } from '@galaxy-foundry/cast';
import { describe, expect, it } from 'vitest';

import { castContract, referenceKinds, SUPPORTED_MODES } from '../src/lib/reference-contract';

describe('how this Foundry says its kinds are cast', () => {
  it('declares a cast strategy for every kind it registers', () => {
    // A kind with no `cast:` block is vocabulary the site renders and a caster refuses. That is
    // a legitimate state — but not for a kind real Molds reference, which all three are.
    expect(Object.keys(castContract()).sort()).toEqual([...referenceKinds()].sort());
  });

  it('carries every kind verbatim, which is the only mode this instance admits', () => {
    for (const [kind, declaration] of Object.entries(castContract())) {
      expect(SUPPORTED_MODES, `${kind} defaults to a mode this instance declined`).toContain(
        declaration.default_mode,
      );
      expect(declaration.resolve, `${kind} resolves from something other than its note`).toBe(
        'note',
      );
    }
  });

  it('bundles no companion, because every companion here is foundry-only', () => {
    // `guidance.md` beside a paper or tutorial directs the summarizer. Shipping it would put
    // our reading instructions into a bundle as though they were the source.
    for (const [kind, declaration] of Object.entries(castContract())) {
      expect(declaration.companions, `${kind} would ship a companion`).toBe(false);
    }
  });
});

describe('a mode this instance declined is refused where it is declared', () => {
  it('rejects a kind defaulting to a mode outside the narrowed vocabulary', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'statgen-cast-'));
    try {
      const contract = path.join(dir, 'reference_contract.yml');
      writeFileSync(
        contract,
        [
          'kinds:',
          '  research:',
          '    label: Research',
          '    description: d',
          '    ref_shape: wiki-link',
          '    cast:',
          '      resolve: note',
          '      default_mode: sidecar',
          '      companions: false',
        ].join('\n'),
      );
      expect(() =>
        loadCastReferenceContract(contract, { narrow: { modes: SUPPORTED_MODES } }),
      ).toThrow(/sidecar/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
