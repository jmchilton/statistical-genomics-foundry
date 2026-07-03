---
description: Recover one bioSkills SKILL.md into the Foundry, Foundry-safe — research its backing sources, ingest them via summarize-source, blind-assemble a candidate Mold, then diff Mold vs. skill
argument-hint: "<bioSkills skill> (path like population-genetics/selection-statistics, or a SKILL.md URL)"
allowed-tools: Read, Write, Edit, Bash, WebFetch, WebSearch, Agent
---

Take ONE `SKILL.md` from bioSkills (github.com/GPTomics/bioSkills) and reconstruct a
**traceable** equivalent inside the Foundry: find the primary sources the skill's content
would have to trace to, ingest them as faithful research notes, blind-assemble a candidate
Mold from those notes alone, then compare the Mold against the original skill. The output is
a **recoverability probe**, not a finished Mold — the deliverable is the diff (what recovers
with a real citation vs. what is convention or invention) and a work-list, in the spirit of
`research/experiments/skill3-recoverability-test.md` and `research/05-skill-backing-references.md`.

## Input

`$ARGUMENTS` = the bioSkills skill to ingest — a repo path (`<category>/<name>`), a raw
SKILL.md URL, or a plain name. Derive `<skill-slug>` as the kebab-case skill name (drop the
category unless needed to disambiguate). If the argument is ambiguous or looks like a typo
against bioSkills' category names, stop and confirm before spending subagent budget.

## Orchestration contract (read before spawning anything)

- **The orchestrator (you) does the writes.** Per house rule, research/assembly/compare
  subagents **prepare reports and return them**; you review and write the files. The one
  exception is Phase 2 (summarizers), which run `/summarize-source` — a purpose-built
  write-command that *must* run in a clean context, so those subagents write their own
  `index.md`. Do not let any other subagent write.
- **Clean-context isolation is load-bearing twice.** Summarizers (Phase 2) must see only their
  source + `guidance.md` — never the SKILL.md or our framing. The assembler (Phase 3) must see
  only the imported notes — **never the SKILL.md** — or the recoverability diff is contaminated
  (it would copy the skill instead of recovering it). Enforce both by what you put in each prompt.
- **Corpus-first / anti-invention.** This command must not become a Mold factory that emits
  plausible invented prose — that is the exact failure the Foundry referees. The assembled Mold
  is a **candidate for human authoring**, staged outside `content/`. Gaps drive sourcing, never
  memory backfill.

## Phase 0 — ground yourself

Read: `docs/glossary.md` (vocabulary authority), `docs/MOLD_SPEC.md` (the Mold contract you'll
assemble against), `research/05-skill-backing-references.md` (the recoverability framework +
already-verified sources for the 10 cross-cutting skills), `research/project-bioskills.md` (what
bioSkills is and where it leads/lags), and `.claude/commands/summarize-source.md` (the ingest
contract Phase 2 obeys). Skim existing `research/` notes so Phase 1 can reuse, not duplicate.

## Phase 1 — research the backing sources (subagent → you write guidance)

Spawn one research subagent. Its job (it **returns a report, writes nothing**):

1. **Fetch the actual SKILL.md** from bioSkills (raw URL). Work from the real file, not memory
   of it — bioSkills moves fast.
2. **Decompose the skill into the three recoverability layers** (from `research/05`):
   **procedure spine**, **validity axis** (the cardinal sin a Family-B referee would guard),
   **defaults/thresholds**. For each claim the skill makes, ask: what primary source would this
   have to trace to?
3. **Check for reuse first.** Cross-reference `research/05-skill-backing-references.md` and
   existing `research/**/index.md` notes. If a source is already ingested, mark it **reuse** (no
   re-summarize). If a note exists but dropped what this skill needs, mark it **re-summarize**
   (usually: add/extend a `guidance.md`). Only genuinely-missing sources are **new**.
4. **For each NEW or re-summarize source, propose:** `<collection>/<id>` (collection ∈
   `papers | tutorials | books`), full citation + open-access URL, license/copyright posture,
   and a complete **`guidance.md`** body — targeted questions that direct *attention, not
   conclusions* (see the neufeld example: "does the source state X? quote it," never "confirm X
   is bad"), must-quote items, and version-pinning notes.
5. **Flag convention layers.** Any threshold/default with no defining primary (per `research/05`
   finding #2 — FDR 0.05, 0.80 power, tool-version param defaults, etc.) is labeled **convention,
   not citable** — it must NOT get a fabricated citation.
6. **Books are handled differently.** Copyrighted book chapters (MSMB, OSCA, FIMD, …) go through
   the own-words books path, not `summarize-source`. Prefer reusing an existing `research/books/`
   summary; if one is missing, list it as a **book-path dependency**, don't summarize it here.

Report shape the subagent returns: the fetched skill's layer decomposition; a source table
(`id | collection | new/reuse/re-summarize | license | citation+URL`); the full guidance.md text
per new/re-summarize source; the convention-flag list; and any book-path dependencies.

**You then:** sanity-check the plan (reuse honored? conventions not dressed as citations?),
create each `research/<collection>/<id>/` dir, and **write the `guidance.md` files**.

## Phase 2 — ingest each source (parallel summarizer subagents, clean context)

For each **new** source (skip reuse; skip book-path deps), spawn a summarizer subagent **in a
fresh/clean context**, one per source, in parallel. Each subagent:

- Is given ONLY: its `<collection>/<id>`, the citation + URL, and a pointer to
  `.claude/commands/summarize-source.md` and its own `research/<collection>/<id>/guidance.md`.
  **Do not** pass it the SKILL.md, our analysis, or sibling sources.
- Follows `summarize-source` exactly (license-aware quoting; guidance directs attention not
  conclusions; faithful over comprehensive) and **writes `research/<collection>/<id>/index.md`**.

For **re-summarize** sources, do the same but note the existing note is being extended per the
new guidance. After they finish, glance at each `index.md` for the paywall/`[summarizer-inferred]`
flags and that guidance questions were answered or explicitly marked unanswered.

## Phase 3 — blind-assemble a candidate Mold (subagent → you write to staging)

Spawn ONE assembler subagent. **Critical: it sees ONLY the imported `index.md` notes** (the ones
Phase 1 marked reuse/new/re-summarize) + `docs/MOLD_SPEC.md` + `docs/glossary.md` + the
`docs/MOLDS.md` naming convention. **It must NOT see the SKILL.md.** Its job (returns a draft,
writes nothing):

- Author a candidate Mold from the notes alone: `index.md` (typed `references:` manifest wiki-
  linking the ingested notes + procedural body), `eval.md` (properties — for a Family-B referee,
  at least one **catch-the-planted-flaw** guardrail per MOLD_SPEC), and `scenarios.md` (concrete
  cases; planted-invalid fixtures where apt).
- **Mark `[GAP: …]` wherever the notes don't supply what a conforming Mold needs — never fill
  from memory.** This instruction is load-bearing (skill3 test finding): with it the task is
  honest; without it the model confabulates. Pick a family/role tag and name per convention.

**You then** write the returned draft to a **staging dir outside `content/`**:
`research/experiments/ingest-<skill-slug>/candidate-mold/{index.md,eval.md,scenarios.md}`.
Staging (not `content/molds/`) because Molds are human-authored corpus-first; this is a candidate.

## Phase 4 — compare Mold vs. skill (subagent → you write the report)

Spawn ONE compare subagent. It sees **everything**: the fetched SKILL.md, the candidate Mold, and
the ingested notes. It returns a report (writes nothing) covering:

- **Recoverability by layer** — spine / validity axis / defaults, each graded High/Med/Low, with
  the GAP markers from Phase 3 as evidence. Mirror `research/05`'s table shape.
- **GAP taxonomy → next actions** — sort each gap (skill3 style): **new source note** /
  **re-summarize existing** / **convention, not citable**. Call out any *silent* gap the assembler
  couldn't even flag (the highest-value find — a memory-written skill sails past it).
- **What the Foundry adds** — the empirical referee/gate the candidate Mold implies that the
  bioSkills SKILL.md states as flat prose but cannot trace (per `project-bioskills.md`).
- **Where bioSkills leads** — credit honestly (CLI version-compat rigor, coverage, embedded stats).
  Don't overclaim; a shared strength is a similarity, not our edge.

**You then** write it to `research/experiments/ingest-<skill-slug>/comparison.md`, matching the
voice of the existing `research/experiments/` notes.

## Phase 5 — report

Summarize to the user: skill ingested; sources written (new/reused/re-summarized counts) with
paths; candidate-mold + comparison paths; the sharpest recovered-traceably win and the sharpest
gap. Note this staged nothing into `content/` and authored no real Mold. **Do not commit unless
asked.** Then list any unresolved questions concisely.

## Guardrails recap

- Assembler is blind to the SKILL.md; summarizers are blind to everything but their source +
  guidance. Contaminate either and the recoverability claim is worthless.
- Conventions are labeled, never cited. `hypothesis`-evidence references carry a `verification`.
- Candidate Mold stays in `research/experiments/`, never `content/molds/`, until a human authors it.
- Reuse existing notes; don't re-ingest what `research/` already holds.
