---
description: Score one of our Foundry Molds across the four mold-eval rubrics — same protocol as /assess-external-skill, but the subject is a Mold we hold and the framing is "grade it as it stands"
argument-hint: "<mold> (a candidate dir like ingest-ancestral-reconstruction/candidate-audit, or an authored content/molds/<slug>)"
allowed-tools: Read, Write, Edit, Bash, WebFetch, WebSearch, Agent
---

# /assess-mold

Grade one **Foundry Mold** — a `candidate-doer` / `candidate-audit` under
`content/research/experiments/ingest-*/`, or an authored `content/molds/<slug>/` — across the four
mold-eval rubrics (**Operability, Assessability, Traceability, Refereeability**). Same machinery as
`/assess-external-skill`; grading is delegated to the rubric files, this command owns only the
research protocol. Two differences: the **subject** (a Mold we hold, not an external skill) and the
**framing** (**grade the Mold in hand**, not the feasibility of a mirror).

## Input

`$ARGUMENTS` = the Mold: a candidate dir path, an authored `content/molds/<slug>`, or a slug to
resolve. If it doesn't resolve to a Mold dir (an `index.md` present), stop and confirm.

## Protocol

**Follow `/assess-external-skill` Phases 0–4 as written**, with these deltas:

- **Phase 0** — same rubric grounding; **also read `docs/MOLD_SPEC.md`** (the Mold contract) and
  `docs/REFEREE_LOOP.md`.
- **Phase 1 recon** — the subject is **local files**, not a fetched URL. The recon subagent reads
  the Mold's `index.md` / `eval.md` / `scenarios.md` (plus its typed `references:` and the notes
  they wiki-link) and returns the same shared decomposition (tools, claims, cardinal sin, fixtures).
- **Phase 2** — subject framing is **"grade this Mold as it stands"** (actual, not prospective):
  - **Traceability** grades whether the Mold's own claims trace to its cited notes (its
    `references:`); **reuse an existing `comparison.md` / `gap-closing.md` if the experiment has
    one — don't re-run the probe.**
  - **Refereeability** splits by family: for a **Family-B audit Mold**, grade the audit's *own*
    quality (guards the right cardinal sin, Calibrate not just Critique, guardrails note-traced) —
    not "does it have a referee." For a **Family-A doer Mold**, grade the `[gate]` handoff as written.
- **Phase 3** — write `content/research/mold-eval/assessments/mold-<mold-slug>.md`; subject-type =
  Foundry Mold; same shape (four-letter vector + per-axis evidence + work-list).
- **Phase 4** — same report + unresolved questions.

Keep the rubrics abstract — the scorecard lives under `assessments/`, not in the rubric files.
