---
type: meta
title: "Content Model"
record_kind: infrastructure
order: 2
tags:
  - meta
status: reviewed
created: 2026-08-02
revised: 2026-08-03
revision: 4
summary: "How statistical-genomics knowledge is represented as kinds, metadata, tags, references, and companions."
---

This record owns the representation of knowledge. It answers **what kinds of notes exist and how do they relate?** Domain rationale belongs to [[architecture]] and [[guiding-principles]], code dependencies to [[code-architecture]], and placement to [[repository-layout]].

## Notes, kinds, and identity

Every note declares one literal `type`. That value selects a strict kind definition; it is never inferred from a tag. Paths route notes into collections, and the routed kind must agree with the declared type.

The kinds fall into three groups. **`meta`** is the design record — the one kind whose subject is the Foundry rather than statistical genomics. **`book`, `paper`, and `tutorial`** are the source kinds: faithful summaries of something upstream, carrying the provenance and license posture their recovery workflow can honestly support. **`mold` and `pattern`** are the domain's own content, the thing that acts and the thing that explains.

Every kind is a directory note holding an `index.md` except `meta`, which is a flat file — a design record has nothing to put beside it, so a directory per record would be a container with one file in it forever. `site/src/types/<kind>/` holds each kind's schema, its `kind.md` rationale, and a minimal `example.md`; `kinds.generated.json` is the enumeration a consumer reads, derived from those definitions rather than restated. [[repository-layout]] owns where each kind's files sit.

The three source kinds are deliberately distinct. Papers own bibliographic identifiers, tutorials own release and documentation metadata, and books inherit pinned book-level source information. A broad `research` kind would allow those contracts to blur — a shared enum makes every field legal on every member, and lets a `type: paper` note sit under `content/research/tutorials/` and still validate. A literal per kind makes the collection and the declared kind agree, or fail.

Identity is the note's collection-relative id without its extension, slugified with `/` collapsed to `-`. The collection key is the route, so what a note is addressed by and where it renders are one fact rather than two that can disagree. Flat notes and directory notes both lose their extension, and the id this repo computes is the id Astro computes: a note keyed by any other string is reachable by no link, and renders nothing to say so.

`type` as the sole note-kind discriminator is a point of convergence with the parent Foundry ([galaxyproject/foundry#374](https://github.com/galaxyproject/foundry/issues/374)). The two instances differ in how many kinds they define and what each requires; they agree that a note names its own kind, which is what lets kinds enumerate mechanically in both repos for the cross-instance kind catalog.

## Frontmatter envelope

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

## Links

Notes link with `[[Target]]`. Renderer and tests use the same exact resolver across every routed collection; the grammar and the lookup rule come from `@galaxy-foundry/wiki-links`, shared with the parent Foundry, so the two pipelines here cannot drift apart. Resolution is exact after normalization, with no prefix fallback — a link either resolves or renders as a visible bold fallback rather than landing on an arbitrary near-match.

Body links are checked, not merely rendered. `site/tests/body-wiki-links.test.ts` resolves every `[[Target]]` written in prose under `content/` through that same shared resolver, so a link naming nothing fails `pnpm validate` rather than waiting to be noticed. Links to units this Foundry intends to build and has not built are declared beside the check, each with where it is registered as planned, and an entry expires on its own: it fails once its target exists, and fails again once no note writes it.

A backticked token names the syntax and does not create a link, and that exclusion has a second edge worth stating. The rewriter and the check both walk text nodes only, so a backticked `[[Target]]` is neither rewritten nor reported. An unresolved link renders bold and fails a test; a backticked one renders as ordinary code and is invisible in both directions, free to name a note that never existed. Closing that hole mechanically would mean failing every correct mention of the syntax, so the rule carries it instead: wrap a wiki link in backticks only when the literal token is the subject — a template slot, a frontmatter field shape, or a construct like `[[:space:]]` that is not a wiki link at all.

## Typed references

A Mold's `references` are a typed manifest: each entry draws its `kind` from the instance's `reference_contract.yml` and its behavior fields from the inherited vocabularies. A wiki link expresses knowledge navigation; a reference entry adds compilation behavior on top of it. The Mold itself is a directory note with an action body and declared companions such as `eval.md` and `scenarios.md`; [[mold-spec]] owns the authoring contract.

An entry's vocabulary is checked and its target is not. `kind` and `mode` are held to the registries; whether the `target` names a note that exists is currently answered nowhere, so a reference may point at nothing and pass. The body-link check covers prose only, and this is the half still open.

This Foundry narrows reference modes to behavior it can support now. `condense` is unavailable because there is no caster, no pending-LLM bookkeeping, and no model or prompt provenance path — a mode is a commitment to machinery, and declaring one the caster cannot honor would make a manifest that validates and cannot be cast. References here express what a future deterministic cast may carry, not evidence that casting exists.

## Directory notes and companions

Directory-shaped kinds own companions rather than treating every Markdown file as a note. The kind definition declares permitted siblings and their disposition. `guidance.md`, `eval.md`, and `scenarios.md` therefore belong to their owning note but do not acquire independent kind or route identities.

## Source notes and recoverability

Papers, tutorials, and book chapters are faithful source notes, not owned synthesis. Their job is recoverability: a clean-context author should be able to reconstruct the relevant procedure or audit without filling gaps from model memory.

`index.md` carries the faithful summary. An optional `guidance.md` companion records the questions this Foundry needs answered without dictating conclusions. License policy determines whether the summary is own-words-only or may preserve short load-bearing quotations. Source notes keep provenance and project interpretation separate.

Books add one materialization rule: `book.yml` is the source for book-wide metadata, and the book generator copies that metadata into each chapter note. Every chapter then validates from its own frontmatter like any other note.

## Patterns

Patterns are reference leaves for recurring valid or invalid structures: a caution such as double-dipping or an established design pattern. They are not Molds because they explain; Molds act. A referee Mold may cite several Patterns and source notes to make its checks recoverable.

## Aggregation model

The Mold-primary information architecture permits a Mold to stand alone. A Protocol may later aggregate Molds into an ordered referee journey, but protocol membership does not define Mold identity or completeness. No navigation-hub kind exists or is needed: browse surfaces project the note graph rather than adding a source of truth to it.

## Deliberate non-notes

`content/meta/glossary.md` is the deliberate flat-file exception: it shares the meta directory but is excluded from the collection and rendered by its own route. Sharing a directory is a filing decision, not a type declaration.

Update this record when a kind, metadata contract, tag rule, reference relationship, companion rule, or source-recovery contract changes.
