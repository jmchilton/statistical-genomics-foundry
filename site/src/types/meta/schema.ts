import { z } from 'zod';

import { defineKind } from '../context';
import type { KindContext } from '../context';

export const kind = defineKind({
  kind: 'meta',
  title: 'Design Record',
  layer: 'substrate',
  summary:
    "A record of why the Foundry itself is built the way it is — the rationale behind the machinery, not the domain.",

  // A FLAT FILE, and the first one in this instance: every other kind here is a directory
  // holding an index.md. A design record has nothing to put beside it — no guidance, no
  // eval, no vendored source — so a directory per record would be a container with one file
  // in it forever.
  shape: 'file',
  companions: [],

  build: (ctx: KindContext) =>
    z
      .object({
        type: z.literal('meta'),

        // Required, unlike on most kinds here. A design record is addressed by name in prose
        // and on a navigation card; it cannot fall back to a slug the way a chapter can.
        title: z.string(),

        // Which shelf the record sits on. Every record in this instance is `foundation`
        // today — `infrastructure` is declared because the kind is SUBSTRATE and the parent
        // instance uses both, and a substrate kind whose enum differs per instance is not one
        // kind. The unused value is the cost of that, and it is the right cost.
        record_kind: z.enum(['foundation', 'infrastructure']),

        // Reading order within a shelf. This was the ARRAY POSITION in the hand-written
        // registry these records used to live in, and the one thing position carried that
        // frontmatter otherwise could not: the sequence is pedagogical, not chronological.
        order: z.number().int().min(1),

        // The lifecycle fields, and the first in this instance to carry dates. They are here
        // because they could be populated TRUTHFULLY — every one is derived from the file's
        // own git history rather than guessed — which is the same test this instance applied
        // when it declined to backfill them elsewhere.
        status: z.enum(['draft', 'reviewed', 'revised', 'stale', 'archived']),
        created: z.coerce.date(),
        revised: z.coerce.date(),
        revision: z.number().int().min(1),

        // 20–160, the parent's bounds. This is the card text on the design index, so it was
        // already being written by hand — it just was not being checked, and one summary
        // inherited from the old registry was over the limit.
        summary: z.string().min(20).max(160),

        ...ctx.base,
      })
      .strict(),
});
