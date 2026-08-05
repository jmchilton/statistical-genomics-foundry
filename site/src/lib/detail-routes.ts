// What a collection's detail page needs beyond the note itself.
//
// The detail route is one file (`src/pages/[collection]/[...slug].astro`) generating pages for
// every collection, so the handful of things that genuinely differ per collection are stated here
// as DATA rather than as six copies of a page that happen to disagree in three places.
//
// Two fields, and both earned their row: everything else a detail page does — index the body for
// search, render the tag chips, render the prose — every collection already did identically, and
// a difference no collection has is not a difference worth a column. The kind-specific furniture
// (a Mold's companion files, a Pattern's pole, a source note's provenance box) is dispatched in
// the route on `entry.collection`, because it is markup rather than configuration and the sibling
// instance's catch-all route dispatches its note types the same way.
//
// Keyed by collection name, checked against `COLLECTIONS` in both directions by
// `tests/detail-route.test.ts` — a collection with no row here has no detail pages, which every
// tag chip and index row pointing at it discovers as a 404 and nothing else reports.

import type { CollectionName } from './frontmatter-schema';

export interface DetailRoute {
  /**
   * The browse page above this collection, if a reader can go up from here. Written as a
   * site-relative path; the route prefixes the deployment base, which is the one place that
   * happens.
   */
  back?: { path: string; label: string };
  /**
   * Whether the page states the note's own title and summary — as a heading above the prose, and
   * as the document description.
   *
   * True for the design record, whose markdown bodies open straight into the argument. Every
   * other collection's notes open with their own `#` heading, so a page-supplied one would render
   * the title twice.
   */
  lede?: boolean;
}

// Annotated rather than `as const satisfies`: the literal type of a row with no fields is `{}`,
// and a union containing it has no `back` to ask about — so the route could not read its own
// table without narrowing per collection, which is the six-way branch this file exists to remove.
// The annotation still closes both directions: `Record<CollectionName, …>` fails on a missing
// collection, and an object literal fails on a field `DetailRoute` does not declare.
export const DETAIL_ROUTES: Record<CollectionName, DetailRoute> = {
  meta: { back: { path: '/design/', label: 'Design record' }, lede: true },
  books: {},
  papers: {},
  tutorials: {},
  molds: { back: { path: '/molds/', label: 'Molds' } },
  patterns: { back: { path: '/patterns/', label: 'Patterns' } },
};
