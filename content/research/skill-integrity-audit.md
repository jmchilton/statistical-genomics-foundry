# The Skill Integrity Audit — a spec

> A **post-hoc, artifact-only, repository-scale** audit of skill libraries, ported from
> ScientistOne's CoE Integrity Audit (`content/research/chain-of-evidence-integration.md`, idea A).
> It answers one question mechanically, across hundreds of skills at a time: **does this skill's
> prose trace to anything?**
>
> Status: **design, nothing built.** Engineering in this workspace stands up only via the
> validation step-ladder (`AGENTS.md`), so this is a spec to argue with, not a plan to execute.
> Everything here is `[design-inference]` unless it cites a probe finding.

## 1. What it is, and what it deliberately is not

`/ingest-bioskill` is the **deep** instrument: seven phases, clean-context summarizers, blind
assembly, one skill at a time, N=3 committed probes. It measures recoverability — could this skill
be *rebuilt* from governed sources. It is expensive and will stay that way.

This is the **broad** instrument: deterministic in the common path, no corpus needed for the two
forensic checks, runs over a whole repository, produces a number. It measures grounding — does this
claim point at anything real. The split is the same one ScientistOne runs: forensic checks that apply
uniformly to anyone's artifacts, plus native ones only a source-backed library can pass.

**Scope boundary, stated first because it is the one that gets lost.** This audit covers
*structural integrity*, not method validity. ScientistOne says it of its own checks — they "cover
structural integrity, not scientific correctness or novelty" — and it is at least as true here. A
skill can cite a real paper, describe it accurately, invoke the tool correctly, and still teach a
method that is invalid in the regime it recommends. That is Pillar 2 and the referee's job; this
audit will never see it. Feeding audit output into the Refereeability rubric would be a category
error; it feeds **Traceability** (`content/research/mold-eval/rubrics/traceability.md`) and nothing else —
and not only feeds it but *operationalizes* a dimension that rubric already declares and has no
mechanical way to score: "numbers trace to a primary that states them (not convention-mislabeled)."

## 2. The bundle and the adapter

ScientistOne's audit normalizes each system's deliverables into a common bundle
(`paper.tex` + solution code + `references.bib`) so the four checks run unmodified. The same move
works here, but the bundle is thinner — **a skill ships prose and no code**, so there is no
implementation to align prose against and no bibliography file to resolve.

A **skill bundle** is:

| Field | Source |
|---|---|
| `body` | the SKILL.md prose, fences preserved |
| `frontmatter` | name, description, and whatever relationship/version fields the repo declares |
| `sidecars` | `references/`, `scripts/`, `examples/` where a repo ships them |
| `tool_pins` | declared tool + version, if the repo has a version-compatibility discipline (bioSkills does; most don't) |
| `citations` | extracted, not read from a file — see §4 |
| `provenance` | optional `_provenance.json`; the current Cast contract supplies per-reference lineage, while the proposed local experiment adds claim bindings |

One adapter per repository layout: bioSkills, ClawBio, awesome-genomic-skills, the Agent Skills
standard, and **our own casts**. The adapters are the only per-repo code; the checks are shared.
An adapter also declares one of three provenance capabilities: `absent`, `per-reference`, or
`claim-bound-experimental`. The current Cast contract is `per-reference`; it proves which governed
sources entered a Cast, not which source grounds a particular sentence. A native check that requires
claim bindings reports **unavailable** for the first two capabilities — neither pass nor fail.

### A local experiment, not shared substrate yet

Claim binding is a proposed **local extension** to the inherited `_provenance.json` contract. It is
not present machinery, and this spec does not assert that the parent Foundry should adopt it. Until
Cast tooling exists, the shape below is a paper prototype to test the audit boundary rather than a
schema to validate:

| Binding case | Minimum information | Expected audit treatment |
|---|---|---|
| direct evidence | claim location + `refs[]` entry + evidence locator | eligible for S3/S4 |
| deduction | claim location + input refs + derivation note | visible as inference; not scored as directly stated |
| convention | claim location + explicit convention label | eligible for the convention disposition |
| unsupported | claim location, no grounding disposition | fail the applicable native check |

The first executable version should live here under an explicitly experimental key such as
`experimental.claim_bindings`, so Casts remain valid against the inherited contract while the shape
changes. Prove it on the 3–4 heterogeneous Casts already named in `content/meta/casting.md`'s minimum
exercise, including planted direct-evidence, deduction, convention, and unsupported cases. The same
S3/S4 implementation must consume every case without Mold-specific logic; its extracted claims and
verdicts then get checked against a hand-reviewed sample so false positives and false negatives are
visible.

Only propose the extension as shared Foundry substrate after those exercises show all of the
following: it survives more than one Mold role and family; the audit can consume it without local
special cases; its locators remain usable after normal refinement; and the fields that remain are
not statistical-genomics-specific. Any upstream proposal should carry the exercised examples,
measured audit behavior, revisions the experiment forced, and unresolved failures. That evidence —
not the apparent generality of the first draft — earns the abstraction.

## 3. The checks

### S1 — Reference Verification *(port of I3, near-verbatim)*

Resolve every citation against Semantic Scholar, OpenAlex, CrossRef, and arXiv — by DOI or arXiv
id first, then title + year + first author. An LLM adjudicates near-misses only, catching the
failure mode ScientistOne names explicitly: a real DOI attached to a fabricated description.

Verdicts: `resolved` · `resolved-mismatched` (the locus is real but describes a different paper) ·
`unresolved`.

The `resolved-mismatched` verdict is not in their taxonomy and is load-bearing here, because it is
what the probes actually found: "CESAR 2.0 ← Sharma & Hiller 2017 NAR 45:8369" points at a *real*
Sharma & Hiller paper that is not CESAR 2.0. A DOI-exists check passes that. Deterministic in the
common path; LLM only on ambiguity.

**Repo metric:** hallucinated-reference rate — their headline number, for skill repositories.

**The ceiling, stated because they state it.** I3 checks only that a citation *exists*, and the
paper is blunt that "existence is far from sufficient: a real citation can still be used to support a
claim the cited paper never made"; full verification needs passage-level NLI, which they leave to
future work. `resolved-mismatched` reaches part of the way — it catches a locus describing the wrong
paper — but not the harder case where the paper is right and the claim attributed to it is not.

### S2 — Skill–Tool Alignment *(the I4 analog, retargeted)*

I4 compares method prose to the system's own code. A skill has no code, but it names commands,
flags, subcommands, and parameter defaults belonging to a tool whose `--help`, man page, or
author-written vignette is authoritative. So resolve prose against **the tool at a pinned version**.

Verdicts per invocation claim: `exists` · `absent` (the flag does not exist) · `wrong-value` (the
stated default differs from the tool's) · `unpinned` (no version declared, so unfalsifiable).

This is the highest-signal check available, because it is the defect class the probes hit most —
`anchorwave proali --ploidy` (no such flag), LiftOff "80% coverage / 70% identity" against real
defaults `-a 0.5` / `-s 0.5`, CAT described as a Snakemake workflow when it is Luigi + Toil. It is
also the most nearly deterministic: a flag is in the help text or it is not.

Two honest difficulties. **Version drift** — a flag absent at v1.2 may exist at v2.0, so `unpinned`
must be its own verdict rather than being scored as a failure; a repo with real version discipline
(bioSkills has one) is *more* auditable, which is the right incentive. **Mechanism claims** —
"CAT is orchestrated by Luigi + Toil" is prose about architecture with no flag to check; that falls
back to an LLM judgment against the tool's own README, majority-voted, and should be reported
separately from the deterministic flag checks rather than blended into one rate.

### S3 — Threshold Provenance *(the CPR analog — native, not forensic)*

Every number a skill states as guidance must resolve to a line in a governed source note, or be
labeled convention. This is the check only a source-backed library can pass, and it runs only over
skills for which we hold notes — exactly the asymmetry ScientistOne reports CPR under.

For our Casts, holding the notes is necessary but not sufficient: native S3 also requires the
`claim-bound-experimental` capability above. Per-reference provenance can establish the candidate
source set, but cannot establish which source is asserted to ground a number. Searching all refs for
a matching token may help develop the extractor; it does not constitute a claim-level provenance
check and must not be reported as CPR.

**One adaptation matters: no numeric tolerance.** Their CPR matches within 5%; a skill's numbers are
*quoted constants*, so `-a 0.5` versus "80% coverage" is a different claim, not noise. Exact match,
or the claim is wrong. `[design-inference]` — the paper gives no rationale for the 5% figure, and
the stochastic-variance argument belongs to I1's `max(1%, 3σ/|s̄|)`, a different check.

What *is* worth copying is their Claim Verifier's other tolerances, which absorb **representation**
drift rather than numeric error: a ±3-line window on log-line references, and unit-aware
normalization for percent-versus-fraction and ms-versus-second. The percent/fraction case is directly
ours — a skill writing "50%" against a note's `0.5` is the same claim.

### S4 — Claim Support *(the check none of this ports, and the one that matters most)*

Does the cited source actually say what the skill says it says — the case S1 structurally cannot
reach, since the citation resolves and describes the right paper. Our probes found it repeatedly in
the form of **threshold over-claims** — "nucmer ≥70% identity → Marçais 2018" where Marçais states
no minimum, "Cactus branchScale → Armstrong 2020" where the string never appears. Every one of those
cites a real paper. S1 passes all of them.

ScientistOne implements this natively — the Claim Verifier resolves the cite key and then asks a
one-shot LLM judge whether the cited *abstract* supports the specific assertion — but never
forensically, and an abstract is thin evidence for a threshold buried in a methods section. For us
the input is better, and the probes are the evidence rather than the assertion: a corpus note is
graded on whether the skill could be *rebuilt from the captured notes alone* (`AGENTS.md`), so it is
full-text-derived by construction — which is how the probes could determine that Marçais states *no*
minimum identity and that "branchScale" *never appears* in Armstrong. Those are absence findings over
a whole paper; no abstract yields either.

That makes S4 native like S3 — and there the instrument narrows in a way worth stating plainly:
S4 as specified **cannot run on bioSkills or ClawBio at all**, and for our Casts it additionally
requires the experimental claim binding rather than today's per-reference provenance. A forensic
variant judging against the cited paper's own full text is possible where that text is open-access,
and it is what a repository-scale claim about claim support would require. Until then S4 is the deep
instrument's check, not the broad one's.

Ship it last. It is LLM-judged with no deterministic backstop, so it needs the §4 discipline more
than any other check.

### The `convention` disposition — accept-with-label, not drop

Every check carries `convention` as a **passing** verdict: an explicitly unsourced claim that passes
*because* it is labeled.

This is an inversion of CoE, not an addition to it. ScientistOne's Claim Verifier *does* have an
`unsourced` marker — but claims carrying it "are dropped automatically." That is right for a
manuscript and wrong for a skill, because a skill is standing guidance and much of the guidance
practitioners need is community convention with no defining primary: FDR ≤ 0.05, 0.80 power
(`content/research/05-skill-backing-references.md`, finding #2), ≥90% TE masking, the LASTZ 5000-bp
chain (`content/research/experiments/ingest-probes-cross-synthesis.md`). Deleting those leaves the
skill less useful and no more honest.

We already encode the disposition: the WGA candidate Mold's `anti-invention-threshold-is-convention`
eval property (`check: deterministic`) requires that any threshold with no source in the references
"must be labeled as convention/unsourced or marked `[GAP]`, and must NOT be asserted as cited to a
paper." This audit is that property lifted from one Mold to a repository-scale check — an extraction,
not new work.

It also produces the sharpest per-repo distinction available here: **convention honestly
self-labeled** (bioSkills does this in places, and the probes credit it) versus **convention dressed
as a citation**.

### What has no analog — and why not to force one

I2, specification violation, asks whether a solver gamed its evaluator. A skill runs no evaluator.
The nearest-shaped question — does the procedure terminate in self-certification rather than a gate
— is the Refereeability axis, a different question wearing a similar shape, and folding it in here
would blur the §1 boundary. A check has to earn its slot by naming a defect the probes actually
found; I2's does not occur in a corpus of prose. Note the shape this leaves: **two forensic checks**
(S1, S2 — run against anyone's repo with no corpus) and **two native ones** (S3, S4 — run only where
we hold notes). That is ScientistOne's forensic-plus-native *shape* at a different ratio (theirs is
four and one); the forensic half is a near-port of I3/I4, while the native half falls out of our own
defect record.

## 4. Claim extraction — the part that will actually be hard

The checks are easy; getting claims out of prose is not. ScientistOne extracts from LaTeX with a
known bibliography and a known log; we extract from unstructured markdown. Their own numbers are
the warning: of 12 CPR failures, only 2–4 were genuine — the rest were extraction artifacts
(hardware constants, LaTeX subscripts read as numbers, hyperparameters in methodology sections). **An audit whose false-positive rate
exceeds its finding rate is worse than no audit**, since every false positive is an accusation.

Three extractors, each with a pre-filter:

- **Citations** — DOIs, arXiv ids, PMIDs, and `Author Year` patterns in prose, plus any structured
  reference field. Pre-filter: drop URLs to tool repos and docs, which are not citations.
- **Invocations** — fenced blocks and inline code spans containing a known tool name, parsed to
  (tool, subcommand, flag, value). Pre-filter: only tools the bundle pins or that resolve to a
  known package.
- **Numbers** — numeric tokens carrying a comparator or unit inside a guidance sentence.
  Pre-filter is the big one: version numbers, chromosome counts, years, and file-format constants
  are not guidance thresholds. This extractor should ship last and be reported with its own
  precision measured against a hand-labeled sample.

Every finding must cite its span, so a maintainer can see the sentence and disagree.

**Ship with a human review pass over flagged positives.** This is what ScientistOne actually did:
every I1–I3 flagged positive was manually reviewed and auditor false positives (API resolution
failures for real papers, score-extraction errors) removed before their headline table; only I4 was
reported on LLM majority vote with sampled validation. A published rate that has not been through
that pass is a draft, not a result — and the authors' own caveat applies to us too, since they note
they "did not systematically bound false negatives," so a measured rate is a floor.

## 5. Reporting

A vector, never a composite. ScientistOne's Table 1 is legible precisely because AI-Researcher lands
12/15 on method–code alignment while carrying 21/222 (9.5%) hallucinated references — a single score
would have hidden that. The rubrics already carry the rule
(`content/research/mold-eval/rubrics/README.md`).

| Repo | Refs resolved | Refs mismatched | Claims supported | Flags verified | Thresholds sourced | Convention labeled |
|---|---|---|---|---|---|---|

with per-skill detail beneath, each row citing its span.

**Decide the failure state, not just the rate.** Both of ScientistOne's loops terminate in a refusal:
a grounding ratio below threshold aborts the paper, and a topic-relevance gate aborts the pipeline
when fewer than 5 relevant papers survive. The parallel question here is whether a repository below
some threshold gets a number or a verdict — and, for our own casts, whether a cast that fails S3
ships at all. A rate is a report; a refusal is a gate.

**Run it on ourselves.** The audit covers our own casts on the same footing, in the same table.
ScientistOne audits itself alongside the four baselines; the guiding principle here is *we must not
become the thing we referee* (`content/meta/guiding-principles.md`). An audit that only ever points
outward is an advocacy instrument, and would be read as one.

**Publish findings upstream, per skill, with the span.** The probes already set this precedent
(GPTomics/bioSkills#105). A repo-level rate with no per-claim evidence is a scoreboard; the
per-claim spans are what a maintainer can act on, and acting on them is the point.

## 6. What is buildable now

S1 needs only public APIs and an adapter — no corpus, no repo standup, no LLM in the common path.
It is the natural first slice and produces the headline number on its own.

S2 needs a tool-resolution layer (fetch `--help` at a pinned version), which is the same runtime
question already open elsewhere in this workspace and should not be re-solved here.

S3 needs the corpus and an explicit claim-to-source binding. It can run over a handful of probe
artifacts during extractor development, but it cannot report native CPR for our Casts until the local
claim-binding experiment produces executable fixtures. It grows as `content/research/` and the
exercised Cast set grow, which is the correct dependency direction.

S4 needs the corpus, the same claim binding, *and* an LLM judge with no deterministic backstop, so it
ships last and behind the human-review pass. It is the check that would most change what this project
can claim, and the one most able to embarrass us if its false-positive rate is unmeasured — the same
order ScientistOne put it in: they implemented a weaker abstract-level proxy natively, and scoped the
forensic version out as "a known open problem in scholarly NLI" left to future work.

## Sources

- `content/research/chain-of-evidence-integration.md` — the CoE reading this ports from, with the paper's verified mechanisms and numbers.
- `content/research/experiments/ingest-probes-cross-synthesis.md` — the defect classes S1 and S2 are built to catch, and the evidence they occur.
- `content/research/05-skill-backing-references.md` — the convention finding behind the `convention` disposition.
- `content/research/mold-eval/rubrics/traceability.md` — the rubric this audit feeds, and the only one it feeds.
