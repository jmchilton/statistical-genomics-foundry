# Scenarios — audit-batch-design-validity

Each case binds a **specific doer configuration** and **its actual output**; the audit consumes that and
must return the stated verdict. Planted-invalid = a deliberately mis-configured doer run. Clean control =
a correct run that must PASS.

---

## Case: PLANTED-INVALID — aliased design, "corrected" and certified
- fixture: **Doer config.** `DESeqDataSet` from a 6-sample count matrix. `colData`:
  `condition = c(A,A,A,B,B,B)`, `batch = factor(c(1,1,1,2,2,2))`. DESeq2 1.52.0.
  The doer sets `design = ~ batch + condition`, receives
  `the model matrix is not full rank, so the model cannot be fit as specified.`, then **drops batch**,
  re-specifies `design = ~ condition`, runs `DESeq(dds)`, and reports the condition results.
  **Doer output:** a results table of significant genes, plus the sentence "batch was confounded with
  condition so it was removed from the model; the condition effect is reported."
- expect: **CAUGHT — Axis 1. FAIL → ESCALATE.** The referee must state that there is no way to separate
  the condition effects from the batch effects, cite `[[deseq2]]`'s two options (assume there is no batch
  effect — which the source deems highly unlikely — or rerun the experiment with conditions balanced
  across batches), and refuse to certify. Dropping batch from the formula is what DESeq2 says you must
  *mechanically* do; it is **not** a resolution of the validity problem, and the referee must say so.
  It must NOT suggest ComBat, ComBat_seq, sva, or svaseq as a fix. Verdict must not be REVISE.

## Case: PLANTED-INVALID — the same design, "corrected" with ComBat_seq
- fixture: **Doer config.** Same 6-sample aliased colData. The doer runs
  `ComBat_seq(counts = cts, batch = batch, group = condition)`, obtains an adjusted integer count matrix,
  builds a fresh `DESeqDataSet` on it with `design = ~ condition`, runs `DESeq()`.
  **Doer output:** an adjusted count matrix + a results table + "batch effects were removed with
  ComBat-seq prior to testing."
- expect: **CAUGHT — Axis 1 (FAIL → ESCALATE), reinforced by Axis 3 and Axis 6.** Batch and condition are
  the same variable; there is nothing for `γ_gi` to estimate that is not the condition effect.
  `[[zhang-2020-combat-seq]]`'s own Discussion: the gene-wise NB GLM "may not work well on data with
  severely or even completely confounded study designs." The referee must not treat the integer-preserving
  output as evidence of validity — the source's compatibility claim is about **format**, not calibration.
  *This is the cardinal sin instantiated. If it passes, the Mold is worthless.*

## Case: CLEAN CONTROL — batch is known and modelled
- fixture: **Doer config.** `airway` (`[[rnaseqgene]]`): 8 samples, 4 cell lines × (untrt, trt),
  dexamethasone 1 µM / 18 h, GEO GSE52778. DESeq2 **1.52.0**, Bioconductor **3.23**. Pre-filter
  `keep <- rowSums(counts(dds) >= 10) >= 4` → 16637 rows. `design = ~ cell + dex`; `dds <- DESeq(dds)`;
  `res <- results(dds)`.
  **Doer output:** at adjusted p < 0.1 — up **2362 (14%)**, down **2019 (12%)**, outliers 0, low counts
  646 (3.9%); no adjusted matrix produced; design table + versions + invocation supplied.
- expect: **PASS on every axis.** Axis 1: full rank (each cell line contains both conditions). Axis 2:
  does not fire — the adjustment is a model term, not a data edit, and the design is balanced. Axis 3: no
  transformation applied, so no diagnose-first obligation. Axis 6: not applicable. **Calibrate:** p-value
  histogram — uniform background plus a left peak. Verdict: **CERTIFY**, with the calibrate pass recorded.
  A referee that flags this run has failed the `three-legs-required` property.

## Case: PLANTED-INVALID — Nygaard's correct-then-test, on an unbalanced design
- fixture: **Doer config.** 30 samples, 3 batches. Treatment/control counts per batch: **6/2, 3/4, 9/6**
  (i.e. batch 1 is 3:1 treatment-heavy while the overall ratio is 18:12 = 3:2 — the equal-ratio condition
  `n_iA:n_iB = n_A:n_B` is violated). The doer runs **ComBat with the group (outcome) as a covariate**,
  obtains a "batch effect free" matrix, then runs **limma ignoring batch**.
  **Doer output:** **1003** significant probes, reported as differentially expressed.
  (`[[nygaard-2016]]`'s Experiment 2 — the ComBat original article's "Data set 2".)
- expect: **CAUGHT — Axis 2. FAIL → REVISE.** All three legs present. The referee must name the mechanism
  (the batch-effect estimation error is applied as a point estimate across each batch and then dropped
  downstream → deflated variance → inflated F), state the exact no-inflation condition it violates, and
  route to the endorsed remedy: **account for batch in the statistical analysis**. Comparison arm the
  referee cites: limma blocking for batch on the same data → **377** probes.
  **Calibrate (mandatory):** rerun the identical pipeline with the real data replaced by N(0,1), design
  retained → non-uniform p-values, inflated F.
  Route: **REVISE**, not ESCALATE — this design is analyzable, just not this way.

## Case: CLEAN CONTROL — ComBat-then-test on a design that satisfies the equal-ratio condition
- fixture: **Doer config.** 30 samples, 3 batches, treatment/control = **5/5, 5/5, 5/5** (every batch
  reproduces the overall 1:1 ratio). Same pipeline as above: ComBat with group as covariate, then limma
  ignoring batch.
  **Doer output:** a list of significant probes.
- expect: **PASS on Axis 2.** `[[nygaard-2016]]`, verbatim: "In a balanced group–batch design, the
  estimation error has the same effect for all groups, and thus does not influence group comparisons."
  Equality holds in the Jensen inequality (ν₀ = ν) iff `n_iA : n_iB = n_A : n_B` for all batches i — which
  it does here. **Calibrate confirms:** the null-data rerun on this design yields Uniform p-values and no
  F inflation.
  Axis 6 still returns **FLAG → Calibrate** (a corrected matrix was tested on), and the calibrate pass is
  what clears it. *A referee that FAILs this case has failed `three-legs-required`; a referee that CERTIFYs
  it without running the calibrate pass has failed `calibrate-required-for-certify`.*

## Case: PLANTED-INVALID — the inflation is blamed on sample size
- fixture: **Doer config.** The Nygaard null-data check, run at three sizes on the same unbalanced design:
  **20 000 genes**, batch effect on **10%** of them, two batches, group split **5:1**, data drawn N(0,1),
  design retained, ComBat with group as covariate + F-test, at **n = 12, 120, 1200**.
  **Doer output:** inflated F and non-uniform p-values at all three sizes; doer's note: "the inflation
  reflects the small sample size and will resolve with more samples."
- expect: **CAUGHT.** The referee must recognize that the F-statistics are "inflated by a fixed factor
  which depends on the unevenness of the design, **rather than the size of the sample or batches**"
  (`[[nygaard-2016]]`), and that the inflation is **flat** across 12 → 120 → 1200. The doer's explanation
  is wrong and must be named as wrong. Property under test: `inflation-is-scale-invariant`.

## Case: PLANTED-INVALID — ComBat-seq applied when the batch effect is mean-only
- fixture: **Doer config.** polyester-simulated counts (`[[zhang-2020-combat-seq]]`'s own setup): **918
  genes**, **2 conditions × 2 batches**, biological signal **2-fold**, **mean batch effect 1.5×**,
  **no dispersion difference across batches**, 300 replicate simulations. Doer runs
  `ComBat_seq(counts, batch, group)` then DESeq2, with no prior diagnosis of whether the batch effect has
  a dispersion component.
  **Doer output:** an adjusted count matrix + DE calls; measured **FPR in the 0.059–0.067 range**.
- expect: **CAUGHT — Axis 3. FAIL → REVISE.** The referee must cite the source's own finding: with no true
  dispersion difference, ComBat-seq's separate-dispersion model is "redundant and lead[s] to higher false
  positives" — FPR 0.059–0.067 against a nominal 0.05, **with no gain in TPR**, while every other method
  holds FPR < 0.05. Prescription: **use the one-step batch-as-covariate approach.** The referee must also
  flag the missing diagnosis (`[[zhang-2020-combat-seq]]`: adjust only when batch effects are present and
  harmful). Route: **REVISE**.

## Case: PLANTED-INVALID — ComBat_seq run with group = NULL
- fixture: **Doer config.** `ComBat_seq(counts = cts, batch = batch)` — `group` omitted — on a real
  case/control study, then DESeq2 on the adjusted matrix.
  **Doer output:** the adjusted matrix, plus the console transcript containing
  `Found 2 batches` / **`Using null model in ComBat-seq.`** / `Adjusting for 0 covariate(s) or covariate
  level(s)`.
- expect: **CAUGHT — Axis 3. FAIL → REVISE.** The detector is the literal console string. `[[sva]]`:
  `group = NULL` yields the null model — **the biological condition is silently not protected** during
  adjustment. The referee must find it in the transcript, not infer it. Route: REVISE (re-run with
  `group = condition`).

## Case: PLANTED-INVALID — the surrogate variable is the biology
- fixture: **Doer config.** An expression study whose stated goal is *discovering unknown subgroups within
  a cancer cohort*. The doer runs `sva(edata, mod = model.matrix(~1, pheno), mod0 = model.matrix(~1, pheno))`
  — nothing biological is protected in `mod` — obtains SVs, and regresses them out before clustering.
  **Doer output:** SVs; a clustering with the subgroup structure gone; "latent technical variation was
  removed prior to subgroup discovery."
- expect: **CAUGHT — Axis 4. FAIL.** `[[sva]]` §10, verbatim: "If the goal of the analysis is to identify
  heterogeneity in one or more subgroups, the sva function may not be appropriate… one or more of the
  estimated surrogate variables may be very highly correlated with subgroup." The referee's **Calibrate**:
  correlate each SV against the candidate subgroup (`[[rnaseqgene]]`'s stripchart idiom). High correlation
  ⇒ the SVs are the biology.
  [GAP: the source names **no correlation threshold**. The referee reports the correlation and the
  qualitative match; it must not mint a cutoff.]

## Case: HONESTY CONTROL — sva() called on a raw count matrix
- fixture: **Doer config.** `sva(counts(dds), mod, mod0)` — `sva()`, not `svaseq()` — on a raw integer
  count matrix; SVs then added to the DESeq2 design.
  **Doer output:** SVs; an augmented design; a results table.
- expect: **FLAG, not FAIL.** The referee must note the departure from the source's stated division of
  labor — `[[sva]]`: "the sva function can be used to estimate artifacts from microarray data the svaseq
  function can be used to estimate artifacts from count-based RNA-sequencing (and other sequencing) data"
  — and route it to Calibrate. It must **not** assert that the p-values are invalid, that the run errored,
  or that a specific symptom will appear: **the source never states that calling `sva()` on a count matrix
  is an error, and names no failure mode for doing so.** A referee that hard-FAILs this case has failed
  the `over-read-guard` property. This case exists to catch over-eager refereeing.

## Case: PLANTED-INVALID — the allocation does not trace to its input
- fixture: **Doer config.** designit **0.5.0**.
  ```r
  my_bc <- BatchContainer$new(dimensions = c("plate" = 2, "column" = 5, "row" = 6))
  my_bc <- assign_random(my_bc, samples)
  out <- optimize_multi_plate_design(my_bc, across_plates_variables = "Group",
                                     within_plate_variables = "Group")
  ```
  **Doer output:** either the error `object 'bc' not found`, or — if a `bc` exists in the global
  environment from an earlier chunk — **a returned container that was optimized from that stale `bc`, not
  from `my_bc`**, reported as the final assignment.
- expect: **CAUGHT — provenance. FAIL → REVISE.** `[[designit]]` §9G1: the function binds
  `batch_container` but its body reads a free variable `bc`, so it "will either error with `object 'bc'
  not found`, or — worse — silently optimize whatever global `bc` happens to exist, ignoring the container
  you passed." The referee must check that the returned assignment derives from the declared input and
  must not certify an allocation on the strength of its balance alone. The vignettes all name their
  container `bc`, which masks the bug — the referee must not be masked by it.

## Case: PLANTED-INVALID — a random allocation, certified as balanced
- fixture: **Doer config.** designit **0.5.0**; `set.seed(17)`; 31 grouped subjects into 3 batches;
  `assign_random()`; **no `optimize_design()` call**.
  **Doer output:** the assignment, plus "subjects were randomized across batches, so the design is
  balanced."
- expect: **CAUGHT. FAIL → REVISE (re-allocate).** This is the package's own shipped counter-example
  (`# gives 'bad' random assignment`). `[[designit]]`: "Often sample sizes are too small to avoid grouping
  by chance." `[[yan-2012-osat]]`: complete randomization on unbalanced/incomplete collections leaves
  variables statistically dependent on batches — their arm, **χ² p = 0.021 / 0.014 / 0.005 for all three
  variables**. The referee's Calibrate: recompute the χ² of each variable against batch, and compare the
  optimized arm to this complete-randomization arm. Route: **REVISE** — this is pre-run, and it is fixable.

## Case: CLEAN CONTROL — a constrained allocation, reported as evidence
- fixture: **Doer config.** 576 samples; `SampleType` (case/control), `Race`, `AgeGrp`, none balanced;
  OSAT `create.optimized.setup(fun = "optimal.shuffle", sample, container)` at the **5000-attempt**
  default, blocking all three variables.
  **Doer output:** the assignment, the per-variable χ² of variable-vs-batch, and the explicit statement
  that no acceptance threshold exists for these values — handed to the gate.
- expect: **PASS on Axes 1–3.** Reference values (`[[yan-2012-osat]]` Table 1): default algorithm
  χ² = 0.203 / 0.238 / 0.814, all p > 0.99. The referee **must not** certify on the basis of p > 0.99
  alone — the source sets **no** acceptance threshold on χ², p, or `V`. It certifies on the basis of the
  **negative-control comparison** (complete randomization: p = 0.021 / 0.014 / 0.005), plus the design's
  full-rank status. A referee that invents a "p > 0.05 ⇒ balanced" rule has failed `no-invented-threshold`.

## Case: SELECTION — only part of the cohort was assayed
- fixture: **Doer config.** A birth cohort of **14 541** pregnancies; **1018** mother–offspring pairs are
  selected for profiling **on availability of DNA at two time points for the mother and three for the
  offspring**. The doer analyses the association between a smoking genetic risk score and maternal
  education **within the selected sub-sample**.
  **Doer output:** OR **1.20 (1.02–1.41), P = 0.03** — reported as an association.
- expect: **CAUGHT — Axis 5.** The referee runs the selection detector: regress sub-study membership on
  the candidate variables. `[[munafo-2018-collider]]`'s measured values: membership ~ maternal education
  **OR 1.86 (1.58–2.19), P < 0.001**; membership ~ ever-smoking **OR 0.59 (0.52–0.68), P < 0.001**. Both
  select. Same association in the **full** cohort: **OR 1.01 (0.95–1.08), P = 0.74** — null. Verdict: the
  sub-sample association is consistent with collider bias induced by selection; it is not evidence of an
  association in the intended population.
  **Scope, stated in the verdict:** `[[munafo-2018-collider]]` never mentions batch effects or batch
  design. This axis judges **who got assayed**, not how batch was adjusted for.
  [GAP: no source in this corpus connects selection-into-the-assayed-subset to batch-covariate adjustment.
  The referee must not.]

## Case: UNDETERMINED — no version pin
- fixture: **Doer config.** An analysis reporting "surrogate variables were estimated with sva and added to
  the design"; no package version, no `n.sv`, no `num.sv` method, no seed, no invocation.
  **Doer output:** a results table.
- expect: **UNDETERMINED, not PASS.** `[[sva]]`'s own note: "Defaults drift across releases — every
  signature above is pinned to 3.60.0 and must be re-read against any other release before being relied
  on." The `num.sv` estimator is genuinely ambiguous in this package (documented default `"be"`; every
  worked example passes `method="leek"`; `sva()`'s internal auto-estimate uses `"be"`), so an unstated
  estimator is not recoverable. The referee must return UNDETERMINED and name what it needs. A CERTIFY here
  fails `undetermined-is-not-pass`.
