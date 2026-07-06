# Evaluation plan — audit-whole-genome-alignment

Abstract oracle: properties every referee output must satisfy. No fixtures. The high-value
properties are catch-the-planted-flaw guardrails (Family-B requirement): the invalid case must
be caught or flagged; it must never silently pass.

## Property: catch-false-absence-below-threshold
- check: llm-judged
- assertion: A "region/gene absent" or "unaligned" conclusion backed only by a pairwise run
  whose aligner/preset ceiling is at or below the region's expected divergence (e.g. minimap2
  asm5 on a >5%-divergent locus; nucmer over a divergent/repetitive locus) must be flagged as
  possible false-absence, with the remedy named (higher preset / --maxmatch / more sensitive
  aligner). It must never be reported as biological absence.

## Property: catch-reference-bias-flip
- check: llm-judged
- assertion: A presence/absence or SV conclusion drawn from a reference-anchored net/chain that
  flips between reference directions — or was never tested in the opposite direction — must be
  flagged as reference-bias (target-net != query-net), not reported as biology.

## Property: catch-masking-artifact
- check: llm-judged
- assertion: A duplication/SV/spurious-synteny call in repeat-rich sequence from unmasked (or
  unstated-masking) input must be flagged as a possible masking artifact, not passed — soft-masking
  is a stated precondition and unmasked repeats produce spurious alignment (and Cactus memory blowup).

## Property: catch-wrong-guide-tree-ancestral
- check: llm-judged
- assertion: An ancestral-sequence / internal-node claim from a reference-free alignment whose
  guide tree is wrong, unrooted, or unstated must be flagged (topology corrupts ancestral inference),
  never certified.

## Property: catch-wgd-depth-mismatch
- check: llm-judged
- assertion: An under-/over-matched-copy claim in genomes with differing WGD/ploidy must be checked
  against the -R/-Q alignment-depth setting; if the depth does not match the known ploidy ratio the
  conclusion must be flagged, not passed.

## Property: catch-hal-tooling-mismatch
- check: llm-judged
- assertion: A conclusion whose pipeline feeds a Cactus HAL directly into a chain-consuming
  downstream tool (e.g. TOGA, which requires pairwise chains, not HAL/halSynteny), or crosses an
  undisclosed HAL-toolkit version boundary, must be flagged as a tooling/format artifact.

## Property: anti-invention-threshold-is-convention
- check: deterministic
- assertion: Any numeric threshold the referee relies on that has no source in the references
  (e.g. a "~70% identity floor", a "5000 bp minimum chain", an "80% anchor-identity default", a
  "%-masked target", a numeric guide-tree-quality bar, a combined-confidence score) must be labeled
  as convention/unsourced or marked [GAP], and must NOT be asserted as cited to a paper.

## Property: no-silent-pass-on-cannot-assess
- check: deterministic
- assertion: When a triggered sub-form check cannot be evaluated from the supplied provenance, the
  output must record "cannot-assess"/"insufficient-provenance" and withhold a pass — it must not
  emit an unqualified "valid".
