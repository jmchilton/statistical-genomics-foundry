# Recoverability probe: `comparative-genomics/whole-genome-duplication`

> Phase-4 compare. Real bioSkills SKILL.md + usage-guide (fetched 2026-07-05) vs. blind-assembled candidate Mold
> `audit-wgd-inference`, built from **10 ingested notes** (Vanneste 2013, Chen 2024/wgd v2, Sensalari 2022/ksrates,
> Qiao 2019/DupGen_finder, Wang 2012/MCScanX, Tang 2008/JCVI-MCscan, Lovell 2022/GENESPACE, + CAFE cross-refs
> De Bie 2006, Mendes 2020, Han 2013). The candidate is a **Family-B referee** — it audits WGD-inference method
> validity, it does not reproduce the skill's doer pipeline. Phylogenomic placement (MAPS, Whale.jl, POInT, SLEDGe),
> subgenome phasing (SubPhaser), dosage-balance retention biology, and time-calibration internals were
> **deliberately out of scope**. Produced by `/ingest-bioskill`. Every number carries its artifact.

## 0. Known-context verification (fetched SKILL/usage-guide text vs. notes)

| Claim to verify | Verdict | Evidence |
|---|---|---|
| **`wgd syn` uses MCScanX** | **CONFIRMED error** | usage-guide "What the Agent Will Do" §4: "Identify synteny anchors with **wgd syn (MCScanX-based)**"; Prerequisites: "**MCScanX (dependency for wgd syn)**". SKILL body names no engine for `wgd syn` (so also never says i-ADHoRe — an omission). chen-2024 §6/§12-Q2: paper "collinearity searches conducted with **i-ADHoRe (v3.0.01)**"; CLI docstring "Co-linearity and anchor inference using I-ADHoRe"; "MCScanX appears nowhere." DEFINITIVE. |
| **DupGen class "segmental"** | **CONFIRMED error** | SKILL: classes "tandem, proximal, dispersed, **segmental**, WGD"; usage-guide §6 same; Quick-Start: "tandem, proximal, **segmental**, or WGD". qiao §5/§6/§12-Q1: the five classes are **WGD/tandem/proximal/transposed/dispersed**; "**segmental is NOT a class**" — it appears only in the `-a` option text. Skill dropped **transposed** and inserted **segmental**. |
| **DupGen tandem=5 / proximal 5–25** | **CONFIRMED error** | SKILL Quantitative-Thresholds: "**Tandem: 5 genes default**; species-tunable" / "**Proximal: 5–25 genes**". qiao §5/§6/§12-Q2 (verbatim README): single `-d number_of_genes(...default: 10)`; "**tandem = directly adjacent (0 intervening genes)**; there is no separate tunable tandem-count parameter"; "no separate tandem/proximal pair of windows." Both numbers wrong. |
| **ksrates requires ≥2 outgroups** | **CONFIRMED fabricated threshold** | SKILL: "KsRates minimum outgroups: **>= 2** species at different distances"; failure mode "at least two outgroup speciation events"; usage-guide: "at least two outgroup species" / "**>= 2** outgroups". sensalari §8/§10/§12-Q2: paper states **NO hard minimum** ("an outgroup species" = ≥1); docs *advise* "**at least 3 or better 4**" (`max_number_outgroups` default 4). "≥2" is neither the paper's floor nor the docs' advice. Candidate mold flagged it as GAP — correct. |
| **Universal cutoff "Ks < 1.5; >2 saturated"** | **CONFIRMED unsourced** | SKILL: "Ks saturation upper limit: **Ks < 1.5** for reliable inference; >= 2 saturated"; usage-guide tip "**Restrict Ks-based analysis to Ks < 1.5; > 2 saturated and unreliable**". vanneste §8/§10: saturation onset is **species-specific**, "no single universal K_S threshold applies"; K_S "linearly informative to age ~2"; mixture ceiling **2–2.5**. A flat universal 1.5 cutoff is exactly the invented number the mold's `no-invented-universal-Ks-cutoff` eval guards. |
| **Ks < 1.5 attributed to KsRates** | **CONFIRMED mis-attribution** | SKILL: "KsRates substitution rate correction **valid range: Ks < 1.5**". sensalari §12-Q4: "**ABSENT** … the value 1.53 appears only as an *example* palm–rice ortholog Ks, not a threshold. **Do not cite this source for a Ks<1.5 cutoff.**" The skill turned an example number into a sourced bound. |
| **KsRates mandatory for cross-lineage** (credit) | **HOLDS — correct** | SKILL/usage-guide: "KsRates is **mandatory** for cross-lineage WGD comparison; rates vary 2–5×." sensalari §9/§12-Q3 grounds this exactly (rate heterogeneity → naive mixed-plot misplacement; oil-palm τ). **Credit.** |
| **BUSCO > 90% before wgd v2** | **CONFIRMED unsourced number** | usage-guide: "**BUSCO completeness > 90%** before running wgd v2." No ingested note states a 90% cutoff (chen-2024 §6 mentions BUSCO-guided families, no threshold). Convention, not citable — same pattern as the gene-family-evolution probe. |

---

## 1. Recoverability by layer

| Layer | Grade | One-line evidence |
|---|:---:|---|
| **Procedure spine** (the *audit* walk: claim-type routing → Ks-saturation boundary → anchor-Ks vs paranome → cross-lineage rate correction → syntenic-depth for ploidy → tool/param reality → birth-death corroboration → small-sample) | **High (as Family-B referee); Low (as skill's doer pipeline)** | Mold §0–§7 recovers the full audit spine from the notes: claim-typing §0, saturation-peak/Ks-ceiling §1 (vanneste), anchor-vs-paranome contamination §2 (qiao/wang/tang/lovell), cross-lineage rate correction §3 (sensalari), syntenic-depth ploidy §4 (tang), method-reality §5 (chen/qiao/wang/tang), birth-death corroboration §6 (CAFE refs), rugged small-sample §7 (vanneste). But the skill's **doer pipeline** — `wgd dmd→ksd→syn→mix`, MAPS/Whale.jl phylogenomic placement, ELMM, subgenome phasing, the 14-branch decision tree, per-tool version table — is **out of scope**, a stated caveat. |
| **Validity axis** (the invalidity patterns the referee catches) | **High** | Every axis note-traced: saturation-peak false-positive + fade false-negative (vanneste §5/§6/§9), paranome/tandem contamination (qiao adjacency + wang block criteria + tang/lovell tandem-collapse), uncorrected cross-lineage placement (sensalari oil-palm τ), single-peak≠ploidy (tang syntenic depth), false-tool-identity (chen i-ADHoRe, qiao class set), bounded birth-death corroboration (han error-inflation + de-bie no-FDR). Strongest layer — same finding as research/05 and the sibling probe. |
| **Defaults / thresholds** | **Low — recovered as *discipline*, not as portable numbers** | Mold **refuses** the invented cutoffs: it declines a universal Ks cutoff (§1 `[GAP]`, species-dependent), declines a hard outgroup minimum (§3 `[GAP]`, "paper says ≥1, docs advise 3–4"), declines a minimum anchor-pair count for a genome-wide WGD verdict (§2 `[GAP]`), declines a bin-width/sample floor (§7 `[GAP]`). The *sourced* numbers it does carry are exact and artifact-tagged (wgd `--kscutoff` default 5 vs paper 2–3; DupGen `-d` default 10; MCScanX block score>250/≥5 pairs/gap<25/E<1e-5; ksrates `max_number_outgroups`=4). The skill's flat numbers (Ks<1.5, tandem=5, proximal 5–25, ≥2 outgroups, BUSCO>90%) are the exact set the mold either refutes or holds as convention. Mirrors research/05 #2. |

Recovered traceably: the **entire referee/validity spine** — a cast Mold flags exactly the method-validity failures a WGD reviewer would raise, each flag citing a verified note, and four of those flags catch the real skill's own errors (§3 below). Not recovered: the skill's **doer breadth** (pipeline CLI, phylogenomic-placement tools, decision tree, cohort gotchas) and the **threshold numbers** (correctly refuted or held as convention, not fabricated).

---

## 2. GAP taxonomy → next actions

**Candidate Mold's flagged gaps** (the honest count, as blind-assembled — literal `[GAP]` markers in §0–§7 + hypothesis-flagged CAFE refs):

| Flag (artifact) | Bucket | Action | Primary accessibility |
|---|---|---|---|
| No turnkey separator of saturation-peak vs real WGD peak; no universal Ks cutoff (§1 `[GAP]`) | **convention / genuinely-open-problem** | Correct refusal. Vanneste diagnoses the artifact and bounds reliability (2–2.5) but leaves the operational separator unresolved — this is a real open problem, not a missing note. Keep species-dependence explicit. | vanneste **PAYWALLED** (OUP, no PMC; own-words note). |
| No minimum anchor-pair COUNT that legitimizes a genome-wide WGD verdict (§2 `[GAP]`) | **convention / re-summarize** | Block-level cutoffs exist (tang score>300, MCScanX ≥5 pairs/score>250, GENESPACE blkSize=5) but gate a *block*, not a WGD call. A genome-wide anchor-count rule would need a **new source note** or is convention. | qiao/wang/lovell **OPEN**; tang paywalled-but-mirrored. |
| No hard outgroup minimum; no Ks ceiling for rate correction (§3 `[GAP]`) | **convention, not citable** | Correct. Paper says ≥1; docs advise 3–4 (convention/manual). No Ks<X bound for correction exists in the source — do not invent one. | sensalari paper **PAYWALLED** (all-rights-reserved); refutation drawn from **OPEN** GPL docs/repo. |
| No sourced bin-width / minimum-pair count for "rugged" small-sample peak (§7 `[GAP]`) | **convention / re-summarize** | Vanneste notes the effect qualitatively; bin-width partially ABSENT. A sourced number would need a mixture-model-diagnostics primary. | vanneste **PAYWALLED**. |
| CAFE-burst-as-WGD-corroboration is design inference, not sourced (§6 `[GAP]` + hypothesis-flagged refs) | **new source note** (if kept) | The three CAFE notes cover gene-family evolution generally, **not WGD detection**; the link is the mold's inference (honestly flagged hypothesis-evidence). To keep §6 as a real axis, ingest a primary that explicitly ties an expansion burst to a WGD, else demote to a soft robustness note. | de-bie/mendes **OPEN**; han **restrictive**. |

**Highest-value SILENT gaps** — real-skill content **no ingested note surfaced**, so the blind Mold could not flag it at all. A memory-written skill states these freely; the traceable Mold is silent — that asymmetry is the find:

1. **Synteny-block *synchrony* (per-block Ks IQR overlap) as the true-WGD vs sequential-duplication discriminator.** SKILL: "Synteny block synchrony (per-block Ks IQR overlap) confirms true WGD over sequential duplications" + failure mode "Synteny block age inconsistency." The mold recovers synteny-*anchoring* (§2) but **no note** grounds the block-age-synchrony test as a discriminator. → **new source note** (a WGD-block-synchrony method primary) or convention. Highest-value silent gap — it is a distinct validity axis the notes never touched.
2. **Dosage-balance / biased post-WGD retention.** usage-guide overview: "subsequent gene loss is biased… (Birchler & Veitia 2007 gene balance hypothesis)"; "post-WGD retention bias." **No note** covers dosage balance. Biology-explanatory, not a validity axis, but genuinely absent. → **new source note** (Birchler & Veitia 2007) only if it enters scope.
3. **Phylogenomic placement for Ks-saturated ancient WGDs (2R/3R): MAPS, Whale.jl, POInT, SLEDGe.** SKILL threads this as the remedy when "Ks is saturated." The mold *correctly* refuses to treat absence-of-Ks-peak as absence-of-WGD (§1 fade) but offers **no positive phylogenomic method** — deliberately deferred, acknowledged, so **not truly silent**. → deferred scope; **new source notes** (Whale.jl Zwaenepoel 2019 **OPEN**; MAPS Li 2018) when phylogenomic placement is in scope.
4. **wgd v1 (arzwa/wgd) vs v2 (heche-psb/wgd) deprecation + output diff.** SKILL tip + failure mode. chen-2024 §10 confirms v2 supersedes the 2018 wgd but **could not verify the "arzwa/wgd" repo string**. → convention/version-pin, do not assert the repo string as sourced.
5. **BUSCO/Compleasm > 90% completeness gate.** SKILL states it flat; **no note** grounds the 90% number. → **convention** (the number), same as the sibling probe's BUSCO≥90%.

> No post-blind sourcing was done for this probe — **we stop after Phase 4.** The paywalled load-bearing primaries above (vanneste, sensalari paper body) are flagged as Phase-5 surrogate-recovery targets, **not hunted**: the vanneste saturation bounds and the sensalari outgroup facts are already recovered from an accessible surface (HTML fetch / GPL docs), so surrogate recovery would harden provenance, not fill a hole.

---

## 3. The confabulation catches

The sharpest result: the SKILL.md contains method-fact errors the notes corrected from primary sources. The candidate Mold's `false-tool-identity-caught` and `no-invented-universal-Ks-cutoff` evals would flag each. Verified against the fetched text:

**(a) `wgd syn` collinearity engine → GENUINE ERROR.**
Skill says MCScanX: usage-guide "Identify synteny anchors with **wgd syn (MCScanX-based)**" and Prerequisites "**MCScanX (dependency for wgd syn)**." The SKILL body names no engine for `wgd syn` (so it never states i-ADHoRe — a compounding omission).
Primary (chen-2024 §6/§12-Q2): paper "Multiplicons are reconstructed from collinearity searches conducted with **i-ADHoRe (v3.0.01)**"; CLI docstring "Co-linearity and anchor inference using I-ADHoRe"; source calls `run_adhore`/checks `i-adhore`; "**MCScanX appears nowhere.**" → confirmed error. (MCScanX *is* correctly a DupGen_finder dependency — the skill mis-routed it to `wgd syn`.)

**(b) DupGen_finder classes → GENUINE ERROR.**
Skill says "segmental": SKILL class list "tandem, proximal, dispersed, **segmental**, WGD"; usage-guide identical.
Primary (qiao §5/§6/§12-Q1): the five classes are **WGD, tandem, proximal, transposed, dispersed**; "**'segmental' is NOT a class label**" — it occurs only in the `-a` option text ("are segmental duplicates ancestral loci or not?"). The skill **dropped the real `transposed` class** and substituted a non-existent `segmental`. → confirmed error, on two counts (invented class + lost class).

**(c) DupGen tandem/proximal windows → GENUINE ERROR.**
Skill says tandem=5, proximal 5–25: Quantitative-Thresholds "**Tandem: 5 genes default**" / "**Proximal: 5–25 genes**".
Primary (qiao §5/§6/§12-Q2, verbatim README): a **single** `-d number_of_genes(maximum distance to call proximal, default: 10)`; "**tandem = directly adjacent (0 intervening genes)**… adjacency is the definition… **no separate tunable tandem-count parameter**… **no separate tandem/proximal pair of windows**." Paper: "Proximal gene pairs were defined as non-tandem pairs separated by **10 or fewer** genes." → both numbers wrong; the entire two-window framing is fabricated (the note flags "tandem=5, proximal 5–25" by name as the downstream error).

**(d) ksrates outgroups → GENUINE ERROR (fabricated threshold), softest of the four.**
Skill asserts ≥2: "KsRates minimum outgroups: **>= 2** species at different distances"; usage-guide "at least two outgroup species."
Primary (sensalari §8/§10/§12-Q2): the paper "states **NO hard minimum**" (speaks of "an outgroup species" = ≥1); the docs *advise* "**at least 3 or better 4**" (`max_number_outgroups` default 4). "≥2" matches neither — it invents a hard floor the paper doesn't state and undercuts the docs' 3–4 advice. Directionally sane (you need >1 to buffer outlier adjustments) but **not sourced**; a fabricated numeric requirement. The candidate mold flagged it as `[GAP]` — correct.

**Bonus catch — invented universal Ks cutoff.** Beyond the four: SKILL "**Ks < 1.5** for reliable inference; >= 2 saturated" and attributes "**valid range: Ks < 1.5**" to KsRates. vanneste §8/§10: no universal cutoff (species-specific; usable to ~2; mixture ceiling 2–2.5). sensalari §12-Q4: the Ks<1.5 bound is **absent** from ksrates; "1.53" is an example value, not a threshold. Two mis-attributions the mold's `no-invented-universal-Ks-cutoff` eval and §1/§3 `[GAP]`s directly refute.

Net: **five** confabulation catches, four of them the exact planted-flaw fixtures in `scenarios.md` (`false-tool-identity-wgd-mcscanx`, `false-duplication-class-vocabulary`, the Ks-cutoff and cross-lineage cases). The skill *is* the fixture.

---

## 4. What the Foundry adds

The candidate Mold implies an **empirical referee/gate** the SKILL states as flat prose but cannot trace — and here the gate would catch the skill's **own** errors:

- **`false-tool-identity-caught`** (eval.md, deterministic) — "a stated-but-false method fact must be FLAGGED, not rationalized." **Concrete payoff:** run against this skill it flags **wgd syn "MCScanX"** (chen-2024: i-ADHoRe), the **DupGen "segmental" class** and the **"tandem=5 / proximal 5–25" windows** (qiao: transposed not segmental, adjacency + `-d` default 10). The scenarios `false-tool-identity-wgd-mcscanx` and `false-duplication-class-vocabulary` are the planted fixtures; the skill matches them verbatim.
- **`no-invented-universal-Ks-cutoff`** (eval.md) — "must treat the Ks boundary as species-specific; must not assert a single universal numeric cutoff as if sourced." **Concrete payoff:** catches the skill's "**Ks < 1.5**" universal cutoff and its Ks<1.5-attributed-to-ksrates line (vanneste: species-dependent; sensalari: absent). This is the project's own anti-invention failure mode turned into a check.
- **`saturation-peak-never-passed` + `fade-not-treated-as-absence`** — the two-sided saturation axis (a high-Ks peak may be a saturation artifact; absence of a high-Ks peak is not absence of WGD). The skill states saturation as a one-line caveat and a flat "use MAPS/Whale.jl" remedy; the Mold turns it into a pass/flag obligation grounded in vanneste's simulated 2.8→4.4 peak mobility and L-shaped-background fade.
- **`gate-obligation-honored`** — "every PASS is conditioned on the axes actually cleared; every unmet axis produces a named flag with the clearing evidence stated." The `valid-anchor-Ks-WGD` negative control PASSES only after clearing saturation, anchor-identity, rate-correction and depth — the never-self-certify posture the skill's fluent prose lacks.

The specific payoff, named: **the trace would have caught the memory-authored method errors this skill ships as fact** — MCScanX-for-wgd-syn, the "segmental" class, the invented tandem/proximal windows, the ≥2-outgroup floor, and the universal Ks<1.5 cutoff are precisely the "regenerates content, including specifics, from memory — fuzzy ones included" failure the Foundry pattern exists to prevent (research/05 thesis). A note-backed referee flags all five; the memory-written skill asserts all five.

---

## 5. Where bioSkills leads

Credit honestly (shared strengths are *similarity, not our edge*):

- **CLI / version-compat rigor.** SKILL pins wgd v2.0.31+, KsRates 1.1.3+, MAPS 1.0, Whale.jl 2.0+, PAML 4.10+, DIAMOND 2.1+, mclust 6.1+, Python 3.10+, R 4.4+, with a Common-Errors table and per-tool notes. The Mold carries **none** of this operational layer — and the notes explicitly *couldn't* corroborate several pins from the primaries alone (chen-2024 §1 had to read the v2.0.38 source directly; sensalari CLI facts are docs-level, not in the paywalled paper).
- **Phylogenomic-placement breadth we deferred.** MAPS, Whale.jl native WGD modeling, POInT, SLEDGe — the whole "when Ks is saturated, place on the tree" toolkit for ancient 2R/3R WGDs. The Mold refuses the *false negative* (absence≠absence) but offers no positive phylogenomic method; genuine skill content, out of our scope.
- **Tool coverage + embedded stats.** GMM/ELMM with BIC over 1–5 components, subgenome phasing (SubPhaser/GENESPACE), dosage-balance retention biology, decision tree by scenario, cohort gotchas (plant/vertebrate/salmonid/polyploid). Stated as competent practitioner prose. The Foundry's distinction is the *automated, note-backed referee* — not better prose, and on breadth + CLI discipline bioSkills is ahead today.

Do not overclaim: the correct calls the skill *does* make (KsRates mandatory for cross-lineage; BH-FDR discipline in the CAFE-adjacent skills; DupGen to separate tandem-driven peaks; "use synteny anchors, not raw paranome") are **shared** with the Mold — similarities, not our edge.

---

## 6. Bottom line

Sharpest **recovered-traceably win:** the validity axis reconstructs in full and *self-defends* — the Mold's `false-tool-identity-caught` and `no-invented-universal-Ks-cutoff` evals would flag **five** of the real skill's own method-fact errors (wgd-syn "MCScanX," DupGen "segmental," tandem=5/proximal 5–25, ksrates ≥2 floor, universal Ks<1.5), four of which are already its planted scenario fixtures. Sharpest **gap (as blind-assembled):** the **synteny-block-synchrony (per-block Ks IQR) discriminator**, **dosage-balance retention**, and the **phylogenomic-placement toolkit** (MAPS/Whale.jl/POInT/SLEDGe) are silent or deferred — no ingested note surfaced the first two, and the third was scoped out; a memory model states all freely, the traceable Mold cannot (the highest-value asymmetry). The paywalled load-bearing primaries (vanneste saturation bounds, sensalari paper body) are Phase-5 surrogate targets — flagged, **not hunted**, since both are already recovered from accessible surfaces.

Honest recoverability: of the skill's **referee-relevant** content (saturation, anchor-vs-paranome, cross-lineage rate correction, ploidy-by-depth, tool/param reality), **~80%** recovers traceably from the ingested notes (validity axis High, thresholds correctly refuted or held as convention). Of the **whole** skill, closer to **~45–50%** — the wgd/DupGen/KsRates CLI pipeline, MAPS/Whale.jl phylogenomic placement, subgenome phasing, decision tree, and version table were **deliberately out of scope**, a stated caveat, not a silent failure. Consistent with research/05's thesis: **the content was never the moat; the trace is** — and here the trace does not merely match the skill, it *audits* it, catching five method-fact errors the memory-written skill ships as fact.
