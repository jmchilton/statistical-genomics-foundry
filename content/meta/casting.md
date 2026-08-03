---
type: meta
title: "Casting"
record_kind: foundation
order: 7
tags:
  - meta
status: reviewed
created: 2026-06-26
revised: 2026-08-02
revision: 5
summary: "How typed Mold references become target-specific cast artifacts with provenance."
---

Casting takes a Mold — a typed reference manifest plus a procedural body — and produces a self-contained skill artifact for one target: no links back, no runtime dependency on the source. This record owns the semantics of that transformation and the provenance contract it must satisfy.

**No caster exists here yet.** The contract below is a commitment, written so that the code, when it lands, has something to be checked against; [[build-and-validation]] draws the line between it and what runs today. The one thing this record must never do is describe the transformation as though it happens.

## Per-kind dispatch

Casting is not one resolve-and-inline pass. Each reference kind names a transformation, and the kind discriminator is what selects it:

| Reference kind | Transformation | Lands at |
|---|---|---|
| `pattern` | verbatim copy | `references/patterns/<slug>.md` |
| `research` | verbatim copy | `references/notes/<basename>` |
| `cli-command` | deterministic JSON sidecar | `references/cli/<slug>.json` |

Those three are the kinds `reference_contract.yml` registers, which is to say the kinds real Molds reference. `research` carries the most weight — the corpus notes behind every referee — and its size is managed by `load: on-demand` plus a `trigger`, never by compressing the note.

The parent Foundry registers four more (`cli-tool`, `schema`, `prompt`, `example`) and treats `eval` as a manifest entry that is never packaged. None of those is registered here, so none has a dispatch rule to describe. Re-adding one is a deliberate one-line edit to `reference_contract.yml` made when a Mold first needs it, and the dispatch row is written then. A `mold` reference stays discouraged in either instance: shared content wants factoring into a kind that casts, not a Mold citing a Mold.

Every transformation above is deterministic. The parent additionally supports `mode: condense`, where an LLM produces the carried text; this Foundry narrows `condense` out of the inherited `modes` vocabulary in `site/src/lib/reference-contract.ts`, which records why. Determinism is not a stylistic preference — it is what makes a cast byte-stable, and byte-stability is what makes a `--check` gate possible at all. The parent's two-phase machinery (a `pending_llm: true` placeholder written by the deterministic caster, filled by an LLM phase, with a verifier rejecting committed provenance that still has an unfilled entry) is exactly the cost being declined.

If a cast looks under-instructed, improve the Mold body or the referenced notes and re-cast. Hand-editing a generated `SKILL.md` puts the fix somewhere the next cast overwrites, and leaves the source still wrong.

## Cast from structure, not rendered prose

When an upstream source ships both a structured form and a rendered human form, cast from the structured one: denser per token, schema-regular, and it preserves identifiers a Mold can cite. Reporting standards and checklists are the canonical case — PROBAST-AI signalling questions, ClinGen/PRS-RS items, MIQE — where a machine-readable form exists and the prose version is a site-rendering concern. The same holds for a method that ships a structured assumption or parameter description alongside a narrative vignette.

## Empirical checks run at runtime, not cast time

Casting does not run permutation tests, simulations, or calibration. A calibrate Mold packages the *procedure* for constructing and running an empirical check; the check itself executes when the cast skill runs, against real data. Casting packages the referee; it does not referee.

This is what keeps casting deterministic and read-only. A cast that invoked a simulator would produce a different artifact on every run, and there would be nothing left to drift-check.

## Provenance

Every cast writes a required `_provenance.json` recording the Mold object (name, path, revision, content hash, commit), `cast_at`, `cast_history[]`, `refs[]`, and the runtime `artifacts` handoff contract. Each entry in `refs[]` carries kind, mode, src and dst, `used_at`, `load`, `evidence`, `src_hash`, and `dst_hash`, and is sorted by `(kind, src)` so diffs stay stable.

This is the sharpest distinction from the prior art — a hand-authored skill repository has no derivation lineage to record, and cannot acquire one after the fact ([[positioning]], Pillar 1). Provenance does not get lightened to make a cast smaller.

## When casting runs, and how it goes stale

- **Triggers** — manual (`cast <mold> --target=<target>`), CI on Mold change (re-cast and surface the diff), or watch-on-change.
- **Drift** — a cast is stale when the Mold hash, any reference src or dst hash, the deterministic `SKILL.md` render, or the target adapter changes. A `--check` mode enumerates stale casts.
- **Versioning** — no semver on Molds or casts. Identity is content hash plus commit SHA, and re-casting is the migration path.
- **Reproducibility** — assembly is byte-stable apart from timestamps. With no LLM phase there is no prompt or model identity to record and no non-reproducible byte in the output.

## What casting does not do

- It does not write to the knowledge base. Casting is read-only against `content/`; every write goes to the cast tree.
- It does not run statistical tooling — R, Bioconductor, PLINK, simulators. That is the cast skill's runtime job, for the reason above.
- It does not update Molds. A weak instruction gets migrated into the Mold body and re-cast, so the correction survives the next cast.
- It does not touch `eval.md` or `scenarios.md`. Those are how maintainers judge a Mold, and packaging them would hand the cast artifact its own answer key.

## Minimum exercise

One target, Claude. Cast a handful of deliberately diverse Molds end to end and read the actual `SKILL.md` and `_provenance.json` output before scaling: a critique referee exercising `pattern` and `research` against the cautionary-bad corpus, a calibrate referee exercising the runtime-check packaging and probably a `cli-command`, and a Family-A guardrail exercising established-good corpus references. Diversity is the point — it is what puts every dispatch rule under load. If provenance holds and the artifacts read reasonably, scale.
