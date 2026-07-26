// The barrel — the ONE enumeration of the note kinds this Foundry defines.
//
// Adding a kind is: add a directory beside this file, add one line here. Nothing else.
//
// STATIC imports, deliberately. A runtime glob would have to work identically under vitest
// and inside Astro's bundler; a missed directory is caught by tests/kind-directories.test.ts
// instead, which asserts this list and the directory listing agree in BOTH directions.

import { kind as book } from './book/schema';
import { kind as mold } from './mold/schema';
import { kind as paper } from './paper/schema';
import { kind as pattern } from './pattern/schema';
import { kind as tutorial } from './tutorial/schema';

import type { KindDefinition } from './context';

/**
 * The kind definitions, keyed by name and with their inferred shapes intact.
 *
 * Keyed rather than a list, and NOT annotated `Record<string, KindDefinition>`: the annotation
 * would widen every value back to the default shape, and the erasure reaches the Astro pages
 * as `entry.data: unknown`. Left inferred, `DEFINITIONS.book` is precisely the book kind.
 */
export const DEFINITIONS = { book, paper, tutorial, mold, pattern } as const;

/** A kind definition with its shape erased — for code that ITERATES the kinds (the manifest
 *  generator, the drift test) rather than validating with one. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyKindDefinition = KindDefinition<any, any>;

/** Iteration order for the manifest and the drift test. */
export const KINDS = Object.values(DEFINITIONS) as readonly AnyKindDefinition[];

export const KINDS_BY_NAME: ReadonlyMap<string, AnyKindDefinition> = new Map(
  KINDS.map((k) => [k.kind, k]),
);

export { buildKindContext, defineKind } from './context';
export type { KindContext, KindDefinition } from './context';
