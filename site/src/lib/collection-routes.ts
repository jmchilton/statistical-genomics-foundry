// Where each collection's notes live, and what counts as one.
//
// Split from frontmatter-schema.ts, which is the schema ASSEMBLER: reaching this table through
// that module also pulls in the kind definitions and the registries they close over, and the
// registries read `meta_tags.yml` relative to the site cwd. That is correct for every consumer
// that runs from `site/` and fatal for one that does not — the caster runs from the repo root,
// where `../meta_tags.yml` is outside the repository.
//
// Nothing here imports anything but a type, which is what makes the table answerable from
// anywhere. `COLLECTIONS` in frontmatter-schema.ts is still the one consumers inside the site
// use; it is these rows with each kind's schema attached.

import type { CollectionRoute } from '@galaxy-foundry/kind-schema/collections';

/**
 * Single source for the collection ⇒ (base, pattern, kind) mapping, so every consumer routes
 * files the same way: the Astro loaders, the corpus validator, the registry-drift walk, the
 * wiki-link map, and the caster's corpus read.
 *
 * `base` is CONTENT-RELATIVE, not site-relative. The shared matcher takes `base` as a plain
 * prefix and leaves the frame to the caller, requiring only that it be one frame for every row —
 * so the frame is the one that survives leaving `site/`.
 *
 * `pattern` is the note-selecting glob, stated per row rather than assumed. It is `**​/index.md`
 * everywhere but `meta`, and it was written out four separate times before it lived here.
 *
 * The KEY is also the browse route. Derived rather than stored, and pinned by a test, because a
 * `route` column that always equalled the key is a second name for one thing.
 */
export const COLLECTION_ROUTES = {
  // The design record. `glossary.md` shares the directory and is deliberately NOT a note: it
  // is hand-curated, alphabetical, and rendered by its own page. Excluded HERE, in the routing
  // table, rather than by each consumer — the validator has to honour it too, and an exclusion
  // written in the site's loader alone would start failing the glossary in the corpus walk.
  //
  // Also the only row whose pattern is not `**/index.md`: a design record is a flat file.
  meta: { base: 'meta', pattern: ['*.md', '!glossary.md'], kind: 'meta' },
  books: { base: 'research/books', pattern: ['**/index.md'], kind: 'book' },
  papers: { base: 'research/papers', pattern: ['**/index.md'], kind: 'paper' },
  tutorials: { base: 'research/tutorials', pattern: ['**/index.md'], kind: 'tutorial' },
  molds: { base: 'molds', pattern: ['**/index.md'], kind: 'mold' },
  patterns: { base: 'patterns', pattern: ['**/index.md'], kind: 'pattern' },
} as const satisfies Record<string, CollectionRoute & { kind: string }>;

export type CollectionName = keyof typeof COLLECTION_ROUTES;

/** Collection names, for a consumer that needs to iterate every collection. */
export const COLLECTION_NAMES = Object.keys(COLLECTION_ROUTES) as readonly CollectionName[];
