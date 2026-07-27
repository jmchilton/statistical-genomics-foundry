import { z } from 'zod';

import { defineKind } from '../context';
import type { KindContext } from '../context';

export const kind = defineKind({
  kind: 'paper',
  title: 'Paper',
  layer: 'instance',
  summary:
    'A faithful summary of one published paper, carrying the provenance and licence posture the summary was made under.',

  build: (ctx: KindContext) =>
    z
      .object({
        type: z.literal('paper'),
        ...ctx.sourceNoteFields,
        // Bibliographic identifiers are STRINGS, never numbers: an unquoted
        // `pmid: 33015620` is an integer to YAML, and an id is an opaque label, never
        // arithmetic. The same footgun `access_date` keeps a negative fixture for.
        pmid: z.string().optional(),
        pmcid: z.string().optional(),
        arxiv: z.string().url().optional(),
        // Free mirror of a paywalled record (PMC, institutional repository).
        oa_url: z.string().url().optional(),
        ...ctx.base,
      })
      .strict(),

  refine: (d, ctx, kctx) => kctx.licenseCoherence(d, ctx),
});
