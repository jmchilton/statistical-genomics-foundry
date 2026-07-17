---
type: mold
name: audit-pangenome-claim
tags:
  - family/b
  - role/critique
  - domain/pangenomics
references:
  - kind: research
    ref: "[[tonkin-hill-2020-panaroo]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim is a bacterial/prokaryotic gene-content pangenome (accessory/core gene counts, gene gain-loss, pan-GWAS)"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the annotation-error-inflation gate: fragmented assemblies / contamination / inconsistent per-isolate calls inflate the accessory genome, and inflation scales with sample size."
  - kind: research
    ref: "[[tettelin-2005-pangenome]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim reports a total pan-genome / core-genome size or an open-vs-closed verdict for a bacterial species"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the sampling-dependence gate: an open pan-genome grows without bound, so any total-gene count is a lower bound at current sampling; core=100% presence in the founding definition."
  - kind: research
    ref: "[[tettelin-2008-openness]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim asserts a species pan-genome is open or closed via a growth-law / power-law fit"
    mode: condense
    evidence: corpus-observed
    purpose: "Flag that a defensible open/closed verdict needs a growth-law fit with a stated inequality and adequate genomes — but the exact functional form, exponent symbol, boundary value, and minimum-genome count are NOT recoverable from this (paywalled) note. See [GAP] markers in Gate B4."
  - kind: research
    ref: "[[gautreau-2020-ppanggolin]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim classifies gene families into persistent/shell/cloud (or soft-core) partitions, or names PPanGGOLiN"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the partition-method gate: PPanGGOLiN classifies by BMM+EM+MRF over the pangenome graph (not a frequency threshold, not an HMM); needs a minimum genome count; the soft-core threshold underestimates the persistent genome."
  - kind: research
    ref: "[[page-2015-roary]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim reports a core-genome size at a presence threshold, or names Roary, or compares core sizes across tools/studies"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the core-threshold gate: Roary's core = gene in >=99% of samples (a specific, tool-defined cutoff); Roary assumes same-species pre-annotated GFF3 input and makes no annotation-error-robustness claim."
  - kind: research
    ref: "[[delmont-eren-2018-anvio-pan]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim mixes pangenome core/accessory with metagenomic abundance (metapangenome, ECG/EAG), or names anvi'o"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the label-inversion gate: environmental core/accessory (ECG/EAG) is metagenome-relative and can invert pangenome core/accessory labels; detection needs >50% of positions at >=1X."
  - kind: research
    ref: "[[hickey-2024-minigraph-cactus]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim is a eukaryotic pangenome graph built with Minigraph-Cactus (or claims reference-free / reports a graph VCF)"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the reference-bias and clipping gates: Minigraph-Cactus is reference-anchored (requires a reference backbone), clips unaligned >=10kb regions to the reference allele, exports reference-relative VCF, and its graph depends on the chosen reference."
  - kind: research
    ref: "[[liao-2023-hprc]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim is a human/eukaryotic graph-genotyping result, reports variants-per-haplotype, or compares graph builders"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the repetitive-region and builder-topology gates: graph genotyping degrades in highly repetitive regions; graph builders (PGGB vs Minigraph/MC) disagree on topology at copy-number-polymorphic loci."
  - kind: research
    ref: "[[armstrong-2020-cactus]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim rests on a whole-genome multiple alignment, claims reference-free alignment, or spans divergent clades"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the reference-free contrast and masking/divergence gates: Progressive Cactus is genuinely reference-free; it requires soft-masked input; alignment accuracy drops with clade divergence (F1 0.989 primate vs 0.795 mammal)."
---

# Audit a pangenome analysis claim for method validity

You are refereeing a pangenome result, not producing one. Your job is to catch the ways a
pangenome claim is *silently wrong* — inflated by artifact, computed with a mis-defined
partition, over-claimed past its reliable region, or reported as if reference-free when it is
not. Walk the gates in order. Every FLAG must name the failure signature and the remedy, and
cite the note it rests on. Do not bless a claim that has not cleared the gates that apply to it.

## Gate 0 — Provenance capture (always)
Before judging, extract and record from the claim:
- **Tool + version** (Roary / Panaroo / PPanGGOLiN / anvi'o / Minigraph-Cactus / PGGB / Cactus …).
- **Number of genomes / haplotypes**, and whether they are same-species isolates, SAGs/MAGs,
  metagenomes, or phased eukaryotic assemblies.
- **The quantitative claim**: core size, accessory size, pan-genome total, open/closed verdict,
  partition class sizes, variants-per-haplotype, etc.
- **The core/partition threshold used** (100%? >=99%? a statistical partition? a %-band?).
- **The reference** used, if any, and whether the claim calls itself "reference-free".

If any of these is unstated, that is itself a finding: an unspecified threshold or reference
makes the claim unrefereeable → verdict **incomplete: provenance missing**.

## Gate 1 — Route the claim (branch)
The cardinal sins differ by axis. Route:
- **[branch] Bacterial gene-content axis** (isolate gene presence/absence; core/accessory/pan
  counts; persistent/shell/cloud; pan-GWAS) → run Gates **B1–B6**.
  [[tonkin-hill-2020-panaroo]], [[tettelin-2005-pangenome]], [[tettelin-2008-openness]],
  [[gautreau-2020-ppanggolin]], [[page-2015-roary]], [[delmont-eren-2018-anvio-pan]].
- **[branch] Eukaryotic pangenome-graph axis** (graph reference; graph genotyping;
  reference-bias; VCF from a graph) → run Gates **E1–E6**.
  [[hickey-2024-minigraph-cactus]], [[liao-2023-hprc]], [[armstrong-2020-cactus]].
- A metapangenome that fuses isolate pangenome + metagenomic abundance runs **both** the
  relevant B-gates and Gate B5 (label inversion).

---

## Bacterial gene-content axis

### Gate B1 — Annotation-error inflation of the accessory genome
- **Checks:** whether the accessory/pan count could be an annotation artifact rather than real
  gene-content variation.
- **Failure signature** ([[tonkin-hill-2020-panaroo]]): accessory-genome size that *grows with
  the number of genomes*; a large gap between tools' reported accessory sizes on the same data;
  many "conflicting annotations" per ortholog cluster. Named drivers: **fragmented assemblies**
  (the largest single driver — ~59% of the *M. tuberculosis* discrepancy), **inconsistent
  per-isolate gene calls of identical sequences** (~10%), **contamination**, **mis-assembly**,
  and mistranslation/over-split families. In the *M. tuberculosis* case competing tools reported
  2584–3670 accessory genes — a nearly tenfold inflation over the corrected count; at a 99%-core
  threshold on *K. pneumoniae*, Roary reported 1800 core genes vs Panaroo's 3372/3376.
- **Remedy / verdict:** if the assemblies are fragmented/contaminated and the pipeline did no
  population-wide error correction, **FLAG: accessory inflation is likely an annotation artifact**;
  remedy is a graph-context correction pass (e.g. Panaroo modes: strict / default / sensitive —
  sensitive keeps error rates near clean-assembly levels under contamination). Do not accept a raw
  accessory count from error-prone assemblies as biological.
- **[GAP: the notes give qualitative signatures (inflates-with-N; large inter-tool gap) but no
  numeric threshold for "how much inflation, or how large a tool-to-tool gap, crosses from
  plausible into artifact." Treat as a judgment call, not a fixed cutoff.]**

### Gate B2 — Pan-genome total reported as a fixed number (sampling dependence)
- **Checks:** whether a "total species gene repertoire" is presented as a settled count.
- **Failure signature** ([[tettelin-2005-pangenome]]): a single pan-genome size stated without
  its sampling caveat. For an **open** pan-genome the total grows without bound as strains are
  added — each new genome keeps contributing new genes (GBS: ~33 new genes per added genome
  asymptotically; 8 genomes were declared insufficient, and even hundreds "might not be
  sufficient"). Any total-gene count is therefore only a **lower bound at the current sampling**.
- **Remedy / verdict:** if the claim treats an open (or untested) pan-genome's size as fixed,
  **FLAG: pan-genome size is a lower bound, not a species total**; require the open/closed status
  and the genome count to be reported alongside.

### Gate B3 — Core / partition threshold mismatch or mis-attribution
- **Checks:** whether the core/partition definition is stated, consistent, and correctly attributed.
- **Failure signature:** comparing or conflating core sizes computed under **different
  thresholds** — Tettelin 2005 core = **present in all strains (100%)**
  ([[tettelin-2005-pangenome]]); Roary core = **gene in >=99% of samples**
  ([[page-2015-roary]]); PPanGGOLiN does **not** use a frequency threshold at all
  ([[gautreau-2020-ppanggolin]]). Also a mis-attribution sin: the "soft-core / shell / cloud"
  percent bands are **not** defined in Roary (only >=99% core) nor in Tettelin 2005 (only
  core vs dispensable) — attributing those bands to those sources is wrong.
- **Remedy / verdict:** if core sizes are compared across incompatible thresholds, or a %-band
  convention is attributed to a source that never stated it, **FLAG: threshold mismatch /
  mis-attribution**; require every core/partition figure to carry its explicit definition.
  Note the direction of bias: a fixed soft-core threshold *underestimates* the persistent genome
  (PPanGGOLiN persistent exceeds soft-core by ~11% of families on average, SD 9%; the soft-core
  size is unstable for 32 species with γ-tendency > 0.025).

### Gate B4 — Open/closed verdict without an adequate, correctly-specified test
- **Checks:** whether an open-vs-closed claim rests on a real growth-law fit over enough genomes.
- **Failure signature:** an open/closed label asserted from too few genomes, or from an eyeballed
  curve rather than a fitted asymptote. [[tettelin-2005-pangenome]] derives openness from whether
  the fitted new-gene curve asymptotes to a **nonzero** value (nonzero ⇒ open) and warns that 8
  genomes are inadequate. [[gautreau-2020-ppanggolin]] recommends a **minimum number of genomes
  (~15 in context)** for a *relevant* statistical partition at all.
- **Remedy / verdict:** if the verdict is asserted below a defensible genome count or without a
  fitted growth law, **FLAG: openness verdict under-powered / not tested**.
- **[GAP: the exact open-vs-closed decision rule — the growth-law functional form, the exponent
  symbol, the boundary value (is "open" exponent >0? <1? α<=1?), and the minimum-genome count to
  estimate it reliably — is the paywalled content of [[tettelin-2008-openness]] and is NOT
  recovered. Do not state a specific inequality or a hard minimum-genome number as authoritative;
  the ~15-genome figure from PPanGGOLiN is a partitioning recommendation, is summarizer-inferred,
  and is not an openness-test threshold.]**

### Gate B5 — Method mischaracterization and label inversion
- **Checks:** whether the named method is described correctly and whether metagenome-relative
  labels are being confused with pangenome labels.
- **Failure signature:**
  - Calling PPanGGOLiN an "HMM" partition, or claiming it uses fixed %-bands — both wrong; it is a
    **Bernoulli Mixture Model fit by EM, coupled to a hidden Markov Random Field** over the
    pangenome graph, with K chosen by ICL ([[gautreau-2020-ppanggolin]]).
  - Treating environmental core/accessory (**ECG/EAG**) as the same axis as pangenome
    core/accessory: they are metagenome-relative and **can invert** the pangenome labels — a
    pangenome-accessory gene can be environmental-core and vice versa
    ([[delmont-eren-2018-anvio-pan]]). Also: anvi'o pangenomics here does **not** compute ANI;
    a claim that relatedness came from anvi'o ANI is unsupported.
- **Remedy / verdict:** **FLAG: method mischaracterized** (state the correct model) or
  **FLAG: environmental vs pangenome core/accessory conflated** (keep the two label systems
  distinct). For metapangenome abundance claims, also require the detection gate: a genome counts
  as detected in a metagenome only if **>50% of its nucleotide positions have >=1X coverage**.

### Gate B6 — Wrong data scope for the tool
- **Checks:** whether the tool was applied to data it is not built for.
- **Failure signature:** running an isolate gene-content pangenome tool on **metagenomes**
  (Panaroo is explicitly **not recommended for metagenomic datasets**,
  [[tonkin-hill-2020-panaroo]]); mixing species when the tool assumes a **single species**
  (Roary input is "one annotated assembly per sample … where all samples are from the same
  species", [[page-2015-roary]]).
- **Remedy / verdict:** **FLAG: out-of-scope input**; the count is not interpretable as a
  same-species pangenome.

---

## Eukaryotic pangenome-graph axis

### Gate E1 — "Reference-free" claimed for a reference-anchored graph
- **Checks:** whether a graph called reference-free actually is, and whether reference-relative
  bias is acknowledged.
- **Failure signature** ([[hickey-2024-minigraph-cactus]]): Minigraph-Cactus **requires at least
  one chromosome-level assembly as a reference backbone**; the graph is built on and clipped
  against that reference, clipped (centromeric/unaligned) regions retain **only the reference
  allele**, and the exported **VCF is reference-relative** (variant calls "skewed toward the
  reference allele"). Contrast: **Progressive Cactus is genuinely reference-free**
  ([[armstrong-2020-cactus]]) — so "reference-free" is a property of the method, not a given.
- **Remedy / verdict:** if an MC (or otherwise reference-anchored) graph is described as
  reference-free, or its reference-allele skew is ignored, **FLAG: reference bias unacknowledged**.

### Gate E2 — Graph-genotyping over-claim in repetitive regions
- **Checks:** whether high-confidence genotype claims are confined to the reliable region.
- **Failure signature** ([[liao-2023-hprc]]): variant-calling performance is **lower in highly
  repetitive regions (3.87% of the autosomal genome)** — centromeres, segmental duplications,
  VNTRs — and lower for SVs than for small variants; the high-accuracy zone is the "easy" unique
  ~75.42% of the autosome (mean 99.64% recall/precision there).
- **Remedy / verdict:** if a genotype/variant claim in centromeres/SDs/VNTRs (or an SV claim) is
  asserted at the accuracy of easy regions, **FLAG: over-claim outside the reliable region**.

### Gate E3 — Graph topology treated as builder-independent
- **Checks:** whether a structural claim depends on which builder produced the graph.
- **Failure signature** ([[liao-2023-hprc]]): **PGGB collapses copy-number-polymorphic loci
  (segmental duplications, VNTRs, centromeres) into a single-copy loop** that haplotypes traverse,
  while **Minigraph and MC do not** — the same input yields structurally different graphs exactly
  at the loci where genotyping is already least reliable.
- **Remedy / verdict:** if a topology-dependent claim at such loci is stated without the builder,
  **FLAG: graph structure is method-dependent here**; require the builder to be named and,
  ideally, cross-checked.

### Gate E4 — Clipped/dropped sequence treated as complete coverage
- **Checks:** whether "the graph represents everything" ignores designed sequence loss.
- **Failure signature** ([[hickey-2024-minigraph-cactus]]): the default MC graph **clips stretches
  >=10 kb that do not align to the minigraph SV graph** (the 10-kb threshold is stated to be
  **arbitrary**, empirically chosen), drops contigs below chromosome-assignment thresholds
  (**75%** for <=100 kb, **50%** for 100 kb–1 Mb, **25%** for >1 Mb), and removes mappings implying
  a **>=10 Mb** deletion edge. In [[liao-2023-hprc]], ~**136 Mb (4.4%)** of T2T-CHM13 was not
  covered by any alignment.
- **Remedy / verdict:** if presence/absence is inferred in or near clipped/unassigned regions,
  **FLAG: absence may be clipping, not biology**.

### Gate E5 — Masking precondition unmet
- **Checks:** whether an alignment-based graph used properly soft-masked input.
- **Failure signature** ([[armstrong-2020-cactus]]): Progressive Cactus **requires soft-masked
  input**; unmasked/poorly-masked repeats blow up runtime (alignments enumerated to/from every
  repeat copy) and can hurt quality.
- **Remedy / verdict:** if inputs were unmasked or masking is unstated for an alignment-derived
  claim, **FLAG: masking precondition unmet/undocumented**.

### Gate E6 — Divergence-driven accuracy loss ignored
- **Checks:** whether a cross-clade alignment claim accounts for divergence.
- **Failure signature** ([[armstrong-2020-cactus]]): alignment accuracy drops with clade
  divergence — simulated F1 **0.989** for the primate clade vs **0.795** for the mammal clade;
  ancestral coding-base coverage is incomplete (~86% of human coding bases in the placental
  ancestor).
- **Remedy / verdict:** if a deep/divergent alignment is treated as equally accurate as a
  shallow one, **FLAG: accuracy overstated for divergence**.

---

## Verdict gate
Combine the gate results into one referee verdict:
- **pass** — every applicable gate cleared; the claim's definitions, scope, and reliable region
  are stated and consistent.
- **flagged: <cardinal sin>** — one or more gates tripped; name each sin, its signature, and its
  remedy. A tripped gate cannot be waved through with rationale; the analysis must be revised or
  the claim narrowed.
- **incomplete: provenance missing** — a threshold, reference, or genome count needed to referee
  the claim was never stated.

A referee never certifies a pangenome claim it could not actually check.
