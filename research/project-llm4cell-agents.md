# Single-Cell LLM Agents (CellAgent · CASSIA · scExtract · AnnoAgent)

> **A cluster of LLM agents for scRNA-seq analysis and cell-type annotation** —
> CellAgent, CASSIA, scExtract, AnnoAgent: the "agentic" family catalogued by the
> LLM4Cell survey (arXiv 2510.07793). Open packages and web tools (MIT / BSD-2 where
> stated), built on the scanpy/anndata stack; published 2024–2025 in *Nature
> Communications*, *Genome Biology*, and *Briefings in Bioinformatics*. Verified
> 2026-06-28 against the scExtract open full text, the CASSIA repo + abstract, the
> CellAgent preprint + repo, the AnnoAgent abstract, and the LLM4Cell survey (some
> journal full texts paywalled).

## Its framing

These systems make single-cell analysis — especially the laborious, expertise-bound
step of cell-type annotation — fast and accessible through natural language. Rather
than hand-curating marker lists and stitching tools, each wraps the scanpy/anndata
ecosystem (or existing annotators) behind LLM agents that plan, execute, and
self-check. They span a spectrum: CellAgent does end-to-end pipeline automation;
CASSIA does reference-free, interpretable annotation with explicit quality scoring;
scExtract uniquely grounds processing in the *original paper's* methods text; and
AnnoAgent orchestrates an ensemble of established annotators and arbitrates the best.
Collectively they argue that LLM agents can match or beat single-method baselines
while emitting human-readable reasoning, reports, and confidence signals — turning
annotation from artisanal labor into a one-API-key call.

## Strengths relative to our approach

The cluster leads the Foundry on being real and shipped, and is strongest among
neighbors on showing its work:

- **Real, runnable, in-domain systems.** Published in strong venues, openly licensed
  (MIT, BSD-2 where stated), installable today — they exist where the Foundry is still
  a plan.
- **Interpretability as a first-class output.** CASSIA emits step-by-step reasoning
  plus HTML reports; scExtract ties each processing decision back to the source
  article; CellAgent surfaces executed code and tool docs.
- **Knowledge grounding where it counts.** CellAgent integrates curated marker
  databases (CellMarker 2.0, ACT, CellTypist, SCSA, ScType) and the Cell Ontology;
  CASSIA can RAG over marker databases and ontologies. This is the axis where the
  cluster most resembles a knowledge-base approach.
- **CASSIA's confidence signal tracks correctness.** Its quality scores are
  empirically associated with correct calls and have flagged errors in gold-standard
  datasets — the closest the cluster comes to calibration.
- **Honest self-benchmarking.** Reported gains over prior methods with
  confidence/accuracy correlations; AnnoAgent concedes no single annotator wins
  everywhere.

## Where it sits on our values

| Value | Single-Cell LLM Agents |
|---|---|
| **Produces skills** | **No** — deliverables are Python/R packages (CASSIA, scExtract, AnnoAgent) and a web app + repo (CellAgent), not portable, self-contained skill artifacts. Skills are not their unit. |
| **Progressive disclosure** | **No** — chat / pipeline / report interfaces. CASSIA's HTML reports are the richest reader surface but not layered description → body → references disclosure. |
| **Traceability** | **Partial, the cluster's relative strength** — CASSIA (reasoning + reports + optional RAG citing marker DBs/ontologies) and scExtract (each decision traced to the source paper) lead; CellAgent surfaces executed code; AnnoAgent weakest. Agent steps are visible; governed per-result provenance lineage is absent. |
| **CLI instructions derived from CLI docs** | **N/A** — all are Python/scanpy (+R) based, not CLI-wrappers. CellAgent retrieves tool documentation, but for in-process Python tools, not command-line tools against CLI docs. |
| **Portability** | **Low** — all bind to the scanpy/anndata stack plus LLM API keys. CASSIA is most portable (R + Python + web), but none ship runtime-portable artifacts; they are environments and packages, not drop-in skills. |
| **Human scrutiny** | **Partial** — CASSIA leads (interpretable reasoning, low-confidence flags, human-readable HTML reports, demonstrated catching of gold-standard errors); scExtract surfaces extracted parameters; CellAgent surfaces code and plots. Runtime/report scrutiny, not a corrigible authored corpus. |
| **Knowledge-base backed** | **Mixed** — CellAgent **Yes** (curated marker DBs + Cell Ontology); CASSIA **optional Yes** (RAG over marker DBs/ontologies); scExtract's source is the literature PDF, not a curated KB; AnnoAgent **No** (knowledge lives in the wrapped models' weights). |

## Where it diverges from the Foundry

All four are Family-A doers: productivity-first, annotation-focused, and — the
decisive point — every check they run is LLM judgment or heuristic agreement, not
statistical-validity gating. CellAgent's evaluator uses GPT-4V to read UMAP plots;
CASSIA scores its *own* annotation; scExtract measures cross-LLM consensus and
entropy; AnnoAgent arbitrates among model outputs. None tests assumptions,
double-dipping (selection-then-test on the same cells), or actual error-rate control.
CASSIA is the partial exception worth crediting: it has a dedicated validation agent,
an optional inspectable KB, and quality scores empirically associated with
correctness — the cluster's nearest approach to a referee. But even CASSIA grades its
own output post hoc against a known answer rather than refereeing whether an arbitrary
method was valid, and like the others it produces no portable, governed artifact a
human reads to learn. The crux: this cluster does single-cell analysis well and shows
its work; the Foundry adds the independent empirical referee — and the human-readable
source beneath the artifact — that none of them has.

## Sources

- https://arxiv.org/abs/2407.09811 — CellAgent: planner/executor/evaluator framing, GPT-4V evaluator, curated marker DBs, zero-code form.
- https://github.com/lsq2wal/CellAgent — CellAgent code (released post-acceptance).
- https://www.nature.com/articles/s41467-025-67084-x — CASSIA (*Nature Communications*): five-agent system, 970-cell-type benchmark, interpretability/calibration claims (full text paywalled; abstract read).
- https://github.com/ElliotXie/CASSIA — CASSIA code (MIT): reference-free design, validation agent, optional RAG, quality scoring.
- https://pmc.ncbi.nlm.nih.gov/articles/PMC12178070/ — scExtract open full text: literature-PDF-driven processing, consensus/entropy uncertainty, confidence↔accuracy correlation, BSD-2.
- https://pmc.ncbi.nlm.nih.gov/articles/PMC12699714/ — AnnoAgent (*Briefings in Bioinformatics*): strategist/assessor roles wrapping four established annotators (abstract-level).
- https://arxiv.org/abs/2510.07793 — LLM4Cell survey: the "agentic" family grouping and the trustworthiness-gap framing that motivates it.
