# Skill rubrics — standing scorecards for Family-A doer skills

Net-new to this instance. The parent Foundry grades workflows recovered from IWC; it has no
rubric for auditing an *external* skill. These four rubrics do, and they exist because the
`/ingest-bioskill` probes kept surfacing the same latent question — *is this doer skill any
good, and along which axis?* — with no place to record the answer so it drives further work.

## Subject and unit

A rubric grades one **Family-A doer skill**. The subject can be an upstream bioSkills `SKILL.md`
*or* a Foundry candidate doer (`content/research/experiments/ingest-*/candidate-doer/`). Most axes
apply to both; **Traceability** is inherently about the source→Foundry diff. State the subject when
you record a grade.

A skill scores as a **vector of four letters**, one per axis — **never a rolled-up GPA.** The point
is inspectability: *which* axis is low is the work-list. A composite would hide exactly the signal
we want.

## The four axes (each answers one question)

| Axis | Question it answers | File |
|---|---|---|
| **Operability** | Is it clear how to run the external tooling? | [`operability.md`](operability.md) |
| **Assessability** | Is it clear how to assess the skill? | [`assessability.md`](assessability.md) |
| **Traceability** | Does its content trace to recoverable (ideally OA) sources? | [`traceability.md`](traceability.md) |
| **Refereeability** | Is the doing gated by a real Family-B referee? | [`refereeability.md`](refereeability.md) |

They are meant to be near-orthogonal, with one known coupling: **Assessability presupposes some
Operability** — you cannot exercise a fixture against a tool you can't run.

## Shared shape of a rubric file

1. **What it grades** — the subject axis, in the skill author's terms.
2. **Why it matters** — grounded in probe evidence where we have it; every claim labeled
   `[observed]` (in a committed `comparison.md`) vs `[design-inference]`.
3. **Scored dimensions** — a table: dimension | what earns credit | evidence source.
4. **Bands** — A/B/C/D/F in *observable* terms (Operability adds a deduction ladder, per the
   author's sketch).
5. **Worked example** — usually the ASR (`ingest-ancestral-reconstruction`) case.
6. **Assessments** — a living table (skill | grade | date | evidence), seeded only where we have
   evidence; `[unassessed]` otherwise. This is the "update over time" part.
7. **Open calibration questions** — where the band cutoffs are still soft.

## Grading philosophy

- A–F, **half steps allowed** (`B+`, `A−`).
- Where a deficiency ladder is natural (Operability), grade by **deduction from A**; elsewhere by
  matching observable band definitions.
- Every recorded grade is **dated and evidence-linked** — a grade with no pointer to what was
  checked is a guess, and this project referees guesses.
- Rubrics are **living**: cutoffs move as we assess more skills. Change the criteria in the open
  file, don't fork a private variant.

## Relationship to existing machinery

- **Traceability** is the standing-metric form of the `/ingest-bioskill` recoverability probe —
  it distills a `comparison.md` into a grade. See `content/research/experiments/ingest-probes-cross-synthesis.md`.
- **Refereeability** grades the **Gate / REFEREE_LOOP** obligation (`docs/REFEREE_LOOP.md`) —
  does the doer hand off to a non-self-certifying referee, and is that referee any good.
- **Assessability** grades the `scenarios.md` / `eval.md` contract (`docs/MOLD_SPEC.md`) from the
  outside — is there a fixture-bound test that drives the skill.
- **Operability** is bioSkills' home turf (the doer-spine layer the probes score out of a
  Family-B referee's scope by design — cross-synthesis §2). A rubric lets us credit it explicitly.

## Not built yet (planning-workspace honesty)

These are **prose rubrics**, not tooling. No scoring script, no schema, no per-skill scorecard
generator — deferred to repo standup, like everything in `AGENTS.md` "Deferred to repo standup."
Grade by hand, record in the assessments table.
