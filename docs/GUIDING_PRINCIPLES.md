# Guiding Principles (adapted from the Galaxy Workflow Foundry)

> Adapted from the parent's `docs/GUIDING_PRINCIPLES.md`. Most principles carry over with the domain swapped; two change materially (**Deterministic Tools** → empirical referee) and one is **net-new** (**Doing Never Self-Certifies**) because our failure mode demands it. Where a principle is essentially the parent's, that's deliberate — the principles are the shared soul of the Foundry pattern.

LLM-driven statistical-genomics analysis fails in a specific, dangerous way: it produces statistically *plausible-but-invalid* work — at worst, an *invented method* with a fluent derivation and a memorable name and no validity — and certifies it with authoritative rationale. Monolithic "do the analysis" agents decay because they answer this with more reasoning, when the whole problem is that reasoning is what failed. These principles are the design pressure behind the alternative.

This project is not just a glossary, a docs site, or a pile of skills. It is an attempt to make statistical-genomics knowledge durable, inspectable, executable, **and externally checkable** while the surrounding tooling keeps changing.

## Source Authority Beats Local Copies

Knowledge stays healthy near the project that owns it. Established methods belong in their papers and their reference implementations (Bioconductor, CRAN, tool repos). Tool behavior belongs in the tool. Reporting standards belong with their issuing bodies (EQUATOR, ClinGen/PRS-RS, MIQE).

This project should not become a stale mirror. It points upstream, quotes only what it must, and pins citations by DOI/commit when freshness matters. Concretely:
- Pattern and reference pages cite methods literature and cautionary examples by URL/DOI, not by importing them.
- Tool behavior comes from invoking the tool, not from prose we maintain about it.
- Vendored standards/checklists are copied into a cast artifact only when the artifact needs them; the issuing body remains the owner.

We add value by connecting, explaining, operationalizing, and *refereeing* upstream knowledge — not by competing to be its canonical home.

## Reproducibility At Every Layer

Statistical analysis is itself a scientific act. A result is only useful if a maintainer can recover how it was derived, which assumptions it inherited, and **which validity checks were applied**. Reproducibility here is broader than rerunning the final analysis; it includes the provenance of every derived artifact: which Mold was cast, which model/prompt produced it, which references and methods grounded it, **and which empirical checks (null, simulation, calibration, negative control) the referee ran**. This is why casts record provenance and why refereeing is part of the loop, not a final cleanup.

The goal is accountable change, not perfect immutability.

## Deterministic Tools Do Deterministic Work — *and the model never grades its own validity* **(transformed)**

This is the principle that changes most from the parent. LLMs are excellent at interpretation, synthesis, and translation; they are poor replacements for the things that establish statistical validity. In the parent, "deterministic work" meant parsers and schema validators. **Here it means the field's empirical instruments**: permutation/null calibration, simulation under known truth, negative controls, assumption diagnostics, error-rate control.

The soul of the principle is unchanged — *do not let the model be the only judge of its own work.* The boss's disaster is precisely what you get when fluent self-rationalization is the sole gate. What changes is the *form* of the external check: from **schematic** (does this parse?) to **empirical** (is this calibrated? does it control error under the null? does it recover known truth?).

Two consequences specific to us:
- **Spend model context on judgment, spend the empirical check on validity.** If a permutation test can reject a confounded result, run the permutation test; don't ask the model to opine on whether the result is confounded.
- **The empirical check is partly a deliverable, not just infrastructure.** No parser ships for "is this method valid." So *constructing* the right null / simulation / negative control is itself a first-class skill (Family B, the calibrate role). The gate moves from infrastructure into the work product.

## Doing Never Self-Certifies **(net-new)**

The structural bet, elevated to a principle. An analysis (Family A) must **hand off** to a referee (Family B) before it can be certified. Doing and refereeing are separated so the agent cannot do-and-bless in one breath. This generalizes the parent's `author → validate → fix` loop, with one difference that matters: the parent's validator is a deterministic CLI (infrastructure); **our referee node is itself a Mold**, and it judges *method validity* — the layer that even rigorous hypothesis-validators (POPPER) take as trusted input. See `REFEREE_LOOP.md`.

This principle is why the project exists. Everything else serves it.

## Progressive Disclosure Over Context Flooding

Agents — and humans — should see the right knowledge at the right time. Don't flatten every method, diagnostic, checklist, and cautionary example into one prompt or one skill body just because it exists. Protocols disclose the journey; Molds disclose the action; typed references disclose the dependency surface; load policy distinguishes up-front from on-demand; casting decides copied vs condensed vs inlined.

The goal is navigable depth: a human browses from protocol to Mold to reference; an agent moves from action to supporting evidence without dragging the whole library into every step. This is also **Pillar 3** — knowledge foregrounded for a human reader, not merely stored for an agent to retrieve.

## Portable Artifacts Over Platform Fashion

The agentic-coding landscape keeps changing. Core knowledge should not bind to one runtime, editor, model vendor, or framework. A Mold is a typed reference manifest plus a procedural skeleton; casting turns it into a target-specific skill, but the source of truth stays abstract and inspectable. Molds are durable source; cast skills are generated targets; a new runtime is a new cast target, not a rewrite.

## Actionable Knowledge, Not Passive Notes

A passive knowledge base explains but cannot make an agent act. A standalone skill acts but compresses away the evidence and rationale that make it maintainable. We keep both: the site preserves the rich graph (methods, diagnostics, checklists, citations, rationale); Molds identify which knowledge a concrete action needs; casting condenses it into executable artifacts; protocols show how actions compose. The wager: a knowledge base becomes more useful when its structure makes it executable, and a skill becomes more trustworthy when its source stays inspectable.

## Corpus-First, Not Invention-First

Learn from established statistical practice before inventing abstractions. Our grounding corpus is **methods literature + cautionary negative examples** (Bioconductor/OSCA, GWAS QC protocols, calibration/simulation standards, and named-invalidity literature like double-dipping and batch effects). Corpus-first means abstractions are justified by observed practice: pattern pages cite real methods; Mold behavior aligns with recurring analysis and refereeing tasks; new taxonomy appears after content demands it.

This principle is *load-bearing* for us in a way it isn't even for the parent. Our entire failure mode is **plausible-sounding invented prose that propagates the author's priors and reads as authoritative**. A pre-written, comprehensive-looking reference note is indistinguishable, to a downstream agent, from an earned one — and ours is a project whose reason for existing is that LLMs can't tell invented authority from real authority. So the discipline is strict: a reference note starts as a stub (frontmatter, title, primary-source link) and grows paragraph-by-paragraph only when a real case (a cast run, a refereed analysis, a logged failure) demands it. Write nothing until contact with the corpus forces it. We must not become the thing we referee.

## How The Principles Connect

Keeping methods at their source makes citation-not-mirror possible, but only works if derived artifacts record provenance. Provenance is meaningful only if external instruments — now *empirical* ones — perform the checks the model shouldn't grade itself on. Those instruments are reusable when artifacts are portable, which needs an inspectable source of truth, which pushes toward a knowledge base, which becomes actionable through Molds, casts, and protocols. **Doing Never Self-Certifies** is the spine through all of it: the empirical referee is where provenance, deterministic-work, and corpus-first meet. And Progressive Disclosure is the connective tissue that keeps the source record rich without forcing every artifact to carry the whole library.

The resulting division of labor:
- Upstream methods literature owns the facts.
- This project owns synthesis, structure, casting source, and the referee.
- Empirical instruments (null/simulation/calibration) own the validity verdict.
- Cast artifacts own target-specific execution.
- Harnesses own orchestration.

## See Also
- `POSITIONING.md` — how this shape is distinct from (and complementary to) the prior art, with verified evidence.
- `REFEREE_LOOP.md` — the do→referee→revise spine that "Doing Never Self-Certifies" turns into architecture.
- `ARCHITECTURE.md` — the structural diff from the parent.
