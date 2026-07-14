# Guidance — kang-2018-demuxlet (paper)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note: the sole primary for the skill's "~50 SNPs/cell" threshold and for the
> "pool donors + demultiplex to break the donor↔lane confound" design strategy. The skill states the
> number bare; we need its qualifiers, because a threshold stripped of its conditions is exactly the
> failure mode this project exists to prevent.

> **License posture: own-words.** Nature author manuscript on PMC — all rights reserved (NOT Creative
> Commons). No verbatim prose. Numbers, SNP counts, accuracy percentages, pool sizes, and
> tool/parameter names are FACTS and stay verbatim.

## Must capture (the threshold, with every qualifier attached)
- The **exact statement of how many SNPs per cell suffice**, and everything attached to it:
  the singlet-assignment accuracy, the doublet-identification accuracy, the **maximum pool size**
  it holds for, and — critically — **whether this is a simulation result or measured on real data**.
  If simulated, capture the simulation setup (how many cells, source of genotypes, how doublets were
  constructed).
- How the number **degrades**: what happens with fewer SNPs, more individuals in the pool, lower
  coverage/depth per cell, or related individuals? Capture any table/figure values.
- The **required inputs**: does demuxlet need external genotype data for the pooled individuals, or
  can it work genotype-free? State exactly what must be available at design time — this is the
  design-time feasibility gate the skill's decision table depends on.

## Must capture (the design claim)
- Does the paper state the **design motivation** — that pooling donors within a lane/run removes the
  donor↔batch (lane) confound, and/or reduces batch effects? Capture the paper's own framing of the
  benefit (cost, throughput, doublet detection, batch/technical-variation control) and do not
  overstate it: if the paper's stated motivation is cost/throughput rather than confound-breaking,
  say so plainly.
- Any statement about **hashing/barcoding as an alternative** to genotype-based demultiplexing.

## Must capture (limits)
- Stated limitations: pool-size ceiling, ambient RNA, related individuals, species/population
  applicability, minimum coverage.

## Silences to record explicitly
- Does the paper say anything about designs where **each donor is in exactly one lane** (the
  confounded case) — or is that our inference?
- Does it address non-droplet / plate-based scRNA-seq, or bulk?

## Pin
- demuxlet software version/repository as named in the paper; access date; note a 2020 Author
  Correction exists and check whether it touches any captured number.
