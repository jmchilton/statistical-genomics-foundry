---
title: "Multiplexed droplet single-cell RNA-sequencing using natural genetic variation"
type: paper
source_id: kang-2018-demuxlet
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC5784859/
doi: 10.1038/nbt.4042
access_date: "2026-07-13"
license: LicenseRef-all-rights-reserved
attribution: "Kang HM, Subramaniam M, Targ S, Nguyen M, Maliskova L, McCarthy E, Wan E, Wong S, Byrnes L, Lanata CM, Gate RE, Mostafavi S, Marson A, Zaitlen N, Criswell LA, Ye CJ. Multiplexed droplet single-cell RNA-sequencing using natural genetic variation. Nat Biotechnol 36(1):89-94, 2018. DOI 10.1038/nbt.4042. Read via the NIHMS author manuscript on PMC (PMC5784859, NIHMSID NIHMS921103); Nature author manuscript = all rights reserved, NOT Creative Commons. Summarized in own words."
derived: own-words-summary
---

# Kang 2018 — demuxlet: multiplexed droplet scRNA-seq using natural genetic variation

*Faithful clean-context note: read ONLY the source (PMC author manuscript full text) + its `guidance.md`. License mode = **own-words** (all-rights-reserved Nature author manuscript). No verbatim prose; §7 is paraphrase. Numbers, SNP counts, accuracies, pool sizes, sample/parameter/tool names and equation forms are reproduced exactly — they are facts, not protected expression.*

## 1. Citation

Kang HM, Subramaniam M, Targ S, Nguyen M, Maliskova L, McCarthy E, Wan E, Wong S, Byrnes L, Lanata CM, Gate RE, Mostafavi S, Marson A, Zaitlen N, Criswell LA, Ye CJ. "Multiplexed droplet single-cell RNA-sequencing using natural genetic variation." *Nature Biotechnology* 2018 Jan;36(1):89–94. Published online 2017 Dec 11. DOI 10.1038/nbt.4042. PMID 29227470.

- Read from: NIHMS author manuscript, PMC5784859 (NIHMSID NIHMS921103), available in PMC 2018 Jun 11. Access date 2026-07-13.
- Software: demuxlet, https://github.com/statgen/demuxlet (**no version number or commit is given in the paper** — the paper names only the repository URL and the `plp` option).
- Data: GEO accession GSE96583.
- **Correction exists:** the PMC banner states the article has been corrected — Nat Biotechnol. 2020 Oct 14. The correction notice is *Author Correction*, Nat Biotechnol 38(11):1356 (2020), DOI 10.1038/s41587-020-0715-9, PMID 33057163. See §2.

## 2. Access note

Main text (abstract through discussion) and the full Methods were readable in the PMC author manuscript. Equations are rendered inline and were readable.

**Not readable / boundary:**
- **All Supplementary Figures 1–21 and Supplementary Tables 1–4** are shipped as `.docx`/`.xlsx` attachments and were NOT opened. This matters: essentially every *curve* behind the headline threshold — the SNPs-per-cell × pool-size accuracy surfaces (Suppl. Figs 4–5), the UMI-depth relation (Suppl. Fig 6), the relatedness simulation (Suppl. Fig 7), and the doublet-likelihood decision boundary (Suppl. Fig 8) — lives in the supplement. **This note therefore captures the in-text summary values of those figures, not the figures' full dependence structure.** Degradation as a function of fewer SNPs / more individuals / lower depth is *stated in the text only as summary points*, not as a readable table.
- **The 2020 Author Correction text could not be retrieved.** Nature's page is paywalled/redirects to an auth flow; the PubMed record for PMID 33057163 carries no description beyond a pointer to the amendment. **[re-check]** I could NOT verify whether the correction touches any number captured in this note. It is unresolved and should be checked against the published correction before any threshold here is trusted for load-bearing use.

## 3. Thesis

Natural genetic variation already carried in the RNA reads is enough to assign each droplet to its donor and to flag droplets holding two cells from different donors, so cells from many individuals can be pooled into a single droplet run and computationally demultiplexed afterwards.

## 4. Problem & context

- dscRNA-seq profiles thousands of cells per run, but for differential-expression and population-genetics questions, many cells from *many individuals* is more informative than many cells from a few individuals.
- Running many samples in parallel in standard workflows is impractical: inefficient sample processing and technical batch effects.
- The paper's stated payoff of knowing per-cell genetic identity: pooling different individuals into one microfluidic run gives lower per-sample library-prep cost **and eliminates confounding effects** (the paper's own phrasing in the introduction is that pooling would "eliminate confounding effects" — it does not, at that point, specify *which* confound; see §12).
- The paper's stated payoff of detecting cross-individual doublets: pooled cells can be loaded at higher concentration, reducing per-cell library-prep cost.
- Prior work could demultiplex cells across *species*, or host vs. graft; simultaneously demultiplexing **and** doublet-detecting across more than two individuals had not been done.
- The statistical model is inspired by algorithms for detecting **contamination in DNA sequencing** (ref. 18, Jun et al. AJHG 2012).

## 5. Method / approach

### 5.1 Inputs required (design-time gate)

demuxlet requires, for the pooled samples, **external DNA-derived genotypes**: a set of best-guess genotypes or genotype probabilities obtained from **genotyping, imputation, or sequencing**. Formally the model uses `P_sv(g) = Pr(g | Data_sv)`, the posterior probability of genotype `g` for sample *s* at variant *v* given external DNA data. If a genotype *likelihood* `Pr(Data_sv | g)` is supplied instead, it is converted to a posterior using a prior `Pr(g) ~ Binomial(2, p_v)` with `p_v` the population alternate-allele frequency. An error term `ε` is allowed: the posterior is replaced by `(1−ε) P_sv(g) + ε Pr(g)`.

**No genotype-free mode is described anywhere in the paper.** Genotypes for the pooled individuals are a hard input.

Compatible with standard formats (the paper cites VCF and SAM/SAMtools as the input-format references). Reads processed with the standard 10x pipeline (CellRanger v1.1 and v1.2, default settings, hg19 transcriptome, STAR aligner); base-call phred quality scores from that alignment feed the model.

### 5.2 Singlet assignment model

For `C` barcoded droplets across `S` samples with genotypes at `V` exonic variants: `d_cv` = number of unique reads in droplet *c* overlapping variant *v*; `b_cvi ∈ {R, A, O}` = the variant-overlapping base call of read *i* (reference / alternate / other); `e_cvi ∈ {0,1}` = latent indicator that the base call is correct (0) or not (1), with `e_cvi ~ Bernoulli(10^(−q_cvi/10))` for phred score `q_cvi`. Given `e_cvi = 0` and true genotype `g ∈ {0,1,2}`, the base call is Binomial(2, g/2). The `e_cvi = 1` case follows Supplementary Table 4 (not read).

Droplet likelihood:

    L_c(s) = ∏_{v=1..V} [ Σ_{g=0..2} { ∏_{i=1..d_cv} ( Σ_{e=0,1} Pr(b_cvi | g, e) ) · P_sv(g) } ]

Best-matching sample = `argmax_s [ L_c(s) ]` (maximum likelihood).

### 5.3 Doublet screening (the actual decision rule)

A two-sample mixture likelihood `L_c(s1, s2, α)` with mixing proportions `(1−α) : α`. To cut cost, `α` is evaluated over a **discrete grid** — the paper's example: **5–50% in 5% steps**.

Decision rule, with likelihood-ratio threshold `t`:
- **doublet** iff `max_{s1,s2,α} L_c(s1,s2,α) / max_s L_c(s) ≥ t`
- **singlet** iff `max_{s1,s2,α} L_c(s1,s2,α) / max_s L_c(s) ≤ 1/t`
- otherwise **ambiguous**

**`t = 2` is the threshold used throughout** (Supplementary Fig. 8 shows the decision boundaries at `t = 2`). Doublet rates are estimated from doublets only; for *singlet* estimation both doublets **and** ambiguous droplets are removed, which the paper calls a conservative singlet estimate.

### 5.4 Simulation setup (this is where the headline threshold comes from)

- The `plp` option of demuxlet generated a **pileup of 6,145 cells from one well of real PBMC 10x data**.
- Reads in that pileup were then **modified to reflect the genotypes of individuals sampled from the 1000 Genomes Phase 3 cohort**. (So: real read/UMI structure, synthetic genotypes.)
- The pileup was **downsampled to obtain different numbers of read-overlapping exonic SNPs, ranging from 5,000 to 100,000 for the whole cohort.**
- **Simulated doublets were created by randomly sampling and merging pairs of barcodes within a dataset, giving a 5% doublet rate in the original data.**
- Main text states the simulated set as **6,145 cells = 5,837 singlets + 308 doublets, from 2–64 individuals**, drawn from 1000 Genomes.
- **Relatedness simulation:** transcriptomes simulated from **8 individuals from 1000 Genomes with varying degrees of relatedness, from unrelated to parent–child** — named samples: **HG00146, HG00147, HG00500, HG00501, HG00502, HG00512, HG00514, HG00524**.

### 5.5 Real experiments

- **Validation pool:** PBMCs from 8 lupus patients, **sequential pairwise pooling** to equimolar concentration, three wells on a **10x Chromium**: W1 = S1–S4, W2 = S5–S8, W3 = S1–S8. Cells re-concentrated to 1M cells/mL and serially pooled.
- **IFN-β experiment:** each of the 8 donors split into two aliquots; one activated with **100 U/mL recombinant IFN-β for 6 hrs**, one untreated; then the 8 samples pooled per condition into two pools (stimulated, control).
- **eQTL cohort:** three further pools — 7 donors, 8 donors, and 15 donors (8 lupus, 5 rheumatoid arthritis, 2 healthy controls); 23 donors total analyzed.
- Sequencing: libraries on Illumina HiSeq2500 Rapid Mode, 1.8B total reads, **25K reads per cell**; >90% of captured transcripts recovered at those depths.
- Downstream: Seurat clustering + marker-correlation cell typing; **DESeq2** on per-individual summed (pseudobulk) counts for DE, `qvalue` for FDR; genotypes imputed with **EAGLE**, filtered MAF > 0.2 → **189,322 SNPs**; **Matrix eQTL** linear regression, cis window ±100 kbp, covariates = batch + first 3 expression PCs; genes tested = those with ≥50 UMI counts in 20% of individuals → **4,555 genes**.

## 6. Key claims / findings

### The headline threshold — SIMULATION, not measured on real data

- **[SIMULATION]** **50 SNPs per cell allows demultiplexing of 97% of singlets and identification of 92% of doublets, in pools of up to 64 individuals.** Conditions attached: simulated 6,145 cells (5,837 singlets + 308 doublets) built from a real PBMC 10x pileup with 1000 Genomes Phase 3 genotypes swapped in; doublets synthesized by merging barcode pairs at a 5% doublet rate; individuals **unrelated**; pool sizes swept 2–64. Supporting curves are Supplementary Figs 4–5 (not read).
- **[SIMULATION]** **50 SNPs can be obtained with as few as 1,000 UMIs per cell** (Suppl. Fig 6). The paper adds that recommended sequencing depths of standard dscRNA-seq workflows would capture **hundreds** of SNPs.
- **[SIMULATION]** **Related individuals:** with 6,145 cells simulated from **8** individuals of varying relatedness (up to parent–child), **50 SNPs per cell would let demuxlet correctly assign over 98% of cells** (Suppl. Fig 7). *(Note the configuration differs from the 97% figure: 8 individuals here vs. up to 64 there — the two percentages are not like-for-like. [summarizer-inferred] that comparison; the paper does not draw it.)*
- **[SIMULATION/THEORY]** For a pool of 8 individuals and uncorrelated SNPs each at **50% MAF**: **4 reads overlapping SNPs** are sufficient to uniquely assign a cell to its donor (Fig 1b), and **20 reads overlapping SNPs** distinguish every sample with **>98% probability** in simulation (Suppl. Fig 1).
- **Design recommendation drawn from the simulations:** pool cells from **tens of unrelated individuals**, load at **2–10× higher concentration** than standard workflows, and sequence to **at least 1,000 UMIs per cell**.

### Doublet arithmetic

- The probability that a doublet contains cells from **different** individuals is **1 − 1/N** — e.g. **87.5% for N = 8** (Fig 1c). This is why multiplexing itself buys doublet detection.
- **[THEORY]** A 1,000-cell unmultiplexed run yielding 990 singlets at a 1% undetected doublet rate is matched, in undetected-doublet rate, by multiplexing **1,570 cells each from 63 samples**, giving up to **37-fold more singlets (36,600)** *if sample identity of every droplet can be perfectly demultiplexed* (Suppl. Fig 2). Model: multiplet rate `d(x) = 1 − (1 − d_0)^(x/x_0)`; effective multiplet rate `[(n − (n−1)β) / n] · d(x)`, with `α` = fraction of true singlets misclassified as non-singlet, `β` = fraction of multiplets correctly classified as non-singlet; simulation used `d_0 = 0.01, x_0 = 1000`.
- **[THEORY]** Profiling **22,000 cells multiplexed from 26 individuals** gives **23-fold more singlets** at the same effective doublet rate (Suppl. Fig 3).

### Real-data performance (8 pooled lupus donors)

- Droplets sequenced: **3,645 (W1), 4,254 (W2), 6,205 (W3)**; average depth **51,000 / 39,000 / 28,000 reads per droplet**.
- Singlets called (LRT, L(singlet)/L(doublet) > 2): **91% (3332/3645), 91% (3864/4254), 86% (5348/6205)**. Donor shares: **25% (±2.6%), 25% (±4.6%), 12.5% (±1.4%)** per donor — consistent with equal mixing.
- **Demultiplexing error rate** (cells assigned to individuals *not in the pool*, exploiting W1/W2 being disjoint 4-donor sets): **less than 1% of singlets — W1: 2/3332, W2: 0/3864.**
- **Synthetic doublets in real data:** 466/3645 (13%) of W1 droplets were made into synthetic doublets by giving 466 cells from S1 and 466 from S2 the same barcode. demuxlet flagged **91% (426/466)** as doublet-or-ambiguous, and **correctly recovered the sample identity of both cells in 403/426 (95%)** of those.
- **Real doublets:** 138/3645, 165/4254, 384/6205 → **5.0%, 5.2%, 7.1%** — consistent with expected doublet rates from mixed-species experiments.
- **IFN-β pools:** 14,619 (control) and 14,446 (stimulated) cell-containing droplets; **83% (12,138)** and **84% (12,167)** singlets; **estimated doublet rate 10.9%** in each condition; observed vs. expected doublet frequencies per donor pair correlate at **R = 0.98**. Detected doublets form distinct clusters at the periphery of the cell-type clusters (Suppl. Fig 13).
- **Higher-loaded eQTL pools:** 15,250 cells / 7 donors → **71% singlets (10,766)**; 22,619 / 8 donors → **73% (16,618)**; 25,918 / 15 donors → **60% (15,596)**. Doublet rates **18%, 18%, 25%**, consistent with the increased loading concentration. **99% of singlets correctly assigned** in the first two pools (**10,740/10,766** and **16,616/16,618**).

### Batch / technical-variation claim (the design claim, as the paper actually states it)

- Singlets from all three wells cluster into known immune cell types and correlate with bulk RNA-seq of sorted populations (**R = 0.76–0.92**).
- For the *same* individuals appearing in *different* wells, t-SNE embeddings are qualitatively consistent and cell-type proportion estimates correlate at **R = 0.99**.
- t-SNE projections of the pool and of each individual are **not confounded by well-to-well effects** (Suppl. Fig 11a).
- **The load-bearing comparison:** **6 genes** were differentially expressed between wells W1 and W2 (DESeq2 on pseudobulk counts, FDR < 0.05), but only **2 genes** were differentially expressed between the *same* W1-vs-W2 individuals when they were together **inside well W3** (FDR < 0.05). The paper reads this as suggesting **multiplexing reduces technical effects due to separate sample processing**.
- Discussion framing: multiplexing captures biological variability among individual samples while limiting unwanted technical variability, and reduces per-sample and per-cell library-prep cost.
- **Stated optimum: the optimal number of samples to multiplex is approximately 20**, based on sample-processing time and the empirical doublet rates of current microfluidic devices; the authors expect that number to rise with automated sample handling and lower doublet rates.

### Biology / application results (secondary for our purposes)

- 3,055 genes differentially expressed (logFC > 2, FDR < 0.05) in at least one cell type on IFN-β.
- Inter-individual variance in mean expression exceeds variance across synthetic replicates (Lin's concordance 0.022 unmatched, 0.54 when replicates matched for cell-type proportion; per-cell-type Lin's concordance 0.007–0.20), i.e. inter-individual variability beyond cell-type composition.
- 15–827 genes with significant inter-individual variability in control cells, 7–613 in stimulated (FDR < 0.05).
- eQTL: one SNP (**chr10:3791224**) associated with NK-cell proportion (**P = 1.03×10⁻⁵**, FDR < 0.05) across >150,000 variants at MAF > 20%; **32 local eQTLs** (±100 kb, FDR < 0.1), **22 detected in only one cell type**; pan-cell-type eQTLs at *ERAP2* (P < 3.57×10⁻³²) and *HLA-C* (P < 1.74×10⁻²⁹).

## 7. Load-bearing statements — OWN-WORDS PARAPHRASE (all-rights-reserved source; no verbatim prose)

1. *(Abstract)* Using **simulated** data, the authors show that **50 SNPs per cell suffice to assign 97% of singlets and to identify 92% of doublets, in pools of up to 64 individuals**. The word "simulated" is the source's own qualifier, in the same sentence.
2. *(Abstract)* Given **genotyping data for each of the 8 pooled samples**, demuxlet correctly recovers the sample identity of **more than 99% of singlets** and identifies doublets at rates matching prior estimates. — i.e. the real-data claim is stated for **8** donors, and it is *conditioned on genotypes being available*.
3. *(Introduction)* If each cell's genetic identity could be established, pooling individuals into one microfluidic run would lower per-sample library-prep cost **and eliminate confounding effects**; and if cross-individual multi-cell droplets could be detected, pooled cells could be loaded at higher concentration, further lowering per-cell cost. — This is the paper's own statement of the design motivation, and it names cost first and "confounding effects" without further specification at that point.
4. *(Results, simulation)* The ability to demultiplex is a function of **three things: the number of individuals multiplexed, the sequencing depth / number of read-overlapping SNPs, and the relatedness of the multiplexed individuals.**
5. *(Results, simulation)* The recommended design: pool cells from **tens of unrelated individuals**, load at **2–10× the standard concentration**, and sequence to **at least 1,000 UMIs per cell**.
6. *(Results, batch)* Six genes were DE between wells W1 and W2, but only two between the same individuals within well W3 — which the authors take to suggest that multiplexing reduces technical effects arising from processing samples separately.
7. *(Discussion)* The optimal number of samples to multiplex is **about 20**, given sample-processing time and the empirical doublet rates of current devices.
8. *(Discussion)* The approach **does not require synthetic barcodes or split-pool strategies**.

*Functional strings kept verbatim:* `demuxlet`, the `plp` option, `t = 2`, `L(singlet)/L(doublet) > 2`, `α ∈ {5–50% by 5%}`, `d(x) = 1 − (1 − d_0)^(x/x_0)`, `d_0 = 0.01`, `x_0 = 1000`, CellRanger v1.1/v1.2, hg19, STAR, EAGLE, Matrix eQTL, DESeq2, Seurat, `https://github.com/statgen/demuxlet`, GSE96583.

## 8. Stated scope, assumptions, limitations (the source's own)

- **Genotypes must exist.** The model is conditioned on external DNA data per sample (array genotypes, imputed genotypes, or sequence-derived genotype likelihoods). The paper describes no fallback.
- **Unrelated individuals are the assumed design.** Relatedness is explicitly named as one of the three factors governing demultiplexing performance, and the design recommendation says *unrelated*. The paper's one relatedness experiment (8 individuals, up to parent–child) is a **simulation** and reports >98% correct assignment at 50 SNPs.
- **Practical pool-size ceiling ≈ 20 samples**, set by sample-processing time and current-device doublet rates — *not* by the algorithm. The 64-individual figure is the simulated ceiling, not a recommendation.
- **Depth floor: ≥1,000 UMIs per cell** (that being the depth at which ~50 SNPs are obtainable, per simulation).
- **Loading concentration 2–10× standard** is the recommended range; the eQTL pools loaded higher show the cost — doublet rates rise to 18–25% and singlet yield falls to 60–73%.
- **Solid tissue:** demuxlet could in principle be applied to sequencing of solid tissue, but the authors state that **standardizing sample processing and preservation remain major challenges**.
- **Assay scope:** developed specifically for RNA-sequencing; the authors only *anticipate* that the framework could extend to other single-cell assays where synthetic barcodes or natural genetic variation are read out by sequencing.
- **Doublet model is a two-sample mixture.** Droplets with more than two cells are not separately modeled (the text speaks of "droplets containing two cells"); the theoretical throughput section uses a general "multiplet" rate but the classifier is `s1, s2`.
- Ambiguous droplets are a real third class and are discarded when counting singlets.

## 9. Failure modes / invalidity patterns

Faithful to what the source names:

- **Too few read-overlapping SNPs per cell.** Demultiplexing accuracy is a function of the number of read-overlapping SNPs; below the simulated operating point (50 SNPs/cell) accuracy degrades. **The paper does not print the degraded values in the main text** — the SNP-count sweep (pileup downsampled from 5,000 to 100,000 read-overlapping exonic SNPs cohort-wide) is shown only in Supplementary Figs 4–6, which this note could not read. *Anything more precise than "it degrades" is not recoverable from the text.*
- **Too shallow sequencing.** Below ~1,000 UMIs per cell, the 50-SNP operating point is not reached (Suppl. Fig 6).
- **Too many individuals in the pool.** Named as one of the three governing factors; simulated up to 64. Discussion caps the *practical* optimum at ~20, citing sample-processing time and device doublet rates.
- **Related individuals in the pool.** Named as the third governing factor. Shared genotypes make donors harder to tell apart. The paper's own simulation nevertheless reports **>98% correct assignment at 50 SNPs for 8 individuals ranging to parent–child relatedness** — so the paper does *not* present relatedness as a demonstrated breaking point at that pool size; it presents it as a dependency and then recommends unrelated donors anyway.
- **Over-loading the instrument.** The eQTL pools, loaded at increased concentration, show **doublet rates of 18%, 18%, 25%** and singlet fractions dropping to **71%, 73%, 60%**. This is the paper's own demonstration that the loading-concentration knob has a cost.
- **Same-donor doublets are undetectable by this method.** Only `1 − 1/N` of doublets are cross-individual; a fraction `1/N` of multiplets are same-sample and are, by construction, invisible to demuxlet (this is explicit in the effective-multiplet-rate formula, where `1/n · d(x)` is the undetectable share).
- **Detector / symptom the paper names:** the likelihood ratio `max L(doublet) / max L(singlet)` against `t = 2` — with the **ambiguous** band between `1/t` and `t` as the paper's own uncertainty signal. Distributional check: detected doublets should form distinct clusters at the periphery of cell-type clusters (Suppl. Fig 13), and observed vs. expected per-pair doublet frequencies should correlate (they report R = 0.98). Another named sanity check: with disjoint pools, the count of cells assigned to donors *not in the well* is a direct **demultiplexing error rate** (they measured <1%).
- **Not named as a failure mode by this source:** **ambient RNA / soup** is never mentioned. **Population or ancestry applicability** is never discussed. There is no stated minimum MAF for the SNP panel used at demultiplexing time (the MAF > 0.2 filter appears only in the *eQTL mapping* Methods, a different step; the 50%-MAF figure appears only in the idealized Fig 1b calculation).

## 10. What the source does NOT address (confident silences)

- **The confounded, one-donor-per-lane design is never analyzed as such.** The paper never sets up a comparison where each donor occupies exactly one lane/well and shows the resulting donor↔batch confound. The nearest thing is the W1/W2 (disjoint 4-donor wells) vs. W3 (all 8 in one well) comparison and its 6-genes-vs-2-genes DE result, plus the introduction's unelaborated phrase about eliminating confounding effects. **Treating "each donor in exactly one lane ⇒ donor is confounded with lane" as a claim of *this paper* would be an over-read.**
- **Hashing / antibody-barcoding is not evaluated.** The paper mentions only that its approach **does not require synthetic barcodes or split-pool strategies** (citing refs 36–40), and notes prior demultiplexing work limited to cross-species or host/graft settings. There is **no head-to-head comparison** with a hashtag-oligo method, no cost comparison, and no decision rule for choosing between genotype-based and barcode-based demultiplexing.
- **Non-droplet / plate-based scRNA-seq and bulk are not addressed.** The method is developed for droplet scRNA-seq. Bulk RNA-seq appears only as a *validation reference* (sorted-population SmartSeq2 bulk, and previously published bulk eQTLs), never as a target for demuxlet. Extension to other single-cell assays is *anticipated*, not demonstrated.
- **Ambient RNA / free-mRNA contamination:** not mentioned anywhere.
- **No exact demuxlet version, release, or command line** beyond the repo URL and the `plp` option.
- **No guidance on which variant panel to use** for demultiplexing (which SNP set, what MAF cutoff, exonic-only?) beyond "exonic variants" in the model and "common SNPs" in passing.
- **No runtime/scalability numbers**, despite the introduction calling demuxlet fast and scalable.

## 11. Open questions / ambiguities the source leaves unresolved

- What is the actual accuracy at pool sizes between 20 and 64, and at SNP counts below 50? Only the summary point (97%/92% at 50 SNPs, ≤64 individuals) is in the text; the surface is in the unread supplement.
- Are 97%/92% the values *at* 64 individuals, or averaged/floor values across the 2–64 sweep? The sentence says "in pools of up to 64 individuals," which reads as a floor-across-the-sweep claim, but the text does not disambiguate. **[unresolved]**
- The number of read-overlapping SNPs is the operative quantity, yet the simulation sweep is described in terms of SNPs *for the whole cohort* (5,000–100,000) while the headline is *per cell* (50). The mapping between the two is not spelled out in the text.
- The related-individual simulation reports **>98%** at 8 individuals; the unrelated headline reports **97%** at up to 64. Whether relatedness actually *costs* accuracy at fixed pool size is not answerable from the main text.
- **What the 2020 Author Correction changed is unknown and unverified here** — see §2. This is the single biggest open item for anyone relying on a number in this note.

## 12. Guidance answers

**Q: Exact statement of how many SNPs per cell suffice, with all attached qualifiers — accuracy, max pool size, and whether simulated or real.**
**50 SNPs per cell → 97% of singlets demultiplexed and 92% of doublets identified, in pools of up to 64 individuals. This is a SIMULATION result, and the abstract says so in the same sentence ("Using simulated data…").** Simulation setup: 6,145 cells (5,837 singlets + 308 doublets), pool sizes 2–64, genotypes drawn from **1000 Genomes Phase 3**, individuals **unrelated**; the substrate was a real 10x PBMC pileup (one well, 6,145 cells, produced by demuxlet's `plp` option) whose reads were **rewritten to carry the sampled 1000 Genomes genotypes**; doublets were constructed by **randomly merging pairs of barcodes**, yielding a **5% doublet rate**. The corresponding *real-data* claim is a different, weaker-scoped statement: **>99% of singlets correctly recovered given genotypes for 8 pooled donors** (measured; and in the larger eQTL pools, 99% of singlets in two pools of 7 and 8 donors). **There is no real-data measurement at 64 donors, and none at a controlled 50-SNPs-per-cell operating point.**

**Q: How does it degrade — fewer SNPs, more individuals, lower depth, related individuals? Table/figure values?**
The text names the three governing factors (number of individuals, sequencing depth / read-overlapping SNP count, relatedness) but **prints only operating points, not degradation curves**. Recoverable numbers: 4 SNP-overlapping reads uniquely assign a donor in an idealized 8-donor / 50%-MAF pool; 20 such reads give >98% correct assignment in simulation (8 donors); 50 SNPs give 97%/92% at ≤64 donors; 50 SNPs require ≥1,000 UMIs/cell; standard workflow depths yield hundreds of SNPs; 8 related individuals (to parent–child) still give >98% at 50 SNPs. **The actual curves are Supplementary Figs 1, 4–7, which I could not read (.docx supplement) — flagged in §2. No table values are available.** Empirically, over-loading (the eQTL pools) drives doublet rate to 18–25% and singlet fraction to 60–73%.

**Q: Required inputs — external genotypes, or genotype-free? What must exist at design time?**
**External genotype data for every pooled individual is REQUIRED.** The model conditions on `P_sv(g) = Pr(g | Data_sv)` where `Data_sv` is external DNA data — array genotypes, imputed genotypes, or sequence-derived genotype likelihoods (converted to posteriors with a population-allele-frequency prior). Best-guess genotypes *or* genotype probabilities are both acceptable, and an error parameter `ε` smooths the posterior toward the population prior. **No genotype-free operating mode is described.** At design time, then: you must be able to genotype (or impute genotypes for) each donor you intend to pool.

**Q: Does the paper state the design motivation — that pooling breaks the donor↔lane confound and/or reduces batch effects? Its own framing, without overstatement.**
**Partially — and the framing leads with cost, not confound-breaking.** The introduction's motivation sentence pairs **lower per-sample library-prep cost** with **"eliminate confounding effects,"** without saying which confound. The paper never analyzes a donor-confounded-with-lane design head-on. What it *does* supply is one empirical batch result: **6 genes DE between wells W1 and W2, versus only 2 genes DE between the same individuals inside the single well W3** (DESeq2 pseudobulk, FDR < 0.05), which the authors read as multiplexing reducing technical effects from separate sample processing; plus t-SNE not confounded by well-to-well effects, and cell-type proportions for the same donor across wells correlating at R = 0.99. The discussion's summary is that multiplexing **captures biological variability among individuals while limiting unwanted technical variability**, alongside per-sample and per-cell cost reduction. So: **the batch/technical-variation benefit is claimed and lightly supported; the specific "donor↔lane confound is broken by pooling" argument is not the paper's stated frame — it is at most compatible with the introduction's one-clause mention of confounding.**

**Q: Any statement about hashing/barcoding as an alternative?**
Minimal and one-directional. The discussion states demuxlet **does not require synthetic barcodes or split-pool strategies** (refs 36–40), and the introduction notes prior demultiplexing strategies were limited to different species or host/graft. The conclusion anticipates extending the framework to other assays where **synthetic barcodes or natural genetic variation** are measured by sequencing. **There is no evaluation of, comparison against, or decision rule involving hashtag-based demultiplexing.**

**Q: Stated limitations — pool-size ceiling, ambient RNA, related individuals, species/population applicability, minimum coverage.**
- Pool-size: **practical optimum ≈ 20 samples**, set by sample-processing time and current-device doublet rates (algorithmic simulation went to 64). Authors expect the practical number to rise with automation and lower doublet rates.
- **Ambient RNA: NOT mentioned. The source is silent.**
- Related individuals: named as a performance factor; unrelated donors are the recommendation; the one relatedness simulation still reports >98% at 8 donors.
- **Species/population applicability: NOT discussed.** No statement about ancestry, population structure, or non-human species (beyond the historical note that cross-*species* demultiplexing was already possible).
- Minimum coverage: **≥1,000 UMIs per cell** (recommendation); the real runs were sequenced far deeper (25K reads/cell; 28,000–51,000 reads/droplet in the validation wells).
- Solid tissue: possible in principle, but sample processing/preservation standardization is called a major challenge.

**Q (silence): Does the paper say anything about designs where each donor is in exactly one lane — the confounded case?**
**No — not as a stated design pathology.** See above. The paper does not describe, name, or analyze the one-donor-per-lane confounded design. Its W1/W2-vs-W3 comparison is the closest empirical material, and its language there is about *technical effects from separate sample processing*, not about a donor↔lane confound. **Attributing the confound argument to this paper would be our inference, not its claim.**

**Q (silence): Does it address non-droplet / plate-based scRNA-seq, or bulk?**
**No.** The method is droplet-specific (10x Chromium). Bulk RNA-seq appears only as an external validation reference. Extension to other single-cell assays is anticipated in one sentence, not demonstrated. Plate-based scRNA-seq is never mentioned.

**Q (pin): demuxlet software version/repository; access date; 2020 Author Correction.**
- Repository: **https://github.com/statgen/demuxlet**. **No version, tag, or commit is stated in the paper.** The only named interface is the `plp` (pileup) option. Upstream pipeline pinned as CellRanger v1.1 and v1.2, hg19.
- Access date: **2026-07-13** (PMC author manuscript PMC5784859).
- **Author Correction: Nat Biotechnol 38(11):1356 (2020), DOI 10.1038/s41587-020-0715-9, PMID 33057163** — PMC's banner on the article dates it 2020 Oct 14. **I could NOT read the correction's text** (Nature paywall; the PubMed record contains no description of what changed). **Whether it touches any number captured in this note is UNVERIFIED — flagged in §2 as a re-check item.**
