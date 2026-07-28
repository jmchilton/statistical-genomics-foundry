# Book Chapter

A **Book Chapter** note is an own-words summary of one chapter of an external textbook (the
MSMB chapters, for instance). One directory per book, one `index.md` per chapter.

## The book-level licence record

Four fields — `license`, `license_file`, `attribution`, `derived` — are constant within a book
and authored ONCE in `content/research/books/<id>/book.yml`. They reach each chapter by being
**copied into its frontmatter** by `npm run books`, not by being merged in while validating.

The copy is deliberate. An earlier version merged `book.yml` at load time, which meant this was
the one kind whose entry was assembled rather than validated in place — a zod schema that read
files off disk, a note that was only complete after a merge, and a kind manifest that listed
six fields for a chapter carrying ten. Copying makes a chapter an ordinary note: it validates
from its own frontmatter, exactly like every other kind.

What a copy costs is the risk of becoming a second source of truth, so `npm run check:books`
regenerates and compares in CI — the same trade `kinds.generated.json` makes. `book.yml`
remains the only place to edit; the block between the generated markers is overwritten.

`attribution` in `book.yml` may be a template — `{n}` and `{title}` are filled from the
chapter — so per-chapter credit lines are generated rather than transcribed.

## Why each required field is required

- **`title`** — the chapter's own title, and half of the attribution template's input.
- **`source`** — the book directory id. This is the key `npm run books` reads `book.yml` by, so
  a wrong value is a generator error rather than a quiet mismatch.
- **`license`**, **`attribution`**, **`derived`** — the book's licence record, copied in. Edit
  them in `book.yml`; `check:books` fails if a chapter's copy has drifted.
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
