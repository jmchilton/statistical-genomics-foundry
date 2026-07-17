---
title: 'DESeq2 vignette — "Analyzing RNA-seq data with DESeq2"'
type: tutorial
source_id: deseq2
source_url: https://bioconductor.org/packages/release/bioc/vignettes/DESeq2/inst/doc/DESeq2.html
version: "1.52.0"
access_date: "2026-07-13"
license: LGPL-3.0-or-later
attribution: "Love MI, Anders S, Huber W. Analyzing RNA-seq data with DESeq2 — Bioconductor package vignette, DESeq2 v1.52.0. License LGPL (>= 3) per the DESeq2 Bioconductor landing page. Methods: Love, Huber & Anders, Genome Biology 2014;15:550."
derived: own-words-summary
tags:
  - domain/differential-expression
  - domain/batch-effects
---

# DESeq2 vignette — "Analyzing RNA-seq data with DESeq2"

> Faithful summary generated in a clean context via `/summarize-source` (guided by `guidance.md`), 2026-06-27.
> **Extended 2026-07-13** (clean-context re-run) against the "batch-design ingest — the SV-handling gap"
> guidance. Everything from the first pass is preserved; the new material is the vignette's *actual*
> hidden-batch-effect content (see §5, §6, §7, §9, and the new §11 subsection).
> **Headline finding of the re-run: this vignette has no "Removing hidden batch effects" section.**
> It never did — see §9 and §11. That section belongs to a *different* Bioconductor document (the
> rnaseqGene RNA-seq workflow), which this vignette cross-links. The first pass did not "miss" it.
> The DESeq2 vignette is LGPL-3.0-or-later (copyleft); to keep this knowledge base uniformly
> permissive, the explanatory prose is paraphrased **own-words** rather than carried verbatim.
> Functional strings — the exact full-rank error message, parameter/function names, numeric
> thresholds, design formulas, and code idioms — are kept verbatim as facts.
> Project framing is in the flagged footer only.

## 1. Citation
- Authors: Michael I. Love, Simon Anders, Wolfgang Huber.
- Title: "Analyzing RNA-seq data with DESeq2."
- Venue: Bioconductor package vignette (DESeq2).
- Version summarized: **DESeq2 package version 1.52.0** (verbatim header: "DESeq2 package version: 1.52.0").
  Vignette's own date line: `04/28/2026`. Session info in-page: `DESeq2_1.52.0`, `R version 4.6.0 RC (2026-04-17 r89917)`.
- Methods reference cited throughout: Love, Huber, and Anders 2014 (the DESeq2 paper).
- URL: https://bioconductor.org/packages/release/bioc/vignettes/DESeq2/inst/doc/DESeq2.html
- Access date: 2026-07-13 (re-fetched; first pass 2026-06-27).
- **Version delta vs. the previously-pinned pass: NONE.** The release vignette is still DESeq2
  **1.52.0** — same package version the 2026-06-27 pass pinned. No content changed under us; the
  re-run's findings are about what the source has *always* said, not about a new release.

## 2. Access note
Full HTML of the release vignette was fetched and read directly (raw HTML, ~2.9 MB).
No paywall. The long "Model matrix not full rank" section was recovered in full from the
raw HTML (it had been truncated by an initial summarizer fetch; every fact from it is
preserved below in own words — see section 11). No portion of the source was inaccessible.

**2026-07-13 re-fetch.** Re-fetched the same URL in full (2,952,135 bytes) and enumerated every
`<h1>`–`<h4>` heading in the document. Nothing was inaccessible or truncated. The complete section
list was checked against the guidance's expectation of a "Removing hidden batch effects" section:
**no such section exists in this vignette.** The strings `svaseq(`, `RUVg(`, `sva(`, `surrogate`,
and `num.sv` return **zero hits** in the full text. To rule out a version regression, the archived
Bioconductor release vignettes were probed the same way — BioC 3.22 (DESeq2 1.50.2), 3.21 (1.48.2),
3.20 (1.46.0), 3.19 (1.44.0), 3.18 (1.42.1), 3.16 (1.38.3), 3.14 (1.34.0): **zero hits for
"Removing hidden batch effects" and zero for `svaseq(` in every one.** The section is not, and has
not recently been, part of this source. What *is* here is captured in §5/§6/§7 and §11.

*(No copyright or license statement appears in the vignette body itself; the LGPL (>= 3) posture is
taken from the DESeq2 package metadata / Bioconductor landing page, as recorded in the frontmatter.)*

## 3. Thesis (1 sentence)
DESeq2 tests for differential expression from raw RNA-seq count data using negative
binomial generalized linear models whose dispersion and log2 fold-change estimates
incorporate data-driven prior distributions.

## 4. Problem & context
A core task for RNA-seq count data is detecting differentially expressed genes. The count
data are a table reporting, per sample, the number of sequence fragments assigned to each
gene (analogous data arise for ChIP-Seq, HiC, shRNA screening, mass spectrometry). The
analysis aims to quantify and statistically infer systematic changes between conditions,
measured against within-condition variability.

## 5. Method / approach (recommended procedure + defaults)
- Input: a count matrix of un-normalized counts, a sample-information table (colData), and a
  design formula. Construct a `DESeqDataSet` (e.g. via `DESeqDataSetFromMatrix`), run the
  `DESeq()` wrapper, then extract a results table with `results()`.
- Design formula: covariates first, variable of interest last, e.g. `~ batch + condition`.
  With the variable of interest last, `results()` returns that variable's comparison by
  default unless a `contrast` or `name` argument is supplied.
- Reference (control) level: R defaults to alphabetical order; set explicitly with
  `factor(dds$condition, levels = c("untreated","treated"))` or
  `relevel(dds$condition, ref = "untreated")`. Re-run `DESeq` / `nbinomWaldTest` /
  `nbinomLRT` after re-leveling for it to take effect.
- Optional pre-filtering: keep only rows whose count is at least `10` in some minimal number
  of samples; a threshold of `10` is described as reasonable for bulk RNA-seq. Set that
  minimal number of samples to the smallest group size. Not required — `results()`
  independent filtering also handles low-count genes.
- `results()` defaults: independent filtering ON by default; `alpha` default = `0.1`;
  adjusted p-values use Benjamini-Hochberg. See section 11.
- Transformations for QC/visualization only: `vst` and `rlog` produce log2-scale,
  library-size-normalized data for clustering/visualization, NOT for differential testing
  (which operates on raw counts). See section 11.
- Single-cell / speed: `fitType = "glmGamPoi"` provides faster dispersion/parameter
  estimation for single-cell data.
- **Unwanted / hidden variation (what this vignette prescribes).** The stated remedy is always to
  *model* the unwanted variation inside the design, never to pre-clean the counts: known batch
  variables go into the design formula directly, and *unknown* ones are handled by estimating
  variables that capture the unwanted variation with an external package — the vignette names
  `svaseq` in `sva` (Leek 2014) and the RUV functions in `RUVSeq` (Risso et al. 2014) — which are
  then "easily included in the DESeq2 design". **The vignette gives no code for this**: it shows no
  `svaseq()`/`RUVg()` call, no surrogate-variable-to-`colData` assignment, and no
  `design(dds) <- ~ SV1 + SV2 + condition` line. For worked examples it defers to another document,
  linking "RNA-seq workflow" → `http://www.bioconductor.org/help/workflows/rnaseqGene`. See §9/§11.
- **Continuous covariates in the design** (FAQ; the vignette never ties this to surrogate variables):
  they enter the design formula exactly like factor covariates, and their results are extracted by
  specifying `name`. The vignette adds that binning a continuous covariate into a factor of a small
  number of bins (e.g. 3–5, via `cut`) can give more meaningful results, since the average effect of
  each group is then controlled for regardless of the trend across the covariate.
- **`limma::removeBatchEffect` — visualization only.** Presented under the FAQ "Why after VST are
  there still batches in the PCA plot?", it is offered as a way to *visualize* transformed data with
  batch variation removed. It is applied to the VST assay and fed to `plotPCA`; the vignette does not
  present its output as an input to testing. Its stated scope is narrow: it removes shifts in the
  log2-scale expression data attributable to batch. The `design` argument is required so that
  variation associated with the treatment conditions is not removed along with the batch. The shown
  paradigm is for designs with balanced batches (code idiom in §7).

## 6. Key claims / findings (atomic)
- DESeq2 models counts with negative binomial GLMs; dispersion and log2 fold-change
  estimates use data-driven prior distributions.
- Input must be un-normalized (raw) counts; the model internally corrects for library size,
  so pre-normalized/scaled values must not be used (section 11).
- The variable of interest goes last in the design formula and the control level should be
  the first factor level, to benefit from default behavior (section 11).
- `results()` automatically performs independent filtering on the mean of normalized counts
  per gene, to optimize the number of genes with adjusted p < alpha; `alpha` default = 0.1.
- Default multiple-testing adjustment is Benjamini-Hochberg.
- p-values/padj are set to NA in three cases: all-zero-count rows; rows with an extreme
  count outlier (detected by Cook's distance); and (padj only) rows removed by independent
  filtering for low mean normalized count.
- vst/rlog are for non-testing applications (clustering, ML); for testing the vignette
  recommends `DESeq` applied to raw counts. vst/rlog do NOT remove batch/covariate variation
  (section 11).
- A design that is not full rank produces the error "the model matrix is not full rank, so
  the model cannot be fit as specified." Two causes: (a) columns are linear combinations of
  others; (b) factor levels / level-combinations missing samples. See section 11.
- Under perfect confounding of batch and condition, the batch effect cannot be fit and must
  be removed; the only remedies are to assume no batch effect (which the vignette deems
  highly unlikely) or to repeat the experiment with conditions balanced across batches.
- Nested group-specific condition effects ARE estimable after refactoring the design
  (`~ grp + grp:ind.n + grp:cnd` with a nested `ind.n` factor), per the edgeR "Comparisons
  Both Between and Within Subjects" trick.
- "Levels without samples": call `droplevels` for a missing single-factor level; for a
  missing interaction combination, manually drop the all-zero model-matrix column and pass
  the corrected matrix to `DESeq`'s `full` argument (with `betaPrior=FALSE` for Wald tests).
- Adding variables to the design is how one controls for additional variation: if the condition
  samples are balanced across experimental batches, including the batch factor in the design
  increases sensitivity for finding condition differences.
- DESeq2 can analyze any experimental design expressible with fixed-effects terms (multiple factors,
  interactions, continuous variables, splines).
- In experiments with **many samples** (the vignette's examples: 50, 100), technical variation
  affecting observed counts is highly likely, and **failing to model it will lead to spurious
  results**. Many methods exist to model technical variation and can be included in the DESeq2
  design to control for it while estimating the effects of interest.
- If unwanted variation (e.g. batch effects) is present, the vignette says it is always recommended
  to correct for it, and that this is **accommodated in DESeq2 by including it in the design** —
  either as known batch variables, or as variables *estimated* to capture the unwanted variation via
  `svaseq` in `sva` or the RUV functions in `RUVSeq`. (`ashr`'s authors are noted to have their own
  method for accounting for unwanted variation with `ashr`, Gerard and Stephens 2017.)
- `vst`/`rlog` use the design to compute within-group variability (`blind=FALSE`) or across-all-
  samples variability (`blind=TRUE`), but do **not** use the design to remove variation — hence
  batches persist in a post-VST PCA plot.
- `limma::removeBatchEffect` is presented for *visualizing* transformed data with batch variation
  removed (VST assay → `plotPCA`), not as a testing input; its `design` argument is needed to avoid
  removing variation associated with the treatment conditions.
- `counts(dds, normalized=TRUE)` does **not** correct for design variables: the design is not used
  when estimating size factors — it is used only when estimating dispersion and log2 fold changes.
  Normalized counts are counts scaled by size/normalization factors (with average transcript length
  additionally taken into account when normalization factors were supplied, e.g. from `cqn`/`EDASeq`,
  or when `tximport` was used with upstream bias correction).
- Continuous covariates enter the design like factorial ones (results extracted via `name`); binning
  into 3–5 bins with `cut` may give more meaningful results in some cases.

## 7. Load-bearing facts (own-words; source subsection in parens)
1. (Un-normalized input, "Why un-normalized counts?") Input must be un-normalized (raw)
   counts, or estimated counts of reads (single-end RNA-seq) or fragments (paired-end).
   Raw counts are required for DESeq2's statistical model (Love, Huber, and Anders 2014) to
   hold, because only raw counts let the model assess measurement precision correctly. The
   model corrects for library size internally, so transformed or pre-normalized values —
   e.g. counts scaled by library size — must not be supplied as input.
2. (Design formula, "The DESeqDataSet" Note) To get the package's default behavior, put the
   variable of interest last in the design formula and make the control the first factor level.
3. (Full-rank error, "Model matrix not full rank") The exact error text emitted is
   "the model matrix is not full rank, so the model cannot be fit as specified."
   *(exact error message — kept verbatim as a functional string.)*
4. (Perfect confounding remedy, "Linear combinations") In these cases the batch effect cannot
   be fit and must be removed from the formula, since there is no way to separate the condition
   effects from the batch effects. The only options are to assume there is no batch effect
   (unlikely, given the literature on batch effects in sequencing data) or to rerun the
   experiment with conditions properly balanced across batches.
5. (results() defaults, "p-values and adjusted p-values") `results()` performs independent
   filtering automatically, based on each gene's mean of normalized counts, to maximize the
   number of genes whose adjusted p-value falls below the FDR cutoff `alpha`; `alpha` defaults
   to `0.1`.
6. (Unwanted variation, Note in "Alternative shrinkage estimators") If unwanted variation such as
   batch effects is present in the data, correcting for it is always recommended, and DESeq2
   accommodates that correction **by including it in the design** — either any known batch variables,
   or variables estimated to capture the unwanted variation using packages/functions such as `svaseq`
   in `sva` (Leek 2014) or the RUV functions in `RUVSeq` (Risso et al. 2014).
   *(Function/package names kept verbatim as functional strings. This Note is the whole of what the
   vignette says about estimating hidden variation — there is no accompanying code.)*
7. (Many samples, "Multi-factor designs") With many samples (e.g. 50, 100), technical variation
   affecting the counts is highly likely, and failing to model it will lead to spurious results; the
   many available methods for modelling technical variation can be included in the DESeq2 design to
   control for it while the effects of interest are estimated. For examples of using RUV or SVA
   together with DESeq2 the vignette refers the reader to the RNA-seq workflow
   (link target, verbatim: `http://www.bioconductor.org/help/workflows/rnaseqGene`).
8. (Batch removal for plots, FAQ "Why after VST are there still batches in the PCA plot?") `vst`/`rlog`
   do not use the design to remove variation, so batch/covariate variation survives them. Transformed
   data *can* be visualized with batch variation removed via limma's `removeBatchEffect`, which simply
   removes shifts in the log2-scale expression data explainable by batch; the `design` argument is
   necessary to avoid removing variation associated with the treatment conditions. The paradigm the
   vignette gives, for designs with balanced batches *(code idiom — verbatim functional strings)*:
   ```r
   mat <- assay(vsd)
   mm <- model.matrix(~condition, colData(vsd))
   mat <- limma::removeBatchEffect(mat, batch=vsd$batch, design=mm)
   assay(vsd) <- mat
   plotPCA(vsd)
   ```
   Note what this code does and does not do: it overwrites the **VST assay** and goes straight into
   `plotPCA`. The vignette does not route it into `DESeq()`/`results()`, and (see §9) it does not
   state a prohibition against doing so either.
9. (Normalized counts, FAQ "Do normalized counts correct for variables in the design?") No. The design
   variables are not used in estimating size factors; `counts(dds, normalized=TRUE)` returns counts
   scaled by size or normalization factors. The design is used only when estimating dispersion and
   log2 fold changes.

## 8. Stated scope, assumptions, limitations (source's own caveats)
- Statistical-model validity assumes raw count input — only raw counts let the model assess
  measurement precision correctly.
- `vst`/`rlog` do not use the design to remove variation, so they do not remove variation
  tied to batch or other covariates; DESeq2 also offers no way to mark which covariates are
  nuisance versus of-interest.
- Under perfect confounding the batch effect is simply not estimable; assuming no batch
  effect is unlikely to be valid.
- For user-supplied model matrices, `betaPrior` must be set to FALSE to get Wald tests.
- The individual variable `ind` must be a factor, not numeric — the vignette flags this as
  very important.
- The `removeBatchEffect` paradigm is given **for designs with balanced batches**; the vignette scopes
  the operation narrowly (it removes shifts in log2-scale expression explainable by batch) and
  requires the `design` argument so treatment-associated variation is not removed with it.
- Handling of *unknown* unwanted variation is explicitly delegated outside DESeq2 (to `sva`/`RUVSeq`)
  and outside this document (to the rnaseqGene RNA-seq workflow) — the vignette scopes itself to
  *including* such variables in the design, not to estimating them.
- The sensitivity benefit claimed for adding batch to the design is stated for the case where
  condition samples are **balanced across batches**.

## 9. What the source does NOT address (confident silences)
- It gives no automated detector/function that flags whether a design is non-full-rank ahead
  of running `DESeq` — the user encounters it as a `DESeq` error.
- It offers no way to designate covariates as nuisance vs. of-interest for the
  transformations.
- It does not quantify how much imbalance is tolerable before estimation degrades (only that
  unbalanced nesting yields zero-columns to remove manually).

**Surrogate-variable / hidden-batch silences (verified 2026-07-13, and the point of the re-run):**
- **There is no "Removing hidden batch effects" section in this vignette.** Verified against the full
  heading list of v1.52.0 and against archived releases back to DESeq2 1.34.0 (BioC 3.14). That
  section lives in the **rnaseqGene RNA-seq workflow** — a *different* Bioconductor document, which
  this vignette explicitly cross-links for exactly this purpose.
- **No `svaseq()` call, and no `sva()` call.** The vignette never demonstrates estimating surrogate
  variables. It names `svaseq` (in `sva`) only as a pointer, in a Note. It therefore says **nothing**
  about how counts should be transformed or normalized before SV estimation, and nothing about
  `svaseq()` vs `sva()` for count data.
- **No RUVSeq / `RUVg` example, and no empirical-control-gene procedure.** `RUVSeq` is named once, as
  a pointer, alongside `sva`.
- **No SV-to-`colData` assignment and no `design(dds) <- ~ SV1 + SV2 + condition` idiom.** The
  *principle* that estimated unwanted-variation variables are included in the design is stated
  (§7 fact 6/7), but the concrete code idiom the guidance asks for is **not in this source**. It is
  not paraphrased or reconstructed here; importing it would mean sourcing it from elsewhere.
- **No guidance on choosing the number of surrogate variables.** No `num.sv`, no `n.sv`, no rule of
  thumb, no discussion of how many SVs to include. Complete silence.
- **No explicit warning against subtracting batch/surrogate effects from the data before testing, and
  no explicit prohibition on feeding a "cleaned"/batch-corrected matrix into inference.** Recording
  this silence precisely, because it is easy to over-read: the vignette *never states such a
  prohibition in so many words*. What it does instead is **positional** — every batch-corrected matrix
  it constructs (`limma::removeBatchEffect` on the VST assay) appears in a **visualization** context
  and terminates in `plotPCA`, while testing is separately and repeatedly directed to `DESeq` on raw
  counts, and correction-for-unwanted-variation is prescribed as *inclusion in the design*. The
  "include SVs as covariates; do not subtract them before testing" rule is therefore **supported in
  its first half and only implied — never asserted — in its second half** by this source. Anyone
  needing the explicit prohibition must cite something else.

## 10. Open questions / ambiguities
- The remedy for perfect confounding is binary (drop batch, or redo the experiment); the
  vignette does not address partial confounding thresholds.
- For the nested/unbalanced case it says to remove zero-interaction columns "manually" but
  the exact diagnostic workflow is left to the user (the all.zero / which idiom is shown only
  for the "levels without samples" example).
- It recommends estimating variables that capture unwanted variation (`svaseq`/RUV) and including them
  in the design, but leaves entirely open *how*: no call, no count-preprocessing, no count of SVs, no
  worked example. All of it is delegated to the rnaseqGene workflow.
- Whether a batch-corrected/"cleaned" matrix may ever be used for inference is left unstated: the
  vignette confines such matrices to visualization but never rules the practice out in words.
- `removeBatchEffect`'s paradigm is given only for balanced batches; the vignette does not say what to
  do for unbalanced ones.

## 11. Guidance answers

### "Model matrix not full rank" — RECOVERED IN FULL (own-words; functional strings kept).
All facts recovered: both required cases (linear-combinations and levels-without-samples),
plus the intermediate nested-groups case, captured in full from the raw HTML.

**Section intro (own-words).** Most designs run without trouble, but some design formulas
cause `DESeq` to fail with the error "the model matrix is not full rank, so the model cannot
be fit as specified." There are two root causes: (1) one or more model-matrix columns are
linear combinations of other columns, or (2) some factor levels — or combinations of levels
across factors — have no samples. The vignette addresses both below.

**(a) Linear combinations.** The simplest case (linear dependency) is when two variables carry
exactly the same information. The software then cannot fit separate effects for batch and
condition, because they produce identical model-matrix columns — this is perfect confounding,
and no unique coefficient solution (the β_i in the design) exists.
- Operationally: two design columns carry identical information (e.g. batch == condition, or
  batch reconstructable from a combination of condition levels) → identical/dependent model-
  matrix columns → no unique coefficient solution → the full-rank error.
- A second sub-case: the variables need not be identical — a problem also arises when one
  variable can be formed from a combination of other factor levels. The vignette's example:
  the batch-2-vs-1 effect cannot be fit because it is identical to the model-matrix column for
  the condition-C-vs-A effect.
- Remedy for confounding (see fact #4): the batch effect must be removed from the formula.
  The only options are to assume there is no batch effect (deemed highly unlikely given the
  batch-effects literature) or to redo the experiment with conditions balanced across batches.
  The vignette shows a balanced design (each batch contains conditions A, B, C).

**Estimability under full confounding with the variable of interest.** When batch and
condition produce identical model-matrix columns (perfect confounding), no unique coefficient
solution (the β_i) is possible, and there is simply no way to tell the condition effects apart
from the batch effects.

**(intermediate) Group-specific condition effects, individuals nested within groups —
estimable after refactoring.** Here inference *is* possible, but the terms must be rearranged.
The naive `~ ind + grp*cnd` errors, because the group effect is a linear combination of the
individuals. Fix: build with a simple design (e.g. `~ ind + cnd`), add a nested `ind.n` factor
distinguishing individuals within each group, then reassign design
`~ grp + grp:ind.n + grp:cnd` before calling `DESeq`. Group-specific condition effects
(`grpX.cndB`, `grpY.cndB`) are extracted with `results(..., name=)` and contrasted via
`results(dds, contrast=list("grpY.cndB","grpX.cndB"))`. Unbalanced individuals across groups
produce zero interaction columns; remove those columns manually from the model matrix and pass
the corrected matrix to `DESeq`'s `full` argument. You cannot create the `DESeqDataSet` with a
less-than-full-rank design directly — either use `design=~1` when creating the object, or
supply the corrected model matrix to the dataset's design slot from the start.

**(b) Levels without samples.** Base R's model-matrix constructor emits a column of zeros when
a factor level is missing, or when a combination of levels is missing from a factor
interaction. The first case is fixed by calling `droplevels` on the column (as shown earlier
in the vignette); the second is fixed by editing the model matrix manually and passing it to
`DESeq`.
- Operationally: a factor level (or an interaction combination of levels) has no samples →
  base R emits an all-zero model-matrix column → not full rank.
- Remedy 1 (missing single-factor level): `dds$condition <- droplevels(dds$condition)`.
- Remedy 2 (missing interaction combination): build the model matrix, detect the all-zero
  column (`all.zero <- apply(m1, 2, function(x) all(x==0))`), drop it
  (`idx <- which(all.zero); m1 <- m1[,-idx]`), and pass the corrected matrix `m1` to `DESeq`'s
  `full` argument. For a likelihood-ratio test of interactions, give a reduced-design matrix
  (e.g. `~ condition + group`) to the `reduced` argument. Wald tests can be used instead of the
  LRT, but for user-supplied model matrices `betaPrior` must be set to FALSE.

**Consolidated remedies the vignette offers for a non-full-rank design:**
- Drop the confounded/redundant variable from the formula (perfect confounding).
- Re-design / repeat the experiment to balance conditions across batches.
- Refactor terms with a nested factor (`~ grp + grp:ind.n + grp:cnd`) for nested designs.
- `droplevels` to remove factor levels lacking samples.
- Manually remove all-zero model-matrix columns and supply the corrected matrix to `full`
  (and `reduced` for LRT); set `betaPrior=FALSE` for Wald tests on custom matrices.
- Use `design=~1` at construction when a design would otherwise be less than full rank.

### Batch-in-design / variable-of-interest-last / reference-level rules
- Pattern `~ batch + condition` is the shown batch-aware design.
- To get the package's default behavior, put the variable of interest last in the formula and
  make the control the first factor level.
- Because `condition` is the variable of interest, placing it last makes `results()` return
  the condition comparison by default unless a `contrast` or `name` argument is supplied.
- Reference level: R picks a factor's reference level alphabetically by default; set it
  explicitly instead. Code:
  `dds$condition <- factor(dds$condition, levels = c("untreated","treated"))` or
  `dds$condition <- relevel(dds$condition, ref = "untreated")`; re-run DESeq/nbinomWaldTest/
  nbinomLRT after re-leveling.

### Raw, un-normalized counts input rule
Input values should be un-normalized (raw) counts, or estimated counts of reads (single-end
RNA-seq) or fragments (paired-end). The model corrects for library size internally, so
transformed or pre-normalized values — e.g. counts scaled by library size — must not be
supplied as input.

### vst/rlog are for QC/visualization, not testing
Differential testing operates on raw counts with discrete distributions; for other downstream
uses — visualization or clustering — transformed versions of the counts can help. Per the FAQ,
the variance-stabilizing (`vst`) and `rlog` transformations are meant for applications other
than differential testing (e.g. clustering or other machine-learning uses); for testing, the
vignette recommends `DESeq` on raw counts. The transformations do not use the design to remove
variation, so they do not remove variation associated with batch or other covariates.

### results() defaults: independent filtering on, alpha default, BH
`results()` performs independent filtering automatically, based on each gene's mean of
normalized counts, to maximize the number of genes with an adjusted p-value below the FDR
cutoff `alpha` (independent filtering is discussed further in the vignette). `alpha` defaults
to `0.1`. The adjustment method is Benjamini-Hochberg, shown in the `mcols` column description
as "BH adjusted p-values".

### Batch-design ingest (2026-07 guidance) — "the SV-handling gap"

> **Premise check first.** This guidance section opens by asserting that "the first pass missed the
> vignette's **'Removing hidden batch effects'** section entirely." That premise is **incorrect**, and
> the correction is the most important output of this re-run: **the DESeq2 vignette has no such
> section.** The first pass carried no `sva`/`svaseq`/`RUV`/`surrogate` content because there is none
> to carry. Verified against v1.52.0's complete heading list and against archived releases back to
> 1.34.0 / BioC 3.14 (§2). The section the guidance describes — `svaseq()`, `RUVg()`, and the
> `design(ddssva) <- ...` idiom — is in the **rnaseqGene RNA-seq workflow**, which *this* vignette
> links to for precisely these examples. Answers below are strictly what this source says; the
> rnaseqGene code is **not** reproduced here (it is not this source, and importing it would launder
> another document into this note).

**Q: The "Removing hidden batch effects" section in full.**
Not present in this source. See above and §9.

**Q: Which function is called to estimate SVs on count data (`svaseq()` vs `sva()`)? Keep the exact
call verbatim, including how counts are transformed/normalized first.**
**Unanswerable from this source.** The vignette makes **no call at all** — neither `svaseq()` nor
`sva()` appears as code anywhere in it. It names `svaseq` (in the `sva` package, citing Leek 2014)
only as a pointer inside a Note. It says nothing about pre-transformation or normalization of the
counts prior to SV estimation. Recording the silence rather than reconstructing a call.

**Q: How are the estimated SVs then used — appended to `colData` + added to `design()`, or a cleaned
matrix? Keep the design-formula line verbatim; this is the load-bearing fact.**
The **mechanism is stated, the code idiom is not.** What the vignette asserts (own-words, §7 facts
6–7): correcting for unwanted variation is *always recommended*, and is **accommodated in DESeq2 by
including it in the design** — known batch variables directly, or variables *estimated* to capture the
unwanted variation (via `svaseq`/`sva`, or the RUV functions in `RUVSeq`), which "can be easily
included in the DESeq2 design to control for technical variation while estimating effects of
interest." So on the guidance's binary — covariates-in-the-design vs. a cleaned matrix — **this source
comes down squarely on covariates-in-the-design**, and never proposes a cleaned matrix as a testing
input. But it prints **no** `design(dds) <- ~ SV1 + SV2 + condition` line, and **no** `colData`
assignment. The verbatim design-formula line the guidance wants is **not available from this source**;
it must come from rnaseqGene. Related and in-source: continuous covariates (which is what SVs are)
enter a design formula exactly like factorial ones, with results extracted via `name` — though the
vignette itself never draws that connection to SVs.

**Q: The parallel RUVSeq example (`RUVg` with empirical control genes) — exact call, and how the
factors enter the design.**
**Not in this source.** No `RUVg()` call, no empirical-control-gene procedure, no worked example.
`RUVSeq` (Risso et al. 2014) is named once, as a pointer, in the same Note as `sva`. The only claim
made about the resulting factors is the shared one above: they are included in the design.

**Q: Does the vignette warn against *subtracting* estimated batch/surrogate effects from the data
before testing, or against using a "cleaned" matrix for inference? If silent, record the silence.**
**It is silent on the explicit warning — recording that silence, and being precise about what stands
in its place.** No sentence in this vignette prohibits subtracting batch/surrogate effects before
testing, or forbids feeding a corrected matrix to `DESeq()`/`results()`. What exists is *positional
and indirect*, and must not be upgraded into a warning it does not make:
- Its only batch-subtraction machinery (`limma::removeBatchEffect`) is introduced under a
  **visualization** FAQ ("Why after VST are there still batches in the PCA plot?"), operates on the
  **VST assay**, and terminates in `plotPCA` — it is never routed into testing.
- Testing is separately and consistently directed to `DESeq` on **raw, un-normalized counts** (§7
  fact 1), and `vst`/`rlog` output is stated to be for applications *other than* differential testing.
- Correction for unwanted variation is prescribed as **inclusion in the design** (§7 facts 6–7).
So the rule "include SVs as covariates; do NOT subtract them from the data before testing" is
**half-sourced here**: the *include-as-covariates* half is directly supported; the *don't-subtract*
half is only implied by where the vignette puts things, never asserted. **This source cannot be cited
for an explicit anti-subtraction warning.**

**Q: Any mention of `limma::removeBatchEffect` — what the vignette says it is (and is not) for.**
Yes, one mention, in the FAQ "Why after VST are there still batches in the PCA plot?".
- *What it is for*: **visualizing** transformed data with batch variation removed. The vignette's own
  scoping of it is deliberately modest — it "simply removes any shifts in the log2-scale expression
  data that can be explained by batch" (own-words). The shown paradigm is **for designs with balanced
  batches**, and the code (verbatim idiom in §7 fact 8) overwrites `assay(vsd)` and calls `plotPCA`.
- *Required argument*: `design` — necessary to avoid removing variation associated with the treatment
  conditions. Readers are referred to `?removeBatchEffect` in limma for details.
- *What it is not presented for*: differential testing. The vignette does not feed its output into
  `DESeq()`/`results()` — but, per the previous answer, it also does not explicitly forbid that.
- *Why it is needed at all*: `vst`/`rlog` use the design only to compute within-group (`blind=FALSE`)
  or across-samples (`blind=TRUE`) variability, never to *remove* variation — so batch structure
  survives them, and DESeq2 has no way to mark covariates as nuisance vs. of-interest.

**Q: The vignette's guidance on choosing how many surrogate variables to use.**
**None. Complete silence.** No `num.sv`/`n.sv`, no heuristic, no discussion. This question is not
addressed by this source in any form.

**Adjacent, in-source, and relevant to the batch-design skill (not asked, but load-bearing):**
- In experiments with **many samples** (e.g. 50, 100) technical variation is highly likely, and
  **failing to model it will lead to spurious results** — the vignette's strongest statement of *why*
  hidden variation must be modelled.
- `counts(dds, normalized=TRUE)` does **not** correct for design variables (size factors are estimated
  without the design); the design enters only dispersion and LFC estimation. So "normalized counts"
  are not batch-corrected counts.

### Version pin (must-pin)
DESeq2 package version **1.52.0**; vignette date line `04/28/2026`; `R version 4.6.0 RC`.
Access date **2026-07-13** (first pass: 2026-06-27).
**Delta vs. previously-pinned version: none** — still 1.52.0, unchanged content. The re-run changed
our *reading* of the source, not the source. Additionally probed (and pinned as negative evidence):
DESeq2 1.50.2 / 1.48.2 / 1.46.0 / 1.44.0 / 1.42.1 / 1.38.3 / 1.34.0 — none contain the
"Removing hidden batch effects" section or any `svaseq(` call.

### Guidance items not answered by the source
From the original guidance: none unanswered.
From the 2026-07 "SV-handling gap" guidance: **most of it is unanswerable from this source**, because
the section it targets is not in this document. Unanswered here, and only obtainable elsewhere
(rnaseqGene, or another source):
1. the exact `svaseq()` call and the count transformation/normalization preceding it;
2. the SV → `colData` assignment and the verbatim `design(dds) <- ~ SV1 + SV2 + condition` line;
3. the `RUVg` / empirical-control-gene example and how its factors enter the design;
4. how many surrogate variables to use;
5. an *explicit* warning against subtracting effects / testing on a cleaned matrix (silent — §9).
Answerable and answered here: that unwanted variation is corrected **by inclusion in the design**
(known batch vars, or estimated SV/RUV variables), and the visualization-only framing of
`limma::removeBatchEffect`.

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** established-good / exemplar. The **remedy** for batch confounding (raw counts +
  `~ batch + condition`) and the canonical established DE method.
- **Grounds:** [[deseq2-basics]] (skill-8 spine), the Exemplar pole of the batch pattern, and
  [[map-question-to-established-method]] (DESeq2 = established choice, don't invent).
- **NEW (closes issue #7):** the recovered "Model matrix not full rank" section is skill-3's
  **operational aliasing detector** — perfect confounding ⇒ no way to separate the condition
  effects from the batch effects ⇒ drop batch or rebalance/repeat. This is the non-identifiability rule the
  first (unguided) summary dropped and the blind author had to GAP. Guidance file → recovered.
- **Convention, not citation:** FDR≤0.05, |log2FC|≥1, LRT-vs-Wald are community/vignette convention with
  no defining primary — flag as convention/version-pinned (content/research/05 finding #2).
