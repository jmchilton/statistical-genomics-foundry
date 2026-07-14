---
type: mold
name: audit-batch-design-validity
tags:
  - family/b
  - role/critique
  - role/calibrate
  - domain/experimental-design
  - domain/batch-effects
references:
  - kind: research
    ref: "[[deseq2]]"
    used_at: runtime
    load: eager
    mode: verbatim
    evidence: corpus-observed
    purpose: "Axis 1's mechanical detector: model-matrix rank. The exact error string, the two named remedies under perfect confounding, and the statement that there is no way to separate condition effects from batch effects."
  - kind: research
    ref: "[[leek-2010]]"
    used_at: runtime
    load: eager
    mode: condense
    evidence: corpus-observed
    purpose: "Axis 1's qualitative anchor (bladder/sTCC: control samples clustering perfectly by processing date) and the boundary condition on the whole adjustment menu — it works only when batch is not highly confounded with biology."
  - kind: research
    ref: "[[nygaard-2016]]"
    used_at: runtime
    load: eager
    mode: verbatim
    evidence: corpus-observed
    purpose: "Axis 2 in full: the three-legged trigger, the exact no-inflation condition (n_iA:n_iB = n_A:n_B for all batches i), the effective-vs-nominal ratio as the over-confidence index, the reanalysis counts (2011 vs 11; 1003 vs 377), and the null-data check parameters the Calibrate role runs."
  - kind: research
    ref: "[[zhang-2020-combat-seq]]"
    used_at: runtime
    load: eager
    mode: verbatim
    evidence: corpus-observed
    purpose: "Axis 3: the diagnose-before-you-transform rule, the over-correction regime (FPR 0.059–0.067 when the batch effect is mean-only), the Gaussian-on-counts anti-pattern (negative values; P = 0.0033), and its own confounded-design limitation."
  - kind: research
    ref: "[[sva]]"
    used_at: runtime
    load: eager
    mode: verbatim
    evidence: corpus-observed
    purpose: "Axis 3 + Axis 4 detectors: the stated input contracts (ComBat=cleaned/normalized, ComBat_seq=raw counts, one batch only, svaseq needs dat+constant > 0), the console strings (`Using null model in ComBat-seq.`, the supervised-sva warning), the SVs-in-both-models rule, and the §10 statement that sva is inappropriate when latent structure IS the biology."
  - kind: research
    ref: "[[leek-storey-2007-sva]]"
    used_at: runtime
    load: on-demand
    trigger: "when latent factors were estimated, or when a null must be constructed for an eigenvalue/variance-explained statistic"
    mode: condense
    evidence: corpus-observed
    purpose: "The Calibrate primitives: the validity criterion (null p-values must be Uniform(0,1); nested KS test), the row-permutation eigengene null (T_k = d_k²/Σd_ℓ², p_k = #{T_k^0b ≥ T_k}/B, monotonicity forced), and the diagnostic direction of bias (hidden factor correlated with the primary variable → null p-values biased toward zero; uncorrelated → toward one)."
  - kind: research
    ref: "[[msmb-chap8]]"
    used_at: runtime
    load: eager
    mode: condense
    evidence: corpus-observed
    purpose: "Calibrate's cheap first pass: the p-value histogram oracle (uniform + left peak = calibrated; right-rising tilt = batch effects; depletion of small p-values = an unmodelled balanced covariate), and the known-truth simulation that demonstrates it and its cure."
  - kind: research
    ref: "[[msmb-chap13]]"
    used_at: runtime
    load: eager
    mode: condense
    evidence: corpus-observed
    purpose: "The escalation authority (already-confounded collected data cannot be rescued by any analysis) and the Calibrate method itself: simulate under a known data-generating truth and check whether the procedure recovers it — 'validity is demonstrated empirically rather than asserted from a method's name.'"
  - kind: research
    ref: "[[rnaseqgene]]"
    used_at: runtime
    load: on-demand
    trigger: "when latent factors were carried into a count-based DE design"
    mode: verbatim
    evidence: corpus-observed
    purpose: "The correct estimate→design idiom the audit checks against (design(ddssva) <- ~ SV1 + SV2 + dex; no cleaned matrix), and the SV-vs-known-variable stripchart diagnostic."
  - kind: research
    ref: "[[yan-2012-osat]]"
    used_at: runtime
    load: on-demand
    trigger: "when the artifact under review is a sample-to-batch allocation"
    mode: condense
    evidence: corpus-observed
    purpose: "The allocation negative control: the complete-randomization arm (χ² p = 0.021 / 0.014 / 0.005) against which an optimized allocation is judged; and the source's own refusal to name an acceptance threshold, which the referee must honour."
  - kind: research
    ref: "[[designit]]"
    used_at: runtime
    load: on-demand
    trigger: "when the artifact under review was produced by designit"
    mode: verbatim
    evidence: corpus-observed
    purpose: "Provenance detectors for the allocation artifact: the 0.5.0 optimize_multi_plate_design free-variable bug (a returned container that does not derive from the container you passed), the NAs-silently-dropped-from-the-OSAT-score warning, and the zero-variance abort string."
  - kind: research
    ref: "[[munafo-2018-collider]]"
    used_at: runtime
    load: on-demand
    trigger: "when only a selected subset of an available cohort was assayed"
    mode: condense
    evidence: hypothesis
    verification: "Cited ONLY for Axis 5 (selection into the assayed subset). The source never mentions batch effects, batch design, or technical covariates; the note states that any transfer to batch-covariate adjustment is an external inference, not the source's claim. This referee must not cite it for the confounder-vs-collider adjust/don't-adjust rule, which the source never states."
    purpose: "Axis 5: the collider mechanism (two variables independently causing a third; conditioning on it induces association), the operational detector (regress subset membership on the exposure, the outcome, and a polygenic score), and the negligibility condition (Box 3)."
---

# audit-batch-design-validity

Referee a batch-aware analysis. Judge **method validity**, not the result. Every axis returns
`PASS | FLAG | FAIL | UNDETERMINED` with the source that names the failure. Critique narrows; **Calibrate
delivers the verdict.**

## The cardinal sin

> **Correcting for batch and blessing the corrected result.**

An agent given a design where batch cannot be separated from biology — or where the imbalance makes the
correction's own estimation error masquerade as group difference — will "correct for batch", obtain a
clean-looking result, narrate it fluently, and certify. There is no gate, so nothing catches it. This
Mold is the gate.

Two sub-sins fall out of it, and the sources name both:

- **Adjusting an unadjustable design.** `[[msmb-chap13]]`: if already confounded in collected data, no
  analysis can rescue it. `[[leek-2010]]`: adjustment cannot recover it.
- **Trusting the corrected matrix.** `[[nygaard-2016]]`, verbatim: "the batch-adjusted data should not be
  trusted to be 'batch effect free', **even when a diagnostic tool might claim so**."

---

## Axis 1 — Aliasing: is the contrast estimable at all? *(Critique → ESCALATE)*

**Ask:** are the batch columns of the model matrix a linear combination of the condition columns?

**Detector (mechanical, `[[deseq2]]`):** the model matrix for the stated design is not full rank. The
exact error is `the model matrix is not full rank, so the model cannot be fit as specified.` Two root
causes: (a) columns are linear combinations of others (perfect confounding); (b) factor levels or
level-combinations have no samples.

**Anchor (`[[leek-2010]]`):** in the bladder/sTCC study, CIS status was confounded with processing date;
the giveaway was that the **control samples — which have no CIS biology to differ on — still clustered
perfectly by processing date.** The data were properly normalized; the batch effect survived it.

**Verdict rule:** rank-deficient in batch × condition ⇒ **FAIL → ESCALATE**, never REVISE. `[[deseq2]]`
gives exactly two options: assume there is no batch effect (which it deems highly unlikely given the
batch-effects literature), or **rerun the experiment with conditions balanced across batches**. Neither
is an analysis. A doer that dropped batch from the formula and reported the condition effect has not
solved this — it has hidden it.

[GAP: `[[deseq2]]` explicitly notes it supplies **no automated pre-flight detector**. The referee must
build the model matrix and check its rank itself. No source in the corpus supplies that check as a
callable procedure.]

[GAP: **partial confounding has no sourced boundary.** `[[leek-2010]]` gives no R² cutoff;
`[[nygaard-2016]]` gives no numeric cutoff between "moderately unbalanced (need not be a concern)" and
"heavily unbalanced (huge influence)"; `[[zhang-2020-combat-seq]]` names "severely or even completely
confounded" with no detector or threshold and runs **no simulation** of that regime;
`[[leek-storey-2007-sva]]` stops at a primary-vs-hidden-factor correlation of 0.50 and never analyses
perfect confounding. Where Axis 1's FAIL ends and Axis 2's FLAG begins is **not recoverable**.]

---

## Axis 2 — Imbalance + correct-then-test *(Critique → Calibrate)*

**The trigger has three legs (`[[nygaard-2016]]`). All three are required; remove any one and the problem
disappears:**

1. the group–batch design is **unbalanced**;
2. the batch adjustment **preserved group differences** (two-way ANOVA / ComBat with the outcome as a
   covariate);
3. the downstream analysis **ignored batch**, treating the adjusted data as "batch effect free."

**The exact no-inflation condition:** by Jensen's inequality ν₀ ≥ ν, **with equality if and only if the
ratios n_iA : n_iB = n_A : n_B for all batches i** — i.e. each batch reproduces the overall group ratio.
Equivalently: equality holds iff the groups are evenly represented in all batches. The ratio ν₀/ν indexes
the over-confidence: close to 1 ⇒ results still reliable; much larger than 1 ⇒ exaggerated confidence.
The "main concern" is **batches where one of the groups of interest is missing or strongly
under-represented** — such a batch contributes to the nominal sample size but not to the effective one.

**Inflation is a fixed factor set by the imbalance, not by the sample size.** Growing n does not fix it.

**Detectors:**
- Inflated significance counts against a batch-blocked analysis. Their reanalyses: **2011 vs 11** genes
  (5% FDR; GSE40566, 17 Illumina WG-6_V2 chips, several batches containing only one of the main
  treatments) and **1003 vs 377** probes (30 samples, 3 batches, treatment/control 6/2, 3/4, 9/6).
- The **null-data check** — see Calibrate below.

**Verdict rule:** three legs present ⇒ **FAIL → REVISE** (this is fixable: account for batch in the
statistical analysis). Legs 1 and 2 present but 3 absent (batch is in the downstream model) ⇒ the
inflation mechanism does not fire. **Balanced design ⇒ PASS on this axis**, per the source's own
statement that in a balanced group–batch design the estimation error "has the same effect for all groups,
and thus does not influence group comparisons." **A referee that flags every ComBat-then-test run is
wrong.**

[GAP: `[[nygaard-2016]]` is **entirely microarray** and its note records a confident silence: the words
"RNA-seq", "sequencing", and "count(s)" never appear. It neither extends nor disclaims the result for
count-based assays. **The referee may flag the design pattern on count data, but must not assert that
Nygaard's inflation result transfers to NB count models.** `[[zhang-2020-combat-seq]]` does not cite
Nygaard and supplies no substitute.]

---

## Axis 3 — Method appropriateness and over-correction *(Critique)*

**Ask:** was an adjustment applied at all, and was it the right one for this data type and this batch
effect?

- **Was a diagnosis run first?** `[[zhang-2020-combat-seq]]`, verbatim: "batch effects should only be
  adjusted when they are present and result in unfavorable impact on downstream analysis. Such
  observations emphasize the importance for careful diagnosis of batch effect before applying any
  transformation to the data." No diagnosis ⇒ **FLAG**.
- **Mean-only batch effect + a per-batch-dispersion model = over-correction.** `[[zhang-2020-combat-seq]]`'s
  own simulations: with no true dispersion difference, ComBat-seq and ComBat-on-logCPM both show **FPR
  0.059–0.067** (nominal 0.05) with **no gain in TPR**, while every other method holds FPR < 0.05. Their
  prescription: the simpler batch-as-covariate approach suffices. Under a **3-fold** dispersion
  difference the ranking inverts and ComBat-seq is the most conservative (FPR 0.039 vs covariate 0.043,
  RUV 0.044, ComBat-logCPM 0.046, SVA-seq 0.049), with TPR 0.89 in the realistic 1.5× mean / 2×
  dispersion regime.
- **Gaussian adjustment on counts.** Produces **negative values** in the adjusted matrix and manufactures
  significance — their worked example: an artificial significant difference between the two batches'
  *control* samples at **P = 0.0033**.
- **Stated input contracts (`[[sva]]`):** `ComBat` — "The input data are assumed to be cleaned and
  normalized before batch effect removal", and **only one batch variable is allowed**. `ComBat_seq` —
  "Raw count matrix". `svaseq` — "all values of dat + constant should be positive". Categorical
  covariates must be expanded to p−1 indicator columns for `ComBat`.
- **Console detectors (`[[sva]]`, functional strings):** `Using null model in ComBat-seq.` ⇒
  `group = NULL` was passed and **the biological condition is not protected**. `sva warning: controls
  provided so supervised sva is being performed.` ⇒ supervised sva engaged, possibly unintentionally.

[GAP: `[[sva]]` states these input assumptions but **does not say what error or misbehavior results** from
violating them. The referee may report a stated-assumption violation; it may **not** assert a symptom the
source does not name.]

[GAP: **`sva()` on a count matrix is off-label, not an error.** `[[sva]]`'s note is explicit: the source
never states that calling `sva()` on counts is an error, and names no symptom or failure mode for doing
so. The referee must FLAG the departure from the source's stated division of labor (counts → `svaseq`) —
and must **not** upgrade it to a FAIL. Doing so is over-reading.]

[GAP: **whether `ComBat`'s `mod` should contain the variable of interest is unresolved by the source** —
`[[sva]]`'s prose says yes, its code passes `~1`, its man-page examples do both. The referee cannot
adjudicate this.]

---

## Axis 4 — Latent-factor validity: are the surrogate variables eating the biology? *(Critique → Calibrate)*

- **The named inappropriate case (`[[sva]]` §10, verbatim):** "In some cases, the latent variables may be
  important sources of biological variability. If the goal of the analysis is to identify heterogeneity
  in one or more subgroups, the sva function may not be appropriate… If these subgroups have a large
  impact on expression, then one or more of the estimated surrogate variables may be **very highly
  correlated with subgroup**."
- **Detector:** correlate each estimated factor against every candidate biological subgroup, and against
  every known technical variable. `[[rnaseqgene]]`'s idiom: `stripchart(svseq$sv[, i] ~ dds$cell, ...)` —
  do the factors track a real source of variation?
- **Placement check (`[[leek-storey-2007-sva]]`, `[[sva]]`, `[[rnaseqgene]]`):** estimated factors enter
  the analysis as **covariates**, with gene-specific coefficients, in the **design** of the test — and, for
  an F-test of nested models, in **both** `mod` and `mod0`. In limma, in the design and **not** the
  contrasts. If the doer instead subtracted the factors from the data and tested on the residual matrix,
  **that is a departure from every worked example in the corpus** ⇒ FLAG and route to Calibrate.
- **The naive baselines fail, and the source says why (`[[leek-storey-2007-sva]]`):** eigengenes of the
  **full** matrix "capture the signal due to both the unmodeled factor and the primary variable, which
  results in biased estimation of the unmodeled factor"; eigengenes of the **residuals only** ignore
  overlap and often overfit. Both "sometimes… produce more bias than making no adjustment at all." If the
  doer rolled its own PCA-and-regress-out scheme, this is the citation.

[GAP: **the corpus does not support "surrogate variables can absorb the biology when the hidden factor is
confounded with the primary variable."** `[[leek-storey-2007-sva]]`'s position runs the *other* way — its
Step 1 exists to prevent absorption, its Step 3 exists to *tolerate* correlation, and its robustness
simulation at an average correlation of **0.50 (sd 0.16)** still recovers a single SV in **94.5%** of
datasets with SV–true-factor correlation **0.94** and correctly Uniform null p-values. **Perfect
confounding is never simulated, discussed, or bounded.** The only signal-absorption statement in the
paper is a criticism of the *unsupervised full-matrix SVD baseline*. The referee may not make this claim.]

[GAP: **no source gives a correlation threshold** above which an SV is judged to be tracking biology
rather than artifact, and **no source gives a rule for how many SVs are too many** (no cap relative to
sample size, no degrees-of-freedom warning). `[[sva]]`'s `sva.check()` — the package's own degenerate-case
checker — is described only as checking "for degenerate cases in the sva fit"; the source **never says
what a degenerate case is**, how to tell you have one, or when to call it, and the vignette never mentions
it.]

---

## Axis 5 — Who got assayed? *(Critique)*

Distinct from batch, and often invisible: **the subset of a cohort selected for profiling is itself a
selection step.**

`[[munafo-2018-collider]]`, verbatim: "Collider bias occurs when two variables (X and Y) independently
cause a third variable (Z)… Statistical adjustment of the XY association for a variable Z is equivalent to
observing this association in a sub-population where all individuals share the same value of Z." Selection
into a study or sub-study *is* conditioning on Z. "This bias can be towards or away from any true
association, and can distort a true association or a true lack of association."

**Detector:** regress subset membership on the exposure, on the outcome, and on any aggregate genetic
score. Non-null ⇒ selection is operating on that variable. Their worked case: the **ARIES** sub-study
(1018 mother–offspring pairs selected from ALSPAC **on availability of DNA at multiple time points**) —
selection is associated with maternal education (**OR 1.86, 1.58–2.19, P < 0.001**) and with smoking
(**OR 0.59, 0.52–0.68**); consequently the smoking genetic risk score is **null against maternal education
in the full cohort (OR 1.01, P = 0.74)** but **significant in the selected sub-sample (OR 1.20,
1.02–1.41, P = 0.03)**.

**Negligibility condition (their Box 3, verbatim):** "If the outcome of interest has not influenced
selection into the intended study population, and all of this population is included in the study…, then
selection bias, and therefore collider bias, should be small."

[GAP: **`[[munafo-2018-collider]]` never mentions batch effects, batch design, or technical covariates —
zero occurrences.** This axis covers *who was assayed*, not *how batch was adjusted for*. Transferring
the collider argument to batch-covariate adjustment would be **our inference, not the source's claim**.
The source also never defines a confounder and never states the confounder-vs-collider adjust/don't-adjust
rule — cite it for the collider half only.]

---

## Axis 6 — Data-editing vs model-adjustment *(Critique → Calibrate)*

Two structurally different interventions (`[[sva]]`): **ComBat edits the data; sva returns covariates.**
Testing on an edited matrix is a different act from testing under an augmented design.

What the corpus actually supports, stated precisely because it is easy to over-read:

- The **include-as-covariates** half is **directly sourced**: `[[deseq2]]` prescribes correction "by
  including it in the design"; `[[rnaseqgene]]` shows only `design(ddssva) <- ~ SV1 + SV2 + dex`;
  `[[sva]]` puts SVs in both models; `[[leek-storey-2007-sva]]` uses covariates with gene-specific
  coefficients throughout.
- The **don't-subtract** half is **NOT asserted by any of them.** `[[deseq2]]` never prohibits it (its
  `limma::removeBatchEffect` appears under a *visualization* FAQ and terminates in `plotPCA`).
  `[[rnaseqgene]]` never prohibits it (the posture is "enacted by example only, never asserted").
  `[[sva]]`'s own §7 runs `f.pvalue(combat_edata, mod, mod0)` on a ComBat-corrected matrix **without
  comment** — its note calls this "a known double-use pattern the vignette does not caveat."

**Verdict rule:** an analysis that tested on a batch-corrected matrix ⇒ **FLAG, and Calibrate is
mandatory.** Critique alone cannot resolve it, because critique's own sources do not forbid it. The
empirical check does.

[GAP: **the explicit prohibition on testing a batch-corrected matrix is unsourced in this corpus.**
`[[nygaard-2016]]` supplies the inflation *result* — but only for unbalanced microarray designs, and it is
silent on counts. For a **balanced** design, or for **count** data, the corpus supplies **no** basis for
prohibiting it. Anyone needing that prohibition must cite something else.]

---

## Calibrate — construct and run the empirical check

Critique is model reasoning, and reasoning is what we do not trust. **The strong gate requires at least
one calibrate pass.** `[[msmb-chap13]]`: validity is demonstrated empirically — does the procedure recover
the known truth, does the null distribution correctly account for dependencies — "rather than asserted
from a method's name."

**The validity criterion (`[[leek-storey-2007-sva]]`):** p-values corresponding to true null hypotheses
have a Uniform(0,1) distribution **if and only if** the null distribution has been correctly calculated.
Their formal check is a **nested Kolmogorov–Smirnov test**: a KS test on the null p-values within a
simulation, then a KS test on the resulting KS p-values across simulations — "to avoid 'getting lucky' on
one particular simulated data set."

**Diagnostic direction of bias (`[[leek-storey-2007-sva]]`):** hidden factor **correlated** with the
primary variable ⇒ null p-values biased **towards zero** (anticonservative). **Uncorrelated** ⇒ biased
**towards one** (conservative, lost power).

### C1. The null-data rerun (the Axis-2 check)

Replace the real data with N(0,1), **retain the design**, run the same adjustment and the same test.
`[[nygaard-2016]]`'s parameters, which are fully constructible: **20 000 genes**; a batch effect applied to
**10%** of them; two batches; group splits **1:5 and 5:1**; sample sizes **12, 120, 1200**; ComBat with
group as covariate; F-test.

- **PASS:** p-values Uniform; F not inflated; QQ on the diagonal.
- **FAIL:** non-uniform p-values, inflated F — and, decisively, **inflation that does not shrink as n goes
  12 → 120 → 1200**, because it is set by the design imbalance, not the sample size.

[GAP: `[[nygaard-2016]]` describes this check as "adapted from the sva user guide." `[[sva]]`'s note
verified — by grepping the pinned 3.60.0 vignette **and** the archived Bioconductor 3.2 and 3.4 vignettes —
that **no such check has ever been in the sva vignette.** Do not attribute this check to sva. Its
parameters above come from Nygaard itself.]

### C2. The p-value histogram (`[[msmb-chap8]]`)

Uniform background + a left peak ⇒ well-calibrated. **Right-rising tilt ⇒ batch effects.** **Depletion of
small p-values ⇒ an unmodelled *balanced* covariate inflating the test-statistic denominator** — and
`[[msmb-chap8]]` records that this is demonstrable by a known-truth simulation and **cured by adding the
batch term**. (Caveat the source itself gives: isolated mid/right peaks can be discreteness artifacts of
low-count features, not signal.)

### C3. Simulation under a known generative truth

`[[zhang-2020-combat-seq]]` supplies a fully specified, runnable design: **polyester**; **918 genes**; **2
biological conditions × 2 batches**; biological signal fixed at **2-fold**; mean batch effect swept at
**1.5× / 2× / 3×**; dispersion batch effect swept at **2× / 3× / 4×**; **300 repeated simulations** per
setting; metrics **TPR** and **FPR**. Reference values: no batch effect at all ⇒ FPR 0.048, TPR 0.96.
Real-data anchors from the same source: observed condition fold changes 1.65–3.98; real mean batch effects
1.62–1.88×; real variance differences 1.26–7.09×.

### C4. The eigengene permutation null (`[[leek-storey-2007-sva]]`)

For a variance-explained statistic: permute **each row of the residual matrix independently**, refit,
re-decompose, and form `T_k⁰ = d_0k² / Σ d_0ℓ²`; the p-value is `p_k = #{T_k^{0b} ≥ T_k} / B`, with
monotonicity conservatively forced (`p_k = max(p_{k−1}, p_k)`).

[GAP: **no default α and no default B.** The source explicitly defers the threshold to the user and reports
**no numeric α for any of its own analyses.** `[[sva]]`'s implementation pins `B = 20` for
`num.sv(method="be")` and `B = 5` for `sva()`'s IRW iterations — those are package defaults, not the
paper's recommendations.]

### C5. Negative controls

- **Spike-ins:** ERCC controls, used as `controls` for supervised sva (`[[sva]]` §14 — `controls[i] = TRUE`
  for control genes).
- **Empirical control genes:** genes *without* a small p-value from a batch-naive run —
  `not.sig <- rownames(res)[which(res$pvalue > .1)]` (`[[rnaseqgene]]`); or the least-DE genes within each
  batch at **FDR > 0.95** (`[[zhang-2020-combat-seq]]`'s RUVs choice for real data).
- **Biologically-homogeneous samples:** the `[[leek-2010]]` anchor — controls that cluster by processing
  date prove the split is batch-driven.
- **The allocation negative control (`[[yan-2012-osat]]`):** score the proposed assignment's χ² of
  variable-vs-batch against a **complete-randomization** arm. Their reference values — optimized:
  p > 0.99 for all three variables; complete randomization: **p = 0.021 / 0.014 / 0.005**.

[GAP: `[[yan-2012-osat]]` demonstrates χ² p > 0.99 but **sets no acceptance threshold** on χ², p, or `V`,
and `[[designit]]` supplies **no post-hoc diagnostic that the optimizer failed to balance** — no threshold,
no residual-imbalance test, and no interpretation of an absolute OSAT score. **"Is this allocation good
enough" is not answerable from the corpus.** The referee reports the comparison; it must not mint a
cutoff.]

### C6. Sensitivity (`[[nygaard-2016]]`, partial remedies — "none of these solutions are ideal")

Compare results from batch-adjusted data **with and without** the covariate. Down-sample to the effective
sample size and see whether the findings persist.

---

## Provenance check (cheap, and it catches real artifacts)

- **The returned allocation must derive from the declared input.** designit 0.5.0's
  `optimize_multi_plate_design()` reads a free variable `bc` instead of its `batch_container` argument, so
  it will either error `object 'bc' not found` or **silently optimize whatever global `bc` exists**
  (`[[designit]]` §9G1). An artifact that cannot be traced to its declared container FAILS regardless of
  how balanced it looks.
- **NAs are silently dropped from the OSAT score**, and the warning fires **only on the first iteration**
  (`osat_score_generator()` sets `quiet = quiet || !first_call`). designit's own shipped plate-layout
  vignette scores with NAs excluded.
- **Version drift is real and the sources say so.** designit's own NEWS records removed fields and a
  deprecated `$scoring_f`; `[[sva]]`'s note states flatly: "Defaults drift across releases — every
  signature above is pinned to 3.60.0 and must be re-read against any other release before being relied
  on." An analysis without a version pin is **UNDETERMINED**, not PASS.

### Three rules that are *recoverable from the artifact* — so they are FAIL/UNDETERMINED, not opinions

1. **An OSAT allocation's real iteration budget is auditable regardless of what the doer claims.**
   `length(gSetup@metadata$optValue)` **is** `nSim`, and `gSetup@metadata$optimalFunction` names the
   optimizer that actually ran. **If `nSim == 100`, the run silently took the coded default** — which is
   **50×–1000× below the package's own documented recommendation** (`# demonstration only. nSim=5000 or
   more are commonly used.`; "usually in the tens of thousands"). ⇒ **FLAG → REVISE** (re-run with
   `nSim ≥ 5000`). Do not accept "we used the default" as an answer: the default is the footgun.
   Corollary: `nSim` is a **budget, not a stopping rule** — OSAT has no convergence criterion. A doer
   claiming *convergence* is over-claiming; it may report the objective trace only.

2. **A `num.sv` run with no stated `method=` is UNDETERMINED**, because the package's two documented paths
   disagree (`num.sv()` defaults to `"be"`; every worked example passes `"leek"`; `sva()`'s internal
   auto-estimate uses `"be"`). Further: **an unseeded `method="be"` run is not reproducible** (permutation,
   `B = 20`) ⇒ UNDETERMINED. A `method="leek"` run **is deterministic** (`[[leek-2011-asymptotic-csvd]]`:
   zero permutations, no p-values) and needs no seed. Grade the two differently — do not demand a seed
   for a deterministic estimator.

3. **A pinned-version claim the install route cannot deliver is UNDETERMINED.** Checked 2026-07-13:
   bioconda's latest are sva 3.58.0 / OSAT 1.58.0 / DESeq2 1.50.2 / limma 3.66.0 — **one Bioconductor
   release below every pin the doer quotes.** A doer that says "installed from bioconda" and then quotes
   3.60.0 signatures **got 3.58.0**. Ask for `sessionInfo()` and the install route; the route is part of
   the claim, not metadata.

---

## [gate] — the verdict

Return one of:

- **CERTIFY** — every axis PASS, **and at least one calibrate pass completed and passed**. Critique alone
  is never sufficient. Record which checks ran.
- **REVISE** — a specific, fixable finding (imbalance-driven inflation → put batch in the model; a bad
  random allocation → re-allocate with a constrained optimizer; over-correction → drop back to
  batch-as-covariate). Return the finding, not an opinion. Bounded.
- **ESCALATE** — aliasing, or any finding no analysis can repair. Hand to a human **with the finding**.
  Do not let the analysis "correct for batch" and proceed.
- **UNDETERMINED** — an axis the referee cannot evaluate from what it was given. **UNDETERMINED is never
  PASS.**
