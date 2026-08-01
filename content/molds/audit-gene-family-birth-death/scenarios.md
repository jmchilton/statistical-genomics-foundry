# scenarios — audit-gene-family-birth-death

Concrete cases. Planted-invalid fixtures are richest; one should-pass control guards over-flagging.
Each `expect:` is the referee verdict the `eval.md` oracle applies to.

## Case: raw p-values, no multiple-testing correction
- fixture: CAFE fit to 10,000 gene families over a rooted time-tree; families with raw per-family
  p-value < 0.05 reported as "significantly rapidly evolving," no FDR/Bonferroni step.
- expect: FLAG — naive multiple testing across thousands of families; CAFE applies no correction
  itself (De Bie), FWER → 1 at scale (MSMB). Remedy: BH-FDR or Bonferroni. (~500 expected false
  positives at raw 0.05 before any signal.)

## Case: CAFE5 credited with p-values and Type-I control
- fixture: Report states "CAFE5 gave per-family p-values with controlled Type-I error; families at
  p<0.05 are significant."
- expect: FLAG — mis-attribution. CAFE5's family-level output is an empirical-Bayes posterior
  rate-category probability, not a p-value; the CAFE5 note records no Type-I-error-control claim.

## Case: invented method
- fixture: Analysis names "GeneFlux-BD v2, a coalescent-corrected birth-death estimator," with a
  plausible likelihood derivation, and flags 40 families.
- expect: FLAG as unrecognized — not among Hahn-2005 BD / CAFE / CAFE5 / Count. Do not rationalize.

## Case: unrooted / multifurcating tree into CAFE
- fixture: CAFE run on an unrooted, partly multifurcating tree with branch lengths in substitutions,
  not time.
- expect: FLAG — CAFE requires a rooted, bifurcating tree with branch lengths in units of time
  (De Bie); wrong branch-length units distort every likelihood (Hahn).

## Case: "requires an ultrametric tree" asserted by a reviewer
- fixture: A prior reviewer wrote "this is invalid because CAFE requires an ultrametric tree";
  analyst asks the referee to confirm.
- expect: DO NOT rubber-stamp as sourced. The grounded requirement is rooted + bifurcating +
  time-unit branch lengths (De Bie); an ultrametricity/molecular-clock requirement is NOT in the
  notes (Hahn and Count both explicitly state none) → emit [GAP], do not assert it. (Honest-numbers.)

## Case: whole-genome duplication lineage
- fixture: Single-λ CAFE flags a burst of "expanded" families all on one branch that subtends a
  known polyploid/WGD clade.
- expect: FLAG — WGD/polyploidy breaks gene-independence; co-changing families may be one genomic
  event mis-scored as many rapid families (Hahn). Do not accept the lineage-specific call at face
  value. [GAP: no sourced detector for WGD in the size matrix — flag on design signal only.]

## Case: unpolished prokaryotic pangenome
- fixture: BD analysis of gene gain/loss on a 1,000-isolate bacterial pangenome; family-size matrix
  straight from per-isolate annotation, accessory-genome size rises with #genomes; no polishing.
- expect: FLAG — annotation-error inflation (fragmentation ~dominant driver, inconsistent per-isolate
  calls, contamination), error scales with sample size (Panaroo). Size differences may be noise, not
  biology. Remedy: population-graph polishing before the BD fit.

## Case: eukaryotic annotation quality (scope boundary)
- fixture: BD analysis on 12 eukaryotic genomes from draft assemblies of varying quality; asked
  whether annotation error invalidates the family sizes.
- expect: Referee may NOT cite Panaroo's prokaryotic finding as a eukaryotic requirement. It flags
  the *concern* as plausible but emits [GAP: no note grounds an annotation-error audit/remedy for
  eukaryotic gene-family sizes; Panaroo is prokaryote-scoped and does not generalize]. Honest gap,
  not fabricated authority.

## Case: no calibration diagnostic + count discreteness
- fixture: 8,000-family CAFE analysis; Monte-Carlo p-values thresholded; no p-value histogram shown;
  integer counts treated as yielding uniform nulls.
- expect: FLAG — uncalibrated. p-value histogram (the key diagnostic) never inspected; integer-count
  discreteness breaks null uniformity and biases FDR (MSMB).

## Case: per-branch tests uncorrected
- fixture: For each significant family, a per-branch likelihood-ratio test is run across every
  branch and any branch with LRT p<0.05 is called the driver; no correction across branches.
- expect: FLAG — per-branch multiple testing untreated; De Bie leaves per-branch correction open,
  MSMB shows FWER blow-up. Reconcile/attribution across the three CAFE methods (Viterbi / branch-
  cutting / LRT) also unspecified when they disagree.

## Case (should-pass control): correctly-guarded analysis
- fixture: CAFE fit on a rooted, bifurcating, time-calibrated tree; single-λ fit checked against a
  gamma-rate-category (CAFE5) alternative; per-family Monte-Carlo p-values BH-corrected at a stated
  FDR target; p-value histogram inspected (flat null + peak near 0); no WGD/TE/polyploidy in the
  clade; eukaryotic assemblies of stated high quality.
- expect: PASS — real appropriate method, valid tree, correction present, calibration checked, no
  independence violation signaled. Referee must NOT invent a flaw. (Guards over-flagging.)
