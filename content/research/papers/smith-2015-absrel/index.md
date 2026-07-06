---
title: "Less is more: an adaptive branch-site random effects model for efficient detection of episodic diversifying selection"
type: paper
source_id: smith-2015-absrel
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC4408413/
doi: 10.1093/molbev/msv022
access_date: "2026-07-05"
license: LicenseRef-all-rights-reserved
attribution: "Smith MD, Wertheim JO, Weaver S, Murrell B, Scheffler K, Kosakovsky Pond SL. Molecular Biology and Evolution 32(5):1342-1353, 2015. DOI 10.1093/molbev/msv022. PMCID PMC4408413. Full text read via PMC; copyright 'The Author 2015 ... All rights reserved', no CC license."
derived: own-words-summary
---

# Smith et al. 2015 — aBSREL (adaptive Branch-Site Random Effects Likelihood)

## 1. Citation
Smith MD, Wertheim JO, Weaver S, Murrell B, Scheffler K, Kosakovsky Pond SL. 2015.
"Less is more: an adaptive branch-site random effects model for efficient detection of
episodic diversifying selection." *Molecular Biology and Evolution* 32(5):1342–1353.
DOI: 10.1093/molbev/msv022. Open-access copy: PMC4408413
(https://pmc.ncbi.nlm.nih.gov/articles/PMC4408413/). Accessed 2026-07-05.

## 2. Access note
Full text read via PubMed Central (PMC4408413). Copyright statement on the page:
"© The Author 2015. Published by Oxford University Press on behalf of the Society for
Molecular Biology and Evolution. **All rights reserved.**" Treated as restrictive →
**own-words paraphrase mode** for §7; functional strings (method names, criterion names,
mixture proportions, parameter symbols) reproduced verbatim as facts.

## 3. Thesis
A branch-site test whose key innovation is *variable parametric complexity chosen with an
information-theoretic criterion* — fitting an adaptive (per-branch) number of ω rate classes
rather than a fixed number — can match or beat best-in-class episodic-selection tests while
running roughly an order of magnitude (up to three orders of magnitude) faster.

## 4. Problem & context
Existing branch-site models (Nielsen–Yang style, as in codeml/PAML; and the earlier BSREL)
impose the *same* model complexity on every branch — e.g. BSREL fixes the number of ω rate
classes at Kb = 3 for all branches. Forcing that complexity everywhere overfits short/low-
information branches and is computationally expensive on large phylogenies. aBSREL instead
lets each branch use only as many ω classes as the data support.

## 5. Method / approach
- Detects **episodic diversifying selection**: which individual branches of a phylogeny show
  positive selection (an ω = dN/dS rate class > 1), rather than assuming selection is constant
  across sites or lineages.
- Per-branch adaptive complexity: the number of ω rate classes on branch b, **Kb**, is chosen
  from the data. Model selection uses the **small-sample Akaike Information Criterion (AICc;
  Sugiura 1978)** to pick the optimal number of rate categories per branch.
- Greedy step-up fitting: start from Kb = 1 on all branches (a single-ω / MG94-equivalent
  baseline), process branches (longest first), incrementally add a rate class to a branch, and
  keep the addition only if AICc improves. Likelihood is obtained by marginalizing over ω-class
  assignments via the pruning algorithm.
- Only the highest ω class (k = Kb) is allowed to exceed 1 (permit positive selection); the
  remaining classes are constrained to [0,1].
- **Test statistic:** a likelihood-ratio test (LRT) on each tested branch — null (no positive-
  selection class on that branch) vs. the fitted aBSREL model.
- **Null distribution:** the authors report the asymptotic LRT null for these multi-component
  mixture models is not a simple χ²; it is best described by a multi-component χ² mixture. The
  mixture allocating **50% to χ²₀, 20% to χ²₁, and 30% to χ²₂** is stated to agree well with the
  tail of an empirical LRT distribution built from 50,000 samples. P-values are computed against
  this mixture.
- **Multiple-testing correction (key claim):** when more than one branch is tested, the
  **Holm–Bonferroni** sequential rejection procedure is applied to control the family-wise error
  rate (FWER). This is aBSREL's built-in correction for testing many branches.
- Significance is reported at the nominal P ≤ 0.05 level; for multi-branch runs the Holm–
  Bonferroni-corrected P-values are the ones used for calls (uncorrected P-values may also be
  reported for exploratory purposes).

## 6. Key claims / findings
- On the Selectome data (reported as 8,893 genes, 493,172 branches), **over 80% of branches in
  typical gene phylogenies** are adequately modeled with a **single ω-ratio (Kb = 1)** model —
  i.e., the extra rate classes BSREL forces everywhere are usually unnecessary.
- Mean Kb across all branches ≈ **1.16**, versus the fixed Kb = 3 of BSREL.
- Branches inferred to need multiple ω classes tend to be **longer branches** and come from
  **longer alignments** (more information available).
- Speed: aBSREL runs **up to three orders of magnitude faster** than the compared Nielsen–Yang
  branch-site methods on the same hardware; benefit grows with data-set size. Example: an Avian
  influenza data set cited as dropping from an estimated ~1.5 years to ~6.5 hours.
- False-positive rate is well controlled (< 5%) under strict neutrality in simulation.

## 7. Load-bearing statements (own-words paraphrase — restrictive license; functional strings verbatim)
- Model-complexity selection: aBSREL infers the optimal number of ω rate categories per branch
  using the small-sample AIC — functional string verbatim: **AICc (Sugiura 1978)**.
- Multiple-testing correction: when more than one branch is tested, aBSREL applies the
  **Holm–Bonferroni** sequential rejection procedure to control the **family-wise error rate**.
  (Paraphrase of the source's statement; "Holm–Bonferroni" and "family-wise error rate" are the
  verbatim functional terms.)
- LRT null: the source states the null LRT distribution for these mixture models is a
  multi-component χ² mixture, well approximated by **50% χ²₀ + 20% χ²₁ + 30% χ²₂** (proportions
  verbatim), matched to an empirical distribution of 50,000 samples.
- Design payoff (own words): applying different-complexity models to different branches gives
  performance matching or exceeding best-in-class approaches while running about an order of
  magnitude faster.

## 8. Stated scope, assumptions, limitations (the source's own caveats)
- Model selection and hypothesis testing are done on the *same* data: aBSREL infers its model
  from the data then tests on that same data, which departs from the classical separation of
  model selection from inference. Authors note this mirrors common practice (e.g. the ModelTest
  approach) but flag it.
- A single inferred rate category is ambiguous: it can mean little site-to-site ω heterogeneity
  on that branch, but a single class can also be inferred even when substantial heterogeneity is
  present — inference of site-to-site variation at one branch is information-limited.
- Short branches carry limited information for detecting multiple ω classes.

## 9. Failure modes / invalidity patterns
- **Very short branches:** insufficient substitutions to support (or detect) multiple ω classes;
  power to detect episodic selection is low.
- **Saturation on very long branches:** reduces discriminatory power.
- **Denser taxon sampling can hurt:** adding sequences shortens average branch length, which
  dilutes per-branch power.
- **Wrong null distribution = miscalibrated p-values:** using a naive single χ² asymptotic
  instead of the multi-component χ² mixture would misstate significance — the mixture null is
  the correct calibration.
- **Skipping the correction on multi-branch scans inflates false positives:** testing many
  branches without Holm–Bonferroni FWER control is the failure the built-in correction guards
  against.

## 10. What the source does NOT address (confident silences within what was read)
- Does not describe a change in the correction procedure for a pre-specified foreground set vs.
  scanning all branches — the correction is applied when >1 branch is tested; the read text does
  not present a separate protocol for a priori foreground designation. [summarizer-inferred] that
  the same Holm–Bonferroni scheme is intended for the tested set whatever its size.
- Does not (in the portion summarized) give a synonymous-rate-variation treatment beyond the
  branch-site ω framework.

## 11. Open questions / ambiguities
- Exact p-value threshold semantics after Holm–Bonferroni (per-family α) are not restated beyond
  the nominal 0.05 and FWER control.
- The single-rate-class ambiguity (limitation #2) leaves open how often true heterogeneity is
  masked in practice.

## 12. Guidance answers
- **Exact question aBSREL answers / adaptive rate classes:** It identifies *which branches* of a
  phylogeny show episodic diversifying (positive) selection, fitting an **adaptive, per-branch
  number of ω rate classes (Kb)** selected by **AICc**, instead of a fixed 2- or 3-class model
  applied to every branch (BSREL fixes Kb = 3). Only the top ω class may exceed 1.
- **Multiple-testing correction (name + threshold):** **Holm–Bonferroni** sequential rejection
  procedure, controlling the **family-wise error rate**, applied whenever more than one branch is
  tested. No single universal numeric cutoff beyond the nominal P ≤ 0.05; correction adjusts the
  rejection thresholds across the tested branches.
- **Test statistic + threshold; all-branches vs pre-specified:** Likelihood-ratio test per
  branch, p-values from a **50% χ²₀ + 20% χ²₁ + 30% χ²₂** mixture null; reported at P ≤ 0.05 with
  Holm–Bonferroni for multi-branch runs. The read text does not state a *different* correction
  for a pre-specified foreground vs. scanning all branches — correction triggers on testing >1
  branch (see §10).
- **Advantage over codeml/PAML branch-site for exploratory (no a-priori foreground):** dramatically
  faster (up to three orders of magnitude; the Avian-influenza example ~1.5 yr → ~6.5 h), and it
  avoids forcing uniform model complexity, giving controlled false-positive behavior when
  background lineages have rate variation — making genome-scale, no-foreground exploratory scans
  tractable.
