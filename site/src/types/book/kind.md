# Book Chapter

A **Book Chapter** note is a summary of one chapter of an external textbook (the MSMB chapters,
for instance). One directory per book, one `index.md` per chapter.

## The book-level source-note record

Most of the source-note block — `source_ids`, `access_date`, `source_read`, `citation`,
`attribution`, `source_license`, `license_file`, `derived` — is constant within a book and
authored ONCE in `content/research/books/<id>/book.yml`. It reaches each chapter by being
**copied into its frontmatter** by `npm run books`, not by being merged in while validating.

The copy is deliberate. An earlier version merged `book.yml` at load time, which meant this was
the one kind whose entry was assembled rather than validated in place — a zod schema that read
files off disk, a note that was only complete after a merge, and a kind manifest that listed
six fields for a chapter carrying ten. Copying makes a chapter an ordinary note: it validates
from its own frontmatter, exactly like every other kind.

What a copy costs is the risk of becoming a second source of truth, so `npm run check:books`
regenerates and compares in CI — the same trade `kinds.generated.json` makes. `book.yml`
remains the only place to edit; the block between the generated markers is overwritten.

`citation` and `attribution` in `book.yml` may be templates — `{n}` and `{title}` are filled
from the chapter — so per-chapter records are generated rather than transcribed. Everything
else is copied through untouched, including the nested `source_ids` and `source_license` maps.

Two of the eight are legitimately absent rather than missing: `license_file` (an own-words book
vendors no upstream LICENSE) and `attribution` (an own-words book reproduces no upstream
expression and owes no notice). The generator's `OPTIONAL` set is what permits that, and the
schema agrees — both fields are optional in the shared contract.

## Why each required field is required

- **`title`** — the chapter's own title, and half of the citation template's input.
- **`source`** — the book directory id. This is the key `npm run books` reads `book.yml` by, so
  a wrong value is a generator error rather than a quiet mismatch.
- **`source_url`** — the chapter's own URL. Distinct from the book's, and the provenance for
  this specific chapter.
- The materialized block — see `paper/kind.md` for what each field is and why the four
  questions it separates are separate.
- **`tags`** (min 1) — the browse axis, as on every kind.

`source_chapter` is optional: not every book numbers its chapters, and the templates tolerate
its absence.

A chapter's `source_ids` is `status: none` in both books here, with the reason stated: a web
chapter of an online textbook carries no per-chapter DOI. That is the claim, not an omission.

## `type` is per-note, not per-book

`type: book` sits in the chapter's frontmatter even though it is constant within a book, and
even though it *could* have been a `book.yml` field. Every note in the corpus names its own
kind — a note whose kind you have to look up elsewhere is a note the validator cannot route on
its own.

## Redistribution

The posture is per book, not per kind. `msmb` is NC-SA, so its chapters are
`own-words-summary` and carry no upstream expression; `harmon-pcm` is CC-BY-4.0 and does quote,
so it is `verbatim-quotes-summary` and its chapters carry both the notice and a vendored
`license_file` — which the shared coherence rule requires rather than trusts.

Either way the source text is not committed: `scripts/sync-book.sh` fetches the raw chapters
into a gitignored directory pinned by `SHA256SUMS`. What is committed is the manifest, the pin,
and our derived summary.
