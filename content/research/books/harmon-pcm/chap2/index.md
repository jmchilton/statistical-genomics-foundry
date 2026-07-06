---
title: "Fitting Statistical Models to Data"
source: harmon-pcm
source_chapter: 2
source_url: https://lukejharmon.github.io/pcm/chapter2_stats/
---

# Harmon PCM Chapter 2 — Fitting Statistical Models to Data (summary)
> Faithful summary generated in a clean context, license-aware (CC-BY 4.0 → short verbatim load-bearing quotes marked). Source-only; project framing lives elsewhere.

## 1. Citation
Harmon, Luke J. (2019). *Phylogenetic Comparative Methods: Learning from Trees*, Chapter 2: "Fitting Statistical Models to Data." Book text v1.0.0. License CC-BY 4.0. URL: https://lukejharmon.github.io/pcm/chapter2_stats/ . Accessed 2026-07-03. Stated version string: "v1.0.0".

## 2. Access note
Full chapter read via web fetch (HTML → markdown), including all six numbered sections (2.1–2.6) and subsections. Equation numbers and running-example numbers were captured from the rendered text; I could not independently re-render the KaTeX to confirm every subscript, so equation *forms* are reproduced as read and cross-checked on a second targeted pass. No paywall or access boundary. One boundary: I relied on the fetch tool's transcription of long equations (e.g., MCMC acceptance ratio), so treat multi-factor equation decompositions as approximate in exact symbol grouping.

## 3. Thesis (1 sentence)
For evolutionary/comparative questions the most useful statistical approach emphasizes estimating model parameters and quantifying their uncertainty, and selecting among competing models, rather than relying on null-hypothesis test statistics and P-values whose nulls are usually uninteresting.

## 4. Problem & context
Comparative biology needs to fit models of evolution to data and choose among competing explanations. Standard frequentist null-hypothesis testing is presented as limited here because biological null hypotheses are typically uninteresting and often obviously false, and because frequentist practice fixes the Type I error rate while leaving Type II error unknown. The chapter surveys four inferential frameworks — frequentist hypothesis testing, maximum likelihood, model selection (AIC), and Bayesian inference — using one running toy example to make them comparable.

## 5. Method / approach
Running example ("lizard flipping," a stand-in for coin-flipping): a lizard flipped 100 times yields **63 heads**; question is whether it is fair ($p_H = 0.5$) or unfair ($p_H \neq 0.5$).

**Standard hypothesis testing.** Define a null hypothesis (expectation if the process of interest is absent), compute a test statistic, and get a P-value = probability of a test statistic at least as extreme as observed *given the null is true*. Decision rule: reject null if $P < \alpha$ (typically $\alpha = 0.05$), else "fail to reject." Binomial test on the lizard: two-tailed $P = 0.006$ → reject fairness. Takes: data + a null model. Yields: a P-value and a reject/fail-to-reject verdict. Solves: controlling the false-positive (Type I) rate.

**Maximum likelihood (ML).** Likelihood $L(H|D) = \Pr(D|H)$ (Eq. 2.1): probability of the data given a model and parameter values. The ML estimate is the parameter value maximizing that probability. For the binomial, $L = \binom{n}{H} p_H^{H}(1-p_H)^{n-H}$ (Eq. 2.2); ML estimate $\hat p_H = 0.63$. Yields: point estimates. Solves: principled parameter estimation, and a basis for model comparison.

**Likelihood ratio test (LRT).** For **nested** models only (one a special case of the other). Statistic $\Delta = 2\ln(L_1/L_2)$ (Eq. 2.7), compared to a $\chi^2$ distribution with df = difference in parameter count. Lizard: $\Delta = 6.84$, $P = 0.009$ → reject fairness.

**AIC / model selection.** $\text{AIC} = 2k - 2\ln L$ (Eq. 2.11), balancing fit against parameter count $k$. Small-sample correction $\text{AIC}_c = \text{AIC} + \frac{2k(k+1)}{n-k-1}$ (Eq. 2.12); the chapter recommends always using $\text{AIC}_c$. Rank models by $\Delta\text{AIC}_{c,i} = \text{AIC}_{c,i} - \text{AIC}_{c,\min}$ (Eq. 2.13). Akaike weights $w_i = e^{-\Delta\text{AIC}_{c,i}/2} / \sum_j e^{-\Delta\text{AIC}_{c,j}/2}$ (Eq. 2.14) sum to 1 and give relative support; model averaging combines parameter estimates across models when model choice is uncertain. Does **not** require nesting.

**Bayesian inference.** Bayes theorem $\Pr(H|D) = \Pr(D|H)\Pr(H)/\Pr(D)$ (Eq. 2.19): posterior ∝ likelihood × prior. Prior = belief before data; posterior = probability the hypothesis is true given the data. Denominator via marginalization $\Pr(D) = \int \Pr(D|H)\Pr(H)\,dH$ (Eq. 2.20). Lizard with uniform prior $U(0,1)$ → posterior is a Beta distribution (Eq. 2.23). When integrals are intractable, use **MCMC** (Metropolis-Hastings): propose a new parameter value, accept with probability from an acceptance ratio combining prior, proposal, and likelihood ratios ($R_{accept} = R_{prior} \times R_{proposal} \times R_{likelihood}$, Eq. 2.27); accept if a uniform draw $x < R_{accept}$; repeat thousands of times; discard "burn-in" (early generations trending before the likelihood plateaus); subsample to reduce autocorrelation. Lizard MCMC: ~1000 generations burn-in, posterior centered near $p \approx 0.63$, matching the analytic Beta. **Bayes factors** $B_{12} = \Pr(D|H_1)/\Pr(D|H_2)$ (Eq. 2.32) compare *marginal* likelihoods (averaged over parameters weighted by the prior), accounting for parameter uncertainty; lizard $B_{12} = 3.67$ favoring the unfair model.

**Recommended procedure.** The chapter favors fitting models and estimating parameters (with uncertainty) plus model selection, citing flexibility, extendability, and direct linkage of tests to biological hypotheses. Default criteria given: $\alpha = 0.05$; always use $\text{AIC}_c$; $\Delta\text{AIC}_c$ thresholds below.

## 6. Key claims / findings
- Lizard, 63/100 heads: binomial two-tailed $P = 0.006$ → reject fairness.
- ML estimate $\hat p_H = 0.63$.
- LRT: $\Delta = 6.84$, $P = 0.009$ (df = 1, unfair vs fair) → reject fairness.
- Bayes factor $B_{12} = 3.67$, interpreted as "substantial (but not decisive) evidence" for the unfair model.
- $\Delta\text{AIC}_c < 4$: model roughly equivalent to the best model; between 4 and 8: little support; $> 10$: can safely be ignored.
- Akaike weights sum to 1 and quantify relative model support.
- Frequentist practice fixes Type I error near 5% while Type II error rate "remains unknown," yet Type II errors are "no less false" than Type I.
- Harmonic-mean estimator of the marginal likelihood is "extremely unreliable, and probably should never be used."
- AIC-based selection "typically select[s] more complex models than Bayesian approaches."

## 7. Load-bearing statements (verbatim — CC-BY permits)
1. "the most useful methods emphasize parameter estimation over test statistics and P-values." (§2.1, thesis)
2. "The P-value is the probability of obtaining a test statistic at least as extreme as the actual test statistic in the case where the null hypothesis is true." (§2.2, P-value definition)
3. "Likelihood is defined as the probability, given a model and a set of parameter values, of obtaining a particular set of data." (§2.3a, likelihood definition)
4. "any model with a ΔAICc of less than four is roughly equivalent to the model with the lowest AICc value. Models with ΔAICc between 4 and 8 have little support in the data, while any model with a ΔAICc greater than 10 can safely be ignored." (§2.3c, model-selection decision rule)
5. "this method is extremely unreliable, and probably should never be used" (§2.4c, on the harmonic-mean marginal-likelihood estimator)

## 8. Stated scope, assumptions, limitations
- LRT is valid **only for nested models** (one a special case of the other); df = parameter-count difference; null distribution $\chi^2$.
- ML estimates "can sometimes be biased," depending on sample size relative to the number of parameters.
- AIC requires the small-sample correction ($\text{AIC}_c$) as default; assumes reality is more complex than any candidate model (efficient-approximation stance), so does not presume the true model is in the set.
- Bayesian inference requires explicitly quantified priors for all parameters (stated as a cost/drawback); Bayes factors compare only the models considered.
- The $\Delta\text{AIC}_c$ cutoffs (4, 8, 10) are presented as interpretive thresholds/rules of thumb, not exact tests.
- Frequentist framing controls Type I error at $\alpha$ but leaves Type II (and power) unquantified in typical practice.
- MCMC results depend on adequate burn-in and thinning; the toy example is 1-parameter and simple.

## 9. Failure modes / invalidity patterns
- **Uninteresting/false nulls.** Warning sign: rejecting a null that describes "patterns occur only by chance," which is a priori implausible in evolution. Consequence: a "significant" result that answers a question no one cares about. Remedy: shift to parameter estimation and model comparison of substantive competing models.
- **Ignoring Type II error.** Warning sign: reporting only a fixed $\alpha$ (5%) with unknown power. Consequence: false negatives treated as if costless; "Type II errors are no less false than type I errors." Remedy: reason about power / consider model selection instead.
- **Multiple-testing over-correction.** Bonferroni-style correction dramatically inflates Type II error rate — trading one error type for another. Warning sign: many corrected tests with vanishing power.
- **Applying LRT to non-nested models.** Warning sign: comparing models where neither is a special case of the other. Consequence: the $\chi^2$ reference distribution is invalid → meaningless P-value. Detector: check nesting; remedy: use AIC/Bayes factors instead.
- **ML bias with small samples.** Warning sign: few data relative to parameter count. Consequence: biased point estimates. Remedy: small-sample corrections / awareness.
- **AIC overfitting under a truly simple model.** Because AIC assumes reality exceeds any model, it tends to select more complex models than Bayesian approaches; can favor extra parameters when the simple model is actually true.
- **Bayes factor misassumption.** Assumes the true model is among those compared; if not, the comparison is between wrong models.
- **Harmonic-mean marginal likelihood.** Warning sign: computing Bayes factors via the harmonic-mean estimator. Consequence: "extremely unreliable" values → wrong model support. Remedy: don't use it; use proper marginal-likelihood integration/estimation.
- **MCMC not converged.** Warning sign: likelihood trending through time (no plateau). Consequence: posterior samples from a non-stationary chain. Detector/remedy: discard burn-in until the likelihood plateaus, subsample to reduce autocorrelation. Empirical check given: the MCMC posterior for the lizard closely matched the analytic Beta solution — agreement between an approximate sampler and an exact solution is the pass condition; disagreement would flag a sampling/convergence problem.

## 10. What the chapter does NOT address
- No phylogeny-specific models yet (this is the general statistics primer preceding tree-based methods).
- No formal derivations of the estimators, distributions, or MCMC theory (kept conceptual).
- No treatment of prior sensitivity analysis in depth, informative-prior construction, or how to choose priors beyond noting uniform priors.
- No cross-validation or information criteria beyond AIC/AIC_c (e.g., BIC, DIC, WAIC not developed here as decision tools).
- No detailed guidance on convergence diagnostics beyond visual burn-in/plateau and thinning.

## 11. Open questions / ambiguities left unresolved
- Exact preferred method when AIC and Bayes disagree (chapter notes Bayes "account[s] for uncertainty much better" but AIC picks more complex models) — no single decision rule given.
- Precise practical thresholds for Bayes factor interpretation beyond the single "substantial (but not decisive)" example value of 3.67.
- How much burn-in / thinning is "enough" in non-trivial models — only a qualitative plateau criterion is given.
- The $\Delta\text{AIC}_c$ cutoffs (4/8/10) are stated as heuristics without a stated derivation or error-rate guarantee.
