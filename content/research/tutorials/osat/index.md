---
title: 'OSAT — "An introduction to OSAT" (Bioconductor vignette + reference manual)'
type: tutorial
source_id: osat
source_url: https://bioconductor.org/packages/release/bioc/html/OSAT.html
version: "1.60.0"
access_date: "2026-07-13"
license: Artistic-2.0
license_file: LICENSES/Artistic-2.0.LICENSE
attribution: "Li Yan (author/maintainer). OSAT: Optimal Sample Assignment Tool, Bioconductor package v1.60.0 (Bioconductor 3.23). Vignette \"An introduction to OSAT\" by Li Yan, Changxing Ma, Dan Wang, Qiang Hu, Maochun Qin, Jianmin Wang, Song Liu. Licensed Artistic-2.0 per the package DESCRIPTION and the Bioconductor landing page. Related paper: http://www.biomedcentral.com/1471-2164/13/689"
derived: license-aware-summary
tags:
  - domain/experimental-design
  - domain/batch-effects
---

# OSAT — Bioconductor package documentation

## 1. Citation & version pin

- **Package**: OSAT: Optimal Sample Assignment Tool. Author: Li Yan. Maintainer: Li Yan
  <li.yan@roswellpark.org>.
- **Version summarized**: **1.60.0**, Bioconductor release **3.23** (the current release at access).
- **Pinned build metadata** (from `DESCRIPTION`, verbatim functional strings):
  - `git_url: https://git.bioconductor.org/packages/OSAT`
  - `git_branch: RELEASE_3_23`
  - `git_last_commit: 06a9e90`
  - `git_last_commit_date: 2026-04-28`
  - `Packaged: 2026-04-28 23:43:31 UTC; biocbuild`
  - `Date/Publication: 2026-04-28`
  - `License: Artistic-2.0`; `Depends: methods,stats`; `Suggests: xtable, Biobase`
  - In Bioconductor since BioC 2.11 (R-2.15). biocViews: DataRepresentation, Visualization,
    ExperimentalDesign, QualityControl.
- **Vignette**: "An introduction to OSAT", by Li Yan, Changxing Ma, Dan Wang, Qiang Hu, Maochun Qin,
  Jianmin Wang, Song Liu. The `.Rnw` uses `\date{\today}`, so the vignette carries its **build**
  date: the shipped PDF for 1.60.0 is dated **April 28, 2026**, built under
  `R version 4.6.0 RC (2026-04-17 r89917)`, Ubuntu 24.04.4 LTS.
- **DOI (package)**: 10.18129/B9.bioc.OSAT. **Related paper** cited by the docs:
  http://www.biomedcentral.com/1471-2164/13/689
- **Access date**: 2026-07-13.

## 2. Access note

Full access, no paywall. Read in full:

- The source tarball `OSAT_1.60.0.tar.gz` (from
  `https://bioconductor.org/packages/release/bioc/src/contrib/`): `DESCRIPTION`, `NAMESPACE`, `NEWS`,
  all of `R/` (`AllClasses.R`, `AllGenerics.R`, `gAssembly-class.R`, `gSample-class.R`,
  `gSetup-class.R`, `gUtils.R`), all of `man/*.Rd`, and `vignettes/OSAT.Rnw` (identical to
  `inst/doc/OSAT.Rnw`).
- The **rendered** vignette PDF shipped in the tarball (`inst/doc/OSAT.pdf`), extracted to text — this
  is the same document served at
  `https://bioconductor.org/packages/release/bioc/vignettes/OSAT/inst/doc/OSAT.pdf`.
- The Bioconductor landing page.

Not read: the vignette **figures** (bar plots / objective-trace plots) as images, and the two
supporting PDFs/XLS shipped in `vignettes/` (`Meth450_Tracking_Sheet*`). The reference manual PDF
(`manuals/OSAT/man/OSAT.pdf`) is a render of the `man/*.Rd` files, which were read directly at source.

**Quoting mode**: **license-aware** (Artistic-2.0 → verbatim-ok). Short load-bearing quotes are
reproduced verbatim and marked. Signatures, argument names, defaults, iteration counts, warning/error
strings, and reported test statistics are functional strings and appear verbatim throughout.

## 3. Thesis

Sample-to-batch assignment should not be left to complete randomization: OSAT performs a block
randomization step followed by an optimization step that minimizes a least-squares objective on
the batch × sample-strata count table, producing an assignment in which the biological variable of
interest and named confounders are as evenly spread across batches as the (typically unbalanced,
incomplete) sample collection allows.

## 4. Problem & context

- Batch effects are systematic non-biological differences between batches (groups) of experimental
  runs; the vignette states they can exceed the biological differences and can produce misleading or
  erroneous conclusions.
- Ideal design is a **Randomized Complete Block Design (RCBD)**: groups of main interest plus
  important confounders balanced and replicated across batches.
- Real genomics studies are observational/quasi-experimental — samples are rare, expensive,
  irreplaceable, or fail QC — so the *available* collection is usually **unbalanced and incomplete**
  and does not comply with RCBD. OSAT exists to do the best possible assignment from such a collection.
- Running example (shipped as `inst/extdata/samples.txt`): **576 samples**; primary interest
  `SampleType` (Case 317 / Control 259); confounders `Race` (European 401 / Hispanic 175) and
  `AgeGrp` (5 levels: `(0,30]` 75, `(30,40]` 113, `(40,50]` 134, `(50,60]` 102, `(60,100]` 152).
  The 3-way cross-tab has **empty cells** (e.g. Case × Hispanic × `(0,30]` = 0; Control × Hispanic ×
  `(60,100]` = 0) — i.e. incomplete as well as unbalanced.
- Container for the example: **6 Illumina 96-well HYP MultiBeadChip plates** (`IlluminaBeadChip96Plate`),
  each plate = 8 BeadChips × 12 wells (6 rows × 2 columns) = 96 wells; 6 × 96 = 576 wells. Each plate
  is a batch.

## 5. Method / approach

### 5.1 Objective function (vignette §3.1)

Sample strata are the combined levels of the **optimization** variables. With `o` levels in the
combined optimization strata (`O_l` samples in level `l`) and `m` batches (`B_i` wells in batch `i`),
the expected count is

```
E*_il = B_i * O_l / sum_i(B_i)
```

and the objective (unweighted, the default and the only one implemented) is

```
V = sum_il ( n_il - E*_il )^2
```

Minimum `V` is the chosen assignment. The vignette also *defines* a weighted variant

```
V = sum_il ( w_l ( n_il - E*_il ) )^2
```

but **no weighted objective function is implemented or exported** in 1.60.0 (only two algorithms exist;
the vignette's `%`-commented TODOs mention adding a weighted LS method). Users may supply their own
objective function.

In code (`R/gSetup-class.R`), this is literally:

```r
oCount    <- summary(x)$average.optimal                      # E*_il, via average.2D()
oCountObs <- as.matrix(table(link$cFactor, link$oFactor))    # n_il
optValue[i] <- sum( (oCountObs - oCount) ^ 2 )
```

where `cFactor` is the batch factor (plates **or** chips, per the container's `batch=` argument) and
`oFactor` is the combined optimization-strata factor. `sFactor` (the combined **blocking**-strata
factor) does not appear in the objective — blocking enters only through the block-randomization step.

### 5.2 The two-step method

1. **Block randomization step** — build an initial assignment respecting the blocking strata
   (`strata` / `sFactor`): draw `[E_ij]` (integer part of expected) samples from each sample stratum and
   `[E_ij]` wells from each batch, link them, randomize within. Leftovers
   `r_j = S_j − Σ_i [E_ij]` are assigned to leftover wells with probability proportional to the
   **fractional part** `δ_ij` of the expected count.
2. **Optimization step** — one of two algorithms (below), both scoring candidates with `V`.

### 5.3 Exported API — exact signatures and defaults (verbatim from `R/` and `NAMESPACE`)

Exported functions (`NAMESPACE`): `setup.sample`, `setup.container`, `create.optimized.setup`,
`create.experiment.setup`, `optimal.block`, `optimal.shuffle`, `get.experiment.setup`, `QC`,
`map.to.MSA`, `multi.barplot`, `multi.chisq.test`, `IlluminaBeadChip`, `GenotypingChip`,
`IlluminaBeadChip24Plate`, `IlluminaBeadChip48Plate`, `IlluminaBeadChip96Plate`, `MSA4.plate`,
`BeadChip96ToMSA4MAP`, `predefined`. Exported methods include `getLayout`, `plot`, `show`, `summary`,
`metadata`, `metadata<-`, `exclude<-`.

| Function | **Code** signature (`R/`, authoritative) | **Man-page** `\usage` |
|---|---|---|
| `setup.sample` | `setup.sample(x, optimal, strata)` (`R/gSample-class.R:60`) | `setup.sample(x, optimal, strata)` |
| `setup.container` | `setup.container(plate, n, batch="plates", exclude=NULL)` (`R/gAssembly-class.R:373`) | `setup.container(plate, n, batch = "plates", exclude = NULL)` |
| `create.experiment.setup` | `create.experiment.setup(sample, container, ...)` (`R/gSetup-class.R:135`) | *(no dedicated man page; documented under `gExperimentSetup-class`)* |
| `create.optimized.setup` | `create.optimized.setup(fun="default", sample, container, ...)` (`R/gSetup-class.R:363`) | `create.optimized.setup(fun = "default", sample, container, ...)` |
| `optimal.shuffle` | **`optimal.shuffle(x, nSim=100, k=2)`** (`R/gSetup-class.R:310`) | **`optimal.shuffle(x, nSim, k)`** — *defaults not shown* |
| `optimal.block` | **`optimal.block(x, nSim=100)`** (`R/gSetup-class.R:250`) | `optimal.block(x, nSim = 100)` |
| `get.experiment.setup` | `get.experiment.setup(x)` (`R/gSetup-class.R:175`) | `get.experiment.setup(x)` |
| `QC` | `QC(object, main=NULL, ...)` (`R/gUtils.R:245`) | `QC(object, main = NULL, ...)` |
| `multi.chisq.test` | `multi.chisq.test(x, grpVar="plates", varList, main=NULL)` (`R/gUtils.R:41`) | `multi.chisq.test(x, grpVar = "plates", varList, main = NULL)` |
| `multi.barplot` | `multi.barplot(x, grpVar="plates", varList, main=NULL, ...)` (`R/gUtils.R:18`) | `multi.barplot(x, grpVar = "plates", varList, main = NULL, ...)` |

Semantics worth pinning:

- `setup.sample(x, optimal, strata)`: `strata` is **optional**. Man page (`gSample-class.Rd`):
  *"If omitted, the first element of `optimal` vector is treated as strata."* Code
  (`R/gSample-class.R:52-53`): `gSample <- function(x, optimal, strata){ if (missing(strata)) strata=optimal[1]`.
  So **omitting `strata` blocks on the first optimization variable only.** Vignette §2.2 adds:
  > "A recommendation for practice is to put the variable of primary interest as the first of the list." (verbatim)
- Two derived factors are created: `sFactor` (combined **blocking** strata) and `oFactor` (combined
  **optimization** strata). Container adds `cFactor` (batch) and `wellID`.
- `setup.container(plate, n, batch, exclude)`: `batch` is `"plates"` or `"chips"` (per the
  `gContainer` slot documentation). `exclude` is a data frame with columns
  `"plates"`, `"chips"`, `"wells"` (any subset works — e.g. `data.frame(wells=1)` excludes the first
  well of **every** chip; in the 6-plate example that is 48 wells).
- `create.optimized.setup(fun, sample, container, ...)`: `...` is forwarded to the optimizer, so `nSim`
  and `k` are passed here. `fun` is a **string** naming the optimizer, dispatched via `do.call`:
  ```r
  if (missing(fun) | fun=="default"){
    warning("Using default optimization method: optimal.shuffle")
    .Object <- do.call("optimal.shuffle", param)
  } else{
    .Object <- do.call(fun, param)
  }
  ```
  i.e. the ordinary documented usage (omitting `fun`) **emits an R warning**, verbatim:
  `Using default optimization method: optimal.shuffle`.
- Optimizers stamp provenance: `x@metadata$optimalFunction <- "optimal.shuffle"` / `"optimal.block"`,
  and `x@metadata$optValue` holds the full trace vector of objective values (length `nSim`).

### 5.4 Minimal end-to-end sequence (vignette §2.2, runnable, verbatim)

```r
library(OSAT)
inPath <- system.file('extdata', package='OSAT')
pheno <- read.table(file.path(inPath, 'samples.txt'),
                    header=TRUE, sep="\t", colClasses="factor")

gs <- setup.sample(pheno, optimal=c("SampleType", "Race", "AgeGrp"))
gc <- setup.container(IlluminaBeadChip96Plate, 6, batch='plates')

set.seed(123)    # to create reproducible result
# demonstration only. nSim=5000 or more are commonly used.
gSetup <- create.optimized.setup(sample=gs, container=gc, nSim=1000)

write.csv(get.experiment.setup(gSetup),
          file="gSetup.csv", row.names=FALSE)

# optional: map to the MSA-4 robotic loader
out <- map.to.MSA(gSetup, MSA4.plate)
write.csv(out, "MSAsetup.csv", row.names = FALSE)

QC(gSetup)   # bar plots + Pearson's Chi-squared tests
```

The CSV from `get.experiment.setup()` is sorted by the original sample-list row order; the `map.to.MSA`
CSV is sorted in MSA-robotic-loader order. `get.experiment.setup()` drops the internal columns
`OrigRow, sFactor, oFactor, cFactor, stage, chipID, rowID, wellID`.

Alternative optimizer / direct application to an existing setup (vignette §4.3, verbatim):

```r
gSetup0 <- create.experiment.setup(gs, gc)   # block randomization only, no optimization
gSetup1 <- optimal.shuffle(gSetup0, nSim=1000)
gSetup2 <- optimal.block(gSetup0, nSim=1000)
```

### 5.5 The two algorithms

- **`optimal.shuffle` (the default)** — hill-climbing from **one** blocked initial setup: randomly pick
  `k` samples in different batches, swap their wells, recompute `V`, keep the new setup only if `V`
  decreased; repeat up to `nSim` times. `k = 2` by default, "could be any number up to half of the
  sample size". Fast; may not reach the global minimum.
- **`optimal.block` (the alternative)** — generate `nSim` **independent** block-randomized candidate
  setups and keep the one with the lowest `V`. Blocking on the specified `strata` is guaranteed in
  every candidate; slower; "in theory it could reach global minimum".

### 5.6 User-defined objective functions (vignette §4.3.1) — doc/code mismatch

The vignette says a user function must take the form `myFun <- function(x, nSim, ...)` and must
**return a list**:

```
return(list(setup=, link=, average=, dev=))
```

But both shipped optimizers **return a `gExperimentSetup` object**, not a list
(`R/gSetup-class.R:277, 352`), and `create.optimized.setup` returns whatever `do.call` returns. The
`man/create.optimized.setup.Rd` `\value` section says *"A `gExperimentSetup` object is returned"*.
The vignette's stated return contract therefore contradicts the package's own implementations and its
own man page. [summarizer-inferred: only the mismatch is inferred; both statements are quoted from the
source.]

## 6. Key claims / findings

- **Objective**: least-squares on the batch × optimization-strata count table,
  `V = Σ_il (n_il − E*_il)²`, with `E*_il = B_i·O_l / Σ_i B_i`. Minimum `V` wins. (§3.1)
- **Complete randomization is unsafe.** With one variable, ~**5%** chance of statistical dependency
  between batch and the variable. With **three** variables, ~**14%** chance that at least one variable
  is statistically dependent on batch. Both figures are given as "simulation and theory" with
  "(data not shown)". Framed as a multiple-testing consequence. (§3.3)
- **Worked bad-random counterexample**: `set.seed(397)` ("an unfortunate choice") on the 576-sample /
  6-plate example yields (rendered PDF, v1.60.0):

  | Var | X-squared | df | p.value |
  |---|---|---|---|
  | SampleType | 13.25243 | 5 | 0.021124664 |
  | Race | 14.22455 | 5 | 0.014244218 |
  | AgeGrp | 39.75020 | 20 | 0.005371387 |

  → "all three variables are statistically dependent on batches with `p-values < 0.05`".
- **Default algorithm result** (`create.optimized.setup(sample=gs, container=gc, nSim=1000)`,
  `set.seed(123)`), rendered PDF v1.60.0:

  | Var | X-squared | df | p.value |
  |---|---|---|---|
  | SampleType | 0.5401995 | 5 | 0.9905773 |
  | Race | 0.1395369 | 5 | 0.9996319 |
  | AgeGrp | 0.7971741 | 20 | 1.0000000 |

  Prose summary: "all variables considered are all highly uncorrelated with batches (`p-value > 0.99`)".
- **`optimal.block` result** (`gs2` with explicit `strata=c("SampleType")`, `nSim=1000`,
  `set.seed(123)`), rendered PDF v1.60.0:

  | Var | X-squared | df | p.value |
  |---|---|---|---|
  | SampleType | 0.03507789 | 5 | 0.9999879 |
  | Race | 4.57188457 | 5 | 0.4703235 |
  | AgeGrp | 6.04463944 | 20 | 0.9988359 |

  Stated as the **trade-off**: p-value *increases* on the blocking variable `SampleType`
  (0.9905773 → 0.9999879) and *decreases* on the two variables not blocked
  (Race 0.9996319 → 0.4703235; AgeGrp 1.0000000 → 0.9988359).
  *(Caution: the `.Rnw` also carries a stale `%`-commented copy of these tables from an older run —
  e.g. Race `2.10946918 / 0.8338000`, AgeGrp `11.01198196 / 0.9459112`. The numbers above are the ones
  in the **rendered 1.60.0 PDF**, which Sweave recomputes live.)*
- **Paired-sample case study** works and is checkable: after placing both specimens of each individual
  on the same chip, `Replica` is perfectly balanced across plates (X-squared = 0.0000000, df 11,
  p = 1.0000000); SampleType 0.4910905 / 11 / 0.9999988; Race 5.3024011 / 11 / 0.9156416;
  AgeGrp 29.2638486 / 44 / 0.9570941.
- **Empty wells** (fewer samples than wells) are, by default and with no extra instruction,
  **distributed randomly across all batches**. Filling batches sequentially and leaving the empties at
  the end of the last plate is explicitly discouraged.
- **Predefined layouts**: `IlluminaBeadChip` (6 rows × 2 cols = 12 wells), `GenotypingChip`
  (12 rows × 1 col), `IlluminaBeadChip24Plate` / `48Plate` / `96Plate` (2 / 4 / 8 `IlluminaBeadChip`
  chips → 24 / 48 / 96 wells), `MSA4.plate`, `BeadChip96ToMSA4MAP`. `predefined()` lists them. Custom
  layouts: `new("BeadChip", nRows=, nColumns=, byrow=, comment=)` and
  `new("BeadPlate", chip=, nRows=, nColumns=, comment=)` (`byrow` has the same meaning as in `matrix()`).
- **QC**: `QC(gSetup)` = bar plots (`multi.barplot`) + Pearson's Chi-squared tests
  (`multi.chisq.test`) of independence between the batch variable and each blocking/optimization
  variable. `multi.chisq.test` returns `list(method=, data.name=, stat=)` where `stat` is a data frame
  of `Var`, `X-squared`, `df`, `p.value`. It applies **no threshold and renders no verdict**.

### 6.1 THE DEFAULT-vs-RECOMMENDED ITERATION-COUNT GAP (footgun)

| | `optimal.shuffle` | `optimal.block` |
|---|---|---|
| **Coded default** (`R/gSetup-class.R`) | **`nSim=100`** (and `k=2`) | **`nSim=100`** |
| **Man-page `\usage`** | `optimal.shuffle(x, nSim, k)` — **default not shown at all** | `optimal.block(x, nSim = 100)` |
| **Docs' stated normal practice** | "usually in the tens of thousands" (vignette §3.2 and `optimal.shuffle.Rd` `\details`); "nSim=5000 or more are commonly used" (code comment) | "typically thousands of or more" (`optimal.block.Rd` `\details`); "nSim=5000 or more are commonly used" (code comment) |
| **What the examples actually run** | vignette: `nSim=1000`; man examples: `nSim=500` | vignette: `nSim=1000`; man example: **`nSim=100`** |
| **Commented-out dev examples in `R/`** | `## g3 <- optimal.shuffle(g1, nSim=10000, k=2)` | `## g6 <- create.optimized.setup("optimal.block", …, nSim=100)` |

**Neither optimizer lacks a default — both default to `nSim=100`.** That is **50×** below the docs'
own "nSim=5000 or more are commonly used" and **~100–1000×** below "usually in the tens of thousands".

Concretely: `create.optimized.setup(sample=gs, container=gc)` — with `nSim` omitted, which nothing in
the API prevents — runs **100** iterations, silently, and returns a `gExperimentSetup` that looks
exactly like a well-optimized one. The only signal is the unrelated warning
`Using default optimization method: optimal.shuffle`. For `optimal.shuffle`, `nSim=100` means the
initial blocked setup is perturbed by at most 99 accepted 2-sample swaps.

The verbatim comment the authors themselves put on **every** worked example
(vignette chunks and `create.optimized.setup.Rd` / `optimal.shuffle.Rd` / `QC.Rd` examples) is:

> `# demonstration only. nSim=5000 or more are commonly used.`

…yet the examples run 500–1000, and the coded default is 100.

### 6.2 THE FUNCTION-NAME SPELLING — prose vs code disagree

**The exported / callable name is `optimal.block`.** Evidence, all verbatim:

- `NAMESPACE` export list: `optimal.block,`
- Man-page topic: `man/optimal.block.Rd` → `\name{optimal.block}`, `\alias{optimal.block}`,
  `\title{optimal.block}`, `\usage{optimal.block(x, nSim = 100)}`
- `See Also` in `man/optimal.shuffle.Rd`: `\code{\link{optimal.block}}`
- The string passed to `create.optimized.setup(fun=…)` in the vignette **code chunks**:
  `create.optimized.setup("optimal.block", sample=gs2, container=gc, nSim=1000)`
- R source: `optimal.block <- function(x, nSim=100){` and the provenance stamp
  `x@metadata$optimalFunction <- "optimal.block"`

**The vignette PROSE misspells it once, and the misspelling is in the published PDF.**
`vignettes/OSAT.Rnw:343` (= `inst/doc/OSAT.Rnw:343`), rendered in **§3.2 "Algorithms"** of the
built PDF (v1.60.0, dated April 28, 2026):

> "The alternative algorithm (implemented in function **optimal.blcok**) sought to first block specified
> variables (e.g., list of variables of primary interests and certain confounding variables specified in
> the strata argument) to generate a pool of assignment setups, then select the optimal one which
> minimize the objective functions based on all variables considered…" — *verbatim, vignette §3.2*

`optimal.blcok` — letters transposed — appears **exactly once**, in prose, and **nowhere in code**.
Both spellings, side by side, as they appear:

| Spelling | Where | Status |
|---|---|---|
| `optimal.block` | `NAMESPACE`; `man/optimal.block.Rd`; `See Also` in `optimal.shuffle.Rd`; `R/gSetup-class.R:250`; vignette **code** chunks §3.2.1 & §5.4; all other vignette prose (§3.2.1 body, Figure 2 & 4 captions, §4.3) | **the real, callable name** |
| `optimal.blcok` | vignette **prose**, §3.2 "Algorithms", the sentence introducing the alternative algorithm (`OSAT.Rnw:343`; rendered PDF) | **typo — does not exist; `do.call("optimal.blcok", …)` would error** |

**Not normalized here — the discrepancy is the finding.**

For completeness, the *other* optimizer's name, `optimal.shuffle`, is spelled **consistently** in every
location checked (NAMESPACE, man topic/alias, `See Also` from `optimal.block.Rd`, R source, the
`fun="optimal.shuffle"` string, and vignette prose §3.2 / §4.3). No discrepancy there.

### 6.3 Other prose-vs-code signature discrepancies (all verbatim)

| Prose (vignette / man) | Code (authoritative) |
|---|---|
| §4.3: `optimal.shuffle(sample, container, nSim, k=2, ...)` | `optimal.shuffle(x, nSim=100, k=2)` — first arg is `x`, a `gExperimentSetup`, **not** `sample`/`container` |
| §4.3: `optimal.block(sample, container, nSim)` | `optimal.block(x, nSim=100)` — same problem |
| §4.3: `create.optimized.setup(fun, sample, container, nSim, ...)` | `create.optimized.setup(fun="default", sample, container, ...)` — `nSim` is not a named formal; it rides in `...` |
| §4.2: `setup.container(plate, n, batch='plate', exclude=NULL, ...)` — **`'plate'` singular** | `setup.container(plate, n, batch="plates", exclude=NULL)` — **`"plates"`**; legal values are `"plates"` / `"chips"`; and there is no `...` |
| `multi.chisq.test.Rd`: `\item{grpVar}{Common variables. Default is 'plate'.}` — **singular** | `multi.chisq.test(x, grpVar="plates", …)` — **plural** |
| §4.4.1: `out <- map.to.MSA(gSetup)` | the method signature is `map.to.MSA(x, y)`; the working chunk calls `map.to.MSA(gSetup, MSA4.plate)` |
| §3.2: `optimal.shuffle` "sought to first block **all variables considered** … provided to the **optimal** argument" | blocking uses `sFactor` = `strata`, not `optimal`; and `setup.sample` sets `strata = optimal[1]` when `strata` is omitted (which is exactly what vignette §2.2 does). See §9 below. |

## 7. Load-bearing statements (verbatim — license-aware mode, Artistic-2.0)

1. **The iteration-count footgun, in the authors' own words** — vignette §3.2 (and identically in
   `man/optimal.shuffle.Rd` `\details`):
   > "This procedure will continue until we reach a preset number of attempts (usually in the tens of
   > thousands)."

   …against the coded `optimal.shuffle <- function(x, nSim=100, k=2)`.

2. **The misspelling, in the rendered vignette** — §3.2 "Algorithms":
   > "The alternative algorithm (implemented in function optimal.blcok) sought to first block specified
   > variables…"

3. **The local-minimum caveat** — vignette §3.2, on `optimal.shuffle`:
   > "One potential concern is that this method may not be able to reach global minimum. This concern
   > will largely be alleviated when a significant number of shuffling is performed in real work."

4. **The speed/optimality trade-off** — vignette §3.2, on `optimal.block`:
   > "In theory it could reach global minimum for the optimization. On the other hand, due to the
   > complexity involved in generating multiple candidate assignments through block randomization, this
   > computational speed of this method is relatively slow. In addition, as the assignment of each setup
   > is generated independently, the convergence to optimal might be slow."

5. **Do not fill batches sequentially** — vignette §5.1:
   > "To fill batches sequentially and have the empty wells left at the end of last plate is discouraged.
   > This practice will create a batch that is immediately different from the others, making statistical
   > analysis more complex and less powerful."

6. **Design cannot finish the job** — vignette §6 (Discussion):
   > "Even with perfect design and best effort in all stages of experiment including sample-to-batch
   > assignment, it is impossible to define or control all potential batch effects. … It is recommended
   > that analytic methods handling batch effects are employed in all stages of a genomics study, from
   > experiment design to data analysis."

## 8. Stated scope, assumptions, limitations (the source's own)

- **Scope is assignment, not analysis.** OSAT allocates collected samples to batches before the assay.
  It does not model, estimate, or remove batch effects post hoc; the Discussion explicitly defers that
  to SVA / ComBat-style methods.
- OSAT is designed for the **unbalanced and incomplete** case as well as ideal RCBD.
- **`optimal.shuffle` may not reach the global minimum** (quote 3 above) — mitigated only by running
  "a significant number of shuffling".
- **`optimal.block` is slow** and converges slowly because candidates are independent (quote 4).
- **Batch level is a user choice**: plates (recommended for several hundred samples or more) or chips
  ("Occasionally, for smaller sample size, we may chose 'chips' level"). Whichever is chosen is the
  *only* level the objective sees.
- Batches "may have different number of wells due to various reasons (such as wells reserved for QC),
  but the differences are usually not significant" — i.e. roughly-equal batch sizes are assumed but not
  required (the `E_ij` formula handles unequal `B_i`).
- Batch effects **cannot be fully eliminated** by design (quote 6).
- The two algorithms "will generally generate similar assignment plan" (vignette §4.3.1).
- **A caveat exists in the vignette source but is SUPPRESSED from the rendered PDF.** `OSAT.Rnw:340`
  is `%`-commented, so it never reaches the reader:
  > "%On the other hand, this method depends on the assumption that samples are reasonably close to block
  > design. Otherwise, the blocking within batches may be disrupted because of the shuffling. For example
  > if number of samples with certain characteristic is too low to be evenly assigned into batches, we may
  > not be able to reach a stable optimized assignment."

  And `OSAT.Rnw:341`, likewise commented out:
  > "%Another potential concern is that this method may not be able to reach global minimum. Since we are
  > not stopping based on convergence of objective function, final setup is a local minimum is less of a
  > concern when large enough simulation times is used. In reality, reach absolute optimal design is
  > usually not our goal."

  This is the package's clearest statement of when `optimal.shuffle` degrades — and a published reader
  never sees it.

## 9. Failure modes / invalidity patterns

**Named by the source:**

- **Complete randomization** → ~5% (1 variable) / ~14% (3 variables) chance of a batch-dependent
  variable. Detector: Pearson's χ² via `QC()` / `multi.chisq.test()`. Symptom in the worked example:
  p = 0.021 / 0.014 / 0.005 for the three variables under `set.seed(397)`.
- **Sequentially filled batches / empties at the end of the last plate** → creates a batch that "is
  immediately different from the others". No automatic detector; OSAT prevents it by spreading empty
  wells randomly by default.
- **`optimal.shuffle` local minimum** with too few shuffles. No detector, no convergence test; the only
  observable is the `x@metadata$optValue` trace, which the vignette plots (blue diamond = start, red
  diamond = final) but never thresholds.
- **Rare strata** (suppressed caveat, §8): "if number of samples with certain characteristic is too low
  to be evenly assigned into batches, we may not be able to reach a stable optimized assignment."
- Historical bugs from `NEWS` (both listed as **fixed**, kept for the exact error text):
  - v1.6.0: `"arguments imply differing number of rows:"` error "when some categories of samples are small".
  - v1.4.1: "program quit when number of samples is equal to number of available wells".
  - v1.8.1: the `exclude` arg "now can be used when whole plates are excluded"; `exclude<-` added as a
    generic on an existing container.

**Error/warning strings the package emits** (verbatim, useful as detectors):

- `Using default optimization method: optimal.shuffle` — a **warning**, on the *normal* path
  (`create.optimized.setup` with `fun` omitted).
- `More samples than available wells` — stop, in `gExperimentSetup` init.
- `Common column names exists in sample and container! Cannot go on` — stop.
- `Both sample and container information are needed.` / `Not a gSample object` / `Not a gContainer object`
- `Not a gExperimentSetup class object.` — from `optimal.shuffle`, `optimal.block`, `get.experiment.setup`.
- `Only for object in gExperimentSetup class` — from `QC`.
- `Cannot handle more than one variables in each data frame` — from the internal `average.2D`.

**Silent-failure hazards observed directly in the 1.60.0 source** (the docs do not mention these; the
consequence stated is `[summarizer-inferred]` from the code, as no R runtime was available to execute):

- **`nSim` defaults to 100** on both optimizers with no warning — see §6.1. This is the one that matters.
- **`setup.container` appears to drop its own `exclude` argument.** `R/gAssembly-class.R:373-377`,
  verbatim:
  ```r
  setup.container <- function(plate, n, batch="plates", exclude=NULL){
    obj <- gContainer(plate, n, batch, exclude=NULL)
    metadata(obj)$plateName <- deparse(substitute(plate))
    return(obj)
  }
  ```
  The user's `exclude` is never forwarded — `exclude=NULL` is hard-coded in the inner call.
  `[summarizer-inferred]` consequence: `setup.container(IlluminaBeadChip96Plate, 6, batch='plates',
  exclude=excludedWells)` — the exact call in vignette §5.2 **and** in `gContainer-class.Rd`'s own
  example — would produce a container with **no wells excluded**, silently. The vignette never prints
  `gc3` afterwards, so the rendered PDF does not exhibit the exclusion taking effect (the `show` method
  would have printed `There are N wells excluded.`). The `exclude<-` replacement method (added in NEWS
  1.8.1, exported in NAMESPACE) sets `x@exclude` directly and is the route that visibly works.
  **Flagged for verification against a live R session before relying on `exclude=` in `setup.container`.**
- **`optimal.shuffle` loops `for (i in 2:nSim)`.** With `nSim=1` this is `2:1` → `c(2, 1)`, i.e. R's
  descending-sequence trap; the loop body runs rather than being skipped. `[summarizer-inferred]`.
- **The "which variables get blocked" story does not follow the optimizer.** Vignette §3.2 says
  `optimal.shuffle` "sought to first block **all** variables considered … provided to the **optimal**
  argument", and §3.2.1 describes the default run as the one "which block all three variables in block
  randomization step". But the code blocks on `sFactor` = `strata`, and `setup.sample` sets
  `strata = optimal[1]` when `strata` is omitted — which is exactly what the vignette's own default run
  does (`gs <- setup.sample(pheno, optimal=c("SampleType","Race","AgeGrp"))`, §2.2). So the default run
  blocks on `SampleType` **only** — the same `strata` as the `optimal.block` comparison run
  (`gs2 <- setup.sample(pheno, strata=c("SampleType"), optimal=c(...))`). `[summarizer-inferred]`: the
  two runs the vignette contrasts differ in *optimizer*, not in *which variables are blocked*, contrary
  to the §3.2.1 narrative. Practical upshot for a doer: **the blocked set is controlled by `strata`, not
  by the choice of optimizer** — pass `strata` explicitly.

## 10. What the source does NOT address (confident silences)

- **No run-order, processing-date, or within-plate/well-position term in the objective — anywhere.**
  The objective is `sum((table(link$cFactor, link$oFactor) − average.optimal)^2)`. `cFactor` is the
  batch factor (plates *or* chips). The container layout data frame *does* carry
  `chipRows, chipColumns, chips, rows, columns, wells, chipID, rowID, wellID`, but **none of these enter
  the objective, the block-randomization step, or any diagnostic.** There is no concept of a processing
  date, a run sequence, an operator, a reagent lot, or an edge/centre well effect in the package.
  The only position-aware thing in the entire document is a **manual, post-hoc, non-optimized** shuffle
  in the paired-samples case study (§5.4):
  > "We would first assign specimen pairs onto chips, then shuffle them within each chip randomly to
  > further eliminate potential location bias within chips." (verbatim)

  — done by the user with `order(plates, chips, runif(nrow(out3)))`, not by any OSAT function, and never
  scored. Within-batch position is therefore **randomized by hand, if at all, and never optimized.**
- **No warning anywhere about a design where the variable of interest is confounded with batch, and no
  check or error for it.** The Overview *motivates* the problem generically —
  > "A study where most tumor samples are collected from male and healthy ones from female will have
  > difficulty ruling out the effect of gender." (verbatim)

  — but that is about a variable confounded with a *covariate*, not about batch. OSAT never tests whether
  the input collection *can* be balanced across batches, never warns when a stratum is too small to
  spread, and never refuses. It minimizes `V` and returns the best it found. The one sentence that comes
  closest (rare strata → "may not be able to reach a stable optimized assignment") is **commented out of
  the rendered vignette** (§8). A doer who hands OSAT an already-confounded collection gets a
  best-effort assignment and a χ² table, with no flag.
- **NO ACCEPTANCE THRESHOLD OF ANY KIND.** There is no χ² cutoff, no p-value cutoff, no objective-value
  cutoff, and no convergence criterion above/below which an allocation is declared good enough. `QC()`
  prints the χ² table and stops; `multi.chisq.test()` returns `Var / X-squared / df / p.value` and
  renders no verdict; `optValue` is plotted but never thresholded; `nSim` is a fixed budget, not a
  stopping rule (the suppressed §8 comment says so outright: "we are not stopping based on convergence
  of objective function"). The only numbers a reader could mistake for a criterion are **descriptions of
  the worked examples**, not rules: the good run is characterized as `p-value > 0.99` and the bad random
  run as `p-values < 0.05`. Neither is stated as a threshold, and there is no guidance that
  "high p-value = pass". **Recorded as an explicit silence.**
- **No reference / control / bridge-sample support.** There is no notion of a control sample replicated
  in every batch, no bridge/anchor sample, and no facility to *place* a control. The only related
  capability is **negative**: wells can be *excluded* from assignment, and the vignette's motivating
  example for exclusion is exactly a control well —
  > "if we will use the first well of the first chip on each plate to hold QC samples, these wells will
  > not be available for sample placement" (verbatim, §5.2)

  — i.e. OSAT gets out of the way of your controls; it does not manage them, does not check that each
  batch has one, and does not include them in any diagnostic. (And see §9: `setup.container`'s
  `exclude=` argument appears not to be forwarded.)
- No power/sample-size guidance; no recommendation for how many batches or how large.
- No weighted objective function implemented, despite §3.1 defining one.
- No dye-swap, no plate-effect *estimation*, no post-hoc correction.
- No `sessionInfo`-independent reproducibility guidance beyond `set.seed()`.
- Nothing about multi-site / multi-operator studies, or about batches that must be run months apart.

## 11. Open questions / ambiguities the source leaves unresolved

- **Which `nSim` should a real study use?** The docs say "5000 or more", "tens of thousands",
  "typically thousands of or more" — three different phrasings — while every runnable example uses
  100–1000 and the default is 100. No convergence diagnostic is offered to decide.
- **When to choose `optimal.block` over `optimal.shuffle`?** §4.3.1 says they "will generally generate
  similar assignment plan"; §3.2 says one is fast-but-local and the other slow-but-global; §2.3 says
  use the alternative "if blocking the primary variable is most important". But since blocking is
  governed by `strata` (§9), the actual decision rule is unclear from the docs.
- **What counts as an acceptable assignment?** Unanswered — no threshold (§10).
- **Is `optimal.blcok` a typo or a rename that never happened?** The code has only `optimal.block`; the
  prose typo is uncorrected across at least the 1.60.0 release.
- **Does `setup.container(exclude=)` work?** The code says no; the docs assume yes (§9). Unresolved
  without execution.
- The vignette's user-objective-function contract (`return(list(setup=, link=, average=, dev=))`)
  contradicts what the shipped optimizers return (a `gExperimentSetup`). Which is authoritative for a
  user-defined function is not stated.

## 12. Guidance answers

**Q: What is the exported optimization function actually called? Do prose and code agree?**
Two optimizers: **`optimal.shuffle`** (default) and **`optimal.block`**. `optimal.shuffle` is spelled
consistently everywhere. **`optimal.block` is NOT**: the vignette prose, §3.2 "Algorithms", in the
*rendered, published* PDF for 1.60.0, writes **`optimal.blcok`** — transposed letters — exactly once
(`OSAT.Rnw:343`). Every code location (NAMESPACE, man topic + alias, `See Also`, R source, the
`fun="optimal.block"` string, the `optimalFunction` provenance stamp) uses `optimal.block`. **Both
spellings reported verbatim above with their sections; not normalized.** See §6.2.

**Q: Full signatures with every default.** See the table in §5.3 — all ten requested functions, code
signature vs man-page `\usage`, with the man page for `optimal.shuffle` notably **not** showing its
defaults.

**Q: Default iteration/attempt count for each optimizer? Does any lack a default?**
`optimal.shuffle`: **`nSim=100`, `k=2`**. `optimal.block`: **`nSim=100`**. **Neither lacks a default.**
`create.optimized.setup` has no `nSim` formal at all — it forwards `...`, so omitting `nSim` inherits the
optimizer's 100.

**Q: What does the prose/comments say is normally used? Does it differ from the default?**
**Yes — drastically.** Verbatim: `# demonstration only. nSim=5000 or more are commonly used.` (code
comment, on every worked example) and "usually in the tens of thousands" (vignette §3.2 / man
`\details`) and "typically thousands of or more" (`optimal.block.Rd` `\details`). **Coded default = 100.**
That is 50× below the docs' own explicit recommendation and up to ~100–1000× below their prose. A caller
who omits `nSim` gets 100 iterations with no error and no warning about it. Recorded in full at §6.1.

**Q: Minimal end-to-end call sequence, runnable.** §5.4.

**Q: How do the two algorithms differ / trade off? Quote.** §5.5 and quotes 3 & 4 in §7.
Shuffle = hill-climb from one blocked setup, fast, "may not be able to reach global minimum".
Block = best-of-`nSim` independent blocked candidates, "guarantee the identification of a setup that is
conformed to the blocking requirement", "in theory it could reach global minimum", but "relatively slow"
with possibly slow convergence. **Caveat (§9): which variables are blocked is set by `strata`, not by
the optimizer** — contrary to how §3.2 frames the difference.

**Q: Comparison of the two on the example data — the numbers.** §6 (three tables: default,
`optimal.block`, bad-random; plus the paired case). Note the `.Rnw`'s `%`-commented tables are stale
relative to the rendered 1.60.0 PDF; the PDF numbers are the ones recorded.

**Q: Any run-order / processing-date / within-plate-position term in the objective?**
**NO — none.** Explicit silence, documented at §10. The objective sees only batch × optimization-strata
counts. Well/chip/row/column identifiers exist in the container but never enter the objective. The single
position-related act in the whole document is a manual `runif`-based shuffle within chips in the paired
case study, which is not scored by anything.

**Q: Any warning about the variable of interest being confounded with batch?**
**NO.** No check, no warning, no error, no diagnostic. The nearest statement is the generic gender/tumour
motivation in the Overview (about covariate confounding, not batch). The one sentence about strata too
small to spread evenly is **commented out of the rendered vignette**. §10.

**Q: Any reference/control/bridge sample support (a well reserved for a control in every batch)?**
**NO first-class support.** Only well *exclusion* (`exclude=` data frame with `plates`/`chips`/`wells`),
whose motivating example is literally reserving a QC well per plate — but OSAT merely removes those wells
from assignment; it never places, tracks, or checks controls. Additionally, the 1.60.0 code for
`setup.container` appears to hard-code `exclude=NULL` in its inner call, so the argument may be silently
ignored (§9). §10.

**Q: Is any acceptance threshold given (χ², p, or objective value)?**
**NO — explicit silence.** No cutoff, no verdict, no convergence criterion. `QC()` prints χ² results and
stops. The only numbers in the neighbourhood are descriptive: the good run is reported as
`p-value > 0.99`, the bad random run as `p-values < 0.05`. Neither is asserted as a pass/fail rule. §10.

**Q: Pin.** OSAT **1.60.0**; Bioconductor **3.23** (release); `git_last_commit` **06a9e90**,
`git_last_commit_date` **2026-04-28**; vignette dated **April 28, 2026** (built with `\today`, under
R 4.6.0 RC); accessed **2026-07-13**. §1.
