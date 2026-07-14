---
title: "The SVA package for removing batch effects and other unwanted variation in high-throughput experiments"
type: tutorial
source_id: sva
source_url: https://bioconductor.org/packages/release/bioc/html/sva.html
version: "3.60.0"
bioconductor_release: "3.23"
access_date: "2026-07-13"
license: Artistic-2.0
license_file: LICENSES/Artistic-2.0.LICENSE
attribution: "sva: Surrogate Variable Analysis, version 3.60.0 (Bioconductor 3.23). Leek JT, Johnson WE, Parker HS, Fertig EJ, Jaffe AE, Storey JD, Zhang Y, Collado-Torres L. Artistic-2.0. https://bioconductor.org/packages/release/bioc/html/sva.html — signatures and defaults read off the reference manual (the vignette prints call sites only)."
derived: license-aware-summary
---

# sva — Bioconductor package vignette

## 1. Citation

Leek J, Johnson WE, Jaffe A, Parker H, Storey J. *The SVA package for removing batch effects and
other unwanted variation in high-throughput experiments.* Package vignette ("sva tutorial").

- Vignette byline (verbatim): "Jeffrey Leek¹, W. Evan Johnson², Andrew Jaffe¹, Hilary Parker¹, John Storey³"
  (¹ Johns Hopkins Bloomberg School of Public Health, ² Boston University, ³ Princeton University;
  email jleek@jhsph.edu). Note: the *package* author list is longer than the *vignette* byline — it adds
  Elana J. Fertig, Yuqing Zhang, Leonardo Collado Torres.
- Vignette datestamp (verbatim): "Modified: October 24, 2011 Compiled: May 5, 2026"
- Package DOI: 10.18129/B9.bioc.sva
- Vignette PDF: https://www.bioconductor.org/packages/release/bioc/vignettes/sva/inst/doc/sva.pdf
- Vignette R script: https://www.bioconductor.org/packages/release/bioc/vignettes/sva/inst/doc/sva.R
- Reference manual: https://bioconductor.org/packages/release/bioc/manuals/sva/man/sva.pdf
- Landing page: https://bioconductor.org/packages/release/bioc/html/sva.html

**Paper to cite for the package itself** (per vignette §15, verbatim): "Leek JT, Johnson WE, Parker HS,
Jaffe AE, and Storey JD. (2012) The sva package for removing batch effects and other unwanted variation
in high-throughput experiments. Bioinformatics DOI:10.1093/bioinformatics/bts034"

### VERSION PIN (defaults drift across releases — this note is only valid for this pin)

| Field | Value (read off source) |
|---|---|
| sva package version | **3.60.0** |
| Bioconductor release | **3.23** |
| `git_branch` / `git_last_commit` | `RELEASE_3_23` / `87a4798`, commit date `2026-04-28` |
| Reference manual `Date/Publication` | `2026-07-12` (man page header dated July 13, 2026) |
| `Depends` | `R (>= 3.2), mgcv, genefilter, BiocParallel` |
| `Imports` | `matrixStats, stats, graphics, utils, limma, edgeR` |
| `Suggests` | `pamr, bladderbatch, BiocStyle, zebrafishRNASeq, testthat` |
| Install instruction on landing page | start R version **"4.6"**, `BiocManager::install("sva")` |
| License | **Artistic-2.0** |
| `RoxygenNote` | 7.0.2 |
| Accessed | **2026-07-13** |

**Every signature and default below was read off the sva 3.60.0 reference manual `Usage` blocks or the
vignette/`sva.R` code, not recalled.** They are functional strings, reproduced verbatim.

## 2. Access note

Full open access; nothing paywalled. I read, in full: the vignette PDF (16 pp.), the vignette's extracted
R source (`sva.R` — used to recover one code line the PDF truncates mid-argument), the complete reference
manual PDF (22 pp.), and the package landing page. **Function signatures come from the reference manual**,
because the vignette itself never prints a full signature — it only shows call sites. Where the vignette
and the reference manual differ in emphasis, I say so below rather than merging them.

I additionally spot-checked the *archived* vignettes for Bioconductor 3.2 and 3.4 for one specific
guidance question (the null-data sanity check, §12) — that is the only claim in this note drawn from
outside the pinned release, and it is flagged there.

## 3. Thesis (1 sentence)

Verbatim, vignette §1: "The sva package contains functions for removing batch effects and other unwanted
variation in high-throughput experiments" — via two routes, "(1) identifying and estimating surrogate
variables for unknown sources of variation in high-throughput experiments and (2) directly removing known
batch effects using ComBat".

Note a documented internal inconsistency: the vignette body says **two** ways; the package DESCRIPTION
(landing page + reference manual) says **three**, adding "(3) removing batch effects with known control
probes (Leek 2014 biorXiv)" (i.e. supervised sva, which the vignette does cover in §14 but doesn't count).

## 4. Problem & context

The vignette quotes Leek et al. (2010) for its definition of batch effects (verbatim, §1):

> "Batch effects are sub-groups of measurements that have qualitatively different behaviour across
> conditions and are unrelated to the biological or scientific variables in a study. For example, batch
> effects may occur if a subset of experiments was run on Monday and another set on Tuesday, if two
> technicians were responsible for different subsets of the experiments, or if two different lots of
> reagents, chips or instruments were used."

Known batch → ComBat. Unknown/unmeasured drivers → sva. Verbatim (§1): "There are also potentially a large
number of environmental and biological variables that are unmeasured and may have a large impact on
measurements from high-throughput biological experiments. For these cases the sva function may be more
appropriate for removing these artifacts. It is also possible to use the sva function with the ComBat
function to remove both known batch effects and other potential latent sources of variation."

Running example throughout: bladder cancer expression data (Dyrskjot et al. 2004) from the `bladderbatch`
package; 22,283 rows × 57 samples.

## 5. Method / recommended procedure + EXACT defaults

### 5.0 Data setup (vignette §2–3)

Features in **rows**, samples in **columns** ("the typical genes by samples matrix"). The package assumes
two variable types: **adjustment variables** and **variables of interest**. Two model matrices are required
(verbatim, §2): "The null model is a model matrix that includes terms for all of the adjustment variables
but not the variables of interest. The full model includes terms for both the adjustment variables and the
variables of interest."

```r
pheno = pData(bladderEset)
edata = exprs(bladderEset)
mod  = model.matrix(~as.factor(cancer), data=pheno)   # full model
mod0 = model.matrix(~1, data=pheno)                   # null model (intercept only here)
```

### 5.1 `num.sv()` — how many surrogate variables

**Signature (verbatim, reference manual p.10):**

```r
num.sv(dat, mod, method = c("be", "leek"), vfilter = NULL, B = 20, seed = NULL)
```

- **The default method is `"be"`** — it is the first element of `method = c("be", "leek")`, R's `match.arg`
  default. This is load-bearing and easy to get wrong, because **every call site in the vignette and in all
  the man-page examples explicitly passes `method="leek"` instead** (e.g. `num.sv(edata,mod,method="leek")`).
  The documented default and the demonstrated usage disagree.
- What each method does (verbatim, reference manual Description, p.10): "The default approach is based on a
  permutation procedure originally prooposed by Buja and Eyuboglu 1992. The function also provides an
  interface to the asymptotic approach proposed by Leek 2011 Biometrics." [`prooposed` is a typo in the
  source.] So: `"be"` = Buja–Eyuboglu **permutation** procedure (hence `B = 20` permutations and the `seed`
  argument, both of which are inert under `"leek"`); `"leek"` = Leek 2011 **asymptotic** approach.
- The man page says the methods are "as described in the details section", but **the num.sv man page has no
  Details section** — the two sentences above are the entirety of what the package documents about the
  difference. Neither the vignette nor the manual gives guidance on *when* to choose one over the other.
- Other defaults: `vfilter = NULL`, `B = 20`, `seed = NULL`.
- Vignette result: `num.sv(edata, mod, method="leek")` returns `[1] 2` on the bladder data.

### 5.2 `sva()` — estimate the surrogate variables

**Signature (verbatim, reference manual p.15):**

```r
sva(
  dat,
  mod,
  mod0 = NULL,
  n.sv = NULL,
  controls = NULL,
  method = c("irw", "two-step", "supervised"),
  vfilter = NULL,
  B = 5,
  numSVmethod = "be"
)
```

- **`n.sv` is auto-estimated when omitted.** Verbatim (vignette §4): "The sva function performs two different
  steps. First it identifies the number of latent factors that need to be estimated. If the sva function is
  called without the n.sv argument specified, the number of factors will be estimated for you. The number of
  factors can also be estimated using the num.sv." Default is `n.sv = NULL`, and the vignette demonstrates the
  omitted form in §12 (`trainSv = sva(trainData,trainMod,trainMod0)` → prints "Number of significant surrogate
  variables is: 5").
- **Iteration count: `B = 5`** — "The number of iterations of the irwsva algorithm to perform". Console output
  confirms: `Iteration (out of 5 ):1 2 3 4 5`.
- **Default estimation method is `"irw"`** (iteratively re-weighted). `"supervised"` is selected by supplying
  `controls`. Constraint (verbatim): "vfilter must be NULL if method is "supervised"".
- **`numSVmethod = "be"`** — used only when `n.sv = NULL`. Verbatim: "If n.sv is NULL, sva will attempt to
  estimate the number of needed surrogate variables. This should not be adapted by the user unless they are an
  expert." Note this means the *internal* auto-estimate uses `"be"` while the vignette's *explicit* `num.sv()`
  calls use `"leek"` — the two documented paths to `n.sv` do not use the same estimator. [The juxtaposition is
  mine; both strings are read verbatim off the source, but the source never remarks on the discrepancy.]
- **Return value** (verbatim, vignette §4): "The sva function returns a list with four components, sv,
  pprob.gam, pprob.b, n.sv. sv is a matrix whose columns correspond to the estimated surrogate variables...
  pprob.gam is the posterior probability that each gene is associated with one or more latent variables.
  pprob.b is the posterior probability that each gene is associated with the variables of interest. n.sv is
  the number of surrogate variables estimated by the sva." (The vignette's citation markers here render as
  broken `[?]` in the compiled PDF.)

Vignette call: `svobj = sva(edata, mod, mod0, n.sv=n.sv)`.

### 5.3 Using the SVs downstream — `f.pvalue()` (vignette §5)

**Signature (verbatim, reference manual p.6):** `f.pvalue(dat, mod, mod0)` — "The columns of mod0 must be a
subset of the columns of mod."

**The recommended downstream procedure: append the SVs as columns to BOTH model matrices.** This is the single
most load-bearing procedural statement in the vignette for a doer:

```r
modSv  = cbind(mod,  svobj$sv)
mod0Sv = cbind(mod0, svobj$sv)
pValuesSv = f.pvalue(edata, modSv, mod0Sv)
qValuesSv = p.adjust(pValuesSv, method="BH")
```

Verbatim rationale (§5): "The first step is to include the surrogate variables in both the null and full
models. The reason is that we want to adjust for the surrogate variables, so we treat them as adjustment
variables that must be included in both models."

Unadjusted-vs-adjusted framing (verbatim, §5): "Note that nearly 70% of the genes are strongly differentially
expressed at an FDR of less than 5% between groups. This number seems artificially high, even for a strong
phenotype like cancer." (This is the vignette's motivating symptom for why adjustment is needed; it does not
state the post-adjustment count.)

### 5.4 Using the SVs with limma (vignette §6)

```r
fit = lmFit(edata, modSv)
contrast.matrix <- cbind("C1"=c(-1,1,0,rep(0,svobj$n.sv)),"C2"=c(0,-1,1,rep(0,svobj$n.sv)),...)
fitContrasts = contrasts.fit(fit, contrast.matrix)
eb = eBayes(fitContrasts)
topTableF(eb, adjust="BH")
```

SVs go in the **design matrix**, and are padded with zeros in the **contrasts**. Verbatim: "We do not include
the surrogate variables in the contrasts, since they are only being used to adjust the analysis."
(The `contrast.matrix` line is truncated at the right margin of the PDF; recovered from `sva.R`.)

### 5.5 `ComBat()` — known batches (vignette §7)

**Signature (verbatim, reference manual p.3):**

```r
ComBat(
  dat,
  batch,
  mod = NULL,
  par.prior = TRUE,
  prior.plots = FALSE,
  mean.only = FALSE,
  ref.batch = NULL,
  BPPARAM = bpparam("SerialParam")
)
```

Arguments (verbatim): `dat` "Genomic measure matrix (dimensions probe x sample)"; `batch` "Batch covariate
(**only one batch allowed**)"; `mod` "Model matrix for outcome of interest and other covariates besides batch";
`par.prior` "TRUE indicates parametric adjustments will be used, FALSE indicates non-parametric adjustments
will be used"; `mean.only` "If TRUE ComBat only corrects the mean of the batch effect (no scale adjustment)";
`ref.batch` "If given, will use the selected batch as a reference for batch adjustment."

**Input expectation (verbatim, reference manual Description, p.2): "The input data are assumed to be cleaned
and normalized before batch effect removal."** ComBat returns "A probe x sample genomic measure matrix,
adjusted for batch effects" — same dimensions as input.

Vignette call (recovered in full from `sva.R`; the PDF truncates it):

```r
modcombat = model.matrix(~1, data=pheno)
combat_edata = ComBat(dat=edata, batch=batch, mod=modcombat, par.prior=TRUE, prior.plots=FALSE)
pValuesComBat = f.pvalue(combat_edata, mod, mod0)
qValuesComBat = p.adjust(pValuesComBat, method="BH")
```

The `mod` argument to ComBat: verbatim (§7) "Just as with sva, we then need to create a model matrix for the
adjustment variables, including the variable of interest. Note that you do not include batch in creating this
model matrix - it will be included later in the ComBat function. In this case there are no other adjustment
variables so we simply fit an intercept term." **This passage is internally confusing and worth flagging:** it
says to include the variable of interest, then the code passes `~1` (intercept only, cancer *excluded*). The
man-page examples do it both ways (`mod=NULL` in two examples, `mod=mod` with cancer in the `ref.batch` one).
The source does not resolve which is intended.

Also verbatim (§7): "Note that adjustment variables will be treated as given to the ComBat function. This means
if you are trying to adjust for a categorical variable with p different levels, you will need to give ComBat p-1
indicator variables for this covariate. We recommend using the model.matrix function to set these up."

Options: `par.prior=FALSE` → non-parametric EB ("this will take longer"). `prior.plots=TRUE` → "prior plots with
black as a kernel estimate of the empirical batch effect density and red as the parametric estimate". `mean.only=TRUE`
→ "only adjusts the mean of the batch effects across batches (default adjusts the mean and variance)... recommended
for cases where milder batch effects are expected (so no need to adjust the variance), or in cases where the variances
are expected to be different across batches due to the biology." `ref.batch` → "the means and variances of the
non-reference batches will be adjusted to make the mean/variance of the reference batch... useful for cases where one
batch is larger or better quality... this will be useful in biomarker situations where the researcher wants to fix the
traning set/model and then adjust test sets to the reference/training batch. This avoids test-set bias in such studies."
When using `mean.only=TRUE` or `ref.batch`, cite Zhang et al. 2018.

### 5.6 `ComBat_seq()` — RNA-seq COUNT data (vignette §8)

**Signature (verbatim, reference manual p.4):**

```r
ComBat_seq(
  counts,
  batch,
  group = NULL,
  covar_mod = NULL,
  full_mod = TRUE,
  shrink = FALSE,
  shrink.disp = FALSE,
  gene.subset.n = NULL
)
```

Arguments (verbatim): `counts` "**Raw count matrix** from genomic studies (dimensions gene x sample)"; `batch`
"Vector / factor for batch"; `group` "Vector / factor for biological condition of interest"; `covar_mod` "Model
matrix for multiple covariates to include in linear model (signals from these variables are kept in data after
adjustment)"; `full_mod` "Boolean, if TRUE include condition of interest in model"; `shrink` "Boolean, whether to
apply shrinkage on parameter estimation"; `gene.subset.n` "Number of genes to use in empirical Bayes estimation,
only useful when shrink = TRUE".

Verbatim (§8): "ComBat-Seq is an improved model based on the ComBat framework, which specifically targets RNA-Seq
count data. It uses a negative binomial regression to model the count matrix, and estimate parameters representing
the batch effects. Then it provides adjusted data by mapping the original data to an expected distribution if there
were no batch effects. **The adjusted data preserve the integer nature of count matrix.** Like ComBat, it requires
known a batch variable."

Covariate preservation: `group` for a single biological variable; `covar_mod` (matrix/data frame) for multiple.
Verbatim: "In ComBat-Seq, user may specify biological covariates, whose signals will be preserved in the adjusted data."

Console output strings (functional, verbatim — useful as detectors): `Found 2 batches`, `Using null model in
ComBat-seq.` / `Using full model in ComBat-seq.`, `Adjusting for 0 covariate(s) or covariate level(s)`,
`Estimating dispersions`, `Fitting the GLM model`, `Shrinkage off - using GLM estimates for parameters`,
`Adjusting the data`. Note `group=NULL` yields "Using null model in ComBat-seq." — i.e. **the biological condition
is silently not protected unless you pass it**.

### 5.7 `svaseq()` — sva for sequencing counts (vignette §13)

**Signature (verbatim, reference manual p.18–19):**

```r
svaseq(
  dat,
  mod,
  mod0 = NULL,
  n.sv = NULL,
  controls = NULL,
  method = c("irw", "two-step", "supervised"),
  vfilter = NULL,
  B = 5,
  numSVmethod = "be",
  constant = 1
)
```

Identical to `sva()` **plus `constant = 1`**. Verbatim (`constant` arg): "The function takes log(dat + constant)
before performing sva. By default constant = 1, all values of dat + constant should be positive."

Verbatim (reference manual, svaseq Description): "This function first applies a moderated log transform as
described in Leek 2014 before calculating the surrogate variables." Title: "A function for estimating surrogate
variables for **count based RNA-seq data**."

Vignette §13 rationale (verbatim): "In our original work we used the identify function for data measured on an
approximately symmetric and continuous scale. For sequencing data, which are often represented as counts, a more
suitable model may involve the use of a moderated log function. For example in Step 1 of the algorithm we may first
transform the gene expression measurements by applying the function log(gij + c) for a small positive constant. In
the analyses that follow we will set c = 1." ["identify function" is a typo in the source for *identity* function.]

Worked example (zebrafish, n=6), verbatim:

```r
filter = apply(zfGenes, 1, function(x) length(x[x>5])>=2)   # low-count filter
filtered = zfGenes[filter,]
controls = grepl("^ERCC", rownames(filtered))                # ERCC spike-ins as controls
group = as.factor(rep(c("Ctl", "Trt"), each=3))
dat0 = as.matrix(filtered)
mod1 = model.matrix(~group)
mod0 = cbind(mod1[,1])
svseq = svaseq(dat0,mod1,mod0,n.sv=1)$sv
```

Verbatim on why `n.sv` is fixed here: "In this case, we set n.sv = 1 because the number of samples is small (n = 6)
but in general svaseq can be used to estimate the number of latent factors."

### 5.8 Supervised sva (vignette §14)

`sup_svseq = svaseq(dat0,mod1,mod0,controls=controls,n.sv=1)$sv` → emits the warning string (verbatim):
`sva warning: controls provided so supervised sva is being performed.`

Verbatim: "Here we passed the controls argument, which is a vector of values between 0 and 1, representing the
probability that a gene is affected by batch but not affected by the group variable. Since we have known negative
control genes in this example, we simply set controls[i] = TRUE for all control genes and controls[i] = FALSE for
all non-controls."

### 5.9 `vfilter` — speed for m > 100,000 (vignette §11)

Verbatim: "vfilter must be an integer between 100 and the total number of features m. The features are ranked from
most variable to least variable by standard deviation. Computations will only be performed on the vfilter most
variable features. This can improve computational time, but caution should be exercised, since the surrogate
variables will only be estimated on a subset of the matrix. **Running the functions with fewer than 1,000 features
is not recommended.**"

Example: `num.sv(edata,mod,vfilter=2000,method="leek")`; `sva(edata,mod,mod0,n.sv=n.sv,vfilter=2000)`.

### 5.10 `fsva()` — frozen sva, for prediction (vignette §12)

**Signature (verbatim, reference manual p.8):** `fsva(dbdat, mod, sv, newdat = NULL, method = c("fast", "exact"))`
— default `"fast"`: "If method ="fast" then the SVD is calculated using an online approach, **this may introduce
slight bias**. If method="exact" the exact SVD is calculated, but will be slower". Returns `db` (adjusted training
data), `new` (adjusted test data), `newsv`.

This is the **only** route in the vignette that hands back an SV-adjusted *data matrix*, and it is scoped to
prediction, not differential expression. Verbatim: "The surrogate variable analysis functions have been developed
for population-level analyses such as differential expression analysis in microarrays. In some cases, the goal of
an analysis is prediction."

### 5.11 Other exported functions (reference manual only; not in the vignette body)

`fstats(dat, mod, mod0)`; `irwsva.build(dat, mod, mod0 = NULL, n.sv, B = 5)`; `ssva(dat, controls, n.sv)`;
`twostepsva.build(dat, mod, n.sv)`; `psva(dat, batch, ...)`; `empirical.controls(dat, mod, mod0 = NULL, n.sv, B = 5,
type = c("norm", "counts"))`; `sva.check(svaobj, dat, mod, mod0)`; `sva_network(dat, n.pc)`;
`qsva(degradationMatrix, mod = matrix(1, ncol = 1, nrow = ncol(degradationMatrix)))`;
`read.degradation.matrix(covFiles, sampleNames, totalMapped, readLength = 100, normFactor = 8e+07, type = c("bwtool",
"region_matrix_single", "region_matrix_all"), BPPARAM = bpparam())`.

`empirical.controls`'s `type` argument is the norm/count switch in miniature (verbatim): "If type is norm then
standard irwsva is applied, if type is counts, then the moderated log transform is applied first."

`sva_network` note (verbatim): "returns the residuals after regressing out the top principal components. The number
of principal components to remove can be determined using a permutation-based approach using the "num.sv" function
with method = "be"" — the one place the source affirmatively recommends `method = "be"`.

## 6. Key claims / findings

- The package covers two (DESCRIPTION says three) artifact-removal routes: latent-factor estimation (`sva`) and
  known-batch removal (`ComBat`); supervised sva via control probes is the third in DESCRIPTION.
- `sva` and `ComBat` can be combined "to remove both known batch effects and other potential latent sources of
  variation" (§1). The vignette does not demonstrate the combination.
- Surrogate variables must enter **both** the full and null model matrices for `f.pvalue` significance testing (§5).
- In limma, SVs enter the **design**, not the **contrasts** (§6).
- `ComBat` returns a **corrected data matrix**; `sva` returns **covariates**. These are structurally different
  interventions — one edits the data, the other edits the model.
- `ComBat` expects data already "cleaned and normalized" (reference manual); `ComBat_seq` expects a **raw count**
  matrix and returns integer counts.
- `svaseq` = `sva` + a moderated log transform `log(dat + constant)`, `constant = 1` by default; it is the
  count-data entry point.
- `num.sv` default is `"be"` (Buja–Eyuboglu permutation, `B = 20`); the alternative `"leek"` (Leek 2011 asymptotic)
  is what every worked example actually calls.
- `sva` runs `B = 5` IRW iterations by default and auto-estimates `n.sv` (via `numSVmethod = "be"`) when `n.sv` is
  omitted.
- On the bladder data, ~70% of genes are called DE at FDR < 5% before adjustment — flagged by the vignette as
  "artificially high" (§5).
- `vfilter` trades accuracy for speed above m > 100,000 features; < 1,000 features is not recommended (§11).

## 7. Load-bearing statements — VERBATIM QUOTES (license-aware mode)

**Mode: license-aware / verbatim-ok.** sva is licensed **Artistic-2.0** (stated on the Bioconductor landing page
and in the reference manual's `License` field) — a free/open-source license covering the package and its
documentation, so short load-bearing verbatim quotes are permitted. Each is attributed with its location.

1. **SVs go in both models** — vignette §5: "The first step is to include the surrogate variables in both the null
   and full models. The reason is that we want to adjust for the surrogate variables, so we treat them as adjustment
   variables that must be included in both models."

2. **ComBat expects normalized data** — reference manual, `ComBat` Description (p.2): "The input data are assumed to
   be cleaned and normalized before batch effect removal."

3. **sva vs. svaseq, by data type** — reference manual, `sva` package-level Description (p.15): "the sva function can
   be used to estimate artifacts from microarray data the svaseq function can be used to estimate artifacts from
   count-based RNA-sequencing (and other sequencing) data. The ComBat function can be used to remove known batch
   effecs from microarray data." [sic: "effecs"]

4. **svaseq's transform** — reference manual, `svaseq` `constant` argument (p.19): "The function takes log(dat +
   constant) before performing sva. By default constant = 1, all values of dat + constant should be positive."

5. **When sva is the WRONG tool** — vignette §10: "In some cases, the latent variables may be important sources of
   biological variability. If the goal of the analysis is to identify heterogeneity in one or more subgroups, the sva
   function may not be appropriate. For example, suppose that it is expected that cancer samples represent two
   distinct, but unknown subgroups. If these subgroups have a large impact on expression, then one or more of the
   estimated surrogate variables may be very highly correlated with subgroup."

## 8. Stated scope, assumptions, limitations (the source's own caveats)

- **sva protects only what is in `mod`.** Verbatim (§10): "The goal of the sva is to remove all unwanted sources of
  variation while protecting the contrasts due to the primary variables included in mod. This leads to the
  identification of features that are consistently different between groups, removing all common sources of latent
  variation."
- **sva is inappropriate for subgroup-discovery goals** — quote 5 above (§10).
- **Direct adjustment leaves latent variation in.** Verbatim (§10): "In contrast, direct adjustment only removes the
  effect of known batch variables. All sources of latent biological variation will remain in the data using this
  approach. In other words, if the samples were obtained in different environments, this effect will remain in the
  data. If important sources of heterogeneity (from different environments, lab effects, etc.) are not accounted for,
  this may lead to increased false positives."
- **`vfilter` estimates SVs on a subset only** — "caution should be exercised" (§11); < 1,000 features not recommended.
- **`fsva(method="fast")` "may introduce slight bias"** (reference manual p.8).
- **`ComBat` takes only one batch variable** — "Batch covariate (only one batch allowed)" (reference manual p.2).
- **`numSVmethod` "should not be adapted by the user unless they are an expert"** (reference manual p.16).
- The sva functions are scoped to "population-level analyses such as differential expression analysis in microarrays"
  (§12); prediction is handled separately by `fsva`.

## 9. Failure modes / invalidity patterns (referee-relevant)

Faithful to the source. The source names **fewer** failure modes than one might expect — see §10.

- **Using sva when latent structure IS the biology** (§10). Named symptom: an estimated SV "may be very highly
  correlated with subgroup". This is the vignette's only explicit "may not be appropriate" statement about sva.
  It implies a usable diagnostic — correlate SVs against suspected biological subgroups — but the source does not
  spell that out as a procedure. [summarizer-inferred: the diagnostic; the correlation symptom itself is verbatim.]
- **Under-adjustment → false positives.** Verbatim (§10): unaccounted heterogeneity "may lead to increased false
  positives."
- **Implausibly large DE counts as a symptom of unmodeled artifacts.** The vignette's own tell (§5): ~70% of genes DE
  at FDR < 5% "seems artificially high, even for a strong phenotype like cancer."
- **Wrong data scale.** `ComBat` on non-normalized data violates its stated assumption; `ComBat_seq` on non-raw/
  non-integer counts violates "Raw count matrix"; `svaseq` requires `dat + constant` to be strictly positive ("all
  values of dat + constant should be positive") — i.e. negative values (e.g. an already-log-transformed matrix) break
  the moderated log. These are stated assumptions; the source does **not** say what error or misbehavior results.
- **Categorical covariates must be expanded to p-1 indicators** for `ComBat` — "adjustment variables will be treated
  as given" (§7). Passing a raw factor level count is a stated user error.
- **`ComBat_seq(group=NULL)`** silently fits the null model (`Using null model in ComBat-seq.`) — the biological
  signal is not protected. The console string is the detector.
- **Supervised sva engages silently on `controls`** — detector string: `sva warning: controls provided so supervised
  sva is being performed.`
- **Degenerate sva fits** are acknowledged only by the existence of `sva.check(svaobj, dat, mod, mod0)` — verbatim
  (reference manual p.17): "This function is designed to check for degenerate cases in the sva fit and fix the sva
  object where possible." **The source never says what a degenerate case IS, how to tell you have one, what
  `sva.check` changes, or when to call it.** The vignette never mentions `sva.check` at all. This is the closest thing
  the package has to a built-in referee, and it is essentially undocumented.
- **`method="supervised"` with a non-NULL `vfilter`** is an invalid combination — "vfilter must be NULL if method is
  "supervised"".

## 10. What the source does NOT address (confident silences)

These are checked absences, not oversights on my part — they matter because a model writing an sva skill from memory
will confidently fill them:

- **No warning anywhere about batch/surrogate variation being CONFOUNDED with the outcome of interest.** I searched
  the full vignette and full reference manual. Neither `ComBat`, `ComBat_seq`, `sva`, nor `svaseq` documentation
  mentions confounding, collinearity, rank deficiency, or non-estimability between `batch`/SVs and `mod`. The vignette
  never says "do not run ComBat when batch is nested in group", and it never discusses what happens when it is. §10's
  subgroup discussion is about latent *biological* structure being removed, which is adjacent but not the same hazard.
- **No random-number / null-data sanity check.** The guidance asked for this (Nygaard 2016 reportedly adapted one
  "from the sva user guide"). **It is not in this vignette.** I additionally grepped the archived Bioconductor **3.2**
  and **3.4** vignettes (contemporaneous with Nygaard 2016) for `random|rnorm|runif|null data|sanity|permut` — the only
  hit in any of them is the bibliography entry for *permuted* SVA (psva). **No such check has ever been in this
  vignette**, at least across 3.2 → 3.23. Whatever Nygaard adapted, it is not recoverable from this document; the
  premise needs re-checking against Nygaard's actual citation (possibly the ComBat/BatchQC docs or the sva *paper*).
  [This paragraph is the only claim in the note drawn from outside the pinned release.]
- **No guidance on choosing `"be"` vs `"leek"`** for `num.sv`, and no statement of how the two differ in behavior
  beyond citing two papers.
- **No statement of how many SVs is "too many"**, no cap relative to sample size, no degrees-of-freedom warning.
- **No discussion of removing/subtracting SVs from the expression matrix for DE.** The vignette only ever *adjusts in
  the model* for SVs (§5, §6). The only SV-based data-editing route is `fsva`, explicitly scoped to prediction (§12),
  and `sva_network`, scoped to network inference. ComBat is the only function shown returning a corrected matrix for
  downstream DE — and even then the vignette immediately runs `f.pvalue(combat_edata, mod, mod0)` on it, which is a
  known double-use pattern the vignette does not caveat.
- **No mention of `DESeq2`/`edgeR` integration** — despite `edgeR` being in `Imports`. The downstream examples are
  `f.pvalue` and `limma` only. There is no worked example of passing SVs into a count-based DE model.
- **No discussion of `n.sv = 0`** (what happens when no SVs are found).
- **No power/sample-size floor** for sva itself, beyond the feature-count floor (§11) and the ad-hoc "n = 6 is small,
  so fix n.sv = 1" remark (§13).

## 11. Open questions / ambiguities the source leaves unresolved

- Should `ComBat`'s `mod` contain the variable of interest? §7's prose says yes ("including the variable of interest");
  §7's code passes `~1` (excluding it); the man page examples use both `mod=NULL` and `mod=mod`. Unresolved.
- Why does the documented `num.sv` default (`"be"`) differ from every demonstrated call (`method="leek"`)? Unresolved;
  the source never comments.
- What is a "degenerate case" in an sva fit, and when should `sva.check` be run? Undefined (see §9).
- The vignette's `pprob.gam`/`pprob.b` citations render as broken `[?]` markers in the compiled PDF — the intended
  references are not recoverable from the vignette text.
- The svaseq and supervised-sva citations are both "bioRxiv doi: TBD" — never updated.
- The vignette is dated "Modified: October 24, 2011" while shipping in a 2026 release; the ComBat_seq (§8) and
  svaseq (§13–14) sections postdate that modification date, so the datestamp is unreliable as a currency signal.

## 12. Guidance answers

**Q: `num.sv()` — full signature, every argument, the default estimation method, alternatives, what each does.**
`num.sv(dat, mod, method = c("be", "leek"), vfilter = NULL, B = 20, seed = NULL)`. **Default = `"be"`** (Buja–Eyuboglu
permutation procedure, 1992; `B = 20` permutations, `seed` settable). Alternative = `"leek"` (Leek 2011 Biometrics,
asymptotic approach). The package documents *only* those two sentences about the difference — the man page points to a
"details section" that does not exist. **Critically: the default is `"be"` but every worked example in both the vignette
and the reference manual passes `method="leek"` explicitly.** See §5.1.

**Q: `sva()` — full signature and defaults, incl. `n.sv`, iteration count, auto-estimation.**
`sva(dat, mod, mod0 = NULL, n.sv = NULL, controls = NULL, method = c("irw", "two-step", "supervised"), vfilter = NULL,
B = 5, numSVmethod = "be")`. `n.sv = NULL` → **yes, auto-estimated when omitted** (vignette §4, quoted in §5.2), using
`numSVmethod = "be"`. Iteration count **`B = 5`** (confirmed by the console output `Iteration (out of 5 )`). Default
method `"irw"`.

**Q: Does `svaseq()` exist, and what is it for? Does the vignette say `sva()` is for (log-)normalized data and
`svaseq()` for count data? Quote it.**
**Yes, it exists.** Reference manual title: "A function for estimating surrogate variables for count based RNA-seq
data." The clearest verbatim statement of the split (reference manual, sva package Description, p.15): *"the sva
function can be used to estimate artifacts from microarray data the svaseq function can be used to estimate artifacts
from count-based RNA-sequencing (and other sequencing) data."* The vignette's own version (§13): *"In our original work
we used the identify [sic: identity] function for data measured on an approximately symmetric and continuous scale. For
sequencing data, which are often represented as counts, a more suitable model may involve the use of a moderated log
function."* `svaseq` = `sva` + `log(dat + constant)`, `constant = 1`.

**Bearing on the skill's `sva()`-on-`expr_normalized` pattern:** the source's own division of labor is microarray/
continuous → `sva`; counts → `svaseq`. But be precise about what the source does and does not say: it says `svaseq` is
"more suitable" for counts and that it exists *because* counts aren't symmetric/continuous. **It never states that
calling `sva()` on a count matrix is an error**, and it never names a symptom or failure mode for doing so. If the
matrix in question is genuinely already log-normalized (not raw counts), the source gives **no** statement condemning
`sva()` on it — that is exactly `sva()`'s stated domain. The question the source *cannot* answer is what
"`expr_normalized`" actually contains. Do not over-read this note into a verdict the vignette doesn't support.

**Q: `ComBat()` vs `ComBat_seq()` — signatures, expected input, the `mod`/covariate argument. Quote it.**
Signatures in §5.5 / §5.6. **`ComBat`: "The input data are assumed to be cleaned and normalized before batch effect
removal."** (verbatim, ref. manual p.2) — log-normalized, probe × sample. **`ComBat_seq`: "Raw count matrix from
genomic studies (dimensions gene x sample)"** (verbatim) — integer counts in, integer counts out ("The adjusted data
preserve the integer nature of count matrix"). Covariate argument: `ComBat`'s `mod` = "Model matrix for outcome of
interest and other covariates besides batch" — batch is *not* in it ("you do not include batch in creating this model
matrix - it will be included later in the ComBat function"), and categorical covariates need p-1 indicator columns.
`ComBat_seq`'s equivalents are `group` (single biological variable) and `covar_mod` (matrix/data frame for several),
whose "signals from these variables are kept in data after adjustment". See the §5.5 flag about the vignette's
self-contradiction on whether the variable of interest belongs in ComBat's `mod`.

**Q: `f.pvalue()` and how the vignette says to use the SVs downstream. Quote it.**
`f.pvalue(dat, mod, mod0)` — F-test comparing nested models; "The columns of mod0 must be a subset of the columns of
mod." **SVs are used by appending them as columns to the design matrices — BOTH of them:** `modSv = cbind(mod,svobj$sv)`
and `mod0Sv = cbind(mod0,svobj$sv)`. Verbatim (§5): *"The first step is to include the surrogate variables in both the
null and full models. The reason is that we want to adjust for the surrogate variables, so we treat them as adjustment
variables that must be included in both models."* With limma: SVs go in the design (`lmFit(edata, modSv)`) and are
zero-padded out of the contrasts — *"We do not include the surrogate variables in the contrasts, since they are only
being used to adjust the analysis."*

**Q: Any statement about REMOVING/SUBTRACTING batch or surrogate effects from the data vs. ADJUSTING in the model?**
The source draws this line by *demonstration*, and it is asymmetric:
- **Surrogate variables → adjusted for IN THE MODEL, always.** Every DE workflow in the vignette (§5, §6) puts SVs into
  design matrices. The vignette **never** subtracts SVs from the expression matrix for a DE analysis. The only functions
  that return SV-cleaned *data* are `fsva` (explicitly for **prediction**, §12) and `sva_network` (explicitly for
  **network inference**), both out-of-scope for DE.
- **Known batch → EITHER.** `ComBat` returns a corrected matrix (data-editing, §7); §9 "Removing known batch effects
  with a linear model" instead puts batch in `mod` and `mod0` and calls `f.pvalue` — verbatim: *"This approach is a
  simplified version of ComBat."*
- §10 ("Surrogate variables versus direct adjustment") compares the two *strategies* but is about latent-vs-known
  variation, **not** about data-editing vs. model-adjustment as a statistical choice. The source offers **no** caveat
  about the degrees-of-freedom / double-dipping hazard of testing on a ComBat-corrected matrix — indeed §7 does exactly
  that (`f.pvalue(combat_edata, mod, mod0)`) without comment.

**Q: The random-number / null-data sanity check (Nygaard 2016 says it was adapted from the sva user guide).**
**NOT PRESENT.** Not in the sva 3.60.0 vignette, and not in the archived Bioconductor 3.2 or 3.4 vignettes either
(I grepped all three for `random|rnorm|runif|null data|sanity|permut`; the sole hit is a bibliography entry for
*permuted* SVA). **This guidance question is answered in the negative, and the premise does not hold against this
document.** The nearest artifacts in the package are: (a) `sva.check()`, an undocumented post-hoc degenerate-case
checker the vignette never mentions; (b) `num.sv(method="be")`, which is internally permutation-based but is an
estimator, not a diagnostic; (c) the ComBat_seq demo's use of `rnbinom()` to fabricate a toy count matrix — a
convenience for the example, not a null-data check. **Do not port a "sanity check from the sva user guide" into a
skill on this note's authority — it isn't here.** Re-check Nygaard 2016's actual citation target.

**Q: Warnings about applying these functions when batch is confounded with the outcome.**
**NONE. Zero.** Neither the vignette nor the reference manual mentions confounding, collinearity, nesting, or rank
deficiency between the batch/SV terms and the variable of interest — not for `ComBat`, `ComBat_seq`, `sva`, or
`svaseq`. This is a **confident silence** (§10), and it is precisely the kind of gap a model writing from memory will
paper over with plausible-sounding warnings that the tool's own documentation does not make.

**Q: Must-quote — exact package version + Bioconductor release.**
sva **3.60.0**, Bioconductor **3.23** (`git_branch RELEASE_3_23`, commit `87a4798`, 2026-04-28; published 2026-07-12).
Landing page directs installation under R **"4.6"**; package `Depends: R (>= 3.2)`. Accessed **2026-07-13**.
**Defaults drift across releases — every signature above is pinned to 3.60.0 and must be re-read against any other
release before being relied on.**
