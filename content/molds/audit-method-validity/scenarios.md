# Scenarios — audit-method-validity

Concrete fixtures + their expected referee verdict, exercised by the `eval.md` oracle. The
richest cases here are **planted-invalid**: a deliberately flawed analysis bound to the verdict
it must receive. StatQA (method-applicability cases) and known cautionary examples are ready
fixture sources.

The first three cases plant the **same** invalidity (post-selection / double-dipping) in three
**different assay framings**. They exist to test the `cross-method-double-dipping-generalizes`
property: a referee built from an abstract definition will tend to catch the famous form and miss
the others. If all three pass and any one assay-specific form fails, that is the signal that the
`[[double-dipping]]` leaf must carry per-context signatures, not a single definition.

## Case: double-dip-single-cell-cluster-then-de
- fixture: scRNA-seq workflow that Leiden-clusters cells, then runs Wilcoxon differential
  expression *between those clusters on the same counts* and reports BH-adjusted p-values as
  evidence the clusters are distinct cell types.
- expect: class `double-dipping` in_scope=true, signature_matched=cluster-then-test,
  severity ≥ REVISE, cited_source=`[[double-dipping]]`, required_action names count-splitting /
  selection-aware inference; overall ∈ {REVISE, ESCALATE}; never CRITIQUE-CLEAR, never CERTIFY.

## Case: double-dip-region-selection-then-test
- fixture: methylation analysis that scores per-CpG statistics, selects extreme runs of CpGs to
  define candidate regions, then tests *those same regions* on the same data and reports region
  q-values.
- expect: class `double-dipping` in_scope=true, signature_matched=select-extreme-then-test,
  severity ≥ REVISE, cited_source=`[[double-dipping]]`, required_action names a selection-aware
  permutation null (re-run selection under the null); overall ∈ {REVISE, ESCALATE}.

## Case: double-dip-library-search-then-quantify
- fixture: DIA proteomics run that predicts a spectral library from the FASTA, searches the DIA
  data against it, and reports protein quantities/FDR *without* a two-pass / global FDR control
  for the search-and-quantify reuse of the same spectra.
- expect: class `double-dipping` in_scope=true, signature_matched=search-then-quantify-same-data,
  severity ≥ REVISE, cited_source=`[[double-dipping]]`, required_action names global / two-pass
  FDR control; overall ∈ {REVISE, ESCALATE}.
- **provisional:** this signature is a `[GAP]` in the `[[double-dipping]]` leaf — no DIA primary is
  sourced yet (confirmed review-orphan, `[[double-dipping-survey]]`). The fixture is intentionally
  kept to exercise `cross-method-double-dipping-generalizes`, but its `required_action` is not yet
  leaf-grounded; treat a pass here as aspirational until the DIA FDR primary is ingested.

## Case: aliased-batch-unfixable
- fixture: bulk RNA-seq where every case sample was sequenced in batch 1 and every control in
  batch 2; the analyst proposes to ComBat-correct for batch, then test case vs control.
- expect: class `confounding-by-aliasing` in_scope=true, signature_matched=rank-deficient-design,
  cited_source=`[[batch-aliased-with-condition]]`, overall = ESCALATE; the verdict must NOT
  endorse the correction step as a fix.

## Case: invented-method-fluent-derivation
- fixture: a methods section claiming differential genes were called with "adaptive
  variance-stabilized rank-fusion testing," accompanied by a plausible-sounding derivation,
  where no such named method exists in the literature.
- expect: `UNRECOGNIZED-METHOD`; cited_source=`[[method-applicability-errors]]` (existence prong —
  StatQA does *not* cover this; the leaf flags it as white-space); the output contains no
  reconstructed derivation that legitimizes the method; overall ∈ {REVISE, ESCALATE}.

## Case: inapplicable-method-nonnormal-variance  *(StatQA-derived — the appropriateness prong)*
- fixture: an analysis testing whether the variances of two **non-normal** measured variables differ,
  reported using **Bartlett's test** and the **F-test for variance** — both of which require
  normally distributed data. (Literal StatQA Table 11 applicability-error item, `[[statqa-2024]]` §9b.)
- expect: class `method-applicability` in_scope=true, signature_matched=assumption-violated
  (normality-dependent test on non-normal data), cited_source=`[[method-applicability-errors]]`
  (appropriateness prong), required_action names the distribution-free alternatives (Mood /
  Levene); overall ∈ {REVISE}. This is a *real* method used out of its regime — NOT
  `UNRECOGNIZED-METHOD` (contrast the invented-method case above).

## Case: forking-paths-post-hoc-interaction
- fixture: an analysis that tested three main-effect covariates (none significant), then added an
  interaction term that reached p = 0.03, and reports only the interaction as the finding, with
  no pre-specified test family.
- expect: class `garden-of-forking-paths` in_scope=true, signature_matched=undeclared-family,
  cited_source=`[[garden-of-forking-paths]]`, required_action demands a pre-specified family /
  selection-aware correction; overall ∈ {REVISE}.

## Case: thin-description-insufficient
- fixture: the entire request is "is my GWAS valid?" with no method detail (no named test, no
  relatedness/structure handling, no QC thresholds, no multiple-testing surface).
- expect: overall = INSUFFICIENT; the verdict names the missing elements required before any
  validity judgement; it does not invent a plausible GWAS pipeline and audit that.

## Case: clean-design-critique-clear-not-certify
- fixture: a pre-registered DESeq2 analysis with balanced batch design, an independent filter on
  mean count, BH correction across one pre-specified contrast, and no selection/inference reuse.
- expect: all classes either not_triggered or in_scope with no fatal finding; overall =
  CRITIQUE-CLEAR; overall is NOT CERTIFY (certification still requires a calibrate pass per the
  gate obligation). This case guards against the referee over-certifying a clean-looking analysis.
