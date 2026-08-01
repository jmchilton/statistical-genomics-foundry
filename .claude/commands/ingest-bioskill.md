---
description: Recover one bioSkills SKILL.md into canonical Molds through clean-context source ingestion, blind recoverability testing, and gap closure
argument-hint: "<bioSkills skill> (path like population-genetics/selection-statistics, or a SKILL.md URL)"
allowed-tools: Read, Write, Edit, Bash, WebFetch, WebSearch, Agent
---

Take ONE `SKILL.md` from bioSkills (github.com/GPTomics/bioSkills) and reconstruct a
**traceable** equivalent inside the Foundry as a **do-then-audit pair**: find the primary
sources the skill's content would have to trace to, ingest them as faithful research notes,
then **blind-assemble two draft Molds from those notes alone — a Family-A doer and a
Family-B audit, neither seeing the SKILL.md** — and compare both against the original skill.

The blind draft and comparison are a recoverability test: what recovers with a real citation,
what is convention, and what was invented. They are working state, not corpus artifacts. Close
recoverable gaps, then author one canonical pair under `content/molds/`. Do not create an
`experiments/` tree or an experiment note kind; git history is sufficient provenance for earlier
runs. The committed result is source notes plus canonical Molds.

## Input

`$ARGUMENTS` = the bioSkills skill to ingest — a repo path (`<category>/<name>`), a raw
`SKILL.md` URL, or a plain name. Derive `<skill-slug>` as the kebab-case skill name (drop the
category unless needed to disambiguate). If the argument is ambiguous or looks like a typo
against bioSkills' category names, stop and confirm before spending subagent budget.

## Orchestration contract (read before spawning anything)

- **The orchestrator does the writes.** Content-research, assembly, comparison, retrieval, and
  final-authoring subagents prepare reports and return them; you review and write the files. The
  one exception is source summarization: `/summarize-source` is a purpose-built write command that
  must run in a clean context, so those subagents write their own `index.md`. Do not let any other
  subagent write.
- **Clean-context isolation is load-bearing twice.** Summarizers see only their source plus its
  `guidance.md`, never the SKILL.md or our framing. The Phase-3 doer and audit see only imported
  notes, never the SKILL.md, or the recoverability result is contaminated. A blind doer is
  deliberate: it measures whether the doing procedure traces to primaries or is fluent invention.
- **Corpus-first / anti-invention.** This command must not become a Mold factory that emits
  plausible invented prose. Gaps drive sourcing, never memory backfill. The final Molds may use
  only claims recoverable from their declared source notes; unresolved decisions stay `[GAP: …]`
  or explicitly labeled convention.
- **One canonical copy.** Final Mold directories live only at `content/molds/<name>/`. Never
  retain candidate, hardened, comparison, or gap-closing copies elsewhere in the repo.

## Phase 0 — ground yourself

Read `content/meta/glossary.md` (vocabulary authority), `content/meta/mold-spec.md` (the Mold
contract), `content/meta/referee-loop.md` (the gate), `content/meta/molds.md` (naming),
`content/research/05-skill-backing-references.md` (the recoverability framework and already
verified sources), `content/research/projects/bioskills.md` (where bioSkills leads/lags), and
`.claude/commands/summarize-source.md` (the Phase-2 ingest contract).

Phase 1's research subagent — not you — inventories the existing corpus and triages reuse. Your
job is to sanity-check that report, so read the framework rather than pre-skimming every note and
contaminating the clean research pass.

## Phase 1 — research the backing sources (subagent → you write guidance)

Spawn one research subagent. It returns a report and writes nothing:

1. **Fetch the actual current SKILL.md** from bioSkills. Work from the real file, not memory;
   bioSkills moves quickly.
2. **Decompose the skill into three recoverability layers:**
   - **procedure spine** — what a Family-A doer does: method choices plus reproducible sequence;
   - **validity axis** — the cardinal sin a Family-B referee must guard;
   - **defaults / thresholds** — exact parameters, versions, and decision cutoffs.
   For every claim, ask which primary source would have to support it. **Source both halves:**
   the procedure spine needs the papers or author-written documentation that define and validate
   the method, not only the cautionary literature used by the audit.
3. **Inventory the corpus, then triage every needed fact against the actual files.** Read
   `content/research/**/index.md` plus `content/research/05-skill-backing-references.md`, list what
   each relevant note really covers, and assign one disposition:
   - **reuse-existing** — a note already supplies the fact, including notes ingested for a
     different skill; cite it and do not ingest again;
   - **re-summarize-existing** — the underlying source supplies the fact but our note dropped it;
     extend its `guidance.md` and re-summarize in Phase 2;
   - **new** — the fact is absent from the corpus; identify a new source.
   Cross-skill reuse is the point. Only `new` and `re-summarize-existing` reach Phase 2.
4. **For every new or re-summarized source, propose:** `<collection>/<id>` where collection is
   `papers`, `tutorials`, or `books`; full citation and accessible URL; license/copyright posture;
   and a complete `guidance.md` body. Guidance directs **attention, not conclusions**: ask
   "does the source state X? quote it," never "confirm X is bad." Include must-quote functional
   strings, exact numbers needed for recovery, and version-pinning questions.
5. **Flag convention layers.** A threshold/default with no defining primary is **convention,
   not citable**. Do not manufacture a primary for FDR 0.05, power 0.80, a community cutoff, or
   a remembered tool default.
6. **Route books correctly.** Copyrighted or synced multi-chapter books follow the book workflow,
   not `/summarize-source`. Prefer an existing `content/research/books/` summary. If a needed
   chapter is missing, report a book-path dependency rather than summarizing it through the wrong
   command. A CC-licensed single chapter follows the license-aware route documented in `AGENTS.md`.

Required report shape:

- fetched-skill layer decomposition;
- reuse-triage table:
  `layer/fact | disposition | note reused | citation/URL | license/access`;
- complete `guidance.md` text per new/re-summarized source;
- convention-only claims;
- book-path dependencies;
- unresolved access or identity questions.

Sanity-check the triage: every reused note is sufficient, conventions are not disguised as
citations, and nothing is marked `new` when the corpus already covers it. Then create the needed
source directories and write their `guidance.md` files.

## Phase 2 — ingest each source (parallel clean-context summarizers)

For each **new** or **re-summarize-existing** source, spawn one summarizer in a fresh context,
in parallel. Skip reuse-existing notes and book-path dependencies. Give each summarizer only:

- its `<collection>/<id>`;
- the source citation and URL;
- `.claude/commands/summarize-source.md`;
- its own `content/research/<collection>/<id>/guidance.md`.

Do not pass the SKILL.md, project analysis, sibling notes, or the expected conclusion. Each
subagent follows `/summarize-source` exactly: faithful over comprehensive, license-aware quoting,
and no laundering of `[summarizer-inferred]`, access, paywall, correction, or re-check flags. It
writes `content/research/<collection>/<id>/index.md`.

Afterward, verify that every guidance question is answered or explicitly unanswered and that all
flags survive verbatim.

## Phase 3 — blind-assemble the draft doer + audit pair (ephemeral)

Spawn ONE assembler subagent for both Molds. A shared blind context keeps the pair coherent: the
doer's gate can name the audit's actual axes. It sees only the selected source-note `index.md`
files, the glossary, Mold spec, referee loop, and Mold naming convention. **It must not see the
SKILL.md.** It returns six draft files and writes nothing.

### Family-A doer draft

Author `frame → design-review → select an established method → run reproducibly`, ending in a
`[gate]` phase that hands off to the audit Mold. The doer may not self-certify. Its typed
`references:` link the method-establishing notes. Mark `[GAP: …]` for every unsupported command,
version, default, threshold, stopping rule, or operational choice.

### Family-B audit draft

Make each validity axis note-traced and verdict-bearing. End in a `[gate]` or Calibrate handoff
where an empirical check is possible. An audit must refuse invented methods, unsupported numbers,
and conclusions that cannot clear the named validity conditions.

### Eval files

- Doer eval: selects an established method rather than inventing one; records enough provenance
  to reproduce the run; terminates in the referee handoff rather than self-certification.
- Audit eval: at least one catch-the-planted-flaw property per the Mold spec. Keep properties
  abstract and fixture-independent.

### Scenario files

Instantiate the stimulus; do not merely describe a class. A scenario binds a **specific doer
configuration and its actual output**, which the audit consumes, to an expected verdict.

- Planted-invalid: a deliberately misconfigured doer run that trips a sourced audit axis.
- Clean control: a correct run that must pass the same oracle.
- Runnability test: could a reader construct this input and execute the case from the note? If
  not, mark `[GAP]` rather than inventing fixture details.
- External-claim audit: when no doer run exists, bind a concrete excerpt. A synthetic excerpt
  must be explicitly synthetic and grounded in a worked number from the notes; otherwise mark
  `[GAP]`.

Keep the returned drafts in the run context. Do not write staging files.

> **Open items stay open.** Per-Mold scenarios versus shared pair fixtures, external-claim audits
> without benchmark sources, and an executable fixture harness remain unresolved where the corpus
> cannot settle them. StatQA does not cover the comparative-genomics cases, and repo-standup
> fixture tooling is still deferred. Flag the residue; do not invent a harness.

## Phase 4 — compare the blind pair against the skill (ephemeral report)

Spawn one comparison subagent. It sees the fetched SKILL.md, both blind drafts, and the selected
notes. It returns a report and writes nothing:

1. **Recoverability by layer, for both Molds:** procedure spine, validity axis, and defaults,
   each graded High / Medium / Low with draft `[GAP]` markers as evidence. Use the table shape in
   `content/research/05-skill-backing-references.md`.
2. **The doer diff as a first-class result:** which operational procedure traces to
   method-establishing sources, and which part is fluent doing with no primary support.
3. **Gap taxonomy:** new source note / re-summarize existing / convention, not citable. Include
   exact command, version, parameter, and default gaps; flag silent gaps the assembler could not
   know to mark. For every gap, record whether its load-bearing source is accessible or
   paywalled/inaccessible.
4. **What the Foundry adds:** source trace, explicit gate, and empirical referee that the
   bioSkills prose does not structurally supply.
5. **Where bioSkills leads:** CLI coverage, operational detail, version compatibility, or other
   real strengths. Shared strengths are similarities, not our edge.

Keep this report in the run context as the Phase-5 work-list. Do not commit a `comparison.md`.

## Phase 5 — close gaps with open-access surrogates

Reapply Phase 1 reuse triage to the gap residue against the now-current corpus. A gap may already
be reuse-existing or re-summarize-existing after Phase 2. Convention-only gaps are not hunted; the
label is the answer. If no fact remains both absent and blocked on an inaccessible primary, skip
the surrogate hunt and say so.

For the remaining gap clusters, spawn retrieval subagents that return reports and write nothing.
Give each the **specific missing fact** — the required sentence, number, command, or procedure —
not the SKILL.md and not its citation list. Those citations may be the confabulations the probe
exists to catch; hunt by fact-needed, not by remembered pointer.

Search accessible sources that can carry the missing content citably: open-access reviews,
author-written package vignettes, man/help pages, free or CC-licensed textbooks, and tutorials.
For each candidate return collection/id, full citation and URL, license posture, and disposition:

- **recommend** — accessible and faithfully carries the fact; include a complete
  attention-directing `guidance.md`;
- **hold** — carries the fact but routing or license posture is unresolved;
- **still-open** — no adequate accessible source closes it;
- **convention** — no defining source should be invented.

For every recovered fact, label whose analysis it is: the primary's original analysis, a review's
restatement, or a vignette's reanalysis of another dataset. Never launder a surrogate into a
citation of the primary it discusses. Surface contradictions explicitly; a source pointing the
opposite way is a method-validation result, not noise.

Write guidance and run clean-context summarizers for every recommended source exactly as in
Phase 2. Hold and still-open items remain in the run report. Do not write `gap-closing.md`.

**Do not overwrite or re-run the Phase-3 blind draft.** It measures what the original note set
recovered. Gap-closing enriches the corpus for final Mold authoring; it does not retroactively
improve that measurement.

## Phase 6 — author the canonical Molds (source-authoritative synthesis)

Spawn one fresh authoring subagent for the pair. It sees:

- the complete selected source-note set, including Phase-5 additions;
- the Phase-3 blind drafts;
- the classified gap and closure reports;
- the glossary, Mold spec, referee loop, and naming convention.

Do not give it the bioSkills prose as an authority. The reports may identify a capability to
cover, but every final claim must trace to a declared note or remain `[GAP: …]` / convention. The
authoring pass is explicitly separate from the frozen blind measurement.

It returns one canonical doer and one canonical audit, each with `index.md`, `eval.md`, and
`scenarios.md`. Review them, then write directly to:

`content/molds/<canonical-name>/{index.md,eval.md,scenarios.md}`

If a Mold with the same name already exists, update it deliberately rather than creating a
variant. The `index.md` body is cast-facing procedure; keep comparison prose, authoring history,
and source-discovery notes out. Validate:

- wiki-links and typed references resolve;
- `hypothesis` evidence carries `verification`;
- family/role tags and names are coherent;
- eval properties are abstract and scenarios concrete;
- planted-invalid and clean-control cases both exist where the source permits;
- the doer terminates in the audit gate;
- unresolved operational gaps remain visible rather than memory-filled.

## Phase 7 — validate and report

Run the site validator, kind-manifest drift check, typecheck, and production build. Report:

- canonical Mold paths created or updated;
- source notes written, reused, and re-summarized, with paths and counts;
- separate doer and audit recoverability findings;
- the sharpest traceable win and sharpest remaining gap for each Mold;
- recommended surrogates ingested plus held, still-open, and convention-only items;
- any conflict surfaced during retrieval;
- whether the pair is runnable and assessable now, and which citable-source gaps still block it.

Do not commit unless asked.

## Guardrails recap

- Both Phase-3 drafts are blind to the SKILL.md; summarizers are blind to everything but one
  source and its guidance.
- The Phase-6 author treats source notes as authority, never the bioSkills prose or model memory.
- Gaps drive sourcing. Conventions are labeled, never cited. `hypothesis` evidence carries a
  `verification`.
- Reuse existing notes, including cross-skill notes; do not re-ingest what the corpus already has.
- Drafts, comparison, and gap-closing reports remain ephemeral. Only source notes and canonical
  Molds enter `content/`.
- A surrogate is cited as itself and attributed to its own analysis; never launder it into a
  citation of an inaccessible primary.
- Contradictions are findings. Surface them instead of smoothing them.
- Gap-closing never rewrites the blind measurement. Final canonical authoring is a separate,
  explicitly source-authoritative pass.
