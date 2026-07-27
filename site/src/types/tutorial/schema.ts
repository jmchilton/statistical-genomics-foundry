import { z } from 'zod';

import { defineKind } from '../context';
import type { KindContext } from '../context';

export const kind = defineKind({
  kind: 'tutorial',
  title: 'Tutorial',
  layer: 'instance',
  summary:
    'A faithful summary of one package vignette or tutorial, pinned to the release it documents.',

  build: (ctx: KindContext) =>
    z
      .object({
        type: z.literal('tutorial'),
        ...ctx.sourceNoteFields,
        // Docs site distinct from `source_url` (which points at the package record).
        docs_url: z.string().url().optional(),
        // The Bioconductor release `version` belongs to — the pair pins the vignette.
        bioconductor_release: z.string().optional(),
        // Quoted, like `access_date`: bare `2024-03-21` is a Date to YAML, not a string.
        published: z.string().optional(),
        ...ctx.base,
      })
      .strict(),

  refine: (d, ctx, kctx) => kctx.licenseCoherence(d, ctx),
});
