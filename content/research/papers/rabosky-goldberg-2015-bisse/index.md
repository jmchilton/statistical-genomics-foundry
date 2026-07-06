---
title: "Model Inadequacy and Mistaken Inferences of Trait-Dependent Speciation"
type: paper
source_id: rabosky-goldberg-2015-bisse
source_url: https://arxiv.org/abs/1412.7082
doi: 10.1093/sysbio/syu131
access_date: "2026-07-03"
license: LicenseRef-arXiv-nonexclusive-distrib-1.0
attribution: "Rabosky DL, Goldberg EE. Model Inadequacy and Mistaken Inferences of Trait-Dependent Speciation. Systematic Biology 64(2):340-355, 2015. DOI 10.1093/sysbio/syu131. Read from arXiv:1412.7082; summarized in own words under arXiv's nonexclusive distribution license."
derived: own-words-summary
---

# Rabosky & Goldberg 2015 — Model Inadequacy and Mistaken Inferences of Trait-Dependent Speciation

## 1. Citation
Rabosky DL, Goldberg EE. 2015. "Model Inadequacy and Mistaken Inferences of Trait-Dependent
Speciation." *Systematic Biology* 64(2):340–355. DOI 10.1093/sysbio/syu131.
Open-access preprint: arXiv:1412.7082 (q-bio.PE). Supplementary material + R code: Dryad
doi:10.5061/dryad.kp854.
Source read: arXiv:1412.7082 full-text PDF. Access date: 2026-07-03.

## 2. Access note
Read the complete arXiv preprint PDF (full text, all sections, Table 1 and Table 2, figure captions).
No paywall boundary. Figures themselves are images (not read pixel-by-pixel), but the load-bearing
numeric results are stated in the body text, captions, and tables, all of which were read. The Dryad
Appendix (AIC/Bayesian corroboration, BAMM details) was NOT accessed — only the main text's
descriptions of it.

## 3. Thesis
Standard SSE models (BiSSE and relatives) infer statistically significant associations between
neutral/arbitrary traits and speciation rate with "disconcerting ease," so many published
trait-diversification relationships may be artifacts of model inadequacy rather than real biology.

## 4. Problem & context
SSE models (BiSSE, QuaSSE, GeoSSE, and extensions) are model-based likelihood tests widely used
(hundreds of empirical studies) to test whether a character state affects speciation/extinction rates.
A basic SSE model can attribute ALL diversification-rate heterogeneity on a tree only to the
characters in the analysis. The paper asks: how often does a trait that has NO effect on
diversification get flagged as significantly associated with speciation — i.e., what is the Type I
(false-positive) error rate — on real and simulated trees?

## 5. Method / approach
Three empirical/simulation exercises, all fit with the R package `diversitree` (FitzJohn 2012),
model comparison by likelihood-ratio test (LRT):

- **Cetacean worked example.** 87-species cetacean tree (Steeman et al. 2009); body size coded
  binary "small"/"large" vs. median 3.52 m; incomplete-sampling correction 82% (73 of 88 species).
  Fit 5-parameter differential-speciation BiSSE (λ0≠λ1, µ0=µ1, q01≠q10) vs. 4-parameter equal-speciation
  model (λ0=λ1). Real body size gave a significant effect (logL −255.4 vs −258.2; LRT p = 0.02, df = 1).
- **Neutral characters on the cetacean tree (Type I test).** Simulated 100 binary-character sets under
  a symmetric Markov model at each of four transition rates q = 0.01, 0.1, 1, 10 (tree rescaled to root
  age 1.0), retaining only datasets where the rarer state occurred in ≥25% of tips. Same two BiSSE models
  fit assuming complete sampling. Control: pure-birth trees of the same size (N = 87), no rate
  heterogeneity, no extinction, 100 sims per q.
- **Controlled rate-shift simulated trees (Fig 3/4).** Trees built with a low-rate background
  (λ0 = 0.5) and high-rate foreground (λ1 = 1), µ = 0, character transitions either rare (q01=q10=0.001)
  or common (q01=q10=0.1); required 200 tips and ≥25% of each state, rescaled to age 1.0. Neutral
  characters then evolved at q = 0.01, 0.1, 1, 10 (kept if ≥10% tips per state); LRT of 5-param vs
  4-param model. "no shifts" control uses equal foreground/background speciation.
- **Vertebrate subtree survey.** Four large trees — birds 6670 sp, ray-finned fishes 7428, amphibians
  3351, squamates 4451 — partitioned into all rooted subtrees of 200–500 tips (60 bird, 61 fish, 29
  amphibian, 36 squamate = 186 subtrees). Sampling fractions 0.667 birds, 0.27 fish, 0.48 amphibians,
  0.44 squamates. Neutral binary traits simulated at q = 0.01, 0.1, 1, 10; 10 histories per
  subtree×rate = 7440 datasets; rarer state required ≥10% of tips.
- **Taxon-name-length "arbitrary character."** Each species scored "short"/"long" by whether its Latin
  binomial length was below/above the subtree median; fit same BiSSE models.
- **No-phylogenetic-signal test.** Randomly assigned tip states on the whale tree at rare-state
  frequencies 0.1–0.5, 200 replicates each (1000 total); plus a single-species-rare variant (86 in
  state 0, 1 in state 1) across all 87 possible placements; pure-birth controls.
- Appendix (Dryad) reports the cetacean/subtree results also hold under AIC model selection and
  Bayesian inference — not only LRT.

## 6. Key claims / findings (exact numbers, do not round)
- **Cetacean tree, neutral traits:** More than **77% of the 400 character sets** showed a significant
  (p < 0.05) association between character state and speciation rate; **58% rejected the
  character-independent model at p < 0.001.** Error approached unity for both rare (q=0.01) and frequent
  (q=10) transition rates, was somewhat lower at intermediate q.
- **Pure-birth control:** the λ0=λ1 model was rejected (p < 0.05) in **exactly 5%** of pure-birth
  simulations — i.e., the test is well-calibrated when tree shape has no rate heterogeneity.
- **Controlled rate-shift trees, slowly-evolving neutral trait (q = 0.01 or 0.1):** **Type I error rate
  of 18–45%** (Fig 4 caption). False positives DECLINE as the neutral trait evolves faster and as
  diversification shifts become common (chance decouples trait from history). "no shifts" control gives
  low error.
- **Vertebrate subtree survey (7440 datasets, 186 subtrees):** pooled, **61.5% of simulated
  subtree/character combinations were significant at p < 0.05.** Error was *greatest* when the neutral
  character evolved *rapidly* (opposite of the pseudoreplication expectation). Highly significant
  (p < 0.001) fraction: **20–32% for q = 0.01, 0.1, and 1; 73.7% for q = 10.**
- **Table 1 (error binned by rarer-state frequency, pooled across q/clades):** p<0.05 proportion ranges
  **0.404** (freq 0.10–0.15) up to **0.669** (freq 0.40–0.45); p<0.001 proportion **0.164** up to
  **0.423**. High error across all frequency bins → not an acquisition-bias artifact.
- **Taxon-name-length (arbitrary character):** **more than 69% of trees** in every group showed a
  significant (p < 0.05) name-length↔speciation correlation; **fishes approached 100% (60 of 61
  subtrees).** (73% of bird subtrees had significant phylogenetic signal in name length by the K-statistic.)
- **No-signal randomized traits on whale tree:** **every one of 1000 permutations** yielded a significant
  trait↔speciation association, **99.6% significant at p < 0.001.** Pure-birth controls NOT elevated.
- **Single-rare-species variant:** trait-dependent speciation significantly favored on **all 87** possible
  trait placements on the whale tree (p < 0.0001), but only on **1.5% (n = 3/200; p<0.05)** of pure-birth
  trees.
- **BAMM-partitioned subset (Table 2, avian subtrees BAMM found NO strong rate variation):** Type I error
  still **25–55%** — specifically 0.300/0.257/0.343/0.542 (q=0.01/0.1/1/10) for BAMM p0>0.05 (N=70), and
  0.275/0.300/0.325/0.500 for BAMM p0>0.25 (N=40). → partitioning is not a complete fix.
- **Power on the true trait is not from replication:** real causal trait correctly detected at p<0.05 in
  **99%** (rare shifts) / **97%** (common shifts); with a weaker signal (λ0=0.75, λ1=1) detected in **77%**
  (rare) vs **42%** (common). Power comes from the total tree length over which the association holds, not
  from repeated independent origins.
- Results generalize beyond LRT (AIC and Bayesian, per Appendix), and the authors expect them to extend
  to other SSE models and to extinction-rate tests.

## 7. Load-bearing statements — OWN-WORDS MODE (restrictive license)
License posture: the arXiv page lists only the "arXiv.org perpetual non-exclusive license," which is a
distribution license, NOT a Creative Commons or open license → treated as restrictive. Prose is
paraphrased; only functional strings, numeric thresholds, parameter names, and equation forms are
verbatim (facts, not protected expression).

- The Type-I finding: on the empirical cetacean tree, over 77% of 400 neutral-character datasets were
  significant at p < 0.05 and 58% at p < 0.001, versus exactly 5% for pure-birth control trees — i.e., the
  false-positive rate is grossly inflated by the shape of a real tree, not by the test itself.
- On the controlled rate-shift simulated trees, a slowly-evolving neutral trait (q = 0.01 or 0.1) produced
  a "Type I error rate of 18–45%" (verbatim numeric phrase, Fig 4 caption).
- Mechanism (paraphrase of Discussion "Diversification rate heterogeneity"): when a basic SSE model is fit,
  all diversification-rate heterogeneity on the tree can only be attributed to the characters in the
  analysis; a rate shift caused by something OTHER than the focal trait therefore gets mis-assigned to the
  trait. For high transition rates the authors suspect the tip distribution barely constrains internal
  states, so the model paints "fast-speciation" states onto fast-speciation regions of the tree and vice
  versa — the character becomes effectively irrelevant and its inferred internal-node states are driven by
  diversification-rate variation rather than by the observed tip data.
- Recommendation (paraphrase of Conclusions): until a better solution exists, run SSE analyses in a
  multi-clade (meta-analytic) framework for robustness, or at minimum explicitly quantify the
  phylogeny-specific Type I propensity by simulating neutral traits on the tree as done here; and, more
  generally, attend to diagnosing model inadequacy in phylogenetic comparative methods.

## 8. Stated scope, assumptions, limitations (authors' own caveats)
- SSE models "perform very well" on large simulated datasets that obey model assumptions (Davis et al.
  2013); the problem is robustness to *violations*, especially on real trees.
- Main text reports LRT of speciation-rate models; Appendix shows AIC and Bayesian give the same. Only
  BiSSE (binary) results are shown, but the authors *expect* the effect for other SSE models (QuaSSE,
  GeoSSE, etc.) and for extinction-rate tests — this is expectation, not demonstrated here.
- Consequences for parameter estimation and ancestral-state reconstruction are stated to be "beyond the
  scope" but expected to be substantial.
- Acquisition bias (choosing clades/traits with both states well-represented) exists but their controls
  show it does not drive the reported error magnitude; it does explain the consistent root-state↔low-rate
  direction in meta-analysis.
- They explicitly state they do NOT have a complete explanation for the high error at high transition
  rates / no phylogenetic signal.

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Unmodeled background rate heterogeneity** (a diversification shift tied to a factor other than the
  focal trait) → spurious significant trait-diversification association. This is the *diagnosed* slow-trait
  mechanism (also shown by FitzJohn 2010, 2012; Maddison & FitzJohn 2014).
- **Within-clade pseudoreplication / no required replication:** SSE significance needs no repeated
  independent origins of state+diversification; a single co-located shift + trait origin can be
  "significant." Effective sample size / degrees of freedom are undefined for these models.
- **High-transition-rate / no-signal pathology (undiagnosed):** even randomized tip states with zero
  phylogenetic signal give ~100% false positives on real trees — pseudoreplication alone cannot explain
  this; unknown additional model inadequacy remains.
- **Rare character state:** BiSSE can behave badly when one state is very rare (Davis et al. 2013); the
  single-rare-species test shows near-certain false positives on the empirical tree.
- **Diagnostics named:** (1) simulate neutral traits on YOUR phylogeny and check the false-positive rate /
  recalibrate the LRT critical value from the neutral-trait null distribution; (2) test direction-consistency
  across independent clades (meta-analysis) — artifactual associations are not directionally consistent at
  moderate/high q; (3) note that a NEGATIVE BAMM/MEDUSA result (no detected rate shifts) does NOT clear a
  dataset — 25–55% error persisted on such subtrees.

## 10. What the source does NOT address
- Does NOT name or test HiSSE (Beaulieu & O'Meara 2016 postdates this paper). It discusses the conceptual
  precursor — a "hidden trait" / hidden-rates model (Beaulieu et al. 2013) / covarion — as a candidate fix,
  and reports in preliminary tests it diverts signal ONLY when the rate heterogeneity is itself structured
  like an evolving trait (their simulated shift trees), and remains inadequate on empirical trees. So this
  paper does NOT endorse hidden-state models as a general solution.
- Does not give a complete mechanistic theory for the high-q / no-signal false positives.
- Does not quantify consequences for parameter estimation or ancestral-state reconstruction.
- Does not provide corrected p-value tables or a ready-to-use correction; the neutral-simulation
  recalibration is proposed but flagged as not fully worked out (unclear which model/transition rates to
  simulate under).

## 11. Open questions / ambiguities the source leaves unresolved
- Root cause of false positives when characters lack phylogenetic signal (explicitly unexplained).
- What model/transition-rate assumptions are appropriate when simulating neutral traits to recalibrate
  significance.
- How to define effective sample size / degrees of freedom for SSE and Pagel-type correlation tests.
- Whether an entirely new (non-SSE) framework is needed for robust trait-diversification inference.

## 12. Guidance answers
- **Exact experiment / how the null was built:** neutral binary characters were SIMULATED under a symmetric
  Markov model (no effect on speciation/extinction) on FIXED empirical topologies (cetacean tree; 186
  vertebrate subtrees) at transition rates q = 0.01, 0.1, 1, 10, then tested with the standard 5-param vs
  4-param BiSSE LRT. The null "no state-dependent diversification" is what the simulation obeys; the
  false-positive rate is how often the test rejects it anyway. Controls: pure-birth trees (no rate
  heterogeneity) → correctly ~5% error.
- **Reported Type-I rate + conditions (verbatim numbers, NOT rounded):**
  - Cetacean tree: **>77%** at p<0.05, **58%** at p<0.001 (400 neutral datasets). Control pure-birth:
    **exactly 5%**.
  - Controlled rate-shift simulated trees, slow neutral trait (q=0.01/0.1): **18–45%** (Fig 4).
  - 186 vertebrate subtrees pooled: **61.5%** at p<0.05; p<0.001 = **20–32%** (q=0.01,0.1,1) and **73.7%**
    (q=10). Table 1 per-frequency: **0.404–0.669** at p<0.05.
  - Randomized no-signal traits on whale tree: **100% (1000/1000)** significant, **99.6%** at p<0.001.
  - Name-length arbitrary character: **>69%** all groups; fishes **~100% (60/61)**.
  - BAMM "no-shift" avian subset: **25–55%** (Table 2).
  - **Flag on the skill's "~40%":** this paper does NOT have a single headline "40%" figure. The whale-tree
    headline is >77%; the vertebrate-subtree headline is 61.5%. "~40%" matches only the LOW end — the
    controlled rate-shift slow-trait range (18–45%) and the lowest Table 1 frequency bin (0.404). If the
    skill cites this paper for "~40% Type-I at moderate trees," that is a conservative/low-end
    characterization, not the paper's central number; the paper's real numbers are substantially higher for
    the empirical-tree conditions.
- **Mechanism (why neutral traits get significance):** a basic SSE model can attribute all
  diversification-rate heterogeneity only to the modeled character, so an unmodeled/background rate shift is
  mis-assigned to the neutral focal trait (the slow-trait/pseudoreplication mechanism). At high transition
  rates the model can freely paint character states onto tree regions matching their speciation rate,
  making the character effectively irrelevant — an additional, incompletely-understood inadequacy.
- **Recommendation (paraphrased, restrictive license):** prefer a multi-clade meta-analytic framework
  requiring explicit cross-clade replication; failing that, quantify the phylogeny's own Type I propensity
  by simulating neutral traits and recalibrating the significance threshold; treat all SSE significance with
  much greater caution and diagnose model inadequacy. NOTE: the paper does NOT prescribe HiSSE / a
  hidden-state model as "the required null" — it is skeptical that hidden-state models fix empirical trees.
- **Scope — which models:** abstract names **BiSSE, QuaSSE, GeoSSE, and related models**; demonstrated only
  on BiSSE (binary), with stated *expectation* (not proof) that the effect extends to the other SSE models
  and to extinction-rate as well as speciation-rate tests, and that results are not specific to LRT
  (also AIC and Bayesian).
