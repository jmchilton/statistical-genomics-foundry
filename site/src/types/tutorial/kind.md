# Tutorial

A **Tutorial** note is a faithful summary of one package vignette or tutorial — the
Bioconductor/CRAN documentation a Mold needs the exact procedure from.

It shares the source-note field set with `paper` but is a separate kind: `type` is the sole
discriminator, so one kind means one schema, and the split is what lets each kind carry what it
actually needs. See `paper/kind.md` for why that beats a shared `z.enum(['paper','tutorial'])`.

## Why each required field is required

Identical to `paper`, because the fields are literally the same object: `ctx.sourceNoteBlock`
from `@galaxy-foundry/source-note` — `source_url`, `source_ids`, `access_date`, `source_read`,
`citation`, `source_license`, `derived` — plus `title` and `tags` (min 1). See `paper/kind.md`;
stating the reasoning once is the point of a shared block.

One note about `source_ids` here: a vignette usually has no identifier of its own, so a tutorial
typically declares `status: none` with a reason ("Bioconductor package landing page; no DOI
assigned"). That is the union earning its keep — the absence is stated rather than inferred from
an empty field.

## What is tutorial-specific

- **`docs_url`** — the documentation site, distinct from `source_url`, which points at the
  package record. For a vignette these are genuinely two different pages.
- **`bioconductor_release`** — the release the `version` belongs to. The pair pins the
  vignette: a Bioconductor package version means nothing without its release, and a vignette
  summarized against 3.18 can be silently wrong for 3.20.
- **`published`** — a **string**, quoted. Bare `2024-03-21` is a `Date` to YAML, not a string;
  a fixture asserts that a `Date` here is rejected.

(`version` itself is shared: every source with editions has one, and a preprint's `v2` is the
same field as a package's `3.60.0`.)

All three are declared, so their types are checked rather than assumed, and `.strict()` rejects
any further tutorial-specific key that has not been added here first.

## The cross-field rules this kind enforces

The shared source-note coherence, exactly as on `paper`.
