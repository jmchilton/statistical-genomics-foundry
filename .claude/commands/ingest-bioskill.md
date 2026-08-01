---
description: Recover one bioSkills SKILL.md into canonical, source-traceable Foundry Molds
argument-hint: "<bioSkills skill> (path like population-genetics/selection-statistics, or a SKILL.md URL)"
allowed-tools: Read, Write, Edit, Bash, WebFetch, WebSearch, Agent
---

Take ONE `SKILL.md` from bioSkills (github.com/GPTomics/bioSkills) and recover its useful work
into a canonical **do-then-audit Mold pair**. Find the sources its claims need, ingest faithful
source notes in clean contexts, blind-author a notes-only draft to expose gaps, close recoverable
gaps, then author the real Molds under `content/molds/`.

The blind draft and comparison are working method, not corpus artifacts. Do not create an
`experiments/` tree or an experiment note kind; git history is sufficient provenance for earlier
runs. The committed result is source notes plus canonical Molds.

## Input

`$ARGUMENTS` = a bioSkills repo path, raw `SKILL.md` URL, or unambiguous skill name. Derive
`<skill-slug>` from the skill name. Stop and confirm an ambiguous or misspelled input before
spending subagent budget.

## Orchestration contract

- **The orchestrator writes.** Research, assembly, comparison, and retrieval subagents return
  reports only. Clean-context summarizers are the exception: they follow
  `.claude/commands/summarize-source.md` and write their own source-note `index.md`.
- **Isolation is load-bearing.** Summarizers see only one source plus its `guidance.md`.
  The blind draft sees only imported notes and the Mold contracts, never the bioSkills file.
- **Gaps drive sourcing, never memory backfill.** Mark `[GAP: …]` when the notes do not supply a
  claim. Convention remains labeled convention; it does not receive an invented citation.
- **Author one canonical copy.** Final Mold directories live only at `content/molds/<name>/`.
  Never retain candidate, hardened, comparison, or gap-closing copies elsewhere in the repo.

## Phase 0 — ground the run

Read `content/meta/glossary.md`, `content/meta/mold-spec.md`,
`content/meta/referee-loop.md`, `content/research/05-skill-backing-references.md`,
`content/research/projects/bioskills.md`, and `.claude/commands/summarize-source.md`.

## Phase 1 — research and reuse triage

Spawn one research subagent. It returns, and writes nothing:

1. The fetched, current bioSkills `SKILL.md`.
2. Its claims split into **procedure spine**, **validity axis**, and
   **defaults/thresholds**.
3. An inventory of existing `content/research/**/index.md` notes and a disposition for every
   needed fact:
   - **reuse-existing** — an existing note already supplies it;
   - **re-summarize-existing** — the source covers it but its note dropped it;
   - **new** — the corpus has no adequate source.
4. For every new or re-summarized source: collection/id, citation, accessible URL, license
   posture, and a complete attention-directing `guidance.md` draft.
5. A list of convention-only claims and book-path dependencies.

Sanity-check the triage against the actual files. Write `guidance.md` only for sources that
really need new or expanded notes.

## Phase 2 — ingest sources in clean contexts

Spawn one fresh summarizer per new or re-summarized source, in parallel. Give each only its
source identity, citation/URL, its `guidance.md`, and the summarize-source command. Never pass
the bioSkills file or project framing. Each writes its source-note `index.md`.

Check that every guidance question is answered or explicitly unresolved and that access,
`[summarizer-inferred]`, and re-check flags survive unchanged.

## Phase 3 — blind-author the notes-only pair

Spawn one clean-context assembler for both Molds. It sees only the selected source notes plus
the glossary, Mold spec, referee loop, and naming convention in `content/meta/molds.md`. It does
not see the bioSkills file. It returns drafts; it writes nothing.

The pair must contain:

- A Family-A doer: frame → design-review → select an established method → run reproducibly,
  ending in a `[gate]` handoff to the audit Mold.
- A Family-B audit: note-traced validity axes, explicit verdicts, and a Calibrate handoff where
  empirical checking is possible.
- `eval.md` for each Mold. The doer guards against invention and self-certification; the audit
  must catch planted invalidity.
- `scenarios.md` for each Mold, binding concrete inputs to expected outputs. Use `[GAP: …]`
  instead of inventing a fixture, command, version, parameter, or threshold.
- Valid `type: mold` frontmatter, canonical names, family/role tags, and typed references.

Keep these drafts in the run context. Do not write staging files.

## Phase 4 — compare and classify gaps

Spawn one comparison subagent with the bioSkills file, both blind drafts, and the selected notes.
It returns:

- recoverability of the procedure spine, validity axis, and defaults;
- every explicit and silent gap, classified as new source, re-summarize, or convention;
- which gaps block operability, assessability, traceability, or refereeability;
- where the Foundry adds a trace or referee gate;
- where bioSkills genuinely leads.

Use the report as a work-list. Do not commit it as a comparison note.

## Phase 5 — close recoverable gaps

Re-run reuse triage against the now-current corpus. For truly absent facts, prefer accessible
author-written tool documentation, vignettes, primary papers, or open textbooks. A retrieval
subagent may propose sources, but must label each as:

- **recommend** — accessible and directly supplies the fact;
- **hold** — relevant but routing or license posture is unresolved;
- **still-open** — no adequate accessible source;
- **convention** — no defining primary should be invented.

Write guidance and run clean-context summarizers for recommended sources exactly as in Phase 2.
Surface conflicts instead of smoothing them. Never attribute a surrogate's analysis to the
primary it discusses.

## Phase 6 — author the canonical Molds

Spawn a fresh authoring subagent with the complete selected note set, the Phase-3 drafts, and the
classified gap work-list. Do not give it the bioSkills prose as an authority. It returns the final
pair, revised from the enriched notes and retaining `[GAP: …]` for every unresolved or conventional
decision.

Review, then write each pair member directly to:

`content/molds/<canonical-name>/{index.md,eval.md,scenarios.md}`

If a Mold with that name already exists, update it deliberately rather than creating a variant.
The `index.md` body is cast-facing procedure; keep authoring history and comparison prose out.
Validate wiki-links, references, family/role tags, abstract eval properties, concrete scenarios,
and the doer→referee gate.

## Phase 7 — validate and report

Run the site validator and build. Report:

- canonical Mold paths created or updated;
- new, reused, and re-summarized source-note counts;
- the sharpest traceable recovery and the sharpest remaining gap for each Mold;
- held, still-open, and convention-only decisions;
- whether the pair is runnable and assessable now;
- any source conflict surfaced during recovery.

Do not commit unless asked.
