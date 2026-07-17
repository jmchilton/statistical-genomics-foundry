---
title: "Asymptotic conditional singular value decomposition for high-dimensional genomic data"
type: paper
source_id: leek-2011-asymptotic-csvd
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC3165001/
access_date: "2026-07-13"
license: LicenseRef-all-rights-reserved
attribution: "Leek JT. Asymptotic conditional singular value decomposition for high-dimensional genomic data. Biometrics. 2011;67(2):344–352. doi:10.1111/j.1541-0420.2010.01455.x. PMC3165001 (NIH public-access author manuscript; no Creative Commons grant)."
derived: own-words-summary
tags:
  - domain/batch-effects
---

# Leek 2011 — Asymptotic conditional SVD for high-dimensional genomic data

**Quoting mode: own-words.** PMC3165001 is an NIH-public-access author manuscript with no Creative
Commons grant → all-rights-reserved. No verbatim prose anywhere in this note, including §7.
Equations, estimator formulas, parameter names, thresholds, and numeric results are reproduced
verbatim as facts under the functional-strings exception.

## 1. Citation

- Leek JT (single author; Johns Hopkins Bloomberg School of Public Health).
- "Asymptotic conditional singular value decomposition for high-dimensional genomic data."
- *Biometrics* 2011;67(2):344–352. Published online 2010 Jun 16.
- DOI: 10.1111/j.1541-0420.2010.01455.x
- PMCID: PMC3165001; NIHMSID: NIHMS205251; PMID: 20560929
- Open-access route read: PMC author manuscript, https://pmc.ncbi.nlm.nih.gov/articles/PMC3165001/
- Access date: 2026-07-13
- Keywords the paper lists: False discovery rate, Gene expression, Genomics, High-dimensional,
  Singular value decomposition, Surrogate variables.
- Funding stated: NIH grant R01 HG002913 and an NHGRI Genome Training Grant.

## 2. Access note

Read: the full author-manuscript body — Summary, §1 Introduction, §2 (assumptions, Theorem 1,
Lemma 1), §3 Simulation Results incl. all of Table 1, §4 Practical Estimation, §5 Genomics example
(Corollaries 1–2, Table 2), §6 Discussion, references.

**Not read (boundary):**
- **Supplementary appendices A, B, C** — a separate PDF (`NIHMS205251-supplement-Supp_Data.pdf`,
  533.2 KB) not fetched. Appendix A holds the **proofs** of Theorem 1, Lemma 1, and the corollaries;
  appendix B holds figures 1–8 applying the Hallin & Liska procedure to eight simulated data sets;
  appendix C holds a table of RMSFE values **for all three estimators** (the main text reports RMSFE
  only for the proposed estimator).
- **Figures 1, 2, 3** are images; only their captions and the in-text descriptions were read.
- The author-manuscript text may differ in minor ways from the final published *Biometrics* version.
- Equations were read through an HTML→text conversion; sub/superscript structure was reconstructed
  from that rendering. Formulas below are given as the source renders them, with any rendering
  ambiguity flagged.

## 3. Thesis (one sentence)

Under a conditional factor model for genomic data with a **fixed sample size and a diverging number
of features** (n ≪ m), the right singular vectors of the data matrix are asymptotically consistent
for the unobserved latent factors, and the number of factors r can be consistently estimated by
counting the eigenvalues of a **background-variance-centered** scaled matrix that exceed a
feature-count-dependent threshold.

## 4. Problem & context

- Genomic experiments (gene expression microarrays, SNPs, methylation; the summary also names
  second-generation sequencing as a motivating data type) have far more features than samples.
- The standard model is a conditional factor model: **X**_m = **Γ**_m **G** + **U**_m (equation 1),
  where **X**_m is m × n, **G** is r × n (r < n) fixed factors, **Γ**_m is m × r non-random
  coefficients, **U**_m is m × n mutually independent mean-zero noise.
- SVD / PCA is the usual estimator of the common patterns: the right singular vectors of **X**_m —
  equivalently the eigenvectors of **Z**_m = (1/m) **X**_m^T **X**_m — estimate the column space of
  **G**.
- **The asymptotic gap the paper targets.** Prior asymptotics take the wrong limit for genomics:
  - Anderson (1963), Anderson & Amemiya (1988), Connor & Korajczyk (1993), Paul & Peng (2009):
    fixed number of features, **sample size → ∞**.
  - Bai & Ng (2002), Solo & Heaton (2003), Hallin & Liska (2007): **both** m and n → ∞ at defined
    rates.
  - The paper argues neither assumption is practical when features outnumber samples by orders of
    magnitude; it instead fixes n and lets m → ∞ (the same posture multiple-testing asymptotics take
    as the number of P-values → ∞; Storey 2002, Storey et al. 2004).
- Second motivation: multiple-testing dependence. Leek & Storey (2008) frame dependence via a
  low-dimensional **dependence kernel**, estimated by **surrogate variables**; this paper supplies
  the consistency result for estimating that kernel from residual singular vectors.

## 5. Method / approach

### 5.1 Model and assumptions

Model (1): **X**_m = **Γ**_m **G** + **U**_m, with **u**_j ~ F_m, E(**u**_j) = 0, u_ij mutually
independent; the distribution of u_j is allowed to depend on m. **G** is a fixed matrix of
constants; **Γ**_m is a matrix of non-random constants growing with m.

Assumptions (the paper's numbering — note it labels them "1-3" and then, for the Bai & Ng result,
jumps to items numbered **5** and **6**; there is no assumption 4 in the text):

1. 0 < E(u_ij^4) ≤ B, and hence 0 < var(u_ij) = σ_i² ≤ B* by Liapounov's inequality.
2. lim_{m→∞} ‖ (1/m) **G**^T **Γ**_m^T **Γ**_m **G** − **G**^T **Δ** **G** ‖_F = 0, where **Δ** is
   positive definite and ‖·‖_F is the Frobenius norm.
3. **G**^T **Δ** **G** has eigenvalues λ₁ > … > λ_r > λ_{r+1} = … = λ_n = 0.

The paper says these define a flexible class of distributions covering most continuous
high-dimensional data (e.g. log-transformed microarray data commonly assumed normal, citing
Konishi 2004), and that a small number of influential factors (batch, key environmental/genetic
factors) affect many features at once.

Note on the paper's own convention: it defines the **Frobenius norm as the sum of the squared
elements** of a matrix (not the square root of that sum) — stated twice, in §2.2 and §3.

### 5.2 The centered matrix **W**_m (the "conditional"/centering step)

Instead of the raw **Z**_m = (1/m) **X**_m^T **X**_m, the method uses a matrix centered by an
estimate of the average background (feature-specific) variance:

```
W_m       = (1/m) X_m^T X_m − σ̂²_ave · I
σ̂²_ave    = (1 / (m(n − κ))) ‖ X_m − Γ̂_κm V_κ(Z_m) ‖_F
          = (1/m) Σ_{i=1..m} [ 1/(n − κ) Σ_j ( x_ij − Σ_{k=1..κ} γ̂_ikm v_kj(Z_m) )² ]
```

where:
- `I` is the n × n identity;
- `V_κ(Z_m) = {v₁(Z_m), …, v_κ(Z_m)}` are the first κ eigenvectors of **Z**_m;
- `Γ̂_κm` are least-squares estimates from regressing **X**_m on `V_κ(Z_m)`;
- **`κ > r` is required** (κ must exceed the true dimension).

Purpose of centering, as stated: it makes the eigenvalues corresponding to background noise converge
to zero. Without centering, those eigenvalues converge to the unknown average of the feature-specific
variances, and any eigenvalue threshold would then have to depend on those unknown row-wise variances.
Centering is **necessary for convergence of the eigenvalues** but **not required** for almost-sure
convergence of the eigenvectors.

### 5.3 Theorem 1 — consistency

Under model (1) and assumptions 1–3, as m → ∞ with n fixed:

```
λ_j(W_m) →a.s. λ_j(G^T Δ G),  j = 1, …, n
v_j(W_m) →a.s. v_j(G^T Δ G),  j = 1, …, r
```

Corollary stated in text: the first r right singular vectors of **X** are consistent for the first r
eigenvectors of **G**^T **Δ** **G**, which span the same column space as **G**. Proof is in
supplementary appendix A (not read).

### 5.4 Lemma 1 — the rank criterion (this is the "leek" estimator)

Under model (1), assumptions 1–3, n fixed:

```
1{ λ_k(W_m) ≥ c_m } →P 1   for k = 1, …, r
1{ λ_k(W_m) ≥ c_m } →P 0   for k = r+1, …, n
provided c_m = O(m^(−η)),  0 < η < 1/2
```

Hence the estimator:

```
r̂ = Σ_{k=1..n} 1{ λ_k(W_m) ≥ c_m }
```

**The rank criterion is a thresholded eigenvalue count** — the number of eigenvalues of the centered
matrix **W**_m exceeding a threshold that shrinks with the number of features. **It is not a
permutation test and involves no P-value.**

The estimator is scale-ambiguous by design: §4 states the consistency result also holds with `c_m`
replaced by `a × c_m` for any fixed positive constant `a`. In the limit `a` is irrelevant; in real
examples the paper says the choice of `a` **can be critical**, and that both Bai & Ng (2002) and
this paper's estimator suffer from this limitation.

### 5.5 Practical selection of the number of factors (§4) — the Hallin & Liska stability rule

The paper's own practical procedure for real data is **borrowed from Hallin & Liska (2007)**, not a
permutation test:

1. Compute r̂ using the threshold `a × m^(−η)` over a **range of values of `a`**, and over an
   increasing nested sequence of feature subsets S₁ ⊂ S₂ ⊂ S₃ … ⊂ {1, …, m}.
2. For each `a`, compute the empirical variance of r̂ across subset sizes:
   `σ̂²(a) = (1/ℓ) Σ_{i=1..ℓ} ( r̂(a, S_i) − r̄(a, ·) )²`, with `r̄(a, ·) = (1/ℓ) Σ_i r̂(a, S_i)`.
3. Plot r̂ (full data set) and σ̂²(a) against `a`.
4. Take r̂ at the **second "stability interval"** — the second place, moving left to right, where the
   variance of the estimate reaches a trough.

Stated guidance on η: any 0 < η < 1/2 can be used; values near the middle of the range avoid
potential biases due to a small number of features.

Worked example (Figure 1): simulated data with 1000 genes, 20 arrays, r = 3, η = 1/3 → the estimate
at the second stability point is r̂ = 3. Supplementary appendix B applies it to eight simulated data
sets; for r = 3, 5, 10 the paper says the approach produces a clear and correct estimate.

### 5.6 The comparator estimators, as this paper describes them

> **Label: these are THIS PAPER's descriptions of other authors' methods, in this paper's own terms —
> not the originals.** Buja & Eyuboglu (1992), *Multivariate Behavioral Research* 27:509–40,
> "Remarks on parallel analysis," is the primary for the permutation method and was not read here.

**Buja & Eyuboglu (1992) — the permutation / parallel-analysis estimator (r̂_be).** As described in
§3 of this paper:

1. Compute the singular values of the matrix **X**.
2. **Permute each row of the matrix individually**, which breaks structure across rows.
3. For each permutation, recompute the singular values of the permuted matrix.
4. Compare the **ordered observed** singular values to the **ordered permuted** singular values to
   obtain a **P-value for each right singular vector**.
5. `r̂_be` = the number of P-values **less than the Bonferroni-corrected 0.05 significance level**.

The paper also places it in the broader class of methods for choosing dimension alongside graphical
scree plots and percent-of-variance-explained heuristics (Hastie et al. 2001; Jolliffe 2002).

**Bai & Ng (2002) — the econometric information-criterion estimator (r̂_bn).** As described in §2.3.
It requires assumptions 1–3 **plus** two more (the paper's numbering, 5 and 6):

- 5. E[u_ij^8] ≤ B³
- 6. lim_{n→∞} (1/n) Σ_{j=1..n} g_j^T g_j = **Δ_G**, with **Δ_G** positive definite.

and is consistent as **both** m → ∞ and n → ∞. The estimator as the paper writes it:

```
r̂_bn = argmax_k  log( ‖ X_m − Γ̂_km V_k(Z_m) ‖_F ) + k · ((m + n)/(mn)) · log( mn/(m + n) )
```

with `V_κ(Z_m)` the first κ eigenvectors of **Z**_m and `Γ̂_km` the least-squares estimates from
regressing **X** on `V_k(Z_m)`. (The manuscript renders this as `argmax`; a penalized
goodness-of-fit criterion of this form is more usually minimized — flagging as a possible
rendering/typographic issue in the source, **not** correcting it. `[summarizer-inferred]` caveat
only; the paper says `argmax`.)

The paper's own framing of why it includes Bai & Ng: it is useful for econometric data where both m
and n are large, and the comparison is meant **only** to illustrate that estimators aimed at n ≪ m
are needed.

### 5.7 Simulation design (§3)

- Data simulated from model (1). Elements of **U** drawn from **N(0, 1)**.
- Elements of **G** drawn from **Bernoulli(0.5)** (chosen because factors are commonly thought of as
  dichotomous). The paper reports the qualitative behavior is nearly identical when **G** is
  simulated from a normal distribution.
- Dimensions: **m = 1000, 5000, 10000**; **n = 10, 20, 100** — stated as typical gene and array
  counts for a microarray experiment.
- True number of factors: **r = 3, 5, 10, 18**.
- **100 simulated data sets per parameter combination.** Mean and s.d. of each estimate reported.
- Tuning of the proposed estimator in the simulations: **c_m = n · m^(−1/3)** (i.e. **η = 1/3** and
  **a = n**), and **κ = n**. Stated rationale: η near the center of (0, 1/2) to avoid small-sample
  biases; κ set to the sample size because κ must exceed the column dimension of **G** and in
  practice that dimension is unknown.
- Accuracy of the singular-vector estimates measured by **RMSFE** (root mean square Frobenius error):

```
RMSFE{G, V_r̂(W_m)} = { ‖ G − B̂ V_r̂(W_m) ‖_F + ‖ V_r̂(W_m) − Â G ‖_F } / (n · r)
```

  where B̂ regresses **G** on V_r̂(W_m), Â regresses V_r̂(W_m) on **G**. RMSFE = 0 iff **G** spans
  exactly the same linear space as V_r̂(W_m). Both terms are included so that RMSFE is non-zero
  whenever r̂ ≠ r.

### 5.8 Application to genomics (§5)

Extension of the theory to the case where a primary model **S** is being tested (the surrogate-variable
setting):

- Model (2): **X**_m = **B**_m **S** + **E**_m, with **S** a d × n design matrix and errors dependent
  across features.
- Leek & Storey (2008) decomposition, model (3): **X**_m = **B**_m **S** + **Γ**_m **G** + **U**_m,
  with **U** independent across rows. **G** is the **dependence kernel**; including it yields
  independent parameter estimates and inference across features.

**Corollary 1.** If **G** is **orthogonal to S**, take residuals `R_m = X_m − B̂_m S` from the
least-squares fit of model (2), and form:

```
W_Rm    = R_m^T R_m − σ̂²_ave · P_S
P_S     = I − S^T (S S^T)^(−1) S
σ̂²_ave  = (1 / (m(n − κ − d))) ‖ X_m − Γ̂_κm V_(κ+d)(Z_m) ‖_F ,   κ > r
```

Then λ_j(W_Rm) →a.s. λ_j(**G**^T **Δ G**) for j = 1..n, and v_j(W_Rm) →a.s. v_j(**G**^T **Δ G**) for
j = 1..r. I.e. the first r right singular vectors of the **residual** matrix consistently estimate
the dependence kernel as m → ∞.

**Corollary 2.** Same thresholded-eigenvalue rank estimator applied to W_Rm:
`r̂ = Σ_{k=1..n} 1{ λ_k(W_Rm) ≥ c_m }`, with `c_m = O(m^(−η))`, `0 < η < 1/2`.

**Data set: Johnson et al. (2007) microarray study.** Nitric-oxide (NO) exposure vs. control,
sampled at transcription inhibition (time 0) and 7.5 hours later; **21,171 genes**; 12 samples.
Table 2 shows the design: treatments C/C/NO/NO repeating, times 0/7.5 alternating, **batch 1 for
samples 1–4, batch 2 for samples 5–8, batch 3 for samples 9–12** — batch and biological group are
balanced and orthogonal. (Note: the §5 text says the measurement was carried out **in two batches**
and refers to Table 1 for the sample description, while **Table 2** actually gives the sample
description and shows **three** batch levels; recorded as a source inconsistency, see §11.)

Three analyses, each testing the treatment×time interaction per gene with a Wald test:
- Model (4): naive — intercept, NO indicator, time indicator, interaction. No batch.
- Model (5): adds indicators for batch 1 and batch 2.
- Model (6): adds eigenvectors v₁(W_Rm), v₂(W_Rm), v₃(W_Rm) of the residual matrix instead of batch.

## 6. Key claims / findings

**Theory**
- Under model (1) + assumptions 1–3, with **n fixed and m → ∞**, eigenvalues of **W**_m converge
  almost surely to the eigenvalues of **G**^T **Δ G** (all j = 1..n), and eigenvectors converge for
  j = 1..r (Theorem 1). Convergence of eigenvectors requires the eigenvalues to be **unique** (the
  distinct-eigenvalue condition in assumption 3).
- Centering by σ̂²_ave is what makes the eigenvalue threshold **not depend on the unknown row-wise
  variances**; without it, noise eigenvalues converge to the unknown average feature variance
  (Lemma 1 discussion).
- The thresholded count r̂ = Σ 1{λ_k(W_m) ≥ c_m} is consistent for r for any c_m = O(m^(−η)) with
  0 < η < 1/2 (Lemma 1), and remains consistent under any fixed positive rescaling `a × c_m` (§4).

**Simulation — the estimator comparison (Table 1).** *See the provenance caveat below before using
any of this comparatively.* Reported as mean (s.d.) over 100 data sets, true r vs. r̂ (proposed),
r̂_bn (Bai & Ng), r̂_be (Buja & Eyuboglu); last column RMSFE for the **proposed** estimator's
eigenvectors × 10⁵:

| (m, n) | r | r̂ (proposed) | r̂_bn | r̂_be | RMSFE ×10⁵ |
|---|---|---|---|---|---|
| (1000,10) | 3 | 2.87 (0.34) | 2.40 (0.57) | 2.74 (0.44) | 403.84 (773.88) |
| (5000,10) | 3 | 2.95 (0.22) | 2.21 (0.43) | 2.68 (0.47) | 78.44 (271.25) |
| (10000,10) | 3 | 2.94 (0.24) | 2.24 (0.51) | 2.69 (0.46) | 50.18 (215.60) |
| (1000,20) | 3 | 3.00 (0.00) | 2.87 (0.33) | 2.99 (0.10) | 109.77 (23.18) |
| (5000,20) | 3 | 3.00 (0.00) | 2.90 (0.30) | 3.00 (0.00) | 22.49 (4.67) |
| (10000,20) | 3 | 3.00 (0.00) | 2.96 (0.20) | 3.00 (0.00) | 10.42 (2.22) |
| (1000,100) | 3 | 3.00 (0.00) | 3.00 (0.00) | 3.00 (0.00) | 101.24 (7.29) |
| (5000,100) | 3 | 3.00 (0.00) | 3.00 (0.00) | 3.00 (0.00) | 20.26 (1.57) |
| (10000,100) | 3 | 3.00 (0.00) | 3.00 (0.00) | 3.00 (0.00) | 10.11 (0.82) |
| (1000,10) | 5 | 4.20 (0.56) | 3.21 (0.57) | 3.18 (0.52) | 822.46 (624.17) |
| (5000,10) | 5 | 4.62 (0.49) | 3.21 (0.62) | 3.25 (0.56) | 224.48 (309.48) |
| (10000,10) | 5 | 4.77 (0.42) | 3.38 (0.53) | 3.37 (0.51) | 129.70 (245.14) |
| (1000,20) | 5 | 4.79 (0.41) | 4.33 (0.51) | 4.75 (0.44) | 395.34 (591.32) |
| (5000,20) | 5 | 4.97 (0.17) | 4.36 (0.50) | 4.86 (0.35) | 46.95 (151.17) |
| (10000,20) | 5 | 4.99 (0.10) | 4.47 (0.50) | 4.86 (0.35) | 18.00 (78.65) |
| (1000,100) | 5 | 5.00 (0.00) | 5.00 (0.00) | 5.00 (0.00) | 99.65 (7.22) |
| (5000,100) | 5 | 5.00 (0.00) | 5.00 (0.00) | 5.00 (0.00) | 20.11 (1.31) |
| (10000,100) | 5 | 5.00 (0.00) | 5.00 (0.00) | 5.00 (0.00) | 10.10 (0.63) |
| (1000,20) | 10 | 7.97 (0.58) | 7.32 (0.65) | 6.35 (0.74) | 1108.28 (435.75) |
| (5000,20) | 10 | 9.18 (0.66) | 7.38 (0.60) | 6.62 (0.56) | 297.95 (245.09) |
| (10000,20) | 10 | 9.35 (0.52) | 7.41 (0.55) | 6.65 (0.58) | 198.12 (164.99) |
| (1000,100) | 10 | 10.00 (0.00) | 10.00 (0.00) | 10.00 (0.00) | 96.40 (5.31) |
| (5000,100) | 10 | 10.00 (0.00) | 10.00 (0.00) | 10.00 (0.00) | 19.30 (1.06) |
| (10000,100) | 10 | 10.00 (0.00) | 10.00 (0.00) | 10.00 (0.00) | 9.60 (0.44) |
| (1000,20) | 18 | 11.71 (0.62) | 10.98 (0.64) | 7.12 (0.71) | 1148.48 (273.08) |
| (5000,20) | 18 | 13.22 (0.60) | 11.00 (0.67) | 7.39 (0.60) | 497.17 (144.31) |
| (10000,20) | 18 | 13.86 (0.62) | 11.00 (0.64) | 7.46 (0.61) | 336.51 (104.66) |
| (1000,100) | 18 | 17.57 (0.56) | 18.00 (0.00) | 17.98 (0.14) | 314.30 (293.42) |
| (5000,100) | 18 | 18.00 (0.00) | 18.00 (0.00) | 18.00 (0.00) | 17.88 (0.74) |
| (10000,100) | 18 | 18.00 (0.00) | 18.00 (0.00) | 18.00 (0.00) | 8.88 (0.34) |

(Note: the r = 10 and r = 18 blocks in Table 1 have **no n = 10 rows** — only n = 20 and n = 100.)

> ### PROVENANCE — attach to every comparative claim above and below
> **This is the author of the proposed ("leek") estimator evaluating his own estimator against the
> alternatives, on his own simulations, with his own tuning choices (η = 1/3, a = n, κ = n) and his
> own data-generating model (Gaussian noise, Bernoulli factors, no dependence across features beyond
> the factors).** Every comparative number and every comparative sentence below is **the paper's
> claim about its own method**. It is **not** a neutral benchmark and **not** a decision rule for
> choosing an estimator in practice.

**Comparative claims, attributed to the paper (§3):**
- The paper claims the Lemma-1 estimator performs **as well as or better than** either Bai & Ng
  (2002) or the permutation approach of Buja & Eyuboglu (1992) across the reported grid.
- The paper says the **Buja & Eyuboglu estimator is relatively accurate across the range of
  dimensions presented**, but that **it underestimates r compared to the proposed approach**. (Note
  the direction of the stated deficiency: **underestimation**, not overestimation.) The r̂_be entries
  in Table 1 are below the truth in every row where any estimator misses, and the gap widens with
  larger r at small n (e.g. true r = 18, (m,n) = (10000,20): r̂_be = 7.46 vs. r̂ = 13.86 vs.
  r̂_bn = 11.00).
- The paper says it is **not surprising** that Bai & Ng behaves poorly when n ≪ m, because it was
  designed for (m, n) → ∞; and it states the comparison is meant **only** to illustrate that
  estimators focused on n ≪ m are needed. Bai & Ng performs best at n = 100 and for smaller numbers
  of factors.
- At n = 100, **all three estimators** hit the truth exactly (s.d. 0.00) for r = 3, 5, 10, and for
  r = 18 at m = 5000, 10000.
- For the near-saturated case r = 18, n = 20, the paper says the proposed estimator performs
  **slightly better** than either comparator, but that **all** approaches consistently **underestimate**
  the true number of factors.
- None of the approaches is designed for r > n, since there are at most n right singular vectors.

**Singular-vector accuracy**
- The paper says dimension selection plus singular-vector estimation is accurate even at the smallest
  feature count (m = 1000), with small RMSFE, and accuracy steadily increases as m grows.
- It states (referring to supplementary appendix C, not read) that **accurately estimating r has a
  large impact on RMSFE**, and that for small samples the proposed estimator produces much smaller
  RMSFE values.

**Genomics application (Johnson et al. 2007 data)**
- Naive model (4): P-values are **stochastically greater than uniform** (Figure 2a) — the paper cites
  Leek & Storey (2007) that this may be caused by unmodeled factors affecting thousands of genes.
  Residual pairwise correlation over a random 1,000-gene subset: mean (s.d.) = **0.08 (0.45)**,
  significantly greater than zero.
- Batch-adjusted model (5): P-value histogram takes the expected mixed form (Figure 2b), **but the
  residual pairwise correlation is still 0.08 (0.51)** — essentially unchanged from ignoring batch.
  This is the paper's central empirical point: **including the measured batch variable did not remove
  the inter-gene dependence.**
- Applying Corollary 2 + the Hallin & Liska procedure gives **r̂ = 3**. Adjusted multiple R² for
  regressing the two true batch components on the estimated eigenvectors: **0.92 and 0.97**.
  Correlations between true batch indicators and fitted values (Figure 3 caption): **0.72** and
  **0.79**.
- Eigenvector-adjusted model (6): residual mean (s.d.) pairwise correlation among genes drops to
  **6.24 × 10⁻³ (0.46)** — much smaller than either the naive analysis or the measured-batch analysis.
- Correlation between batch-adjusted P-values and eigenvector-adjusted P-values: **0.90**.
- Estimated proportion of true null tests: **0.95** unadjusted, **0.68** batch-adjusted, **0.52**
  eigenvector-adjusted.
- The paper's conclusion from this: the eigenvectors capture the dependent variation due to batch
  **and** other unmodeled sources of dependence, because batch is only a surrogate for the truly
  important unmeasured confounders.

## 7. Load-bearing statements (own-words paraphrase — no verbatim prose, per license)

1. **On what the proposed rank criterion actually is** (§2.3, Lemma 1): because the eigenvalues of
   the centered matrix **W**_m converge almost surely to those of **G**^T **Δ G**, whose count of
   non-zero eigenvalues is the dimension of the column space of **G**, one could estimate r by
   counting non-zero eigenvalues — but at finite sample size they never land exactly on zero, so the
   paper instead counts the eigenvalues exceeding a threshold that depends on the number of features
   m. *(Own-words paraphrase. The estimator formula `r̂ = Σ_{k=1..n} 1{λ_k(W_m) ≥ c_m}` and the
   threshold condition `c_m = O(m^(−η)), 0 < η < 1/2` are reproduced verbatim as functional strings.)*

2. **On the paper's description of Buja & Eyuboglu (1992)** (§3): the BE procedure computes the
   singular values of **X**, permutes each row of the matrix on its own to destroy across-row
   structure, recomputes singular values for each permutation, and compares the ordered observed
   singular values against the ordered permuted ones to get a per-right-singular-vector P-value; the
   BE estimate of the number of factors is the count of P-values falling below the Bonferroni-corrected
   0.05 level. *(Own-words paraphrase of this paper's account of someone else's method. The functional
   facts — per-row permutation, ordered-vs-ordered comparison, one P-value per right singular vector,
   Bonferroni-corrected 0.05 — are the paper's.)*

3. **On the comparison verdict, with provenance** (§3, Table 1 discussion): the paper states its own
   Lemma-1 estimator does as well as or better than both comparators; it characterizes the Buja &
   Eyuboglu permutation estimator as relatively accurate across the dimensions tested **but
   underestimating r relative to the proposed method**; and it says the Bai & Ng comparison exists
   only to show that n ≪ m needs its own estimator. *(Own-words paraphrase. This is the method's
   author grading his own method — see the provenance box in §6.)*

4. **On the tuning constant being critical in practice** (§4): the consistency of Lemma 1 survives
   multiplying the threshold by any fixed positive constant `a`; asymptotically `a` washes out, but
   on real data the paper says the choice of `a` can be critical, and it names this as a limitation
   shared with Bai & Ng (2002). *(Own-words paraphrase.)*

5. **On the orthogonality requirement for the surrogate-variable corollary** (§5, after Corollary 1):
   the paper calls the requirement that **G** be orthogonal to **S** a **strong** requirement, then
   lists special cases where it may hold exactly or approximately — a balanced design (as in the
   worked example, where batch and biological group are balanced), designs deliberately built so
   technical factors are orthogonal to the group variable, randomized studies (approximate
   orthogonality), and genetic-plus-expression studies where randomized allele inheritance makes
   genetic variation approximately orthogonal to group differences. *(Own-words paraphrase.)*

## 8. Stated scope, assumptions, limitations (the source's own caveats)

- **Fixed n, m → ∞.** All results are conditional on a fixed **G** as the number of features grows.
  The theory is not an (m, n) → ∞ result.
- **Continuous data only.** The paper says its assumptions describe a flexible class of **continuous**
  distributions covering most quantitative high-throughput data. The Discussion names **binary data**
  (common in high-throughput genetic experiments) as an **open avenue for future research** — the
  asymptotics are not established there.
- **Independent noise.** Model (1) requires the u_ij to be mutually independent (mean zero, bounded
  fourth moment).
- **Distinct eigenvalues.** Eigenvector consistency holds for eigenvectors corresponding to **unique**
  eigenvalues (assumption 3 imposes λ₁ > … > λ_r strictly).
- **κ > r.** The variance-estimation step requires κ to exceed the true dimension; in simulations the
  paper sets κ = n precisely because r is unknown in practice.
- **The constant `a` matters in finite samples**, and this is an acknowledged limitation shared with
  Bai & Ng (§4).
- **r > n is out of scope** for all three estimators (at most n right singular vectors exist).
- **Orthogonality of G and S is strong** (Corollary 1) — the surrogate-variable consistency result is
  conditional on it.
- The r = 18, n = 20 case is offered as an indication of behavior when the number of unmodeled
  factors nearly matches the sample size; the paper reports **all** estimators underestimate there.
- Proofs are deferred to supplementary appendix A.

## 9. Failure modes / invalidity patterns

Faithful to the source:

- **Failing to center → threshold becomes unusable.** Without centering **Z**_m by σ̂²_ave, the
  eigenvalues corresponding to the zero eigenvalues of **G**^T **Δ G** converge to the unknown
  average of the feature-specific variances rather than to zero, so the indicator threshold in
  Lemma 1 would have to depend on unknown row-wise variances (§2.2, §2.3). Centering is necessary for
  **eigenvalue** convergence; eigenvector convergence does not need it.
- **Choosing an estimator built for the wrong asymptotic regime.** The paper's stated explanation of
  Bai & Ng's poor performance at small n: it was designed for (m, n) → ∞. This is the paper's named
  mechanism for one estimator failing on genomic-shaped data.
- **r approaching n → systematic underestimation.** At r = 18, n = 20, the paper reports **all three**
  estimators consistently underestimate r. There is no detector offered for this — the true r is
  known only in the simulation.
- **r > n → no estimator applies** (at most n right singular vectors exist).
- **Diagnostic symptom named for unmodeled dependence: P-values stochastically greater than uniform.**
  In the Johnson et al. data, the unadjusted analysis produced a P-value histogram shifted toward 1
  (Figure 2a); the paper (citing Leek & Storey 2007) attributes this to unmodeled factors influencing
  thousands of genes. This is the paper's named symptom that a latent factor is present.
- **Diagnostic symptom named for residual dependence after adjustment: nonzero mean pairwise
  correlation among residuals.** Naive: 0.08 (0.45). **Measured-batch-adjusted: still 0.08 (0.51)** —
  i.e. the paper's demonstration that **adjusting for the measured batch variable can leave the
  dependence essentially untouched**, a failure mode of the standard approach. Eigenvector-adjusted:
  6.24 × 10⁻³ (0.46).
- **Violated orthogonality (G not ⊥ S)** invalidates Corollary 1 — the residual-SVD estimator of the
  dependence kernel is only shown consistent under orthogonality. The paper flags this as strong but
  does **not** state what happens when it fails, and offers **no detector** for the violation.
- **The tuning constant `a`** is the named finite-sample weak point of the proposed estimator (§4);
  the Hallin & Liska stability-interval plot is the paper's remedy, not a test.

`[summarizer-inferred]` — nothing beyond the above is asserted as a failure mode; the paper names no
error message, no numeric diagnostic range, and no formal test for any of these.

## 10. What the source does NOT address (confident silences)

- **NO rule for when to prefer one estimator over another in practice.** See §12 — this is the
  headline silence.
- **NO permutation-based procedure for its own estimator.** The paper's method is a thresholded
  eigenvalue count plus the Hallin & Liska stability-interval choice of `a`. It never proposes
  permutation, P-values, or a significance level **for its own estimator**. The only P-values and
  the only significance level (Bonferroni-corrected 0.05) in the estimator discussion belong to the
  **Buja & Eyuboglu** method it is describing.
- **NO permutation count.** The paper does not state how many permutations Buja & Eyuboglu use, or
  how many it used when running r̂_be in its simulations. **No `B` and no B = 20 anywhere.**
- **NO p ≤ 0.10 cutoff, and no cutoff of any kind for its own procedure.** The only cutoff stated is
  BE's Bonferroni-corrected 0.05. Any 0.10 threshold is **not from this paper.**
- **NO count / RNA-seq data.** The Summary names "second generation sequencing" only as motivation
  in its opening sentence; every assumption, simulation, and analysis is **continuous data**
  (Gaussian noise) and the sole real data set is a **microarray** experiment (Johnson et al. 2007,
  21,171 genes). No count model, no negative binomial, no normalization for library size, no
  discrete-data asymptotics. The Discussion explicitly lists binary-data asymptotics as **future
  work**.
- **NO software, package, function name, or code.** The paper names no implementation. It does not
  mention `sva`, `num.sv`, or any R function; there is no name "be" or "leek" for the estimators here
  — the paper calls them r̂_be (Buja & Eyuboglu 1992), r̂_bn (Bai & Ng 2002), and r̂ (proposed).
- **NO default value of `a`** for real data — only the simulation choice a = n (via c_m = n·m^(−1/3))
  and the instruction to sweep `a` and read the second stability interval.
- **NO default value of η** for real data beyond "any 0 < η < 1/2, values near the middle avoid
  small-feature-count biases"; simulations and the Figure-1 example both use η = 1/3.
- **NO guidance on how many nested feature subsets S₁ ⊂ … ⊂ S_ℓ to use**, how to choose them, or how
  large ℓ should be, in the Hallin & Liska procedure.
- **NO computational-cost comparison** between the estimators.
- **NO treatment of the case where G is correlated (non-orthogonal) with S** — the actual common case
  in observational genomics.
- **NO discussion of what happens when the factors are unbalanced, sparse, or affect only a small
  fraction of features** — the simulated **Γ**_m carries signal on all features via a dense factor
  model.
- **NO recommendation on standardizing / scaling features before the decomposition.**

## 11. Open questions / ambiguities the source leaves unresolved

- **Assumption numbering skips 4.** Assumptions are listed 1–3, then the Bai & Ng extras are numbered
  5 and 6. There is no assumption 4 in the text read.
- **`argmax` in the Bai & Ng formula.** The manuscript writes `r̂_bn = argmax_k …` for a
  log-fit-plus-penalty criterion. Recorded as written; flagged as a possible source typo, not
  corrected.
- **Batch count in §5 is internally inconsistent.** The prose says the measurement was carried out
  **in two batches** and points to "Table 1" for the sample description; the actual sample-description
  table is **Table 2** and shows **three** batch levels (samples 1–4 batch 1, 5–8 batch 2, 9–12 batch 3).
  Model (5) includes indicators for batch 1 and batch 2 (consistent with three levels and a reference
  category). The "two batches" statement and the Table 1 cross-reference appear to be errors in the
  manuscript.
- **r̂ = 3 vs. "the first two eigenvectors".** §5 reports the Hallin & Liska procedure yields
  **r̂ = 3**, then says the estimate of the linear space of **G** is computed as the **first two**
  eigenvectors of W_Rm, and Figure 2's caption says the adjusted analysis used **v₁ and v₂** — yet
  model (6) as written includes **v₁, v₂, and v₃**. The number of eigenvectors actually used in the
  reported adjustment is ambiguous in the manuscript.
- **Frobenius norm defined as the sum of squared elements** (no square root) — used consistently in
  σ̂²_ave, the Bai & Ng criterion, and the RMSFE. Anyone re-implementing must adopt this convention
  or the scale of σ̂²_ave and RMSFE will differ.
- **How r̂_be was actually run** in the simulations (permutation count, tie handling, whether the
  Bonferroni correction was over n tests) is not specified.
- **How to detect that the estimated r is too low** in real data — the paper shows all estimators
  underestimate when r nears n, but gives no diagnostic to notice it without the truth.

## 12. Guidance answers

**Q. The proposed ("leek") method — what is it, step by step, in enough detail to re-implement?**
Answered in full: §5.2–5.5 above. To re-implement:
1. Form `Z_m = (1/m) X_m^T X_m`; take its first κ eigenvectors `V_κ(Z_m)` (κ > r; the paper uses
   κ = n).
2. Regress `X_m` on `V_κ(Z_m)` (least squares) → `Γ̂_κm`; compute
   `σ̂²_ave = (1/(m(n−κ))) ‖X_m − Γ̂_κm V_κ(Z_m)‖_F` (Frobenius norm = **sum of squared elements**).
3. Form `W_m = (1/m) X_m^T X_m − σ̂²_ave I` and take its eigenvalues λ_k(W_m).
4. **Rank criterion:** `r̂ = Σ_{k=1..n} 1{ λ_k(W_m) ≥ c_m }` with `c_m = a · m^(−η)`,
   `0 < η < 1/2`. Simulations use `c_m = n · m^(−1/3)` (a = n, η = 1/3).
5. **In practice** the paper says to choose `a` by the Hallin & Liska (2007) rule: sweep `a`, compute
   r̂ over nested feature subsets, plot r̂ and its across-subset variance vs. `a`, and take r̂ at the
   **second variance trough (second stability interval)**.
**What is estimated:** the number of non-zero eigenvalues of **G**^T **Δ G** = the dimension of the
column space of **G**. **Under what asymptotics:** **n fixed, m → ∞** (features diverge, sample size
does not). **Rank criterion:** a **thresholded eigenvalue count on the background-variance-centered
matrix** — **not** a permutation test, **not** a P-value.
For the residual/surrogate-variable version (Corollary 1–2), swap **W**_m for
`W_Rm = R_m^T R_m − σ̂²_ave P_S`, `P_S = I − S^T(SS^T)^(−1)S`,
`σ̂²_ave = (1/(m(n−κ−d))) ‖X_m − Γ̂_κm V_(κ+d)(Z_m)‖_F` — valid **only if G ⊥ S**.

**Q. The comparator ("be" — Buja & Eyuboglu 1992): how does this paper DESCRIBE it?**
Answered: §5.6 and §7 item 2 above. Per-row permutation of **X** → recompute singular values →
compare **ordered observed** vs. **ordered permuted** singular values → one P-value per right
singular vector → r̂_be = count of P-values below the **Bonferroni-corrected 0.05** level.
**This is this paper's description of someone else's method, in this paper's own terms, not the
original.** The original (Buja & Eyuboglu 1992, *Multivariate Behavioral Research* 27:509–40,
"Remarks on parallel analysis," doi:10.1207/s15327906mbr2704_2) was not read. **The paper does not
state the permutation count**, does not say whether the P-value is one-sided, does not describe the
null distribution beyond "ordered permuted singular values," and does not say over how many tests the
Bonferroni correction is applied.

**Q. Assumptions each method requires, and the regimes where each is claimed to hold.**
- **Proposed (leek):** assumptions 1–3 (bounded 4th moment / independent mean-zero noise; the
  Frobenius-limit condition on (1/m)**G**ᵀ**Γ**ᵀ**ΓG**; strictly ordered non-zero eigenvalues). Regime:
  **n fixed, m → ∞** — explicitly aimed at n ≪ m. Requires κ > r.
- **Bai & Ng (bn):** assumptions 1–3 **plus** E[u_ij^8] ≤ B³ and
  lim_{n→∞}(1/n)Σ g_jᵀg_j = **Δ_G** positive definite. Regime: **both m → ∞ and n → ∞** at defined
  rates. The paper says this is appropriate for econometric data, not for n ≪ m genomics.
- **Buja & Eyuboglu (be):** **the paper states NO assumptions for it and NO regime in which it is
  proven to hold.** It is introduced purely descriptively as a permutation hypothesis test and is
  never given a consistency claim, a required assumption set, or an asymptotic regime anywhere in the
  text read. This is a silence.
- **Signal strength:** no method is characterized in terms of a signal-strength regime; the paper
  varies only (m, n, r).

**Q. The simulation comparing the estimators — setup, dimensions, signal, replicates, accuracy.**
Answered: §5.7 (setup) and §6 (full Table 1). Recap: Gaussian N(0,1) noise; **G** ~ Bernoulli(0.5)
(normal **G** reported to give nearly identical qualitative behavior); m ∈ {1000, 5000, 10000};
n ∈ {10, 20, 100}; r ∈ {3, 5, 10, 18}; **100 replicate data sets per cell**; proposed estimator
tuned at c_m = n·m^(−1/3), κ = n. Every reported number is in the Table-1 reproduction in §6.

**PROVENANCE, restated as instructed:** every comparative claim above is **the author of the
proposed estimator evaluating his own estimator against the alternatives on his own simulations**.
The paper's stated verdict — that its own estimator does as well as or better than both comparators,
and that **Buja & Eyuboglu underestimates r relative to the proposed approach** — is **the paper's
claim about its own method**. It is not a neutral benchmark and must not be used as a decision rule.

**Q. Does the paper give any rule for WHEN to prefer one estimator over the other in practice?**
**NO. This is a confident silence, and it is complete.** The paper:
- states no criterion — sample size, feature count, expected r, data type, or otherwise — under which
  a practitioner should choose the permutation estimator over the proposed one, or vice versa;
- offers no decision tree, no rule of thumb, no "use X when n < …";
- frames the Bai & Ng comparison as existing **only** to motivate that n ≪ m needs its own estimator,
  not to guide a choice between available estimators;
- and simply advocates its own estimator throughout §3, §4, and §6.
The only selection guidance anywhere in the paper is **within** its own method: how to choose the
tuning constant `a` (Hallin & Liska stability intervals) and η (any value in (0, 1/2), mid-range
preferred). **The practical question "which estimator should I use?" is not addressed by this
source.**

**Q. Does the paper address count / RNA-seq data? Name the data types used.**
**NO.** Data types actually used: (a) **simulated continuous data** — N(0,1) noise, Bernoulli(0.5)
factor values; (b) one **real microarray gene-expression data set** — Johnson et al. (2007), nitric
oxide vs. control at 0 and 7.5 h, **21,171 genes**, 12 samples, 3 batches. Second-generation
sequencing is named **once**, in the Summary's opening sentence, as a motivating example of
high-dimensional data — it is never modeled, simulated, or analyzed. The assumptions are stated for
**continuous** distributions; the Discussion names **binary** data as future work. **No count model
appears anywhere.**

**Q. Does it name a significance level, permutation count, or threshold for its own procedure?
(Is `B = 20` / `p ≤ 0.10` in the paper?)**
**NO — neither number appears, and no analogue of either appears.**
- **Permutation count:** the paper's own procedure **performs no permutations at all**, so there is
  no `B`. It does not state the permutation count used for the Buja & Eyuboglu comparator either.
  **`B = 20` is not in this paper.**
- **Significance level for its own method:** none — the proposed estimator produces **no P-values**.
  **`p ≤ 0.10` is not in this paper.** The only significance level in the paper is the
  **Bonferroni-corrected 0.05** belonging to the **Buja & Eyuboglu** method as the paper describes it.
- **Thresholds it does name for its own procedure:** the eigenvalue threshold family
  `c_m = a · m^(−η)`, `0 < η < 1/2`; the simulation setting `c_m = n · m^(−1/3)` (η = 1/3, a = n,
  κ = n); and the Hallin & Liska **second-stability-interval** rule for picking `a` on real data.

**Pin (as requested):** Biometrics 67(2):344–352; DOI 10.1111/j.1541-0420.2010.01455.x; PMC3165001;
accessed 2026-07-13.
