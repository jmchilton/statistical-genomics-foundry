# Paper

A **Paper** note is a faithful summary of one published paper, carrying the provenance and
licence posture the summary was made under.

Papers and tutorials share a field set but are **two kinds, not one kind with a
`z.enum(['paper','tutorial'])`**, because `type` is the sole note-kind discriminator: one kind,
one schema. The enum let a `type: paper` note sit in `content/research/tutorials/` and still
validate; a literal per kind makes the collection and the declared kind agree. The split also
lets the kinds genuinely differ — a paper carries bibliographic identifiers, a tutorial the
release it documents — which under a shared enum would have had to be legal on both.

## The field set is not ours

Everything below `title` comes from `@galaxy-foundry/source-note`, spread in as
`ctx.sourceNoteBlock` with the cross-field rules as `ctx.sourceNoteRules`. Both Foundries had
written this field set independently and fused different questions into one string doing it.
The shared contract keeps four apart, because each is wrong in a different way:

- **`source_ids`** — what the work is addressable BY. A union, not four optional fields: a
  working paper with no DOI says `status: none` with a reason, which is a claim a reviewer can
  check, while an omission cannot be told from an author who never looked. Ids are bare and
  string-typed — `10.1038/nrg2825`, not a `doi.org` URL, and `pmid: '20838408'` quoted, because
  unquoted it is an integer to YAML and an identifier is a label, never arithmetic.
- **`source_url`** — where the work LIVES. A location rots; an identifier does not. `oa_url` is
  the same question again for a free mirror of a paywalled record.
- **`citation`** — the bibliographic record, checkable against a registry.
- **`attribution`** — the licence NOTICE, checkable against the licence's terms, and required
  only where the note carries upstream expression. These two used to be one string, which meant
  the checkable half could only be checked by parsing it back out of the unverifiable half.
- **`source_read`** — `full-text`, `partial`, `abstract-only`, or `not-read`. A summary built
  from an abstract cannot support a claim about methods, and nothing else in the frontmatter
  said so. Required, so silence is not read as `full-text`; `not-read` is a real answer, for a
  note that checks a work's published record without reading the work.
- **`source_license`** — a union again, for the same reason. `{ status: declared, id: ... }` is
  a determination; `{ status: missing }` is the absence of one. Both deny verbatim carry, and
  collapsing them loses which of the two a reader is looking at.
- **`access_date`** — when we read it. A quoted string, always: bare `2026-01-01` is a `Date`
  to YAML, and there is a negative fixture holding that line.
- **`derived`** — the summary posture, a closed enum of two: `own-words-summary` redistributes
  no protected expression; `verbatim-quotes-summary` does, and the schema then demands a licence
  that permits it. It was free prose here until the shared contract closed it, which is why
  deciding what a posture meant used to take a regular expression over a sentence.
- **`title`** and **`tags`** (min 1) — papers take `domain/*` and `topic/*` subject facets.
  These describe the NOTE rather than the source, which is why they are not in the shared block.

## The cross-field rules this kind enforces

All from the shared contract, all deny-by-default: declared identifiers must include at least
one; a licence id must resolve to a real policy row rather than the default; a note may not
carry verbatim under an own-words-only licence, or under a licence nobody determined; and
verbatim carry obliges both the `attribution` notice and, where the row requires it, a
`license_file` vendored in `LICENSES/`.
