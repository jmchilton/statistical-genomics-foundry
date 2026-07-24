---
description: Recover one bioSkills SKILL.md into the Foundry, Foundry-safe — research its backing sources, ingest them via summarize-source, blind-assemble a candidate doer+audit Mold pair, diff the pair vs. skill, then close gaps with open-access surrogates
argument-hint: "<bioSkills skill> (path like population-genetics/selection-statistics, or a SKILL.md URL)"
allowed-tools: Read, Write, Edit, Bash, WebFetch, WebSearch, Agent
---

Take ONE `SKILL.md` from bioSkills (github.com/GPTomics/bioSkills) and reconstruct a
**traceable** equivalent inside the Foundry as a **do-then-audit pair**: find the primary
sources the skill's content would have to trace to, ingest them as faithful research notes,
then **blind-assemble two candidate Molds from those notes alone — a Family-A *doer* and a
Family-B *audit* — neither seeing the SKILL.md**, then compare both against the original skill.
The output is a **recoverability probe**, not finished Molds — the deliverable is the diff
(what recovers with a real citation vs. what is convention or invention), now for BOTH the
*doing procedure* (→ doer) and the *validity axis* (→ audit), plus a work-list, in the spirit of
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
  source + `guidance.md` — never the SKILL.md or our framing. **Both Molds are assembled blind in
  Phase 3 — the doer AND the audit see only the imported notes, never the SKILL.md** — or the
  recoverability diff is contaminated (they would copy the skill instead of recovering it). A blind
  doer is deliberate: it measures whether the *doing procedure* itself traces to primaries or is
  fluent invention. Enforce both by what you put in each prompt.
- **Corpus-first / anti-invention.** This command must not become a Mold factory that emits
  plausible invented prose — that is the exact failure the Foundry referees. Both assembled Molds
  (doer + audit) are **candidates for human authoring**, staged outside `content/`. Gaps drive
  sourcing, never memory backfill.

## Phase 0 — ground yourself

Read: `content/meta/glossary.md` (vocabulary authority), `docs/MOLD_SPEC.md` (the Mold contract you'll
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
   **procedure spine** (what a Family-A *doer* does — the method choices + the reproducible
   sequence), **validity axis** (the cardinal sin a Family-B *referee* would guard), and
   **defaults/thresholds**. For each claim the skill makes, ask: what primary source would this
   have to trace to? **Source BOTH halves:** the procedure spine needs method-establishing papers
   (the primary that defines/validates the method the doer selects), not only the audit's
   cautionary sources — previously under-collected because only the audit was built.
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

## Phase 3 — blind-assemble the candidate doer + audit pair (subagent → you write to staging)

Spawn ONE assembler subagent for the **pair** (both Molds share the same note set, so one blind
context keeps them coherent — the doer's gate handoff can reference the audit's actual axes).
**Critical: it sees ONLY the imported `index.md` notes** (the ones Phase 1 marked
reuse/new/re-summarize) + `docs/MOLD_SPEC.md` + `content/meta/glossary.md` + `docs/REFEREE_LOOP.md` + the
`docs/MOLDS.md` naming convention. **It must NOT see the SKILL.md** — this holds for the doer too;
a blind doer is what measures whether the *doing* traces to primaries. It returns a draft, writes
nothing. Its job:

- **The Family-A doer Mold** (`candidate-doer/index.md`): from the notes' procedure-spine sources,
  author `frame → design-review → select an established method → run reproducibly`, ending in a
  `[gate]` phase that **hands off to the audit Mold** (a doer may not self-certify — REFEREE_LOOP).
  Typed `references:` wiki-link the method notes. **`[GAP: …]` every operational detail the notes
  don't supply** (exact tool invocation, version pin, param default) — do NOT fill from memory; a
  blind doer is *expected* to have operational gaps, and those become Phase-5 surrogate targets.
- **The Family-B audit Mold** (`candidate-audit/index.md`): the validity-axis referee — each axis
  note-traced, ending in a `[gate]`/Calibrate handoff. As before.
- **`eval.md` per Mold.** Doer-eval = Family-A properties (selects an *established* method not an
  invented one; the run is reproducible; **it terminates in the gate handoff, never self-certifies**).
  Audit-eval = the catch-the-planted-flaw oracle (≥1 guardrail per MOLD_SPEC). Keep eval abstract —
  no fixtures.
- **`scenarios.md` — instantiate the stimulus, don't describe a class.** The pairing is what makes
  this concrete: a scenario binds a **specific doer configuration** and its **actual output**, which
  the audit then consumes → expected verdict. **Planted-invalid = a deliberately mis-configured doer
  run** (a known-bad setting that trips an audit axis); the clean control = a correct run that must
  PASS. Test each case: *could a reader actually produce this input and run it?* If not it is still
  too high-level — mark `[GAP]` rather than paraphrase a class. Where a case audits an *external*
  claim with no doer run, bind a concrete (synthetic-but-realistic, explicitly synthetic) excerpt
  grounded in a real worked number from the notes; `[GAP]` if none recovers.
- **`[GAP: …]` over memory-backfill everywhere** (skill3 finding): with it the task is honest;
  without it the model confabulates. Pick family/role tags and names per convention.

**You then** write the returned draft to a **staging dir outside `content/`**:
`content/research/experiments/ingest-<skill-slug>/{candidate-doer,candidate-audit}/{index.md,eval.md,scenarios.md}`.
Staging (not `content/molds/`) because Molds are human-authored corpus-first; these are candidates.
(Pre-pair experiments used a single `candidate-mold/` == the audit half; not retro-migrated.)

> **Open items (don't fake-solve).** The pair-level scenario layout (per-Mold `scenarios.md` sharing
> fixtures vs. a single shared file), fixtures for *external-claim* audits in domains with no
> benchmark source (StatQA covers none of the comparative-genomics skills), and actual *runnability*
> (gated on repo standup — no build/fixture tooling here yet) are unresolved. Author to the shape
> above and flag the residue; do not invent a fixture harness.

## Phase 4 — compare the pair vs. skill (subagent → you write the report)

Spawn ONE compare subagent. It sees **everything**: the fetched SKILL.md, **both** candidate Molds
(doer + audit), and the ingested notes. It returns a report (writes nothing) covering:

- **Recoverability by layer, for BOTH molds** — procedure spine (→ doer), validity axis (→ audit),
  and defaults, each graded High/Med/Low, with the Phase-3 GAP markers as evidence. Mirror
  `content/research/05`'s table shape. **The doer diff is a first-class finding:** does the SKILL's
  *procedure* trace to method papers, or is part of it fluent *invented doing* with no primary? — as
  sharp a probe result as the validity-axis one, and dead-on the project thesis.
- **GAP taxonomy → next actions** — sort each gap (skill3 style): **new source note** /
  **re-summarize existing** / **convention, not citable**, now including the doer's **operational
  gaps** (exact command, version pin, param default → typically closed by a tool's own author-written
  vignette/man-page in Phase 5). Call out any *silent* gap either assembler couldn't even flag (the
  highest-value find — a memory-written skill sails past it). For each gap, note whether its
  load-bearing source is **accessible** or **paywalled/inaccessible** — accessible gaps are Phase 5's
  recovery targets.
- **What the Foundry adds** — the empirical referee/gate the pair implies (the doer *hands off*; the
  audit *judges*) that the bioSkills SKILL.md states as flat prose but cannot trace (per
  `content/research/projects/bioskills.md`).
- **Where bioSkills leads** — credit honestly (CLI version-compat rigor, coverage, embedded stats);
  the doer's operational gaps are exactly where bioSkills leads today. Don't overclaim; a shared
  strength is a similarity, not our edge.

**You then** write it to `content/research/experiments/ingest-<skill-slug>/comparison.md`, matching the
voice of the existing `content/research/experiments/` notes.

## Phase 5 — close gaps with open-access surrogates (subagent → you write guidance + spawn clean-context summarizers)

Phase 4's GAP taxonomy sorts each gap — including the doer's **operational gaps** (exact command,
version pin, param default), whose natural surrogate is the **tool's own author-written vignette /
man-page**. Before hunting anything externally, the retrieval subagent
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

**Do not re-run Phase 3.** The candidate pair (doer + audit) measured what recovered from the
*original* note set; re-blind-assembling either Mold against surrogate-enriched notes would
contaminate that measurement. Gap-closing enriches the corpus for the eventual human-authored Molds
and records what *newly* recovers (including which doer operational gaps a vignette/man-page closes,
moving the pair toward runnable) — it does not re-open the probe. Record closure status in
`gap-closing.md`; leave the Phase-3 candidates as-is.

## Phase 6 — report

Summarize to the user: skill ingested; sources written (new/reused/re-summarized counts) with
paths; **candidate-doer + candidate-audit + comparison paths**; for BOTH molds the sharpest
recovered-traceably win and the sharpest gap (the doer's procedure-recoverability finding and the
audit's validity-recoverability finding are separate results — report both). Then the gap-closing
result: surrogates ingested (recommend), plus the **held** and **still-open** gaps and any
**conflict** the retrieval pass surfaced. **Note runnability honestly:** a blind doer is runnable
only once its operational gaps are closed from **citable surrogates** (tool vignettes/man-pages) —
never from the SKILL.md or memory; say which gaps still block a runnable do-then-audit pass. Note
this staged nothing into `content/` and authored no real Mold. **Do not commit unless asked.** Then
list any unresolved questions concisely.

## Guardrails recap

- **Both assemblers are blind to the SKILL.md** (doer AND audit); summarizers are blind to
  everything but their source + guidance. Contaminate any and the recoverability claim is worthless.
- Conventions are labeled, never cited. `hypothesis`-evidence references carry a `verification`.
- Candidate **doer and audit** stay in `content/research/experiments/`, never `content/molds/`, until a human authors them.
- Reuse existing notes; don't re-ingest what `content/research/` already holds.
- **Surrogate attribution (Phase 5):** a surrogate is cited as *itself*, never laundered into a
  citation of the paywalled primary it substitutes for. Label whose analysis each recovered fact is.
- **Surface conflicts, don't smooth them (Phase 5):** a surrogate that contradicts a gap's stated
  fact is a find, not an error — flag it.
- **Gap-closing doesn't re-open the probe (Phase 5):** never re-blind-assemble the Mold after
  ingesting surrogates; it would contaminate the recoverability measurement.
