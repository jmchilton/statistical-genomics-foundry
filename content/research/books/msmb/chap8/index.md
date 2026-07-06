---
title: "High-Throughput Count Data and Generalized Linear Models"
source: msmb
source_chapter: 8
source_url: https://www.huber.embl.de/msmb/08-chap.html
license: CC-BY-NC-SA-2.0
license_file: LICENSES/msmb.LICENSE
attribution: "Holmes S, Huber W. Modern Statistics for Modern Biology. Cambridge University Press; 2019. https://www.huber.embl.de/msmb/"
derived: own-words-summary
---

# High-Throughput Count Data and Generalized Linear Models — MSMB Chapter 8 (summary)

_Own-words summary of an external source (see frontmatter for license/attribution). Not a substitute for the original chapter._

## 1. Scope

This chapter equips a reader to analyze **count data** from massively-parallel sampling assays — counts of molecular features (e.g. genes, binding regions) tallied per sample in a feature-by-sample **count table** — with the goal of detecting and quantifying systematic differences in feature abundance between experimental conditions while separating them from sampling noise and biological variability. The central task is differential-abundance testing under small replicate numbers, built on the framework of linear and **generalized linear models (GLMs)**. It also covers the supporting machinery — sampling-bias correction ("normalization"), dispersion estimation, robustness to outliers, shrinkage/empirical-Bayes estimation, and variance-stabilizing data transformations — that make such analyses both powerful and honest. The methods generalize beyond sequencing to any noisy measurements compared as a function of experimental covariates.

## 2. Concepts & Methods

- **Count table.** Matrix of raw integer counts (feature $i$ in sample $j$). The sampling models require the literal raw read counts, not derived/normalized/transformed quantities.

- **Poisson model of within-library sampling.** Treating sequencing as random sampling of $r$ reads from a library where feature $i$ has proportion $p_i = n_i/n$, the count for feature $i$ is approximately Poisson with rate $\lambda_i = r\,p_i$. The reads are nearly independent because the library size $n$ ($\sim 10^9$+) hugely exceeds the read count $r$ ($\sim 10^7$), so sampling-without-replacement (multinomial) dependencies are negligible. The Poisson has the property variance $=$ mean ($v=m$).

- **Gamma-Poisson (negative binomial) model.** Across biological replicates, $p_i$ (hence $\lambda_i$) itself fluctuates (growth conditions, dosing, timing), so observed variance exceeds the Poisson prediction — **overdispersion**. A hierarchical/mixture extension, the **gamma-Poisson** distribution (a.k.a. negative binomial), adds a second parameter. It is parameterized by a mean and a per-feature **dispersion** $\alpha_i$; for large counts variance grows roughly as $v = c\,m^2$ (with $c<1$), i.e. quadratically.

- **Normalization / size factors.** Correcting for systematic sampling biases — chiefly differing total sequencing depth, but also feature-specific sampling probabilities (length, GC, structure). Each sample gets a proportionality factor (**size factor** $s_j$). Rather than the naive column-sum, a more robust estimate is obtained by **robust regression** of count ratios across features (the approach in **DESeq2**), which is more parsimonious when most features are unchanged. "Normalization" here is an unfortunate name unrelated to the normal distribution.

- **Linear models & ANOVA.** Decompose a (transformed) response $y$ into additive contributions of experimental factors: $y = \beta_0 + x_1\beta_1 + x_2\beta_2 + x_1x_2\beta_{12}$, where $x_k$ are indicator (or continuous) covariates, $\beta_0$ is the **intercept** (baseline), each $\beta_k$ an average effect, and $\beta_{12}$ an **interaction** (the two factors' effects combine non-additively; on a $\log$ scale, addition corresponds to multiplication on the original scale). On a $\log$ scale a single-factor $\beta_1$ is the **log fold change**, $\beta_1=\log_2(\text{expr}_{\text{treated}})-\log_2(\text{expr}_{\text{untreated}})$. With replicates and noise, $y_j=\sum_k x_{jk}\beta_k+\varepsilon_j$; the **design matrix** $(x_{jk})$ encodes the experiment (rows = observations, columns = factors). The $\beta$s and **residuals** $\varepsilon_j$ are fit by **least sum of squares**, $\sum_j\varepsilon_j^2\to\min$, solvable by linear algebra (R's `lm`). Viewing this as **analysis of variance (ANOVA)** partitions observed variability into systematic components plus unexplained **noise** (the noise/systematic split depends on the model, not on reality).

- **Robust regression.** Least squares has a low **breakdown point** (a single outlier can arbitrarily move the fit; the mean's breakdown is $\frac{1}{n}$, vs. the **median**'s $\frac{1}{2}$ — the median minimizes $\sum_j|y_j-\beta_0|$). Alternatives that downweight outliers: **least absolute deviations** ($\sum_j|\varepsilon_j|$, a generalization of the median); **M-estimation** ($\sum_j\rho_s(\varepsilon_j)$, with a penalty $\rho_s$ quadratic near 0 but flattening beyond scale $s$ — Huber's choice is quadratic for $|\varepsilon|<s$ and linear, $s|\varepsilon|-\tfrac12 s^2$, beyond); **least quantile of squares (LQS)** and **least trimmed squares (LTS)** (replace the full sum of squared residuals with a quantile $Q_\theta$ or a sum over only the smallest fraction $\theta$); and **weighted regression** ($\sum_j w_j\varepsilon_j^2$, zeroing weights of flagged outliers, e.g. via **Cook's distance** in DESeq2).

- **Generalized linear models (GLMs).** Two generalizations of ordinary linear models: (1) a **link function** transforming the linear predictor so the modeled mean respects natural ranges (e.g. the **logistic** $f(y)=1/(1+e^{-y})$ for $[0,1]$ outcomes, giving **logistic regression**; $\log_2$ for counts); and (2) replacing the implicit normal-residual assumption with another **error distribution**. Least squares itself is the **maximum-likelihood** solution under normal residuals $p(\varepsilon_j)\propto\exp(-\varepsilon_j^2/2\sigma^2)$ with the likelihood $\prod_j p(\varepsilon_j)$ maximized; substituting another density (e.g. gamma-Poisson) yields the corresponding GLM.

- **GLM for counts (DESeq2 form).** $K_{ij}\sim \mathrm{GP}(\mu_{ij},\alpha_i)$; $\mu_{ij}=s_j\,q_{ij}$; $\log_2(q_{ij})=\sum_k x_{jk}\beta_{ik}$. Counts are gamma-Poisson with mean $\mu_{ij}$ split into the sample size factor $s_j$ and a quantity $q_{ij}$ proportional to true concentration; the $\log_2$ link connects $q_{ij}$ to the per-feature linear model; dispersion $\alpha_i$ is per-feature but shared across samples; coefficients $\beta_{ik}$ are per-feature $\log_2$ fold changes. Inference uses a Wald test on a coefficient (conceptually a more involved analogue of the **$t$-test**). A wrapper runs, in order, size-factor estimation, dispersion estimation, and the negative-binomial Wald test.

- **Shrinkage / empirical Bayes.** With few replicates, per-feature maximum-likelihood estimates (MLEs) of dispersions $\alpha_i$ (and optionally fold changes $\beta$) are noisy. An **empirical-Bayes** prior is built from the distribution of all features' MLEs (unimodal, peaked at the typical dispersion, and for $\beta$ near 0); each per-feature MLE is **shrunk** toward that peak, by an amount governed by the prior's sharpness and the estimate's precision (noisier/wider likelihoods are shrunk more). This is **sharing of information across features**.

- **Count-data transformations.** For visualization/clustering (not testing): the **shifted/pseudocount log** $y=\log_2(n+n_0)$; the **variance-stabilizing transformation (VST)** (derived from the gamma-Poisson mean-variance relationship so post-transform variance is roughly constant across the range); and the **regularized logarithm (rlog)**, a $\log_2$-like transform built from shrinkage estimation (fitting a per-sample model with a prior on coefficients, which also makes an otherwise non-unique design solvable). Both VST and rlog are finite and well-behaved near zero (unlike plain $\log_2$); rlog handles strongly differing size factors better.

- **Outlier handling for counts.** **Cook's distance** flags samples that overly influence a feature's fitted coefficients; affected features are set aside (p-values set to NA) by default. With many degrees of freedom, an alternative replaces a single outlier count with the (size-factor-adjusted) trimmed mean across samples.

- **Threshold ("banded") tests.** Instead of testing the point null (effect exactly zero), test whether $|\beta|$ exceeds a $\log_2$ fold-change threshold $\theta$ via Wald tests: `greater` ($\beta>\theta$), `less` ($\beta<-\theta$), `greaterAbs` ($|\beta|>\theta$), `lessAbs` ($|\beta|<\theta$).

## 3. When It Applies

- **Use the Poisson model** only as the within-single-library sampling baseline (technical replicates). It is adequate where $v\approx m$ — the low-count regime — but underestimates variance between biological replicates.
- **Use the gamma-Poisson/negative-binomial GLM** for differential abundance across biological replicates of raw counts, where overdispersion (variance growing super-linearly with the mean) is present and replicate numbers are small. This is the appropriate default for designed sequencing experiments.
- **Resampling/permutation-based testing** is appropriate only when biological-replicate numbers are large; for small designed experiments it lacks power, forcing reliance on distributional (parametric) assumptions to compute tail probabilities from few parameters.
- **Linear models (vs. simple group averaging).** Group-mean comparison suffices only with equal replicate counts per group and purely categorical factors; prefer fitting a linear model when group sizes are unequal or any covariate is continuous, and to handle multifactor designs.
- **Multifactor models / blocking.** Add a **blocking (nuisance) factor** when a known systematic covariate (e.g. batch, sequencing protocol) affects the data, to separate the effect of interest from confounders. Put the factor of interest last in the formula by convention. For **paired designs**, add the pairing identity (a multi-level factor) as a blocking factor.
- **Interaction terms** are included only when the combinatorial treatment is present and the non-additive combined effect is of interest; otherwise drop the interaction term.
- **Threshold/banded null** is the right choice when biological relevance (effect size) matters and large sample sizes would otherwise make trivially small effects significant.
- **Robust regression** applies when outliers are plausible and replication is sufficient to identify them; the specific method (LAD, M-estimation, LQS/LTS, weighting) trades robustness against efficiency and computational cost.
- **VST vs. rlog:** both for downstream visualization/clustering; choose rlog when samples' size factors differ greatly.

## 4. Assumptions & Validity Conditions

- **Raw counts required.** Sampling models are valid only on direct integer read counts; feeding normalized/derived values yields nonsensical results.
- **Near-independence / Poisson approximation.** Justified by $n\gg r$, many features, each $n_i\ll n$; the multinomial/without-replacement dependence is treated as negligible.
- **Ordinary linear model assumptions.** Residuals independent, normal, zero-mean, equal variance (homoskedastic). Count data violate these (discrete, skewed, heteroskedastic), which is precisely why the GLM generalization is needed. The normal assumption motivates least squares via maximum likelihood but is not strictly required for least squares to give useful $\beta$ estimates.
- **Count GLM structure.** Gamma-Poisson counts; dispersion per-feature but constant across samples (extendable); a $\log_2$ link; a design matrix shared across all features.
- **"Few changes" assumption.** Default normalization and dispersion estimation assume most features are not differentially abundant. For normalization (not dispersion) this can be relaxed to "many change but balanced up/down."
- **Identifiability.** The residual minimization (or a prior, in rlog) is needed because the noisy system has more unknowns than equations; without it (or without a prior on non-intercept $\beta$s) the solution is underdetermined/non-unique.
- **Procedure fixed in advance.** The point or banded null and the threshold $\theta$ are model/design choices to be set deliberately, not after inspecting results.
- **Shrinkage prior.** Empirical-Bayes shrinkage assumes features are exchangeable enough that the cross-feature MLE distribution is a sensible prior (unimodal in practice).
- **Robustness methods** rest on outliers being rare and on sufficient replication; each carries a subjective tuning parameter ($s$, $\theta$, or weights).

## 5. Failure Modes & Invalidity Patterns

- **Using Poisson (or normal/log-normal) where overdispersion exists.** Treating biological replicates as Poisson underestimates variance, inflating false positives; normal/log-normal fit count data poorly because counts are non-negative, discrete, skewed, and heteroskedastic.
- **Operating on non-raw counts.** Applying the sampling model to normalized or otherwise transformed values invalidates the model entirely.
- **Naive size factors when "few changes" fails.** If many features change in an unbalanced direction, sum-/ratio-based normalization is biased; remedy by estimating size factors (and dispersions) only from trusted negative-control or spiked-in features.
- **Ignoring a strong nuisance/blocking factor.** Unmodeled systematic variation (e.g. batch, protocol) is absorbed into the residuals, enlarging $\varepsilon_j$, inflating uncertainty in $\beta$, and reducing power (warning sign: clustering or PCA dominated by a nuisance factor; a p-value histogram tilted up toward the right, indicating batch effects). Detect via EDA (PCA/ordination, heatmaps, p-value histograms).
- **Confounding.** When the factor of interest and a nuisance factor are not balanced (partially/fully confounded), differences caused by the nuisance can be misattributed to the factor of interest — possibly yielding *more*, but spurious, "significant" results. A design that cannot absorb nuisance variation into its own term is scientifically compromised.
- **Trade-off in adding parameters.** Adding a blocking factor costs **degrees of freedom**; whether net power rises or falls depends on the data — more parameters is not automatically better.
- **Point-null over-sensitivity at large $n$.** The point null (effect exactly zero) is essentially never literally true; with large samples, statistically significant but biologically trivial effects (e.g. tiny indirect/downstream perturbations) proliferate. The chapter flags this as a "major and quite valid critique": the approach does not give consistent estimates of which features are truly differential. Mitigate with effect-size thresholds / banded nulls.
- **Outlier-driven fits.** A single outlying count can dominate least-squares $\beta$ estimates (low breakdown point).
- **Subjectivity of outlier removal.** Outlier downweighting/removal introduces analyst-chosen parameters ("one scientist's outlier may be another's Nobel prize") and is no remedy for sloppy experiments or wishful thinking.
- **Discreteness artifacts.** Isolated mid-/right peaks in a p-value histogram can arise from low-count features reflecting data discreteness, not signal.
- **Mistaking interaction for physical interaction.** $\beta_{12}$ denotes statistical non-additivity, not a physical/biochemical interaction.
- **Limits of isoform deconvolution.** Short-read RNA-Seq makes full-length isoform reconstruction unreliable; more modest local statements (e.g. single-exon inclusion) are more robust.

## 6. Empirical Checks & Calibration

- **Mean-variance diagnostic.** Plot per-feature variance against mean (log axes) for replicates; compare to the Poisson line ($v=m$) and quadratic line ($v=m^2$). Pass: Poisson-like at low counts, quadratic ($v=cm^2$, $c<1$) at high counts — confirming overdispersion and justifying the gamma-Poisson model.
- **p-value histogram.** A uniform background (non-differential features) plus a left peak (differential features) indicates a well-calibrated test; the background-to-peak ratio gives a rough **false discovery rate (FDR)** for a leftmost bin. A right-rising tilt signals batch effects; depletion of small p-values signals an unmodeled balanced covariate inflating the test-statistic denominator (demonstrable by a known-truth simulation where, under no true association, a balanced batch effect depletes small p-values — and is cured by adding the batch term).
- **Simulate under known truth.** The likelihood viewed as $f(y)$ with parameters fixed is a generative model usable to **simulate data**; e.g. generate null data with an injected balanced batch effect to show how a $t$-test's p-value histogram distorts and how the correct linear model restores uniformity.
- **EDA quality plots.** MA plot (fold change vs. mean of normalized counts), PCA/ordination (does the leading axis align with the covariate of interest or with a nuisance factor?), and heatmaps (does sample clustering track condition or nuisance?) — to reveal batch effects and check whether the model is too naive.
- **Comparing models.** Cross-tabulate or scatter the p-values of competing models (e.g. one-factor vs. two-factor) and count discoveries at a fixed FDR to see whether accounting for a blocking factor gains power.
- **Size-factor sanity check.** Compare robust size-factor estimates against simple column sums (often nearly proportional, but divergence flags composition bias).
- **Transformation diagnostics.** Plot per-feature standard deviation against the rank of the mean for shifted-log vs. VST vs. rlog; a flat curve indicates successful variance stabilization, whereas plain shifted-log inflates SD for weakly detected features.
- **Cook's-distance outlier diagnostic.** Per feature/sample influence measure; values above the cutoff (default the 99% quantile of $F(p,m-p)$, with $p$ parameters and $m$ samples) flag outliers.

## 7. Interpretation, Guidance & Trade-offs

- **What a coefficient means.** $\beta_{ik}$ is the $\log_2$ fold change of feature $i$ for that design column; on the log scale, additive effects correspond to multiplicative ones on the original scale. A reported "log2 fold change (MLE), treated vs untreated" states numerator/denominator explicitly via the contrast.
- **Significance is not relevance.** A small p-value need not mean a biologically meaningful effect, especially as sample size grows; report and threshold on **effect size** (banded null / `lfcThreshold`) alongside significance. At small sample sizes, what is significant tends also to be large enough to matter — a pragmatic reason the point null is often acceptable there.
- **FDR over raw p-values.** Use adjusted p-values; the p-value histogram's background/peak ratio gives an intuitive FDR estimate (e.g. for a chosen leftmost bin).
- **Normalize before comparing.** Always estimate and apply size factors; prefer robust estimation over column sums when composition bias is plausible.
- **Model the design honestly.** Include known blocking/nuisance factors and use paired/blocked analyses when applicable; balance the factor of interest against nuisance factors to avoid confounding. The "scientific content" of a linear model lives in its design matrix.
- **Shrinkage trades a little bias for large variance reduction** — generally worthwhile under small replicate numbers.
- **Exact vs. approximate / robust vs. simple.** Least squares is fast (linear algebra) but fragile to outliers; robust variants (M/LQS/LTS) cost iterative optimization and tuning, while weighted/Cook's-distance schemes keep computation cheap. LAD generalizes the median but can be less stable/efficient with limited data.
- **Transform purpose-fit.** Test on raw counts with discrete distributions; use VST or rlog only for visualization/clustering/dimension-reduction (rlog preferred under very unequal size factors).
- **Outlier policy.** Default is to flag-and-set-aside via Cook's distance (conservative); with many degrees of freedom, replacing the outlier by the null-predicted (trimmed-mean) value avoids discarding whole features and will not create false positives. Decisions about outliers must be principled, not wishful.
- **Hidden factors.** If undocumented batch effects are suspected, use unsupervised surrogate-variable / latent-factor methods to estimate blocking factors.

## 8. Connections & Key Terms

**Builds on:** probability distributions and the Poisson process; hierarchical/mixture models (gamma-Poisson as an overdispersed Poisson); maximum-likelihood estimation; hypothesis testing and the $t$-test; multiple-testing/FDR via p-value histograms; Bayesian/empirical-Bayes reasoning; variance-stabilizing transformations; PCA/ordination and clustering for EDA.
**Sets up:** general use of GLMs and design matrices for noisy data with experimental covariates; robust regression; shrinkage estimation as a small-sample remedy; transformations enabling unsupervised downstream analysis; and the bridge from point-null testing to effect-size-aware (banded) inference. The exon-usage extension generalizes the same GLM to local (sub-feature) tests.

**Glossary:**
- **Count table** — feature-by-sample matrix of raw integer counts.
- **Heteroskedasticity** — variance changing across the data's dynamic range.
- **Normalization / size factor $s_j$** — per-sample scaling correcting systematic sampling biases (mainly depth); a robust ratio estimate beats the column sum.
- **Dispersion $\alpha$** — overdispersion parameter; extra variability beyond Poisson.
- **Gamma-Poisson / negative binomial** — two-parameter (mean, dispersion) count distribution capturing overdispersion.
- **Design matrix $(x_{jk})$** — encodes which factor levels apply to each observation; carries the model's scientific content.
- **Intercept $\beta_0$** — baseline response level.
- **Log fold change $\beta$** — effect of a factor on the $\log_2$ scale; difference of logs.
- **Interaction $\beta_{12}$** — non-additive combination of two factors (not a physical interaction).
- **Residual $\varepsilon_j$** — deviation of an observation from the model fit; absorbs noise.
- **Least sum of squares** — fit minimizing $\sum_j\varepsilon_j^2$; ML under normal residuals.
- **ANOVA** — partition of observed variability into systematic effects plus noise.
- **Link function** — transform (e.g. $\log_2$, logistic) connecting the linear predictor to the modeled mean.
- **Generalized linear model (GLM)** — linear model with a link function and a non-normal error distribution.
- **Breakdown point** — fraction of contaminating data needed to ruin an estimate (mean $\frac1n$, median $\frac12$).
- **Robust regression** — outlier-resistant fitting (LAD, M-estimation, LQS, LTS, weighting).
- **M-estimation** — robust fit using a penalty $\rho_s$ that downweights large residuals beyond scale $s$.
- **Cook's distance** — influence measure flagging an observation that overly sways a fit.
- **Shrinkage / empirical Bayes** — pulling noisy per-feature estimates toward a prior built from all features.
- **Variance-stabilizing transformation (VST)** — transform making variance roughly constant across the range.
- **Regularized logarithm (rlog)** — shrinkage-based $\log_2$-like transform, robust to unequal size factors.
- **Blocking / nuisance / batch factor** — a known (or latent) covariate modeled to remove its systematic effect.
- **Confounding** — entanglement of a factor of interest with a nuisance factor, biasing attribution.
- **FDR** — expected proportion of false positives among called discoveries.
- **Banded / threshold null** — null hypothesis that $|\beta|$ lies within (or beyond) a fold-change threshold $\theta$, testing for effects of meaningful size.
