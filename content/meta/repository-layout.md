---
type: meta
title: "Repository Layout"
record_kind: infrastructure
order: 4
tags:
  - meta
status: reviewed
created: 2026-08-02
revised: 2026-08-02
revision: 1
summary: "Where domain knowledge, implementation code, generated metadata, and source materials belong today."
---

This record owns physical placement. It answers **where does a file belong, and what lifecycle does that location imply?** Note semantics belong to [[content-model]], implementation dependencies to [[code-architecture]], and processing flows to [[build-and-validation]].

## Current top-level map

```text
statistical-genomics-foundry/
├── content/                authored knowledge
├── site/                   Astro app, contracts, tests, and generators
├── scripts/                source-sync helpers
├── .claude/commands/       authoring and assessment workflows
├── .github/workflows/      site validation and deployment
├── LICENSES/               source and redistribution license texts
├── meta_tags.yml           instance tag vocabulary
├── reference_contract.yml  instance reference kinds
├── README.md
└── AGENTS.md
```

There is no `packages/`, `casts/`, or workflow-fixture tree. Add those only when implemented machinery gives each one an owner and lifecycle.

## `content/`: knowledge source

```text
content/
├── meta/                    Foundry design records and glossary
├── molds/<slug>/            action note plus eval/scenario companions
├── patterns/<slug>/         valid or invalid method pattern
└── research/
    ├── papers/<id>/         paper summary plus optional guidance
    ├── tutorials/<id>/      tutorial summary plus optional guidance
    ├── books/<book>/<chap>/ chapter summary; book.yml at book root
    ├── projects/            prior-art and comparison research
    └── mold-eval/           assessment rubrics and reports
```

Routed notes live in the collection-owned directories. Not every research file is a routed note: project surveys, rubrics, and working syntheses remain supporting material until a kind and route are earned.

`content/meta/glossary.md` is an explicit non-note rendered by its own page. All other flat files matching the meta collection glob are validated `meta` design records.

## `site/`: current engineering surface

```text
site/
├── src/types/          one directory per note kind
├── src/lib/            schema composition, registries, links, and render adapters
├── src/pages/          Astro routes
├── src/components/     shared presentation
├── src/layouts/        page shells
├── src/styles/         site styling
├── tests/              corpus and contract validation
├── scripts/            deterministic generators
└── package.json        the current toolchain and commands
```

The site directory currently holds both application and content-contract code. That is intentional while there is only one consumer. Extracting an instance package becomes worthwhile when a second application or runtime needs to import those contracts without depending on the Astro project.

## Generated material

- `site/src/types/kinds.generated.json` is generated from kind definitions and committed.
- Generated book metadata blocks inside chapter `index.md` files come from the nearest `book.yml` and are committed as part of each standalone note.
- `site/dist/`, Pagefind output, dependency directories, and synced raw book sources are build or research inputs and remain uncommitted.

Every committed generated file has a check command. If output cannot be regenerated or checked, it is authored source and should not be labeled generated.

## Root contracts and helpers

`meta_tags.yml` and `reference_contract.yml` are repository-wide controlled vocabularies rather than notes. `LICENSES/` carries required license texts. Root `scripts/` is reserved for operations whose scope is outside the Astro application, currently source synchronization; TypeScript generators that import site contracts live under `site/scripts/`.

`.claude/commands/` contains authoring workflows. These commands may create or assess content, but their prose is tooling instruction rather than publishable domain knowledge.

## Placement rules

1. Put human-readable domain knowledge under `content/`; give it a kind only when it should validate and render as an independent note.
2. Put note contracts, routes, and current generators under `site/` while the site remains their only application.
3. Keep source-specific invariant metadata at the nearest truthful owner (`book.yml` for a book), then materialize standalone note metadata through a checked generator.
4. Keep raw or reproducible upstream material out of routed content unless redistribution and provenance are explicit.
5. Do not create placeholder top-level package, cast, schema, protocol, or fixture directories before a real artifact needs them.
6. Add a new top-level owner only with code, an entry point, and a validation or drift story.

Update this record when a top-level owner appears, a file class changes lifecycle, or a placement rule changes.
