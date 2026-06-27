# GenoTEX / GenoAgent

> **arXiv 2406.15341** — "GenoTEX: An LLM Agent Benchmark for Automated Gene Expression Data Analysis".
> GenoTEX is a benchmark for the full gene-expression → gene-trait pipeline (dataset selection → preprocessing → statistical analysis): **911 datasets** and **1,384 gene-trait-association problems** (132 unconditional, 1,252 trait-condition conditional), with ground-truth annotations curated by **9 bioinformaticians over 20 weeks** (237,907 lines of reference analysis code), released CC BY 4.0. GenoAgent is the accompanying multi-agent LLM system (five roles) that performs the pipeline with "flexible self-correction"; it reaches 0.74 AUROC end-to-end vs. 0.89 for human experts. Verified 2026-06-27 against the arXiv abstract + HTML (v3) and the GitHub repo (Liu-Hy/GenoTEX).

## Its framing

GenoTEX positions itself as the first benchmark for *automated* gene-expression analysis end to end — not a single modeling step, but the whole bioinformatician's job: find the relevant GEO datasets for a trait, preprocess and harmonize them to computational-genomics standards, and run the gene-trait-association analysis (optionally conditioned on a second factor). Every problem ships with an expert-curated answer: selected datasets, cleaned matrices, and identified trait-associated genes, scored by task-specific metrics (selection F1/accuracy; preprocessing Jaccard + a Composite Similarity Correlation; analysis precision/recall/F1/AUROC/GSEA). GenoAgent, the reference system, is a team of five LLM agents — **Project Manager, Data Engineer, Statistician, Code Reviewer, Domain Expert** — that collaborate through a multi-step programming workflow with iterative self-correction. It is a genuinely in-domain, built, benchmarked system in exactly the Foundry's territory.

## Strengths relative to our approach

On being built and measurable, GenoTEX leads the Foundry today:

- **A concrete, expert-annotated benchmark in the Foundry's exact domain.** 911 datasets and 1,384 gene-trait problems with bioinformatician-curated ground truth (9 experts × 20 weeks) is a real, sizable, openly-licensed eval asset — precisely the kind of planted-answer resource the Foundry's "scenario note" concept calls for, and it exists now where the Foundry's is an outline.
- **It actually runs the pipeline, end to end, today.** GenoAgent is a working multi-agent system with role separation (a dedicated Statistician, a dedicated Code Reviewer), reporting honest headline numbers (0.74 vs. 0.89 AUROC) that quantify the gap to human experts rather than declaring success.
- **Output is scored against an external answer key, not self-assessment.** Per-subtask metrics against expert annotations make GenoAgent's correctness empirically measurable — not an LLM grading its own work.
- **Open and reusable.** CC BY 4.0 data plus 237,907 lines of human reference analysis code is directly inspectable and citable; the Foundry could legitimately reuse it as an eval corpus.

## Where it sits on our values

| Value | GenoTEX / GenoAgent |
|---|---|
| **Produces skills** | **No** — it is a benchmark plus a multi-agent system, not a library of portable skill artifacts. Stated neutrally: skills are not its unit. |
| **Progressive disclosure** | **No** — a dataset, a leaderboard, and reference code. No layered reader surface (frontmatter → body → references); disclosure isn't its design. |
| **Traceability** | **Partial** — a graded *output* traces to an expert-curated answer key (the 237,907-line reference analysis), which is a strong external anchor. But GenoAgent's in-loop *judgments* trace to its own Code Reviewer's verdict on execution and instruction-compliance, not to a governed source of method authority. |
| **CLI instructions derived from CLI docs** | **N/A** — GenoAgent writes and runs Python analysis code; it does not wrap external CLI tools against their documentation, so the value doesn't apply. |
| **Portability** | **No skills produced** — nothing is packaged as a runtime-portable artifact to assess. |
| **Human scrutiny** | **Yes, at the benchmark** — the annotations are expert-authored, openly licensed, and human-readable/correctable reference code; the answer key is auditable. It is not, however, a navigable surface a human reads to *learn* the domain. |
| **Knowledge-base backed** | **No** — there is no inspectable knowledge base beneath the agents. Domain knowledge lives in model weights plus the per-problem reference outputs; the Domain Expert agent is a prompted role, not a governed KB. |

## Where it diverges from the Foundry

GenoTEX is the closest thing in the landscape to the Foundry's planted-answer "scenario note" idea, realized at scale and openly licensed — and the Foundry should credit it as a reusable eval asset, not contrast with it. The divergence is in what gets validated and where. GenoAgent's correctness rests on two checks, both inside its own loop: its output is scored against an expert answer key (output-versus-truth — *did the genes/datasets match the annotation?*), and its code is hardened by a Code Reviewer that judges execution results, error traces, and instruction-compliance (does-it-run-and-comply). Neither is the Foundry's question. An answer-key match certifies *this* output against *a known answer*; it cannot referee an *arbitrary* analysis where no annotation exists. And the Code Reviewer referees code, not statistics — it never asks whether the Statistician's method is valid beneath the $p$-value (assumptions met, no double-dipping, error rate actually controlled, the named method real and appropriate). So GenoAgent self-certifies within its own multi-agent loop: the failure mode the Foundry's external referee gate exists to break. The crux: GenoTEX checks whether the answer is right; the Foundry checks whether the *method* could have been right at all.

## Sources

- https://arxiv.org/abs/2406.15341 — abstract, self-description, framing, expert-curation claim.
- https://arxiv.org/html/2406.15341v3 — benchmark counts (911 datasets, 1,384 problems, 9 annotators × 20 weeks), the five GenoAgent roles, the Code-Review/iterative-debugging self-correction mechanism, per-subtask metrics, 0.74 vs. 0.89 AUROC.
- https://github.com/Liu-Hy/GenoTEX — dataset scale (152,415 samples, 237,907 lines of analysis code, 41.5 GB), CC BY 4.0 license, evaluation script structure.
