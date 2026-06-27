# bioSkills

> **github.com/GPTomics/bioSkills** — "a set of SKILLS.md for doing bioinformatics
> with agents like Claude Code," by GPTomics. ~952★, "Version 3.0" (Feb 2026),
> hundreds of skills across 63 categories. Our nearest neighbor on the
> "repository of skills" axis. Verified 2026-06-26 against the repo,
> `skill_writing_reference.md`, and sample SKILL.md files.

## Its framing

bioSkills presents itself as a broad, practitioner-grade library of agent skills
for bioinformatics — sequence I/O, alignment, variant calling, scRNA-seq,
ChIP/ATAC, Hi-C, phylogenetics, pop-gen, metagenomics, proteomics — plus a
`workflows` category of end-to-end pipelines. The unit is the hand-authored
`SKILL.md`: it *is* the deliverable and the source of truth. The project's
signature is CLI-rigor discipline — a mandatory `## Version Compatibility` block,
a `primary_tool`, introspection commands, and a "Per-Tool Failure Modes"
template, all enforced by a 19-point validation lint. Young, fast-moving,
genuinely popular.

## Strengths relative to our approach

On several axes bioSkills is ahead of the Foundry today:

- **CLI-integration rigor is its signature, and it is excellent.** Verbatim
  `## Version Compatibility` (pinned versions + introspection: `pip show`,
  `packageVersion()`, `--version`), an instruction to *adapt to the installed API
  on `ImportError`/`AttributeError` rather than retry blindly*, example scripts
  tagged with a verify-if-version-differs reference, and a structured failure-mode
  table. More disciplined than typical skill repos about the agent–tool
  version-mismatch problem. This is the closest external match to a value we hold.
- **Embedded statistical wisdom.** Domain skills carry genuine correctness content
  ("'Tajima's D < −2 means a sweep' is wrong by construction"; "|iHS| > 2 is an
  empirical convention, NOT a calibrated $p$-value"), confound callouts, and
  citations. High-quality *content* — distinct from an automated *referee*.
- **Coverage and momentum** — hundreds of skills, 63 categories, active.
- **Genuinely multi-runtime** with a documented format-conversion step.
- **Structured relationship fields** (`depends_on`, `qc_checkpoints`,
  `Related Skills`) — more formal than prose-only repos.

## Where it sits on our values

| Value | bioSkills |
|---|---|
| **Produces skills** | **Yes** — hundreds of hand-authored `SKILL.md`. This is exactly our packaging target; bioSkills is our nearest neighbor here, not a contrast. |
| **Progressive disclosure** | **Yes, standard** — the Agent Skills shape (frontmatter `description` → `SKILL.md` body → `references/`/`scripts/`), with a documented conversion step. No layer *beneath* the skill, though — disclosure is within the artifact, not from an authoritative source. |
| **Traceability** | **Partial** — skills carry citations and a tool-version header, but the `SKILL.md` *is* the source ("you are responsible for every line"). No upstream inspectable source-of-truth, no per-artifact provenance lineage; `Related Skills` links are plain-text paths, format-validated for presence, not machine-resolved. A reader can see what a skill cites, but cannot trace a line back to a governed source. |
| **CLI instructions derived from CLI docs** | **Strong (by discipline)** — mandatory version-compatibility + introspection + adapt-on-mismatch, enforced by lint. Derived through an authoring contract, not an automated pipeline from CLI documentation, but the value is squarely honored. |
| **Portability** | **High** — installers for Claude, Codex, Antigravity (Gemini), OpenCode, OpenClaw, plus a documented conversion to the Agent Skills standard. Multi-target. |
| **Human scrutiny** | **Yes, at the file** — skills read as human-practitioner prose; readable, correctable, and contributable by hand (PRs). But there is no navigable, progressive-disclosure *learning surface* — it is a directory of files, not a site a human reads to learn the domain. |
| **Knowledge-base backed** | **No** — the skills are the source of truth; there is no inspectable knowledge base beneath them. |

## Where it diverges from the Foundry

In bioSkills the `SKILL.md` files are the source of truth: hand-authored, carrying
citations and a tool-version header, but with no governed source beneath them. The
Foundry inverts that stack — an inspectable abstract source-of-truth (Molds) is
*cast* into portable skill artifacts that carry per-artifact provenance, with
machine-resolved cross-references and a navigable knowledge base a human reads to
learn. Its embedded statistical guidance is excellent *content*; the Foundry's
distinction is an *empirical referee* that gates a result, not better prose. And
bioSkills' CLI discipline — version pins, introspection, adapt-on-mismatch — is a
genuine strength the Foundry shares rather than contrasts. The short version:
bioSkills is the artifact layer done well; the Foundry builds the layer beneath
it.

## Sources

- https://github.com/GPTomics/bioSkills — scale, stars, v3.0 date, multi-runtime installers.
- https://raw.githubusercontent.com/GPTomics/bioSkills/main/skill_writing_reference.md — authoring contract (`Version Compatibility`, `depends_on`/`qc_checkpoints`/`Related Skills`, 19-point lint).
- `population-genetics/selection-statistics/SKILL.md`, `genome-intervals/bed-file-basics/SKILL.md` — human prose, CLI rigor, embedded stats.
- https://github.com/GPTomics/bioTaskBench — separate task benchmark.
