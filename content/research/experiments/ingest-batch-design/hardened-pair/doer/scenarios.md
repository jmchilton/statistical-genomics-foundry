# Scenarios — separate-batch-from-biology

Concrete cases. Each binds a stimulus a reader can **actually construct and run**, and a doer output the
`eval.md` oracle is applied to. Every `expect:` traces to a note.

Each case carries a fixture line: **size / license / ground truth / role**. A case with no known ground
truth is not a test; those are quarantined at the bottom under "Judgment-only — NOT tests."

The general oracle for a doer case with a null-truth fixture is the **pipeline null replay**: take the
pipeline the doer actually chose, replace the data with N(0,1), retain the design, rerun. The doer's
route must yield Uniform(0,1) p-values (`[[leek-storey-2007-sva]]`: null p-values are Uniform iff the
null was correctly calculated). This is what makes the case a test rather than an opinion.

---

## Case: aliased design — rank deficiency, no data at all
- fixture: **A `colData` data frame only. No counts, no download, no package data.**
  ```r
  cd <- data.frame(condition = factor(c("A","A","A","B","B","B")),
                   batch     = factor(c(1,1,1,2,2,2)))
  mm <- model.matrix(~ batch + condition, cd)   # 3 columns: (Intercept), batch2, conditionB
  qr(mm)$rank                                    # 2
  ```
  DESeq2 **1.52.0**.
  *(size: 6 rows / unrestricted: no data / ground truth: `ncol(mm) = 3`, `qr(mm)$rank = 2` — arithmetic,
  not opinion / role: **planted-invalid**)*
- expect: The doer performs the rank check **before** running anything, reports `rank 2 < 3 columns`, and
  **HALTS**. If it instead calls `DESeq()`, the run emits verbatim
  `the model matrix is not full rank, so the model cannot be fit as specified.` (`[[deseq2]]`).
  It names the only two options `[[deseq2]]` states — assume there is no batch effect (which the source
  deems highly unlikely), or rerun the experiment with conditions balanced across batches — and
  **ESCALATES**. It does **not** drop `batch` and report the condition result; it does **not** reach for
  ComBat / ComBat_seq / sva / svaseq. `[[leek-2010]]`: adjustment cannot rescue it. `[[msmb-chap13]]`: data
  already confounded at collection cannot be rescued by any analysis.
  [GAP: `[[deseq2]]` states it ships **no** automated pre-flight rank detector — the user hits the error.
  The doer must build the model matrix itself. This is the corpus's only mechanical stop sign.]

## Case: CLEAN CONTROL — the same check on a full-rank design
- fixture: `airway`'s own `colData` — `cell` (4 levels) × `dex` (2 levels), 8 samples.
  `model.matrix(~ cell + dex)` → **5 columns**, `qr(...)$rank` → **5**. No counts needed.
  *(size: 8 rows / unrestricted: Bioconductor `airway` data package [verify its own license at staging] /
  ground truth: rank 5 = 5 columns / role: **clean control**)*
- expect: The doer passes the rank check and **proceeds**. A doer that halts, or that reaches for a batch
  adjustment here, has become a constant function. *This case exists to prove the halt in the previous
  case is discriminating.*

## Case: CLEAN CONTROL — batch is known and recorded; reproduce a published endpoint
- fixture: **`airway`** (`[[rnaseqgene]]`): 8 samples, 4 primary human airway smooth-muscle cell lines ×
  (untreated, dexamethasone 1 µM / 18 h). GEO **GSE52778**. Pre-filter
  `smallestGroupSize <- 4; keep <- rowSums(counts(dds) >= 10) >= smallestGroupSize` → 58294 → **16637**
  rows. DESeq2 **1.52.0**, Bioconductor **3.23**.
  *(size: 8 samples, seconds on a laptop / unrestricted: published GEO + Bioconductor data package /
  ground truth: a **published, reproducible endpoint** / role: **clean control**)*
- expect: `design = ~ cell + dex` — nuisance first, variable of interest last (`[[deseq2]]`) — tested on
  **raw counts**. `summary(results(dds))` at adjusted p < 0.1 reproduces `[[rnaseqgene]]` §5.2 exactly:
  up **2362 (14%)**, down **2019 (12%)**, outliers **0**, low counts **646 (3.9%)**. The doer produces
  **no** "cleaned" matrix, and hands the design + result to the gate. A run that misses these counts has
  not reproduced the endpoint and fails regardless of how reasonable its narrative is.

## Case: the same batch variable, hidden — svaseq, with a deterministic console assertion
- fixture: `airway` as above, but the cell-line variable is **withheld** from the doer
  (`[[rnaseqgene]]` §8's own hypothetical: "Suppose we did not know that there were different cell lines
  involved."). sva **3.60.0**.
  *(size: 8 samples / unrestricted: as above / ground truth: the console string + the known hidden variable
  / role: **clean control** — a correct run that must pass)*
- expect: Detects hidden structure; selects **`svaseq()`** (counts → svaseq, not sva); runs exactly:
  ```r
  dat  <- counts(dds, normalized = TRUE); dat <- dat[rowMeans(dat) > 1, ]
  mod  <- model.matrix(~ dex,  colData(dds)); mod0 <- model.matrix(~ 1, colData(dds))
  svseq <- svaseq(dat, mod, mod0, n.sv = 2)
  ```
  Console asserts, verbatim: `Number of significant surrogate variables is: 2`. The SVs go into the
  **design** (`design(ddssva) <- ~ SV1 + SV2 + dex`), never subtracted from counts. The stripchart
  diagnostic `stripchart(svseq$sv[, i] ~ dds$cell, ...)` shows the SVs track the withheld cell line —
  **the hidden variable is known here, so this is a real recovery test, not a vibe check**.
  The doer **marks `n.sv = 2` as an unsourced choice**.
  [GAP: no source gives a rule for how many SVs to keep, or a numeric criterion for "the SVs picked up
  something real." The recovery is judged qualitatively against the *known* cell-line labels.]

## Case: PLANTED-INVALID — the surrogate variables eat the biology (known referent)
- fixture: `airway`, cell line withheld, but the doer protects **nothing** in `mod`:
  `sva(dat, mod = model.matrix(~1, colData(dds)), mod0 = model.matrix(~1, colData(dds)), n.sv = 2)`,
  then regresses the SVs out of the matrix and tests `dex` on the residuals.
  *(size: 8 samples / unrestricted / ground truth: **the correct run's endpoint — 2362 up / 2019 down at
  padj<0.1** / role: **planted-invalid**)*
- expect: The DE call count **departs from the reference endpoint** (2362/2019), because `dex` was not
  protected during estimation and the SVs are free to absorb it. Detector: correlate SV1/SV2 against
  `dex` — deterministic and reproducible. `[[sva]]` §10 names the regime verbatim ("one or more of the
  estimated surrogate variables may be very highly correlated with subgroup"). `[[rnaseqgene]]`,
  `[[leek-storey-2007-sva]]` and `[[sva]]` all place estimated factors in the **model**, never subtract
  them from the data.
  [GAP: the *exact* post-regress-out DE counts are in no note. Record them **once at staging** and pin
  them here; do not guess. The recoverable ground truth is (a) the reference endpoint it must not match
  and (b) the SV–`dex` correlation.]
  [GAP: no source gives a correlation threshold above which an SV "is" biology. Report the correlation;
  do not mint a cutoff.]

## Case: KNOWN-ZERO TRUTH — unbalanced design, and a request for a "batch-effect-free" matrix
- fixture: **`[[nygaard-2016]]`'s null-data simulation, fully specified and needing no external data.**
  **20 000 genes**, values drawn **N(0,1)** (⇒ **TRUE DE = ZERO, by construction**), a batch effect
  applied to **10%** of genes, **two batches**, group split **5:1** (and its mirror **1:5**), sample sizes
  **n = 12, 120, 1200**. The doer is handed this design and asked for differentially expressed genes; the
  requester asks for a "batch-corrected matrix" for a downstream tool.
  *(size: 20 000 × 12 is instant; the n = 1200 arm is ~24M doubles — run it, it is the scale-invariance leg
  / unrestricted: **pure simulation, no data licence at all** / ground truth: **ZERO true DE; null
  p-values must be Uniform(0,1)** / role: **planted-invalid stimulus**)*
- expect: The doer takes `[[nygaard-2016]]`'s **own endorsed remedy — "account for batch in the statistical
  analysis"** — i.e. `~ batch + condition` (`[[deseq2]]`, `[[msmb-chap8]]`). It **refuses to build the
  three-legged failure**: unbalanced design **+** a group-preserving adjustment (ComBat with group as
  covariate) **+** a downstream test that ignores batch. If a matrix is genuinely required by a downstream
  tool, it says so, marks the departure, and routes it to the referee — it does **not** certify it.
  **Pipeline null replay (the oracle):** run the doer's chosen pipeline on this fixture. The endorsed route
  yields **Uniform p-values**. The forbidden route yields **non-uniform p-values and inflated F**, and —
  decisively — **the inflation does not shrink across n = 12 → 120 → 1200**, because it is
  "inflated by a fixed factor which depends on the unevenness of the design, rather than the size of the
  sample or batches" (`[[nygaard-2016]]`). Any doer output that explains the inflation as a small-n problem
  is wrong on a matter of fact.

## Case: CLEAN CONTROL — the same simulation, balanced
- fixture: Identical to the above, but each batch reproduces the overall group ratio
  (e.g. n = 12, two batches of 6, group split **3:3** in each) — the exact no-inflation condition
  `n_iA : n_iB = n_A : n_B` for all batches i (`[[nygaard-2016]]` §3.2).
  *(size/licence as above / ground truth: **ZERO true DE; Uniform p-values**; Jensen's equality holds
  (ν₀ = ν) / role: **clean control**)*
- expect: The doer proceeds. `[[nygaard-2016]]`, verbatim: "In a balanced group–batch design, the
  estimation error has the same effect for all groups, and thus does not influence group comparisons."
  Null replay ⇒ **Uniform p-values, no F inflation**. A doer that declares this design unanalyzable, or
  that escalates it, has failed: it is flagging balance itself.

## Case: PLANTED-INVALID — ComBat-seq when the batch effect is mean-only
- fixture: `[[zhang-2020-combat-seq]]`'s **own** simulation setup: **polyester**; **918 genes**;
  **2 conditions × 2 batches**; biological signal fixed at **2-fold**; **mean batch effect 1.5×**;
  **no dispersion difference across batches**; **300 repeated simulations**. The doer is asked for DE calls.
  *(size: 918 genes — tiny; 300 reps is the only cost / unrestricted: simulator + parameters fully specified,
  polyester is Bioconductor [verify licence at staging] / ground truth: **planted DE genes are known by
  construction**, and the source's reference rates are published / role: **planted-invalid stimulus**)*
- expect: The doer **diagnoses first** (`[[zhang-2020-combat-seq]]`, verbatim: "batch effects should only
  be adjusted when they are present and result in unfavorable impact on downstream analysis"), finds the
  batch effect is **mean-only**, and selects **batch-as-covariate**, not `ComBat_seq()`. A doer that runs
  `ComBat_seq()` here lands in the source's own adverse regime: **FPR 0.059–0.067** against a nominal 0.05,
  **with no gain in TPR**, while every other method holds FPR < 0.05. Reference arms from the same source:
  no batch effect at all ⇒ **FPR 0.048, TPR 0.96**.
  [GAP: the per-group **sample size** of Zhang's simulation is not recorded in the note (Supplementary
  Fig. S2, not read). Pin it from the ComBat-seq repo at staging; the 918-gene / 2×2 / 2-fold / 1.5× /
  300-rep skeleton is fully recovered.]

## Case: CLEAN CONTROL — ComBat-seq when the dispersion really does differ
- fixture: The same polyester setup, but with **no mean batch effect** and a **3-fold dispersion batch
  effect**.
  *(size/licence as above / ground truth: **ComBat-seq FPR 0.039** — the most conservative of the arms
  (covariate 0.043, RUV 0.044, ComBat-logCPM 0.046, SVA-seq 0.049); at 4× dispersion it falls to **0.031**
  / role: **clean control**)*
- expect: The doer selecting `ComBat_seq()` here **PASSES**. This is the regime the method was built for.
  A doer that refuses ComBat-seq categorically — or a referee that flags every ComBat-seq run — is a
  constant function. *This case exists to prove the previous case is discriminating.*

## Case: PLANTED-INVALID — ComBat_seq with `group` omitted (console-string oracle)
- fixture: `ComBat_seq(counts = cts, batch = batch)` on a real case/control study — **`group` not passed**.
  sva **3.60.0**.
  *(size: any / unrestricted / ground truth: **a literal console string** / role: **planted-invalid**)*
- expect: The console emits `Using null model in ComBat-seq.` — `[[sva]]`: with `group = NULL` the
  **biological condition is silently not protected** during adjustment. The doer must read its own console
  output, catch this, and rerun with `group = condition`. A doer that ships the adjusted matrix without
  noticing has failed a check that costs one `grep`.

## Case: PLANTED-INVALID — the allocation does not trace to its input (designit 0.5.0 bug)
- fixture: designit **0.5.0** (CRAN, **MIT**, `Date/Publication: 2024-03-21`):
  ```r
  my_bc <- BatchContainer$new(dimensions = c("plate" = 2, "column" = 5, "row" = 6))
  my_bc <- assign_random(my_bc, samples)
  out   <- optimize_multi_plate_design(my_bc, across_plates_variables = "Group",
                                       within_plate_variables  = "Group")
  ```
  *(size: seconds / unrestricted: MIT / ground truth: **deterministic** — either `object 'bc' not found`,
  or a returned container whose samples do not derive from `my_bc` / role: **planted-invalid**)*
- expect: The doer must **not** call `optimize_multi_plate_design()` on a container not named `bc`. In
  0.5.0 the function binds `batch_container` but its body reads a free variable `bc`
  (`[[designit]]` §9G1), so it either errors or **silently optimizes whatever global `bc` exists**. The doer
  must verify the returned assignment derives from the declared input (`out$get_samples()` vs
  `my_bc$get_samples()`) and must not certify an allocation on the strength of its balance alone.
  The shipped vignettes all name their container `bc`, which masks the bug.

## Case: PLANTED-INVALID — "just randomize" (the package's own seeded counter-example)
- fixture: designit **0.5.0**; **`set.seed(17)`**; **31 grouped subjects** into **3 batches**;
  `assign_random()`; no `optimize_design()`. This is the vignette's shipped "gone wrong" case
  (source comment: `# gives 'bad' random assignment`), so it is **exactly reproducible**.
  *(size: 31 rows / unrestricted: MIT / ground truth: **seeded and deterministic** / role:
  **planted-invalid**)*
- expect: The doer does **not** accept the random assignment. It recognizes the regime named by
  `[[designit]]` ("Often sample sizes are too small to avoid grouping by chance") and `[[yan-2012-osat]]`
  (complete randomization on unbalanced/incomplete collections leaves variables statistically dependent on
  batch — their arm: **χ² p = 0.021 / 0.014 / 0.005**), and re-allocates with a constrained optimizer.
  It reports the recomputed χ² **as evidence, not as a pass** — `[[yan-2012-osat]]` sets **no** acceptance
  threshold on χ², p, or `V`.
  [GAP — staging: the note pins the seed, N=31 and 3 batches but **not the vignette's data object or its
  grouping column**. Open designit 0.5.0's `vignettes/` once, pin the object name here, and record the
  χ² of the seeded assignment. Do not invent either.]

## Case: PLANTED-INVALID — multibatch TMT channel layout (data-free, mechanically checkable)
- fixture: A 10-plex TMT design, 2 conditions × 5 replicates, laid out **grouped 5–5** across channels
  126, 127N, 127C, 128N, 128C, 129N, 129C, 130N, 130C, 131. **No data — the check is Table I of
  `[[brenes-2019-multibatch-tmt]]`**, which fixes the interference adjacency: primary RII (+1 Da) sends
  channel *i* into channel *i+2*; secondary RII (−1 Da) sends *i* into *i−2*.
  *(size: a 10-row table / unrestricted: CC-BY-4.0 / ground truth: **an adjacency map with an exact
  answer** / role: **planted-invalid**)*
- expect: The doer computes cross-condition RII pairs from Table I and finds the grouped layout puts
  **multiple channels under cross-condition primary + secondary RII** — `[[brenes-2019-multibatch-tmt]]`
  [V2], verbatim: "a 5–5 grouped layout would cause multiple channels to be affected by cross
  population/condition reporter ion interference." It prescribes the source's fix: **alternate the two
  conditions across the 10 channels**, and place ≥1 **internal reference sample** in **126C or 127N**
  (never 131N/131C) [V1]. *(Derived, marked: on the ±2 adjacency, alternating conditions puts every
  interference pair inside one condition, so cross-condition primary/secondary RII is **exactly zero** —
  the source states the alternating design is RII-free but does not print the count.)*
- **Requires a reference-manifest addition** — see the staging list.

## Case: CLEAN CONTROL — the alternating TMT layout
- fixture: The same 10-plex, conditions **alternating** across the 10 channels, reference sample at 126C.
  *(size/licence as above / ground truth: **zero cross-condition primary/secondary RII** / role:
  **clean control**)*
- expect: The doer passes it. `[[brenes-2019-multibatch-tmt]]` [V2] names this the optimal design.
  [GAP: `[[brenes-2019-multibatch-tmt]]` **never runs a hypothesis test** — zero occurrences of `t-test`,
  `p-value`, `limma`, `ComBat`, `linear model`. It supports the *layout*, and nothing about whether
  reference-normalized values may be tested without further batch modelling. The doer must not extend it.]

---

## Judgment-only — NOT tests (no recoverable ground truth; do not fake one)

These exercise real branches of the Mold but have **no known expected answer**. They belong in `usage.md`,
not in the graded scenario set. Listed here so the coverage map stays honest.

- **Droplet scRNA-seq: pool donors + demultiplex on genotype (`[[kang-2018-demuxlet]]`).** No stageable
  fixture, no ground truth, and **every number in the source is under a `[re-check]` Author-Correction
  flag** (Nat Biotechnol 38(11):1356, paywalled, unread) that the Mold's own `index.md` says may not be
  used load-bearing. Scoring a doer against these numbers would be scoring it against unverified facts.
- **Droplet scRNA-seq with no genotypes.** The corpus supplies **no** alternative route and **no** decision
  rule vs. hashtag/antibody demultiplexing. The only correct behavior is escalation — which is a policy
  check (`eval.md`'s `established-method-only`), not a fixture-bound test.
- **Partial confounding: where REVISE ends and ESCALATE begins.** Unsourced. `[[leek-2010]]` gives no R²
  cutoff; `[[nygaard-2016]]` no numeric cutoff; `[[zhang-2020-combat-seq]]` names "severely or even
  completely confounded" with no detector; `[[leek-storey-2007-sva]]` stops at correlation **0.50** and
  never analyses perfect confounding. **No fixture can be written for this branch.**
- **Run order / processing time.** `[[yan-2012-osat]]`'s objective has no run-order term; `[[designit]]` has
  no time dimension; `[[yang-2008-randomization]]` is a hard silence (its recommendation is randomized
  batch *membership*, never *order*). Not testable from this corpus.
