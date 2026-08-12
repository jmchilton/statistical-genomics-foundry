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
resolved mechanically from the shared license-policy table, which is **installed, not
vendored** — `@galaxy-foundry/license-policy` ships the copy both Foundry instances used to
hand-mirror (the decision behind it: galaxyproject/foundry-pattern#4). Not restated per note. Human
nuance (preprint-vs-published, dual code/paper licensing, access provenance) lives in
`attribution`. `license_file` points to a verbatim upstream LICENSE copy in this
directory; it is required only for verbatim-carry licenses, though own-words notes may
still carry one.

## Current entries

Standard licenses are named by their SPDX id (`CC-BY-4.0.LICENSE`) and shared across
every note that carries verbatim quotes under them; a source-specific license copy
(e.g. `msmb.LICENSE`) is named for its source. The stem therefore identifies a *copy*,
not a license: two sources under one license vendor two files.

| File | Contains |
|---|---|
| `msmb.LICENSE` | CC BY-NC-SA 2.0, as published by *Modern Statistics for Modern Biology*, Holmes & Huber, Cambridge University Press 2019 — https://www.huber.embl.de/msmb/ |
| `CC-BY-4.0.LICENSE` | CC BY 4.0 (SPDX plaintext) |
| `CC-BY-2.5.LICENSE` | CC BY 2.5 (SPDX plaintext) |
| `CC-BY-2.0.LICENSE` | CC BY 2.0 (SPDX plaintext) |
| `CC0-1.0.LICENSE` | CC0 1.0 (SPDX plaintext) |
| `GPL-2.0-or-later.LICENSE` | GPL 2.0 or later (SPDX plaintext) |
| `Artistic-2.0.LICENSE` | Artistic License 2.0 (SPDX plaintext) |
| `MIT.LICENSE` | MIT (SPDX plaintext) |

**Which notes carry under each copy is not listed here.** It is generated at `/licenses/<id>/`
from the notes' own frontmatter, and `site/tests/license-files.test.ts` fails the build when the
directory and the declarations disagree in either direction. This file used to name the carriers
by hand and had drifted in four rows while omitting two files entirely: a second copy of a tree
is the thing the audit exists to make unnecessary.
