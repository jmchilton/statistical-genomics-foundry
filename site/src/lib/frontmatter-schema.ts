// The frontmatter contract — ONE zod encoding, consumed by two callers:
//   1. the Astro site (`content.config.ts`) — validates real content at build time;
//   2. the standalone validator (`tests/`) — negative fixtures + corpus conformance.
// One encoding is the point: two would drift, and each caller would enforce a different thing.
//
// This module is the ASSEMBLER, and only the assembler. Each note kind is defined — and
// documented, and exemplified — in its own directory under src/types/; see src/types/index.ts
// for the enumeration and src/types/context.ts for the shared envelope every kind spreads.
// (Shared contract: galaxyproject/foundry-pattern#13, PART 3 of the standing-up checklist.)
import { z } from 'zod';

import { buildKindContext, DEFINITIONS, type KindDefinition } from '../types/index';

// Strip the trailing `/index` so entry ids stay clean (`msmb/chap1`, `leek-2010`) rather than
// `.../index` — keeps URLs and wiki-link basenames unique per note.
export const stripIndex = ({ entry }: { entry: string }) =>
  entry.replace(/\.md$/, '').replace(/\/index$/, '');

const ctx = buildKindContext();

/**
 * A kind's assembled schema: parses this kind's frontmatter, yields its assembled output.
 *
 * Stated as ONE type rather than left to inference, because inference over the two optional
 * slots yields a UNION of "with transform" and "without" — and a union is what makes
 * `entry.data.license` an error on the book pages, since only one arm of it has that field.
 * `O` defaults to the object's own output, so the kinds with no transform are unaffected.
 */
type Assembled<T extends z.ZodRawShape, O> = z.ZodType<
  O,
  z.ZodTypeDef,
  z.input<z.ZodObject<T, 'strict'>>
>;

/**
 * Assemble one kind into the schema its collection validates with.
 *
 * `build` returns the bare object so the manifest generator can walk its `.shape`; the two
 * optional slots are applied here. Order matters: `refine` sees the note's own fields,
 * `transform` may add fields (a book chapter merging book.yml) and raise issues of its own.
 */
function assemble<T extends z.ZodRawShape, O>(definition: KindDefinition<T, O>): Assembled<T, O> {
  const object = definition.build(ctx);
  const { refine, transform } = definition;
  const refined = refine ? object.superRefine((d, issues) => refine(d, issues, ctx)) : object;
  const final = transform ? refined.transform((d, issues) => transform(d, issues, ctx)) : refined;
  return final as Assembled<T, O>;
}

// Assembled ONE BY ONE rather than by mapping over KINDS. A `.map` produces a homogeneous
// array and every kind's shape collapses to the widest common type, which is how the Astro
// pages end up with `entry.data: unknown`. Named properties keep each kind precise.
export const bookSchema = assemble(DEFINITIONS.book);
export const paperSchema = assemble(DEFINITIONS.paper);
export const tutorialSchema = assemble(DEFINITIONS.tutorial);
export const moldSchema = assemble(DEFINITIONS.mold);
export const patternSchema = assemble(DEFINITIONS.pattern);

/**
 * The note KINDS this Foundry defines — the complete set of `type` values the corpus may
 * declare, each with the one schema that validates it. `type` is the SOLE discriminator: every
 * note declares its kind exactly once, in frontmatter, and the kind picks the schema. Nothing
 * infers a kind from a directory or a tag.
 */
export const NOTE_KINDS = {
  book: bookSchema,
  paper: paperSchema,
  tutorial: tutorialSchema,
  mold: moldSchema,
  pattern: patternSchema,
} as const;

export type NoteKind = keyof typeof NOTE_KINDS;

/**
 * Single source for the collection ⇒ (glob base, kind) mapping, so `content.config.ts` and the
 * corpus-conformance validator route files the same way. Bases are relative to the Astro
 * project root (site/), matching the loaders' cwd.
 *
 * Collection and kind are DELIBERATELY not one-to-one: `experiments` holds candidate Molds
 * produced by the blind-assembly runs, which are structurally Molds and declare `type: mold`.
 * The collection is a LOCATION (it gets its own browse route and its notes sit beside their
 * comparison/gap-closing narratives); the kind is what the note IS. Keeping the mapping
 * explicit is what lets a kind catalog enumerate 5 kinds while the site routes 6 collections.
 */
export const COLLECTIONS = {
  books: { base: '../content/research/books', kind: 'book', schema: NOTE_KINDS.book },
  papers: { base: '../content/research/papers', kind: 'paper', schema: NOTE_KINDS.paper },
  tutorials: { base: '../content/research/tutorials', kind: 'tutorial', schema: NOTE_KINDS.tutorial },
  molds: { base: '../content/molds', kind: 'mold', schema: NOTE_KINDS.mold },
  patterns: { base: '../content/patterns', kind: 'pattern', schema: NOTE_KINDS.pattern },
  experiments: { base: '../content/research/experiments', kind: 'mold', schema: NOTE_KINDS.mold },
} as const satisfies Record<string, { base: string; kind: NoteKind; schema: unknown }>;
