# Tutorial

A **Tutorial** note is a faithful summary of one package vignette or tutorial — the
Bioconductor/CRAN documentation a Mold needs the exact procedure from.

It shares the source-note field set with `paper` but is a separate kind: `type` is the sole
discriminator, so one kind means one schema, and the split is what lets each kind carry what it
actually needs. See `paper/kind.md` for why that beats a shared `z.enum(['paper','tutorial'])`.

## Why each required field is required

Identical to `paper`: `source_id`, `source_url`, `access_date`, `license`, `attribution`,
`derived`, `title`, and `tags` (min 1). See `paper/kind.md` — the reasoning is the same, and
stating it once is the point of the shared `sourceNoteFields` in `types/context.ts`.

## What is tutorial-specific

- **`docs_url`** — the documentation site, distinct from `source_url`, which points at the
  package record. For a vignette these are genuinely two different pages.
- **`bioconductor_release`** — the release the `version` belongs to. The pair pins the
  vignette: a Bioconductor package version means nothing without its release, and a vignette
  summarized against 3.18 can be silently wrong for 3.20.
- **`published`** — a **string**, quoted. Bare `2024-03-21` is a `Date` to YAML, not a string;
  a fixture asserts that a `Date` here is rejected.

All three are declared, so their types are checked rather than assumed, and `.strict()` rejects
any further tutorial-specific key that has not been added here first.

## The cross-field rule this kind enforces

Licence coherence, exactly as on `paper`.
