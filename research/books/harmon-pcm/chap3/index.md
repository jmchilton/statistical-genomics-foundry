---
title: "Introduction to Brownian Motion"
source: harmon-pcm
source_chapter: 3
source_url: https://lukejharmon.github.io/pcm/chapter3_bmintro/
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Harmon LJ. Phylogenetic Comparative Methods: Learning from Trees. 2019 (book text v1.0.0). Chapter 3: Introduction to Brownian Motion. Licensed CC-BY 4.0. https://lukejharmon.github.io/pcm/"
derived: license-aware-summary
access_date: "2026-07-03"
---

# Harmon PCM Chapter 3 — Introduction to Brownian Motion (summary)
> Faithful summary generated in a clean context, license-aware (CC-BY 4.0 → short verbatim load-bearing quotes marked). Source-only; project framing lives elsewhere.

## 1. Citation
Harmon, Luke J. 2019. *Phylogenetic Comparative Methods: Learning from Trees* — Chapter 3, "Introduction to Brownian Motion." Book text v1.0.0. License CC-BY 4.0. URL: https://lukejharmon.github.io/pcm/chapter3_bmintro/. Accessed 2026-07-03. (Version string "v1.0.0" per task provenance; not independently re-verified on page.)

## 2. Access note
Full chapter readable (sections 3.1–3.7) via web fetch, including equations, section structure, worked examples, and summary. All equation forms, numbers, and key sentences below were extracted from the rendered chapter; the five load-bearing quotes in §7 were re-fetched a second time to confirm verbatim wording. No paywall boundary. Figures referenced by caption/content only (not viewed as images).

## 3. Thesis (1 sentence)
Brownian motion is a simple, tractable stochastic model of continuous-trait evolution whose value at any time is normally distributed with mean equal to the ancestral state and variance growing linearly with time × rate ($\sigma^2 t$) — and it arises from several distinct biological processes (drift and certain selection regimes), so fitting BM says nothing about whether selection acted.

## 4. Problem & context
Motivating example: squamates (lizards/snakes) diversified roughly 150–210 million years ago with extreme variation in size, diet, and limb presence/absence — this motivates a model of how continuous traits change over evolutionary time. BM is introduced as the foundational such model. Statistically, BM originated to describe particles suspended in a fluid (stadium-ball analogy: many small random forces from all directions sum to move the object). The core idea: motion is the sum of a large number of very small, random forces.

## 5. Method / approach
**The model.** Brownian motion is a "random walk": the trait value changes randomly in both direction and distance over any interval. Let $\bar z(t)$ be the character value at time $t$.

**Two parameters.** (a) the ancestral/starting state $\bar z(0)$; (b) the evolutionary rate parameter $\sigma^2$, which "determines how fast traits will randomly walk through time."

**Three core properties** (§3.2):
1. $E[\bar z(t)] = \bar z(0)$ — expected value at any time equals the starting value; BM has no trends and wanders equally in both directions.
2. Each successive interval of the walk is independent — increments over non-overlapping intervals are independent. Caveat: only the *changes* are independent; the *value* at $t+\Delta t$ is not independent of the value at $t$.
3. $\bar z(t) \sim N(\bar z(0), \sigma^2 t)$ — the value is drawn from a normal distribution with mean $\bar z(0)$ and variance $\sigma^2 t$.

**Variance scales with time.** Changes over any interval are drawn from a normal with mean 0 and variance = $\sigma^2 t$ (product of rate and elapsed time). Larger $\sigma^2$ → wider spread of outcomes.

**Processes that produce BM** (§3.3):
- *Genetic drift* (§3.3a): a trait influenced by many genes of small effect, not affecting fitness, with random small-effect mutations (infinite-alleles model, mutational variance $\sigma_m^2$).
- *Selection* (§3.3b): randomly varying directional selection; varying stabilizing selection whose optimum itself moves by BM; and constant directional selection (which produces a trend but with variance identical to pure drift).

**BM on a phylogeny** (§3.4): trait values at tips are multivariate normal; covariance between two taxa = rate × shared (ancestral) branch length; the phylogenetic variance-covariance matrix $\mathbf C$ encodes this.

**Multivariate BM** (§3.5): combines trait-rate matrix $\mathbf R$ with phylogenetic matrix $\mathbf C$ via Kronecker product $\mathbf V = \mathbf R \otimes \mathbf C$.

**Simulation** (§3.6): branch-by-branch draws vs. a single multivariate-normal draw — exactly equivalent.

## 6. Key claims / findings
- **Variance-time law:** variance of trait change over interval $t$ = $\sigma^2 t$; distribution of $\bar z(t)$ is $N(\bar z(0), \sigma^2 t)$. Holds under constant rate, no bounds, independent increments.
- **No trend under pure BM:** $E[\bar z(t)] = \bar z(0)$; equal wandering in both directions.
- **Drift → BM.** Under the drift model, expected phenotype stays at $\bar z(0)$ (Eq 3.1). Equilibrium additive genetic variance $\lim_{t\to\infty} E[\sigma_a^2(t)] = 2 N_e \sigma_m^2$ (Eq 3.4). Between-population variance $\sigma_B^2(t) = t\,\sigma_a^2 / N_e$ (Eq 3.5), which at equilibrium becomes $\sigma_B^2(t) = 2 t \sigma_m^2$ (Eq 3.6) — **independent of both starting state and effective population size.** In heritability terms, $\sigma_B^2(t) = h^2 \sigma_w^2 t / N_e$ (Eq 3.9), giving the BM rate $\sigma^2 = h^2 \sigma_w^2 / N_e$.
- **Randomly varying directional selection → BM** with rate $\sigma_B^2 = (h^2\sigma_w^2/N_e + \sigma_s^2)\,t$ (Eq 3.10); when selection dominates drift, $\sigma_B^2 \approx \sigma_s^2$ (Eq 3.11).
- **Varying stabilizing selection with a BM-moving optimum → BM** with $\sigma_B^2 \approx \sigma_E^2$ (Eq 3.12), given at least a little stabilizing selection (on the order of $1/t_{ij}$, $t_{ij}$ = generations separating population pairs). Population under strong selection each generation, yet long-term change is Brownian.
- **Constant directional selection produces a trend:** $E[\bar z(t)] = t\,(h^2 s)$ (Eq 3.15), per-generation change $E[\bar z(t+1)] = \bar z(t) + h^2 s$ (Eq 3.13). Its variance $\sigma_B^2(t) = h^2\sigma_w^2 t/N_e$ (Eq 3.16) is **exactly identical** to the pure-drift variance (Eq 3.9). Consequence: from data on living species only, pure-drift and linear-selection models are statistically indistinguishable; "we can never find evidence for trends in evolution studying only living species" (citing Slater et al. 2012).
- **Phylogenetic covariance = shared history × rate:** for two taxa splitting after a shared branch $t_1$, $\mathrm{cov}(\bar x_a, \bar x_b) = \sigma^2 t_1$ (Eq 3.21). VCV matrix $= \sigma^2 \mathbf C$ (Eq 3.22), where $\mathbf C$ is $n\times n$: diagonal = total distance of each taxon from the root, off-diagonal = total branch length shared by each pair. Under BM, shared path lengths are proportional to phylogenetic covariances of trait values.
- **Multivariate:** $\mathbf V = \mathbf R \otimes \mathbf C$ (Eq 3.23); $\mathbf R$ diagonal = per-trait net rates $\sigma_i^2$, off-diagonal = evolutionary covariances $\sigma_{ij}$.
- **Two simulation methods are exactly equivalent** (branch-by-branch normal draws vs. one draw from the full multivariate normal).

## 7. Load-bearing statements (verbatim — CC-BY permits)
1. (§3.1, definition) "Brownian motion is an example of a "random walk" model because the trait value changes randomly, in both direction and distance, over any time interval."
2. (§3.2, properties intro) "If we let $\bar z(t)$ be the value of our character at time t, then we can derive three main properties of Brownian motion." followed by the list: "1. $E[\bar z(t)] = \bar z(0)$ 2. Each successive interval of the "walk" is independent 3. $\bar z(t) \sim N(\bar z(0),\sigma^2 t)$".
3. (§3.3b, caution) "an observation that a trait is evolving as expected under Brownian motion is not equivalent to saying that that trait is not under selection."
4. (§3.7, summary) "In other words, testing for a Brownian motion model with your data tells you nothing about whether or not the trait is under selection."
5. (§3.7, limitation) "The main restriction might be the unbounded nature of Brownian motion – species are expected to become more and more different through time, without any limit, which must be unrealistic over very long time scales."

## 8. Stated scope, assumptions, limitations
- **BM's structural assumptions** (checkable): constant rate $\sigma^2$; no trend (mean stays at $\bar z(0)$); independent increments; normally distributed changes with variance $\sigma^2 t$; unbounded (no ceiling/floor on trait values).
- **Drift-model assumptions** (§3.3a): many genes of small effect; trait does not affect fitness; mutations random with small effects.
- **Chapter's own admission of unrealism** (§3.3b→3.4): hard to imagine a trait influenced only by random small-effect mutations, or selection acting truly randomly generation-to-generation for millions of years — and "you would be right." BM is used anyway for its statistical benefits, and some (but not all) methods are robust to modest violations.
- **Unboundedness** named as the main restriction (deferred to later chapters).
- **Scope of inference limit:** extant-only data cannot distinguish drift from constant directional selection.

## 9. Failure modes / invalidity patterns
- **Inferring "no selection" from a good BM fit.** Warning sign: concluding a trait is neutral/unselected because BM fits. Consequence: wrong biological inference — BM also arises under randomly varying directional selection and under stabilizing selection tracking a wandering optimum. Remedy (stated): recognize that a BM fit "tells you nothing about whether or not the trait is under selection."
- **Claiming detected evolutionary trends from living species alone.** Warning sign: asserting a directional trend using only extant taxa. Consequence: unsupported — pure drift (Eq 3.9) and constant directional selection (Eq 3.16) yield identical variance and are statistically indistinguishable without fossils. Remedy: incorporate fossil/paleo data (Slater et al. 2012 cited).
- **Applying unbounded BM over very long timescales.** Warning sign: BM predicts ever-increasing divergence without limit. Consequence: unrealistic when biological bounds exist. Remedy: bounded/alternative models (deferred to later chapters).
- **Misreading $\sigma^2$ as a purely biological quantity.** The rate $\sigma^2$ decomposes differently under different generating processes (e.g. drift: $\sigma^2 = h^2\sigma_w^2/N_e$; selection-dominated: $\sigma^2 \approx \sigma_s^2$ or $\approx \sigma_E^2$). The same observed $\sigma^2$ can reflect drift parameters or selection variance — so a single biological interpretation of $\sigma^2$ is not licensed by the fit alone. [summarizer-inferred that this constitutes a "failure mode"; the chapter states the multiple decompositions but does not label misinterpretation as an error.]
- **Empirical checks the chapter provides** (via simulation under known truth):
  - Fig 3.2: 100,000 simulations with $\bar z(0)=0$, $t=100$, $\sigma^2=1$ → observed variance $\approx \sigma^2 t = 100$; a Q-Q plot confirms normality. Checks the variance-time law and normality; pass = variance matches $\sigma^2 t$ and points fall on the Q-Q line.
  - Fig 3.1: 100 replicate walks at $t=10, 50, 100$ ($\sigma^2=1$) → ending-value histograms are normal and widen with time. Checks that spread grows with time.
  - Fig 3.3: 100 replicates at $t=100$ with $\sigma^2 = 1, 10, 25$ → larger $\sigma^2$ gives wider spread. Checks rate→spread relationship.
  - §3.6: branch-by-branch simulation on the Fig 3.4b tree ($\sigma^2=1$) drew $x_1=-1.6$, $x_2=0.1$, $x_3=-0.3$, giving tips $x_a = 0 - 1.6 + 0.1 = -1.5$ and $x_b = 0 - 1.6 - 0.3 = -1.9$; asserted exactly equivalent to a single multivariate-normal draw. Checks equivalence of the two simulation methods.

## 10. What the chapter does NOT address
- Statistical *estimation/inference* of $\sigma^2$ and ancestral states from real data (only the model and simulation are covered here).
- Model *fitting or comparison/testing procedures* (deferred).
- Bounded models, Ornstein-Uhlenbeck/other alternatives, and methods for detecting trends — explicitly deferred to "later chapters."
- Robustness quantification: states that some methods are robust to modest violations "but not all," without specifying which or how much.
- Discrete traits, non-normal trait distributions, and details of measurement error.

## 11. Open questions / ambiguities left unresolved
- How to actually handle the unbounded-BM problem — flagged and deferred ("We will deal with this issue in later chapters").
- Which comparative methods are robust to modest BM violations, and to what degree — stated qualitatively only.
- Given that drift and multiple selection regimes are statistically indistinguishable under BM, what additional data/models break the degeneracy (fossils cited but methods not developed here).
- How to interpret a fitted $\sigma^2$ biologically when several distinct processes map to the same rate.
