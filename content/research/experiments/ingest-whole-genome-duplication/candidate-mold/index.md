---
type: mold
name: audit-wgd-inference
tags:
  - family/b
  - role/critique
  - domain/whole-genome-duplication
  - domain/dnds
references:
  - kind: research
    ref: "[[vanneste-2013-ks-saturation]]"
    used_at: runtime
    load: upfront
    mode: condense
    evidence: corpus-observed
    purpose: "Cardinal validity axis: Ks saturation can manufacture a spurious tail 'saturation peak' that mimics a WGD even with no WGD present; bounds where Ks dating / mixture inference is trustworthy."
  - kind: research
    ref: "[[chen-2024-wgd]]"
    used_at: runtime
    load: on-demand
    trigger: "when checking wgd/Ks-pipeline defaults, the Ks saturation cutoff, or a tool-identity claim (e.g. which collinearity engine wgd v2 uses)"
    mode: condense
    evidence: corpus-observed
    purpose: "Reference pipeline + exact defaults (--kscutoff, node-weighting, mixture components) and the i-ADHoRe-not-MCScanX fact for method-identity checks."
  - kind: research
    ref: "[[sensalari-2022-ksrates]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim positions a WGD before/after a speciation, or compares Ks across differently-evolving lineages"
    mode: condense
    evidence: corpus-observed
    purpose: "Cross-lineage synonymous-substitution-rate differences invalidate naive mixed-plot placement; RRT-style branch-decomposition correction is the remedy."
  - kind: research
    ref: "[[qiao-2019-dupgen]]"
    used_at: runtime
    load: on-demand
    trigger: "when duplication-mode classification, or tandem/proximal contamination of a Ks peak, is at issue"
    mode: condense
    evidence: corpus-observed
    purpose: "Five duplication modes (WGD/tandem/proximal/transposed/dispersed); WGD = intra-genome collinear pairs; guards the 'segmental'/'tandem=5' mislabel."
  - kind: research
    ref: "[[wang-2012-mcscanx]]"
    used_at: runtime
    load: on-demand
    trigger: "when assessing synteny-anchor / collinear-block criteria or duplicate-class definitions"
    mode: condense
    evidence: corpus-observed
    purpose: "Collinear-block thresholds (score>250 / >=5 pairs, gap<25, E<1e-5) and tandem=rank-diff-1 / proximal<20 definitions; WGD signal = anchors in collinear blocks."
  - kind: research
    ref: "[[tang-2008-jcvi]]"
    used_at: runtime
    load: on-demand
    trigger: "when a specific ploidy level (duplication vs triplication) or syntenic depth/multiplicity is claimed"
    mode: condense
    evidence: corpus-observed
    purpose: "Syntenic depth/multiplicity as the ploidy index; unpurged tandems inflate multiplicity; depth must be read against an assumed per-lineage event history."
  - kind: research
    ref: "[[lovell-2022-genespace]]"
    used_at: runtime
    load: on-demand
    trigger: "when synteny/orthology block-size params or array-collapse of tandem arrays are in question"
    mode: condense
    evidence: corpus-observed
    purpose: "Synteny-anchored orthology with array-representative collapse of tandem arrays; blkSize=5 (unique hits, not orthogroups), synBuff=100, nGaps=5."
  - kind: research
    ref: "[[mendes-2020-cafe5]]"
    used_at: runtime
    load: on-demand
    trigger: "when a gene-family expansion / birth-death rate-shift is offered as independent WGD corroboration"
    mode: condense
    evidence: hypothesis
    verification: "CAFE 5 (gamma among-family rate variation; empirical-Bayes fast/slow families) is established; its use as WGD corroboration is a design inference NOT stated in the note. Verify against a source that explicitly links a gene-family expansion burst to a WGD before relying on this check."
    purpose: "Supports a converging-evidence check: an independent burst of gene-family expansions datable to the same node."
  - kind: research
    ref: "[[de-bie-2006-cafe]]"
    used_at: runtime
    load: on-demand
    trigger: "when a gene-family expansion / birth-death rate-shift is offered as independent WGD corroboration"
    mode: condense
    evidence: hypothesis
    verification: "Birth-death per-family p-values and per-branch attribution (Viterbi / branch-cutting / LRT) are established; per-family p-values are UNCORRECTED for multiple testing (note s10). WGD-corroboration framing is inferred — verify before relying."
    purpose: "Grounds branch-attribution of an expansion burst and the multiple-testing caveat on family-level p-values."
  - kind: research
    ref: "[[han-2013-cafe3]]"
    used_at: runtime
    load: on-demand
    trigger: "when a gene-family expansion is offered as WGD corroboration and the assembly/annotation quality is uncertain"
    mode: condense
    evidence: hypothesis
    verification: "Assembly/annotation-error inflation of gain/loss rates (~2.3x at eps=0.1, ~7.5x at eps=0.4; rates 'consistently overestimated') is established in the note; applying it specifically to WGD-burst evidence is inferred. Verify before relying."
    purpose: "Guards against treating a gene-count expansion burst from a fragmented assembly as real WGD signal without an error model."
---

# audit-wgd-inference

Referee a whole-genome-duplication (WGD) inference for **method validity** — whether the WGD
claim survives the known artifact axes, not whether the biology is interesting. Default posture:
a claim that cannot clear an axis is **FLAGGED, never silently passed** (the Family-B gate). A
flag names the axis, the specific unmet condition, and what evidence would clear it.

## Check 0 — Pin down what is actually claimed
Route the audit by the claim type; different claims trigger different axes:
- **(a) existence** of an ancient WGD (a peak above SSD background),
- **(b) phylogenetic placement** relative to a speciation (shared vs lineage-specific),
- **(c) ploidy level** (duplication vs triplication / higher),
- **(d) a date** for the event.

`[GAP: the routing/aggregation logic — which checks are mandatory for which claim type, and how
individual flags combine into a single PASS/FLAG verdict — is not supplied by any note; it is
design synthesis. Treat the mapping below as a working default, not a sourced rule.]`

## Check 1 — Ks saturation boundary on the peak (cardinal; always)
Grounded in `[[vanneste-2013-ks-saturation]]`.
- A tail peak at high Ks may be a **saturation peak**: an artifact where old duplicates are
  compressed onto smaller estimated Ks and pile up, mimicking a WGD **even in pure small-scale-
  duplication (no-WGD) simulations**. It is an artifact of Ks estimation, not a duplication burst.
- Reliability bounds (note these are the numbers, but they are **species-dependent**):
  Ks < 1 is the conventional "reliable" cutoff; Ks stays linearly informative to synonymous age
  ~2; **mixture-model peak inference is reliable only below synonymous distance 2–2.5**;
  underestimation is visible by age 3 (mode 2.6 vs expected 3) and severe by ages 5–20.
- **Diagnostic that a peak IS a saturation artifact, not a real WGD:** its Ks position tracks the
  *modeled timespan / Ks cutoff*, not an independently dated event (for *A. thaliana* the saturation-
  peak mode moved **2.8 → 4.4** as the modeled timespan went 5 → 20). Saturation onset is species-
  specific (faster in *D. rerio*, *C. albicans*, *K. lactis*), driven by transition bias + codon usage.
- **FLAG** any ancient-WGD claim resting on a peak in the saturation region (roughly Ks ≳ 2–2.5,
  up to ~4–5 depending on species/timespan) that is **not** independently corroborated (rate-adjusted
  date, syntenic depth, or an external calibration). Also flag the mirror error: a genuine ancient
  WGD can **fade** — its peak flattens and blends into the L-shaped SSD background — so absence of a
  peak past ~2.5 is **not** evidence of no WGD.
- Cross-check the analysis's saturation cutoff against `[[chen-2024-wgd]]`: wgd `--kscutoff` default
  is `5` but the paper recommends "typically 2 or 3" for dating; a dating claim that kept anchors far
  above 2–3 inherits saturation risk.
- `[GAP: no turnkey rule separates a saturation peak from a real WGD peak in an empirical dataset —`
  `Vanneste diagnoses the artifact and bounds reliability but leaves the operational separator`
  `unresolved. No universal numeric Ks threshold exists; per-species saturation-onset values are`
  `illustrated for a few taxa only, not tabulated. Do not apply one fixed Ks cutoff across species.]`

## Check 2 — Is the peak WGD signal, or tandem/small-scale contamination?
Grounded in `[[qiao-2019-dupgen]]`, `[[wang-2012-mcscanx]]`, `[[tang-2008-jcvi]]`, `[[lovell-2022-genespace]]`.
- WGD-derived signal is **synteny-anchored (collinear) pairs**, not the raw paranome. A Ks
  distribution built from *all* duplicate pairs mixes in tandem, proximal, transposed and dispersed
  duplicates, which can create or inflate a peak that is **not** a WGD.
- Duplication modes (`[[qiao-2019-dupgen]]`, DupGen_finder): the five classes are exactly
  **WGD, tandem, proximal, transposed, dispersed**. WGD = intra-genome MCScanX collinear pairs;
  **tandem = directly adjacent** (0 intervening genes); **proximal = ≤ `-d` genes apart, default 10**.
  There is **no "segmental" class** in DupGen and **no separate "tandem=5 / proximal 5–25" windows** —
  a claim using either is wrong (see Check 5).
- Collinear-block criteria (`[[wang-2012-mcscanx]]`): tandem = gene-rank difference 1; proximal =
  rank difference < 20; a reported block scores > 250 (≥ 5 collinear pairs), gap < 25 intervening
  genes, block E-value 1e-5; consecutive shared-gene matches within 5 genes are collapsed. Class
  priority WGD/segmental > tandem > proximal > dispersed.
- Tandem-array handling: `[[tang-2008-jcvi]]` collapses tandems < 50 kb (residual long-distance
  tandems inflate multiplicity); `[[lovell-2022-genespace]]` collapses tandem arrays to
  **array-representative** genes before ranking (blkSize = 5 *unique hits* — not orthogroups —
  synBuff = 100, nGaps = 5).
- **FLAG** a WGD claim from a raw-paranome Ks peak with no synteny-anchor (anchor-Ks) confirmation
  and no tandem/proximal removal — especially a **low-Ks** peak, where tandem arrays concentrate.
  Clearing evidence: the peak persists in the **anchor-Ks** (collinear-pair) distribution after
  tandem collapse.
- `[GAP: no note states a minimum anchor-pair COUNT that legitimizes calling a synteny signal a WGD`
  `(as opposed to one collinear block). Tang gives a block SCORE cutoff (>300), MCScanX >=5 pairs /`
  `score>250, GENESPACE blkSize=5 hits — these gate a block, not a genome-wide WGD verdict.]`

## Check 3 — Cross-lineage placement requires rate correction
Grounded in `[[sensalari-2022-ksrates]]`.
- Synonymous substitution **rates differ among lineages**, so equal-age events sit at different Ks
  depending on the lineage measured. A focal species' paralog Ks distribution is **not directly
  comparable** to ortholog Ks distributions involving other, differently-evolving species; naive
  superimposition in a "mixed plot" can **misplace a WGD relative to a speciation** (the oil-palm τ
  event was wrongly read as palm-specific in the naive plot; rate-adjustment corrected it).
- Correction = RRT-style **branch decomposition using an outgroup**: split the ortholog Ks into
  per-branch contributions, rescale the divergence onto the focal Ks scale as **twice the focal
  branch contribution** (docs example: palm–rice 1.53 → palm 0.365 + rice 1.17 → adjusted 2×0.365 =
  0.73). Requires **≥ 1 outgroup**; ksrates docs *advise* 3–4 (`max_number_outgroups` default 4).
- **FLAG** any before/after-speciation or shared/lineage-specific placement claim built from
  **uncorrected** cross-lineage Ks. Clearing evidence: rate-adjusted mixed plot with adequate
  outgroups.
- `[GAP: no HARD minimum outgroup count is sourced — the paper states only "an outgroup" (>=1);`
  `the >=3-4 figure is docs advice, not a requirement. And NO Ks validity/saturation ceiling for`
  `the correction is stated in ksrates (the value 1.53 is an example, not a cutoff) — do not cite`
  `this source for a Ks<1.5-type bound on rate correction.]`

## Check 4 — A specific ploidy level needs syntenic depth
Grounded in `[[tang-2008-jcvi]]`.
- **Syntenic depth (multiplicity)** of aligned loci indexes duplication history, read against an
  **assumed per-lineage event history**: expected multiplicity *Carica* = 3, *Vitis* = 3 (γ only),
  *Populus* = 6 (γ × p), *Arabidopsis* = 12 (γ, β, α); empirically 88 *Carica* loci at depth 3,
  54 *Populus* loci at depth 6; a 1:1:2:4 *Carica*:*Vitis*:*Populus*:*Arabidopsis* correspondence.
- A **duplication vs triplication** distinction is a depth/multiplicity claim, not a single-peak
  claim. **FLAG** a specific-ploidy claim (e.g. "paleo-hexaploidy / triplication") resting only on
  one Ks peak, with no multi-genome syntenic-depth support. Note failure modes: unpurged tandems
  inflate multiplicity above expected; misreading depth without the correct assumed event history
  misassigns ploidy.

## Check 5 — Pipeline / parameter / tool-identity sanity (method reality)
Grounded in `[[chen-2024-wgd]]`, `[[qiao-2019-dupgen]]`, `[[wang-2012-mcscanx]]`, `[[tang-2008-jcvi]]`.
The referee also judges whether the **named method is real and correctly described** (method
validity per the glossary). FLAG stated-but-false tool/parameter facts:
- **wgd v2 detects collinearity with i-ADHoRe (v3.0.01), NOT MCScanX** — a claim that wgd v2 uses
  MCScanX is wrong (`[[chen-2024-wgd]]`). wgd Ks estimator is CODEML (PAML v4.9j); redundancy removal
  is **node-weighted by default** (`--node_average` switches to node-averaging); mixture components
  default range `(1, 4)` selected by AIC/BIC (GMM).
- DupGen classes are WGD/tandem/proximal/transposed/dispersed; **"segmental" is not a class**, and
  **tandem = adjacency, proximal = single `-d` window (default 10)** — "tandem=5, proximal 5–25" is
  wrong (`[[qiao-2019-dupgen]]`).
- The 2008 MCscan (`[[tang-2008-jcvi]]`) controls stringency by BLASTP E ≤ 1e-5, best-5 hits, DP
  scoring, and score cutoffs — **no `cscore` and no `quota`** appear in that paper (those are the
  later JCVI port). A claim attributing a `--cscore` to Tang-2008 is wrong.

## Check 6 — Independent corroboration (birth-death), with the assembly-error caveat
Grounded (as hypothesis-evidence) in `[[de-bie-2006-cafe]]`, `[[mendes-2020-cafe5]]`, `[[han-2013-cafe3]]`.
- A WGD claim is **strengthened** if an independent phylogenomic signal — a burst of gene-family
  **expansions datable to the same node** — corroborates it. CAFE fits a birth-death process to
  family sizes and attributes rate shifts to branches (Viterbi per-branch p-value, branch-cutting,
  LRT; `[[de-bie-2006-cafe]]`), with among-family rate variation via gamma categories + empirical
  Bayes for fast/slow families (`[[mendes-2020-cafe5]]`).
- **Caveat that limits how much weight this evidence carries:**
  - Assembly/annotation error **inflates** gain/loss rates — "consistently overestimated," ~2.3×
    at ε=0.1 and ~7.5× at ε=0.4 (`[[han-2013-cafe3]]`). A gene-count expansion burst from a
    **fragmented assembly without an error model** is not trustworthy WGD evidence.
  - CAFE per-family p-values are **uncorrected for multiple testing** (`[[de-bie-2006-cafe]]` §10),
    so a handful of "significant" expanded families is weak corroboration on its own.
- Use this as a **corroboration/robustness** check, not a primary axis.
- `[GAP: NO sourced note states that a CAFE expansion burst confirms a WGD or quantifies the`
  `corroboration strength — the CAFE notes are about gene-family evolution generally, not WGD`
  `detection. The link is a design inference (hence hypothesis-evidence on these three refs).]`

## Check 7 — Small-sample / rugged-histogram artifact
Grounded in `[[vanneste-2013-ks-saturation]]`.
- Small duplicate-pair distributions give a **rugged density curve with spurious local maxima** that
  can masquerade as peaks. FLAG a WGD peak drawn from few pairs / a visibly rugged histogram as a
  possible small-sample artifact.
- `[GAP: no numeric bin-width or minimum sample-count threshold is given (Vanneste notes the effect`
  `qualitatively; bin-width effect on peak detection is partially ABSENT). The referee cannot cite a`
  `sourced number for "too few pairs".]`
