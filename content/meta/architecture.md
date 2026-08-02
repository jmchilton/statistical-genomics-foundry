---
type: meta
title: "Architecture Map"
record_kind: foundation
order: 4
tags:
  - meta
status: reviewed
created: 2026-06-26
revised: 2026-08-02
revision: 17
summary: "A short map of the Foundry's domain spine, implementation boundary, and focused architecture records."
---

The Statistical Genomics Foundry is a human-navigable knowledge base for doing statistical genomics honestly. Its domain spine is **analyze → referee → revise**: constructive Molds propose work, referee Molds test method validity, and a gate prevents doing from terminating in self-certification. This page maps that system and points to the focused records that own its implementation details.

## System map

```text
established methods + cautionary examples
                    │
                    ▼
     authored knowledge under content/
       papers, tutorials, books, patterns
                    │
              supports Molds
                    │
                    ▼
          analyze → referee → revise
                    │
          validated and rendered today
          cast into artifacts in future
```

The corpus is bipolar: established-good sources ground what to do, and cautionary-bad sources ground what must be detected or refused. [[corpus]] owns that evidence model. Molds are the primary navigation and action unit; Protocols are optional compositions that emerge only when real Molds prove they chain. [[molds]] and [[referee-loop]] own those domain decisions.

## What is inherited and what changes

The Foundry inherits the parent pattern's source-to-cast distinction, provenance requirement, typed references, progressive disclosure, shared substrate packages, strict content contracts, and human-first reading site. It adapts the corpus from workflows to methods and invalidity evidence, and adapts deterministic checking from workflow-schema validation to empirical refereeing.

Two parent choices are intentionally lighter here:

- Structured Mold IO schemas are deferred unless a genuinely structured artifact earns one; critiques and validation protocols are prose-shaped.
- Pipelines do not define the inventory. Standalone Molds are first-class, and a methodology Protocol appears only when composition provides real value.

The project-specific addition is the gate obligation: doing never self-certifies. Whether that becomes a Protocol convention, an inline `[gate]`, or a validator rule remains a decision for the first real composed protocol, not a schema invented in advance.

## Major boundaries

- **Domain design versus implementation.** Referee roles, corpus posture, and Mold semantics live in [[guiding-principles]], [[referee-loop]], [[molds]], and [[mold-spec]]. TypeScript and Astro mechanics live in [[code-architecture]].
- **Knowledge representation versus physical placement.** [[content-model]] defines kinds, tags, references, and note identity. [[repository-layout]] defines where their files belong.
- **Authored versus generated.** Source notes and registries are authored. Book-level metadata copies and kind manifests are generated and drift-checked. [[build-and-validation]] owns the current flows.
- **Present versus planned machinery.** The content contract, validator, generators, and site exist. A caster, package workspace, committed cast tree, and fixture toolchain do not. Design records may state their contracts, but architecture must not describe deferred machinery as implemented.

## Focused architecture records

- [[code-architecture]] — the current Astro/TypeScript implementation, dependency seams, and entry points.
- [[content-model]] — note kinds, source-note distinctions, metadata, tags, references, and companions.
- [[build-and-validation]] — corpus validation, drift generators, site builds, and the explicit casting gap.
- [[repository-layout]] — the current physical tree and lifecycle-based placement rules.

## Architectural invariants

1. The knowledge base is authored for people and remains the source of truth for future casts.
2. A Mold's claims must be recoverable from explicit references rather than model memory.
3. Doing does not certify itself; a referee or external deterministic check owns validation.
4. Note kinds and registries are declared vocabularies, not directory or prefix guesses.
5. The site and standalone validator consume the same assembled schemas and collection table.
6. Deferred machinery remains named as deferred until code and a test make it real.

Update this map only when a top-level boundary, domain spine, or reading route changes. Put detailed implementation changes in the focused record that owns them.
