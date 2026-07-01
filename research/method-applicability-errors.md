# Method-applicability errors (is this method real, and appropriate here?)

> `kind: research` reference leaf for [[audit-method-validity]] §3 (Method existence &
> appropriateness). Corpus-first stub. Grounds the referee's "is the named method a *real* method,
> and is it *appropriate* to this data regime/design?" Two prongs — **existence** and
> **appropriateness** — with **different evidence bases**, flagged. Access/inference flags from the
> source note are carried verbatim — do not launder them.

**Phenomenon (one line):** an analysis names a statistical method that is either (a) not a real,
named procedure — invention/hallucination — or (b) real but inapplicable to the data
characteristics / design at hand. Either way the machinery runs and returns numbers; nothing throws.

## The two prongs the referee separates

### Prong 1 — APPROPRIATENESS (real method, wrong context) — StatQA-grounded
The documented, benchmarked LLM weak spot: choosing a *real* method whose prerequisites the data do
not meet. **Headline (StatQA, NeurIPS 2024):** LLMs are **applicability-error-dominant** — and it
*persists even when domain knowledge is supplied* (authors call it an "inherent limitation") —
whereas humans are **task-confusion-dominant**. Best non-fine-tuned model tops out at **GPT-4o
64.83%** vs stats-background humans (open-book) 53.45%. → `✓ ingested` [[statqa-2024]]

**The reusable artifact — data-condition → applicable-method mapping** (StatQA Table 3 / Table 9;
5 categories, 27 methods). The referee checks a named method against these conditions:
- **Normality** — variance tests: Bartlett & F-Test *require* normal data; **drop them** for
  non-normal data; distribution-free Mood & Levene remain. (StatQA's canonical AE example.)
- **Sample size** — Fisher Exact (small) vs Chi-square (large) for contingency; Shapiro-Wilk (small)
  vs Lilliefors (large) for normality; Kendall correlation suits small samples.
- **Variable type** — quantitative → correlation family; categorical → contingency-table family.
- **Control / strata variable present** → Partial Correlation / Mantel-Haenszel.

**The two failure labels the referee separates** (StatQA §3.3): **Statistical Task Confusion** =
methods from the *wrong family* (e.g. a correlation test for a categorical-independence question);
**Applicability Error** = *right family*, but methods whose assumptions the data violate. Prong 1 is
the AE case.

**Scope boundary (honest):** StatQA covers **hypothesis testing + descriptive statistics** only —
*no regression, no causal inference* (Section G). Its condition→method table is a starter, not the
whole applicability space genomics needs.

### Prong 2 — EXISTENCE (no such method) — documented white-space, NO benchmark
The invented-method-with-a-fluent-derivation case — the project's sharpest target
(`GUIDING_PRINCIPLES.md`). **Confirmed out of scope for StatQA:** its solver picks only from a fixed
27-method classification list ("selection among known real methods only"; hallucination appears only
as fabricated *reasoning within a correct answer*, never method invention — `[[statqa-2024]]` §10).
So the benchmark that grounds prong 1 explicitly does **not** touch prong 2. Across the prior-art
survey this case is repeatedly flagged as **unguarded**:
- `research/02-statistical-genomics-non-r.md` — "'Invented method with a cool name' is unguarded …
  nothing detects an agent confabulating a novel, statistically-invalid procedure." `[inference]`
- `research/03-genomics-broad.md` — "'Invented method' failure is unaddressed … none defend against
  an agent fabricating a novel method with a fluent derivation." `[inference]`
- `research/04-statistics-broad.md` — StatQA applicability-error finding `[verified]`; but "'Invented
  method with convincing derivation' — the sharpest case — has no dedicated detector." `[inference]`

**No primary/benchmark sources prong 2.** Flag it as white-space; cite the project survey, do not
manufacture a citation. The asymmetry is the point (see footer).

## Primary sources
- **StatQA** — Zhu, Du, Li, Luo & Tang, "Are Large Language Models Good Statisticians?", NeurIPS
  2024 D&B Track (arXiv:2406.07815; data/code GPL-3.0). Grounds **prong 1**: the applicability-error
  finding + the condition→method taxonomy + the AE-vs-STC error split. → `✓ ingested` [[statqa-2024]]
- **Prong 2 (existence)** — no benchmark/primary. White-space per `research/02`–`04`.
  `[design-inference — flag, do not manufacture a citation]`

## The referee's check (how the mold uses this leaf)
1. Is the named method a **real, named procedure** in the literature? No → `UNRECOGNIZED-METHOD`
   (prong 2). Do **not** rationalize a derivation that makes an invented method look legitimate.
2. Real, but do the data satisfy its **applicability conditions** (variable type, normality,
   variance homogeneity, sample size, design)? No → applicability error (prong 1);
   `required_action` = the appropriate method for the regime.

## Adjacent (cross-link — do not absorb)
- [[double-dipping]], [[batch-aliased-with-condition]] — sibling invalidity leaves. Applicability
  errors are the "wrong / nonexistent method" class, distinct from "right method used
  circularly / on a confounded design."
- `[[map-question-to-established-method]]` (construct Mold, `MOLDS.md` TODO) — the Family-A
  guardrail that *prevents* this by recommending a validated method. This node is the Family-B
  *detector*. Construct/critique mirror pair on the same failure.

<!-- design-synthesis (owned-and-flagged, NOT corpus-observed): the two-prong split
     (existence vs appropriateness) is THIS project's framing. Appropriateness is StatQA-grounded;
     existence is a documented white-space with no benchmark — the asymmetry is load-bearing: the
     sharpest failure mode (invented method) is precisely the least-benchmarked one. -->
