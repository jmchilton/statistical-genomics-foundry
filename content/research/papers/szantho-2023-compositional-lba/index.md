---
title: "Compositionally Constrained Sites Drive Long-Branch Attraction"
type: paper
source_id: szantho-2023-compositional-lba
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC10405358/
doi: 10.1093/sysbio/syad013
access_date: "2026-07-03"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Szánthó LL, Lartillot N, Szöllősi GJ, Schrempf D. Compositionally Constrained Sites Drive Long-Branch Attraction. Systematic Biology 72(4):767-780, 2023. DOI 10.1093/sysbio/syad013. Open-access full text on PMC under CC-BY 4.0."
derived: license-aware-summary
tags:
  - domain/phylogenetics
  - domain/molecular-evolution
---

# Compositionally Constrained Sites Drive Long-Branch Attraction

## 1. Citation

- **Authors (exact, as printed):** Lénárd L Szánthó, Nicolas Lartillot, Gergely J Szöllősi, Dominik Schrempf.
  - Byline note (verbatim): "Gergely J. Szöllősi and Dominik Schrempf contributed equally to this article."
  - **Citation-error correction:** the downstream bioSkills skill mis-attributes this locus (Syst Biol 72:767)
    to "Sun M et al. 2023." That is wrong. The four authors above are the correct list, verified from the
    source byline. There is no "Sun" author.
- **Year:** 2023 (received/published 2022–2023; issue July 2023).
- **Title:** "Compositionally Constrained Sites Drive Long-Branch Attraction."
- **Venue:** Systematic Biology, Volume 72, Issue 4, Pages 767–780.
- **DOI:** 10.1093/sysbio/syad013.
- **Open-access URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC10405358/ (full text). Journal:
  https://academic.oup.com/sysbio/article/72/4/767/7083631 . Preprint: bioRxiv 2022.03.03.482715.
- **Access date:** 2026-07-03.

## 2. Access note

Read the **full text** via PubMed Central (PMC10405358). The OUP journal page itself is subscription-gated,
but the article is **Open Access under CC-BY 4.0**, and PMC carries the complete text — no paywall boundary on
the content summarized here. (Guidance assumed OUP "all-rights-reserved"; the actual license is CC-BY 4.0, so
verbatim quoting is permitted — see §7. This is a correction to the guidance's stated posture.)

## 3. Thesis (1 sentence)

Models that ignore across-site compositional heterogeneity are prone to long-branch attraction (LBA) because
they underestimate the probability of convergent substitutions at compositionally constrained sites, and
CAT-PMSF — a pipeline that estimates site-specific amino-acid preferences with the CAT model and applies them
via posterior mean site frequencies — diagnoses and resolves this bias.

## 4. Problem & context

Phylogenies at deep timescales (long branches) are controversial because models of differing complexity give
conflicting, strongly supported topologies. Empirically, alignments including **Microsporidia, Nematoda, or
Platyhelminthes** show that inadequate modeling of across-site compositional heterogeneity — the result of
biochemical constraints that make different sites accept different sets of amino acids — produces erroneous but
well-supported topologies. Models that adequately capture across-site compositional heterogeneity (notably the
Bayesian nonparametric CAT model) are computationally challenging or intractable for large modern datasets, and
their MCMC convergence often cannot be assured. The paper targets both the diagnosis of this bias and a
tractable resolution.

## 5. Method / approach

Two contributions: a **diagnostic** ("compositional constraint analysis") and an **inference pipeline**
(CAT-PMSF).

**Per-site constraint measure — Keff (effective number of amino acids).**
For a site with stationary distribution π, the probability of homoplasy is G(π)=∑ᵢ πᵢ² (sum over the 20 amino
acids), and the effective number of amino acids is its inverse: **Keff(π)=G(π)⁻¹**. Low Keff = strongly
constrained site (few accepted amino acids); high Keff = less constrained.

**Compositional constraint analysis (the diagnostic).**
For two competing topologies A and B, compute per-site log-likelihood difference
**ΔlogLᵢ = log Lᵢᴮ − log Lᵢᴬ** (positive ⇒ site i supports topology B). Order and **bin sites by their Keff
value** and sum ΔlogL within each bin. Under an adequate model, phylogenetic signal is consistent across Keff
bins; **conflicting signal across bins** (e.g., low-Keff bins favoring one topology, high-Keff bins the other)
indicates model misspecification driving LBA. Correlation between Keff and ΔlogL is assessed with rank
correlation coefficients.

**CAT-PMSF pipeline (three steps).**
1. **Guide tree (IQ-TREE 2):** infer an ML tree under a **site-homogeneous** model — LG exchangeabilities,
   empirical amino-acid frequencies, 4-category discrete gamma rates, i.e. **`LG + F + G4`** in IQ-TREE 2
   terminology.
2. **Site frequencies (PhyloBayes):** fix that guide topology; run the **CAT model** to obtain the
   **posterior mean site-specific stationary distributions** of amino acids. CAT is run with Poisson, LG, or
   GTR exchangeabilities.
3. **Final inference (IQ-TREE 2 / PMSF):** feed the custom site-specific stationary distributions into the
   second step of the **PMSF** (posterior mean site frequencies) method and re-estimate under the fixed
   frequencies to produce the final tree.

Fixing the topology before the expensive CAT step, and pushing the site frequencies into fast ML via PMSF, is
what makes the approach tractable relative to a full CAT MCMC tree search.

**Model strings evaluated** (see §7 for the verbatim reference): `LG + F + G4` (site-homogeneous baseline),
`Poisson + CAT-PMSF`, `LG + CAT-PMSF`, `GTR + CAT-PMSF`, and empirical-mixture PMSF baselines `LG + C10 + PMSF`
and `LG + C60 + PMSF`. [Note: `C10`/`C60` mixture strings reported by extraction; treat the exact mixture set
as [re-check] against the source if load-bearing.]

**Simulation design (Felsenstein/Farris zone).**
Four-leaf **quartet trees**; alignments of **10,000 amino acids**; branch-length parameter **q fixed to 0.1**
while **p varied between 0.1 and 2.0** (p = the long/terminal branch parameter placing two long branches).

**Empirical datasets analyzed:**
- Microsporidia — 40 species, 24,294 amino acids.
- Nematoda — 37 species, 35,371 amino acids. [re-check: same site count as Platyhelminthes below]
- Platyhelminthes — 32 species, 35,371 amino acids. [re-check duplicate value]
- Simion et al. 2017 (Metazoa) — 97 species, 401,632 amino acids.
- Ryan et al. 2013 (Metazoa) — 61 species, 88,384 amino acids.

## 6. Key claims / findings (atomic)

- Models ignoring across-site compositional heterogeneity **underestimate the probability of convergent
  substitutions** at compositionally constrained (low-Keff) sites, and this is the stated cause of their LBA
  susceptibility.
- **More constrained (low-Keff) sites bias toward the incorrect LBA topology**; less constrained (high-Keff)
  sites carry the correct signal — the two classes give "ostensibly conflicting signal" under site-homogeneous
  models.
- In simulation, **site-homogeneous models fail (recover the wrong topology) once p ≥ 0.8**. "The true topology
  was not recovered with site-homogeneous models when p ≥ 0.8."
- **CAT-PMSF is robust against LBA in all alignments examined**, and shows no bias even for large p (extraction:
  "even for large values of p ≥ 1.2"). [The exact upper p at which CAT-PMSF was tested/robust — reported
  variously as ~1.2 up to ~2.0 — treat the precise ceiling as [re-check]; the robustness claim itself is
  verbatim in the abstract.]
- More complex models accounting for across-site compositional heterogeneity **ameliorate (do not always fully
  eliminate)** the bias.
- **Empirical result:** compositionally constrained sites drive LBA in two metazoan datasets; CAT-PMSF recovers
  **Porifera (sponges) as the sister group to all other animals** — evidence against Ctenophora-sister.
- The authors **recommend using CAT-PMSF specifically when CAT-model MCMC convergence cannot be assured** (its
  practical niche).

## 7. Load-bearing statements — VERBATIM (license: CC-BY 4.0, reproduction permitted)

Quoting mode: **verbatim permitted** (CC-BY 4.0). Short load-bearing quotes below; locations from PMC full text.

1. (Abstract — mechanism / thesis) "We show that more constrained sites with lower diversity and less
   constrained sites with higher diversity exhibit ostensibly conflicting signal under models ignoring
   across-site compositional heterogeneity that lead to long-branch attraction artifacts and demonstrate that
   more complex models accounting for across-site compositional heterogeneity can ameliorate this bias."
2. (Motivation — the causal mechanism) "Our primary motivation is that models ignoring across-site
   compositional heterogeneity are prone to LBA because they underestimate the probability of convergent
   substitutions at compositionally constrained sites."
3. (Robustness — must-quote) "CAT-PMSF is robust against long-branch attraction in all alignments we have
   examined."
4. (When to use it) "We suggest using CAT-PMSF when convergence of the CAT model cannot be assured."
5. (Empirical conclusion) "We find evidence that compositionally constrained sites are driving long-branch
   attraction in two metazoan datasets and recover evidence for Porifera as the sister group to all other
   animals."

Functional strings (verbatim, facts): Keff(π)=G(π)⁻¹ ; G(π)=∑ πᵢ² ; ΔlogLᵢ = log Lᵢᴮ − log Lᵢᴬ ;
model strings `LG + F + G4`, `Poisson + CAT-PMSF`, `LG + CAT-PMSF`, `GTR + CAT-PMSF`, `LG + C10 + PMSF`,
`LG + C60 + PMSF`; simulation p ≥ 0.8 threshold; q = 0.1, p ∈ [0.1, 2.0].

## 8. Stated scope, assumptions, limitations (the paper's own)

- **CAT-PMSF assumes across-branch homogeneity** (stationarity of the process across branches of the tree); it
  addresses across-*site* heterogeneity, not across-*branch* compositional heterogeneity.
- Results are described as **conservative** because the site-specific stationary distributions are estimated on
  a **guide topology that is itself prone to LBA artifacts** (Step-1 site-homogeneous tree).
- **Guide-topology dependency:** the initial site-homogeneous tree could bias the site-frequency estimates;
  empirically the authors argue this is mitigated in practice.
- **Computational cost:** estimating the site-specific stationary distributions (the CAT/PhyloBayes step)
  remains by far the most time-consuming part.
- **Outgroup sensitivity:** adding distant outgroups lengthens the basal branch and raises LBA risk even with
  CAT-PMSF; closest outgroups give the most robust signal.
- Tests for across-branch compositional heterogeneity were **less conclusive for the empirical datasets than
  for the simulations**.

## 9. Failure modes / invalidity patterns (referee-relevant)

- **Symptom of compositional inadequacy (the diagnostic to run):** in a compositional constraint analysis,
  **ΔlogL signal that conflicts across Keff bins** — low-Keff bins supporting one topology while high-Keff bins
  support another — signals that a site-homogeneous model is being driven to an LBA artifact. Consistent signal
  across bins is the "healthy" pattern. Significant Keff–ΔlogL rank correlation is corroborating evidence.
- **When site-homogeneous models (LG/WAG/JTT-style, constant equilibrium frequencies) become invalid:** deep
  nodes / long terminal branches. Concrete simulation trigger: **p ≥ 0.8**. Direction of the error: strongly
  constrained (low-Keff) sites pull toward the **incorrect** (LBA / Farris-type) topology, wrongly grouping
  distantly related fast-evolving lineages.
- **CAT-PMSF's own failure surface:** across-branch compositional heterogeneity (its stationarity assumption is
  violated); pathological guide topologies; distant outgroups inflating basal branch length.
- No named error-message/threshold from software output; the diagnostic is the Keff-binned ΔlogL plot plus rank
  correlations, and topology rejection is assessed with **Approximately Unbiased (AU) tests**.

## 10. What the source does NOT address

- **Does NOT use or recommend posterior-predictive checks** for compositional adequacy (searched; NOT FOUND in
  full text). Its diagnostic is the Keff-vs-ΔlogL "compositional constraint analysis," not a posterior-predictive
  compositional statistic. (This distinguishes it from Foster 2004-style posterior-predictive compositional
  tests, which the skill may pair separately — this paper does not provide that.)
- Does not address nucleotide/codon compositional heterogeneity (amino-acid focus).
- Does not resolve across-branch (lineage-specific) compositional heterogeneity — explicitly out of scope.

## 11. Open questions / ambiguities left unresolved

- The exact upper bound of p at which CAT-PMSF remains unbiased (extraction gave both ~1.2 and up-to-2.0
  phrasings) — precise ceiling is [re-check] against the figures.
- Whether the reported empirical dataset site counts for Nematoda and Platyhelminthes are genuinely identical
  (both 35,371 aa) or an extraction artifact — [re-check].
- Exact AU-test P-values for rejecting Ctenophora-sister in the Simion dataset (a secondary extraction gave
  values on the order of 10⁻⁴; treat as [re-check], not verified verbatim here).
- The precise empirical-mixture PMSF baselines used (C10/C20/C60) — [re-check] the exact set.

## 12. Guidance answers

- **Mechanism (across-site compositional heterogeneity → LBA):** answered. Biochemical constraints make each
  site accept a different set of amino acids (captured by Keff = 1/∑πᵢ²). The probability of independent
  (convergent) substitutions to the same state depends on how few amino acids a site accepts; site-homogeneous
  models pool all sites and **underestimate convergent substitutions at low-Keff sites**, so those sites' shared
  states are misread as homology and drive LBA. Paper's own statement: "models ignoring across-site
  compositional heterogeneity are prone to LBA because they underestimate the probability of convergent
  substitutions at compositionally constrained sites" (verbatim, §7).
- **What site-homogeneous models get wrong, and where it bites:** they impose a single equilibrium frequency
  vector across sites; low-Keff sites then produce conflicting signal and bias toward the **incorrect LBA
  topology**. It bites at deep nodes / long branches — simulation threshold **p ≥ 0.8**. Ancestor/attraction
  bias direction: distantly related fast-evolving long-branch lineages (e.g., Microsporidia, Ctenophora) are
  wrongly drawn together.
- **CAT-PMSF — what it is / corrects / robustness:** a 3-step pipeline (IQ-TREE 2 `LG+F+G4` guide tree →
  PhyloBayes CAT posterior mean site-specific stationary distributions → IQ-TREE 2 PMSF with those
  frequencies). It corrects inadequate modeling of across-site compositional heterogeneity by supplying
  site-specific amino-acid preferences to a fast fixed-frequency ML step. Robustness (verbatim must-quote):
  "CAT-PMSF is robust against long-branch attraction in all alignments we have examined." IQ-TREE 2 + PhyloBayes
  workflow captured in §5.
- **Diagnostic for compositional inadequacy:** **This paper states its own diagnostic — "compositional
  constraint analysis"** (Keff-binned ΔlogL signal + Keff–ΔlogL rank correlation), NOT posterior-predictive
  compositional checks. So: it recommends a diagnostic, but a *different* one than Foster-2004 posterior
  predictive; it describes the phenomenon AND supplies its own detector. Posterior-predictive checks: NOT
  FOUND.
- **Functional strings (model specs) verbatim:** `LG + F + G4`, `Poisson + CAT-PMSF`, `LG + CAT-PMSF`,
  `GTR + CAT-PMSF`, `LG + C10 + PMSF`, `LG + C60 + PMSF`; PMSF = posterior mean site frequencies. (C-series
  mixture set [re-check].)
- **Must-quote items:** both delivered verbatim (CC-BY permits) in §7 — the constrained-sites-drive-LBA
  statement (#1/#2) and the CAT-PMSF robustness statement (#3).
