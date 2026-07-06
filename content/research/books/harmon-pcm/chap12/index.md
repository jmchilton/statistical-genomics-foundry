---
title: "Beyond birth-death models"
source: harmon-pcm
source_chapter: 12
source_url: https://lukejharmon.github.io/pcm/chapter12_beyondbd/
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Harmon LJ. Phylogenetic Comparative Methods: Learning from Trees. 2019 (book text v1.0.0). Chapter 12: Beyond birth-death models. Licensed CC-BY 4.0. https://lukejharmon.github.io/pcm/"
derived: license-aware-summary
access_date: "2026-07-03"
---

# Harmon PCM Chapter 12 — Beyond birth-death models (summary)
> Faithful summary generated in a clean context, license-aware (CC-BY 4.0 → short verbatim load-bearing quotes marked). Source-only; project framing lives elsewhere.

## 1. Citation
Harmon, Luke J. 2019. *Phylogenetic Comparative Methods: Learning from Trees*, Chapter 12: "Beyond birth-death models." Book text v1.0.0 (version stated on the book site). License CC-BY 4.0. URL: https://lukejharmon.github.io/pcm/chapter12_beyondbd/ (book home: https://lukejharmon.github.io/pcm/). Accessed 2026-07-03.

## 2. Access note
Full chapter body read via fetch (headings, prose, equations, worked examples, caveats, summary). Content extracted through a page-to-text conversion, so a handful of the more degenerate example parameter values (esp. the exponential-extinction salamander row) and exact equation typography could carry transcription noise — treat those digits as source-reported, re-check against the live page if load-bearing. **Numbering anomaly in the source itself:** two sections are both labeled "Section 12.5" (Protracted speciation, then Summary) — verified this is a document numbering error, not a fetch artifact.

## 3. Thesis (1 sentence)
Constant-rate birth-death models cannot capture how speciation and extinction actually vary across the tree of life, so this chapter extends them to let rates vary across clades, through time, with standing diversity, or with the duration of speciation — while warning that mechanistically different models often leave identical signatures in a tree.

## 4. Problem & context
Follows Chapter 11's finding that "there are times and places where the tree of life has grown more rapidly than others" (verbatim, opening sentence). Chapter's motivating claim: "Simple, constant-rate birth-death models are not adequate to capture the complexity and dynamics of speciation and extinction across the tree of life." Speciation and extinction rates "vary through time, across clades, and among geographic regions." Each extended model relaxes one constant-rate assumption of the Chapter 10–11 birth-death model (constant λ, constant μ, instantaneous speciation, rates independent of standing diversity), keeping the same likelihood-of-a-reconstructed-tree machinery.

## 5. Method / approach
All models still assume the Equal-Rates Markov (ERM) process — "This is again the Equal-Rates Markov (ERM) model for tree growth described in the previous chapter" — i.e. at any instant all lineages share the same rates; the extensions vary those shared rates along different axes.

**(12.2) Variation across clades — lineage-specific rate shifts.** Fit multiple-rate birth-death models where λ and μ change at discrete points ("shifts") on specified branches, then compare nested models by likelihood-ratio test or AICc. Named methods: stepwise AIC — "Available methods use stepwise AIC (MEDUSA, Alfaro et al. 2009)" — and reversible-jump Bayesian MCMC (Rabosky 2014, 2017). Worked amphibian example (MEDUSA-style, Fig. 12.4): constant-rate model λ_T = 0.30, μ_T = 0.28 (lnL = −1053.9, AICc = 2111.8) vs. a two-regime model with a slow clade (λ = 0.010, μ = 0.007) against background (λ = 0.29, μ = 0.27) (lnL = −1045.4, AICc = 2101.1). Decision heuristic given: an AICc difference of more than 10 is "good reason to think that there is a difference in diversification rates."

**(12.3) Variation through time.** General likelihood framework of Morlon et al. (2011) for a reconstructed tree with divergence times $t_1,\dots,t_{n-1}$, allowing arbitrary time functions $\lambda(t)$, $\mu(t)$ with uniform sampling fraction $f$:
$$L = (n+1)!\,\frac{f^n\sum_{i=1}^{n-1}\lambda(t_i)\,\Psi(s_{i,1},t_i)\,\Psi(s_{i,2},t_i)}{\lambda\,[1-E(t_1)]^2}$$
where $E(t)$ is the probability a lineage present at time $t$ leaves no sampled descendants and $\Psi(s,t)$ the probability it leaves exactly one. Two functional forms each for speciation and extinction:
- Linear: $\lambda(t)=\lambda_0+\alpha_\lambda t$ (needs $\alpha_\lambda > -\lambda_0/t_1$ to keep rates non-negative); $\mu(t)=\mu_0+\alpha_\mu t$ (needs $\alpha_\mu > -\mu_0/t_1$).
- Exponential: $\lambda(t)=\lambda_0 e^{\beta_\lambda t}$; $\mu(t)=\mu_0 e^{\beta_\mu t}$.
Worked salamander example (Plethodontidae, 440 species, $f=0.934$), models CRPB / CRBD / SP-L / SP-E / EX-L / EX-E; best AIC is the linear speciation-decline model SP-L (λ₀ = 0.035, α_λ = 0.0011, μ = 0; lnL = 513.0, AIC = −1019.9). "The model with the lowest AIC score has a linear decline in speciation rates."

**(12.4) Diversity-dependent (density-dependent) models.** Instead of time as a proxy, make rate depend on standing diversity $N_t$ directly, logistic form: $\lambda(t)=\lambda_0\!\left(1-\frac{N_t}{K}\right)$, with $\lambda_0$ the rate at zero diversity and $K$ a carrying capacity / equilibrium diversity. Because $N_t$ makes the process non-Markovian in time, fit via numerical solution of the differential equations (Etienne et al. 2012, 2016) rather than plugging into the Morlon formula. Salamander fit: λ₀ = 0.099, μ = 0, K = 979.9 (lnL = 537.3, AIC = −1068.7) — "a substantial improvement over any of the time-varying models considered above."

**(12.5) Protracted speciation.** Relaxes instantaneous speciation: speciation "takes time." Two-parameter structure — $\lambda_1$ = rate of forming incipient species, $\lambda_2$ = rate at which an incipient species becomes a "full" (good) species; incipient lineages that have not completed speciation are not counted. Salamander fit: λ₁ = 0.059, λ₂ = 0.44, μ = 0.0 (lnL = 513.8, AIC = −1021.6) — "fits about as well as the best of the time-varying models but not as well as the diversity dependent model." Status: "models of protracted speciation remain mostly in the realm of ecological neutral theory, and are just beginning to move into phylogenetics."

## 6. Key claims / findings
- Across-clade rate shifts are detectable by AICc/LRT model comparison; in the amphibian example the two-rate model beats constant-rate by ≈10.7 AICc units (2111.8 → 2101.1), meeting the ">10" threshold.
- For the salamander tree, model ranking by AIC: diversity-dependent (−1068.7) best, then linear speciation-decline SP-L (−1019.9), then protracted speciation (−1021.6), all beating constant-rate models (CRBD −991.6, CRPB −993.6).
- Diversity-dependence fit the salamander data substantially better than any purely time-varying model.
- Protracted speciation predicts "fewer very young species in our tree" — nodes nearest the tips are older than under pure-birth/birth-death — and can, on its own (no lineage interaction), mimic lineage-through-time patterns usually attributed to diversity-dependence.
- A down-bending lineage-through-time plot is *not* diagnostic of slowdown: constant-rate diversification with incomplete present-day sampling produces the same bend.
- Accelerating-diversification signatures can be mimicked by (masked) extinction.

## 7. Load-bearing statements (verbatim — CC-BY permits)
1. (Sec. 12.3/12.4 caveat) "In each case, there is at least one conceptually different model that predicts the exact same pattern." — the chapter's core identifiability warning, stated for both time-varying and diversity-dependent inference.
2. (Sec. 12.4) "if we are missing some living species … we would mistake a constant-rates birth death model for a signal of slowing diversification through time" and "a pattern of accelerating differentiation mimics the pattern caused by extinction." (verbatim, diversity-dependent section).
3. (Summary) "In some cases, very different models predict the same pattern in phylogenetic trees, warranting some caution until direct fossil data can be incorporated." (verbatim).
4. (Summary/caveats) "In many cases, adding fossil information will allow investigators to reliably distinguish between the stated alternatives, although methods that tie fossils and trees together are still relatively poorly developed." (verbatim).
5. (Sec. 12.2 method) "Available methods use stepwise AIC (MEDUSA, Alfaro et al. 2009)." (verbatim) — plus "reversible-jump Bayesian MCMC (Rabosky 2014, 2017)."

## 8. Stated scope, assumptions, limitations
- All models retain the ERM assumption: rates equal across lineages at any given instant (variation is across clades/time/diversity, never among coexisting lineages within a regime).
- Time-varying models require uniform (random) present-day sampling captured by a single fraction $f$; salamander example uses $f=0.934$.
- Linear rate forms need explicit non-negativity constraints ($\alpha_\lambda > -\lambda_0/t_1$, $\alpha_\mu > -\mu_0/t_1$) or they imply negative rates.
- Across-clade shift methods "fit a model where birth and death rates change at discrete times … along certain branches"; the chapter notes one might prefer a continuous shift process ("using, for example, a Poisson process") but "we still lack the mathematics to solve for $E(t)$" — an acknowledged mathematical gap.
- Diversity-dependent fitting relies on the true species count, and "The actual number of species in a clade is always quite uncertain."
- Inference quality is bounded by the candidate set: "The conclusion we make is only as good as the set of models being considered."
- Protracted speciation is presented as early-stage in phylogenetics, largely inherited from ecological neutral theory.

## 9. Failure modes / invalidity patterns
- **Non-identifiability / congruent models (chapter's central caution).** Warning sign: a good-fitting slowdown (or acceleration) model. Consequence: a mechanistically different model "predicts the exact same pattern," so choosing one over another is unjustified from the tree alone. Detector/remedy stated: caution + incorporate direct fossil data ("adding fossil information will allow investigators to reliably distinguish between the stated alternatives," though fossil-tree integration methods are "relatively poorly developed").
- **Sampling artifact mistaken for a rate shift/slowdown.** Warning sign: lineage-through-time plot bending down toward the present. Consequence: "we would mistake a constant-rates birth death model for a signal of slowing diversification through time." Remedy implied: model incomplete sampling explicitly (sampling fraction $f$) before inferring slowdown.
- **Masked extinction mimicking acceleration.** "a pattern of accelerating differentiation mimics the pattern caused by extinction" — a rate-acceleration inference may actually be an extinction signal.
- **Protracted speciation masquerading as diversity-dependence.** Protracted speciation "produce[s] lineage through time plots that can mimic the properties often attributed to diversity-dependence, even without any interactions among lineages" — so a diversity-dependence conclusion can be a false positive for ecological limits.
- **Uncertain species counts undermining diversity-dependent fits.** Because $N_t$ (and total clade richness) is uncertain, an inferred carrying capacity $K$ / slowdown "an alternative explanation … is that we are missing species in our tree, and we don't know how many there are."
- **Candidate-set bias.** Conclusions are only as good as the models compared; a missing true model invalidates the "best model" claim.
- **Empirical check the chapter uses.** Model *comparison* via AICc / likelihood-ratio tests with a stated decision threshold (ΔAICc > 10 ⇒ real difference in diversification rates); worked on both amphibian (across-clade) and salamander (time/diversity) data. The chapter does *not* present a simulation-under-known-truth adequacy test or a formal identifiability/sensitivity check beyond flagging the congruence problem qualitatively. [summarizer-inferred: absence of a simulation adequacy check is a silence, not an explicit statement.]

## 10. What the chapter does NOT address
- No state-dependent diversification (SSE family: BiSSE / QuaSSE / MuSSE / HiSSE) — not mentioned at all.
- No geographic/range-dependent diversification model, despite naming "among geographic regions" as a source of variation.
- No formal treatment of the full congruent-class theory (the model gives the qualitative "same pattern" warning but does not develop the general unidentifiability result or a congruence-class remedy).
- No worked simulation study, posterior-predictive / model-adequacy procedure, or quantitative identifiability diagnostic.
- No detailed exposition of BAMM internals — Rabosky's reversible-jump work is cited (incl. the "How to make any method 'fail'…" reference) but the BAMM method is not taught here.
- No fossilized-birth-death / combined fossil-tree method (named as the eventual remedy but "poorly developed").

## 11. Open questions / ambiguities left unresolved
- How to distinguish congruent models (slowdown vs. incomplete sampling; diversity-dependence vs. protracted speciation vs. time-decline) from extant trees alone — left open, pointing to fossils.
- The mathematics for a continuous (e.g. Poisson-process) distribution of rate shifts across branches — explicitly unsolved ("we still lack the mathematics to solve for $E(t)$").
- How much uncertainty in true clade richness invalidates diversity-dependent $K$ estimates — flagged, not quantified.
- Integration of fossils with molecular trees — named as the path forward but "relatively poorly developed."
- Source numbering error: two "Section 12.5" headings (Protracted speciation and Summary); intended numbering of the Summary is ambiguous (likely 12.6).
