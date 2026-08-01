# scenarios — audit-wgd-inference

Concrete cases exercised by the eval.md oracle. Planted-invalid fixtures dominate (each bound to its
expected referee verdict); one valid negative control must PASS.

## Case: saturated-peak-claimed-as-ancient-WGD
- fixture: A plant genome; whole-paranome Ks distribution shows a broad peak at **Ks ≈ 3.5**. Author
  claims an ancient WGD. No rate-adjusted date; anchors were kept up to the wgd `--kscutoff` default
  of 5; no external calibration; peak position not tied to a dated node.
- expect: **FLAGGED** — peak sits in the saturation region above the recommended dating cutoff (2–3);
  could be a saturation peak (mode tracks the modeled span, not an event). Referee demands anchor-Ks +
  independent corroboration; cites the species-specific nature of the boundary.

## Case: cross-lineage-placement-no-rate-correction (oil-palm τ analog)
- fixture: Focal species' paralog Ks peak overlaid on another, faster-evolving species' ortholog Ks
  line in a **naive mixed plot**; author concludes the WGD is lineage-specific (postdates the
  speciation). No branch-decomposition / outgroup rate adjustment applied.
- expect: **FLAGGED** — uncorrected cross-lineage Ks can misplace the WGD relative to speciation.
  Referee demands rate correction (RRT-style branch decomposition with outgroup(s)) before the
  placement stands.

## Case: tandem-array-cluster-mislabeled-WGD-peak
- fixture: Sharp **low-Ks** peak (Ks ≈ 0.2) from the raw paranome; the duplicate set is dominated by
  same-chromosome adjacent/near-adjacent pairs; no synteny anchoring, no tandem/proximal removal.
  Author calls it a recent WGD.
- expect: **FLAGGED** — a low-Ks paranome peak is the signature of tandem/proximal contamination
  (tandem = adjacency; proximal ≤ 10 genes). Referee demands the peak be reproduced in the anchor-Ks
  (collinear-pair) distribution after tandem-array collapse.

## Case: triplication-claimed-from-single-peak
- fixture: One Ks peak in one genome; author claims a paleo-hexaploidy (triplication, γ-type). No
  multi-genome alignment, no syntenic-depth/multiplicity evidence.
- expect: **FLAGGED as under-supported** — ploidy level is a depth/multiplicity claim; a single peak
  cannot distinguish duplication from triplication. Referee asks for cross-species syntenic depth read
  against an assumed event history.

## Case: false-tool-identity-wgd-mcscanx
- fixture: Methods state "we detected WGD-derived collinearity in **wgd v2 using MCScanX**."
- expect: **FLAGGED** (deterministic) — wgd v2's `syn` uses **i-ADHoRe (v3.0.01)**; MCScanX appears
  nowhere in wgd v2. Method-identity error, not passed.

## Case: false-duplication-class-vocabulary
- fixture: A DupGen_finder analysis reports a "**segmental**" duplication class and states
  "tandem = 5 genes, proximal = 5–25 genes."
- expect: **FLAGGED** (deterministic) — DupGen's five classes are WGD/tandem/proximal/transposed/
  dispersed; **no "segmental" class**; tandem = adjacency, proximal = single `-d` window (default 10).

## Case: expansion-burst-from-fragmented-assembly
- fixture: Author corroborates a WGD with a CAFE gene-family **expansion burst** at the node — but
  the genome is a fragmented draft assembly and CAFE was run on **raw gene counts with no error
  model**; a few families flagged "significant" with uncorrected per-family p-values.
- expect: **FLAGGED** — gain/loss rates are inflated by assembly/annotation error (needs an error
  model; ~2.3×–7.5× inflation range), and per-family p-values are uncorrected for multiple testing.
  Corroboration is not admissible as-is.

## Case: ancient-WGD-absence-overclaimed
- fixture: No Ks peak visible above Ks ≈ 2.5; author concludes the lineage has **no** ancient WGD.
- expect: **FLAGGED / inconclusive** — old WGD peaks fade into the L-shaped SSD background; absence at
  high Ks is not evidence of absence. Referee marks the negative claim unsupported.

## Case: rugged-small-sample-peak
- fixture: A "peak" identified in a Ks histogram built from a small number of duplicate pairs; the
  density curve is visibly rugged with several local maxima.
- expect: **FLAGGED** as possible small-sample artifact. `[GAP: referee cannot cite a sourced
  minimum-pair-count / bin-width threshold — flag is qualitative.]`

## Case: valid-anchor-Ks-WGD (negative control — must PASS)
- fixture: WGD claimed from an **anchor-Ks** (synteny-based, tandem-collapsed) peak at **Ks ≈ 0.8**
  (within the reliable range); placement relative to a speciation done with **rate-adjusted** mixed
  plot using 4 outgroups; syntenic depth across genomes consistent with the claimed ploidy; wgd
  defaults reported correctly (i-ADHoRe, CODEML, node-weighted).
- expect: **PASS** — clears the saturation, anchor-identity, rate-correction and depth axes; no
  false-tool-identity flags. Referee certifies conditionally on these cleared axes.
