# Paper

A **Paper** note is a faithful summary of one published paper, carrying the provenance and
licence posture the summary was made under.

Papers and tutorials share a field set but are **two kinds, not one kind with a
`z.enum(['paper','tutorial'])`**, because `type` is the sole note-kind discriminator: one kind,
one schema. The enum let a `type: paper` note sit in `content/research/tutorials/` and still
validate; a literal per kind makes the collection and the declared kind agree. The split also
lets the kinds genuinely differ — a paper carries bibliographic identifiers, a tutorial the
release it documents — which under a shared enum would have had to be legal on both.

## Why each required field is required

- **`source_id`**, **`source_url`** — what was summarized, and where it lives. Never a mirror
  of the source itself: the URL is the provenance, the summary is ours.
- **`access_date`** — when we read it. A string, always quoted: bare `2026-01-01` is a `Date`
  to YAML, and there is a negative fixture holding that line.
- **`license`** — an SPDX id resolving against `license-policy.yml`. This is what decides the
  summary posture, not the source type.
- **`attribution`** — the credit line the licence obliges.
- **`derived`** — what modification was made (the CC-BY "changes" indication), and the field the
  coherence rule keys off. `own-words-summary` redistributes no protected expression;
  `license-aware-with-quotes` does, and the schema then demands a licence that permits it.
- **`title`** and **`tags`** (min 1) — papers take `domain/*` and `topic/*` subject facets.

## Identifiers are strings

`pmid`, `pmcid`, `arxiv`, `oa_url` are all optional and all **strings**. An unquoted
`pmid: 33015620` is an integer to YAML, and an identifier is an opaque label — never
arithmetic. All four are declared, so the string type is checked rather than assumed, and
`.strict()` rejects any fifth identifier that has not been added here first.

## The cross-field rule this kind enforces

Licence coherence: the id must resolve to a real policy row; a note may not declare verbatim
carry under an own-words-only licence; and verbatim carry under a row that requires a
`license_file` must declare one.
