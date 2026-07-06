# Recoverability probe: `comparative-genomics/gene-family-evolution`

> Phase-4 compare. Real bioSkills SKILL.md + usage-guide (fetched 2026-07-03) vs. blind-assembled candidate Mold
> `audit-gene-family-birth-death`, built from **6 ingested notes** (Hahn 2005, De Bie 2006/CAFE, Mendes 2020/CAFE5,
> Csűrös 2010/Count, Tonkin-Hill 2020/Panaroo, MSMB ch.6). The candidate is a **Family-B referee** — it audits method
> validity, it does not reproduce the skill's doer taxonomy. Secondary doers (BadiRate, DupliPHY), ALE/DTL
> (cross-skill), Whale.jl WGD, RERconverge/CSUBST, functional enrichment, and time-calibration tool internals were
> **deliberately out of scope**. Produced by `/ingest-bioskill`. Every number carries its artifact.

## 0. Known-context verification (against fetched SKILL.md text + notes)

| Claim to verify | Verdict | Evidence |
|---|---|---|
| **Hahn** three-way page/year/2007 inconsistency | **CONFIRMED** | SKILL body: "Birth-death models on phylogeny **(Hahn 2007; Csurös 2010)**"; usage-guide: "**(Hahn 2005; Csurös 2010)**"; References: "**Hahn MW et al 2005 Genome Res 15:1457**". Three disagreeing forms in one skill. hahn-2005 note §1: real locus = *Genome Research* **15(8):1153–1160**, DOI 10.1101/gr.3567505. Page "1457" is wrong; **no Hahn-2007 framework paper exists** — the BD framework is Hahn 2005. |
| **Mendes "2021"** mis-date | **CONFIRMED** | References: "**Mendes FK et al 2021** Bioinformatics 36:5516"; usage-guide: "**Mendes 2021**" (twice). Body/description/taxonomy/thresholds all correctly say **2020**. mendes-2020-cafe5 note §1: **2020**, *Bioinformatics* 36(22–23):5516–5518. Internal date collision. |
| **CAFE5 "explicit Type-I control"** | **CONFIRMED mis-attribution** | Taxonomy table strength cell: "Modern standard; handles rate heterogeneity; **explicit Type-I control**". mendes note §10 & §12-Q1: "**No claim of Type-I error control** anywhere in the paper." Unsupported by the source. |
| **"≥100 families → Mendes 2020"** | **CONFIRMED mis-attribution** | Quantitative-Thresholds row: "Minimum orthogroups for CAFE5 \| ≥100; preferably >1000 \| **Mendes et al 2020** Bioinformatics 36:5516". mendes note §10 & §12-Q2: "**No minimum number of gene families/orthogroups** stated." Threshold is convention, not this paper. |
| **CAFE5 "reports per-family p-values"** (bonus) | **CONFIRMED mis-attribution** | Multiple-testing failure mode + code docstring: "CAFE5 reports per-family p-values; FDR-correct downstream" / "per-family p-value (vs the null of a single global lambda)". mendes note §10/§12-Q3: CAFE5's family-level output is an **empirical-Bayes posterior rate-category probability**, *not* a per-family p-value. |
| **"Count requires ultrametric"** | **CONFIRMED unsourced** | Version-Compat: "negative branch lengths in input tree (**Count requires ultrametric**)". csuros note §9/§10/§12: "**No stated requirement that the input tree be ultrametric, time-scaled, or clock-like**"; the words "ultrametric/time/molecular clock" never appear. (Hahn note §10/§12 likewise: no ultrametricity claim.) |
| **"same principle in eukaryotes"** (annotation-heterogeneity generalization) | **CONFIRMED skill inference** | Failure mode: "(Tonkin-Hill 2020 documented this for bacterial pangenomes; **same principle in eukaryotes**)". tonkin-hill note §8/§10/§12: paper is **prokaryote-scoped**, does **not** claim generalization to eukaryotes or CAFE-style BD; its sole eukaryote mention is a **Denton et al.** citation, not a Panaroo finding. Generalization is the skill's, not the source's. |
| **FDR / multiple-testing** (skill prescribes BH — credit it) | **HOLDS — correct practice, but two flaws around it** | Skill correctly prescribes "Apply FDR (**Benjamini-Hochberg**) across families" (failure mode + threshold table + reviewer table). **Credit.** But (a) the skill never states that **CAFE itself performs no correction** (de-bie note §10: confident silence — no FDR/FWER step, left to the user), and (b) it hangs BH off a **non-existent CAFE5 per-family p-value** (above). Right remedy, wrong plumbing. |
| **"parsimony underestimates losses"** (Count reconciliation row, bonus) | **CONFIRMED unsourced** | Reconciliation table: "Count parsimony vs CAFE5 likelihood disagree \| **Parsimony underestimates losses** \| Trust CAFE5". csuros note §10/§12: "the paper makes **no such comparative claim**." |

---

## 1. Recoverability by layer

| Layer | Grade | One-line evidence |
|---|:---:|---|
| **Procedure spine** (the *audit* walk: method-real? → tree/branch-length → single-λ assumption → multiple-testing → null calibration → annotation-error input → dependence → ancestral over-reading) | **High (as Family-B referee); Low (as skill's doer taxonomy)** | Mold §1–§8 recovers the full audit spine from the notes: method-recognition (Hahn/CAFE/CAFE5/Count) §1, CAFE's rooted+bifurcating+time-unit tree §2 (de-bie §5c), single-global-λ=μ null §3 (hahn §5–§8), multiple-testing §4, calibration §5, annotation-error §6, dependence §7, ASR-uncertainty §8. But the skill's **8-tool doer taxonomy** (CAFE5-error/BadiRate/DupliPHY/ALE/Whale.jl + 14-row decision tree + `cafe5 -i…-k 4 -e` CLI) is **out of scope** — deferred, stated caveat. |
| **Validity axis** (the invalidity patterns the referee catches) | **High** | Every axis note-traced: mis-attributed method claim (mendes §10: no p-value/no Type-I/no min-families), unrecognized-method flag, naive multiple testing (de-bie §10 CAFE-does-none + hahn's own 35/1254-expected baseline + MSMB FWER blow-up), single-λ violation by WGD/TE/large-families (hahn §8–§9), annotation-error inflation scoped to prokaryotes (tonkin-hill §12), uncalibrated null / count-discreteness (MSMB), ancestral over-reading (csuros fractional-expectations + de-bie Viterbi). Strongest layer — same finding as content/research/05 #1. |
| **Defaults / thresholds** | **Low — but recovered as *discipline*, not numbers** | Mold **refuses** the invented cutoffs: it explicitly declines "ultrametric required" (§2 `[GAP]`), declines a sourced FDR target (§4 `[GAP]`), declines a Monte-Carlo sample floor (§5 `[GAP]`), and declines the CAFE5 min-families/Type-I claims (§1). eval `honest-numbers-no-invention` encodes the refusal. The *numbers themselves* (≥100 families, BUSCO≥90%, top-5% outlier, `-k 4`) remain unsourced — correctly held as convention. Mirrors content/research/05 #2. |

Recovered traceably: the **entire referee/validity spine** — a cast Mold flags exactly the method-validity failures a reviewer would raise, and each flag cites a verified note. Not recovered: the skill's **doer breadth** (8-tool taxonomy, decision tree, CLI, cohort gotchas, functional enrichment) and the **threshold numbers** (correctly held as convention, not fabricated). The **prokaryote-vs-eukaryote scope split** on annotation error is recovered *as a discriminator*: the Mold flags the prokaryotic case and emits `[GAP]` on the eukaryotic case (§6), exactly where the skill over-generalizes.

---

## 2. GAP taxonomy → next actions

> **Post-blind amendment (2026-07-05).** Two of the gaps below have since been closed by ingesting
> their primaries and folding them into the candidate Mold *after* the blind assembly — so they do not
> alter the blind snapshot above; they record what sourcing closed:
> - **[[denton-2014]]** (eukaryotic draft-assembly gene-number error; PLoS Comput Biol, CC BY) closes
>   the §6 eukaryotic annotation-error `[GAP]` (row below) and the eukaryotic *direction* of silent gap
>   #1 — grounding **both** false EXPANSION (fragmentation / split alleles → over-count) and false
>   CONTRACTION (missing genes → under-count), with **CEGMA** completeness as the warning signal. Folded
>   into Mold §6. The **BUSCO ≥90% number stays convention** (Denton predates BUSCO, prescribes no cutoff)
>   and Denton does **not** name CAFE/BD — the size→rate bridge is Han's.
> - **[[han-2013-cafe3]]** (CAFE 3 error-aware birth-death; MBE, restrictive license) closes silent gap
>   #2 — error-aware BD. Grounds the *overestimation* direction (uncorrected error → λ consistently
>   overestimated) and the `errormodel` / `caferror.py` / ε-grid remedy; **new Mold §7**. Body-number
>   retrieval-uncertainty and the no-ε-cutoff silence are carried forward, not laundered.
> **Still silent/open:** BUSCO ≥90% number (convention), time-calibration tooling (gap #3), single-copy-OG
> dilution (gap #4). The Tonkin-Hill eukaryotic-generalization sidecar (below) is **unchanged** — Denton
> is a separate eukaryotic finding, it does not validate Panaroo's mechanism generalizing.

**Candidate Mold's flagged gaps** (5 literal `[GAP]` markers + 1 unverified-sidecar — the honest count,
*as blind-assembled*; §6 since closed — see amendment):

| Flag (artifact) | Bucket | Action |
|---|---|---|
| No sourced ultrametricity/clock requirement (index §2 `[GAP]`; scenario "ultrametric asserted by reviewer") | **convention, not citable** | Correct refusal. The CAFE5-manual time-calibration requirement (treePL/LSD2/chronos) is real practice but lives in the manual, not the primaries — label as convention/manual, do not cite to Hahn/Count. |
| No sourced detector/threshold for WGD/TE/"too-large" families (index §3 `[GAP]`) | **re-summarize existing / convention** | hahn §8 *names* these failure modes but gives no test. A WGD-detector (e.g. Ks-peak / DupGen_finder) would need a **new source note** if a sourced detection procedure is wanted; else flag-on-design-signal only. |
| No sourced FDR target / significance cutoff (index §4 `[GAP]`) | **convention, not citable** | Correct. MSMB: "nothing special about 0.05"; Hahn's P<0.01 is one dataset's example, not a prescription. Keep as convention. |
| No Monte-Carlo sample-size / p-value precision floor (index §5 `[GAP]`) | **re-summarize existing** | de-bie §10/§11: confident silence on MC sample count. Would need the **CAFE/CAFE5 manual** (a separate source) to ground a default. |
| Panaroo prokaryote-scoped; no eukaryotic annotation-error audit grounded (index §6 `[GAP]`; scenario "eukaryotic annotation quality") | **new source note** — **✓ CLOSED post-blind** | The single highest-value gap the Mold *did* flag: get a **eukaryotic** annotation-error / assembly-fragmentation → gene-count-inflation primary (Denton et al., cited inside Panaroo; BUSCO/Compleasm methodology). Panaroo covers only bacteria. **→ Done: [[denton-2014]] ingested + folded into Mold §6 (both error directions grounded; BUSCO number stays convention).** |
| Tonkin-Hill generalization beyond prokaryotes (index frontmatter `verification: hypothesis`) | **new source note** | Same as above; the sidecar honestly marks the eukaryotic extension as *our inference*, not laundered as sourced. |

**Highest-value SILENT gaps** — real-skill content **no ingested note surfaced**, so the blind Mold could not flag it at all (silent gap = the find that matters). A memory-written skill states these freely; the traceable Mold is silent — that asymmetry is the result:

1. **Assembly-fragmentation → false *contraction* + BUSCO ≥90%.** SKILL has a whole "Assembly fragmentation creating false contractions" failure mode ("require ≥90% BUSCO/Compleasm; exclude species with >5% lower BUSCO than median"). Panaroo covers fragmentation → *inflation* in **prokaryotes**; **no note** covers the eukaryotic false-**contraction** direction or the **BUSCO≥90%** number. → **new source note** (eukaryotic completeness-filtering / Denton) + **convention** (the 90% cutoff). **✓ Direction CLOSED post-blind: [[denton-2014]] grounds the eukaryotic false-contraction (missing-genes) AND false-expansion (fragmentation) directions + CEGMA warning signal; the BUSCO≥90% *number* remains convention.**
2. **The entire CAFE5-error annotation-uncertainty mode (`-e`).** SKILL's headline remedy for heterogeneity is CAFE5-error with per-species error rates. mendes note §10/§12-Q: "**No error/annotation-uncertainty model documented as a CAFE5 feature**" (only a citation to CAFE3). The Mold never mentions error-aware BD at all. → **new source note** (CAFE3 / Han et al. 2013, the actual error-model primary) or manual. **✓ CLOSED post-blind: [[han-2013-cafe3]] ingested + folded into Mold §7 (error-aware BD: overestimation direction + `errormodel`/`caferror.py`/ε-grid remedy). The CAFE5 `-e` CLI flag itself stays manual-level; Han grounds the error-model *principle*.**
3. **Time-calibration requirement + tooling** (treePL, LSD2, `ape::chronos`, TimeTree). SKILL threads this everywhere. **No note** grounds it — and correctly so: the Mold *refuses* "ultrametric required" as unsourced. But the practitioner requirement + tools are silent. → **new source note** (treePL Smith & O'Meara 2012; LSD2 To 2016) if time-calibration enters scope.
4. **Single-copy-OG dilution** (restrict to multi-copy, max count ≥2). SKILL failure mode + threshold. **No note** covers it. → **convention / new source note**.
5. **Outlier-family-driven λ** (NLR clusters 500+; excluding top-5 changes λ >30%). **Partial** — hahn §8 grounds the *concern* ("very large families may violate constant-per-gene-rate"), and the Mold *does* flag it (§3). The specific **exclusion procedure/threshold** (top 5%, report with/without) is unsourced → **convention**. Not fully silent — the mechanism recovered, the number did not.

---

## 3. What the Foundry adds

The candidate Mold implies an **empirical referee/gate** the SKILL.md states as flat prose but cannot trace — and here that gate would catch the skill's **own** errors:

- **`catch-mis-attributed-method-claim`** (eval.md) — asserts "a claim that CAFE5 produces per-family p-values, or controls Type-I error, or requires a stated minimum number of orthogroups, must be flagged as unsupported/mis-attributed — never echoed as fact." **Concrete payoff:** run against this SKILL.md, it flags **three** of its own claims — the taxonomy's "explicit Type-I control," the threshold table's "≥100 families → Mendes 2020," and the code docstring's "CAFE5 per-family p-value" (mendes note §10 grounds all three as absent). The scenario **"CAFE5 credited with p-values and Type-I control"** is the planted fixture; the skill *is* that fixture.
- **`honest-numbers-no-invention`** (eval.md) — "must NOT assert 'the tree must be ultrametric / clock-like' as a requirement (unsourced)." **Concrete payoff:** catches the skill's Version-Compat line "**Count requires ultrametric**" (csuros note §9: no such requirement) and its blanket ultrametricity prescriptions. The scenario **"requires an ultrametric tree asserted by a reviewer" → DO NOT rubber-stamp, emit [GAP]** is exactly this failure. A Foundry referee refuses; the SKILL.md asserts.
- **`catch-naive-multiple-testing`** + the Verdict's cite-per-flaw rule — grounds BH-FDR in MSMB *and* records that **CAFE performs no correction itself** (de-bie §10), the nuance the skill omits when it (wrongly) hangs FDR off a CAFE5 p-value.
- **Calibrate handoff / the gate** (Mold §5, §8): p-value-histogram diagnostic + integer-count-discreteness check + ancestral-uncertainty flag — the empirical checks that turn "trust the p-value" into a verdict. Flagged design-inference where synthesis, note-sourced where sourced; honest about the split.

The specific payoff, named: **the trace would have caught the memory-citation failures this skill actually contains** — the Hahn 2007↔2005↔15:1457 three-way inconsistency and the Mendes 2020↔2021 collision are precisely the "citations from memory, fuzzy ones included" failure mode the Foundry pattern exists to prevent (content/research/05 thesis).

---

## 4. Where bioSkills leads

Credit honestly (shared strengths are *similarity, not our edge*):

- **CLI / version-compat rigor.** SKILL pins CAFE5 5.1.0+, Count 11.0319+, BadiRate 1.35+, OrthoFinder 3.0+, R 4.4+ / phytools 2.3+ / ETE4 4.1.0+, with per-tool `--help` verification and **adapt-on-mismatch** guidance, plus a Common-Errors table mapping exact strings ("`lambda did not converge`", "`negative branch length`") to causes and fixes. The Mold carries **none** of this operational layer — and the notes explicitly *couldn't* corroborate the pins (csuros §12: "Count 11.0319+ postdates the 2010 paper"; mendes §11: CLI flags are manual-level).
- **Breadth.** 8-tool algorithmic taxonomy, a **14-row** decision tree by scenario, a 9-row reconciliation table for method disagreement, cohort gotchas (WGD/plant-NLR/mammalian-OR/polyploid/MAG), and an anticipated-reviewer-pushback table. The Mold audits the **BD birth-death core** only.
- **Embedded stats stated inline.** Gamma-category-vs-biology caution, outlier-λ robustness, single-copy dilution, HGT→use-ALE — stated as practitioner prose. Genuine content; the Foundry's distinction is the *automated referee*, not better prose.

Do not overclaim: on CLI discipline, tool breadth, and inline operational stats, bioSkills is ahead today.

---

## 5. Bottom line

Sharpest **recovered-traceably win:** the validity axis reconstructs in full and *self-defends* — the Mold's `catch-mis-attributed-method-claim` and `honest-numbers-no-invention` evals would flag **three** of the real skill's own mis-attributions (CAFE5 "Type-I control," "≥100 families → Mendes 2020," CAFE5 "per-family p-values") plus its unsourced "Count requires ultrametric," and the **Hahn 2007 / 2005 / page-1457** three-way inconsistency is exactly the memory-written-citation failure the trace exists to prevent. Sharpest **gap (as blind-assembled):** the **CAFE5-error annotation-uncertainty mode**, **time-calibration tooling**, and **single-copy-OG dilution** are *silent* — no ingested note surfaced them, so the blind Mold can't flag what a memory model states freely (the highest-value finds); assembly-fragmentation→false-contraction + BUSCO≥90% is silent on the eukaryotic direction while the Mold *did* honestly `[GAP]` the eukaryotic annotation-error boundary. **[Post-blind (2026-07-05): two of these are now closed by sourcing — [[han-2013-cafe3]] grounds the error-aware BD mode (Mold §7) and [[denton-2014]] grounds the eukaryotic annotation-error direction (Mold §6); the BUSCO≥90% number, time-calibration tooling, and single-copy-OG dilution remain silent/convention. See §2 amendment.]**

Honest recoverability: of the skill's **referee-relevant** content (method validity, assumption audit, multiple-testing, calibration, annotation-error), **~80%** recovers traceably from the 6 ingested notes (validity axis High, thresholds correctly held as convention). Of the **whole** skill, closer to **~45–50%** — the 8-tool doer taxonomy, decision tree, CLI/version rigor, CAFE5-error mode, time-calibration, and cohort gotchas were **deliberately out of scope**, a stated scoping caveat, not a silent failure. Consistent with content/research/05's thesis: **the content was never the moat; the trace is** — and here the trace does not merely match the skill, it *audits* it, catching four citation/attribution errors the memory-written skill ships as fact.
