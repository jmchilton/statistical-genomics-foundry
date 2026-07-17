---
type: book
title: "Fitting Brownian Motion"
source: harmon-pcm
source_chapter: 4
source_url: https://lukejharmon.github.io/pcm/chapter4_fitbm/
tags:
  - domain/phylogenetics
  - domain/trait-evolution
---

# Harmon PCM Chapter 4 — Fitting Brownian Motion (summary)
> Faithful summary generated in a clean context, license-aware (CC-BY 4.0 → short verbatim load-bearing quotes marked). Source-only; project framing lives elsewhere.

## 1. Citation
Harmon, Luke J. 2019. "Fitting Brownian Motion Models to Single Characters," Chapter 4 of *Phylogenetic Comparative Methods: Learning from Trees* (book text v1.0.0). Licensed CC-BY 4.0. https://lukejharmon.github.io/pcm/chapter4_fitbm/ — accessed 2026-07-03. (Chapter title as reported in-source is "Fitting Brownian Motion Models to Single Characters"; the contents-page short title is "Fitting Brownian Motion".)

## 2. Access note
Numbers and quotes **re-verified against the raw source HTML** on 2026-07-03. Confirmed: the ML→REML rate shift ($\hat\sigma^2_{ML}=0.088 \to \hat\sigma^2_{REML}=0.090$), the PIC↔REML identity, and the "all three approaches … were similar" statement. One **source error** surfaced (not an extraction artifact): Box 4.2's standardization formula divides by the variance $v_i+v_j$ while the chapter's prose says to divide by the *standard deviation* — see §5.2 and §11. (A minor source typo in Eq. 4.3's denominator, "$1/v_1$", is rendered here as the intended $1/v_i$.)

## 3. Thesis (1 sentence)
Fitting a Brownian motion (BM) model to a single continuous character on a known phylogeny lets you estimate two parameters — the evolutionary rate $\sigma^2$ and the root/ancestral state $\bar z(0)$ — and the chapter teaches three concordant routes to those estimates: phylogenetic independent contrasts (PIC), maximum likelihood (ML), and Bayesian MCMC.

## 4. Problem & context
- Goal: estimate the rate of continuous-trait evolution and the ancestral state at the root, given a tree with branch lengths.
- Two BM parameters: $\sigma^2$ (the diffusion/evolutionary rate — the variance accumulated per unit time) and $\bar z(0)$ (state at the root). Verbatim (§4.1): "It is this latter parameter that is commonly considered as the rate of evolution for comparative approaches."
- Worked example throughout: mammalian body mass, **49 species**, branch lengths in millions of years, data from Garland (1992). Trait is log-transformed body size.
- Box 4.1 advises log-transforming size data. Verbatim (Box 4.1): "Ratio scales make sense for living things because it is usually percentage changes rather than absolute changes that matter."

## 5. Method / approach
Sections: 4.1 Introduction · 4.2 Estimating rates using independent contrasts · 4.3 Estimating rates using maximum likelihood · 4.4 Bayesian approach to evolutionary rates · 4.5 Summary.

**Phylogenetic independent contrasts (PIC / Felsenstein contrasts)** (§4.2, Box 4.2). Iterative, applied $n-1$ times (49 tips → 48 contrasts). At a pair of adjacent tips $i,j$ with common ancestor $k$ and branch lengths $v_i, v_j$:
1. Raw contrast (Eq. 4.1): $c_{ij} = x_i - x_j$, with variance $v_i + v_j$ under BM.
2. Standardize (Eq. 4.2): Box 4.2 as printed says "divide the raw contrast by its variance" and shows $s_{ij} = \dfrac{c_{ij}}{v_i + v_j} = \dfrac{x_i - x_j}{v_i + v_j}$; under BM $s_{ij}\sim N(0,\sigma^2)$. **Source inconsistency (verified against raw HTML):** this Box 4.2 form divides by the *variance* $v_i+v_j$, which contradicts the same chapter's own prose ("Felsenstein divided the raw contrasts by their **expected standard deviation**") and the standard Felsenstein standardization (divide by $\sqrt{v_i+v_j}$). The printed Box 4.2 denominator appears to be an error in Harmon's text; the standard-deviation form ($\div\sqrt{v_i+v_j}$) is the correct one. Not an extraction artifact.
3. Prune tips; assign ancestor $k$ the variance-weighted mean (Eq. 4.3): $x_k = \dfrac{(1/v_i)x_i + (1/v_j)x_j}{1/v_i + 1/v_j}$.
4. Extend the branch below $k$: $v_k \to v_k + \dfrac{v_i v_j}{v_i + v_j}$.
5. Repeat.

Rate estimate (Eq. 4.4): $\hat\sigma^2_{PIC} = \dfrac{\sum s_{ij}^2}{n-1}$. Standardized contrasts are independent and identically distributed under BM. Contrasts remove the root state as a nuisance parameter and avoid building/inverting the full covariance matrix.

**Maximum likelihood** (§4.3). Tip values are multivariate normal with covariance $\sigma^2\mathbf C$, where $\mathbf C$ ($n\times n$) is built from the tree: diagonal entry = total (root-to-tip) branch length for that tip; off-diagonal $(i,j)$ = shared branch length from the root to the MRCA of $i$ and $j$. Likelihood (Eq. 4.5):
$$L(\mathbf{x}\mid\bar z(0),\sigma^2,\mathbf C)=\frac{e^{-\tfrac12 (\mathbf{x}-\bar z(0)\mathbf 1)^\intercal (\sigma^2 \mathbf C)^{-1}(\mathbf{x}-\bar z(0)\mathbf 1)}}{\sqrt{(2\pi)^n \det(\sigma^2\mathbf C)}}$$
Analytic MLEs:
- Root state (Eq. 4.7): $\hat{\bar z}(0)=(\mathbf 1^\intercal \mathbf C^{-1}\mathbf 1)^{-1}(\mathbf 1^\intercal \mathbf C^{-1}\mathbf{x})$.
- Rate (Eq. 4.8): $\hat\sigma^2_{ML}=\dfrac{(\mathbf{x}-\hat{\bar z}(0)\mathbf 1)^\intercal \mathbf C^{-1}(\mathbf{x}-\hat{\bar z}(0)\mathbf 1)}{n}$.

$\mathbf x$ = $n\times1$ tip-value vector; $\mathbf 1$ = $n\times1$ vector of ones. The chapter also shows numerical optimization reaching the same optimum (reported as ~10 likelihood evaluations) and uses the Hessian (Eq. 4.6) for standard errors/CIs.

**REML** (§4.3). Restricted ML corrects the ML rate's downward bias by dividing by $n-1$ (Eq. 4.9): $\hat\sigma^2_{REML}=\dfrac{(\mathbf{x}-\hat{\bar z}(0)\mathbf 1)^\intercal \mathbf C^{-1}(\mathbf{x}-\hat{\bar z}(0)\mathbf 1)}{n-1}$. This is algebraically identical to the PIC estimator (Eq. 4.4); i.e. $\hat\sigma^2_{PIC}=\hat\sigma^2_{REML}$. REML treats the root state as a nuisance parameter and avoids constructing/inverting $\mathbf C$ for large trees.

**GLS view.** The chapter does not present a standalone generalized-least-squares section, but the estimators are the GLS forms: they use $\mathbf C^{-1}$ (the phylogenetic covariance) exactly as GLS does. [summarizer-inferred that this is "the GLS view" — the chapter uses $\mathbf C^{-1}$ but does not label it GLS.]

**Bayesian MCMC** (§4.4). Metropolis-style algorithm:
1. Draw starting $\sigma^2, \bar z(0)$ from priors — $\sigma^2 \sim U(0,0.5)$, $\bar z(0)\sim U(0,10)$.
2. Propose new value from a symmetric uniform proposal (Eq. 4.10): $Q(p'\mid p)\sim U(p-\tfrac{w_p}{2},\,p+\tfrac{w_p}{2})$.
3. Compute prior-odds ratio ($=1$ for uniform priors), proposal ratio ($=1$ for symmetric proposal), and likelihood ratio (Eq. 4.11): $R_{\text{likelihood}}=\dfrac{P(D\mid p')}{P(D\mid p)}$.
4. Acceptance ratio $R_{\text{accept}}=R_{\text{prior}}\cdot R_{\text{proposal}}\cdot R_{\text{likelihood}}$ (here $=R_{\text{likelihood}}$).
5. Draw $u\sim U(0,1)$; accept if $u<R_{\text{accept}}$, else keep current.
6. Repeat. Example run: 10,000 generations, 1,000 burn-in, sample every 10.

**Recommended procedure / relation among methods.** No single method is prescribed; the three are shown to agree. Verbatim (§4.3): "the parameter estimates from all three approaches (REML, ML, and Bayesian) were similar." PIC is the fast route (it equals REML and skips matrix inversion).

## 6. Key claims / findings
- ML rate estimator divides by $n$ (Eq. 4.8); REML/PIC divide by $n-1$ (Eqs. 4.9, 4.4) — the only structural difference between them.
- $\hat\sigma^2_{PIC}=\hat\sigma^2_{REML}$ exactly; PICs are a formulation of a REML model.
- Standardized contrasts are i.i.d. $N(0,\sigma^2)$ under BM; raw contrasts are independent under a wide range of models (independence follows from lineages evolving independently, not from the specific model).
- Mammal body-size results (all concordant):
  - PIC: $\hat\sigma^2 = 0.09$.
  - ML (numerical optimum): $\hat\sigma^2 = 0.08804487$, $\hat{\bar z}(0)=4.640571$, $\ln L=-78.04942$.
  - ML (analytic, rounded): $\hat\sigma^2 = 0.088$, $\hat{\bar z}(0)=4.64$; 95% CI $\sigma^2$: $0.06$–$0.11$; 95% CI $\bar z(0)$: $3.22$–$6.06$.
  - REML: $\hat\sigma^2 = 0.090$, max REML $\ln L=-10.3$, SE$(\sigma^2)=0.018$, 95% CI: $0.05$–$0.13$.
  - Bayesian: $\hat\sigma^2 = 0.10$ (95% credible interval $0.066$–$0.15$); $\bar z(0)=3.5$ (credible interval $2.3$–$5.3$).
- Hessian (Eq. 4.6) reported as $\begin{bmatrix} -314.6 & -0.0026 \\ -0.0026 & -0.99 \end{bmatrix}$, used for the ML standard errors.
- Rate interpretation: contrast variance $=2\sigma^2\approx0.18$; two SDs $=2\sqrt{0.18}=0.85$; on a log scale $e^{0.85}=2.3$, so after 1 Myr two lineages will commonly differ by ~2.3-fold in body size.

## 7. Load-bearing statements (verbatim — CC-BY permits)
Quotes below are verbatim per the extraction and were cross-checked in a second pass; treat single-digit/exact-wording precision as "verify at source."
1. (§4.1) "It is this latter parameter that is commonly considered as the rate of evolution for comparative approaches." — defines what $\sigma^2$ means.
2. (§4.3) "Equation (4.8) is biased, and will consistently estimate rates of evolution that are a little too small." — the ML downward-bias caution.
3. (§4.3) "Equation 4.8 is exactly identical to the estimated rate of evolution calculated using the average squared independent contrast" (i.e. $\hat\sigma^2_{PIC}=\hat\sigma^2_{REML}$). — the PIC↔REML identity.
4. (§4.3) "PICs treat the root state of the tree as a nuisance parameter." — why REML/PIC sidestep root-state estimation.
5. (Box 4.1) "Ratio scales make sense for living things because it is usually percentage changes rather than absolute changes that matter." — the log-transform rationale.

## 8. Stated scope, assumptions, limitations
- Tree topology and branch lengths (proportional to time) are assumed **known in advance**; all $\mathbf C$ / contrast computations depend on them.
- The character is assumed to have evolved under **Brownian motion** (required to interpret $\sigma^2$ and to standardize contrasts).
- ML rate (Eq. 4.8) is biased downward; REML/PIC ($n-1$) is the unbiased correction.
- Log-transform size/measurement data before fitting (Box 4.1).
- Contrast independence holds "as long as each lineage … evolves independently of every other lineage, regardless of the evolutionary model."
- Hessian-based standard errors assume the likelihood surface near the peak is approximately quadratic.
- Optimization can get stuck on local peaks in general, though the chapter notes this is not an issue for simple BM on a tree.
- REML/PIC treat the root state as a nuisance parameter because there is typically very little information about it.

## 9. Failure modes / invalidity patterns [referee-relevant]
- **ML variance bias.** Warning sign: rate estimated with the $n$ denominator (Eq. 4.8). Consequence: consistently too-small $\sigma^2$. Remedy: use REML/PIC ($n-1$, Eqs. 4.9/4.4). Empirical check in-chapter: on the mammal data ML gives 0.088 vs REML/PIC ~0.090 — the correction moves the estimate up, matching the predicted direction of bias.
- **Wrong/uncertain tree or branch lengths.** Since $\mathbf C$, contrast variances, and branch-length extensions all derive from the tree, mis-specified topology or branch lengths propagate directly into $\sigma^2$ and $\bar z(0)$. (Chapter states the tree is assumed known; it does not quantify sensitivity. [summarizer-inferred that error propagates — stated only as an assumption, not a tested failure mode.])
- **Non-BM evolution.** If the trait did not evolve under BM, standardized contrasts are no longer i.i.d. $N(0,\sigma^2)$ and the rate interpretation breaks. (The chapter flags that standardization/interpretation *assumes* BM; diagnostics for BM adequacy are not developed here.)
- **Unlogged ratio-scale data.** Warning sign: raw (non-log) size measurements. Consequence: violates normality/constant-variance expectations. Remedy: log-transform (Box 4.1).
- **Over-trusting Hessian CIs.** If the likelihood peak is not locally quadratic, Hessian SEs/CIs are unreliable; the chapter states this assumption explicitly.
- **Empirical concordance check.** The chapter's cross-method agreement (PIC 0.09, ML 0.088, REML 0.090, Bayes 0.10) functions as a sanity check: pass = methods agree; a large disagreement would signal a problem (implementation, optimization, or model). This is demonstrative, not framed as a formal diagnostic. [summarizer-inferred framing]

## 10. What the chapter does NOT address
- No formal goodness-of-fit / model-adequacy test for whether BM actually holds (fitting, not testing, is the scope here).
- No comparison of BM against alternative models (OU, early-burst, etc.) — deferred to later chapters. [summarizer-inferred from scope, not stated in this chapter's text I saw.]
- No standalone/labeled GLS treatment despite using $\mathbf C^{-1}$.
- No quantitative sensitivity analysis of estimates to tree error or branch-length error (assumption stated, not tested).
- No treatment of multivariate characters or of multiple/rate-shift regimes ("single characters," constant rate).
- No handling of intraspecific variation / measurement error in tip values (not discussed in the extracted content).

## 11. Open questions / ambiguities left unresolved
- Contrast standardizer: **source-verified** that Box 4.2 prints $\div(v_i+v_j)$ while the prose says $\div$ standard deviation — an internal inconsistency in Harmon's text (the SD form is standard/correct). Not our error to resolve; recorded as a source defect.
- Whether the Bayesian point estimates ($\hat\sigma^2=0.10$; $\bar z(0)=3.5$) are posterior means or medians — the chapter does not say.
- The rate-interpretation arithmetic prints a garbled exponent in the HTML ("$e\,2.68 = 2.3$"); the intended value is $e^{0.85}\approx2.3$-fold divergence per Myr.
