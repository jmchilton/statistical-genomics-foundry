# ScientistOne

> **scientist-one.github.io** (Meng et al., Google Cloud AI Research; arXiv:2605.26340,
> May 2026; announced as the "Science One Framework") — an end-to-end autonomous
> research system "designed to satisfy CoE by construction," where **Chain-of-Evidence
> (CoE)** is a verifiability standard requiring "every claim produced by a research
> system [to] be traceable, through a recorded chain of supporting claims and evidence,
> to a grounding source." Research prototype; only generated artifacts are released
> (21 papers + solver code). Our nearest neighbor on the **provenance** axis. Verified
> 2026-08-01 against the full preprint, the project site, and the Google Research
> announcement.

## Its framing

ScientistOne is three contributions stacked. **CoE** is the standard: deliberately
ACID-analogous and architecture-agnostic, it states what properties a verifiable
research artifact must have — not how to build one — and names four claim types with
required chain shapes (citation, numerical, methodological, conclusion). **ScientistOne**
is a system built to satisfy it: a Problem Investigator that reaches citations only
through scholarly-database retrieval (citation-graph traversal, relevance filtering, up
to 100 full-text PDFs per topic) rather than model memory; a Discovery Engine running
parallel explore-exploit branches under task-specific evaluators; and a Paper Writer
whose Conceive → Ground → Critic → Resolve → Compose loop tags every factual claim to a
workspace artifact, validates those tags deterministically, and lets an LLM critic handle
only what determinism cannot reach. **CoE Integrity Audit** is the third: a post-hoc,
system-agnostic audit that normalizes any system's deliverables into a common bundle and
runs four independent checks — score verification, specification violation, reference
verification, method–code alignment.

## Strengths relative to our approach

On provenance — the axis this project cares most about — ScientistOne leads the Foundry
outright, and it leads with measurements rather than architecture:

- **Claim-level provenance, built and measured.** Each numeric sentence carries a
  `{source: "experimental_log.md:N"}` tag checked against the referenced log line within
  a 5% tolerance; numerical Claim Provenance Rate is 627/639 (98.1%, ~99% after
  discounting extraction false positives). The Foundry's provenance model is
  per-reference and unimplemented, and binds no claim to the ref that grounds it; this is a level
  finer and running.
- **The evidence that grounded retrieval works.** Zero hallucinated references across 337
  bibliography entries, against rates up to 20.9% for systems citing from model memory.
  That is external, quantified support for the source-then-cast bet, arrived at
  independently and in another domain.
- **A uniform audit, applied to itself.** The four checks run identically across five
  systems and 75 papers, ScientistOne included — the discipline of grading yourself on
  the same instrument you grade neighbors with.
- **Deterministic-first grounding.** Ground validates tags mechanically; the LLM critic
  is scoped to what deterministic checks cannot reach (overclaims, contradictions,
  gap–approach alignment). The separation is exactly the posture the referee loop argues
  for, engineered at the authoring altitude.
- **Results scored as a vector.** Table 1 reports four independent verdicts rather than a
  composite, surfacing systems like AI-Researcher that lead the baselines on method–code
  alignment (12/15) while carrying the second-worst hallucination rate (21/222).
- **It is built and running.** It exceeds the human baseline on every ADRS task and takes
  the best overall score on two of five; two gold and two silver on MLE-Bench; state of the
  art on Parameter Golf as of the April 2026 cutoff, a lead the paper notes the leaderboard
  has since passed. The Foundry is a planning workspace.

## Where it sits on our values

| Value | ScientistOne |
|---|---|
| **Produces skills** | **No** — the deliverables are papers, solver code, execution logs, and bibliographies. A different packaging target, stated neutrally. |
| **Progressive disclosure** | **No** — an autonomous pipeline emitting a finished manuscript. The Problem Investigator's research brief is an intermediate layer, but it is pipeline scaffolding, not a reading surface that discloses journey, then action, then dependencies. |
| **Traceability** | **Strong — the strongest of any project noted here.** Claims carry inline evidence tags bound to specific artifacts, validated deterministically at write time and re-checked per claim type by a Claim Verifier, then audited post-hoc against public scholarly APIs. Three qualifications, none a deduction: the chains terminate in logs the system produced itself plus a retrieved seed bibliography; the tags are stripped from the shipped LaTeX, so verification runs over the artifact bundle rather than off the page; and the audit's reference check tests *existence*, which the paper states is "far from sufficient" — claim-level support checking runs natively, via LLM-judged abstract entailment, but not forensically. |
| **CLI instructions derived from CLI docs** | **N/A** — not a CLI-tool-wrapping project. |
| **Portability** | **No skills produced** — and the system itself is unreleased; only its generated artifacts are public. |
| **Human scrutiny** | **Yes, as output** — 21 generated papers and their solver code are published for inspection, and the audit exists precisely so a human can check rather than trust. The artifact is a finished manuscript, though, not a surface authored for a human to learn a domain from. |
| **Knowledge-base backed** | **Partial** — the Problem Investigator emits a structured brief (roughly 100 paper notes consolidated into research directions, 25–40 references) that downstream stages write against, and it carries provenance. That is a real knowledge substrate, closer to one than most neighbors have. It is per-run and generated, not a standing, navigable, human-authored base. |

## Where it diverges from the Foundry

ScientistOne verifies that a claim **has a source**; the Foundry asks whether the
**method behind the claim is valid**. The paper draws that boundary itself: its checks
"cover structural integrity, not scientific correctness or novelty." A claim can carry a
perfect chain to a real, accurately described paper and still be statistically invalid —
the method cited correctly but applied where its assumptions fail — and no CoE check
sees it. That places ScientistOne a layer further out than POPPER: POPPER referees a
hypothesis against data and trusts each experiment to yield a valid $p$-value; the
Foundry referees whether the method producing that $p$-value is valid; ScientistOne
referees whether the resulting write-up's claims are grounded at all. Three distinct
targets, not competing ones. Two further differences are structural rather than
evaluative. Its chains terminate in **execution logs it produced itself**, complete by
construction; ours terminate in **someone else's published literature** — external,
partial, sometimes paywalled, and sometimes legitimately absent, since a community
convention has no primary to cite. Its Claim Verifier does mark such claims `unsourced`,
but drops them automatically, which is right for a manuscript and wrong for standing
guidance a practitioner needs. And its knowledge substrate is a per-run generated brief
where the Foundry's is a standing, human-authored knowledge base that casts portable
skills. Crux: on claim-level provenance ScientistOne is ahead of us and we should say so;
on whether the method underneath is sound, it is not playing.

## Sources

- https://arxiv.org/abs/2605.26340 — the CoE principle and four claim types (§3); Problem Investigator / Parallel Explore-Exploit / Paper Writer and Claim Verifier (§4); the I1–I4 check definitions and the numerical CPR (§5); §9 (reference-verification depth); Table 1 across five systems and the 627/639 CPR (§6.1–6.2); the "structural integrity, not scientific correctness or novelty" limitation.
- https://scientist-one.github.io/ — project framing; links `github.com/scientist-one/generated-artifacts` (21 papers + solver code). The audit is documented as a methodology, not released as a tool.
- https://research.google/blog/science-one-framework-a-verifiable-autonomous-research-framework-via-chain-of-evidence/ — the announcement, and the "Science One Framework" naming.
