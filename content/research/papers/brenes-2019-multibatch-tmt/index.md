---
title: "Multibatch TMT Reveals False Positives, Batch Effects and Missing Values"
type: paper
source_id: brenes-2019-multibatch-tmt
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC6773557/
access_date: 2026-07-13
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
license_statement: "Author's Choice—Final version open access under the terms of the Creative Commons CC-BY license."
attribution: "Brenes A, Hukelmann J, Bensaddek D, Lamond AI. 'Multibatch TMT Reveals False Positives, Batch Effects and Missing Values.' Mol Cell Proteomics 2019;18(10):1967–1980. © 2019 Brenes et al. Licensed CC BY 4.0."
derived: license-aware-summary
---

# Brenes et al. 2019 — Multibatch TMT Reveals False Positives, Batch Effects and Missing Values

## 1. Citation

- **Authors:** Alejandro Brenes, Jens Hukelmann, Dalila Bensaddek, Angus I. Lamond
- **Title:** "Multibatch TMT Reveals False Positives, Batch Effects and Missing Values"
- **Venue:** *Molecular & Cellular Proteomics* **18**(10):1967–1980
- **Publisher:** The American Society for Biochemistry and Molecular Biology, Inc.
- **DOI:** 10.1074/mcp.RA119.001472
- **PMID:** 31332098 · **PMCID:** PMC6773557 · **Publisher ID:** RA119.001472
- **Published:** epub 22 July 2019; print issue October 2019
- **Data:** ProteomeXchange / PRIDE accession **PXD010557** (raw files + full MaxQuant output + run parameters)
- **Open-access URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC6773557/
- **Access date:** 2026-07-13 (read via Europe PMC full-text XML: `https://www.ebi.ac.uk/europepmc/webservices/rest/PMC6773557/fullTextXML`; the PMC HTML page itself served a reCAPTCHA interstitial)

**License statement (verbatim, from the article's `<permissions>` block):**

> "Author's Choice—Final version open access under the terms of the Creative Commons CC-BY license."

with `© 2019 Brenes et al.` and license link `http://creativecommons.org/licenses/by/4.0`. → **CC-BY-4.0**, so this note uses the **license-aware** posture: short load-bearing verbatim quotes are permitted (§7), each with location.

## 2. Access note

Full text read (abstract, Experimental Procedures, Results, Discussion, Data Availability, Table I, figure captions). **No paywall boundary.** The *figures themselves* (Figs. 1–6) were not viewed as images — all figure-derived numbers below come from the running text or the captions, so any quantity that exists only inside a plotted panel and is not stated in text is not captured here. Supplemental data files (listed at §10) were not retrieved.

## 3. Thesis (one sentence)

Multiplexed TMT is precise and near-complete *within* a single batch, but as multiple TMT batches are integrated, missing values inflate, inter-batch accuracy degrades, and reporter-ion/coisolation interference produces false positives that fall inside the fold-change range of genuine biology — so multibatch TMT needs an internal reference sample in every batch plus an interference-aware channel layout.

## 4. Problem & context

- DDA shotgun proteomics can identify 10,000+ proteins but needs extensive prefractionation and ≥3 replicates per condition to evaluate significance, so acquisition time is large.
- Isobaric multiplexing (TMT, iTRAQ) is the standard response; TMT is "widely used." Within a single multiplexed batch, protein-level missing values are low ("frequently <2%") and quantitative precision is high.
- The open question the paper attacks: **"it is less clear how well multiplexed TMT performs for very large-scale analyses, involving numerous TMT batches."**
- Four issues examined: (1) missing values, (2) accuracy of quantification, (3) false positives, (4) the effect of reporter ion interference (RII) and coisolation interference (CII).

## 5. Method / approach

### The dataset

- Human iPSC proteomics dataset: **twenty-four 10-plex TMT batches**.
- **240 iPSC replicates**, stated as **217 biological replicates and 24 technical replicates**, derived from **163 different donors**. *(Note: 217 + 24 = 241, not 240 — the source's own arithmetic; recorded as stated, not reconciled. See §11.)*
- **142** replicates from female donors, **98** from male donors.
- **Each batch consisted of 1 common reference line (technical replicates of iPSC cell line "bubh_3") and 9 different iPSC cell lines.**
- Copy-number/CV analysis used **230 iPSC replicates (208 biological + 23 technical) across 23 batches** after removing batch **PT6388**. *(Again 208 + 23 = 231 ≠ 230; as stated.)*

### Sample prep & acquisition (as stated)

- Lysis in 8 M urea / 100 mM TEAB; sonication 6 × 20 s; reduce TCEP (25 mM, 30 min, RT); alkylate iodoacetamide (50 mM, 30 min, dark); EZQ protein assay.
- Double digestion: Lys-C then trypsin, enzyme:substrate **1:50 (w/w)**, overnight at 37 °C; stopped with TFA to 1% (v:v); C18 Sep-Pak desalting.
- TMT labeling: **100 μg peptides per cell line per channel**, TMT tag 20 μg/ml in 40 μl acetonitrile, 2 h RT; quenched with 8 μl of 5% hydroxylamine, 30 min.
- Off-line high-pH RP fractionation: Xbridge BEH130 C18, 4.6 × 250 mm, 3.5 μm; 25-min multistep gradient; **48 fractions consolidated into 24**.
- **Instrument: Orbitrap Fusion Tribrid** (all batches on the same instrument), Dionex RSLCnano; 4-hour gradient, 200 nl/min.
  - MS1 in orbitrap: m/z **400–1400**, resolution **120,000**, AGC target **2.0 × 10⁵**.
  - MS2: CID in ion trap, **30% CID collision energy**, isolation window **1.6 Th**, AGC **1.0 × 10⁴**, max injection **70 ms**, dynamic exclusion **80 s**, scan rate "Rapid," top-speed 4 s cycle.
  - **MS3 for TMT quantification:** **5 fragment ions coisolated by synchronous precursor selection (SPS)**, window **2 Th**, **HCD 55%**, orbitrap resolution **60,000**, AGC **1.0 × 10⁵**, max injection **105 ms**.
- QC between batches: one blank, then a **15-peptide Retention Time Calibration (RTC) standard**, then an **MCF10a total cell digest standard**, then two blanks.

### Search / filtering

- **MaxQuant v1.6.3.3**; FDR **1%** at PSM and protein level; type = **Reporter ion MS3 with 10plex TMT**.
- Fixed mod carbamidomethyl (C); variable oxidation (M), acetylation (protein N-term), deamidation (NQ), Gln→pyro-Glu (N-term); **2 missed cleavages**; **reporter mass tolerance 0.03 ppm** *(verbatim as printed)*; **min peptide length 7**; UniProt SwissProt **December 2018**.
- Filter out "Reverse," "Potential Contaminants," "Only identified by site." → **9,640 proteins**, **178,491 peptides**.

### Quantification & normalization (functional forms — reimplementable)

**Copy numbers via the "proteomic ruler."** Uncorrected copy number for protein *p*:

```
uCN(b,c,p) = protein MS3 signal(b,c,p) × A × Mp × 6.85e-12 / Σ_{h ∈ b,c} histones MS3 signal(h)
   for batch b ∈ {1,2,…24}, channel c ∈ {126C, 127N, …, 131N}
```
(A = Avogadro's constant, Mp = molar mass of protein p.) These are the **"raw copy numbers"** used for CV.

**Reference-channel normalization** — a per-protein, per-batch **correction factor** built from the reference channel **126C**:

```
cf(b,p) = uCN(b,126C,p) / [ Σ_b uCN(b,126C,p) / 24 ]
normCN(b,c,p) = uCN(b,c,p) / cf(b,p)
```

i.e. each protein's copy number in every channel of batch *b* is **divided** by that batch's reference-channel value expressed relative to the reference channel's mean across the 24 batches. **This is a per-protein multiplicative rescaling of every channel by the batch's reference-channel deviation** (a ratio in linear copy-number space). The paper calls channel **126C** "the reference channel."

**Coefficient of variation** — computed on **log10-transformed protein copy numbers**:

```
CV = (S / X) × 100        (S = SD of copy number, X = mean copy number)
```
- Within-batch CV: all 10 cell lines within the same batch, using all proteins detected in every reporter channel.
- Reference-line CV: proteins detected in the **TMT10-126C** channel across all 24 batches.

**Missing values.** A protein/peptide counts as detected if it has **≥1 reporter intensity greater than zero**. Within a batch: compare unique proteins/peptides per reporter channel against unique proteins/peptides identified in the batch. Across batches: **random sampling without replacement, from 2 up to 22 batches (PT6388 excluded), 500 iterations per level**, R base `sample()`; at each level recompute the detected list across the integrated batches and evaluate per-channel detection against it.

**Peptide intensity normalization.** Replicate normalized intensity `rni(q) = log10( peptide MS3 signal(b,c,q) / median(I(b,c)) )` where `I(b,c)` is all peptide MS3 signals in batch *b*, channel *c*. Median normalized intensity `mni(q) = median over all b,c of rni(b,c,q)`. **Global median = median of mni over all peptides q = −0.184.** Peptides with mni ≥ global median = "High intensity"; below = "Low intensity."

**Correlation:** Lin's concordance correlation coefficient via `correlation()` from R package **agricolae v1.2.8**. Plots via **ggplot2 v3.0.0**.

### The Y-chromosome internal ground truth (the false-positive assay)

- The dataset contains iPSC lines from **both male and female donors**; **11 proteins mapped specifically to the Y chromosome** were detected.
- Peptides mapping uniquely to Y-chromosome-specific genes: **CDY1, CDY2A, DDX3Y, EIF1AY, KDM5D, NLGN4Y, PCDH11Y, RPS4Y1, TBL1Y, USP9Y, UTY** → **69 peptides** initially.
- **Exclusions:** batches **PT6384** and **PT7422** (exclusively female-donor iPSCs, confirmed Y-free by DNA QC) — any Y peptide there treated as *wrongly annotated* and discarded; batch **PT6388** discarded as an outlier (failed QC).
- **Final: 65 unique Y-chromosome-encoded peptides across 21 TMT batches**, used as **"male-specific" spike-in references** / **endogenous "spike-in" peptides**.
- **Ground-truth logic:** Y-chromosome peptides *should be absent from female channels*; **any signal detected in a female channel is therefore artificial** (a false positive). Female-channel signal is the false-positive readout; no external spike-in is needed.

### RII classification (Table I, verbatim)

RII targets are taken from "a typical product data sheet for 10-plex TMT Label Reagents from ThermoFisher Scientific."

| Mass tag | Reporter channel | −1 Da (secondary RII) | +1 Da (primary RII) |
|---|---|---|---|
| TMT10-126 | 1 | – | 127C |
| TMT10-127N | 2 | – | 128N |
| TMT10-127C | 3 | 126 | 128C |
| TMT10-128N | 4 | 127N | 129N |
| TMT10-128C | 5 | 127C | 129C |
| TMT10-129N | 6 | 128N | 130N |
| TMT10-129C | 7 | 128C | 130C |
| TMT10-130N | 8 | 129N | 131 |
| TMT10-130C | 9 | 129C | – |
| TMT10-131 | 10 | 130N | – |

- **Primary RII:** a male channel contaminates, by isotopic impurity, the **+1 Da** female channel of the same isotope (e.g. male 126C → female 127C).
- **Secondary RII:** a male channel contaminates the **−1 Da** female channel of the same isotope (e.g. male 127C → female 126C).
- **Double RII:** a female channel affected by both primary and secondary RII from male channels. **"no RII":** neither.
- **Coisolation interference (CII):** "the effect caused by multiple labeled peptides being selected within the isolation window." **RII** = "cross-label isotopic impurity," arising "from manufacture level impurities and experimental error."

## 6. Key claims / findings

### Missing values

- **Within a single batch:** **92% of the 24 batches show <1% missing values at the protein level**; one outlier (**PT6388**) >1.5%. At the peptide level, **92% of the 24 batches have <5% missing peptide values**; the outlier PT6388 shows **9%** missing at peptide level.
- **Integration inflates missing values (protein level):** median missing rises from **0.19% with one batch → 6.35% when a second batch is integrated**; integrating **5 batches → ~10%**.
- **Integration inflates missing values (peptide level):** integrating just **two batches → median >23%** missing; **5 batches → ~40%** missing.
- *(Discussion restates these with slightly different framings: peptide "from <2% to ∼24%" for two batches; protein "from <0.5% to >6%." Both the Results and Discussion numbers are recorded as printed — see §11.)*
- **Peptides identified per batch:** median **84,046**, SD **11,354** — "relatively constant" within a batch but "quite variable across different batches."
- Log10 median-normalized peptide MS3 intensities **span 6 orders of magnitude**.
- **Missingness is not just a low-abundance problem.** In the **4th (most abundant) quartile**: **26% of these peptides are detected in <50% of TMT channels**; those have median normalized intensity **0.32**, i.e. the **84th percentile of abundance**. Only **24% of 4th-quartile peptides were detected in all TMT channels**.
- In the **1st (least abundant) quartile**: only **11 peptides** detected in all TMT channels; only **603** seen in >90% of channels.
- **Only 12,140 peptides were detected in all TMT channels — 6.81% of all peptides.**
- Of the least-frequently-identified quartile (detected in **<29 TMT channels**), **>29% had a median normalized intensity above the global median (−0.184)** — "even relatively abundant peptides are not identified consistently."
- **~50% of peptides are detected in <40% of all TMT channels.**

### Precision / accuracy across batches — the three CV numbers

| Condition | Median protein CV |
|---|---|
| **Within** each 10-plex TMT batch (all 10 cell lines) | **1.72** (every batch's median CV <2.5; CV >7.5 = outlier within a batch) |
| **Across** batches — 23 technical replicates of the reference line bubh_3 (channel 126C) | **11.03** — i.e. **6.4-fold higher** than the within-batch median |
| **After reference-channel normalization** (all cell lines + technical replicates) | **2.96%** |

- **Lin's concordance correlation:** median **98%** within a 10-plex batch; drops to **81%** for the technical replicates of the reference line across the 23 batches.
- **>80% of all proteins** in the technical replicates would be classed as **outliers** by the within-batch CV criterion.
- **Batch effect > biology:** batch **PT6390** mixes healthy-donor lines with lines from donors with rare genetic diseases (Usher syndrome, Monogenic Diabetes, Bardet-Biedl syndrome); its **within-batch median protein CV is still ~10-fold lower** than the CV across the 23 technical replicates — "indicating that TMT batch effects have a bigger influence on the proteomics data than a healthy versus diseased physiology."
- **Variation is not confined to low-abundance proteins.** Among the top 100 most abundant proteins with CV ≥ 7.5 across reference-line replicates, five highlighted cases (all median copy number > 500,000, all identified with >6 unique+razor peptides (URP)) swing by ~1–2 orders of magnitude across batches:
  - **RPL35A**: ~16,786,000 → ~185,000 copies (10 URP)
  - **HIST1H1C**: ~4,847,000 → ~43,000 (6 URP)
  - **ATP5IF1**: ~4,825,000 → ~84,000 (6 URP)
  - **PPIH**: ~4,180,000 → ~45,000 (14 URP)
  - **GSTO1**: ~3,920,000 → ~115,000 (16 URP)
- **Copy numbers already normalize, but not enough:** "copy numbers already provide a layer of normalization, however it proves insufficient to deal with batch variation."

### False positives (the Y-chromosome result)

- **In all 21 batches and in every reporter channel containing a female cell line, a minimum of over 40% of the Y-chromosome-specific peptides identified in the batch also had signal in the female channels.**
- **Across batches, a median of 89% of the Y-chromosome-specific peptides quantified in each batch were quantified in TMT channels containing female cell lines.**
- **Worst case cited:** batch **PT6380** had only **two male channels**; the remaining **8 female channels still quantified 97.5%** of all Y-chromosome-specific peptides detected in that batch.
- Attributed to **a combination of coisolation and reporter ion interference**, "mostly" to coisolation interference.

### Magnitude of interference

- **Male vs. female-with-no-RII channels** (taken as the CII-only comparison): male channels are a median **9.43-fold** higher in replicate normalized intensity.
  - **High-intensity peptides** (mni ≥ global median −0.184): **12.8-fold** higher.
  - **Low-intensity peptides**: only **2.14-fold** higher → "revealing higher vulnerability to coisolation interference."
- **Male vs. female "double RII"** channels: only **4.9-fold** higher.
- **Male vs. female "secondary RII"** channels: **8.94-fold** higher → "the smallest effect," so **"primary RII" is the main source of isotopic impurities.**
- **Female RII channels vs. female no-RII channels** (Fig. 5C):
  - **Secondary RII:** **1.05-fold** increase in high-intensity peptides; "virtually no change" in low-abundance peptides.
  - **Primary RII:** **1.57-fold** increase (high intensity); **1.10-fold** (low intensity).
  - **Double RII:** **1.7-fold** increase (high intensity); "a small reduction in the median" for low-intensity peptides.
  - *(Discussion states secondary RII gave "only a median 1.02-fold increase," and the design section states secondary RII "only causes a median increase of 2.2% in intensity" — see §11 for this tension.)*
- **Between-batch spread of the male:female intensity difference:** **PT6379 = 17-fold**, **PT6386 = 65-fold** (false positives easy to spot); but **PT7430 = 2.5-fold** and **PT6391 = 4.4-fold** ("making the detection of the false positives problematic"), both being low-intensity/low-S:N batches.
- **Interpretation:** low-intensity peptides are affected mostly by **coisolation** interference (RII barely moves their ratios); **RII** can have a profound effect on **high-intensity** peptides.

### The experimental-design recommendation

- **Include ≥1 relevant internal reference sample in every batch**, placed in channel **126C or 127N** (these avoid primary RII; only secondary RII touches them). **Do not** place it at **131N / 131C** (exposes it to primary RII).
- **Lay conditions out alternating across channels, not grouped.** For a 10-plex with 2 conditions × 5 replicates, a **5–5 grouped layout** leaves multiple channels hit by cross-population primary+secondary RII; the **optimal design alternates the two conditions across the 10 channels** (zero cross-population primary/secondary RII).
- For **3 conditions in triplicate** (or 2 conditions + a control): **use TMT 11-plex** — "all 10-plex TMT setups involve cross population/condition reporter ion interference." An 11-plex can eliminate cross-population RII but **requires two empty channels at 129C and 130N**. With a control channel included: put the control at **126C** and the empty channel at **130N**; then **only two channels suffer primary and secondary RII**.
- **QC:** run a rigorous QC procedure *before* the experiment starts — PT6388's failed QC run "was not detected until after the samples were run, producing poor results within that batch."

## 7. Load-bearing statements — **VERBATIM** (license-aware mode; CC-BY-4.0 permits reproduction)

> **[V1 — the design recommendation; §"Optimizing the Experimental Design"]**
> "For all studies based on more than a single multi-plex TMT batch, we advocate at least one relevant internal reference sample should be included in each batch and assigned to either channel 126C, or 127N. These channels avoid “primary RII,” the main cause of isotopic impurities, and are only affected by “secondary RII,” which only causes a median increase of 2.2% in intensity. In contrast, placing the reference line at channel 131N, or 131C increases the impact of reporter ion interference by exposing them to “primary RII.”"

> **[V2 — the condition-layout rule; §"Optimizing the Experimental Design"]**
> "For example, in a 10-plex TMT study, when two conditions are being analyzed, each with 5 biological replicates, a 5–5 grouped layout would cause multiple channels to be affected by cross population/condition reporter ion interference (Fig. 6A). The optimal design would involve alternating the two conditions across the 10 channels (Fig. 6B)."

> **[V3 — what the reference sample is FOR, and its stated difficulty; §Discussion]**
> "This also underlines the importance of normalizing batch effects, in our case via a common control sample within each TMT batch which allows for objective data normalization to minimize the batch effects, as has been reported (40, 41). Copy numbers apply a layer of normalization, but our data highlight they are insufficient to address batch effects. We showed that by introducing at least one suitable control (reference line) within each TMT batch the batch effects can be normalized effectively. **The challenge lies in identifying a suitable control that is truly representative for most proteins being compared within the experiment and in creating a control that is highly reproducible across all the TMT batches.**" *(bold added by summarizer for emphasis; wording unaltered)*

> **[V4 — the hedge on what normalization buys; §Results, "Variation Between 10-plex TMT Batches"]**
> "Here we used the technical replicates of a reference iPSC line as an internal reference standard to control for variation between batches (see methods). Using this normalization method provided a median CV of 2.96% across all cell lines and technical replicates, making the results closer to the metrics obtained for each within-batch analysis."

> **[V5 — false positives sit inside the range of real biology; §Results, "Reporter Ion Interference and Coisolation Interference"]**
> "We note that for both “primary RII” and “double RII” the false positives are within the 8-fold increase/decrease range for bona fide changes in protein/peptide expression levels often detected within proteomic data sets (35, 36)."

> **[V6 — the false-positive headline; §Results, "False Positives"]**
> "Surprisingly, this showed that in all twenty-one 10-plex TMT batches considered here and in all reporter channels containing a female cell line, a minimum of over 40% of the Y chromosome-specific peptides identified within the batch also had signal in the female channels. Remarkably, across all these batches, a median of 89% of Y chromosome-specific peptides quantified in each batch were quantified in TMT channels that contained female cell lines."

> **[V7 — the limit on mixing heterogeneous populations; §Discussion]**
> "Nonetheless, we highlight again that mixing significantly different populations within a TMT batch, for example iPSCs and terminally differentiated somatic cells, will introduce false positives within the data, as illustrated here by the Y chromosome-specific peptides detected within all female cell lines."

## 8. Stated scope, assumptions, limitations (the source's own caveats)

- **Single dataset, single cell type, single instrument.** All conclusions rest on one iPSC dataset ("a model data set derived from the analysis of human iPS cell lines"), all batches run on **the same Orbitrap Fusion** — the paper does not claim to have varied instrument or lab.
- **MS3/SPS quantification.** The quantification is Reporter-ion MS3. The paper notes MS2-based TMT is reported to yield more peptide identifications (39) "however there is no guarantee this will detect peptides/proteins more reproducibly across batches" and would **"intensify the disruptive effect of the coisolation interference."**
- **The coisolation problem is reduced, not eliminated, by newer hardware:** "we note that the issue has been reduced, though not completely eliminated, with newer generation Orbitrap MS instruments, where the improved source has enhanced the signal to noise ratio (34)."
- **Coisolation-free tag chemistries exist but are limited:** "new isobaric tagging methods have been developed which claim to be coisolation free (42), however their multiplexing capability is currently limited to a 6-plex."
- **The Y-peptide assay requires a mixed-sex batch.** "This approach of using peptide values from Y chromosome specific genes depends upon there being a diverse mixture of male and female donor-derived iPSC lines in each 10-plex TMT batch." Female-only batches (PT6384, PT7422) had to be excluded.
- **One batch was dropped as an outlier** (PT6388, failed QC) from most analyses — so the headline missing-value/CV/false-positive figures are conditioned on excluding a known-bad batch, i.e. they are, if anything, optimistic.
- **RII targets are taken from a vendor data sheet** ("a typical product data sheet for 10-plex TMT Label Reagents from ThermoFisher Scientific"), not measured per-lot in this study.

## 9. Failure modes / invalidity patterns (referee-relevant)

Conditions under which multibatch TMT quantification becomes misleading, per the source:

1. **Integrating ≥2 TMT batches inflates missingness immediately** — protein-level median missing goes 0.19% → 6.35% at the *second* batch; peptide-level >23%. Any analysis that naively pools batches inherits this. **Detector:** count proteins/peptides with ≥1 reporter intensity >0 per channel vs. the union across integrated batches.
2. **Complete-case filtering is near-fatal at peptide level** — only **6.81%** of peptides (12,140) are present in *all* channels. A "detected everywhere" filter discards ~93% of the peptide evidence.
3. **Missingness is not abundance-explained** — 26% of the *most abundant* quartile of peptides appear in <50% of channels. So "it's just low-abundance dropout" is a false comfort; abundance filters do not rescue reproducibility.
4. **Within-batch precision does not license cross-batch comparison.** Within-batch median CV 1.72 / concordance 98%; across-batch (same technical replicate!) CV 11.03 / concordance 81%. **>80% of proteins** in the technical replicates would be flagged as outliers by the within-batch criterion. Reporting within-batch CV as evidence of accuracy is the invalidity pattern.
5. **Batch effect can exceed the biological contrast** — batch variation dominated healthy-vs-rare-genetic-disease physiology (PT6390 within-batch CV ~10-fold lower than the cross-batch technical-replicate CV).
6. **Copy-number/proteomic-ruler normalization is insufficient** on its own to remove batch variation.
7. **False positives are systematically produced by channel leakage**: peptides that *cannot* exist in a sample (Y-chromosome peptides in female channels) are nonetheless quantified — median **89%** of them per batch, ≥40% in every single female channel, up to **97.5%** in a batch with only 2 male channels. **Detector named by the source:** an internal set of peptides known a priori to be absent from some channels (here, Y-chromosome-specific peptides in female-donor channels).
8. **The false positives are not distinguishable by effect size** — under primary and double RII they land **within the ~8-fold range of bona fide biological changes** [V5]. So a fold-change cutoff will not separate them.
9. **Low-S:N batches hide the artifact.** Where the male:female intensity ratio is large (17×, 65×) the false positives are conspicuous; where it is small (2.5×, 4.4×, in low-intensity/low-S:N batches) detection becomes "problematic."
10. **Channel adjacency is the mechanism:** primary RII (+1 Da) is the dominant isotopic-impurity path. Placing conditions in adjacent channels (a **grouped 5–5 layout**) manufactures cross-condition contamination; placing the reference at 131N/131C exposes it to primary RII.
11. **Mixing strongly different populations in one batch will introduce false positives** [V7] — named example: iPSCs together with terminally differentiated somatic cells.
12. **Instrument QC drift silently corrupts a batch.** PT6388's QC failure was "not detected until after the samples were run"; it is the batch with >1.5% protein / 9% peptide missing values and "irregular behavior." **Detector:** RTC standard + MCF10a digest standard run between batches; the source recommends QC *before* the experiment starts.
13. **Stated failure mode of the reference-channel design itself** [V3]: the control must be **"truly representative for most proteins being compared"** and **"highly reproducible across all the TMT batches."** The source names these two as "the challenge" — it does not quantify what happens when they fail.

## 10. What the source does NOT address (confident silences)

- **Downstream hypothesis testing.** *(See §12 Q3 — this is the load-bearing silence.)* The paper never performs a differential-abundance test, never mentions p-values, t-tests, limma, linear models, regression, ComBat, or any batch-effect *model*. Its entire evaluation currency is CV, concordance, fold-change ratios, and missing-value counts. **It therefore says nothing, in either direction, about whether reference-normalized values may be fed into a hypothesis test without further batch modelling.**
- **No residual-batch-effect diagnostic after normalization** — a single post-normalization number (median CV 2.96%) is given; no PCA/clustering-by-batch check, no per-protein residual assessment, no test that batch structure is gone.
- **No comparison against alternative batch-correction methods.** ComBat, RUV, median-centering, IRS, etc. are not evaluated. Two alternatives are cited only in passing ("protein expression inference (30)," "a standard reference line (31)") without benchmarking.
- **No treatment of missing-value imputation** — missingness is quantified but no imputation strategy is proposed or tested.
- **No guidance on how many batches the reference-channel approach remains valid for**, nor on reference-sample drift/degradation across a long acquisition series.
- **No contingency for a lost/failed reference channel.**
- **No generalization claim beyond TMT/isobaric labeling.** Every claim is framed for TMT (and, in the intro, isobaric tagging generally, naming iTRAQ). The paper does **not** claim its findings transfer to label-free, DIA, SILAC, or to non-proteomic assays. The nearest adjacent statements are internal to isobaric MS: MS2 vs MS3 quantitation, and coisolation-free tags limited to 6-plex.
- **No statistical inference about the reported quantities themselves** — no CIs on the CVs, medians, or fold-changes.
- **No power/sample-size guidance** beyond the generic intro remark that ≥3 replicates per condition are needed.
- **Reference-sample composition** — it says "at least one *relevant*" / "suitable" reference sample but never defines a procedure for choosing or constructing one (e.g. pooled aliquot of all samples vs. a separate cell line). Here it happened to be a distinct iPSC line ("bubh_3"), not a pool of the study samples.

## 11. Open questions / ambiguities the source leaves unresolved

- **Internal arithmetic inconsistencies (recorded, not reconciled):** "240 iPSC replicates, 217 biological replicates and 24 technical replicates" (217+24 = 241); and "230 iPSC replicates, which included 208 biological replicates and 23 technical replicates" (208+23 = 231).
- **Secondary-RII magnitude is given three different ways:** Results (Fig. 5C) says **1.05-fold** increase for high-intensity peptides; the Discussion says **"only a median 1.02-fold increase"**; the design section says **"a median increase of 2.2% in intensity."** These may refer to different peptide strata (high-intensity vs. all), but the source does not reconcile them.
- **Missing-value figures differ between Results and Discussion:** Results gives median protein missing 0.19% (1 batch) → 6.35% (2 batches) and peptide >23% (2 batches); the Discussion phrases the same results as protein "<0.5% to >6%" and peptide "<2% to ∼24%."
- **Channel nomenclature is not internally consistent:** Table I lists 10-plex tags as `TMT10-126` and `TMT10-131`, while the methods and recommendations use `126C`, `131N`, `131C` (131C/131N being an 11-plex distinction). The recommendation quote [V1] says "channel 126C, or 127N" and warns against "131N, or 131C."
- **"Reporter mass tolerance set to 0.03 ppm"** — recorded verbatim; the source states ppm (a value that would be unusually tight for reporter ions), and does not clarify.
- Whether the **2.96% post-normalization CV** would hold for a reference sample that is a *pool of the study samples* rather than a separate cell line is not tested.
- The residual gap after normalization (**2.96%** vs. within-batch **1.72%**) is not discussed or characterized — the source only says the results are "closer to" within-batch metrics.

## 12. Guidance answers

### Q1. Does the source recommend a common reference / internal-standard sample in every batch? Which channel, and why?

**Yes — explicitly, and with a channel rule.** Verbatim [V1]:

> "For all studies based on more than a single multi-plex TMT batch, we advocate at least one relevant internal reference sample should be included in each batch and assigned to either channel 126C, or 127N. These channels avoid “primary RII,” the main cause of isotopic impurities, and are only affected by “secondary RII,” which only causes a median increase of 2.2% in intensity. In contrast, placing the reference line at channel 131N, or 131C increases the impact of reporter ion interference by exposing them to “primary RII.”"

**Why those channels:** 126C and 127N have **no +1 Da (primary RII) donor** — see Table I, where TMT10-126 and TMT10-127N have "–" in the secondary-RII column and are not themselves +1 Da targets of a lower channel. The rationale is entirely interference-based, not statistical.

### Q2. **What word does the source actually use for this sample?** (the terminology question)

**The source NEVER uses the word "bridge."** Verified by exhaustive search of the full-text XML: the only two occurrences of the string "bridge" in the entire article are **"Xbridge"** (the Waters *Xbridge BEH130 C18* chromatography column in the methods) and **"Faulconbridge"** (an author surname in the reference list). Neither refers to the shared sample.

**The terms the source actually uses, verbatim:**

| Term | Where |
|---|---|
| **"common reference line"** | Experimental Design: "Each batch consisted of 1 common reference line (technical replicates of iPSC cell line “bubh_3”)" |
| **"reference line"** | throughout (14 occurrences) — "the reference line CV," "placing the reference line at channel 131N" |
| **"internal reference standard"** | Results: "we used the technical replicates of a reference iPSC line as an internal reference standard to control for variation between batches" |
| **"internal reference sample"** | The recommendation [V1] — "at least one relevant internal reference sample should be included in each batch" |
| **"reference channel"** | Methods: "uCN(b,126C,p) is the protein copy number derived from reporter channel 126C (the reference channel)" |
| **"common control sample"** | Discussion [V3] — "via a common control sample within each TMT batch" |
| **"suitable control (reference line)"** | Discussion [V3] |
| **"a standard reference line"** | Results, describing *prior work* (citation 31) |
| **"control line" / "control iPSC line"** | Results — "technical replicates of a control iPSC line (bubh_3)" |

Note "spike-in" *is* used in this paper — but for a **different** object: the **Y-chromosome peptides** are called "endogenous 'spike-in' peptides" and "male-specific" spike-in references. Do not conflate.

**Finding, as the guidance anticipated: the *design* is citable to this paper; the *term* "bridge" is not.** "Bridge channel" is community shorthand that does not appear here. The citable phrasing for the design rule is **"internal reference sample"** (recommendation) / **"common reference line"** (their implementation) / **"reference channel"** (126C).

### Q3. Does the source say anything about feeding reference-normalized values into a hypothesis test **without further batch modelling**? (the anti-subtraction question)

**No. This is an explicit silence, and it is total.**

Exhaustive search of the full text returns **zero** occurrences of: `t-test`, `p-value`, `p value`, `hypothesis`, `differential`, `limma`, `ComBat`, `linear model`, `regression`, `downstream`. The word "significance" appears twice, neither relevant: once in the introduction as generic background ("To evaluate statistically the significance of the resulting data, a minimum of 3 replicates for each sample/condition is also necessary"), and once as the ordinary adjective ("mixing significantly different populations").

**The paper never runs, recommends, or discusses a hypothesis test.** Its evaluation currency is entirely descriptive: CV, Lin's concordance, fold-change ratios, missing-value percentages. It stops at "normalization gives median CV 2.96%, making the results closer to the metrics obtained for each within-batch analysis" [V4] and does not follow the normalized values into any inferential procedure.

**Therefore:** the source supports **neither** the claim that reference-normalized values are safe to test directly, **nor** the claim that further batch modelling is required. It is silent. Any statement in either direction is *not* attributable to Brenes et al. 2019. (What the paper *does* supply, which is adjacent but not the same: the residual after normalization is non-zero — 2.96% vs. 1.72% within-batch — and it never checks whether batch structure remains in the normalized data.)

### Q4. Any recommendation about how biological conditions should be laid out across a batch's channels?

**Yes** — see [V2] and §6 "The experimental-design recommendation":
- **Alternate conditions across channels; do not group them.** A 5–5 grouped layout (2 conditions × 5 reps in a 10-plex) puts multiple channels under cross-population primary+secondary RII; alternating eliminates it.
- For **3 conditions × 3 reps**, "we recommend using TMT 11-plex as all 10-plex TMT setups involve cross population/condition reporter ion interference." The RII-free 11-plex layout **requires two empty channels at 129C and 130N**. With a reference channel at 126C plus one empty channel at 130N, "only two channels suffer primary and secondary reporter ion interference."
- Blanket aim: "All the suggested setups aim to reduce cross condition/population reporter ion interference, thereby avoiding decreases in quantification accuracy by isotopic impurities."

### Q5. The experiment: batches, plex, samples, instrument

**24 batches × TMT 10-plex**; 240 iPSC replicates from **163 donors** (142 female-derived, 98 male-derived); each batch = **1 common reference line (bubh_3 technical replicate) + 9 different iPSC lines**; **Orbitrap Fusion Tribrid** (all batches, same instrument), MS3/SPS reporter quantification; MaxQuant v1.6.3.3; 9,640 proteins / 178,491 peptides after filtering; PRIDE **PXD010557**. Batch **PT6388** excluded from most analyses (failed QC).

### Q6. Missing values — every number, with condition

See §6. Summary: **within one batch** — 92% of batches <1% missing (protein), 92% <5% missing (peptide); outlier PT6388 = >1.5% protein / 9% peptide. **Integrated** — protein median 0.19% (1 batch) → **6.35% (2 batches)** → **~10% (5 batches)**; peptide **>23% (2 batches)** → **~40% (5 batches)**. Discussion phrasing: protein "<0.5% → >6%", peptide "<2% → ~24%". Also: **only 6.81% (12,140) of peptides detected in all channels**; ~50% of peptides in <40% of channels; 26% of the top-abundance quartile in <50% of channels.

### Q7. Precision — the three CVs

**Within-batch median protein CV = 1.72** · **across-batch reference-line (bubh_3, 126C) median CV = 11.03** (= 6.4× the within-batch value) · **after reference-channel normalization = 2.96%**. Supporting: Lin's concordance 98% within batch → 81% across batches for the same technical replicate; >80% of reference-replicate proteins would be within-batch outliers (CV > 7.5).

### Q8. The false-positive demonstration — internal ground truth and the fraction wrong

**Ground truth:** Y-chromosome-encoded peptides in **female-donor** channels. Y-chromosome protein-coding genes cannot be expressed by female-derived lines, so **any** Y-peptide signal in a female channel is necessarily a false positive — an internal, zero-cost spike-in requiring no external standard. Reimplementation recipe: 11 Y-specific genes (**CDY1, CDY2A, DDX3Y, EIF1AY, KDM5D, NLGN4Y, PCDH11Y, RPS4Y1, TBL1Y, USP9Y, UTY**) → 69 uniquely-mapping peptides → drop female-only batches (PT6384, PT7422; their Y hits are treated as misannotations) and the QC-failed batch (PT6388) → **65 peptides across 21 batches**; then, per batch, compute the fraction of the batch's detected Y-peptides that also carry signal (reporter intensity > 0) in each female channel.

**Fraction wrong:** **median 89%** of the Y-peptides quantified in a batch were also quantified in female channels; **every** female channel in **every** one of the 21 batches showed **>40%**; worst case **97.5%** (batch PT6380, which had only 2 male channels among 10).

### Q9. Reporter-ion interference — definition, primary vs. secondary, quantified effect of each

**RII** = "cross-label isotopic impurity," from "manufacture level impurities and experimental error." **CII** (coisolation) = "multiple labeled peptides being selected within the isolation window." **Primary RII** = contamination into the **+1 Da** channel of the same isotope; **Secondary RII** = into the **−1 Da** channel; **Double RII** = both. Mapping in Table I (§5).

Quantified (female RII channels vs. female no-RII channels): **primary 1.57× (high-intensity) / 1.10× (low)**; **secondary 1.05× (high) / ~no change (low)**; **double 1.7× (high) / small median reduction (low)**. Against male channels: male:female-no-RII = **9.43×** overall (**12.8×** high-intensity, **2.14×** low-intensity → low-intensity peptides are the ones eaten by *coisolation*); male:double-RII = **4.9×**; male:secondary-RII = **8.94×**. Conclusion: **primary RII is the main isotopic-impurity path**; low-intensity peptides are dominated by coisolation, high-intensity by RII.

### Q10. Does the source claim the reference-channel approach **fixes** or only **reduces** the problem? (the hedge)

**Only reduces — and the paper's own wording is careful.** The strongest claim is [V3] "the batch effects can be normalized **effectively**," but the quantitative statement is hedged [V4]:

> "Using this normalization method provided a median CV of 2.96% across all cell lines and technical replicates, **making the results closer to the metrics obtained for each within-batch analysis.**"

**"Closer to," not "equal to."** The residual is visible in the paper's own numbers: 2.96% post-normalization vs. **1.72%** within-batch — still ~1.7× the within-batch median (though far below the un-normalized 11.03). The Discussion likewise frames the reference sample as allowing "objective data normalization **to minimize** the batch effects" [V3]. Separately, the coisolation-driven false positives are **not** claimed to be fixed by the reference channel at all — that problem is addressed only by channel layout and better instruments, and even there: "the issue has been **reduced, though not completely eliminated**, with newer generation Orbitrap MS instruments."

### Q11. Stated failure mode of the reference-channel design itself?

**Partially stated — one sentence, and it names two failure conditions but does not quantify or test them** [V3]:

> "The challenge lies in identifying a suitable control that is **truly representative for most proteins being compared** within the experiment and in **creating a control that is highly reproducible across all the TMT batches**."

So: (a) **reference not representative** — explicitly named; (b) **reference not reproducible across batches** — explicitly named. **Silences:** the source says nothing about **a lost or failed reference channel**, nothing about **reference-sample drift or degradation over a long series of batches**, nothing about **how many batches the approach scales to**, and nothing about **how to construct** the reference (pool of study samples vs. separate line — they used a separate iPSC line, bubh_3). It also never quantifies the damage when representativeness fails.

### Q12. Does anything here generalize beyond TMT / isobaric labeling?

**The source claims no such generalization.** Every framing is TMT-specific ("TMT is a valuable methodology for DDA analysis"; "very large-scale TMT-based proteomics analyses"), with isobaric tagging generally (TMT + iTRAQ) named only as background in the introduction. The mechanisms it quantifies — **reporter-ion isotopic impurity** and **coisolation within the MS1 isolation window** — are specific to isobaric reporter-ion multiplexing.

The only adjacent-method claims made are *within* isobaric MS: **MS2-based** TMT quantitation might give more identifications but with "no guarantee this will detect peptides/proteins more reproducibly across batches" and "will intensify the disruptive effect of the coisolation interference"; and **coisolation-free isobaric tags** exist but are "currently limited to a 6-plex."

The *missing-value* inflation result is attributed to **stochastic sampling inherent in DDA**, which the source treats as a DDA property rather than a TMT property — but it does **not** extend the claim to non-TMT DDA workflows in any explicit sentence. Anything beyond this (e.g. transfer to RNA-seq batches, label-free, DIA) would be extrapolation the source does not make.
