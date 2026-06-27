# Nygaard, Rødland & Hovig (2016) — Methods that remove batch effects while retaining group differences may lead to exaggerated confidence in downstream analyses

> Faithful summary generated in a clean context via `/summarize-source` (guided by `guidance.md`), 2026-06-27.
> Project framing is in the flagged footer only.

## 1. Citation
Nygaard V, Rødland EA, Hovig E. "Methods that remove batch effects while retaining
group differences may lead to exaggerated confidence in downstream analyses."
*Biostatistics* 17(1):29–39, January 2016. DOI 10.1093/biostatistics/kxv027.
Open access: https://academic.oup.com/biostatistics/article/17/1/29/1744261
(Published online 2015; appears in the January 2016 issue — cited as 2016.)

## 2. Access note
Open access; read via the OUP HTML article page (URL above). Body text, abstract,
Section 2.2.2, the Section 3.2.1 degrees-of-freedom argument, the two real-data
re-analyses, and the discussion/recommendations were all readable. Equations were
fetched through a markdown-converting reader, so inline LaTeX is reproduced where it
was returned verbatim; one weighting expression from Eqs. 2.3–2.4 is described
structurally rather than quoted (flagged below) because it could not be confirmed
character-for-character. No paywall boundary encountered.

## 3. Thesis (1 sentence)
Batch-adjustment methods that simultaneously estimate and preserve group differences
(e.g. a two-way ANOVA that removes only the batch term) systematically induce
incorrect, usually inflated, group differences and over-confidence in downstream
analyses when study groups are distributed across batches in an unbalanced manner.

## 4. Problem & context
Batch/center effects in microarray gene-expression data (across cohorts, array
platforms, or batches) are confounders that can induce spurious group differences and
generally must be removed or adjusted for. When groups are unevenly distributed across
batches, naive batch adjustment can bias (usually deflate) true group differences, so
some tools offer to *preserve* the group difference — e.g. estimating group and batch
effects together with a two-way ANOVA, then subtracting only the batch term. The paper
argues this "preserve the groups" two-step approach has its own, under-recognized
failure mode under unbalanced designs. Verbatim (abstract): *"The scientific community
seems to be largely unaware of how this approach may lead to false discoveries."*

## 5. Method / approach
- Analytic derivation: starts from the two-way ANOVA model (Eq. 2.1)
  `Ỹ^cov_ijr = Y_ijr − γ̂_i = α + β_j + (γ_i − γ̂_i) + ε_ijr` (Section 2.2.2), showing that
  subtracting the *estimated* batch effect γ̂_i leaves a residual estimation error
  (γ_i − γ̂_i) that is shared across all samples in a batch, creating new dependencies.
- A degrees-of-freedom / effective-sample-size argument (Section 3.2.1) quantifying how
  the two-step "adjust then test" procedure underestimates random variability.
- Two empirical re-analyses of published datasets, comparing the two-step approach
  (ComBat adjustment, then test) against a one-step approach (block/model batch directly
  in limma) and counting significant genes.

## 6. Key claims / findings
- **Mechanism (Section 2.2.2):** subtracting the estimated batch effect leaves a per-batch
  estimation error γ̂_i − γ_i that "affects all values within the same batch in the same
  manner," so removing within-batch dependencies "may also induce new dependencies."
- **Direction of bias:** because the residual error enters group comparisons weighted by
  how each group is represented across batches, under an unbalanced design it does not
  cancel between groups; the two-step procedure then **underestimates random variability,
  leading to false/over-confident group differences** (Section 3.2.1).
  [The exact weighting in Eqs. 2.3–2.4 — a sum over batches of the per-batch group-
  representation difference times (γ̂_i − γ_i) — is described structurally, not quoted
  verbatim.]
- **Balance condition for no inflation:** in a balanced group–batch design the estimation
  error "has the same effect for all groups, and thus does not influence group
  comparisons." Formally there is no inflation **iff `n_iA : n_iB = n_A : n_B` for all
  batches i = 1,…,m** (Section 3.2.1).
- **Effective vs nominal sample size:** by Jensen's inequality `ν0 ≥ ν`, with equality
  under the same balance condition; ν is the effective sample size in the unbalanced
  design and ν0 the nominal size when batches are ignored, and `ν/ν0 ≤ 1` measures the
  degree of over-confidence.
- **Re-analysis 1 (Towfic and others, 2014; GEO GSE40566):** Copaxone (34 samples) vs
  Glatimer generic (11) plus 14 other treatments (60); chip-level batch (Illumina
  WG-6_V2, 6 samples/chip, 17 chips); "highly unbalanced, with several batches having
  only one of the main treatments of interest." ComBat (treatment as covariate) then
  test → **2011 differentially expressed genes at 5% FDR**; blocking for batch in limma
  instead → **only 11 at FDR < 0.05**.
- **Re-analysis 2 (Johnson and others, 2007, ComBat's own "Data set 2"; TAL1-inhibited vs
  control):** 30 samples in 3 batches, treatment/control = 6/2, 3/4, 9/6. ComBat then
  limma → **1003 probes (q < 0.05)**; no ComBat, blocking for batch in limma →
  **377 probes (q < 0.05)**.
- **Endorsed remedy:** account for batch *within* the statistical analysis (one-step;
  model/block batch rather than pre-subtract it). If that is not possible, covariate-
  preserving batch adjustment should be used only with "great caution" and the adjusted
  data not trusted to be batch-effect-free.

## 7. Verbatim quotes (load-bearing)
- Title (verbatim): *"Methods that remove batch effects while retaining group differences
  may lead to exaggerated confidence in downstream analyses."*
- Section 2.2.2 (verbatim): *"The estimation error γ̂_i − γ_i affects all values within the
  same batch in the same manner. Thus, while the aim is to remove spurious dependencies
  within batches, it may also induce new dependencies."*
- Section 2.2.2, batch-adjusted model (verbatim):
  *"Ỹ^cov_ijr = Y_ijr − γ̂_i = α + β_j + (γ_i − γ̂_i) + ε_ijr"*, described as giving
  *"batch-adjusted values, where any systematic bias induced by the batch differences has
  been removed, while the group differences are retained."*
- Balance condition (verbatim, Section 3.2.1): *"with equality if and only if the ratios
  n_iA : n_iB = n_A : n_B for all batches i = 1,…,m."*
- Degrees-of-freedom framing (verbatim, Section 3.2.1): *"It follows from Jensen's
  inequality that ν0 ≥ ν, with equality if and only if the ratios n_iA : n_iB = n_A : n_B
  for all batches i = 1,…,m."* … *"The ratio ν/ν0 ≤ 1 indicates to what extent the
  two-step procedure leads to underestimates of the random variability, and hence false or
  over-confidence in group differences."*
- Recommendation (verbatim, discussion): *"For an investigator facing an unbalanced data
  set with batch effects, our primary advice would be to account for batch in the
  statistical analysis. If this is not possible, batch adjustment using outcome as a
  covariate should only be performed with great caution, and the batch-adjusted data
  should not be trusted to be 'batch effect free', even when a diagnostic tool might claim
  so."*

## 8. Stated scope, assumptions, limitations
- Framed throughout in terms of microarray gene-expression data and the two-way-ANOVA /
  ComBat "preserve group differences" adjustment family.
- The inflation result is conditional on an **unbalanced** group–batch design; the paper
  states explicitly that a balanced design (ratios equal across batches) produces no such
  inflation.
- The mechanism assumes batch effects are estimated and subtracted in a first step, then
  treated as known/fixed in a second testing step (the "two-step" procedure); the harm is
  the ignored estimation error of that first step.

## 9. What the source does NOT address (confident silences)
- **RNA-seq / sequencing count data:** the paper does not state whether its conclusions
  transfer to RNA-seq or other count-based assays; it neither claims nor denies transfer.
  Its examples and framing are microarray-only. (See Guidance answers — this is the
  flagged skill-3 scope gap; the paper is silent, it does not bound or extend the claim.)
- It does not provide a corrected/adjusted test procedure that would restore correct
  confidence within the two-step framework — its remedy is to avoid the two-step approach
  and model batch directly.

## 10. Open questions / ambiguities
- Exact transfer of the result to count models (RNA-seq DESeq2/edgeR with batch as a
  covariate) — unaddressed; cannot be inferred from the text.
- The general magnitude of inflation as a function of imbalance beyond the ν/ν0 ratio and
  the two worked examples is not tabulated for arbitrary designs.

## 11. Guidance answers
- **Mechanism under unbalanced designs (quote §2.2.2):** Subtracting the estimated batch
  effect leaves residual error: *"The estimation error γ̂_i − γ_i affects all values within
  the same batch in the same manner. Thus, while the aim is to remove spurious
  dependencies within batches, it may also induce new dependencies."* Because this shared
  per-batch error enters group comparisons weighted by each group's representation across
  batches, under imbalance it fails to cancel and inflates apparent group differences
  while the second-step test ignores the first step's estimation error → over-confidence.
- **Exact balance condition for no inflation:** *"with equality if and only if the ratios
  n_iA : n_iB = n_A : n_B for all batches i = 1,…,m"*; equivalently `ν0 ≥ ν` (Jensen),
  with equality iff that ratio condition holds, where ν is the effective and ν0 the
  nominal sample size and `ν/ν0 ≤ 1` measures the over-confidence.
- **Two reanalysis datasets, exact counts and imbalance:**
  (1) Towfic et al. 2014 (GSE40566): Copaxone 34 / Glatimer 11 / 14 other treatments 60;
  chip batch (17 chips × 6); "highly unbalanced, with several batches having only one of
  the main treatments of interest." ComBat+test → **2011** DE genes (5% FDR); limma
  batch-blocking → **11** (FDR < 0.05).
  (2) Johnson et al. 2007 "Data set 2" (TAL1 vs control): 30 samples, 3 batches,
  treatment/control = 6/2, 3/4, 9/6. ComBat+limma → **1003** probes (q < 0.05);
  batch-blocking in limma → **377** (q < 0.05).
- **Endorsed remedy + caution:** Primary advice is to *"account for batch in the
  statistical analysis"* (model batch directly rather than pre-subtract). If impossible:
  *"batch adjustment using outcome as a covariate should only be performed with great
  caution, and the batch-adjusted data should not be trusted to be 'batch effect free',
  even when a diagnostic tool might claim so."*
- **Scope — microarray vs RNA-seq:** The paper is framed entirely around **microarray**
  gene-expression data (abstract: *"when preparing microarray gene expression data from
  multiple cohorts, array platforms, or batches…"*). It makes **no statement** about
  RNA-seq / sequencing / count data — it neither claims nor denies that its result
  transfers. The requested scope statement does not exist in the source; this is a genuine
  silence, not an omission in this summary.

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** cautionary-bad. The canonical **correct-then-test** invalidity, with a named signature
  (p-value inflation / exaggerated confidence) and a specific trigger (**unbalanced** group-batch designs).
- **Grounds:** [[assess-batch-effects-and-confounding]] (the cardinal sin + the endorsed "model batch in
  the analysis" remedy); secondarily [[audit-method-validity]] (leakage between adjustment and inference).
- **Honest skill-3 limitation, now explicit:** the paper is **silent** on RNA-seq counts — so skill 3 must
  not claim Nygaard's inflation result transfers to NB count models; that transfer is unestablished (cf. the
  ComBat-seq source, issue #3). The remedy converges with [[deseq2]]'s `~ batch + condition`.
