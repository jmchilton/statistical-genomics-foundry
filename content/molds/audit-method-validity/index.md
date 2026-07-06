---
type: mold
name: audit-method-validity
summary: "Reasons about an analysis's method validity from its method + data-handling trace, emitting a verdict that gates certification — never CERTIFY on its own."
tags: [family/b, role/critique]
references:
  - kind: pattern
    ref: "[[double-dipping]]"
    used_at: runtime
    load: on-demand
    trigger: "feature selection and the hypothesis test share the same data/cells/samples"
    mode: condense
    evidence: corpus-observed
    purpose: "Signature catalog + remedy (count-splitting / selection-aware null) for circular / post-selection inference."
  - kind: pattern
    ref: "[[batch-aliased-with-condition]]"
    used_at: runtime
    load: on-demand
    trigger: "a technical batch factor co-varies with the biological contrast"
    mode: condense
    evidence: corpus-observed
    purpose: "Rank-deficiency signature; the unfixable case that forces ESCALATE."
  - kind: research
    ref: "[[method-applicability-errors]]"
    used_at: runtime
    load: on-demand
    trigger: "the named method may not exist, or its assumptions may not match the data regime/design"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground 'is this method real and appropriate?' in the two-prong applicability taxonomy. Appropriateness prong = corpus-observed (StatQA condition->method mapping); existence/invented-method prong = flagged white-space (no benchmark) per the leaf."
  - kind: pattern
    ref: "[[garden-of-forking-paths]]"
    used_at: runtime
    load: on-demand
    trigger: "analytic choices were made after seeing the data; the test family is undeclared"
    mode: condense
    evidence: corpus-observed
    purpose: "Signature for undeclared researcher degrees of freedom."
# Deeper per-dimension referees ([[multiple-testing-strategy]], [[check-assumptions]],
# [[assess-batch-effects-and-confounding]]) are chained at PROTOCOL altitude, not
# referenced here — this Mold stands alone as broad-spectrum triage (ARCHITECTURE §3).
# Forward refs above whose target notes are not yet authored are intentional (corpus-first,
# lazy authoring): only [[double-dipping]] is stubbed so far.
---

# Audit Method Validity

Referee — Family B / critique. **Input:** an analysis's *method description* + *data-handling trace*. **Output:** a structured validity verdict that gates certification. This Mold *reasons about* validity; it does not run the empirical check. Findings that need empirical confirmation are emitted for the gate, not resolved here.

## 0. Auditability precondition
If the named test, the selection steps, the unit of replication, and the multiple-testing surface are not all recoverable from the description, return `INSUFFICIENT` and name what is missing. A thin description does not pass — it is itself a finding. Do **not** reconstruct the missing method charitably.

## 1. Triage
For each invalidity class below, decide *in-scope / not-triggered* from the trace. Out-of-scope classes are recorded as "not triggered," never silently dropped — the verdict must show what was and wasn't examined.

## 2. Per-class checks — each delegates to a sourced leaf
The trigger decides scope; the **signature, threshold, and remedy live in the linked note**, not here.

| Class | In-scope when | Check (sourced) | On match |
|---|---|---|---|
| Circular / post-selection inference | selection and inference share data | `[[double-dipping]]` | severity ≥ REVISE; required_action = the leaf's remedy (count-splitting / selection-aware null) |
| Confounding by aliasing | a batch factor co-varies with the contrast | `[[batch-aliased-with-condition]]` | if rank-deficient → **ESCALATE** (unfixable) |
| Undeclared forking paths | choices made post-hoc; family undefined | `[[garden-of-forking-paths]]` | flag; demand a pre-specified family |
| Dependence ignored | repeated measures / pseudoreplication | `[[check-assumptions]]` (protocol) | flag; route to a dependence-aware model |
| Multiple-testing surface | many tests + dependence | `[[multiple-testing-strategy]]` (protocol) | flag if correction is naive or post-selection |

## 3. Method existence & appropriateness  *(the invented-method failure)*
Check the named method against `[[method-applicability-errors]]`, which separates two prongs:
- **Existence** — is it a *real, named* procedure? If not → `UNRECOGNIZED-METHOD`. Do **not**
  rationalize a derivation that makes an invented method look legitimate. *(This prong is a flagged
  white-space: StatQA does not cover method fabrication — the leaf sources it to project survey, not
  a benchmark.)*
- **Appropriateness** — real, but do the data satisfy its applicability conditions (variable type,
  normality, variance homogeneity, sample size, design)? If not → `REVISE`, naming the appropriate
  method for the regime (StatQA-grounded condition→method mapping). Distinguish this from Existence:
  a real method misapplied is **not** `UNRECOGNIZED-METHOD`.

This `method-applicability` check is a triage class like those in §2: it always appears in the
finding list as `in_scope` or `not_triggered` (per the `every-class-accounted-for` eval property).

## 4. Verdict aggregation + gate obligation
- Any confirmed **unfixable** signature (e.g. batch aliased with condition) → `ESCALATE`; no revision can separate aliased factors.
- Any flagged class that is **empirically confirmable** (null mis-specification, unknown calibration) → `REVISE`, emitting the specific empirical check the gate must run (`[[derive-null-and-calibration]]` / `[[design-simulation-study]]`).
- No fatal findings → `CRITIQUE-CLEAR` — **not** CERTIFY. Critique is necessary, not sufficient; certification requires the calibrate pass the gate mandates (`REFEREE_LOOP` §5). **This Mold never returns CERTIFY.**
- Default under uncertainty: **flag, don't pass.**

## Output
Finding list — `{class, in_scope, signature_matched, severity, cited_source, required_action}` — plus overall ∈ `{INSUFFICIENT, CRITIQUE-CLEAR, REVISE, ESCALATE}`. Never CERTIFY.

<!-- design-inference: the §1 triage class set and the §4 aggregation/gate rules are this
     project's synthesis (no single source enumerates them). Per MOLD_SPEC `evidence`
     discipline they are owned-and-flagged, not corpus-observed; the per-class signatures
     and remedies are sourced via the linked leaf notes. -->
