---
title: "A draft human pangenome reference"
type: paper
source_id: liao-2023-hprc
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC10172123/
doi: 10.1038/s41586-023-05896-x
access_date: "2026-07-05"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Liao W-W, Asri M, Ebler J, et al. A draft human pangenome reference. Nature 617(7960):312-324, 2023. DOI 10.1038/s41586-023-05896-x. Summary derived from the open-access PMC full text."
derived: license-aware-summary
---

# Liao et al. 2023 — A draft human pangenome reference

## 1. Citation
Liao W-W, Asri M, Ebler J, et al. (Human Pangenome Reference Consortium). 2023.
"A draft human pangenome reference." *Nature* 617(7960):312–324.
DOI: 10.1038/s41586-023-05896-x. Open access: PMC10172123
(https://pmc.ncbi.nlm.nih.gov/articles/PMC10172123/).

## 2. Access note
Full text read via PMC (PMC10172123). Extraction done against the PMC HTML. I did not open
supplementary/extended-data files; all numbers below are from the main-text body as served by PMC.
**License: Creative Commons Attribution 4.0 International (CC BY 4.0)** — page states the article
"is licensed under a Creative Commons Attribution 4.0 International License, which permits use,
sharing, adaptation, distribution and reproduction in any medium or format." **Quoting mode: verbatim
load-bearing quotes permitted** (used in §7).

## 3. Thesis (1 sentence)
The HPRC presents a first-draft human pangenome reference built from 47 phased diploid assemblies of
genetically diverse individuals that captures known and novel variation and, used as a graph reference,
improves short-read variant discovery over the single linear GRCh38 reference.

## 4. Problem & context
The single linear reference (GRCh38) is one mostly-European mosaic that induces reference bias and
misses sequence and structural variation present in other populations. The goal is a graph-based
pangenome that represents many haplotypes simultaneously so that short-read analysis can map and
genotype against diversity rather than against one arbitrary path. This is the "first release" of a
consortium effort aiming at 350 individuals / 700 haplotypes.

## 5. Method / approach
- **Assemblies:** 47 fully phased, diploid assemblies. Samples selected to represent global genetic
  diversity; 29 of the HPRC samples drawn from 1000 Genomes Project (1KG) lymphoblastoid cell lines,
  spanning African, East Asian, South Asian, European, and American ancestry groups.
- **Assembly quality:** average QV 53.57 (≈1 base error per 227,509 bases); haploid assemblies with
  an X chromosome averaged 3.04 Gb total length (99.3% the length of T2T-CHM13); average haplotype
  switch-error rate 0.67%, Hamming error rate 0.79%. Assemblies cover >99% of expected sequence and
  are >99% accurate at structural and base-pair levels.
- **Graph construction:** three graph-construction methods applied — **Minigraph**,
  **Minigraph-Cactus (MC)**, and **PanGenome Graph Builder (PGGB)**.
- **Anchoring references:** both **GRCh38 and T2T-CHM13** are incorporated within the pangenomes.
- **Downstream evaluation:** short-read data mapped/genotyped against the draft pangenome (MC graph)
  and compared to GRCh38-based workflows for small-variant and SV discovery.

## 6. Key claims / findings (atomic)
- The pangenome contains **47 phased, diploid assemblies** (= 94 haplotypes) from a genetically
  diverse cohort.
- Assemblies cover **>99%** of expected sequence per genome and are **>99% accurate** at structural
  and base-pair levels.
- Adds **119 million bp** of euchromatic polymorphic sequence and **1,115 gene duplications** relative
  to GRCh38; roughly **90 million** of the added bp derive from structural variation.
- The MC graph contains **22 million small variants** and **67,000 SVs**.
- Using the draft pangenome for short-read analysis **reduced small-variant discovery errors by 34%**
  and **increased SVs detected per haplotype by 104%** vs GRCh38-based workflows.
- In "easy" unique regions (75.42% of the autosomal genome), samples showed **mean 99.64% recall and
  99.64% precision** for small variants in the MC graph.
- Variant-calling performance was **lower in highly repetitive regions (3.87% of the autosomal
  genome)** and lower for SVs than small variants.
- On average ~136 Mb (4.4%) of T2T-CHM13 was not covered by any alignment.
- PGGB vs Minigraph/MC differ in topology at copy-number-polymorphic loci (see §7 q3).

## 7. Load-bearing statements — VERBATIM (CC BY 4.0)
1. (Abstract) "The pangenome contains 47 phased, diploid assemblies from a cohort of genetically
   diverse individuals. These assemblies cover more than 99% of the expected sequence in each genome
   and are more than 99% accurate at the structural and base pair levels."
2. (Abstract) "We also add 119 million base pairs of euchromatic polymorphic sequences and 1,115 gene
   duplications relative to the existing reference GRCh38. Roughly 90 million of the additional base
   pairs are derived from structural variation."
3. (Results) "Using our draft pangenome to analyse short-read data reduced small variant discovery
   errors by 34% and increased the number of structural variants detected per haplotype by 104%
   compared with GRCh38-based workflows."
4. (Results — repeat-region limitation) "Variant calling performance was lower in highly repetitive
   genome regions (3.87% of autosomal genome; Fig. 4a,b), for which more work will be required to
   achieve high-quality variant maps."
5. (Results — builder topology disagreement) "PGGB tends to collapse copy-number polymorphic loci
   like segmental duplications and VNTRs into a single copy through which haplotypes loop, while
   Minigraph and MC do not." And: "In general, in the PGGB graph, many SV hotspots, including the
   centromeres, were transitively collapsed into loops through a subgraph representing a single
   repeat copy."

## 8. Stated scope, assumptions, limitations (source's own caveats)
- Explicitly a **draft / first release** — "a draft human pangenome, the first release from the Human
  Pangenome Reference Consortium (HPRC)," aiming to "better capture global genomic diversity across
  the 700 haplotypes of 350 individuals." Current 47 assemblies are a starting point, not the target.
- **Highly repetitive regions (3.87% of autosomal genome) underperform** for variant calling and need
  more work.
- **SV performance lower than small-variant performance.**
- ~136 Mb (4.4%) of T2T-CHM13 was not covered by any alignment — "systematically unassembled or
  cannot be reliably aligned."
- Segmental-duplication assembly errors correlate with longer, more-identical SDs (median 288 kb vs
  96.3 kb; 98.9% vs 97.1% identity).

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Graph genotyping/variant calling degrades in highly repetitive regions.** Verbatim: "Variant
  calling performance was lower in highly repetitive genome regions (3.87% of autosomal genome…), for
  which more work will be required to achieve high-quality variant maps." So high-confidence
  pangenome-based genotype claims are limited to the "easy," relatively unique ~75% of the autosome;
  centromeres, segmental duplications, and VNTRs are the weak zones.
- **Graph builders disagree on topology at repeats.** PGGB collapses copy-number-polymorphic loci
  (SDs, VNTRs, centromeres) into single-copy loops that haplotypes traverse; Minigraph and MC do not.
  So the same input yields structurally different graphs at exactly the loci where genotyping is
  already least reliable — the graph representation itself is method-dependent there.
- **SV genotyping less reliable than small-variant genotyping** (performance "lower for SVs than for
  small variants").
- **Alignment gaps:** ~4.4% of T2T-CHM13 uncovered → some regions systematically unassembled/unalignable.

## 10. What the source does NOT address (confident silences)
- **PanGenie is not named** in the main-text content read; the paper's short-read evaluation uses the
  MC graph pipeline, not PanGenie by name. (Guidance q2 named PanGenie only as an example; the
  repeat-region limitation is stated for the paper's own graph genotyping, not attributed to PanGenie.)
- No explicit **allele-balance-at-heterozygous-sites** metric for reference-bias reduction was found in
  the read content; reference-bias improvement is quantified as the 34% error reduction / 104% SV
  increase, not as allele-fraction balance.

## 11. Open questions / ambiguities
- Exact per-sample variant counts vs the graph-aggregate counts (22M small variants, 67,000 SVs are
  graph-level) not separated in the read content.
- How much of the builder-topology disagreement propagates into differing genotype calls is described
  qualitatively, not quantified in the read content.

## 12. Guidance answers
**q1 — haplotype/sample count and variants resolved.** 47 phased diploid assemblies (94 haplotypes).
Graph-level variant content in the MC graph: **22 million small variants** and **67,000 SVs**. Adds
119 Mb euchromatic polymorphic sequence and 1,115 gene duplications vs GRCh38 (~90 Mb from SVs).
NOTE: the claim-under-test's "90 haplotypes, ~6.4M variants" does NOT match — the paper says **94
haplotypes** and **22M small variants + 67,000 SVs** in the MC graph.

**q2 — graph-genotyping limitation in repetitive regions (referee-relevant, verbatim).** "Variant
calling performance was lower in highly repetitive genome regions (3.87% of autosomal genome;
Fig. 4a,b), for which more work will be required to achieve high-quality variant maps." (Contrast:
"easy" unique regions = 75.42% of the autosome at 99.64% recall/precision.) The paper does NOT name
PanGenie; this limitation is stated for its own graph-based variant calling.

**q3 — graph builders and topology disagreement (verbatim).** Three builders: **Minigraph,
Minigraph-Cactus (MC), and PanGenome Graph Builder (PGGB)**. They disagree on topology: "PGGB tends to
collapse copy-number polymorphic loci like segmental duplications and VNTRs into a single copy through
which haplotypes loop, while Minigraph and MC do not." And centromeres/SV hotspots are "transitively
collapsed into loops" in PGGB.

**q4 — reference-bias reduction quantified.** Yes: "reduced small variant discovery errors by 34% and
increased the number of structural variants detected per haplotype by 104% compared with GRCh38-based
workflows." (No allele-balance metric found in read content.)

**q5 — anchoring reference(s) (verbatim).** Both "GRCh38 and T2T-CHM13 references within the
pangenomes." Assembly length compared to T2T-CHM13 (haploid X-bearing assemblies = 99.3% its length).
