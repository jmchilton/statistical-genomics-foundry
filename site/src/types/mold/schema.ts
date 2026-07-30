import { z } from 'zod';

import { defineKind } from '../context';
import type { KindContext } from '../context';

export const kind = defineKind({
  kind: 'mold',
  title: 'Mold',
  layer: 'substrate',
  summary:
    'One abstract action, described as a typed reference manifest that casting compiles into a skill artifact.',


  shape: 'directory',

  // A subset of the parent instance's mold companions: this corpus has `eval.md` and
  // `scenarios.md` beside 10 of 10 molds and nothing else. `recommended` rather than `required`
  // even at 10 of 10, matching the parent — a candidate mold from a blind-assembly run can
  // legitimately arrive before its scenarios do, and the level records the rule rather than
  // today's count.
  //
  // That the same two filenames arrived independently in both Foundries is the substrate claim
  // the kind catalog can now make: a companion transferring is stronger evidence than a kind
  // NAME transferring.
  companions: [
    {
      file: 'eval.md',
      requirement: 'recommended',
      purpose: 'Abstract oracle: the properties any cast of this Mold must satisfy.',
      disposition: 'foundry-only',
    },
    {
      file: 'scenarios.md',
      requirement: 'recommended',
      purpose: 'Concrete cases bound to fixtures, run against the eval properties.',
      disposition: 'foundry-only',
    },
  ],

  build: (ctx: KindContext) =>
    z
      .object({
        type: z.literal('mold'),
        name: z.string(),
        // Required, 20–160 chars — the parent's bounds. The site prints `summary` in every
        // tag-browse row, so an optional summary lists a Mold as a bare name.
        summary: z.string().min(20).max(160),
        references: z.array(ctx.reference).optional(),
        ...ctx.base,
      })
      .strict(),
});
