---
type: meta
title: "Mold Spec"
record_kind: foundation
order: 6
tags:
  - meta
status: reviewed
created: 2026-06-26
revised: 2026-08-02
revision: 5
summary: "The Mold authoring contract \u2014 frontmatter, references, and the eval/usage/refinement shape."
---

This record owns the Mold authoring contract: what a Mold source directory contains, what `index.md` must declare, and what each companion file is for. Which Molds exist and which axes they bucket on belong to [[molds]]; what a cast does with the manifest belongs to [[casting]].

## Source Layout

A Mold source unit is a directory under `content/molds/<slug>/`.

Required:
- `index.md` — the only frontmatter-bearing Mold source file. Owns the Mold contract and the operational `references:` manifest.

Strongly recommended (warning-only):
- `eval.md` — abstract, fixture-independent property checks about cast output (the *how-to-judge*). Never packaged into casts.
- `scenarios.md` — concrete fixtures + expected values exercised by the `eval.md` oracle. Never packaged.

Optional: `usage.md` (illustration), `refinement.md` + `refinements/` (design questions + journal), `casting.md` (cast-time guidance), `cast-skill-verification.md`, `changes.md`, `examples/`.

Top-level Mold `.md` files carry no frontmatter except `index.md` (and the `refinements/` journal entries, which carry small structured frontmatter). Each file has one audience, and packaging follows from it:

| File | Audience | Packaged into cast? |
|---|---|---|
| `index.md` | Mold contract + casting manifest | Body rendered into generated skills |
| `eval.md` / `scenarios.md` | maintainers (oracle / cases) | Never |
| `usage.md` / `refinement.md` / `refinements/` | authors / `/refine-mold` | Never |
| `casting.md` | casting LLM | Read at cast time |
| `examples/` | `index.md`, `eval.md` | Only if referenced |

`index.md` body discipline: the body is procedural content rendered into the generated skill, so author-facing meta-content — changelogs, restatements of the manifest, open scope questions — stays out of it. Anything left in the body ships to an agent that has no use for it and no way to tell it from an instruction.

## Index Contract

`index.md` must declare:
- `type: mold`
- `name`
- `summary` — one line, 20–160 chars, saying what the Mold does and, for a referee, what it refuses to do. The browse rows print it, so a Mold without one lists as a bare name. Write a statement about the Mold, not a restatement of `name`.
- `references:` entries for operational dependencies
- family, role, and domain tags, which are soft registry entries rather than typed fields — [[molds]] owns what each axis means and why none of them is a schema enum yet.

## Typed Reference Manifest

`references:` is the operational dependency manifest. Each entry is object-shaped:

```yaml
references:
  - kind: research          # e.g. a methods-literature / negative-example note
    ref: "[[double-dipping-in-single-cell]]"
    used_at: runtime
    load: on-demand
    trigger: "when the analysis clusters then tests on the same data"
    mode: verbatim
    evidence: corpus-observed
    purpose: "Ground the double-dipping audit in the established remedy (countsplit)."
```

Required fields: `kind`, `ref`, `used_at`, `load` (`on-demand` requires `trigger`), `mode` (`verbatim`), and `evidence` (`hypothesis | corpus-observed | cast-validated`, where `hypothesis` requires `verification`). `purpose` is strongly recommended.

The substrate's other mode, `sidecar`, is not among them; `site/src/lib/reference-contract.ts` narrows it out of the inherited vocabulary and records why. `kind` draws from `reference_contract.yml`, which registers three:

- `pattern` — a statistical-method pattern or an invalidity pattern such as double-dipping, confounding, or naive multiple-testing.
- `research` — a methods-literature or cautionary negative-example note. The corpus-grounding kind, and the one carrying the most weight; [[corpus]] owns what goes into it.
- `cli-command` — the tool ecosystem an action Mold invokes: R and Bioconductor, PLINK and regenie, statsmodels, simulators. Authored lazily, when a Mold needs an exact command.

The parent Foundry registers more, including `schema` for a Mold's structured IO. This Foundry registers none of them, because its outputs are prose-shaped critiques and protocols and no Mold has needed one. Registering a kind ahead of a Mold that uses it is what `site/tests/registry-drift.test.ts` exists to catch, so the re-add is a one-line edit made the day a Mold earns it.

The `evidence` field carries more weight here than in the parent. This project's failure mode is plausible invented authority, so a reference tagged `corpus-observed` or `cast-validated` is earned and `hypothesis` is a flag. Review `hypothesis`-evidence references hardest — they are where the Foundry's own invention risk lives.

## Eval, Scenarios, Usage, Refinement

Four companion files, one job each: `eval.md` is the abstract oracle (properties), `scenarios.md` the concrete cases (fixtures plus expected values), `usage.md` an illustration, `refinement.md` the open design questions. Two tests decide where a piece of writing goes. Does it name a specific fixture or magic value? Then `scenarios.md`. Does it have no pass/fail edge? Then usage or refinement, not eval.

The split exists because a merged file lets an author satisfy the oracle by construction — writing the property and the case that passes it in the same breath, with nothing left to be surprised by.

### Eval Contract

`eval.md` is the abstract oracle: the properties every cast output must satisfy, with no fixture named. Each property is a block:

```markdown
## Property: short-name
- check: deterministic | llm-judged
- assertion: observable property every conforming output must satisfy
```

The highest-value properties here are **referee-correctness guardrails**, because catching plausible-but-invalid statistics is the whole reason the project exists. Their common frame: *the invalid case must be caught or flagged; it must not silently pass.*

- **Family-B Molds carry catch-the-planted-flaw properties.** "Any analysis where feature selection and inference share data must be flagged as double-dipping, never passed." "A method whose null is mis-specified must fail calibration, not be blessed." "An invented method must be flagged as unrecognized, not rationalized."
- **Family-A Molds carry anti-invention and honesty properties.** "When no established method fits, the output must say so and escalate, not invent one." "Low-confidence method choices must be marked, not asserted."
- **Calibrate Molds carry deterministic properties.** "The constructed null yields uniform p-values on negative-control data." "The simulation recovers the planted truth within the stated error rate." These are mechanically checkable — the empirical gate written as an eval property.

Two things do not belong in `eval.md`: a restatement of the procedural body, and a concrete fixture or magic value. Both make the oracle pass by construction rather than by test.

### Scenario Contract

`scenarios.md` holds the concrete cases — a `## Case:` with a `fixture:` and an `expect:`. The richest ones here are **planted-invalid fixtures**: a deliberately double-dipped analysis, a confounded design, an invented method with a fluent derivation, each bound to its expected referee verdict. StatQA's method-applicability cases and the known cautionary examples are ready sources. The `eval.md` oracle applies to each scenario's output; the scenario adds the fixture-bound expected verdict.

### Usage and Refinement

`usage.md` illustrates the Mold in action, `refinement.md` records the design questions still open, and `refinements/` journals how each was settled. None of the three is packaged into a cast.

## Validator Checklist

- Mold directory and `index.md` exist; only `index.md` carries frontmatter; frontmatter validates.
- `references:` resolve by kind; `on-demand` refs carry a `trigger`; `hypothesis`-evidence refs carry a `verification`.
- `eval.md` exists, declares at least one `## Property:`, uses no `## Case:`, and marks each property deterministic or llm-judged (warning-only).
- `scenarios.md` exists and every case binds a fixture (warning-only).
- Every Family-B Mold's `eval.md` carries at least one catch-the-planted-flaw property (warning-only). A referee with no "must catch X" property is not refereeing.
- The Mold directory holds only allowlisted files; `refinements/*.md` carry their own frontmatter.
- CLI-command checks apply only once CLI notes are authored.
- Protocol membership is not checked. Molds stand alone here ([[architecture]]), so an unreferenced Mold is not a warning.
- Family and role tag coherence is unchecked for now, and becomes checkable when [[molds]] settles the vocabulary.

## Later Work

- Whether the family and role tag vocabulary earns promotion to a schema field.
- Whether a calibrate Mold's deterministic properties run an actual R or Python harness, or describe a protocol a harness runs.
- Referee independence: does a Family-B eval run the referee as a *separate* cast from the analyzer? [[referee-loop]] holds the open decision.
- A full cast execution and eval harness.
