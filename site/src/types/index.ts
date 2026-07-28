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

/**
 * A kind definition with its shape erased — for code that ITERATES the kinds (the manifest
 * generator, the drift test) rather than validating with one.
 *
 * `any` rather than `unknown`/`ZodRawShape`: `ZodObject` is effectively invariant in its shape
 * parameter, so a narrower bound here rejects every concrete definition. Nothing reads a field
 * off this type, so the looseness buys iteration and costs nothing.
 */
export type AnyKindDefinition = KindDefinition<any>;

/** Iteration order for the manifest and the drift test. */
export const KINDS = Object.values(DEFINITIONS) as readonly AnyKindDefinition[];

export { buildKindContext, defineKind } from './context';
export type { BuildKindContextOptions, KindContext, KindDefinition, KindShape } from './context';
