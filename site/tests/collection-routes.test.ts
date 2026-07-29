import fs from 'node:fs';
import { describe, it, expect } from 'vitest';
import { noteFiles, noteIds } from '../src/lib/content-files';
import { COLLECTIONS, COLLECTION_NAMES, contentPath } from '../src/lib/frontmatter-schema';
import { buildWikiLinkMap } from '../src/lib/wiki-links';

// The collection KEY is the browse route, and the wiki-link map is built on that assumption.
//
// It used to be stated twice — COLLECTIONS keyed the loaders, and wiki-links.ts carried its own
// list of `{ dir, route }` rows. The two agreed on five collections and differed on the sixth:
// `experiments` had a real `/experiments/<id>` page and twelve notes, and resolved from no
// `[[link]]`. Nothing failed. A browse route existed, the notes rendered, and the links into
// them silently did not.
//
// Dropping the second list removes the chance to disagree; these tests are what make dropping
// it safe, by pinning the rule the first list now carries alone.

describe('collection routes', () => {
  it('every collection has a page route named after its key', () => {
    const missing = COLLECTION_NAMES.filter((name) => !fs.existsSync(`src/pages/${name}`));
    expect(missing, `\nno src/pages/<name> for: ${missing.join(', ')}`).toEqual([]);
  });

  it('every collection contributes its notes to the wiki-link map', () => {
    const map = buildWikiLinkMap();
    const empty = COLLECTION_NAMES.filter(
      (name) => noteFiles(name).length > 0 && ![...map.values()].some((t) => t.path.startsWith(`${name}/`)),
    );
    expect(empty, `\ncollections with notes but no link targets: ${empty.join(', ')}`).toEqual([]);
  });

  // The regression that motivated all of this, named so it cannot come back quietly.
  it('resolves a link into experiments, which the second table used to omit', () => {
    const ids = noteIds('experiments');
    expect(ids.length).toBeGreaterThan(0);
    const map = buildWikiLinkMap();
    const unresolved = ids.filter((id) => !map.has(id.replace(/\//g, '-')));
    expect(unresolved, `\nunresolvable experiment ids: ${unresolved.join(', ')}`).toEqual([]);
  });
});

// `contentPath` is exercised here rather than assumed: every path above is content-relative, and
// a frame that did not resolve to a real file would make each check pass on an empty list.
describe('the content frame', () => {
  it('resolves each collection base to a directory that exists', () => {
    const missing = COLLECTION_NAMES.filter(
      (name) => !fs.existsSync(contentPath(COLLECTIONS[name].base)),
    );
    expect(missing, `\nbases that do not resolve: ${missing.join(', ')}`).toEqual([]);
  });
});
