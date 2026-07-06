---
title: "Statistical Modeling"
source: msmb
source_chapter: 2
source_url: https://www.huber.embl.de/msmb/02-chap.html
---

# Statistical Modeling — MSMB Chapter 2 (summary)

_Own-words summary of an external source (see frontmatter for license/attribution). Not a substitute for the original chapter._

## 1. Scope

This chapter covers statistical **inference**: reasoning *upward* from observed data to a plausible generating probability model and its unknown parameter(s), in contrast to probability, where the model and its parameters are known in advance and one reasons deductively about data. It equips a reader to (a) propose a parametric distribution for count, categorical, or waiting-time data and check the fit, (b) estimate parameters by maximum likelihood or by the Bayesian paradigm, (c) build a null model and test departures from it by simulation or by reference to a known theoretical distribution, and (d) model and exploit dependencies along a sequence. The treatment is parametric (a small number of unknown parameters) but the principles are presented as general.

## 2. Concepts & Methods

- **Probabilistic vs. statistical model.** A probabilistic model is fully specified (family *and* parameter values known), so event probabilities follow by deduction. A statistical model leaves the family $F$ and/or its parameters unknown; the data are used to choose $F$ and estimate parameters — this upward step is **inference**. Notation: data $X$ (or $x$); a generic parameter tuple $\theta$ (e.g. $\theta=(n,p)$ for the binomial); an estimate from data carries a hat, $\hat\theta$.

- **Goodness-of-fit, visual.** Before estimating, find a candidate distribution by graphical comparison: barplot/histogram of observed frequencies; the **rootogram**, which hangs bars of observed counts from theoretical points (on a square-root scale) so a perfect fit leaves bar bottoms on the horizontal axis; and the **quantile-quantile (QQ) plot**, which plots quantiles of one distribution against another (empirical vs. theoretical, or two samples) — points on the line $y=x$ indicate agreement. A **quantile** $c_\alpha$ is a value with a fraction $\alpha$ of the data at or below it ($\hat F_n(c_\alpha)=\alpha$ via the empirical CDF $\hat F$); the $0.5$ quantile is the median.

- **Maximum likelihood estimation (MLE).** The **likelihood** is the same formula as the probability of the data, but read as a function of the parameter with the data held fixed: $L(\theta\,;\,x)=\prod_i f(k_i\mid\theta)$ for independent observations. The MLE $\hat\theta$ is the parameter value that maximizes $L$, equivalently the **log-likelihood** $\log L$ (monotone transform, turns products into sums and is numerically safer). Worked cases:
  - **Poisson:** $\hat\lambda=\bar k$, the sample mean (derived by setting $\frac{d}{d\lambda}\log L=0$). The single parameter $\lambda$ is both the mean and the variance of the distribution.
  - **Binomial** $B(n,p)$ with $n$ known: $\hat p=y/n$, the observed success fraction. The constant $\binom{n}{y}$ term doesn't depend on $p$ and can be dropped for maximization.
  - **Multinomial:** category MLEs are the observed proportions.
  - **Hardy-Weinberg (a structured multinomial):** three genotype probabilities are tied to one allele frequency, $p_{\text{MM}}=p^2,\ p_{\text{MN}}=2pq,\ p_{\text{NN}}=q^2$ with $q=1-p$; the MLE is $\hat p=\frac{n_{\text{MM}}+n_{\text{MN}}/2}{S}$ (allele-counting), $S$ the total.
  - The chapter cautions that MLEs are not always this intuitive or available in closed form; other criteria yield other (also hatted) estimators.

- **The $\chi^2$ statistic vs. the $\chi^2$ distribution (a flagged name collision).** The **statistic** is $\sum \frac{(O-E)^2}{E}$, a weighted sum of squared deviations of observed counts $O$ from expected counts $E$ under a null. The **distribution** $\chi^2_\nu$ is a separate object parameterized by **degrees of freedom** $\nu$. When counts are large, the statistic's null distribution is approximately $\chi^2_\nu$; for a table of categorical counts, $\nu$ equals (number of independent comparisons), e.g. $\nu=g\times(c-1)$ for $g$ groups of a $c$-category multinomial.

- **Tests for categorical data.** For one multinomial against fixed proportions, or for several multinomials sharing one proportion vector, compute the $\chi^2$ statistic and compare to its null distribution (simulated or theoretical). For two cross-classified categorical variables one forms a **contingency table** and tests independence; the **Pearson chi-squared test** (here with **Yates' continuity correction** for a $2\times2$ table) compares observed cell counts to those expected under independence. The chapter notes **Fisher's exact test** (the hypergeometric test) as an alternative for such tables, used downstream for over-representation testing.

- **Bayesian inference.** Treat the unknown parameter as a random variable with a **prior** distribution encoding knowledge before the data; update to a **posterior** $P(\theta\mid D)$ after observing data $D$. For a proportion $p\in[0,1]$ the **Beta distribution** $f_{\alpha,\beta}(x)\propto x^{\alpha-1}(1-x)^{\beta-1}$ is a flexible, conjugate choice: with a $\text{Beta}(\alpha,\beta)$ prior and $y$ successes / $n-y$ failures from binomial sampling, the posterior is $\text{Beta}(\alpha+y,\ \beta+n-y)$. Point summaries: posterior mean $\frac{\alpha}{\alpha+\beta}$; **maximum a posteriori (MAP)** estimate = posterior mode. Uncertainty: a **posterior credible interval** (Bayesian analog of a confidence interval), e.g. the central 95% from the 2.5% and 97.5% posterior quantiles. The update can be iterated: yesterday's posterior is today's prior, which makes Bayes natural for combining information across datasets. The framework is hierarchical ("turtles all the way down" — parameters of priors can themselves have distributions).

- **Markov chains for sequential dependence.** When successive categorical observations are dependent (e.g. dinucleotides where $P(\mathtt{CA})\neq P(\mathtt{C})P(\mathtt{A})$), model them as a first-order **Markov chain**: the next state depends only on the current one (finite memory), $P(\mathtt{CA})=P(\mathtt{C})\,P(\mathtt{A\mid C})$. Parameters are a **transition matrix** of conditional probabilities $P(\text{to}\mid\text{from})$, estimated from transition counts (each row normalized to sum to 1). Two fitted chains (e.g. one per region type) give a **log-likelihood-ratio score** for a new sequence: $\log\frac{P(x\mid\text{model }1)}{P(x\mid\text{model }2)}$, computed as a sum of per-transition log-ratios; its sign/magnitude classifies the sequence. Trained on labelled sequences, this is an early instance of supervised classification.

- **Position weight matrix / sequence logo.** Several independent multinomials concatenated along fixed positions (a **PWM** / **PSSM**) model a motif; the **sequence logo** displays per-position variability on a log scale, large letters marking near-certain positions.

- **Waiting-time / spacing model.** Distances between independently, randomly placed occurrences along a sequence follow an **exponential distribution** (one rate parameter); the count of occurrences per fixed window follows a **Poisson**. These are checked graphically (exponential-probability plot — straight line if fit is good — and Poissonness/`distplot`).

## 3. When It Applies

- **Discrete counts of one outcome:** binomial for two categories (success/failure), Poisson for counts of rare events per unit (and as the count of randomly placed motifs in a window). Use the Poisson when one rate $\lambda$ plausibly governs the whole count process; the chapter checks this empirically rather than assuming it.
- **Several categories:** multinomial (e.g. four nucleotides, genotypes, amino acids). Use binomial instead only when collapsing to two groups (e.g. purine/pyrimidine).
- **Structured multinomial:** Hardy-Weinberg when genotype probabilities are functions of a single allele frequency under random mating.
- **Two categorical variables on the same subjects:** contingency table + chi-squared (or Fisher's exact) test of independence.
- **Distances/spacings between random events:** exponential; **counts per window:** Poisson.
- **Order matters along the sequence:** Markov chain rather than an independence (multinomial) model.
- **MLE vs. Bayes:** use MLE for a single best parameter value when data are plentiful and no prior is needed; use the Bayesian approach when you have prior information to incorporate, want a full distribution over the parameter (not just a point), need to express/propagate uncertainty, or want to combine successive datasets. The chapter notes the two converge when data are abundant enough to swamp the prior.
- **Simulation vs. theory for a null distribution:** simulate when no tractable theoretical reference exists or to validate the theory; prefer the theoretical distribution (when its approximation conditions hold) for speed and for resolving very small probabilities.

## 4. Assumptions & Validity Conditions

- **Independence of observations** underlies the product form of the likelihood and the Poisson/binomial/multinomial models; if observations along a sequence are dependent, an independence model is wrong and a Markov chain is needed.
- **Correct distributional family**, assessed by goodness-of-fit, not assumed; estimation of a parameter is only meaningful once a plausible family is chosen.
- **$\chi^2$ approximation requires large expected counts.** The statistic's null distribution is *approximately* $\chi^2_\nu$, and "the approximation is particularly good if the counts in the table are large"; for small counts it can be unreliable (a continuity correction is one mitigation in $2\times2$ tables).
- **Correct degrees of freedom** $\nu$ for the reference $\chi^2$ — it encodes the number of free comparisons, not the number of cells.
- **Binomial:** fixed, known $n$; constant success probability $p$ across trials.
- **Hardy-Weinberg** holds only under its biological preconditions: random mating, large population, equal allele distribution across sexes. Departures are exactly what an HWE test detects.
- **Markov assumption:** finite memory (first-order = depends only on the immediately preceding state); transition rows are genuine probability distributions (each sums to 1). The chapter stresses the assumption "need not be exactly true" but should be "good enough."
- **Exponential spacing** assumes independent, random (Bernoulli) placement of events along the sequence; systematic structure (clustering, boundaries) violates it.
- **Bayesian:** prior support must include all permissible parameter values; a conjugate (Beta) prior is a mathematical convenience that keeps the posterior in the same family — it is an assumption of convenience, not of correctness.
- **Test fixed in advance / conservative practice:** the chapter models analyzing data with a known null and, in the outlier discussion, deliberately keeps a procedure that can only weaken the apparent signal (see §5).

## 5. Failure Modes & Invalidity Patterns

- **Confusing the $\chi^2$ *statistic* with the $\chi^2$ *distribution*.** Explicitly flagged name collision: the statistic is a computed number; $\chi^2_\nu$ is a theoretical distribution with parameter $\nu$. Mistaking one for the other (or using the wrong $\nu$) invalidates the p-value. Detect by attending to context.
- **Using the $\chi^2$ approximation with small counts.** Warning sign: small expected cell counts. Consequence: the approximate null distribution is poor and the p-value untrustworthy. Mitigations the chapter shows: simulate the null directly, or apply a continuity correction.
- **Overstating tiny p-values from simulation.** A Monte Carlo null has granularity $1/B$ (with $B$ simulations); "it happened 0 times in 1000" cannot establish a probability below $1/B$, and the estimate's uncertainty grows in the tail. Use theory (when valid) for very small probabilities; don't read more precision than $B$ supports.
- **Outliers inflating estimates.** Including an extreme point raised $\hat\lambda$, which *raised* the p-value (made the observed extreme look more ordinary). The chapter turns this into a deliberately **conservative** tactic: if the result is still significant with the outlier in, the finding is robust. The warning is that in practice you may not know which point is the outlier; silently dropping points to improve a fit is not licensed.
- **Picking a single point estimate hides parameter uncertainty.** A flat likelihood near its maximum means many parameter values are nearly as likely as the MLE; reporting only $\hat p$ conceals this. The Bayesian posterior (or an interval) is the honest summary.
- **Over-peaked or data-starved priors.** A very peaked prior, or very little data, lets the prior dominate the posterior — the conclusion then reflects assumptions more than evidence. Warning sign: posterior barely moves from prior, or shifts a lot when the prior is softened.
- **One-sided vs. two-sided framing.** The Chargaff permutation test counted only null values *smaller* than the observed statistic because the alternative (base-pairing) predicts an unusually *small* deviation; using the wrong tail would misstate the evidence. The test's directionality must match the hypothesis and be fixed before looking.
- **Independence assumed where dependence exists.** Treating dependent sequence positions as independent (multinomial) mis-specifies the model; dinucleotide frequencies departing from the product of single-nucleotide frequencies are the signature, and a Markov chain is the fix.
- **Mis-specified / over-idealized null.** Testing whether several genes share one multinomial assumes a single proportion vector; if false, large $\chi^2$ values follow — correctly flagging that the idealized "all the same" baseline does not hold (varying selective pressure).
- **A model that fits current data is not proven true.** The chapter's own footnote: a perfect fit can still be overturned by new data demanding a richer model. Treat any fitted model as provisional.

## 6. Empirical Checks & Calibration

- **Simulate under a known truth to build the null.** Generate many datasets from the hypothesized model (e.g. `rmultinom` tables with the null proportions, or permutations that destroy the structure of interest), compute the test statistic on each, and use the resulting empirical distribution as the reference. The observed statistic's rank in this null gives a Monte Carlo p-value (fraction of null values at least as extreme).
- **Permutation tests.** When the null is "no special relationship," permute labels/values within the appropriate unit (e.g. shuffle nucleotide proportions within each organism's row) and recompute the statistic; the spread of permuted values calibrates how surprising the observed value is. Match the permutation scheme and the tail (one- vs. two-sided) to the hypothesis.
- **Calibrate a diagnostic on data of known type.** The chapter suggests drawing a rootogram from numbers simulated from a *known* Poisson to learn what a good fit should look like before judging real data.
- **Check theory against simulation with a QQ plot.** Compare simulated null statistics to the candidate theoretical distribution (e.g. $\chi^2_{30}$) via QQ plot; lying on $y=x$ confirms the theoretical reference is usable, after which the faster theoretical p-value can replace simulation.
- **Validate a Bayesian computation two independent ways.** Compare a posterior obtained by conditioning a forward simulation (keep only draws reproducing the observed data) against direct sampling from the closed-form posterior, and against numerical integration of the posterior density; agreement (checked by QQ plot and matching posterior means) confirms the result. This also illustrates **Monte Carlo integration** for posterior summaries when integrals are intractable.
- **Sensitivity / robustness to the prior.** Re-run with a softer (e.g. uniform $\text{Beta}(1,1)$) prior to see how much the prior drives the posterior; little change means the data dominate.
- **Goodness-of-fit on spacing/count models.** Use an exponential-probability plot (straight line = good fit) for inter-event distances and a Poissonness diagnostic / likelihood-ratio goodness-of-fit for window counts; deviations in the tail flag where the model breaks.
- **Train/validate a classifier on labelled data.** Score known-class sequences (CpG island vs. not) with the log-likelihood-ratio and inspect whether the score separates the classes; bimodality of the score histogram signals a mixture of two populations.

## 7. Interpretation, Guidance & Trade-offs

- **A small p-value** means the observed data are improbable under the null model, so the null is implausible — it does not by itself identify the correct alternative; often only the null is well specified.
- **The MLE** is a single most-likely parameter value, not the truth; report it with its uncertainty, especially when the likelihood is flat near the maximum. Hats ($\hat\theta$) mark estimates precisely to keep this distinction.
- **Posterior summaries:** the posterior mean and MAP are point estimates; a **credible interval** states $P(q_{2.5\%}\le p\le q_{97.5\%})=0.95$ as a direct probability statement about the parameter — this is the Bayesian reading, distinct from a frequentist confidence interval (for whom a parameter has no probability distribution; the hypothesis is simply true or false).
- **Modeling with a named distribution pays off:** once a variable is known to be Poisson/binomial/multinomial, a single (or few) parameter(s) yields all probabilities, including of rare/extreme events, plus quick p-values and intervals.
- **Conservative reporting:** prefer choices that can only weaken your apparent signal (e.g. keep the outlier); a conclusion that survives them is trustworthy. Be explicit about what was held fixed and what was estimated.
- **Trade-offs surfaced:**
  - *Simulation vs. theory:* simulation is general and assumption-light but bounded in resolution by $1/B$ and slower; theory is fast and resolves tiny probabilities but needs its approximation conditions (large counts, correct $\nu$) to hold. Validate theory by simulation, then use theory.
  - *MLE vs. Bayes:* MLE is simple and prior-free but gives only a point and ignores prior knowledge; Bayes incorporates priors and full uncertainty but requires a prior whose influence must be checked. They agree given ample data — the recommended regime is "enough data to swamp the prior."
  - *Conjugate prior:* mathematically convenient (Beta→Beta) but a modeling choice, not a fact about the world.
- The chapter's confidence is empirical throughout: it repeatedly checks fits and nulls by simulation rather than trusting a formula or a significant-looking number on its own.

## 8. Connections & Key Terms

**Builds on:** generative probability models with known parameters and null-hypothesis testing by deduction (the prior chapter's setting); the binomial, multinomial, and Poisson distributions; the idea of a test statistic computed under a null.
**Sets up:** mixtures (the bimodal score histogram foreshadows two mixed populations); generalized linear models for non-normal regression of count responses; multivariate analysis of contingency tables and codon usage; supervised learning/classification (the trained log-likelihood-ratio score is a first example); empirical CDF and quantile machinery; advanced posterior computation (Markov-chain / Hamiltonian Monte Carlo) for Bayesian inference at scale.

**Key terms (own-words):**
- **Statistical inference** — reasoning from data up to a model and its parameters, vs. probability's deduction from a known model.
- **Likelihood** — the data's probability formula read as a function of the parameter with data fixed.
- **Maximum likelihood estimate (MLE), $\hat\theta$** — the parameter value making the observed data most probable.
- **Log-likelihood** — logarithm of the likelihood; same maximizer, easier to compute.
- **Goodness-of-fit** — assessment of whether a candidate distribution matches the data.
- **Rootogram** — fit diagnostic hanging observed-count bars from theoretical points on a square-root scale.
- **Quantile / quantile-quantile (QQ) plot** — a value with a given fraction of data below it / a plot of one distribution's quantiles against another's to compare them.
- **$\chi^2$ statistic** — $\sum (O-E)^2/E$, weighted squared deviation of observed from expected counts.
- **$\chi^2_\nu$ distribution / degrees of freedom $\nu$** — the theoretical reference distribution and its single shape parameter counting free comparisons.
- **Pearson chi-squared test / Yates' continuity correction** — independence test for a contingency table / small-sample adjustment for $2\times2$ tables.
- **Fisher's exact (hypergeometric) test** — exact alternative for contingency-table independence.
- **Contingency table** — cross-tabulated counts of two categorical variables.
- **Hardy-Weinberg equilibrium** — genotype probabilities $p^2,\ 2pq,\ q^2$ from one allele frequency under random mating; **de Finetti plot** visualizes departures.
- **Prior / posterior / credible interval** — parameter distribution before data / after data / a posterior probability interval for the parameter.
- **Beta distribution / conjugacy** — flexible $[0,1]$ density; Beta prior + binomial data → Beta posterior with updated parameters.
- **MAP estimate** — the posterior mode.
- **Monte Carlo integration** — approximating an integral (e.g. a posterior mean) by averaging over random samples.
- **Markov chain / transition matrix / Markov assumption** — model of sequential dependence where the next state depends only on the current; conditional-probability matrix; finite-memory premise.
- **Log-likelihood-ratio score** — sum of log-ratios of two models' probabilities, used to classify a sequence.
- **Position weight matrix (PWM) / PSSM / sequence logo** — per-position multinomial motif model and its log-scale visualization.
- **Exponential distribution** — waiting-time/spacing model for randomly placed events; counts per window are Poisson.
- **Conservative** — erring toward not detecting, so a surviving signal is credible.
- **Null model** — the uninteresting baseline against which departures are tested.
