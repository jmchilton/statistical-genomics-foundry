// The frontmatter contract — ONE zod encoding, consumed by two callers:
//   1. the Astro site (`content.config.ts`) — validates real content at build time;
//   2. the standalone validator (`tests/`) — negative fixtures + corpus conformance.
// One encoding is the point: two would drift, and each caller would enforce a different thing.
//
// This module is the ASSEMBLER, and only the assembler. Each note kind is defined — and
// documented, and exemplified — in its own directory under src/types/; see src/types/index.ts
// for the enumeration and src/types/context.ts for the shared envelope every kind spreads.
// (Shared contract: galaxyproject/foundry-pattern#13, PART 3 of the standing-up checklist.)
import { assemble } from '@galaxy-foundry/kind-schema';
import type { CollectionRoute } from '@galaxy-foundry/kind-schema/collections';

import { buildKindContext, DEFINITIONS } from '../types/index';
import { REGISTRIES } from './registries';

// Strip the trailing `/index` so entry ids stay clean (`msmb/chap1`, `leek-2010`) rather than
// `.../index` — keeps URLs and wiki-link basenames unique per note.
export const stripIndex = ({ entry }: { entry: string }) =>
  entry.replace(/\.md$/, '').replace(/\/index$/, '');

const ctx = buildKindContext(REGISTRIES);

// Assembled ONE BY ONE rather than by mapping over KINDS. A `.map` produces a homogeneous
// array and every kind's shape collapses to the widest common type, which is how the Astro
// pages end up with `entry.data: unknown`. Named properties keep each kind precise.
//
// `assemble` — applying a kind's `refine` to its own schema, stating the result as one type so
// the optional slot does not infer a union — is shared machinery in @galaxy-foundry/kind-schema.
export const metaSchema = assemble(DEFINITIONS.meta, ctx);
export const bookSchema = assemble(DEFINITIONS.book, ctx);
export const paperSchema = assemble(DEFINITIONS.paper, ctx);
export const tutorialSchema = assemble(DEFINITIONS.tutorial, ctx);
export const moldSchema = assemble(DEFINITIONS.mold, ctx);
export const patternSchema = assemble(DEFINITIONS.pattern, ctx);

/**
 * The note KINDS this Foundry defines — the complete set of `type` values the corpus may
 * declare, each with the one schema that validates it. `type` is the SOLE discriminator: every
 * note declares its kind exactly once, in frontmatter, and the kind picks the schema. Nothing
 * infers a kind from a directory or a tag.
 */
export const NOTE_KINDS = {
  meta: metaSchema,
  book: bookSchema,
  paper: paperSchema,
  tutorial: tutorialSchema,
  mold: moldSchema,
  pattern: patternSchema,
} as const;

export type NoteKind = keyof typeof NOTE_KINDS;

/**
 * Where the content tree sits, relative to the site cwd every consumer runs from — the Astro
 * loaders, the tests, and the remark plugin at markdown-compile time.
 *
 * Stated once, and separately from the bases below, because the bases are the part that is
 * TRUE ANYWHERE: `research/books` is where books live in this corpus no matter who is asking.
 * Only the hop from a caller to the content root varies, and it varies exactly once.
 *
 * Joined as a plain string rather than through `node:path` on purpose. This module is imported
 * by `content.config.ts`, and nothing else here reaches for a filesystem — keeping it that way
 * is cheap and means the contract never drags node builtins somewhere they cannot resolve.
 */
export const CONTENT_DIR = '../content';

/** A content-relative path, resolved from the site cwd. The one hop, applied everywhere. */
export const contentPath = (contentRelPath: string) => `${CONTENT_DIR}/${contentRelPath}`;

/**
 * Single source for the collection ⇒ (base, pattern, kind) mapping, so every consumer routes
 * files the same way: the Astro loaders, the corpus validator, the registry-drift walk, and the
 * wiki-link map.
 *
 * `base` is CONTENT-RELATIVE, not site-relative. The shared matcher takes `base` as a plain
 * prefix and leaves the frame to the caller, requiring only that it be one frame for every row —
 * so the frame is chosen here to be the one that survives leaving site/. Join it with
 * `collectionDir` to get back to a path a loader or a walk can use.
 *
 * `pattern` is the note-selecting glob, stated per row rather than assumed. It is `**​/index.md`
 * everywhere today, and it was written out four separate times before it lived here — once as
 * the loaders' glob, twice as a hand-rolled `entry.name === 'index.md'` walk, and once more in
 * the wiki-link builder.
 *
 * The KEY is also the browse route: `experiments` renders at `/experiments/<id>`. Derived rather
 * than stored, and pinned by a test, because a `route` column that always equalled the key is a
 * second name for one thing.
 *
 * Collection and kind are DELIBERATELY not one-to-one: `experiments` holds candidate Molds
 * produced by the blind-assembly runs, which are structurally Molds and declare `type: mold`.
 * The collection is a LOCATION (it gets its own browse route and its notes sit beside their
 * comparison/gap-closing narratives); the kind is what the note IS. Keeping the mapping
 * explicit is what lets a kind catalog enumerate 5 kinds while the site routes 6 collections.
 */
export const COLLECTIONS = {
  // The design record. `glossary.md` shares the directory and is deliberately NOT a note: it
  // is hand-curated, alphabetical, and rendered by its own page. Excluded HERE, in the routing
  // table, rather than by each consumer — the validator has to honour it too, and an exclusion
  // written in the site's loader alone would start failing the glossary in the corpus walk.
  //
  // Also the first row whose pattern is not `**/index.md`: a design record is a flat file.
  meta: { base: 'meta', pattern: ['*.md', '!glossary.md'], kind: 'meta', schema: NOTE_KINDS.meta },
  books: { base: 'research/books', pattern: ['**/index.md'], kind: 'book', schema: NOTE_KINDS.book },
  papers: {
    base: 'research/papers',
    pattern: ['**/index.md'],
    kind: 'paper',
    schema: NOTE_KINDS.paper,
  },
  tutorials: {
    base: 'research/tutorials',
    pattern: ['**/index.md'],
    kind: 'tutorial',
    schema: NOTE_KINDS.tutorial,
  },
  molds: { base: 'molds', pattern: ['**/index.md'], kind: 'mold', schema: NOTE_KINDS.mold },
  patterns: {
    base: 'patterns',
    pattern: ['**/index.md'],
    kind: 'pattern',
    schema: NOTE_KINDS.pattern,
  },
  experiments: {
    base: 'research/experiments',
    pattern: ['**/index.md'],
    kind: 'mold',
    schema: NOTE_KINDS.mold,
  },
} as const satisfies Record<string, CollectionRoute & { kind: NoteKind; schema: unknown }>;

export type CollectionName = keyof typeof COLLECTIONS;

/** Collection names, for a consumer that needs to iterate every collection. */
export const COLLECTION_NAMES = Object.keys(COLLECTIONS) as readonly CollectionName[];
