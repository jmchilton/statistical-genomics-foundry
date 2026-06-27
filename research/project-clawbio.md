# ClawBio

> **github.com/ClawBio/ClawBio** — "the first bioinformatics-native AI agent skill
> library. Local-first. Reproducible. Built on OpenClaw." MIT; 89 skills (29
> production-ready), a Galaxy bridge over 8,000+ tools, and benchmark validation;
> v0.5.0 (Apr 2026). Verified 2026-06-27 against the repo README and the project
> site.

## Its framing

ClawBio is a bioinformatics-native agent skill library built on OpenClaw,
organized around three claims: local-first privacy (genomic data never leaves the
laptop), reproducibility (every run can be replayed without the agent), and
validation against ground truth. Each skill is a self-contained directory — a
declarative `SKILL.md`, validated Python, demo data, and a `reproducibility/`
bundle. Domains span pharmacogenomics, variant interpretation, population genetics
and ancestry, single-cell, and a Galaxy bridge over thousands of tools.

## Strengths relative to our approach

On two axes ClawBio is ahead of most skill libraries — including bioSkills:

- **Reproducibility as a first-class artifact.** Every run emits a
  `reproducibility/` bundle: `commands.sh` (replay), `environment.yml` (conda
  snapshot), `checksums.sha256`, and `runtime-lock.json` — so "anyone can
  reproduce without the agent."
- **Systematic benchmark validation.** v0.5.0 scores skills against curated ground
  truth with objective metrics (gene-recovery, FDR, precision, recall, F1), a mock
  API server for offline CI, and a nightly sweep. Empirical, not LLM
  self-assessment.
- **Local-first / privacy by design** — data stays on the laptop; no cloud
  uploads; no Docker or Singularity required for core functionality.
- **Genuinely multi-runtime** — a Claude Code plugin, a Python import, chat
  adapters, and the OpenClaw gateway, with reproducibility explicitly decoupled
  from any AI vendor (runs under Claude, ChatGPT, or Ollama).
- **A machine-readable catalog** (`skills/catalog.json`) — status flags,
  `maturity_tier`, trigger keywords, and chaining partners — more structured than
  plain-text related-skills links.
- **Explicit data-source provenance** — CPIC, GWAS Catalog, ClinVar, gnomAD, and
  Zenodo DOIs for reference data.

## Where it sits on our values

| Value | ClawBio |
|---|---|
| **Produces skills** | **Yes** — 89 skills (29 production-ready), each a self-contained `SKILL.md` + validated Python + demo data + reproducibility bundle. Exactly our packaging target. |
| **Progressive disclosure** | **Partial** — the Agent Skills shape (declarative `SKILL.md` → on-demand Python/data), surfaced as a Claude Code plugin, with a `catalog.json` of trigger keywords. Disclosure sits within the artifact; there is no governed layer beneath it. |
| **Traceability** | **Strong on reproducibility** — replayable commands, pinned environments, SHA-256 checksums, cited data sources and DOIs. But the `SKILL.md` is the source of truth, so traceability runs to external data and a replayable *run*, not to an authoritative upstream source with provenance lineage. |
| **CLI instructions derived from CLI docs** | **Partial** — reproducible environment pinning (`uv.lock`, conda, runtime locks) rather than per-tool version-compatibility / introspection derived from CLI documentation. It captures the whole environment instead of disciplining each invocation. |
| **Portability** | **High** — Claude Code plugin, Python import, chat adapters, OpenClaw gateway; reproducibility decoupled from any AI vendor. |
| **Human scrutiny** | **Yes, at the file** — hand-written `SKILL.md` + Python, PR-contributable, with a reproducibility bundle a human can replay without the agent. But the distribution site and catalog are not a navigable surface a human reads to learn the domain. |
| **Knowledge-base backed** | **No** — the skills are the source of truth; external databases are queried per-skill and `catalog.json` indexes the skills, but there is no inspectable human knowledge base beneath them. |

## Where it diverges from the Foundry

ClawBio is the rare skill library that already does two things most do not: it
emits a reproducibility bundle with every run, and it scores skills against
curated ground truth (FDR, precision, recall) in a nightly benchmark — empirical,
not self-certifying. Two precise distinctions remain. First, *reproducibility is
not provenance*: ClawBio guarantees a run can be replayed — same commands, same
environment, same checksums — whereas the Foundry traces an artifact back to a
governed source of truth; a reproducibly-wrong analysis still reproduces. Second,
the *unit validated*: ClawBio's benchmark asks "did this skill's output match a
known answer set?" — output-versus-truth, per-skill, offline — where the Foundry's
referee asks the prior question for an arbitrary analysis, in-loop: is the *method*
statistically valid — assumptions met, no double-dipping, the named method real
and appropriate, error actually controlled. And like every hand-authored library,
its `SKILL.md` files are the source of truth: no abstract source cast into
artifacts, no foregrounded human knowledge base. ClawBio is among the strongest of
these libraries; the Foundry argues for the layer beneath it.

## Sources

- https://github.com/ClawBio/ClawBio — README: skill format, the `reproducibility/` bundle, the v0.5.0 benchmark/validation infrastructure, runtimes, license, and metrics.
- https://clawbio.github.io/ — project site: a distribution and catalog surface, not a human learning knowledge base.
