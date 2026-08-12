---
type: meta
title: "Build and Validation"
record_kind: infrastructure
order: 3
tags:
  - meta
status: reviewed
created: 2026-08-02
revised: 2026-08-12
revision: 4
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

There is no casting step in this flow. [[casting]] defines the intended source-to-artifact boundary and provenance posture; the section below draws the line between that design and what runs.

## Corpus validation

Run validation from `site/` with `pnpm validate` or `pnpm test`. Vitest is the standalone validator as well as the unit-test runner. Its corpus checks, in no particular order beyond discovery coming first:

- discover every note through `COLLECTIONS`;
- parse each note against the exact assembled schema Astro consumes;
- check that paths, declared types, note shapes, and companions agree;
- verify kind directories and executable examples;
- enforce tag, note-kind, and narrowed reference-vocabulary drift rules;
- resolve path references and wiki-link reachability;
- check that every collection has a route and contributes to the shared link map;
- validate license and source-note coherence;
- audit the vendored `LICENSES/` directory against every `license_file`, in both directions.

Strict schemas turn undeclared metadata into failures. Registry drift tests work in both directions: content cannot invent vocabulary, and vocabulary authored by this instance cannot remain unused.

The license-file audit is where that both-directions rule reaches the one field a schema cannot finish checking. `license_file` is a string, so coherence can require it under a `verbatim-ok` row and cannot open it — a misspelled path satisfies `.strict()`, satisfies coherence, and is not a wiki link, so nothing resolved it. `auditLicenseFiles` from `@galaxy-foundry/license-policy` fails a declaration naming an absent copy, a declared path resolving only by basename from outside `LICENSES/`, a vendored copy nothing declares, and a copy present but blank. Both the `book.yml` records and the chapter copies `pnpm books` writes are audited, so a bad book record fails before it is propagated rather than after.

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
- renders the component gallery, including isolated routes for document-unique shared specimens;
- produces the Pagefind-enabled static site.

The site is a derived reading surface. Build output is not committed source.

The gallery is checked as built output rather than only as registry data. The shell suite requires every shared and SGF specimen case to reach the gallery, every isolated case to receive a route and iframe, and those isolated routes to remain outside the normal shell and search index. This is also the compatibility check for site-kit specimen additions: upgrading the package extends the shared registry, and an unrenderable component fails instead of disappearing from the instance.

## Casting boundary

Casting is designed but not implemented. What exists is the source side: typed Mold references, a narrowed reference contract, and [[casting]] as the design record for the transformation. What does not exist is the machinery: no caster command, no `casts/` directory, no package or runtime artifact that executes a Mold.

Until the machinery exists, documentation says "would cast" or "future cast" and never implies a generated artifact is available — a reader who goes looking for `casts/` on the strength of a present-tense sentence finds nothing and cannot tell whether the record is aspirational or the checkout is broken. Adding casting will require an explicit producer, a target layout, a provenance record, a validation or verification step, and deterministic drift behavior.

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
