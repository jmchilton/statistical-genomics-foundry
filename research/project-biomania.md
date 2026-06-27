# BioMANIA

> **biorxiv 2023.10.29.564479** — "Simplifying bioinformatics data analysis through conversation."
> An AI-driven, natural-language-oriented bioinformatics analysis pipeline (batmen-lab/BioMANIA): it ingests a well-documented open-source Python tool, learns that tool's API from its source code, documentation, and tutorials, and serves a ChatBot that executes analyses conversationally. Demonstrated end-to-end on Scanpy (166 APIs + 16 tutorial-derived API ensembles), with Squidpy, scvi-tools, ehrapy, and snapatac2 also supported, plus generic PyPI / Git-source / R-package conversion paths. Verified 2026-06-27 against the GitHub README and search-surfaced biorxiv abstract/full-text excerpts (the biorxiv HTML and PDF were 403-blocked).

## Its framing

BioMANIA presents itself as a way to do bioinformatics *codelessly through conversation*. It has two halves: a generation pipeline that takes an open-source Python library and builds a tool-specific ChatBot from it, and a back-end service that runs the resulting ChatBot. The generation step extracts each API from source and docs, synthesizes training instructions, and fine-tunes a BERT-based retriever that maps a user's request to candidate APIs; at run time an LLM (GPT-4) picks the target API, predicts and checks its parameters, and a built-in Python interpreter executes the call and returns code, images, tables, and a report. On 21 representative single-cell tasks it reports completing 18 with Scanpy versus 5 for a general-purpose LLM — the payoff of learning the real API rather than free-generating code.

## Strengths relative to our approach

On the doing axis, BioMANIA is built and runs real workflows — ahead of a planning workspace:

- **API-learning from primary library material.** It grounds itself in a tool's own source, documentation, and tutorials rather than the LLM's memory — extracting the API surface, composing tutorial-derived ensembles, and training a retriever over them. This is genuine engineering toward the agent–tool fidelity problem, and it measurably reduces wrong/hallucinated calls.
- **NL-to-execution that actually runs.** Retrieve candidate APIs → predict the target → infer and verify parameters → execute in a real interpreter → return outputs. It closes the loop from English to executed Scanpy, not just to suggested code.
- **An inspectable extracted artifact.** The learned API representation is materialized as structured JSON (`API_composite.json`), so the wrapped surface is a file, not an opaque weight set.
- **A real human-in-the-loop at the parameter level.** It flags ambiguous APIs and, when execution history can't fill a required parameter, asks the user for more detail — clarification before running.
- **Executed code is surfaced.** Results come back as the actual generated calls plus a report, so a user can read what was run.

## Where it sits on our values

| Value | BioMANIA |
|---|---|
| **Produces skills** | **Partially / different unit.** It produces a *per-tool ChatBot* — a trained retriever plus an `API_composite.json` API index — not portable, hand-readable skill artifacts in the Agent Skills sense. The deliverable is a deployed conversational wrapper around one library, not a library of `SKILL.md` files. |
| **Progressive disclosure** | **No.** A chat interface over a running interpreter; no layered description → body → references surface. |
| **Traceability** | **Partial.** Executed steps resolve to concrete library API calls learned from that tool's own docs/source, and the generated code + report are returned to the user — so a step traces to a real API. But there is no per-artifact provenance lineage tying a result back to a governed source. |
| **CLI instructions derived from CLI docs** | **Adapted / analogous, not CLI.** It derives a *Python* API from a library's source, docs, and tutorials, not CLI invocations from CLI docs. Same spirit — instructions grounded in the tool's own documentation — applied to in-process Python APIs rather than command-line tools. |
| **Portability** | **Low on our axis.** Deployed as a front-end/back-end service (Docker), wrapping a specific library; not portable skill artifacts that drop into multiple agent runtimes. |
| **Human scrutiny** | **Partial, at runtime.** It asks the user to disambiguate APIs and supply missing parameters, and shows generated code + a report. That is runtime chat scrutiny, not a corrigible authored artifact a human reviews and edits offline. |
| **Knowledge-base backed** | **Qualified Yes.** A machine-extracted, inspectable API knowledge base (`API_composite.json`) sits beneath the ChatBot. But it is an index of *one library's API*, not a human-facing domain knowledge base a reader consults to learn the science. |

## Where it diverges from the Foundry

BioMANIA earns real credit: it learns a library's API from that library's own source, docs, and tutorials, materializes it as inspectable JSON, and runs the resulting analyses conversationally with a measurable accuracy gain over free-generating LLMs. Its verification, though, is parameter-level — it checks that an API call's arguments are present and well-formed — not method-level. It will faithfully execute a clustering, a differential-expression test, or a trajectory inference and report the output, but nothing in the loop asks whether that method is statistically valid for the data: whether assumptions hold, whether the test is double-dipping on the same cells used to define the groups, whether error is actually controlled. That is the Family-A profile the Foundry flags — productive and well-wired, but self-certifying: an analysis runs and returns a result with no external referee beneath the output. The crux: BioMANIA gets the *right API called correctly*; the Foundry's added obligation is judging whether the *method behind that call is honest*.

## Sources

- https://github.com/batmen-lab/BioMANIA — README: two-component architecture, API extraction from source/docs/tutorials, supported libraries (Scanpy/Squidpy/scvi-tools/ehrapy/snapatac2), PyPI/Git/R conversion paths, `API_composite.json` artifact, front-end/back-end deployment. Primary, fully reachable.
- https://www.biorxiv.org/content/10.1101/2023.10.29.564479 — paper (abstract + full-text excerpts via search; HTML/PDF 403-blocked): self-description, BERT retriever + GPT-4 predictor pipeline, synthetic-instruction generation, ambiguity/parameter clarification, 18/21-vs-5/21 benchmark.
