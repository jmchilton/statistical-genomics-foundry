# Scenarios — audit-batch-design-validity

Each case binds a **specific doer configuration** and **its actual output**; the audit consumes that and
must return the stated verdict. **Planted-invalid** = a deliberately mis-configured doer run.
**Clean control** = a correct run that must PASS. A referee that flags everything is a constant function —
the clean controls are what prove it isn't.

Fixture line on every case: **size / license / ground truth / role**.

Two fixture kinds, both legitimate for a referee (whose input is a *report*, not a matrix):
- **runnable** — the referee (or its Calibrate step) can re-execute the analysis;
- **reported-analysis** — the stimulus is a published run with published numbers; the referee judges the
  report. Marked `[reported-analysis]`. These cannot be re-executed; where a Calibrate pass is impossible,
  the verdict may not be CERTIFY.

---

## Case: PLANTED-INVALID — aliased design, "corrected" by dropping batch
- fixture: **Doer config.** `colData`: `condition = c(A,A,A,B,B,B)`, `batch = factor(c(1,1,1,2,2,2))`.
  DESeq2 1.52.0. `design = ~ batch + condition` → `model.matrix` has **3 columns**, `qr()$rank` = **2**;
  `DESeq()` emits `the model matrix is not full rank, so the model cannot be fit as specified.` The doer
  then **drops batch**, re-specifies `~ condition`, runs `DESeq()`, and reports the results.
  **Doer output:** a table of significant genes + "batch was confounded with condition so it was removed
  from the model; the condition effect is reported."
  *(size: 6 rows, **no data at all** / unrestricted / ground truth: **rank 2 < 3 — arithmetic** /
  role: planted-invalid · runnable)*
- expect: **CAUGHT — Axis 1. FAIL → ESCALATE.** There is no way to separate condition effects from batch
  effects. The referee cites `[[deseq2]]`'s two options (assume no batch effect — which the source deems
  highly unlikely — or rerun with conditions balanced across batches), and refuses to certify. Dropping
  batch is what DESeq2 says you must *mechanically* do; it is **not** a resolution, and the referee must
  say so. It must **not** suggest ComBat / ComBat_seq / sva / svaseq. Verdict must not be REVISE.
  *This is the cheapest real test that exists in this corpus. If it costs more than a second, something is
  wrong.*

## Case: PLANTED-INVALID — the same design, "corrected" with ComBat_seq  *(the cardinal sin)*
- fixture: **Doer config.** Same aliased colData. `ComBat_seq(counts = cts, batch = batch,
  group = condition)` → adjusted integer counts → fresh `DESeqDataSet` with `design = ~ condition` →
  `DESeq()`. **Doer output:** an adjusted count matrix + a results table + "batch effects were removed with
  ComBat-seq prior to testing."
  *(size: 6 samples / unrestricted / ground truth: **rank 2 — the confound is arithmetic, so there is
  nothing for γ_gi to estimate that is not the condition effect** / role: planted-invalid · runnable)*
- expect: **CAUGHT — Axis 1 (FAIL → ESCALATE), reinforced by Axis 3 and Axis 6.**
  `[[zhang-2020-combat-seq]]`'s own Discussion: the gene-wise NB GLM "may not work well on data with
  severely or even completely confounded study designs." The integer-preserving output is a claim about
  **format**, not calibration, and the referee must not read it as evidence of validity.
  *This is the cardinal sin instantiated. If it passes, the Mold is worthless.*

## Case: CLEAN CONTROL — batch known and modelled; a published endpoint reproduced
- fixture: **Doer config.** `airway` (`[[rnaseqgene]]`): 8 samples, 4 cell lines × (untrt, trt),
  dexamethasone 1 µM / 18 h, GEO **GSE52778**. DESeq2 **1.52.0**, Bioconductor **3.23**. Pre-filter
  `keep <- rowSums(counts(dds) >= 10) >= 4` → **16637** rows. `design = ~ cell + dex`.
  **Doer output:** at adjusted p < 0.1 — up **2362 (14%)**, down **2019 (12%)**, outliers **0**, low counts
  **646 (3.9%)**; no adjusted matrix; design table + versions + invocation supplied.
  *(size: 8 samples, seconds / unrestricted: GEO + Bioconductor data package / ground truth: **a published,
  reproducible endpoint** / role: **clean control** · runnable)*
- expect: **PASS on every axis. CERTIFY.** Axis 1: full rank (`model.matrix(~cell+dex)` = 5 columns,
  rank 5 — each cell line carries both conditions). Axis 2: does not fire — the adjustment is a model term,
  not a data edit. Axis 3: nothing was transformed, so the diagnose-first obligation does not arise.
  Axis 6: not applicable. **Calibrate (mandatory for CERTIFY):** the p-value histogram — uniform background
  plus a left peak (`[[msmb-chap8]]`); and the referee can independently re-derive 2362/2019.
  A referee that flags this run has failed `three-legs-required`.

## Case: PLANTED-INVALID — known-ZERO truth: correct-then-test on a 5:1 split
- fixture: **Doer config.** `[[nygaard-2016]]`'s null-data simulation, **fully constructible, no external
  data**: **20 000 genes** drawn **N(0,1)**, a batch effect on **10%** of them, **two batches**, group split
  **5:1**, design retained; **ComBat with group as covariate**; then an **F-test ignoring batch**.
  **Doer output:** a list of "significant" genes and a claim that batch effects were removed.
  *(size: 20 000 × 12, instant / unrestricted: **pure simulation, no data licence** / ground truth:
  **TRUE DE = ZERO, by construction; null p-values must be Uniform(0,1)** / role: planted-invalid · runnable)*
- expect: **CAUGHT — Axis 2. FAIL → REVISE.** All three legs present. The referee names the mechanism (the
  batch-effect estimation error is applied as a point estimate across each batch and then dropped downstream
  → deflated variance → inflated F), states the exact no-inflation condition it violates
  (`n_iA : n_iB = n_A : n_B` for all batches i), and routes to the endorsed remedy: **account for batch in
  the statistical analysis**. **Calibrate is trivially decisive here: every discovery is a known false
  positive.** `[[leek-storey-2007-sva]]`: null p-values are Uniform iff the null was correctly calculated.
  Route: **REVISE**, not ESCALATE — this design is analyzable, just not this way.

## Case: CLEAN CONTROL — the same simulation, balanced
- fixture: **Doer config.** Identical, but each batch reproduces the overall group ratio (n = 12, two batches
  of 6, **3:3** in each). Same pipeline: ComBat with group as covariate, then a test ignoring batch.
  *(size/licence as above / ground truth: **ZERO true DE; Jensen's equality holds (ν₀ = ν) ⇒ Uniform
  p-values, no F inflation** / role: **clean control** · runnable)*
- expect: **PASS on Axis 2.** `[[nygaard-2016]]`, verbatim: "In a balanced group–batch design, the
  estimation error has the same effect for all groups, and thus does not influence group comparisons."
  Axis 6 still returns **FLAG → Calibrate** (a corrected matrix was tested on); **the null-data replay is
  what clears it**, and it clears it *empirically*, on data whose truth is zero. A referee that FAILs this
  case has failed `three-legs-required`; a referee that CERTIFYs it **without running the calibrate pass**
  has failed `calibrate-required-for-certify`.

## Case: PLANTED-INVALID — the inflation is blamed on sample size
- fixture: **Doer config.** The same null-data check on the same unbalanced (5:1) design, swept at
  **n = 12, 120, 1200**. **Doer output:** inflated F and non-uniform p-values at all three sizes; doer's
  note: "the inflation reflects the small sample size and will resolve with more samples."
  *(size: the n=1200 arm is ~24M doubles — run it / unrestricted / ground truth: **the inflation factor is
  flat across n** / role: planted-invalid · runnable)*
- expect: **CAUGHT.** `[[nygaard-2016]]`, verbatim: F-statistics are "inflated by a fixed factor which
  depends on the unevenness of the design, **rather than the size of the sample or batches**." The doer's
  explanation is **wrong on a matter of fact**, and the referee must name it as wrong, not merely hedge.
  Property: `inflation-is-scale-invariant`.

## Case: PLANTED-INVALID — real-data correct-then-test  `[reported-analysis, stageable]`
- fixture: **Doer config.** `[[nygaard-2016]]` Experiment 1 (Towfic et al., Copaxone vs. generic Glatimer):
  GEO **GSE40566**; Copaxone 34 / Glatimer 11 / 14 other treatments 60; batch = Illumina **WG-6_V2** chip,
  **6 samples/chip, 17 chips**; "several batches having only one of the main treatments of interest."
  Doer runs **ComBat with group as covariate**, then limma **ignoring batch**.
  **Doer output:** **2011** differentially expressed genes at **5% FDR**.
  *(size: 102 microarrays — a real download, minutes not hours / unrestricted: **public GEO accession** /
  ground truth: **the batch-blocked comparison arm — 11 genes** / role: planted-invalid · runnable if staged)*
- expect: **CAUGHT — Axis 2. FAIL → REVISE.** Comparison arm the referee cites: limma **blocking for batch**
  on the same data → **11** genes. Two orders of magnitude. Route: **REVISE** — account for batch in the
  analysis.
  [CARRY FORWARD: `[[nygaard-2016]]` records a preprocessing caveat — the original authors used a different
  preprocessing (**GSE61901**, two technical replicates per sample) which "strongly influences results
  regardless of batch adjustment." The 2011-vs-11 contrast is Nygaard's reanalysis, not a clean two-arm
  experiment. The referee must not present it as one.]
  [Nygaard Experiment 2 (30 samples, 3 batches, treatment/control **6/2, 3/4, 9/6**; ComBat+limma **1003**
  probes vs limma-blocked **377**) is a second instance of the same finding, but the note records **no
  accession** for the ComBat paper's "Data set 2" — it is `[reported-analysis]` only, **not stageable**.]

## Case: PLANTED-INVALID — ComBat-seq applied when the batch effect is mean-only
- fixture: **Doer config.** polyester (`[[zhang-2020-combat-seq]]`'s own setup): **918 genes**,
  **2 conditions × 2 batches**, biological signal **2-fold**, **mean batch effect 1.5×**, **no dispersion
  difference**, **300 replicate simulations**. `ComBat_seq(counts, batch, group)` → DESeq2, with **no prior
  diagnosis** of whether the batch effect has a dispersion component.
  **Doer output:** an adjusted matrix + DE calls; measured **FPR 0.059–0.067**.
  *(size: 918 genes — tiny / unrestricted: parameters fully specified; polyester is Bioconductor
  [verify licence] / ground truth: **the planted DE set is known; the source's own FPR/TPR arms are
  published** / role: planted-invalid · runnable)*
- expect: **CAUGHT — Axis 3. FAIL → REVISE.** With no true dispersion difference, ComBat-seq's
  separate-dispersion model is redundant and raises false positives: **FPR 0.059–0.067** vs nominal 0.05,
  **no gain in TPR**, while every other method holds FPR < 0.05. Reference arm: no batch effect at all ⇒
  **FPR 0.048, TPR 0.96**. Prescription: **the one-step batch-as-covariate approach**. The referee must also
  FLAG the **missing diagnosis** (adjust only when batch effects are present and harmful).
  [GAP — staging: the per-group sample size of the simulation is not in the note (Supp. Fig. S2, unread).
  Pin from the ComBat-seq repo; do not guess.]

## Case: CLEAN CONTROL — ComBat-seq under a real dispersion difference
- fixture: **Doer config.** Same polyester setup, **no mean batch effect**, **3-fold dispersion batch
  effect**. Doer diagnoses the dispersion difference, then runs `ComBat_seq()`.
  **Doer output:** adjusted counts + DE calls; **FPR 0.039**.
  *(size/licence as above / ground truth: **ComBat-seq is the most conservative arm at 3× dispersion —
  FPR 0.039 vs covariate 0.043, RUV 0.044, ComBat-logCPM 0.046, SVA-seq 0.049; TPR 0.89 in the realistic
  1.5× mean / 2× dispersion regime** / role: **clean control** · runnable)*
- expect: **PASS on Axis 3. CERTIFY** (with the calibrate arm recorded). This is the regime ComBat-seq was
  built for, and the diagnosis was run. *A referee that flags every ComBat-seq run has failed — this is the
  Axis-3 twin of `three-legs-required`, and without it Axis 3 has no control at all.*

## Case: PLANTED-INVALID — ComBat_seq run with `group = NULL`
- fixture: **Doer config.** `ComBat_seq(counts = cts, batch = batch)` on a case/control study, then DESeq2
  on the adjusted matrix. **Doer output:** the adjusted matrix + the console transcript containing
  `Found 2 batches` / **`Using null model in ComBat-seq.`** / `Adjusting for 0 covariate(s) or covariate
  level(s)`.
  *(size: any / unrestricted / ground truth: **a literal console string** / role: planted-invalid · runnable)*
- expect: **CAUGHT — Axis 3. FAIL → REVISE.** The detector is the **literal string**, not an inference:
  `group = NULL` ⇒ the null model ⇒ **the biological condition is silently not protected** (`[[sva]]`).
  The referee must find it **in the transcript**. Route: REVISE (rerun with `group = condition`).

## Case: PLANTED-INVALID — the surrogate variables ate the biology (known referent)
- fixture: **Doer config.** `airway` with the cell line withheld. The doer runs
  `sva(dat, mod = model.matrix(~1, colData(dds)), mod0 = model.matrix(~1, colData(dds)), n.sv = 2)` —
  **nothing biological protected in `mod`** — regresses the SVs out of the matrix, and tests `dex` on the
  residuals. **Doer output:** SVs; a DE list; "latent technical variation was removed prior to testing."
  *(size: 8 samples / unrestricted / ground truth: **the correct run's endpoint — 2362 up / 2019 down at
  padj<0.1 (`[[rnaseqgene]]`)** / role: planted-invalid · runnable)*
- expect: **CAUGHT — Axis 4 (FAIL), reinforced by Axis 6.** `[[sva]]` §10, verbatim: "If the goal of the
  analysis is to identify heterogeneity in one or more subgroups, the sva function may not be appropriate…
  one or more of the estimated surrogate variables may be **very highly correlated with subgroup**."
  **Calibrate:** correlate each SV against `dex` and against the withheld `cell` (`[[rnaseqgene]]`'s
  stripchart idiom) — and compare the DE calls against the **known reference endpoint**. Placement check:
  every worked example in the corpus puts estimated factors in the **design**, never subtracts them.
  [GAP: the source names **no correlation threshold**. Report the correlation; do not mint a cutoff.]
  [GAP: the exact DE counts of the broken run are in no note — record once at staging, do not guess.]

## Case: HONESTY CONTROL — `sva()` called on a raw count matrix
- fixture: **Doer config.** `sva(counts(dds), mod, mod0)` — `sva()`, not `svaseq()` — on raw integer counts;
  SVs then added to the DESeq2 design. **Doer output:** SVs; an augmented design; a results table.
  *(size: any / unrestricted / ground truth: **the source's stated division of labour — and its silence** /
  role: **over-read control**)*
- expect: **FLAG, not FAIL.** The referee notes the departure from `[[sva]]`'s stated division of labour
  (counts → `svaseq`) and routes to Calibrate. It must **not** assert that the p-values are invalid, that
  the run errored, or that any specific symptom appears: **the source never states that calling `sva()` on
  counts is an error, and names no failure mode for it.** A referee that hard-FAILs here has failed
  `over-read-guard`. *This case exists to catch over-eager refereeing — the failure mode a
  planted-invalid-only scenario set cannot detect.*

## Case: PLANTED-INVALID — real-data KNOWN FALSE POSITIVES a fold-change cutoff cannot catch
- fixture: **Doer config.** Multibatch TMT proteomics (`[[brenes-2019-multibatch-tmt]]`): **21 TMT 10-plex
  batches**, iPSC lines from **male and female donors**, MaxQuant v1.6.3.3, reporter-ion MS3.
  The doer integrates the batches, applies **a fold-change cutoff** to call differential proteins, and
  reports "changes above the fold-change threshold are biologically real; the within-batch CV is 1.72, so
  quantification is precise." **Doer output:** a differential list + the within-batch CV as its evidence.
  **The known-truth probe the doer never ran:** the **65 unique Y-chromosome-encoded peptides** (from
  CDY1, CDY2A, DDX3Y, EIF1AY, KDM5D, NLGN4Y, PCDH11Y, RPS4Y1, TBL1Y, USP9Y, UTY) across the 21 batches.
  *(size: the derived probe table is **65 peptides × 21 batches × 10 channels** — trivial; but it must be
  built once from PRIDE **PXD010557**'s MaxQuant output, which is a real staging cost / licence: **paper is
  CC-BY-4.0**; the note does **not** record the licence of the PRIDE deposit → **[verify at staging]** /
  ground truth: **Y-chromosome peptides physically cannot be expressed in female-derived lines, so every
  Y-peptide signal in a female channel is a KNOWN false positive — no external spike-in needed** /
  role: planted-invalid · runnable after staging)*
- expect: **CAUGHT.** The referee demands the **known-absent-analyte negative control** (Calibrate C5) and
  finds the doer's evidence does not survive it:
  - **Median 89%** of the Y-peptides quantified in each batch were also "quantified" in channels containing
    **female** cell lines; **every** female channel in **every** one of the 21 batches shows **>40%**;
    worst case **97.5%** (batch PT6380, only 2 male channels of 10). Every one of those calls is *known*
    wrong. [V6]
  - **A fold-change cutoff cannot separate them.** [V5], verbatim: "for both 'primary RII' and 'double RII'
    the false positives are within the 8-fold increase/decrease range for bona fide changes in
    protein/peptide expression levels often detected within proteomic data sets." **The doer's entire
    filtering strategy is refuted by the source's own measurement.**
  - **Within-batch precision does not license cross-batch comparison.** Within-batch median protein CV
    **1.72** / Lin's concordance **98%**; across batches, on the *same technical replicate*, CV **11.03**
    (6.4×) / concordance **81%**; **>80% of proteins** in the technical replicates would be within-batch
    outliers. Citing within-batch CV as evidence of cross-batch accuracy **is** the invalidity pattern.
  - Batch effect **exceeded the biology** in this dataset (batch PT6390's within-batch CV was ~10× lower
    than the cross-batch technical-replicate CV, across healthy-vs-rare-genetic-disease lines).
  Route: **REVISE** (reference sample in every batch at 126C/127N; interference-aware channel layout).
  [GAP: `[[brenes-2019-multibatch-tmt]]` **never runs a hypothesis test** — zero occurrences of `t-test`,
  `p-value`, `limma`, `ComBat`, `linear model`, `regression`. It supports the false-positive finding and
  the design rules; it is **silent** on whether reference-normalized values may be tested without further
  batch modelling. The referee must not fill that silence in either direction.]
  [GAP: the source claims **no** generalization beyond TMT/isobaric labelling. Do not transfer the RII/CII
  mechanism to RNA-seq.]
- **Requires a reference-manifest addition** — see the staging list.

## Case: PLANTED-INVALID — grouped TMT channel layout (data-free, mechanically checkable)
- fixture: **Doer config.** 10-plex TMT, 2 conditions × 5 replicates, **grouped 5–5** across channels
  126 / 127N / 127C / 128N / 128C / 129N / 129C / 130N / 130C / 131; reference sample placed at **131N**.
  **Doer output:** the layout, with "conditions are grouped for clarity of downstream comparison."
  *(size: **a 10-row table — no data** / unrestricted: CC-BY-4.0 / ground truth: **Table I's interference
  adjacency map** / role: planted-invalid · runnable in seconds)*
- expect: **CAUGHT.** From Table I, primary RII sends channel *i* → *i+2* and secondary RII sends *i* → *i−2*
  in the printed channel order. The grouped layout therefore puts **multiple channels under cross-condition
  primary + secondary RII** — [V2], verbatim. And the reference at **131N** is exactly what [V1] warns
  against ("placing the reference line at channel 131N, or 131C increases the impact of reporter ion
  interference by exposing them to 'primary RII'"). Route: **REVISE** — alternate the conditions across the
  10 channels; move the reference to **126C or 127N**.
  *(Derived, marked: on the ±2 adjacency, the alternating layout puts every interference pair inside one
  condition ⇒ cross-condition RII is exactly **zero**. The source asserts the alternating design is
  RII-free; it does not print the count, so the count is ours, not theirs.)*

## Case: CLEAN CONTROL — the alternating TMT layout, reference at 126C
- fixture: **Doer config.** The same 10-plex, conditions **alternating**, reference sample at **126C**.
  *(ground truth: **zero cross-condition primary/secondary RII** / role: **clean control**)*
- expect: **PASS on the layout axis** — this is the source's own optimal design [V1][V2]. A referee that
  flags it has failed.

## Case: PLANTED-INVALID — confounded processing, and the same RNA proves it  `[reported-analysis]`
- fixture: **Doer config.** `[[yang-2008-randomization]]`: **the identical 16 mouse-kidney RNA samples**
  (4 strains × 2 sexes × 2 replicates) processed at **5 centers** on Affymetrix Mouse **430v2** (80 arrays).
  The doer analyses **center 2**'s data, where **male arrays were stored at 4 °C while the female samples
  were washed and stained** — wash/stain batch is confounded with **sex**. RMA per center; per-gene GLM with
  main effects for sex and strain; Fs statistic; q-value.
  **Doer output:** **18 910** sex-DE genes at q<0.05, reported as biology; "RMA normalization was applied,
  so batch effects are removed."
  *(size: 16 arrays per center — but **no GEO accession exists**: the article "names no GEO/ArrayExpress
  accession and contains no data-availability statement" ⇒ **NOT stageable as data**; it is a
  reported-analysis fixture only / licence: paper CC-BY (unversioned as printed) / ground truth: **the same
  RNA was processed at every center, so the underlying biology is identical by construction — the
  between-center difference in list length is necessarily technical**; the randomized center's comparison
  arm is **6 360** sex-DE genes at q<0.05 / role: planted-invalid · reported-analysis)*
- expect: **CAUGHT. FAIL → ESCALATE** (the confounding is in the collected data; no analysis repairs it —
  `[[msmb-chap13]]`, `[[leek-2010]]`). The referee's evidence, all recoverable from the report:
  - **The comparison arm.** Center 1 **randomized** samples before processing → **6 360** sex-DE genes at
    q<0.05. Centers 2 and 3, which confounded wash/stain with sex → **18 910** and **17 475**. Same RNA.
  - **π₀ collapse.** At the strain-confounded centers (4 and 5, hybridization day ↔ strain) π₀ = **0.42** and
    **0.43** (vs **0.95–0.99** elsewhere) — implying **~58% of all genes are DE by strain** in a
    chromosome-substitution strain. Named symptom: an implausibly low π₀.
  - **The internal fingerprint.** A short *within*-batch contrast beside a long *across*-batch contrast for
    the same factor: center 4's within-day B-vs-A1 = **458** and A6-vs-A15 = **313**, against the across-day
    B-vs-A6 = **1206** (center 1: 119).
  - **"Normalization removed it" is false.** Joint RMA across all 80 arrays "reduced the overall intensity
    differences but created an even **greater** difference in MAD distributions" for the confounded centers.
    `[[leek-2010]]`: normalization does not remove batch effects.
  - **Correction cannot rescue it**, verbatim: "when a batch effect is confounded with an experimental
    factor, correcting for the batch will also effectively remove the biological signal."
  [GAP: the paper **does not quantify the artifact fraction** — "[i]t does not guarantee that the lists are
  biological in origin." The referee must not claim "N of the 18 910 are false." The recoverable truth is
  the *comparison* and the *direction*, not a count of false positives.]
  [GAP: the source is a **hard silence** on run order / within-run position / temporal drift. It supports
  randomized **batch membership** and nothing more. Do not stretch it.]

## Case: PLANTED-INVALID — the allocation does not trace to its input
- fixture: **Doer config.** designit **0.5.0**:
  ```r
  my_bc <- BatchContainer$new(dimensions = c("plate" = 2, "column" = 5, "row" = 6))
  my_bc <- assign_random(my_bc, samples)
  out   <- optimize_multi_plate_design(my_bc, across_plates_variables = "Group",
                                       within_plate_variables  = "Group")
  ```
  **Doer output:** either `object 'bc' not found`, or — if a `bc` exists in the global environment —
  **a container optimized from that stale `bc`**, reported as the final assignment.
  *(size: seconds / unrestricted: **MIT** / ground truth: **deterministic — the bug is in the shipped 0.5.0
  source** / role: planted-invalid · runnable)*
- expect: **CAUGHT — provenance. FAIL → REVISE.** `[[designit]]` §9G1: the function binds `batch_container`
  but its body reads a free variable `bc`. The referee must verify the returned assignment derives from the
  **declared** input and must not certify an allocation on the strength of its balance alone. The shipped
  vignettes all name their container `bc`, which masks the bug — the referee must not be masked by it.

## Case: PLANTED-INVALID — a random allocation, certified as balanced
- fixture: **Doer config.** designit **0.5.0**; **`set.seed(17)`**; **31 grouped subjects** into **3
  batches**; `assign_random()`; **no `optimize_design()`**. **Doer output:** the assignment + "subjects were
  randomized across batches, so the design is balanced."
  *(size: 31 rows / unrestricted: MIT / ground truth: **seeded, exactly reproducible — the package's own
  shipped counter-example (`# gives 'bad' random assignment`)** / role: planted-invalid · runnable)*
- expect: **CAUGHT. FAIL → REVISE (re-allocate).** `[[designit]]`: "Often sample sizes are too small to
  avoid grouping by chance." `[[yan-2012-osat]]`: complete randomization on unbalanced/incomplete
  collections leaves variables statistically dependent on batches — their arm, **χ² p = 0.021 / 0.014 /
  0.005**. Calibrate: recompute the χ² of each variable against batch and compare to the
  complete-randomization arm. Route: **REVISE** — pre-run, and fixable.
  [GAP — staging: the note pins the seed, N=31 and 3 batches, but **not the vignette's data object or its
  grouping column**. Pin them from designit 0.5.0's vignettes and record the seeded assignment's χ² here.]

## Case: CLEAN CONTROL — a constrained allocation, reported as evidence  `[reported-analysis]`
- fixture: **Doer config.** 576 samples; `SampleType` (case/control), `Race`, `AgeGrp`, none balanced; OSAT
  `create.optimized.setup(fun = "optimal.shuffle", sample, container, nSim = 5000)` — **nSim passed
  explicitly, because OSAT 1.60.0's coded default is 100, not 5000** (`[[osat]]`) —
  blocking all three variables. **Doer output:** the assignment, the per-variable χ² of variable-vs-batch,
  and an explicit statement that **no acceptance threshold exists** for these values — handed to the gate.
  *(size: 576 rows / licence: OSAT is Artistic-2.0, but **the exemplary dataset's marginals live in the
  paper's Additional file 1, which the note records as NOT READ** ⇒ **the input is not reconstructible; this
  is a reported-analysis fixture, not a runnable one** / ground truth: the source's published values /
  role: **clean control** · reported-analysis)*
- expect: **PASS on Axes 1–3.** Reference values (`[[yan-2012-osat]]` Table 1): default algorithm
  χ² = **0.203 / 0.238 / 0.814**, all **p > 0.99**; blocking only the primary variable drives its χ² down
  (**0.035** vs 0.203) but raises the confounders' (**Race 3.685** vs 0.238; **Age_grp 5.081** vs 0.814).
  The referee **must not** certify on the strength of p > 0.99 — the source sets **no** acceptance threshold
  on χ², p, or `V`. It may certify only on the **negative-control comparison** (complete randomization:
  p = 0.021 / 0.014 / 0.005) plus full rank. A referee that invents "p > 0.05 ⇒ balanced" has failed
  `no-invented-threshold`.
  [Because this is reported-analysis, no Calibrate pass can be *executed* on it; the negative-control
  comparison is the only empirical arm available, and the verdict must record that.]

## Case: SELECTION — only part of the cohort was assayed  `[reported-analysis]`
- fixture: **Doer config.** A birth cohort of **14 541** pregnancies; **1018** mother–offspring pairs
  selected for profiling **on availability of DNA at two time points for the mother and three for the
  offspring** (ALSPAC → the ARIES sub-study). The doer analyses the association between a smoking genetic
  risk score and maternal education **within the selected sub-sample**.
  **Doer output:** OR **1.20 (1.02–1.41), P = 0.03** — reported as an association.
  *(size: n/a / **licence: ALSPAC is access-controlled — the DATA CANNOT BE STAGED**; the published report
  can / ground truth: **the same association in the FULL cohort is null — OR 1.01 (0.95–1.08), P = 0.74** /
  role: planted-invalid · reported-analysis)*
- expect: **CAUGHT — Axis 5.** The referee runs the selection detector: regress sub-study membership on the
  candidate variables. `[[munafo-2018-collider]]`'s measured values: membership ~ maternal education
  **OR 1.86 (1.58–2.19), P < 0.001**; membership ~ ever-smoking **OR 0.59 (0.52–0.68), P < 0.001**. Both
  select. The sub-sample association is consistent with **collider bias induced by selection**; it is not
  evidence of an association in the intended population.
  **Scope, stated in the verdict:** `[[munafo-2018-collider]]` **never mentions batch effects, batch design,
  or technical covariates**. This axis judges **who got assayed**, not how batch was adjusted for.
  [GAP: no source in this corpus connects selection-into-the-assayed-subset to batch-covariate adjustment.
  The referee must not.]

## Case: UNDETERMINED — no version pin
- fixture: **Doer config.** "Surrogate variables were estimated with sva and added to the design." No package
  version, no `n.sv`, no `num.sv` method, no seed, no invocation. **Doer output:** a results table.
  *(size: n/a / unrestricted / ground truth: **what is absent from the report — deterministic on the text** /
  role: planted-invalid · reported-analysis)*
- expect: **UNDETERMINED, not PASS.** `[[sva]]`: "Defaults drift across releases — every signature above is
  pinned to 3.60.0 and must be re-read against any other release before being relied on." The `num.sv`
  estimator is genuinely ambiguous in this package (documented default `"be"`; **every** worked example
  passes `method="leek"`; `sva()`'s internal auto-estimate uses `"be"`), so an unstated estimator is not
  recoverable. The referee returns UNDETERMINED and names what it needs. A CERTIFY here fails
  `undetermined-is-not-pass`.

---

## Not testable from this corpus (stated, not faked)

- **Where partial confounding stops being REVISE and becomes ESCALATE.** `[[leek-2010]]` gives no R² cutoff;
  `[[nygaard-2016]]` gives no numeric cutoff between "moderately unbalanced (need not be a concern)" and
  "heavily unbalanced (huge influence)"; `[[zhang-2020-combat-seq]]` names "severely or even completely
  confounded" with **no detector and no simulation** of that regime; `[[leek-storey-2007-sva]]` stops at an
  average primary-vs-hidden-factor correlation of **0.50** and **never analyses perfect confounding**.
  **No fixture exists. The Axis-1/Axis-2 boundary is a judgment call, and the Mold says so.**
- **"Is this allocation good enough?"** `[[yan-2012-osat]]` demonstrates χ² p > 0.99 but sets **no**
  acceptance threshold; `[[designit]]` supplies **no** post-hoc diagnostic that the optimizer failed to
  balance. The referee reports the negative-control comparison; it must not mint a cutoff.
- **How many surrogate variables is too many.** No source gives a cap, a rule, or a degrees-of-freedom
  warning. `sva.check()` is described only as checking "for degenerate cases" — the source never says what a
  degenerate case is.
- **Whether Nygaard's inflation transfers to NB count models.** `[[nygaard-2016]]` is entirely microarray and
  the words "RNA-seq", "sequencing", "count(s)" never appear. The referee may flag the *design pattern* on
  count data; it must not assert the *result* transfers. `[[zhang-2020-combat-seq]]` does not cite Nygaard
  and supplies no substitute. **This is a real, uncovered branch.**
```

---

## 3. Fixture ledger

| # | Fixture | Small? | Unrestricted? | Known ground truth? | Role |
|---|---|---|---|---|---|
| 1 | Rank check on a 6-row `colData` (no data) | **Yes** — 6 rows | **Yes** — no data | **Yes** — `ncol=3, rank=2`; DESeq2's exact error string | planted-invalid |
| 2 | Rank check on airway `colData` | Yes — 8 rows | Yes | **Yes** — `ncol=5, rank=5` | **clean control** |
| 3 | airway DE endpoint (GSE52778) | Yes — 8 samples | Yes — GEO + Bioc data pkg (`airway` licence `[verify]`) | **Yes** — 16637 rows; **2362 up / 2019 down / 0 outliers / 646 low** at padj<0.1 | **clean control** |
| 4 | airway, cell line hidden → `svaseq` | Yes | Yes | **Yes** — console `Number of significant surrogate variables is: 2`; the hidden variable is *known* | clean control |
| 5 | airway, `mod=~1` → SVs regressed out | Yes | Yes | **Partial** — referent = case 3's endpoint; the broken run's counts are unrecorded (**record at staging**) | planted-invalid |
| 6 | Nygaard null-data sim, **5:1** | Yes — 20k×12 instant | **Yes — pure simulation, no licence** | **Yes — TRUE DE = ZERO; p must be Uniform(0,1)** | planted-invalid |
| 7 | Nygaard null-data sim, **balanced 3:3** | Yes | Yes | **Yes — ZERO DE; Jensen equality ⇒ Uniform** | **clean control** |
| 8 | Nygaard sweep n = 12/120/1200 | Mostly — 1200-arm ≈ 24M doubles | Yes | **Yes** — inflation is **flat** in n | planted-invalid |
| 9 | Nygaard Exp 1 — **GSE40566** | Yes — 102 arrays | **Yes** — public GEO | **Yes** — comparison arm **11** vs **2011** (carry the GSE61901 preprocessing caveat) | planted-invalid, runnable |
| 10 | Zhang polyester, **mean-only 1.5×** | **Yes** — 918 genes | Yes — params fully specified (polyester licence `[verify]`) | **Yes** — planted DE known; **FPR 0.059–0.067** vs no-batch **0.048/TPR 0.96** | planted-invalid |
| 11 | Zhang polyester, **3× dispersion** | Yes | Yes | **Yes** — **FPR 0.039** (most conservative arm) | **clean control** |
| 12 | `ComBat_seq(group=NULL)` | Yes | Yes | **Yes** — literal string `Using null model in ComBat-seq.` | planted-invalid |
| 13 | Brenes **Y-peptides in female channels** | **Yes after staging** (65 × 21 × 10); staging from PXD010557 is not small | Paper **CC-BY-4.0**; **PRIDE deposit licence `[verify]`** | **Yes — physically impossible signal ⇒ every call a known FP. Median 89%, min >40% in all 21 batches, max 97.5%; and [V5] says an 8-fold FC cutoff cannot separate them** | planted-invalid |
| 14 | Brenes **grouped 5–5 layout** | **Yes — a 10-row table, no data** | CC-BY-4.0 | **Yes** — Table I adjacency (*i*→*i*±2); grouped ⇒ cross-condition RII, alternating ⇒ zero | planted-invalid |
| 15 | Brenes **alternating layout** | Yes | CC-BY-4.0 | **Yes** — zero cross-condition RII | **clean control** |
| 16 | Yang 2008 — center 2 (sex ↔ wash/stain) | n/a | **NO — the paper names no accession and has no data-availability statement ⇒ data NOT stageable** | **Yes, as a comparison** — same RNA at all 5 centers; randomized center **6 360** vs confounded **18 910 / 17 475**; π₀ **0.42/0.43** | planted-invalid, **reported-analysis only** |
| 17 | designit `optimize_multi_plate_design` bug | Yes | **Yes — MIT** | **Yes** — deterministic (error, or a container that doesn't derive from the declared input) | planted-invalid |
| 18 | designit `set.seed(17)`, 31 subj / 3 batches | Yes | **Yes — MIT** | **Yes — seeded, exactly reproducible**; but the **data object is unpinned** (`[verify]`) | planted-invalid |
| 19 | OSAT 576-row allocation | Yes | Artistic-2.0 — **but marginals live in Additional file 1, unread ⇒ input NOT reconstructible** | Published χ² values only | clean control, **reported-analysis only** |
| 20 | ARIES / collider | n/a | **NO — ALSPAC access-controlled** | **Yes** — full-cohort **OR 1.01, P=0.74** vs sub-sample **OR 1.20, P=0.03** | planted-invalid, reported-analysis |
| 21 | No-version-pin report | n/a | Yes | **Yes** — deterministic on the text | planted-invalid |

**Planted-invalid : clean-control ratio** — 14 : 6 (was 9 : 3, with Axis 3 having **no** control at all).

---

## 4. Coverage map

**Branches that now have a real, ground-truth-bound test:**

| Doer branch / Audit axis | Fixture | Ground truth |
|---|---|---|
| Aliasing → HALT (Axis 1) | 1, 2 | **Arithmetic** (matrix rank) — the cheapest real test in the corpus |
| Batch known → `~ batch + condition` | 3 | Published reproducible endpoint |
| Batch hidden → `svaseq`, SVs into design | 4 | Console string + known hidden variable |
| SVs eat the biology (Axis 4) | 5 | The correct run's endpoint as referent |
| Imbalance + correct-then-test (Axis 2) | 6, 8, 9 | **Known ZERO DE** + a 2011-vs-11 real comparison arm |
| *Balance must not fire* (`three-legs-required`) | 7 | Known ZERO DE ⇒ Uniform |
| Method choice: ComBat-seq vs covariate (Axis 3) | 10 | Published **FPR 0.059–0.067** |
| *ComBat-seq used correctly must PASS* | 11 | Published **FPR 0.039** — **this control did not exist before** |
| Silent loss of the biological condition | 12 | Literal console string |
| Adjustment cannot beat a fold-change artifact | 13 | **Physically impossible signal** — the strongest known truth in the whole corpus |
| Interference-aware channel layout | 14, 15 | Deterministic adjacency map |
| Confounded processing at collection (ESCALATE) | 16 | Same RNA, 5 centers ⇒ excess is technical by construction |
| Provenance / assignment traceability | 17 | Deterministic package bug |
| "Just randomize" is not enough | 18 | Seeded counter-example |
| Selection into the assayed subset (Axis 5) | 20 | Full-cohort null |
| Missing pin ⇒ UNDETERMINED | 21 | Deterministic on the report |
| Over-read guard (`sva()` on counts) | HONESTY CONTROL | The source's **silence** — the ground truth is that there *is* no stated symptom |

**Branches that remain judgment-only. I am not faking tests for these:**

1. **The REVISE/ESCALATE boundary for *partial* confounding.** No source in the corpus supplies a cutoff. `[[leek-storey-2007-sva]]` stops at correlation 0.50 and never analyses perfect confounding; `[[zhang-2020-combat-seq]]` names "severely or even completely confounded" and runs **no simulation of it**. This is the single largest hole and it is a *sourcing* hole, not a scenario hole.
2. **"Is this allocation good enough?"** — no acceptance threshold anywhere (`[[yan-2012-osat]]`, `[[designit]]`). Only the negative-control *comparison* is testable.
3. **How many SVs to keep** — unsourced; `n.sv = 2` is simply chosen in every worked example.
4. **Droplet scRNA-seq / demuxlet** — no stageable fixture, and every number sits under an unread paywalled Author Correction the Mold's own `index.md` forbids using load-bearing. **Removed from the graded set.**
5. **Whether Nygaard's inflation transfers to NB count models** — a confident silence. The referee may flag the *pattern* on counts, never assert the *result*. **No fixture can close this; only a new source can.**
6. **Run order / temporal drift** — a hard silence in `[[yang-2008-randomization]]` and absent from `[[yan-2012-osat]]` / `[[designit]]`.

---

## 5. Staging list (what must be pinned, and its licence)

| Fixture | What to pin | Licence |
|---|---|---|
| `airway` | Bioconductor data package (`system.file("extdata", package="airway")`); GEO **GSE52778** | Bioconductor data pkg — **`airway`'s own licence is not recorded in the note → `[verify]`** |
| designit | CRAN **0.5.0**, `Date/Publication 2024-03-21`. **Open `vignettes/` and pin the `set.seed(17)` data object + grouping column — the note records only "31 grouped subjects, 3 batches."** Record the seeded assignment's χ². | **MIT** ✅ |
| sva / DESeq2 | sva **3.60.0** (Bioc 3.23, `RELEASE_3_23`, commit `87a4798`); DESeq2 **1.52.0** | Artistic-2.0 / LGPL-3.0-or-later ✅ |
| polyester | Bioconductor package + the ComBat-seq repo's simulation script. **The note does not record the per-group sample size (Supp. Fig. S2, unread) → pin it, do not guess.** | polyester's licence **not recorded → `[verify]`**; the paper is CC-BY-4.0 ✅ |
| Nygaard null-data sim | **Nothing to stage.** 20 000 genes, N(0,1), 10% batch-affected, 2 batches, 5:1 / 1:5 / balanced, n ∈ {12,120,1200} — fully specified in the note. | **No data ⇒ no licence** ✅ |
| Nygaard Exp 1 | GEO **GSE40566** (Illumina WG-6_V2, 17 chips). Carry the **GSE61901** preprocessing caveat. | Public GEO ✅ |
| Nygaard Exp 2 | **No accession in the note** for the ComBat paper's "Data set 2" ⇒ **reported-analysis only.** | — |
| **Brenes Y-peptides** | PRIDE **PXD010557** → MaxQuant output → derive the **65 Y-peptides × 21 batches × 10 channels** reporter table (exclude PT6384, PT7422, PT6388). Derived table is tiny; the download is not. | Paper **CC-BY-4.0** ✅; **the PRIDE deposit's own licence is NOT recorded in the note → `[verify]` before staging.** |
| Brenes channel layout | **Nothing to stage — Table I is in the note.** | CC-BY-4.0 ✅ |
| Yang 2008 | **NOT stageable.** The article "names no GEO/ArrayExpress accession and contains no data-availability statement." Reported-analysis only. | Paper CC-BY (unversioned as printed) ✅ |
| OSAT 576 | **NOT reconstructible** — marginals in Additional file 1, unread. Reported-analysis only. | OSAT Artistic-2.0 |
| ARIES/ALSPAC | **NOT stageable** — access-controlled cohort. Reported-analysis only. | — |

---

## 6. Required `index.md` changes (the orchestrator writes these)

Two fixtures cite sources **not in either Mold's `references:` manifest**. Without the additions, the Brenes and Yang cases score the pair against evidence it was never given.

**Add to `candidate-audit/index.md`:**
```yaml
  - kind: research
    ref: "[[brenes-2019-multibatch-tmt]]"
    used_at: runtime
    load: on-demand
    trigger: "when the platform is multiplexed isobaric proteomics (TMT/iTRAQ) or when a known-absent-analyte negative control is available"
    mode: verbatim
    evidence: corpus-observed
    purpose: "The corpus's strongest known-truth negative control: 65 Y-chromosome peptides across 21 TMT batches, median 89% of which are 'quantified' in FEMALE channels (worst case 97.5%) — physically impossible, therefore known false positives. Plus [V5]: they sit inside the 8-fold range of bona fide biology, so a fold-change cutoff CANNOT separate them. And the within-batch-CV-does-not-license-cross-batch-comparison result (1.72 vs 11.03). NOTE: the source runs NO hypothesis test — it is silent on whether reference-normalized values may be tested without further batch modelling, and claims no generalization beyond isobaric labelling."
  - kind: research
    ref: "[[yang-2008-randomization]]"
    used_at: runtime
    load: on-demand
    trigger: "when processing steps (wash/stain sets, hybridization days, plate runs) may be grouped by a biological factor"
    mode: condense
    evidence: corpus-observed
    purpose: "Real observed consequence of confounding a processing step with biology, with an internal control: the SAME 16 RNA samples at 5 centers. Randomized center → 6,360 sex-DE genes at q<0.05; centers that confounded wash/stain with sex → 18,910 / 17,475. π₀ collapses to 0.42/0.43 at strain-confounded centers. The sharpest internal fingerprint: a short within-batch contrast beside a long across-batch contrast for the same factor. Joint normalization made it WORSE. HARD SILENCE: says nothing about run order, within-run position, or temporal drift — cite only for randomized batch MEMBERSHIP."
