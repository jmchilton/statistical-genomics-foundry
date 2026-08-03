# Design Record

A **Design Record** says why the Foundry is built the way it is. It is the only kind here whose
subject is the Foundry itself rather than statistical genomics.

Which records exist is the collection's answer, not this file's: being a kind is what replaced a
hand-written TypeScript array restating each record's title, summary and category, and a list
here would put that array back in prose.

This kind is **substrate**. Both Foundry instances declare it, with the same required fields,
because every instance accumulates a design record and every one faces the same question of
where it lives. `content/meta/` is the shared answer — the directory the glossary already moved
to.

## Why each required field is required

- **`title`** — required here, though most kinds in this instance let a note go untitled. A
  design record is addressed by name, in prose and on a card.
- **`record_kind`** — which shelf the record sits on, and more usefully a voice contract. A
  `foundation` record is the rationale a reader works through and may argue; an
  `infrastructure` record is developer-facing description of how the thing is built, present
  tense and contract-shaped. A record whose voice fights its shelf is usually two records.
- **`order`** — reading order **within a shelf**, which is what the old array's **position**
  carried. It is pedagogical — positioning before principles, principles before the referee
  loop — so neither `created` nor an alphabetical sort reproduces it. Unique within a shelf
  only: the two shelves number independently, so `order` never sorts them together.
- **`status` / `created` / `revised` / `revision`** — the lifecycle envelope, and the first
  dates in this corpus. This instance deliberately left dates off elsewhere rather than backfill
  values it did not have; these are here because they *could* be populated truthfully, derived
  from each file's own git history.
- **`summary`** — 20–160 characters, the parent's bounds. It is the card text on the design
  index, so it was already being written by hand; it just was not being checked.
- **`tags`** — as on every note. Design records carry `meta`, the one tag in this registry with
  no slash, carried over from the parent instance rather than coined here.

## Shape

A **flat file**, and the first in this instance — every other kind is a directory holding an
`index.md`. A design record has nothing to put beside it, so a directory per record would be a
container with one file in it forever.

## The glossary is not one of these

`content/meta/glossary.md` shares the directory and is deliberately **not** a note of this kind.
It is hand-curated, alphabetical, and rendered by its own page; the collection excludes it by
name. Sharing a directory is a filing decision, not a typing one.
