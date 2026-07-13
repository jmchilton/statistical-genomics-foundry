# Refereeability — is the doing gated by a real Family-B referee?

We grade Family-A doer skills; this axis scores the **quality of the Family-B referee that gates
them**. It is the **Gate obligation** (`docs/GUIDING_PRINCIPLES.md` "Doing Never Self-Certifies")
and the **REFEREE_LOOP** made gradeable: a doer that terminates in self-certification fails this
axis by definition, however good its doing.

Net-new and dead-on-thesis — no parent analog, because self-certification is the failure this
project exists to stop.

## Scored dimensions

| Dimension | Earns credit when | Evidence source |
|---|---|---|
| Referee exists | a Family-B audit is paired to the doer at all | `candidate-audit/` / skill |
| Gate handoff | the doer *terminates* in a `[gate]` handoff, never a self-blessing | `candidate-doer/index.md` |
| Guards the cardinal sin | the audit's axis is the *right* validity threat for this method | `candidate-audit/eval.md` |
| Beyond Critique → Calibrate | the referee runs an **empirical** check (null/simulation/control), not just reasoning | audit body |
| Guardrails note-traced | referee-correctness evals ("a double-dipped analysis must be flagged") trace to sources | `eval.md` + notes |
| Non-circular | the referee is not the doer grading itself with the same model breath | pair structure |

The load-bearing distinction is **Critique vs Calibrate** (glossary): reasoning about validity is
necessary but is *itself model output* — the strong gate requires a constructed empirical check.
A referee that only reasons caps below one that calibrates.

## Bands

- **A** — doer hands off via `[gate]`; a paired referee guards the correct cardinal sin **and**
  constructs an empirical Calibrate check; guardrails note-traced; non-circular.
- **B** — real referee guarding the right axis, but Critique-only (no empirical check), or one
  guardrail untraced.
- **C** — a referee exists but guards a peripheral threat, or the doer's handoff is implicit
  (prose "consider checking…") rather than a structural gate.
- **D** — the doer self-certifies with a validity flourish; any "referee" is the same pass
  reassuring itself.
- **F** — no referee, no gate, and the skill presents its output as certified.

## Worked example — `ancestral-reconstruction`

- `candidate-audit/` (`audit-ancestral-reconstruction-validity`) exists; the ASR scenario's doer
  step ends by feeding output to it — a real handoff. `[observed]`
- Guards the correct cardinal sin: *uncertainty must be reported, not assumed* (unique
  reconstruction ≠ certain). ✓ `[observed]`
- Calibrate: the audit **demands the `rst` posteriors** and restricts claims to high-posterior
  sites — an empirical check on the doer's own output, not mere reasoning. Leans toward **A**.
- But the bioSkills doer's own line `posterior >= 0.95 | Standard convention (Yang 1995)` mis-cites
  the cutoff — the *doer* self-certifies with a convention dressed as sourced; the referee's job is
  to *not* repeat that. The pair (blind doer + audit) is what surfaces it.
- Grade: **B+** — right axis, real handoff, a Calibrate demand; formal gate encoding pending repo
  standup. `[design-inference]`

## Assessments

| Skill | Grade | Date | Evidence |
|---|---|---|---|
| `comparative-genomics/ancestral-reconstruction` (candidate pair) | B+ | 2026-07-11 | `candidate-mold/` + ASR scenario |
| bioSkills SKILL.md as-shipped (no Family-B, doer self-certifies) | D | 2026-07-11 | cross-synthesis §5 (skills state validity as flat prose, no gate) |

The **D for the as-shipped skill vs B+ for our candidate pair** is the axis earning its keep: the
Foundry's edge is the gate, and this rubric measures exactly that delta.

## Open calibration questions

1. Critique-only referee — hard cap at B, or C? How much does a missing Calibrate cost?
2. Does an implicit prose handoff ("you should validate…") count as a gate at all, or is a
   structural `[gate]` phase required for anything above C?
3. For a `mixed` doer with several method paths, does one un-refereed path cap the whole skill, or
   is the grade per-path like Operability's worst-case rule?
