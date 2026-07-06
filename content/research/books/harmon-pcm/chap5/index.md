---
title: "Multivariate Brownian Motion"
source: harmon-pcm
source_chapter: 5
source_url: https://lukejharmon.github.io/pcm/chapter5_mvbm/
---

# Harmon PCM Chapter 5 — Multivariate Brownian Motion (summary)
> Faithful summary generated in a clean context, license-aware (CC-BY 4.0 → short verbatim load-bearing quotes marked). Source-only; project framing lives elsewhere.

## 1. Citation
Harmon, Luke J. 2019. *Phylogenetic Comparative Methods: Learning from Trees* (book text v1.0.0). Chapter 5: "Fitting Brownian Motion Models to Multiple Characters" (the multivariate Brownian motion chapter). License: CC-BY 4.0. URL: https://lukejharmon.github.io/pcm/chapter5_mvbm/ (book landing: https://lukejharmon.github.io/pcm/). Accessed 2026-07-03. Version string as given by the source: "book text v1.0.0."

## 2. Access note
Read via a single fetch/markdown conversion of the chapter page; I did not see the rendered figures. Chapter body, equations, the worked mammal example, and the summary/footnotes were legible. One section-numbering anomaly appears in the extracted headings: subsections run 5.4a, 5.4b, then "5.5c" (Testing for character correlations using traditional approaches (PIC, PGLS)) before 5.6 Summary — the "5.5c" label is almost certainly a source typo for 5.4c; flagged [summarizer-inferred] as a typo, not verified against a corrected copy. Some extracted equation subscripts in Eq. 5.2 came through with mixed $n$/$r$ indices (conversion noise); I render the rate matrix in the clean form the prose describes and note the boundary in §5.

## 3. Thesis (1 sentence)
Multivariate Brownian motion extends univariate BM to several traits at once via an evolutionary rate matrix $\mathbf{R}$ whose off-diagonal terms capture *evolutionary* covariance/correlation, and testing whether that off-diagonal covariance differs from zero — not testing raw across-species correlation — is how one properly asks whether two traits evolve together.

## 4. Problem & context
The chapter distinguishes a *standard correlation* (a relationship between trait values across species) from an *evolutionary correlation* (two traits tending to evolve together). Phylogenetic relatedness alone can produce a relationship between two variables that are not actually evolving together, so hypotheses about trait evolution should be tested as evolutionary correlations. It builds directly on univariate BM (ch. 4), generalizing the single-rate $\sigma^2$ to a matrix.

## 5. Method / approach
**Multivariate BM parameters (§5.3).** For $r$ traits: a vector of phylogenetic means $\mathbf{a} = [\bar{z}_1(0)\ \bar{z}_2(0)\ \dots\ \bar{z}_r(0)]$ (Eq. 5.1), the root/starting point of the random walk in $r$-dimensional space; and the **evolutionary rate matrix** $\mathbf{R}$ (Eq. 5.2), whose diagonal holds each axis's rate $\sigma_i^2$ and whose off-diagonal holds evolutionary covariances $\sigma_{ij}$, with $\sigma_{ij}=\sigma_{ji}$:
$$\mathbf{R}=\begin{bmatrix}\sigma_1^2 & \sigma_{12} & \cdots \\ \sigma_{21} & \sigma_2^2 & \cdots \\ \vdots & & \ddots\end{bmatrix}$$
Each individual character still evolves under BM; the covariances are what make this distinct from independent per-character evolution. (Footnote 2: although the joint distribution across species for one trait is multivariate normal, individual changes along a single branch are univariate.)

**Likelihood (§5.3).** The full covariance is a Kronecker product $\mathbf{V}=\mathbf{R}\otimes\mathbf{C}$ (Eq. 5.3), an $n_r\times n_r$ matrix combining the rate matrix $\mathbf{R}$ with the phylogenetic variance-covariance matrix $\mathbf{C}$. The likelihood (Eq. 5.4) is the multivariate-normal density of the stacked trait vector $\mathbf{x}_{nr}$ given $\mathbf{a}$, $\mathbf{R}$, $\mathbf{C}$. Direct MLEs exist: $\hat{\mathbf{a}}=[(\mathbf{1}^\intercal\mathbf{C}^{-1}\mathbf{1})^{-1}(\mathbf{1}^\intercal\mathbf{C}^{-1}\mathbf{X})]^\intercal$ (Eq. 5.6) and $\hat{\mathbf{R}}=\frac{(\mathbf{X}-\mathbf{1}\hat{\mathbf{a}})^\intercal\mathbf{C}^{-1}(\mathbf{X}-\mathbf{1}\hat{\mathbf{a}})}{n}$ (Eq. 5.7), where $\mathbf{X}$ is the $n$ species $\times$ $r$ traits matrix. The text notes the direct parallel to univariate equations 4.6 and 4.7.

**Testing evolutionary correlation (§5.4).** For two traits, $\mathbf{R}=\begin{bmatrix}\sigma_x^2 & \sigma_{xy}\\ \sigma_{xy} & \sigma_y^2\end{bmatrix}$ (Eq. 5.8); the parameter of interest is the evolutionary covariance $\sigma_{xy}$, and whether it equals zero. Two nested models are compared (Eq. 5.9): $H_1$ (independent, off-diagonals forced to 0) vs. $H_2$ (free $\sigma_{xy}$). Compared by likelihood ratio test and AIC/AICc (§5.4a) or by Bayesian model selection via MCMC (§5.4b).

**Traditional approaches (§5.4c/"5.5c").** (a) **PICs**: compute standardized independent contrasts for $x$ and $y$, then linear regression forced through the origin (origin-forcing required because the subtraction direction at each node is arbitrary; footnote 3 notes this equals a vector correlation). (b) **PGLS**: a general linear model $\mathbf{y}=\mathbf{X}_D\mathbf{b}+\epsilon$ (Eq. 5.13) with design matrix $\mathbf{X}_D$ (Eq. 5.14) and residuals that are multivariate normal with covariance $\mathbf{\Omega}$; substituting the phylogenetic matrix $\mathbf{C}$ for $\mathbf{\Omega}$ gives $\hat{\mathbf{b}}=(\mathbf{X}_D^\intercal\mathbf{C}^{-1}\mathbf{X}_D)^{-1}\mathbf{X}_D^\intercal\mathbf{C}^{-1}\mathbf{y}$ (Eq. 5.15). First element of $\hat{\mathbf{b}}$ is the phylogenetic mean $\bar{z}(0)$; the other is a phylogeny-corrected slope. $\mathbf{\Omega}$ can be swapped to reflect non-BM models (e.g., Ornstein-Uhlenbeck).

**What it takes / yields.** Takes: a known tree ($\mathbf{C}$), trait data matrix $\mathbf{X}$, choice of estimator. Yields: estimated $\hat{\mathbf{a}}$, $\hat{\mathbf{R}}$ (hence evolutionary covariance/correlation), and a hypothesis test / model choice on $\sigma_{xy}$; PGLS additionally yields a regression slope and intercept.

## 6. Key claims / findings
- Off-diagonal $\sigma_{ij}$ of $\mathbf{R}$ *is* the evolutionary covariance between traits $i$ and $j$; $\sigma_{ij}=\sigma_{ji}$ (§5.3, Eq. 5.2). Diagonal $\sigma_i^2$ are per-trait BM rates.
- Full multivariate BM covariance factors as $\mathbf{V}=\mathbf{R}\otimes\mathbf{C}$ (Eq. 5.3); MLEs $\hat{\mathbf{a}}$, $\hat{\mathbf{R}}$ have closed forms paralleling univariate BM (Eqs. 5.6–5.7 vs. 4.6–4.7).
- Restricting $\sigma_{xy}=0$ (model $H_1$) leaves all other parameter estimates unchanged; only the evolutionary-correlation estimate is affected (§5.4a).
- **Mammal worked example** (data from Garland 1992), ln body mass vs. ln home range: standard regression $r=0.27$, $P=0.0001$. ML under $H_2$: $\hat{\mathbf{a}}_{H_2}=[2.54,\ 4.64]^\intercal$, $\hat{\mathbf{R}}_{H_2}=\begin{bmatrix}0.24 & 0.10\\ 0.10 & 0.09\end{bmatrix}$, $\ln L=-164.0$; positive off-diagonal → positive evolutionary correlation. Under $H_1$: $\hat{\mathbf{R}}_{H_1}=\begin{bmatrix}0.24 & 0\\ 0 & 0.09\end{bmatrix}$, $\ln L=-180.5$. LRT $\Delta=33.0$, $P<0.001$; AICc difference $30.9$; Akaike weight for model 2 effectively 1.0. Conclusion: strong support for an evolutionary correlation.
- **Bayesian re-analysis** (§5.4b): priors $\sigma_x^2,\sigma_y^2\sim U(0,1)$, $\sigma_{xy}\sim U(-1,1)$, $\bar{z}_1(0)\sim U(1,9)$, $\bar{z}_2(0)\sim U(-3,5)$; proposal width 0.2 (uniform $\pm0.1$); 100,000 generations, 10,000 burn-in, sampled every 100 → 901 posterior samples. Estimates: $\hat\sigma_x^2=0.26$ (95% CI 0.18–0.38), $\hat\sigma_y^2=0.10$ (0.06–0.15), $\hat\sigma_{xy}=0.11$ (0.06–0.17). None of the 901 $\sigma_{xy}$ samples < 0; CI excludes 0 → same conclusion.
- PIC regression on the mammal data is significant ($P\ll0.0001$); PGLS returns an identical slope and P-value to PICs and additionally recovers the intercept, which PICs cannot.
- Correlation vs. regression differ: correlation is symmetric in $x,y$; regression gives a different slope predicting $y$ from $x$ than $x$ from $y$ (§5.4c).
- **Summary claim (§5.6):** four methods (LRT, AIC model selection, PICs, PGLS) make the same assumptions and have similar statistical properties; under data simulated from multivariate BM, PICs and PGLS both have appropriate Type I error rates and very similar power.

## 7. Load-bearing statements (verbatim — CC-BY permits)
1. (§5.2, evolutionary correlation definition) "Evolutionary correlations occur when two traits tend to evolve together due to processes like mutation, genetic drift, or natural selection."
2. (§5.2, the core caution) "This is a key distinction, because phylogenetic relatedness alone can lead to a relationship between two variables that are not, in fact, evolving together."
3. (§5.2, the decision rule) "If we want to test hypotheses about trait evolution, we should specifically test evolutionary correlations."
4. (§5.3, on $\mathbf{R}$) "Off-diagonal elements represent evolutionary covariances between pairs of axes (note that *σ_ij* = *σ_ji*). … Covariances among characters, though, potentially make this model distinct from one where each character evolves independently of all the others."
5. (§5.2, hedge on framing) "Common language that comparative methods 'control for phylogeny' or 'remove the phylogeny from the data' is not necessarily enlightening or even always accurate."

## 8. Stated scope, assumptions, limitations
- Each character evolves under BM; multivariate BM "can encompass the situation where each character evolves independently … but can also describe situations where characters evolve in a correlated way" (§5.3). Joint distribution is multivariate normal; the tree ($\mathbf{C}$) is treated as known.
- The four correlation tests "all make the same assumptions about the data and, therefore, have quite similar statistical properties" (§5.6).
- PGLS/PICs assume a *different* model from correlated BM: "PGLS (and, implicitly, PICs) assume that the deviations of each species from the regression line evolve under a Brownian motion model" — i.e., $x$ is treated as a fixed property of species and only $y$'s deviation from the $x$-prediction evolves under BM. Harmon flags this himself: "If this seems strange, that's because it is!" (§5.4c).
- PICs cannot recover the regression intercept ("one does not recover an estimate of the intercept … the value of *y* one would expect when *x* = 0").
- More evolutionarily realistic correlated-evolution models exist (e.g., Hansen 1997) and are deferred to later chapters; PGLS's error structure can be swapped to non-BM models (e.g., OU).

## 9. Failure modes / invalidity patterns
- **Conflating standard with evolutionary correlation.** Warning sign: reporting a raw across-species correlation ($r=0.27$, $P=0.0001$ in the mammal case) as evidence traits "evolve together." Consequence: phylogenetic relatedness can generate an across-species relationship between traits that are not co-evolving. Remedy (stated): test $\sigma_{xy}$ in $\mathbf{R}$ (LRT/AIC/Bayesian) or use PIC/PGLS — methods that ask specifically about evolutionary changes.
- **Not forcing PIC regression through the origin.** Warning sign: fitting an intercept to contrast-vs-contrast regression. Consequence: contrast subtraction direction at each node is arbitrary; a simultaneous reflection across both axes must not change the analysis. Remedy (stated): force the regression through the origin.
- **Misreading the PGLS model.** Warning sign: interpreting PGLS as symmetric co-evolution of $x$ and $y$. Consequence: PGLS actually models only $y$'s deviation-from-$x$ as BM and treats $x$ as fixed — a different (and, per Harmon, "strange") assumption than correlated BM; slope also depends on regression direction. Remedy (stated): use correlation-style tests when the question is symmetric co-evolution; use regression only when predicting $y$ from $x$.
- **Empirical checks given.** (a) *Cross-method agreement:* ML LRT ($\Delta=33.0$), AICc (diff 30.9, weight ≈1.0), Bayesian (CI 0.06–0.17, 0/901 samples negative), PIC ($P\ll0.0001$), and PGLS (identical slope/P to PIC) all converge on the same conclusion — agreement across independent estimators as a robustness signal; pass = concordant, fail = divergence would flag a problem. (b) *Simulation under known truth (§5.6):* data simulated from multivariate BM show PICs and PGLS have appropriate Type I error rates and very similar power — pass = correct error rate under the generating model.

## 10. What the chapter does NOT address
- Correlated-evolution models with more realistic assumptions (e.g., Hansen 1997 stabilizing-selection/adaptation models) — explicitly deferred to later chapters.
- Non-BM error structures for PGLS (OU etc.) are mentioned as possible but not worked here.
- Uncertainty in the phylogeny itself: $\mathbf{C}$ is taken as known; tree error is not treated.
- No worked $r>2$ (multi-trait, $r\geq3$) example — machinery is general but the empirical case is bivariate.
- Does not derive the equations (states forms, notes parallels to ch. 4; no derivation).

## 11. Open questions / ambiguities left unresolved
- Subsection labeling: "5.5c" for the traditional-methods section (between 5.4b and 5.6) reads as a typo for 5.4c [summarizer-inferred] — not resolvable from the fetched copy alone.
- Eq. 5.2 subscripts came through with mixed $n$/$r$ indices in the conversion; the intended general form is the symmetric $r\times r$ matrix (diagonal $\sigma_i^2$, off-diagonal $\sigma_{ij}=\sigma_{ji}$) as the prose states — exact printed index labels not verified.
- The chapter asserts the four methods have "very similar power" but gives the supporting simulation only in summary form (no reported power/Type-I numbers, tree size, or simulation counts).
- Which estimator to prefer in practice is left open: the text says any of the four is "a good choice" without a decision rule for choosing among them beyond PGLS's ability to recover an intercept.
