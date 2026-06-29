# Eval — audit-method-validity

Abstract oracle: properties every cast output must satisfy. No fixtures named (those live in `scenarios.md`). Highest-value properties here are **catch-the-planted-flaw** referee-correctness guardrails — the invalid case must be caught or flagged, never silently passed.

## Property: double-dipping-must-be-caught
- check: llm-judged
- assertion: given an analysis where feature/region/cluster selection and the subsequent test share the same data, the verdict marks the circular / post-selection class in-scope with severity ≥ REVISE, and never returns CRITIQUE-CLEAR.

## Property: cross-method-double-dipping-generalizes
- check: llm-judged
- assertion: the double-dipping class is caught regardless of the assay framing (single-cell cluster-then-DE, region-selection-then-test, library-search-then-quantify). A verdict that catches one concrete form but passes another equivalent form fails this property.

## Property: aliased-confounding-escalates
- check: llm-judged
- assertion: given a contrast in which a batch/technical factor is aliased (rank-deficient) with the biological condition, the verdict returns ESCALATE and does not endorse a correction step as a fix.

## Property: invented-method-not-rationalized
- check: llm-judged
- assertion: given a fluently-justified but non-existent named method, the verdict returns UNRECOGNIZED-METHOD and contains no reconstructed derivation that legitimizes it.

## Property: thin-description-is-insufficient
- check: llm-judged
- assertion: given a method description missing the named test, the replication unit, or the multiple-testing surface, the verdict returns INSUFFICIENT and names the missing element; it does not guess a method and proceed.

## Property: every-class-accounted-for
- check: deterministic
- assertion: each triage class appears in the output as either in_scope (with a finding) or not_triggered. No class is silently absent.

## Property: never-self-certifies
- check: deterministic
- assertion: the overall verdict value is never CERTIFY.
