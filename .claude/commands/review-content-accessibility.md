---
description: Review a rendered content page against its source note — capture/render fidelity, metadata surfacing, clean markup, working links; human- AND agent-readable
argument-hint: [collection/id | collection | url]  — omit to review notes/docs changed on this branch vs origin/main
---

This is NOT a content-correctness review. You are checking that we **capture and render** each
source in ways that read well for **both humans and agents** — not whether the source is right.
Flag anything *obviously* wrong in passing (a broken number, a title that mismatches the source),
but don't hunt for factual errors.

## Step 0 — pick targets
From `$ARGUMENTS`:
- `collection/id` (e.g. `papers/page-2015-roary`, `molds/audit-method-validity`) → that one note.
- a bare collection (`papers`, `tutorials`, `books`, `molds`, `design`) → every note in it.
- a full URL → that page.
- **empty** → the notes/molds/docs whose source changed vs `origin/main` (`git diff --name-only origin/main...`),
  mapped to their pages. This is the common case: author a note, then review its page.

## Step 1 — start the dev server
Start it the way the project documents it — **AGENTS.md is the source of truth**; don't hardcode a
command here, read the current convention (today the site is an Astro app under `site/`). Capture the
local URL and the base path it prints; every content route sits under that base. Leave it running;
stop it when the review is done.

## Step 2 — map source ↔ route
Relative to `<localUrl><base>`:

| source file | route |
|---|---|
| `content/research/papers/<id>/index.md` | `/papers/<id>/` |
| `content/research/tutorials/<id>/index.md` | `/tutorials/<id>/` |
| `content/research/books/<path>/index.md` | `/books/<path>/` |
| `content/molds/<slug>/index.md` | `/molds/<slug>/` |
| `docs/<DOC>.md` (design docs) | `/design/<slug>/` |
| `docs/glossary.md` | `/glossary/` |

If a mapping is unclear, check `site/src/pages/` and `site/src/lib/design-docs.ts`.

## Step 3 — review each target in two parallel lanes, then reconcile
For each target, work two lanes concurrently and diff them:
- **Rendered lane** — load the page in the browser (Playwright MCP if available; else fetch the
  dev-server HTML). Read the visible text, the metadata box, and every link/`href`.
- **Source lane** — read the source markdown + its YAML frontmatter (and sibling files a page pulls
  in, e.g. a Mold's `eval.md`/`scenarios.md` presence markers).

Reconcile: does the rendered page faithfully surface what the source holds? With multiple targets,
fan the pairs out in parallel — if you use subagents, have them return findings reports; do the
writing/reporting yourself.

## Step 4 — what to check
**Markup leakage** (rendered page must be clean):
- raw `[[wiki-link]]` text — source notes render via Astro's native `<Content />`, which does NOT
  resolve wiki-links (only glossary/design docs do). A `[[…]]` in a paper/tutorial/mold/book leaks.
- literal markdown tokens showing (`**bold**`, backticks, `#` headings, `|` tables not tabled),
  escaped HTML entities, a leftover `---` / frontmatter block, unrendered `$…$` KaTeX math,
  stray footnote/reference markers.

**Links** are linked properly:
- internal links resolve (no 404, no wiki-link that fell back to bold-with-no-href);
- external links present and correct — `source_url` (Original source ↗), `doi:` → doi.org, License
  terms; anchors (`#term`) land somewhere.

**Metadata that should render, renders** — every frontmatter field that should surface does, and
none render empty/placeholder:
- source notes: source_id, version, license (name + policy badge, `copyleft` when set), attribution,
  `derived` ("Changes from source"), access_date, DOI.
- molds: name, tags, `eval ✓/— · scenarios ✓/—` markers.
- Flag fields present in source but invisible on the page, and anything rendered but blank.

**Agent-readable** — could an agent scraping only the rendered page recover the same load-bearing
facts as the source note? Check meaningful `<title>`/description, heading structure, pagefind body,
and that no fact lives only in markup the render dropped.

**Human-readable** — heading hierarchy sane, no wall-of-text, tables/code/math render, license box legible.

## Step 5 — report
Group findings by target. Tag each **blocker / should-fix / nit**. For every finding cite the source
location and what the rendered page actually shows — state the source↔render mismatch explicitly.
List pages that passed clean. Don't fix anything unless asked; this command reports.
