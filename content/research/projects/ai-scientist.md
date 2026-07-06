# The AI Scientist

> **arXiv 2408.06292 (v1) · 2504.08066 (v2), Sakana AI** — "the first comprehensive
> framework for fully automatic scientific discovery" (v1); v2 is "an end-to-end agentic
> system capable of producing the first entirely AI generated peer-review-accepted workshop
> paper". A closed research loop — idea → code/experiment → figures → full paper → an
> automated LLM reviewer that scores the result. Verified 2026-06-27 against both arXiv
> papers (v1 §4 reviewer section + Table 1) and the Sakana writeups.

## Its framing

The AI Scientist runs the whole research pipeline end to end without a human in the loop:
it generates a novel idea, writes and executes the experiment code, plots results, drafts a
full LaTeX paper, and then evaluates that paper with a built-in **automated reviewer**. The
reviewer is a GPT-4o agent that reads the manuscript PDF (parsed via PyMuPDF) and, following
the NeurIPS review guidelines, emits numerical scores (soundness, presentation, contribution,
overall, confidence), strengths/weaknesses, and an accept/reject decision — hardened with
chain-of-thought, 5 rounds of self-reflection, a 1-shot example, 5-review ensembling, and an
Area-Chair-style meta-review. On 500 ICLR 2022 OpenReview papers it reports 70% accuracy
(vs. 73% for humans in the NeurIPS 2021 consistency experiment), a *superhuman* $F_1$ of 0.57
vs. 0.49, human-level AUC of 0.65 for both, and 65% vs. 66% balanced accuracy — i.e. it
approximates human peer-review scores. v2 drops v1's human-authored code templates, runs a
progressive **agentic tree search** under a dedicated experiment-manager agent, adds a
Vision-Language-Model feedback loop on figures, and produced a manuscript that passed *real*
blind human review at the ICLR 2025 ICBINB workshop (average 6.33; individual 6, 7, 6) — the
first fully AI-generated paper to clear peer review.

## Strengths relative to our approach

On scope and autonomy it leads the Foundry outright — it is a built, running system where the
Foundry is still a design:

- **Fully autonomous, end-to-end.** Idea to reviewed paper with no human step. The Foundry
  is a planning workspace; this ships and runs today.
- **A genuine, benchmarked review module.** The reviewer is validated against thousands of
  real OpenReview decisions and reaches near-human (and on $F_1$, superhuman) agreement —
  a real result, honestly measured, not a hand-wave.
- **Real-world external test passed.** A v2 paper cleared blind human peer review at a
  workshop — the strongest possible external check on the *doing* side.
- **Agentic tree search + experiment manager (v2).** A sophisticated search over experiments,
  generalizing across ML domains without templates — engineering the Foundry has not built.
- **Multi-model, reproducible-by-logs.** Runs across GPT-4o, Sonnet, and open models, with
  full run files and logs released.

## Where it sits on our values

| Value | The AI Scientist |
|---|---|
| **Produces skills** | **No** — it emits papers, experiment code, figures, and reviews, not portable, reusable skill artifacts. Different deliverable; stated neutrally. |
| **Progressive disclosure** | **No** — an autonomous pipeline that outputs finished artifacts. There is no layered reading surface that discloses a journey, an action, then a dependency surface. |
| **Traceability** | **Partial** — full run logs, generated code, and the reviewer's scores + written rationale are all inspectable, so one can read *why* the reviewer decided as it did. But that verdict traces to LLM rationale over the manuscript text, not to an executed empirical check on the method. |
| **CLI instructions derived from CLI docs** | **N/A** — not a tool-skill library; no per-tool CLI-version discipline in scope. |
| **Portability** | **No skills produced** — it is a research framework/codebase one runs, not artifacts cast to multiple agent runtimes. |
| **Human scrutiny** | **Yes, as output** — it produces complete papers and reviews for humans to read, and has gone through real human peer review. But the artifact is a finished paper, not a navigable surface authored for a human to learn the domain from. |
| **Knowledge-base backed** | **No** — no inspectable knowledge base beneath it; the reviewer reasons from model weights, the manuscript text, and a few-shot example, not from a governed corpus. |

## Where it diverges from the Foundry

The divergence is at one precise node: the review step. The AI Scientist's reviewer judges a
paper by **reasoning** — a GPT-4o agent reads the manuscript and produces fluent scores and a
verdict that approximate human peer-review judgments. It is, by construction, the agentic loop
grading its own output from the same kind of model that wrote it: a verdict *narrated*, not a
check *run*. The Foundry's referee inverts exactly this node. Its Family-B gate does not opine
on the write-up; it **constructs and runs an external empirical check** — permutation/null
calibration, simulation under known truth, negative controls, power — and returns that as the
verdict. Critique-by-reasoning exists in the Foundry too (the *Critique* role names known
invalidity patterns), but it is explicitly necessary-but-insufficient: the gate is not passed
until a *Calibrate* pass delivers an external result. And the Foundry referees a different
layer — *is the method producing the* $p$*-value itself valid* (assumptions met, no
double-dipping, the named method real and appropriate, error actually controlled) — beneath
where a manuscript-grading reviewer operates at all. Crux: the AI Scientist's reviewer
self-certifies by fluent LLM reasoning; the Foundry's referee externalizes the verdict into an
empirical check it runs.

## Sources

- https://arxiv.org/abs/2408.06292 — v1: the full pipeline; §4 + Table 1 ground the reviewer mechanism (GPT-4o, NeurIPS guidelines, self-reflection/few-shot/ensembling/meta-review) and the exact numbers (70% vs. 73%, $F_1$ 0.57 vs. 0.49, AUC 0.65, balanced 65% vs. 66%, 500 ICLR 2022 papers).
- https://arxiv.org/abs/2504.08066 — v2: agentic tree search + experiment-manager agent, no human-authored templates, VLM figure loop, and the ICLR 2025 ICBINB workshop paper (6.33) clearing blind human peer review.
- https://sakana.ai/ai-scientist/ — Sakana writeup: framing and the "near-human" reviewer claim.
