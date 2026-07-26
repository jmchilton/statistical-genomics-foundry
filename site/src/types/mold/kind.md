# Mold

A **Mold** describes *one abstract action* — audit this method, construct this calibration —
not a document and not a tutorial. Its body says how to do the action; its frontmatter declares
the *typed reference manifest* naming every note the cast must carry, and how.

Molds are the substrate's centre of gravity, and in this Foundry they are the primary artifact:
the catalog leads, and a Mold may legitimately belong to no pipeline at all. Only `index.md`
bears frontmatter — `eval.md`, `scenarios.md`, `usage.md`, and `refinement.md` are siblings.

## Why each required field is required

- **`name`** — the stable slug the cast bundle and every wiki-link address the Mold by.
- **`summary`** — required, 20–160 characters. The site prints it in *every* tag-browse row,
  so an optional summary means half the catalog renders as a bare name. The bounds are the
  parent Foundry's, adopted unchanged.
- **`tags`** (min 1) — the browse axis. Molds take `family/*` and `role/*`; this is the
  MOLD_SPEC adaptation that replaces the parent's `axis` enum, which described a *conversion*
  and does not apply to a Foundry that converts nothing.

## Optional fields

- **`references`** — the typed manifest. Each entry draws `kind` / `used_at` / `load` / `mode` /
  `evidence` from `reference_contract.yml`. Three rules the schema enforces: `load: on-demand`
  requires a `trigger`, `evidence: hypothesis` requires a `verification`, and the whole entry
  is `.strict()`.
- **`recheck`** on a reference — a standing flag that the cited source has an unresolved
  question hanging over it (an unretrieved Author Correction, a paywalled erratum) and that
  nothing from it may be used load-bearing until that is settled. This field has no analog in
  the parent, and it is the honest record of a source we could not fully verify.

## Experiment artifacts

The blind-assembly candidate/doer/audit artifacts under `content/research/experiments/` are
structurally Molds and declare `type: mold`. They live in their own collection because they sit
beside their comparison narratives, not because they are a different kind — which is exactly why
collection and kind are not one-to-one here.
