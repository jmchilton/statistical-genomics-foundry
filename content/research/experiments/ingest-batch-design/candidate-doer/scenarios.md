# Scenarios — separate-batch-from-biology

Concrete cases. Each binds a stimulus a reader can actually construct and run, and the doer output the
`eval.md` oracle is applied to. Planted-invalid *doer runs* — the stimuli the audit Mold consumes — live
in `../audit-batch-design-validity/scenarios.md`; the cases here test the doer itself.

## Case: pre-run allocation of an unbalanced collection
- fixture: A sample sheet of **576 rows**, one sample per row, columns `SampleType` (case/control, the
  primary variable), `Race`, `AgeGrp` — **none of the three balanced**. Batches = plates. This is the
  shape of the exemplary dataset in `[[yan-2012-osat]]` §6.
  [GAP: the paper's per-variable marginals live in Additional file 1, which the note records as not read.
  The reader must choose marginals; only the 576-row, three-unbalanced-variable *shape* is recovered.]
- expect: The doer targets an RCBD, finds it unachievable on this collection, and selects **constrained
  allocation** (OSAT `create.optimized.setup(fun="optimal.shuffle", …)` at its 5000-attempt default, or
  designit `optimize_design()` with `osat_score_generator(batch_vars="plate", feature_vars=c("SampleType","Race","AgeGrp"))`
  at designit 0.5.0). It blocks **all three** variables and states the tradeoff it thereby accepts:
  blocking only the primary variable drives its χ² down (0.035 vs 0.203) but raises the confounders'
  (Race 3.685 vs 0.238; Age_grp 5.081 vs 0.814) — `[[yan-2012-osat]]` Table 1. It reports the per-variable
  χ² diagnostic **as evidence, not as a pass** (the paper sets no acceptance threshold), and hands off to
  the gate.

## Case: "just randomize" is not enough — the seeded counter-example
- fixture: designit **0.5.0**; `set.seed(17)`; 31 grouped subjects; 3 batches; complete random
  assignment. This is the package's own shipped "gone wrong" case (source comment: `# gives 'bad' random
  assignment`), so it is exactly reproducible.
- expect: The doer does **not** accept the random assignment. It recognizes the regime named by both
  `[[designit]]` ("sample sizes are too small to avoid grouping by chance") and `[[yan-2012-osat]]`
  (complete randomization on unbalanced/incomplete collections → variables statistically dependent on
  batch; their arm: χ² p = 0.021 / 0.014 / 0.005) and re-allocates with a constrained optimizer.

## Case: batch is known and recorded — put it in the design
- fixture: The **`airway`** dataset (`[[rnaseqgene]]`): 8 samples, 4 primary human airway smooth-muscle
  cell lines × (untreated, dexamethasone 1 µM / 18 h). GEO **GSE52778**. Pre-filter
  `smallestGroupSize <- 4; keep <- rowSums(counts(dds) >= 10) >= smallestGroupSize` → 58294 → **16637**
  rows. Stack: DESeq2 **1.52.0**, Bioconductor **3.23**.
- expect: The doer sets `design = ~ cell + dex` — nuisance first, variable of interest last (`[[deseq2]]`)
  — tests on **raw counts**, and reports `results(dds)`. Reference output (`[[rnaseqgene]]` §5.2, at
  adjusted p < 0.1): up **2362 (14%)**, down **2019 (12%)**, outliers 0, low counts 646 (3.9%). It does
  **not** produce a "cleaned" matrix, and it hands the design + result to the gate.

## Case: the same batch variable, hidden
- fixture: `airway` as above, but the doer is told only that samples were treated with dexamethasone —
  the cell-line variable is withheld. (`[[rnaseqgene]]` §8's own explicit hypothetical: "Suppose we did
  not know that there were different cell lines involved.") sva **3.60.0**.
- expect: The doer detects hidden structure, selects **`svaseq()`** (counts → svaseq, not sva), and runs
  exactly:
  ```r
  dat <- counts(dds, normalized = TRUE); dat <- dat[rowMeans(dat) > 1, ]
  mod  <- model.matrix(~ dex, colData(dds)); mod0 <- model.matrix(~ 1, colData(dds))
  svseq <- svaseq(dat, mod, mod0, n.sv = 2)     # Number of significant surrogate variables is: 2
  ddssva <- dds; ddssva$SV1 <- svseq$sv[,1]; ddssva$SV2 <- svseq$sv[,2]
  design(ddssva) <- ~ SV1 + SV2 + dex
  ```
  It carries the SVs into the **design**, never subtracting them from the counts. It runs the stripchart
  diagnostic (`stripchart(svseq$sv[, i] ~ dds$cell, ...)`) if a candidate known variable exists, and
  **marks `n.sv = 2` as an unsourced choice** — no source in the corpus gives a rule for how many SVs to
  keep. It hands off to the gate.

## Case: batch aliased with condition — the doer must halt
- fixture: A `DESeqDataSet` with 6 samples; `colData`: `condition = c(A,A,A,B,B,B)`,
  `batch = c(1,1,1,2,2,2)` — batch is identical to condition. The doer is asked for differentially
  expressed genes between A and B. Design `~ batch + condition`.
- expect: `DESeq()` emits, verbatim, `the model matrix is not full rank, so the model cannot be fit as
  specified.` The doer **halts**. It reports that condition effects cannot be separated from batch
  effects, names the only two options `[[deseq2]]` states — assume no batch effect (which the source
  deems highly unlikely) or repeat the experiment with conditions balanced across batches — and
  **ESCALATES through the gate**. It does **not** drop batch and report the condition result, and it does
  **not** run ComBat/ComBat_seq/sva "to correct for batch."

## Case: droplet scRNA-seq — donors would each occupy their own run
- fixture: 8 donors, droplet scRNA-seq on 10x Chromium, one donor per run as originally planned.
  Array/imputed genotypes **are available** for all 8.
- expect: The doer selects **pooling + genotype-based demultiplexing** (`[[kang-2018-demuxlet]]`), and
  states the operating envelope the source gives: **unrelated** donors; load at **2–10×** standard
  concentration; sequence to **≥1,000 UMIs per cell**; the practical optimum is **≈20 samples**
  multiplexed. It quotes the source's evidence at its actual strength: the 50-SNPs/cell → 97% singlets /
  92% doublets figure is a **simulation** result (up to 64 individuals), while the measured real-data
  claim is **>99% of singlets** correctly recovered with genotypes for **8** pooled donors. It reports
  the batch evidence honestly: 6 genes DE between wells W1 and W2 vs only 2 genes between the same
  individuals inside well W3.
  [GAP: the source never analyses the one-donor-per-lane design as a confound; that inference comes from
  the general aliasing rule (`[[deseq2]]`, `[[leek-2010]]`, `[[msmb-chap13]]`), not from
  `[[kang-2018-demuxlet]]`. The doer must attribute it correctly.]

## Case: droplet scRNA-seq, no genotypes
- fixture: As above, but no genotype data exist for the donors and none can be obtained.
- expect: demuxlet is **not applicable** — external DNA-derived genotypes are a hard input and
  `[[kang-2018-demuxlet]]` describes no genotype-free mode. The doer says so and escalates.
  [GAP: `[[kang-2018-demuxlet]]` runs **no head-to-head comparison** with hashtag/antibody-barcode
  demultiplexing and offers **no decision rule** between the two. The corpus supplies no alternative
  route. The doer must not invent one.]
