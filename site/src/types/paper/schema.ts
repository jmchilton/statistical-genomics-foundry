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
        title: z.string(),
        // `pmid`, `pmcid`, `arxiv` and `oa_url` used to sit here as four loose optional fields.
        // They are `source_ids` and `oa_url` in the shared block now: one union that groups the
        // identifiers and makes "this work has none" a statable claim, holding bare ids rather
        // than URLs — which is what `arxiv: z.url()` had backwards.
        ...ctx.sourceNoteBlock,
        ...ctx.base,
      })
      .strict(),

  refine: (d, ctx, kctx) => kctx.sourceNoteRules(d, ctx),
});
