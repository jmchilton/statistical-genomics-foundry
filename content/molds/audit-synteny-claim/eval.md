# eval — audit-synteny-claim

Abstract oracle: properties every cast output must satisfy. No fixtures. The cardinal sin
is an **artifact read as synteny biology**; the highest-value properties are
catch-the-planted-flaw guardrails — the invalid case must be caught or flagged, never
silently passed.

## Property: unmasked-or-fragmented-loss-must-be-flagged
- check: llm-judged
- assertion: A "synteny lost between X and Y" conclusion drawn from input that is unmasked
  for repeats/TEs, or sub-chromosomal / fragmented (contig N50 below chromosome-level), or
  aligned with a preset whose divergence ceiling excludes the region, must be flagged as a
  possible **artifact** (false anchors, truncated blocks, or false absence). It must never
  be passed as biology. Absence of masking/contiguity provenance is itself a blocker, not a
  pass.

## Property: reference-scaffold-circularity-must-be-flagged
- check: llm-judged
- assertion: A synteny conclusion computed against the same reference genome that
  scaffolded — or that supplied the homology to build pseudo-chromosomes for — the query
  assembly must be flagged as **circular** (the synteny partly re-derives the scaffolding
  input), never certified as independent evidence. The criterion is labeled unsourced /
  convention, not attributed to a primary.

## Property: WGD-depth-collapse-must-be-flagged
- check: llm-judged
- assertion: For a genome pair with unequal WGD/ploidy history, a "1:1 synteny" or "synteny
  lost" conclusion produced at alignment depth 1:1 (or with ploidy ignored) must be flagged
  as a possible many-to-one collapse artifact. The correct control (AnchorWave -R/-Q depth;
  depth read against per-lineage WGD history) must be named. Any `--ploidy` flag citation
  must be flagged as confabulated and corrected to -R/-Q.

## Property: stringency-flip-must-be-flagged
- check: llm-judged
- assertion: A synteny/collinearity conclusion reported under a single tool/stringency
  setting, with no sensitivity check, that could plausibly flip under a defensible
  alternative (MCScanX vs cscore vs orthogroup-constrained; different block-size/E-value)
  must be flagged as stringency-dependent, not robust.

## Property: small-INV-noise-must-be-flagged
- check: llm-judged
- assertion: A biological conclusion resting on many small SyRI inversion (or strand-flip)
  calls with no size/strand filtering must be flagged as possible small-INV noise; because
  SyRI states no minimum calling size, the output must not silently trust tiny calls.

## Property: anti-invention-thresholds-and-citations
- check: llm-judged
- assertion: Any threshold, flag, or citation the references do not support must be labeled
  **convention / unsourced / [GAP]**, never asserted as cited. Specifically the output must
  NOT assert as sourced: a >=5 kb inversion floor, a >=70% aligner identity floor, a >=1 Mb
  N50 chromosome-level floor, an AnchorWave `--ploidy` flag, a cscore attributed to
  Tang-2008, "blkSize = 5 orthogroups" (the unit is unique hits), a UCSC 5000-bp chain
  cutoff attributed to Kent-2003, or a resolved "Fitch 1976 J Mol Evol 7:271"
  synteny/collinearity definition.

## Property: no-invented-inflation-magnitude
- check: llm-judged
- assertion: When flagging TE/repeat-driven false anchors, the output states the direction
  (inflation) but does NOT assert a numeric fold/magnitude — the references quantify no TE
  false-anchor inflation.

## Property: clean-input-can-pass
- check: llm-judged
- assertion: When inputs are masked, chromosome-level, non-circular, ploidy-aware, robust
  across stringency, scale-stated, and citations resolvable, the referee must PASS — the
  Mold does not reflexively reject every synteny claim, or it is not discriminating.

## Property: provenance-restated-before-verdict
- check: llm-judged
- assertion: The output restates the claim as a testable proposition and records (or marks
  UNKNOWN) tool, masking, contiguity, aligner/preset, and ploidy before issuing a verdict.
  A verdict with no provenance capture is non-conforming.
