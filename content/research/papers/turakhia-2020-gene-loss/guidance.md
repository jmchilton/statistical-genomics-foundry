# Guidance — Turakhia, Chen, Marcovitz & Bejerano 2020, automated gene-loss detection (NAR 48(16):e91)

Source: "A fully-automated method discovers loss of mouse-lethal and human-monogenic
disease genes in 58 mammals." NAR 48(16):e91. doi:10.1093/nar/gkaa550. PMC7498332. CC BY-NC.
(Attribution corrected from an upstream mis-cite of "Sharma & Hiller / gkaa562.") This is the
CARDINAL-SIN anchor: how to avoid calling a gene "lost" when the signal is a technical
artifact.

## Direct the summarizer's attention to:
- The false-positive problem. Does the paper enumerate the technical causes of SPURIOUS
  gene-loss calls — assembly gaps, missing/low-quality sequence, alignment/assembly errors,
  paralog confusion? Quote the passage listing these causes.
- The filters/criteria the method uses to EXCLUDE artifactual losses before reporting a
  gene as truly lost. Capture each filter concretely (e.g. requiring the locus to be
  covered by an alignment, excluding assembly-gap regions, requiring inactivating mutations
  of specific kinds). Quote exact criteria and any numeric thresholds.
- What counts as evidence of GENUINE loss (inactivating mutations: frameshifts, premature
  stops, splice-site disruptions, deletions). Capture the classes of gene-inactivating
  mutations the method scores.
- Any statement about validating loss calls against independent evidence, and false-
  discovery / precision figures the method achieves. Quote numbers.
- Relationship to intactness classification generally (this predates/underlies TOGA's
  intactness logic) — capture any framing of "coding capacity lost" vs other signals.

## Must-capture verbatim:
- The explicit list of artifact sources and the explicit exclusion filters (these ARE the
  validity-axis content the referee needs).
- Any numeric thresholds used in the filtering.
