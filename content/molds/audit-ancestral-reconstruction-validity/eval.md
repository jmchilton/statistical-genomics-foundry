# Eval — audit-ancestral-reconstruction-validity

Abstract oracle. Properties every cast output must satisfy. No fixtures.

## Property: catch-point-estimate-treated-as-certain
- check: llm-judged
- assertion: Given an analysis that reports a single best/most-parsimonious ancestral
  reconstruction with no per-site/per-node posterior probabilities and carries it into a hard
  claim, the output MUST flag it (uncertainty not reported); it must never return `pass`. A unique
  reconstruction is not evidence of certainty. (Referee-correctness guardrail.)

## Property: catch-site-homogeneous-deep-node-LBA
- check: llm-judged
- assertion: Given a deep-node / long-branch reconstruction run under a site-homogeneous model
  with no compositional-adequacy check, the output MUST flag or fail it for long-branch-attraction
  risk and name a diagnostic (Keff-binned dlogL) or remedy (CAT-PMSF). It must not bless it.
  (Catch-the-planted-flaw.)

## Property: catch-SSE-significance-without-null
- check: llm-judged
- assertion: Given a BiSSE/SSE trait-diversification significance claim with no tree-specific
  neutral-trait null (or relying only on a negative BAMM/MEDUSA result), the output MUST flag or
  fail it and call for a neutral-trait simulation on the actual tree. It must not accept the
  p-value at face value. (Catch-the-planted-flaw.)

## Property: catch-reconstruction-reused-as-data
- check: llm-judged
- assertion: Given an analysis that feeds point ancestral reconstructions back in as fixed
  observed data for a downstream test without propagating reconstruction uncertainty, the output
  MUST flag it as the named misuse (circularity), not pass it.

## Property: no-invented-threshold
- check: llm-judged
- assertion: The output MUST NOT attribute a numeric reliability cutoff to a source that does not
  state one — specifically it must not cite Yang 1995 for a 0.95 posterior cutoff, Foley 2022 for
  a 0.8 indel-posterior cutoff, or the PAML manual for a dS/branch-length saturation cutoff. Any
  such number, if used, MUST be labelled convention/external, not sourced. (Anti-invention.)

## Property: honest-numbers
- check: deterministic
- assertion: Any Type-I / accuracy figure the output cites for a referenced paper must match that
  note: BiSSE false-positive on real trees is >77% / 61.5% (not a single "~40%" headline), the
  pure-birth control is exactly 5%, and site-homogeneous simulation failure begins at p>=0.8.
  Numbers outside these note-sourced values must not be asserted as those papers'.

## Property: verdict-carries-citation
- check: deterministic
- assertion: Every per-axis verdict names the note it traces to; no `pass|flag|fail` is emitted
  without a cited note or an explicit convention/GAP label.

## Property: escalate-not-invent
- check: llm-judged
- assertion: Where the notes do not supply a decision rule (e.g. epistatic never-existed MAP
  combination; Cunningham's detailed detector; a prescribed HiSSE null), the output MUST mark a
  GAP / escalate rather than fabricate a rule.
