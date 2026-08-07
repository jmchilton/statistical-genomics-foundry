---
title: "RNA-seq workflow: gene-level exploratory analysis and differential expression (rnaseqGene)"
type: tutorial
source_id: rnaseqgene
source_url: https://bioconductor.org/packages/release/workflows/vignettes/rnaseqGene/inst/doc/rnaseqGene.html
version: "1.36.0"
bioconductor_release: "3.23"
access_date: "2026-07-13"
license: Artistic-2.0
license_file: LICENSES/Artistic-2.0.LICENSE
attribution: "Michael I. Love, Simon Anders, Vladislav Kim, Wolfgang Huber. rnaseqGene Bioconductor workflow package, version 1.36.0 (Bioconductor 3.23). Licensed Artistic-2.0. https://bioconductor.org/packages/release/workflows/html/rnaseqGene.html — read from the rendered vignette HTML; an F1000Research version exists (DOI 10.12688/f1000research.7563.1) and is stated to differ."
derived: license-aware-summary
tags:
  - domain/differential-expression
  - domain/batch-effects
---

# rnaseqGene — RNA-seq workflow: gene-level exploratory analysis and differential expression

## 1. Citation

- **Authors (as listed on the vignette):** Michael I. Love (1,2), Simon Anders (3), Vladislav Kim (4),
  Wolfgang Huber (4).
  1,2 = Depts. of Biostatistics / Genetics, UNC-Chapel Hill; 3 = ZMBH, Universität Heidelberg;
  4 = EMBL Heidelberg.
- **Package author/maintainer (landing page):** Michael Love [aut, cre].
- **Title:** "RNA-seq workflow: gene-level exploratory analysis and differential expression"
- **Venue:** Bioconductor *workflow* package `rnaseqGene` (vignette "RNA-seq workflow at the gene level").
- **Version summarized (verbatim from the page header):** `Package: 1.36.0`,
  `Bioconductor version: 3.23`, `R version: R version 4.6.0 RC (2026-04-17 r89917)`.
  Byline date printed on the vignette: **16 October, 2019** (the document's own date line; the package
  version and Bioc release above are the authoritative pin).
- **Bioconductor DOI (landing page):** 10.18129/B9.bioc.rnaseqGene
- **Source repo (landing page URL field):** https://github.com/thelovelab/rnaseqGene/
- **License (landing page DESCRIPTION table):** **Artistic-2.0**
- **Landing page:** https://bioconductor.org/packages/release/workflows/html/rnaseqGene.html
- **Vignette URL:** https://bioconductor.org/packages/release/workflows/vignettes/rnaseqGene/inst/doc/rnaseqGene.html
- **Published version:** the Introduction links to a published version at F1000Research —
  http://f1000research.com/articles/4-1070 , DOI https://doi.org/10.12688/f1000research.7563.1 .
  The vignette states the version you read online **differs** from the F1000 article, "primarily in
  that we now give code for performing fast transcript quantification followed by import in
  R/Bioconductor to perform gene-level analysis." *This note summarizes the vignette, not the F1000
  article.*
- **Access date:** 2026-07-13 (fetched the release vignette HTML directly).

## 2. Access note

Full open access; entire vignette HTML read (all sections 1–11 plus Appendix and References). No
paywall. Package `DESCRIPTION` metadata read from the Bioconductor landing page table (Version, License,
Depends). Numeric outputs quoted below are the values printed in the built vignette for Bioc 3.23.

## 3. Thesis (1 sentence)

An end-to-end gene-level RNA-seq differential-expression workflow in Bioconductor: quantify with Salmon,
import with tximeta, build a `DESeqDataSet` with an explicit design formula, do exploratory
transformation/visualization, run `DESeq()`, interpret and annotate results — and, if unwanted variation
is suspected, estimate hidden factors (SVA / RUVSeq) and **add them to the design** before testing.

## 4. Problem & context

- Bioconductor releases every 6 months guarantee packages in a release work together; the workflow uses
  core annotation packages plus contributed statistical/visualization packages.
- **Dataset:** the `airway` package — an RNA-seq experiment where **airway smooth muscle cells** were
  treated with **dexamethasone** (Himes et al. 2014). **Four primary human airway smooth muscle cell
  lines**, each with a treated and an untreated sample (8 samples: SRR1039508/09/12/13/16/17/20/21).
  Treatment: 1 micromolar dexamethasone for 18 hours. PubMed 24926665; GEO **GSE52778**.
- The `Depends` field (landing page) lists the full fixture-relevant stack:
  `R (>= 3.3.0), BiocStyle, airway (>= 1.5.3), tximeta, magrittr, DESeq2, apeglm, vsn, dplyr, ggplot2,
  hexbin, pheatmap, RColorBrewer, PoiClaClu, glmpca, ggbeeswarm, genefilter, AnnotationDbi, org.Hs.eg.db,
  Gviz, sva, RUVSeq, fission`.
- A second dataset, `fission` (fission-yeast oxidative-stress time course, Leong et al. 2014), is used
  for the time-course/interaction section.

## 5. Method / approach (recommended procedure + exact parameters)

Pipeline order as presented:

1. **Quantify** FASTQ → transcript abundance with **Salmon**; import with **tximeta** (or
   `tximport`). Appendix gives the FASTQ download, salmon index build, and quantification commands.
2. **Summarize to gene level** → `SummarizedExperiment` (`gse`).
3. **Branching point** (§2.6): the counted object could feed edgeR, limma-voom, DSS, EBSeq, baySeq;
   the workflow continues with DESeq2.
4. **Build the `DESeqDataSet` with the design formula** (§3):
   ```r
   gse$cell <- gse$donor
   gse$dex  <- gse$condition
   levels(gse$dex) <- c("untrt", "trt")   # order must be preserved when renaming
   gse$dex %<>% relevel("untrt")          # first level = reference level
   dds <- DESeqDataSet(gse, design = ~ cell + dex)
   ```
   The design `~ cell + dex` means "test for the effect of dexamethasone (`dex`) controlling for the
   effect of different cell line (`cell`)". The simplest design would be `~ condition`. Interaction
   designs take the form `~ group + treatment + group:treatment`.
   Design formula is set **at the beginning of the analysis**; the one exception that does not depend on
   it is size-factor estimation.
5. **Pre-filter** (§4.1): keep rows with a count of **at least 10** in at least `smallestGroupSize`
   samples; "The count of 10 is a reasonable choice for bulk RNA-seq", and the recommended minimal
   number of samples is the **smallest group size** (here 4).
   ```r
   smallestGroupSize <- 4
   keep <- rowSums(counts(dds) >= 10) >= smallestGroupSize
   dds <- dds[keep,]
   ```
   Rows: 58294 → **16637**.
6. **Exploratory transformations** (§4.2): `vst()` and `rlog()` (both do sequencing-depth correction
   automatically); used for sample distances, PCA, GLM-PCA, MDS. Explicitly a **separate path** from
   testing — testing goes back to raw counts.
7. **Differential expression** (§5): a single call — `dds <- DESeq(dds)` (size factors → dispersions →
   GLM fit). Results: `res <- results(dds)`, equivalently
   `res <- results(dds, contrast=c("dex","trt","untrt"))`. `results()` with no arguments extracts the
   **last variable in the design formula**.
   - Default FDR/alpha: `summary(res)` reports at `adjusted p-value < 0.1`; independent filtering
     "maximizes the number of genes with adjusted p value less than a critical value (**by default,
     alpha is set to 0.1**)".
   - Stricter options: `results(dds, alpha = 0.05)`; `results(dds, lfcThreshold=1)`.
   - IHW alternative (un-evaluated chunk): `res.ihw <- results(dds, filterFun=ihw)`.
8. **Plot / annotate / export** (§6–7), including `lfcShrink` with apeglm, `org.Hs.eg.db` annotation,
   `Gviz` genomic plot.
9. **§8 Removing hidden batch effects** — *after* the DE machinery is introduced (see §"Where the step
   sits", below).
10. **§9 Time-course** with `fission`, design `~ strain + minute + strain:minute`, LRT.

## 6. Key claims / findings (atomic)

- Counts are pre-filtered at **≥10 counts in ≥ smallest-group-size samples**; "Additional
  weighting/filtering to improve power is applied at a later step in the workflow." (§4.1)
- Statistical testing must use **original raw counts**, not scaled/transformed values — "the statistical
  testing methods rely on original count data (not scaled or transformed) for calculating the precision
  of measurements." (§4)
- `summary(res)` on the airway data (design `~ cell + dex`): out of 16637 with nonzero total read count,
  at adjusted p < 0.1 — LFC > 0 (up): **2362, 14%**; LFC < 0 (down): **2019, 12%**; outliers: 0;
  low counts: 646, 3.9% (mean count < 12). Footnotes name `cooksCutoff` and `independentFiltering`
  arguments of `?results`. (§5.2)
- `results(dds, alpha = 0.05)` → 3602 TRUE / 12712 FALSE at padj < 0.05. `results(dds, lfcThreshold=1)`
  → 240 TRUE at padj < 0.1. (§5.2)
- `NA` p-values mean either all counts zero for that gene, or the gene was excluded as an extreme count
  outlier. (§5.2)
- **Independent filtering is only permissible if the filter statistic (mean of normalized counts) is
  independent of the test statistic under the null**; otherwise filtering "would invalidate the test and
  consequently the assumptions of the BH procedure." (§6.4)
- **§8 core claim:** when a batch-like source of variation is *hidden* (here: cell line, supposing we
  did not know it), estimate it with `sva`/`RUVSeq` and **"add these to the DESeqDataSet design, in
  order to account for them."** (§8 intro)
- SVA (`svaseq`) with `n.sv = 2` on the airway data recovers factors that stripchart clearly against
  the true cell line — "we can see how well the SVA method did at recovering these variables". Printed
  message: `## Number of significant surrogate variables is: 2` / `## Iteration (out of 5 ):1 2 3 4 5`.
- RUVSeq (`RUVg`, `k=2`) with **empirical control genes** (genes without a small p-value from a
  batch-naive run) likewise produces factors `W_1`, `W_2` that track cell line. (§8.2)

## 7. Load-bearing statements — **verbatim mode** (license: Artistic-2.0 → verbatim-ok; short quotes with location)

> "We can use statistical methods designed for RNA-seq from the sva package (Leek 2014) or the RUVSeq
> package (Risso et al. 2014) in Bioconductor to detect such groupings of the samples, and then we can
> add these to the DESeqDataSet design, in order to account for them."
> — §8 *Removing hidden batch effects*, opening paragraph.

> "Finally, in order to use SVA to remove any effect on the counts from our surrogate variables, we
> simply add these two surrogate variables as columns to the DESeqDataSet and then add them to the
> design"
> — §8.1 *Using SVA with DESeq2*, immediately before the `design(ddssva) <-` chunk.

> "We could then produce results controlling for surrogate variables by running DESeq with the new
> design."
> — §8.1, final line.

> "As before, if we wanted to control for these factors, we simply add them to the DESeqDataSet and to
> the design" … "We would then run DESeq with the new design to re-estimate the parameters and results."
> — §8.2 *Using RUV with DESeq2*, around the `design(ddsruv) <-` chunk.

> "This is critical because the statistical testing methods rely on original count data (not scaled or
> transformed) for calculating the precision of measurements."
> — §4 *Exploratory analysis and visualization*, on the two-path split.

### Functional strings — VERBATIM (code as printed in the vignette)

**§8.1 — SVA.** Preceding prose states: a matrix of normalized counts filtered to average count > 1;
full model matrix with `dex`; reduced/null model matrix with only an intercept; "we specify that we want
to estimate 2 surrogate variables"; "For more information read the manual page for the svaseq function
by typing ?svaseq."

```r
library("sva")

dat  <- counts(dds, normalized = TRUE)
idx  <- rowMeans(dat) > 1
dat  <- dat[idx, ]
mod  <- model.matrix(~ dex, colData(dds))
mod0 <- model.matrix(~ 1, colData(dds))
svseq <- svaseq(dat, mod, mod0, n.sv = 2)
```
Printed output:
```
## Number of significant surrogate variables is: 2
## Iteration (out of 5 ):1 2 3 4 5
```
Diagnostic plot (SVs vs. the known cell line):
```r
par(mfrow = c(2, 1), mar = c(3,5,3,1))
for (i in 1:2) {
  stripchart(svseq$sv[, i] ~ dds$cell, vertical = TRUE, main = paste0("SV", i))
  abline(h = 0)
}
```
**The load-bearing idiom — SVs enter via the design, not by subtraction:**
```r
ddssva <- dds
ddssva$SV1 <- svseq$sv[,1]
ddssva$SV2 <- svseq$sv[,2]
design(ddssva) <- ~ SV1 + SV2 + dex
```

**§8.2 — RUVSeq.** Preceding prose: `RUVg` estimates "factors of unwanted variation, analogous to SVA's
surrogate variables"; "A difference compared to the SVA procedure above, is that we first would run
DESeq and results to obtain the p-values for the analysis without knowing about the batches, e.g. just
`~ dex`. Supposing that we have this results table `res`, we then pull out a set of empirical control
genes by looking at the genes that do not have a small p-value."

```r
library("RUVSeq")

set <- newSeqExpressionSet(counts(dds))
idx  <- rowSums(counts(set) > 5) >= 2
set  <- set[idx, ]
set  <- betweenLaneNormalization(set, which="upper")
not.sig <- rownames(res)[which(res$pvalue > .1)]
empirical <- rownames(set)[ rownames(set) %in% not.sig ]
set <- RUVg(set, empirical, k=2)
pData(set)
```
Printed `pData(set)` columns: `W_1`, `W_2` (8 rows, one per SRR sample).

**The load-bearing idiom — RUV factors enter via the design:**
```r
ddsruv <- dds
ddsruv$W1 <- set$W_1
ddsruv$W2 <- set$W_2
design(ddsruv) <- ~ W1 + W2 + dex
```

**Other functional strings pinned:**
- `dds <- DESeqDataSet(gse, design = ~ cell + dex)`
- `dds <- DESeq(dds)`; `res <- results(dds)`; `res <- results(dds, contrast=c("dex","trt","untrt"))`
- `res.05 <- results(dds, alpha = 0.05)`; `resLFC1 <- results(dds, lfcThreshold=1)`
- `res.ihw <- results(dds, filterFun=ihw)`
- `smallestGroupSize <- 4; keep <- rowSums(counts(dds) >= 10) >= smallestGroupSize`
- Time-course: `ddsTC <- DESeq(ddsTC, test="LRT", reduced = ~ strain + minute)` on design
  `~ strain + minute + strain:minute`
- Session-info versions (Bioc 3.23 build): `DESeq2_1.52.0`, `sva_3.60.0`, `RUVSeq_1.46.0`,
  `EDASeq_2.46.0`, `edgeR_4.10.1`, `limma_3.68.4`, `apeglm_1.34.0`, `fission_1.32.0`,
  `org.Hs.eg.db_3.23.1`, `Gviz_1.56.0`, `genefilter_1.94.0`.

## 8. Stated scope, assumptions, limitations (the source's own caveats)

- The workflow is **gene-level**; differential *transcript usage* is explicitly out of scope and
  deferred to the `rnaseqDTU` workflow (F1000Research 7-952).
- The design formula expresses **fixed-effects** designs only: "For running DESeq2 models, you can use
  R's formula notation to express any fixed-effects experimental design." (§3)
- Factor level order matters: the first level of a factor should be the reference level; `relevel`
  "decides how the variables will be coded, and how contrasts will be computed"; renaming levels must
  preserve order.
- Independent filtering is valid only under the independence condition stated in §6.4 (above).
- The vignette repeatedly defers detail to other manual pages / the DESeq2 vignette: `?svaseq`,
  `?results` (more examples of interaction designs), the DESeq2 vignette's outlier-detection section,
  the DESeq2 vignette for the IHW example, and the `pasilla` vignette for HTSeq counting.
- §8's premise is explicitly hypothetical: "**Suppose we did not know** that there were different cell
  lines involved in the experiment, only that there was treatment with dexamethasone." The real airway
  design (`~ cell + dex`) already includes the batch variable; SVA/RUV are shown as what you do when it
  is *hidden*.
- Note on the RUV example: the prose says the control genes should come from a batch-naive run
  ("supposing that we have this results table `res`" from "just `~ dex`"), but the object `res` actually
  in scope at that point in the vignette is the one produced earlier from the `~ cell + dex` design. The
  vignette does not re-run `DESeq` with `~ dex` before this chunk.

## 9. Failure modes / invalidity patterns named by the source

- **Testing on transformed data is wrong**: §4 states testing methods "rely on original count data (not
  scaled or transformed)". This is the workflow's only explicit "don't test on modified data" statement,
  and it is about the **VST/rlog exploratory path**, *not* about batch correction.
- **Filtering that is not independent invalidates BH**: §6.4 — if the filter statistic is not independent
  of the test statistic under the null, "the filtering would invalidate the test and consequently the
  assumptions of the BH procedure."
- **Low-count genes have no power** and "are best excluded from testing" (§6.4 figure caption); they also
  degrade the multiple-testing adjustment.
- **Log of small counts inflates variance**; PCA on raw/normalized counts is dominated by
  highest-count genes (§4.2) — motivation for VST/rlog, and a symptom (mean-sd plot via `vsn::meanSdPlot`).
- **Extreme count outliers** → `NA` p-values; controlled by `cooksCutoff` (§5.2).
- **Relevel flips the sign** of a two-group contrast coefficient if the reference level changes (§3).
- **Hidden/unwanted variation** is the §8 failure mode itself: unmodeled grouping "might be affecting
  many or all of the genes in the dataset". The named **detector** is: estimate SVs/factors and
  stripchart them against a candidate known variable (`stripchart(svseq$sv[, i] ~ dds$cell, ...)`) to see
  whether they track a real source of variation. There is **no stated numeric criterion** for "the SVs
  are picking up something real."

## 10. What the source does NOT address (confident silences — verified by full-text search)

- **No warning against subtracting batch effects from the data before testing.** Searched the full
  vignette for `subtract`, `clean`, `correct`, `removeBatchEffect`, `limma`. §8 never states a
  prohibition on producing a batch-"cleaned"/residualized matrix and testing on it. It simply
  **demonstrates only the design-reassignment route** and says nothing about the alternative. The
  anti-subtraction rule is therefore **implied by placement/omission, not asserted** in this source.
  (The only adjacent explicit rule — §4, "testing methods rely on original count data (not scaled or
  transformed)" — is made about the VST/rlog exploratory transformations, not about batch removal, and
  the vignette does not connect the two.)
- **`limma::removeBatchEffect` is never mentioned.** `limma` appears only (a) as an alternative DE
  package with voom at the branching point (§2.6), and (b) in the session-info package list (as a
  dependency of RUVSeq/EDASeq). No statement about what `removeBatchEffect` is or is not for.
- **Confounding of batch with the condition of interest is never discussed.** No occurrence of
  "confound" anywhere in the vignette. It gives no guidance on what happens (or what to do) when the
  hidden factor is collinear with `dex`.
- **No rule for how many SVs/factors to keep.** `n.sv = 2` and `k=2` are simply chosen ("Finally we
  specify that we want to estimate 2 surrogate variables"). The vignette does not describe `sva`'s
  automatic `n.sv` estimation (e.g. `num.sv`), does not justify 2 beyond the printed
  `## Number of significant surrogate variables is: 2`, and gives no selection criterion. It defers to
  `?svaseq`.
- No discussion of whether/how to plot or report SVs beyond the stripchart diagnostic; no
  diagnostics for over-fitting the design with too many estimated factors; no mention of degrees of
  freedom cost.
- No batch-effect handling for the exploratory/visualization path (nothing about removing the estimated
  factors from the VST matrix before PCA).
- Nothing on RNA-seq experimental design/blocking to *prevent* batch effects.
- No discussion of random effects / mixed models (explicitly fixed-effects only).

## 11. Open questions / ambiguities left unresolved by the source

- Whether the estimated SVs should be re-estimated after any additional filtering, or reused across
  contrasts — not addressed.
- In §8.2 the control-gene set is derived from `res`, whose stated provenance ("just `~ dex`") does not
  match the `res` object actually in scope in the rendered document (from `~ cell + dex`). The vignette
  does not resolve this.
- `betweenLaneNormalization(set, which="upper")` and the `rowSums(counts(set) > 5) >= 2` filter are
  applied without justification of the thresholds.
- Whether the SVA and RUV routes should agree, and what to do if they disagree — not addressed.
- Whether `dex` should be in `mod` when the goal is discovering *unknown* batch (it is: `mod <-
  model.matrix(~ dex, colData(dds))`), but no discussion of the consequence of protecting the variable
  of interest this way.

## 12. Guidance answers

**Q: Which function estimates SVs on count data — `svaseq()` or `sva()`? Exact call, including count
transformation and gene filtering first.**
→ **`svaseq()`.** Counts are taken as **normalized counts** (`counts(dds, normalized = TRUE)` — *not*
log-transformed), filtered to genes whose **row mean > 1**, then passed with a full and a null model
matrix:
```r
dat  <- counts(dds, normalized = TRUE)
idx  <- rowMeans(dat) > 1
dat  <- dat[idx, ]
mod  <- model.matrix(~ dex, colData(dds))
mod0 <- model.matrix(~ 1, colData(dds))
svseq <- svaseq(dat, mod, mod0, n.sv = 2)
```
`sva()` is never called in this vignette.

**Q: How is `n.sv` chosen?**
→ **A number is passed explicitly: `n.sv = 2`.** The prose: "Finally we specify that we want to estimate
2 surrogate variables." No estimation procedure or selection rule is given; the reader is referred to
`?svaseq`. The function *prints* `## Number of significant surrogate variables is: 2`, but the vignette
does not present this as the basis for the choice. **The workflow gives no rule for how many SVs to
keep** (guidance silence #2: confirmed silent).

**Q: How do the estimated SVs enter the analysis — design reassignment or a corrected matrix?**
→ **Design reassignment. Verbatim:**
```r
ddssva <- dds
ddssva$SV1 <- svseq$sv[,1]
ddssva$SV2 <- svseq$sv[,2]
design(ddssva) <- ~ SV1 + SV2 + dex
```
followed by "We could then produce results controlling for surrogate variables by running `DESeq` with
the new design." **No corrected/cleaned matrix is produced anywhere.**

**Q: The parallel RUVSeq example — exact call, and how the factors enter the design.**
→ `RUVg` with **empirical control genes** = genes *without* a small p-value (`res$pvalue > .1`) from a
batch-naive run:
```r
set <- newSeqExpressionSet(counts(dds))
idx  <- rowSums(counts(set) > 5) >= 2
set  <- set[idx, ]
set  <- betweenLaneNormalization(set, which="upper")
not.sig <- rownames(res)[which(res$pvalue > .1)]
empirical <- rownames(set)[ rownames(set) %in% not.sig ]
set <- RUVg(set, empirical, k=2)
```
Factors enter **the same way — via the design:**
```r
ddsruv <- dds
ddsruv$W1 <- set$W_1
ddsruv$W2 <- set$W_2
design(ddsruv) <- ~ W1 + W2 + dex
```
"We would then run `DESeq` with the new design to re-estimate the parameters and results."
Note RUVg's own output *is* a corrected/normalized expression matrix inside the `SeqExpressionSet`, but
**the vignette does not use it for testing** — it takes only `pData(set)$W_1`/`W_2` and moves them into
the DESeq2 design.

**Q: Does the workflow warn against subtracting estimated batch effects / testing on a "cleaned" matrix?**
→ **NO — it is SILENT. Recording the silence explicitly.** Full-text search finds no such warning, no
"cleaned"/"corrected matrix" prohibition, and no mention of `removeBatchEffect`. The anti-subtraction
posture is **enacted by example only** (both routes end in `design(...) <- ~ factors + condition`), never
**asserted**. Do not attribute the prohibition to this source.

**Q: Any use of `limma::removeBatchEffect` and what it is/isn't for?**
→ **Not present.** `limma` appears only as an alternative DE package (voom, §2.6) and in session info.
The workflow says nothing about `removeBatchEffect`.

**Q: What dataset, and how obtained (stageable fixture)?**
→ The **`airway`** Bioconductor data package (`library("airway")`; the workflow locates its bundled
salmon quantification files with `dir <- system.file("extdata", package="airway", mustWork=TRUE)` and
rebuilds a `RangedSummarizedExperiment` with `tximeta`). 8 samples, 4 cell lines × (untrt, trt), dexamethasone
1 µM / 18 h. GEO **GSE52778**; PubMed 24926665. Appendix §10.1 gives FASTQ download, salmon index build,
and quantification commands. Time-course section uses the **`fission`** package.

**Q: Where does the batch/unwanted-variation step sit relative to the DE test?**
→ **§8, after** §5 (DE pipeline), §6 (plotting), §7 (annotation/export) — i.e. it is presented as a
*retrospective* step: the workflow has already run `DESeq()` and `results()` on `~ cell + dex`. §8's
narrative frame is "suppose we did not know" the cell lines. Both §8 recipes **end before testing**:
they build a new `DESeqDataSet` with an augmented design and say `DESeq` "could"/"would then" be re-run.
The vignette does **not** show the re-run or its results. For RUV specifically, the order is explicitly:
run DE **first** (batch-naive) → use its p-values to pick empirical control genes → estimate `W` →
re-design → re-run.

**Q: Silence — what to do when batch is confounded with the condition of interest?**
→ **SILENT. Confirmed by full-text search: the word "confound" does not appear in the vignette.** No
guidance on collinearity between the hidden factor and `dex`.

**Q: Pin.**
→ `rnaseqGene` **1.36.0**, **Bioconductor 3.23** (release), built under **R 4.6.0 RC (2026-04-17 r89917)**;
key stack versions from session info: **DESeq2 1.52.0**, **sva 3.60.0**, **RUVSeq 1.46.0**. License
**Artistic-2.0**. Accessed **2026-07-13**. (Vignette byline date printed: 16 October, 2019.)
