# AI Peer-Review Systems

> **A representative cluster of LLM-based scientific peer-review systems and
> benchmarks** — ReviewRL, ReviewEval, DeepReview, OpenReviewer, AgentReview, PRAIB,
> ReviewerGPT (2023–2026, overwhelmingly ML/AI venues). Open models, datasets, and
> benchmarks where released (AgentReview is Apache-2.0; Llama-OpenReviewer-8B is
> open-weight). Verified 2026-06-28 against the arXiv abstracts and the OpenReviewer /
> AgentReview repos (PRAIB from a search snippet only). Representative, not exhaustive
> — the field is growing fast.

## Its framing

Scholarly peer review is buckling under submission volume and reviewer fatigue, and
this body of work asks whether LLMs can shoulder part of the load. The strongest
systems do not just prompt a generic model: they fine-tune specialist reviewers on
tens of thousands of real expert reviews (OpenReviewer, DeepReview), add literature
retrieval and reinforcement learning to keep reviews grounded and ratings calibrated
(ReviewRL, DeepReview), and position themselves as fast pre-submission feedback for
authors rather than replacements for human reviewers. A parallel strand builds the
measurement infrastructure: benchmarks scoring generated reviews against human
meta-reviews for factuality, depth, and constructiveness (ReviewEval, PRAIB), and a
simulation framework that uses LLM agents to expose biases in the review process
itself (AgentReview).

## Strengths relative to our approach

A maturing measurement-and-generation ecosystem, on an axis the Foundry does not work:

- **Real evaluation rigor.** Benchmarks (ReviewEval, PRAIB) score reviews against
  human meta-reviews and probe whether a model genuinely engages versus produces
  "review-looking text."
- **Open, reproducible artifacts.** Open-weight specialist models
  (Llama-OpenReviewer-8B, DeepReviewer-14B), public datasets (DeepReview-13K, a
  79k-review corpus), permissive licensing in places (AgentReview Apache-2.0), and
  runnable demos.
- **Grounding mechanisms.** Retrieval-augmentation (ReviewRL's ArXiv-MCP, DeepReview's
  literature retrieval) to curb hallucinated critique.
- **Calibrated criticality.** Tuned toward realistic critical ratings matching the
  human distribution rather than sycophantic praise.
- **Self-aware about scope.** Framed as author-feedback assistants, not autonomous
  gatekeepers.
- **Studies the meta-problem.** AgentReview quantifies reviewer bias — useful prior
  art on review-process integrity.

## Where it sits on our values

| Value | AI Peer-Review Systems |
|---|---|
| **Produces skills** | **No** — outputs are review prose, ratings, models, datasets, and benchmark scores, not portable skill artifacts. |
| **Progressive disclosure** | **No** — flat review text or scalar scores. Some have *internal* staged pipelines (AgentReview's five phases, DeepReview's multi-stage thinking), but no layered, progressively-disclosed artifact. |
| **Traceability** | **Partial/weak** — retrieval-augmented systems can reference literature and ReviewerGPT points to specific in-paper errors, but source-linking is not a designed, enforced layer; most output is free text without citations. |
| **CLI instructions derived from CLI docs** | **N/A** — none are CLI-doc-grounded tools. |
| **Portability** | **Partial** — where released, open-weight models + code + datasets are self-hostable (OpenReviewer, DeepReview, AgentReview); some code is "to be released," and benchmarks wrapping proprietary models are not portable in that part. |
| **Human scrutiny** | **Yes** — the product *is* human-readable review text aimed at authors and reviewers, explicitly framed as assistance rather than replacement. |
| **Knowledge-base backed** | **No (mostly)** — knowledge lives in model weights and training corpora; the review datasets are inspectable but are *training data*, not a structured live KB the reviewer queries. Two systems retrieve literature — a corpus, not a curated referee KB. |

## Where it diverges from the Foundry

This cluster reviews papers *holistically* — prose quality, the soundness narrative,
rating calibration, human-likeness — and is explicit that it assists humans rather
than gating. None of the seven referees empirical statistical validity: none
recomputes a $p$-value, runs null/permutation calibration, negative controls, or
simulation under known truth, and none detects double-dipping or unmet assumptions as
a gate. ReviewerGPT comes closest — it flags stated math/conceptual errors and answers
checklist items — but that is spotting asserted errors and binary verification, not
statistical recomputation, and its authors say LLMs are not ready for complete
evaluations. The crux: the holistic AI-reviewer space is well populated and improving,
yet the dedicated empirical statistical-validity referee — the layer the Foundry
builds — is unoccupied.

## Sources

- https://arxiv.org/abs/2508.10308 — ReviewRL: RL review-generation, reward = review quality + rating accuracy, ArXiv-MCP retrieval.
- https://arxiv.org/abs/2502.11736 — ReviewEval: framework scoring AI reviews on human-alignment, factuality, depth, constructiveness, guideline adherence.
- https://arxiv.org/abs/2503.08569 — DeepReview: human-like deep-thinking review, multi-stage + literature retrieval; ships DeepReviewer-14B + DeepReview-13K.
- https://arxiv.org/abs/2412.11948 · https://github.com/maxidl/openreviewer — OpenReviewer: open specialist review-generation tool (Llama-OpenReviewer-8B), assistant-not-replacement.
- https://arxiv.org/abs/2406.12708 · https://github.com/Ahren09/AgentReview — AgentReview (Apache-2.0): review *simulation* framework and bias study, not a real-submission referee.
- https://arxiv.org/abs/2605.29815 — PRAIB: behavioral benchmark (review specificity, style, engagement); snippet-only, verify before quoting.
- https://arxiv.org/abs/2306.00622 — ReviewerGPT: error-finding + checklist verification + abstract comparison; "specific tasks, not complete evaluations."
