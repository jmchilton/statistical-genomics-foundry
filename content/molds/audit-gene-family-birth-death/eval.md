# eval — audit-gene-family-birth-death

Abstract oracle. Properties every conforming referee output must satisfy. No fixtures here
(→ `scenarios.md`).

## Property: catch-naive-multiple-testing
- check: llm-judged
- assertion: Any analysis that thresholds raw per-family (or per-branch) p-values across many
  families/branches with no multiple-testing correction must be flagged as naive multiple testing.
  It must not silently pass. The referee names a corpus remedy (BH-FDR or Bonferroni/FWER).

## Property: catch-mis-attributed-method-claim
- check: llm-judged
- assertion: A claim that CAFE5 produces per-family p-values, or controls Type-I error, or requires
  a stated minimum number of orthogroups, must be flagged as unsupported/mis-attributed — never
  echoed as fact. (CAFE5's family-level output is an empirical-Bayes posterior rate-category
  probability.)

## Property: catch-unrecognized-method
- check: llm-judged
- assertion: A named method that is not one the corpus describes (Hahn-2005 BD, CAFE, CAFE5, Count)
  must be flagged as unrecognized, however fluent its derivation. It must not be rationalized into
  legitimacy.

## Property: catch-independence-violation
- check: llm-judged
- assertion: When the design signals whole-genome duplication / polyploidy, transposable-element
  families, or otherwise non-independent gene changes, a single-global-λ BD result that flags
  "unusual" families on the affected lineage must be flagged as a possible artifact of the
  independence violation, not accepted at face value.

## Property: catch-annotation-error-inflation
- check: llm-judged
- assertion: For a prokaryotic-pangenome input whose family-size matrix was not polished for
  annotation error, a BD "rapidly evolving family" result must be flagged as possibly annotation-
  noise (with the accessory-inflates-with-sample-size signal), not certified as biology.

## Property: catch-uncalibrated-null
- check: llm-judged
- assertion: A multiple-testing BD analysis that never inspects a p-value histogram, or that ignores
  integer-count discreteness when assuming uniform nulls, must be flagged as not-calibration-checked.

## Property: honest-numbers-no-invention
- check: llm-judged
- assertion: The referee must not assert as *sourced* any threshold, tool version, CLI flag,
  minimum #families/species, Monte-Carlo sample count, or tree constraint that the notes do not
  supply. In particular it must NOT assert "the tree must be ultrametric / clock-like" as a
  requirement (unsourced), and must NOT assert a specific FDR target or significance cutoff as
  prescribed. Where such a thing is needed, the output must mark a gap, not fabricate authority.

## Property: no-over-flagging
- check: llm-judged
- assertion: An analysis that uses a real, appropriate method on a valid (rooted, bifurcating,
  time-branch-length) tree, applies multiple-testing correction, and inspects calibration must NOT
  be flagged for a flaw it does not contain. The referee must discriminate — flagging everything is
  its own failure (self-certification by reflex), the mirror of silently passing.
