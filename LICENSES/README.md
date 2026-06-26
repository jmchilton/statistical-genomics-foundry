# Imported-content licenses

This directory tracks the licenses of **third-party content** the Foundry imports
or derives notes from. Files here cover **only** that third-party content — not the
Foundry's own code or authored notes (the project's own license lives at the repo
root; pending finalization).

We do not mirror upstream sources. Bulk raw content (e.g. textbook chapters) is
fetched into gitignored staging dirs under `corpus-import/` by deterministic sync
scripts (`scripts/sync-*.sh`), pinned by a manifest + `SHA256SUMS`. The committed,
distributed artifacts are our **own-words summaries**, which attribute the source
and declare its license in frontmatter.

A note that derives from an imported source declares:

```yaml
license: CC-BY-NC-SA-2.0
license_file: LICENSES/msmb.LICENSE
```

(The `license` / `license_file` frontmatter fields and a validator check that the
referenced file exists land when `meta_schema.yml` is ported.)

## Current entries

| File | License | Source |
|---|---|---|
| `msmb.LICENSE` | CC BY-NC-SA 2.0 | *Modern Statistics for Modern Biology*, Holmes & Huber, Cambridge University Press 2019 — https://www.huber.embl.de/msmb/ |
