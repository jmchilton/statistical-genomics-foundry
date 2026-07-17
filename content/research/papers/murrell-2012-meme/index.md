---
title: "Detecting Individual Sites Subject to Episodic Diversifying Selection"
type: paper
source_id: murrell-2012-meme
source_url: https://journals.plos.org/plosgenetics/article?id=10.1371/journal.pgen.1002764
doi: 10.1371/journal.pgen.1002764
access_date: "2026-07-05"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Murrell B, Wertheim JO, Moola S, Weighill T, Scheffler K, Kosakovsky Pond SL. PLoS Genetics 8(7):e1002764, 2012. DOI 10.1371/journal.pgen.1002764. Read via PLoS open-access HTML plus the printable PDF (numeric/symbolic values); open access under the Creative Commons Attribution License (PLoS house license CC BY 4.0), permitting verbatim quotes."
derived: license-aware-summary
tags:
  - domain/dnds
  - domain/molecular-evolution
---

# Murrell et al. 2012 — MEME (Mixed Effects Model of Evolution)

## 1. Citation
Murrell B, Wertheim JO, Moola S, Weighill T, Scheffler K, Kosakovsky Pond SL. 2012.
"Detecting Individual Sites Subject to Episodic Diversifying Selection." *PLoS Genetics*
8(7): e1002764. DOI: 10.1371/journal.pgen.1002764.
Open-access URL: https://journals.plos.org/plosgenetics/article?id=10.1371/journal.pgen.1002764
Editor: Harmit S. Malik. Received 2012-01-17; Accepted 2012-04-26; Published 2012-07-12.
Access date: 2026-07-05.

## 2. Access note
Full text read. The public HTML and the JATS XML render every inline equation as an
image with no alt text, so ω-symbols, thresholds, and many numeric results are absent
from those formats; the printable PDF (`type=printable`, 10 pp.) carries them as
selectable text and was the source for all numeric/symbolic values below. Supplementary
material (Text S1 — "Supplementary methods, results, and discussion"; Figures S1–S3;
Tables S1–S24) was **not** retrieved; several derivations, simulation details, and the
per-gene discussion live only there and are noted as such.
Notation: the paper writes **α** = synonymous substitution rate, **β** = non-synonymous
rate; ω = β/α, and positive/diversifying selection means β > α (ω > 1).

## 3. Thesis (1 sentence)
Selection on protein-coding genes is often *episodic* (acting on only a subset of
lineages at a site), and a mixed-effects codon model (MEME) that lets the non-synonymous
rate vary both site-to-site and branch-to-branch detects far more such sites than
methods assuming a site-constant rate.

## 4. Problem & context
Random-effects site models (e.g. Nielsen–Yang M-series, FEL) let ω vary across sites but
assume it is **constant across branches/lineages at a site** (Figure 1A). When a site is
under purifying selection on most lineages, transient positive selection on a few
lineages is averaged away and the site is inferred to have ω < 1, so episodic positive
selection is missed. This also explains the counterintuitive report that adding sequences
can cause sites to stop being detected. Branch-site models allow lineage variation but
require *a priori* designation (or exhaustive search) of foreground branches and can have
poor statistical performance. MEME targets the gap: detect episodic diversifying
selection at a site **without** pre-specifying which branches.

## 5. Method / approach
MEME lets the non-synonymous rate at a site be a random draw from **K selective
categories** across branches (random effect), while the category parameters are fixed
effects shared by all branches at that site. Branch categories are assumed **independent**
across branches; the per-site likelihood is marginalized over all branch-configuration
vectors, made tractable by replacing each branch's transition matrix with a **mixture of
transition matrices** (via Felsenstein's pruning algorithm; derivation in ref [20],
Kosakovsky Pond et al. 2011). Codon substitution model: Muse–Gaut (MG-style) with
9-parameter position-specific target-nucleotide frequencies, stop-codon-corrected (CF3×4),
GTR nucleotide mutational biases; likelihood via pruning.

**Two-class per-site model (the operational case, K=2).** Each site gets a rate class
**β⁻ ≤ α** and an unrestricted **β⁺**, with mixing weight **q⁻ = p(branch in β⁻ class)**
and complement **q⁺ = 1 − q⁻**. Four fixed-effect parameters estimated jointly per site
from all branches: **α, β⁻, β⁺, q⁻**. Estimating α per site accounts for site-to-site
synonymous-rate variation.

**Three-stage fitting (per the "MEME test for episodic diversifying selection"):**
1. Fit a codon model with a single alignment-wide ω, using GTR-nucleotide estimates as
   initial values; obtain per-branch relative branch lengths and mutational-bias
   parameters (assumed shared across sites). Paper flags that nucleotide branch lengths
   can underestimate codon branch lengths and bias downstream inference (ref [25]).
2. At each site, fit the **alternative** 2-class model (β⁻ ≤ α, β⁺ unrestricted).
3. At each site, fit the **null** model with the constraint **β⁺ ≤ α** (no rate class
   above α); compare null vs. alternative by likelihood-ratio test (LRT).

**Test statistic / significance.** The LRT statistic for the worst-case null
β⁺ = β⁻ = α is asymptotically a **0.33 : 0.30 : 0.37 mixture of χ²₀, χ²₁ and χ²₂**
(coefficients derived empirically from simulation; Text S1; Q–Q check in Figure S1 shows
χ²₁ too liberal, χ²₂ too conservative, the mixture ≈ correct). A site is called under
episodic diversifying selection when the resulting p-value is significant; **p ≤ 0.05** is
used as the *nominal* cutoff throughout (see §6/§12 on whether this is a recommendation).
Inference is **site-wise**: it controls the site-wise, not family-wise, error rate;
combining site results into an alignment-wide test is explicitly not recommended. For
multiple testing, Benjamini–Hochberg **false-discovery-rate q-values** (upper bounds) are
reported alongside p-value upper bounds.

**FEL (the reference method compared against).** Fits a single α, β pair per site (no
across-branch variation) in Step 2; the Step-3 test asks whether α = β. FEL infers
positive selection when β̂ > α̂ and the LRT p-value is significant on a **χ²₁** asymptotic
distribution. FEL chosen as the closest-assumption reference for *pervasive* selection.

**Empirical Bayes (EB) branch-level add-on.** For a site already called selected, an EB
posterior that a given branch has β = β⁺ > α is computed by Bayes' theorem, and an
**empirical Bayes factor (EBF)** for positive selection at that branch is evaluated;
EB > K (they use **K = 20** as the calling threshold; K > 1 means data raise the prior
odds). Explicitly recommended **only for data exploration / visualization**, not
inference, even at large EBF (e.g. 100), because each branch-site estimate rests on one
codon along one branch (sample size ≈ 1).

## 6. Key claims / findings
- **Type-I / false positives (worst-case constant ω = 1 null).** Well controlled at
  p = 0.05. Conservative at small sample sizes; FP rate = <0.01 (N = 8), 0.01 (N = 16),
  0.03 (N = 32), 0.04 (N = 64), 0.05 (N = 128 and 256). Seven large TreeBase phylogenies
  (N = 517–640): FP 0.047–0.053 at nominal 0.05 — no degradation with more taxa.
- **Divergence dependence of Type-I.** Conservative for low pairwise divergence
  (< 0.1 substitutions/site), nominal for medium-to-high (0.1–0.4), and nominal to
  **slightly anti-conservative** for higher divergence (> 0.4 subst/site).
- **Pervasive (site-constant) selection.** At nominal p = 0.05, MEME tracks FEL, losing a
  few percentage points of power due to its more conservative statistic; when both are
  calibrated to a 5% empirical Type-I rate, MEME holds a **small edge** (it finds every
  FEL site plus borderline FEL cases). Worst-case power loss vs. FEL: sites with FEL
  p between **0.0346 and 0.05** are missed by MEME (its p > 0.05) — **≤ 5%** power loss in
  the constant-ω simulations (Table S3).
- **Episodic (branch-variable) selection.** MEME had more power than FEL for **every**
  simulated (β⁻, β⁺, q⁺) combination (Table 1). When only q⁺ = 0.1 of lineages are
  selected, FEL is **effectively powerless (0–10%)** while MEME reaches **4–53%** (low),
  and higher for larger q⁺/diversification. When 25% (50%) of lineages are selected, FEL's
  power averages only ~24% (~67%) of MEME's. MEME power rises with alignment size; FEL's
  stays low.
- **EB branch identification is weak.** Best case (selected branches on strongly conserved
  background, β⁻ ≈ 0.1): an individual branch correctly detected ~25% of the time; ≥1
  selected branch found in 89.8% of cases; but ≥1 background branch falsely called in 55%
  of cases. Neutral background is much worse: ≥1 true branch in 55.6%, ≥1 false in 86.5%;
  18 neutral background branches flagged at >5%, while the 5 truly-selected branches
  identified at only 3.4–26% of selected sites.
- **Empirical corpus (16 protein-coding alignments).** Across all 16, FEL detects 63
  positively selected sites; MEME recovers 51 of them (the other 12 borderline, MEME
  p in 0.05–0.07) **plus 186 additional** episodic sites — **nearly 4× as many as FEL**.
  In 12/16 alignments MEME found all FEL sites; per-alignment extra sites ranged from 1
  (West Nile virus NS3) to 48 (Diatom SIT). In 9/16 data sets, sites FEL called
  *negatively* selected were instead called episodically diversifying by MEME; for 56
  sites the two methods give qualitatively opposite conclusions.
- **Sites only MEME finds are more episodic.** Sites found by both methods had higher mean
  proportion of selected lineages (mean q⁺ ≈ 0.59); MEME-only sites had much lower
  (≈ 0.10), i.e. selection confined to few branches.
- **Sampling robustness.** In vertebrate rhodopsin, older constant-ω methods found more
  sites in subsets than in the full alignment; MEME finds *more* sites as sequences are
  added (monotone with data), mitigating the small-alignment pathology.
- **Biological conclusion.** Episodic selection appears to be the dominant mode of adaptive
  evolution in most data sets analyzed; the number of positively selected sites has likely
  been "vastly underestimated" by constant-ω methods.

## 7. Load-bearing statements — VERBATIM (license: CC-BY, permissive → verbatim allowed)
License basis: "This is an open-access article distributed under the terms of the Creative
Commons Attribution License" (copyright line). Quotes are short and load-bearing:

1. Question framing (Abstract): "We present a mixed effects model of evolution (MEME) that
   is capable of identifying instances of both episodic and pervasive positive selection at
   the level of an individual site."
2. The core adaptation (Introduction): "MEME allows the distribution of [ω] to vary from
   site to site (the fixed effect) and also from branch to branch at a site (the random
   effect)." (ω rendered as an image in HTML; bracketed here.)
3. Test-statistic recommendation (Methods, "The MEME test…"): "we determined that an
   appropriate asymptotic test statistic for testing [the] worst-case null of β⁺ = β⁻ = α
   is a 0.33 : 0.3 : 0.37 mixture of χ²₀, χ²₁ and χ²₂". (Functional-string values verbatim;
   source phrasing has a doubled "of".)
4. Error-rate scope (Discussion): "Our inference is performed in a site-wise rather than an
   alignment-wide manner, and we therefore control the site-wise rather than the
   family-wise error rate. We do not recommend combining the results of multiple site-wise
   inferences to perform alignment-wide inference."
5. Branch-inference limit (Discussion): "one cannot simultaneously infer both the site and
   the branch subject to diversifying selection." (the "selection inference uncertainty
   principle").

## 8. Stated scope, assumptions, limitations (source's own caveats)
- **Independence of branch categories** is a computational-tractability assumption;
  violated if ω changes slowly across the phylogeny (neighboring branches' ω correlated).
  Effect of ignoring this correlation left to future work.
- **Null model is strictly neutral (ω = 1), not neutral-or-purifying.** The authors call
  the correct null (neutral-or-purifying) too modeling-sensitive to justify generally; the
  neutral null is a worst case, so reported p-values are **upper bounds** → conservative.
- ω is **not allowed to change mid-branch** (unlike covarion models); effect unclear.
- Requires a **measurable proportion of lineages (5–10%)** to undergo non-synonymous
  evolution at the site; single-substitution adaptive sweeps that then fix give ω-based
  methods "very little power."
- Assumes relative branch lengths and mutational biases from the simpler alignment-wide
  codon model are shared across sites and adequate; nucleotide branch lengths may bias.
- **Branch-level (EB) inference cannot be recommended** except for exploration/visualization.
- Point estimates of per-site parameters have large errors (single-site inference); the
  LRT, not the point estimates, is what decides selection.

## 9. Failure modes / invalidity patterns
- **Anti-conservative at high divergence** (> 0.4 nucleotide substitutions/site): Type-I
  rate can exceed nominal — false positives inflated on highly divergent alignments.
  (Conservative at low divergence < 0.1; nominal 0.1–0.4.)
- **Recombination** in the alignment must be corrected for (a partitioning approach;
  details in Text S1) — uncorrected recombination is a violated assumption. (Japanese
  encephalitis virus env analysis detected and corrected recombination.)
- **Branch-site EB false positives**, especially on **neutrally evolving background**:
  large fractions of background branches falsely flagged (e.g. 18 neutral branches called
  selected at >5%; ≥1 background branch falsely called in 86.5% of neutral-background
  cases). Symptom/guard: treat EBF calls (threshold EB > 20) as exploratory only.
- **Missed sites**: pervasive sites with FEL p just below 0.05 (0.0346–0.05) fall to
  MEME p > 0.05 (conservative miss). Sites with only a single fixed adaptive substitution:
  low power by construction.
- **p-values are upper bounds** because of the strict-neutral null — real significance may
  be stronger, but the method will not be anti-conservatively *liberal* on that account;
  the liberal-risk symptom instead comes from high divergence.
- **Multiple-testing caution**: q-values are typically much larger than p-values;
  p-values (even corrected) must not be used to estimate expected false discoveries — use
  the reported FDR q-value upper bounds.

## 10. What the source does NOT address (confident silences)
- **FUBAR is not mentioned** (it postdates this paper); MEME is benchmarked only against
  **FEL**, with REL appearing solely as the method used by cited comparison studies
  (Yokoyama, Chen), not run head-to-head here.
- No comparison to fixed-effects *branch-site* tests run directly (discussed conceptually,
  not benchmarked in the main text).
- Practical application guidelines, simulation-strategy details, per-gene discussion, the
  empirical derivation of the mixture-χ² coefficients, and recombination-correction
  mechanics are deferred to **Text S1** (not read here).
- No software/version, runtime, or command-line usage is given in the main text (HyPhy
  implementation is not named or version-pinned in the read portion).
- No treatment of alignment-error or model-misspecification sensitivity beyond divergence
  and recombination.

## 11. Open questions / ambiguities the source leaves unresolved
- Whether accounting for cross-branch ω correlation (dropping the independence assumption)
  would materially change inference or justify the added complexity — flagged for future
  research.
- Effect of the no-mid-branch-ω-change restriction; testable via a "mixed effects covarion"
  model the authors propose but do not build.
- Whether the exact mixture-χ² coefficients (0.33:0.30:0.37) generalize beyond the
  simulated conditions used to derive them (empirical, not closed-form).
- Whether **p ≤ 0.05** is a firm recommendation or a nominal convention (see §12).

## 12. Guidance answers
- **Exact question MEME answers vs. FEL / gene-wide.** MEME tests, per site, whether a
  **subset of branches** evolved with ω > 1 (β⁺ > α) while others are neutral/purifying —
  i.e. **episodic** diversifying selection. It lets ω vary **both** site-to-site (fixed
  effect) **and** branch-to-branch within a site (random effect). FEL fits a **single** α,β
  per site with **no across-branch variation** (tests α = β via χ²₁), so it detects only
  **pervasive** (site-constant) selection and averages episodic signal away. Gene-wide
  (original) models share one ω across **all sites**, giving little power. Stated
  precisely: MEME = fixed-effect-across-sites + random-effect-across-branches; FEL =
  fixed-effect-across-sites + constant-across-branches. (Verbatim question-framing quotes:
  §7 items 1–2.)
- **Model/mixture structure + test statistic + threshold.** Per-site two-class mixture over
  branches: rate β⁻ ≤ α with weight q⁻, rate β⁺ (unrestricted) with weight q⁺ = 1 − q⁻;
  four per-site fixed parameters α, β⁻, β⁺, q⁻; likelihood marginalized over all 2^B branch
  assignments via a mixture-transition-matrix pruning computation. LRT (alternative vs.
  null β⁺ ≤ α) with asymptotic distribution a **0.33 : 0.30 : 0.37 mixture of χ²₀, χ²₁,
  χ²₂** (§7 item 3, verbatim). **Threshold**: the paper uses **p ≤ 0.05** as the *nominal*
  significance level throughout but does **not** present 0.05 as a defended recommendation
  — it is convention-level. Its actual methodological prescriptions are (a) use the
  mixture-χ² null distribution (not plain χ²₁, which is too liberal), (b) control the
  **site-wise** error rate and not combine sites into a family-wise test (§7 item 4), and
  (c) report **FDR q-value upper bounds** for multiple testing. So: the specific 0.05 cutoff
  = convention; the mixture-χ² statistic + site-wise/FDR handling = the paper's own.
- **Power vs FEL/FUBAR and Type-I control.** vs **FEL**: answered in detail (§6) — MEME
  ≥ FEL power everywhere, dramatically higher under episodic selection (FEL 0–10% vs MEME
  4–53% at q⁺ = 0.1; FEL averages ~24%/~67% of MEME's power at 25%/50% selected lineages),
  with ≤ 5% power loss under pervasive selection. **FUBAR is not addressed** by this source
  (postdates it). Type-I: well controlled at the strict-neutral worst-case null; conservative
  at small N / low divergence, nominal at medium divergence, slightly anti-conservative at
  > 0.4 subst/site; reported p-values are conservative upper bounds.
