# Guidance — Shumate & Salzberg 2021, LiftOff (Bioinformatics 37(12):1639)

Source: "Liftoff: accurate mapping of gene annotations." Bioinformatics 37(12):1639–1643.
doi:10.1093/bioinformatics/btaa1016. (Advance-access 2020; issue 2021 — both year forms
appear in the wild; the skill uses both "2020" and "2021" inconsistently.) OA.

## Direct the summarizer's attention to:
- The method: capture that LiftOff maps the full exon–intron structure of each transcript
  from a source to a target assembly of the same/closely-related species using sequence
  alignment (minimap2). Capture how it resolves multi-mapping and what it does with genes
  that fail to map (unmapped output).
- DEFAULT PARAMETERS — this is load-bearing and the skill's numbers are suspect. Does the
  paper (or its cited defaults) state a minimum alignment COVERAGE and minimum sequence
  IDENTITY for accepting a lifted gene? Capture the EXACT default values. The skill claims
  ">=80% coverage" and ">=70% identity" as defaults — quote whatever the paper actually
  says; if the paper's defaults differ (e.g. 0.5/0.5), record the real numbers. Flag any
  mismatch with the skill's claim.
- The -copies / duplicated-gene handling: what threshold governs when LiftOff reports extra
  gene copies (tandem duplicates)? Capture the parameter and its default (skill claims a
  50 kb tandem window and a sequence-identity threshold for copies).
- Divergence limit: does the paper state how divergent source/target can be before accuracy
  degrades (skill claims ~80% nucleotide identity as an empirical limit)? Quote or record
  absence.
- Explicit scope caveat: does the paper say LiftOff is NOT designed for gene-loss detection
  / cross-species deep divergence? Quote any such statement (supports the TOGA-vs-LiftOff
  decision axis).

## Must-capture verbatim:
- Default numeric values for coverage, identity, copies, flank, distance parameters.
- The CLI form and required inputs (target.fa, reference.fa, -g reference.gff).
