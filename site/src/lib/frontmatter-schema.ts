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
import { COLLECTION_ROUTES } from './collection-routes';
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
 * The routing table with each kind's schema attached — what consumers inside the site use.
 *
 * The rows themselves live in collection-routes.ts, which imports nothing: this module closes
 * over the registries, and the registries read `meta_tags.yml` from the site cwd, so anything
 * reaching the table through here has to be running from `site/`. The caster is not.
 *
 * Attached one row at a time rather than by mapping, for the reason the schemas are assembled
 * one at a time above: a `.map` collapses every row to the widest common type and each kind's
 * schema stops being precise.
 */
export const COLLECTIONS = {
  meta: { ...COLLECTION_ROUTES.meta, schema: NOTE_KINDS.meta },
  books: { ...COLLECTION_ROUTES.books, schema: NOTE_KINDS.book },
  papers: { ...COLLECTION_ROUTES.papers, schema: NOTE_KINDS.paper },
  tutorials: { ...COLLECTION_ROUTES.tutorials, schema: NOTE_KINDS.tutorial },
  molds: { ...COLLECTION_ROUTES.molds, schema: NOTE_KINDS.mold },
  patterns: { ...COLLECTION_ROUTES.patterns, schema: NOTE_KINDS.pattern },
} as const satisfies Record<string, CollectionRoute & { kind: NoteKind; schema: unknown }>;

export { COLLECTION_NAMES, type CollectionName } from './collection-routes';
