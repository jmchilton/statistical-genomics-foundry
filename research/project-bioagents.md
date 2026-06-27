# BioAgents

> **nature.com/articles/s41598-025-25919-z** (code: github.com/microsoft/bioinformagus) —
> "a multi-agent system built on small language models, fine-tuned on bioinformatics
> data, and enhanced with retrieval augmented generation (RAG)." *Scientific Reports*
> 2025; CC-BY paper, MIT code; three Phi-3 agents, runs locally. Verified 2026-06-28
> against the open-access PMC full text, the arXiv preprint, and the repo (the
> Nature-hosted HTML sits behind a cookie wall, read via PMC).

## Its framing

BioAgents argues that end-to-end bioinformatics demands rare combined genomics +
computation expertise, and that general cloud LLMs are both too generic and too heavy
for routine lab use. Its answer is a multi-agent system of *small* models (Phi-3-mini)
that runs locally, so a lab can work over proprietary data without sending it to a
cloud LLM. Work splits across a conceptual-genomics agent (LoRA-fine-tuned on the
top-50 Biocontainers tools, their versions and CLI help docs), a workflow agent (RAG
over nf-core documentation and the EDAM ontology), and a reasoning agent that fuses
the two. It reports expert-comparable performance on conceptual tasks and emphasizes
pedagogy — linking generated workflows back to source documentation and explaining
*why* each tool was chosen so a researcher can understand and modify the result.

## Strengths relative to our approach

BioAgents leads the Foundry on real, shipped capability and overlaps it on grounding:

- **Local, private operation with small models.** Runs on modest hardware and
  explicitly enables proprietary data without a cloud LLM — a genuine accessibility
  and privacy win the Foundry does not address.
- **RAG grounded in authoritative sources.** nf-core docs, the EDAM ontology, the
  Software Ontology, and Biocontainers help docs, indexed for retrieval — a real
  corpus beneath the workflow agent.
- **Leads on the rationale/pedagogy axis.** It foregrounds *why* a tool was chosen
  and links steps back to source documentation; this is the axis where it most
  resembles a knowledge-base posture.
- **Version-aware training data.** The conceptual agent learns tool docs *including
  versions*, so version sensitivity is built in rather than ignored.
- **Honest negative result.** It reports that iterative self-refinement showed
  diminishing returns and *degraded* quality, rather than overclaiming the loop.
- Open throughout: CC-BY paper, MIT code.

## Where it sits on our values

| Value | BioAgents |
|---|---|
| **Produces skills** | **No** — output is advisory natural-language workflow guidance plus code snippets (which it concedes thin to outlines on hard tasks). No portable, self-contained skill artifact; the repo's notebooks are the *system*, not emitted artifacts. |
| **Progressive disclosure** | **No** — a single fused response with explanation; no name/description → body → on-demand-reference layering. |
| **Traceability** | **Partial, and comparatively strong** — outputs are said to link to source documentation with per-step support and tool-choice rationale, and RAG retrieves from named corpora (nf-core/EDAM). But no per-claim provenance format is specified; "linked to source documentation" is asserted, mechanism undescribed. |
| **CLI instructions derived from CLI docs** | **Partial (amortized, not per-invocation)** — the conceptual agent is fine-tuned on Biocontainers CLI help docs *including versions*, so CLI docs are the knowledge source with version awareness. But this is baked into weights, not re-derived per call with pinning, introspection, and adapt-on-mismatch. It is not a CLI-wrapper. |
| **Portability** | **N/A for artifacts** (it emits none). The *system* is notably deployment-portable — designed for local, low-resource, on-prem operation — but that is not skill-artifact portability. |
| **Human scrutiny** | **Partial** — explanatory prose meant for humans to read and modify, plus a five-expert human evaluation. But there is no curated, correctable knowledge surface humans contribute to; content is generated per query. |
| **Knowledge-base backed** | **Partial/mixed** — **Yes** for the workflow agent (an inspectable retrieval corpus: nf-core, EDAM, Software Ontology, Biocontainers); **No** for the conceptual agent (competence in opaque LoRA weights). A retrieval index, not a governed source-of-truth. |

## Where it diverges from the Foundry

BioAgents shares more with the Foundry than most neighbors: both ground tool use in
authoritative documentation, both prize the *why* behind a choice, and BioAgents' RAG
corpus is a real inspectable knowledge layer beneath part of the system. Two
distinctions remain. First, half its competence lives in opaque fine-tuned weights
rather than a governed, human-readable source, and it casts nothing into portable
artifacts — knowledge is retrieved or generated per query, not authored once and
reused. Second, and decisive for our thesis: its only reliability mechanism is a
self-evaluation loop in which the reasoning agent re-scores its *own* outputs against
a threshold — and the authors report this *degraded* quality as rounds increased.
That is stability checking, not statistical validity; nothing tests assumptions,
method appropriateness, or error-rate control, and the loop terminates in
self-certification. (Not to be confused with the separately-authored *BioAgent Bench*
of Fa et al., whose perturbation tests — corrupted inputs, decoy files — do gate
partly on data validity.) The crux: BioAgents is a careful, private, doc-grounded
*doer* whose one check measures self-consistency; the Foundry's referee gates on
empirical validity and never lets doing certify itself.

## Sources

- https://pmc.ncbi.nlm.nih.gov/articles/PMC12594986/ — open-access full text: three-agent architecture, self-evaluation / diminishing-returns finding, license, evaluation scale.
- https://www.nature.com/articles/s41598-025-25919-z — journal record / DOI (HTML behind a cookie wall; read via PMC).
- https://arxiv.org/abs/2501.06314 — January 2025 preprint, the same system (no perturbation suite either).
- https://github.com/microsoft/bioinformagus — code (MIT); grounds form and the absence of emitted artifacts.
- https://arxiv.org/abs/2601.21800 — *BioAgent Bench* (Fa et al.), the separately-authored project whose name is easily conflated with this one.
