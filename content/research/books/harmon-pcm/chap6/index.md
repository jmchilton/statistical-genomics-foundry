---
type: book
title: "Beyond Brownian Motion"
source: harmon-pcm
source_chapter: 6
source_url: https://lukejharmon.github.io/pcm/chapter6_beyondbm/
---

# Harmon PCM Chapter 6 — Beyond Brownian Motion (summary)
> Faithful summary generated in a clean context, license-aware (CC-BY 4.0 → short verbatim load-bearing quotes marked). Source-only; project framing lives elsewhere.

## 1. Citation
Harmon, Luke J. 2019. "Chapter 6: Beyond Brownian Motion." In *Phylogenetic Comparative Methods: Learning from Trees*. Book text v1.0.0. Licensed CC-BY 4.0. https://lukejharmon.github.io/pcm/chapter6_beyondbm/. Accessed 2026-07-03.

## 2. Access note
Numbers **re-verified against the raw source HTML** on 2026-07-03 (an earlier summarizing-fetch pass had introduced one error, corrected below). The mammal AICc table, OU/EB estimates, and section structure are now source-confirmed. Two findings from re-verification: (i) **Section 6.5 is genuinely absent** — the source TOC runs 6.4 → 6.6, a real gap in Harmon's numbering, not a conversion artifact; (ii) the earlier draft's "carnivores vs non-carnivores, Mann-Whitney U=251, P=0.70" was **wrong** — the source reports a Welch t-test P=0.42 and only *recommends* Mann-Whitney conceptually (§5, corrected). Appendix OU-derivation equations use quantitative-genetics notation ($G$, $\gamma$); the stationary-form moments in §5 are the standard OU forms.

## 3. Thesis (1 sentence)
Brownian motion is often unrealistic, so the chapter surveys four families of continuous-trait models that go beyond BM — VCV transformation, rate variation across clades, stabilizing-selection (OU) constraint, and adaptive-radiation/ecological-opportunity (early-burst) models — and how to fit and compare them.

## 4. Problem & context
BM "corresponds to a few simple scenarios of trait evolution" (verbatim fragment, 6.1) and "hardly seems realistic for a group of finches known to be under strong and predictable directional selection" (verbatim, 6.1). Verbatim roadmap (6.1): *"In this chapter, I will consider four ways that comparative methods can move beyond simple Brownian motion models: by transforming the variance-covariance matrix describing trait covariation among species, by incorporating variation in rates of evolution, by accounting for evolutionary constraints, and by modeling adaptive radiation and ecological opportunity."*

Section structure (as extracted):
- 6.1 Introduction
- 6.2 Transforming the evolutionary variance-covariance matrix
- 6.3 Variation in rates of trait evolution across clades — 6.3a contrasts; 6.3b ML and AIC; 6.3c Bayesian MCMC
- 6.4 Non-Brownian evolution under stabilizing selection
- 6.6 Early burst models
- 6.7 Peak shift models
- 6.8 Summary; 6.9 Footnotes; 6.10 Appendix (deriving OU under stabilizing selection)

## 5. Method / approach

**Pagel's tree transformations (6.2).** Reshape the phylogenetic variance-covariance matrix **C**; BM is the untransformed special case.
- **$\lambda$** (Pagel's lambda): multiplies off-diagonal (covariance) elements of **C** by $\lambda \in [0,1]$; tip (diagonal) variances unchanged. $\lambda=1$ → standard BM; $\lambda=0$ → star phylogeny (no phylogenetic structure). Used as a measure of "phylogenetic signal."
- **$\delta$** (delta): raises node heights / elements of **C** to power $\delta>0$; models time-varying rate. Verbatim (6.2): *"When δ is one, the tree is unchanged and one still has a constant-rate Brownian motion process; when δ is less than 1, node heights are reduced, but deeper branches in the tree are reduced less than shallower branches (Figure 6.1). This effectively represents a model where the rate of evolution slows through time."* $\delta>1$ → rates accelerate through time. Verbatim connection (6.2): *"There is a close connection between the δ model, the ACDC model (Blomberg et al. 2003), and Harmon et al.'s (2010) early burst model [see also Uyeda and Harmon (2014), especially the appendix]."*
- **$\kappa$** (kappa): raises individual branch lengths to power $\kappa \ge 0$; intended to capture "speciational" change. $\kappa=1$ → BM; $\kappa=0$ → all branches equal length. Assumes the tree contains all/most speciation events — flagged as unrealistic given extinction/incomplete sampling; newer speciational methods (Bokma 2008; Goldberg & Igić 2012) preferred.

**Rate variation across clades (6.3).** Test whether $\sigma^2$ differs between clades/regimes.
- *Contrasts (6.3a):* compare (squared/absolute) phylogenetic independent contrasts between clades. Worked example — carnivores vs. non-carnivores (mammal body size, Garland 1992): a **Welch two-sample t-test is not significant, $P=0.42$**, but the absolute-value contrasts are strongly skewed → violate t-test assumptions. The chapter therefore *recommends* the nonparametric **Mann-Whitney U-test** on the absolute contrasts (rank-based, insensitive to the skew) but does **not** report a U/P for it in this worked example.
- *ML + AIC (6.3b):* build a separate **C** per regime and combine, $\mathbf{V}_{H_2} = \sigma_1^2\mathbf{C}_1 + \sigma_2^2\mathbf{C}_2$; single-rate BM is the nested special case, compared by likelihood-ratio test or AICc. "Censored" vs. "noncensored" handling of the shift branch (O'Meara et al. 2006). Worked example (carnivores own rate vs. rest): $\hat\sigma_c^2=0.068$, $\hat\sigma_o^2=0.01$, $\hat{\bar z}(0)=4.51$ — carnivores appear faster, but the fit is not substantially better than single-rate BM (lnL −77.6, AICc 162.3 vs. BM's 160.4).
- *Bayesian MCMC (6.3c):* sample posteriors, test rate differences via composite parameters (e.g. $\sigma^2_{diff}=\sigma_1^2-\sigma_2^2$); stochastic character mapping (Revell 2013); reversible-jump MCMC to locate shifts without a priori hypotheses (Eastman et al. 2011).

**Ornstein–Uhlenbeck (6.4).** Trait pulled toward an optimum (stabilizing-selection interpretation). Parameters: $\bar{z}_0$ (start), $\sigma^2$ (drift), $\alpha$ (strength of pull/constraint), $\theta$ (optimum). Standard OU stationary moments (the §6.10 appendix derives these in quantitative-genetics notation using $G$ and $\gamma$; source-confirmed form):
$$\mu_i(t) = \theta + e^{-\alpha T_i}(\bar{z}_0 - \theta)$$
$$V_i(t) = \frac{\sigma^2}{2\alpha}\left(1 - e^{-2\alpha T_i}\right)$$
$$V_{ij}(t) = \frac{\sigma^2}{2\alpha}\,e^{-2\alpha T_i}\left(e^{2\alpha s_{ij}} - 1\right)$$
with $T_i$ = root-to-tip path length and $s_{ij}$ = shared path length. **BM is the $\alpha \to 0$ limit.** (The HTML render of the appendix garbles a couple of sign/factor placements; the forms above are the standard OU stationary moments the derivation targets.)

**Early burst / ACDC (6.6).** Rate decays exponentially through time (Harmon et al. 2010): $\sigma^2(t) = \sigma_0^2 e^{bt}$, with $b<0$ for a decelerating adaptive radiation ($b=0$ recovers BM). Moments (source-confirmed): $\mu_i(t)=\bar{z}_0$; $V_i(t)=\sigma_0^2\frac{e^{bT_i}-1}{b}$; $V_{ij}(t)=\sigma_0^2\frac{e^{bs_{ij}}-1}{b}$.

**Peak shift (6.7).** Reversible-jump MCMC over OU regimes so lineages shift among adaptive peaks; $\sigma^2$ and/or $\alpha$ can vary across regimes (Uyeda & Harmon 2014).

**Fitting/comparison.** ML fits with model selection by AICc (and likelihood-ratio tests for nested cases). Single-trait mammal body-size comparison (source-verified §6.6):

| Model | Est. | lnL | AICc |
|---|---|---|---|
| BM | $\sigma^2=0.088,\ \theta=4.64$ | −78.0 | 160.4 |
| Lambda | $\sigma^2=0.085,\ \theta=4.64,\ \lambda=1.0$ | −78.0 | 162.6 |
| Delta | $\sigma^2=0.063,\ \theta=4.60,\ \delta=1.5$ | −77.7 | 162.0 |
| Kappa | $\sigma^2=0.170,\ \theta=4.64,\ \kappa=0.66$ | −77.3 | 161.1 |
| OU | $\bar{z}_0=4.60,\ \sigma^2=0.10,\ \alpha=0.0082,\ \theta=4.60$ | −77.6 | 161.2 |
| EB | $\bar{z}_0=4.64,\ \sigma^2=0.088,\ b=-0.000001$ | −78.0 | 162.6 |

Reported interpretation: all $\Delta$AICc within ~3 units of BM; BM remains the (marginally) preferred / not-outperformed model for this dataset.

## 6. Key claims / findings
- BM is a nested special case of every model here: $\lambda=1$, $\delta=1$, $\kappa=1$, OU as $\alpha\to0$, EB/ACDC as $b\to0$.
- $\lambda$ measures phylogenetic signal by scaling only the between-species covariances; $\lambda=0$ is a star tree (species independent), $\lambda=1$ is BM.
- $\delta<1$ = decelerating rate through time (deeper branches shrink less than shallow); $\delta>1$ = accelerating; ties to ACDC and early-burst.
- $\kappa$ interpolates between gradual ($\kappa=1$) and speciational ($\kappa=0$) change.
- OU adds a deterministic pull of strength $\alpha$ toward optimum $\theta$; larger $\alpha$ = stronger constraint / faster loss of ancestral influence.
- EB rate $\sigma^2(t)=\sigma_0^2 e^{bt}$; $b<0$ encodes the adaptive-radiation "early burst then slowdown."
- In the worked mammal example, competing models are statistically near-indistinguishable ($\Delta$AICc ≤ ~3).

## 7. Load-bearing statements (verbatim — CC-BY permits)
1. (6.1, roadmap) *"In this chapter, I will consider four ways that comparative methods can move beyond simple Brownian motion models: by transforming the variance-covariance matrix describing trait covariation among species, by incorporating variation in rates of evolution, by accounting for evolutionary constraints, and by modeling adaptive radiation and ecological opportunity."*
2. (6.2, on $\lambda$) *"statistical estimates of λ under a ML model tend to be clustered near 0 and 1 regardless of the true value, and AIC model selection can tend to prefer models with λ ≠ 0 even when data is simulated under Brownian motion (Boettiger et al. 2012)."*
3. (6.4, OU→selection caution) *"even though this model can be described by OU, we cannot make inferences the other direction and claim that OU means that our population is under constant stabilizing selection."*
4. (6.2, $\delta$ definition) *"When δ is one, the tree is unchanged and one still has a constant-rate Brownian motion process; when δ is less than 1, node heights are reduced, but deeper branches in the tree are reduced less than shallower branches ... This effectively represents a model where the rate of evolution slows through time."*
5. (6.8, scope + best use) *"The best applications of this type of approach, I think, are in testing particular biologically motivated hypotheses using comparative data."*

## 8. Stated scope, assumptions, limitations
- Self-limited scope (6.8, paraphrase of extracted text): the models listed are the beginnings of a much larger model set and are not meant to be comprehensive.
- $\kappa$ assumes the tree captures all/most speciation events — violated by extinction and incomplete sampling.
- OU (single-optimum) as a literal stabilizing-selection model is often unrealistic over long timescales given plausible population-genetic parameters (population size, heritability).
- Absolute contrasts violate normal/t-test assumptions → use rank-based tests.
- Shift-branch treatment (censored vs. noncensored) is a modeling choice; usually low impact (O'Meara et al. 2006).

## 9. Failure modes / invalidity patterns
[referee-relevant]
- **$\lambda$ overfitting / boundary pile-up.** Warning sign: ML $\hat\lambda$ landing at 0 or 1, or AIC favoring $\lambda\neq0$. Consequence: spurious signal/model preference even when truth is BM. Remedy: skepticism about ML $\lambda$; cited empirical basis is the Boettiger et al. (2012) **simulation under known BM truth** showing estimate clustering and AIC bias (pass = method recovers BM; fail = prefers transformed model).
- **Reifying OU as stabilizing selection.** Warning sign: reading a fitted OU (nonzero $\alpha$, an estimated $\theta$) as evidence of literal stabilizing selection toward that optimum. Consequence: unjustified biological claim — OU is one of many processes producing OU-shaped data. Remedy: the model→process inference is one-directional only (quote 3).
- **Over-interpreting phylogenetic signal as "constraint."** High signal can arise from unconstrained BM and low signal from constrained OU (Revell et al. 2008), so signal is not a constraint meter.
- **Weak model discrimination on real data.** In the worked mammal example, $\Delta$AICc among BM/$\lambda$/$\delta$/$\kappa$/OU/EB is ≤ ~3 units — models "not easily distinguished." Consequence: model-selection "winners" may be noise. [summarizer-inferred that this is the referee lesson; the ≤~3-unit spread is stated.]
- **Skewed-contrast test misuse.** Applying a t-test to absolute contrasts (skewed) inflates error; remedy = Mann-Whitney U.
- **Empirical checks named:** simulation-under-known-truth (Boettiger et al. 2012 for $\lambda$); nested likelihood-ratio / AICc comparison against BM as the null baseline. No explicit posterior-predictive / formal model-adequacy procedure in this chapter (confirmed).

## 10. What the chapter does NOT address
- No explicit, general treatment of **distinguishing OU from BM being statistically hard**, and no dedicated **model-adequacy / posterior-predictive** section in this chapter (confirmed; likely deferred to other chapters).
- No coverage of **measurement error** as a distinct model component in this chapter (confirmed).
- Multivariate trait evolution, discrete-trait models, and diversification/state-dependent (BiSSE-type) models are outside this chapter (only touched via stochastic mapping of a discrete state onto continuous-rate regimes).
- Explicitly non-comprehensive: does not span the full space of non-BM continuous models.

## 11. Open questions / ambiguities left unresolved
- Section 6.5 is genuinely skipped in the source (TOC 6.4 → 6.6) — an authorial numbering gap, now confirmed (not a conversion artifact).
- The appendix OU derivation is written in quantitative-genetics notation ($G$, $\gamma$); the exact printed sign/factor layout of a couple of appendix moment lines is garbled in the HTML render, but the §5 stationary-form OU moments are the standard forms.
- The chapter poses OU as capturing constraint but leaves unresolved how to license any biological (selection) interpretation from a good OU fit.
