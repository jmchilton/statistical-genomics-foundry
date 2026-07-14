# Imported-content licenses

This directory tracks the licenses of **third-party content** the Foundry imports
or derives notes from. Files here cover **only** that third-party content — not the
Foundry's own code or authored notes (the project's own license lives at the repo
root; pending finalization).

We do not mirror upstream sources. Bulk raw content (e.g. textbook chapters) is
fetched into gitignored `raw/` staging dirs beside each book
(`content/research/books/<id>/raw/`) by the deterministic sync script
(`scripts/sync-book.sh <id>`), pinned by a co-located manifest + `SHA256SUMS`. The
committed, distributed artifacts are our **own-words summaries**, which attribute the
source and declare its license in frontmatter.

A note that derives from an imported source declares:

```yaml
license: CC-BY-NC-SA-2.0
license_file: LICENSES/msmb.LICENSE
```

Papers and tutorials carry these per-note. **Books** declare them **once** in
`content/research/books/<id>/book.yml` (book-invariant), which the Astro `books`
collection merges into every chapter — the per-chapter `index.md` frontmatter stays slim.

`license` is a normalized id — an SPDX identifier or a `LicenseRef-<slug>` escape
hatch — validated by the Astro content schema (`site/src/content.config.ts`). Its
**redistribution policy** (verbatim-ok vs own-words-only, copyleft, obligations) is
resolved mechanically from the shared `../license-policy.yml` table
(source of truth: galaxyproject/foundry-pattern#4), not restated per note. Human
nuance (preprint-vs-published, dual code/paper licensing, access provenance) lives in
`attribution`. `license_file` points to a verbatim upstream LICENSE copy in this
directory; it is required only for verbatim-carry licenses, though own-words notes may
still carry one.

## Current entries

Standard licenses are named by their SPDX id (`CC-BY-4.0.LICENSE`) and shared across
every note that carries verbatim quotes under them; a source-specific license copy
(e.g. `msmb.LICENSE`) is named for its source.

| File | License | Redistributed by |
|---|---|---|
| `msmb.LICENSE` | CC BY-NC-SA 2.0 | *Modern Statistics for Modern Biology*, Holmes & Huber, Cambridge University Press 2019 — https://www.huber.embl.de/msmb/ (own-words book notes) |
| `CC-BY-4.0.LICENSE` | CC BY 4.0 (SPDX plaintext) | `korthauer-dmrseq-2019`, `nygaard-2016`, `wen-2025`, `munafo-2018-collider`, `zhang-2020-combat-seq` — source notes carrying verbatim CC-BY quotes |
| `CC-BY-2.5.LICENSE` | CC BY 2.5 (SPDX plaintext) | `leek-storey-2007-sva` — PLOS 2007-era open-access articles |
| `CC-BY-2.0.LICENSE` | CC BY 2.0 (SPDX plaintext) | `yan-2012-osat` — BMC 2012-era open-access articles |
| `Artistic-2.0.LICENSE` | Artistic License 2.0 (SPDX plaintext) | `tutorials/sva`, `tutorials/rnaseqgene` — Bioconductor package docs/vignettes/workflows |
| `MIT.LICENSE` | MIT (SPDX plaintext) | `tutorials/designit` — CRAN package docs/vignettes |
