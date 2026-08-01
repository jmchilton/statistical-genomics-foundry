# Evaluation plan — audit-batch-design-validity

Abstract properties. The catch-the-planted-flaw oracle. Concrete stimuli are in `scenarios.md`.

## Property: aliased-design-must-be-caught
- check: deterministic
- assertion: Given an analysis whose stated design matrix is rank-deficient in the batch × condition
  columns, the verdict must be FAIL and the route must be ESCALATE. It must never be PASS. It must never
  be REVISE. It must never contain a recommendation to adjust, correct, or regress out batch. It must not
  accept "batch was dropped from the formula" as a resolution. *An invalid case must be caught or flagged;
  it must not silently pass.*

## Property: correct-then-test-on-unbalanced-must-be-caught
- check: deterministic
- assertion: Given an analysis in which (a) the group-to-batch ratios violate the equal-ratio condition,
  (b) a group-preserving batch adjustment produced the analyzed matrix, and (c) the downstream test omits
  batch — all three simultaneously — the verdict must be FAIL/REVISE. It must not be PASS.

## Property: three-legs-required
- check: deterministic
- assertion: The converse of the above. If any one of the three legs is absent — the design is balanced,
  OR batch was modelled rather than removed, OR the downstream test includes batch — the referee must NOT
  fire the inflation finding. A referee that flags every batch-adjusted analysis is not refereeing; it is
  a constant function.

## Property: over-read-guard
- check: llm-judged
- assertion: Every FAIL and every FLAG cites the source that names the failure mode. The referee may not
  assert a failure a source does not state. Specific tripwires from this corpus: it may not call
  `sva()`-on-counts an error (no source says it is, and none names a symptom); it may not claim surrogate
  variables absorb biological signal under confounding (the source says the opposite by design and never
  analyses perfect confounding); it may not transfer Nygaard's inflation result to count data (the source
  is silent on counts); it may not transfer the collider paper's argument to batch adjustment (that source
  never mentions batch). A fluent, plausible, uncited finding FAILS this property as surely as a missed
  flaw fails the others.

## Property: no-invented-threshold
- check: deterministic
- assertion: The verdict contains no numeric cutoff for "acceptably balanced", "acceptably confounded",
  "enough surrogate variables", or "correlation above which an SV is biological", because no source in the
  corpus supplies one. Any such number, present without a citation, FAILS.

## Property: undetermined-is-not-pass
- check: deterministic
- assertion: An axis the referee cannot evaluate — because the analysis under review omitted the design
  table, the version pin, the seed, or the invocation — returns UNDETERMINED. An overall CERTIFY requires
  zero UNDETERMINED axes. Passing an axis on the strength of a plausible reconstruction of missing
  information FAILS.

## Property: calibrate-required-for-certify
- check: deterministic
- assertion: A CERTIFY verdict requires at least one completed empirical check (null-data rerun,
  known-truth simulation, permutation null, or negative-control arm) whose result is recorded. Critique
  alone never certifies. A CERTIFY with no calibrate pass FAILS.

## Property: null-calibration-is-uniform
- check: deterministic
- assertion: Where a null was constructed (data replaced by a null generator, design retained), a PASS
  requires the resulting null p-values to be approximately Uniform(0,1) by the stated test. Non-uniformity
  ⇒ FAIL, regardless of how the original result looks.

## Property: inflation-is-scale-invariant
- check: deterministic
- assertion: Where the calibrate pass sweeps sample size on a fixed unbalanced design, the referee must
  recognize inflation that persists as n grows. A verdict that attributes the inflation to small sample
  size, or predicts it will resolve with more samples, FAILS — the inflation factor is set by the design,
  not the n.

## Property: fixable-vs-unfixable-routing
- check: llm-judged
- assertion: Every non-PASS verdict routes correctly. Aliasing → ESCALATE (no analysis repairs it). Imbalance-
  driven inflation → REVISE (re-analyze with batch in the model). Over-correction → REVISE (drop to the
  simpler adjustment). A bad random allocation, pre-run → REVISE (re-allocate). Routing an unfixable
  finding to REVISE — thereby inviting the doer to try another correction — FAILS.

## Property: verdict-names-the-finding
- check: llm-judged
- assertion: Every non-PASS verdict states the specific finding (which axis, which evidence, which source)
  rather than a general concern. "There may be batch effects" is not a verdict.
