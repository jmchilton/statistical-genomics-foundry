import { z } from 'zod';

import { defineKind } from '../context';
import type { KindContext } from '../context';

export const kind = defineKind({
  kind: 'pattern',
  title: 'Pattern',
  origin: 'substrate',
  summary:
    'One named methodological pattern — established-good or cautionary-bad — that a referee Mold reasons against.',

  build: (ctx: KindContext) =>
    z
      .object({
        type: z.literal('pattern'),
        name: z.string(),
        // The BIPOLAR corpus, and this instance's sharpest divergence from the parent: a
        // checker that has only seen good examples cannot recognize a bad one, so the
        // cautionary pole is a first-class value rather than an absence.
        pole: z.enum(['cautionary-bad', 'established-good']).optional(),
        // The parent's lifecycle enum, required. Closed, not free text, so it stays
        // browsable and reportable.
        status: z.enum(['draft', 'reviewed', 'revised', 'stale', 'archived']),
        ...ctx.base,
      })
      .strict(),
});
