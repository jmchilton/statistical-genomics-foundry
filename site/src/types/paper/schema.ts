import { z } from 'zod';

import { defineKind } from '../context';
import type { KindContext } from '../context';

export const kind = defineKind({
  kind: 'paper',
  title: 'Paper',
  layer: 'instance',
  summary:
    'A faithful summary of one published paper, carrying the provenance and licence posture the summary was made under.',


  shape: 'directory',

  // `guidance.md` sits beside 76 of 76 papers and 8 of 8 tutorials — it is written by the same
  // generator that writes the summary, so a paper note without one is a broken generation rather
  // than an authoring choice. `required` is therefore the honest level, and unlike the parent's
  // `eval.md` (33 of 47) there is no gap to grandfather.
  //
  // Its only previous mention anywhere in either Foundry was a passing comment in
  // `scripts/generate-book-frontmatter.ts` — the single largest undeclared companion in the
  // corpus, and nothing checked that it was there.
  companions: [
    {
      file: 'guidance.md',
      requirement: 'required',
      purpose: "Attention-directing questions for the summarizer, answered by the source's own text.",
      disposition: 'foundry-only',
    },
  ],

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
