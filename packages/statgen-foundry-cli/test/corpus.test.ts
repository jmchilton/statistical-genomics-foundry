// The corpus read, against the real corpus.
//
// Fixtures would prove the walk visits directories, which was never the risk. The risk is that
// the caster and the site disagree about what a slug names — and only the actual content tree
// has the two shapes that disagreement hides in: the flat `meta` records and the nested
// research notes.

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { readCorpus } from '../src/corpus.js';

const repoRoot = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const corpus = readCorpus(repoRoot);

describe('what a slug names', () => {
  it('keys a directory-shaped note by its directory, not by index', () => {
    expect(corpus.slugMap.get('audit-wgd-inference')).toBe('content/molds/audit-wgd-inference/index.md');
  });

  it('keys a flat design record by its name, extension stripped', () => {
    // `meta` is the one collection whose notes are flat files. Stripping only `/index.md` left
    // `architecture.md` slugged as `architecturemd`, and every `[[architecture]]` in the corpus
    // rendered as bold text instead of a link. The site learned this once.
    expect(corpus.slugMap.get('architecture')).toBe('content/meta/architecture.md');
    expect([...corpus.slugMap.keys()].filter((k) => k.endsWith('md')).length).toBe(0);
  });

  it('flattens a nested research id the way a wiki link writes it', () => {
    // `research/papers/x/index.md` is the id `x`; a book chapter is `msmb/chap1`, slugged with
    // the separator collapsed, because that is what `[[msmb-chap1]]` has to find.
    const slug = [...corpus.slugMap.entries()].find(([, p]) =>
      p.startsWith('content/research/books/'),
    );
    expect(slug?.[0]).not.toContain('/');
  });

  it('leaves out the glossary, which shares meta/ and is not a note', () => {
    expect(corpus.slugMap.get('glossary')).toBeUndefined();
  });
});

describe('what the caster reads off each note', () => {
  it('carries the frontmatter every note was routed by', () => {
    expect(corpus.metaByPath.get('content/molds/audit-wgd-inference/index.md')?.type).toBe('mold');
  });

  it('types the research corpus by publication shape, not by the kind that cites it', () => {
    // The reason `research` declares `note_types` in reference_contract.yml. If this ever
    // reports `research`, that declaration is dead weight and should go.
    const paper = [...corpus.metaByPath.entries()].find(([p]) =>
      p.startsWith('content/research/papers/'),
    );
    expect(paper?.[1].type).toBe('paper');
  });

  it('reads every routed note exactly once', () => {
    expect(corpus.metaByPath.size).toBe(corpus.slugMap.size);
  });
});
