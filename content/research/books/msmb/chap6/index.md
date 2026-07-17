---
type: book
title: "Testing"
source: msmb
source_chapter: 6
source_url: https://www.huber.embl.de/msmb/06-chap.html
tags:
  - domain/hypothesis-testing
  - domain/multiple-testing
---

# Testing — MSMB Chapter 6 (summary)

_Own-words summary of an external source (see frontmatter for license/attribution). Not a substitute for the original chapter._

## 1. Scope

This chapter covers statistical hypothesis testing as a framework for making decisions under uncertainty from finite, noisy data, and—centrally—its extension to the *large-scale* setting where thousands to billions of tests are run at once (screening for "interesting" candidates worth following up). It equips a reader to set up a single test correctly, interpret its output honestly, and—when many tests are run together—control and estimate the relevant error rates (family-wise error, false discovery rate, local false discovery rate) and exploit the multiplicity itself to improve inference. The framing is asymmetric: one outcome (the "null") is the assumed default, and we only depart from it given strong evidence—distinct from symmetric classification.

## 2. Concepts & Methods

- **Hypothesis test (single).** Uses data to decide between a privileged *null hypothesis* $H_0$ (a simple, computationally tractable model of "nothing interesting") and an *alternative*. Yields a reject/don't-reject decision. Mechanism: choose a *test statistic* (a numerical summary of the data), derive its *null distribution* (its possible values and probabilities assuming $H_0$), and reject if the observed statistic lands in a low-probability *rejection region*.
- **The five steps.** (1) Pick the effect, design the study, choose a data summary and test statistic; (2) set $H_0$ and compute the null distribution; (3) choose the rejection region with total null probability $\le\alpha$; (4) collect data, compute the statistic; (5) reject $H_0$ iff the statistic falls in the rejection region. Steps 1–3 are meant to be fixed *before* seeing the data.
- **$p$-value.** Standardized score mapping the test statistic to $[0,1]$ via the null's cumulative distribution function, chosen so that under $H_0$ it is uniform on $[0,1]$. Framed in the chapter's decision-theoretic picture, the $p$-value is the area of the null density beyond the observed value divided by the total null area—the answer to a precise but convoluted question, using only knowledge of the null.
- **Binomial / exact test.** For counts of successes in $n$ independent Bernoulli trials, the null distribution is binomial, $P(K=k\mid n,p)=\binom{n}{k}p^k(1-p)^{n-k}$; the rejection region is built from the least-probable outcomes (here, both tails).
- **$t$-test.** Compares two groups of real-valued measurements. Statistic $t = c\,\dfrac{m_1-m_2}{s}$, where $m_1,m_2$ are group means, $s$ the pooled standard deviation, and $c=\sqrt{n_1 n_2/(n_1+n_2)}$ encodes the sample sizes ($s^2$ pools the within-group sums of squares with $n_1+n_2-2$ in the denominator). Under $H_0$ of equal means (plus normality, independence, equal variance), $t$ follows the *$t$-distribution* with $n_1+n_2-2$ degrees of freedom. Variants (all parameter choices of the same procedure): one- vs. two-sided; one- vs. two-sample; paired vs. unpaired; equal-variance vs. *Welch's $t$-test* for unequal variances.
- **Permutation test.** Builds a null distribution for a chosen statistic (e.g., $t$) by repeatedly relabeling/permuting the group assignments of the pooled observations and recomputing the statistic. Uses the $t$-statistic but not the $t$-distribution; assumes only *exchangeability* under $H_0$. Weaker assumptions than the parametric $t$-test; the two agree closely by the Central Limit Theorem.
- **Monte Carlo simulation of the null.** Generate many datasets under the assumed $H_0$ and tabulate the statistic to approximate the null distribution when a closed form is unavailable.
- **Error-rate accounting (multiple testing).** Over $m$ tests: $m_0$ true nulls, $V$ false positives (Type I), $S$ true positives, $T$ false negatives (Type II), $R=V+S$ total rejections.
- **Family-wise error rate (FWER).** Probability of *one or more* false positives, $P(V>0)$. Under independence, $P(V>0)=1-(1-\alpha)^{m_0}\to 1$ as $m_0$ grows. **Bonferroni method** controls FWER at $\alpha_{\text{FWER}}$ by testing each hypothesis at $\alpha=\alpha_{\text{FWER}}/m$.
- **False discovery rate (FDR).** Expected fraction of false positives among rejections, $\text{FDR}=\text{E}\!\left[\dfrac{V}{\max(R,1)}\right]$. A *set* property and an *average* over hypothetical replications. Equals FWER when all nulls are true. In the chapter's decision picture, the FDR is the more intuitive target but needs the alternative distribution and the class proportions, which are often unknown.
- **Benjamini–Hochberg (BH) procedure.** Controls FDR at target $\varphi$: sort $p_{(1)}\le\dots\le p_{(m)}$, find the largest $k$ with $p_{(k)}\le \varphi\,k/m$, reject the $k$ smallest. Graphically: the rightmost crossing of the sorted $p$-values with a line of slope $\varphi/m$.
- **$p$-value histogram & visual FDR.** Pooled $p$-values form a *mixture*: a flat uniform "null" component plus an "alt" component peaked near 0. The null height estimates the expected false rejections in any left bin, giving a visual FDR estimate. The null proportion can also be read off a **Schweder–Spjøtvoll plot** of $(1-p_i,\,N(p_i))$ (with $N(p)$ = number of $p$-values exceeding $p$): the slope of the linear left portion estimates $m_0$.
- **Two-groups model & local FDR.** Models the $p$-value density as $f(p)=\pi_0 + (1-\pi_0)\,f_{\text{alt}}(p)$, with $\pi_0$ the null proportion (flat at height $\pi_0$) and $f_{\text{alt}}$ the alternative density. The **local FDR** at a value is $\text{fdr}(p)=\dfrac{\pi_0}{f(p)}$—the posterior probability that a hypothesis *at that $p$* is null; it applies to an *individual* hypothesis. The **tail-area Fdr** is $\text{Fdr}(p)=\dfrac{\pi_0\,p}{F(p)}$ with $F$ the cumulative of $f$. These are *empirical-Bayes* estimates (qvalue, fdrtool fit them). Naming: lowercase $\text{fdr}$ = local, $\text{Fdr}$ = tail-area within the two-groups model, $\text{FDR}$ = the general expectation definition.
- **Independent hypothesis weighting (IHW).** Generalizes BH by relaxing the implicit *exchangeability* of hypotheses. Uses an auxiliary *covariate* (e.g., mean expression `baseMean`) to stratify tests and assign data-driven weights, reallocating the Type-I error budget toward strata where rejections at small fdr are achievable. More powerful than unweighted BH; gains are largest when baseline power is low.

## 3. When It Applies

- **Testing vs. classification.** Use hypothesis testing when the situation is *asymmetric*: one state is the default and you only "call" the other given strong evidence (it is rare/interesting/costly to follow up). Use classification when you want a roughly symmetric data-driven choice between outcomes with no privileged default.
- **Choice of test statistic.** Any numerical summary can serve; the *right* one depends on the alternatives you anticipate. A statistic powerful against one alternative class (e.g., total heads for a shift in success probability) can be powerless against another (e.g., serial correlation), and vice versa.
- **One- vs. two-sided.** Use a one-sided rejection region when you know the direction of departure of interest (concentrates power there); two-sided when departures in either direction matter.
- **$t$-test flavors.** Paired test when measurements have a 1:1 correspondence (e.g., same unit before/after); unpaired otherwise. Equal-variance form when within-group variances are similar; Welch's when they differ. Two-sample to compare two group means; one-sample to compare one mean to a fixed value.
- **Parametric vs. simulated/permutation null.** Prefer the parametric/closed-form null when its assumptions are an acceptable approximation (holds across parameter ranges, fast). Use simulation or permutation when the closed form is intractable or its assumptions are doubtful; permutation needs only exchangeability. "When in doubt, simulate—or do both."
- **FWER vs. FDR.** Choose FWER (e.g., Bonferroni) when even a single false positive is costly (e.g., a database DNA match). Choose FDR when you are screening for candidates and can tolerate a controlled *fraction* of false positives among hits—FWER is often too stringent at large $m$, wasting power.
- **Local fdr vs. FDR.** Use the local fdr when you need a statement about an *individual* hypothesis; use FDR/Fdr for a property of the *selected set*.
- **IHW / covariate weighting.** Applies whenever an auxiliary covariate exists that is null-independent yet informative of power or $\pi_0$. Worthwhile when power varies across hypothesis strata.

## 4. Assumptions & Validity Conditions

- **Procedure fixed in advance.** The hypothesis, test statistic, and rejection region must be chosen *before* seeing the data for the stated error rates to hold (Steps 1–3 precede Step 4).
- **A well-chosen null.** The null must be tractable enough to compute the null distribution, but not so idealized that rejecting it is uninteresting; over-idealized nulls make rejection meaningless or misleading.
- **Significance level $\alpha$.** Defined as the total null probability of the rejection region; there is nothing special about 0.05—context should set the threshold.
- **$t$-test (parametric).** Load-bearing: independence of observations (flagged as *really important*); approximately normal data; common standard deviation across groups (relaxed by Welch's). Positivity/normality mismatch is usually a *harmless approximation*—checkable empirically (e.g., by permutation).
- **Permutation test.** Requires only *exchangeability* of the pooled observations under $H_0$—weaker than, and implied by, the parametric assumptions.
- **$p$-value uniformity.** Under $H_0$ the $p$-value is uniform on $[0,1]$ only for *continuous* statistics; discrete/count data make the null non-uniform (spikes), which can bias FDR estimates.
- **FWER closed form & Bonferroni.** $1-(1-\alpha)^{m_0}$ assumes independence; Bonferroni uses $m$ as a conservative upper bound for the unknown $m_0$.
- **BH / FDR.** Controls the *average* false-discovery proportion; a target $\varphi$ and ranked $p$-values are needed. (The chapter presents BH as the standard FDR-controlling procedure.)
- **Two-groups model (fdr/Fdr).** Rests on substantial modeling assumptions: the mixture form $f(p)=\pi_0+(1-\pi_0)f_{\text{alt}}(p)$ and estimability of $\pi_0$ and $f_{\text{alt}}$ from the data—feasible only because of multiplicity (many tests).
- **IHW covariate.** Must be (i) statistically independent of the $p$-values under the null, and (ii) informative of $\pi_0$ and/or power. Violating (i) invalidates error control; failing (ii) merely forfeits the power gain.

## 5. Failure Modes & Invalidity Patterns

- **$p$-hacking.** Trying many statistics/transformations/preprocessing choices until one yields $p<\alpha$. Warning sign: undisclosed analytic flexibility, results found after exploration. Consequence: under a true null, $P(p<0.05)=1/20$ per try, so with enough tries a "significant" result is essentially guaranteed by chance—stated error rate is meaningless. Remedy: pre-specify the analysis; be fully transparent about what was tried and how; provide the code.
- **HARKing / hypothesis switching.** Forming the hypothesis *after* seeing results, or swapping hypotheses/statistics until something reports. Same inflation of Type I error; violates the prespecification rule of Step 1–3.
- **Affirming the null.** Treating "fail to reject" as evidence that $H_0$ is *true*. A test never proves $H_0$; a high $p$-value can arise from an irrelevant experiment with little data (a near-uniform random number above $\alpha$). Failing to reject a fair-coin null does *not* prove the coin fair. (Low power, not truth, often explains non-rejection.)
- **Mistaking statistical for substantive significance.** Significance is necessary but not sufficient for "interesting"; the two are not the same.
- **Dependence masquerading as more data.** The independence assumption is critical: duplicating data, or treating technical replicates as independent biological replicates, leaves the estimates unchanged but shrinks $p$-values spuriously—pseudo-replication inflates significance.
- **Wrong test statistic for the alternative.** A statistic insensitive to the actual departure (e.g., total heads ignores serial order) yields no power against that alternative even when present.
- **FWER blow-up at scale.** With many tests, $P(\ge 1$ false positive$)\to 1$; a per-test $\alpha$ that is fine singly produces near-certain false hits over a large database/screen.
- **Over-stringency wasting power.** Conversely, Bonferroni/FWER at large $m$ drives the per-test threshold so low that real effects go undetected—an ineffective use of expensive data.
- **Confusing set vs. individual error rates.** FDR/Fdr are *set* averages; attaching them to a single hypothesis is "as much sense as confusing average and marginal costs." The local fdr is the per-hypothesis quantity and is *largely unrelated to the $p$-value*—much $p$-value confusion comes from wanting it to do the fdr's job.
- **FDR is an expectation, not worst-case.** The realized false-discovery proportion $v/r$ in any single experiment can be much higher or lower than the controlled average.
- **Misleading "adjusted $p$-value" language.** BH output, FDR, Fdr, fdr are *not* $p$-values; calling them "corrected/adjusted $p$-values" is confusing (the chapter advocates avoiding the terms), especially since they are set properties and/or model-dependent.
- **Discreteness artifacts.** Count data break $p$-value uniformity under the null (histogram spikes near 1), distorting visual and model-based FDR estimates unless low-count tests are handled (e.g., filtered).
- **Bad IHW covariate.** A covariate correlated with the $p$-value under the null breaks the independence requirement and invalidates error control.

## 6. Empirical Checks & Calibration

- **Simulate under known truth.** Generate data under the explicit $H_0$ (e.g., fair-coin Monte Carlo) and compare the observed statistic to the simulated null—an empirical substitute for, or check on, a closed-form null distribution.
- **Permutation null.** Recompute the statistic over relabelings to obtain a null requiring only exchangeability; agreement with the parametric null is reassuring (CLT), disagreement flags assumption trouble.
- **$p$-value histogram (the key diagnostic).** *Always* plot it for a multiple-testing analysis. Pass: flat uniform null component plus a peak near 0 (signal). Fail/diagnostic signs: a hump in the middle or near 1 (mis-calibration, dependence, wrong null, or discreteness); no peak near 0 (no power/no signal); spikes near 1 (count discreteness).
- **Stratified histograms / ECDFs.** Split tests by a candidate covariate and inspect per-stratum $p$-value histograms or ECDFs: a growing near-0 peak with the covariate shows the covariate tracks power—evidence it is *informative* (and usable for IHW).
- **Schweder–Spjøtvoll plot.** Diagnostic for the null fraction: linear left portion whose slope estimates $m_0$ (and hence $m-m_0$ alternatives); deviation indicates the alternative's contribution.
- **Visual FDR from the histogram.** Use the flat null height to estimate expected false rejections in the rejection bin and thus the false-discovery proportion; cross-check against BH's count.
- **Two-groups fit.** Tools like fdrtool/qvalue estimate $\pi_0$ (e.g., `eta0`) and $f_{\text{alt}}$; the fitted $\pi_0$ is itself a calibration readout of the null fraction.
- **Sensitivity to sample size / dependence.** Deliberately duplicating data or injecting correlation and watching $p$-values shrink (or the histogram distort) reveals how fragile significance is to the independence assumption and how power scales with $n$.

## 7. Interpretation, Guidance & Trade-offs

- **What a $p$-value does and doesn't license.** It quantifies evidence *against* $H_0$, never *for* it. It is not the probability that $H_0$ is true, nor the probability of a single hypothesis being a false discovery. A non-significant result is not proof of the null. Report context, analysis choices, and code so a $p$-value is interpretable at all.
- **Error trade-off.** Lowering Type I error (shifting the threshold conservative) raises Type II error and vice versa; the task is an acceptable balance, not eliminating either. Terminology: FPR $=\alpha$; specificity $=1-\alpha$; FNR $=\beta$; power/sensitivity/TPR $=1-\beta$.
- **Power and design.** Power rises with sample size (the $n_1,n_2$ enter the $t$-statistic) and with a well-matched test statistic. Bigger samples give more significant results for the *same* underlying effect—so significance alone says nothing about effect magnitude or importance.
- **Multiple testing is an opportunity, not just a burden.** Having many tests lets you *empirically* check assumptions and *estimate* the FDR (and $\pi_0$, $f_{\text{alt}}$) from the data, converting $p$-values into FDR estimates—impossible with a single test.
- **FDR is the more useful target; the $p$-value is "second-best."** Prefer FDR/fdr thinking when screening; resort to $p$-values when the alternative distribution and class proportions are inaccessible.
- **Choosing the error rate.** FWER/Bonferroni: conservative, simple, appropriate when any false positive is unacceptable—but often too stringent and power-wasting at genome scale. FDR/BH: permissive and well-suited to candidate screening; controls an average, not a worst case. IHW: at least as many rejections as BH given a valid informative covariate—use it when power varies across strata.
- **Single vs. multiple testing role.** In single testing the $p$-value may be the final result (ideally pre-registered). In multiple testing the outcome is an *intermediate* screen—a selected subset for more careful follow-up—so set-level FDR control is the natural currency.
- **What to hold fixed/report for trustworthiness.** Pre-specify hypotheses and analysis plan; disclose all analyses tried; report the $p$-value histogram; remember FDR/Fdr/fdr depend on modeling assumptions and are not interchangeable with $p$-values.
- **Exact vs. approximate.** Parametric theory is elegant and fast when its assumptions approximately hold; permutation/simulation are more realistic but costlier and give less systematic insight into how parameters drive results.

## 8. Connections & Key Terms

**Builds on:** discrete generative models and the binomial distribution (for null distributions and sufficient statistics); the empirical cumulative distribution function (the $p$-value transform); mixture models (the two-groups model); and the Central Limit Theorem (why parametric and permutation tests agree). **Sets up:** differential-expression analysis of high-throughput count data and generalized linear models (per-gene testing at scale); supervised classification (the symmetric, multivariate counterpart of the decision picture); and empirical-Bayes reasoning (priors estimated from the data via multiplicity).

**Key terms.**
- *Null hypothesis* $H_0$: the privileged default model used to compute the reference distribution; rejected only on strong evidence.
- *Alternative hypothesis*: the departure from $H_0$ one hopes to detect; its form determines which statistic has power.
- *Test statistic*: a numerical summary of the data whose value drives the decision.
- *Null distribution*: the distribution of the test statistic assuming $H_0$.
- *Rejection region*: the set of statistic values that lead to rejecting $H_0$; its size is $\alpha$, its shape set by anticipated alternatives.
- *$p$-value*: null-CDF-transformed score, uniform on $[0,1]$ under $H_0$ for continuous statistics; evidence against $H_0$, not a probability that $H_0$ holds.
- *Significance level $\alpha$ / FPR*: null probability of falsely rejecting; $1-\alpha$ = specificity.
- *Power / $\beta$*: true-positive rate $1-\beta$; $\beta$ = false-negative rate.
- *Type I / Type II error*: false positive (reject true null) / false negative (fail to reject false null).
- *Exchangeability*: invariance of the joint distribution to relabeling—the sole assumption of permutation tests.
- *Permutation test / Monte Carlo null*: data-driven null distributions via relabeling / simulation under $H_0$.
- *$p$-hacking, HARKing, hypothesis switching*: searching analyses/hypotheses post hoc until significance appears—invalidating error control.
- *FWER*: probability of at least one false positive; controlled by Bonferroni ($\alpha=\alpha_{\text{FWER}}/m$).
- *FDR*: expected fraction of false positives among rejections, $\text{E}[V/\max(R,1)]$; a set-level average; controlled by Benjamini–Hochberg.
- *False discovery proportion (FDP)*: the realized $v/r$ in one experiment (what FDR averages over).
- *Two-groups model*: $f(p)=\pi_0+(1-\pi_0)f_{\text{alt}}(p)$; $\pi_0$ = null proportion.
- *Local fdr* $\dfrac{\pi_0}{f(p)}$ and *tail-area Fdr* $\dfrac{\pi_0 p}{F(p)}$: per-hypothesis and set-level posterior null probabilities under the two-groups model.
- *Empirical Bayes*: estimating the prior ($\pi_0$, $f_{\text{alt}}$) from the aggregate data.
- *Informative covariate / IHW*: a null-independent, power-informative auxiliary variable used to weight hypotheses for more discoveries.
- *$p$-value histogram*: the central diagnostic for multiple-testing calibration.
