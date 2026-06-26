# Working in the Statistical Genomics Foundry (planning workspace)

## This is a pre-repo planning workspace

This is **not yet a built project** — it is a design/research workspace deriving a new
project from the Galaxy Workflow Foundry pattern, aimed at statistical genomics. There is
**no build, validator, schema, package, cast, or fixture tooling here yet**. Do not look
for `npm run validate`, `meta_schema.yml`, `packages/`, or `casts/` — they are deliberately
deferred (see `README.md` "Status & next steps"). Right now there are only prose design
docs (`docs/`), prior-art research (`research/`), and the positioning evidence
(`positioning.md`). Treat this as authoring, not engineering.

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

## Deferred to repo standup (do NOT author yet — would be fiction)

These exist in the parent Foundry's `AGENTS.md` but describe machinery this workspace does
not have. Port them (as an explicit diff) only when the actual repo stands up:

- Frontmatter-is-contract rules, `meta_schema.yml` (Draft 07, `additionalProperties: false`),
  `meta_tags.yml` tag registry.
- `validate before commit`, `npm run …`, Makefile targets, pre-commit hooks.
- Mold IO schemas in packages; "don't edit generated files" (Dashboard/Index/casts).
- Vendored planemo artifacts, generated `workflow-fixtures/`, the pnpm package layout.

When these land, prefer adapting the parent's wording with the inherit/adapt/demote/add diff
made visible, the same way the `docs/` files already do.
