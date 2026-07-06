# Recoverability probe: `comparative-genomics/whole-genome-alignment`

> Phase-4 compare. Real bioSkills SKILL.md (`bio-comparative-genomics-whole-genome-alignment`) vs.
> blind-assembled candidate Mold `audit-whole-genome-alignment` (Family-B referee, 7 gates / 6
> sub-forms + 6 literal `[GAP]` markers), built from 7 ingested notes. **Domain twist:** identical
> to the sibling annotation-projection probe — this is a **tool-orchestration doer** (15+ aligners
> catalogued, per-tool CLI, version-compat). The Foundry candidate captures only the **validity
> referee** (alignment-artifact-as-biology), not the doer breadth. That asymmetry drives every finding.

## 0. Known-context verification (against the SKILL.md text)

| Claim in skill | What the primary/notes actually say | Verdict |
|---|---|---|
| **`anchorwave proali --ploidy 4`** (CLI line 27; + failure-mode, decision-tree, cohort-gotchas, reviewer-pushback all say "ploidy") | Song 2022 §10/§12 + **current AnchorWave master README**: **NO `--ploidy` flag** (even in latest release). WGD/depth controlled by **`-R` (ref max depth) / `-Q` (query max depth)**, e.g. maize↔sorghum `-R 1 -Q 2`. A nonexistent CLI flag presented as a working command, pervasively. | **confirmed-error (confabulated flag)** |
| **AnchorWave "anchor minimum identity 80% default"** ("AnchorWave docs") | Song 2022 §10/§12: **no 80%, no min anchor-identity threshold.** Identity-adjacent params are relative (`y`=0.6 ratio, `e`=1, novel-anchor filter=0). Self-labeled "docs" but number absent. | **over-claim (absent, hedged to docs)** |
| **Cactus "memory per genome 8-32 GB" → Armstrong 2020** (threshold table) | Armstrong 2020 §10: **ABSENT.** Paper reports only instance-hours / core-hours / instance types (c3.8xlarge, r3.8xlarge). No per-genome RAM figure of any kind. | **over-claim (number not in cited paper)** |
| **Per-clade branchScale 1.0 / 0.5-0.7 / 0.3-0.5** (threshold table "Cactus docs"/"Tuning convention"; failure-mode + reviewer-pushback assert operationally; scaling cited "Armstrong 2020 Supp") | Armstrong 2020 §10: **word "branchScale" never appears; no per-clade scaling numbers.** Partly hedged ("convention") but body/failure-mode present as fact. | **over-claim + convention-mislabel** |
| **nucmer "recommended identity ≥70%" → Marçais 2018** (threshold table + taxonomy) | Marçais 2018 §12: **states NO minimum identity.** Reports identity *outcomes* only (human-chimp 98.07%). Attribution to the paper unsupported. | **over-claim** |
| **minimap2 "accuracy drops below ~70% identity"** (taxonomy, decision tree, failure mode; uncited) | Li 2018 §10/§12: **~70% floor ABSENT from both paper and man page.** No numeric floor exists. | **absent-traces-nowhere** |
| **LASTZ "5000 bp minimum chain length" → "UCSC convention"** (threshold table) | Kent 2003 §6/§12: **5000 does not appear**; no min chain length/score. Skill **correctly self-labels "UCSC convention."** | **convention, correctly labeled** |
| **"HAL version mismatch breaks downstream tools"** (failure mode; no primary cited) | Hickey 2013 §10/§12: **no format versioning, no compatibility policy** stated. Operationally real, but traces to no primary. | **absent-traces-nowhere (operationally real)** |
| **halSynteny** as HAL/Cactus workflow tool (taxonomy, reviewer-pushback "halSynteny for SV", related-skills, workflow) | Named in **NEITHER** Hickey 2013 (§10/§12) **NOR** Armstrong 2020 (§10/§12). A HAL-toolkit repo tool with no defining primary in the corpus. | **absent-traces-nowhere** |
| **"Cactus HAL is TOGA input"** (decision tree line 64; related-skills) | kirilenko §12: TOGA consumes **pairwise LASTZ chains** (axtChain), **not** HAL/halSynteny. A chain-extraction step is required. Skill **partially aware** — Common-Errors row: "TOGA fails 'no chain' → Use halSynteny + UCSC chain conversion." | **imprecise (partially self-aware)** |
| **minimap2 asm5/10/20 preset numbers** (threshold table cites "minimap2 docs") | Li 2018 §12: numbers trace to **man page v2.28, not Li 2018.** Skill **correctly cites "minimap2 docs"** (credit). *But* frames the suffix as a hard %-divergence ceiling; man-page semantics are subtler — asm5 = won't *extend* past 5% (recommended ~0.1% avg); asm10 ~1% avg; asm20 ~several % avg. Only asm5's 5% ceiling is explicit; "≤10%/≤20%" is summarizer-inferred. | **citation honest; suffix-semantics imprecise** |
| **LASTZ "identity range 60-99%; 50% with HoxD55" → "LASTZ docs"** (threshold table + decision tree) | LASTZ primary (Schwartz 2003) is **cited in References but never ingested**; traces to no ingested primary. Self-labeled "LASTZ docs." | **convention/docs (not ingested; honest self-label)** |
| **"Soft-masking required ≥90% of TE families masked" → "Standard QC"** (threshold table) | Armstrong 2020 §10: **no numeric masking target** (only internal coverage>50 / 20%-sampling preprocessing). Self-labels "Standard QC." Number invented but hedged. | **convention, correctly labeled** |
| **Cactus "linear with tree / quadratic without" → "Armstrong 2020 Supp Methods"** | Armstrong §6: content **CONFIRMED correct**, but stated in the **main text**, not Supp Methods. | **correct content; minor citation-locus slip** |

---

## 1. Recoverability by layer

| Layer (this being a tool-orchestration skill) | Grade | One-line evidence |
|---|:---:|---|
| **Procedure spine** = tool-selection + per-tool CLI + version-compat (15+ aligners; decision tree; Cactus/LASTZ/minimap2/nucmer/AnchorWave invocations) | **Low as skill-spine; High as *referee-audit* spine** | The Mold is a Family-B **referee**, not a doer — recovers none of the taxonomy/decision-tree/CLI/version layer (out of scope by design). What it recovers traceably is the artifact-audit walk: Gate 0 provenance → Gate 1 route-by-alignment-type → 2A reference-bias (kent §6), 2B false-absence/sensitivity (li §7/§9 + marcais §7/§9), 2C masking (armstrong §5/§9 + kent §5), 2D guide-tree/ancestral (armstrong §5a), 2E HAL-version/tooling-mismatch (hickey §10 + kirilenko §12), 2F WGD-depth (song §7), Gate 3 verdict synthesis. |
| **Validity axis** = alignment-artifact-read-as-biology (reference-bias, false-absence, masking, guide-tree, HAL-version, WGD-depth, format-mismatch) | **High** | Every artifact class note-traced: reference-bias asymmetry (kent §6 target-net≠query-net, exact mechanism recovered); false-absence-below-ceiling (li asm5 "won't extend past 5%" + marcais "3-5% fewer reads, long-exact-seed"); masking-blowup (armstrong "requires soft-masked" precondition); guide-tree-corrupts-ancestral (armstrong ancestral-per-node); HAL-version-no-policy (hickey §10, handled *honestly* as absence); WGD-depth under/over-match (song `-R/-Q`); HAL→TOGA format-mismatch (kirilenko chains-not-HAL). Strongest layer — mirrors sibling probe + research/05 #1. **Notably the Mold's reference-bias remedy *converges with the skill's own* "run chain/net both directions."** |
| **Defaults / thresholds** = concrete numbers | **Low as numbers; recovered as *discipline*** | 6 literal `[GAP]` markers refuse every un-sourced threshold: 5000-bp chain (Gate 2A), ~70% identity floor (2B), %-masked target (2C), guide-tree-quality/branchScale bar (2D), anchor-identity 80% + `-R/-Q` diagnostic (2F), combined-confidence rubric (Gate 3). Recovered numbers are exactly those the primaries *do* state (asm5 5%-non-extension; nucmer 3-5% sensitivity loss; Cactus coverage>50 / 20%-sample; Song `-R 1 -Q 2`, `y`=0.6, `<20 bp` exon; Armstrong F1 0.989/0.795). The refused ones split: **contradict/confabulate** (`--ploidy`) vs **absent-from-primary → convention** (5000 bp, 70%, 80%, 8-32 GB, branchScale). Both correctly refused. |

**Recovered traceably:** the entire referee/validity spine — a cast Mold flags exactly the artifact
sub-forms, each citing a verified note, and *self-defends* via `anti-invention-threshold-is-convention`.
**Not recovered:** the doer breadth (15+ tool catalogue, decision tree, per-tool CLI, version-compat,
chain/net + pangenome recipes) and the invented threshold numbers (correctly held as
convention/confabulation, not fabricated).

---

## 2. GAP taxonomy → next actions

**The Mold's 6 literal `[GAP]` markers, sorted:**

| GAP (Gate) | Bucket | Accessibility | Action |
|---|---|---|---|
| 2A: no numeric min chain length/score (5000 bp) | **convention, not citable** | n/a (absent from Kent 2003) | Label UCSC convention; nothing to hunt. |
| 2B: no numeric identity floor (~70%) | **convention / absent-from-primary** | n/a | Li + Marçais **explicitly state none**; re-summarizing wins nothing. Keep qualitative. |
| 2C: no %-masked target (≥90% TE) | **convention, not citable** | n/a | Armstrong gives only internal coverage>50/20%-sample; flag ≥X% as unsourced. |
| 2D: no guide-tree-quality metric / branchScale bar | **convention + absent-from-primary** | n/a | branchScale absent from Armstrong; require tree be stated/rooted but flag the numeric bar unsourced. |
| 2F: no `-R/-Q` mis-set diagnostic; no 80% anchor-identity | **convention / summarizer-inferred** | Song = **OA (CC BY-NC-ND)** but already own-words ingested and **states no such diagnostic/number** | Re-summarize buys nothing on the number; under/over-match is summarizer-inferred. Convention. |
| Gate 3: no combined-confidence rubric | **convention, not citable** | n/a | Design synthesis; flag pending a source defining combined scoring. |

**Silent gaps** — real-skill content no ingested note surfaced (highest value):

1. **The whole doer layer is silent *by design, not by miss*:** Minigraph-Cactus (Hickey 2024),
   Multiz, SibeliaZ (Minkin 2020), progressiveMauve (Darling 2010), Winnowmap2 (Jain 2022), LASTZ
   internals (Schwartz 2003) — all cited in the skill's References but **never ingested**, because a
   Family-B referee doesn't do tool-selection. Scoping caveat, not confabulation risk.
2. **LASTZ-specific validity content** (HoxD55 for distant genomes; softmask-honored-at-seeding; 6-bp
   seeds) has **no ingested primary** — the LASTZ paper wasn't summarized, so the Mold's masking gate
   (2C) leans on Kent's RepeatMasker/TRF, not LASTZ seeding behavior. A genuine coverage hole *if* the
   referee needed LASTZ-tuning depth.
3. **halSynteny + chain-generation cascade** (`Cactus HAL → halSynteny → axtChain → chainNet → TOGA`)
   is *both* uncovered by the notes *and* partly wrong in the skill (halSynteny absent from both
   Cactus + HAL primaries; TOGA consumes LASTZ chains). A memory model asserts this pipeline
   confidently; the traceable Mold correctly never asserts it, and its Gate 2E flags the HAL→TOGA feed
   as a format artifact.

**Honest Phase-5 assessment:** as with the sibling probe, **most failed-to-trace numbers are
absent-from-primary → convention** (5000 bp, ~70%, 80%, 8-32 GB, branchScale, ≥90%-masked — none exist
in *any* ingested primary). **Phase 5 has little to hunt.** The one real net-new target would be a
**LASTZ primary/docs note** (Schwartz 2003, or the LASTZ manual — accessible) *if* the referee is to
cover distant-genome/masking tuning. Everything else is convention or confabulation.

---

## 3. Citation-integrity findings (ranked by severity)

1. **Confabulated CLI flag (sharpest).** `anchorwave proali --ploidy 4` — a **nonexistent flag
   presented as a working command**, and the confabulation is *pervasive* (CLI, failure-mode
   mechanism with 1/2/4 values, decision tree, cohort gotchas, reviewer pushback). Real control is
   `-R`/`-Q` (verified against the current AnchorWave master README, not just the v1.0.0 paper). This
   is a strictly harder failure than a wrong number: the command doesn't run. The Mold's Gate 2F names
   `-R`/`-Q` correctly and explicitly flags "if a claim cites `proali --ploidy`, flag as
   version-unverified."
2. **Over-claim: number attributed to a paper that gives none.** (a) Cactus "8-32 GB/genome → Armstrong
   2020" (paper gives only instance/core-hours). (b) nucmer "≥70% identity → Marçais 2018" (paper
   states no min identity). (c) branchScale per-clade numbers implicitly leaning on Armstrong (word
   never appears). All are the "refs real, glosses wrong" asymmetry — indistinguishable from correct
   without the trace. `anti-invention-threshold-is-convention` names each.
3. **Absent, traces nowhere (uncited or doc-hedged).** minimap2 "~70% identity floor" (absent from
   paper + man page, stated as fact); halSynteny (no defining primary in corpus); "HAL version
   mismatch breaks downstream" (operationally real, no primary); AnchorWave 80% (hedged "docs" but
   absent).
4. **Imprecise (partially self-aware).** "Cactus HAL is TOGA input" — needs a chain-extraction step;
   the skill's own Common-Errors row half-knows this. minimap2 suffix-as-hard-%-ceiling vs man-page
   average-divergence semantics.
5. **Convention, correctly labeled (credit).** 5000-bp chain → "UCSC convention"; ≥90%-masked →
   "Standard QC"; asm5/10/20 → "minimap2 docs"; LASTZ 60-99% → "LASTZ docs"; N50 ≥1 Mb → "Standard
   convention." The skill *does* hedge a large fraction of its thresholds honestly — a genuine strength.

---

## 4. What the Foundry adds

The candidate Mold implies a **checkable, note-cited gate discipline with an executable oracle** where
the SKILL.md states the same knowledge as scattered, untraceable prose:

- **False-absence gate (2B)** ⟵ SKILL "minimap2 sensitivity loss at <70% identity" (Fix: "switch to
  LASTZ"). The Mold makes it an executable criterion keyed on the *aligner's actual ceiling* (asm5
  won't extend past 5%; nucmer long-exact-seed) — and **refuses the un-sourced 70% floor** the skill asserts.
- **Reference-bias gate (2A)** ⟵ SKILL "Reference bias in LASTZ chain/net" (Fix: "run both
  directions"). The Mold's remedy **converges with the skill's** but grounds it in Kent's exact
  net-asymmetry mechanism (`target-net ≠ query-net`), and its `catch-reference-bias-flip` property is a
  catch-the-flaw oracle.
- **WGD-depth gate (2F)** ⟵ SKILL "AnchorWave WGD parameter mis-set." The skill states the failure but
  with the **confabulated `--ploidy`**; the Mold states the *real* `-R`/`-Q` control and flags any
  `--ploidy` citation. A rare case where the referee is not just more traceable but **more correct**
  than the skill.
- **HAL-tooling-mismatch gate (2E)** — no clean SKILL analog beyond a buried Common-Errors row. Pure
  Foundry add: TOGA needs LASTZ chains, not a HAL; feeding HAL directly is a plumbing artifact.
- **Anti-invention discipline.** `anti-invention-threshold-is-convention` would catch the skill's own
  errors — it explicitly refuses the 5000-bp chain, ~70% floor, %-masked target, 80% anchor-identity,
  and combined-confidence score. A Foundry referee run against this SKILL.md flags them; the SKILL.md
  self-certifies.

The skill has **no executable oracle** — its "Anticipated Reviewer Pushback," "Reconciliation," and
"Common Errors" tables assert rules as unsourced imperatives. The Mold's eval.md (8 properties, incl. a
`deterministic` anti-invention check) + scenarios.md (7 planted-flaw fixtures + a `clean negative
control` human-chimp case) make each a fixture-bound, catch-the-flaw test tuned not to reject everything.

---

## 5. Where bioSkills leads (credit honestly)

This SKILL.md is a **strong** showcase of bioSkills' CLI-integration rigor, and the Foundry candidate
captures **none** of it — genuine bioSkills strength, not our edge:

- **Breadth:** 15+ aligners catalogued in one taxonomy (Cactus, Minigraph-Cactus, LASTZ/chain-net,
  MUMmer4, minimap2, AnchorWave, progressiveMauve, SibeliaZ, HAL toolkit, Winnowmap2, BLASTZ, Multiz,
  LAGAN…) with approach / output / strength / fails-when for each. The Mold audits a slice.
- **Version-compat + introspection block:** pins Cactus 2.9.1+, HAL 2.3+, LASTZ 1.04.22+, MUMmer
  4.0.0+, minimap2 2.28+, AnchorWave 1.2.5+, plus `cactus --help` / `halStats --help` /
  `minimap2 --version` introspection and expected error strings (`HAL file corrupted`, `Toil workflow
  restart failure`). The Mold has zero operational layer.
- **Runnable workflows:** full Progressive-Cactus, LASTZ+UCSC chain/net, and Minigraph-Cactus pipelines
  with real commands; decision-tree-by-scenario (20 rows); reconciliation-when-methods-disagree;
  per-tool failure-mode table (11 entries); tool-installation recipes. Practitioner depth the referee
  doesn't touch.
- **Honest self-labeling:** a large share of thresholds are correctly hedged to "UCSC convention" /
  "Standard QC" / "minimap2 docs" / "LASTZ docs" / "Tuning convention" — the skill is **not** a naive
  citation-fabricator across the board; the confabulations (`--ploidy`) and over-claims (8-32 GB, ≥70%
  nucmer) are the exception, not the rule.

Do not overclaim: on CLI discipline, tool breadth, and runnable-pipeline coverage, **bioSkills is well
ahead here**. The Foundry captures the validity referee and self-defends; it does not do tool-selection.

---

## 6. Bottom line

Sharpest **recovered-traceably win:** the validity axis reconstructs in full *and self-defends* — and on
AnchorWave the Mold is not merely more traceable but **more correct**, naming the real `-R`/`-Q` control
and flagging the skill's confabulated `proali --ploidy` command, exactly the memory-written-CLI failure
the trace exists to catch (the WGA analog of the sibling probe's Turakhia mis-cite). The
anti-invention eval would flag the skill's own un-traceable numbers (8-32 GB / branchScale absent from
Armstrong; ≥70% nucmer absent from Marçais; ~70% minimap2 floor absent from both paper and man page).
Sharpest **honest limit:** the doer layer — 15+ tools, decision tree, per-tool CLI, version-compat,
chain/net + pangenome recipes — is entirely out of a Family-B referee's scope, and the one net-new
sourcing target (a LASTZ primary/docs note) is optional. Of the skill's **referee-relevant** content,
**~85-90% recovers traceably** (validity axis High; thresholds correctly held as convention; Gate
2E/2F even *exceeding* the skill's correctness on HAL→TOGA and `--ploidy`); of the **whole** skill —
overwhelmingly a tool-orchestration doer — far less, since the CLI/decision-tree/version layer is
by-design out of scope. Consistent with the project thesis: the content was never the moat; the trace is.
