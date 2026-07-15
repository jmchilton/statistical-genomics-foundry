---
type: mold
name: separate-batch-from-biology
tags:
  - family/a
  - role/construct
  - domain/experimental-design
  - domain/batch-effects
references:
  - kind: research
    ref: "[[msmb-chap13]]"
    used_at: runtime
    load: upfront
    mode: condense
    evidence: corpus-observed
    purpose: "Design vocabulary for the frame + design-review phases: experiment taxonomy, noise-vs-bias, blocking/pairing/balance/randomization ('block what you can, randomize what you cannot'), effective sample size, and the rule that data already confounded at collection cannot be rescued by any analysis."
  - kind: research
    ref: "[[msmb-chap8]]"
    used_at: runtime
    load: upfront
    mode: condense
    evidence: corpus-observed
    purpose: "The design matrix carries the model's scientific content; a known nuisance factor enters as a blocking term (at a degrees-of-freedom cost); PCA/heatmap/p-value-histogram diagnostics for an unmodelled batch factor."
  - kind: research
    ref: "[[leek-2010]]"
    used_at: runtime
    load: upfront
    mode: condense
    evidence: corpus-observed
    purpose: "The detection recipe (cluster/MDS/PC-vs-batch-surrogate), the claim that normalization does not remove batch effects, the adjustment menu (covariate / ComBat / SVA), and the boundary condition: adjustment works only when batch is not highly confounded with biology."
  - kind: research
    ref: "[[yan-2012-osat]]"
    used_at: runtime
    load: on-demand
    trigger: "when samples are already collected but not yet assigned to batches/plates/chips"
    mode: condense
    evidence: corpus-observed
    purpose: "The RCBD target, the constrained-allocation objective V = Σ_ij (n_ij − E_ij)², the OSAT R API and its 5000-attempt default, the χ² variable-vs-batch diagnostic, and the explicit caveat that design alone cannot eliminate batch effects."
  - kind: research
    ref: "[[designit]]"
    used_at: runtime
    load: on-demand
    trigger: "when an assignment must actually be computed and a pinned, runnable allocation API is needed"
    mode: verbatim
    evidence: corpus-observed
    purpose: "Pinned allocation tooling (designit 0.5.0): BatchContainer / optimize_design / osat_score_generator signatures and every default; the exact assertion strings; the two latent 0.5.0 bugs. Version-pinned signatures must be carried verbatim — paraphrasing them is the failure."
  - kind: research
    ref: "[[leek-storey-2007-sva]]"
    used_at: runtime
    load: on-demand
    trigger: "when the batch/technical variable is unmeasured or unrecorded"
    mode: condense
    evidence: corpus-observed
    purpose: "What a surrogate variable is and how it is constructed (residualize on the primary variable → SVD → permutation test on eigengenes → build SVs on the ORIGINAL matrix); and the rule that SVs enter subsequent regressions as covariates with gene-specific coefficients — never subtracted from the data."
  - kind: research
    ref: "[[sva]]"
    used_at: runtime
    load: on-demand
    trigger: "when calling num.sv / sva / svaseq / ComBat / ComBat_seq"
    mode: verbatim
    evidence: corpus-observed
    purpose: "Pinned API (sva 3.60.0, Bioconductor 3.23): full signatures and defaults, the data-type split (sva=continuous, svaseq=counts, ComBat=normalized, ComBat_seq=raw counts), the SVs-in-BOTH-models rule, and the console detector strings."
  - kind: research
    ref: "[[rnaseqgene]]"
    used_at: runtime
    load: on-demand
    trigger: "when estimated factors (SVs / RUV factors) must be carried into a count-based DE design"
    mode: verbatim
    evidence: corpus-observed
    purpose: "The only recovered worked code for the estimate→design handoff: svaseq(dat, mod, mod0, n.sv=2) on normalized counts, then design(ddssva) <- ~ SV1 + SV2 + dex; and the RUVg empirical-control-gene parallel."
  - kind: research
    ref: "[[deseq2]]"
    used_at: runtime
    load: upfront
    mode: verbatim
    evidence: corpus-observed
    purpose: "The batch-in-design idiom (~ batch + condition, variable of interest last), the raw-counts input rule, and the mechanical aliasing detector: the exact error 'the model matrix is not full rank, so the model cannot be fit as specified.' plus its two stated remedies."
  - kind: research
    ref: "[[zhang-2020-combat-seq]]"
    used_at: runtime
    load: on-demand
    trigger: "when an adjusted COUNT matrix (not a covariate) is required for a downstream tool"
    mode: condense
    evidence: corpus-observed
    purpose: "The NB/quantile-mapping count-adjustment method, its integer-preserving output, and — load-bearing — its own 'adjust only when batch effects are present and harmful' prescription plus the FPR 0.059–0.067 over-correction regime."
  - kind: research
    ref: "[[nygaard-2016]]"
    used_at: runtime
    load: upfront
    mode: verbatim
    evidence: corpus-observed
    purpose: "The three-legged failure the doer must never build (unbalanced design + group-preserving batch removal + downstream analysis that ignores batch) and its endorsed remedy: account for batch in the statistical analysis."
  - kind: research
    ref: "[[kang-2018-demuxlet]]"
    used_at: runtime
    load: on-demand
    trigger: "when the platform is droplet scRNA-seq and donors would otherwise each occupy their own run"
    mode: condense
    evidence: corpus-observed
    purpose: "Pooling + genotype-based demultiplexing as an established design-time route, with its hard input (external genotypes for every pooled donor), its operating point (50 SNPs/cell, ≥1000 UMIs/cell, unrelated donors), and its practical pool-size optimum (~20)."
    recheck: "[re-check] The source carries a published Author Correction (Nat Biotechnol 38(11):1356, DOI 10.1038/s41587-020-0715-9) that could NOT be retrieved (paywalled). It is unverified whether the correction touches the 50-SNPs/cell operating point or any other number cited here. No threshold from this note may be used load-bearing until the correction is read."
  - kind: research
    ref: "[[munafo-2018-collider]]"
    used_at: runtime
    load: on-demand
    trigger: "when only a selected subset of a cohort is being assayed (e.g. samples chosen on DNA availability / data completeness)"
    mode: condense
    evidence: hypothesis
    verification: "The source is explicitly about SELECTION INTO A SAMPLE and never mentions batch effects, batch design, or technical covariates. Its note states that transferring the argument to batch-covariate adjustment is an external inference, not the source's claim. This reference may be cited ONLY for the sample-selection step (who gets assayed), never for batch adjustment. Verify before promoting to corpus-observed."
    purpose: "Guards the one selection step this Mold really does own: choosing which samples are profiled at all."
---

# separate-batch-from-biology

Keep technical variation separable from the biological variable of interest, at every point where
they could become entangled: when samples are assigned to batches, when hidden batch structure is
detected in data already collected, and when a batch adjustment is chosen. Produce a result **plus the
method description a referee will judge** — and hand off. This Mold cannot certify its own output.

## Phase 1 — frame

Record, before touching data:

- **The primary variable** `y` and the exact contrast claimed (`[[msmb-chap8]]`: the scientific content
  of the model lives in its design matrix).
- **Every candidate technical variable**, named as a variable, not as a vibe: processing group,
  processing date/run, reagent lot, technician, chip/plate/well, sequencing lane, library-prep round
  (`[[leek-2010]]`, `[[sva]]`).
- **The level of replication** — name it explicitly rather than leaning on the technical/biological
  dichotomy (`[[msmb-chap13]]`).
- **The experiment type**: controlled experiment / randomized controlled trial / study / observational
  study / meta-analysis. Causal license decreases across that list (`[[msmb-chap13]]`).
- **Which moment we are in.** Pre-run (samples not yet allocated) and post-run (data in hand) are
  different Molds' worth of work; do not silently switch.

[GAP: no source in the reference set supplies a required-metadata schema or a sample-sheet format. The
list above is what the sources *name*, not a validated intake contract.]

## Phase 2 — design-review

### 2a. Pre-run — samples not yet allocated

- **Target the RCBD.** The groups of main interest *and* the important confounding variables should be
  balanced and replicated across batches (`[[yan-2012-osat]]`, quoted verbatim in the note). If a true
  RCBD is achievable, **no optimization step is needed** (`[[yan-2012-osat]]` §5.4).
- **Balance makes each factor's effect identifiable** (`[[msmb-chap13]]`). "Block what you can, and
  randomize what you cannot" (Box 1978, quoted in both `[[msmb-chap13]]` and `[[designit]]`).
- **Do not settle for plain randomization.** `[[yan-2012-osat]]`: "there is substantial chance that
  variables will be statistically dependent on batches if a complete randomization is carried out,
  especially for incomplete and/or unbalanced sample collections" — demonstrated with χ² p-values
  **< 0.05** for all three variables in their complete-randomization arm. `[[designit]]` ships a seeded
  counter-example: `set.seed(17)` produces a bad random assignment of 31 grouped subjects into 3
  batches (source comment: `# gives 'bad' random assignment`).
- **Randomize what remains** — including position within a block, to avoid side/position confounding
  (`[[msmb-chap13]]`).

[GAP: no source states a minimum batch size relative to the number of strata. `[[yan-2012-osat]]` is a
confident silence on what happens when a batch cannot hold one sample of each stratum (its `⌊E_ij⌋` is
simply 0 when `E_ij < 1`; the paper never discusses, warns about, or bounds this case).]

[GAP: **run order / processing time within or across batches is not optimizable from these sources.**
`[[yan-2012-osat]]`'s objective contains no term for run order, processing date, or position; `[[designit]]`
has no time/run-order dimension at all. Only *plate row/column* position is covered (`[[designit]]`'s
distance-based plate score, `penalize_lines`, and `exclude =` for edge wells).]

### 2b. Post-run — data in hand

Run the detection recipe (`[[leek-2010]]`, `[[msmb-chap8]]`):

1. Hierarchical clustering of samples, **labelled by both the biological group and the batch
   surrogate**. MDS as an alternative.
2. Correlate principal components against the known batch surrogates (processing group / date).
3. Count features significantly associated with the batch surrogate.

Strong batch effects are indicated when samples cluster by processing group/time, when many features
associate with processing group/time, or when the PCs correlate with the batch surrogate. **If the PCs
correlate with no known surrogate, suspect an unmeasured batch source** (`[[leek-2010]]`).

Supporting signatures (`[[msmb-chap8]]`): a p-value histogram tilted up toward the right indicates batch
effects; depletion of small p-values indicates an unmodelled *balanced* covariate inflating the
denominator. `[[sva]]`'s own tell: ~70% of genes called DE at FDR < 5% is "artificially high, even for a
strong phenotype like cancer."

**Normalization does not remove batch effects** and can amplify them (`[[leek-2010]]`).
`counts(dds, normalized=TRUE)` is not batch-corrected: the design is not used when estimating size
factors (`[[deseq2]]`).

### 2c. The aliasing check — mechanical, and it is a stop sign

Build the model matrix for the intended design (`~ batch + condition`). If the batch columns are a
linear combination of the condition columns, the design is **not full rank** and DESeq2 emits, verbatim:

> `the model matrix is not full rank, so the model cannot be fit as specified.`

(`[[deseq2]]`.) Under perfect confounding **there is no way to separate the condition effects from the
batch effects**; DESeq2's only stated options are (i) assume there is no batch effect — which it deems
highly unlikely given the batch-effects literature — or (ii) **rerun the experiment with conditions
balanced across batches**. `[[leek-2010]]`: adjustment cannot rescue it. `[[msmb-chap13]]`: if already
confounded in collected data, no analysis can rescue it.

**On an aliased design this Mold HALTS.** It does not choose an adjustment method. It emits the finding
and escalates through the gate (Phase 5). Adjusting-for-batch-and-proceeding is the exact move the
referee loop exists to stop.

[GAP: `[[deseq2]]` explicitly states it gives *no automated detector* that flags a non-full-rank design
ahead of running `DESeq` — the user hits it as an error. No source supplies a pre-flight rank check as a
callable procedure.]

[GAP: **no source gives a numeric threshold for "too confounded to proceed."** `[[leek-2010]]` states the
principle qualitatively and reports a confounding range (generalized R², 12.2%–100%) with no cutoff.
`[[nygaard-2016]]` gives no numeric cutoff. `[[zhang-2020-combat-seq]]` names "severely or even completely
confounded" with no detector, threshold, or simulation. `[[leek-storey-2007-sva]]`'s robustness study
stops at an average primary-vs-hidden-factor correlation of **0.50** and never analyses perfect
confounding. The boundary between REVISE and ESCALATE for *partial* confounding is unsourced.]

## Phase 3 — select an established method

Pick from this menu. **If nothing on it fits, say so and escalate — do not invent a method.**

| Situation | Established route | Source |
|---|---|---|
| Batch aliased with condition | **None.** Halt → ESCALATE | `[[deseq2]]`, `[[leek-2010]]`, `[[msmb-chap13]]` |
| Pre-run, unbalanced/incomplete collection | Constrained allocation: OSAT block-randomize + optimize, or designit `optimize_design()` | `[[yan-2012-osat]]`, `[[designit]]` |
| Batch known + recorded; goal is inference | **Put batch in the design**: `~ batch + condition`, variable of interest last | `[[deseq2]]`, `[[msmb-chap8]]`, `[[nygaard-2016]]` (its primary advice), `[[leek-2010]]` (its simplest approach) |
| Batch known; an adjusted *matrix* is required by a downstream tool; data are **raw counts** | `ComBat_seq()` — NB regression, integer counts in and out | `[[zhang-2020-combat-seq]]`, `[[sva]]` |
| Batch known; an adjusted matrix is required; data are **cleaned + normalized continuous** | `ComBat()` (one batch variable only) | `[[sva]]` |
| Batch **unknown / unrecorded** | SVA — estimate surrogate variables and enter them as covariates | `[[leek-storey-2007-sva]]`, `[[leek-2010]]`, `[[sva]]` |
| Batch unknown; data are **counts** | `svaseq()` (= sva + `log(dat + constant)`, `constant = 1`) | `[[sva]]`, `[[rnaseqgene]]` |
| Batch unknown; RUV route | `RUVg()` with empirical control genes | `[[rnaseqgene]]` |
| Droplet scRNA-seq, donors would each occupy their own run | **Pool donors into one run and demultiplex on natural genetic variation** (demuxlet) | `[[kang-2018-demuxlet]]` |

Three constraints that bind every choice:

1. **Adjust only when batch effects are present and harmful.** `[[zhang-2020-combat-seq]]`, verbatim:
   "batch effects should only be adjusted when they are present and result in unfavorable impact on
   downstream analysis. Such observations emphasize the importance for careful diagnosis of batch effect
   before applying any transformation to the data."
2. **Estimated factors enter the MODEL, not the DATA.** `[[leek-storey-2007-sva]]` uses SVs only as
   covariates with gene-specific coefficients; `[[sva]]` puts them in **both** the full and null model
   matrices (`modSv = cbind(mod, svobj$sv)`, `mod0Sv = cbind(mod0, svobj$sv)`) and, in limma, in the
   design but *not* the contrasts; `[[rnaseqgene]]` reassigns the design
   (`design(ddssva) <- ~ SV1 + SV2 + dex`) and never produces a cleaned matrix.
3. **Never build Nygaard's three-legged failure**: an unbalanced group–batch design **+** a batch
   adjustment that preserves group differences **+** a downstream analysis that ignores batch. All three
   legs are required; remove any one and the problem disappears (`[[nygaard-2016]]`).

Method-specific hazards to honour at selection time:

- **ComBat-seq when the batch effect is mean-only.** `[[zhang-2020-combat-seq]]`'s own simulations: with
  no true dispersion difference across batches, ComBat-seq and ComBat-on-logCPM both show **FPR
  0.059–0.067** (all other methods hold FPR < 0.05) with no gain in power. Their prescription: use the
  simpler batch-as-covariate approach.
- **Gaussian adjustment on counts** produces negative values and manufactures significance — their
  worked example: an artificial significant difference between the two batches' *control* samples,
  **P = 0.0033**.
- **SVA is the wrong tool when the latent structure IS the biology.** `[[sva]]` §10, verbatim: "If the
  goal of the analysis is to identify heterogeneity in one or more subgroups, the sva function may not
  be appropriate… one or more of the estimated surrogate variables may be very highly correlated with
  subgroup."
- **demuxlet has a hard input**: external DNA-derived genotypes (array, imputed, or sequence-derived)
  for **every** pooled donor. `[[kang-2018-demuxlet]]` describes **no genotype-free mode**.

> **[re-check] — `[[kang-2018-demuxlet]]` is under a published Author Correction we could not read.**
> Nat Biotechnol 38(11):1356 (DOI 10.1038/s41587-020-0715-9) is paywalled; it is **unverified** whether
> it touches the 50-SNPs/cell operating point, the 97%/92% accuracies, or the ≤64-donor pool bound.
> **No number from this source may be used load-bearing until the correction is read.** Any of them
> quoted here carries this flag forward. Also note the headline operating point is a **simulation**
> result (unrelated donors, 1000-Genomes genotypes swapped onto a real pileup); the real-data claim is
> narrower — >99% of singlets at **8** pooled donors.

[GAP: `[[kang-2018-demuxlet]]` gives **no decision rule** for choosing between genotype-based and
hashtag/antibody-barcode demultiplexing, and runs no head-to-head comparison. If genotypes do not exist,
this Mold has no sourced alternative.]

## Phase 4 — run reproducibly

Record the tool, the pinned version, the seed, and the exact invocation. What the notes actually pin:

**Allocation — designit 0.5.0** (`Date/Publication: 2024-03-21`; R ≥ 4.1.0):
```r
bc <- BatchContainer$new(dimensions = c("plate" = n_plates, "column" = 8, "row" = 6),
                         exclude = exclude_wells)
bc <- assign_random(bc, samples)
bc <- optimize_design(bc,
        scoring = osat_score_generator(batch_vars = "plate",
                                       feature_vars = c("treatment", "dose")),
        n_shuffle = c(rep(10, 200), rep(2, 400)))
bc$get_samples(remove_empty_locations = TRUE)   # the final assignment
```
Defaults that must be stated, not assumed: `max_iter = 1e4`; `acceptance_func = accept_strict_improvement`
(**hill-climb, no annealing by default**); **one pairwise swap per iteration** when both `n_shuffle` and
`shuffle_proposal_func` are NULL; `aggregate_scores_func = identity`; `check_score_variance = TRUE`;
`autoscale_scores = FALSE`; `min_delta = NA`. `bc$trace` stores `seed` and `rng_kind`. The OSAT score is
`sum((N - .n_expected)^2)` with `.n_expected = .n_samples * .freq_batch`; lower is better.

> **Do not call `optimize_multi_plate_design()` on a container not named `bc`.** In 0.5.0 the function
> binds `batch_container` but its body reads a free variable `bc`, so it will either error with
> `object 'bc' not found` or **silently optimize whatever global `bc` exists**, ignoring the container
> you passed (`[[designit]]` §9G1, read off the shipped source).

**Allocation — OSAT** (`[[yan-2012-osat]]`), the paper's own API:
```
sample    <- setup.sample(x, optimal, ...)
Container <- setup.container(plate, n, batch, ...)     # batch defaults to "plates"; "chips" available
create.optimized.setup(fun="optimal.shuffle", sample, container, ...)
```
Default optimization budget: **5000 attempts**. Objective: `V = Σ_ij (n_ij − E_ij)²`.

[GAP: `[[yan-2012-osat]]` names **no OSAT package version** (only Bioconductor release 2.11, `R >= 2.15`,
`Artistic-2.0`), gives **no default for `k`** (samples shuffled per attempt), and states **no
tie-breaking rule**. The alternative algorithm is printed both `optimal.blcok` (body) and `optimal.block`
(Table 1) — which the shipped package exports is not resolvable from the paper. `[[designit]]` records no
seed-restoration recipe despite storing the seed.]

**Adjustment / estimation — sva 3.60.0, Bioconductor 3.23** (`RELEASE_3_23`, commit `87a4798`):
```r
num.sv(dat, mod, method = c("be", "leek"), vfilter = NULL, B = 20, seed = NULL)
sva(dat, mod, mod0 = NULL, n.sv = NULL, controls = NULL,
    method = c("irw", "two-step", "supervised"), vfilter = NULL, B = 5, numSVmethod = "be")
svaseq(..., constant = 1)                          # log(dat + constant) first; counts entry point
ComBat(dat, batch, mod = NULL, par.prior = TRUE, prior.plots = FALSE,
       mean.only = FALSE, ref.batch = NULL, BPPARAM = bpparam("SerialParam"))
ComBat_seq(counts, batch, group = NULL, covar_mod = NULL, full_mod = TRUE,
           shrink = FALSE, shrink.disp = FALSE, gene.subset.n = NULL)
```
- **State which `num.sv` estimator you used.** The documented default is `"be"` (Buja–Eyuboglu
  permutation, `B = 20`), but **every worked example in both the vignette and the reference manual passes
  `method="leek"`** — and `sva()`'s internal auto-estimate (`n.sv = NULL`) uses `numSVmethod = "be"`. The
  two documented paths to `n.sv` do not use the same estimator (`[[sva]]`).
- **`ComBat` takes only one batch variable.** Its input is "assumed to be cleaned and normalized before
  batch effect removal." `ComBat_seq` takes a **raw count matrix** and returns integer counts.
- **`ComBat_seq(group = NULL)` silently fits the null model** — console detector:
  `Using null model in ComBat-seq.` The biological condition is *not* protected unless you pass it.

**Estimate → design handoff — the only recovered worked code** (`[[rnaseqgene]]`, rnaseqGene 1.36.0 /
Bioc 3.23; DESeq2 1.52.0, sva 3.60.0, RUVSeq 1.46.0):
```r
dat  <- counts(dds, normalized = TRUE); dat <- dat[rowMeans(dat) > 1, ]
mod  <- model.matrix(~ dex, colData(dds))
mod0 <- model.matrix(~ 1,   colData(dds))
svseq <- svaseq(dat, mod, mod0, n.sv = 2)      # prints: Number of significant surrogate variables is: 2
ddssva <- dds
ddssva$SV1 <- svseq$sv[,1]; ddssva$SV2 <- svseq$sv[,2]
design(ddssva) <- ~ SV1 + SV2 + dex
```
Diagnostic in the same source: `stripchart(svseq$sv[, i] ~ dds$cell, ...)` — do the estimated factors
track a real source of variation?

[GAP: `[[rnaseqgene]]` states **no numeric criterion** for "the SVs are picking up something real," and
**no rule for how many SVs to keep** (`n.sv = 2` and `k = 2` are simply chosen). `[[sva]]` gives no cap
relative to sample size and no degrees-of-freedom warning. `[[leek-storey-2007-sva]]` leaves α and B
entirely to the user and reports no value for either in its own analyses. `[[deseq2]]` is completely
silent on the number of SVs. **The number of surrogate variables is unsourced.**]

[GAP: no source gives guidance on choosing `"be"` vs `"leek"`. `[[sva]]`'s man page points to a "details
section" that does not exist.]

[GAP: `[[sva]]` contradicts itself on whether `ComBat`'s `mod` should contain the variable of interest —
prose says yes, the code passes `~1`, the man-page examples do both. **Unresolved by the source.**]

[GAP: no source in this set supplies a provenance/lockfile/container recipe. `[[rnaseqgene]]` prints
session-info package versions; that is the ceiling of what is recoverable.]

**Testing runs on raw counts.** `[[deseq2]]`, `[[msmb-chap8]]`: the model corrects for library size
internally; transformed or pre-normalized values must not be supplied. `vst`/`rlog` are for
visualization/clustering, not testing — and they **do not remove** batch variation (the design is not used
to remove variation), which is why batches survive into a post-VST PCA.

## Phase 5 — [gate]

**This Mold may not certify its own output.** Hand the following to `[[audit-batch-design-validity]]`:

- the frame (primary variable, contrast, every named technical variable, platform, moment);
- the design-review evidence (clustering/PCA/PC-vs-surrogate results; the group × batch contingency
  table; the model-matrix rank result);
- the selected method **with its citation**, and the diagnosis that justified adjusting at all;
- the exact invocation, versions, seed, and console output (including detector strings);
- the result **and the method description the referee will judge**.

Explicitly **not** a certification:

- OSAT's own χ² test of variable-vs-batch dependence. `[[yan-2012-osat]]` demonstrates p > 0.99 but
  **sets no acceptance threshold** on χ², p, or `V`. It is a diagnostic the doer reports; it is not a pass.
- designit's `check_score_variance` abort (`"Low variance scores detected! Check scores # <i>"`). It
  detects an *undiscriminating score*, not unachievable balance, and `[[designit]]` offers **no
  post-hoc diagnostic that the optimizer failed to balance**, no threshold, and no residual-imbalance
  test.
- `[[yan-2012-osat]]`, verbatim: "although the impact of batch effect on genomics study might be
  minimized through proper design and sample allocation, it may not be completely eliminated."

Terminal states are the referee's, not this Mold's: **CERTIFY**, **REVISE**, **ESCALATE**.
