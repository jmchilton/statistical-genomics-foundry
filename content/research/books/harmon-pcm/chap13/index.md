---
type: book
title: "Characters and diversification rates"
source: harmon-pcm
source_chapter: 13
source_url: https://lukejharmon.github.io/pcm/chapter13_chardiv/
---

# Harmon PCM Chapter 13 — Characters and diversification rates (summary)
> Faithful summary generated in a clean context, license-aware (CC-BY 4.0 → short verbatim load-bearing quotes marked). Source-only; project framing lives elsewhere.

## 1. Citation
Harmon, Luke J. 2019. "Chapter 13: Characters and diversification rates." In *Phylogenetic Comparative Methods: Learning from Trees* (book text v1.0.0). CC-BY 4.0. https://lukejharmon.github.io/pcm/chapter13_chardiv/ — accessed 2026-07-03. (Version string "v1.0.0" per the book front matter as stated in the task; not re-verified on the chapter page itself — [summarizer-inferred] boundary.)

## 2. Access note
Read the chapter via rendered-page fetches. I recovered the full section skeleton (13.1–13.6), model definitions, the worked Solanaceae example table, the likelihood-calculation sketch, and the pitfalls/remedies section with citations and verbatim decision statements. **Boundary:** I could not confirm the exact self-incompatible-vs-self-compatible species counts within the 356-species dataset, nor the full differential-equation forms (only their variables/roles). Equations are reported conceptually, not transcribed. The four-row AIC table numbers are reported as the chapter's; treat as high-confidence but page-fetch-mediated.

## 3. Thesis (1 sentence)
Hypotheses that a species trait alters speciation and/or extinction can be tested with state-dependent diversification models (BiSSE and relatives), but on real trees these tests have a peculiar and severe false-discovery problem that must be guarded against with permutation baselines, hidden-cause models, and a replication requirement.

## 4. Problem & context
Motivating biology: self-incompatibility in flowering plants — a mechanism angiosperms use to avoid self-fertilization (Bateman 1952). "The evolution of selfing is a good example of a trait that might have a strong effect on diversification rates by altering speciation, extinction, or both" (verbatim, §13.1). The general question: does a character's state affect the rate at which lineages speciate or go extinct? Naively comparing the number of species in state-0 vs state-1 clades conflates the trait's effect with everything else that varies across a phylogeny, motivating an explicit model that separates state-specific birth/death from state transitions.

## 5. Method / approach
**BiSSE (Binary State Speciation and Extinction)** — Maddison, Midford & Otto (2007). A six-parameter model for a binary character:
- state-specific speciation rates $\lambda_0,\lambda_1$
- state-specific extinction rates $\mu_0,\mu_1$
- transition rates between states $q_{01},q_{10}$

Assumption: "parent lineages give birth to daughters with the same character state" (verbatim, §13.2) — speciation itself doesn't change the state; state change happens only via the $q$ transitions.

**MuSSE (Multi-State SSE)** — FitzJohn (2012). Generalizes BiSSE to $k$ states, each with its own $\lambda_i,\mu_i$: "this method generalizes well to multi-state characters (the MuSSE method; FitzJohn 2012)" (verbatim, §13.2).

**QuaSSE, GeoSSE, HiSSE — NOT named in this chapter.** This chapter discusses only BiSSE and MuSSE by name. (See §9 for the closely related "unmeasured character" model the chapter *does* describe without the HiSSE label.)

**Likelihood calculation (§13.3).** A pruning-style algorithm working from tips toward the root, over small time intervals, considering three things that can happen on a branch: no change, a character-state transition, or a speciation event (whose extra daughter may go unobserved via later extinction). Two quantities are propagated down each branch:
- $p_0(t),p_1(t)$: "the probability of the observed data if, at time $t$, the character state were in state 0 [$p_0(t)$] or state 1 [$p_1(t)$]" (verbatim).
- $E_0(t),E_1(t)$: "the probability that a lineage with state 0 or 1, respectively, and alive at time $t$ will go extinct before the present day" (verbatim).

Governed by a set of coupled differential equations tracking how these change along branches; combined at the root to give the full likelihood. Root state can be handled by equal probabilities (0.5/0.5), equilibrium/equilibrium-frequency weighting, or empirical-Bayes weighting.

**Testing (§13.4).** Fit the full model and constrained submodels, then compare. Nested models via likelihood-ratio tests; model set scored by AIC/AICc. Bayesian alternative: MCMC with exponential priors and uniform proposals, acceptance ratio combining prior odds × proposal-density ratio × likelihood ratio.

**Recommended procedure:** fit a set of models spanning "character-independent" (rates don't depend on state) up to the full state-dependent model, compare by AIC, and — critically (§13.5) — benchmark the observed support against a null distribution from permuted/simulated data rather than trusting the raw significance.

## 6. Key claims / findings
- Worked example: BiSSE-type fit to a tree + data for **356 species of Solanaceae** (Goldberg and Igić 2012); species classified as self-incompatible "even if the state is variable among populations" (verbatim).
- AIC model comparison (chapter's numbers):

| Model | Parameters | lnL | AIC |
|---|---|---|---|
| Character-independent | 4 | −945.96 | 1899.9 |
| Speciation depends on character | 5 | −945.57 | 1901.1 |
| Extinction depends on character | 5 | −943.93 | 1897.9 |
| Full (both depend) | 6 | −941.94 | 1895.9 |

- Conclusion: "we conclude that models where the character influences diversification fit best, with the full model receiving the most support" (verbatim). The extinction-only model is within 2 AIC units of the best, so an extinction-only effect "can't [be] discount[ed]."
- The headline caution: applied to empirical trees, "even with made-up data, we almost always find statistically significant results" (verbatim, §13.5).
- Rabosky and Goldberg (2015) demonstration: "the number of letters in a species name is significantly associated with speciation rates across a range of empirical datasets" (verbatim) — a deliberately meaningless trait scoring "significant."

## 7. Load-bearing statements (verbatim — CC-BY permits)
1. "parent lineages give birth to daughters with the same character state" (§13.2, BiSSE assumption).
2. "if we apply the tests to empirical phylogenetic trees, even with made-up data, we almost always find statistically significant results" (§13.5).
3. "the number of letters in a species name is significantly associated with speciation rates across a range of empirical datasets" (§13.5, describing Rabosky & Goldberg 2015).
4. "On these real trees, speciation and/or extinction rates vary across clades. Among the two models that the authors consider, both are wrong; speciation and extinction are independent of the character but not constant through time." (§13.5).
5. "We can deal with this critique, in part, by making sure the events we test are replicated in our data." (§13.5, the replication remedy).

## 8. Stated scope, assumptions, limitations
- BiSSE assumes the character state is inherited unchanged at speciation; state changes only via $q_{ij}$ along branches.
- The "character-independent" comparison model here holds birth and death rates **constant** — but the chapter is explicit that this constant-rate null is itself usually false on real trees (rates vary across clades and through time), which is the root of the inference problem.
- The chapter frames the whole method's validity as contingent on the character's state-change events being *replicated* across the tree rather than concentrated in one place.
- Bayesian and ML machinery are presented as standard; the chapter does not claim one is uniformly superior.

## 9. Failure modes / invalidity patterns
[Referee-relevant — high priority.]

- **Spurious significance from any trait, including neutral/nonsense ones.** Warning sign: a state-dependent model beats the constant-rate null with strong significance. Consequence: you "confirm" that a trait drives diversification when it does nothing. Detector/remedy the chapter names: benchmark $\Delta$AIC (or the likelihood-ratio statistic) against a **null distribution from randomized data** — simulate data on the tree, permute the tips, or draw from a multinomial — rather than trusting the nominal p-value.
- **Not technically "Type I error" — worse/subtler.** The chapter is precise: these are *not* Type I errors because "the data are not simulated under the null hypothesis." Real trees violate the constant-rate null via unmeasured rate heterogeneity across clades and through time; the state-dependent model wins simply because it fits that heterogeneity better than a rigid constant-rate model, even when the measured character is irrelevant. Consequence: standard nested-model significance testing is systematically misleading here.
- **Hidden / unmeasured driver of rate variation.** Warning sign: a real background of clade-to-clade rate variation the tested character happens to correlate with. Remedy the chapter names: **explicitly model an unmeasured character as the possible true driver of diversification (Beaulieu and O'Meara 2016)** — i.e. a hidden-state alternative. (This is the modern HiSSE/CID idea, though the chapter does **not** use the terms "HiSSE" or "CID.") [summarizer-inferred that Beaulieu & O'Meara 2016 = HiSSE — the chapter names only the authors and the concept.]
- **Unreplicated character-state origin.** Warning sign: the trait of interest arose (or shifted) essentially once, so the association rests on a single background rate shift somewhere on the tree rather than repeated independent evidence. Remedy: require that "the events we test are replicated in our data" (verbatim) — many independent origins of the state, not one.
- **Semi-parametric permutation alternative.** Rabosky and Goldberg (2017) permutation-based methods "have similar statistical properties" and are offered as a route to valid inference.

**Empirical checks the chapter endorses:** (1) simulate/permute data lacking any true character effect and confirm the observed statistic falls within that null distribution (pass = observed not extreme vs randomized; fail = randomized data also produce "significant" support, signaling the method is being fooled); (2) fit an unmeasured/hidden-character model and check whether the measured trait still wins once a hidden driver is allowed; (3) inspect whether state changes are replicated across branches.

## 10. What the chapter does NOT address
- QuaSSE (continuous-trait), GeoSSE (geographic-range), and HiSSE (hidden-state) models by name — not covered here.
- Sister-clade comparison methods and other non-SSE approaches to trait–diversification testing — not discussed in this chapter.
- Explicit quantitative power analysis (e.g. minimum tree size or minimum number of independent origins needed for reliable inference) — the replication requirement is stated qualitatively, not with a numeric threshold.
- The exact within-dataset counts of self-incompatible vs self-compatible Solanaceae, and the full transcribed differential equations.

## 11. Open questions / ambiguities left unresolved
- How many independent origins of a trait count as "replicated enough" — no numeric criterion given.
- How to choose among the offered remedies (permutation null vs. hidden-character model vs. replication check), or whether they should be combined, is left to practitioner judgment.
- The chapter names Beaulieu & O'Meara (2016) and Rabosky & Goldberg (2017) as remedies but does not walk through their mechanics or relative statistical performance.
- Whether the extinction-only effect (within 2 AIC of the full model) in the Solanaceae example is real or an artifact of the same background-heterogeneity problem is not adjudicated.
