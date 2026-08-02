---
type: meta
title: "Content Model"
record_kind: infrastructure
order: 2
tags:
  - meta
status: reviewed
created: 2026-08-02
revised: 2026-08-02
revision: 1
summary: "How statistical-genomics knowledge is represented as kinds, metadata, tags, references, and companions."
---

This record owns the representation of knowledge. It answers **what kinds of notes exist and how do they relate?** Domain rationale belongs to [[architecture]] and [[guiding-principles]], code dependencies to [[code-architecture]], and placement to [[repository-layout]].

## Notes, kinds, and collections

Every note declares one literal `type`. That value selects a strict kind definition; it is never inferred from a tag. Paths route notes into collections, and the routed kind must agree with the declared type.

| Kind | Purpose | Shape and location |
|---|---|---|
| `meta` | Foundry design record | flat file under `content/meta/` |
| `book` | faithful chapter summary with book-level provenance | `content/research/books/<book>/<chapter>/index.md` |
| `paper` | faithful paper summary and license posture | `content/research/papers/<id>/index.md` |
| `tutorial` | faithful vignette or tutorial summary | `content/research/tutorials/<id>/index.md` |
| `mold` | abstract construct, critique, or calibrate action | `content/molds/<slug>/index.md` |
| `pattern` | established-good or cautionary-bad reference leaf | `content/patterns/<slug>/index.md` |

The three source kinds are deliberately distinct. Papers own bibliographic identifiers, tutorials own release and documentation metadata, and books inherit pinned book-level source information. A broad `research` kind would allow those contracts to blur — a shared enum makes every field legal on every member, and lets a `type: paper` note sit under `content/research/tutorials/` and still validate. A literal per kind makes the collection and the declared kind agree, or fail.

`type` as the sole note-kind discriminator is a point of convergence with the parent Foundry ([galaxyproject/foundry#374](https://github.com/galaxyproject/foundry/issues/374)). The two instances differ in how many kinds they define and what each requires; they agree that a note names its own kind, which is what lets kinds enumerate mechanically in both repos for the cross-instance kind catalog.

## Metadata envelope

Every kind is `.strict()`: an undeclared key is an error. The common envelope is intentionally smaller than the parent's because the corpus must not manufacture dates or provenance it cannot recover.

- Every note declares at least one registered `tags` value.
- Molds require a 20–160 character `summary` because browse surfaces depend on it.
- Patterns carry the shared status lifecycle.
- Meta records carry `title`, `record_kind`, `order`, lifecycle dates, revision, summary, and the `meta` tag.
- Source kinds carry the provenance, access, license, and domain fields their recovery workflow can support honestly.

Differences from the parent are visible in the generated kind manifest rather than hidden behind an artificially identical base envelope.

Strictness is not only a tidiness rule. An undeclared key is also an unvalidated key, and YAML will silently coerce it: unquoted `pmid: 33015620` parses as an integer and `published: 2024-03-21` as a `Date`, neither of which is what the field means. Declaring a field is what puts a type on it. Strictness is also what stops a book chapter shadowing `book.yml`'s license metadata by restating it.

## Tags and facets

`meta_tags.yml` declares a closed vocabulary grouped into four domain browse facets:

- `family` — the broad Mold family;
- `role` — construct, critique, or calibrate posture;
- `domain` — the statistical-genomics subject area;
- `topic` — a narrower cross-cutting concern.

`meta` is the one inherited bare tag for design records. Membership is declared by the registry, not inferred from slash prefixes. Corpus tests reject both undeclared use and instance-authored vocabulary carried by no note.

The registry **format** is shared across Foundry instances — specified in [galaxyproject/foundry-pattern](https://github.com/galaxyproject/foundry-pattern), `content/pattern/standing-up-a-foundry.instructions.txt` — so a format change is a cross-repo change. The facet **vocabulary** above is ours alone: the Galaxy Workflow Foundry's facets are its own, and only `topic` collides by name — theirs groups pattern maps, ours sits beneath a `domain`.

Tags remain soft evidence. In particular, `role` does not become a hard Mold enum until enough real Molds show that the distinction is stable and non-overlapping.

## Source notes and recoverability

Papers, tutorials, and book chapters are faithful source notes, not owned synthesis. Their job is recoverability: a clean-context author should be able to reconstruct the relevant procedure or audit without filling gaps from model memory.

`index.md` carries the faithful summary. An optional `guidance.md` companion records the questions this Foundry needs answered without dictating conclusions. License policy determines whether the summary is own-words-only or may preserve short load-bearing quotations. Source notes keep provenance and project interpretation separate.

Books add one materialization rule: `book.yml` is the source for book-wide metadata, and the book generator copies that metadata into each chapter note. Every chapter then validates from its own frontmatter like any other note.

## Molds and references

A Mold is a directory note with an action body, typed `references`, and declared companions such as `eval.md` and `scenarios.md`. Its reference manifest draws from the instance's `reference_contract.yml` plus inherited behavior vocabularies.

This Foundry narrows reference modes to behavior it can support now. In particular, `condense` remains unavailable because there is no caster, no pending-LLM bookkeeping, and no model/prompt provenance path. References currently express what a future deterministic cast may carry, not evidence that casting exists.

The Mold-primary information architecture permits a Mold to stand alone. A Protocol may later aggregate Molds into an ordered referee journey, but protocol membership does not define Mold identity or completeness.

## Patterns

Patterns are reference leaves for recurring valid or invalid structures: a caution such as double-dipping or an established design pattern. They are not Molds because they explain; Molds act. A referee Mold may cite several Patterns and source notes to make its checks recoverable.

## Links and companions

Notes link with `[[Target]]`. Renderer and tests use the same exact resolver across every routed collection. A backticked token names the syntax and does not create a link.

Directory-shaped kinds own companions rather than treating every Markdown file as a note. The kind definition declares permitted siblings and their disposition. `guidance.md`, `eval.md`, and `scenarios.md` therefore belong to their owning note but do not acquire independent kind or route identities.

`content/meta/glossary.md` is the deliberate flat-file exception: it shares the meta directory but is excluded from the collection and rendered by its own route.

Update this record when a kind, metadata contract, tag rule, reference relationship, companion rule, or source-recovery contract changes.
