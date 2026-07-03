---
title: 'DESeq2 vignette — "Analyzing RNA-seq data with DESeq2"'
type: tutorial
source_id: deseq2
source_url: https://bioconductor.org/packages/release/bioc/vignettes/DESeq2/inst/doc/DESeq2.html
version: "1.52.0"
access_date: "2026-06-27"
license: LGPL-3.0-or-later
attribution: "Love MI, Anders S, Huber W. Analyzing RNA-seq data with DESeq2 — Bioconductor package vignette, DESeq2 v1.52.0. License LGPL (>= 3) per the DESeq2 Bioconductor landing page. Methods: Love, Huber & Anders, Genome Biology 2014;15:550."
derived: own-words-summary
---

# DESeq2 vignette — "Analyzing RNA-seq data with DESeq2"

> Faithful summary generated in a clean context via `/summarize-source` (guided by `guidance.md`), 2026-06-27.
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
- Methods reference cited throughout: Love, Huber, and Anders 2014 (the DESeq2 paper).
- URL: https://bioconductor.org/packages/release/bioc/vignettes/DESeq2/inst/doc/DESeq2.html
- Access date: 2026-06-27.

## 2. Access note
Full HTML of the release vignette was fetched and read directly (raw HTML, ~2.9 MB).
No paywall. The long "Model matrix not full rank" section was recovered in full from the
raw HTML (it had been truncated by an initial summarizer fetch; every fact from it is
preserved below in own words — see section 11). No portion of the source was inaccessible.

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
  **operational aliasing detector** — perfect confounding ⇒ no way to separate the condition
  effects from the batch effects ⇒ drop batch or rebalance/repeat. This is the non-identifiability rule the
  first (unguided) summary dropped and the blind author had to GAP. Guidance file → recovered.
- **Convention, not citation:** FDR≤0.05, |log2FC|≥1, LRT-vs-Wald are community/vignette convention with
  no defining primary — flag as convention/version-pinned (research/05 finding #2).
