---
title: "Cell Hashing with barcoded antibodies enables multiplexing and doublet detection for single cell genomics"
type: paper
source_id: stoeckius-2018-cell-hashing
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC6300015/
access_date: "2026-07-13"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Stoeckius M, Zheng S, Houck-Loomis B, Hao S, Yeung BZ, Mauck WM III, Smibert P, Satija R. Cell Hashing with barcoded antibodies enables multiplexing and doublet detection for single cell genomics. Genome Biology. 2018;19:224. doi:10.1186/s13059-018-1603-1. Licensed CC BY 4.0."
derived: license-aware-summary
tags:
  - domain/single-cell-genomics
---

# Stoeckius et al. 2018 — Cell Hashing (Genome Biology 19:224)

## 1. Citation

Stoeckius M, Zheng S, Houck-Loomis B, Hao S, Yeung BZ, Mauck WM III, Smibert P, Satija R.
"Cell Hashing with barcoded antibodies enables multiplexing and doublet detection for single cell
genomics." *Genome Biology* 2018;19:224. doi:10.1186/s13059-018-1603-1. PMID 30567574;
PMCID PMC6300015.

- Received 2018 Jun 5; Accepted 2018 Dec 4; published 2018 Dec 19. Collection date 2018.
- Open access: https://pmc.ncbi.nlm.nih.gov/articles/PMC6300015/ (accessed 2026-07-13).
- Data: Gene Expression Omnibus accession **GSE108313**. Software: Seurat
  (https://github.com/satijalab/seurat). Protocols: www.cite-seq.com.
- Marlon Stoeckius and Shiwei Zheng contributed equally; Smibert and Satija are corresponding authors.

**Author-list discrepancy [summarizer flag].** The tasking citation listed additional authors
(Yeung D, Hafemeister C, Papalexi E, Mimitou EP, Jain J, Srivastava A, Stuart T, Fleming LM,
Rosenthal AJ, Smibert CA). The article as published at PMC lists **eight** authors, given above.
The list above is the source's own.

**License (verbatim, from the article's Copyright and License information):**
> "**Open Access** This article is distributed under the terms of the Creative Commons Attribution 4.0
> International License (http://creativecommons.org/licenses/by/4.0/), which permits unrestricted use,
> distribution, and reproduction in any medium, provided you give appropriate credit to the original
> author(s) and the source, provide a link to the Creative Commons license, and indicate if changes
> were made. The Creative Commons Public Domain Dedication waiver
> (http://creativecommons.org/publicdomain/zero/1.0/) applies to the data made available in this
> article, unless otherwise stated."

**Competing interests (verbatim, load-bearing for provenance):**
> "MS, PS and BHL have filed a patent application based on this work (US provisional patent
> application 62/515-180). BZY is an employee at BioLegend Inc., which is the exclusive licensee of
> the New York Genome Center patent application related to this work. All other authors declare that
> they have no competing interests."

## 2. Access note

Full text (Abstract, Introduction, Results, Discussion, Methods, Computational methods, data
availability, competing interests) read in full from PMC. **Not read:** the three additional files —
Additional file 1 (supplementary figures S1–S5, PDF), Additional file 2 (Table S1, µg antibody per
condition), Additional file 3 (Table S2, sample composition). Several numbers below are cited by the
main text *to* those supplementary figures; the figures themselves were not inspected. Figure panels
(Fig. 1–3) were not viewed as images; their content is taken from the legends and body text.

## 3. Thesis

Oligo-tagged antibodies against ubiquitously expressed surface proteins can uniquely label cells from
distinct samples so those samples can be pooled into a single droplet scRNA-seq run, then
computationally demultiplexed — simultaneously enabling sample assignment, cross-sample multiplet
detection, and cost-reducing "super-loading."

## 4. Problem & context

- Per-cell library-prep cost remains high; profiling tens to hundreds of thousands of cells is costly.
- Multiplets are an unsolved problem: multiplets give higher-complexity libraries than singlets, but
  the source states this signal "is not sufficient for unambiguous identification" (citing ref. 11).
- Technical/batch effects have been shown to mask biological signal in integrated scRNA-seq analysis
  (citing ref. 12), motivating experimental rather than purely computational solutions.
- Prior art the paper builds on: **demuxlet** (Kang et al., ref. 13) pools genotypically distinct
  donors and uses genetic polymorphisms as the sample fingerprint; and CITE-seq (Stoeckius et al.,
  ref. 18) from the same group, which converts surface-protein detection into a sequenceable readout.
- Stated constraint of the genetic route, in the Introduction: *"this elegant approach requires pooled
  samples to originate from previously genotyped individuals"* (verbatim).

## 5. Method / approach

### 5.1 The reagent — what is attached, to what, when

- **First-generation (used in the main PBMC experiment):** monoclonal antibodies against four
  ubiquitously and highly expressed *immune* surface markers — **CD45** [clone HI30], **CD98** [clone
  MEM-108], **CD44** [clone BJ18], **CD11a** [clone HI111] — combined into eight identical pools
  (**pool A through H**), each pool conjugated to a distinct **Hashtag oligonucleotide (HTO)**.
- **Second-generation / "universal" reagent:** a pool of antibodies against **B2M** [clone 2M2] (MHC
  class I / beta-2-microglobulin) and **CD298** [clone LNH-94] (sodium-potassium ATPase subunit),
  purchased from BioLegend. Rationale: these are "among the most broadly expressed surface proteins in
  human tissues" (citing ref. 21, Human Protein Atlas). Using a *pool* rather than a single antibody
  "mitigates the possibility that stochastic or cell type variation in the expression of any one
  marker would introduce bias in HTO recovery."
- Each HTO carries a **unique 12-bp barcode**, sequenced alongside the transcriptome.
- Conjugation: **iEDDA click chemistry** (methyltetrazine-PEG4-NHS ester on antibody at 30-fold
  excess, 30 min RT; 5′-amine HTO reacted with 20-fold excess *trans*-cyclooctene-PEG4-NHS in 1X
  borate buffered saline + 20% DMSO, 30 min), covalent and irreversible; conjugates formed by mixing
  and incubating ≥ 1 h at RT; cleanup by Amicon centrifugal filtration (30 kDa MWCO to concentrate to
  1 mg/ml; 50 kDa MWCO after conjugation).
- **Workflow step:** cells from each sample are stained *separately* with their HTO-conjugated
  antibody pool, then **pooled** and loaded into the droplet instrument. Staining is done as for
  CITE-seq (ref. 18).

**Oligonucleotide sequences (functional strings, verbatim):**

```
Hashtag oligo: GTGACTGGAGTTCAGACGTGTGCTCTTCCGATCTxxxxxxxxxxxxB AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA*A A
HTO additive:  GTGACTGGAGTTCAGACGTGTGCTC
ADT additive:  CCTTGGCACCCGAGAATTCC
SI-PCR:        AATGATACGGCGACCACCGAGATCTACACTCTTTCCCTACACGACGC*T*C
RPI-x:         CAAGCAGAAGACGGCATACGAGATxxxxxxxxGTGACTGGAGTTCCTTGGCACCCGAGAATTCCA
D7xx_s:        CAAGCAGAAGACGGCATACGAGATxxxxxxxxGTGACTGGAGTTCAGACGTGTGC
x: Barcode or index sequence;  B: T,G,C, not A;  *: Phosphorothioate bond
```
(Note: whitespace within the Hashtag oligo line reflects markup in the PMC rendering of the polyA
tail; the intended sequence is the 12-bp barcode `x…x` + `B` + a polyA tract ending in a
phosphorothioate bond.)

### 5.2 Library generation — the extra library and its cost

- HTOs use a **different amplification handle** than CITE-seq antibody-derived tags (ADTs), so
  HTO, ADT, and scRNA-seq libraries are **independently amplified and pooled at desired quantities**.
- 10x Genomics Single Cell 3′ v2 workflow, standard through cDNA amplification. **2 pmol** each of the
  HTO and ADT additive oligos are spiked into the cDNA amplification PCR.
- **0.6X SPRI** separates the large cDNA fraction (on beads → transcriptome library) from the ADT/HTO
  fraction (in supernatant). An additional **1.4X** volume of SPRI beads is added to the ADT/HTO
  fraction to bring the ratio to **2.0X**; wash in 80% ethanol, elute in water, then a second **2.0X**
  SPRI to remove excess single-stranded oligos.
- Separate PCRs: ADT library (SI-PCR + RPI-x primers); **HTO library (SI-PCR + D7xx_s primers)**.
- Sequenced on **Illumina HiSeq2500 (two rapid run flowcells)**, aiming for a **90% : 5% : 5%**
  contribution of transcriptome : HTO : ADT libraries in the sequencing data.
- **Stated added sequencing cost of Cell Hashing: "approximately 2–5% of transcriptome sequencing
  costs"** (Discussion).

### 5.3 The main experiment

- PBMCs from **eight** human donors (A–H), each stained with one HTO-conjugated pool, while
  simultaneously running a **CITE-seq titration** of seven immunophenotypic markers
  (CD8 [RPA-T8], CD45RA [HI100], CD4 [RPA-T4], HLA-DR [L243], CD3 [UCHT1], CCR7 [G043H7],
  PD-1 [EH12.2H7]; BioLegend, 1–2 conjugated oligos per antibody on average).
- Pooled in equal proportion with an **equal number of unstained HEK293T** cells and **3% mouse
  NIH-3T3** cells as **negative controls** (both unlabeled by HTOs).
- Run in a **single lane** of 10x Genomics Chromium Single Cell 3′ v2.
- Donors A–G were stained with CITE-seq antibodies; **donor H was not** (unstained control) — this is
  later used as an independent test of donor calls.
- Genotyping of all 8 PBMC samples and HEK293T with the **Illumina Infinium CoreExome 24 array**, so
  HTOs and genotypes could be used as **independent** demultiplexing approaches.

### 5.4 "Super-loading" (definition + numbers)

Verbatim (Results): *"Following the approach in Kang et al. [13], we 'super-loaded' the 10x Genomics
instrument, loading cells at a significantly higher concentration with an expected yield of 20,000
single cells and 5000 multiplets."*

- Expected: **20,000 singlets + 5000 multiplets**.
- By Poisson statistics, **4365** of those multiplets should be combinations from *distinct* samples
  and can be discarded → **unresolved (within-sample) multiplet rate of 3.1%**.
- Achieving a similar multiplet rate *without* multiplexing would yield **~4000 singlets**.
- Since the cost of commercial droplet systems is fixed per run for sample prep, multiplexing allows
  profiling **~400% more cells for the same cost**.
- Discussion adds: the per-cell library-prep saving approaches **an order of magnitude** as the number
  of multiplexed samples increases; and Cell Hashing "enables even a single sample to be highly
  multiplexed, as cells can be split into an arbitrary number of pools."
- Offsetting cost, credited to Kang et al.: *"savings in library prep are partially offset by reads
  originating from multiplets, which must be sequenced and discarded."*

### 5.5 Computational pipeline (named software + versions)

| Step | Tool / version | Parameters |
|---|---|---|
| Read processing, alignment, DGE | **Drop-seq tools v1.0** (McCarroll Lab) | Fastqs from the 10x libraries (four distinct barcodes) pooled; aligned to **hg19-mm10 concatenated reference**; top **50,000** cell barcodes kept in the raw digital expression matrix |
| ADT + HTO counting | **CITE-seq-Count** (https://github.com/Hoohm/CITE-seq-Count), a python implementation of the tag-quantification pipeline from ref. 18 | run with **default parameters (maximum hamming distance of 1)** |
| Genotype VCF | **PLINK v1.07** | VCF with individual genotype (GT) from the Infinium CoreExome 24 array; contains the 8 PBMC donors **and HEK293T** |
| Genotype demultiplexing | **demuxlet** (ref. 13) | inputs = that VCF + the tagged BAM from the Drop-seq pipeline; **default parameters** |
| RNA normalization / clustering / HTO classification | **Seurat R package version 3.0** | `CollapseSpeciesExpressionMatrix` to keep top 100 mouse genes + all human genes; `FindClusters` (default params) for ADT clustering |
| Low-quality-cell classification | **ranger** R package (random forests, ref. 36) | classifier trained on 13,954 PBMCs, 1000 most variable genes, cluster identities as labels |

Species-control removal: a low-resolution pre-clustering (PCA on the **500 most highly expressed
genes**, then **k-medoids** on a distance matrix from the **first 2 PCs**) identified **160 NIH-3T3**
and **2233 HEK293T** cells out of **20,854** barcodes with ≥ 200 UMI; all were excluded.

### 5.6 HTO classification procedure — end to end (the core method)

1. **Barcode set.** "We classified all barcodes where we detected at least **200 RNA UMI**, regardless
   of HTO signal" (20,854 barcodes in the main experiment).
2. **Normalization — centered log ratio (CLR).** Raw HTO counts are divided by the geometric mean of
   that HTO across cells and log-transformed (natural log):

   `x_i' = log( x_i / ( Π_{i=1..n} x_i )^(1/n) )`

   where `x_i` = count for a given HTO in cell *i*, `n` = total cell number.
3. **Clustering to seed the background.** **k-medoids clustering** of all cells on the normalized HTO
   data with **k = 9** (8 HTOs + 1). Eight clusters were each highly enriched for one HTO; the ninth
   was enriched for cells with low expression of all HTOs. This is "an initial solution to the
   demultiplexing problem."
4. **Per-HTO background fit.** For each of the 8 HTOs independently: identify the k-medoids cluster
   with the **highest average expression of that HTO** and **exclude those cells**; then fit a
   **negative binomial distribution** to the remaining HTO values, **after further excluding the
   highest 0.5% of values as potential outliers**.
5. **Threshold (the exact cutoff).** Compute the **q = 0.99 quantile** of the fitted negative binomial
   and threshold every cell against this **HTO-specific** value.

   Verbatim (Results): *"Barcodes with HTO signals above the 99% quantile for this distribution were
   labeled as 'positive,' and barcodes that were 'positive' for more than one HTO were labeled as
   multiplets."*
6. **Calls from the positives** (Methods, verbatim): *"Barcodes that were positive for only one HTO
   were classified as singlets. Barcodes that were positive for two or more HTOs were classified as
   multiplets and assigned sample IDs based on their two most highly expressed HTO. Barcodes that were
   negative for all eight HTOs were classified as 'negative.'"*
7. **Visualization.** Euclidean distances on the normalized HTO data → tSNE (Fig. 1d).

Downstream transcriptome clustering: PCA on the **1000 most highly variable genes** (variance/mean
ratio), distance matrix from the **first 10 PCs** → tSNE + graph-based clustering in Seurat; **seven**
hematopoietic clusters annotated by canonical markers.

### 5.7 Ancillary experiments

- **CITE-seq antibody titration** (multiplexed via hashing): concentrations **5, 3, 1, 0.5, 0.25,
  0.06, and 0 µg per test**, staggered across batches so total antibody + oligo stays constant.
  Staining index computed as `SI = (Pos_0.5 − Neg_0.5) / (2 × mad(Neg))` — difference of positive and
  negative peak medians over twice the mean absolute deviation of the negative peak. Negative peak
  approximated using **unstained control cells (donor H)**; positive peak from the maximally
  ADT-enriched Seurat cluster in donors A–G.
- **Cell-line cross-check of background binding:** four cell lines (**HEK293T, THP1, K562, KG1**),
  each labeled with **three distinct** Cell Hashing oligos, mixed; demultiplexed, then RNA-clustered
  into four transcriptomic clusters.
- **Dilution / oligo-competition experiment:** Jurkat cells stained with decreasing concentrations
  (**1:100, 1:500, 1:1000**) of the B2M/CD298 hashing antibodies, ~2000 cells per 10x lane, vs. a
  non-hashed control lane; subsampled to the same cells and reads per cell to compare UMI and gene
  counts.
- **Low-quality-cell rescue:** re-applying the previously determined HTO thresholds to barcodes with
  **50–200 UMI**.

## 6. Key claims / findings

1. **Pairwise HTO counts look like species-mixing plots** — mutually exclusive between singlets
   (Fig. 1b; axes clipped at **99.9% quantiles** to exclude visual outliers).
2. **Main experiment yield:** after removing HEK293T and mouse cells, **14,002 singlets** and **2974
   identifiable multiplets** — "in line with expectations."
3. **All 28 possible cross-sample doublet combinations** were visible as distinct groups in an HTO-only
   tSNE, alongside the 8 singlet clusters (Fig. 1d).
4. **"Negative" barcodes** (negligible signal for every HTO) consisted **primarily (86.5%)** of the
   unlabeled HEK293T and mouse cells.
5. **Multiplets show a positive shift in RNA UMI**, as expected (Fig. 1e) — **but** the large dynamic
   range of UMI in multiplets illustrates that UMI count alone cannot unambiguously call multiplets;
   the same challenge holds for **total HTO signal** (Additional file 1: Fig. S1A).
6. **Transcriptome clustering of hashed singlets** recovered seven hematopoietic subpopulations
   interspersed across all 8 donors (Fig. 1f).
7. **Concordance with demuxlet is strong overall**, "even when considering the precise sample mixture
   in called doublets" (row-normalized confusion matrix, Fig. 2a). **13,421 concordant** singlet/doublet
   classifications.
8. **871 barcodes** were HTO-singlets but **demuxlet-"ambiguous."** Their HTO classification strength
   (reads on the top HTO) was *identical* to fully concordant singlets (Fig. 2b), but they had
   **reduced RNA UMI counts** (Fig. 2c). Authors' conclusion: these could not be *genetically*
   classified at their sequencing depth.
9. **Sequencing depth of this experiment: ~24,115 reads per cell**, which the authors state is **below
   the recommended depth for using demuxlet**.
10. **2528 barcodes** received discordant singlet/doublet calls between the two techniques. Only
    barcodes called doublets by *both* showed a positive shift in transcriptomic complexity (Fig. 2d)
    → the authors read the discordant calls as **conservative false positives from both methods**,
    "perhaps due to ambient RNA or HTO signal."
11. **Restricting to demuxlet doublet calls with > 95% probability produced a 75% drop in the number of
    discordant calls** (Fig. 2e).
12. **216 / 11,464 (1.9%)** of barcodes called singlets by *both* methods received **discordant donor**
    assignments. Using donor H (the only donor **not** stained with CITE-seq antibodies) as an
    independent arbiter: in **40** instances where demuxlet — but not Cell Hashing — called a cell
    donor H, **37** had robust (**> 1000**) ADT counts. The authors call these **misclassification
    errors from demuxlet**, "in line with demuxlet's estimated error rate of **1–2%** [13]."
13. **Cell-line experiment:** demultiplexing vs. transcriptomic cluster identity showed **nearly
    perfect concordance (99.7%)**, i.e., a low misassignment rate for that experiment.
14. **Cell Hashing false-negative rate = 0.9%:** **117** barcodes classified "negative" by HTO but
    whose transcriptomes clustered within PBMC singlet subtypes; stated to have "negligible effects on
    cell type proportion estimates" (Additional file 1: Fig. S4).
15. **Recovering low-RNA cells:** among **4344** barcodes with **50–200 UMI**, HTO classification
    recovered **1110 additional singlets** and called **3108** negatives. Predicted singlets projected
    cleanly onto B / NK / T / myeloid populations on tSNE; "negative" barcodes did **not** separate by
    their forced classification, consistent with ambient-RNA mixtures. Hashing therefore gives a
    sample-identity readout **independent of the transcriptome**, allowing the UMI cutoff (previously
    200) to be relaxed.
16. **Titration result:** all antibodies showed only background signal in negative-control conditions
    and very weak signal-to-noise at **0.06 µg/test**; signal-to-noise for most antibodies **began to
    saturate at 0.5–1 µg/test**, comparable to recommended flow-cytometry concentrations.
17. **No transcriptomic-complexity penalty from hashing:** Jurkat cells hashed with the B2M/CD298 pool
    at 1:100–1:1000 had read-vs-UMI relationships **indistinguishable from non-hashed cells** at all
    tested concentrations (Additional file 1: Fig. S5), addressing the concern that polyA-containing
    HTOs might compete with cellular mRNA.
18. **HEK293T caveat found via demuxlet:** **225** barcodes were called HEK by demuxlet but clustered
    transcriptomically with PBMCs; they expressed **tenfold fewer UMI** than transcriptomically
    classified HEK293T cells and lacked HEK293T-specific transcripts (e.g., **NGFRAP1**) — excluded
    from all further analysis.
19. Of cells transcriptomically annotated as HEK293T/NIH-3T3 (unlabeled), **60.1%** were HTO-annotated
    "negative" and **32.1%** were HTO-annotated **singlets** — "in agreement with our expected ratios
    in our 'super-loaded' 10x Genomics experiment," i.e., these singlet calls are PBMC+HEK/3T3 doublets.

## 7. Load-bearing statements (VERBATIM — license-aware mode; CC BY 4.0 permits reproduction)

1. **The threshold** (Results, "Hashtag-enabled demultiplexing…"):
   > "Briefly, we modeled the “background” signal for each HTO independently as a negative binomial
   > distribution, estimating background cells based on the results of an initial *k*-medoids clustering
   > of all HTO reads (“Methods” section). Barcodes with HTO signals above the 99% quantile for this
   > distribution were labeled as “positive,” and barcodes that were “positive” for more than one HTO
   > were labeled as multiplets. We classified all barcodes where we detected at least 200 RNA UMI,
   > regardless of HTO signal."

2. **The two-column trade-off** (Discussion) — *the* passage for route selection:
   > "Our approach is complementary to pioneering genetic multiplexing strategies, with each having
   > unique advantages. Genetic multiplexing does not utilize exogenous barcodes and therefore does not
   > require alterations to existing workflows prior to or after sample pooling. In contrast, Cell
   > Hashing requires incubation with antibodies against ubiquitously expressed surface proteins but can
   > multiplex samples with the same genotype. Both methods do slightly increase downstream sequencing
   > costs, due to the increased depth or read length needed to identify SNPs (genetic approaches) or
   > sequencing of HTO libraries (Cell Hashing; approximately 2–5% of transcriptome sequencing costs).
   > We believe that researchers will benefit from both approaches, enabling multiplexing for a broad
   > range of experimental designs. In particular, we envision that our method will be most useful when
   > processing genetically identical samples subjected to diverse perturbations (or experimental
   > conditions/optimizations, as in our titration experiment) or to reduce the doublet rate when
   > running cells from a single sample."

3. **The genotype route's stated requirement** (Introduction):
   > "While this elegant approach requires pooled samples to originate from previously genotyped
   > individuals, in principle, any approach assigning sample fingerprints that can be measured
   > alongside scRNA-seq would enable a similar strategy."

4. **The disagreement explanation + depth** (Results, "Genotype-based demultiplexing validates Cell
   Hashing"):
   > "We conclude that these barcodes likely could not be genetically classified at our relatively
   > shallow sequencing depth (~ 24,115 reads per cell), which is below the recommended depth for using
   > demuxlet, but likely represent true single cells based on our HTO classifications."

   and, on the doublet disagreements:
   > "We note that this does reflect a minority of barcodes (compared to 13,421 concordant
   > classifications) and that in these discordant cases, it is difficult to be certain which of these
   > methods is correct."

5. **The undetectable-doublet limitation + the epitope limitation** (Discussion):
   > "Informatic detection of multiplets based on transcriptomic data also remains an important
   > challenge for the field, for example, to identify doublets originating from two cells within the
   > same sample."

   > "We however caution that there can be instances when a cell type of interest does not express these
   > virtually ubiquitous surface proteins, which would result in failure to successfully label and
   > demultiplex these cells."

## 8. Stated scope, assumptions, limitations (the source's own caveats)

- **Epitope dependence.** The universal reagent assumes B2M and CD298 are expressed; the authors
  explicitly caution that a cell type of interest may not express them, which "would result in failure
  to successfully label and demultiplex these cells."
- **Nuclei not covered.** For single-nucleus sequencing, "an additional set of hashing reagents
  directed against nuclear proteins would further generalize this approach" — i.e., the reagents
  presented do not cover nuclei.
- **Human-only demonstration.** Reagents are described as applicable "to virtually any human sample
  with readily available commercial reagents." Mouse NIH-3T3 cells appear only as *unlabeled* negative
  controls. Generalization "regardless of species, tissue, or technology" is framed as a future
  improvement, not a demonstrated result.
- **Within-sample doublets are not detected.** Hashing detects *cross-sample* multiplets; the residual
  is the **3.1% unresolved multiplet rate** in the super-loaded design, and the Discussion names
  same-sample doublet detection as still "an important challenge for the field."
- **A hashed "singlet" can still be a doublet with an unlabeled cell.** Methods: singlet calls "could
  also represent doublets of a PBMC with a HEK293T or NIH-3T3 cell, as the latter two populations were
  unlabeled."
- **Titration experiment is proof-of-concept only:** "an ideal titration experiment would use cells
  from the same donor for all conditions and a larger range of concentrations."
- **Random-forest caveat** (low-quality-cell classification): "we note that this classifier is
  guaranteed to return a result for each barcode."
- **Both methods slightly increase sequencing cost**; library-prep savings are partially offset by
  multiplet reads that must be sequenced and discarded (credited to Kang et al.).
- **Conflict of interest:** patent application filed on this work; a co-author is a BioLegend employee
  and BioLegend is the exclusive licensee.

## 9. Failure modes / invalidity patterns

| Failure mode | What the source says | Detector / symptom named |
|---|---|---|
| **Cell type lacks the target epitope** | Explicit caution: failure to label and demultiplex those cells | None given; mitigation is to use a **pool** of antibodies, which "mitigates the possibility that stochastic or cell type variation in the expression of any one marker would introduce bias in HTO recovery" |
| **Nuclei / non-antibody-accessible material** | Current reagents don't cover it | — (proposes future nuclear-protein reagents, aptamers, NHS chemistry, lipid-intercalating oligos, viral barcoding) |
| **Ambient RNA / ambient HTO signal** | Named as the likely cause of the **2528** discordant singlet/doublet calls: these "represent conservative false positives from both methods, perhaps due to ambient RNA or HTO signal" | Symptom: discordant "doublet" calls **do not** show the positive shift in transcriptomic complexity that concordant doublets show (Fig. 2d). Mitigation offered for demuxlet's arm: restricting to **> 95% posterior doublet probability** cut discordant calls by **75%**. No equivalent tunable posterior is offered for the HTO arm; the HTO-side control against background binding is the **negative-control cells** and the **4-cell-line experiment (99.7% concordance)** |
| **Same-sample (within-donor) doublets** | Not detectable by hashing (or by genetic multiplexing); residual **3.1%** in this design | Explicitly listed as an open challenge for the field |
| **Doublets with unlabeled cells** | Called as singlets | Detected here only because the negative-control cells were transcriptomically identifiable |
| **False negatives (true cells called "negative")** | **0.9%** (117 barcodes) — true single cells not receiving enough HTO signal | Detector used: their transcriptomes cluster **within** PBMC singlet subtypes rather than in the distinct "negative" cluster |
| **Empty droplets / ambient-RNA barcodes masquerading as cells** | "Negative" barcodes with low UMI likely represent failed reactions or empty droplets containing only ambient RNA | Detector: forced classification into the 7 hematopoietic populations does **not** produce separated tSNE groups for negatives, whereas it does for HTO-called singlets |
| **Multiplet calling from UMI count alone** | Rejected: the large dynamic range of RNA UMI in multiplets "illustrates the difficulty of unambiguous multiplet assignment based on higher UMI counts," and "we observe the same challenges with total HTO signal" | — |
| **Genotype route at shallow depth** | demuxlet returns **"ambiguous"** calls; discordantly classified cells had **lower numbers of sequencing reads and SNPs** | Detector: the `BEST` column of demuxlet's `*.best` output taking value **AMB** (vs. SNG / DBL); posterior in `PRB.DBL`. Threshold used by the authors as a filter: **PRB.DBL > 95%** |
| **Genotype route misassignment** | **1–2%** error rate, per Kang et al., corroborated here at **1.9%** discordant donor calls among mutual singlets | Detector used here: an orthogonal ADT signal (donor H was the only unstained donor) |
| **Oligo competition with polyA mRNA** | Hypothesized ("could label cells with an overwhelming number of single-stranded polyA oligos that might compete with polyadenylated cellular mRNAs, resulting in lower gene and/or UMI counts per cell") and then **tested and not observed** at 1:100–1:1000 | Detector: reads-vs-UMI/gene-count relationship compared against a non-hashed lane |

## 10. What the source does NOT address (confident silences)

- **No decision rule mapping a study design to a route.** The Discussion gives *use-cases where hashing
  is "most useful"* and lists each route's advantage/requirement, but it states no if/then rule, no
  decision tree, and no threshold for choosing genotype vs. hashing. It calls the approaches
  "complementary" and says "researchers will benefit from both approaches." See §12.
- **No stated recommended sequencing depth for demuxlet.** The paper says its own **~24,115 reads/cell**
  is "below the recommended depth for using demuxlet" but never gives the recommended number.
- **No head-to-head accuracy metric against a third ground truth.** Neither method is scored against an
  independent gold standard; where they disagree the paper says outright it "is difficult to be certain
  which of these methods is correct" and then argues from UMI-complexity shifts and ADT signal.
- **Batch effects are asserted, not measured.** The abstract names "sample-specific batch effects" as a
  motivating challenge, and the Discussion says multiplexing should help "as experimental designs seek
  to minimize technology-driven batch effects" — but **no experiment in this paper quantifies a
  reduction in batch effect**. The batch-effect claim is a motivating/design argument, backed by
  citations to prior work (refs. 11, 12, 14), **not by evidence generated here**. There is no
  hashed-vs-unhashed batch-effect comparison, no variance-decomposition, no metric.
- **No cost model in currency.** Costs are given as percentages/ratios (2–5% added sequencing; ~400%
  more cells; "approaching an order of magnitude"), never as dollars.
- **No performance guidance for scaling.** No statement about how many HTOs can be multiplexed at once
  beyond the 8 used (and 3-per-cell-line in the cell-line test); no statement about how the 0.99
  quantile behaves as HTO count grows, or how to pick `k` for k-medoids other than "k = 9" for 8 HTOs.
- **No non-human / non-mammalian / tissue (vs. dissociated cell) demonstration.**
- **No treatment of unequal pooling proportions.** All samples were pooled "at equal concentration."
- **No mention of Seurat's `HTODemux` by name** or of any specific function for HTO classification —
  only that the tools are "freely available as part of the open-source R package Seurat."

## 11. Open questions / ambiguities the source leaves unresolved

- Which method is right where they disagree — stated explicitly as unresolved.
- Whether the discordant doublet calls are ambient RNA, ambient HTO, or something else ("perhaps").
- Whether hashing generalizes across species, tissues, and technologies (framed as future work).
- Whether a nuclear-protein hashing reagent works (proposed, not tested).
- How to detect within-sample doublets ("remains an important challenge for the field").
- The 216 discordant-donor singlets are only partly adjudicated: donor H gave an arbiter for **40** of
  them; the rest are not resolved.

## 12. Guidance answers

### The method

- **What is attached, against what, at what step:** oligo-tagged (HTO) monoclonal antibodies against
  ubiquitous surface proteins — 1st gen **CD45/CD98/CD44/CD11a**; 2nd-gen "universal" pool **B2M +
  CD298**. Each HTO carries a **unique 12-bp barcode**. Staining is done **per sample, before pooling**
  (standard CITE-seq staining), then samples are pooled and loaded.
- **Extra library + cost:** a separate **HTO library** (distinct amplification handle from CITE-seq
  ADTs; amplified with SI-PCR + D7xx_s), separated from cDNA by 0.6X SPRI and cleaned with 2× 2.0X
  SPRI, sequenced alongside the transcriptome (the run targeted **90:5:5** transcriptome:HTO:ADT).
  **Stated cost: "approximately 2–5% of transcriptome sequencing costs."**
- **Classification procedure end to end:** see §5.6. **Normalization = centered log ratio (CLR)**
  (divide by the geometric mean of the HTO across cells, natural log). **Clustering = k-medoids on
  normalized HTO data with k = 9.** **Background distribution = negative binomial**, fit per HTO after
  excluding (a) the k-medoids cluster with the highest average expression of that HTO and (b) the
  **highest 0.5%** of the remaining values. **Cutoff = the q = 0.99 quantile** of that fitted
  distribution, HTO-specific. Threshold quoted verbatim in §7.1.
- **Singlet / multiplet / negative:** verbatim in §7 and §5.6 step 6 — positive for exactly one HTO =
  **singlet**; positive for ≥ 2 HTOs = **multiplet** (sample IDs from the two most highly expressed
  HTOs); negative for all 8 = **negative**. Only barcodes with **≥ 200 RNA UMI** were classified
  (later relaxed to 50–200 UMI for the low-quality-cell rescue).
- **Super-loading + doublet rates:** loading at significantly higher concentration than standard, here
  targeting **20,000 singlets and 5000 multiplets** in one lane. **With** multiplexing: **4365** of the
  5000 multiplets are cross-sample and discardable → **3.1% unresolved multiplet rate** while keeping
  ~20,000 cells. **Without** multiplexing, that same 3.1% rate would be achieved only at **~4000
  singlets** → multiplexing gives **~400% more cells for the same cost**. Observed in practice:
  **14,002 singlets, 2974 identifiable multiplets** after removing control cells.
- **Software / versions / artifacts:** Drop-seq tools v1.0 → hg19-mm10 aligned BAM + DGE (top 50,000
  barcodes); CITE-seq-Count (Hoohm/CITE-seq-Count, default params, max hamming distance 1) → HTO/ADT
  count matrices; PLINK v1.07 → VCF (GT) from the Infinium CoreExome 24 array; demuxlet (VCF + tagged
  BAM → `*.best` with `BEST` ∈ {SNG, DBL, AMB} and `PRB.DBL`); Seurat v3.0 for normalization,
  classification, clustering; ranger for the random-forest cell-type classifier. Data: **GSE108313**.

### The comparison — provenance

- **Yes, there is a head-to-head comparison** ("Genotype-based demultiplexing validates Cell Hashing").
- **Design of that comparison — who owns what:**
  - **The data are the hashing authors' own.** One 10x lane, their 8 PBMC donors, their pooling design,
    their super-loading, their sequencing (~24,115 reads/cell).
  - **The genotypes are the hashing authors' own**: they genotyped all 8 PBMC samples and HEK293T on
    the Illumina Infinium CoreExome 24 array, and built the VCF with PLINK v1.07.
  - **The hashing authors ran the demuxlet arm themselves**, with **default parameters**, on their own
    VCF + their own Drop-seq-tagged BAM. The demuxlet authors (Kang et al.) are **not** authors here and
    there is no indication they were involved.
  - **Both arms were therefore executed and interpreted by the group that owns the hashing method.**
    Two of them have a **patent application** on this work, and a co-author is a **BioLegend** employee
    (BioLegend being the exclusive licensee). **Every comparative claim below is the hashing authors'
    assessment of the other method, not a neutral third-party benchmark.**
  - **Directionality of the framing** is visible in the section title itself: demuxlet is cast as the
    *validator* of Cell Hashing.
- **Where they disagreed, and the authors' explanation:**
  - **871** HTO-singlets called **AMB** by demuxlet → authors attribute this to **their own shallow
    sequencing depth**: **~24,115 reads/cell**, which they state is **below the recommended depth for
    using demuxlet** (the recommended depth is **not stated**). Supporting evidence they give:
    discordant barcodes had **identical** HTO classification strength but **lower RNA UMI**, and
    (Additional file 1: Fig. S2A-D) lower read and SNP counts. **This is the hashing authors explaining
    away a failure of the arm they ran, on data whose depth they chose.**
  - **2528** discordant singlet/doublet calls (vs. 13,421 concordant) → attributed to **conservative
    false positives from *both* methods**, "perhaps due to ambient RNA or HTO signal." They note it "is
    difficult to be certain which of these methods is correct." Filtering demuxlet to **> 95%** doublet
    posterior removed **75%** of the discordance.
  - **216/11,464 (1.9%)** discordant *donor* calls among mutual singlets → adjudicated using the
    unstained donor H: of **40** cells demuxlet (but not hashing) called donor H, **37** had **> 1000**
    ADT counts, so the authors call these **demuxlet misclassifications**, "in line with demuxlet's
    estimated error rate of **1–2%**" (attributed to Kang et al. [13]).
- **Both columns of the trade-off, in the source's words:** the Discussion paragraph is reproduced
  verbatim at §7.2, and the Introduction's statement of the genotype requirement at §7.3. Summarized:
  - *Genetic multiplexing advantage:* no exogenous barcodes; **no alteration to existing workflows**
    before or after pooling.
  - *Genetic multiplexing requirement:* pooled samples must come from **previously genotyped
    individuals** (and, from the Results, sufficient **reads and SNPs** / adequate depth).
  - *Cell Hashing requirement:* incubation with antibodies against ubiquitously expressed surface
    proteins (i.e., a wet-lab change) — and, from the Discussion caution, the cells must **express**
    those epitopes.
  - *Cell Hashing advantage:* **can multiplex samples with the same genotype**; can split a single
    sample into arbitrarily many pools; gives a transcriptome-independent identity signal usable to
    rescue low-RNA cells.
  - *Cost, both:* both slightly raise sequencing cost — genetic via **increased depth or read length to
    identify SNPs**; hashing via the **HTO library (~2–5% of transcriptome sequencing costs)**.

- **DOES THE SOURCE STATE A RULE FOR WHEN TO USE WHICH ROUTE?**
  **No — it states no decision rule.** It calls the approaches **"complementary … with each having
  unique advantages"** and says **"We believe that researchers will benefit from both approaches."**
  The closest thing to guidance is a *one-sided* use-case preference for its own method, verbatim:
  > "In particular, we envision that our method will be most useful when processing genetically
  > identical samples subjected to diverse perturbations (or experimental conditions/optimizations, as
  > in our titration experiment) or to reduce the doublet rate when running cells from a single sample."

  That is a statement of where *hashing* is most useful (a conditional favoring hashing, phrased as
  "we envision"), **not** a rule for when to prefer genotype-based demultiplexing, and **not** a
  decision procedure. The genotype route's *requirement* (pre-existing genotypes; adequate depth/SNPs)
  and *advantage* (no workflow change) are stated, but the source never composes them into an
  if/then rule. **Plainly: the paper offers complementarity plus a preference for its own method's
  niche; a selection rule must be constructed by the reader, not quoted from this source.**

### Limitations / failure modes

- **Cells/samples where hashing cannot work:** cell types not expressing the (virtually ubiquitous)
  target surface proteins — verbatim quote at §7.5. Nuclei are not covered by the presented reagents.
  Demonstrations are human; species generalization is future work.
- **Ambient/background HTO signal:** named as a possible cause of **conservative false-positive doublet
  calls** (the 2528 discordant calls). **Stated mitigations:** (a) the classification procedure itself
  excludes the top-expressing cluster and the highest **0.5%** of values before fitting the negative
  binomial background; (b) unlabeled **negative-control** cells (HEK293T, NIH-3T3) are spiked in;
  (c) a dedicated **four-cell-line experiment** was run specifically "to further ensure that background
  binding levels did not lead to incorrectly demultiplexed samples," yielding **99.7%** concordance
  with transcriptomic identity. Note: the > 95%-posterior filter that removes 75% of discordance is a
  **demuxlet-side** knob, not a hashing-side one — the source names **no tunable HTO-side stringency
  parameter** beyond the fixed q = 0.99 quantile.
- **Doublets the method CANNOT detect (verbatim):**
  > "Informatic detection of multiplets based on transcriptomic data also remains an important
  > challenge for the field, for example, to identify doublets originating from two cells within the
  > same sample."

  Quantified for this design as the **unresolved multiplet rate of 3.1%**; also, doublets formed with
  an **unlabeled** cell are called singlets (Methods).
- **Batch/technical effects reduced by pooling — exact wording and what backs it.** The two relevant
  statements are:
  > (Abstract) "Despite rapid developments in single cell sequencing, sample-specific batch effects,
  > detection of cell multiplets, and experimental costs remain outstanding challenges."

  > (Discussion) "Still, as sequencing costs continue to drop, and experimental designs seek to minimize
  > technology-driven batch effects, multiplexing should facilitate the generation of large scRNA-seq
  > and CITE-seq datasets."

  and, in the Introduction, the motivating premise:
  > "Similarly, technical and “batch” effects have been demonstrated to mask biological signal in the
  > integrated analysis of scRNA-seq experiments [12], necessitating experimental solutions to mitigate
  > these challenges."

  **Evidence backing it in this paper: none.** The batch-effect framing is *motivational* and is
  supported only by **citations to prior work** (refs. 11, 12; ref. 14 Tung et al. on batch effects and
  design). The paper runs **no** experiment comparing batch effects with and without pooling, reports
  **no** batch-effect metric, and the Discussion's phrasing is prospective ("should facilitate"). Per
  the guidance's instruction not to accept a bare claim as an evidenced one: **treat "hashing reduces
  batch effects" as an unevidenced design argument in this source.** (The one adjacent *measured*
  result is negative-control-shaped, not batch-shaped: hashing does **not degrade** transcriptomic
  complexity vs. non-hashed cells, Additional file 1: Fig. S5.)

### Pin

- **Journal / volume / article:** *Genome Biology*, volume 19, article 224.
- **DOI:** 10.1186/s13059-018-1603-1. **PMID** 30567574. **PMCID** PMC6300015.
- **Dates:** Received 2018-06-05; Accepted 2018-12-04; Published 2018-12-19; collection date 2018.
- **License text:** reproduced verbatim in §1 (CC BY 4.0; CC0 waiver applies to the data unless
  otherwise stated).
- **Access date:** 2026-07-13 (read from PMC).
- **Data accession:** **GEO GSE108313**. No SRA accession is given in the article text. Code: Seurat
  (github.com/satijalab/seurat); CITE-seq-Count (github.com/Hoohm/CITE-seq-Count); protocols at
  www.cite-seq.com.
