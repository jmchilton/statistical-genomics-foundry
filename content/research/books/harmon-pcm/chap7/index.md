---
title: "Models of discrete character evolution"
source: harmon-pcm
source_chapter: 7
source_url: https://lukejharmon.github.io/pcm/chapter7_introdiscrete/
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Harmon LJ. Phylogenetic Comparative Methods: Learning from Trees. 2019 (book text v1.0.0). Chapter 7: Models of discrete character evolution. Licensed CC-BY 4.0. https://lukejharmon.github.io/pcm/"
derived: license-aware-summary
access_date: "2026-07-03"
---

# Harmon PCM Chapter 7 — Models of discrete character evolution (summary)
> Faithful summary generated in a clean context, license-aware (CC-BY 4.0 → short verbatim load-bearing quotes marked). Source-only; project framing lives elsewhere.

## 1. Citation
Harmon, Luke J. 2019. *Phylogenetic Comparative Methods: Learning from Trees*, Chapter 7: "Models of discrete character evolution." Book text v1.0.0. License CC-BY 4.0. https://lukejharmon.github.io/pcm/chapter7_introdiscrete/ (PDF at `/pcm/pdf/chapter7_introdiscrete.pdf`). Accessed 2026-07-03.

## 2. Access note
Read via automated web-to-markdown conversion of the HTML chapter page, cross-checked with a second targeted pass. Prose and the numeric/parameter facts are well-attested across both passes. **Boundary:** equations were recovered through a converter, so equation *numbering* (e.g. "Eq. 7.5/7.7/7.8/7.16") and the exact typographic form of matrices should be re-checked against the source PDF before being treated as canonical; the mathematical *content* (matrix entries, probability formulas) is consistent across passes and standard for the Mk model. Verbatim quotes below are transcribed from the converted text and marked; treat wording as high-confidence but re-verify against the PDF if a quote is load-bearing for a decision.

## 3. Thesis (1 sentence)
Discrete characters (like limblessness in squamates) require a categorical-state modeling approach — the continuous-time Markov "Mk" model and its extensions — distinct from the continuous-trait (Brownian) models of earlier chapters, and this chapter sets up that machinery (definition + simulation) before fitting is taken up next.

## 4. Problem & context
- Motivating example (§7.1): squamate reptiles (lizards + snakes). Limbs lost repeatedly. The snake-ancestral lineage "became limbless about 170 million years ago"; some estimates put limb loss at **≥26 times in the past 240 million years** (Brandley et al. 2008).
- §7.2 opens by contrasting with prior chapters: "So far, we have only dealt with continuously varying characters" — establishing discrete traits as the new object, not a parallel modeling derivation.
- A discrete trait is one that occupies one of a set of distinct character states; each species is in one of $k$ states (limblessness: $k=2$, e.g. 0 = legless, 1 = limbed).
- Distinguishes **ordered** (transitions only between adjacent states) vs **unordered** (any state → any other) characters; chapter focuses on unordered.
- Analogy to molecular evolution models (Jukes-Cantor JC, GTR), with two differences: phenotypic characters may have any number of states, and phenotypic characters are typically analyzed independently rather than concatenated like DNA sites.

## 5. Method / approach
The chapter introduces the **continuous-time Markov model** of discrete-state evolution.

- **Mk model** (§7.3): introduced by Pagel (1994), named/formalized by Lewis (2001); presented as a direct analogue of the Jukes-Cantor model. Two core commitments: the **Markov property** (next state depends only on current state) and **equal transition rates** among all state pairs.
- **Rate matrix $Q$**: $k \times k$ matrix of instantaneous transition rates $q_{ij}$ (off-diagonal, $i\neq j$). Each **row sums to zero**; diagonal entries are $-d_i$ with $d_i = \sum_{j\neq i} q_{ij}$. A rate $q_{ij}$ is an *instantaneous* rate — the limit of the change rate over vanishingly short intervals.
  - Two-state Mk ($q_{12}=q_{21}=q$): $Q=\begin{bmatrix}-q & q\\ q & -q\end{bmatrix}$
  - Three-state Mk: $Q=\begin{bmatrix}-2q & q & q\\ q & -2q & q\\ q & q & -2q\end{bmatrix}$
  - General $k$-state Mk (unit-rate form): diagonal $=1-k$, all off-diagonals $=1$.
- **Transition probabilities**: $P(t)=e^{Qt}$ — the **matrix exponential** (explicitly not element-wise; "calculations are not trivial," ref. Yang 2006). $p_{ij}(t)$ = probability of ending in state $j$ after time $t$ given start in state $i$.
  - General Mk closed form: $p_{ii}(t)=\tfrac{1}{k}+\tfrac{k-1}{k}e^{-kqt}$; $p_{ij}(t)=\tfrac{1}{k}-\tfrac{1}{k}e^{-kqt}$ ($i\neq j$).
  - Two-state: $p_{ii}(t)=\dfrac{1+e^{-2qt}}{2}$, $p_{ij}(t)=\dfrac{1-e^{-2qt}}{2}$.
- **Stationary distribution** $\pi$: as $t\to\infty$, every $p_{ij}(t)\to 1/k$, so $\pi=[\,1/k,\dots,1/k\,]$ (for $k=2$, $[1/2,\,1/2]$).
- **Extended Mk model** (§7.4) relaxes equal rates:
  - **Symmetric (SYM)**: $q_{ij}=q_{ji}$ but pair-specific; free rate parameters $=\tfrac{k(k-1)}{2}$. Allowing unequal stationary frequencies adds $n-1$ parameters (frequencies sum to 1), total $\tfrac{k(k-1)}{2}+(n-1)$. $Q$ built as (rate matrix)·(diagonal $\pi$ matrix), diagonals then set so rows sum to zero. Worked two-state example (forward $=2\times$backward, $\pi_1=0.75$): $Q=\begin{bmatrix}-0.25 & 0.25\\ 1.5 & -1.5\end{bmatrix}$.
  - **All-rates-different (ARD)**: every transition type its own rate; free rate params $=k(k-1)$, total $k(k-1)+(n-1)$. (SYM/ARD naming per Paradis et al. 2004, APE.)
- **Simulating on a tree** (§7.5): draw root state (from stationary dist. or uniform over $k$); for each branch compute $P(t)$ from its length and $Q$; sample the descendant state using the $P(t)$ row for the ancestral state; at speciation daughters inherit the parent state then evolve independently; record tip states. Multi-state draws use a cumulative-sum vector vs a Uniform(0,1) deviate.
- **Relation to earlier continuous-trait chapters**: framed by *contrast* — prior chapters handled continuous characters; the chapter does **not** derive the Mk model as a formal parallel of Brownian motion. Both use rate parameters, but the connection is thematic, not an explicit structural mapping in the text.

## 6. Key claims / findings
- $Q$ rows sum to zero; diagonal $-d_i=-\sum_{j\neq i}q_{ij}$. (Definitional property of a valid rate matrix.)
- $P(t)=e^{Qt}$ is the matrix exponential; holds for any $t\geq0$ given constant $Q$.
- Mk stationary distribution is uniform: $\pi_i=1/k$ for all $i$ (consequence of equal rates); as $t\to\infty$ start-state information is lost.
- Parameter counts: ER Mk = 1 rate; SYM = $k(k-1)/2$ rates ($+\,n-1$ freqs if unequal); ARD = $k(k-1)$ rates ($+\,n-1$).
- Two-state simulation instance ($q=0.5$, $t=3$): $P(3)=\begin{bmatrix}0.525 & 0.475\\ 0.475 & 0.525\end{bmatrix}$; from state 0, $P(\text{end }0)=0.525$, $P(\text{end }1)=0.475$; assign 0 if $u<0.525$ else 1.
- Squamate example: ≥26 independent limb losses in 240 My; snake-ancestral limblessness ~170 mya (Brandley et al. 2008).

## 7. Load-bearing statements (verbatim — CC-BY permits)
1. Markov property (§7.3): "The probability of changing from one state to another depends only on the current state, and not on what has come before." (verbatim, §7.3)
2. Equal-rates assumption (§7.3): the basic Mk model "assumes that every state is equally likely to change to any other state." (verbatim, §7.3)
3. Extended-model motivation / caveat (§7.4): "The Mk model assumes that transitions among all possible character states occur at the same rate. However, that may not be a valid assumption." (verbatim, §7.4)
4. Squamate limb loss (§7.1): "with some estimates that squamates have lost their limbs at least 26 times in the past 240 million years (Brandley et al. 2008)." (verbatim, §7.1)
5. Deferral to next chapter (§7.6): "In the next chapter, I will show how to fit these models to data and use them to test evolutionary hypotheses." (verbatim, §7.6)

*(Quotes transcribed from converted text — see Access note; wording high-confidence, re-verify against PDF if used as a hard citation.)*

## 8. Stated scope, assumptions, limitations
- **Markov property**: transition probability depends only on current state (memoryless). (§7.3, stated assumption)
- **Equal transition rates** in the *basic* Mk model: all state-to-state transitions equally likely; §7.4 explicitly flags this "may not be a valid assumption" and introduces SYM/ARD to relax it.
- **Discrete, known, finite state space** of $k$ states; each species assigned exactly one state.
- **Constant $Q$**: $P(t)=e^{Qt}$ presumes the rate matrix is fixed (the same process applies along branches / across the tree); the chapter does not introduce rate variation across the tree here.
- Chapter scope is deliberately **setup** — defining the process and simulating it; parameter estimation and hypothesis testing are out of scope (deferred to next chapter).

## 9. Failure modes / invalidity patterns
- **Equal-rates misspecification (ER when SYM/ARD is true):** warning sign — asymmetric or state-pair-specific transition tendencies; consequence — biased process description; remedy — the extended Mk (SYM/ARD) models, explicitly motivated in §7.4 ("that may not be a valid assumption"). *(Stated as motivation for extensions.)*
- **Unobserved changes / saturation [summarizer-inferred from the math, not framed as a "failure" in-text]:** because $p_{ij}(t)\to 1/k$ as $t\to\infty$ and $p_{ii}$ includes a decaying $e^{-kqt}$ term, tip states alone under-count actual transitions over long times; the model's probability structure accounts for this, but the chapter does not present a diagnostic for saturation here.
- **Violation of the Markov / memoryless assumption [summarizer-inferred]:** if change depends on history beyond the current state, the $P(t)=e^{Qt}$ machinery no longer applies; the chapter states the assumption but gives no in-chapter detector.
- **Empirical check provided — forward simulation under known truth (§7.5):** the chapter gives a concrete generative procedure (draw root, propagate $P(t)$ per branch, sample tips), i.e. simulate data under a *known* $Q$. This is the reference/ground-truth mechanism the book supplies; it is presented for generating data, and (per §7.6) the *fitting/recovery* comparison against such known truth is deferred to the next chapter. Pass/fail criteria for estimation are not given here.

## 10. What the chapter does NOT address
- **Model fitting, likelihood estimation, and hypothesis testing** — explicitly deferred to the next chapter (§7.6).
- **Model comparison / selection** among ER, SYM, ARD (parameter counts are given, but no selection procedure).
- **Rate variation across the tree/time**, hidden states, or covarion-type processes.
- A **formal structural mapping** between the discrete Mk model and the earlier Brownian-motion continuous-trait models (contrast only).
- Diagnostics for **saturation** or for testing the Markov / rate-homogeneity assumptions.
- Ancestral-state reconstruction as a fitted inference.

## 11. Open questions / ambiguities left unresolved
- Equation numbers and exact matrix typography need PDF confirmation (see Access note).
- The chapter states equal-rates "may not be valid" but does not, within Ch. 7, give criteria for *choosing* ER vs SYM vs ARD — left to the fitting chapter.
- Root-state handling in simulation offers two options (stationary distribution vs uniform over $k$) without stating a preferred default.
- Whether unordered vs ordered character structure interacts with the SYM/ARD parameterizations is not spelled out here.
