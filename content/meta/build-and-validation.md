---
type: meta
title: "Build and Validation"
record_kind: infrastructure
order: 3
tags:
  - meta
status: reviewed
created: 2026-08-02
revised: 2026-08-02
revision: 1
summary: "How the current corpus is validated, generated, rendered, and kept honest about deferred casting."
---

This record owns the transformations that exist today. It answers **how does authored source become checked, generated, and rendered?** Component ownership belongs to [[code-architecture]] and physical placement to [[repository-layout]].

## Current flow

```text
edit content, registries, or kind definitions
                    │
                    ▼
          corpus and contract tests
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
regenerate kind manifest   materialize book metadata
        │                       │
        └───────────┬───────────┘
                    ▼
             Astro typecheck/build
```

There is no casting step in this flow yet. [[casting]] defines the intended source-to-artifact boundary and provenance posture; this record distinguishes that design from implemented machinery.

## Corpus validation

Run validation from `site/` with `pnpm validate` or `pnpm test`. Vitest is the standalone validator as well as the unit-test runner. Its corpus checks:

1. discover every note through `COLLECTIONS`;
2. parse each note against the exact assembled schema Astro consumes;
3. check that paths, declared types, note shapes, and companions agree;
4. verify kind directories and executable examples;
5. enforce tag, note-kind, and narrowed reference-vocabulary drift rules;
6. resolve path references and wiki-link reachability;
7. check that every collection has a route and contributes to the shared link map;
8. validate license and source-note coherence.

Strict schemas turn undeclared metadata into failures. Registry drift tests work in both directions: content cannot invent vocabulary, and vocabulary authored by this instance cannot remain unused.

## Kind manifest

`pnpm kinds` derives `site/src/types/kinds.generated.json` from the live kind definitions, their documentation, and `COLLECTIONS`. It is the cross-instance description of which kinds exist, why, where they live, and which metadata they require.

`pnpm check:kinds` detects byte drift. The generated JSON is committed for consumers; the zod definitions and `kind.md` files remain authoritative.

## Book metadata materialization

Multi-chapter books keep invariant source, license, and attribution metadata once in `content/research/books/<id>/book.yml`. `pnpm books` copies that block into every chapter's `index.md`, bracketed by generated markers. Materialization makes each chapter independently valid and prevents validation from depending on hidden parent-directory state.

`pnpm check:books` fails when a chapter's generated block differs from its `book.yml`. Authors edit the book record and regenerate; they do not hand-edit the copied block.

Raw synced book sources are gitignored inputs to summary regeneration. `scripts/sync-book.sh` and the book-specific manifests pin the source retrieval workflow; the authored faithful summaries remain committed content.

## Site build

`pnpm typecheck` runs `astro check`. `pnpm build` performs the forced production static build. The build:

- loads collections through the shared table;
- validates frontmatter with the same assembled schemas as the corpus tests;
- renders collection browse and detail routes;
- resolves wiki links through the shared resolver;
- builds tag, design-record, glossary, license, and source-note surfaces;
- produces the Pagefind-enabled static site.

The site is a derived reading surface. Build output is not committed source.

## Casting boundary

Casting is designed but not implemented. The current repository has:

- typed Mold references;
- a narrowed reference contract;
- a casting and provenance design record;
- no caster command;
- no `casts/` directory;
- no package or runtime artifact that executes a Mold.

Until those last three exist, documentation must say “would cast” or “future cast,” never imply that a generated artifact is available. Adding casting will require an explicit producer, target layout, provenance record, validation or verification step, and deterministic drift behavior for every non-LLM phase.

## Proportional gate

For documentation and content changes, the expected gate is:

```sh
cd site
pnpm validate
pnpm check:kinds
pnpm check:books
pnpm typecheck
pnpm build
```

Run the generators without `check:` only when their source changed, then repeat the check form. Update this record when a generator, validation layer, build stage, or implemented/deferred boundary changes.
