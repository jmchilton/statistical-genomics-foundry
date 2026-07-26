# Book Chapter

A **Book Chapter** note is an own-words summary of one chapter of an external textbook (the
MSMB chapters, for instance). One directory per book, one `index.md` per chapter.

## The one kind whose entry is assembled

Every other kind validates the frontmatter in front of it. This one **merges**: book-level
metadata — `license`, `license_file`, `attribution`, `derived` — lives ONCE per book in
`content/research/books/<id>/book.yml`, and is merged into each chapter at load so downstream
pages read one complete record.

The alternative was repeating four fields across every chapter of every book, where they would
drift within a single book. Instead the chapter carries only what varies per chapter, and
`.strict()` keeps the merge **one-way**: a chapter that restates `license` or `attribution` is
*rejected*, not silently shadowing the book. That rejection is the rule that makes the merge
trustworthy rather than merely convenient.

`attribution` in `book.yml` may be a template — `{n}` and `{title}` are filled from the
chapter — so per-chapter credit lines are generated rather than transcribed.

## Why each required field is required

- **`title`** — the chapter's own title, and half of the attribution template's input.
- **`source`** — the book directory id. This is the join key the merge reads `book.yml` by, so
  a wrong value is a load error rather than a quiet mismatch.
- **`source_url`** — the chapter's own URL. Distinct from the book's, and the provenance for
  this specific chapter.
- **`tags`** (min 1) — the browse axis, as on every kind.

`source_chapter` is optional: not every book numbers its chapters, and the attribution template
tolerates its absence.

## `type` is per-note, not per-book

`type: book` sits in the chapter's frontmatter even though it is constant within a book, and
even though it *could* have been a `book.yml` field. Every note in the corpus names its own
kind — a note whose kind you have to look up elsewhere is a note the validator cannot route on
its own.

## Redistribution

Chapters are `own-words-summary`, always: the source text is not reproduced, and
`scripts/sync-book.sh` fetches the raw chapters into a gitignored directory pinned by
`SHA256SUMS`. What is committed is the manifest, the pin, and our derived summary.
