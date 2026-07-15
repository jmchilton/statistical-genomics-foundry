# Working in the Statistical Genomics Foundry (planning workspace)

## This is a pre-repo planning workspace

This is **mostly a design/research workspace** deriving a new project from the Galaxy
Workflow Foundry pattern, aimed at statistical genomics. One engineering layer is standing
up incrementally via issue #89 (the validation step-ladder): the `site/` Astro app now has a
frontmatter contract (`site/src/content.config.ts` + `site/src/lib/frontmatter-schema.ts`), a
validator (`npm test` / `npm run validate` in `site/`), and the root vocab registries
(`meta_tags.yml`, `reference_contract.yml`, `license-policy.yml`). There is still **no
`packages/`, `casts/`, ajv `meta_schema.yml`, or fixture tooling** — deliberately deferred
(see `README.md` "Status & next steps" and "Deferred to repo standup" below). Everything else
— `docs/`, `content/research/`, `positioning.md` — is authoring, not engineering.

## Read first

**Read `docs/glossary.md` immediately at session start.** This project uses domain-specific
terminology — Mold, Cast, Pattern, Pipeline, Phase, Provenance, Referee, the Gate, Family A /
Family B, the bipolar corpus, the construct/critique/calibrate roles — that is *not* standard
statistics, genomics, or Galaxy vocabulary, and some of it diverges from the parent Foundry.
The glossary is small, alphabetical, hand-curated, and authoritative: **if two docs disagree
on a term, the glossary wins.** Load it in full before reasoning about anything else here.

## Then orient

- `README.md` — what this workspace is, the thesis, the three pillars, current status.
- `docs/POSITIONING.md` — the positioning narrative (the story); `positioning.md` (root) is
  the working evidence doc with per-system axis maps and verified distinctions.
- `docs/ARCHITECTURE.md` — the architecture as an explicit **diff from the parent Foundry**
  (inherit / adapt / demote / add). The structural authority.
- `docs/GUIDING_PRINCIPLES.md` — adapted principles, including the net-new
  "Doing Never Self-Certifies."
- `docs/REFEREE_LOOP.md` — net-new: the analyze → referee → revise spine and the gate obligation.
- `docs/MOLD_SPEC.md` — adapted Mold authoring contract (conversion axes dropped;
  referee-correctness evals added). Load when authoring or editing a Mold.
- `docs/CORPUS.md` — the bipolar corpus (established-good + cautionary-bad).
- `docs/COMPILATION_PIPELINE.md` — adapted casting + provenance (Pillar 1).
- `docs/MOLDS.md` — initial Mold set, a **TODO outline** — nothing authored yet.

## The rendered site

The corpus renders to a static site — an **Astro app under `site/`**. Run the dev server the way
`site/package.json` documents (its scripts print the local URL + base path). **Content routes are
declared by the page router `site/src/pages/`** (design-doc slugs via `site/src/lib/design-docs.ts`);
recover any source↔route mapping from there rather than hardcoding it. This is the one piece of build
tooling that has stood up — everything under "Deferred to repo standup" has not.

## Authoring conventions (applicable now)

- **Wiki-link fields use `[[Target]]`.** Carry over the parent's convention when docs
  reference Molds, Patterns, schemas, or other notes.
- **Keep the diff-from-parent honest.** This is N=2 in the Foundry-pattern lineage. Each doc
  records what it inherits, adapts, demotes, or adds vs. the Galaxy Workflow Foundry. When you
  change a doc, preserve that framing — it is the evidence that earns the abstraction.
- **Don't write multi-paragraph comments or prose padding.** One short line max when intent
  isn't obvious. Be concise; sacrifice grammar for concision.
- **Don't invent corpus evidence.** When a claim is corpus-observed vs. a design inference vs.
  an external-doc claim vs. speculation, say which. Plausible mappings are not evidence.
- **The glossary is the vocabulary authority.** Introduce a new term there before using it
  across docs; don't let synonyms drift between files.

## Source notes earn their keep by recoverability (applicable now)

Each source gets a short identifier and a directory `content/research/<papers|tutorials|books>/<id>/` — mirroring
how Molds carry an `index.md` plus companion eval/refinement files. It holds a generated **faithful
summary** (`index.md`) and, *by exception*, a hand-maintained **guidance** file (`guidance.md`)
listing the specific questions we need pulled from that source plus any extraction guidance. The
summary is a regenerable cast; the guidance is what we own and maintain — the source-vs-cast split,
applied to reading the literature.

**Summary posture is license-driven, not source-type-driven.** A source note is rendered
**own-words** when its license resolves to `own-words-only` in `license-policy.yml`, and
**license-aware** — short *load-bearing* verbatim quotes allowed, marked — when it resolves to
`verbatim-ok` (public-domain, Creative-Commons, free/open-source). A book is *not* inherently
own-words: `msmb` (CC-BY-NC-SA → own-words-only) is own-words; `harmon-pcm` (CC-BY → verbatim-ok) is
license-aware. Either way, short **functional strings** (exact error messages, parameter/argument
names, numeric thresholds, equation forms) stay verbatim — facts, not protected expression, kept for
recoverability. The `derived:` field records the posture (`own-words-summary` / `license-aware-summary`).

The **two summary commands split by workflow, not posture**: `/regenerate-book-summaries <id>`
bulk-regenerates a **synced, pinned, multi-chapter** source — fan-out over chapters, reading gitignored
`raw/` + the book's co-located `summary-prompt.md` (book-invariant metadata lives once in `book.yml`);
`/summarize-source` summarizes a **single** paper/tutorial in a clean context. *Remaining unification:*
the book command currently ships only the own-words spec, so a verbatim-ok book (`harmon-pcm`) is for
now summarized per-chapter via `/summarize-source`; a **license-aware bulk mode** for the book command
is the open item (see `content/research/05-skill-backing-references.md`, the first CC-BY-book case).

A note is graded by **recoverability, not coverage**: good enough only if the target Mold/skill
could be *rebuilt from the captured notes alone* — no re-reading the source, no model memory.
Restating what a frontier model already knows is the failure mode this project opposes (issue #2 /
the blind-regeneration experiment); a note earns its keep by holding the *specific* facts recovery
needs — numbers, thresholds, exact procedure, named decision criteria, verbatim load-bearing quotes.

Generate the summary in a **clean context** via the `/summarize-source` command
(`.claude/commands/summarize-source.md`), run in a fresh agent so the summarizer sees only the source
+ its `guidance.md`, not our analysis. The command optionally reads the source's `guidance.md` if it
exists. **Guidance questions direct *attention*, not *conclusions*** — ask "does this source state
behavior under perfect confounding? quote it," never "confirm that X is bad," or the summary stops
being faithful. Keep the summary separate from our framing (a flagged `design-inference` footer),
and carry `[summarizer-inferred]` / access / re-check flags forward verbatim — don't launder them.

**Test it, don't assert it.** Before trusting notes to back a skill, run the
**blind-author-from-notes** test: a clean-context agent authors the skill from *only* those notes,
**instructed to mark `[GAP: …]` rather than fill from memory** (load-bearing — without it the model
confabulates; with it the task becomes honest). Diff the draft against what the skill needs; what it
can't supply is the evidence-based work list. Sort each gap:
- **write a new source note** — a method/decision the notes never covered;
- **re-summarize an existing source** (often by adding a `guidance.md`) — the source covers
  it, our note dropped it;
- **flag as convention** — a community threshold with no defining primary (label it, don't cite it;
  see `content/research/05-skill-backing-references.md`).

Gaps drive sourcing, never memory backfill. **Source notes are not skill specs** — a note captures
what one source says; a skill is the synthesis across sources plus decision-rules that often live in
no single source. (Note-type metadata/frontmatter stays deferred to repo standup, below — describe
the convention now, don't formalize a schema.)

## Deferred to repo standup (do NOT author yet — would be fiction)

These exist in the parent Foundry's `AGENTS.md` but describe machinery this workspace does
not have. Port them (as an explicit diff) only when the actual repo stands up:

- **[Standing up via issue #89 — an adapt, not the parent's port]** The frontmatter-is-contract
  layer now exists as **one zod module** (`site/src/lib/frontmatter-schema.ts`) consumed by both
  the site build and a standalone validator (`npm run validate` in `site/`) — deliberately *not*
  a mirrored ajv `meta_schema.yml` + separate site schema (the parent's two-encoding drift,
  avoided). `meta_tags.yml` + `reference_contract.yml` registries landed with it. Still deferred:
  the parent's ajv Draft-07 `meta_schema.yml` form; `validate before commit` as a Makefile target
  + pre-commit hooks (the `site/` npm scripts are the standing exception — see "The rendered site").
- Mold IO schemas in packages; "don't edit generated files" (Dashboard/Index/casts).
- Vendored planemo artifacts, generated `workflow-fixtures/`, the pnpm package layout.

When these land, prefer adapting the parent's wording with the inherit/adapt/demote/add diff
made visible, the same way the `docs/` files already do.
