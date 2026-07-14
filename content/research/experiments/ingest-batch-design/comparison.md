# Recoverability probe — `experimental-design/batch-design`

> Ingested 2026-07-13 via `/ingest-bioskill`. Subject: bioSkills `experimental-design/batch-design`
> @ `2fe089d`. A blind doer+audit pair was assembled from the ingested notes **alone** — neither Mold
> saw the SKILL.md — then diffed against it. The deliverable is the diff, not the Molds.
>
> **Headline: the first probe where the *doer* diff is as sharp as the validity diff.** The skill both
> **invents procedure it cannot source** *and* **omits procedure its own cited sources supply** — and
> renders both in the same confident table voice.

## Sources

**Reused (4)** — the validity axis was already ours, ingested for skill-3 (batch-correction):
[[nygaard-2016]], [[leek-2010]], [[msmb-chap13]], [[msmb-chap8]].

**New (8)** — almost all on the **doer** half, which was genuinely uncollected:
[[yan-2012-osat]] (constrained allocation), [[leek-storey-2007-sva]] (SVA method),
[[tutorials/sva]] (API + pinned defaults), [[tutorials/designit]] (assignment tooling),
[[kang-2018-demuxlet]] (pooling/demux), [[munafo-2018-collider]] (collider mechanism),
[[zhang-2020-combat-seq]] (count-data adjustment), [[tutorials/rnaseqgene]] (the estimate→design idiom).

**Re-summarized (1)** — [[tutorials/deseq2]].

> **A guidance error, recorded not deleted.** Phase 1 asserted the DESeq2 vignette carries a
> "Removing hidden batch effects" section. It does not, and never did — verified across 1.52.0 and
> seven archived releases. That content lives in the **rnaseqGene workflow**, which DESeq2 defers to.
> A plausible-but-wrong locator, produced by our own pipeline, caught only because the summarizer was
> blind and refused to launder a second source into the note. The corrected locator became
> [[tutorials/rnaseqgene]] — the source of the only worked estimate→design code we recovered.

## 1. Recoverability by layer

`05`'s row-3 estimate (~85%) **holds** — but **recompose it**. `05` conflated *tool* defaults with
*decision* thresholds; they grade oppositely.

| Mold | Procedure spine | Validity axis | Tool defaults | Decision thresholds |
|---|:---:|:---:|:---:|:---:|
| `separate-batch-from-biology` (doer, Family A) | **High** | *(hands off — no self-certification)* | **High** | **Low** |
| `audit-batch-design-validity` (audit, Family B) | **High** | **High** | **High** | **Low** |

**Tool defaults recover High** — unusually. The notes pin *everything*: designit 0.5.0
(`max_iter = 1e4`, hill-climb with **no annealing by default**, `check_score_variance = TRUE`),
sva 3.60.0 (every signature, `B = 20`/`B = 5`, `constant = 1`), OSAT's **5000-attempt** budget and
`V = Σ_ij(n_ij − E_ij)²`. **Read the shipped source, not the paper, and tool defaults are recoverable.**

**Decision thresholds are Low, and that is the real gap.** **21 of 29 GAPs are one shape: *no source
states a number*.** No confounding cutoff ([[leek-2010]] reports generalized R² 12.2%–100% with no
threshold; [[nygaard-2016]] none; [[zhang-2020-combat-seq]] says "severely or even completely
confounded" with no detector; [[leek-storey-2007-sva]] stops at correlation **0.50** and never analyses
perfect confounding). No allocation-acceptance threshold. No rule for how many SVs. **Unanimous silence
across five independent primaries is itself evidence no primary exists.**

### The doer diff — a first-class result

**(a) Fluent invented doing — zero corpus support, same table voice as the rows that trace.**
- **Reference / bridge sample per batch** (SKILL:37, :48) — corpus-wide: `"reference sample"` = 0 hits,
  `"TMT"` = 0, `"bridge"` = 0. Standard practice; entirely uncited; the skill gives no way to know.
- **Run-order randomization** (SKILL:40) — the corpus mentions run-order *only to record its absence*:
  [[yan-2012-osat]] "the objective function contains no term for run order"; [[tutorials/designit]]
  "there is no run-order dimension, no time covariate, no sequence-effect score." The *principle*
  traces ([[msmb-chap13]]); **no tool can optimize it and no primary supplies a procedure.**
- **The confounder/mediator/collider triad** (SKILL:29) — [[munafo-2018-collider]] supplies **only the
  collider half**; it never defines a confounder, never discusses mediators, never criticizes
  "adjust for everything measured," and **never mentions batch** (0 occurrences). The skill's
  "'Adjust for everything measured' is therefore wrong in general" is unsourced *by the one source that
  could carry it*. The blind audit quarantined this to "who got assayed" and tagged the ref
  `evidence: hypothesis` — the correct posture.

**(b) Procedure the skill's own cited sources supply, and the skill drops.**
- **[[leek-2010]]'s detection recipe is absent.** The skill cites Leek 2010 twice and carries *none* of
  its procedure (cluster labelled by biology AND batch surrogate; MDS; PCs vs known surrogates; "if PCs
  correlate with no known surrogate, suspect an unmeasured source"). It jumps straight to `num.sv()`.
  **It cites the paper for a design prescription the paper doesn't make (§2.1) while dropping the recipe
  the paper actually gives.**
- **The aliasing check has no operational form.** The skill's most-emphasized claim (SKILL:23–25) is
  asserted in prose with **no detector attached**. [[tutorials/deseq2]] supplies one mechanically —
  build the model matrix, check rank, and the verbatim error string. The skill never says to run it.
- **"Diagnose before you transform" is absent.** [[zhang-2020-combat-seq]] states it verbatim; the
  skill's decision table dispatches on **data type**, never on *whether adjustment is warranted at all*.

**(c) What genuinely traces:** balanced/orthogonal assignment, constrained assignment via
designit/OSAT, batch-as-covariate, SVA for unknown structure, pooling+demux. **This half is sound.**

> A reader cannot tell that "Balanced assignment" (a 2012 method paper with a published objective
> function) and "Reference / bridge sample per batch" (nothing) sit in the same table at the same
> confidence. **That is the doer-side statement of the thesis.**

## 2. Defect verification — 5 confirmed, 1 refuted, 1 narrowed, 3 new

**2.1 "Balance every condition" → Leek 2010 — CONFIRMED mis-attribution.** [[leek-2010]] gives no design
prescriptions. Correct primaries: [[yan-2012-osat]] (the RCBD target, verbatim) and [[msmb-chap13]].
Aggravating: the row sits in a table headed **"Quantitative Thresholds"** and **contains no quantity**;
its rationale ("makes batch estimable and **removable**") is what [[nygaard-2016]] warns against.

**2.2 "Nygaard caveat if unbalanced" on ComBat-seq — CONFIRMED unsupported from both ends.**
[[zhang-2020-combat-seq]] full-XML term counts: `unbalanc*`=0, `imbalanc*`=0, `"type I"`=0,
`Nygaard`=0 (not in its 17 refs). [[nygaard-2016]]: "RNA-seq"/"sequencing"/"count" never appear. The
caveat may well be *true* — it is stated as flat fact across two disjoint scopes.

> **NEW DEFECT (worse), one table down.** SKILL:132 — *"**Fix:** keep batch in the model (**ComBat-seq
> with the biological covariate**, or batch as a DE covariate)."* `ComBat_seq(group=condition)` is **not
> "keeping batch in the model"** — it is a *data edit* producing an adjusted matrix you then test without
> batch. That reproduces **legs 2 and 3 of Nygaard's own three-legged failure**, in the count domain, and
> is offered as the **first-listed fix for Nygaard's failure**. Nygaard's endorsed remedy is singular and
> verbatim: *"our primary advice would be to account for batch in the statistical analysis"* — the skill's
> *second* option. **Under its own stated caveat, the skill's fix is self-contradictory.** The blind doer
> does not make this error.

**2.3 "~50 SNPs/cell suffice" — CONFIRMED, doubly.** [[kang-2018-demuxlet]]: a **simulation** result
(97% singlets / 92% doublets, pools ≤64, **unrelated** donors, genotypes swapped in from 1000 Genomes).
Real-data claim is narrower: **>99% singlets at 8 donors**. Stripped: the simulation qualifier, both
accuracies, the pool bound, the unrelated-donor condition, and the hard input (**external genotypes for
every donor — no genotype-free mode exists**). **And the rationale is itself an over-read:** the paper
never analyses a one-donor-per-lane design; attributing the donor↔lane-confound argument to it "would be
an over-read."

**2.4 "SVs can absorb biology if confounded" — CONFIRMED mis-attributed; REFUTED as "contradicted."**
The ingest overstated this. Against [[leek-storey-2007-sva]]: mis-attribution confirmed (the paper claims
the *opposite* — robustness at correlation 0.50, SV recovered in 94.5% of datasets; perfect confounding
never simulated). **But the claim is true in a narrower form, sourced from a source the skill never
cites** — the sva vignette: *"if the goal is to identify heterogeneity in one or more subgroups… one or
more of the estimated surrogate variables may be very highly correlated with subgroup."* The real
condition is *"the latent structure IS the biology you're hunting"* — **not** *"batch is confounded with
condition."* **The blind pair got this split right where the defect list that prompted it did not.**

**2.5 `sva()` on counts / no `svaseq()` — REFUTED as stated; CONFIRMED as an omission.** The sva note
pre-emptively refuses the over-read: the docs **never** say `sva()` on a normalized matrix is an error —
that is `sva()`'s *documented domain*, and the skill's variable is literally `expr_normalized`. The real,
narrower defect is **omission**: a count-centric skill (ComBat-seq, edgeR, "integer counts" throughout)
that **never names `svaseq()`**, the count-data entry point. A user arriving with counts is given no path.

> **NEW DEFECT, same code block.** `num.sv(expr_normalized, mod)` takes the **default `method="be"`** —
> a Buja–Eyuboglu **permutation** procedure (`B=20`, **stochastic**) — while every worked example in the
> vignette *and* the reference manual passes `method="leek"`, and `sva(n.sv=NULL)`'s internal estimate
> uses `"be"`. **The two documented paths to `n.sv` don't use the same estimator.** The skill sets no seed
> and names no estimator — exactly the default-vs-usage discrepancy its own Version-Compatibility ethic
> exists to catch.

**2.6 ">1000 vs 11" — CONFIRMED fuzzy; it conflates two experiments.** [[nygaard-2016]] gives exact,
separately-conditioned figures: **Exp 1** (GSE40566) ComBat **2011** vs blocking **11**; **Exp 2**
(30 samples, 3 batches, 6/2, 3/4, 9/6) **1003** vs **377**. The skill **fuses the >1000 from Exp 2 with
the 11 from Exp 1** — a pair that never co-occurs in the paper — and drops Nygaard's own hedge on Exp 2.

**2.7 "Subtracting SVs → anti-conservative" — CONFIRMED unsourced, and the stated MECHANISM is wrong.**
No corpus source asserts the prohibition; [[tutorials/rnaseqgene]] and [[tutorials/deseq2]] only *enact*
it by example, and the sva vignette's own §7 runs `f.pvalue()` on a ComBat-corrected matrix **without
comment**. Direction right, assertion unsourced.

> **NEW DEFECT.** The skill's *"**Mechanism:** double-counts the adjustment and **loses degrees of
> freedom**"* names the concern [[nygaard-2016]] **explicitly distinguishes away** as the *lesser* one
> ("mainly for small data sets or many small batches"). The real mechanism is that batch-effect
> **estimation error**, applied as a point estimate and dropped downstream, deflates the variance —
> *"inflated by a fixed factor which depends on the unevenness of the design, rather than the size of the
> sample."* **The skill names the lesser concern the primary sets aside.**

## 3. GAP taxonomy → next actions

29 GAPs. **The split is the finding: only 4 need a new source; 21 are "the literature states no number."**

| Bucket | n | Disposition | Access |
|---|:--:|---|---|
| **Convention, not citable** | **21** | **Label, don't cite.** `05` finding #2, confirmed on a 4th skill. **Do not send Phase 5 hunting for these.** | n/a |
| **Operational — a tool's own docs** | 4 | new source note (vignette/man-page surrogate) | accessible |
| **New source note** — real method gap | 3 | bridge-sample design; run-order; hashing-vs-genotype demux (Stoeckius) | accessible |
| **Re-summarize existing** | 1 | [[kang-2018-demuxlet]] supplement (the SNP × pool-size degradation surface) | accessible |

**Highest-value single Phase-5 ingest:** the **limma `removeBatchEffect` man page** — the one source that
would turn the audit's "the explicit prohibition on testing a batch-corrected matrix is unsourced" from
unsourced into cited. [[nygaard-2016]] reports it second-hand; the doc itself is not in our corpus.

### The silent gaps — the highest-value find

**(1) [[kang-2018-demuxlet]] carries a published Author Correction, and nobody knows what it changed.**
(Nat Biotechnol 38(11):1356, DOI 10.1038/s41587-020-0715-9 — **paywalled**; the note's `[re-check]` says
so.) bioSkills states "~50 SNPs/cell suffice" as decision-grade, in a table headed **Quantitative
Thresholds**, **with no awareness its source is under correction.** Not a missing fact — a **provenance
defect**, and *structurally invisible* to a memory-written skill: the model recalls the number, not the
erratum.

> **This is also a gap in *our* pipeline, and we will not launder it.** The `[re-check]` flag **existed in
> the note** and **neither Mold propagated it**, though `AGENTS.md` requires carrying such flags forward
> verbatim. Fixed in this pass (see below). The probe caught its own error — that is the method working.

**(2) The design-time half rests on tools validated only against a surrogate endpoint.**
`[design-inference]` — visible only by cross-reading two §10s. OSAT's *entire* validation is **one
dataset**, scored by **χ² of variable-vs-batch**, with *"no downstream measurement of actual batch effects
on real profiling data."* designit has **no validation at all** — *"no power analysis, no Type-I-error
argument, no claim about what the optimized layout does to downstream inference."* **No source in the
corpus demonstrates that a constrained allocation improves a downstream inferential endpoint.** The
principle is analytic and sound; the *tools* are validated on a proxy. bioSkills asserts "batch orthogonal
to condition; estimable" as settled. **This is exactly the empirical hole the calibrate role exists to
fill, and it is invisible to prose.**

## 4. What the Foundry adds

bioSkills *has* the right instinct — "prefer keeping batch in the analysis model over producing a
'cleaned' matrix" — but it is a **flat assertion inside the same document that does the doing.** Nothing
separates actor from judge; nothing forces the check; nothing records which check ran.

The pair makes it **structural**:
- **The doer hands off.** Phase 5 is `[gate]`; its opening line is *"This Mold cannot certify its own
  output."* `eval.md` makes it deterministic: *a run that ends in a result plus a confidence statement,
  with no referee handoff, **FAILS**.*
- **The doer refuses to self-certify from its own diagnostic.** OSAT's χ² and designit's
  `check_score_variance` abort are **evidence for the referee, not passes** — precisely because their
  sources set no acceptance threshold. **The direct structural answer to silent gap (2).**
- **The audit cannot certify on reasoning alone.** `calibrate-required-for-certify`. It ships five
  **runnable** checks with recovered parameters — Nygaard's null-data rerun (20 000 genes, batch effect on
  10%, splits 1:5 and 5:1, n = 12/120/1200), the MSMB p-value-histogram oracle, Zhang's polyester
  simulation (918 genes, 2×2, 300 reps), Leek & Storey's eigengene permutation null, negative controls.
- **`UNDETERMINED` exists and is never `PASS`** (e.g. no version pin) — a verdict prose has no vocabulary for.
- **Routing is typed:** aliasing → **ESCALATE** (no analysis repairs it); imbalance-inflation → **REVISE**.
  The skill collapses all of it into "redesign."
- **The referee binds itself against over-reading** — an `over-read-guard` drawn from the corpus's own
  silences (don't call `sva()`-on-counts an error; don't claim SVs absorb biology; don't transfer Nygaard
  to counts; don't transfer the collider paper to batch). *A referee that flags every ComBat-then-test run
  is a constant function, not a referee.*

## 5. Where bioSkills leads — honest credit

**The strongest bioSkill the probe has hit, and on one axis it beats us outright.**

**CLI/version-compat rigor: 4-for-4 correct**, verified against shipped source — the axis where the
previous three probes found confabulated CLI details:
- "there is no bare `osat()`" → **correct** (nit: `optimal.shuffle` is the *default of `fun=`*, not the
  top-level call — the warning is right, the phrasing a shade loose).
- "designit is R6 and its signatures drift between releases" → **correct**, and its own NEWS proves it.
- "there is no standalone `get_samples()`" → **correct**, confirmed against `NAMESPACE`.
- "`ComBat_seq()` is for integer counts while `ComBat()` expects log-normalized" → **correct**, verbatim.

**Where it beat our pair:** its `removeBatchEffect | visualization ONLY | not for the hypothesis test` row
is **correct and better-sourced than our audit realized** — [[nygaard-2016]] records that limma and Partek
warn against use prior to linear modeling, and [[tutorials/deseq2]] frames it under a visualization FAQ.
**Our Axis 6 was too austere. Credit bioSkills; fix our audit.**

Also ahead: **coverage** (Harmony/scVI, RUVSeq, metadata, eight cross-skill handoffs — our pair is
deliberately narrower because it only claims what it can cite, but narrower is narrower, and bioSkills
helps more people today); **ownership discipline** ("this skill decides; execution lives there" is a
Family-A/B instinct arrived at without the machinery).

**Where the operational lead stops.** Version pins are **floors** (`designit 0.5+`), not pins — `0.5+`
would not have protected you from the `$scoring_f` deprecation *within* 0.x. **No seed anywhere**, though
`optimize_design()` and `num.sv(method="be")` are both stochastic. **No diagnostic step after allocation** —
the skill produces `assignment <- bc$get_samples()` and stops: no χ², no balance check, no acceptance
evidence. **The design self-certifies by existing. That is the gate-shaped hole, in code.**

## Bottom line

**~85% recoverable** — but recompose the row: **spine High / validity High / tool-defaults High /
decision-thresholds Low.** `05` finding #1 (the validity axis is the most traceable layer and exactly what
bioSkills can't trace) **holds**. Finding #2 (the gap is always thresholds, never the method) **holds on a
4th skill, 21 of 29 GAPs.**

**What earns this probe its keep:** for the first time the **doer** diff is as sharp as the audit diff. The
skill invents procedure it cannot source (bridge samples, run-order, the mediator/confounder rule) while
dropping procedure its own cited sources hand it (Leek's detection recipe, DESeq2's rank check,
ComBat-seq's diagnose-first rule) — in the same confident table voice. Then, in the one place it tries to
*fix* the cardinal sin, it recommends the count-domain re-instantiation of that very sin.

**Content was never the moat. Here, neither was the doing.**
