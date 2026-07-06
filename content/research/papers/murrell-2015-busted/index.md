---
title: "Gene-wide identification of episodic selection"
type: paper
source_id: murrell-2015-busted
source_url: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4408417/
doi: 10.1093/molbev/msv035
access_date: "2026-07-05"
license: LicenseRef-all-rights-reserved
attribution: "Murrell B, Weaver S, Smith MD, Wertheim JO, Murrell S, Aylward A, Eren K, Pollner T, Martin DP, Smith DM, Scheffler K, Kosakovsky Pond SL. Molecular Biology and Evolution 32(5):1365-1371, 2015. DOI 10.1093/molbev/msv035. PMID 25701167; PMCID PMC4408417. Full text read via PMC; copyright 'The Author 2015 ... All rights reserved', no CC license."
derived: own-words-summary
---

# Gene-wide identification of episodic selection (BUSTED)

## 1. Citation
- Murrell B, Weaver S, Smith MD, Wertheim JO, Murrell S, Aylward A, Eren K, Pollner T, Martin
  DP, Smith DM, Scheffler K, Kosakovsky Pond SL. 2015. "Gene-wide identification of episodic
  selection." *Molecular Biology and Evolution* 32(5):1365–1371.
- DOI: 10.1093/molbev/msv035. PMID 25701167; PMCID PMC4408417.
- Article type: Letter (Discoveries/Letter to the editor).
- Open-access URL read: PMC full text at https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4408417/
  (access date 2026-07-05).

## 2. Access note
Full text read via PMC (body, tables 1–2, figure legends 1–3, references). Copyright:
"© The Author 2015. Published by Oxford University Press on behalf of the Society for Molecular
Biology and Evolution. **All rights reserved.**" No CC license. Supplementary table S1 (a PDF)
was not opened. No paywall boundary within the main text — the entire letter was readable.

## 3. Thesis (1 sentence)
BUSTED (branch-site unrestricted statistical test for episodic diversification) is a gene-wide
likelihood-ratio test that asks whether *at least one site* has been under positive selection on
*at least one* (foreground) branch, modeling ω as varying stochastically over both branches and
sites.

## 4. Problem & context
- No uncontroversial way exists to answer "has a particular gene evolved under positive
  selection?" ω = dN/dS distinguishes purifying (ω<1), neutral (ω=1), diversifying (ω>1), but
  many models make different biological assumptions and answer different versions of the question.
- The paper targets whole-gene detection while accounting for selection varying site-to-site and
  over time (branch to branch).
- Motivating critique: Lu and Guindon (2014) used MEME (a *site-level* method) to infer
  *gene-wide* selection; the authors state this is an approach they "cannot recommend" — combining
  per-site results under false-discovery-rate control loses power for gene-wide detection,
  especially with few taxa.
- BUSTED is built on the unrestricted branch-site random effects (BS-REL) model of Kosakovsky
  Pond et al. (2011), which lets ω vary branch-to-branch by marginalizing over a combinatorially
  large number of ω-to-branch assignments.

## 5. Method / approach
### Model structure
- BS-REL framework with **three rate categories** c ∈ {1,2,3}. Instantaneous rate matrix Q_c;
  the (i,j) off-diagonal entry uses the standard codon-substitution structure (functional form,
  verbatim):
  - synonymous (single-nucleotide change, same amino acid): `θ_ij · π_j`
  - nonsynonymous (single-nucleotide change, different amino acid): `ω_c · θ_ij · π_j`
  - `0` for changes requiring >1 nucleotide difference (δ(i,j) > 1)
  - diagonal = negative row sum.
- δ(i,j) = number of nucleotide differences between codons; AA(x) = amino acid of codon x.
- **θ (nucleotide substitution rates): assumed general-time-reversible (GTR) form.** (The paper
  does *not* name "MG94" or "MG94×REV" — it describes the generic codon structure with a GTR
  nucleotide component; see guidance answers.)
- **Π (equilibrium codon frequencies): CF3x4 corrected empirical estimator** (Kosakovsky Pond
  et al. 2010), **nine parameters**.
- ω_c = nonsynonymous/synonymous ratio for category c.

### Foreground/background partition
- Branches split into two partitions: **Foreground** and **background**. Within each partition,
  the three-category parameters are shared across all branches and sites.
- Constraint on the ω distribution (verbatim form): `ω_1 ≤ ω_2 ≤ 1 ≤ ω_3`.
- Each category has a weight p_c with `Σ p_c = 1`.
- ω distributions estimated separately for foreground vs. background branch sets.
- **When no foreground set is specified, all branches are foreground** (whole-tree test).

### The gene-wide test (the LRT)
- Question tested: whether at least one site is under positive selection on at least one
  foreground branch. (Selection may also be present on background branches; ω may vary over sites
  and time in both partitions.)
- **Alternative model:** the full model above (foreground ω_3 free, ω_3 ≥ 1 allowed).
- **Null model:** constrain `ω_3 = 1` over the foreground branches.
- Rejecting the null ⇒ at least one site is under positive selection at least some of the time on
  the foreground branches.
- **Test-statistic asymptotic distribution:** an analytically intractable *mixture* of χ²₀,
  χ²₁, and χ²₂ (Self and Liang 1987; Murrell, Wertheim et al. 2012). The χ²₂ component arises
  when the null has ≥2 rate classes with ω=1 (alternative reduces to null losing two degrees of
  freedom — e.g. ω_3=1 makes p_3 unidentifiable, or p_3=0 makes ω_3 unidentifiable).
- **The authors "err conservatively with χ²₂"** — i.e. compute p-values against a χ²₂ reference,
  which is conservative. They note power could be improved with a parametric-bootstrap null
  distribution "at substantial computational expense."

### Optimization / implementation procedure
- To improve convergence: estimate initial branch lengths using the **GTR nucleotide model**,
  optimize the likelihood under the unconstrained **alternative** model, then under the **null**
  model with `ω_3 = 1`.
- Implemented in the **HyPhy batch language** (Kosakovsky Pond et al. 2005), which does all
  likelihood calculations and optimizations. Available in the HyPhy distribution
  (`http://github.com/veg/hyphy`, tutorial `http://bit.ly/BUSTED_tutorial`, accessed 2015-03-12)
  and as a web app at `www.datamonkey.org/busted` with a D3-based widget for interactively
  designating foreground branches.

### Site-level evidence ratios (exploratory, NOT a test)
- For individual sites the authors recommend **MEME**, not BUSTED. But the gene-wide model can be
  reused as an *exploratory* per-site measure.
- Compare per-site likelihood under alternative M vs. M_s (which sets ω_3=1 for foreground
  branches at site s). Reuses alternative-model parameters with **no reoptimization** (zero extra
  cost).
- Evidence ratio (verbatim): `ER_s = 2 × log(l_s)`, where `l_s = P(D_s | M) / P(D_s | M_s)`,
  scaled like an LRT statistic.
- Caveat: this does **not** obey asymptotic sampling properties and does not constitute a valid
  likelihood ratio test.

## 6. Key claims / findings (atomic)
- **Type I error is conservative.** On the strict-null / Lu–Guindon null simulations, empirical
  Type I error rates were consistently *below* nominal levels (table 1; e.g. rows with p_s=p_b=0
  give BUSTED detection 0.016, 0.006, 0.008, 0.012 vs. nominal 0.05 across trees of 16/16/32/64
  sequences). Attributed to the conservative χ²₂ statistic.
- **Power increases rapidly with ω_3.** Simulating under the alternative fit to sperm lysin data
  (ω_1=0 at 57%, ω_2=1 at 33%, ω_3 gets the remaining 10% weight), power rose sharply as
  simulated ω_3 grew (fig. 2A).
- **Competing covarion tool (fitmodel) was anticonservative** under these conditions: false
  positive rate **13% at P≤0.01** and **23% at P≤0.05** (fig. 2B). After calibrating cutoffs to
  achieve the nominal Type I rate, BUSTED was more powerful (fig. 2C).
- **Vs. Nielsen–Yang branch-site (NYbs):** with the correct foreground specified, BUSTED
  outperforms NYbs *unless* the alignment is small with only one or two foreground branches.
- **Vs. fitmodel with known foreground:** BUSTED (which can use foreground info) outperforms
  fitmodel (which cannot).
- **Whole-tree foreground:** BUSTED beats fitmodel when a moderate (20%) but not large (40%)
  proportion of sites are under selection, unless the branch proportion is too low for either.
- **HIV-1 RT drug resistance (empirical):** using BUSTED's approximate site-wise evidence ratios
  with a threshold informed by a χ²₁ distribution at **P<0.01**, on the same foreground partition
  as Murrell, de Oliveira et al. (2012). True positives / all positives (gold standard
  hivdb.stanford.edu): **BUSTED 13/15, MEDS 13/17, FEEDS 3/6, EDEPS 13/16.** BUSTED (stochastic
  branch variation, non-directional) matched purpose-built directional methods.
- **FEEDS is the closest benchmark** (one ω per site on foreground, nuisance ω on background); it
  had little power here because averaging ω over all foreground branches at a site obscures ω>1 on
  a subset of lineages — BUSTED makes no such homogeneity assumption.
- **Large-scale screen:** BUSTED run on **10,779 Euteleostomes gene alignments** (Selectome v06).
  At **P≤0.05, 2,681 (24.87%)** showed evidence of episodic diversifying selection.
- **Correlates of detection:** longer alignments → higher positive rate (number of sites is the
  best sample-size proxy); number of sequences largely uninformative; no power loss from codon
  saturation across a realistic tree-length range; ML ω_3 estimate positively correlated with
  detection.
- **Empirical infinity for ω_3 ≈ 40:** the ω_3 detection trend flattens near ω_3=40 because
  increasing ω_3 further barely changes the likelihood — "≈40 is the empirical infinity" in this
  application (practical upper bound on estimable ω_3).

## 7. Load-bearing statements (OWN-WORDS paraphrase — restrictive license; functional strings verbatim)
- BUSTED tests whether *at least one site* is under positive selection on *at least one*
  foreground branch; the null constrains foreground `ω_3 = 1` and rejecting it implies some site
  is positively selected some of the time on foreground branches. (paraphrase of New Approaches,
  "Gene-Wide Test of Positive Selection")
- The LRT statistic's asymptotic distribution is an intractable mixture of `χ²₀, χ²₁, χ²₂`; the
  authors compute conservatively against `χ²₂`. (paraphrase, same section)
- For per-site questions the authors recommend MEME, not BUSTED; the per-site evidence ratio
  `ER_s = 2 × log(l_s)` is exploratory and not a valid LRT. (paraphrase, "Evidence of Selection
  at Individual Sites")
- The authors caution against using a site-level method (MEME) to test gene-wide selection — an
  approach they cannot recommend. (paraphrase of intro + Discussion)
- Specifying a priori foreground lineages lets BUSTED test focused hypotheses while modeling
  flexible selection in the rest of the tree; modeling the background is essential so the test is
  not confounded by unmodeled positive selection on background branches. (paraphrase, Discussion)

## 8. Stated scope, assumptions, limitations (the source's own)
- Shares limitations common to codon models: uses a **fixed multiple sequence alignment**; treats
  all amino acids as equally exchangeable; allows only **single-nucleotide** instantaneous
  substitutions; does not account for selection at RNA/DNA level (could bias inference); does
  **not explicitly model recombination**.
- The random-effects assumption: selective patterns change rapidly so the process on a branch is
  independent of neighboring branches (no autocorrelation) — contrasted with covarion models that
  model autocorrelation.
- The conservative χ²₂ reference trades power for controlled Type I error; parametric bootstrap
  could recover power at high computational cost.
- Per-site evidence ratios do not obey asymptotic sampling properties (not a valid test).

## 9. Failure modes / invalidity patterns
- **Wrong level of inference:** using a per-site method (MEME) to draw gene-wide conclusions loses
  power (FDR correction cost), especially with few taxa — the paper's central cautionary example
  (aimed at Lu & Guindon 2014).
- **Unmodeled background selection confounds the foreground test:** if positive selection on
  background branches is not modeled, a foreground test can be confounded (hence the need to model
  flexible selection across the whole tree).
- **Anticonservative competitor behavior:** fitmodel (covarion) produced inflated false positives
  (13% at P≤0.01, 23% at P≤0.05) when data had branch-to-branch ω variation but no positive
  selection — the authors note it is "unclear why" this happens. Symptom: false-positive rate far
  above nominal on null data.
- **Homogeneity assumption in FEEDS-style tests:** averaging one ω per site across all foreground
  branches obscures ω>1 confined to a subset of lineages → low power.
- **ω_3 estimation ceiling (~40):** ω_3 estimates saturate near the "empirical infinity" (~40);
  larger true ω_3 is not distinguishable because likelihood barely changes — interpret large ω_3
  point estimates cautiously. [summarizer-inferred that this is an interpretation caveat; the
  paper states the flattening/empirical-infinity fact.]
- **Small alignments / very few foreground branches:** BUSTED does not beat Nielsen–Yang when the
  alignment is small with only one or two foreground branches.
- **Sample-size dependence:** number of *sites* (alignment length), not number of sequences,
  drives power; short genes have less power.

## 10. What the source does NOT address
- **No output JSON field names / no parser schema.** This 2015 letter documents the model and
  HyPhy-batch implementation only; it names no output-file field (e.g. no "test results"
  p-value key). Those come from later HyPhy/datamonkey versions, not this paper.
- **No pinned HyPhy version number.** It cites HyPhy (Kosakovsky Pond et al. 2005) and the veg
  GitHub repo but states no minimum version (nothing like "≥2.5.x").
- No formal per-site or per-branch *testing* procedure (only exploratory evidence ratios;
  localization is delegated to MEME / other methods).
- No explicit recommended universal p-value cutoff mandated by the method (see below).
- Does not model recombination, RNA/DNA-level selection, synonymous-rate variation, or
  multi-nucleotide substitutions (listed as future work).

## 11. Open questions / ambiguities the source leaves unresolved
- Why fitmodel is anticonservative under independent branch-to-branch ω variation with no
  positive selection is explicitly stated as unclear.
- The consequence of the covarion constant-switching-rate homogeneity assumption is called
  "unexplored."
- Whether parametric-bootstrap nulls (to recover power lost to χ²₂ conservatism) are worthwhile
  in practice is left open (cost concern only).

## 12. Guidance answers
**Q1 — exact question & null model, how the LRT is formed.** Answered. BUSTED tests whether at
least one site is under positive selection on at least one foreground branch. Model: BS-REL,
three ω categories constrained `ω_1 ≤ ω_2 ≤ 1 ≤ ω_3` with weights p_c (Σ=1), estimated
separately for foreground vs. background. **Alternative** leaves foreground ω_3 free (≥1);
**null** constrains foreground `ω_3 = 1`. LRT = 2×(logL_alt − logL_null) [standard LRT form;
paper gives the null/alt constraint], referenced conservatively against a χ²₂ distribution (true
asymptotic law is an intractable χ²₀/χ²₁/χ²₂ mixture).

**Q2 — codon substitution model name.** Partially answered / important correction: the paper does
**not** write "MG94" or "MG94×REV." It specifies the standard codon-substitution matrix structure
with a **GTR (general-time-reversible) nucleotide substitution component** (`θ`) and **CF3x4**
corrected empirical codon frequencies (`Π`, nine parameters), within a **BS-REL** framework.
Initial branch lengths are seeded with the **GTR nucleotide model**. If a note or skill needs the
"MG94×REV" label, that is later-HyPhy terminology, not stated in this paper — flag as convention,
do not cite to this source.

**Q3 — test statistic + significance threshold; is a cutoff stated?** The statistic is the LRT
against χ²₂ (conservative). **No single mandated cutoff.** The paper reports power at "various
cutoffs" and uses **P≤0.05** (Type I sims and the 24.87% Selectome screen) and **P≤0.01**
(fitmodel FPR quote; also the χ²₁-informed **P<0.01** threshold for the exploratory HIV site
evidence ratios). So: cutoff is left to the user; P≤0.05 is the de facto value used in the
paper's own analyses.

**Q4 — what BUSTED does NOT do (site/branch localization).** Answered explicitly. For selection
at *individual sites* the authors recommend **MEME**, not BUSTED. BUSTED gives only an
*exploratory*, non-test per-site evidence ratio (`ER_s = 2 × log(l_s)`) that "does not constitute
a valid likelihood ratio test." BUSTED does not localize which sites or which branches are under
selection as a formal test. (The paper does not mention aBSREL by name.)

**Q5 — output-JSON field names a downstream parser keys on.** NOT answered. This 2015 letter
documents no output-file format or JSON field names (e.g. no "test results" p-value key). Those
belong to later HyPhy/datamonkey releases; must be sourced elsewhere.

**Version pinning:** NOT answered. No HyPhy version stated (no "≥2.5.x"). Only the HyPhy citation,
`github.com/veg/hyphy`, and `datamonkey.org/busted` are given.
