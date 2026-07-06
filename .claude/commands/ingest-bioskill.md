---
description: Recover one bioSkills SKILL.md into the Foundry, Foundry-safe — research its backing sources, ingest them via summarize-source, blind-assemble a candidate Mold, diff Mold vs. skill, then close gaps with open-access surrogates
argument-hint: "<bioSkills skill> (path like population-genetics/selection-statistics, or a SKILL.md URL)"
allowed-tools: Read, Write, Edit, Bash, WebFetch, WebSearch, Agent
---

Take ONE `SKILL.md` from bioSkills (github.com/GPTomics/bioSkills) and reconstruct a
**traceable** equivalent inside the Foundry: find the primary sources the skill's content
would have to trace to, ingest them as faithful research notes, blind-assemble a candidate
Mold from those notes alone, then compare the Mold against the original skill. The output is
a **recoverability probe**, not a finished Mold — the deliverable is the diff (what recovers
with a real citation vs. what is convention or invention) and a work-list, in the spirit of
`content/research/experiments/skill3-recoverability-test.md` and `content/research/05-skill-backing-references.md`.

## Input

`$ARGUMENTS` = the bioSkills skill to ingest — a repo path (`<category>/<name>`), a raw
SKILL.md URL, or a plain name. Derive `<skill-slug>` as the kebab-case skill name (drop the
category unless needed to disambiguate). If the argument is ambiguous or looks like a typo
against bioSkills' category names, stop and confirm before spending subagent budget.

## Orchestration contract (read before spawning anything)

- **The orchestrator (you) does the writes.** Per house rule, content/research/assembly/compare
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
assemble against), `content/research/05-skill-backing-references.md` (the recoverability framework +
already-verified sources for the 10 cross-cutting skills), `content/research/projects/bioskills.md` (what
bioSkills is and where it leads/lags), and `.claude/commands/summarize-source.md` (the ingest
contract Phase 2 obeys). **Phase 1's research subagent — not you — inventories the existing corpus
and triages reuse** (below); your job is to sanity-check its triage, so read `content/research/05` closely
rather than pre-skimming the notes yourself.

## Phase 1 — research the backing sources (subagent → you write guidance)

Spawn one research subagent. Its job (it **returns a report, writes nothing**):

1. **Fetch the actual SKILL.md** from bioSkills (raw URL). Work from the real file, not memory
   of it — bioSkills moves fast.
2. **Decompose the skill into the three recoverability layers** (from `content/research/05`):
   **procedure spine**, **validity axis** (the cardinal sin a Family-B referee would guard),
   **defaults/thresholds**. For each claim the skill makes, ask: what primary source would this
   have to trace to?
3. **Inventory the corpus, then triage every needed fact against it — work from the files, not
   memory.** First Glob/Read the existing corpus (`content/research/**/index.md` +
   `content/research/05-skill-backing-references.md`) and list what each note *actually covers*. Then route
   every layer/fact the skill needs (not just the sources the skill happens to name) via the
   **reuse triage** — the canonical routing, reused in Phase 5:
   - **reuse-existing** — the fact is already in a corpus note (**even one ingested for a *different*
     skill**) → cite that note, no ingest.
   - **re-summarize-existing** — our source holds it but the note dropped it → extend that note's
     `guidance.md` + re-ingest in Phase 2.
   - **new** — absent from the whole corpus → a new source.
   Cross-skill hits are the point: a note this skill never points to may already carry the fact.
   Only **new** and **re-summarize** reach Phase 2; **reuse-existing** is closed here.
4. **For each NEW or re-summarize source, propose:** `<collection>/<id>` (collection ∈
   `papers | tutorials | books`), full citation + open-access URL, license/copyright posture,
   and a complete **`guidance.md`** body — targeted questions that direct *attention, not
   conclusions* (see the neufeld example: "does the source state X? quote it," never "confirm X
   is bad"), must-quote items, and version-pinning notes.
5. **Flag convention layers.** Any threshold/default with no defining primary (per `content/research/05`
   finding #2 — FDR 0.05, 0.80 power, tool-version param defaults, etc.) is labeled **convention,
   not citable** — it must NOT get a fabricated citation.
6. **Books are handled differently.** Copyrighted book chapters (MSMB, OSCA, FIMD, …) go through
   the own-words books path, not `summarize-source`. Prefer reusing an existing `content/research/books/`
   summary; if one is missing, list it as a **book-path dependency**, don't summarize it here.

Report shape the subagent returns: the fetched skill's layer decomposition; the **reuse-triage
table** (`layer/fact | reuse-existing | re-summarize | new | note-cited-for-reuse | license +
citation+URL`); the full guidance.md text per new/re-summarize source; the convention-flag list;
and any book-path dependencies.

**You then:** sanity-check the triage (reuse-existing hits real and sufficient? conventions not
dressed as citations? nothing marked `new` that a corpus note already covers?), create each
`content/research/<collection>/<id>/` dir for new/re-summarize sources, and **write the `guidance.md` files**.

## Phase 2 — ingest each source (parallel summarizer subagents, clean context)

For each **new** source (skip reuse; skip book-path deps), spawn a summarizer subagent **in a
fresh/clean context**, one per source, in parallel. Each subagent:

- Is given ONLY: its `<collection>/<id>`, the citation + URL, and a pointer to
  `.claude/commands/summarize-source.md` and its own `content/research/<collection>/<id>/guidance.md`.
  **Do not** pass it the SKILL.md, our analysis, or sibling sources.
- Follows `summarize-source` exactly (license-aware quoting; guidance directs attention not
  conclusions; faithful over comprehensive) and **writes `content/research/<collection>/<id>/index.md`**.

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
`content/research/experiments/ingest-<skill-slug>/candidate-mold/{index.md,eval.md,scenarios.md}`.
Staging (not `content/molds/`) because Molds are human-authored corpus-first; this is a candidate.

## Phase 4 — compare Mold vs. skill (subagent → you write the report)

Spawn ONE compare subagent. It sees **everything**: the fetched SKILL.md, the candidate Mold, and
the ingested notes. It returns a report (writes nothing) covering:

- **Recoverability by layer** — spine / validity axis / defaults, each graded High/Med/Low, with
  the GAP markers from Phase 3 as evidence. Mirror `content/research/05`'s table shape.
- **GAP taxonomy → next actions** — sort each gap (skill3 style): **new source note** /
  **re-summarize existing** / **convention, not citable**. Call out any *silent* gap the assembler
  couldn't even flag (the highest-value find — a memory-written skill sails past it). For each
  gap, note whether its load-bearing primary is **accessible** or **paywalled/inaccessible** —
  the paywalled `new source note` / `re-summarize` gaps are Phase 5's surrogate-recovery targets.
- **What the Foundry adds** — the empirical referee/gate the candidate Mold implies that the
  bioSkills SKILL.md states as flat prose but cannot trace (per `content/research/projects/bioskills.md`).
- **Where bioSkills leads** — credit honestly (CLI version-compat rigor, coverage, embedded stats).
  Don't overclaim; a shared strength is a similarity, not our edge.

**You then** write it to `content/research/experiments/ingest-<skill-slug>/comparison.md`, matching the
voice of the existing `content/research/experiments/` notes.

## Phase 5 — close gaps with open-access surrogates (subagent → you write guidance + spawn clean-context summarizers)

Phase 4's GAP taxonomy sorts each gap. Before hunting anything externally, the retrieval subagent
**re-applies the Phase 1 reuse triage** to the gap residue against the *current* corpus (now
including the Phase-2 notes): a gap may already be **reuse-existing** or **re-summarize-existing**,
needing no external search — flag those for the orchestrator. Only facts **truly absent from the
corpus** *and* blocked on a **paywalled / inaccessible** primary reach the surrogate hunt. Gaps
labeled **convention, not citable** are NOT hunted — a convention has no primary to recover; the
label is the answer. If nothing survives the triage as a paywalled-and-absent fact, skip this phase
and say so.

Spawn one retrieval subagent (or one per gap cluster if the gaps are many/disjoint). It **returns
a report, writes nothing.** Give it the gap list with, per gap, the *specific fact the gap needs*
(the load-bearing sentence / number / procedure) — **not** the SKILL.md and **not** the skill's own
citations (those may be the confabulations the probe exists to catch; hunt by fact-needed, not by
the skill's reference list). Its job:

1. For each target gap, search **open-access surrogates** that carry the missing content citably:
   OA reviews, **package vignettes** (especially author-written — they faithfully mirror the tool's
   own framework), man/help pages, free or CC-licensed textbooks, tutorials.
2. Per candidate surrogate, return `<collection>/<id>`, full citation + URL, **license posture**,
   and a **disposition**:
   - **recommend** — accessible license, faithfully carries the fact → draft its `guidance.md`
     (attention-directing, not conclusions — same contract as Phase 1).
   - **hold** — carries the fact but routing is unresolved (e.g. a CC-licensed *book* — still gated
     on the books-path reconciliation; do NOT `/summarize-source` it yet).
   - **still-open** — no accessible surrogate closes it; the gap needs the primary's **full text**
     (the exact crux sentence / its own original numbers). Say so plainly; never fake-close.
3. **Provenance of each recovered fact — whose analysis is it.** A review's restatement, a
   vignette's *re-analysis* of someone else's data, and the primary's *own* original numbers are
   three different things. Label which for every fact. This is what blocks laundering.
4. **Surface contradictions, don't smooth them.** If a surrogate *conflicts* with the fact as the
   gap states it (or with a memory-gloss that entered an upstream decomposition), **flag the
   conflict explicitly** — a surrogate pointing the opposite way is method-validation, the
   highest-value output, not noise. Do not resolve it by picking a side from memory.

**You then:** write `content/research/experiments/ingest-<skill-slug>/gap-closing.md` (the work-list —
per gap: closed-by-surrogate / held / still-open, with the attribution note and any conflict called
out), and write the `guidance.md` for each **recommend** surrogate. Then, exactly as Phase 2, spawn
a **clean-context** summarizer per recommend (blind to SKILL.md and our framing) to write its
`content/research/<collection>/<id>/index.md`. **Hold** and **still-open** items are reported, not ingested.

**Do not re-run Phase 3.** The candidate Mold measured what recovered from the *original* note set;
re-blind-assembling against surrogate-enriched notes would contaminate that measurement. Gap-closing
enriches the corpus for the eventual human-authored Mold and records what *newly* recovers — it does
not re-open the probe. Record closure status in `gap-closing.md`; leave the Phase-3 candidate as-is.

## Phase 6 — report

Summarize to the user: skill ingested; sources written (new/reused/re-summarized counts) with
paths; candidate-mold + comparison paths; the sharpest recovered-traceably win and the sharpest
gap. Then the gap-closing result: surrogates ingested (recommend), plus the **held** and
**still-open** gaps and any **conflict** the retrieval pass surfaced. Note this staged nothing into
`content/` and authored no real Mold. **Do not commit unless asked.** Then list any unresolved
questions concisely.

## Guardrails recap

- Assembler is blind to the SKILL.md; summarizers are blind to everything but their source +
  guidance. Contaminate either and the recoverability claim is worthless.
- Conventions are labeled, never cited. `hypothesis`-evidence references carry a `verification`.
- Candidate Mold stays in `content/research/experiments/`, never `content/molds/`, until a human authors it.
- Reuse existing notes; don't re-ingest what `content/research/` already holds.
- **Surrogate attribution (Phase 5):** a surrogate is cited as *itself*, never laundered into a
  citation of the paywalled primary it substitutes for. Label whose analysis each recovered fact is.
- **Surface conflicts, don't smooth them (Phase 5):** a surrogate that contradicts a gap's stated
  fact is a find, not an error — flag it.
- **Gap-closing doesn't re-open the probe (Phase 5):** never re-blind-assemble the Mold after
  ingesting surrogates; it would contaminate the recoverability measurement.
