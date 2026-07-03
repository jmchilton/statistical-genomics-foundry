---
title: "Fitting birth-death models"
source: harmon-pcm
source_chapter: 11
source_url: https://lukejharmon.github.io/pcm/chapter11_fitbd/
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Harmon LJ. Phylogenetic Comparative Methods: Learning from Trees. 2019 (book text v1.0.0). Chapter 11: Fitting birth-death models. Licensed CC-BY 4.0. https://lukejharmon.github.io/pcm/"
derived: license-aware-summary
access_date: "2026-07-03"
---

# Harmon PCM Chapter 11 — Fitting birth-death models (summary)
> Faithful summary generated in a clean context, license-aware (CC-BY 4.0 → short verbatim load-bearing quotes marked). Source-only; project framing lives elsewhere.

## 1. Citation
Harmon, Luke J. 2019. *Phylogenetic Comparative Methods: Learning from Trees.* Chapter 11, "Fitting birth-death models." Book text v1.0.0 (version string confirmed on the book site). Licensed CC-BY 4.0. URL: https://lukejharmon.github.io/pcm/chapter11_fitbd/ . Accessed 2026-07-03.

## 2. Access note
Numbers, equations, and section structure **re-verified against the raw source HTML** on 2026-07-03. Confirmed exactly: the Páramo/Lupinus worked numbers (§6), the Slowinsky–Guyer sister-clade formula (P = 0.875), the Colless $I_c'$ standardization, and the pure-birth ML estimator being the "**Kendal-Moran**" estimator (source spelling; Eq. 11.21, Nee 2006 — *not* a confabulation). Confirmed **absent** from this chapter: the Pybus–Harvey $\gamma$ statistic, its $-1.645$ cutoff, and the MCCR test (the only $\gamma$ present is the Euler–Mascheroni constant in the Colless $I_c'$ formula). The age–diversity net-diversification estimators are method-of-moments (Rohatgi 1976, following Magallón & Sanderson 2001); Eqs 11.3/11.4 reduce to 11.1/11.2 at $\epsilon=0$.

## 3. Thesis (1 sentence)
Speciation and extinction rates can be estimated from phylogenetic trees — via clade age-and-diversity relationships, tree-balance statistics, and full likelihood of branching times under a birth-death process — using either maximum likelihood or Bayesian MCMC.

## 4. Problem & context
Motivating case: the Páramo ecosystem of the high Andes, framed as possibly having the highest speciation rates on the planet, using Madriñán et al. (2013) data on **13 plant lineages** (crown ages + diversities). The chapter asks how to turn such data — from clade-level counts up to full reconstructed trees — into rate estimates, and how to test whether rates are constant vs. changing.

Section structure (as extracted):
- 11.1 Hotspots of diversity
- 11.2 Clade age and diversity
- 11.3 Tree Balance — 11.3a Sister clades / balance of individual nodes; 11.3b Balance of whole trees
- 11.4 Fitting birth-death models to branching times — 11.4a Likelihood of waiting times; 11.4b Maximum likelihood; 11.4c Bayesian MCMC
- 11.5 Sampling and birth-death models
- 11.6 Summary

## 5. Method / approach

**(a) Clade age + diversity (single number per clade).** Net diversification rate from crown age and species count, pure-birth case:
$$\hat r = \frac{\ln(n) - \ln(2)}{t_{\text{crown}}} \quad\text{(Eq. 11.2)}$$
Self-verified by the chapter's own Aragoa row ($n=17$, age $0.42$ My): $(\ln 17 - \ln 2)/0.42 \approx 5.10$, matching the table. A stem-age variant and an extinction-corrected method-of-moments form (**Eq. 11.4**, from Rohatgi 1976 following Magallón & Sanderson 2001, taking relative extinction $\varepsilon=\mu/\lambda$; Eqs 11.3/11.4 reduce to 11.1/11.2 at $\varepsilon=0$) are also given. Yields: a point estimate of $r=\lambda-\mu$; needs an *assumed* $\varepsilon$ to separate $\lambda$ from $\mu$.

**(b) Tree balance (topology-only tests).** Sister-clade test compares species counts of two sister clades against an equal-rates null; whole-tree imbalance uses Colless' index $I$, standardized to $I_c'$, compared against the **Equal-Rates Markov (ERM)** expectation. Note: a symbol $\gamma$ appears in the balance-standardization formula (Eq. 11.11) but there it is the **Euler–Mascheroni constant**, *not* a diversification test statistic — do not conflate with the Pybus–Harvey $\gamma$.

**(c) Full likelihood of branching times.** The chapter builds the likelihood of waiting times under a birth-death process, giving a topology-conditioned expression over the $2n-2$ branches (**Eq. 11.18**), with the extinction-probability term
$$E(t_{\text{root}}) = 1 - \frac{\lambda-\mu}{\lambda - (\lambda-\mu)\,e^{(\lambda-\mu)\,t_{\text{root}}}}.$$
- **Pure-birth (Yule) ML estimator** is analytic — the **Kendal-Moran estimator** (source spelling; Eq. 11.21; Nee 2006):
$$\hat\lambda = \frac{n-2}{s_{\text{branch}}} \quad\text{(Eq. 11.21)}$$
where $s_{\text{branch}}$ is total tree branch length.
- **Birth-death** requires numerical optimization over $\lambda$ and $\mu$ jointly.
- Model comparison: pure-birth vs birth-death via likelihood-ratio test and AIC.

**(d) Bayesian MCMC.** A hand-described Metropolis–Hastings scheme (steps 1–6): exponential prior (mean = variance = $\lambda_{\text{prior}}$), uniform proposal of width $w_p$, acceptance ratio = prior-odds × proposal-ratio × likelihood-ratio. The chapter states this specific algorithm is **not, to the author's knowledge, implemented in any software package**, though "the method is straightforward." Example used $\lambda_{\text{prior}}=1$ on the Páramo data.

**(e) Incomplete sampling.** See §9.

## 6. Key claims / findings
- Net diversification from age+diversity assumes something about extinction; without it only $r=\lambda-\mu$ is identified, not $\lambda,\mu$ separately.
- Pure-birth net-div estimates across the 13 Páramo clades span widely, e.g. Aragoa $\hat r_{pb}=5.10$ ($n=17$, 0.42 My), Puya $3.92$, Lupinus (páramo clade) $2.38$, Calceolaria $1.39$, Berberis $0.73$, Arcytophyllum $0.18$.
- Effect of assumed extinction is **mild until $\varepsilon$ is large**: at $\varepsilon=0.9$, Aragoa drops $5.10\to2.15$. ML across all clades: $\hat r=0.27$, $\hat\varepsilon=0$.
- Bayesian (Páramo, combined): $r$ mean $0.497$ (95% CI $0.08$–$1.77$); $\varepsilon$ mean $0.36$ (95% CI $0.02$–$0.84$).
- **Lupinus branching-times example** (Drummond et al. 2012; 137 tips, age 16.6 My): birth-death $\hat\lambda=0.46$, $\hat\mu=0.20$, $\ln L=262.3$; pure-birth $\hat\lambda=0.35$, $\ln L=260.4$. $AIC_{bd}=-520.6$ vs $AIC_{pb}=-518.8$. LRT $\Delta=3.7$, $P=0.054$. Bayesian: $\hat\lambda=0.48$, $\hat\mu=0.23$.
- Lupinus tree balance: Colless $I=1010$, standardized $I_c'=3.57$, $P=0.0004$ (significantly more imbalanced than ERM).
- Lupinus sister-clade test (Andean 81 sp vs Mexican 46 sp): $P=0.875$ — cannot reject equal rates.

## 7. Load-bearing statements (verbatim — CC-BY permits)
Quotes spot-checked against the raw source HTML (2026-07-03).
1. On extinction bias (survivorship): "By observing only the 'winners' of the diversification lottery, we overestimate the net diversification rate." (§11.2)
2. On single-clade identifiability: "With data from only a single clade, we cannot estimate parameters reliably; in fact, we are trying to estimate two parameters from a single data point, which is a futile endeavor." (§11.2)
3. On sampling bias: "If any species are missing from your phylogenetic tree, they will lead to biased parameter estimates." (§11.5)
4. On the Lupinus result (§11.4b, verbatim): "we estimate a non-zero extinction rate in the clade, but the evidence supporting that model over a pure-birth model is not particularly strong."
5. Summary: the chapter "described how to estimate parameters from birth-death models using data on species diversity and ages, and how to use patterns of tree balance to test hypotheses about changing birth and death rates … how to calculate the likelihood for birth-death models on trees, which leads directly to both ML and Bayesian methods." (§11.6)

## 8. Stated scope, assumptions, limitations
- Constant-rate models assume $\lambda$ and $\mu$ constant through time and across lineages; tree-balance (ERM) tests allow rates to change through time only if they change *identically across all lineages at once*.
- Requires a monophyletic clade with a defined common ancestor (not polyphyletic samples).
- Assumes complete branching times and a known tree; topology treated as certain — **no integration over phylogenetic uncertainty** is discussed.
- Requires either complete sampling or a known/uniform sampling fraction $f$.
- Age+diversity estimates require an *assumed* relative extinction $\varepsilon$; recommended practice is a sensitivity sweep over several $\varepsilon$ values.

## 9. Failure modes / invalidity patterns
- **Extinction overestimates net diversification** from extant-only data: only surviving clades are observed, so equations 11.1/11.2 are biased upward. *Warning sign:* extant-only tree. *Remedy stated:* assume/sweep $\varepsilon$; report sensitivity.
- **Extinction rate itself is weakly identified**: for a single clade you are estimating two parameters from one data point (futile). *Consequence:* $\mu$ estimates unreliable; the Lupinus ML $\hat\mu=0.20$ is not strongly supported (LRT $P=0.054$, $\Delta$AIC $\approx1.8$).
- **Incomplete sampling biases estimates**: missing species "disproportionally likely to connect … on short, rather than long, branches," causing both $\lambda$ and $\mu$ to be **underestimated** and can produce **spurious diversification slowdowns** (apparent rate decrease toward present). *Remedy stated:* incorporate sampling. Uniform-sampling correction sets tip conditions $D_N(0)=1-f$, $E(0)=f$; representative sampling (unsampled clades of known size) uses $L_{\text{total}}=L_{\text{phylogenetic}}\cdot L_{\text{taxonomic}}$.
- **Extinction sensitivity**: effect on rate estimates is "relatively mild until extinction rates are assumed to be quite high ($\varepsilon=0.9$)" — but not ignorable.
- **Tree-balance interpretation is ambiguous**: statistics describe patterns, not processes, so "the relationship between imbalance and evolutionary processes can be difficult to untangle."

**Empirical checks the chapter provides:** (a) $\varepsilon$ sensitivity sweep — pass = conclusions stable across assumed extinction; fail = rates swing with $\varepsilon$. (b) Tree-balance test vs ERM null ($I_c'$, P) — Lupinus fails constancy ($P=0.0004$). (c) Sister-clade test vs equal-rates null — Lupinus passes ($P=0.875$), i.e., no detectable Andean/Mexican rate difference. (d) Pure-birth vs birth-death via LRT/AIC — Lupinus: birth-death not clearly favored ($P=0.054$). No simulation-under-known-truth experiment (e.g., an MCCR-style corrected null) is presented in this chapter [see §10].

## 10. What the chapter does NOT address
- **The $\gamma$ statistic (Pybus & Harvey constant-rates test), its critical value ($-1.645$ one-tailed), and its interpretation of $\gamma<0$ as a slowdown are NOT in this chapter** — **source-verified absent**. Neither is the **MCCR test**. (The only $\gamma$ in the chapter is the Euler–Mascheroni constant inside the Colless $I_c'$ standardization formula, unrelated.) These time-variable-rate diagnostics belong to a later chapter on going beyond constant-rate birth-death — [summarizer-inferred; not stated on this page].
- No explicit treatment of trait-dependent diversification (state-dependent / SSE models).
- No integration over tree topology/branch-length uncertainty.
- No named ready-made software for its custom Bayesian MCMC (author states none exists to their knowledge).
- No fossil-informed birth-death (extant-only framing throughout).

## 11. Open questions / ambiguities left unresolved
- The chapter leaves *which* $\varepsilon$ to assume unresolved — it recommends a sweep rather than a principled choice.
- It flags that tree imbalance cannot be cleanly mapped to a specific process, leaving process inference from balance open.
- It notes its Bayesian scheme is unimplemented in software, leaving practical adoption unaddressed.
- Equation numbering and the full branching-times likelihood algebra are now source-verified (age–diversity = Eqs 11.1–11.4; branching-times likelihood ≈ Eq 11.18–11.19; Kendal-Moran = Eq 11.21). The residual open item is scientific, not access-side: the chapter recommends an $\epsilon$ sensitivity sweep rather than a principled choice of extinction fraction.
