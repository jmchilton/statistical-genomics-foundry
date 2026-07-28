// The `KindShape` bound, asserted at the only place it exists: compile time.
//
// A kind's shape must carry a `type:` field. Every kind in this instance already did, but the
// contract did not SAY so — the bound was `z.ZodRawShape`, which accepts any object. Saying it
// is what makes the discriminator a property of the kind contract rather than a convention
// five directories happen to follow, and it is the bound the parent Foundry already uses.
//
// Checked by `astro check`, not by vitest: `@ts-expect-error` fails the typecheck if the line
// beneath it STOPS being an error, so a loosened bound breaks the build. There is nothing to
// run here — the file is type-level only.

import { z } from 'zod';

import { defineKind, type KindContext } from '../src/types/index';

// A kind carrying a `type:` literal — the shape every real kind has.
export const wellFormed = defineKind({
  kind: 'well-formed',
  title: 'Well Formed',
  layer: 'instance',
  summary: 'Carries the discriminator, so it satisfies the bound.',
  build: (ctx: KindContext) =>
    z.object({ type: z.literal('well-formed'), ...ctx.base }).strict(),
});

export const missingDiscriminator = defineKind({
  kind: 'missing-discriminator',
  title: 'Missing Discriminator',
  layer: 'instance',
  summary: 'Has no `type:` field, so the contract must reject it.',
  // @ts-expect-error — the shape has no `type:`, so it cannot satisfy `KindShape`. The error
  // lands on `build`, which is the property whose return type carries the shape. If this line
  // ever stops erroring, the bound has been loosened back to `z.ZodRawShape` and the
  // discriminator is a convention again rather than part of the contract.
  build: (ctx: KindContext) => z.object({ name: z.string(), ...ctx.base }).strict(),
});
