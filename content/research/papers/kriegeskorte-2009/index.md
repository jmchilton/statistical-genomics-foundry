---
title: "Circular analysis in systems neuroscience: the dangers of double dipping"
type: paper
source_id: kriegeskorte-2009
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC2841687/
doi: 10.1038/nn.2303
access_date: "2026-06-30"
license: LicenseRef-all-rights-reserved
attribution: "Kriegeskorte N, Simmons WK, Bellgowan PSF, Baker CI. Circular analysis in systems neuroscience: the dangers of double dipping. Nature Neuroscience 12(5):535–540, 2009. DOI 10.1038/nn.2303. Read via the NIH-PA author manuscript on PMC; final version © Nature Neuroscience. Summarized in own words — no source text reproduced."
derived: own-words-summary
tags:
  - domain/selective-inference
---

*Faithful clean-context summary of one source; read source-only (the PMC author manuscript) plus this note's guidance file. Project framing lives in the flagged footer. License mode: own-words paraphrase throughout (restrictive source); only short functional strings — numeric thresholds, named statistical conditions, contrast-vector forms — kept verbatim as facts.*

## 1. Citation
Kriegeskorte N, Simmons WK, Bellgowan PSF, Baker CI. "Circular analysis in systems neuroscience: the dangers of double dipping." *Nature Neuroscience* 12(5):535–540, 2009. DOI 10.1038/nn.2303.

## 2. Access note
Publisher version (nature.com) is paywalled and all-rights-reserved. I read the **NIH-PA author manuscript** hosted open on PubMed Central (PMC2841687), the accepted manuscript corresponding to the published article. I did not read the typeset publisher PDF or the Supplementary Information (referenced as Supplementary Fig. S3 etc.) — those were not accessed, only cited as existing. No paywall blocked the main text; the boundary is that supplementary materials and final typeset layout were not consulted. Content below is from the main-text author manuscript.

## 3. Thesis
Selecting a subset of noisy measurements and then analyzing that same subset distorts the results — biased descriptive statistics and invalid inference — whenever the analysis statistics are not independent of the selection criterion under the null hypothesis.

## 4. Problem & context
Systems-neuroscience experiments (especially fMRI, also cell recording) generate far more data than is finally analyzed; researchers routinely select a subset (region of interest, set of voxels/neurons) and report statistics computed on that subset. Selection is necessary and not wrong in itself, but it can render an otherwise appropriate analysis circular. The paper names this practice "double dipping" and argues it is common: of 134 fMRI papers published in 2008 across five journals (Nature, Science, Nature Neuroscience, Neuron, Journal of Neuroscience), 42% (57 papers) contained at least one non-independent selective analysis, and a further 14% (20 papers) might have but lacked enough methodological detail to judge.

## 5. Method/approach
Conceptual argument plus worked illustrations: (a) a literature survey quantifying prevalence; (b) a pattern-information / decoding example run on real data and on pure Gaussian random data; (c) a simulated regional-activation example with a known ground-truth null effect, repeated 100 times to measure false-positive rates; (d) a decision flowchart prescribing when each analysis type is permissible. Unifying criterion: whether the results statistic is independent of the selection criterion under the null hypothesis.

## 6. Key claims/findings (atomic)
- **Definition.** Double dipping = using the same data for both selection and the subsequent selective analysis.
- **Distortion condition.** Distorts descriptive statistics and invalidates inference whenever the results/test statistics are not inherently independent of the selection criteria **under the null hypothesis**.
- **Mechanism.** Selecting based on the data (e.g. on the design matrix) creates spurious dependencies between the noise in the selected data and the experimental design, violating the random-sampling assumption.
- **Noise demonstration (decoding).** A pattern-classification analysis applied to Gaussian random data containing no information nonetheless produced decoding accuracies significantly above chance when voxel selection used all the data — selection on all data can strongly bias estimates and manufacture apparent structure from noise.
- **Null-simulation false-positive rates.** With true contrast A–B equal to zero but the ROI defined using a related contrast (A–D), the one-sided t-test was significant in **20 of 100** simulations at **p < 0.05** and **9 of 100** at **p < 0.01** — significantly above the correct rate (χ² test, **p = 0.00005**). The biased estimate also made condition A *look* more activated than B though the true difference was zero.
- **Prevalence.** 42% (57/134) of surveyed 2008 fMRI papers had ≥1 non-independent selective analysis.
- **Orthogonality is not enough.** Contrast-vector orthogonality (e.g. selecting with [1 1]ᵀ, testing with [1 −1]ᵀ) by itself does not guarantee independence under the null; orthogonal contrasts can still be non-independent.

## 7. Load-bearing statements (own-words paraphrase; restrictive-license mode)
- **Circular analysis (definition):** an analysis whose own assumptions distort its results; selection-based circularity arises when data are first analyzed to choose a subset and that same subset is then re-analyzed.
- **Double dipping (definition):** reusing one data set for both the selection step and the selective analysis step.
- **The distortion condition (load-bearing distinction):** the problem is statistical **non-independence** of the selection criterion and the test statistic *under the null hypothesis* — not merely "reusing data." If the test statistic is genuinely independent of the selection criterion under the null, reusing the same data is acceptable; if not, distortion follows.
- **The remedy:** a simple way to guarantee independence is to use an independent data set for selection versus for the selective (final) analysis — e.g. select channels (voxels/neurons) on one partition and test them on a held-out partition.
- **Remedy caveat:** independence — not mere orthogonality of contrast vectors — is what must hold, and it must hold under the null hypothesis; split-data is the safe route when independence cannot be demonstrated.

## 8. Stated scope/assumptions/limitations
- Framed for systems neuroscience, primarily fMRI, extended to cell-recording / multi-channel measurements.
- Authors distinguish two forms of selection bias: (1) selective *reporting* of accurate results, and (2) distortion of estimates plus invalidation of statistical tests — and state the paper focuses on the **second**, not selective reporting.
- Distortions can be very large (decoding example) or smaller but still significant (simulation example), and can flip the qualitative outcome of significance tests.

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Core invalidity pattern (double dipping):** select a subset using a criterion statistically related, under the null, to the statistic you then report on that subset → biased estimates + inflated false-positive rate. Detector/symptom: ask whether the selection criterion and the test statistic are independent **under H0**; if not (or undemonstrated), the analysis is circular.
- **Above-chance results from pure noise:** if a selection-then-test pipeline yields apparent effects on data known to contain none (random/permuted/null-simulated), the pipeline is circular. Operational detector — run the procedure on noise; non-null-looking output = circularity.
- **Inflated error rate:** under a true null, the test rejects far more often than nominal α (20% vs 5%, 9% vs 1%).
- **The orthogonality trap:** treating orthogonal contrast vectors as automatically "safe." Orthogonality ≠ independence under the null.
- **Named causes of circularity (Fig. 1):** circularity attributed to selection, and also to weighting and sorting of data by assumption-laden criteria. (Figure-level detail [summarizer-inferred] from the manuscript's figure description; not independently re-verified against the typeset figure.)

## 10. What the source does NOT address
- Explicitly sets aside the *selective-reporting* form of bias (publication/reporting bias) as out of scope.
- Supplementary Information (e.g. Fig. S3 on orthogonality vs. independence) not read here, so its detailed treatment is not captured.
- Does not (in main text read) provide a general formal proof; argument is conceptual plus illustrative.

## 11. Open questions/ambiguities
- Exact construction of the decoding example (voxel count, classifier, accuracy values) not captured at numeric precision — only the qualitative "significantly above chance on random data" result.
- Several figure-caption specifics (Fig. 1–4) are paraphrased from the manuscript and should be re-verified against the typeset figures/Supplementary before quoting as captions.
- Precise definition/derivation of "independence under the null" for specific selection–test pairs lives partly in the Supplementary Information, not read here.

## 12. Guidance answers
- **Exact definition of double dipping / circular analysis:** Double dipping = using the same data set for both selection and the selective analysis. Circular analysis = an analysis whose assumptions distort its own results; the selection variant = analyze data to pick a subset, then re-analyze that subset. (§3, §7)
- **Precise condition for distortion — non-independence vs. "reusing data":** Yes — framed as statistical **non-independence**, not mere data reuse. Exact condition: distortion occurs whenever the results/test statistics are **not inherently independent of the selection criteria under the null hypothesis**. Reuse is fine when that independence holds. (§6, §7 — the load-bearing distinction.)
- **Noise/null demonstration:** Yes. Decoding pipeline on Gaussian random data with no information produced above-chance accuracy when selection used all data; null-effect ROI simulation (true A–B = 0) produced significant results in 20/100 (p<0.05) and 9/100 (p<0.01) runs. Selection-then-test manufactures apparent structure from noise. (§6)
- **Taxonomy/figure of valid vs. invalid combinations:** Yes — Fig. 4 is a decision flowchart: prefer non-selective analysis; if selective, test whether the result statistic is independent of the selection criterion under the null; if **demonstrably independent**, all data may be used; if **not**, use split/independent data. "Safe" = selection criterion independent of the test statistic under H0. (§4, §6)
- **Recommended remedy + caveat on when independence suffices:** Remedy = independent data for selection vs. selective analysis (split-data / leave-out), or inherently independent statistics. Caveat = independence must hold **under the null hypothesis**, and contrast-vector orthogonality alone is *not* sufficient. (§7)
- **Bias of point estimate vs. inference:** Yes, both named: double dipping yields **distorted descriptive statistics** (biased point estimates — condition A appears more activated than B though true difference is zero; inflated decoding accuracy) **and** **invalid statistical inference** (false-positive inflation, 20% vs nominal 5%). Treated as two consequences of the same non-independence. (§6, §8)

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** cautionary-bad / origin. The source that **coins "double dipping"** and gives the precise mechanism for [[double-dipping]]. Cross-domain (neuroimaging, not genomics) but the conceptual root every genomics treatment cites.
- **Grounds:** the `[[double-dipping]]` pattern's one-line definition + the load-bearing **non-independence-under-the-null** condition (the distinction that makes the leaf a real test, not "don't reuse data"). Backs the circular/post-selection check in the `[[audit-method-validity]]` referee.
- **The portable detector:** *run the procedure on pure noise / under a simulated null; if it returns non-null-looking output, it is circular.* This is a calibrate-style empirical check (Family B) the gate can demand — connects to `[[derive-null-and-calibration]]`.
- **Co-cite with the genomics remedies** that operationalize the fix per assay: [[gao-clusterpval-2024]] (cluster-then-test), [[neufeld-countsplit-2024]] (single-cell information-partitioning), [[korthauer-dmrseq-2019]] (region-selection permutation null). Origin states the principle; those source the per-context signatures + remedies.
- **Note for the leaf:** the "orthogonality ≠ independence under the null" trap is a concrete signature worth carrying — a plausible-looking justification ("our contrasts are orthogonal") that does not establish validity.
