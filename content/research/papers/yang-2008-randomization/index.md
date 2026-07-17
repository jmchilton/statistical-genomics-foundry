---
title: "Randomization in Laboratory Procedure Is Key to Obtaining Reproducible Microarray Results"
type: paper
source_id: yang-2008-randomization
source_url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0003724"
doi: 10.1371/journal.pone.0003724
access_date: "2026-07-13"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Yang H, Harrington CA, Vartanian K, Coldren CD, Hall R, Churchill GA. Randomization in Laboratory Procedure Is Key to Obtaining Reproducible Microarray Results. PLoS ONE 2008;3(11):e3724. Copyright 2008 Yang et al. NOTE: the article prints the CC-BY license WITHOUT a version number (see Access note); CC-BY-4.0 is taken from PLOS's own CrossRef license deposit for this DOI. Either candidate version (2.5 or 4.0) resolves to verbatim-ok, so posture is unaffected."
derived: license-aware-summary
tags:
  - domain/experimental-design
  - domain/batch-effects
---

# Yang et al. 2008 — Randomization in Laboratory Procedure Is Key to Obtaining Reproducible Microarray Results

## 1. Citation

Yang H, Harrington CA, Vartanian K, Coldren CD, Hall R, Churchill GA. "Randomization in
Laboratory Procedure Is Key to Obtaining Reproducible Microarray Results." *PLoS ONE*
2008 Nov 14;3(11):e3724. DOI 10.1371/journal.pone.0003724. PMCID PMC2579585; PMID 19009020.
Received 2008-09-16; Accepted 2008-10-26. Editor: Thomas Preiss. Page count 11.

**Author list VERIFIED against the published article** — the invocation's list is correct.
As printed: Hyuna Yang¹, Christina A. Harrington², Kristina Vartanian², Christopher D.
Coldren³, Rob Hall⁴, Gary A. Churchill¹ (corresponding, gary.churchill@jax.org).
Affiliations: ¹The Jackson Laboratory, Bar Harbor, ME; ²Gene Microarray Shared Resource, OHSU
Cancer Institute, Oregon Health and Science University, Portland, OR; ³Pulmonary Sciences and
Critical Care Medicine, University of Colorado Health Sciences Center, Denver, CO; ⁴Center for
Array Technologies, Department of Microbiology, University of Washington, Seattle, WA.
Contributions as printed: "Conceived and designed the experiments: GAC. Performed the
experiments: CH KV CDC RH. Analyzed the data: HY CH KV. Wrote the paper: HY GAC."
Competing interest as printed: Dr. Harrington has a significant equity interest in Affymetrix, Inc.

Open access: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0003724 ;
https://pmc.ncbi.nlm.nih.gov/articles/PMC2579585/ . Access date 2026-07-13.

## 2. Access note

Full text read in full (PLOS JATS XML + PDF + PMC HTML), including Tables 1–3, all figure
captions, Materials and Methods, footnotes. **Not read:** the two supplementary files —
**Table S1 ("Deatil sample processing information", 0.03 MB XLS)**, which is where the
per-center protocol/batch detail actually lives, and Figure S1 (1.69 MB TIF). Figures 1–6 are
images and were not machine-readable; they are described from their captions and from the
Results prose, not transcribed. Everything below is from the main text unless marked.

**License — exact wording as printed.** The PDF and the PLOS/PMC full text carry only this,
with **no version number and no license URL anywhere in the article**:

> "Copyright: © 2008 Yang et al. This is an open-access article distributed under the terms of
> the Creative Commons Attribution License, which permits unrestricted use, distribution, and
> reproduction in any medium, provided the original author and source are credited."
> (verbatim, PDF p. 1 / JATS `<permissions><license>`; the PMC rendering says "properly
> credited" — a one-word variant of the same statement.)

So the guidance's expectation of a printed "CC-BY-2.5" could **not** be confirmed: the article
prints an unversioned CC-BY. The only versioned evidence available is PLOS's own CrossRef
license deposit for this DOI, which gives `http://creativecommons.org/licenses/by/4.0/`
(start 2008-11-14, `content-version: unspecified`) — hence `CC-BY-4.0` /
`LICENSES/CC-BY-4.0.LICENSE` in frontmatter, flagged rather than assumed. Both candidates are
verbatim-ok, so the **license-aware posture** (§7 short verbatim load-bearing quotes, marked)
is safe either way.

**GEO accession: not present.** The article names no GEO/ArrayExpress accession and contains no
data-availability statement; data are described only as "Data from each center were provided in
the form of CEL files."

## 3. Thesis

The same RNA samples processed at different laboratories give dramatically different
differential-expression results, and a primary cause is **batch effects in array processing**;
when processing batches are confounded with the biological factors of interest, the effects
cannot be separated and DE-gene lists fill with artifacts — hence samples must be assigned to
processing batches by randomization.

## 4. Problem & context

Microarray data accumulate in public repositories and are routinely combined across studies.
Prior multi-lab/multi-platform comparisons ([2]–[5]) generally concluded there is substantial
concordance, but the authors note this positive message rested on comparisons of the
best-performing laboratories [2] or on small sets of top-ranked genes [3]. The authors chose to
isolate one variable: **the effect of processing the same samples at different laboratory
sites**, on a common platform, with a common sample set carrying moderate expression
differences.

## 5. Method / approach

**Samples (n=16).** Kidney tissue from **two male and two female mice** from each of four mouse
strains: C57BL/6J plus three chromosome substitution strains (CSSs) C57BL/6J-Chr1<sup>A/J</sup>,
C57BL/6J-Chr6<sup>A/J</sup>, C57BL/6J-Chr15<sup>A/J</sup> — denoted **B, A1, A6, A15**. In each
CSS one chromosome from A/J is crossed onto the C57BL/6J background [6]. RNA prepared as in
[18]. Samples were prepared centrally and **distributed to each of four centers**.

**Centers (5 datasets from 4 labs).** "Sample[s] were distributed to each of four centers, and
one center processed two sets of the 16 samples at different times using different labeling
protocols. For simplicity we refer to these as five centers (C1–C5)." → **5 × 16 = 80 arrays**.
Samples were "delivered to each of the sites with the suggestion that they be processed
according to standard protocols in a manner typical for that laboratory." Data returned as CEL
files. Design expectation (not a truth standard): DE genes between B and each CSS should be
enriched on the substituted chromosome; the paper states explicitly "there are no truth
standards so our results reflect the precision but not necessarily the accuracy of the
platform."

**Platform.** Affymetrix GeneChip **Mouse 430v2**. All centers used the Affymetrix-recommended
one-cycle cDNA synthesis / in vitro-transcription (IVT) method. Centers 1, 3, 4, 5 used the
Affymetrix IVT reagent kit; **center 2 used the ENZO IVT kit**. Center 2 used the original
Affymetrix labeling protocol incorporating **two labeled NTPs (biotin UTP and biotin CTP)**; all
others used a newer protocol incorporating **one NTP (biotin UTP)**. Named protocol differences
across centers: (1) amount of hybridization solution applied to each array; (2) rotation per
minute (rpm) of hybridization oven; (3) **batch design for labeling, hybridization and
post-hybridization processing**. Per-center protocol detail is in Supplementary Table S1 (not
read).

**Analysis.** RMA [11] normalization **per center, separately** (all reported results). Per-gene
general linear model with **main effects for sex and strain, no interaction** (so strain tests
are adjusted for sex and vice versa). Test statistics: **Fs** [20] via the **MAANOVA** package,
and moderated F [21] via **LIMMA**; the two agreed and only Fs is reported. P-values by **nested
permutation of sample labels**. Multiple-testing adjustment by **FDR/q-value** [12][13].
GO-term enrichment by **hypergeometric test in the GOstats R package** [15] at p<0.01. PCA per
center. Classification via **NMF metagene projection** (Tamayo et al. [9]): weight matrix W from
one training center, H* = W⁻¹V* projected onto the other centers, then clustered. Hierarchical
clustering of raw data used Euclidean distance and complete linkage [23].
The authors also normalized all 80 arrays together **as an aside only**.

## 6. Key claims / findings

### The batch-confounding retrospective (the core evidence — Results, "Batch effects")

The authors state the four processing steps as: "Affymetrix GeneChip arrays are processed in
four steps: **labeling, hybridization, wash and staining, and scanning**." They then did a
retrospective analysis of which samples were processed together at each step at each center.
Stated cause of batching: "Due to personnel and equipment constraints, all samples may not be
processed at one time. For instance, one fluidics station used for the wash and staining step,
is able to process **only up to four samples**. The numbers of array that can be hybridized
together is constrained along with several other steps in sample processing."

**Per center — what they did with processing, and the consequence:**

| Center | What it did with processing | Confounded factor ↔ step | Consequence in DE counts |
|---|---|---|---|
| **C1** | **Randomized the samples before processing.** Arrays hybridized in **two batches, one of 12 and one of 4, on the same day**. By chance the 4-sample batch contained **3 male samples** → *partial* confounding of batch with sex. | (partial, by chance) batch ↔ sex | "In all comparisons center 1 has consistently has the shortest list of differentially expressed genes (Table 1)." Strain overall p<0.001: **377**; strain q<0.05: **285**; sex p<0.001: **3250** (lowest of all centers). |
| **C2** | **Stored male arrays at 4 degrees while female samples were washed and stained.** Also: ENZO IVT kit, two-NTP labeling. | wash/stain batch ↔ **sex** | Longest sex lists with C3. Sex p<0.001: **5099**; sex q<0.05: **18910**. Highest median intensity, **lowest MAD** of all centers. |
| **C3** | Same as C2 — **male arrays stored at 4 degrees while female samples were washed and stained.** | wash/stain batch ↔ **sex** | Longest sex lists. Sex p<0.001: **5842**; sex q<0.05: **17475**. Median intensity in expected range. |
| **C4** | **Hybridized samples in two days: eight samples from B and A1 on day 1; eight from A6 and A15 on day 2.** | hybridization day ↔ **strain** | Strain lists inflated: overall p<0.001 **1390**, q<0.05 **6362** (vs 285/376/423 for C1/C2/C3). **The within-day pairwise contrasts stay short**: B vs A1 = **458** and A6 vs A15 = **313** at p<0.001, comparable to C1–C3; the across-day contrast B vs A6 = **1206** at p<0.001 (vs 119 at C1). Highest internal MAD with C5; low intensity. |
| **C5** | **Hybridized over three days: B and A1 on day 1, A6 on day 2, A15 on day 3.** | hybridization day ↔ **strain** | Strain lists inflated: overall p<0.001 **1290**, q<0.05 **5361**. **The one within-day contrast, B vs A1, is "similar to centers 1, 2, and 3"**: **295** at p<0.001 (C1 223, C2 252, C3 270). Across-day contrasts inflate: A6 vs A15 = **1053**, A1 vs A15 = **1005** at p<0.001. Highest internal MAD with C4; low intensity. |

The authors' summary of the pattern: "In all cases where processed batches correspond to a
biologically interesting feature of the data, we see an increase in the number of apparently
differentially expressed genes." And in the Discussion: "In centers 2 and 3, female and male
samples were processed separately at the washing step, and in centers 4 and 5, samples were
hybridized together in groups defined by strain. In all cases, the gene lists corresponding to
the confounded factors were substantially longer than gene lists obtained from the other centers
where the same confounding was not present."

### Magnitude of the distortion

- "For overall strain effects, the numbers of differentially expressed genes from centers 4 and
  5 can be **as much as five times** that of other centers."
- **Table 1, strain overall, p-value thresholds** (C1|C2|C3|C4|C5): p<0.001 → 377 | 462 | 517 |
  **1390** | **1290**; p<0.01 → 939 | 1160 | 1200 | **4907** | **4522**; p<0.05 → 2732 | 3296 |
  3119 | **10943** | **10618**.
- **Table 1, strain overall, q-value** → 116 | 134 | 170 | **0** | 184 (tightest threshold);
  188 | 219 | 265 | 571 | 819; 285 | 376 | 423 | **6362** | **5361**.
  ⚠️ *Published-table label anomaly, reported not corrected:* Table 1's three strain q-value rows
  are labeled **0.001, 0.05, 0.01 in that order**. The row labeled "0.01" (285/376/423/6362/5361)
  carries exactly the numbers Table 3 reports for **q<0.05**, and Table 3 is captioned
  "q-value<0.05". So the last two q-value row labels appear transposed in the published Table 1;
  the **q<0.05 strain counts are 285 | 376 | 423 | 6362 | 5361**. The C4 value of **0** at the
  tightest q threshold is real and is explained by the Figure 2 caption: "Center 4 has smaller
  number of genes than other centers until p-value<2e-04 (panel c), then the number of gets
  increased, and that causes sudden increase in q-value (panel e)."
- **Table 1, sex effect**: p<0.001 → 3250 | **5099** | **5842** | 4003 | 3663; q<0.05 → 6360 |
  **18910** | **17475** | 8872 | 8071.
- **Table 1, fold-change criteria** (log2-based; strain): FC>1 → 135|103|118|216|532; FC>1.5 →
  56|44|52|69|124; FC>2 → 29|23|35|34|57; FC>3 → 7|6|8|8|10. Sex: FC>1 → 313|277|320|347|368;
  FC>1.5 → 139|126|139|167|145; FC>2 → 86|70|89|110|88; FC>3 → 35|31|36|54|40.
  **The between-center spread is largest under q-value and smallest under fold-change**: "In all
  cases, these differences are the most pronounced when using the q-value criteria and least when
  fold-change criteria are used."
- **Table 1 pairwise strain, p<0.001** (C1|C2|C3|C4|C5): B vs A1 → 223|252|270|458|295;
  B vs A6 → 119|190|198|**1206**|417; B vs A15 → 150|133|123|821|616; A1 vs A6 →
  323|367|463|820|605; A1 vs A15 → 284|301|372|1180|1005; **A6 vs A15** →
  209|287|254|313|**1053**. ⚠️ *Published-table label anomaly:* Table 1 prints the label
  "A1 vs.A15" **twice**; the second block is the A6-vs-A15 contrast (the Results text discusses
  "the comparison of A6 versus A15 in center 4"), so it is labeled A6 vs A15 here.
- **Table 2 — estimated proportion of non-DE genes (π₀)**: strain → C1 **0.96**, C2 **0.95**, C3
  **0.99**, C4 **0.42**, C5 **0.43**. Sex → C1 0.70, C2 0.36, C3 0.39, C4 0.53, C5 0.62. The
  centers whose batches were confounded with strain estimate that **~58% of all genes are
  differentially expressed by strain**. Consequence: "When π₀ is lower, the q-value corresponding
  to a fixed p-value is lower. Thus the q-value criteria will tend to exaggerate differences in
  the list lengths as we have observed." (q-value at a fixed p<0.05 for strain: 0.80 | 0.65 |
  0.72 | **0.09** | **0.09**.)

### Downstream consequences

- **Overlap (Table 3, q<0.05).** C4 and C5 have more DE genes and share more in absolute terms
  (C4&C5 = 1672) but "the proportion of shared genes is only about **17%**"; C1/C2/C3 have fewer
  DE genes and fewer in common but the proportion is higher, "**about 50%**". Only **182** strain
  DE genes are common to all five centers. Sex effect: proportion in common ~50%, C2&C3 ~54%,
  4044 genes common to all five — "indicating greater consistency across centers for sex effect
  than for strain effect."
- **GO enrichment (Table 3, hypergeometric p<0.01).** GO terms from strain lists: C1 14, C2 11,
  C3 16, C4 **50**, C5 **47**. Overlap among all five: **a single GO term** (GO:0048276,
  gastrulation). Sex: ~50 GO terms each, two GO terms common to all five (GO:0019752 carboxylic
  acid metabolic process; GO:0006631 fatty acid metabolic process).
- **Rank-based agreement is much better than list-length agreement (CAT plots** [2]**).** Strain:
  correspondence peaks at a list length of **about 70 genes with 60%–80% pairwise correspondence,
  about 50% common across all centers**. Sex: peak at list length **500**, correspondence **50%–70%**,
  persisting for very long lists. The authors' reading: "Strong concordance based on rank order
  indicates that many of the centers are picking the same genes and suggests that calibration of
  p-values and q-values is contributing to the difference in list lengths. It does not guarantee
  that the lists are biological in origin."
- **Intensity/MAD.** Centers 4 and 5 have the **highest internal variation (MAD)** across the 16
  arrays; center 2 the lowest. Center 2 has the highest median intensity (explained by the
  two-NTP labeling protocol); centers 4 and 5 are notably low.
- **Normalization does not fix it.** Normalizing all 80 arrays together "reduced the overall
  intensity differences but created an even **greater** difference in MAD distributions between
  centers 4 and 5 compared to the other centers."
- **Clustering.** Hierarchical clustering of all centers' raw data together "is first clustered
  perfectly **by center**"; within center, perfectly by sex, then reasonable pairing by strain.
- **Classification/projection.** With **center 3 as NMF training set**, projection recovers a
  reasonable strain/sex structure; with **center 4 as training set**, "there is no consistent
  pattern in the clusters." Other centers fall between the two extremes (Figure S1).
- **PCA.** In every center, PC1 corresponds to the **sex effect** (separates male/female). PC2
  differs per center and separates strains inconsistently.

## 7. Load-bearing statements — VERBATIM (license-aware mode: CC-BY → verbatim-ok)

Mode: **license-aware**. Short verbatim quotes below, each with location. (Rationale in §2 —
article prints unversioned CC-BY; both candidate versions are verbatim-ok.)

1. **The recommendation, including the recommendation AGAINST common practice** (Discussion):
   > "It is a common practice to organize samples having similar characteristics in groups that
   > are processed together. **We strongly recommend against this practice.** It is important to
   > identify all potential batch effects in a sample processing pipeline and to assign samples
   > to batches using a randomization mechanism."

2. **The prescribed design for this experiment** (Discussion, next sentences):
   > "With the benefit of hindsight, we might have recommended that in this experiment the
   > samples be processed in each laboratory as follows. The samples should be hybridized in two
   > batches of eight. Each batch should consist of a randomly chosen sample from each of the
   > eight sex-strain pairs. Within each batch the wash and staining should be done on randomly
   > selected sets of four samples, or with random selections balanced across sexes. In addition
   > to avoiding confounding, this strategy has the added benefit that batch can be included as a
   > random effect term in the per-gene ANOVA model to reduce error variation and thus increase
   > power of the design."

3. **Design-it-out beats correct-it-after, when confounded** (Discussion):
   > "Methods to correct for batch effects have been proposed [16], [17] and their benefits have
   > been demonstrated. However when a batch effect is confounded with an experimental factor,
   > correcting for the batch will also effectively remove the biological signal."

4. **Irreversibility, and the single-center blind spot** (Results, "Batch effects"):
   > "For any one center it is not possible to distinguish the effect of batch processing from
   > the biological effect. The magnitude of the batch effect can be significant or negligible,
   > but it cannot be removed from the data without compromising the biological signal."

5. **What the statistics are actually doing** (Discussion):
   > "The statistical criterion is correctly identifying genes that differ between groups, but
   > the perturbations that causes these differences represent a mixture of biological and
   > technical effects. In a randomized experiment, technical variation will be balanced across
   > treatment groups, and differentially expressed gene lists will more accurately reflect the
   > biological differences between samples."

(Also load-bearing, Results: "there are differences in the distribution of intensity across
centers that cannot be removed by normalization procedures.")

## 8. Stated scope, assumptions, limitations (the source's own caveats)

- **No truth standard.** "[T]here are no truth standards so our results reflect the precision but
  not necessarily the accuracy of the platform." No spike-ins, no knockout mixtures.
- **Retrospective, not designed.** The batch structure was not assigned by the study; it was
  reconstructed after the fact ("A retrospective analysis of the laboratory steps used to process
  the samples revealed…"). Centers were told to process "in a manner typical for that laboratory."
- **n=5 datasets from 4 labs, 16 samples, one platform** (Affymetrix Mouse 430v2), one tissue
  (kidney), one species (mouse), moderate biological signal.
- **The model fitted has no strain×sex interaction**; "Other models and comparisons could be
  considered but we found these to be sufficient for illustrating the differences among centers."
- **Not a claim that microarrays are unreliable**: "We do not intend to convey a message that the
  microarray data are not reliable."
- **Effect localized to list length**: "The effects we observed here primarily impact the length
  of differentially expressed gene lists, and these are exacerbated by the application of FDR
  correction [13]."
- **Feasibility caveat on the recommendation itself**: "This can be a challenging problem that
  requires careful coordination of samples to achieve efficient throughput without compromising
  data integrity."
- **Annotation limits**: "[T]his kind of detailed information about sample processing is not
  typically available in publicly archived microarray data."

## 9. Failure modes / invalidity patterns (referee-relevant)

- **Grouping like samples into a processing batch = confounding.** Whenever a processing batch
  corresponds to a biologically interesting feature, apparent DE inflates. Observed at two
  distinct steps: hybridization day ↔ strain (C4, C5) and wash/stain set ↔ sex (C2, C3).
- **Batch correction cannot rescue a confounded design.** Correcting for a batch that is
  confounded with the experimental factor removes the biological signal too (§7 quote 3).
- **Normalization cannot rescue it either** — joint RMA over all 80 arrays *widened* the MAD gap.
- **The distortion is invisible from inside a single center.** "If we had data from only one
  center, it would be difficult to detect these problems or to determine how many genes are truly
  differentially expressed." No detector is offered that works within one confounded dataset.
- **FDR/q-value amplifies the artifact.** A confounded center's π₀ collapses (0.42/0.43 vs
  0.95–0.99), which lowers the q-value at a fixed p-value, which *exaggerates* list-length
  differences. Named symptom: **an implausibly low π₀ / implausibly high estimated DE proportion**
  (C4/C5 imply ~58% of genes DE by strain).
- **Named diagnostics/symptoms in the paper** (each is a symptom, not a proof):
  - intensity distribution and **MAD** across arrays within a center (Figure 1) — centers 4/5
    stand out;
  - hierarchical clustering that **clusters perfectly by center/batch** before biology (Figure 6a);
  - **rank-order (CAT) concordance much better than list-length concordance** — signals that the
    p/q calibration, not the gene ranking, is what differs;
  - a **short within-batch contrast beside a long across-batch contrast** for the same factor
    (C4: B-vs-A1 458 and A6-vs-A15 313, both within-day, vs B-vs-A6 1206 across-day; C5: B-vs-A1
    295 within-day vs A6-vs-A15 1053 across-day). *This is the paper's sharpest internal
    fingerprint of batch confounding.*
  - GO enrichment inflating in step with the gene lists (C4 50 / C5 47 terms vs 11–16 elsewhere)
    — functional analysis does **not** filter the artifact.
  - **Projection/classification instability**: training NMF on a confounded center (C4) yields
    "no consistent pattern in the clusters"; the authors warn "in practice it may be difficult to
    know when the projection method is effective."
- **Randomization does not guarantee balance in small designs.** C1 randomized and *still* got
  partial batch↔sex confounding (3 males in the 4-sample batch) purely by chance — the paper
  reports this without prescribing a fix (its own recipe for the redo uses **restricted**
  randomization instead; see §12).

## 10. What the source does NOT address (confident silences — verified by full-text search)

- **INSTRUMENT RUN ORDER / INJECTION ORDER / POSITION WITHIN A RUN: NOT ADDRESSED. This is a hard
  silence, not a soft one.** The word **"order" appears in the paper only as "rank order" of genes
  by test statistic** (the CAT analysis) — never as processing, run, hybridization, wash, or scan
  order. The words **"drift", "carryover"/"carry", "sequence", "position", "slot", "run order"
  do not appear at all** in the body. The paper's unit of concern is the **discrete processing
  batch** (which samples are processed *together* in a group), never the *sequence within* a group
  or a run. Its recommendation is randomized **assignment to batches** ("assign samples to batches
  using a randomization mechanism"; "a randomly chosen sample from each of the eight sex-strain
  pairs"; "randomly selected sets of four samples") — i.e. randomized **membership**, not
  randomized **order**. Even the multi-day cases (C4 two days; C5 three days) are treated as
  *discrete day-batches*, not as a temporal trend or drift; no continuous time/run-index covariate
  is fitted or discussed anywhere.
  **This source cannot be cited for "randomize the injection/run order" or for continuous temporal
  drift. It supports randomized assignment to discrete processing batches, and nothing more.**
- **The word "blocking" never appears** (0 occurrences of "block"). The paper never contrasts
  randomization with blocking by name.
- **No variance decomposition.** Nowhere does the paper quantify what fraction of variance is
  attributable to batch/processing vs biology — no variance components, no % variance explained,
  no ICC. The evidence is entirely DE-count, π₀, MAD, clustering, and PCA-structure based.
  (The only quantitative "how much" statements are the DE-count ratios: "as much as five times".)
- **No batch-effect correction method is applied or benchmarked.** ComBat-style correction is
  cited in passing ([16] SVA, [17]) but never run on these data.
- **RNA extraction / tissue collection as a batch-generating step is not analyzed** — samples were
  prepared centrally at one site and shipped, so extraction is not a center-level batch here.
- **Scanning is *named* as one of the four processing steps but no scanner or scan-date batch
  effect is reported** for any center; likewise **no labeling-batch confounding is reported**
  (labeling *protocol* differences between centers are, but not labeling-batch↔factor confounding).
  The recommended recipe (§7 quote 2) covers **hybridization batches and wash/stain sets only** —
  it prescribes nothing for labeling or scanning order/grouping.
- **No sample-size / power calculation, no randomization algorithm or software** is given — the
  paper says "using a randomization mechanism" without specifying one (no tool, no objective
  function, no stratification procedure beyond the one worked example).
- **No GEO/ArrayExpress accession, no data-availability statement.**
- **No RNA-seq, no mass spectrometry, no non-microarray platform.** Single platform (Affymetrix
  Mouse 430v2), single vendor.
- **Randomization vs statistical adjustment**: it *does* address this (§7 quote 3, and batch as a
  random effect in §7 quote 2) — see §12 — but it never treats adjustment for a *non*-confounded,
  *unrandomized* batch, and gives no guidance on residual/partial confounding like C1's.

## 11. Open questions / ambiguities left unresolved

- What to do when randomization *happens* to produce partial confounding (C1's 3-of-4 males) — the
  paper reports it, notes C1 still had the shortest lists, and offers no correction or re-draw rule.
- How to detect batch confounding from a **single** dataset — the paper says it is difficult and
  stops there.
- Which of the four steps carries the largest batch effect: "The effect is less than that for the
  strain comparisons between centers 4 and 5, which may indicate that the batch effects of wash
  and staining are less dramatic or may it reflect the strength of signal in the sex effect, or
  both." — explicitly unresolved.
- Whether centers 4/5's inflated lists are *purely* artifact: rank-order concordance is high, so
  "many of the centers are picking the same genes," yet "[i]t does not guarantee that the lists are
  biological in origin." The paper does not quantify the artifact fraction.
- Two internal numeric inconsistencies the paper does not resolve: Table 1 gives **423** strain DE
  genes at q<0.05 for C3 while Table 3 gives **426**; Table 1 gives **8071** sex DE genes at q<0.05
  for C5 while Table 3 gives **8971** (and Table 3's C5 strain row reads 5361, matching Table 1).
  Plus the two Table 1 label anomalies flagged in §6.

## 12. Guidance answers

**Q. Explicit recommendation about assignment to processing batches, and about order within a
batch? Quote every such sentence, including any recommending AGAINST a common practice.**
Yes for **assignment**; **NO sentence anywhere about order within a batch**. The complete set of
recommendation sentences is §7 quotes 1–2 (reproduced there verbatim), plus, from the Discussion:
"we wish to highlight the importance of randomization in all laboratory procedures" and "The
laboratories involved in this study have updated their practices to incorporate randomized
assignment of samples to processing batches." The against-common-practice sentence is: **"It is a
common practice to organize samples having similar characteristics in groups that are processed
together. We strongly recommend against this practice."** Every recommendation is about **which
samples go in which batch**, never about sequence/order within one.

**Q. What exactly is randomized — batch membership, day, hybridization order, wash/stain order,
scan order? Enumerate each level named.**
Levels the recommendation actually names: (1) **hybridization batch membership** — two batches of
eight, each containing one randomly chosen sample from each of the eight sex-strain pairs; (2)
**wash/stain set membership** — within each hyb batch, randomly selected sets of four (fluidics
station capacity), or random selections balanced across sexes. That is all. **Hybridization
*order*, wash/stain *order*, and scan *order* are never mentioned.** "Day" enters only as a
description of what C4/C5 *did wrong* (hyb over 2 and 3 days), not as a randomization level in the
recipe — the recipe's two batches of eight are not assigned to days at all. The general rule adds:
"identify **all** potential batch effects in a sample processing pipeline and … assign samples to
batches using a randomization mechanism" — an instruction to enumerate steps, without enumerating
them for you.

**Q. The prescribed design as a concrete recipe (batch sizes, what is balanced, what is randomized
within what).** For the 16-sample, 4-strain × 2-sex experiment:
1. **Hybridization: 2 batches × 8 samples.** Each batch = **one randomly chosen sample from each of
   the 8 sex-strain pairs** → both batches are *balanced* (fully crossed) on sex and strain; the
   *choice of which replicate* goes to which batch is the randomized part. (Restricted/stratified
   randomization, though the paper never uses those words.)
2. **Wash and staining: within each hyb batch, sets of 4** (the fluidics-station limit), either
   **randomly selected** or **"with random selections balanced across sexes."**
3. **Analysis: include batch as a random effect term in the per-gene ANOVA model** — stated benefit:
   reduces error variation, increases power.
Nothing is prescribed for labeling batches, scanning, or any within-batch ordering.

**Q. The experiment: labs, samples, factors, platform, processing runs.**
**4 laboratories → 5 datasets (C1–C5)**, one lab having processed the 16 samples **twice, at
different times with different labeling protocols**. **16 RNA samples** (mouse kidney), factors
**strain** (B, A1, A6, A15 — C57BL/6J plus three chromosome substitution strains for Chr1, Chr6,
Chr15 from A/J) and **sex** (2 male + 2 female per strain). Platform **Affymetrix GeneChip Mouse
430v2**; **80 arrays** total. Processing runs per center are the batch structures in §6's table
(C1: 2 hyb batches, same day; C4: 2 hyb days; C5: 3 hyb days; C2/C3: split wash/stain by sex).

**Q. Per center: what was done with processing order, and the DE-gene consequence, with numbers.
Which centers confounded which biological factor with which procedural step?** See the table in
§6. In brief: **C2, C3 → sex ↔ wash/stain batch** (sex q<0.05 lists 18910 and 17475, vs 6360 at
C1); **C4, C5 → strain ↔ hybridization day** (strain q<0.05 lists 6362 and 5361, vs 285/376/423 at
C1/C2/C3; strain π₀ 0.42/0.43 vs 0.95–0.99); **C1 → randomized, with incidental partial sex ↔ batch
confounding** from a 12/4 split that put 3 males in the batch of 4; C1 has the shortest lists in
every comparison. Note precisely: **no center is described as having done anything with processing
*order*** — the paper only records which samples each center processed *together*.

**Q. Variance attributable to processing/batch vs biology — numbers.** **Not provided.** The paper
gives **no** variance decomposition or percentage. The closest quantitative statements are
DE-count ratios ("as much as five times"), the π₀ estimates (Table 2), MAD comparisons (Figure 1b,
qualitative in the text), and the fact that raw data cluster "perfectly by center" before biology.

**Q. Which procedural steps are treated as batch-generating? List every one named.** Exactly four,
as printed: **labeling, hybridization, wash and staining, and scanning.** Equipment constraint
named: the **fluidics station** for wash/stain handles **up to four samples**; hybridization
capacity is "constrained" (number unspecified). **RNA extraction and scan date/scanner are NOT
analyzed** (extraction was centralized; scanning is named in the four-step list but no scan batch
effect is reported). "Day" is a batch label applied to hybridization only.

**Q. Does it discuss instrument RUN ORDER / injection order within a run, or continuous temporal
drift? Quote, or record the silence explicitly.**
**IT DOES NOT. Recording the silence explicitly:** there is **no sentence in this paper about run
order, injection order, within-run position, array position, scan sequence, or continuous temporal
drift.** Full-text search: "order" occurs only in "rank order"/"rank ordering" of genes;
"drift", "carryover", "sequence", "run order" occur zero times. The paper's entire model of
procedural nuisance is **discrete batch membership** — samples processed *together* in a group
(a hyb day, a fluidics run of ≤4, a labeling set). Multi-day processing (C4: 2 days; C5: 3 days)
is analyzed as discrete day-batches confounded with strain, **not** as a temporal trend.
**Do not stretch this source to mass-spec injection order or to run-order/drift claims of any
kind — it does not reach there.**

**Q. Randomization vs blocking (deliberate balancing) — one, the other, or both?**
The word **"blocking" never appears** (0 occurrences), so the paper never frames the contrast. But
its prescribed recipe is, in substance, **both**: each hyb batch is *deliberately balanced* — "Each
batch should consist of a randomly chosen sample from each of the eight sex-strain pairs" (one per
sex-strain cell = a complete block), with randomization operating *within* that constraint; and at
wash/stain, "randomly selected sets of four samples, **or with random selections balanced across
sexes**" — the explicit either/or between plain randomization and balance-constrained
randomization. The stated headline rule, however, is randomization: "assign samples to batches
using a randomization mechanism."

**Q. Statistically adjusting for batch after the fact vs designing it out?** Addressed directly,
twice, and it comes down on **designing it out**:
- §7 quote 3 — batch-correction methods exist and work, "However when a batch effect is confounded
  with an experimental factor, correcting for the batch will also effectively remove the biological
  signal."
- §7 quote 4 — "The magnitude of the batch effect can be significant or negligible, but it cannot
  be removed from the data without compromising the biological signal."
- But adjustment is endorsed **when the design was randomized first**: "batch can be included as a
  random effect term in the per-gene ANOVA model to reduce error variation and thus increase power
  of the design" (§7 quote 2). So: randomize/balance at design time; then model batch to *recover
  power*, not to *rescue* a confounded design.

**Q. Pin: journal, article number, DOI, date, license wording/version, GEO accession, access date.**
*PLoS ONE* 3(11): **e3724**, published **2008-11-14**; DOI **10.1371/journal.pone.0003724**;
PMCID PMC2579585 / PMID 19009020. License: **unversioned "Creative Commons Attribution License"**
as printed (exact wording in §2) — **no version number appears in the article**; PLOS's CrossRef
deposit for the DOI says CC-BY 4.0. **GEO accession: none given** — the article names no accession
and has no data-availability statement. **Access date 2026-07-13.**
