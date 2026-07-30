---
type: meta
title: "Architecture"
record_kind: foundation
order: 4
tags:
  - meta
status: reviewed
created: 2026-06-26
revised: 2026-07-27
revision: 16
summary: "Physical layout, content types, validation pipeline, generated artifacts, and site rendering."
---

> **Status: adaptation in progress.** This doc derives from the Galaxy Workflow Foundry's `content/meta/architecture.md` and adapts it to our domain (statistical genomics) and our identity (a method-validity referee). It is organized as an explicit **diff** from the parent: what we inherit unchanged, what we adapt, what we demote, what we add. It is not yet a from-scratch authority — it records decisions and open questions so the real architecture can be settled deliberately.
>
> Working name: **Statistical Genomics Foundry** (provisional — see `content/meta/molds.md` open decisions; the referee-centric identity may want a more distinctive name).

## 0. The bet, in one paragraph

Organize the knowledge well — typed frontmatter, registered tags, wiki-linked references, generated indexes, a human-navigable site — and the skills, validation, and rendering fall out naturally. That premise is inherited verbatim from the parent. Our addition: the knowledge being organized is *how to do statistical genomics honestly*, and the validation that falls out is not a schema parser but an **empirical referee** — and producing that referee is itself a first-class skill.

## 1. Inherited DNA (carries over essentially unchanged)

These are the load-bearing abstractions we take from the Foundry pattern. They give us **Pillar 1 (source→cast→provenance)** and **Pillar 3 (human-foregrounded KB)** for free — which is the whole reason we derive from the Foundry rather than starting fresh.

- **Mold** — an abstract, structured template: a typed reference manifest (frontmatter declaring typed references to heterogeneous artifacts) + a procedural body skeleton. Directory note (`molds/<slug>/index.md` + siblings).
- **Cast / Casting / Cast artifact / Cast target** — the process that turns a Mold into a self-contained, frozen, portable skill artifact with no link back to the source. Per-kind dispatch over references (patterns and notes copied, prompts inlined, evals dropped). Deterministic here: this Foundry does not implement an LLM condensation phase.
- **Provenance** — every derived artifact records what produced it (source hash, model, prompt version, resolved-ref hashes, timestamp). The single cleanest distinction from prior art (Pillar 1).
- **Pattern / reference content** — reference pages wiki-linked from Molds, carried into casts.
- **Progressive disclosure** — Pipelines disclose the journey, Molds disclose the action, typed references disclose the dependency surface. Both an authoring principle and a runtime contract.
- **The human-navigable site** — an Astro renderer over typed content collections, with wiki-link panels, backlinks, tag browses, and raw-text endpoints. This *is* Pillar 3.
- **Validator-as-cross-resolver** — one shared slug+resolver, now `@galaxy-foundry/wiki-links` and so shared with the parent Foundry too, used by both validator and site; cross-file wiki-link resolution with referential integrity (not just format-linting). This is the verified edge over bioSkills' format-validated paths.
- **Generated indexes with drift gates** (`--check`), **status lifecycle** (`draft|reviewed|revised|stale|archived`), **append-only operations log**, **controlled tag registry** (`meta_tags.yml` — see §8), **strict frontmatter schema** (the parent mirrors an ajv `meta_schema.yml`; we keep one zod module, `.strict()`, no mirror).
- **Casting is the integration boundary** — Molds are durable source; cast skills are generated target artifacts; portability across runtimes is a casting concern.

## 2. Domain adaptations (same shape, different content)

- **Corpus.** Galaxy = the IWC workflow corpus, cited by URL. **Ours = established statistical-methods literature + cautionary negative examples**, cited by URL/DOI. Concretely: Bioconductor vignettes / OSCA, GWAS QC protocols (Marees, Anderson), methodology papers, simulation/calibration standards (SBC, posterior predictive checks), and named-invalidity literature (double-dipping/`countsplit`, batch-effect literature, garden-of-forking-paths). Corpus-first still holds — abstractions must trace to real exemplars — but the corpus is methods-and-cautions, not workflows. (Adapt `content/meta/corpus.md` → a "methods-and-negative-examples corpus" doc; same URL-not-mirror principle.)
- **The deterministic gate.** Galaxy = `gxwf` static schema validation (the parser catches hallucinated tool IDs, malformed gxformat2). **Ours = an empirical referee** — null/permutation calibration, simulation-under-known-truth, negative controls, assumption checks, error-rate control. The principle "deterministic tools do deterministic work; don't let the model grade itself" is *unchanged*; its *form* moves from schematic to empirical. Crucially, where Galaxy's gate is pure infrastructure (a CLI), **ours is partly a Mold-produced deliverable** — "construct the negative control / simulation the field trusts here" is a skill (Family B), not just a tool we call.
- **CLI tools.** Galaxy = `gxwf` (design-time) + `planemo` (runtime). **Ours = the statistical-genomics tool ecosystem** — R/Bioconductor (DESeq2, limma, DHARMa, countsplit, simr), PLINK/regenie/GCTA, Hail, statsmodels, simulators (splatter, polyester), calibration tools (LDSC). CLI-manual-page concept carries, but defer authoring until a real action Mold needs an exact command.
- **Mold axes.** Galaxy axes (`source-specific | target-specific | tool-specific | generic`) are about a *conversion*. We are not primarily converting source→target, so those axes mostly don't apply. Our provisional role distinction is **construct / critique / calibrate** (≈ Family A do, Family B critique, Family B empirical-gate) — but see §4: do **not** formalize this as a schema enum yet.

## 3. Demotions (things the parent leans on that we deliberately lighten)

- **Strict JSON-Schema Mold IO contracts → demoted.** Galaxy Molds pass structured JSON between phases (summaries, tool descriptions), so strict IO schemas earn their keep. Our deliverables are critiques, recommendations, validation protocols — **prose-shaped**. Forcing JSON schemas where the output is judgment is friction for no gain. Keep outputs as structured markdown; reserve real schemas for the rare genuinely-structured artifact (e.g. a power calculation result). This is a real architectural lightening, not an oversight.
- **Pipeline-primary IA → Mold-primary IA.** Galaxy is pipeline-primary: Molds exist to fill ordered pipeline phases; the subway map is the primary navigation surface; the Mold-inventory invariant ("Molds = union of pipeline phases") is machine-enforced. **We are Mold-primary**: Molds are standalone toolkit skills; the catalog (grouped Family A / Family B, or by construct/critique/calibrate) leads navigation. Pipelines do not vanish — they reappear as *methodology protocols* (§4) — but the inventory invariant **relaxes**: a Mold may legitimately belong to no pipeline. (Dashboard leads with the Mold catalog, not pipelines.)

## 4. Additions (genuinely new to this project)

- **The do → referee → revise loop.** The structural spine. Galaxy has `author → validate → fix` (deterministic gate refereeing a generative step). We generalize it: an analysis (Family A) hands off to a referee (Family B), which may force a revision. The novelty vs Galaxy: the *referee node is itself a Mold*, not deterministic infrastructure. The novelty vs POPPER: the referee judges *method validity*, not a hypothesis. This is encoded at the **pipeline/protocol altitude** (a gate/loop), **not** as a property on a Mold — reusing the parent's validation-loop abstraction rather than inventing a Mold-type axis.
- **The gate obligation.** "Doing never terminates in self-certification" is a checkable invariant we want to encode: a Family-A "do" protocol must hand off to a Family-B referee before it certifies. This is the project's entire value-add over the failure mode in the problem statement. (Mechanism TBD — likely a pipeline convention + a `[gate]`-style phase; see open decisions.)
- **Method-validation protocol (the one place Pipelines re-earn their keep).** A branchy arc: `map-to-established-method` → (if novel) → `derive-null-and-calibration` → `design-simulation-study` → `power` → `sensitivity`. Authored only if/when the standalone Molds prove they chain — not up front.

## 5. Open decisions (do not encode prematurely)

- **Do/check role taxonomy.** Tempting to add a `role: analysis|review` (or `construct|critique|calibrate`) axis. **Defer.** We have zero Molds; minting a taxonomy before content exists is the invention-first anti-pattern the parent explicitly warns against. Mark roles with cheap, reversible **tags + naming conventions** (`audit-*`, `review-*`, `derive-*`) for now; promote to a schema enum only after ~6–10 real Molds show the distinction self-organizing. Watch the false-binary risk: many Molds straddle do/check (`assess-batch-effects` both detects and flags). If >⅓ straddle, the axis is wrong — drop it.
- **Gate-obligation mechanism.** Whether "do hands off to a referee" is a `[gate]` phase, a pipeline convention, or validator-enforced — settle when a real protocol needs it.
- **Reuse POPPER's sequential-testing math** for the loop's gate (e-values, Type-I control) vs. roll our own — open; flagged in positioning.
- **Project name** — "Statistical Genomics Foundry" is provisional; the referee/conscience identity may want something sharper.
- **Schema packages.** If/where we keep schemas, do we keep the parent's `packages/<name>-schema` package convention, or lighten it given the demotion in §3? Likely lighten.

## 6. Provisional file layout

Inherits the parent's shape; adjusted for Mold-primary IA and the lighter schema story. **Provisional** — settle alongside §5.

```
<repo>/
├── README.md
├── AGENTS.md / CLAUDE.md            # authoring rules (to port + adapt)
├── meta_tags.yml                   # tag registry — facets: family/role/domain/topic (§8)
│                                   # (frontmatter contract lives in site/src/types/, a directory
│                                   #  per kind, one zod encoding — see §9)
├── docs/
│   ├── POSITIONING.md              # ✅ written
│   ├── ARCHITECTURE.md             # ✅ this doc
│   ├── MOLDS.md                    # ✅ Mold TODO outline
│   ├── GUIDING_PRINCIPLES.md       # ✅ adapted (+ net-new "Doing Never Self-Certifies")
│   ├── REFEREE_LOOP.md             # ✅ net-new (the do→referee→revise spine + gate obligation)
│   ├── CORPUS.md                   # ✅ adapted (bipolar corpus: established-good + cautionary-bad)
│   ├── MOLD_SPEC.md                # ✅ adapted (axis dropped; referee-correctness eval guardrails)
│   └── COMPILATION_PIPELINE.md     # ✅ adapted (casting + provenance; mostly portable)
├── content/
│   ├── molds/<slug>/index.md       # the toolkit (Family A + Family B) — Mold-primary
│   ├── patterns/                   # statistical-method + invalidity-pattern reference pages
│   ├── corpus/                     # the bipolar corpus: established-good + cautionary-bad analysis exemplars (cited by URL/DOI)
│   ├── research/<papers|tutorials|books>/<id>/  # source-reading notes (index.md = faithful summary, guidance.md = owned). Still conceptually distinct from content/corpus (source-casts vs built exemplars) — now co-located under content/, not a top-level sibling
│   │   └── projects/               # prior-art related-project notes + SOTA lens surveys (a dump — pending organization)
│   ├── protocols/ (≈ pipelines/)   # methodology protocols incl. the method-validation arc
│   ├── schemas/                    # minimal — only genuinely structured IO
│   ├── meta/glossary.md            # ✅ adapted (now at content/meta/; skipped by the validator)
│   └── log.md
├── casts/<target>/<name>/          # generated skill artifacts + _provenance.json
├── packages/                       # build/validate tooling (port build-cli; lighten schema pkgs)
├── site/                           # Astro renderer (port; lead IA with Mold catalog)
└── scripts/, tests/
```

## 7. TODO — remaining parent docs to port & adapt

In rough priority order:
1. ✅ **GUIDING_PRINCIPLES.md** — adapted; "corpus-first" → methods/negative-example corpus, "deterministic tools" → empirical referee, plus net-new **Doing Never Self-Certifies**.
2. ✅ **REFEREE_LOOP.md** (new) — the do→referee→revise spine, the gate obligation, the two novelties (referee-is-a-Mold, judges-method-validity).
3. ✅ **MOLD_SPEC.md** — adapted; `axis` dropped for soft family/role tags, IO-schema demoted, eval guardrails reframed to referee-correctness.
4. ✅ **CORPUS.md** — adapted; URL-not-mirror preserved, corpus swapped to a bipolar methods + cautionary-examples corpus.
5. ✅ **COMPILATION_PIPELINE.md** — adapted; casting + provenance mostly portable, schema kind demoted, empirical-checks-run-at-runtime nuance added.
6. ✅ **glossary.md** — adapted; conversion terms dropped, Family A/B + referee + gate + construct/critique/calibrate + bipolar-corpus added.
7. ✅ **The frontmatter contract** — done, as **one zod encoding**: a directory per kind under `site/src/types/`, assembled by `site/src/lib/frontmatter-schema.ts` and consumed by both the site build and the standalone validator. There is no JSON-Schema mirror to drift against. `meta_tags.yml` landed alongside it — see §8, and §9 for the layout.
8. **HARNESS_PIPELINES.md / SCHEMA_PACKAGES.md** — port last; both lighten under our Mold-primary, schema-light stance.

**Doc scaffold is complete in prose, and the contract layer is live.** What remains is item 8, the two lightest design docs.

## 8. Tag system

`meta_tags.yml` at the repo root is the controlled tag vocabulary. `site/src/lib/meta-tags.ts` loads it, and the zod contract refines every `tags[]` entry through `isValidTag` — so the vocabulary changes in one file and the schema code stays static.

Tags are grouped into **facets** — `family`, `role`, `domain`, `topic` — each declaring a `label`, a `description`, and its `values` (tag → one-line gloss):

```yaml
version: 1
facets:
  domain:
    label: Domain
    description: Subject-matter area a Mold/note applies to.
    values:
      domain/batch-effects: Technical, non-biological variation that confounds measured signal.
```

Three rules carry the weight:

- **Membership is declared, not parsed.** A tag is valid because its facet lists it under `values`, never because its text starts with a facet name — `domain/unlisted` is invalid despite looking namespaced. The slash is a naming convention, so a bare key would be an ordinary member; our vocabulary happens to be entirely slashed, but the format does not require it. Browse pages group by the *declaring* facet, which is what makes an "other" bucket impossible rather than merely empty.
- **Every facet is closed.** Each tag is listed with a gloss, and there is no open/free-form/prefix-wildcard escape hatch — not in this registry and not in the loader. Every tag the corpus can carry stays documented and browsable, permanently.
- **`tags` is `min(1)`.** Every note carries at least one facet tag. Molds and experiments take `family/*` + `role/*`; source notes and patterns take `domain/*` + `topic/*` subject facets.

Note-kind is the `type:` discriminator and is never copied into `tags:` — tags are cross-cutting facets only.

`site/tests/registry-drift.test.ts` checks that the registry and the corpus agree *both* ways: the schema rejects a note carrying an unregistered tag, and the drift test rejects a registered tag carried by zero notes, or a facet with no members in use. Its scope is the vocabulary we authored — a registry we inherit whole (the installed `@galaxy-foundry/license-policy` table, and the reference contract's `used_at`/`load`/`evidence`) arrives complete, so unused rows there are inheritance, not drift. **Narrowing moves a group across that line:** `modes` is inherited but declined down to what our caster will support, so a mode we chose to keep is one we authored, and it is drift-checked alongside `kinds`.

The registry **format** is shared across Foundry instances — specified in [galaxyproject/foundry-pattern](https://github.com/galaxyproject/foundry-pattern), `content/pattern/standing-up-a-foundry.instructions.txt` — so a format change is a cross-repo change. The facet **vocabulary** above is ours alone: the Galaxy Workflow Foundry's facets (`source`, `target`, `tool`, `cli`, `topic`, `meta`) are its own, and only `topic` collides by name — theirs groups pattern maps, ours sits beneath a `domain`.

## 9. Note kinds

Every note declares its kind exactly once, in frontmatter, as `type:`. That field is the **sole discriminator**: the kind picks the schema, and nothing infers a kind from a directory, a filename, or a tag. Five kinds are defined, **one per directory** under `site/src/types/`:

| kind | directory | what it is |
|---|---|---|
| `book` | `types/book/` | a chapter summary of an external textbook; book-level license/attribution copied in from `book.yml` by `npm run books` |
| `paper` | `types/paper/` | a faithful summary of a paper, with provenance and a resolved license posture |
| `tutorial` | `types/tutorial/` | the same, for a vignette or package tutorial |
| `mold` | `types/mold/` | an abstract action template — the Mold-primary core, incl. referee Molds |
| `pattern` | `types/pattern/` | a cautionary-bad or established-good corpus leaf |

Each directory holds `schema.ts` (the contract), `kind.md` (what the kind is *for*, and why each required field is required), and `example.md` (a minimal valid note, which `site/tests/kind-directories.test.ts` parses against that kind's own schema — so the documentation stays executable). `types/context.ts` holds the base envelope and the field primitives shared by more than one kind; `types/index.ts` is the one enumeration, and a drift test asserts it matches the directory listing both ways. `site/src/lib/frontmatter-schema.ts` is the assembler, and only the assembler: it composes those definitions into `NOTE_KINDS` and `COLLECTIONS` and defines no fields of its own.

The layout is a shared contract — [galaxyproject/foundry-pattern#13](https://github.com/galaxyproject/foundry-pattern/issues/13), PART 3 of the standing-up checklist — implemented independently here and in the parent. `site/src/types/kinds.generated.json` is the machine-readable form of the table above, with each kind's required-metadata list **derived from its zod shape** rather than written by hand; `npm run kinds` regenerates it and CI checks it is current. The pattern site renders ours beside the parent's as a cross-instance kind catalog.

`papers` and `tutorials` are two schemas over one shared field set rather than one schema with a `z.enum(['paper','tutorial'])`, because the enum let a `type: paper` note sit under `content/research/tutorials/` and still validate. A literal per kind makes the collection and the declared kind agree, or fail. The split is also what lets the two kinds *differ* — bibliographic identifiers (`pmid`, `pmcid`, `arxiv`, `oa_url`) belong to papers, release metadata (`bioconductor_release`, `docs_url`, `published`) to tutorials; under one shared enum every field had to be legal on both.

**Every kind is `.strict()`** — an undeclared frontmatter key is an error, not extra detail. This is the parent Foundry's posture (17 `.strict()` calls to our previous one), and adopting it was not free: turning it on surfaced 11 keys across 7 notes that no schema had ever declared. All were real, useful fields — `/summarize-source` even asks for an "open-access URL if any" — so they were declared rather than deleted. Two had also quietly acquired the [#87](https://github.com/jmchilton/statistical-genomics-foundry/issues/87) footgun *because* they were undeclared and so unvalidated: unquoted `pmid: 33015620` parses as an integer and `published: 2024-03-21` as a `Date`. Both are quoted strings now. Strictness is what stops the next such key accumulating silently — and it is why a book chapter cannot shadow `book.yml`'s license metadata by restating it.

**Collection and kind are deliberately not one-to-one.** `COLLECTIONS` maps six browse collections onto those five kinds: `experiments` holds the candidate Molds produced by the blind-assembly runs, which *are* Molds and declare `type: mold`. The collection is a location — it earns its own route, and its notes sit beside their `comparison.md` / `gap-closing.md` narratives (which carry no frontmatter and are never loaded). The kind is what the note *is*. Keeping that mapping explicit is what lets a catalog enumerate five kinds while the site routes six collections.

### The note envelope — partially adopted

The parent puts a common envelope on *every* note: `status`, `created`, `revised`, `revision`, `ai_generated`, and a required `summary`. We have taken the part that pays for itself now and left the rest genuinely unported, rather than pretending to a convergence we have not done:

| field | here | why |
|---|---|---|
| `summary` | **required on `mold`**, 20–160 chars | The site prints it in every tag-browse row; optional meant 12 of 13 Molds listed as a bare name. The bounds are the parent's. |
| `status` | **required on `pattern`**, parent's lifecycle enum | Was free text, and the only value in use was `stub` — outside the vocabulary every other Foundry note is held to. `stub` → `draft`. |
| `created` / `revised` / `revision` | not ported | Only honest if backfilled from git history; stamping today's date on a 127-note corpus would manufacture provenance rather than record it. |
| `ai_generated` | not ported | Needs a per-note truth we do not currently track. |

That leaves a real, documented difference for the kind catalog to show, which is the point: the substrate is what both instances turned out to need, not what one of them happened to build first.

`site/tests/registry-drift.test.ts` holds the kinds to the same both-ways rule as the tag registry: no kind defined but declared by zero notes, and no kind without a collection to put notes in — a kind nothing routes to is unauthorable, so its schema could never run.

This converges with the parent Foundry, where `type` is likewise the sole note-kind discriminator (galaxyproject/foundry#374). The two instances differ in how many kinds they define and what fields those kinds require; they agree that a note names its own kind. Kinds therefore enumerate mechanically in both repos, which is what a cross-instance kind catalog (galaxyproject/foundry-pattern#13) reads.
