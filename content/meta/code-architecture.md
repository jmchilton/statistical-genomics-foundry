---
type: meta
title: "Code Architecture"
record_kind: infrastructure
order: 1
tags:
  - meta
status: reviewed
created: 2026-08-02
revised: 2026-08-02
revision: 2
summary: "The current Astro and TypeScript implementation, dependency seams, entry points, and deliberate absences."
---

This record answers **what implementation exists today, what does each part own, and how do its dependencies flow?** It does not describe domain concepts, note semantics, build order, or the full file tree; see [[architecture]], [[content-model]], [[build-and-validation]], and [[repository-layout]].

## Current stack

```text
Astro pages and components
          │
          ▼
site registries and render adapters
          │
          ▼
frontmatter-schema composition
          │
          ├── instance kind definitions
          ├── instance tag vocabulary
          ├── instance reference kinds
          └── installed shared substrate
```

The repository currently has one application, `site/`. There is no package workspace, build CLI, caster, cast tree, or fixture toolchain. Those are deliberate absences, not implied layers.

## Kind definitions

`site/src/types/` owns the instance's note kinds. Each kind directory contains:

- `schema.ts`, the strict zod contract and shape declaration;
- `kind.md`, the purpose and rationale for required fields;
- `example.md`, a minimal executable example.

`types/context.ts` builds the instance context from the base envelope, tag registry, reference contract, and license policy. `types/index.ts` is the single enumeration of concrete kinds. The shared `@galaxy-foundry/kind-schema` package supplies the generic definition and assembly mechanism but no domain kinds.

The directory-per-kind layout is a cross-instance contract, not a local preference: [galaxyproject/foundry-pattern#13](https://github.com/galaxyproject/foundry-pattern/issues/13), PART 3 of the standing-up checklist, implemented independently here and in the parent Foundry. `example.md` is parsed against its own kind's schema by the corpus tests, so the documentation stays executable.

## Contract composition

`site/src/lib/frontmatter-schema.ts` is the composition point. It:

- assembles every concrete kind against the current registries;
- builds the discriminated note union;
- declares `COLLECTIONS`, the one mapping from content paths to kind, shape, glob, and schema;
- exports the same schemas to Astro and the standalone corpus tests.

No page, test, or link resolver may carry a second collection list. `site/src/content.config.ts` is a thin Astro adapter over `COLLECTIONS`.

## Registries and shared substrate

`site/src/lib/registries.ts` joins the instance-owned halves of shared contracts:

- `meta_tags.yml` supplies the closed tag vocabulary through `@galaxy-foundry/tag-registry`;
- `reference_contract.yml` supplies domain reference kinds while `@galaxy-foundry/reference-contract` supplies inherited behavior vocabularies;
- `@galaxy-foundry/license-policy` supplies redistribution policy;
- `@galaxy-foundry/wiki-links` supplies parsing, normalization, resolution, and remark traversal.

The instance adapters provide paths, concrete vocabularies, and the link map. They do not re-export or reimplement the shared package API.

## Content and link access

`site/src/lib/content-files.ts` applies collection paths and ID rules outside Astro's loader, so tests and the wiki-link map see exactly the files the site sees. `site/src/lib/wiki-links.ts` builds one map across all routed collections. `remark-wiki-links.ts` adapts that resolver to Astro Markdown; `render-vault-doc.ts` provides the corresponding path for explicit loose documents such as the glossary.

`site/src/lib/design-records.ts` and `design-docs.ts`, tag helpers, and license helpers are presentation registries over validated content. They do not define note membership. The design-record split is not cosmetic: `astro.config.mjs` reaches `design-docs.ts` through the remark plugin, and config loads outside Astro's module graph, so anything reachable from it cannot import `astro:content`. Collection access lives in `design-records.ts`, which only pages import.

## Reading application

`site/src/pages/` owns routes. Collection keys and route directories agree directly (`papers`, `tutorials`, `books`, `molds`, `patterns`, `meta`), with tests guarding that relationship. `site/src/components/` owns shared presentation, while Markdown bodies remain authored in `content/`.

The site is a pure reader. It validates and renders source; it does not mutate content, create Molds, or cast artifacts.

## Generators

Two focused generators live under `site/scripts/`:

- `generate-kind-manifest.ts` derives the portable kind catalog from the assembled definitions.
- `generate-book-frontmatter.ts` materializes book-level metadata into every chapter so each note validates standalone.

They import the same contracts as validation rather than building parallel models.

## Cross-component contracts

- `types/index.ts` is the kind enumeration; `COLLECTIONS` is the content-path enumeration.
- A collection's routed kind, literal `type`, schema, and route must agree.
- Astro builds and corpus tests validate against the same assembled schema objects.
- Shared substrate packages own mechanisms and portable formats; this repository owns domain vocabularies and policy choices.
- Wiki-link parsing and resolution have one implementation and one instance link map.
- Generators derive from source contracts and have check modes.
- No document describes a package, caster, or runtime CLI as implemented until that code exists. A design record that describes machinery as running is indistinguishable from one describing machinery that runs, and the reader who finds out is the one who went looking for the command.

## Code orientation

| Concern | Primary location |
|---|---|
| note kinds and context | `site/src/types/` |
| schema and collection composition | `site/src/lib/frontmatter-schema.ts` |
| Astro collection wiring | `site/src/content.config.ts` |
| registries | `site/src/lib/registries.ts` and focused adapters |
| file discovery and IDs | `site/src/lib/content-files.ts` |
| wiki links | `site/src/lib/wiki-links.ts` and `remark-wiki-links.ts` |
| site routes | `site/src/pages/` |
| corpus and contract tests | `site/tests/` |
| deterministic generators | `site/scripts/` |

Update this record when an implementation component, dependency seam, entry point, or deliberate absence changes.
