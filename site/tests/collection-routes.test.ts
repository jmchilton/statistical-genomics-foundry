import fs from 'node:fs';
import { describe, it, expect } from 'vitest';
import { noteFiles } from '../src/lib/corpus-files';
import { COLLECTIONS, COLLECTION_NAMES, contentPath } from '../src/lib/frontmatter-schema';
import { buildWikiLinkMap } from '../src/lib/wiki-links';

// The collection KEY is the browse route, and the wiki-link map is built on that assumption.
//
// COLLECTIONS used to coexist with a hand-written route list in wiki-links.ts. Keeping the route
// inventory in one table removes that drift surface; these tests pin the shared rule.

describe('collection routes', () => {
  it('every collection is routed under its own key', () => {
    // This used to check that `src/pages/<name>` exists, which was how the URL came to start with
    // the collection key while each collection had its own detail route. One route generates them
    // all now, and the key reaches the URL through its `collection` param instead — so that is
    // what gets read. Point the param anywhere else and every wiki link into that collection goes
    // to a page that was never built.
    const route = fs.readFileSync('src/pages/[collection]/[...slug].astro', 'utf-8');
    expect(
      route,
      '\nthe detail route does not derive its route segment from the entry it is rendering.',
    ).toContain('collection: entry.collection');
  });

  it('every collection contributes its notes to the wiki-link map', () => {
    const map = buildWikiLinkMap();
    const empty = COLLECTION_NAMES.filter(
      (name) => noteFiles(name).length > 0 && ![...map.values()].some((t) => t.path.startsWith(`${name}/`)),
    );
    expect(empty, `\ncollections with notes but no link targets: ${empty.join(', ')}`).toEqual([]);
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
