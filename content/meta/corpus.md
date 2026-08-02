---
type: meta
title: "Corpus"
record_kind: foundation
order: 8
tags:
  - meta
status: reviewed
created: 2026-06-26
revised: 2026-08-02
revision: 2
summary: "How external sources are ingested as own-words summaries without becoming a content mirror."
---

This record owns how external evidence grounds the Foundry without being copied into it: what the corpus is made of, how a note reaches it, and which integration is deliberately absent. What any individual source says belongs to that source's note.

## No ingestion pipeline, no mirror

This project has **no corpus ingestion pipeline, no mirror, and no fixtures runtime dependency**. It integrates its corpus through citations by URL or DOI, survey and research notes, optional inline excerpts, and Molds that fetch live evidence at runtime. Point upstream, quote only what you must, and pin a citation to a DOI, commit, or version when stability matters — the author's call per citation, not an enforced policy. [[guiding-principles]] holds the reasoning, under *Source Authority Beats Local Copies*.

There is no generated-corpus workspace. If survey work later wants one — a local cache of Bioconductor vignettes, say, or simulation fixtures — it lives outside `content/`, gitignored, invisible to the validator and the site. Anything the validator can see is content the Foundry has taken responsibility for keeping current, and a cache is exactly the thing nobody keeps current.

## The corpus is bipolar

A referee grounded only in good examples cannot recognize a bad one. So the corpus has two poles rather than one:

- **Established-good** — methods and their validity conditions. This is what grounds *pick an established method, don't invent*: Bioconductor vignettes and OSCA, DE-method comparisons, GWAS QC protocols, method papers with their stated assumptions.
- **Cautionary-bad** — named invalidity patterns and their remedies. This is what grounds the referee: double-dipping and circular analysis with its countsplit remedy, batch effects confounded with condition, the garden of forking paths, naive multiple testing under dependence. Each is a failure *with a signature*, which is the property that makes it recognizable rather than merely regrettable.

Three further kinds support the poles without being poles themselves. **Reporting standards and checklists** — EQUATOR, ClinGen/PRS-RS, MIQE, PROBAST-AI signalling questions — are pre-written referee structure to cite and cast rather than reinvent. **Calibration and simulation methodology** — simulation-based calibration, posterior predictive checks, permutation frameworks, negative-control design, power analysis — grounds the calibrate role. **Benchmarks and truth sets** — StatQA, GIAB with hap.py, splatter and polyester — ground evals, and double as `scenarios.md` fixtures.

## How the corpus is referenced

- **Pattern and research notes cite by URL or DOI in the body.** A pattern's exemplars section (established-good) or failure-cases section (cautionary-bad) lists sources as ordinary Markdown links with a line of commentary each.
- **Inline excerpts when they earn it.** A short excerpt — a method's assumption list, a checklist item, a code snippet showing the invalid move — may be pasted into a body to illustrate. It is committed verbatim, never regenerated at build time, and rot is rot. Corpus-first discipline applies hardest here: write the excerpt only when a real case demands it, because invented "representative" prose is precisely this project's failure mode.
- **No category-aggregation layer.** Corpus grounding lives in note bodies and citations, not in an index. An index would be a second place the corpus is described, and the two would disagree.
- **Referee Molds may fetch live evidence at runtime.** A cast skill can carry instructions to fetch a standard or look up a method rather than embedding a copy. The Mold's source describes the *procedure*, not a frozen snapshot.

## What this gives up

- No per-source inverse view and no per-category browsing. Nothing structurally supports them; a note that needs one is hand-written by exception.
- No build-time inlining of full sources into casts. A cast gets URLs and DOIs the agent fetches, or a small hand-curated excerpt.
- No detection of upstream drift. A cited method page or standard can change underneath a note, and the mitigation is pinning to a DOI or version where stability matters, plus review.

## Validation

There is no corpus-specific validator layer, and body citations are not link-checked: automated link-checking at this scale costs more than the moderate cost of brokenness. The one discipline enforced in review is that a `hypothesis`-evidence reference ([[mold-spec]]) gets flagged, because ungrounded prose is this project's specific risk.

## Minimum exercise

1. Author two or three patterns end to end — at least one established-good and at least one cautionary-bad, each citing sources by URL or DOI, with an inline excerpt where it helps.
2. Confirm a Family-B Mold can wiki-link the cautionary-bad pattern, and that casting preserves the citations as live evidence pointers rather than embedded mirrors.
3. Confirm a `scenarios.md` can bind a benchmark or truth-set case as a planted fixture.

If the loop holds, scale. No further ingestion tooling is planned.
