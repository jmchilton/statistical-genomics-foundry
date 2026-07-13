# Operability — is it clear how to run the external tooling?

Grades the **toolchain a Family-A doer commits its user to**, and how clearly the skill documents
standing it up. Two contributors, kept separate so a low grade is diagnostic:

- **Toolchain quality** — properties of the tools the skill names (open, packaged, portable).
- **Documentation clarity** — whether the *skill* states how to install and invoke them.

A skill can name a perfect conda tool and never say how to install it (high quality, low clarity);
or thoroughly document a closed-source one (low quality, high clarity). Grade both, report the
letter as the lower-bounded combination.

## Scored dimensions

| Dimension | Cluster | Earns credit when | Evidence source |
|---|---|---|---|
| Install targets present | clarity | skill states how to obtain each tool, not just names it | the SKILL.md itself |
| conda / bioconda available | quality | each tool has a bioconda recipe | `bioconda` recipe search `[verify per tool]` |
| Container reference | quality | a Docker/Singularity/Apptainer image is named | SKILL.md / registry |
| BioContainers reference | quality | the tool resolves on BioContainers (auto from bioconda) | quay.io/biocontainers `[verify]` |
| Open source | quality | source public under an OSI license | tool LICENSE `[verify]` |
| Non-copyleft | quality | permissive (MIT/BSD/Apache) vs copyleft (GPL) — see open Q1 | tool LICENSE `[verify]` |
| Cross-platform | quality | Linux + macOS (Windows via WSL counts as partial) | tool docs `[verify]` |

**Every quality cell requires a real check** — a bioconda hit, a LICENSE, a registry tag. An
asserted-from-memory "it's on conda" is exactly the confabulation the Foundry referees; mark
`[verify]` until checked.

## Bands (deduction from A, per the author's scheme)

Start at **A** = cross-platform, open-source, non-copyleft, bioconda-packaged **with** a
biocontainer, **and** install targets documented. Then deduct:

- **−½** each: no container reference · non-conda (manual build only) · copyleft (see Q1) ·
  not cross-platform · install steps named but incomplete.
- **−1** each: closed-source · no install guidance at all · a named tool that cannot be obtained.
- **F**: the toolchain cannot be stood up from the skill plus public packaging.

A `mixed`-tool skill (several tools) scores the **worst-case load-bearing tool**, not the average —
the pipeline is only as runnable as its hardest dependency. Note per-tool grades in the evidence.

## Assessments

_No skills assessed yet._

## Open calibration questions

1. **Copyleft penalty — settled: copyleft −½, closed-source −1.** Copyleft is modal in
   bioinformatics and does not block *running*, but it *does* restrict how the Foundry may
   **display, reuse, and rework** the material (casts, summaries) — a real constraint for this
   project specifically, not a generic one — so it keeps the half-letter ding. Closed-source is a
   full letter: it blocks that same rework *and* obtainability. The gap between them is the point.
2. Does "documented install" require pinned versions, or is "available on bioconda" enough?
3. Should a pure-R/Bioconductor skill (CRAN/BioC install, no container norm) be penalized for "no
   container" the same as a CLI tool? Probably not — packaging norms differ by ecosystem.
