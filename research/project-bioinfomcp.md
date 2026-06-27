# BioinfoMCP

> **arXiv 2510.02139v1** — "BioinfoMCP: A Unified Platform Enabling MCP Interfaces in Agentic Bioinformatics"; the platform "extract[s] essential information from the manual passed onto the platform and directly transform[s] it into an MCP server."
> An LLM backbone auto-converts CLI bioinformatics tools into Model Context Protocol servers by reading each tool's PDF manual and/or `--help` output and emitting FastMCP 2.0 Python code, refining until the syntax is valid. Reported ~94.7% success = 36 of 38 tools executing across three agent platforms (a local agent, Claude Desktop, Cursor); "success" means a wrapper that runs "without encountering any non-internal tool errors, and output[s] results as expected if they were being run manually" — a working-wrapper test, not a scientific-correctness test. The two failures (STAR, Cell-ranger) are attributed to compute constraints, not wrapper defects. Verified 2026-06-27 against the arXiv HTML.

## Its framing

BioinfoMCP positions itself as the missing adapter between agentic LLMs and the existing bioinformatics toolchain: rather than hand-write an MCP server per tool, it parses a tool's documentation into a structured prompt and has an LLM generate a FastMCP-compliant Python server, iterating on syntax errors through a feedback loop until the wrapper is valid. It demonstrates the converted tools both individually and chained into multi-step pipelines (RNA-seq, WGS, ChIP-seq, ATAC-seq, somatic SNV calling), where an agent calls the wrapped tools in sequence from a natural-language prompt and adapts to error messages as it goes. The pitch is breadth and automation: turn the CLI bioinformatics ecosystem into agent-actionable surface with no per-tool engineering.

## Strengths relative to our approach

On the wiring axis BioinfoMCP is exactly the automation LLMs are already good at, and it does it well:

- **It mechanizes CLI→wrapper derivation from documentation.** It reads `--help`/`-h` output and PDF manuals and synthesizes the calling interface automatically — the automated form of a discipline bioSkills enforces by hand. This genuinely overlaps the Foundry's "CLI instructions derived from CLI docs" value, and we credit it as a real partial similarity, not something we own.
- **Breadth with near-zero per-tool cost.** 38 tools across alignment, variant calling, QC, assembly, peak calling, quantification, and sequence analysis (Bowtie2, BWA, GATK, samtools, bedtools, MACS3, Salmon, deeptools, …) from a single generation pipeline.
- **A closed syntactic-validation loop.** Generation is gated on "syntax = valid" with iterative refinement, plus individual-server and end-to-end pipeline execution tests — empirical *that the wrapper runs*, not author-asserted.
- **Standards-based exposure.** Emitting MCP (FastMCP 2.0) makes every converted tool callable across MCP clients without bespoke glue.

## Where it sits on our values

| Value | BioinfoMCP |
|---|---|
| **Produces skills** | **Adjacent, not the same artifact** — it emits MCP *server wrappers* (FastMCP Python) that expose a tool's invocation surface, not portable domain skills encoding method know-how. Reusable tool-call artifacts, yes; a `SKILL.md`-style packaged competence, no. |
| **Progressive disclosure** | **No** — the deliverable is a server an agent calls; there is no layered human reading surface. |
| **Traceability** | **Partial / thin** — the generated Python is inspectable and is derived from a known manual/`--help`, so a reader can in principle see the interface it encodes, but there is no recorded provenance lineage binding a wrapper line back to a governed source, and no human-foregrounded surface. |
| **CLI instructions derived from CLI docs** | **Yes, by automated derivation — and this is the real overlap** — the wrapper is synthesized directly from `--help`/PDF docs. The honest gap vs. bioSkills: **no version discipline** — no version pinning, introspection, or adapt-on-mismatch; version compatibility and dependency drift are explicitly unaddressed, and manual quality bounds wrapper robustness. It derives the interface but does not discipline the invocation against the installed tool version. |
| **Portability** | **Partial** — MCP is a portability standard and the wrappers run across MCP clients (demonstrated on three), but the artifact is MCP-bound, not a runtime-agnostic skill. |
| **Human scrutiny** | **Partial** — the output is readable, editable Python a human could correct, but the pipeline is presented as fully automated with no review/curation step in the loop. |
| **Knowledge-base backed** | **No** — there is no inspectable knowledge base beneath the wrappers; the tool manual is an input to one-shot generation, not a governed source of truth. |

## Where it diverges from the Foundry

BioinfoMCP automates the part of the stack LLMs already handle well — turning a CLI tool into something an agent *can* call — and it does so by deriving the interface straight from CLI documentation, a genuine partial overlap with a Foundry value (and the mechanized cousin of bioSkills' hand-authored CLI rigor, minus the version discipline). The distinction is categorical and factual: producing a callable wrapper, and verifying that the wrapper *runs and returns output*, is not refereeing whether the *analysis* an agent conducts through that wrapper is statistically valid — assumptions met, no double-dipping, the named method real and appropriate, error actually controlled. BioinfoMCP's 94.7% measures working wrappers, not correct science; nothing in it judges the method beneath the result. The Foundry sits beneath the tool call: it assumes the agent can invoke the tool (work BioinfoMCP, and MCPmed for web services, do for it) and gates the validity of what is computed. Crux: BioinfoMCP makes tools agent-actionable; it does not — and does not claim to — referee whether the agent's analysis is sound.

## Sources

- https://arxiv.org/html/2510.02139v1 — the BioinfoMCP paper: conversion via manual/`--help` → FastMCP Python, the 36/38 ≈ 94.7% working-wrapper metric and its definition, pipeline demos, tool list, and the absence of version discipline or human review.
