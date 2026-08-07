// What this Foundry adds to a cast — which, deliberately, is almost nothing.
//
// The hooks interface was designed against the parent Foundry, whose casts carry Galaxy tool
// manifests, artifact contracts and output schemas. This instance has none of those: its Molds
// are referees over prose, its refs are all `verbatim`, and its bundles are the two files
// casting itself writes. So `renderers`, `bundleFiles` and `bundleChecks` are empty, and
// `payloadCompanion`/`packageLoader` are absent.
//
// That emptiness is the point rather than an omission. The test of a hook being in the right
// place was stated as "this instance supplies it and a second instance supplies nothing" — this
// is the second instance, and what is left here is only the two points every cast must answer:
// what the document says at the top, and what it says below that.

import {
  bulletSection,
  refRows,
  runtimeProcedureBody,
  skillSummary,
  stripWikiLinks,
  type CastHooks,
  type ProvenanceRefEntry,
} from '@galaxy-foundry/cast';

/**
 * Kind key to the label its `reference_contract.yml` row declares.
 *
 * Taken from the contract rather than written here, so a bundle and a kind chip on the site
 * cannot end up calling one kind two things. A row with no label is left out, and the row's own
 * key stands in — a fallback table would be the second answer this avoids.
 */
export function kindLabels(contract: {
  kinds?: Record<string, { label?: string }>;
}): Map<string, string> {
  const out = new Map<string, string>();
  for (const [key, row] of Object.entries(contract.kinds ?? {})) {
    if (row?.label) out.set(key, row.label);
  }
  return out;
}

export function statgenHooks(labels: ReadonlyMap<string, string>): CastHooks {
  const describe = {
    kindLabel: (ref: ProvenanceRefEntry): string => labels.get(ref.kind) ?? ref.kind,
    // Every carry here is verbatim — `sidecar` is narrowed out of the vocabulary in
    // site/src/lib/reference-contract.ts, so a cast cannot reach this with anything else.
    // Phrased from the ref rather than asserted, so the day a mode is re-added this says so.
    modePhrase: (ref: ProvenanceRefEntry): string =>
      ref.mode === 'verbatim' ? 'carried verbatim' : `carried as ${ref.mode}`,
  };

  return {
    // No non-verbatim mode is admitted, so there is no renderer to register. A mode arriving
    // here would mean the vocabulary and this object disagree, and the caster errors rather
    // than guessing — which is what makes the narrowing in reference-contract.ts a gate.
    renderers: {},
    // Nothing beyond the document and the provenance record. A referee needs no tool manifest.
    bundleFiles: [],
    skillLede:
      'Follow the procedure below. The reference sections are the evidence base it reasons from; read the upfront ones before you start.',
    skillSections: ({ moldName, meta, body, noun, refs }) => {
      const summary = skillSummary(meta, moldName, noun);
      // Cast-time refs were consumed building the bundle; a runtime reader has no use for them.
      const runtime = refs.filter((r) => r.used_at !== 'cast-time');
      const procedure = runtimeProcedureBody(body, moldName, noun);
      return [
        bulletSection('When To Use', [`- ${stripWikiLinks(summary)}`]),
        bulletSection(
          'Load Upfront',
          refRows(
            runtime.filter((r) => r.load === 'upfront'),
            describe,
          ),
        ),
        bulletSection(
          'Load On Demand',
          refRows(
            runtime.filter((r) => r.load === 'on-demand'),
            describe,
          ),
        ),
        { title: 'Procedure', body: procedure || 'No Mold body supplied.' },
        // Two of these are this Foundry's own: a referee that invents evidence is worse than
        // one that reports it could not find any, and the corpus is not on the runtime path.
        bulletSection('Runtime Notes', [
          '- Do not read Foundry source files at runtime; use only the files packaged in this bundle and what the user supplies.',
          '- Do not run statistical tooling to reach a verdict this bundle can reach by reading. Where an empirical check is called for, the procedure says so.',
          '- Carry an unresolved assumption into the output as an unresolved assumption. Inventing the missing evidence is the failure this referee exists to catch.',
        ]),
      ];
    },
    // No `payloadCompanion`: every kind here declares `companions: false`, so nothing asks.
    // No `packageLoader`: no kind resolves to a package export.
    bundleChecks: [],
  };
}
