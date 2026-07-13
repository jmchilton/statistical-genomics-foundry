---
description: Score how well we could build a Foundry mirror of an external skill (e.g. a bioSkill) across the four mold-eval rubrics — defers research to per-axis subagents, delegates grading to the rubric files
argument-hint: "<external skill> (bioSkills path like comparative-genomics/synteny-analysis, a SKILL.md URL, or a local path)"
allowed-tools: Read, Write, Edit, Bash, WebFetch, WebSearch, Agent
---

# /assess-external-skill

Take ONE external skill (a bioSkills `SKILL.md` or equivalent) and produce a **four-axis scorecard**
answering: *how well could we construct a Foundry mirror of this skill?* The axes are the mold-eval
rubrics — **Operability, Assessability, Traceability, Refereeability**. This command **does not
restate their criteria**: it fans research out to subagents and **delegates every grade to the
rubric file**. Split of labor:

- **The rubric owns the grading criteria** (dimensions, bands, open questions) — the authority.
- **This command owns the research protocol** (what evidence to gather, how to fan out) — nothing more.

Output is a scorecard, not a mirror — a feasibility read that drives further work.

**Relation to `/ingest-bioskill`:** that command is the **deep** Traceability probe (ingests
sources, blind-assembles molds, diffs). This is the **fast** scorecard across all four axes; its
Traceability pass is a lightweight triage that *escalates to* `/ingest-bioskill` when a real
recoverability verdict is needed. Do not re-run the ingest here.

## Input

`$ARGUMENTS` = the external skill: a bioSkills `<category>/<name>`, a raw SKILL.md URL, or a local
path. Derive `<skill-slug>` (kebab-case name). If ambiguous or a likely typo vs. bioSkills'
categories, stop and confirm before spending subagent budget.

## Phase 0 — ground (you)

Read `docs/glossary.md` (vocabulary) and the four axis files under
`content/research/mold-eval/rubrics/` **plus its `README.md`** — the vector-not-GPA rule and the
`[observed]` / `[design-inference]` / `[verify]` honesty tags live there. **These are the grading
authority; do not paraphrase their bands into this run.**

## Phase 1 — recon (subagent → returns a report, writes nothing)

Spawn one recon subagent. It fetches the **actual** SKILL.md (raw URL / local file, not memory of
it — bioSkills moves fast) and returns a **shared decomposition** the four axis passes reuse, so
nothing downstream re-fetches:

- **Tool inventory** — every external tool/package the skill names (Operability substrate).
- **Claim/threshold inventory** — load-bearing method choices, citations, CLI details, numeric
  thresholds (Traceability substrate).
- **Candidate cardinal sin** — the validity threat a Family-B referee would guard (Refereeability
  substrate).
- **Fixture/data mentions** — any dataset the skill uses or implies, and whether the domain has a
  small open-access benchmark (Assessability substrate).

## Phase 2 — one research subagent per axis (parallel → each returns a graded report, writes nothing)

Spawn four subagents, one per rubric. Give each: the shared decomposition, the **subject framing —
"grade the best mirror we could build," not the external artifact as-shipped** — and a pointer to
its ONE rubric file. Each subagent **reads its rubric, gathers the evidence that rubric's
Scored-dimensions table names, and returns a grade per that rubric's bands**, with evidence
pointers, `[verify]` items it could not confirm, and gaps. **Do not restate criteria in the prompt;
the rubric is the spec.**

Research protocol per axis (what to gather; the rubric says how to grade it):

- **Operability** (`operability.md`) — per tool: bioconda recipe? biocontainer/quay tag? container
  reference? LICENSE (open? copyleft?)? cross-platform? Grade the worst-case load-bearing tool.
- **Assessability** (`assessability.md`) — could we build a fixture-bound test for the mirror: a
  small, unrestricted dataset with known ground truth covering the skill's surface? Feasibility, not
  "does the skill ship one."
- **Traceability** (`traceability.md`) — lightweight recoverability triage: do the load-bearing
  claims / citations / CLI details resolve to real, ideally-OA primaries, or confabulate? Flag where
  a full `/ingest-bioskill` is needed to firm the grade.
- **Refereeability** (`refereeability.md`) — is the cardinal sin nameable, and can we construct a
  real Family-B referee (Critique **plus** an empirical Calibrate check) for the mirror?

**House rule: subagents report, you write.** No subagent writes files.

## Phase 3 — assemble the scorecard (you write)

Write `content/research/mold-eval/assessments/external-<skill-slug>.md`:

- Header: subject, subject-type (external skill), source URL, date (today).
- **The vector**, up top: `Operability <G> · Assessability <G> · Traceability <G> · Refereeability <G>`
  — four letters, **never a composite**.
- Per axis: grade, evidence, unresolved `[verify]` items, gaps — each labeled `[observed]` /
  `[design-inference]`.
- **Work-list** — the low axes are the actionable next steps (e.g. Traceability C → run
  `/ingest-bioskill`; Assessability D → no OA fixture, source one). This is the point of the card.

Keep the abstract rubrics untouched — the scorecard lives under `assessments/`, not in the rubric
files.

## Phase 4 — report (you)

Summarize: the four-letter vector, the sharpest strength and sharpest gap, the work-list, and any
axis whose grade is `[verify]`-blocked (unconfirmed). **Do not commit unless asked.** List
unresolved questions concisely.
