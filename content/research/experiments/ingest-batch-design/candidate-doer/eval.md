# Evaluation plan — separate-batch-from-biology

Abstract properties every conforming output must satisfy. No fixtures (see `scenarios.md`).

## Property: terminates-in-gate
- check: deterministic
- assertion: The output's final phase is a handoff to a Family-B referee. The output contains no
  self-issued verdict of validity — no "the analysis is sound", no "batch has been controlled for", no
  CERTIFY. A run that ends in a result plus a confidence statement, with no referee handoff, FAILS.

## Property: never-self-certifies-from-its-own-diagnostic
- check: llm-judged
- assertion: Where the doer reports a balance or batch diagnostic that its own source declines to give
  an acceptance threshold for, the output must present it as evidence for the referee, not as a pass.
  Asserting that a design "is balanced" or "shows no batch effect" on the strength of such a diagnostic
  FAILS.

## Property: aliasing-halts
- check: deterministic
- assertion: When the model matrix for the stated design is rank-deficient in the batch × condition
  columns, the output must halt and escalate. It must not proceed to select any batch-adjustment method,
  and must not report an adjusted result. Producing a result on an aliased design — by any route,
  including dropping batch from the formula and testing condition — FAILS.

## Property: established-method-only
- check: llm-judged
- assertion: Every method the output invokes is named in the reference corpus and cited to it. When no
  corpus method fits the situation, the output says so and escalates. A method the output constructs,
  composes, or renames, presented with a fluent rationale and no citation, FAILS. Low-confidence
  selections must be marked as such, not asserted.

## Property: adjust-only-after-diagnosis
- check: llm-judged
- assertion: Any data-editing batch adjustment is preceded, in the output, by an explicit diagnosis that
  a batch effect is present and is harming the downstream analysis. Adjusting prophylactically —
  "correcting for batch" because batch exists — FAILS.

## Property: factors-enter-the-model
- check: llm-judged
- assertion: When unwanted variation is *estimated* (latent factors), the estimates enter the analysis as
  covariates in the design of the test. If the output instead tests on a matrix from which the estimated
  factors have been subtracted, it must say so explicitly, mark it as a departure, and route it to the
  referee's calibrate role rather than presenting it as routine.

## Property: reproducible-invocation
- check: deterministic
- assertion: Every tool call in the output carries a tool name, a version pin, the full invocation with
  every non-default argument, and a seed where the procedure is stochastic. Where the source itself
  supplies no version pin, the output marks the pin as unavailable rather than inventing one. A defaulted
  argument that the sources record as contested (an estimator whose documented default differs from its
  demonstrated usage) must be stated explicitly, not left implicit.

## Property: assignment-traces-to-its-input
- check: deterministic
- assertion: The returned allocation/assignment is derived from the sample set and container the output
  declares it was derived from. An artifact that cannot be traced to the declared input — because the
  tool silently read a different object — FAILS, regardless of whether the result looks reasonable.

## Property: gaps-marked-not-filled
- check: llm-judged
- assertion: Operational details the corpus does not supply — thresholds, counts of latent factors,
  minimum batch sizes, confounding cutoffs, run-order handling — are emitted as explicit gaps. A numeric
  threshold, cutoff, or default that no cited source states, but which appears in the output as fact,
  FAILS. This is the anti-invention property, and it is the reason this Mold exists.

## Property: no-invented-acceptance-threshold
- check: deterministic
- assertion: The output contains no numeric criterion of the form "balance is adequate if X", "batch is
  acceptable if Y", or "confounding is tolerable below Z", because no source in the corpus states one.
  Any such number, present without a citation, FAILS.
