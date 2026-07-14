---
title: "Capturing Heterogeneity in Gene Expression Studies by Surrogate Variable Analysis"
type: paper
source_id: leek-storey-2007-sva
source_url: https://journals.plos.org/plosgenetics/article?id=10.1371/journal.pgen.0030161
doi: 10.1371/journal.pgen.0030161
access_date: "2026-07-13"
license: CC-BY-2.5
license_file: LICENSES/CC-BY-2.5.LICENSE
attribution: "Leek JT, Storey JD. Capturing Heterogeneity in Gene Expression Studies by Surrogate Variable Analysis. PLoS Genetics 3(9):e161, 2007. https://doi.org/10.1371/journal.pgen.0030161 — PLOS open access under the Creative Commons Attribution License. Read from PLOS full text + article XML (equations recovered from XML; PMC was Cloudflare-blocked)."
derived: license-aware-summary
---

# Leek & Storey 2007 — Surrogate Variable Analysis (SVA)

## 1. Citation

Leek JT, Storey JD (2007) "Capturing Heterogeneity in Gene Expression Studies by Surrogate
Variable Analysis." *PLoS Genetics* 3(9): e161. DOI: 10.1371/journal.pgen.0030161.
Received April 9, 2007; Accepted August 1, 2007; Published September 28, 2007.
Editor: Greg Gibson. Open access: https://journals.plos.org/plosgenetics/article?id=10.1371/journal.pgen.0030161

Copyright statement on the article page (verbatim): "Copyright: © 2007 Leek and Storey. This is an
open-access article distributed under the terms of the Creative Commons Attribution License, which
permits unrestricted use, distribution, and reproduction in any medium, provided the original author
and source are credited."

Abbreviations defined by the paper: EH = expression heterogeneity; FDR = false discovery rate;
QTL = quantitative trait locus; SVA = surrogate variable analysis.

## 2. Access note

Full text read from the PLOS Genetics article page (Abstract, Author Summary, Introduction, Results,
Discussion, Materials and Methods, Supporting Information captions, references). Additionally read:
Table 1 (from the published table image) and the display/inline equations (rendered as images in the
HTML; recovered from the article XML equation images e001–e004, ex024–ex026, ex034–ex035) and
Text S1 (the 4-page supplementary PDF).

Figures S1–S11 were **not** read as images — only their published captions, which are reproduced/summarized
here. No paywall. PMC mirror (PMC1994707) was Cloudflare-blocked; PLOS served the full text.

**Quoting mode: license-aware (permissive / CC-BY).** Short verbatim load-bearing quotes are used and
marked, with location. Equations, function/variable names, and numbers are verbatim throughout.

## 3. Thesis

Unmodeled and unmeasured factors ("expression heterogeneity") systematically corrupt significance
analysis in gene expression studies — even in well-designed randomized ones — and SVA can estimate
these factors' signatures directly from the expression data and incorporate them as covariates,
restoring correct null distributions, power, and reproducible gene ranking.

## 4. Problem & context

- The paper's own vocabulary (Introduction): **"primary measured variables"** (or primary variables)
  are those explicitly modeled. Remaining sources of variation are classified into three types:
  **"unmodeled factors"** (explained by measured variables but not put in the model), **"unmeasured
  factors"** (not measured at all; the paper also calls these unmodeled factors), and **"gene-specific
  noise"** (random, independently realized gene to gene).
- **"Expression heterogeneity" (EH)** is the paper's name for "patterns of variation due to any
  unmodeled factor" (Introduction).
- Consequences named in the Introduction, using their age/disease-state illustration — failing to model
  a factor may (a) induce extra variability decreasing power, (b) introduce spurious signal because
  the factor's effect may be confounded with the primary variable, (c) induce long-range dependence in
  the apparent "noise", complicating significance assessment.
- Sources of EH cited: technical, environmental, demographic, genetic. Notes that systematic variation
  can persist *after normalization has been applied*, and that specific genetic loci have been shown to
  influence expression of hundreds or thousands of genes.
- Claimed gap: "to date there has been no approach for identifying and accounting for all sources of
  systematic expression variation, including variation due to unmeasured or unmodeled factors of both
  biological and technical sources" (Introduction). The paper also asserts biological sources of
  unmodeled variation "can be just as problematic as technical sources".

## 5. Method / approach

### 5.1 Statistical model (Materials and Methods, "Statistical model for SVA")

- **X**<sub>m×n</sub> is the normalized expression matrix: *n* arrays, *m* genes.
  **y** = (y₁,…,y<sub>n</sub>)ᵀ is the primary variable of interest.
- Base model: `x_ij = μ_i + f_i(y_j) + e_ij`, where μ_i is baseline expression,
  `f_i(y_j) = E(x_ij | y_j) − μ_i`, and e_ij is mean-zero noise. Dichotomous example:
  `x_ij = μ_i + β_i y_j + e_ij`, fit by least squares; testing β_i = 0 is exactly the two-class
  differential-expression test.
- With *L* unmodeled factors, **g**_ℓ = (g_ℓ1,…,g_ℓn) an "arbitrarily complicated function of the ℓth
  factor", the model becomes (equation e001, verbatim form):

  `x_ij = μ_i + f_i(y_j) + Σ_{ℓ=1}^{L} γ_ℓi g_ℓj + e*_ij`
  `     = μ_i + f_i(y_j) + Σ_{k=1}^{K} λ_ki h_kj + e*_ij`

  γ_ℓi is a **gene-specific** coefficient for the ℓth unmodeled factor; γ_ℓi = 0 if factor ℓ does not
  influence gene i. e*_ij is the true gene-specific noise, "now sufficiently independent across genes."
- Justification for additivity: nonlinear factor effects can be represented additively with a suitable
  nonlinear basis (cites Hastie & Tibshirani, GAMs); make L as large as necessary. With *n* arrays,
  each gene can be modeled by at most *n* linearly independent factors, so **L ≤ n**.
- Key move: SVA does **not** estimate the **g**_ℓ. For L vectors in n-space one can find an orthogonal
  set **h**_k, k = 1,…,K (**K ≤ L**) spanning the same linear space. The **h**_k are chosen to be the
  right non-zero singular vectors of the SVD of the m × n matrix with (i,j) entry Σ_ℓ γ_ℓi g_ℓj.
  These **h**_k are the **surrogate variables**.

### 5.2 The four conceptual steps (Results, "Surrogate Variables")

Quoted/condensed from the paper's own numbering:
1. Remove the signal due to the primary variable(s) to get a residual expression matrix; decompose it
   to identify EH signatures as an orthogonal basis of singular vectors; use a statistical test to
   determine which singular vectors represent significantly more variation than expected by chance.
2. Identify the subset of genes driving each orthogonal EH signature, via a significance analysis of
   associations between genes and the EH signatures **on the residual expression matrix**.
3. For each subset of genes, build a surrogate variable from the full EH signature of that subset **in
   the original expression data**.
4. Include all significant surrogate variables as covariates in subsequent regression analyses,
   **allowing for gene-specific coefficients** for each surrogate variable.

Why each step exists (paper's own rationale, same section): Step 1 ensures the SVs estimate EH and not
the primary variable's signal; Step 2 gives an accurate estimate of each SV by finding the driving gene
subset; Step 3 **allows for correlation between the primary variable and the surrogate variables** by
building SVs on the original expression data; Step 4 accounts for a SV having a different effect on each
gene. "The third and fourth steps are particularly important for maintaining unbiased significance with
SVA."

### 5.3 Algorithm to detect unmodeled factors (Materials and Methods, "SVA algorithm")

Stated assumption for both algorithms: **n < m**, and (for simplicity) a single primary variable —
"the extension to multiple primary variables simply requires one to include all of them in the model
fit occurring in each Step 1."

1. Fit `x_ij = μ_i + f_i(y_j) + e_ij`; compute residuals `r_ij = x_ij − μ̂_i − f̂_i(y_j)`; form the
   m × n residual matrix **R**.
2. SVD: **R = UDV**ᵀ.
3. Let d_ℓ be the ℓth diagonal element of **D**. If *df* is the degrees of freedom of the model fit
   μ̂_i + f̂_i(y_j), the last *df* eigenvalues are exactly zero **by construction** and are removed.
   For eigengene k = 1,…,n−df the observed statistic is (equation e002):

   `T_k = d_k² / Σ_{ℓ=1}^{n−df} d_ℓ²`   — "which is the variance explained by the kth eigengene."

4. Form **R\*** by permuting **each row of R independently** to remove structure.
5. Refit the model on **R\*** and take residuals to form the m × n "model-subtracted null matrix" **R₀**.
6. SVD of **R₀ = U₀D₀V₀**ᵀ.
7. Null statistic (equation e003): `T_k⁰ = d_0k² / Σ_{ℓ=1}^{n−df} d_0ℓ²`.
8. Repeat steps 4–7 a total of **B** times, giving T_k^{0b}, b = 1,…,B; k = 1,…,n−df.
9. p-value for eigengene k (equation e004):

   `p_k = #{ T_k^{0b} >= T_k ; b = 1,...,B } / B`

   Then **monotonicity is forced**: "Since eigengene k should be significant whenever eigengene k′ is
   (where k′>k), we conservatively force monotonicity among the p-values. Thus, set
   p_k = max(p_{k−1}, p_k) for k = 2,…,n−df."
10. "For a user-chosen significance level 0≤α≤1, call eigengene k a significant signature of residual
    EH if p_k ≤ α."

The paper says "The basic form of the first algorithm has been proposed previously [27]" — reference 27
is Buja A, Eyuboglu N (1992) "Remarks on parallel analysis," *Multivariate Behav Res* 27: 509–540.

### 5.4 Algorithm to construct surrogate variables ("The second algorithm has been proposed and justified in this manuscript")

1. Same fit and residual matrix **R** as above.
2. SVD **R = UDV**ᵀ; let **e**_k be the kth column of **V**. "These **e**_k are the residual eigengenes
   and represent orthogonal residual EH signals independent of the signal due to the primary variable."
3. Set K̂ to the number of significant eigengenes found by the detection algorithm above.

For each significant residual eigengene **e**_k:

4. Regress **e**_k on the **x**_i (i = 1,…,m); get a p-value per gene for association between the
   residual eigengene and that gene's expression.
5. Estimate π₀ (proportion of genes *not* truly associated with **e**_k) as π̂₀ "as described previously
   [23]" (Storey & Tibshirani 2003). Estimate the number of associated genes as (equation ex025,
   reproduced exactly as printed):

   `m̂_1 = ⌊(1 − π̂_0 × m)⌋`

   Take the indices s₁,…,s_{m̂₁} of the genes with the m̂₁ smallest p-values from this test.
6. Form the m̂₁ × n **reduced expression matrix X_r** from those genes' rows **of the original expression
   matrix**. Compute its eigengenes.
7. `j* = argmax_{1≤j≤n} cor(e_k, ĥ_j^r)`; set the estimated surrogate variable ĥ_k to that eigengene of
   the reduced matrix. "In other words, set the estimate of the surrogate variable to be the eigengene of
   the reduced matrix most correlated with the corresponding residual eigengene. Since the reduced matrix
   is enriched for genes associated with this residual eigengene, this is a principled choice for the
   estimated surrogate variable **that allows for correlation with the primary variable**."
8. "In any subsequent analysis, employ the model
   `x_ij = μ_i + f_i(y_j) + Σ_{k=1}^{K} λ_ki ĥ_kj + e*_ij`,
   which serves as an estimate of the ideal model
   `x_ij = μ_i + f_i(y_j) + Σ_{k=1}^{K} λ_ki h_kj + e*_ij`."

Closing note on the decomposition: SVD was chosen because it "provides uncorrelated variables that
decompose the data in an additive linear fashion with the goal of minimizing the sum of squares"; other
decompositions "may be possible"; if primary variables are modeled for non-continuous data, "it may make
sense to decompose the variation with respect to whatever model-fitting criteria will be employed."

### 5.5 Data and analysis details (Materials and Methods)

- **Yeast (genetics of gene expression)**: Brem et al. — 6,216 genes, 112 segregants of a cross between
  two isogenic yeast strains, genotypes at 3,312 markers (covering 99% of the genome).
- **Breast cancer (disease class)**: Hedenfalk et al. — 3,226 genes, 7 *BRCA1* and 8 *BRCA2*
  mutation-positive tumor samples; outlier genes removed leaving **3,170 genes**.
- **Kidney (time course / aging)**: Rodwell et al. — 133 patients, 34,061 genes; 74 cortex, 59 medulla
  tissue samples.
- "All expression data were analyzed on the log scale."
- Yeast linkage: unadjusted p-values from an **F-test comparing an additive genetic model to the null
  model of no genetic association**; SVA-adjusted p-values from "an *F*-test comparing the full model of
  genetic association and the null model of no association, **both models including all significant
  surrogate variables as additive terms**."
- Simulation: 1,000 studies; 1,000 genes on 20 arrays split between two disease states; expression drawn
  N(0,1); a **dichotomous unmodeled factor independent of disease state**; mean differences drawn from two
  independent normal distributions. Genes 1–300 differentially expressed; genes 200–500 (Results text says
  200–500; the Figure 2 caption says genes 201–500) affected by the unmodeled factor. A second simulation
  drew residuals from the real Hedenfalk data (permuting each row) and added the same signal. Differential
  expression by a **t-test based on standard linear regression**; genes ranked by |t|. q-values estimated per
  Storey & Tibshirani. Simulations in R.
- Validity criterion used throughout ("Definition of a Correct Procedure"): null-gene p-values must be
  Uniform(0,1); deviations assessed with a **nested Kolmogorov-Smirnov test** (Text S1) — a KS test on the
  null p-values within a simulation, then a KS test on the 1,000 resulting KS p-values across simulations,
  "to avoid 'getting lucky' on one particular simulated data set."

### 5.6 Software

"SVA has been made freely available as an R package at http://www.genomine.org/sva/" (Materials and
Methods, "Software"; the same URL appears in the Discussion). **No package name string, version number,
or function names (e.g. no `sva()`, `num.sv()`, `mod`, `mod0`) appear anywhere in the paper.**

## 6. Key claims / findings

**Simulation — surrogate variables accurately estimated**
- In **99.5%** of the 1,000 simulated studies (independent unmodeled factor), the permutation procedure
  correctly identified **one** significant surrogate variable.
- Average correlation between the estimated SV and the true unmodeled factor: **0.95, sd 0.05** (over 1,000
  experiments).
- Gene-set recovery: on average **30.5%** of truly affected genes were identified as affected, vs **9.9%** of
  truly unaffected genes. The paper states it "chose a liberal adaptive cutoff for determining the number of
  genes affected by each orthogonal EH signal to avoid overfitting."
- "Each surrogate variable is a weighted average of the expression measurements over a subset of genes."

**Simulation — null p-value distribution**
- Direction of bias in an *unadjusted* analysis (Results, "Correct p-value distribution"): "Specifically,
  if the unmodeled factor is correlated with the primary variable, the null *p-*values will be too small,
  biased towards zero. If the unmodeled factor is uncorrelated with the primary variable, the null
  *p-*values will be too big, biased towards one."
- Even a **randomized** design does not protect a *single* study: a single randomization is applied to all
  genes, so the thousands of p-values from one array study are not equivalent to thousands of independent
  randomizations; EH-induced dependence produces "major fluctuations and bias in the *p-*values for the
  null genes for any single expression study, even in a well designed, randomized study."
- SVA-adjusted analyses restore Uniform null p-values across all 1,000 datasets (Figures 1B, S3); result
  is qualitatively unchanged when residuals are drawn from real microarray data (Figure S4).

**Simulation — power and ranking**
- SVA increases expected true positives vs FDR relative to unadjusted (Figure 1C).
- Caution the paper itself raises: "the application of SVA can result in empirical increases or decreases
  in power, depending on whether the null *p-*values are spuriously pushed towards zero or one, even though
  SVA tends to only provide increases in the true power."
- Gene ranking: SVA-adjusted rankings are comparable to the no-heterogeneity ("Ideal") scenario; unadjusted
  rankings are "incorrect and highly variable" (Figures 1A, S5). The paper calls this "arguably the most
  important feature of SVA."

**Simulation — FDR estimation**
- In a variant where genes 201–1,000 were affected by the unmodeled factor (to create large-scale
  dependence), SVA reduced variability in both the estimate of π₀ and the q-values; SVA-adjusted FDR
  behavior was "almost identical to the behavior under the scenario with no EH" (Figure S6).

**Simulation — confounding (the paper's own robustness experiment)**
- Second simulation: unmodeled factor simulated so that its **average correlation with the primary variable
  was 0.50, sd 0.16**; the unobserved factor is correlated with the primary variable **and** affects an
  overlapping set of genes. The paper describes this as "representative of the potential confounding present
  in observational microarray studies … and that which happens by chance in a non-negligible subset of
  randomized studies."
- Result: permutation test correctly identified a single surrogate variable in **94.5%** of simulated
  datasets; average correlation of estimated SV with the true unmodeled factor **0.94, sd 0.22**. Null
  p-values remained correctly Uniform.
- Conclusion drawn: "SVA accurately estimates the unobserved factor even when there is strong dependence
  between the primary and unobserved factors, with a subset of genes affected by both."

**Yeast**
- SVA identified **14 significant surrogate variables** from the expression data (genotypes ignored).
- Pivotal *trans*-acting loci on Chromosomes II, III, VIII, XII, XIV, XV drove widespread *trans*-linkage
  (Figure 3A caption uses p < 1e−7 for "significant linkage peaks"; the Figure 3B caption lists the
  eliminated peaks as II, III, VII, XII, XIV, XV — chromosome VII vs VIII differs between the body text and
  the 3B caption).
- After including SVs as covariates, "the majority of the *trans*-linkages to the pivotal loci have been
  eliminated," "without reducing *cis*-linkage peaks."
- *cis*-linkage power (markers within **three centimorgans** of the trait's ORF, on chromosomes without a
  pivotal locus): at **FDR 0.05**, the SVA-adjusted analysis found **1,894** significant *cis*-linkages vs
  **1,604** unadjusted.

**Breast cancer (disease class)**
- One surrogate variable identified, capturing substructure within the *BRCA2* samples. Adjusted analysis
  finds **fewer** significant genes at standard FDR cutoffs.
- Interpretation: "differential expression for a number of genes is driven primarily by expression
  heterogeneity. Adjusting for the top surrogate variable eliminates spurious differential expression due to
  EH." Worked example: *EIF2S2* has q-value **0.09** unadjusted, but the first four *BRCA2* samples have
  nearly identical expression to the *BRCA1* samples for this gene (Figure S7B).

**Kidney (time course)**
- Top SV (estimated with tissue ignored) had **correlation 0.86** with tissue type.
- SVA identified **84%** of genes as likely associated with the top SV, "indicating pervasive signal due to
  tissue type, as can be directly verified."
- At q ≤ 0.05: **100%** of the **422** genes significant in the unadjusted analysis were also significant in
  the tissue-adjusted analysis; **96%** of the **538** genes significant in the SVA-adjusted analysis were
  also significant in the tissue-adjusted analysis; **116** genes were significant in both the SVA-adjusted
  and tissue-adjusted analyses but **not** in the unadjusted analysis — "an increase in power to detect
  differential expression after adjusting for a surrogate variable in place of an unmodeled confounding
  factor."

**Table 1 ("Significance Results") — verbatim counts by q-value threshold**

| Study | Analysis type | q ≤ 0.01 | 0.025 | 0.05 | 0.10 |
|---|---|---|---|---|---|
| Genetics of gene expression (significant *cis*-linkages) | Unadjusted | 1,063 | 1,343 | 1,604 | 1,951 |
| | SVA adjusted | 1,428 | 1,676 | 1,894 | 2,292 |
| Disease Class (*BRCA1* vs *BRCA2* DE genes) | Unadjusted | 1 | 19 | 96 | 274 |
| | SVA adjusted | 1 | 1 | 52 | 218 |
| Time course (DE with age) | Unadjusted | 161 | 273 | 422 | 823 |
| | Tissue adjusted | 270 | 482 | 795 | 1,548 |
| | SVA Adjusted | 196 | 367 | 563 | 991 |

Table 1 caption (verbatim, load-bearing): "An SVA-adjusted analysis may result in an increase or decrease in
the number of significant results depending on the direction and degree to which the unmodeled factors (now
captured by surrogate variables) were confounded with the primary variables."

*Discrepancy to flag:* the body text states **538** SVA-significant time-course genes at q ≤ 0.05, while Table 1
reports **563** in the SVA-adjusted row at 0.05. Both are reproduced as printed; the paper does not reconcile them.

**Comparison with existing methods**
- Two naive SVD/eigengene baselines were tested. (i) Significant eigengenes of the **full** expression matrix,
  drop the one most correlated with the primary variable, use the rest as covariates. (ii) Significant
  eigengenes of the **residuals**, all used as covariates. "Both algorithms do not produce consistently
  accurate results (Figures S9 and S10), and sometimes their adjustments produce more bias than making no
  adjustment at all."
- Diagnosis of *why* they fail: "The eigengenes calculated from the entire expression matrix capture the
  signal due to both the unmodeled factor and the primary variable, which results in biased estimation of the
  unmodeled factor. The eigengenes calculated from the residuals do not take into account possible overlapping
  signal between the primary variable and unmodeled factors, often resulting in over-fitting."
- SVA is described as a **"supervised factor analysis"** — "SVA decomposes the expression variation with
  respect to the primary variables already included in the model," and "It also does not require any
  assumptions about the relative strength of signal due to each source of variation."
- Contrast with population-structure PCA (Price et al.): in association studies population structure has
  genome-wide effects "at a signal relatively much stronger than the primary variable," whereas expression
  signal structure "tends to be much more complex," so the decomposition must be supervised.

**Multiple-testing-dependence methods cannot substitute**
- Figure 5 argument: a histogram of EH-affected *null* p-values can be indistinguishable from a histogram from
  an EH-free experiment where a subset of tests are true alternatives. Therefore "it is not possible to identify
  and account for heterogeneity by analyzing one-dimensional *p-*values or test-statistics." Any p-value-level
  EH adjustment "must make all *p-*value histograms Uniformly distributed."
- The "Empirical Null" technique does not restore correct null p-values in their simulation, while SVA does
  (Figure S11).

## 7. Load-bearing statements — VERBATIM (permissive CC-BY license; each with location)

1. **Definition of a surrogate variable** (Materials and Methods, "Statistical model for SVA"):
   > "Here we choose the set of *K* orthogonal vectors (denoted by the **h**_k) to be those that are the right
   > non-zero singular vectors provided by the singular value decomposition of the *m* × *n* matrix with
   > (*i*, *j*) entry [Σ_ℓ γ_ℓi g_ℓj]. This justifies the use of the singular value decomposition to identify
   > orthogonal signatures of expression heterogeneity for surrogate variable estimates. We call these
   > **h**₁,**h**₂,...,**h**_K the "surrogate variables.""

2. **How SVs enter the downstream analysis** (Results, "Surrogate Variables"):
   > "After the surrogate variables are constructed, they are then incorporated into any subsequent analysis
   > as covariates in the usual way."

3. **How SVs enter the downstream analysis — the algorithmic statement** (Results, "Surrogate Variables",
   Step 4 of the four conceptual steps):
   > "(Step 4) Include all significant surrogate variables as covariates in subsequent regression analyses,
   > allowing for gene-specific coefficients for each surrogate variable."

   and (Materials and Methods, "Algorithm to construct surrogate variables", step 8):
   > "In any subsequent analysis, employ the model x_ij = μ_i + f_i(y_j) + Σ_{k=1}^{K} λ_ki ĥ_kj + e*_ij,
   > which serves as an estimate of the ideal model x_ij = μ_i + f_i(y_j) + Σ_{k=1}^{K} λ_ki h_kj + e*_ij."

4. **Why SVs are built on the ORIGINAL matrix — the correlation-with-primary-variable design point**
   (Results, "Surrogate Variables"):
   > "The four-step procedure is necessary both to ensure that the surrogate variables indeed estimate EH and
   > not the signal from the primary variable (Step 1), to ensure an accurate estimate of each surrogate
   > variable by identifying the specific subset of genes driving each EH signature (Step 2), to allow for
   > correlation between the primary variable and the surrogate variables by building the surrogate variables
   > on the original expression data (Step 3), and to take into account the fact that a surrogate variable may
   > have a different effect on each gene (Step 4)."

5. **The paper's own strongest confounding claim** (Results, "Robustness to confounding in observational
   studies"):
   > "Thus, SVA accurately estimates the unobserved factor even when there is strong dependence between the
   > primary and unobserved factors, with a subset of genes affected by both."

## 8. Stated scope, assumptions, limitations (the source's own)

- **n < m** is assumed explicitly ("We assume that *n* < *m*").
- Single primary variable assumed "for simplicity"; multiple primary variables handled by including them all
  in the Step-1 model fit.
- Additive linear model for the unmodeled factors, with **L ≤ n** and **K ≤ L**; nonlinearity is absorbed by
  choosing a sufficiently nonlinear basis and a large enough L.
- The h_k are **orthogonal to each other** (they span the same space as the g_ℓ) but are explicitly **allowed
  to be correlated with the primary variable** (that is the point of building them on the original matrix).
- The **g**_ℓ themselves are **not** estimated and are not required to correspond to any biologically
  meaningful measured variable: "it is not necessary to determine a model of the g_ℓj in terms of a
  biologically meaningful variable."
- Significance level α for the eigengene permutation test is **user-chosen** (0 ≤ α ≤ 1); the paper gives no
  default and no recommended value. B (number of permutations) is likewise left symbolic.
- All expression data were analyzed **on the log scale**.
- Empirical power can go up or down after SVA (Table 1 caption; "Correct p-value distribution" section) —
  fewer significant genes is a legitimate SVA outcome, not evidence of failure.
- Openly hedged: whether the framework generalizes the multiple-testing problem "requires further
  investigation."
- SVD is asserted as "the most appropriate decomposition" here, but the paper allows that "It may be possible
  to utilize other decomposition methods," and for non-continuous primary-variable models suggests decomposing
  with respect to the relevant model-fitting criteria.

## 9. Failure modes / invalidity patterns

**Named by the paper for an *unadjusted* analysis (i.e. the problem SVA is for):**
- Null p-values depart from Uniform(0,1). **Detector named by the paper:** examine the distribution of null-gene
  p-values; formally, a (nested) Kolmogorov-Smirnov test against the Uniform. "p-values are specifically defined
  so that those corresponding to true null hypotheses have a Uniform(0,1) distribution if and only if the null
  distribution has been correctly calculated."
- **Direction of the failure is diagnostic:** unmodeled factor *correlated* with the primary variable → null
  p-values biased **towards zero** (anticonservative, spurious signal). Unmodeled factor *uncorrelated* →
  null p-values biased **towards one** (conservative, lost power).
- Randomization does **not** rescue a single study (one randomization applies to all genes).
- EH inflates the variance of FDR estimators / π₀ estimates.
- Gene rankings become highly variable across replicate studies.

**Named by the paper for *competing* adjustment methods:**
- Eigengenes of the **full** expression matrix "capture the signal due to both the unmodeled factor and the
  primary variable, which results in **biased estimation of the unmodeled factor**." (This is the paper's
  explicit signal-absorption failure mode — attributed to unsupervised SVD, **not** to SVA.)
- Eigengenes of the **residuals only** ignore overlap between primary variable and unmodeled factors, "often
  resulting in **over-fitting**."
- Both can "produce more bias than making no adjustment at all."
- p-value-level or test-statistic-level dependence adjustments cannot address EH in general (Figure 5 / Text S1
  argument).

**Failure modes of SVA itself:** the paper **names none**. It reports no scenario in which SVA degrades an
analysis, no breakdown condition, no diagnostic for "SVA went wrong," and no threshold beyond which SVA should
not be used. The nearest thing to a caveat is that SVA may *reduce* the number of significant calls
(Table 1 caption; disease-class result), which the paper frames as correct behavior, not failure.

## 10. What the source does NOT address (confident silences)

- **Count / RNA-seq data: not addressed at all.** Every dataset is microarray expression analyzed on the log
  scale (two-color/array platforms from 2001–2005 studies). The words "RNA-seq", "count", "read", and "negative
  binomial" do not appear. The model is Gaussian-noise linear regression throughout.
- **Subtracting surrogate variables from the data ("cleaning" the matrix) is never described.** Every downstream
  use is as **covariates in the model**. The only subtraction anywhere in the paper is internal to SVA (forming
  the residual matrix **R** by removing the *primary variable's* effect, in order to *construct* the SVs) — never
  to produce an adjusted expression matrix for testing. The phrase "SVA was able to capture and remove the effects
  of these few pivotal loci without the need for genotypes" (yeast section) refers to the *trans*-linkage signal
  being eliminated in an **F-test that includes the SVs as additive terms in both the full and null models** — not
  to a corrected expression matrix.
- **No numeric threshold for "too much confounding to proceed."** The only confounding number in the paper is the
  simulated average correlation of **0.50 (sd 0.16)** between the unmodeled factor and the primary variable, at
  which SVA still worked. Nothing is said about a maximum tolerable correlation, and **perfect (or near-perfect)
  confounding is never analyzed or mentioned.**
- **No statement that surrogate variables can absorb the biological signal of interest.** The paper's claim runs
  the other way (Step 1 is designed to prevent it, Step 3 to tolerate correlation), and the absorption problem is
  raised only as a criticism of *unsupervised* SVD-on-the-full-matrix baselines.
- **No `sva` R-package API**: no function names, argument names, package version, or the terms `mod` / `mod0` /
  `num.sv` appear. Only the URL http://www.genomine.org/sva/.
- **No default α, no default B, no recommended permutation count.** Also no leek-2014-style "be" vs "irw" variants,
  no iteratively reweighted SVA — the 2007 algorithm is the two-part procedure above only.
- **No guidance on how many SVs is "too many"**, or on SV-vs-sample-size (degrees-of-freedom exhaustion) tradeoffs,
  beyond the structural bounds K ≤ L ≤ n and the removal of the last *df* zero eigenvalues.
- **No batch-effect vocabulary** (no ComBat, no explicit "batch" adjustment procedure); batch effects appear only
  as an example of EH cited from Lamb et al.
- **No treatment of missing data, normalization method choice, or platform-specific preprocessing** beyond
  "normalized expression matrix" and "analyzed on the log scale."

## 11. Open questions / ambiguities left unresolved

- What α to use for the eigengene permutation test (and what B) is left entirely to the user; the values used in
  the paper's own simulations and applications are never stated.
- The equation as printed, `m̂_1 = ⌊(1 − π̂_0 × m)⌋`, is parenthesized ambiguously against the prose ("estimate the
  number of genes associated with the residual eigengene"); the intended quantity is (1 − π̂₀)·m
  `[summarizer-inferred]`. Reproduced above exactly as published.
- Body text (538) vs Table 1 (563) disagree on the SVA-adjusted time-course gene count at q ≤ 0.05.
- Body text (Chromosome VIII) vs Figure 3B caption (Chromosome VII) disagree on one pivotal locus.
- Results text says genes "200–500" were affected by the unmodeled factor; the Figure 2 caption says "201–500".
- Whether the SVA framework is a genuine generalization of the multiple-testing-dependence problem: "this issue
  requires further investigation."
- Whether decompositions other than SVD would work is raised but not answered.
- How SVA behaves when the unmodeled factor is *very* strongly (or perfectly) confounded with the primary variable
  is not investigated — the robustness study stops at average correlation 0.50.

## 12. Guidance answers

**Q: The SVA algorithm, step by step, in enough detail to re-implement.**
Answered — see §5.3 (detect unmodeled factors: residualize on the primary variable → SVD of **R** → variance-explained
statistic T_k = d_k²/Σd_ℓ² → row-permutation null → p_k = #{T_k^{0b} ≥ T_k}/B → force monotone p → threshold at
user-chosen α) and §5.4 (construct SVs: residual eigengenes **e**_k from **V** → regress **e**_k on every gene →
π̂₀ → m̂₁ genes with smallest p-values → eigengenes of the **reduced ORIGINAL-data matrix X_r** → pick the one
maximally correlated with **e**_k as ĥ_k → include ĥ_k as covariates). All four questions the guidance asked —
how primary signal is removed, how the residual matrix is decomposed, how significant signatures are identified,
how SVs are constructed — are explicitly specified by the paper.

**Q: The role of the full model (`mod`) and the null model (`mod0`); quote the paper's framing.**
Partially answered, and **the terms `mod`/`mod0` never appear** (they are R-package vocabulary, not this paper's).
The paper's equivalent framing is the F-test in the yeast analysis (Materials and Methods, "Linkage analysis of
yeast cross"), verbatim:
> "SVA-adjusted *p-*values were calculated from an *F*-test comparing the full model of genetic association and
> the null model of no association, both models including all significant surrogate variables as additive terms."

That is the paper's only statement of the full-vs-null structure: **the surrogate variables go into *both* models**;
the test is on the primary variable's terms only. The paper never explains "why both are needed" in the abstract —
it simply uses a standard nested-model F-test. In the construct-SV algorithm the analogous object is the model fit
`x_ij = μ_i + f_i(y_j) + e_ij` used to form residuals (that is a *primary-variable* model, not a null model in the
testing sense).

**Q: How the number of surrogate variables is determined (the `num.sv()` question).**
Answered as a *method*, deferred as a *choice*. Method: the permutation/parallel-analysis test of §5.3 (basic form
credited to Buja & Eyuboglu 1992). The number of SVs = the number of eigengenes with p_k ≤ α after forced
monotonicity. **The paper explicitly defers the threshold: "For a user-chosen significance level 0≤α≤1, call
eigengene k a significant signature of residual EH if p_k ≤ α."** No default α, no default B, and no numeric α is
reported for any of the paper's own analyses. Reported outcomes: 14 SVs (yeast), 1 SV (breast cancer), "the top
surrogate variable" used for kidney.

**Q: How are the SVs USED downstream — covariates in the model, or subtracted from the data?**
**Covariates. Unambiguously, in three places, and the subtract-then-test variant is never mentioned.** Verbatim:
> "After the surrogate variables are constructed, they are then incorporated into any subsequent analysis as
> covariates in the usual way." (Results, "Surrogate Variables")

> "(Step 4) Include all significant surrogate variables as covariates in subsequent regression analyses, allowing
> for gene-specific coefficients for each surrogate variable." (Results, "Surrogate Variables")

> "In any subsequent analysis, employ the model x_ij = μ_i + f_i(y_j) + Σ_{k=1}^{K} λ_ki ĥ_kj + e*_ij, which serves
> as an estimate of the ideal model x_ij = μ_i + f_i(y_j) + Σ_{k=1}^{K} λ_ki h_kj + e*_ij." (Materials and Methods,
> "Algorithm to construct surrogate variables", step 8)

The gene-specific coefficient λ_ki is load-bearing: the SV's effect is fit **per gene**, which a subtracted "cleaned
matrix" could not represent (the paper states Step 4 exists "to take into account the fact that a surrogate variable
may have a different effect on each gene"). **Confident silence: the paper nowhere describes producing a cleaned /
SV-subtracted expression matrix, and nowhere tests on one.**

**Q: What happens when the hidden factor is correlated — or perfectly correlated — with the primary variable? Does
the paper say SVs can absorb the biological signal?**
- **Correlated (moderate): the paper says SVA still works, and shows it.** Simulation with average correlation
  **0.50 (sd 0.16)** and overlapping affected genes: single SV correctly identified in **94.5%** of datasets; SV–true-factor
  correlation **0.94 (sd 0.22)**; null p-values correctly Uniform. Verbatim: "Thus, SVA accurately estimates the
  unobserved factor even when there is strong dependence between the primary and unobserved factors, with a subset of
  genes affected by both."
- **Perfectly correlated: the paper is SILENT.** Perfect/complete confounding is never discussed, simulated, or bounded.
- **Does the paper say surrogate variables can absorb the biological signal? NO — not of SVA's own SVs.** It says the
  *opposite* by design (Step 1 exists "to ensure that the surrogate variables indeed estimate EH and not the signal from
  the primary variable"; Step 3 exists "to allow for correlation between the primary variable and the surrogate
  variables"). The **only** signal-absorption statement in the paper is a criticism of the naive full-matrix SVD baseline:
  > "The eigengenes calculated from the entire expression matrix capture the signal due to both the unmodeled factor and
  > the primary variable, which results in biased estimation of the unmodeled factor."

  A skill claim that "surrogate variables can absorb biology if confounded" **is not supported by this paper** — it is not
  stated here, and this paper's stated position under (moderate) confounding is robustness. Any such claim needs a
  different primary source.

**Q: Stated assumptions (orthogonality, linear model, features vs samples).** Answered — §8. Key: n < m; additive linear
model; L ≤ n, K ≤ L; h_k mutually orthogonal but permitted to correlate with the primary variable; log-scale data;
gene-specific coefficients λ_ki.

**Q: What is SVA validated on, and what are the reported gains?** Answered — §6 and Table 1. Simulation (1,000 studies ×
1,000 genes × 20 arrays, plus a real-residual variant) + three microarray datasets: yeast eQTL (Brem), breast cancer BRCA1
vs BRCA2 (Hedenfalk), human kidney aging time course (Rodwell). Gains: correct Uniform null p-values; SV↔true-factor
correlation 0.95 (sd 0.05) / 0.94 (sd 0.22 under confounding); 1,894 vs 1,604 significant *cis*-linkages at FDR 0.05;
116 extra true-positive-consistent genes in the kidney study; more stable gene rankings; less variable π₀/q-value estimates.

**Q: Silence — does it address count/RNA-seq data?** No. Microarray only, log scale. See §10.

**Q: Silence — any numeric threshold for "too much confounding to proceed"?** No. None given. See §10.

**Q: Pin — does it describe software; is a package/version named?** It names an R package location only:
"SVA has been made freely available as an R package at http://www.genomine.org/sva/". **No package name string, no version
number, no function names, no arguments.** R itself is cited as R Development Core Team (2004).
