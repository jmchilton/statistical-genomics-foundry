---
type: book
title: "Fitting models of discrete character evolution"
source: harmon-pcm
source_chapter: 8
source_url: https://lukejharmon.github.io/pcm/chapter8_fitdiscrete/
tags:
  - domain/phylogenetics
  - domain/trait-evolution
  - domain/ancestral-reconstruction
---

# Harmon PCM Chapter 8 — Fitting models of discrete character evolution (summary)
> Faithful summary generated in a clean context, license-aware (CC-BY 4.0 → short verbatim load-bearing quotes marked). Source-only; project framing lives elsewhere.

## 1. Citation
Harmon, Luke J. *Phylogenetic Comparative Methods: Learning from Trees.* 2019. Chapter 8, "Fitting models of discrete character evolution." Book text **v1.0.0** (version string printed on the page). Sections 8.1–8.8. License: the page shows "© CC-BY 2019" (CC-BY 4.0). URL: https://lukejharmon.github.io/pcm/chapter8_fitdiscrete/ (parent site https://lukejharmon.github.io/pcm/). Access date: 2026-07-03.

## 2. Access note
Full chapter text was readable via fetch (sections 8.1–8.8 including the Felsenstein pruning appendix). Some content (figure images, full equation typesetting) was accessed as rendered markdown, so equation numbers and inline numbers are reported as extracted. No paywall boundary. One internal tension noted in §9/§12 (the AICc verdict wording vs. the reported AICc numbers) is carried forward verbatim rather than reconciled.

## 3. Thesis (1 sentence)
The Mk model and its extensions let you fit discrete-character evolution to a phylogeny by maximum likelihood or Bayesian MCMC and compare rate structures (equal vs. unequal transition rates), but the information available comes only from the states of living species, so estimated rates, model choice, and ancestral reconstructions can be weakly constrained or uninformative.

## 4. Problem & context
Discrete characters (here: presence/absence of limbs in squamates, which have lost limbs repeatedly) evolve along a tree, but only tip (extant) states are observed; all internal-node states are unknown. Fitting a model lets you estimate transition rates, test whether forward and backward rates differ, reconstruct ancestral states, and check whether the data carry any historical signal at all.

## 5. Method / approach
- **Mk model / rate structures.** Continuous-time Markov model with rate matrix $Q$. Two structures are worked:
  - **Equal-rates (ER)** — single rate $q$ (Eq. 8.3): $Q=\begin{bmatrix}-q & q\\ q & -q\end{bmatrix}$; **1 free parameter**.
  - **Asymmetric (ASY)** — separate forward/backward rates (Eq. 8.4): $Q=\begin{bmatrix}-q_{1} & q_{1}\\ q_{2} & -q_{2}\end{bmatrix}$; **2 free parameters**. ER is nested within ASY (ER = ASY with $q_1=q_2$).
  - **ARD ("all rates different")** is mentioned only in passing as the multi-state generalization; **SYM (symmetric) is not treated explicitly**, and no parameter-count table or full nesting hierarchy is given.
- **Likelihood on a tree.** Branch transition probabilities from the matrix exponential $P(t)=e^{Qt}$ (Eq. 8.1; example with $q=0.5,\,t=3$ gives $P=\begin{bmatrix}0.525 & 0.475\\0.475 & 0.525\end{bmatrix}$). Felsenstein's **pruning algorithm** computes conditional likelihoods tip-to-root; the core recursion (Eq. 8.7) multiplies the left- and right-descendant contributions: $L_P(i)=\big(\sum_x \Pr(x|i,t_L)L_L(x)\big)\big(\sum_x \Pr(x|i,t_R)L_R(x)\big)$. The full-tree likelihood weights root-state conditional likelihoods by a root prior (Eq. 8.14): $L=\sum_x \pi_x L_{root}(x)$.
- **Root prior.** Three options: (1) each state equally probable at the root; (2) states drawn from the model's stationary distribution; (3) outside information (fossils/outgroups). For an ER model the first two coincide; in general the three can differ.
- **Fitting.** Maximum likelihood (§8.3) and Bayesian MCMC (§8.4).
- **Model comparison.** Nested ER vs. ASY compared by "a likelihood-ratio test, AIC, BIC, or other similar methods" — but **no thresholds, degrees of freedom, or numeric decision rule are stated**; the worked comparison uses **AICc** only.
- **Sanity check.** The "total garbage" test (§8.5) compares the Mk fit against a no-history null.

## 6. Key claims / findings
- Worked squamate limb example, **ER model**: $\ln L=-80.5$, rate $\approx 0.0019$, **AICc = 163.0** (1 parameter).
- Worked squamate limb example, **ASY model**: $\ln L=-79.4$, $q_{12}\approx 0.0016$, $q_{21}\approx 0.0038$, **AICc = 162.8** (2 parameters). The estimated loss rate exceeds the gain rate ("we estimate a rate of losing limbs that is higher than the rate of gaining them").
- **Verdict: inconclusive.** The two models are separated by only ~0.2 AICc; the author explicitly says this is "not definitive" and that equal forward/backward rates "cannot be ruled out."
- **Bayesian (§8.4/§8.6):** the posterior for the backward rate $q_{21}$ is higher than for the forward rate $q_{12}$, but "the two distributions are broadly overlapping" — same non-decisive conclusion as ML.
- **Total garbage test (§8.5):** with $n=258$, $n_0=207$, $p=n_0/n=0.8023256$: $\ln L_{garbage}=-128.2677$ vs. $\ln L_{Mk}=-80.487176$. Since the Mk likelihood is far higher, the garbage model is "a terrible fit" — the data contain historical information. Garbage likelihood formula (Eq. 8.2/8.10): $L_{garbage}=p^{n_0}(1-p)^{n-n_0}$.
- **Ridge diagnostic:** flat likelihood ridges in Mk fits almost always occur at high $q$, where the Mk model converges to the garbage model; if the ML $q$ has the same likelihood as the garbage model, $q$ is unidentifiable and ancestral states cannot be estimated with precision.
- **Ancestral state reconstruction** uses only extant-species states; internal nodes are shown as pie charts of proportional marginal likelihoods (Fig. 8.2, ER model).
- **Irreversibility is hard:** distinguishing irreversible evolution from comparative data alone is difficult; an informative prior on the relative difficulty of gaining vs. losing limbs could "dramatically alter" the ancestral reconstruction (Fig. 8.3).

## 7. Load-bearing statements (verbatim — CC-BY permits)
1. Model-comparison machinery (§8.6), verbatim: "One can compare the two nested models using standard methods discussed in previous chapters – that is, a likelihood-ratio test, AIC, BIC, or other similar methods." *(No threshold or df is given.)*
2. Worked-example verdict (§8.6), verbatim: "The AICc score is higher for the unequal rates model, but only by about 0.2 – which is not definitive either way. So based on this analysis, we cannot rule out the possibility that forward and backward rates are equal."
3. Information used by reconstruction (§8.6, final paragraph), verbatim: "our comparative analysis is not using any information other than the states of extant species to reconstruct these rates."
4. Prior/model can dominate reconstruction (§8.6), verbatim: "identifying irreversible evolution using comparative methods is a problem that is known to be quite difficult, and might require outside information in order to resolve conclusively... Such a prior could dramatically alter the results presented in Figure 8.3."
5. Garbage-model decision rule (§8.5), verbatim: "If the maximum likelihood value of _q_ has the same likelihood as our garbage model, then we know that we are on a ridge of the likelihood surface and _q_ cannot be estimated. We also have no ability to make any statements about the past evolution of our character – in particular, we cannot estimate ancestral character state with any precision. By contrast, if the likelihood of the Mk model is greater than the total garbage model, then our data contains some historical information."

## 8. Stated scope, assumptions, limitations
- **Mk assumptions (implicit in the model):** continuous-time Markov process; a rate matrix constant across the tree and through time; transition probabilities via $P(t)=e^{Qt}$; a specified root-state prior. The chapter treats only 2-state characters in the worked examples; multistate ARD is named but not developed.
- **Information limit (stated):** only extant-species states inform the fit; internal states are unobserved.
- **Model comparison depth:** the chapter names LRT/AIC/BIC but does not state test statistics, degrees of freedom, or cutoff conventions; the worked comparison relies on a small AICc difference declared non-definitive.
- **Reconstruction display:** uses proportional marginal likelihoods (pie charts); does not formalize a reporting standard.

## 9. Failure modes / invalidity patterns
- **Uninformative data / likelihood ridge.** Warning sign: a flat ridge in the likelihood surface, occurring at high $q$; the ML $q$ has (nearly) the same likelihood as the "garbage" (draw-from-a-hat) model. Consequence: $q$ cannot be estimated and ancestral states cannot be reconstructed with precision. Detector/remedy: compare $\ln L_{Mk}$ to $\ln L_{garbage}=p^{n_0}(1-p)^{n-n_0}$ (§8.5); proximity signals no historical signal.
- **Non-definitive model selection.** Warning sign: very small information-criterion gap (here $\Delta$AICc ≈ 0.2). Consequence: cannot distinguish ER from ASY / cannot rule out equal rates. No remedy given beyond acknowledging the ambiguity.
- **Prior/model dominance of ancestral reconstruction.** Warning sign: data alone weakly constrain direction (e.g., irreversibility). Consequence: an informative prior "could dramatically alter" the reconstruction (Fig. 8.3), i.e., the point/estimate is driven by assumptions, not data. Remedy: bring in outside information (fossils, outgroups) explicitly.
- **Reliance on extant states only.** Warning sign: deep-node or directional questions asked of tip-only data. Consequence: comparative methods "cannot resolve conclusively" (irreversibility example). Remedy: external/fossil information.
- **[summarizer-inferred] Reported-number vs. wording tension.** The verdict sentence says AICc is "higher for the unequal rates model," yet the reported AICc values are ASY = 162.8 < ER = 163.0 (i.e., ASY's AICc is ~0.2 *lower*, and lower AICc is the better fit). Carried forward as-is; the chapter's substantive point — the difference is "not definitive either way" — is unaffected. Not spelled out as an inconsistency by the chapter.

## 10. What the chapter does NOT address
- No explicit SYM (symmetric) model, no full ER/SYM/ARD parameter-count/nesting table.
- No numeric LRT procedure — no $\chi^2$ statistic, degrees of freedom, or p-value for the worked comparison.
- No BIC calculation (BIC only named).
- No marginal-vs-joint reconstruction distinction; no stochastic character mapping.
- No explicit small-tree / sample-size guidance for rate reliability beyond the garbage-test check.
- No treatment of rate heterogeneity across the tree, hidden-state models, or model-adequacy tests beyond the garbage comparison.

## 11. Open questions / ambiguities the chapter leaves unresolved
- Which model-comparison criterion to prefer, and at what threshold, when ER vs. ASY are near-tied (the AICc gap is declared non-definitive with no fallback rule).
- How to reconcile the verdict wording ("AICc higher for the unequal rates model") with the reported AICc values (ASY lower) — see §9.
- How to choose among the three root-state priors in practice when they diverge.
- How much an informative (fossil/outgroup) prior *should* shift the limb reconstruction — flagged as likely important but not quantified.

## 12. Guidance answers
1. **Rate structures / parameters / nesting.** ER = single rate $q$, **1 free parameter** (Eq. 8.3); ASY = forward/backward rates $q_1,q_2$, **2 free parameters** (Eq. 8.4); ER is nested in ASY ($q_1=q_2$). **ARD** is named only in passing (multistate generalization); **SYM is not treated explicitly**, and no parameter-count/nesting table is provided.
2. **Model comparison (core).** The chapter states the methods but gives **no exact numeric decision rule, threshold, or degrees of freedom**; the worked comparison uses **AICc** only, no LRT statistic. Must-quote (§8.6): "One can compare the two nested models using standard methods discussed in previous chapters – that is, a likelihood-ratio test, AIC, BIC, or other similar methods."
3. **Worked example numbers (core).** Squamate limbs — ER: $\ln L=-80.5$, AICc = 163.0, 1 param, rate ≈ 0.0019. ASY: $\ln L=-79.4$, AICc = 162.8, 2 params, $q_{12}\approx0.0016$, $q_{21}\approx0.0038$. **Inconclusive.** Must-quote (§8.6): "The AICc score is higher for the unequal rates model, but only by about 0.2 – which is not definitive either way. So based on this analysis, we cannot rule out the possibility that forward and backward rates are equal."
4. **ASR information source.** Uses only extant-tip states plus the tree. Must-quote (§8.6): "our comparative analysis is not using any information other than the states of extant species to reconstruct these rates." Also (§8.2): "we only observe the states at the end of these branches. All of the character states at internal nodes of the tree are unknown."
5. **Priors/model dominating reconstruction.** Must-quote (§8.6): "identifying irreversible evolution using comparative methods is a problem that is known to be quite difficult, and might require outside information in order to resolve conclusively... Such a prior could dramatically alter the results presented in Figure 8.3." (I.e., when data are weakly informative, an informative prior can drive the ancestral estimate.)
6. **Marginal vs. joint / stochastic mapping.** The chapter does **not** distinguish marginal vs. joint reconstruction and does **not** introduce stochastic character mapping. It displays **proportional marginal likelihoods** as node pie charts (Fig. 8.2, ER) and reports Bayesian **posterior distributions** for rates (§8.4/§8.6, Fig. 8.3), noting the forward/backward posteriors are "broadly overlapping." No formal uncertainty-reporting standard (scaled likelihoods vs. posterior probabilities vs. sampled histories) is prescribed.
7. **Named failure modes.** (a) Likelihood ridge at high $q$ → $q$ unidentifiable, ancestral states not estimable; detector = garbage-model comparison (§8.5). (b) Garbage/no-history data → predictions no better than random draws; detector = $\ln L_{Mk}$ vs. $\ln L_{garbage}$. (c) Non-definitive model selection (tiny $\Delta$AICc) → cannot choose ER vs. ASY. (d) Tip-only information → cannot resolve direction/irreversibility without outside data. (e) Prior dominance → informative prior can "dramatically alter" the reconstruction. Small-tree unreliability is not called out as a separate named mode beyond the garbage/ridge diagnostics.
