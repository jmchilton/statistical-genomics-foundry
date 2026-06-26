---
title: "Mixture Models"
source: msmb
source_chapter: 4
source_url: https://www.huber.embl.de/msmb/04-chap.html
license: CC-BY-NC-SA-2.0
license_file: LICENSES/msmb.LICENSE
attribution: "Holmes S, Huber W. Modern Statistics for Modern Biology. Cambridge University Press; 2019. https://www.huber.embl.de/msmb/"
derived: own-words-summary
---

# Mixture Models — MSMB Chapter 4 (summary)

_Own-words summary of an external source (see frontmatter for license/attribution). Not a substitute for the original chapter._

## 1. Scope

This chapter covers **mixture models**: probability models that represent a heterogeneous population as a weighted combination of simpler component distributions. It equips a reader to (a) build realistic models of multimodal or overdispersed data by mixing tractable building blocks (normal, Poisson, binomial), (b) recover hidden subgroup structure when the group label of each observation is unobserved, and (c) handle the practical consequences of mixing — extra zeros, mean-dependent variance, and the need to quantify the sampling variability of an estimate without a closed-form formula. It distinguishes **finite mixtures** (a few components, each interpretable as a latent class) from **infinite mixtures** (as many components as observations, used to construct new distributions or to capture per-observation variability rather than to assign labels).

## 2. Concepts & Methods

**Finite mixture density.** A mixture of $K$ components has density $f(x)=\sum_{k=1}^K \lambda_k\,\phi_k(x)$, where each $\phi_k$ is a component density and the **mixing proportions** $\lambda_k\ge 0$ satisfy $\sum_k \lambda_k = 1$. Generatively: pick a component $k$ with probability $\lambda_k$, then draw from $\phi_k$. The two-component normal mixture $f(x)=\lambda\,\phi_1(x)+(1-\lambda)\,\phi_2(x)$, with $\phi_k$ the density of $N(\mu_k,\sigma_k^2)$, has parameter vector $\theta=(\mu_1,\mu_2,\sigma_1,\sigma_2,\lambda)$. The smooth limiting shape a histogram approaches as bins shrink and counts grow is the **density**; well-separated components give a visibly **bimodal** density, but components can overlap so much the mixture looks unimodal.

**Latent (hidden) class label.** Augment each observation $x_i$ with an unobserved label $u_i$ indicating which component generated it. The complete-data likelihood factorizes as $p(x,u\,|\,\theta)=p(x\,|\,u,\theta)\,p(u\,|\,\theta)$. If labels were known, estimation would split into independent per-group maximum-likelihood estimates (MLEs) plus the label frequencies for the $\lambda_k$. They are not known, which is what makes the problem hard.

**Expectation-Maximization (EM) algorithm.** An iterative method to fit a mixture (or any model with latent variables) by maximum likelihood when direct maximization of the marginal likelihood is intractable. It alternates:
- **E step:** holding $\theta$ fixed, compute each observation's **membership weights** (soft posterior label probabilities), $w(x,1)=\dfrac{\lambda\,\phi_1(x)}{\lambda\,\phi_1(x)+(1-\lambda)\,\phi_2(x)}$ and $w(x,2)=1-w(x,1)$.
- **M step:** holding the weights fixed, update $\theta$ to its weighted maximum-likelihood estimate.

Iterate until $\theta$ and the likelihood stop changing materially. More formally, given current estimate $\theta_t$, the E step forms the expected complete-data log-likelihood $Q(\theta,\theta_t)=\int_U \log p(x,u\,|\,\theta)\,p(u\,|\,x,\theta_t)\,dU$, and the M step sets $\theta_{t+1}=\arg\max_\theta Q(\theta,\theta_t)$. Key ideas: **soft averaging** (an observation participates fractionally in several groups rather than being hard-assigned), and decomposing one intractable problem into two easy alternating ones. The same machinery generalizes to model averaging (combining several candidate models weighted by their likelihoods). The chapter distinguishes the **prior** mixing probability $\lambda$ (before seeing $x$) from the **posterior** membership weight $w(x,\cdot)$ (after seeing $x$).

**Zero-inflation.** A finite mixture for count data with an excess of zeros: $f_{\text{zi}}(x)=\lambda\,\delta(x)+(1-\lambda)\,f_{\text{count}}(x)$, where $\delta$ is the point mass at 0 (Dirac delta). The first component contributes **structural zeros** (the phenomenon is simply absent); the second is an ordinary count distribution that may itself produce zeros and small numbers by sampling. Answers "are there more zeros than an ordinary count model would produce?" The proportion of structural zeros is sometimes written $\pi_0$.

**Empirical cumulative distribution function (ECDF) and empirical density.** Treating a sample of size $n$ as a mixture of $n$ equal-weight point masses at the observed values: $\hat F_n(x)=\frac1n\sum_{i=1}^n \mathbb{1}_{x\le x_i}$ (the ECDF, a step function) and correspondingly $\hat f_n(x)=\frac1n\sum_{i=1}^n \delta_{x_i}(x)$ (the empirical density). Sample statistics (mean, median, etc.) are functionals of this empirical distribution. This is the extreme finite mixture: as many components as data points.

**Nonparametric bootstrap.** A resampling method to approximate the **sampling distribution** of a statistic $\hat\tau$ — i.e., how much $\hat\tau$ would vary across hypothetical fresh datasets from the true distribution $F$ — when that true sampling distribution is unavailable. Because the true $F$ is unknown, the bootstrap substitutes the empirical distribution $\hat F_n$: draw $B$ resamples of size $n$ with replacement from the observed data, recompute the statistic $\hat\tau^*$ on each, and use the spread of these as the estimated sampling distribution. "Nonparametric" because the implied model has as many parameters as data points. Applicable to essentially any statistic, however complex, with no closed-form needed.

**Infinite mixtures of normals (scale mixtures).** A two-level (hierarchical) generative scheme where each observation gets its own variance drawn from another distribution. With variances $W\sim \text{Exp}(1)$ and $X=\sqrt{W}\cdot Z$, $Z\sim N(0,1)$, the marginal is the **Laplace (double-exponential) distribution**, $f_X(y)=\frac{1}{2\phi}\exp\!\left(-\frac{|y-\theta|}{\phi}\right)$, whose location $\theta$ is estimated by the median and whose scale $\phi$ is estimated by the median absolute deviation (MAD). The Laplace gives weight to the $L_1$ (absolute) distance where the normal gives weight to $L_2$ (squared) distance; as a prior on regression coefficients it corresponds to the $L_1$ penalty (**lasso**) versus the normal's $L_2$ penalty (**ridge regression**). The **asymmetric Laplace** $AL(\theta,\mu,\sigma)$ lets both means and variances of the normal components depend on $W$, giving $E(X)=\theta+\mu$ and $\text{var}(X)=\sigma^2+\mu^2$ — a built-in mean-variance link (variance depends on the mean unless $\mu=0$).

**Gamma distribution.** A flexible two-parameter (shape, scale/rate), positive, continuous distribution; a generalization of the one-parameter exponential. Unlike the exponential (mode at 0), its density peaks at a finite positive value. Used as the upper level of a hierarchical model.

**Gamma-Poisson mixture (negative binomial).** Generate rates $\lambda_i$ from a gamma distribution, then draw $K_i\sim \text{Poisson}(\lambda_i)$. The marginal of $K$ is the **gamma-Poisson distribution**, identical to the **negative binomial distribution**: $P(K=k)=\binom{k+a-1}{k}p^a(1-p)^k$, a discrete distribution on the natural numbers. Reparameterized by mean $\mu=pa/(1-p)$ and **dispersion** $\alpha=1/a$, its variance is $\mu+\alpha\,\mu^2$ — strictly larger than the Poisson's variance ($=\mu$), i.e., overdispersed. The mechanism: real count data have a Poisson measurement layer whose rate itself varies across units.

**Variance-stabilizing transformations (VST).** A transformation $g$ chosen so that transformed data have roughly constant variance despite a mean-variance relationship $v(\mu)$ in the original data. Via the **delta method** (first-order Taylor expansion $g(X_i)\approx g(\mu_i)+g'(\mu_i)(X_i-\mu_i)$), $\text{Var}(g(X_i))\approx g'(\mu_i)^2\,v(\mu_i)$; requiring this constant gives the differential equation $g'(x)=\dfrac{1}{\sqrt{v(x)}}$. Solutions: $v(\mu)=\mu$ (Poisson) $\Rightarrow g(x)=\sqrt{x}$; $v(\mu)=\alpha\mu^2$ (constant coefficient of variation) $\Rightarrow g(x)=\log x$; the gamma-Poisson case $v(\mu)=\mu+\alpha\mu^2$ gives a transformation behaving like $\sqrt{x}$ for small counts and like $\log x$ for large counts.

## 3. When It Applies

- **Finite normal mixture + EM:** use when data are a blend of a *known, small number* of components of *known parametric form* (e.g., normal), and you want to recover both the component parameters and per-observation group membership. Appropriate when modes are biologically meaningful subpopulations.
- **Zero-inflation:** use for count data where zeros plausibly arise from two distinct causes — true absence (structural) versus sampling — and the observed zero frequency looks elevated relative to the small positive counts.
- **ECDF / nonparametric bootstrap:** use to assess the variability (e.g., a confidence interval) of *any* statistic, especially when no closed-form sampling distribution exists; the chapter applies it to the median, whose sampling distribution is awkward analytically.
- **Infinite (scale) mixtures — Laplace / asymmetric Laplace:** use to model continuous measurements that are more heavy-tailed/peaked than normal, or that exhibit a mean-variance dependence, where you do *not* want to assign discrete labels.
- **Gamma-Poisson / negative binomial:** use for count data (read counts, abundances) that are overdispersed relative to Poisson because the underlying rate varies across units. Preferred over plain Poisson whenever the observed variance exceeds the mean.
- **Variance-stabilizing transformation:** use before applying downstream methods that assume homoscedasticity (equal variances) — e.g., regression or tests — when the data are heteroscedastic with a known or estimable mean-variance relationship. The square-root transform works for Poisson-like data even without knowing each observation's mean.

Distinguishing EM from clustering: EM (finite mixture) requires you to commit to the parametric form *and* the number of components; clustering (next chapter) finds groupings without that information. The chapter notes a strong conceptual relationship between the two.

## 4. Assumptions & Validity Conditions

- **Finite mixture / EM:** the parametric family of each component and the *number* of components $K$ must be specified in advance. The model assumes observations are independent draws from the mixture. The likelihood surface may be multimodal, so the answer depends partly on initialization; convergence is to *an* optimum, not provably the global one.
- **Mixing proportions** must form a valid probability vector ($\lambda_k\ge0$, $\sum_k\lambda_k=1$).
- **Resolvability of components:** distinguishing components requires enough data and enough precision (small enough component spread relative to the separation of their centers). With few observations or large noise, distinct modes blur into one and the mixture is not recoverable.
- **Zero-inflation:** assumes the two zero-generating processes (structural vs. sampling) are genuinely distinct; the count component must be correctly specified.
- **Bootstrap:** assumes the empirical distribution $\hat F_n$ is a good stand-in for the true $F$ — which requires the sample to be reasonably large and not badly biased. It treats the observed sample as if it *were* the population.
- **Gamma-Poisson:** the latent rate is assumed gamma-distributed and the conditional count Poisson; the result is discrete and overdispersed by construction.
- **VST / delta method:** $g$ must be differentiable (a mild assumption); the first-order Taylor approximation is local — it holds for values of $X_i$ in the neighborhood of $\mu_i$ and neglects higher-order terms. A correct mean-variance relationship $v(\mu)$ must be supplied.
- **Mixtures and exchangeability:** the chapter notes (as background) that mixture representations arise naturally when observations are *exchangeable* (order-invariant).

## 5. Failure Modes & Invalidity Patterns

- **Direct MLE of a mixture is intractable.** Even with the mixing proportion known, the log-likelihood of a normal mixture cannot be maximized in closed form: the optimal weights depend on the parameters being estimated, and those parameters depend on the weights — a "vicious circle." Trying to solve it directly fails; EM exists precisely to break this circle. *Sign:* no analytic MLE; *fix:* iterate (EM).
- **EM converging to a local, not global, optimum.** Because the iteration's endpoint can depend on the starting point when the likelihood has multiple peaks, a single run may report a spurious fit. *Detect/avoid:* run EM from several different starting values and confirm they agree before trusting the result.
- **Misjudging zero excess by eye.** On a linear-count histogram it is not obvious whether the number of zeros is truly extraordinary given the frequencies of 1, 2, …. *Sign:* eyeballing a count histogram; *fix:* replot counts on a log scale (and/or estimate $\pi_0$ explicitly) so the relative height of the zero bar becomes interpretable.
- **Treating a heavy-tailed / mean-variance-linked distribution as normal.** Data generated by scale mixtures (Laplace, asymmetric Laplace) have heavier tails and/or variance tied to the mean; assuming normality misstates spread and tail behavior.
- **Ignoring overdispersion (using Poisson when gamma-Poisson is needed).** Count data with unit-to-unit rate variation have variance $\mu+\alpha\mu^2 > \mu$; a Poisson model understates variance and will overstate confidence in downstream inference.
- **Heteroscedasticity breaking downstream methods.** Mixture/hierarchical data often have variance that grows with the mean (**heteroscedasticity**). Methods that assume equal variances are invalidated. Worse, in real data the heteroscedasticity may be *hidden* — the data are not stratified by a known mean as in a simulation, so the variance structure is there but not visually obvious.
- **Over-trusting the bootstrap with small or biased samples.** The bootstrap still uses an *approximate* distribution (the data's, not the truth's). If the original sample is small or biased, the approximation can be poor *no matter how many resamples* are drawn — increasing the resample count only reduces Monte Carlo error, not the underlying approximation error. *Two error sources:* Monte Carlo error (reducible by more resamples) and the empirical-vs-true-distribution gap (not reducible that way).
- **Mistaking the prior mixing weight for the posterior membership weight.** $\lambda$ (probability before observing $x$) and $w(x,\cdot)$ (probability after observing $x$) are different quantities; conflating them misstates how confidently an observation is assigned.

## 6. Empirical Checks & Calibration

- **Simulate under a known data-generating truth.** The chapter's central pedagogical device: generate data from a mixture with *known* parameters and labels, then check whether the histogram, density, or fitting procedure recovers the truth. Used to (a) see how many observations/how much precision are needed before component modes become distinguishable, and (b) sanity-check that an estimator returns the planted values.
- **Bootstrap to obtain a sampling distribution / confidence interval.** Resample with replacement, recompute the statistic, and read off the spread; e.g., a 99% bootstrap interval for the median, judged by whether it overlaps a null value (here, 0). Comparing the bootstrap distributions of the mean vs. the median reveals which estimator is more stable for the data at hand. Pass = interval excludes the null and is tight; fail/uninformative = wide interval straddling the null.
- **Goodness-of-fit by rootogram.** To check whether counts follow a posited distribution (e.g., negative binomial / gamma-Poisson), fit it and plot a **rootogram**: theoretical probabilities as points, square roots of observed frequencies as bar heights. Bars ending near the horizontal axis indicate a good fit; systematic departures indicate the wrong distribution.
- **Direct variance check for a transformation.** Stratify simulated data by the mean, compute the standard deviation of raw vs. transformed values per stratum, and confirm the transformed SD is approximately constant across means (e.g., $\sqrt{n}$ giving SD $\approx 0.5$ regardless of Poisson rate). Pass = constant SD across the mean range; fail = SD still trends with the mean. The empirically derived piecewise-linear stabilizing function can be cross-checked against the analytic delta-method solution, and the analytic VST verified by confirming $g'(x)=1/\sqrt{v(x)}$.

## 7. Interpretation, Guidance & Trade-offs

- **Membership weights are probabilities, not hard labels.** A weight $w(x,1)$ says how much an observation participates in component 1; reporting soft weights gives more nuanced estimates than forcing a hard assignment. Do not read $\lambda$ (the prior, population-level fraction) as the posterior membership of a specific observation.
- **The "right" mixture complexity is not absolute.** How many components to use depends on the amount of data and the resolution/smoothness desired — it is a modeling choice, not a fact to be discovered. More data and better precision let you justify more components.
- **Always re-run EM from multiple starts** and report consistency across them; a fit from a single starting point is not trustworthy.
- **Choose the count model by its mean-variance behavior.** If variance $\approx$ mean, Poisson suffices; if variance exceeds the mean (overdispersion), use gamma-Poisson / negative binomial and report the dispersion $\alpha$ (or equivalently $a$).
- **Apply a variance-stabilizing transformation before homoscedasticity-assuming analyses.** The square root is the default for Poisson-like counts; the logarithm is appropriate when the standard deviation is proportional to the mean (constant coefficient of variation); the gamma-Poisson VST interpolates between these (square-root-like for small values, log-like for large). Any affine rescaling $u\,g+v$ of a VST is also a VST, so absolute scale is a free choice (e.g., $2\sqrt{n}$ to get unit variance).
- **Bootstrap trade-offs.** It is general and assumption-light, but its accuracy is capped by sample size and representativeness, not by computational effort — be candid that more resamples cut only Monte Carlo error. The exhaustive bootstrap is itself only an approximation to the true sampling distribution.
- **Hierarchical/mixture modeling honesty.** Reporting should make explicit which layers of variability (detection-limit noise, instrument-to-instrument, reagent, operator, biological) are being modeled, because mixtures exist precisely to represent these stacked sources; conclusions about "true differences between conditions" are only trustworthy after the within-condition (replicate) variability has been correctly modeled and stabilized.

## 8. Connections & Key Terms

**Builds on:** simple generative models and named distributions (normal, Poisson, binomial, exponential) as building blocks; maximum-likelihood estimation; the empirical cumulative distribution as a way to summarize a sample. **Sets up:** clustering (finding groups without specifying component form or count — conceptually a relaxation of finite-mixture/EM); generalized linear models and the negative-binomial modeling of high-throughput count data; multiple-testing's two-component (null/alternative) mixture model; and the use of hierarchical/exchangeable models throughout downstream high-dimensional analysis. Variance stabilization recurs as a normalization step for sequencing-style data.

**Key terms:**
- **Mixture model** — a distribution written as a weighted sum of component distributions; generatively, pick a component then draw from it.
- **Finite vs. infinite mixture** — few interpretable components vs. as many components as observations (used to build distributions or model per-observation variability).
- **Mixing proportion ($\lambda_k$)** — the prior weight/probability of each component; nonnegative and summing to 1.
- **Latent (hidden) variable** — an unobserved quantity (here, the component label $u$) added to the model to make estimation tractable.
- **EM algorithm** — iterative maximum-likelihood fitting that alternates an Expectation step (compute membership weights) and a Maximization step (update parameters).
- **Membership weight** — the posterior probability $w(x,k)$ that observation $x$ came from component $k$; a soft, fractional assignment.
- **Zero-inflation / structural zeros** — a mixture adding a point mass at 0 to a count distribution, separating "truly absent" zeros from sampling zeros.
- **Dirac delta ($\delta$)** — an idealized point mass placing all probability at one value.
- **ECDF ($\hat F_n$)** — the empirical cumulative distribution; a step function rising by $1/n$ at each observed value.
- **Sampling distribution / sampling variability** — the distribution of an estimate $\hat\tau$ across hypothetical repeated datasets.
- **Bootstrap (nonparametric)** — approximating the sampling distribution by resampling with replacement from the observed data (i.e., from $\hat F_n$).
- **Laplace distribution** — a heavy-tailed distribution arising as a scale mixture of normals; location estimated by the median, scale by the MAD; corresponds to an $L_1$ (lasso) penalty.
- **Gamma distribution** — flexible positive two-parameter (shape, scale) continuous distribution; building block for hierarchical models.
- **Gamma-Poisson / negative binomial** — the discrete distribution obtained by mixing Poisson counts over gamma-distributed rates; overdispersed, with variance $\mu+\alpha\mu^2$.
- **Dispersion ($\alpha$)** — parameter quantifying overdispersion above Poisson ($\alpha=1/a$).
- **Heteroscedasticity** — non-constant variance across the data range (often variance increasing with the mean).
- **Variance-stabilizing transformation** — a function $g$ making variance approximately constant; derived via the delta method from $g'(x)=1/\sqrt{v(x)}$.
- **Delta method** — first-order Taylor approximation relating $\text{Var}(g(X))$ to $g'(\mu)^2\,v(\mu)$.
- **Rootogram** — a goodness-of-fit plot comparing theoretical probabilities (points) to square-rooted observed frequencies (bars).
- **Exchangeability** — invariance of a sequence's distribution under reordering; the theoretical basis for representing data as mixtures.
