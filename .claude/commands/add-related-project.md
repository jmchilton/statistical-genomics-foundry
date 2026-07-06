---
description: Add a Related Projects note (content/research/projects/*.md) for an adjacent project, following the house pattern
argument-hint: "<project name> [primary URL(s)]"
allowed-tools: Read, Write, Edit, Bash, WebFetch, WebSearch, Agent
---

Create a **Related Projects** note for an adjacent project — its own framing, its
strengths relative to the Foundry, a 7-value rubric table, and a clean present-
tense divergence — and wire it into the site. Match the existing notes in
`content/research/projects/*.md` exactly.

## Input

`$ARGUMENTS` = the project's name, optionally followed by one or more primary
URLs (repo, site, paper). If no URL is given, find the primary sources yourself.
Derive `<slug>` as the kebab-case project name; the note is
`content/research/projects/<slug>.md` and its site slug is `project-<slug>`.

If the project clearly already has a `content/research/projects/*.md` note, stop and ask
whether to update it instead of creating a duplicate.

## 1. Ground yourself first

Read, in this order, before writing anything:

- `docs/POSITIONING.md`, `docs/GUIDING_PRINCIPLES.md`, `docs/REFEREE_LOOP.md` —
  what the Foundry *is* and the values the rubric scores against.
- One existing exemplar, `content/research/projects/bioskills.md` — the canonical shape and
  voice. **Imitate it.**

## 2. Research discipline (the "verify" in the note)

Work from **primary sources** (the repo, the project's own site, the paper), not
secondary write-ups. The note's job is to be *accurate and generous*, not to win:

- **Credit strengths honestly**, including axes where the project is *ahead* of
  the Foundry. Say so plainly.
- **Locate distinctions precisely.** Where an axis is genuinely *shared* (e.g. a
  project that also builds skills, or also runs a real empirical referee), call it
  a **similarity** — never claim a shared strength as uniquely ours.
- **Never overclaim.** No "it has no X" when X exists in a weaker or different
  form. Frame the Foundry's edge as the precise thing that differs, not a void.
- Separate corpus/primary-observed facts from inference. If a primary source is
  unreachable (paywall, 403), note it and lean on what you could read. Don't
  invent capabilities or numbers; hedge moving counts ("hundreds," not a stale
  exact figure).

If the project is large or the sourcing is contested, you may fan out a research
subagent to gather and **return** a primary-source report (it must not write
files — you write). Otherwise research inline.

## 3. The 7-value rubric

Fill one table row per value, project-specific, in present tense. Definitions:

| Value | What it asks |
|---|---|
| **Produces skills** | Does it emit portable, self-contained skill artifacts? (Yes/No/Partial.) Not producing skills is not a flaw — skills are *our* packaging target, stated neutrally. |
| **Progressive disclosure** | Is there a layered disclosure strategy (name/description → body → on-demand references)? Describe it, or "No." |
| **Traceability** | Can a human *and* an agent see where information comes from — sources foregrounded, cited, linked? Assess. |
| **CLI instructions derived from CLI docs** | Are CLI tool invocations derived from authoritative CLI documentation / training / tutorials, with version discipline? Assess, or **N/A** if not a CLI-wrapping project. |
| **Portability** | If it produces skills, how portable across runtimes? ("No" / "Partial" / "High" + why.) |
| **Human scrutiny** | Is the data wrapped in the skills presented so humans can read, correct, trace, and contribute to it? ("No skills produced" where apt.) |
| **Knowledge-base backed** | Is there an inspectable knowledge base *beneath* the artifacts? Lead with **Yes** / **No**. |

## 4. Note skeleton (match exactly)

```
# <Project name>

> **<canonical handle/URL>** — "<one-line self-description, quoted if possible>".
> <key facts: license, form, scale>. Verified <YYYY-MM-DD> against <primary sources read>.

## Its framing

<2–5 sentences in the project's own terms — generous, what it is and aims to be.>

## Strengths relative to our approach

<Lead line, then a bullet list of genuine strengths, including where it leads the
Foundry. Bold the lead phrase of each bullet.>

## Where it sits on our values

| Value | <Project name> |
|---|---|
| **Produces skills** | ... |
| **Progressive disclosure** | ... |
| **Traceability** | ... |
| **CLI instructions derived from CLI docs** | ... |
| **Portability** | ... |
| **Human scrutiny** | ... |
| **Knowledge-base backed** | ... |

## Where it diverges from the Foundry

<One tight present-tense paragraph stating the real distinction(s). Credit shared
axes as similarities. End with the one-line crux.>

## Sources

- <primary URL> — <what it grounds>.
```

Use single-dollar delimiters for inline math flush against text where it occurs
(p-value, e-value, k-mer written as math) — KaTeX renders it on the site.

## 5. No archeology

The note describes the **project**, in present tense — never the investigation
that produced the note. Forbidden: "a quick read suggests," "we hypothesized,"
"refuted," "what to avoid claiming," "verify our resolver," "three of four
limitations." The verification lives in *accurate facts and cited sources*, not in
a process narrative. The `## Where it diverges` paragraph states the distinction
as fact; it is not a caution list.

## 6. Register it on the site

Edit `site/src/lib/design-docs.ts`: add one entry to `DESIGN_DOCS`, placed among
the other `category: 'related-projects'` entries (keep them alphabetical by
title):

```
  {
    slug: 'project-<slug>',
    title: '<Project name>',
    source: 'projects/<slug>.md',
    dir: 'research',
    summary: '<one line — what it is, plus "its framing, strengths, and where it sits on our values">',
    category: 'related-projects',
  },
```

No schema or group changes are needed — the `related-projects` category already
exists.

## 7. Build, verify, report

1. `cd site && npm run build` — must be green.
2. Confirm `dist/design/project-<slug>/index.html` exists, its values table has
   **8 `<tr>`** (header + 7 rows), and any inline math rendered
   (`class="katex"` present, no leftover literal dollar-delimited text).
3. Report: the note path, the registry entry, the build result, and one line on
   the project's sharpest similarity and sharpest divergence. Do **not** commit
   unless asked.
