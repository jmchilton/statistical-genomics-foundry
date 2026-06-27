# DESeq2 vignette — "Analyzing RNA-seq data with DESeq2"

> Faithful summary generated in a clean context via `/summarize-source` (guided by `guidance.md`), 2026-06-27.
> Project framing is in the flagged footer only.

## 1. Citation
- Authors: Michael I. Love, Simon Anders, Wolfgang Huber.
- Title: "Analyzing RNA-seq data with DESeq2."
- Venue: Bioconductor package vignette (DESeq2).
- Version summarized: **DESeq2 package version 1.52.0** (verbatim header: "DESeq2 package version: 1.52.0").
- Methods reference cited throughout: Love, Huber, and Anders 2014 (the DESeq2 paper).
- URL: https://bioconductor.org/packages/release/bioc/vignettes/DESeq2/inst/doc/DESeq2.html
- Access date: 2026-06-27.

## 2. Access note
Full HTML of the release vignette was fetched and read directly (raw HTML, ~2.9 MB).
No paywall. The long "Model matrix not full rank" section was recovered in full from the
raw HTML (it had been truncated by an initial summarizer fetch; recovered here verbatim —
see section 11). No portion of the source was inaccessible.

## 3. Thesis (1 sentence)
DESeq2 tests for differential expression from raw RNA-seq count data using negative
binomial generalized linear models whose dispersion and log2 fold-change estimates
incorporate data-driven prior distributions.

## 4. Problem & context
"A basic task in the analysis of count data from RNA-seq is the detection of differentially
expressed genes." Count data are a table reporting, per sample, the number of sequence
fragments assigned to each gene (analogous data arise for ChIP-Seq, HiC, shRNA screening,
mass spectrometry). The analysis question is "the quantification and statistical inference
of systematic changes between conditions, as compared to within-condition variability."

## 5. Method / approach (recommended procedure + defaults)
- Input: a count matrix of un-normalized counts, a sample-information table (colData), and a
  design formula. Construct a `DESeqDataSet` (e.g. via `DESeqDataSetFromMatrix`), run the
  `DESeq()` wrapper, then extract a results table with `results()`.
- Design formula: covariates first, variable of interest last, e.g. `~ batch + condition`.
  "As condition is the variable of interest, we put it at the end of the formula. Thus the
  results function will by default pull the condition results unless contrast or name
  arguments are specified."
- Reference (control) level: R defaults to alphabetical order; set explicitly with
  `factor(dds$condition, levels = c("untreated","treated"))` or
  `relevel(dds$condition, ref = "untreated")`. Re-run `DESeq` / `nbinomWaldTest` /
  `nbinomLRT` after re-leveling for it to take effect.
- Optional pre-filtering: "keep only rows that have a count of at least 10 for a minimal
  number of samples. The count of 10 is a reasonable choice for bulk RNA-seq." Recommended
  minimal number of samples = smallest group size. Not required (results() independent
  filtering also handles low-count genes).
- `results()` defaults: independent filtering ON by default; `alpha` default = 0.1;
  adjusted p-values are BH ("BH adjusted p-values"). See section 11 for verbatim.
- Transformations for QC/visualization only: `vst` and `rlog` produce log2-scale,
  library-size-normalized data for clustering/visualization, NOT for differential testing
  (which operates on raw counts). See section 11.
- Single-cell / speed: `fitType = "glmGamPoi"` provides faster dispersion/parameter
  estimation for single-cell data.

## 6. Key claims / findings (atomic)
- DESeq2 models counts with negative binomial GLMs; dispersion and log2 fold-change
  estimates use data-driven prior distributions.
- Input must be un-normalized (raw) counts; the model internally corrects for library size,
  so pre-normalized/scaled values must not be used (section 11, verbatim).
- The variable of interest goes last in the design formula and the control level should be
  the first factor level, to benefit from default behavior (section 11, verbatim).
- `results()` automatically performs independent filtering on the mean of normalized counts
  per gene, to optimize the number of genes with adjusted p < alpha; `alpha` default = 0.1.
- Default multiple-testing adjustment is Benjamini-Hochberg.
- p-values/padj are set to NA in three cases: all-zero-count rows; rows with an extreme
  count outlier (detected by Cook's distance); and (padj only) rows removed by independent
  filtering for low mean normalized count.
- vst/rlog are for non-testing applications (clustering, ML); for testing the vignette
  recommends `DESeq` applied to raw counts. vst/rlog do NOT remove batch/covariate variation
  (section 11, verbatim).
- A design that is not full rank produces the error "the model matrix is not full rank, so
  the model cannot be fit as specified." Two causes: (a) columns are linear combinations of
  others; (b) factor levels / level-combinations missing samples. See section 11.
- Under perfect confounding of batch and condition, the batch effect cannot be fit and must
  be removed; the only remedies are to assume no batch effect (deemed "highly unlikely") or
  to repeat the experiment with conditions balanced across batches.
- Nested group-specific condition effects ARE estimable after refactoring the design
  (`~ grp + grp:ind.n + grp:cnd` with a nested `ind.n` factor), per the edgeR "Comparisons
  Both Between and Within Subjects" trick.
- "Levels without samples": call `droplevels` for a missing single-factor level; for a
  missing interaction combination, manually drop the all-zero model-matrix column and pass
  the corrected matrix to `DESeq`'s `full` argument (with `betaPrior=FALSE` for Wald tests).

## 7. Verbatim quotes (load-bearing)
1. (Un-normalized input, "Why un-normalized counts?") "The values in the matrix should be
   un-normalized counts or estimated counts of sequencing reads (for single-end RNA-seq) or
   fragments (for paired-end RNA-seq). … It is important to provide count matrices as input
   for DESeq2's statistical model (Love, Huber, and Anders 2014) to hold, as only the count
   values allow assessing the measurement precision correctly. The DESeq2 model internally
   corrects for library size, so transformed or normalized values such as counts scaled by
   library size should not be used as input."
2. (Design formula, "The DESeqDataSet" Note) "Note: In order to benefit from the default
   settings of the package, you should put the variable of interest at the end of the formula
   and make sure the control level is the first level."
3. (Full-rank error, "Model matrix not full rank") "the model matrix is not full rank, so the
   model cannot be fit as specified."
4. (Perfect confounding remedy, "Linear combinations") "In both of these cases above, the
   batch effect cannot be fit and must be removed from the model formula. There is just no way
   to tell apart the condition effects and the batch effects. The options are either to assume
   there is no batch effect (which we know is highly unlikely given the literature on batch
   effects in sequencing datasets) or to repeat the experiment and properly balance the
   conditions across batches."
5. (results() defaults, "p-values and adjusted p-values") "Note that the results function
   automatically performs independent filtering based on the mean of normalized counts for
   each gene, optimizing the number of genes which will have an adjusted p value below a given
   FDR cutoff, alpha. … By default the argument alpha is set to 0.1."

## 8. Stated scope, assumptions, limitations (source's own caveats)
- Statistical-model validity assumes raw count input ("only the count values allow assessing
  the measurement precision correctly").
- vst/rlog "does not use the design to remove variation in the data. It therefore does not
  remove variation that can be associated with batch or other covariates (nor does DESeq2
  have a way to specify which covariates are nuisance and which are of interest)."
- Under perfect confounding the batch effect is simply not estimable; assuming no batch
  effect is "highly unlikely" to be valid.
- For user-supplied model matrices, `betaPrior` must be set to FALSE to get Wald tests.
- "individual (ind) is a factor not a numeric. This is very important."

## 9. What the source does NOT address (confident silences)
- It gives no automated detector/function that flags whether a design is non-full-rank ahead
  of running `DESeq` — the user encounters it as a `DESeq` error.
- It offers no way to designate covariates as nuisance vs. of-interest for the
  transformations.
- It does not quantify how much imbalance is tolerable before estimation degrades (only that
  unbalanced nesting yields zero-columns to remove manually).

## 10. Open questions / ambiguities
- The remedy for perfect confounding is binary (drop batch, or redo the experiment); the
  vignette does not address partial confounding thresholds.
- For the nested/unbalanced case it says to remove zero-interaction columns "manually" but
  the exact diagnostic workflow is left to the user (the all.zero / which idiom is shown only
  for the "levels without samples" example).

## 11. Guidance answers

### "Model matrix not full rank" — RECOVERED IN FULL.
Confirmed recovered: yes, both required cases (linear-combinations and levels-without-samples),
plus the intermediate nested-groups case, captured verbatim from the raw HTML.

**Section intro (verbatim):** "While most experimental designs run easily using design
formula, some design formulas can cause problems and result in the DESeq function returning
an error with the text: 'the model matrix is not full rank, so the model cannot be fit as
specified.' There are two main reasons for this problem: either one or more columns in the
model matrix are linear combinations of other columns, or there are levels of factors or
combinations of levels of multiple factors which are missing samples. We address these two
problems below and discuss possible solutions:"

**(a) Linear combinations — operational meaning + the confounding quote.**
Verbatim: "The simplest case is the linear combination, or linear dependency problem, when
two variables contain exactly the same information, such as in the following sample table.
The software cannot fit an effect for batch and condition, because they produce identical
columns in the model matrix. This is also referred to as perfect confounding. A unique
solution of coefficients (the β_i in the formula below) is not possible."
- Operationally: two design columns carry identical information (e.g. batch == condition, or
  batch reconstructable from a combination of condition levels) → identical/dependent model-
  matrix columns → no unique coefficient solution → the full-rank error.
- A second sub-case (verbatim): "Another situation which will cause problems is when the
  variables are not identical, but one variable can be formed by the combination of other
  factor levels. In the following example, the effect of batch 2 vs 1 cannot be fit because it
  is identical to a column in the model matrix which represents the condition C vs A effect."
- Remedy for confounding (verbatim, quote #4 above): batch effect "must be removed from the
  model formula … The options are either to assume there is no batch effect (which we know is
  highly unlikely …) or to repeat the experiment and properly balance the conditions across
  batches." The vignette shows a balanced design (each batch contains conditions A, B, C).

**Estimability when one variable is a linear combination of / fully confounded with the
variable of interest (guidance-required quote):** "The software cannot fit an effect for batch
and condition, because they produce identical columns in the model matrix. This is also
referred to as perfect confounding. A unique solution of coefficients (the β_i in the formula
below) is not possible." And: "There is just no way to tell apart the condition effects and
the batch effects."

**(intermediate) Group-specific condition effects, individuals nested within groups —
estimable after refactoring.** Verbatim: "there is a case where we can in fact perform
inference, but we may need to re-arrange terms to do so." The naive `~ ind + grp*cnd` "will
obtain an error, because the effect for group is a linear combination of the individuals."
Fix: construct with a simple design (e.g. `~ ind + cnd`), add a nested `ind.n` factor
distinguishing individuals within each group, then reassign design `~ grp + grp:ind.n +
grp:cnd` before calling `DESeq`. Group-specific condition effects (`grpX.cndB`, `grpY.cndB`)
are extracted with `results(..., name=)` and contrasted via
`results(dds, contrast=list("grpY.cndB","grpX.cndB"))`. Unbalanced individuals across groups
produce zero interaction columns: "You can remove these columns manually from the model matrix
and pass the corrected model matrix to the full argument of the DESeq function. … you will not
be able to create the DESeqDataSet with the design that leads to less than full rank model
matrix. You can either use design=~1 when creating the dataset object, or you can provide the
corrected model matrix to the design slot of the dataset from the start."

**(b) Levels without samples — operational meaning + remedies (verbatim).** "The base R
function for creating model matrices will produce a column of zeros if a level is missing from
a factor or a combination of levels is missing from an interaction of factors. The solution to
the first case is to call droplevels on the column, which will remove levels without samples.
This was shown in the beginning of this vignette. The second case is also solvable, by
manually editing the model matrix, and then providing this to DESeq."
- Operationally: a factor level (or an interaction combination of levels) has no samples →
  base R emits an all-zero model-matrix column → not full rank.
- Remedy 1 (missing single-factor level): `dds$condition <- droplevels(dds$condition)`.
- Remedy 2 (missing interaction combination): build the model matrix, detect the all-zero
  column (`all.zero <- apply(m1, 2, function(x) all(x==0))`), drop it
  (`idx <- which(all.zero); m1 <- m1[,-idx]`), and pass the corrected matrix to `DESeq`'s
  `full` argument. Verbatim: "Now this matrix m1 can be provided to the full argument of
  DESeq. For a likelihood ratio test of interactions, a model matrix using a reduced design
  such as ~ condition + group can be given to the reduced argument. Wald tests can also be
  generated instead of the likelihood ratio test, but for user-supplied model matrices, the
  argument betaPrior must be set to FALSE."

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
- Verbatim (Note): "In order to benefit from the default settings of the package, you should
  put the variable of interest at the end of the formula and make sure the control level is
  the first level."
- Verbatim (workflow): "As condition is the variable of interest, we put it at the end of the
  formula. Thus the results function will by default pull the condition results unless contrast
  or name arguments are specified."
- Reference level (verbatim): "By default, R will choose a reference level for factors based on
  alphabetical order. … you can explicitly set the factors levels." Code:
  `dds$condition <- factor(dds$condition, levels = c("untreated","treated"))` or
  `dds$condition <- relevel(dds$condition, ref = "untreated")`; re-run DESeq/nbinomWaldTest/
  nbinomLRT after re-leveling.

### Raw, un-normalized counts input rule (must-quote — verbatim)
"The values in the matrix should be un-normalized counts or estimated counts of sequencing
reads (for single-end RNA-seq) or fragments (for paired-end RNA-seq). … The DESeq2 model
internally corrects for library size, so transformed or normalized values such as counts
scaled by library size should not be used as input."

### vst/rlog are for QC/visualisation, not testing (verbatim)
"In order to test for differential expression, we operate on raw counts and use discrete
distributions … However for other downstream analyses – e.g. for visualization or clustering –
it might be useful to work with transformed versions of the count data." And (FAQ): "The
variance stabilizing and rlog transformations are provided for applications other than
differential testing, for example clustering of samples or other machine learning
applications. For differential testing we recommend the DESeq function applied to raw counts
as outlined above." And: it "does not use the design to remove variation in the data. It
therefore does not remove variation that can be associated with batch or other covariates."

### results() defaults: independent filtering on, alpha default, BH (verbatim)
"Note that the results function automatically performs independent filtering based on the mean
of normalized counts for each gene, optimizing the number of genes which will have an adjusted
p value below a given FDR cutoff, alpha. Independent filtering is further discussed below. By
default the argument alpha is set to 0.1." Adjustment method appears as mcols description "BH
adjusted p-values" (Benjamini-Hochberg).

### Version pin (must-pin)
DESeq2 package version **1.52.0**. Access date 2026-06-27.

### Guidance items not answered by the source
None unanswered — every guidance question was addressable from the vignette text.

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** established-good / exemplar. The **remedy** for batch confounding (raw counts +
  `~ batch + condition`) and the canonical established DE method.
- **Grounds:** [[deseq2-basics]] (skill-8 spine), the Exemplar pole of the batch pattern, and
  [[map-question-to-established-method]] (DESeq2 = established choice, don't invent).
- **NEW (closes issue #7):** the recovered "Model matrix not full rank" section is skill-3's
  **operational aliasing detector** — perfect confounding ⇒ "no way to tell apart the condition effects
  and the batch effects" ⇒ drop batch or rebalance/repeat. This is the non-identifiability rule the
  first (unguided) summary dropped and the blind author had to GAP. Guidance file → recovered.
- **Convention, not citation:** FDR≤0.05, |log2FC|≥1, LRT-vs-Wald are community/vignette convention with
  no defining primary — flag as convention/version-pinned (research/05 finding #2).
