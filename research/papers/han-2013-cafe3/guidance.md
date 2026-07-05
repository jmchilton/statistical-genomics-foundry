# Guidance — han-2013-cafe3 (paper)

> Attention-directing. The error-aware birth-death primary: the paper that introduced CAFE 3's
> annotation/assembly-error model and — load-bearing — states that uncorrected assembly/annotation
> error causes gene-family gain/loss (birth-death) rates to be systematically OVERESTIMATED. This is
> the CAFE-lineage hinge (Hahn-2005 framework → De Bie-2006 CAFE → THIS/CAFE3 error-aware → Mendes-2020
> CAFE5) and the source the skill's "CAFE5-error mode" remedy actually traces to. A Hahn-lab paper.
> Oxford MBE — determine license posture per Step 1.5; treat as restrictive/UNKNOWN unless the article
> page shows an open CC license. Functional strings (parameter symbols, error-model terms) verbatim.

## Must capture
- THE central claim (referee-relevant payoff): uncorrected assembly/annotation error → gene-family
  birth-death rate estimates are systematically inflated / OVERESTIMATED. Capture the exact wording
  and any magnitude (how much are λ / gain-loss rates overestimated, and under what error levels).
  Quote if license permits. This is the explicit error → BD-inference-corruption link.
- The ERROR MODEL — the core contribution. Capture precisely:
  - What the error parameter represents (e.g. probability that an observed family size is miscounted
    by ±1, or a per-genome error distribution). Capture the exact definition and symbol (ε?).
  - Is it a GLOBAL error model or PER-SPECIES / per-genome error rates? Both?
  - HOW the error rate is ESTIMATED — from the data itself (e.g. the distribution of size differences
    among closely-related taxa / the excess of ±1 differences), from a known-truth subset, or supplied
    by the user? Capture the estimation procedure.
  - HOW error enters the likelihood (error distribution convolved with the birth-death transition
    probabilities?). Capture the mechanism in the paper's terms.
  - Any functional strings: error-model file format, parameter names, the ε-estimation output.
- What CAFE 3 adds BEYOND the error model, briefly: birth-death rate estimation, per-family
  significance / p-values, handling of separate λ across lineages, treatment of large or fast families.
  Capture enough to distinguish CAFE 3's outputs from CAFE (De Bie) and CAFE5 (Mendes) — but focus on
  the error model per this guidance.
- Validation: how do they show the error model works? (simulation under known error; recovery of true
  rates; comparison of corrected vs uncorrected rate estimates). Capture the design and key numbers.
- Any stated THRESHOLD or guidance on when error correction is needed (error-rate level above which
  correction matters). Capture the paper's OWN numbers; if it gives none, say so.
- The paper's own caveats / limitations of the error model.

## Must-quote (if license permits; else own-words) — with section/figure location
- The sentence stating that assembly/annotation error overestimates gene-family gain/loss rates.
- The definition of the error model / error parameter.

## Access / version notes
- Mol Biol Evol 30(8):1987-1997, 2013; DOI 10.1093/molbev/mst100; PubMed 23709260. Authors: Han,
  Thomas, Lugo-Martinez, Hahn. If paywalled, summarize abstract + any OA manuscript and MARK the
  boundary. Work ONLY from THIS paper — do NOT import facts from the CAFE5 (Mendes 2020) paper or the
  CAFE5/CAFE3 manuals; the skill's "CAFE5-error -e mode" is downstream and is NOT this paper's claim.
