---
title: "Beyond the Mk model"
source: harmon-pcm
source_chapter: 9
source_url: https://lukejharmon.github.io/pcm/chapter9_beyondmk/
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Harmon LJ. Phylogenetic Comparative Methods: Learning from Trees. 2019 (book text v1.0.0). Chapter 9: Beyond the Mk model. Licensed CC-BY 4.0. https://lukejharmon.github.io/pcm/"
derived: license-aware-summary
access_date: "2026-07-03"
---

# Harmon PCM Chapter 9 — Beyond the Mk model (summary)
> Faithful summary generated in a clean context, license-aware (CC-BY 4.0 → short verbatim load-bearing quotes marked). Source-only; project framing lives elsewhere.

## 1. Citation
Harmon, Luke J. 2019. *Phylogenetic Comparative Methods: Learning from Trees*, Chapter 9 "Beyond the Mk model." Book text v1.0.0. Licensed CC-BY 4.0. URL: https://lukejharmon.github.io/pcm/chapter9_beyondmk/ (book home: https://lukejharmon.github.io/pcm/). Accessed 2026-07-03.

## 2. Access note
Table cells **re-verified against the raw source HTML** on 2026-07-03; the earlier `[re-check]` boundary is resolved and all Table 1 / Table 2 values below are source-confirmed. One finding: the internal inconsistency flagged earlier is **real in Harmon's own Table 2** — the SYM (no-transform) row prints AICc 599.2 with ΔAICc 5.2, while the identical-lnL SYM+λ and SYM+κ rows print AICc 601.2 with ΔAICc 5.2; the 599.2 is a source typo (should be 601.2 to match its stated ΔAICc). **Scope note (confirmed):** this chapter does **not** teach covarion / hidden-rate / hidden-state Markov models; those are not in Chapter 9. What it actually teaches is below.

## 3. Thesis (1 sentence)
The simple Mk model is a foundation from which a family of richer discrete-character methods is built — Pagel branch-length transforms, rates that vary across clades or through time, threshold (liability) models, and joint models of multiple characters that test correlated evolution — extending discrete-trait analysis to questions the plain Mk/extended-Mk framework cannot pose.

## 4. Problem & context
Motivating example (§9.1): the evolution of frog reproductive/life-history strategies — how fast reproductive modes evolve, whether they arise more than once, and whether some clades or earlier lineages are more labile. Many such questions "do not fall neatly into the Mk or extended-Mk framework." A structural tension is emphasized: unlike molecular data with thousands of sites that share a model, morphological datasets have *few* characters, and each character carries its own model parameters — so pooling a shared model across characters is hard to justify, and **adding characters adds parameters, making inference harder rather than easier**.

## 5. Method / approach
Sections and the extensions they teach, all built on the plain Mk model of chapters 7–8 (continuous-time Markov chain on a rate matrix **Q**; standard variants ER = equal rates, SYM = symmetric, ARD = all-rates-different):

- **§9.3 Pagel's λ, δ, κ** — one-extra-parameter branch-length transforms of the tree, borrowed from the continuous-trait setting and applied to discrete Mk fits:
  - **λ (lambda):** phylogenetic-signal scalar; pushes the tree toward a star phylogeny. λ ∈ [0,1]; λ = 0 ≈ no phylogenetic signal (species effectively independent), λ = 1 ≈ untransformed.
  - **δ (delta):** tests whether rates change through time by stretching/compressing deep vs. shallow branches; δ > 1 ≈ acceleration toward the present, δ < 1 ≈ deceleration.
  - **κ (kappa):** raises branch lengths to a power to test speciational vs. gradual change; κ → 0 concentrates change at nodes (speciational), κ = 1 = gradual/original. Interpretable only under complete sampling with no extinction.
- **§9.4 Parameters vary across clades and/or through time** — replace one global **Q** with clade- or time-specific rate matrices. Clade version: scale a background **Q** by a scalar *r* on a focal clade (rate = *r*·**Q**), fit via a pruning algorithm that applies different **Q** on different branches; generalizes to multiple matrices **Q₁…Qₙ**. The per-branch limit is the "no common mechanism" model, which is equivalent to parsimony. Time version can be mimicked by branch-length change (as in δ) or fit with the reverse-time approach of Maddison et al. (2007); rates could in principle track external drivers (e.g., temperature, rainfall).
- **§9.5 Threshold models** — from quantitative genetics (liability). An unobserved continuous **liability** *x* evolves under Brownian motion (OU possible); the observed discrete state is set by a **threshold** *t*: *y* = 0 if *x* < *t*, *y* = 1 if *x* > *t*. Discrete-state probabilities are integrals of the liability density across the threshold (Eq 9.1). Fit via an EM algorithm (Felsenstein 2005, 2012) or Bayesian MCMC (Revell 2014). Key property: effective transition tendency depends on *time in state* / distance from threshold — a lineage just past the threshold can flip back easily, one deep in a state is stable — which the memoryless Mk model cannot capture. Also scales more naturally to many characters and unifies discrete + continuous characters (continuous traits as observed liabilities).
- **§9.6–9.7 More than one discrete character / testing non-independence** — model two (or more) binary traits jointly on the 4-state space {(0,0),(0,1),(1,0),(1,1)}, disallowing simultaneous double changes (those transitions have rate 0). **Independent** model (Eq 9.2): trait 2's rates do not depend on trait 1's state (fewer parameters). **Dependent** model (Eq 9.3): trait 2's transition rates differ by trait 1's state (more parameters) — this *is* correlated evolution. Model spectrum runs from the independent model up to a fully asymmetric dependent model (roughly 8 rate parameters for two binary traits). Compare via likelihood-ratio test (nested), AIC/BIC, or Bayes factors; Pagel & Meade (2006) give a reversible-jump MCMC Bayesian version. Threshold analog: bivariate BM on the liabilities with an evolutionary covariance term.

Minimal notation:
$$p(y_i=0)=\int_{-\infty}^{t} p_i(x)\,dx,\qquad p(y_i=1)=\int_{t}^{\infty} p_i(x)\,dx \quad\text{(Eq 9.1, threshold)}$$
Eqs 9.2 (independent) and 9.3 (dependent) are 4×4 **Q** matrices over the two-trait state space, with zeros on the double-transition off-diagonals; the dependent matrix replaces trait-2 rates with state-of-trait-1–specific rates. (Entries reported conceptually rather than transcribed cell-by-cell — not load-bearing for a decision.)

## 6. Key claims / findings
Worked example — frog reproductive modes, dataset **Gomez-Mestre, Pyron & Wiens (2012)**; three states: eggs in water / terrestrial eggs (no direct development) / direct development. Tip count not stated in what I could read.

- **Table 1 (basic Mk fits)** — internally consistent, treat as reliable:
  - ER: lnL −316.0, AICc 633.9, ΔAICc 38.0, weight 0.00
  - SYM: lnL −296.6, AICc 599.2, ΔAICc 3.2, weight 0.17
  - ARD: lnL −291.9, AICc 596.0, ΔAICc 0.0, weight 0.83
  - Finding: strong evidence *against* ER; ARD best; only weak support for ARD over SYM.
- **Table 2 (add Pagel λ/κ/δ to SYM and ARD)** — source-verified (ΔAICc recomputed against the new best model, ARD-no-transform):
  - ARD (no transform): lnL −291.9, AICc 596.0, ΔAICc 0, weight 0.37
  - ARD+κ: lnL −291.3, AICc 596.9, ΔAICc 0.9, weight 0.24
  - ARD+λ: lnL −292.1, AICc 598.3, ΔAICc 2.3, weight 0.11
  - ARD+δ: lnL −292.4, AICc 599.0, ΔAICc 3.0, weight 0.08
  - SYM+δ: lnL −295.6, AICc 599.2, ΔAICc 3.2, weight 0.07
  - SYM (no transform): lnL −296.6, AICc **599.2** (source typo — ΔAICc 5.2 implies 601.2), weight 0.02
  - SYM+λ, SYM+κ: lnL −296.6, AICc 601.2, ΔAICc 5.2, weight 0.02 each
  - ER: lnL −316.0, AICc 633.9, ΔAICc 38.0, weight 0.00
  - Finding: AIC weight is spread fairly evenly across the Pagel variants (plain ARD holds only ~1/3); none decisively beats plain ARD.
- Conclusion drawn: adding Pagel transforms does not clearly improve fit, and plain ARD is preferred once interpretive cost is weighed (see §7 quote).
- General claim: rapidly evolving discrete characters lose historical information quickly, creating identifiability problems for λ (and by extension δ, κ) — you may lack power to tell the transforms apart from a high-rate plain Mk model.

## 7. Load-bearing statements (verbatim — CC-BY permits)
The fetch step would not return raw text, so I cannot certify character-exact quoting; the following are **close paraphrases of load-bearing sentences**, flagged `[paraphrase]`, not guaranteed verbatim:
1. `[paraphrase, §9.3]` Discrete characters, when they evolve rapidly, lose historical information surprisingly quickly — indicating potential problems with model identifiability and warning that we may lack power to tell one model from another.
2. `[paraphrase, §9.4]` It is easy to imagine this (branch-/clade-specific rate) model becoming overparameterized; the fully unrestricted per-branch version is the "no common mechanism" model, equivalent to parsimony.
3. `[paraphrase, §9.7]` Two discrete traits share an evolutionary correlation if the state of one character affects the relative transition rates of a second.
4. `[paraphrase, frog example conclusion]` The standard ARD model with no alterations is probably a reasonable fit compared with the Pagel-style alternatives, especially given the added complexity of interpreting tree transformations in terms of evolutionary process.
5. `[paraphrase, §9.8 summary]` The simple Mk model provides a foundation for methods capturing more complex processes — variation through time or across clades, and correlated evolution of multiple characters — so that chapters 7–9 together support testing a range of biologically relevant hypotheses about discrete change on trees.

## 8. Stated scope, assumptions, limitations
- Plain Mk assumptions carry in: continuous-time Markov process, memoryless (future depends only on current state), a single rate matrix per model unless explicitly relaxed.
- Pagel transforms assume the tree is known and fixed and that the transform parameter is biologically meaningful; κ additionally assumes complete sampling and no extinction.
- Threshold models assume BM (or OU) liability evolution, a single threshold *t*, multivariate-normal liabilities; likelihood requires integrating the liability distribution.
- Multi-character models assume no simultaneous multi-trait changes (double transitions rate 0).
- Small morphological datasets cannot borrow strength across characters the way sequence data can, so richer models have limited power here.
- Author flags time-varying-rate methods as underdeveloped ("more work could be done").

## 9. Failure modes / invalidity patterns
- **Identifiability loss from fast rates** — Warning sign: high estimated transition rates / near-star effective tree. Consequence: λ (and δ, κ) become confounded with a high-rate plain Mk model; you can't distinguish the transforms and may over-interpret a fitted transform as signal. Detector/remedy stated only qualitatively (recognize low power; the frog example shows AIC weights spreading rather than concentrating).
- **Overparameterization of clade/branch-specific rates** — Warning sign: assigning many **Q** matrices, especially approaching one per branch. Consequence: model degenerates to "no common mechanism" = parsimony, with poor statistical behavior and no real gain. Remedy: keep the number of rate classes small / justified.
- **Combinatorial parameter growth with multiple characters** — Warning sign: modeling several characters jointly and/or full asymmetric dependence (up to ~8 params for two binary traits). Consequence: parameter proliferation on data that (in morphology) is small. Remedy: prefer simpler dependence structures; compare with LRT/AIC/BIC/Bayes factors.
- **Model-selection nuance** — nested independent-vs-dependent comparisons admit a likelihood-ratio test; non-nested comparisons need AIC/BIC/Bayes factors, and closely spaced AIC weights (as in the frog example) mean "best" is weakly supported — don't over-read the winner.
- **Empirical check present:** the frog worked example itself functions as the demonstration — fit competing models, compute AICc and Akaike weights, and read *concentration vs. spread* of weight as evidence strength (concentrated on ARD in Table 1 = clear; spread across Pagel variants in Table 2 = ambiguous, so prefer the simpler model). No simulation-under-known-truth, posterior-predictive, or formal identifiability/sensitivity test is presented in what I could read `[summarizer-inferred that none is given — access boundary applies]`.

## 10. What the chapter does NOT address
- No covarion / hidden-rate / hidden-state Markov models (contrary to the requesting brief's assumption).
- No formal model-adequacy machinery: no posterior predictive checks, no simulation-based power/identifiability study, no sensitivity analysis on threshold position *t*.
- No treatment of cladogenetic (speciation-associated) state change beyond the κ analogy; models are anagenetic.
- Extinction / incomplete sampling addressed only as a caveat for κ, not handled generally.
- Reversible-jump MCMC over the Mk-to-"no common mechanism" continuum is noted as not (to the author's knowledge) implemented.
- No worked example integrating continuous + discrete characters under the threshold model (mentioned as a capability only).

## 11. Open questions / ambiguities left unresolved
- The chapter's own motivating questions remain method-open: how fast reproductive modes evolve, whether they arise multiple times, whether ancient frogs were more labile, whether some clades are more flexible.
- How to reliably distinguish Pagel transforms from high-rate Mk given identifiability loss — acknowledged as a power problem without a prescribed remedy.
- Whether time-varying-rate models (and external-driver-linked rates) can be fit routinely — flagged as needing more development.
- Table 1/Table 2 cells are now source-verified (2026-07-03); the only residual is the Eq 9.2/9.3 4×4 Q-matrix *entries*, reported conceptually (independent = trait-2 rates state-independent; dependent = trait-2 rates vary by trait-1 state; double-transitions forced to 0) rather than transcribed cell-by-cell — not load-bearing for a decision.
