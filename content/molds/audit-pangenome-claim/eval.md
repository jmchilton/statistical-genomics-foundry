# Eval — audit-pangenome-claim (abstract oracle, no fixtures)

Family-B referee Mold: the highest-value properties are **catch-the-planted-flaw** guardrails —
each planted cardinal sin must be flagged, never silently passed. One property per validity gate
that a note can ground.

## Property: routes-before-judging
- check: llm-judged
- assertion: The output classifies the claim as bacterial-gene-content or eukaryotic-graph before
  applying axis-specific checks, and never applies a eukaryotic-graph sin to a bacterial claim (or
  vice versa).

## Property: catch-annotation-inflation
- check: llm-judged
- assertion: A bacterial accessory/pan-genome claim built from fragmented or contaminated
  assemblies with no population-wide error correction, whose accessory size grows with the number
  of genomes, must be flagged as a likely annotation-inflation artifact — never accepted as
  biological gene-content variation.

## Property: catch-fixed-total-on-open-pangenome
- check: llm-judged
- assertion: A claim that reports a single "total species gene" count for an open (or
  openness-untested) pan-genome must be flagged as a lower-bound-at-current-sampling, never blessed
  as a settled species total.

## Property: catch-threshold-mismatch
- check: llm-judged
- assertion: Comparing core-genome sizes computed under different presence thresholds
  (100% vs >=99% vs a statistical partition), or attributing soft-core/shell/cloud %-bands to a
  source that never defined them, must be flagged as a threshold mismatch / mis-attribution — not
  reported as a like-for-like comparison.

## Property: catch-underpowered-openness-verdict
- check: llm-judged
- assertion: An open-vs-closed verdict asserted from too few genomes or with no fitted growth law
  must be flagged as under-powered/untested; the referee must NOT invent a specific open/closed
  inequality or a hard minimum-genome threshold to bless it (that rule is an unrecovered GAP).

## Property: catch-method-mischaracterization-and-label-inversion
- check: llm-judged
- assertion: Describing PPanGGOLiN as an HMM or as a fixed %-band method, or conflating
  environmental core/accessory (ECG/EAG) with pangenome core/accessory, must be flagged and
  corrected — never restated as if accurate.

## Property: catch-out-of-scope-input
- check: llm-judged
- assertion: Applying an isolate same-species pangenome tool to metagenomic data, or mixing
  species where the tool assumes one, must be flagged as out-of-scope — the resulting count must
  not be accepted as a same-species pangenome.

## Property: catch-reference-free-misclaim
- check: llm-judged
- assertion: A reference-anchored graph (e.g. Minigraph-Cactus, which requires a reference
  backbone and exports reference-relative VCF) described as "reference-free," or whose
  reference-allele skew is ignored, must be flagged for unacknowledged reference bias.

## Property: catch-repetitive-region-overclaim
- check: llm-judged
- assertion: A high-confidence graph-genotype or SV claim located in centromeres, segmental
  duplications, or VNTRs, asserted at the accuracy of easy unique regions, must be flagged as an
  over-claim outside the reliable region.

## Property: catch-builder-dependent-topology
- check: llm-judged
- assertion: A structural claim at a copy-number-polymorphic locus that does not name the graph
  builder (given that PGGB collapses such loci into single-copy loops while Minigraph/MC do not)
  must be flagged as builder-dependent, never treated as a builder-independent fact.

## Property: catch-clipping-as-absence
- check: llm-judged
- assertion: An inference of gene/sequence absence in or near regions a graph pipeline clips or
  drops by design (>=10 kb unaligned clips, sub-threshold contigs, uncovered reference fraction)
  must be flagged as possibly-clipping-not-biology.

## Property: catch-masking-and-divergence-gaps
- check: llm-judged
- assertion: An alignment-derived claim with unmasked/undocumented-masking input, or a deep
  cross-clade alignment treated as accurate as a shallow one, must be flagged (masking precondition
  unmet; accuracy overstated for divergence).

## Property: incomplete-when-provenance-missing
- check: llm-judged
- assertion: When the core/partition threshold, the reference, or the genome count needed to judge
  a claim is unstated, the verdict must be "incomplete: provenance missing" — the referee must not
  fabricate the missing value to reach a pass/flag.
