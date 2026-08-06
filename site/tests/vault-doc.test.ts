import path from 'node:path';
import { describe, it, expect } from 'vitest';

import { renderVaultDoc } from '../src/lib/render-vault-doc';
import { getLicenses } from '../src/lib/licenses';
import { buildWikiLinkMap } from '../src/lib/wiki-links';
import { DESIGN_DOCS, getDesignDoc, renderDesignDoc } from '../src/lib/design-docs';

// The glossary and the design docs render OUTSIDE the remark pipeline — `marked` over a file no
// collection owns — so the `[[Target]]` rule has to be held on the string layer. It was not: a
// bare regex over the raw markdown rewrote inside code spans, and the entry it corrupted was the
// glossary's own definition of the syntax. Nothing reported it; the validator strips code spans
// before scanning, so both surfaces went blind on the same text.
//
// Held against the REAL glossary rather than a fixture: the assertion is that the corpus we
// actually ship renders correctly, and a fixture would have passed all along.

const BASE = '/statistical-genomics-foundry';
const GLOSSARY = path.resolve('../content/meta/glossary.md');

const glossaryHtml = (): string =>
  renderVaultDoc(GLOSSARY, buildWikiLinkMap(DESIGN_DOCS), BASE);

describe('rendering the glossary', () => {
  it('renders a backticked link as the token it names, not as a resolved one', () => {
    expect(glossaryHtml()).toContain('<code>[[Target]]</code>');
  });

  it('leaves no bold fallback inside a code span', () => {
    const stranded = [...glossaryHtml().matchAll(/<code>([^<]*)<\/code>/g)]
      .map((m) => m[1])
      .filter((code) => code.includes('**'));
    expect(stranded, `\ncode spans carrying a bold fallback: ${stranded.join(', ')}`).toEqual([]);
  });

  it('still mints an anchor id per term, so #term deep links resolve', () => {
    expect(glossaryHtml()).toContain('<p id="wiki-link">');
  });

});

// The licenses reader is now @galaxy-foundry/license-policy's; what stays ours is WHERE the
// directory is, which the package takes as a parameter. That composition point is the only thing
// worth asserting here — a wrong path reads as an empty directory, not as an error.
describe('the LICENSES directory', () => {
  it('resolves to the repo root from the site cwd', () => {
    const licenses = getLicenses();
    expect(licenses.length).toBeGreaterThan(0);
    expect(licenses.map((l) => l.id)).toContain('msmb');
  });
});

// Non-vacuity for the assertions above: if resolution stopped happening at all, every one of
// them would still pass. The glossary cannot carry that baseline — its only `[[...]]` is the
// backticked one — so it comes from a design doc, which renders through the same string layer.
describe('rendering a design doc', () => {
  it('still resolves a real wiki link in prose', () => {
    const doc = getDesignDoc('double-dipping-survey');
    expect(doc, 'the design doc this baseline reads was renamed or removed').toBeDefined();
    const html = renderDesignDoc(doc!, buildWikiLinkMap(DESIGN_DOCS), BASE);
    expect(html).toMatch(new RegExp(`<a href="${BASE}/[^"]+"`));
  });
});
