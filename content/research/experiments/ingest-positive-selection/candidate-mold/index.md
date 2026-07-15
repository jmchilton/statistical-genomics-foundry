---
type: mold
name: audit-positive-selection-claim
tags:
  - family/b
  - role/critique
  - domain/molecular-evolution
  - topic/dnds
references:
  - kind: research
    ref: "[[alvarez-carretero-2023-paml-guide]]"
    used_at: runtime
    load: upfront
    mode: condense
    evidence: corpus-observed
    purpose: "Procedure spine: the codeml workflow, the four model families (M0 / site / branch / branch-site A), the nested LRT pairs and their df, and the named false-positive drivers to screen for."
  - kind: research
    ref: "[[paml-manual]]"
    used_at: runtime
    load: upfront
    mode: condense
    evidence: corpus-observed
    purpose: "Authoritative control-file specs (model/NSsites/fix_omega), the NSsites↔M-model table with #free-params, the M8a-vs-M8 and branch-site A-vs-A1 nulls, BEB scope, and the 50:50-mixture-vs-conservative-χ² null rule."
  - kind: research
    ref: "[[zhang-2005-branch-site]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim rests on a branch-site test, or when a foreground branch is designated"
    mode: condense
    evidence: corpus-observed
    purpose: "Which branch-site test is valid: Test 2 (A vs A-null, ω2=1 fixed) is a direct test; Test 1 (A vs M1a) conflates relaxed constraint with selection and is invalid. NEB unusable, BEB required. Mixture (2.71) vs conservative χ²₁ (3.84) dual recommendation."
  - kind: research
    ref: "[[anisimova-2003-recombination]]"
    used_at: runtime
    load: on-demand
    trigger: "when the alignment may contain recombination (viral, high-divergence, or population data) and a single tree was assumed"
    mode: condense
    evidence: corpus-observed
    purpose: "Cardinal sin #1: unmodeled recombination inflates site-model type-I error to as high as 90–100%; M7–M8 most robust, M0–M3/M1–M2 worst; remedy = detect/remove recombinant sequences."
  - kind: research
    ref: "[[pond-2006-gard]]"
    used_at: runtime
    load: on-demand
    trigger: "when recombination screening is needed as a prerequisite to a codon-selection claim"
    mode: condense
    evidence: corpus-observed
    purpose: "The recombination-screening remedy: GARD detects breakpoints by AICc model selection (NOT a p-value), partitions into nonrecombinant fragments; per-fragment selection analysis 'restored good statistical properties.'"
  - kind: research
    ref: "[[schneider-2009-alignment-error]]"
    used_at: runtime
    load: on-demand
    trigger: "when alignment quality is unverified or the data are novel/low-coverage/hard-to-align"
    mode: condense
    evidence: corpus-observed
    purpose: "Cardinal sin #2: sequencing/annotation/alignment error inflates inferred positively-selected-gene fraction (alignment alone 1.6×; all-bad vs all-good 7.2×). Detector = HoT <100% head/tail disagreement; dS-saturation symptom."
  - kind: research
    ref: "[[lucaci-2023-busted-mh]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim uses a single-hit codon model and signal concentrates on short branches or few sites"
    mode: condense
    evidence: corpus-observed
    purpose: "Cardinal sin #3: unmodeled multi-nucleotide (multi-hit) substitutions inflate ω and drive false EDS (FPR up to 100%, worst on short branches). Remedy = BUSTED+MH/+S+MH + model averaging; diagnostic = +S vs +S+MH discordance, single-site dependence."
  - kind: research
    ref: "[[galtier-duret-2007-gbgc]]"
    used_at: runtime
    load: on-demand
    trigger: "when an accelerated-rate / elevated-ω claim sits in a GC-rich or high-recombination region"
    mode: condense
    evidence: corpus-observed
    purpose: "Cardinal sin #4: GC-biased gene conversion can produce an acceleration signal that mimics selection; gBGC is an extended null to exclude. NOTE: abstract-only source — existence of the confounder only; discrimination criteria/mechanism/thresholds are a GAP."
  - kind: research
    ref: "[[anisimova-yang-2007]]"
    used_at: runtime
    load: on-demand
    trigger: "when more than one branch/lineage was tested, or the foreground was not fixed a priori"
    mode: condense
    evidence: corpus-observed
    purpose: "Cardinal sin #5 (part): testing many branches without a priori foreground needs multiple-testing correction; control FWER (Rom's preferred, Bonferroni acceptable). Test unreliable under extreme divergence + serious model violation (FWER up to ~25%)."
  - kind: research
    ref: "[[murrell-2015-busted]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim is gene-wide episodic selection, or a site method was used to draw a gene-wide conclusion"
    mode: condense
    evidence: corpus-observed
    purpose: "HyPhy gene-wide test: BUSTED (≥1 site under selection on ≥1 foreground branch); null ω3=1; conservative χ²₂. Wrong-level sin: don't use a site method (MEME) for gene-wide inference. Background must be modeled or the foreground test is confounded."
  - kind: research
    ref: "[[murrell-2012-meme]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim is site-wise (which sites) episodic selection"
    mode: condense
    evidence: corpus-observed
    purpose: "HyPhy site-wise test: MEME detects episodic diversifying selection per site (mixture 0.33:0.30:0.37 of χ²₀/χ²₁/χ²₂). Controls site-wise not family-wise error; do not combine sites into an alignment-wide test. Anti-conservative at divergence >0.4."
  - kind: research
    ref: "[[smith-2015-absrel]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim is which branches show selection in an exploratory (no a-priori foreground) scan"
    mode: condense
    evidence: corpus-observed
    purpose: "HyPhy branch test: aBSREL (adaptive per-branch ω classes via AICc; mixture 50% χ²₀ + 20% χ²₁ + 30% χ²₂). Built-in Holm–Bonferroni FWER correction when >1 branch tested — its guard against multi-branch false positives."
  - kind: research
    ref: "[[messer-petrov-2013]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim is a McDonald–Kreitman α (polymorphism-vs-divergence), not a phylogenetic dN/dS test"
    mode: condense
    evidence: corpus-observed
    purpose: "Population-genetics branch of the spine: standard MK underestimates α under linked selection / slightly deleterious mutations (can go negative even after frequency cutoffs). Remedy = asymptotic MK. Detector = negative α; spurious inferred expansion from DFE-methods."
  - kind: research
    ref: "[[msmb-chap6]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim is a genome/proteome scan over many genes (or many branches)"
    mode: condense
    evidence: corpus-observed
    purpose: "The multiplicity layer: FWER (Bonferroni) vs FDR (Benjamini–Hochberg) choice, the p-value histogram as the key calibration diagnostic, and the p-hacking / HARKing / affirming-the-null failure modes that also apply to selection scans."
---

# audit-positive-selection-claim

**Family B — referee (critique, with calibrate hooks).** Given a claim that a gene, site, or
lineage is under positive (Darwinian / diversifying) selection inferred from dN/dS (ω), decide
whether the claim's **method is valid** — the layer beneath the p-value. Do not re-run the analysis
to bless it; audit it against the procedure spine and the named cardinal sins, and return a verdict
that either **passes**, **flags** (fixable, with the remedy), or **rejects** (invalid as stated).

Non-self-certifying: a "pass" requires that the screened confounds were actually excluded by the
analyst (with evidence), not merely unmentioned.

## 0. Intake — what is being claimed?

Establish, before auditing:
- **Level of the claim**: gene-wide ("this gene is under selection"), site-wise ("these codons"),
  branch/lineage ("this lineage"), or a population-genetics rate of adaptation (McDonald–Kreitman α).
- **Method named**, and whether it is a real, recognized method (see §1). An invented or
  unrecognized method → reject as unrecognized; do not rationalize it.
- **Data regime**: divergence, number of taxa/sequences, viral vs. mammalian vs. population,
  alignment provenance.

## 1. Procedure spine — is the right test being used for the question?

### 1a. PAML / codeml site models (which sites, across the whole tree)
Model set and control-file specs `[[paml-manual]]` `[[alvarez-carretero-2023-paml-guide]]`:
M0 (`NSsites=0`), M1a (`=1`), M2a (`=2`), M7 (`=7`), M8 (`=8`); all with `model=0`.

Nested LRT pairs and df `[[paml-manual]]` `[[alvarez-carretero-2023-paml-guide]]`:
- **M1a vs M2a — df = 2** — positive-selection test.
- **M7 vs M8 — df = 2** — positive-selection test.
- **M8a vs M8** — third site test; M8a = `NSsites=8, fix_omega=1, omega=1`; null = 50:50 mixture of
  point mass 0 and χ²₁ (crit 2.71 at 5%, 5.41 at 1%) `[[paml-manual]]`.
- **M0 vs M1a (df=1) and M0 vs M3 are tests of among-site ω VARIABILITY, NOT positive selection.**
  A significant M0-vs-M1a/M0-vs-M3 cited as evidence of selection is a misuse `[[alvarez-carretero-2023-paml-guide]]` `[[paml-manual]]`.

Site-test stringency note: M1a–M2a is more stringent than M7–M8; sites under weak positive selection
get lumped into the ω=1 class `[[alvarez-carretero-2023-paml-guide]]` `[[paml-manual]]`.

### 1b. Branch-site model A (selection on specified foreground lineages, at some sites)
Alternative A: `model=2, NSsites=2, fix_omega=0`. Null A1: `model=2, NSsites=2, fix_omega=1, omega=1`
(ω2 fixed = 1). LRT **df = 1** `[[paml-manual]]` `[[alvarez-carretero-2023-paml-guide]]`.

- **Use Test 2 (A vs A1).** It is a direct test of positive selection `[[zhang-2005-branch-site]]`.
- **Reject Test 1 (A vs M1a) as a positive-selection test.** It cannot separate positive selection
  from relaxed constraint on the foreground; under relaxed constraint its rejection rate reaches
  ~40–100% `[[zhang-2005-branch-site]]`. The manual also marks Test 1 "not recommended" `[[paml-manual]]`.
- **Null distribution:** theoretically a 50:50 mixture of 0 and χ²₁ (crit **2.71** at 5%, 5.41 at 1%),
  **but** both the original paper and the manual deliberately adopt the conservative plain **χ²₁ (crit
  3.84 at 5%, 5.99/6.63 at 1%)** to guard against small samples and model-assumption violations
  `[[zhang-2005-branch-site]]` `[[paml-manual]]`. A referee must NOT flatten this to "2.71 only" — the
  applied-in-practice cutoff is the conservative 3.84.

### 1c. Branch models (whole-lineage ω)
`model=2, NSsites=0`; foreground tagged `#1` in the Newick tree; null = M0; df = 1 (df = 2 in the
rooted two-branches-around-root variant) `[[alvarez-carretero-2023-paml-guide]]` `[[paml-manual]]`.
Note: whole-gene / all-branches average ω "is seldom greater than 1 … virtually no power" — an
average-ω argument for selection is inherently weak `[[alvarez-carretero-2023-paml-guide]]` `[[paml-manual]]`.

### 1d. HyPhy tests (random-effects family)
- **BUSTED** — gene-wide: is ≥1 site under selection on ≥1 foreground branch? Null constrains
  foreground ω3=1; LRT referenced **conservatively against χ²₂** (true law an intractable χ²₀/χ²₁/χ²₂
  mixture). Background must be modeled or the foreground test is confounded. For *which sites*, the
  authors recommend MEME, not BUSTED `[[murrell-2015-busted]]`.
- **MEME** — site-wise episodic selection (β⁺ > α on a subset of branches). Null distribution =
  **0.33:0.30:0.37 mixture of χ²₀/χ²₁/χ²₂**. Controls the **site-wise, not family-wise** error rate;
  **combining site results into an alignment-wide claim is explicitly not recommended**
  `[[murrell-2012-meme]]`.
- **aBSREL** — which branches, exploratory (no a-priori foreground): adaptive per-branch ω-class count
  via **AICc**; null = **50% χ²₀ + 20% χ²₁ + 30% χ²₂** mixture; applies **Holm–Bonferroni** FWER
  correction whenever >1 branch is tested `[[smith-2015-absrel]]`.
- **BUSTED+MH / BUSTED+S+MH** — the multi-hit-aware extension (see §2c). EDS test = LRT vs. constrained
  ω3=1, crit from 50:50 mixture of χ²₀ and χ²₂ `[[lucaci-2023-busted-mh]]`.

### 1e. Population-genetics claim (McDonald–Kreitman α)
If the claim is an adaptation rate α from polymorphism vs. divergence (not a phylogenetic ω test):
standard MK estimator α ≈ 1 − (d₀/d)(p/p₀) `[[messer-petrov-2013]]`. See §2f for its cardinal sin
(linked selection) and the asymptotic-MK remedy.

## 2. Validity axis — the cardinal sins (each: detector → remedy the notes give)

A pass requires each applicable sin to have been screened and excluded.

### 2a. Unmodeled recombination
- **Why it invalidates:** codon site models assume one tree for all sites; recombination forces a
  single (star-biased) tree onto sites with different genealogies, and the resulting tree-length
  variation is misread as ω>1. Type-I error rises to as high as **90–100%**; M0–M3 (up to 98%) and
  M1–M2 (up to 80%) worst, **M7–M8 most robust (up to 20%)**; a star topology alone gives false
  positives even with zero recombination `[[anisimova-2003-recombination]]`.
- **Detector / remedy:** screen with **GARD**, which calls breakpoints by **AICc model selection
  (a break is inferred when it lowers AICc), NOT a p<0.05 rule** `[[pond-2006-gard]]`. Partition into
  nonrecombinant fragments and analyze each separately — this "restored good statistical properties"
  of the downstream test `[[pond-2006-gard]]`. Also: prefer M7–M8, and remove sequences involved in
  major recombination events `[[anisimova-2003-recombination]]`.
- Site tests are robust to *low* recombination but "the false positive rate can be very high at high
  recombination rate" `[[alvarez-carretero-2023-paml-guide]]`.
- `[GAP: the exact factor by which unmodeled recombination inflates downstream false positives — pond-2006-gard's numeric FEL rates are in Fig. 3, not captured; and no note gives an operational "screen when ρ > X on real data" trigger. Needs the GARD Fig. 3 values or an operational recombination-screen threshold source.]`

### 2b. Alignment (and sequencing/annotation) error
- **Why it invalidates:** errors hit synonymous and nonsynonymous sites equally, adding noise at
  dN/dS≈1 that multi-category site models pick up as a spurious ω>1 class. Ambiguously-aligned genes
  showed a **1.6×** higher positively-selected fraction; "all-bad" vs "all-good" genes **7.2×**
  `[[schneider-2009-alignment-error]]`.
- **Detector:** **HoT (Heads-or-Tails) < 100%** head/tail alignment disagreement flags ambiguous
  alignment; low trace coverage (<3×) and "novel"/inferred annotation are companion flags
  `[[schneider-2009-alignment-error]]`. Some aligners "lump nonhomologous sites into one column,
  creating apparent nonsynonymous substitutions" `[[alvarez-carretero-2023-paml-guide]]`.
- **Remedy:** align proteins first then build the codon alignment; remove predominantly-gap /
  hard-to-align regions; restrict to well-covered, known-annotation, unambiguously-aligned genes
  `[[schneider-2009-alignment-error]]` `[[alvarez-carretero-2023-paml-guide]]`. `cleandata=1` renumbers
  sites and shifts BEB indices — a mechanical trap `[[alvarez-carretero-2023-paml-guide]]`.

### 2c. Multi-nucleotide (multi-hit) substitutions
- **Why it invalidates:** single-hit codon models force a real 2H/3H change into successive
  single-nucleotide steps; when those forced steps are nonsynonymous and packed onto a **short
  branch**, ω is inflated — simulated FPR climbs to **100%** `[[lucaci-2023-busted-mh]]`. Also named as
  a false-positive driver by the PAML guide `[[alvarez-carretero-2023-paml-guide]]`.
- **Detector:** **+S vs +S+MH EDS discordance** (+S detects, better/comparable-AICc +S+MH does not →
  the +S signal is suspect); nonzero δ (2H) / ψ (3H) with non-trivial B_2H/B, B_3H/B fractions; a
  single (branch,site) pair or single codon carrying most of the LRT signal `[[lucaci-2023-busted-mh]]`.
- **Remedy:** fit BUSTED+MH/+S+MH and use the **model-averaged** EDS call; CLI `--multiple-hits
  Double` or `Double+Triple` `[[lucaci-2023-busted-mh]]`.
- **Do not misread parameters:** there is no "ω_DH>1"; MH is carried by δ/ψ (not directly
  interpretable) — read B_2H/B, B_3H/B, not δ magnitude `[[lucaci-2023-busted-mh]]`.

### 2d. GC-biased gene conversion (gBGC)
- **Why it invalidates:** an accelerated / elevated-rate signal can be produced by gBGC rather than
  selection, for neutral *and* constrained sequences; gBGC should be treated as an **extended null to
  exclude before inferring adaptation** `[[galtier-duret-2007-gbgc]]`. The PAML guide also lists biased
  gene conversion as a false-positive driver `[[alvarez-carretero-2023-paml-guide]]`.
- **Detector / remedy:** `[GAP: the actual discrimination criteria, the W→S mechanism, and any numeric threshold are NOT recoverable — galtier-duret-2007-gbgc is abstract-only. A referee can flag "gBGC not excluded" for a GC-rich / high-recombination-region claim, but cannot yet supply the operational test. Needs a full-text gBGC source (e.g. the paywalled body or Galtier 2013).]`
- The external "W→S ratio > 1.5" cutoff is [convention / attributable to a different source, not citable to galtier-duret-2007-gbgc].

### 2e. Post-hoc foreground / uncorrected multiple testing
- **Why it invalidates:** the foreground branch(es) for a branch/branch-site test **must be specified a
  priori** from a biological hypothesis. Testing many branches without a hypothesis inflates the
  family-wise false-positive rate `[[anisimova-yang-2007]]` `[[alvarez-carretero-2023-paml-guide]]`.
- **Remedy:** correct for multiple testing — **control FWER; Rom's procedure preferred (slightly higher
  power), Bonferroni an acceptable fallback**; FDR (BH, Storey) buys power but raises FWER, so is not
  the default for "is any lineage selected at all" scans `[[anisimova-yang-2007]]`. Bonferroni "may be
  too conservative" `[[alvarez-carretero-2023-paml-guide]]`. aBSREL builds Holm–Bonferroni in
  `[[smith-2015-absrel]]`.
- **Extreme-divergence caution:** the branch-site test becomes unreliable under extreme divergence +
  serious model violation (FWER up to ~25%) `[[anisimova-yang-2007]]`; correction may itself be
  unreliable if sequences are extremely divergent `[[alvarez-carretero-2023-paml-guide]]`.
- `[GAP: the type-I inflation attributable specifically to choosing the foreground AFTER inspecting the data (a-posteriori foreground) is not quantified in any note — zhang-2005-branch-site explicitly assumes correct a-priori foreground and gives no number. Needs a source that simulates post-hoc foreground selection.]`

### 2f. Linked selection (for a McDonald–Kreitman α claim)
- **Why it invalidates:** under genetic draft / background selection plus slightly deleterious
  mutations, standard MK **underestimates α**, even after excluding sub-50% polymorphisms, and can go
  **negative** `[[messer-petrov-2013]]`.
- **Detector:** a **negative α** estimate; DFE-correcting methods that "always infer a population
  expansion that never occurred" (≥5-fold even at α=0) `[[messer-petrov-2013]]`.
- **Remedy:** **asymptotic MK** — compute frequency-resolved α(x) = 1 − (d₀/d)(p(x)/p₀(x)), fit
  α(x)=a+b·exp(−cx) for x≥0.1, extrapolate to x→1 `[[messer-petrov-2013]]`.
- The "≥50 sites per frequency bin" data requirement is [convention — explicitly NOT stated by
  messer-petrov-2013, not citable to it].

### 2g. Wrong-level and wrong-estimator misuses (quick screen)
- Site method (MEME) used to make a **gene-wide** claim → wrong level; use a gene-wide test (BUSTED)
  `[[murrell-2015-busted]]` `[[murrell-2012-meme]]`.
- MEME site results **combined into an alignment-wide test** → forbidden by the method
  `[[murrell-2012-meme]]`.
- **NEB** used for site identification → replace with **BEB**; NEB is "unusable" / ignore NEB
  `[[zhang-2005-branch-site]]` `[[paml-manual]]` `[[alvarez-carretero-2023-paml-guide]]`.
- **Significant LRT but no high-BEB site**, over-claimed as located selection → power to localize is
  low; do not over-interpret. Conversely a high-BEB site with a non-significant LRT "should not be
  interpreted as providing evidence for positive selection" `[[zhang-2005-branch-site]]`.

## 3. Defaults / thresholds (cite where a note supplies; label conventions)

| Quantity | Value | Source / label |
|---|---|---|
| χ²(df=1) crit | 3.84 (5%), 6.63 (1%) | `[[paml-manual]]` `[[alvarez-carretero-2023-paml-guide]]` |
| χ²(df=2) crit | 5.99 (5%), 9.21 (1%) | `[[paml-manual]]` `[[alvarez-carretero-2023-paml-guide]]` |
| Branch-site / M8a 50:50-mixture crit | 2.71 (5%), 5.41 (1%) | `[[paml-manual]]` `[[zhang-2005-branch-site]]` |
| Branch-site null applied in practice | conservative χ²₁ (3.84) | `[[zhang-2005-branch-site]]` `[[paml-manual]]` |
| M1a–M2a / M7–M8 df | 2 | `[[paml-manual]]` `[[alvarez-carretero-2023-paml-guide]]` |
| Branch-site A vs A1 df | 1 | `[[paml-manual]]` `[[alvarez-carretero-2023-paml-guide]]` |
| BUSTED null reference | conservative χ²₂ | `[[murrell-2015-busted]]` |
| MEME null | 0.33:0.30:0.37 χ²₀/χ²₁/χ²₂ | `[[murrell-2012-meme]]` |
| aBSREL null | 0.50/0.20/0.30 χ²₀/χ²₁/χ²₂ | `[[smith-2015-absrel]]` |
| BEB site markers | `*` >95%, `**` >99% | `[[paml-manual]]` |
| BEB cutoffs used (site models 90/95; branch-site 95/99) | reported, undefended | `[[zhang-2005-branch-site]]` `[[alvarez-carretero-2023-paml-guide]]` |
| Nominal significance α | p ≤ 0.05 | [convention — MEME/BUSTED notes flag 0.05 as nominal, not a defended recommendation, not citable] |
| BEB posterior cutoff choice | 90/95/99% | [convention — not justified in the sources] |
| MK asymptotic "≥50 sites/bin" | — | [convention — NOT from messer-petrov-2013] |
| gBGC "W→S ratio >1.5" | — | [convention — NOT from galtier-duret-2007-gbgc] |
| dS / branch-length saturation cutoff | — | `[GAP: no saturation pre-check or dS reliability threshold exists in paml-manual or alvarez-carretero (explicitly absent); the "dS<1.5 / dS<3, Yang PAML manual" citation is mis-attributed. Needs a saturation-diagnostic source.]` |

## 4. Genome / proteome-scan multiplicity layer

When the claim is a scan over many genes (and/or many branches):
- Choose the error rate deliberately: **FWER (Bonferroni)** when any single false positive is costly;
  **FDR (Benjamini–Hochberg)** when screening candidates and a controlled *fraction* of false positives
  is acceptable — FWER is often too stringent at genome scale `[[msmb-chap6]]`.
- **The p-value histogram is the key calibration diagnostic** — always plot it: a flat uniform null +
  a peak near 0 passes; a mid/near-1 hump signals mis-calibration, dependence, or a wrong null
  `[[msmb-chap6]]`.
- Watch for **p-hacking / HARKing / affirming the null**: a non-significant test is not evidence of no
  selection (could be low power) `[[msmb-chap6]]` `[[alvarez-carretero-2023-paml-guide]]`.
- Empirically, MH-aware and FDR handling matter at scale: under BH (q≤0.2) multi-hit models drop ~3-fold
  `[[lucaci-2023-busted-mh]]`.

## 5. Verdict rubric

Emit one of:
- **REJECT (invalid as stated)** — the method is the wrong test for the claim (Test 1 as a
  positive-selection test; M0-vs-M1a cited as selection; site method for a gene-wide claim; combined
  MEME sites; an unrecognized/invented method), or an applicable cardinal sin is present and
  unaddressed with no fixable path.
- **FLAG (fixable)** — an applicable confound was not screened; name the detector and the remedy from
  §2 the analyst must run (GARD split; HoT/quality filter; BUSTED+MH; multiple-testing correction;
  BEB not NEB; asymptotic MK). A flag is not a pass.
- **PASS** — the test matches the claim level; every applicable sin was screened and excluded **with
  evidence** (a-priori foreground; GARD-clean or per-fragment; HoT/quality OK; MH modeled or shown
  negligible; correction applied; BEB used); the null distribution / critical value used is correct for
  the test; and thresholds without a primary are labeled convention, not asserted as authority.

For any threshold or decision-rule the analyst relies on that is not traceable to a primary source,
require it be labeled **convention** — do not let a convention be cited as if it were established.
