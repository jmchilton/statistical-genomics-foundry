---
title: "Tackling the widespread and critical impact of batch effects in high-throughput data"
type: paper
source_id: leek-2010
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC3880143/
doi: 10.1038/nrg2825
access_date: "2026-06-27"
license: "All rights reserved"
attribution: "Leek JT, Scharpf RB, Corrada Bravo H, Simcha D, Langmead B, Johnson WE, Geman D, Baggerly K, Irizarry RA. Tackling the widespread and critical impact of batch effects in high-throughput data. Nature Reviews Genetics 11(10):733–739, 2010. https://doi.org/10.1038/nrg2825 (© Macmillan Publishers Limited; open NIH author manuscript PMC3880143). Summarized in own words — no source text reproduced."
derived: own-words-summary
---

# Leek et al. 2010 — Tackling the widespread and critical impact of batch effects in high-throughput data
> Faithful summary generated in a clean context, 2026-06-27. Source-only; project framing lives elsewhere. License restrictive (all rights reserved) — own-words throughout, no verbatim prose.

## 1. Citation
- Authors: Jeffrey T. Leek, Robert B. Scharpf, Héctor Corrada Bravo, David Simcha, Benjamin Langmead, W. Evan Johnson, Donald Geman, Keith Baggerly, Rafael A. Irizarry.
- Year: 2010.
- Title: Tackling the widespread and critical impact of batch effects in high-throughput data.
- Venue: Nature Reviews Genetics, vol. 11, no. 10, pp. 733–739.
- DOI: 10.1038/nrg2825.
- Open-access URL (NIH author manuscript): https://pmc.ncbi.nlm.nih.gov/articles/PMC3880143/
- Paywall boundary: the typeset publisher version is paywalled; only the NIH author manuscript (PMC) is open. Copyright on the manuscript is "© 2010 Macmillan Publishers Limited. All rights reserved." — all-rights-reserved, not a Creative-Commons/open license. No verbatim source prose is reproduced below.

## 2. Access note
Read the full NIH author manuscript HTML on PMC (main text, Figure/Table captions, Table 1 numeric cells, and the Glossary box) via WebFetch and a raw-text curl pull. The body text, the bladder/sTCC example, the detection recipe, the adjustment-method section, the Table 1 values, and the closing recommendation were all accessible. I did not retrieve the supplementary PDF beyond noting its existence; figure images themselves (pixel content) were not inspected, only their captions.

## 3. Thesis
Batch effects — non-biological, technical sources of variation tied to how/when samples were processed — are pervasive in high-throughput data, are not removed by normalization, and must be detected and statistically adjusted as a standard analysis step or they will produce false and irreproducible biological conclusions.

## 4. Problem & context
High-throughput platforms (microarrays, sequencing, mass spectrometry, methylation/copy-number arrays) measure thousands to millions of features per sample. Beyond the biological signal of interest, measurements absorb technical variation linked to processing group, laboratory, reagent lot, and especially processing date/time. The authors note documented published cases where biological variables were extremely correlated with technical variables, casting serious doubt on the biological conclusions. The danger is twofold: in benign cases batch effects merely add variance and reduce power; in the harmful case they are confounded with the outcome and masquerade as real biology. Normalization is already standard but addresses only global distributional differences, leaving feature-specific batch effects intact.

## 5. Method / approach
**Detection recipe (exploratory step).** Use principal components analysis (PCA) and visualization. Specifically:
- Hierarchical clustering of samples, with each sample labelled by both its biological group and its batch surrogate (processing group/date), to see whether the dominant split tracks biology or batch.
- Multidimensional scaling (MDS) as an alternative visualization.
- Compute/compare principal components against known batch surrogates (processing group or time). Strong batch effects are indicated when: samples cluster by processing group/time; a large number of features are strongly associated with processing group/time; or the principal components correlate with batch group/time. If the PCs do not correlate with any known surrogate, an unmeasured/unrecorded source of batch effect may be present.

The authors frame this as a two/three-step statistical workflow (their Fig. 4): (1) exploratory analysis to identify and quantify batch effects and other artefacts; (2) adjust downstream analyses using known or estimated surrogates; (3) run diagnostic analyses afterward. Code and data for the detection procedure are provided with the article.

**Adjustment menu and WHEN each applies.** Most downstream methods rest on linear models, so adjustment generally means adding batch terms to the model relating features to outcome.
- **Known/recorded batch → include as covariates.** The simplest approach: put processing group and processing time directly into the linear model for the feature–outcome association.
- **ComBat (empirical Bayes).** Named as an approach for batch adjustment in microarray data (cited as the Johnson/Li/Rabinovic empirical Bayes method, ref. 8); the authors point to the ComBat website for discussion.
- **Unknown/unrecorded sources → Surrogate Variable Analysis (SVA).** When the true sources of batch effects are unknown, or processing group/date does not adequately capture the technical variation, SVA is more appropriate: it estimates the batch sources directly from the high-throughput data, and the estimated surrogate variables are then put into the same linear model the way a known processing group/year would be. Its advantage is that the relevant batch variables need not be known in advance.
- **Critical condition on all of these:** they work only when batch effects are NOT highly confounded/correlated with the biological variable of interest. When biology and processing time are highly correlated, you cannot tell whether observed group differences are biological or technical — adjustment cannot rescue it.

## 6. Key claims / findings
- Across 9 datasets spanning several technologies, the percentage of features showing a statistically significant association with the batch surrogate (FDR < 5%, Benjamini–Hochberg) ranged from **32.1% to 99.5%** (these are dataset-specific, approximate-in-aggregate figures). By technology in Table 1: gene expression (Affymetrix) up to 73.7%; another gene expression set 62.8% (Agilent); mass spectrometry 51.7%; copy number variation (Affymetrix) 83.8% and 99.5%; DNA methylation (Agilent) 78.6%; DNA sequencing (Solexa) 32.1%.
- The level of confounding between the batch surrogate and the biological outcome (a generalized R² for categorical data, 0% = no confounding, 100% = completely confounded) ranged from **12.2% to 100%** across datasets that reported it (e.g., mass spectrometry 100%; one gene-expression set 77.6%; copy-number sets 29.2% and 12.2%; sequencing 24.2%).
- In gene-expression studies, the largest source of differential expression is almost always across batches, not across biological groups.
- 1000 Genomes second-generation sequencing example: 32% of features were associated with processing date, but up to 73% were associated with the second principal component, while only 17% were associated with the biological outcome — so the PCs cannot be explained by biology.
- Normalization reduces global cross-array differences but does not remove batch effects; it can even worsen technical artefacts because batch effects violate normalization assumptions.
- Population-difference study (ref. 2): the original claim that 1,097 of 4,197 genes differ between European- and Asian-descent populations was challenged because population and processing date were highly correlated; more differences appeared when comparing across two processing dates within a fixed population.
- Ovarian-cancer serum-proteomics study (ref. 3): outcome (neoplastic disease in the ovary) was confounded with run date; concerns about validity were raised, and the FDA blocked the resulting home-brew diagnostic assay.

## 7. Load-bearing statements (own-words paraphrase — no verbatim quotes)
1. **Definition (Introduction):** Batch effects are subsets of measurements that behave qualitatively differently across conditions and are unrelated to the study's biological/scientific variables of interest.
2. **Normalization claim (Introduction):** Normalization adjusts global per-sample properties so samples can be compared, and is now standard for gene-expression analysis — but it does not remove batch effects, which hit specific subsets of genes and act differently on different genes; in some cases normalization can even amplify the technical artefacts.
3. **Detection rule (exploratory-analysis section):** Strong batch effects are likely present when samples cluster by processing group/time, when many features are strongly associated with processing group/time, or when principal components correlate with batch group/time.
4. **SVA guidance (adjustment section):** When the true batch sources are unknown or are not adequately captured by processing group/date, use SVA, which estimates the batch sources straight from the data so downstream significance tests can be corrected.
5. **Confounding-limit caveat (adjustment section):** Adjustment methods are effective only when batch effects are not highly confounded/correlated with the biological variables of interest; if biology and processing time are highly correlated, biology and artefact cannot be separated.
6. **Standard-step recommendation (concluding section):** Batch-effect adjustment should be incorporated as a standard step in high-throughput data analysis, alongside normalization, exploratory analysis, and significance calculation.

## 8. Stated scope, assumptions, limitations
- The authors note that most downstream methods they discuss assume linear models (explicitly or implicitly); they acknowledge non-linear-model solutions exist (e.g., for copy-number-variation arrays, ref. 13) but center the linear-model framing.
- They state that processing time is often only a useful surrogate, not the full explanation of technical variability — known surrogates may be incomplete.
- They acknowledge that design-aware/correcting normalization methods exist but are still not widely used.
- They call for additional bench/statistical work and targeted experiments to isolate the true per-technology sources of batch effects and reduce reliance on surrogates.

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Confounded design = invalid:** When all cases are processed on one day and all controls on another (outcome aliased with processing date), results due to batch are impossible to distinguish from real biology, leading to incorrect conclusions. This is the worst case; statistical adjustment cannot recover it.
- **Bladder cancer / sTCC anchor case:** In a published superficial transitional cell carcinoma study, the presence/absence of surrounding carcinoma in situ (CIS) was strongly confounded with processing date. Hierarchical clustering split the tumor samples by CIS status, but that split coincided with date. Crucially, the *control/normal* samples — which have no CIS biology to differ on — still clustered perfectly by processing date, demonstrating the split was driven by batch, not biology. (The data were properly normalized; the batch effect survived normalization.) **Detector/symptom: control or biologically-homogeneous samples that cluster by processing date.**
- **Normalization does not fix it:** Global differences shrink after normalization, but feature-specific batch effects on subsets of genes remain (and can be exacerbated). Treating "we normalized" as sufficient is a failure mode.
- **PCs explained by batch, not biology:** When top principal components correlate with date/processing group rather than the biological outcome (e.g., 1000 Genomes: PC2 ~73% feature-associated vs. only 17% for biology), the dominant structure is technical.
- **Detection triggers (symptoms):** samples clustering by processing group/time; many features associated with group/time; PCs correlating with batch surrogates. Absence of PC–surrogate correlation may itself signal an unmeasured batch source.

## 10. What the source does NOT address (confident silences)
- It does not give a step-by-step algorithmic specification or parameter settings for SVA or ComBat (it points to external sites/refs).
- It does not prescribe a quantitative threshold of confounding (R²) above which a study is declared unsalvageable — it states the qualitative principle only.
- It does not cover single-cell data, modern RNA-seq normalization pipelines, or non-genomic domains (it predates much of that).
- It does not provide experimental-design prescriptions in depth (e.g., randomization/blocking schemes) beyond noting confounded designs are the hazard.

## 11. Open questions / ambiguities
- The "32.1–99.5%" susceptible-feature span and "12.2–100%" confounding span are aggregated from heterogeneous datasets/technologies and FDR cutoffs (FDR < 5%); treat the overall ranges as approximate descriptors, not a single estimand.
- Several Table 1 cells are NA (confounding not reported for datasets 6–8), so the confounding range draws on the subset that reported it.
- The boundary between "adjustable" and "unadjustable" confounding is stated qualitatively ("not highly confounded"); the source gives no exact operational cutoff.

## 12. Guidance answers
- **Detection recipe:** Covered — hierarchical clustering (samples labelled by biology AND batch surrogate), MDS, and correlating principal components with batch surrogates (processing group/date). Strong batch effect if samples cluster by group/time, many features associate with group/time, or PCs correlate with batch group/time.
- **Normalization does not remove batch effects:** Covered — normalization fixes global per-sample properties but leaves (and may worsen) feature-specific batch effects acting differently on different genes.
- **Adjustment menu and WHEN:** Covered — include known processing group/time as covariates in the linear model (simplest, for recorded batch); ComBat named (empirical Bayes); SVA when the batch sources are unknown or not adequately modeled by group/date, because SVA estimates the sources directly from the data. All effective only when batch is not highly confounded with biology.
- **SVA-when-sources-unknown guidance:** Captured explicitly — use SVA when true batch sources are unknown/unrecorded; it estimates surrogate variables from the data and feeds them into the same linear model as a known surrogate would be.
- **Unfixable-confounding example (bladder/sTCC):** Captured — CIS presence/absence confounded with processing date; even control samples clustered perfectly by date, showing the apparent biological split was batch-driven and survived normalization (an aliased/unadjustable case).
- **Ranges (approximate):** Susceptible features 32.1–99.5% across 9 datasets; surrogate–outcome confounding 12.2–100% (generalized R², among datasets reporting it). Noted as approximate aggregates.
- **Definition of batch effects:** Captured — subsets of measurements that behave qualitatively differently across conditions and are unrelated to the study's biological variables.
- **Standard-step recommendation:** Captured — adjust for batch effects as a standard analysis step alongside normalization, exploratory analysis, and significance calculation.

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** established-good / framing. The authoritative "batch effects are pervasive, normalization doesn't fix them, diagnose-and-adjust as a standard step" overview, plus the diagnostic recipe and the adjustment menu (covariate / **SVA** for unknown sources / **ComBat**).
- **Grounds:** [[assess-batch-effects-and-confounding]] (detection + the SVA/ComBat menu); [[review-experimental-design]] (balance batches across groups; the confounded-with-date = unfixable case).
- **Co-cite with [[nygaard-2016]]** for the unfixable-aliasing case (the bladder/CIS example is the qualitative anchor; the operational detector is the DESeq2 full-rank section in [[deseq2]]).
- ComBat/SVA are named but not specified here — dedicated source notes are needed (issues #3–#6).
