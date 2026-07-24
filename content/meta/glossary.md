# Glossary (adapted from the Galaxy Workflow Foundry)

> Hand-curated, alphabetical. Adapted from the parent's `content/meta/glossary.md`: Foundry-pattern terms (Mold, Cast, Pattern, Pipeline, Phase, Provenance, the eval/scenario split) carry over; Galaxy-specific terms (gxformat2, gxwf, planemo, IWC, freeform-summary, composed/direct paths, discover-or-author, topology-repair, source/target/tool axes) are **dropped**; new terms for our identity (Family A/B, the referee, the gate, the bipolar corpus, the construct/critique/calibrate roles) are **added**. If two docs disagree on a term, this file wins. (Lives at `content/meta/glossary.md`; skipped by the validator, like the parent's.)

---

**Analyze → referee → revise loop** — the project's structural spine. An analysis (Family A) hands off to a referee (Family B), whose verdict gates certification; on a fail the analysis is revised (bounded) or escalated. Generalizes the parent's `author → validate → fix` loop; the novelty is that the referee node is a *Mold* and judges *method validity*. See `REFEREE_LOOP.md`.

**Assessment axis** — one of the four `-ability` dimensions a **Rubric** grades a Family-A doer
skill on: **Operability** (can the tooling be run), **Assessability** (can the skill be tested),
**Traceability** (do claims trace to recoverable sources), **Refereeability** (is the doing gated by
a real Family-B referee). A skill scores as a *vector* of the four letters, never a composite. See
`content/research/mold-eval/rubrics/`.

**Bipolar corpus** — our grounding corpus has two poles: **established-good** (methods + their validity conditions) and **cautionary-bad** (named invalidity patterns + signatures + remedies), plus supporting reporting-standard, calibration-methodology, and benchmark kinds. Unlike the parent's all-positive IWC corpus, a referee needs both poles. See `CORPUS.md`.

**Calibrate** *(Family B role)* — *construct and run* an empirical check: permutation/null, simulation-under-known-truth, negative controls, power. The external verdict that is *not* self-certification. The role that turns the gate into a deliverable. Contrast **Critique**.

**Cast** *(verb)* — produce a self-contained skill artifact from a Mold via casting. *(noun)* — one casting result for a (Mold, target) pair.

**Casting** — the deterministic-assembly-plus-LLM-condensation process that turns a Mold into a cast artifact, via per-kind dispatch over its references. See `COMPILATION_PIPELINE.md`.

**Cautionary-bad** — the corpus pole of named invalidity patterns (double-dipping, batch confounding, naive multiple-testing, forking paths) with their signatures and remedies. Grounds the referee. No parent analog.

**Construct** *(Family A role)* — *do* the analysis: frame, design-review, select an established method, run reproducibly. Contrast Critique/Calibrate.

**Corpus-first** — abstractions must trace to observed practice, not be invented top-down. Load-bearing for us specifically: our failure mode *is* plausible invented prose, so a reference note starts as a stub and grows only when a real case demands it. *We must not become the thing we referee.* See `GUIDING_PRINCIPLES.md`.

**Critique** *(Family B role)* — *reason about* validity against known invalidity patterns (double-dipping, confounding, assumption violations). Necessary but not sufficient — it is itself model reasoning, so the strong gate also requires a **Calibrate** pass.

**Established-good** — the corpus pole of established methods and when they apply. Grounds Family A's "pick an established method, don't invent."

**Evaluation plan** *(`eval.md`)* — the Mold's abstract oracle: fixture-independent property checks (*how* to judge any output), never concrete cases. For us, the highest-value properties are **referee-correctness guardrails** ("a double-dipped analysis must be flagged, never passed"). Never packaged into casts. Distinct from **Scenario note**.

**Family A** — *do the analysis*: frame the question, review the design, select an established method, run reproducibly. Leans on orchestrating existing doers + the anti-invention guardrail.

**Family B** — *referee the analysis*: audit method validity (Critique) and construct the empirical checks the field trusts (Calibrate). The project's teeth.

**Foundry** — the standalone, navigable knowledge base where Molds, patterns, corpus notes, and protocols live and from which casting reads. Working name: **Statistical Genomics Foundry** (provisional). Instance #2 in the Foundry-pattern lineage (Galaxy = #1). The substrate term for this source-of-truth artifact is **Knowledge Base (KB)**.

**Gate / gate obligation** — the invariant that a Family-A protocol may not terminate in self-certification; it must hand off to a Family-B referee whose verdict gates certification. The project's defining structural rule. Encoded at the protocol altitude, not as a Mold property.

**Knowledge Base (KB)** — the inspectable, human-readable source of truth at the center of the instance — the standalone, navigable site where Molds, patterns, corpus notes, and protocols live and from which casting reads. Authored to be *read and learned by a human*, not merely stored for retrieval. The KB is the source; a **skill artifact** is the package. This instance colloquially calls it *the Foundry* (see **Foundry**).

**License-aware summary** — a **Source note** whose license resolves to `verbatim-ok` in `license-policy.yml`, so short *load-bearing* verbatim quotes are permitted (marked as such). `derived: license-aware-summary`. E.g. `harmon-pcm` (CC-BY). Contrast **Own-words summary**; the choice between them is **Summary posture**.

**Method validity** — the property our referee judges: are assumptions met, is there no double-dipping/circularity, is the named method real and appropriate, is its error rate actually controlled? The layer *beneath* the p-value — what hypothesis-validators (e.g. POPPER) take as trusted input.

**Mold** — an abstract, structured template: a typed reference manifest (frontmatter) + a procedural body skeleton. Directory note (`content/molds/<slug>/index.md` + siblings). Cast into one or more skill artifacts. See `MOLD_SPEC.md`.

**Own-words summary** — a **Source note** whose license resolves to `own-words-only` in `license-policy.yml`, rendered entirely in new expression — no transcription — with only short **functional strings** (error text, parameter names, numeric thresholds, equation forms) kept verbatim as facts. `derived: own-words-summary`. E.g. `msmb` (CC-BY-NC-SA). Contrast **License-aware summary**.

**Pattern page** — reference content describing a statistical-method pattern (established-good) or an invalidity pattern (cautionary-bad). Wiki-linked from Molds; condensed into casts. Cites corpus sources by URL/DOI.

**Phase** — one atomic unit of a Protocol's ordered sequence: a Mold reference, a `[loop]`-flagged Mold, or a non-Mold annotation (`[branch]` routing, `[gate]` checkpoint). The phase-kind set is open. The `[gate]` kind is the likely encoding of the gate obligation.

**Pipeline / Protocol** — an ordered sequence of phases composing a methodology journey (e.g. the method-validation arc: map-to-established → derive-null → simulation → power → sensitivity). **Demoted from the parent's pipeline-primary IA**: we are Mold-primary, so Molds may stand alone and Protocols are optional. Referenced content, not cast.

**Progressive disclosure** — show the right knowledge at the right time: protocols disclose the journey, Molds the action, references the dependency surface. Both an authoring principle and a runtime contract. The basis of **Pillar 3** (knowledge foregrounded for a human reader).

**Provenance** — every derived artifact records what produced it (source hash, model, prompt version, resolved-ref hashes, timestamp). The basis of **Pillar 1**; never lightened. See `COMPILATION_PIPELINE.md`.

**Referee** — a Family-B Mold (or protocol stage) that judges an analysis's method validity using empirical checks rather than the agent's own reasoning. Non-self-certifying. The novelty vs the parent: the referee is a *Mold*, not a deterministic CLI.

**Reference** *(a.k.a. reference kind)* — a typed dependency a Mold declares; the *kind* discriminator controls casting behavior: `pattern`, `research`, `cli-command`, `schema` (demoted), `prompt`, `example`, `eval` (never packaged).

**Rubric** — a standing, living scorecard grading a Family-A doer skill on one **Assessment axis**
(A–F, half steps), grounded in probe evidence and updated as more skills are graded. Net-new to this
instance; `content/research/mold-eval/rubrics/`. **Traceability** is the standing-metric form of the `/ingest-bioskill`
recoverability probe; **Refereeability** grades the **Gate** obligation. Prose contracts, not tooling
(scoring machinery deferred to repo standup).

**Scenario note** *(`scenarios.md`)* — the Mold's concrete test cases: a fixture/input binding + its expected verdict, exercised by the `eval.md` oracle. For us, richest as **planted-invalid fixtures** (a deliberately double-dipped analysis → expected "flagged"). StatQA is a ready source. Distinct from **Evaluation plan**.

**Schema (Mold IO)** — a JSON Schema declaring a Mold's structured input/output. **Demoted** for us: our outputs are prose-shaped critiques/protocols, so schemas are rare, reserved for genuinely structured artifacts (e.g. a power-calc result).

**Self-certification** — the failure mode the project exists to stop: an agent doing an analysis and blessing its own validity in the same breath, with fluent rationale and no external check. The gate obligation forbids it.

**Skill artifact** *(a.k.a. cast artifact)* — the compiled output of casting: self-contained, condensed, frozen against the source version, no links back, no runtime dependency on the Foundry. Carries `_provenance.json`.

**Source note** — a per-source reading note under `content/research/<papers|tutorials|books>/<id>/`: a regenerable **faithful summary** (`index.md`) plus, *by exception*, an owned **guidance** file (`guidance.md`). A regenerable cast (what the source says), kept separate from our framing. Graded by recoverability, not coverage. Its **Summary posture** is license-driven. For books, book-invariant metadata lives once in a co-located `book.yml`. See `AGENTS.md` "Source notes earn their keep by recoverability."

**Summary posture** — whether a **Source note** is an **Own-words summary** or a **License-aware summary**. **Determined by the source's license** (`license-policy.yml` `policy`: `own-words-only` vs `verbatim-ok`), *not* by source type — a book is not inherently own-words (`msmb` is; `harmon-pcm`, CC-BY, is license-aware). Recorded in the note's `derived:` field. The two summary commands split by *workflow* (bulk book vs single source), not by posture.

**Target** *(a.k.a. cast target)* — an output format casting can produce (Claude skill, generic, web). One Mold may cast to several.

**Usage note / Refinement note** *(`usage.md` / `refinement.md`)* — author-facing illustration / open design questions about a Mold. Never packaged into casts. Carried over unchanged from the parent.

**Wiki link** — `[[Target]]`. First-class in typed frontmatter fields and body prose; resolved by a single shared resolver (validator + site), with cross-file referential integrity — the verified edge over format-only relationship validation.
