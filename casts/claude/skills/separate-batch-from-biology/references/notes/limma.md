---
title: "limma: Linear Models for Microarray and Omics Data — package documentation"
type: tutorial
source_id: limma
source_url: https://bioconductor.org/packages/release/bioc/manuals/limma/man/limma.pdf
access_date: "2026-07-13"
license: GPL-2.0-or-later
license_file: LICENSES/GPL-2.0-or-later.LICENSE
attribution: "Gordon K. Smyth et al., limma (Bioconductor). Package version 3.68.4. Licensed GPL (>=2)."
derived: license-aware-summary
tags:
  - domain/differential-expression
  - domain/batch-effects
---

# limma — package documentation (reference manual + User's Guide)

## 1. Citation

- **Package:** `limma` — "Linear Models for Microarray and Omics Data" (Title field).
- **Author (DESCRIPTION):** Gordon Smyth [cre, aut] (ORCID 0000-0001-9221-2892); ctb: Yifang Hu,
  Matthew Ritchie, Jeremy Silver, et al. Maintainer: Gordon Smyth <smyth at wehi.edu.au>.
- **Version summarized:** **3.68.4**, `Date` field **2026-05-31**.
- **Bioconductor release:** 3.23 (Release). `git_branch RELEASE_3_23`, `git_last_commit 7c11dae`,
  `git_last_commit_date 2026-05-31`, `Date/Publication 2026-07-12`.
- **License (DESCRIPTION):** `GPL (>=2)` → SPDX `GPL-2.0-or-later`.
- **DOI:** 10.18129/B9.bioc.limma. Package URL: https://bioinf.wehi.edu.au/limma/
- **Reference manual PDF:** title-page date **July 13, 2026**;
  https://bioconductor.org/packages/release/bioc/manuals/limma/man/limma.pdf
- **User's Guide PDF:** Gordon K. Smyth, Matthew Ritchie, Natalie Thorne, James Wettenhall, Wei Shi,
  Yifang Hu. "limma: Linear Models for Microarray and RNA-Seq Data — User's Guide." First edition
  2 December 2002, **last revised 19 May 2026**;
  https://bioconductor.org/packages/release/bioc/vignettes/limma/inst/doc/usersguide.pdf
- **Access date:** 2026-07-13.

**Version drift warning:** defaults, signatures, and the wording of the `removeBatchEffect` Note have
changed across limma releases. Everything below is pinned to **3.68.4 / Bioc 3.23** as fetched on
2026-07-13. Third-party mirrors (rdrr.io etc.) were **not** consulted; only the two Bioconductor PDFs
above and the package landing page.

## 2. Access note

Full text of both PDFs read (reference manual, 12,928 extracted lines; User's Guide, ~552 kB of
extracted text). No paywall. Pages cited below are the reference manual's printed page numbers.

## 3. Thesis (1 sentence)

limma fits gene-wise linear models with empirical-Bayes moderated statistics for differential
expression; unwanted variation (batch, block, technical covariates) is handled **inside** that linear
model, while the batch-subtracted expression matrix produced by `removeBatchEffect` is documented as
an artifact for plotting and unsupervised analysis rather than an input to the model.

## 4. Problem & context

The reference manual organizes functionality by overview topics (`01.Introduction` …
`11.RNAseq`). Batch/unwanted-variation handling appears in two distinct places:

- **`05.Normalization`** (pp. 10–11) — the topic page under which `removeBatchEffect` is filed
  (`removeBatchEffect`'s own See Also points back to `05.Normalization`).
- **`06.LinearModels`** and the User's Guide §9.4 ("Additive Models and Blocking") — where batch is
  handled as a term in the design matrix.

## 5. Method / approach — `removeBatchEffect`

**Signature (functional string, verbatim, reference manual p. 213):**

```r
removeBatchEffect(x, batch = NULL, batch2 = NULL, covariates = NULL,
                  design = NULL, group = NULL, ...)
```

All six named arguments default to `NULL`. Arguments, as documented (pp. 213–214):

| arg | documented meaning |
|---|---|
| `x` | numeric matrix, or any data object processable by `getEAWP`, containing **log-expression** values; rows = probes, columns = samples. |
| `batch` | factor or vector indicating batches. |
| `batch2` | factor or vector indicating a **second, independent** series of batches. |
| `covariates` | matrix or vector of numeric covariates to be adjusted for. |
| `design` | design matrix relating to experimental conditions **to be preserved**, usually the design matrix with all experimental factors *other than* the batch effects. **Ignored if `group` is not NULL.** **Defaults to an intercept column, implying that the experiment is one group.** |
| `group` | factor defining the experimental conditions to be preserved; an alternative way to specify `design`. |
| `...` | other arguments are passed to `lmFit`. |

**What happens if `design`/`group` are omitted** (guidance question, answered directly by the
`design` entry above): `design` defaults to an **intercept column**, which the doc says implies **the
experiment is one group** — i.e. no treatment structure is protected from the correction. `group` is
just an alternative way of specifying `design`, and when `group` is supplied, `design` is **ignored**.

**Mechanism (Details, p. 214):** the function fits a linear model including both batches and regular
treatments, then removes the component due to the batch effects. `batch` and `batch2` effects are
assumed **additive** when both are given. `covariates` columns are also assumed additive; setting
`covariates` to a design matrix built from batch/technical effects allows "very general batch effects"
to be accounted for. If `x` carries weights, they are used in estimating the batch effects.

**Value (p. 214):** a numeric matrix of log-expression values with batch and covariate effects removed.

**Example (p. 215):** the shipped example simulates a batch shift, calls
`y.corrected <- removeBatchEffect(y, batch=batch, group=group)`, and uses the result **only** for
`plotMDS(y.corrected, main="Batch corrected")` — a plot. No `lmFit` is run on `y.corrected`.

## 6. Key claims / findings

1. **The prohibition is stated in the `Note` section of the `removeBatchEffect` man page** (p. 214),
   not in Description, Details, or Value. It is explicit and directional: the function **is** for
   plotting/exploration, and **is not** intended to prepare data for linear modeling by `lmFit`.
2. **The reason given is a standard-error / inference argument**, not a point-estimate argument: the
   doc says it is better to include the batch factors in the linear model **so that `lmFit` can
   correctly assess the standard errors of the linear model parameters**. The quantity claimed to go
   wrong is therefore the **standard errors of the linear model parameters** (and hence downstream
   inference), *not* the fold changes/coefficients.
3. **The Note names exactly one downstream consumer: `lmFit`.** It names no other correction method.
4. **`05.Normalization` (p. 11) assigns `removeBatchEffect` a one-line role** restricted to
   unsupervised analysis (quoted §7).
5. **The Description and Details are permissive-sounding in isolation** — Details frames the use case
   as "ready for plotting or unsupervised analyses such as PCA, MDS or heatmaps" — so Description +
   Details + Value already scope the function to exploration; the Note makes the exclusion explicit.
6. **The User's Guide never mentions `removeBatchEffect` at all** (§12, hit count = 0). Where the
   User's Guide handles batch, it does so by putting batch in the design matrix.
7. **limma ships its own surrogate-variable function, `wsva`** (p. 268, "Weighted Surrogate Variable
   Analysis"), and its documented usage is **include-in-design**, not subtract: the Details say the
   surrogate variables "can be included in the design matrix to remove unwanted variation," and the
   Value is a matrix of SVs (`ncol(y)` rows × `n.sv` columns) — *not* a corrected expression matrix.
   Signature: `wsva(y, design, n.sv = 1L, weight.by.sd = FALSE, plot = FALSE, ...)`. It cites Leek &
   Storey (2007). **`wsva`'s man page carries no Note and states no prohibition** — see §7/§10/§12.

## 7. Load-bearing statements — **VERBATIM** (license-aware mode: `GPL-2.0-or-later` → verbatim-ok,
**copyleft**)

> Quoting mode: the package is licensed `GPL (>=2)` (DESCRIPTION), which resolves to verbatim-ok
> with copyleft obligations. Quotes below are reproduced **verbatim with attribution**, deliberately
> *not* paraphrased — own-words is not a route around copyleft. Attribution: limma 3.68.4, © Gordon
> Smyth et al., GPL (>=2); see `LICENSES/GPL-2.0-or-later.LICENSE`.

**(a) THE PROHIBITION — `removeBatchEffect`, section `Note`, reference manual p. 214 (verbatim, in full):**

> "This function is intended for plotting and data exploration purposes. This function is not intended
> to be used to prepare data for linear modeling by lmFit. For linear modeling, it is better to include
> the batch factors in the linear model so that lmFit can correctly assess the standard errors of the
> linear model parameters."

**(b) The stated purpose — `removeBatchEffect`, section `Details`, first sentences, p. 214 (verbatim):**

> "This function is useful for removing unwanted batch effects, associated with hybridization time or
> other technical variables, ready for plotting or unsupervised analyses such as PCA, MDS or heatmaps.
> The design matrix or group factor is used to define comparisons between the samples, for example
> treatment effects, that should not be removed. The function fits a linear model to the data, including
> both batches and regular treatments, then removes the component due to the batch effects."

**(c) `Description` and `Value` — p. 213 / p. 214 (verbatim, in full; both are one-liners):**

> Description: "Remove batch effects from expression data."

> Value: "A numeric matrix of log-expression values with batch and covariate effects removed."

**(d) `05.Normalization` overview topic, p. 11 — the one-line role it assigns (verbatim):**

> "removeBatchEffect can be used to remove a batch effect, associated with hybridization time or some
> other technical variable, prior to unsupervised analysis."

**(e) `wsva` (Weighted Surrogate Variable Analysis), `Details`, p. 268 (verbatim) — the adjacent
include-in-design idiom:**

> "The function constructs surrogate variables that explain a high proportion of the residual variability
> for many of the genes. The surrogate variables can be included in the design matrix to remove unwanted
> variation. The surrogate variables are constructed from the singular vectors of a representation of the
> linear model residual space."

**(f) User's Guide §9.4.2 "Blocking", p. 44 — the model-formula idiom (verbatim, incl. functional string):**

> "The above approach used for paired samples can be applied in any situation where there are batch
> effects or where the experiment has been conducted in blocks. The treatments can be adjusted for
> differences between the blocks by using a model formula of the form:
>
> ```r
> > design <- model.matrix(~Block+Treatment)
> ```
>
> In this type of analysis, the treatments are compared only within each block."

## 8. Stated scope, assumptions, limitations (the source's own caveats)

- `removeBatchEffect` is scoped by its own Note to **plotting and data exploration**; excluded from
  preparing data for **`lmFit`** (§7a).
- `x` must be **log-expression** values (Arguments, p. 213). Corrections are on the log scale.
- **Additivity** is assumed between `batch` and `batch2`, and across columns of `covariates`
  (Details, p. 214).
- If `design`/`group` are omitted, `design` defaults to an intercept column — the doc states this
  **implies the experiment is one group** (p. 214).
- `05.Normalization` restricts the function's advertised role to **"prior to unsupervised analysis"**
  (§7d).

## 9. Failure modes / invalidity patterns (referee-relevant)

- **Named failure mode (the only one the docs spell out):** feeding `removeBatchEffect` output into
  `lmFit`. The doc's stated consequence is that `lmFit` cannot **correctly assess the standard errors
  of the linear model parameters** (§7a). The docs give no numeric magnitude, no simulation, no FDR
  figure, and no detector/diagnostic/error message — the correction is silent, and limma will not warn
  you. It is a documentation-level prohibition, not a runtime check.
- **Prescribed alternative:** include the batch factors as terms in the linear model
  (`~Block+Treatment`, §7f), so the model retains the correct residual degrees of freedom.
- **Omitting `design`/`group`** silently treats the experiment as one group, so a batch effect
  confounded/correlated with the treatment can have treatment signal absorbed into the "batch"
  component. *(The docs state the intercept default and state that `design`/`group` name what "should
  not be removed"; they do not spell out this consequence in a warning. Consequence is
  `[summarizer-inferred]` from those two statements — the source does not say it.)*
- **No statement about perfect/partial confounding.** The docs nowhere describe behavior when batch is
  confounded with the condition of interest, and name no diagnostic for it.

## 10. What the source does NOT address (confident silences)

- **The scope question — the docs are SILENT on other correction methods.** Searched the full text of
  both PDFs:
  - **`ComBat` — 0 hits** in the reference manual and 0 in the User's Guide.
  - **`RUV` / "remove unwanted variation" as a named method — 0 hits** in both.
  - **`sva` (the package) — 0 hits.** (A case-insensitive `sva` grep returns hits only as a substring
    of `normalizeMedianAbsValues`; these are false positives, not references to the sva package.)
  - **Surrogate variables** appear **only** as limma's own `wsva` function (p. 268).

  **Therefore: the `removeBatchEffect` Note is scoped to `removeBatchEffect` → `lmFit`. It does NOT
  generalize the prohibition to ComBat, to `sva`/surrogate variables, or to RUV — it never mentions
  them.** The closest adjacent evidence is `wsva`, whose documented idiom is *include the SVs in the
  design matrix* (§7e) — but that is a positive statement about how to **use** SVs, **not** a
  prohibition on subtracting them, and `wsva` does not produce a corrected matrix in the first place
  (its Value is the SV matrix). `wsva`'s man page contains **no Note and no warning**. Any claim that
  limma's docs prohibit downstream modelling on ComBat-/SVA-/RUV-adjusted matrices is **not supported
  by this source** and must not be attributed to it.
- **No quantification of the harm.** The docs assert the standard errors are not correctly assessed;
  they never quantify bias, false-positive rate, or degrees-of-freedom loss, and cite no paper for the
  Note.
- **No discussion of when subtraction *would* be acceptable** for modelling (e.g. balanced designs).
- **The User's Guide never discusses producing a batch-corrected expression matrix at all** (§12).

## 11. Open questions / ambiguities left unresolved

- The Note says "not intended to be used to prepare data for linear modeling **by lmFit**". Whether the
  restriction is meant to extend to *any* downstream inferential model (limma-voom, other testing
  frameworks, clustering-with-inference) or is literally about `lmFit` is not stated.
- `05.Normalization` files `removeBatchEffect` under *normalization*, while the Note scopes it to
  *exploration*; the docs don't reconcile these framings.
- No guidance on whether `covariates`-based "very general batch effects" (Details, p. 214) — which
  could carry, e.g., externally computed surrogate variables — inherits the same Note. The docs do not
  say.

## 12. Guidance answers

**Q: The `removeBatchEffect` man page — Description, Details, Value, Note reproduced in full,
verbatim.** → Done: §7a (Note, in full), §7b (Details, first paragraph; remaining Details paragraphs
summarized in §5 with their functional content preserved), §7c (Description and Value, both in full).
The prohibition appears in the **`Note`** section, p. 214.

**Q: Does the doc state whether the returned matrix may be used as input to downstream linear
modelling / DE testing? Quote it, either direction.** → **Yes — it states the negative.** Verbatim,
§7a: *"This function is not intended to be used to prepare data for linear modeling by lmFit."* Section:
**Note**, `removeBatchEffect` man page, reference manual p. 214.

**Q: If a reason is given, what quantity is claimed to go wrong?** → The **standard errors of the
linear model parameters**. Verbatim: *"For linear modeling, it is better to include the batch factors
in the linear model so that lmFit can correctly assess the standard errors of the linear model
parameters."* Note the reason is about **inference/standard errors**, not about the coefficients or
fold-changes.

**Q: SCOPE CHECK — does the statement mention any method other than `removeBatchEffect`/`lmFit`
(ComBat, surrogate variables, RUV)? Does it generalize, or is it silent?** → **It is SILENT. It does
not generalize.** The Note names only `removeBatchEffect` and `lmFit`. `ComBat` and `RUV` appear
**zero times** anywhere in either PDF; the `sva` package appears zero times. Surrogate variables appear
only as limma's own `wsva`, whose documentation states SVs *can be included in the design matrix* (§7e)
but issues **no prohibition** and returns no corrected matrix. **Do not stretch this note into an
SV/ComBat/RUV claim** — this source cannot support one. (See §10.)

**Q: Full current signature with every argument and default; what are `design` and `group` for; what
happens if they're omitted?** → §5. Signature verbatim:
`removeBatchEffect(x, batch = NULL, batch2 = NULL, covariates = NULL, design = NULL, group = NULL, ...)`.
`design`/`group` specify the experimental conditions **to be preserved** (not removed); `group` is an
alternative specification of `design` and **`design` is ignored if `group` is not NULL**. If omitted,
`design` **defaults to an intercept column, implying the experiment is one group** (verbatim from the
Arguments table, p. 214).

**Q: `05.Normalization` — what one-line role does it assign `removeBatchEffect`?** → §7d, verbatim
(p. 11): *"removeBatchEffect can be used to remove a batch effect, associated with hybridization time
or some other technical variable, prior to unsupervised analysis."* The role is bounded by **"prior to
unsupervised analysis."**

**Q (NEGATIVE RESULT): grep the User's Guide for `removeBatchEffect` — report the hit count.** →

> ### **HIT COUNT = 0.**
>
> **`removeBatchEffect` does not appear anywhere in the limma User's Guide** (version last revised
> 19 May 2026, ~552 kB extracted text). Verified two ways: a plain case-insensitive grep (0), and a
> whitespace/punctuation-stripped scan of the whole flattened text to defeat any line-break
> hyphenation (`removebatcheffect` → 0; `removebatch` → 0). For contrast the same document's text
> yields 8 hits in the **reference manual**.
>
> **Consequence: the User's Guide is NOT a citable venue for the anti-subtraction rule.** The rule
> lives *only* in the **reference manual's `removeBatchEffect` man page, `Note` section** (i.e. `?removeBatchEffect`
> / the man page in `limma.pdf`). Any citation of the User's Guide for this rule points at a document
> that does not contain it.

**Q: What the User's Guide *does* say about batch effects (Blocking / `duplicateCorrelation`); quote
the model-formula idiom verbatim.** → §7f, verbatim (§9.4.2 "Blocking", p. 44): batch/block effects are
adjusted for **by a model formula** — functional string: `design <- model.matrix(~Block+Treatment)` —
and *"In this type of analysis, the treatments are compared only within each block."* §9.4.1 gives the
paired-sample instance (`design <- model.matrix(~SibShip+Treat)`, then `lmFit(eset, design)`).
Separately, §9.7 "Multi-level Experiments" treats a blocking factor as a **random effect** via
`duplicateCorrelation` (functional strings, verbatim):

```r
> corfit <- duplicateCorrelation(eset,design,block=targets$Subject)
> corfit$consensus
> fit <- lmFit(eset,design,block=targets$Subject,correlation=corfit$consensus)
```

The Guide's worked case studies do the same: §17 (E. coli Lrp) reports that *"Including Experiment as a
batch was also clearly important"*, and §18.2 (Pasilla) builds `design <- model.matrix(~ Batch + Pasilla)`
after an MDS plot shows a batch effect. In every instance batch enters the **design matrix**; it is never
subtracted from the data.

**Q: Does the User's Guide anywhere discuss producing a batch-corrected matrix? Quote or record
silence.** → **SILENCE.** No section of the User's Guide describes producing, saving, or analysing a
batch-corrected expression matrix. Searches for `batch.corrected`, `corrected matrix`, and
`remove(s|d)? (the )?(batch|unwanted)` return no relevant hits ("corrected" occurs only re: background
correction, dye-effects, and multiple-testing adjustment). The Guide's *only* mode of handling batch is
in-model (previous answer).

**Q: Pin.** → §1. limma **3.68.4**, `Date` **2026-05-31**, **Bioconductor 3.23**, reference manual
title-page date **July 13, 2026**, User's Guide **last revised 19 May 2026**, accessed **2026-07-13**.
Drift across releases is real — the Note's wording and the signature have both changed historically;
mirrors serve stale copies. Re-check against the pinned version before citing.
