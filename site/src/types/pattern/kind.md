# Pattern

A **Pattern** is one named methodological pattern the referee Molds reason against —
`[[double-dipping]]`, `[[garden-of-forking-paths]]`, `[[batch-aliased-with-condition]]`. Only
`index.md` bears frontmatter.

## The bipolar corpus

`pole` is this instance's sharpest divergence from the parent Foundry, and the reason this kind
exists in the shape it does. The parent's corpus is the IWC workflow set — *all positive
exemplars*, because a converter only needs to know what good output looks like. A referee does
not: **a checker that has only seen good examples cannot recognize a bad one.**

So the corpus has two poles:

- **`established-good`** — methods plus the validity conditions under which they hold. Grounds
  "pick an established method, don't invent one."
- **`cautionary-bad`** — named invalidity patterns, their signatures, and their remedies.
  Grounds the referee's ability to *catch* something.

The second pole has no parent analog. It is not an oversight there and not an extension here —
it is what the domain requires.

## Why each required field is required

- **`name`** — the slug every `[[wiki-link]]` and reference resolves to.
- **`status`** — the parent's lifecycle enum (`draft` / `reviewed` / `revised` / `stale` /
  `archived`), required. Holding patterns to the same closed vocabulary as every other Foundry
  note is what keeps lifecycle browsable and reportable; free-text status is neither.
- **`tags`** (min 1) — patterns take the `domain/*` and `topic/*` subject facets.

`pole` is optional because the corpus is stub-first: a pattern can be named before it is
classified. Where it is set, it is what the referee Molds select on.
