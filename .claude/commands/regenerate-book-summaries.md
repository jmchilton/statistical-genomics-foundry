---
description: Regenerate a book's own-words chapter summaries in content/research/books/<id>/ from synced raw chapters
argument-hint: "<book-id> [chapter number(s), or empty for all non-held-out]"
allowed-tools: Read, Write, Bash, Agent
---

Regenerate an own-words book's corpus summaries from its synced raw chapters, applying the
book's `summary-prompt.md` spec and writing slimmed per-chapter frontmatter (book-level
license/attribution/derived live once in `book.yml`, merged by the Astro `books` collection).

## Arguments

`$ARGUMENTS` is `<book-id> [chapters]`:

- **`<book-id>`** (required) — a directory under `content/research/books/`, e.g. `msmb`.
- **`[chapters]`** — space-separated chapter numbers, or empty for all non-held-out chapters.

## Preflight (read the book's config)

1. Confirm `content/research/books/<id>/book.yml` exists. Read it. It provides:
   `source`, `short_title`, `source_url` (book home), `license`, `license_file`,
   `attribution`, `derived`, `summary_prompt`, and `chapters` (list of `{n, title, held_out?}`).
2. **Own-words only.** If `book.yml` has no `summary_prompt`, STOP: this book was summarized
   license-aware via `/summarize-source` (e.g. a permissive license allowing verbatim quotes),
   not the own-words book spec — it is out of scope for this command. Report and exit.
3. Confirm the spec file `content/research/books/<id>/<summary_prompt>` exists.
4. Confirm `content/research/books/<id>/manifest.tsv` exists (it maps `<NN>` → source URL).
5. Selection: empty → every chapter in `chapters` without `held_out: true`. Otherwise the given
   numbers (a held-out chapter builds only when explicitly named). Reject numbers not in `chapters`.
6. For each selected chapter, confirm raw HTML exists at `content/research/books/<id>/raw/<NN>.html`
   (`NN` = zero-padded number). If missing, STOP and tell the user to run
   `scripts/sync-book.sh <id>` first — do not invent content.

## Procedure

1. **Per chapter, fan out a subagent** (selected chapters concurrently — one Agent call each, all
   in one message). Give each agent:
   - the full contents of the book's `summary_prompt` spec (do not paraphrase it),
   - the assigned chapter's title and number,
   - the full raw HTML of that chapter,
   - an instruction to return **ONLY** the summary body — no preamble, no frontmatter, no H1.

   Subagent write permissions are unreliable here, so each subagent **returns** its summary body
   as its final message; it must not write files.

2. **You (the main session) write each file.** Look up the chapter's source URL from
   `manifest.tsv` (the `<NN>` row). Wrap the returned body with this exact slimmed frontmatter + H1,
   then write `content/research/books/<id>/chap<n>/index.md` (`<n>` un-padded):

   ```
   ---
   title: "<chapter title>"
   source: <source>
   source_chapter: <n>
   source_url: <url from manifest.tsv>
   ---

   # <chapter title> — <short_title> Chapter <n> (summary)

   _Own-words summary of an external source (license/attribution declared in book.yml). Not a substitute for the original chapter._

   <body>
   ```

   Do NOT write license/license_file/attribution/derived into the chapter — those are merged
   from `book.yml`. Refuse to write if a subagent returned empty/whitespace output; report which
   chapter failed.

3. **Report.** List each chapter written (path), and note any skipped (held-out, not requested) or failed.

## Notes

- This **overwrites** existing summaries — that is the point of "regenerate." Only the
  model-generation step is non-deterministic; selection, frontmatter, and the H1 are fixed.
- Faithfully apply the spec's copyright/abstraction rules: own-words synthesis, preserve
  established method/distribution/tool names, strip incidental example/dataset/variable names,
  no transcribed code.
