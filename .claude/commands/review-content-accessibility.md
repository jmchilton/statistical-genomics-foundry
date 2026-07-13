---
description: Review a rendered content page against its source note — capture/render fidelity, metadata surfacing, clean markup, working links; human- AND agent-readable
argument-hint: [content-id | url]  — omit to review notes/docs changed on this branch vs origin/main
---

This is NOT a content-correctness review. You are checking that we **capture and render** each
source in ways that read well for **both humans and agents** — not whether the source is right.
Flag anything *obviously* wrong in passing (a broken number, a title that mismatches the source),
but don't hunt for factual errors.

## Step 0 — pick targets
From `$ARGUMENTS`:
- **a recoverable content identifier** — a `collection/id`, a route partial, or a `[[wiki-link]]`
  → resolve it to the source note(s) it names (a bare collection means every note in it).
- a full URL → that page.
- **empty** → the notes/docs whose source changed vs `origin/main` (`git diff --name-only origin/main...`),
  mapped to their pages. This is the common case: author a note, then review its page.

## Step 1 — run the site, recover its routes
Start the dev server the way the project documents it — **AGENTS.md is the source of truth**; don't
hardcode the command here. Capture the local URL and the base path it prints; every content route sits
under that base. **Content routes are declared by the site's page router — recover the source↔route
mapping from there** (per AGENTS.md "The rendered site"); don't hardcode it. Leave the server running;
stop it when the review is done.

## Step 2 — review each target in two parallel lanes, then reconcile
For each target, work two lanes concurrently and diff them:
- **Rendered lane** — load the page in the browser (Playwright MCP if available; else fetch the
  dev-server HTML). Read the visible text, the metadata box, and every link/`href`.
- **Source lane** — read the source markdown + its YAML frontmatter (and sibling files a page pulls
  in, e.g. a Mold's `eval.md`/`scenarios.md` presence markers).

Reconcile: does the rendered page faithfully surface what the source holds? With multiple targets,
fan the pairs out in parallel — if you use subagents, have them return findings reports; do the
writing/reporting yourself.

## Step 3 — what to check
**Markup leakage** (rendered page must be clean):
- raw `[[wiki-link]]` text — not every content type's renderer resolves wiki-links; a `[[…]]` that
  reaches the rendered page leaks. Confirm which types resolve them (check the renderer) before flagging.
- literal markdown tokens showing (`**bold**`, backticks, `#` headings, `|` tables not tabled),
  escaped HTML entities, a leftover `---` / frontmatter block, unrendered `$…$` KaTeX math,
  stray footnote/reference markers.

**Links** are linked properly:
- internal links resolve (no 404, no wiki-link that fell back to bold-with-no-href);
- external links present and correct — source URL, `doi:` → doi.org, License terms; anchors (`#term`)
  land somewhere.

**Metadata that should render, renders** — every relevant frontmatter field that should surface does,
and none render empty/placeholder. (Source notes: the provenance/license block. Molds: identity + the
`eval ✓/— · scenarios ✓/—` presence markers.) Flag fields present in source but invisible on the page,
and anything rendered but blank.

**Agent-readable** — could an agent scraping only the rendered page recover the same load-bearing
facts as the source note? Check meaningful `<title>`/description, heading structure, the search-index
body, and that no fact lives only in markup the render dropped.

**Human-readable** — heading hierarchy sane, no wall-of-text, tables/code/math render, license box legible.

## Step 4 — report
Group findings by target. Tag each **blocker / should-fix / nit**. For every finding cite the source
location and what the rendered page actually shows — state the source↔render mismatch explicitly.
List pages that passed clean. Don't fix anything unless asked; this command reports.
