---
type: book
title: "Introduction to birth-death models"
source: harmon-pcm
source_chapter: 10
source_url: https://lukejharmon.github.io/pcm/chapter10_birthdeath/
tags:
  - domain/phylogenetics
  - domain/diversification-rates
---

# Harmon PCM Chapter 10 — Introduction to birth-death models (summary)
> Faithful summary generated in a clean context, license-aware (CC-BY 4.0 → short verbatim load-bearing quotes marked). Source-only; project framing lives elsewhere.

## 1. Citation
Harmon, Luke J. 2019. "Chapter 10: Introduction to birth-death models." In *Phylogenetic Comparative Methods: Learning from Trees*. Book text v1.0.0 (version string as stated on the book site). License: CC-BY 4.0. Chapter URL: https://lukejharmon.github.io/pcm/chapter10_birthdeath/ ; book: https://lukejharmon.github.io/pcm/ . Access date: 2026-07-03.

## 2. Access note
Equation forms and definitions **re-verified against the raw source HTML** on 2026-07-03. Recovered exactly: the lineage-count distribution $p_n(t)$ and its $\beta$ term (§5), and Colless' index formula (§6). Confirmed: the chapter does **not** use the name "Yule" for the pure-birth model (that name appears in Chapter 11). Equation *index numbers* are as rendered and remain approximate, but the forms are source-confirmed.

## 3. Thesis (1 sentence)
Diversity differences among clades can be modeled with a simple stochastic birth-death process governed by per-lineage speciation and extinction rates, whose signatures we read off phylogenetic trees via tree balance and lineage-through-time plots.

## 4. Problem & context
The chapter opens (10.1, "Plant diversity imbalance") from an empirical imbalance: some clades are enormously more diverse than others of comparable age. Reported counts: "more than 260,000 species of angiosperms" versus gymnosperms — "as old as angiosperms" — with "only around 1000 species"; squamates (snakes and lizards) are cited at "fewer than 8000 species." The motivating question is why sister clades of similar age differ so dramatically in richness, which births the need for a probabilistic model of how species accumulate and are lost over time.

## 5. Method / approach
The birth-death model (10.2) treats each species as having a constant per-lineage probability of *speciating* (birth) or *going extinct* (death):
- Speciation (birth) rate $\lambda$; extinction (death) rate $\mu$; both taken as constant for now (rate variation relaxed later in the book).
- Net diversification rate $r = \lambda - \mu$; relative extinction rate $\epsilon = \mu/\lambda$.
- Births and deaths are modeled as Poisson processes, so waiting times to the next event are exponentially distributed; each speciation yields exactly two descendants (no hard polytomies).
- **Pure-birth ("pure-birth model")** is the special case with no extinction. (The chapter uses "pure-birth model"; whether it also names it the "Yule" model was **not confirmed** in the proxy read — flag.)
- Deterministic expected clade growth: $N(t) = n_0 e^{r t}$ (reported as Eq. 10.5) — the number of species grows exponentially through time as long as $\lambda > \mu$ (i.e. $r>0$).
- The full stochastic process yields a probability distribution for the number of lineages. Starting from $n_0$ lineages the chapter gives the general form $p_n(t) = \sum_{j=1}^{\min(n_0,n)} \binom{n_0}{j}\binom{n-1}{j-1}\,\alpha^{n_0-j}\beta^{n-j}\,[(1-\alpha)(1-\beta)]^{j}$; from a single lineage ($n_0=1$) this collapses to $p_n(t) = (1-\alpha)(1-\beta)\beta^{\,n-1}$. The $\beta$ term is $\beta = \dfrac{e^{rt}-1}{e^{rt}-\epsilon}$ (source-verified); $\alpha$ is an analogous function of $r,t,\epsilon$ (exact form not captured here).
- Applied to trees (10.3): a real phylogeny of living species is a **censored / "reconstructed"** view — only lineages surviving to the present are observed, and only if sampling and reconstruction are perfect.
- Trees are described through **topology / shape / balance** (10.5) and through **lineage-through-time (LTT) plots** (10.6): time on the x-axis from root to present, reconstructed lineage count on a (usually log-scaled) y-axis.

## 6. Key claims / findings
- Under constant rates the expected lineage count grows exponentially: $N(t)=n_0 e^{rt}$; grows when $r>0$, flat when $r=0$, shrinks when $r<0$.
- On a semi-log LTT plot, a **pure-birth** process follows, on average, a **straight line** (exponential growth ⇒ linear in log scale).
- **Extinction leaves a signal** in LTT plots — the **"pull of the present"**: an upturn in the LTT slope near the present day (attributed to Figure 10.9B). Rationale: extinction probability depends on how long a lineage has existed, so older lineages are far more likely to already have been hit by extinction than young ones.
- Incomplete / partial sampling can also strongly distort LTT shape (10.6).
- Tree balance: for a node with $N_{total}$ descendants splitting into sub-clades, $p(N_a \mid N_{total}) = 1/(N_{total}-1)$ (reported Eq. 10.17) under the equal-probability model. Colless' index (Colless 1982) sums, over all nodes, the imbalance between the two descendant sides, standardized by the maximum possible (source-verified, Eq. 10.18): $I_C = \dfrac{\sum_{\text{all nodes}}(N_L - N_R)}{(N-1)(N-2)/2}$, where $N_L,N_R$ are tip counts on each side of a node. (Ch. 11 standardizes this further to $I_c'$ by subtracting the ERM-expected mean and dividing by the SD.)
- **Not confirmed in this read:** any *quantitative* law tying the magnitude of $\epsilon$ to pull-of-the-present strength; the chapter states extinction produces the upturn but the proxy surfaced no closed-form $\epsilon$→slope relationship (flag).

## 7. Load-bearing statements (verbatim — CC-BY permits)
1. λ/μ definition (Section 10.2, verbatim): "We denote the per-lineage birth rate as λ and the per-lineage death rate as μ."
2. Rate constants (Section 10.2, verbatim): "For now we consider these rates to be constant."
3. Reconstructed/extant-only tree (Section 10.3, verbatim): "if the true phylogenetic tree were the one plotted in 10.5A, we would only have a chance to observe the phylogenetic tree in figure 10.5B – and even then only if we sampled all of the species and reconstructed the tree with perfect accuracy!"
4. Pull of the present (Section 10.6, verbatim): "extinction should leave a clear signal in LTT plots because the probability of a lineage going extinct depends on how long it has been around; old lineages are much more likely to have been hit by extinction than relatively young lineages. We see this reflected in LTT plots as the \"pull of the present\" – an upturn in the slope of the LTT plot near the present day (Figure 10.9B)."
5. Chapter summary (Section 10.7, verbatim): "Birth-death models predict patterns of species diversity over time intervals, and can also be used to model the growth of phylogenetic trees. We can visualize these patterns by measuring tree balance and creating lineage-through-time (LTT) plots."

## 8. Stated scope, assumptions, limitations
Birth-death assumptions as laid out (10.2): only two event types (birth +1 lineage, death −1 lineage); each speciation produces exactly two descendants (no hard polytomies); births and deaths are Poisson processes with exponentially distributed waiting times; per-lineage rates $\lambda,\mu$ are **constant** across lineages and time (explicitly a for-now simplification, relaxed later). Applied to data (10.3): the observed tree is a censored reconstruction of extant survivors, valid only under **complete sampling** and **perfectly accurate reconstruction**. Scope here is introductory — establishing the model and its tree signatures, not fitting or testing.

## 9. Failure modes / invalidity patterns
- **Censoring by extinction (extant-only trees).** Warning sign: reasoning about diversification from a tree of living species only. Consequence: the observed tree is a "censored view" missing all extinct lineages; the complete process is not directly seen. Detector/remedy stated: read the LTT — extinction should show as the pull-of-the-present upturn near the present (Fig. 10.9B); the reconstructed tree (Fig. 10.5B) is all one can hope to observe, and only under perfect sampling/reconstruction.
- **Incomplete sampling.** Warning sign: not all extant species included. Consequence: "can also have a huge impact on the shape of LTT plots" — distorted LTT that can mimic/obscure rate signals. Remedy: modeled as a "partially sampled birth-death tree" (10.3); the chapter flags the sensitivity rather than giving a correction formula here.
- **Reconstruction error.** Warning sign: inferred tree ≠ true tree. Consequence: the extant-only tree is only trustworthy "if we... reconstructed the tree with perfect accuracy."
- **Empirical check present:** simulating birth-death trees under known parameters (10.4) and inspecting LTT shape (10.6) is the chapter's diagnostic — straight-line semi-log LTT ≈ pure-birth (pass for constant no-extinction), upturn near present ⇒ extinction signal. Interpreting an upturn requires ruling out incomplete sampling, which produces similar distortion. [summarizer-inferred: that sampling and extinction can be *confounded* in the upturn is implied by the two cautions appearing together, not stated as an explicit confound.]

## 10. What the chapter does NOT address
As an introduction, it does not cover statistical **fitting** or **hypothesis testing** of birth-death models to real trees (deferred to later chapters), nor rate-variable / diversity-dependent / trait-dependent models (rates held constant here, relaxation "later in the book"). No quantitative $\epsilon$→pull relationship, no explicit estimator for $\mu$ from extant trees, and no named-author critique of extinction estimation (no Nee/Rabosky reference surfaced) appear in this chapter.

## 11. Open questions / ambiguities left unresolved
- $\beta = (e^{rt}-1)/(e^{rt}-\epsilon)$ is now source-verified; the matching $\alpha$ expression was not captured (an analogous function of $r,t,\epsilon$).
- Equation/figure index numbers are as rendered (labels approximate); the forms are source-confirmed.
- How the chapter operationally distinguishes an extinction-driven pull-of-the-present from an incomplete-sampling upturn (both cautioned, disambiguation not given as a closed-form test — it points forward to Ch. 11).
