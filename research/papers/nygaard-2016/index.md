---
title: "Methods that remove batch effects while retaining group differences may lead to exaggerated confidence in downstream analyses"
type: paper
source_id: nygaard-2016
source_url: https://academic.oup.com/biostatistics/article/17/1/29/1744261
doi: 10.1093/biostatistics/kxv027
access_date: "2026-06-27"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Nygaard V, Rødland EA, Hovig E. Methods that remove batch effects while retaining group differences may lead to exaggerated confidence in downstream analyses. Biostatistics 17(1):29–39, 2016. https://doi.org/10.1093/biostatistics/kxv027"
derived: faithful-summary-with-quotes
---

# Nygaard, Rødland & Hovig (2016) — Methods that remove batch effects while retaining group differences may lead to exaggerated confidence in downstream analyses
> Faithful summary generated in a clean context, 2026-06-27. Source-only; project framing lives elsewhere.

## 1. Citation
- Authors: Vegard Nygaard, Einar Andreas Rødland, Eivind Hovig.
- Year: 2016 (published online 13 August 2015).
- Title: "Methods that remove batch effects while retaining group differences may lead to exaggerated confidence in downstream analyses."
- Venue: *Biostatistics*, Volume 17, Issue 1, January 2016, Pages 29–39.
- DOI: 10.1093/biostatistics/kxv027.
- Open-access URL: https://academic.oup.com/biostatistics/article/17/1/29/1744261 (PMC mirror: PMC4679072; PMID 26272994).

## 2. Access note
The OUP HTML page (`academic.oup.com/...`) returned HTTP 403 to direct `curl`. I obtained the complete full text via the NCBI/PMC BioC JSON API for PMC4679072 (`pmcoa.cgi/BioC_json/PMC4679072/unicode`), which is the same open-access deposit. The article is open access (CC BY 4.0).

**Extraction boundary/caveat:** The BioC text extraction reproduces all running prose verbatim but **strips inline mathematical notation** — variable symbols (δ̂, ν, ν₀, the n-ratios), equation numbers, and the displayed equations render as blank gaps in the captured text. Where this matters (the degrees-of-freedom inequalities and the balance-ratio condition), I reconstruct the symbol identities from (a) the surrounding verbatim prose, (b) the guidance's own statement of them, and (c) a secondary rendered-page read; I flag any point where the exact symbol assignment could not be confirmed from captured bytes. I did NOT verify the Supplementary Material (derivations of the general-case constants live there and were not fetched).

## 3. Thesis
When study groups are distributed across batches in an unbalanced manner, removing batch effects while preserving group differences (e.g. two-way ANOVA / ComBat with group as covariate) and then analyzing the adjusted data as if it were "batch effect free" systematically induces incorrect group differences and exaggerated confidence, leading to false discoveries.

## 4. Problem & context
- Batch/center effects are systematic measurement artifacts (reagents, chips, equipment, multi-source data) that add variance and, in unbalanced designs, act as confounders inducing false group differences (Fig 1(b)).
- A popular two-step workflow has emerged: first estimate and remove batch effects to create a "batch effect free" data set, then run downstream statistics on the adjusted data "without further consideration of batch effects." This compartmentalization is convenient (e.g. data-prep and analysis done by different personnel) but, the paper argues, unreliable under unbalanced designs.
- Tools that can preserve group differences during adjustment include Partek Genomics Suite, and the R packages limma (`removeBatchEffect`), ber, and ComBat (in the sva package). limma and Partek warn against use prior to linear modeling; ComBat's covariate use "has been more heavily promoted" — the route by which the authors themselves hit the problem. The sva package "has been updated to address these concerns."
- The authors found the community "largely unaware": a brief survey of articles citing ComBat (466 in Web of Science) found sparse method descriptions and none addressing the covariate problem.

## 5. Method / approach
- **Model:** a two-way ANOVA model (eq. 2.1) for data with batch effects, with batches, study groups, and error terms for samples within batch and group. ComBat additionally uses empirical Bayes estimates across genes to stabilize/moderate estimates (critical for small batches); for large batches or substantial batch effects it should resemble plain two-way ANOVA.
- **Zero-centering (§2.2.1):** subtract each batch mean. Balanced design → removes most batch variance, retains between-group variance, increases power. Unbalanced design → batch means partly capture group differences, so correction reduces group differences and power; with multiple groups in very uneven designs it can even induce spurious group differences (Fig 1(c)).
- **Two-way ANOVA preserving group (§2.2.2) — the mechanism:** estimate batch and group effects jointly, subtract only the estimated batch effects. In a **balanced** design, group and batch estimates are independent and this equals per-batch zero-centering. In a **heavily unbalanced** design, group and batch estimation are interdependent; applying the **point estimates** of group differences across the whole data set while **ignoring the estimation errors** is the failure. The batch-effect estimation error affects all values within the same batch identically, so removing within-batch spurious dependence "may also induce new dependencies"; these errors "influence group effects in proportion to how well the group is represented in each batch." Downstream analyses that ignore batch then underestimate the estimation errors and exaggerate confidence (Fig 1(d) deflated CIs vs Fig 1(e) appropriate CIs from lsmeans).
- **Two-group quantification (§3.2):** estimate group difference within each batch, combine to an overall estimate (identical to two-way ANOVA). The point estimate is unchanged by adjustment. But analyzing the adjusted data ignoring batch computes the variance as if from a simple group comparison, giving a degrees-of-freedom inequality (see §6). The ratio of the two degrees-of-freedom quantities measures how much the random variability is underestimated.
- **General case (§3.3):** with one-way ANOVA on batch-adjusted data, the F-statistic no longer follows the assumed F distribution; it follows a scaled F with an inflation factor, an effective numerator d.f., and reduced denominator d.f., all **derived in the Supplementary Material** and depending **on the batch–group design, not on the sample size**.
- **Empirical checks:** a random-number "sanity check" adapted from the sva user guide (real data replaced with N(0,1), design retained, ComBat + F-test) produces a non-uniform p-value distribution and an inflated F (QQ plot), with inflation set by design imbalance not sample size (12, 120, 1200 samples; 1:5 and 5:1 splits in two batches; 20 000 genes, batch effect on 10%). Two real-data reanalyses (§6).

## 6. Key claims / findings
- **Balance ⇒ no harm.** In a balanced group–batch design, group differences are not affected by batch effects and the two-step approach gives reliable results; the estimation error "has the same effect for all groups, and thus does not influence group comparisons."
- **Unbalanced ⇒ induced differences + over-confidence.** In an unbalanced design the estimation error "will induce increased differences between groups which, when ignored in downstream analyses, may lead to over-confidence in estimated group differences."
- **Inflation is a fixed factor set by imbalance, not sample size.** Group comparison via one-way ANOVA on batch-adjusted data yields F-statistics "inflated by a fixed factor which depends on the unevenness of the design, rather than the size of the sample or batches." Increasing sample size does not fix it (Fig 2(c), Fig 3(c)).
- **Degrees-of-freedom inequality (two-group, §3.2):** by Jensen's inequality, ν₀ ≥ ν, **with equality if and only if the ratios n_iA : n_iB = n_A : n_B for all batches i** (i.e. each batch reproduces the overall group ratio). One quantity is the effective sample size of the unbalanced design, the other the nominal sample size when batches are ignored; their ratio indexes the underestimation of random variability / over-confidence. [Exact symbol-to-role assignment was rendered as inline math and not captured in the text bytes; the inequality direction ν₀ ≥ ν and the n-ratio balance condition are stated explicitly in the prose and in the guidance.]
- **General case (§3.3):** scale factor and reduced effective d.f. satisfy their own inequalities "with equalities if and only if the groups are evenly represented in all batches," consistently biasing F upward and inflating its variance even as sample size grows.
- **FDR amplifies it.** Running thousands of genes plus FDR is "particularly sensitive to inflated false positive rates"; the effect is "more pronounced for more extreme values."
- **ComBat's empirical Bayes only partly dampens it.** EB shrinkage "may dampen the batch adjustments and thereby reduce the problem slightly relative to a more direct two-way ANOVA approach"; if added batch differences are not constant across genes, the problem persists as sample size grows.
- **Reanalysis — Experiment 1** (Towfic et al., glatiramer acetate Copaxone vs. generic Glatimer; GEO GSE40566): treatments were Copaxone (34 samples), Glatimer (11 samples), 14 other treatments (60 samples); batch = Illumina WG-6_V2 chip (6 samples/chip, 17 chips), "highly unbalanced, with several batches having only one of the main treatments of interest." ComBat (group as covariate) → **2011 differentially expressed genes at 5% FDR**; blocking for batch in limma instead → **11 differentially expressed genes** (at the stated threshold; the exact threshold symbol was not captured but is the same significance criterion). [A preprocessing caveat: the original authors' analysis used a different preprocessing (GSE61901) with two technical replicates per sample, which strongly influences results regardless of batch adjustment.]
- **Reanalysis — Experiment 2** (ComBat original article "Data set 2", TAL1 inhibition vs. control): 30 samples in 3 batches, treatment/control = batch 1: 6/2, batch 2: 3/4, batch 3: 9/6 (milder imbalance). ComBat + limma → **1003 probes**; no ComBat but blocking for batch in limma → **377 probes**. Here the alternative analysis does "not indicate a huge difference," though ComBat p-values "may still be somewhat deflated."

## 7. Verbatim quotes for load-bearing claims
1. **Title (verbatim):** "Methods that remove batch effects while retaining group differences may lead to exaggerated confidence in downstream analyses."
2. **Mechanism, §2.2.2 (verbatim):** "The estimation error affects all values within the same batch in the same manner. Thus, while the aim is to remove spurious dependencies within batches, it may also induce new dependencies. The batch effect estimation errors will influence group effects in proportion to how well the group is represented in each batch" (§2.2.2 "Batch adjustment using two-way ANOVA to estimate batch effects"). [δ̂-type symbols in the original render as blanks here.]
3. **Balanced vs unbalanced, §2.2.2 (verbatim):** "In a balanced group–batch design, the estimation error has the same effect for all groups, and thus does not influence group comparisons. In an unbalanced design, however, it will induce increased differences between groups which, when ignored in downstream analyses, may lead to over-confidence in estimated group differences."
4. **Balance condition, §3.2 (verbatim, math stripped):** "It follows from Jensen's inequality that , with equality if and only if the ratios for all batches ." (The blanks are ν₀ ≥ ν and n_iA : n_iB = n_A : n_B for all batches i.)
5. **The recommendation / caution (verbatim, "Practical advice"):** "For an investigator facing an unbalanced data set with batch effects, our primary advice would be to account for batch in the statistical analysis. If this is not possible, batch adjustment using outcome as a covariate should only be performed with great caution, and the batch-adjusted data should not be trusted to be 'batch effect free', even when a diagnostic tool might claim so."

## 8. Stated scope, assumptions, limitations
- **Domain:** entirely microarray gene expression — "preparing microarray gene expression data from multiple cohorts, array platforms, or batches." Both reanalyses are microarray (Illumina WG-6_V2; the ComBat paper's microarray "Data set 2"). The paper makes **no claim and no denial about RNA-seq / count data** (see §10).
- **Severity scales with imbalance:** "if it is only moderately unbalanced, it need not be a concern, whereas in heavily unbalanced cases it may have a huge influence."
- **Modeling assumptions:** built on the two-way ANOVA model (2.1); the general F-distribution constants are derived in Supplementary Material and assume that batch–group design (not sample size) governs the inflation.
- **A separate, smaller d.f. concern** (the one prior tool warnings flagged) — batch adjustment reduces degrees of freedom, a problem mainly "for small data sets or where there are many small batches" — is explicitly distinguished from the paper's main concern (systematic F inflation independent of sample size).
- **Down-sampling, formula-based correction, and comparing with/without covariates** are offered as partial diagnostics/remedies, but "none of these solutions are ideal."

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Triggering condition:** an **unbalanced group–batch design** ("study groups are not evenly distributed across batches") combined with **batch adjustment that preserves group differences** (two-way ANOVA / ComBat with outcome as covariate) **followed by downstream analysis that ignores batch** ("treated as 'batch effect free' in subsequent analyses"). All three are required; remove any one and the problem disappears.
- **What breaks:** point estimates of group differences are applied across the whole data set while estimation errors are dropped → deflated variance/CIs → inflated F/t statistics → over-confidence and false positives, amplified by many-feature testing + FDR.
- **Named symptoms / detectors:**
  - **Inflated significance counts** vs. a batch-blocked analysis (2011 vs 11; 1003 vs 377).
  - **Non-uniform p-value distribution / inflated F on random-number data** retaining the same design (the sva-derived sanity check) — significance where none should exist.
  - **The imbalance/effective-sample-size ratio:** "If the ratio is close to 1, results should still be reliable, while a ratio much larger than 1 will indicate exaggerated confidence." The "main concern" is "batches where either of the groups of interest are missing or strongly under-represented, which would contribute to the nominal sample size, but not to the effective sample size."
  - **Sensitivity check:** "Comparing results from batch-adjusted data with and without covariates may indicate to what extent the outcome depends on the mode of batch adjustment." Down-sampling to the effective sample size to see if results persist.
- **The exact no-inflation condition (the negative detector):** no inflation iff each batch reproduces the overall group ratio (n_iA : n_iB = n_A : n_B for all i), i.e. ν₀ = ν / equalities hold iff groups are evenly represented in all batches.
- **Misleading reassurance:** a diagnostic tool may report the adjusted data as batch-effect-free when it is not — do not trust that claim under imbalance.

## 10. What the source does NOT address (confident silences)
- **RNA-seq / sequencing count data:** never mentioned. The words "RNA-seq", "sequencing", and "count(s)" do not appear; the paper neither extends nor disclaims its result for count-based assays. (Verified by full-text search; the only near-matches are "account", "consequences", etc.)
- **Non-expression omics** (methylation beyond one cited reference, proteomics, single-cell) are not analyzed.
- **Quantitative guidance on a threshold** for "how unbalanced is too unbalanced" beyond "ratio close to 1 vs much larger than 1" — no numeric cutoff is given.
- The full derivations of the general-case scale factor and effective degrees of freedom live in **Supplementary Material**, not the main text fetched here.

## 11. Open questions / ambiguities the source leaves unresolved
- No explicit numeric boundary separating "moderately unbalanced (need not be a concern)" from "heavily unbalanced (huge influence)."
- Whether/how the mechanism transfers to count-based (RNA-seq) or other non-microarray data is unaddressed.
- The exact symbol identities for the §3.2 effective-vs-nominal quantities (ν vs ν₀ role assignment) could not be confirmed from the captured text bytes (inline math stripped); the inequality direction and balance condition are clear, the role labels less so.
- How prevalent affected published results actually are is left as a concern ("may be unreliable"), not quantified, given sparse method reporting.

## 12. Guidance answers
- **Mechanism under unbalanced designs (quote §2.2.2):** Answered — see §7 quotes 2–3. In an unbalanced design, estimation of group and batch effects is interdependent; the batch-effect estimation error, applied as a fixed point estimate across each batch and then ignored downstream, "may also induce new dependencies" and "induce increased differences between groups ... may lead to over-confidence in estimated group differences."
- **Exact balance condition (n-ratio / ν₀ ≥ ν):** Answered — ν₀ ≥ ν by Jensen's inequality, "with equality if and only if the ratios n_iA : n_iB = n_A : n_B for all batches i" (§3.2); the general-case constants likewise reach equality "if and only if the groups are evenly represented in all batches" (§3.3). Inline math symbols were stripped in extraction (see §2); the inequality direction and ratio form are stated in prose and match the guidance.
- **Two reanalysis datasets with exact counts and imbalance:** Answered — Exp 1 (Copaxone vs Glatimer, GSE40566): ComBat **2011** at 5% FDR vs limma-blocked **11**; imbalance Copaxone 34 / Glatimer 11 / 14 other treatments 60, 17 Illumina WG-6_V2 chips (6/chip), some batches with only one main treatment. Exp 2 (ComBat "Data set 2", TAL1 vs control): ComBat+limma **1003** vs limma-blocked **377**; 30 samples, 3 batches, treatment/control 6/2, 3/4, 9/6.
- **Endorsed remedy + caution about trusting corrected data:** Answered — primary advice "account for batch in the statistical analysis"; if not possible, use covariate adjustment "only ... with great caution," and "the batch-adjusted data should not be trusted to be 'batch effect free', even when a diagnostic tool might claim so" (§7 quote 5). The best path is a balanced design from the start; for existing unbalanced data, reanalysis accounting for batch is "the most rigorous path."
- **Scope — microarray vs RNA-seq counts:** Answered (by silence). The paper bounds its empirical and framing context to **microarray** gene expression ("preparing microarray gene expression data from multiple cohorts, array platforms, or batches"); both reanalyses are microarray. It contains **no statement** extending to or excluding RNA-seq / count data — the terms never appear. There is no scope sentence to quote; the closest is the abstract's microarray framing. This is a confident silence, not an explicit boundary.

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** cautionary-bad. The canonical **correct-then-test** invalidity, with a named signature (p-value inflation / exaggerated confidence) and a specific trigger (**unbalanced** group-batch designs).
- **Grounds:** [[batch-aliased-with-condition]] — the **partial-confounding / correct-then-test** regime of that pattern (the unbalanced-design inflation + the `~ batch + condition` remedy); [[assess-batch-effects-and-confounding]] (the cardinal sin + the endorsed "model batch in the analysis" remedy); secondarily [[audit-method-validity]] (leakage between adjustment and inference, the REVISE side vs. the ESCALATE side).
- **Honest skill-3 limitation, now explicit:** the paper is **silent** on RNA-seq counts — so skill 3 must not claim Nygaard's inflation result transfers to NB count models; that transfer is unestablished (cf. the ComBat-seq source, issue #3). The remedy converges with [[deseq2]]'s `~ batch + condition`.
