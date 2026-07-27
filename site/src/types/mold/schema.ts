import { z } from 'zod';

import { defineKind } from '../context';
import type { KindContext } from '../context';

export const kind = defineKind({
  kind: 'mold',
  title: 'Mold',
  layer: 'substrate',
  summary:
    'One abstract action, described as a typed reference manifest that casting compiles into a skill artifact.',

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
