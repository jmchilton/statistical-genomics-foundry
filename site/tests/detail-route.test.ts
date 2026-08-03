// One route renders a note, and it covers every collection.
//
// A detail page is a small pile of decisions — index the body for search, show the tags, link back
// to the browse page, pick the field the title comes from — and each collection used to answer
// them in its own file. Nothing forces those files to agree, and the failure is not a broken page:
// it is a page that is locally complete and quietly missing one of the things a reader expects,
// which looks from inside that file exactly like a page with nothing wrong.
//
// That is not hypothetical here. Five collections carried tags and only Molds rendered chips, so
// four fifths of the corpus was listed on tag pages its own pages never mentioned. The check
// written against that asked whether each collection's directory contained a page rendering chips
// — a real rule, and one that can only ever be as complete as the list it walks. Under one route
// the question stops having five answers, so the rule below replaces it: a structural fix beats a
// check whenever it is available, because the check has to be maintained and the structure does
// not.
//
// The sibling instance arrived at the same shape from the other direction — one `[...slug].astro`
// dispatching on the note's `type` — and got there because its corpus is one collection. Ours is
// six, and the collapse is what makes the two instances the same shape rather than merely the same
// idea.

import { describe, expect, it } from 'vitest';

import { COLLECTION_NAMES } from '../src/lib/frontmatter-schema';
import { DETAIL_ROUTES } from '../src/lib/detail-routes';
import { siteRelative, siteSourceCode, siteSourceFiles } from './site-sources';

/** The one file allowed to render a note body. */
const DETAIL_ROUTE = 'src/pages/[collection]/[...slug].astro';

/**
 * `render(entry)` from `astro:content` is what turns a collection entry into a page — an index
 * lists entries, a detail page renders one. So this is the call that marks a detail route, and
 * counting it is how "how many places decide what a note looks like" becomes a number.
 *
 * Deliberately not a check for the string `getCollection`: every index page calls that, and a
 * rule that fired on them would have to carry a list of exceptions as long as the corpus.
 */
const RENDERS_A_NOTE = /\bawait render\(/;

describe('the detail route', () => {
  it('is the only page that renders a note body', () => {
    const renderers = siteSourceFiles()
      .filter((file) => RENDERS_A_NOTE.test(siteSourceCode(file)))
      .map(siteRelative)
      .sort();

    expect(
      renderers,
      '\npages that render a note body. Each one decides for itself whether the body is indexed' +
        ' for search, whether tags appear, and where the reader goes back to — and a page that' +
        ' answers one of those differently from the rest builds, validates, and looks correct in' +
        ' isolation.',
    ).toEqual([DETAIL_ROUTE]);
  });

  it('describes every collection', () => {
    // The route generates its paths from this table, so a collection missing here is a collection
    // with no detail pages at all — 404 from every tag chip and every index row pointing at it.
    const undescribed = COLLECTION_NAMES.filter((name) => !(name in DETAIL_ROUTES));

    expect(
      undescribed,
      `\ncollections in COLLECTIONS with no row in ${DETAIL_ROUTE}'s table.`,
    ).toEqual([]);
  });

  it('describes nothing that is not a collection', () => {
    // The other direction, which is the one that rots silently: a row for a collection that has
    // been renamed or removed generates nothing and reports nothing.
    const stale = Object.keys(DETAIL_ROUTES).filter(
      (name) => !(COLLECTION_NAMES as readonly string[]).includes(name),
    );

    expect(stale, '\nrows naming a collection that no longer exists.').toEqual([]);
  });
});
