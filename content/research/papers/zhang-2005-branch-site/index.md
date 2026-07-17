---
title: "Evaluation of an improved branch-site likelihood method for detecting positive selection at the molecular level"
type: paper
source_id: zhang-2005-branch-site
source_url: https://doi.org/10.1093/molbev/msi237
doi: 10.1093/molbev/msi237
access_date: "2026-07-05"
license: LicenseRef-all-rights-reserved
attribution: "Zhang J, Nielsen R, Yang Z. Molecular Biology and Evolution 22(12):2472-2479, 2005. DOI 10.1093/molbev/msi237. PMID 16107592. Read as the publisher PDF (msi237.pdf) via an Internet Archive Wayback capture of the OUP article-PDF URL; free PDF classified BRONZE (free-to-read, no CC license) - all rights reserved."
derived: own-words-summary
tags:
  - domain/dnds
  - domain/molecular-evolution
---

# Zhang, Nielsen & Yang 2005 — Evaluation of an improved branch-site likelihood method

## 1. Citation
Zhang J, Nielsen R, Yang Z. 2005. "Evaluation of an improved branch-site likelihood method for
detecting positive selection at the molecular level." *Molecular Biology and Evolution* 22(12):2472–2479.
DOI: 10.1093/molbev/msi237. Advance Access publication August 17, 2005; accepted August 8, 2005.
Associate Editor: Edward Holmes.
Access date: 2026-07-05. Full text obtained as publisher PDF (`msi237.pdf`, 8 pp.) via Internet
Archive Wayback capture of the OUP article-PDF URL.

## 2. Access note
Full text read (all sections, tables 1–5, figures 1–2 captions, references). No paywall boundary in
the copy read.
License/copyright posture: OUP journal; page carries "The Author 2005. Published by Oxford University
Press ... All rights reserved." Unpaywall/Semantic Scholar classify the free PDF as **BRONZE**
(free-to-read at publisher, `license: null`) — i.e. **all-rights-reserved, no reuse license**.
**Quoting mode used: own-words paraphrase for prose; numeric facts / null-distribution statements /
critical values / parameter names reproduced verbatim as functional strings (§7).**

## 3. Thesis
A modified branch-site model A is used to build two LRTs; only test 2 (fixing ω2=1 under the null) is
a valid direct test of positive selection — it has acceptable false-positive rates, is robust to
model-assumption violations, and is more powerful than the branch test, whereas test 1 cannot
distinguish relaxed constraint from positive selection.

## 4. Problem & context
Positive selection is tested via the dN/dS ratio (ω); ω>1 signals positive selection, ω<1 purifying,
ω=1 neutral. It is hard to detect because it often acts episodically on a few sites over short time,
masked by pervasive negative selection. Yang & Nielsen (2002) introduced branch-site models (branches
split a priori into foreground/background) but Zhang (2004) showed those tests were sensitive to model
assumptions and produced frequent false positives — specifically they could not distinguish
**relaxation of selective constraint** on the foreground from genuine **positive selection**. When
background sites under negative selection relax to neutral on the foreground, the old test wrongly
rejects the neutral null. This paper modifies the model and evaluates two resulting tests by
false-positive rate (type I error), power, and robustness via simulation, plus reanalysis of four real
data sets.

## 5. Method / approach

### Modified branch-site model A (Table 1)
Branches divided a priori into foreground (may have experienced positive selection) and background.
Four site classes:
- **Class 0** (proportion p0): conserved throughout tree, 0 < ω0 < 1 estimated (both background and
  foreground).
- **Class 1** (proportion p1): neutral throughout tree, ω1 = 1 (both background and foreground).
- **Class 2a** (proportion (1−p0−p1)·p0/(p0+p1)): background 0 < ω0 < 1, foreground ω2 > 1.
- **Class 2b** (proportion (1−p0−p1)·p1/(p0+p1)): background ω1 = 1, foreground ω2 > 1.

Model has four free parameters in the ω distribution: **p0, p1, ω0, ω2**.

### What changed vs Yang & Nielsen (2002) — the "improvement"
- Old branch-site **model A** fixed **ω0 = 0** (does not allow conserved sites with 0 < ω < 1); the
  authors call this "very unrealistic" and replace it by estimating **0 < ω0 < 1**.
- Old branch-site **model B** estimated **both ω0 and ω1** from the data. The new model instead
  **fixes ω1 = 1**, so that sites under weak constraint (ω close to but below 1) are lumped into the
  neutral class rather than being falsely claimed as positively selected.
So the modification is precisely: (a) free ω0 in (0,1) instead of ω0=0, and (b) fix ω1=1 instead of
estimating it. Same four-class foreground/background structure otherwise.

### The two LRTs (model A is the alternative in both)
- **Test 1**: null = site model **M1a** (Yang et al. 2000; Yang, Wong & Nielsen 2005), two site
  classes with 0 < ω0 < 1 and ω0=1 (i.e. ω=1) for all branches. Significance can arise from relaxed
  constraint OR positive selection → not a clean test of positive selection.
- **Test 2** = **branch-site test of positive selection** (recommended): null = branch-site model A
  with **ω2 = 1 fixed**. This null lets negatively-selected background sites be released to neutral on
  the foreground, so rejection is a direct signal of positive selection (ω2>1).

### Null distributions used
- **Test 1**: alternative has two more parameters (p2, ω2) than null → nominally χ²₂. Authors note the
  regularity conditions for the χ² approximation are **not satisfied** (p2=0 is on the boundary; when
  p2=0, ω2 is not identifiable); correct asymptotic distribution unknown.
- **Test 2**: one-sided (ω2≥1 constrained). Asymptotic null = **50:50 mixture of point mass 0 and χ²₁**
  (Chernoff 1954; Self & Liang 1987); critical values **2.71 (5%) and 5.41 (1%)**. **But** to guard
  against small samples and model-assumption violations they instead **use χ²₁** to perform the test
  (critical value 3.84 at 5%). See §6 and §7 for the exact dual recommendation.

### Site identification: NEB vs BEB
Once the LRT is significant, posterior probability that a codon belongs to the positive-selection
class is computed. **NEB** (naïve empirical Bayes; Yang & Nielsen 2002) uses MLEs but ignores their
sampling error. **BEB** (Bayes empirical Bayes; Yang, Wong & Nielsen 2005) accommodates MLE
uncertainty. Sites called at **90% and 95%** posterior-probability cutoffs.

### Simulation design
- Two unrooted model trees (Tree I, Tree II; fig. 1); molecular clock holds for synonymous rate.
- Sequence: 200 codons (some experiments 600 or 3,000), random start at an interior node, equal base
  frequencies, transition/transversion ratio κ = 4, nonsense mutations disallowed.
- codeml in **PAML** (Yang 1997) performs the likelihood analysis. Correct tree topology and correct
  foreground-branch identification assumed; branch lengths estimated by ML without clock.
- **5% significance level** used for LRTs.
- Five evolutionary schemes for ω across 10 domains (20 codons each; Table 2): X = normal gene
  evolution (varying purifying selection; avg ω 0.50); Y = partial relaxation (avg 0.88); Z = complete
  relaxation, all ω=1; U = X with some negatively-selected sites made positively selected (avg 0.97);
  V = more complex, some ω up some down (avg 0.96). U and V contain positively selected sites; X, Y, Z
  do not. Schemes X, Y, Z reused from Zhang (2004).
- ~2–3% of replicates where the alternative had lower log-likelihood than the null (optimization
  failure to find global max) were discarded and re-simulated until 200 usable replicates per
  condition.

## 6. Key claims / findings
- **Null-distribution proportion of zeros confirms the mixture.** Under the test-2 null (200 codons,
  1,000 data sets), the test statistic was 0 in **521/1,000** cases (~50%), matching the 50:50 mixture;
  at 3,000 codons it was 0 in **515/1,000**.
- **Empirical vs theoretical critical values, test 2 (200 codons):** empirical 10/5/1% = **1.75, 2.95,
  5.98**; χ²₁ = **2.70, 3.84, 5.99**; 50:50 mixture of 0 and χ²₁ = **1.64, 2.71, 5.41**. Conclusion:
  using χ²₁ makes the test too conservative; using the mixture makes it slightly too liberal (at
  n=200).
- **At 3,000 codons:** empirical 10/5/1% = **1.37, 2.57, 4.62**, smaller than the mixture values 1.64,
  2.71, 5.41 → at this length both the mixture and χ²₁ are conservative. The slight n=200 discrepancy
  is attributed to small sample size.
- **Test 1 null critical values (200 codons):** test statistic = 0 in **512/1,000**; empirical 10/5/1%
  = **2.33, 3.37, 6.10**; χ²₂ = **4.60, 6.63, 9.21** → using χ²₂ is conservative.
- **Adopted practice:** "In the rest of the paper, we use the χ²₂ and χ²₁ distributions for the two
  tests to guide against violations of model assumptions and small sample sizes." (i.e. test 2 in
  practice uses χ²₁ crit 3.84 at 5%, not 2.71.)
- **False-positive rate under a correct null (bg=X, fg=X):** both tests conservative, below nominal 5%
  (Table 3; e.g. Tree I-a: test 1 = 5/200 = 0.025, test 2 = 3/200 = 0.015).
- **Under relaxed constraint (bg=X, fg=Y or Z):** **test 1** rejects in ~40%–100% of replicates
  (Table 3) — as a test of positive selection these are unacceptably high false positives (e.g. Tree
  I-a fg=Y: 198/200 = 0.990; fg=Z: 200/200 = 1.000). **Test 2** stays at or below nominal 5% (e.g. Tree
  I-a fg=Y: 6/200 = 0.030; fg=Z: 5/200 = 0.025). → test 1 conflates relaxed constraint with positive
  selection; test 2 does not.
- **Robustness to positive selection on nearby background branches:** with foreground branch b (not
  under selection) surrounded by positively-selected background branches (scheme V), false positives
  for branch b at 5% were 0.5%/2.5%/3% (branch test / test 1 / test 2), and in a second layout
  0%/2.5%/1.5% → all three tests robust.
- **Power (bg=X, fg=U or V), Table 4:** branch-site tests significant in ~7.5%–17% of cases (Tree I);
  the branch test of Yang (1998) detected only 0%–2% (because avg foreground ω < 1). Branch-site tests
  markedly more powerful than the branch test. **Test 2 ≈ test 1 in power.**
- **Power drivers:** longer foreground branch → more power (branch b length 0.05→0.15/0.45 raised power
  ~3–7×); multiple foreground branches under the same scheme/sites → more power (Tree II d+c: test 2
  up to 0.330–0.435). Recent vs ancient branch: recent slightly easier, difference small and sometimes
  reversed. More/stronger positively selected sites → more power (e.g. 600 codons or ω raised from 4,2
  to 8,4 sharply increases detections).
- **NEB vs BEB (fig. 2):** under relaxed constraint (fg=Y or Z) **NEB** has excessively high
  false-positive rates for site identification and is "unusable." **BEB** keeps whole-sequence
  false-positive rates below nominal: fg=Y averages fB90=0.04, fB95<0.01; fg=Z averages fB90=0.09,
  fB95=0.04 (both below the 10%/5% nominal). Localized exceptions: fg=Z domains 9–10 had fB90≈0.2,
  fB95≈0.1.
- **BEB power to identify individual sites is very low** (f < 1% for truly positively-selected domains
  3 and 5 under schemes U/V). Detecting that positively selected sites *exist* is easier than
  identifying *which* sites.
- **Real data (Table 5, four Yang & Nielsen 2002 data sets):** conclusions unchanged vs old tests.
  Primate lysozyme (19 seq, 130 codons): test 1 2Δℓ=3.36 (P=0.19), test 2 1.48 (P=0.22) — not
  significant. Primate BRCA1 (8, 1160): test 1 8.10 (P=0.017), test 2 3.64 (P=0.056) — marginal.
  Phytochrome phyA-C/F (15, 1105): test 1 84.88, test 2 19.88 (both P<0.001). Phytochrome phyB-D/E
  (11, 1105): test 1 57.90, test 2 13.29 (both P<0.001). BEB at 95% cutoff: no site >95% in lysozyme
  or BRCA1; 27 sites in phyA-C/F; 19 sites in phyB-D/E (specific residue lists given, referenced to
  Zea mays phyA / Sorghum bicolor phyB sequences).

## 7. Load-bearing statements
**Mode: restrictive/all-rights-reserved → prose is own-words paraphrase; the following are reproduced
verbatim only as functional strings (numeric facts, distribution/df, critical values, parameter
names) per the functional-strings exception.**

- Verbatim (test-2 null distribution & critical values), p. 2474:
  "the asymptotic null distribution is a 50:50 mixture of point mass 0 and χ²₁, with the critical
  values to be 2.71 and 5.41, at the 5% and 1% levels, respectively (Chernoff 1954; Self and Liang
  1987). However, to guide against small sample sizes and against violations of model assumptions, we
  use χ²₁ to perform the test."
- Verbatim (critical-value tables, p. 2474): test 2 empirical 10/5/1% = 1.75, 2.95, 5.98; χ²₁ = 2.70,
  3.84, 5.99; 50:50 mixture of 0 and χ²₁ = 1.64, 2.71, 5.41. "use of the χ²₁ distribution makes the
  test too conservative, while use of the mixture makes the test slightly too liberal."
- Verbatim (adopted practice, p. 2474): "In the rest of the paper, we use the χ²₂ and χ²₁ distributions
  for the two tests to guide against violations of model assumptions and small sample sizes."
- Verbatim (test-1 non-regularity, p. 2473): "the regularity conditions for the χ² approximation are
  not satisfied, and the correct asymptotic distribution is unknown; that is, p2 = 0 is at the
  boundary of the parameter space under the alternative hypothesis, and when p2 = 0, χ2 [ω2] is not
  identifiable."
- Own-words (recommendation): test 2 is a direct test of positive selection and is recommended for
  real-data analysis; test 1 is not a reliable test of positive selection because it cannot separate
  positive selection from relaxed constraint on the foreground.

## 8. Stated scope, assumptions, limitations (source's own caveats)
- Branch-site model A makes many assumptions; the authors state it is "not entirely clear which of the
  assumptions are the most worrisome."
- Both null and alternative assume **no more than three site classes** (ω categories), while
  simulations used many more site classes.
- Model A assumes **one** positive-selection site class; schemes U and V had **two** classes of
  positively-selected sites with different ω.
- Only **two** branch types allowed (foreground vs background); reality may differ.
- Simulations assume **correct tree topology and correct foreground identification** and (for the null
  proportions) the molecular clock on synonymous rate.
- Authors caution the simulation is "limited in scope" and the tests "may fail under conditions not
  explored here."
- Power caveat: assuming all foreground branches share the same selection scheme and the same selected
  sites "may not be realistic for many data sets."

## 9. Failure modes / invalidity patterns
- **Test 1 used as a positive-selection test is invalid**: under relaxed constraint on the foreground
  (bg=X, fg=Y/Z) its rejection rate reaches ~40%–100% — it cannot distinguish relaxation from positive
  selection. Symptom/design: its null (M1a) differs from the alternative in a way that relaxation alone
  triggers.
- **NEB site identification is unreliable / "unusable"**: excessively high false-positive rates under
  relaxed constraint, and unreliable in small data sets. Use BEB instead.
- **Using χ²₁ for test 2 is deliberately conservative** (loses power) but is adopted as a guard against
  small samples and model-assumption violations; using the exact 50:50 mixture (crit 2.71 at 5%) is
  slightly liberal at short sequence lengths.
- **Optimization failure**: in ~2–3% of replicates the alternative log-likelihood fell below the null
  (failure to find the global maximum). Detector/symptom: alternative worse than null; remedy is
  multiple starting values / re-running (results were "virtually identical" across initial-value
  strategies).
- **Significant LRT but no high-posterior site (and vice versa)**: the test of positive selection can
  be significant while BEB shows no site >95% (power to localize is low); conversely a site can reach
  high BEB posterior while the LRT is not significant. Authors advise: in the latter case "the results
  should not be interpreted as providing evidence for positive selection."
- **Short sequences + weak positive selection** (small p2 and ω2 estimates): where old tests detect but
  are unreliable, confirm with branch-site test 2.

## 10. What the source does NOT address
- **Post-hoc / a-posteriori foreground selection**: not evaluated. All simulations and analyses assume
  the foreground branch is specified a priori and correctly; the paper gives **no** quantification of
  type-I inflation from choosing the foreground after inspecting the data. (See §12.)
- Effect of **tree-topology error or misidentified foreground** on type-I error (assumed correct).
- Multiple-testing correction across many candidate branches/genes.
- Behavior under recombination, alignment error, or GC-biased gene conversion.
- Alternative continuous ω distributions (only discrete site classes considered).

## 11. Open questions / ambiguities the source leaves unresolved
- Which specific model assumptions most damage reliability ("not entirely clear ... most worrisome").
- Whether the tests fail under conditions outside the simulated scope.
- The exact correct asymptotic null distribution for **test 1** (stated unknown; χ²₂ used as a
  conservative stand-in).
- How to reliably identify positively selected sites when per-site information is weak (BEB power low
  when selection affects only one/few lineages).

## 12. Guidance answers
- **Improved Model A vs Yang & Nielsen 2002 — what changed (how ω0 treated across classes):** Old
  model A fixed **ω0 = 0** for the conserved class; the new model estimates **0 < ω0 < 1** (site
  classes 0 and background of 2a use this ω0). Old model B estimated both ω0 and ω1; the new model
  **fixes ω1 = 1** (classes 1 and 2b/background). Purpose of fixing ω1=1: lump weakly-constrained sites
  (ω just below 1) into the neutral class so they are not falsely called positively selected. Structure
  = four classes 0/1/2a/2b, foreground ω2>1 for 2a and 2b; four free parameters p0, p1, ω0, ω2.
- **Null distribution of the branch-site LRT (test 2) — 50:50 mixture? crit 2.71 at 5%? Also χ²₁ /
  3.84 as conservative guard?** YES to all, and BOTH recommendations are present. The paper states the
  asymptotic null is "a 50:50 mixture of point mass 0 and χ²₁, with the critical values to be 2.71 and
  5.41, at the 5% and 1% levels" — **but immediately** says "to guide against small sample sizes and
  against violations of model assumptions, we use χ²₁ to perform the test" (χ²₁ crit values 2.70, 3.84,
  5.99 at 10/5/1%), and confirms this adopted-in-practice choice: "In the rest of the paper, we use the
  χ²₂ and χ²₁ distributions for the two tests." So the paper's real advice is two-sided: the
  theoretically correct cutoff is 2.71 (5%), yet they deliberately apply the more conservative χ²₁
  cutoff 3.84 (5%). A "2.71 NOT 3.84" flattening misrepresents the paper — it explicitly adopts χ²₁
  (3.84) for robustness.
- **Type-I / power under post-hoc vs pre-specified foreground — inflation quantified?** NOT addressed.
  The paper assumes correct a priori foreground identification throughout ("the correct ... foreground
  branches were assumed") and provides **no** number for a-posteriori foreground inflation. None given.
- **BEB posterior-probability values used/recommended:** cutoffs of **90% and 95%** posterior
  probability (same cutoffs for NEB). Nominal targets: fB90 ≤ 0.10 and fB95 ≤ 0.05 when no positive
  selection. BEB met these on whole-sequence averages (e.g. fg=Y: fB90=0.04, fB95<0.01; fg=Z: fB90=0.09,
  fB95=0.04); NEB did not. Real-data site calls reported at the **95%** cutoff. No higher/other
  threshold is recommended.
