---
title: "Generative Models for Discrete Data"
source: msmb
source_chapter: 1
source_url: https://www.huber.embl.de/msmb/01-chap.html
license: CC-BY-NC-SA-2.0
license_file: LICENSES/msmb.LICENSE
attribution: "Holmes S, Huber W. Modern Statistics for Modern Biology. Cambridge University Press; 2019. https://www.huber.embl.de/msmb/"
derived: own-words-summary
---

# Generative Models for Discrete Data — MSMB Chapter 1 (summary)

_Own-words summary of an external source (see frontmatter for license/attribution). Not a substitute for the original chapter._

## 1. Scope

This chapter covers **generative (probability) models for discrete count data** — the regime where outcomes are categorical or counts of events (e.g., how many times a rare event occurs, how many of $n$ trials succeed, how counts distribute over several categories). It equips a reader to work *top-down*: given a fully specified model with all parameters known, deduce the probability of any outcome of interest, generate reference/baseline expectations and their variability, and judge whether observed data are surprising under that model. The complementary *bottom-up* task — fitting an unknown distribution to data — is deferred to later material. The recurring task is: postulate a generative mechanism, compute what it predicts, and compare against observation.

## 2. Concepts & Methods

- **Generative / probability model.** A specification of the random mechanism producing the data, with all parameters assumed known. Because everything is known, outcome probabilities follow by deduction from probability laws — no estimation needed.

- **Categorical variable, levels, factors.** A discrete variable takes one of a fixed set of **levels** (e.g., binary yes/no, three genotypes, 64 codons). Tallying the **frequencies** (counts) of each level summarizes the data.

- **Exchangeability and sufficiency.** If the *order* of observations carries no information, the variable is **exchangeable**; then the vector of level-counts is a **sufficient** summary — it captures all relevant information, compressing the data with no loss. Independence is one sufficient condition for exchangeability.

- **Bernoulli distribution.** Models a single binary trial with success probability $p$ (outcomes coded 0/1); failure has the complementary probability $1-p$. The basic building block for the others.

- **Binomial distribution $B(n,p)$.** The number of successes $X$ in $n$ independent/exchangeable Bernoulli trials with common success probability $p$. Answers: how many successes to expect, and how probable any count is. The probability of exactly $k$ successes is $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$, where the binomial coefficient $\binom{n}{k}=\frac{n!}{k!\,(n-k)!}$ counts the orderings giving $k$ successes. Bernoulli is the special case $n=1$.

- **Poisson distribution, rate $\lambda$.** Models counts of **rare events** over many opportunities; a single parameter $\lambda$ (the rate, often Greek letters denote distribution parameters). Probability of $k$ events is $P(X=k)=\frac{\lambda^k e^{-\lambda}}{k!}$. It is the limiting/approximating form of $B(n,p)$ when $p$ is small and $n$ large, with $\lambda=np$ — it then depends only on the product $np$, not on $n$ and $p$ separately. For a Poisson the standard deviation is $\sqrt{\lambda}$, giving a baseline expected count and its spread.

- **Multinomial distribution.** Generalizes the binomial to $m>2$ outcome categories with probabilities $p_1,\dots,p_m$ (summing to 1). For $n$ draws, the count vector $(x_1,\dots,x_m)$ has probability $P(x_1,\dots,x_m)=\binom{n}{x_1,\dots,x_m}\,p_1^{x_1}\cdots p_m^{x_m}$, where the **multinomial coefficient** $\binom{n}{x_1,\dots,x_m}=\frac{n!}{x_1!\cdots x_m!}$ generalizes the binomial coefficient (and equals it when $m=2$).

- **Cumulative distribution and tail probabilities.** $P(X\le a)$ is the cumulative distribution function; tail (extreme-event) probabilities such as $P(X\ge a)=1-P(X\le a-1)$ are how one quantifies how surprising a large count is.

- **Goodness-of-fit statistic.** To measure departure of observed counts from those expected under a model, sum the squared deviations weighted by the expected values: $\text{stat}=\sum_i \frac{(E_i-x_i)^2}{E_i}$, with $E_i$ the expected count and $x_i$ the observed count in category $i$. Larger values mean worse fit to the model. This statistic follows a **chi-square distribution** $\chi^2_\nu$ — here with $\nu=3$ degrees of freedom for four categories — providing a classical reference distribution as an alternative to simulation.

- **Hypothesis-testing scaffold.** A **null hypothesis** $H_0$ is the uninteresting baseline ("strawman") whose rejection would be informative (e.g., all four nucleotides equally likely). An **alternative** $H_A$ is a competing generative process. A **test statistic** plus a **critical value** (a high quantile of the statistic's distribution under $H_0$) decides rejection.

- **Power.** The probability that a test rejects $H_0$ when an alternative is in fact true — the **true positive rate**, $P(\text{reject }H_0\mid H_A)$.

## 3. When It Applies

- **Bernoulli** — a single binary event (success/failure, hit/no-hit, purine/pyrimidine, CpG/non-CpG).
- **Binomial $B(n,p)$** — counting successes across a *fixed, known* number $n$ of independent binary trials sharing one success probability $p$; use when only the total count (not the order) matters.
- **Poisson** — counting occurrences of a **rare** event ($p$ small) over many independent opportunities; the appropriate simplification of the binomial when $p$ is small and $n$ large, since it needs only $\lambda=np$. Choose Poisson over binomial when individual trial probability is tiny and $n$ huge (the two then nearly coincide).
- **Multinomial** — discrete outcomes with **more than two** categories (e.g., the four nucleotides, genotypes); the natural extension of the binomial.
- **Monte Carlo simulation** — when the exact reference distribution is hard to derive in closed form, or when standard distributional theory (e.g., $\chi^2$) does not apply, such as when some categories have extremely low probabilities and near-zero counts.
- **Chi-square reference** — when assessing fit of observed category counts to expected counts under a model and the regular-count conditions hold; a faster route than simulation when applicable.

## 4. Assumptions & Validity Conditions

- **All parameters known.** The chapter's deductive, top-down reasoning is valid only when the model is fully specified — rate, number of trials, sequence length, success probability — with **no unknown parameters**. Absent this, one must instead fit a distribution (statistical modeling), a harder problem deferred to later.
- **Independence across positions/trials.** The binomial, Poisson, and the extreme-value/multiplicity computation all assume events at different positions or trials are independent (more precisely, identically distributed independent draws). The chapter flags that *strict* independence rarely holds exactly in biology; the working assumption is that any dependence is weak/rare enough to ignore as a good-enough approximation.
- **Exchangeability** — required for the count vector to be a sufficient summary; satisfied by independence.
- **Identical distribution** — trials/positions share the same success probability or rate.
- **Poisson-approximates-binomial regime** — the approximation is only good when $p$ is small (and $n$ large); $\lambda=np$.
- **Probabilities sum to 1** — across the levels of a Bernoulli ($p+(1-p)$) or multinomial ($\sum p_i=1$).
- **Procedure fixed in advance** — a tail probability or test is only the stated probability if the event/threshold was chosen *before* looking at the data (see Failure Modes).
- **Chi-square applicability** — the $\chi^2_3$ reference for the goodness-of-fit statistic is an *adequate theory* only in regular-count situations; it is noted to break down when some categories have extremely low probabilities and mostly-zero counts.

## 5. Failure Modes & Invalidity Patterns

- **Selecting on the maximum / ignoring multiplicity (the chapter's central caution).** Computing the probability of a large count as if you had examined a *single* position, when in fact you scanned **many** positions and reported the *largest*, badly understates how often such an extreme arises by chance. *Warning sign:* the test quantity is the max (or min/most-extreme) over many simultaneous tests. *Consequence:* the naive tail probability is too small — here by roughly a factor equal to the number of positions ($\sim10^{-6}$ vs. the correct $\sim10^{-4}$ for 100 positions). *Correction:* compute the probability of the **extreme** under the full procedure, e.g., for the maximum of $n$ independent draws, $P(x_{(n)}\ge c)=1-\prod_{i}P(x_i\le c-1)=1-(1-\epsilon)^n$ where $\epsilon$ is the single-position tail probability; report the **multiplicity-adjusted** value, not the per-test one.

- **Confusing a p-value with the probability the hypothesis is true.** A p-value is $P(\text{data}\mid H_0)$ — the probability of seeing data this extreme *given* the null — and is explicitly **not** $P(H_0\mid \text{data})$. Treating a small p-value as "the null is probably false with that probability" is a misreading.

- **Mistaking error rates for each other.** The false positive rate $P(\text{declare hit}\mid \text{no signal})$, the power (true positive rate), and the probability of the hypothesis are distinct quantities; conditioning direction (the vertical bar) matters.

- **Choosing an uninteresting null.** If the null is something rejection of which teaches nothing (e.g., a DNA-equal-frequencies null that real genomes are already known to violate), a "significant" result is uninformative — picking a good null requires scientific judgment, not just statistics.

- **Over-idealized model.** Assuming exact independence/identical distribution when biology has weak dependence; conclusions inherit whatever approximation error that introduces.

- **Under-powered experiment.** With too little data, a real departure from $H_0$ goes undetected (low power). At $n=20$ in the worked DNA case, power to detect a specific alternative was only ~20%, meaning ~80% of such experiments would *fail to find a real effect* — a non-detection is then not evidence of no effect.

- **Demanding precision beyond what was computed.** A Monte Carlo p-value cannot be more precise than its **granularity** $\sim 1/(\text{number of simulations})$; quoting a simulated probability to many significant digits (e.g., for a courtroom) overstates the precision actually obtained.

## 6. Empirical Checks & Calibration

- **Monte Carlo simulation under a known generative model.** The central empirical tool: simulate many datasets from the assumed model, then read off the probability of an event of interest as its observed frequency among simulations (e.g., fraction of simulated runs whose maximum reaches the observed value). Used to (a) confirm an approximation — e.g., that a sum of many rare Bernoulli($p$) trials behaves like a Poisson($np$); and (b) compute extreme-event or test probabilities when closed forms are hard.
  - *Pass/fail:* the simulated estimate should agree with any available theoretical value; disagreement signals a modeling or coding error. *Granularity caveat:* resolution is bounded by the inverse of the simulation count, so increasing simulations is required to resolve very small probabilities.

- **Building a null distribution by simulation.** Simulate many datasets under $H_0$, compute the test statistic for each, and use the resulting histogram as an estimate of the statistic's **sampling distribution under the null**. From it, read a high quantile (e.g., the 95% quantile) as the **critical value** for rejection. *Pass:* a candidate dataset's statistic below the critical value is consistent with $H_0$; above it, reject.

- **Power estimation by simulation.** Simulate datasets under a chosen **alternative** $H_A$, apply the test (critical value from the null simulation), and estimate power as the fraction rejected. This directly answers "how much data do I need?": repeat at increasing sample sizes until the estimated power reaches the target.

- **Sample-size / detectability reasoning.** The convention is to aim for power $\ge 80\%$; if a planned $n$ yields low power, increase $n$. This makes the cost-benefit of data collection explicit rather than assumed.

- **Cross-check simulation against theory.** Where a closed-form (e.g., $\chi^2_3$) or an analytic approximation exists, compute both and confirm they roughly match — each validates the other. Closed-form approximations of $(1-\epsilon)^n$ (binomial-theorem leading term $1-n\epsilon$, or $e^{-n\epsilon}$) illustrate sanity-checking by an independent route.

## 7. Interpretation, Guidance & Trade-offs

- **What a p-value licenses.** It is the probability of data at least this extreme *assuming the null* — a statement about data given a hypothesis, not about the hypothesis given the data. A small p-value warrants rejecting (or doubting) $H_0$; it does **not** quantify the probability the null is true.
- **Report the adjusted, not the naive, tail probability** whenever the reported statistic was selected as an extreme over many comparisons. The decision (reject or not) may be unchanged when both values clear standard thresholds ($0.05, 0.01, 0.001$), but the *honest* number is the multiplicity-corrected one — and it matters when precise probabilities are demanded.
- **Pick a null whose rejection is interesting**; the null encodes "nothing is going on," so deviations from it should be the scientifically meaningful signal.
- **Power vs. cost trade-off.** More data always raises sensitivity, but data is expensive; choose the smallest $n$ that achieves acceptable power (~80%), determined empirically by simulation.
- **Exact vs. approximate.** Closed-form theory (binomial/Poisson formulas, $\chi^2$) is fast and precise when its conditions hold; Monte Carlo is more general (works when theory doesn't, e.g., sparse low-probability categories) but limited in precision by simulation count. Prefer theory when valid, simulation when it isn't — and use one to check the other.
- **Poisson vs. binomial.** When $p$ is small, prefer the simpler one-parameter Poisson($\lambda=np$); they nearly coincide, and Poisson needs only the product.
- **Report what was held fixed** for results to be trustworthy: the known parameters (rate, $n$, sequence length), the independence/identical-distribution assumptions, and that the testing procedure (statistic and threshold) was fixed before seeing the data.

## 8. Connections & Key Terms

**Builds on:** elementary probability laws (complementary events, products of independent-event probabilities, summing over disjoint outcomes) and the idea of a parameterized distribution $F$ depending on parameters (denoted by Greek letters such as $\theta$) generating observed data (Latin letters such as $x$).

**Sets up:** statistical modeling (fitting an unknown distribution to data when parameters are *not* known — the bottom-up counterpart); comparing distributions with diagnostic plots (Q-Q plots); formal hypothesis testing and multiplicity/multiple-testing correction; and experimental design / sample-size planning. The Bernoulli→binomial→Poisson→multinomial chain and the simulate-a-null-distribution idea recur throughout downstream count-data and testing methods.

**Key terms (own-words definitions):**
- **Generative model** — a fully specified random mechanism with known parameters from which outcome probabilities are deduced.
- **Level / factor** — one of the fixed categories a discrete variable can take; a factor is the encoding of such a categorical variable.
- **Exchangeable** — observation order carries no information, so the count vector suffices.
- **Sufficient** — a summary that retains all information in the data relevant to the model.
- **Bernoulli / binomial / Poisson / multinomial** — distributions for one binary trial / successes in $n$ trials / rare-event counts / counts over $>2$ categories, respectively.
- **Rate parameter $\lambda$** — the single Poisson parameter; mean count, with standard deviation $\sqrt{\lambda}$.
- **Cumulative distribution $P(X\le a)$; tail probability** — running total of probability up to $a$; its complement gives extreme-event probability.
- **Extreme-value / rank statistic** — the ordered values $x_{(1)}\le\cdots\le x_{(n)}$; reasoning about the max/min over many draws.
- **Multiplicity / multiple testing** — examining many positions and reporting the most extreme inflates apparent significance unless corrected.
- **Monte Carlo** — estimating a probability as the frequency of an event across many simulations from a model.
- **Null hypothesis $H_0$ / alternative $H_A$** — the uninteresting baseline to be rejected / a competing process.
- **Test statistic** — a number measuring departure from the null (here a weighted sum of squared observed-minus-expected deviations).
- **Null / sampling distribution** — the distribution of the statistic when $H_0$ holds, used to set a critical value (e.g., 95% quantile).
- **Chi-square distribution $\chi^2_\nu$** — the theoretical distribution (here $\nu=3$) of the goodness-of-fit statistic in regular-count settings.
- **Power / true positive rate** — probability of rejecting $H_0$ when an alternative is true, $P(\text{reject }H_0\mid H_A)$.
- **False positive rate** — probability of declaring a signal when none exists, $P(\text{declare}\mid\text{none})$.
- **p-value** — $P(\text{data}\mid H_0)$; *not* the probability the hypothesis is true, $P(H_0\mid\text{data})$.
- **Granularity (of simulation)** — the precision floor of a Monte Carlo estimate, ~$1/(\text{number of simulations})$.
