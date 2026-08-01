# Chain-of-Evidence → the Foundry: what ports, what doesn't

> ScientistOne (Google Cloud AI Research, arXiv:2605.26340, 25 May 2026; announced as the
> "Science One Framework") proposes **Chain-of-Evidence (CoE)** — a verifiability *standard* for
> research artifacts — plus a system built to satisfy it and a post-hoc **CoE Integrity Audit** that
> measures any system against it. This note reads it against our problem (skill repositories written
> from model memory, no trace back) and sorts its ideas into port-directly / adapt / does-not-fit.
>
> Their side is **source-observed** (paper full text, verified 2026-08-01), with release status
> marked `[site-observed]` where only the project site carries it; our side is **corpus-observed**
> (the committed probes). Everything proposing we *do* something is `[design-inference]` and marked.

## 1. What CoE actually is

**The principle, verbatim:** "Every claim produced by a research system must be traceable, through a
recorded chain of supporting claims and evidence, to a grounding source."

The framing is deliberately ACID-analogous and **architecture-agnostic**: CoE says what properties a
verifiable artifact must have, not how to build one. It is also **author-agnostic** — the same chains
are required of a human-written paper. That is a standard we do not have. We have a *process*
(clean-context summarizers, blind assembly, reuse triage) and *rubrics*, but no one-sentence property
statement an artifact either satisfies or doesn't.

**Four claim types, each with a required chain shape:**

| Claim type | Example | Chain must resolve to |
|---|---|---|
| Citation | "Smith et al. showed X" | the work exists in a scholarly DB *and* its content matches the description |
| Numerical | "achieves 87.3% on Prism" | a recorded output — execution log, measurement, simulation |
| Methodological | "we use a 3-layer MLP" | the corresponding implementation |
| Conclusion | "outperforms baseline by 5%" | supporting numerical/methodological claims, by verifiable reasoning |

The taxonomy is explicitly non-exhaustive; they scope it to claim types "that are tractably verifiable
with current tools" and exclude qualitative/theoretical claims as needing domain expertise.

## 2. The two halves they built

**By construction (ScientistOne).** Three stages, each emitting provenance metadata:

- *Problem Investigator* — seeds → Semantic Scholar citation graph (2–4 seeds, 2 hops, ~2,000–5,000
  candidates) → LLM relevance filter (1–5 on each of two axes, tiered Core/Adjacent/Spark/Noise) →
  ~500 → multi-round agents (Librarian selects, 5 parallel Researchers extract from full-text PDFs,
  SubdomainWriter synthesizes, IslandConsolidator dedups) → ~100 paper notes → brief with 25–40
  references. Up to 100 full-text PDFs read per topic. The stated purpose is blunt: without
  structured retrieval, "autonomous systems tend to generate citations from model memory." **A
  topic-relevance gate aborts the pipeline** if fewer than 5 Core+Adjacent papers survive.
- *Discovery Engine* — Ideator → Parallel Explore-Exploit over B branches, isolated Solver per branch,
  task-specific evaluator, top-K retained per iteration, best-run selector filters spec violations,
  then ablations. Evaluator scores + execution logs are the evidence Stage 3 writes against.
- *Paper Writer* — five stages: **Conceive** (narrative where every factual claim carries an *inline
  evidence tag* to a workspace artifact — a log line number, score-file entry, citation key) →
  **Ground** (deterministic tag validation: score matches best run, baselines traceable or marked
  estimated, referenced artifact exists; computes an explicit **grounding ratio**) → **Critic** (LLM,
  scoped to what determinism can't reach: gap–approach alignment, contradictions, overclaims, missing
  comparisons) → **Resolve** (rewrite, drop unsupported, calibrate overclaims) → **Compose** (LaTeX
  section-wise, each writer handed *verified* numbers so it "writes prose around established facts
  rather than generating claims that must be sourced after the fact"). The Ground→Critic→Resolve loop
  runs **up to two rounds**, terminating on convergence or plateau — and **a grounding ratio that
  stays below threshold aborts the run** rather than shipping a poorly grounded draft.

  A **Claim Verifier** then re-checks the composed LaTeX claim-by-claim, dispatching on claim type:
  numerical against logs (±3-line window, unit-aware percent-vs-fraction and ms-vs-s normalization),
  citation by resolving the cite key then asking a one-shot LLM judge whether the cited **abstract
  supports the specific assertion**, methodological by textual overlap against the cited log region.
  Claims tagged `unsourced` or carrying malformed annotations are **dropped automatically**, with a
  break code recorded. A refinement pass then **strips the inline annotations from the shipped
  artifact**.

**After the fact (CoE Integrity Audit).** An adapter normalizes any system's deliverables
(`paper.tex`, solution code, `references.bib`) into a common bundle; four checks run independently:

| Check | Mechanism | Verdict |
|---|---|---|
| **I1** Score Verification | re-run the submitted solution on the golden evaluator; compare to the paper's extracted score within adaptive tolerance `max(1%, 3σ/\|s̄\|)` (5 evaluator runs, to absorb evaluator noise) | match / mismatch |
| **I2** Specification Violation | LLMs inspect solution code against evaluator + task spec, **majority vote** — did it reverse-engineer the scorer or hardcode answers | clean / flagged |
| **I3** Reference Verification | resolve every bib entry via Semantic Scholar, arXiv, OpenAlex, CrossRef by arXiv ID / DOI / title; **automated, with a single-LLM disambiguation step** for title-only matches, catching "a real DOI attached to a fabricated description" | verified / hallucinated |
| **I4** Method–Code Alignment | LLM reads method section and code side by side, **majority vote**; acceptable simplification counts as aligned, only a *fundamentally different algorithm* is misaligned | aligned / misaligned |

Plus one **native** check, possible only for systems emitting write-time provenance: **numerical CPR
(Claim Provenance Rate)** — the writer tags each numeric sentence `{source: "experimental_log.md:N"}`;
the verifier extracts both numbers and matches within 5% relative tolerance.

**Results** (5 systems × 15 papers = 75 papers, Gemini 3.1 Pro as the backbone across all five
systems under test; the audit itself runs Gemini 3 Flash for I1/I3 and 3.1 Pro for I2/I4):

| System | Score Verif. ↑ | Spec. Violation ↓ | Ref. Verif. ↓ | Method–Code ↑ |
|---|---|---|---|---|
| Sakana AI-Scientist v2 | 5/12 | 10/15 † | 0/159 | 5/15 † |
| AutoResearchClaw | 5/12 | 0/15 | 3/196 | 3/15 |
| DeepScientist | 11/12 | 0/15 | **42/201 (20.9%)** | 5/15 |
| AI-Researcher | 9/12 | 1/15 | 21/222 (9.5%) | 12/15 |
| **ScientistOne** | **12/12** | 0/15 | **0/337** | **14/15** |

Score Verification is `/12` not `/15` because EPLB papers are excluded — its scoring formula includes
a hardware-dependent execution-time component, so scores aren't reproducible across machines.
**† Sakana's I2 and I4 cells are confounded** by a BFTS–ADRS design mismatch and the paper says
cross-system comparison on those two checks "should exclude Sakana"; I1 and I3 remain valid.

ScientistOne's numerical CPR: 627/639 (98.1%), ~99% after they discount extraction false positives
(hardware constants, LaTeX subscripts, hyperparameters in methodology sections).

Two integrity notes on the audit itself, which they state and we should carry: all flagged positives
for I1–I3 were **manually reviewed by humans** and auditor false positives removed before Table 1
(I4 got sampled validation only); and they "did not systematically bound false negatives," so "the
true failure rate across all systems is likely higher than reported." They also frame the comparison
as "given a good-faith, equal-resource adaptation" rather than a definitive ranking.

`[site-observed]` Released: generated artifacts only (`github.com/scientist-one/generated-artifacts`,
21 papers + solver code). The audit is documented as a methodology, not shipped as a tool — so what
we can take is the design, not the code. The four APIs I3 uses are public and callable by us.

## 3. The mapping onto our problem

Their artifact is a *paper*; ours is a *SKILL.md*. Both are fluent prose whose claims may or may not
have chains. Three of our four defect classes map one-for-one; the fourth is where CoE runs out:

| Our probe finding (`content/research/experiments/ingest-probes-cross-synthesis.md`) | CoE claim type | Their check |
|---|---|---|
| "Fitch 1976, J Mol Evol 7:271" doesn't resolve; "Smith LP et al 2024" doesn't exist | Citation | I3 |
| `anchorwave proali --ploidy N` — no such flag; CAT described as Snakemake (it is Luigi + Toil) | Methodological | I4 |
| LiftOff "80% coverage / 70% identity" (real defaults `-a 0.5` / `-s 0.5`); "nucmer ≥70% identity → Marçais 2018" (states none) | Numerical | I1 / CPR |
| ≥90% TE masking, N50 ≥1 Mb, LASTZ 5000-bp chain — convention with no primary | *(no passing slot — §5)* | — |

The convergence is worth stating plainly: **an independent team, on a different artifact, in a
different domain, arrived at our defect taxonomy.** Their 20.9% hallucinated-reference rate is the
paper-scale version of our hand-found confabulated citations.

**Their strongest result for us is not the headline — it is DeepScientist's failure mode.** DS's write
skill *instructs* the agent to retrieve citations via Semantic Scholar, arXiv, and CrossRef; across
all 15 write-phase logs the agent "never called any retrieval API or MCP tool, generating all
references from model memory." They classify it as a compliance failure: the tools were available and
the agent shortcut the instruction. That is the cleanest external evidence available that **a skill
telling an agent to cite sources does not make it cite sources — only architecture does**, and it
lands on a *skill-based system* — the same artifact class as ours. `[design-inference]` It, more than the
0/337 headline, is the citation this repo should add to `content/meta/positioning.md`.

Two supporting details. Sakana also reaches 0/159, via cached citation retrieval — **two**
independent retrieval-grounded systems at zero is a stronger argument than one. And ARC's 3/196 is
not memory at all: a single fabricated entry in a hand-curated YAML shipped with the framework,
injected deterministically into every topic-matching paper. That is their analog of our observation
that the same fabricated `proali --ploidy` flag appears in two independently-authored skills — one
bad source, propagated mechanically.

One further convergence: their Table 1 reports a **vector**, not a composite. AI-Researcher is the
clean illustration — 12/15 on method–code alignment while carrying 21/222 (9.5%) hallucinated
references; a single score hides that. Our rubric rule is already "a skill scores as a vector of the
four letters, never a composite" (`content/research/mold-eval/rubrics/README.md`). Independent
arrival at the same design.

## 4. Integration ideas, ranked

All `[design-inference]`. Ordered by (value to the stated problem) ÷ (cost).

### A. A Skill Integrity Audit — port the forensic audit to skill repositories

The single highest-value import, now specified separately in
`content/research/skill-integrity-audit.md`; the sketch here is the rationale, not the design.

`/ingest-bioskill` is the **deep** instrument: seven phases, clean-context summarizers, blind
assembly, one skill at a time, N=3 committed probes, measuring whether a skill could be *rebuilt*
from governed sources. The audit is the **broad** one: no subagents in the common path, whole
repository, produces a number. The pairing they run is *forensic audit* + *native CPR*; ours is
**this audit** (forensic, over anyone's artifacts) + **cast CPR** (native, idea B) — the probe is a
third thing, deeper than either.

The auditable surface of a skill is *thinner* than a paper's: a skill ships prose, no code and no
`references.bib`. That narrows the forensic port to the two defect classes the probes found most —
citations that don't resolve, and commands that don't run — with a third, native check for numbers.
The spec details S1/S2/S3, the verdict sets, and the extraction problem.

**The discipline that makes it credible: run it on ourselves.** Their audit covers ScientistOne on
the same footing as the baselines. Ours currently audits bioSkills while nothing audits our casts —
an asymmetry that sits badly against "we must not become the thing we referee"
(`content/meta/guiding-principles.md`).

### B. Claim-level provenance in casting

`content/meta/casting.md` already records provenance more finely than a first read suggests: a
required `_provenance.json` with `refs[]`, each carrying kind, mode, src/dst, `used_at`, `load`,
`evidence`, `src_hash`, `dst_hash`, `source: deterministic|llm`, and for LLM refs the prompt and
model identity. The granularity is **per-reference**. What is missing is the **binding from a claim
to the ref that grounds it** — the provenance says which sources went in, not which sentence came
from which line of which one. That is the gap CoE's write-time mechanism closes, and it is narrower
and more achievable than "we have no provenance."

Port the Conceive → Ground → strip cycle:

1. A cast draft carries an inline evidence tag per load-bearing claim —
   `{source: "content/research/papers/song-2022-anchorwave/index.md:L42"}`, their exact shape.
2. **Ground is deterministic**: the note exists, the line exists, and it contains the number/flag.
   No LLM in this step — that is the whole point of their split. Their tolerance machinery is worth
   copying in *kind* rather than degree: a ±3-line window and unit-aware normalization
   (percent-vs-fraction) absorb *representation* drift, not numeric error.
3. Compute a **grounding ratio**, and adopt their nerve: below threshold, **refuse to emit the cast**
   rather than shipping a poorly grounded one.
4. The refinement pass **strips the tags from the shipped skill**; the bindings land in
   `_provenance.json` beside the `refs[]` they point into.
5. Report **cast CPR** as a build metric.

The payoff is that S3 becomes free, and our casts pass the audit *by construction* — the argument
ScientistOne makes for itself.

### C. State the standard, and fix the disposition CoE gets wrong for us

Author a short properties doc — CoE for skill artifacts — stating completeness and correctness as
properties and retargeting the claim types from *execution logs* to *the literature*. Its main use is
to give the Traceability rubric a principled dimension set: four of its six dimensions are already
CoE claim types wearing local names (Citations-resolve → Citation; Defaults/thresholds → Numerical;
CLI/mechanism and Doer-spine → Methodological). Two are not — "Sources open-access" has no CoE
analog, and CoE's Conclusion type has no analog here.

The retarget is not cosmetic — see §5.

### D. Ground → Critic → Resolve as the Mold authoring loop

Their writer loop is our analyze → referee → revise spine, one altitude up, and it is worth studying
for two things. First, **they lead with the deterministic check and scope the LLM critic to only what
determinism cannot reach.** We have deterministic eval properties at the *Mold* altitude already
(the WGA candidate's `anti-invention-threshold-is-convention` and `no-silent-pass-on-cannot-assess`
are both `check: deterministic`) and a reference-resolving validator — what we lack is a deterministic
**claim-level grounding** pass. A `/ground-mold` step is an extension of machinery that exists, not a
build from zero, and it is the same check as B step 2.

Second, and more Foundry-resonant: **both of their loops terminate in a refuse-to-ship verdict.** The
grounding ratio aborts the paper; the topic-relevance gate aborts the whole pipeline on fewer than 5
relevant papers. A non-self-certifying gate whose failure state is "produce nothing" is exactly the
shape `content/meta/referee-loop.md` argues for, running in a shipped system. Our eval properties say
what must be flagged, and `no-silent-pass-on-cannot-assess` does refuse a verdict at runtime — but
neither refuses at *build* time.

### E. Ground source *discovery* in `/ingest-bioskill` Phase 1

Phase 1 tells its subagent to inventory the corpus "from the files, not memory," but says nothing
about how it should find the *external* primaries a claim ought to trace to — so retrieval there is
unspecified, and unspecified defaults to recall. It has already cost us: the CAP probe's Phase-1
agent mis-cited the gene-loss primary as "Sharma & Hiller 2020 / gkaa562" and the blind summarizer
corrected it to Turakhia 2020 / gkaa550; on the synteny probe the *orchestrator* supplied two wrong
PMC ids and both summarizers self-corrected. The pipeline caught all three — that is the isolation
working — but they were avoidable upstream.

Their Problem Investigator is the template: seed papers → citation-graph traversal → tiered relevance
filter → full-text extraction, with an abort when too little survives. Adopting the first two steps
makes source *discovery* grounded rather than recalled. Their scale (100 full-text PDFs/topic) is not
the point; the *direction of retrieval* is. Note also that they read and quote at that volume with no
discussion of licensing — our summary-posture machinery is genuinely ahead there, and any import must
keep it.

### F. Positioning

ScientistOne is a **third referee location**, distinct from both neighbors already mapped: POPPER
referees a hypothesis against data; the AI Scientist's reviewer referees a manuscript by reasoning;
ScientistOne referees **whether an artifact's claims are grounded at all** — beneath both. Its note
is at `content/research/projects/scientistone.md`; the DeepScientist compliance failure and the
0/337-vs-20.9% contrast belong in `content/meta/positioning.md` as independent evidence for Pillar 1.

## 5. Where CoE does not fit — and what we'd hand back

**Existence is not support — their limitation, and it caps our S1.** The paper is explicit: I3 checks
only that a citation *exists*, and "existence is far from sufficient: a real citation can still be
used to support a claim the cited paper never made." Full verification needs passage-level NLI
against the cited text, which they call a known open problem and leave to future work.

This is the most consequential thing in the paper for us, because **it is exactly the defect our
probes found**: "CESAR 2.0 ← Sharma & Hiller 2017 NAR 45:8369" points at a *real* Sharma & Hiller
paper that is not CESAR 2.0. An existence check passes it. Two implications: the audit's S1 inherits
that ceiling and must say so, and there is a **fourth check**, specified as S4 in
`content/research/skill-integrity-audit.md` — does the cited source actually support the claim. Notably ScientistOne *does* implement this, but
only on the by-construction side (the Claim Verifier's LLM-judged abstract entailment), never
forensically. For a project whose thesis is recoverability, that is the check that matters most.

**The convention disposition — where their standard is wrong for our artifact.** CoE's four claim
types all require a chain, and the Claim Verifier does have an explicit `unsourced` marker — but its
disposition is **drop the claim automatically**. That is right for a paper: an unsupported sentence
should not ship. It is wrong for a skill, because a skill is *standing guidance*, and much of the
guidance practitioners need is community convention with no defining primary — FDR ≤ 0.05, 0.80 power
(`content/research/05-skill-backing-references.md`, finding #2), ≥90% TE masking, the LASTZ 5000-bp
chain (`content/research/experiments/ingest-probes-cross-synthesis.md`). Deleting those leaves the
skill less useful and no more honest.

So the adaptation is not "CoE lacks a slot" — it has one — it is **`unsourced` must be
accept-with-label, not drop**. We already encode this: the WGA candidate Mold's
`anti-invention-threshold-is-convention` eval property (`check: deterministic`) requires that any
threshold with no source in the references "must be labeled as convention/unsourced or marked
`[GAP]`, and must NOT be asserted as cited to a paper." That is the disposition change, already
written and committed; what CoE adds is the vocabulary to state it as a property of the standard
rather than a property of one Mold.

Related: their numerical chains terminate in an **execution log the system itself produced**. Ours
terminate in **someone else's published paper**. Their grounding is self-generated and complete by
construction; ours is external, partial, and sometimes paywalled. The claim-type shapes port; the
chain *endpoints* do not.

**CoE is Pillar 1 machinery. It does nothing for Pillar 2.** Their own limitations section says it:
the checks "cover structural integrity, not scientific correctness or novelty." A skill can hold a
perfect chain to a real, correctly-described paper and still be statistically invalid — the method
cited accurately but applied where its assumptions fail. That is the layer beneath, and it stays ours.
Adopting CoE strengthens traceability and buys nothing on method validity; conflating the two would
be the most expensive misreading available here.

**Their hard checks are LLM-judged, and one claim is judged by the construct we name as the
anti-pattern.** I2 and I4 are majority-vote LLM judgment; I3 adds single-LLM disambiguation over an
API resolve. The distinction worth keeping straight is that these judges rate an *objective
correspondence* — does this text match this code — with deterministic checks and a human review pass
carrying load elsewhere, which is far safer than manuscript grading. But §6.3's quality claim
("verifiable papers are deemed better by automatic reviewers") is produced by ScholarPeer, an LLM
reviewer — the AI-Scientist construct this repo names as self-certification. By our own standards
that is the paper's weakest claim, and it is separable from the audit, which is its strongest.

**No infrastructure to take.** `[site-observed]` Only generated artifacts are released. Everything
above is a design port, which is fine — I3's APIs are public, I1's tolerance formula is one line, and
the evidence-tag mechanism is a convention, not a library.

## Sources

- https://arxiv.org/abs/2605.26340 — ScientistOne, Meng et al., Google Cloud AI Research. Full text read: §3 (CoE principle + four claim types), §4 (PI / PEE / Paper Writer / Claim Verifier), §5 (I1–I4 + CPR definitions, tolerance formula), §6.1–6.2 (Table 1, CPR 627/639, the per-check breakdowns and the Sakana confound), §9 (reference-verification depth, fairness and false-negative caveats), broader impacts (the structural-vs-scientific limitation), Appendices B (Ground/Critic/Resolve and Claim Verifier mechanics, the two abort gates), D.1 (Table 7 automation levels, the human verification pass), E (per-check failure cases), G (per-system adaptation, the DeepScientist compliance failure).
- https://research.google/blog/science-one-framework-a-verifiable-autonomous-research-framework-via-chain-of-evidence/ — the announcement, which names the system "Science One Framework" throughout where the paper says "ScientistOne".
- https://scientist-one.github.io/ — project site; links `github.com/scientist-one/generated-artifacts` (21 papers + solver code). No audit-tool release.
- `content/research/experiments/ingest-probes-cross-synthesis.md` — our defect taxonomy across three probes.
- `content/research/05-skill-backing-references.md` — the recoverability framework and the convention finding.
- `content/research/experiments/ingest-whole-genome-alignment/candidate-mold/eval.md` — `anti-invention-threshold-is-convention`, the accept-with-label disposition already committed.
