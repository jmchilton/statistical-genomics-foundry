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
    load: eager
    mode: condense
    evidence: corpus-observed
    purpose: "Design vocabulary for the frame + design-review phases: experiment taxonomy, noise-vs-bias, blocking/pairing/balance/randomization ('block what you can, randomize what you cannot'), effective sample size, and the rule that data already confounded at collection cannot be rescued by any analysis."
  - kind: research
    ref: "[[msmb-chap8]]"
    used_at: runtime
    load: eager
    mode: condense
    evidence: corpus-observed
    purpose: "The design matrix carries the model's scientific content; a known nuisance factor enters as a blocking term (at a degrees-of-freedom cost); PCA/heatmap/p-value-histogram diagnostics for an unmodelled batch factor."
  - kind: research
    ref: "[[leek-2010]]"
    used_at: runtime
    load: eager
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
    purpose: "The RCBD target, the constrained-allocation objective V = Σ_ij (n_ij − E_ij)², the χ² variable-vs-batch diagnostic, and the explicit caveat that design alone cannot eliminate batch effects. NOTE: the paper states no package version and no defaults — the API and its coded nSim=100 default come from [[osat]] (the pinned package docs), not from here."
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
    load: eager
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
    load: eager
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
  - kind: research
    ref: "[[limma]]"
    used_at: runtime
    load: on-demand
    trigger: "whenever a batch-corrected/'cleaned' expression matrix is produced, or a downstream test is about to consume one"
    mode: verbatim
    evidence: corpus-observed
    verification: "SCOPE FENCE — the removeBatchEffect Note names ONLY removeBatchEffect and lmFit. Full-text check of both limma PDFs: ComBat = 0 hits, RUV = 0 hits, the sva package = 0 hits. This reference may be cited for the removeBatchEffect->lmFit prohibition ONLY. It may NOT be stretched to ComBat, ComBat_seq, RUV, or surrogate variables — that generalization remains unsourced in this corpus."
    purpose: "The one first-party, author-written ASSERTION (not mere enactment) that a batch-corrected matrix must not be fed to the downstream linear model. limma 3.68.4 reference manual, removeBatchEffect Note."
---

# separate-batch-from-biology

Keep technical variation separable from the biological variable of interest, at every point where
they could become entangled: when samples are assigned to batches, when hidden batch structure is
detected in data already collected, and when a batch adjustment is chosen. Produce a result **plus the
method description a referee will judge** — and hand off. This Mold cannot certify its own output.

## Phase 0 — stand up the toolchain

**Exact pins. Not floors.** Signatures drift *within* minor versions: `[[sva]]` — *"defaults drift across
releases; every signature is pinned to 3.60.0 and must be re-read against any other release."*
`[[designit]]`'s own NEWS removed `bc$n_available` (0.3.0) and made `$scoring_f` an error (0.5.0). A
`>=` floor would not have protected you from either.

| Tool | Pin | License | conda / biocontainer *(checked 2026-07-13)* |
|---|---|---|---|
| R | **4.6.x** | — | — |
| Bioconductor | **3.23** | — | — |
| **designit** | **0.5.0** (CRAN, 2024-03-21) | MIT | **NO — no bioconda recipe, no conda-forge feedstock (both 404) ⇒ no biocontainer** |
| OSAT | **1.60.0** (`06a9e90`) | Artistic-2.0 | `bioconductor-osat` · 18 quay tags |
| sva | **3.60.0** (`87a4798`) | Artistic-2.0 | `bioconductor-sva` · 26 quay tags |
| DESeq2 | **1.52.0** | **LGPL-3.0-or-later** (copyleft) | `bioconductor-deseq2` · 37 quay tags |
| limma | **3.68.4** (`Date` 2026-05-31) | **GPL-2.0-or-later** (copyleft) | `bioconductor-limma` · 42 quay tags |
| RUVSeq | **1.46.0** | — | `bioconductor-ruvseq` |

```r
install.packages("BiocManager")
BiocManager::install(version = "3.23")                        # the ONLY version-exact route
BiocManager::install(c("sva", "DESeq2", "limma", "OSAT", "RUVSeq"))
install.packages("designit")                                  # CRAN — NOT on bioconda (see below)

stopifnot(packageVersion("designit") == "0.5.0",              # assert the pin; never assume it
          packageVersion("sva")      == "3.60.0",
          packageVersion("OSAT")     == "1.60.0",
          packageVersion("DESeq2")   == "1.52.0")
```
**If any assertion fails, re-read the signatures against the version you actually got before running
anything. A wrong-version run is UNDETERMINED, never PASS.**

> **⚠️ The toolchain's hardest dependency is `designit` — the primary allocation tool, and the one tool
> that is not conda-packaged.** It therefore **cannot ride the bioconda → biocontainer path**; a cast
> that assumes it will fail to resolve the primary tool. Remedy, pick one and **state it**:
> 1. layer it onto a Bioconductor base image — `R -e 'install.packages("designit")'` (CRAN tarball resolves);
> 2. r-universe — `install.packages("designit", repos = c("https://bedapub.r-universe.dev", "https://cloud.r-project.org"))`;
> 3. **substitute OSAT** for allocation (bioconda- and biocontainer-resolvable; `[[designit]]`'s own OSAT
>    vignette claims numerical identity of the score) — at the cost of OSAT's `nSim` footgun. **Declare
>    the swap; never make it silently.**
>
> **⚠️ bioconda cannot deliver these pins today** (checked): its latest are sva **3.58.0**, OSAT
> **1.58.0**, DESeq2 **1.50.2**, limma **3.66.0** — **one Bioconductor release below every pin above.**
> A doer that says "install from bioconda" and then quotes 3.60.0 signatures is asserting a pin it did
> not get. Use `BiocManager::install(version = "3.23")`, and report the route actually taken.

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

**Allocation — OSAT 1.60.0** (Bioconductor 3.23, commit `06a9e90`, 2026-04-28; Artistic-2.0) —
signatures from `[[osat]]` (the pinned package), **not** from the 2012 paper:
```r
setup.sample(x, optimal, strata)                                # strata OPTIONAL — silently defaults to optimal[1]
setup.container(plate, n, batch = "plates", exclude = NULL)     # "plates" | "chips"
create.optimized.setup(fun = "default", sample, container, ...) # nSim rides in `...` — it is NOT a formal
optimal.shuffle(x, nSim = 100, k = 2)                           # hill-climb from one blocked setup
optimal.block(x, nSim = 100)                                    # best-of-nSim independent candidates
```
Objective: `V = Σ_il (n_il − E*_il)²` — literally `optValue[i] <- sum((oCountObs - oCount)^2)`.

> **⚠️ The coded default is `nSim = 100`, NOT 5000.** (The blind pair inherited "5000" from the 2012
> paper, which states no defaults at all — a plausible-but-wrong operational number, corrected here from
> the shipped package.) Every worked example in OSAT carries the authors' own comment verbatim —
> `# demonstration only. nSim=5000 or more are commonly used.` — and the vignette says *"usually in the
> tens of thousands."* **The default is 50×–1000× below the package's own recommendation, and
> `create.optimized.setup()` has no `nSim` formal, so omitting it silently inherits 100 with no warning.**
> **Always pass `nSim` (≥ 5000) and `fun` explicitly.** The artifact self-reports: `length(gSetup@metadata$optValue)`
> **is** `nSim`, and `gSetup@metadata$optimalFunction` names the optimizer that actually ran — so the
> referee can recover the real budget regardless of what the doer claims.
>
> **Spelling settled:** the export is **`optimal.block`** (NAMESPACE, man topic, `See Also`, the
> `fun="optimal.block"` string). `optimal.blcok` is a **prose typo that survives into the rendered 1.60.0
> vignette** (§3.2) — it appears once, in prose, nowhere in code. `do.call("optimal.blcok", …)` errors.
>
> **`strata` defaults to `optimal[1]`** — `setup.sample(pheno, optimal = c("SampleType","Race","AgeGrp"))`
> blocks on **`SampleType` only**, contrary to the vignette's own narrative. **Pass `strata` explicitly.**
>
> **`setup.container(exclude=)` appears to be dropped** — the inner `gContainer()` call hard-codes
> `exclude = NULL` (`[[osat]]`, `[summarizer-inferred]`, flagged for live verification). Use the
> `exclude<-` replacement method and **verify** by printing the container (`There are N wells excluded.`).
> Do not assume reserved QC wells were honoured.

[GAP: `[[osat]]` states **no tie-breaking rule**. `nSim` is a **budget, not a stopping rule** — there is
no convergence criterion (the package's own admission is `%`-commented out of the vignette source and
never reaches a reader). `[[designit]]` stores `seed`/`rng_kind` in `bc$trace` but **no source shows a
restore recipe** — seeding + recording is the ceiling.]

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

[GAP: **no source gives a rule for choosing `"be"` vs `"leek"`.** `[[sva]]`'s man page points to a
"details section" that does not exist; `[[leek-2011-asymptotic-csvd]]` states no criterion for preferring
one estimator over the other. **The package contradicts itself** — `num.sv()` documents `"be"` as the
default, every worked example passes `"leek"`, and `sva()`'s internal auto-estimate uses `"be"`. Any rule
stated here would be invention. **Always pass `method =` explicitly and report which you used.**
Recovered mechanics (so the choice is at least *informed*, not blind):
- **`"leek"`** = `[[leek-2011-asymptotic-csvd]]`'s asymptotic estimator, `r̂ = Σ_k 1{λ_k(W_m) ≥ c_m}`,
  `c_m = a·m^(−η)`. **It is NOT a permutation test — it performs zero permutations, produces no
  p-values, and is deterministic** (so it needs no seed).
- **`"be"`** = Buja–Eyuboglu row-permutation, `B = 20`, **stochastic ⇒ seed it or it is not reproducible.**]

## Determinism — three stochastic steps, each seeded and each reported

1. **designit `optimize_design()`** — the initial assignment and every pairwise swap draw from R's RNG.
   `set.seed()` **before** the first call. Report `bc$trace$seed`, `bc$trace$rng_kind`, `bc$trace$call`.
2. **OSAT `create.optimized.setup()` / `optimal.shuffle()` / `optimal.block()`** — block randomization
   *and* the swap loop are random. `[[osat]]` does it explicitly: `set.seed(123)  # to create reproducible result`.
   Report the seed **and `nSim`**.
3. **`num.sv(method = "be")`** — permutation-based (`B = 20`), takes `seed = NULL`; **an unseeded `be`
   run is not reproducible.** `sva()`/`svaseq()` have **no `seed` formal at all**, and when `n.sv = NULL`
   they auto-estimate via `"be"` — so either seed the calling environment **or** pass `n.sv` explicitly
   (as `[[rnaseqgene]]` does: `n.sv = 2`) and take the stochastic estimator out of the path entirely.

[GAP: `[[sva]]` contradicts itself on whether `ComBat`'s `mod` should contain the variable of interest —
prose says yes, the code passes `~1`, the man-page examples do both. **Unresolved by the source.**]

## Provenance block — emit this with every run

The tools ship run-level provenance; **nothing in the corpus supplies a lockfile or container recipe** —
that remains **convention**: label it, do not cite it.

**Environment**
- `sessionInfo()` in full (`[[rnaseqgene]]` prints exactly this — the ceiling of what is recoverable).
- The Phase-0 `packageVersion(...) == pin` assertions and their results.
- **The install route actually taken** (BiocManager 3.23 / bioconda / r-universe / CRAN) — the routes
  deliver *different versions*, so the route is part of the claim.

**Invocation** — every call with **every contested default written out explicitly**:
`method=` (`num.sv`), `nSim=` / `fun=` / `strata=` (OSAT), `n.sv=` (`svaseq`), `group=` (`ComBat_seq`).

**Seeds** — the `set.seed()` value and its position relative to each stochastic call;
designit `bc$trace$seed` + `rng_kind`; OSAT `gSetup@metadata$optimalFunction` and
`gSetup@metadata$optValue` (**its length IS `nSim`** — the budget is auditable straight from the artifact).

**Console strings — captured verbatim, never paraphrased** (these are the referee's detectors):
- `Using default optimization method: optimal.shuffle` — fired ⇒ `fun` was omitted
- `Using full model in ComBat-seq.` / `Using null model in ComBat-seq.` — the biology-protected detector
- `sva warning: controls provided so supervised sva is being performed.`
- `Number of significant surrogate variables is: N`
- `the model matrix is not full rank, so the model cannot be fit as specified.`
- `NAs in features / batch columns; they will be excluded from scoring` — designit; **fires only on
  iteration 1**, so check for NAs *before* scoring
- `Low variance scores detected! Check scores # <i>` — designit's zero-variance abort

**Artifact traceability** — the declared input container/sample set, and proof the returned assignment
derives from it (see the `optimize_multi_plate_design` free-variable bug).

**Testing runs on raw counts.** `[[deseq2]]`, `[[msmb-chap8]]`: the model corrects for library size
internally; transformed or pre-normalized values must not be supplied. `vst`/`rlog` are for
visualization/clustering, not testing — and they **do not remove** batch variation (the design is not used
to remove variation), which is why batches survive into a post-VST PCA.

### A corrected matrix is a *plot*, not a test input — and here is the one source that SAYS so

`[[limma]]` 3.68.4, `removeBatchEffect` **Note**, verbatim (GPL-2.0-or-later; quoted with license notice):

> "This function is intended for plotting and data exploration purposes. This function is not intended
> to be used to prepare data for linear modeling by lmFit. For linear modeling, it is better to include
> the batch factors in the linear model so that lmFit can correctly assess the standard errors of the
> linear model parameters."

The quantity claimed to go wrong is **the standard errors of the linear-model parameters** — an
inference/SE argument, **not** a claim of biased coefficients or fold-changes. Phrase the rule that way.

> **⚠️ SCOPE FENCE — do not stretch this.** The Note names exactly `removeBatchEffect` and `lmFit`.
> Checked across both limma PDFs: **ComBat = 0 hits, RUV = 0 hits, the `sva` package = 0 hits.** limma's
> own SV function (`wsva`) carries **no Note and no warning**. And `removeBatchEffect`'s `design` defaults
> to an intercept column — which the docs say implies the experiment is **one group**, i.e. calling
> `removeBatchEffect(x, batch=b)` with no `design`/`group` **protects nothing** from the correction.
>
> [GAP: **the same prohibition for surrogate variables is STILL UNSOURCED.** `[[rnaseqgene]]`,
> `[[deseq2]]` and `[[sva]]` only *enact* the covariates-in-design route by example; none *asserts* that
> an SV-residualized matrix must not be tested — and `[[sva]]`'s own §7 runs `f.pvalue()` on a
> ComBat-corrected matrix **without comment**. `[[nygaard-2016]]` asserts it for ComBat-style adjustment
> on **microarrays** only. A referee may cite limma for `removeBatchEffect`, and Nygaard for ComBat —
> and must NOT generalize either to SVs.]

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
