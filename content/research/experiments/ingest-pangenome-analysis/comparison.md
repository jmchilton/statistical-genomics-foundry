# Recoverability probe: `comparative-genomics/pangenome-analysis`

> Phase-4 compare. Real bioSkills SKILL.md (`bio-comparative-genomics-pangenome-analysis`,
> `primary_tool: Panaroo`) vs. blind-assembled candidate Mold `audit-pangenome-claim` (Family-B
> referee, Gate 0 + route + B1–B6 + E1–E6 + verdict; 13 eval properties; 16 scenarios; 2 literal
> `[GAP]` markers), built from 9 ingested notes (panaroo, tettelin-2005, tettelin-2008, ppanggolin,
> roary, anvio-pan, minigraph-cactus, hprc, cactus).
>
> **Domain twist — same as all three siblings:** the SKILL.md is a **tool-orchestration doer**
> (18+ tools catalogued, per-tool CLI, version-compat block, 4 runnable pipelines, install recipes).
> The Mold captures only the **validity referee** (pangenome-artifact-read-as-biology), not the doer
> breadth. **Sharpest contrast with the synteny sibling:** there the primary tool's numbers traced;
> here the *load-bearing referee threshold* (open/closed rule) is behind a **paywall** (Tettelin
> 2008, Elsevier), so one decision rule is genuinely unrecoverable — and the skill fills that void
> with a **confabulated tool (PANGEA)** and several drifted numbers the Mold's notes flatly
> contradict.

## 1. Recoverability by layer

| Layer (tool-orchestration skill) | Grade | Evidence |
|---|:---:|---|
| **Procedure spine** = tool-selection + per-tool CLI + version-compat (18+ tools; 20-row decision tree; Panaroo/PPanGGOLiN/PEPPAN/MC/PGGB/vg invocations; 4 pipelines; conda recipes) | **Low as skill-spine; High as *referee-audit* spine** | Mold is Family-B, out-of-scope for the doer catalogue by design. What recovers traceably is the audit walk: Gate 0 provenance (tool/version, genome count, threshold, reference) → Gate 1 route bacterial-gene-content vs eukaryotic-graph → B1 annotation-inflation (tonkin-hill) → B2 sampling-dependence (tettelin-2005) → B3 threshold/attribution (tettelin-2005 + roary + ppanggolin) → B4 openness-test (tettelin-2005 + paywalled 2008) → B5 method/label-inversion (ppanggolin + anvio-pan) → B6 out-of-scope input → E1 reference-bias (MC) → E2 repetitive-overclaim (hprc) → E3 builder-topology (hprc) → E4 clipping-as-absence (MC + hprc) → E5 masking (cactus) → E6 divergence (cactus) → verdict. |
| **Validity axis** = pangenome-artifact-read-as-biology (annotation-inflation, sampling-dependence, threshold-mismatch, openness-overclaim, method-mischar/label-inversion, out-of-scope, reference-bias, repetitive-overclaim, builder-topology, clipping-as-absence, masking, divergence) | **High** | Every cardinal sin note-traced. Strongest layer; mirrors `research/05` + all three siblings. **Four gates land *more correct than the skill*:** B1 states the real **~tenfold** inflation (skill says 30–50%); B3 flags the **cloud-band-to-Tettelin / shell-band-to-PPanGGOLiN mis-attribution** (skill asserts them); B5 states **BMM+EM+MRF, K by ICL** (skill says "Hidden Markov partition"); E1 states MC is **reference-anchored, VCF reference-relative** (skill's decision tree treats MC/PGGB as interchangeable graph builders). |
| **Defaults / thresholds** = concrete numbers | **Medium — split by role** | **Descriptive tool-defaults trace** with citation: anvi'o `--minbit 0.5`/`--mcl-inflation 10` (anvio-pan §5); PPanGGOLiN MMseqs2 **80% identity / 80% coverage** (ppanggolin §7 — the skill's "80% coverage" is **accurate**); Panaroo CD-HIT 98% / collapse 70% / mistranslation 95%+99% (panaroo §5); Roary BLASTP **default 95%**, core **≥99%** (roary §7); Tettelin `Fs/Fc` equations, Ω≈1806, tg(θ)≈33 (tettelin-2005 §7). **But the two load-bearing *referee-decision* thresholds are GAP'd:** the open/closed inequality + min-genome count (Tettelin 2008, **paywalled** → Gate B4 `[GAP]`) and the numeric inflation/tool-gap cutoff (**convention, in no primary** → Gate B1 `[GAP]`). Both correctly refused, not fabricated. |

**Recovered traceably:** the entire referee/validity spine, each gate citing a verified note, plus
the descriptive tool-default numbers. **Not recovered:** the doer breadth (18+ tool taxonomy,
20-row decision tree, per-tool CLI, version-compat, 4 pipelines, install recipes) and the two
referee-decision thresholds (correctly held as paywall-GAP / convention, not confabulated).

## 2. What the skill asserts that the notes CONTRADICT

All seven suspected confabulations verified. Ranked by severity; **silent** = the skill states it
flat with no flag, so the blind assembler could not even mark it (it never saw the skill, and — for
items 1–3 — no ingested note covers the tool at all).

| # | Skill claim | What the notes say | Class | Silent? |
|---|---|---|---|---|
| **1** | **"PANGEA (in development by DGI / Diploid Genomics) … PGR-TK's successor … cschin/pgr-tk archived April 2026 → PANGEA"** | **Zero note support.** PGR-TK / PANGEA / DGI / "Diploid Genomics" appear in **none** of the 9 notes (no PGR-TK source was ingested). Phase-1 web search: zero corroboration for PANGEA, a "Diploid Genomics" successor, or an April-2026 archival. The skill self-covers with "check repo for current pointer." | **confabulated tool/citation** | **Yes** — silent on both sides |
| **2** | anvi'o pangenomics **"Eren 2021 Nat Microbiol 6:3"** | delmont-eren-2018 §194 **explicit**: the pangenomic *workflow* was "developed for this study" = **Delmont & Eren 2018 PeerJ 6:e4320**. (Eren 2021 Nat Microbiol is the anvi'o *platform* commentary, not the pangenomics-workflow paper.) | **mis-attribution** (wrong paper) | **Yes** |
| **3** | `vg autoindex … --ref-graph … --output` — while an earlier line uses `-r ref.fa -v variants.vcf.gz` (internally inconsistent) | **No vg note ingested → not note-checkable here.** Per Phase-1 external check the flags are renamed/invented (real autoindex: `-r/--ref-fasta`, `-v/--vcf`, `-g/--gfa`, `-p/--prefix`). The skill contradicts *itself* between the two invocations. | **invented/renamed flag** (Phase-1; not note-verifiable) | **Yes** — out of note + Mold scope |
| **4** | PPanGGOLiN **"Hidden Markov partition"** + **"shell 5–95% per PPanGGOLiN"** band | ppanggolin §12: it is a **Bernoulli Mixture Model fit by EM, coupled to a hidden Markov *Random Field*** over the pangenome graph, K by ICL — **not an HMM**; and it is **"not based on frequencies"** → no fixed %-bands. (The separate "80% coverage" clustering param **is** accurate.) | **method-mischaracterization** (HMM) + **threshold-over-claim** (5–95% band) | No — Mold **catches** (B5+B3) |
| **5** | HPRC **"90 haplotypes, ~6.4M variants"** | liao-2023 §120/§124 **explicit**: **94 haplotypes** (47 phased diploid assemblies); MC graph = **22M small variants + 67,000 SVs**. | **quantitative-drift** | **Yes** — Mold holds correct nums (E2/E4) |
| **6** | **"Cloud genome <15% \| Tettelin 2005"**; **"Shell 15–95% \| PPanGGOLiN docs"** | tettelin-2005 §10/§138: **only core (=100%) vs dispensable** — **no shell/cloud class, no 15% band**. roary §92/§111: **only core ≥99%**, no bands. Attributing a `<15% cloud` band to Tettelin 2005 is a clean fabrication (that paper has no cloud class). (Skill's "Tettelin 2005 used 100%-presence = core" **is** accurate.) | **mis-attribution** | No — Mold **catches** (B3) |
| **7** | **"Roary inflates accessory 30–50%"** | tonkin-hill §6/§12: **nearly tenfold** — competing tools 2584–3670 accessory vs Panaroo; *K. pneumoniae* 99%-core Roary **1800** vs Panaroo **3372/3376**. "30–50%" is in **no** note; it understates the benchmark by roughly an order of magnitude. | **quantitative-drift** | No — Mold holds tenfold (B1) |

**Pattern:** the three *silent, uncatchable* items (1 PANGEA, 2 Eren-2021, 3 vg-flags) are all
**tool/citation/CLI confabulations outside the notes' coverage** — no ingested source touches
PGR-TK, the anvi'o platform paper, or vg. The four the Mold *does* catch (4–7) are **method/threshold
claims that fall squarely on ingested notes**, and on all four the Mold is **more correct than the
skill**.

## 3. GAP taxonomy → next actions

The Mold marked **2 literal `[GAP]`** markers. Sorted:

| GAP (Gate) | Bucket | Accessibility | Action |
|---|---|---|---|
| **B1: numeric inflation / tool-to-tool-gap cutoff** ("how much inflation crosses into artifact") | **convention / absent-from-primary** | n/a — tonkin-hill gives qualitative signatures (grows-with-N; large inter-tool gap; ~59% fragmentation / ~10% inconsistent-calls) but **no cutoff** | Label convention; keep as a judgment call. Nothing to hunt. |
| **B4: open/closed decision rule** (growth-law form, exponent symbol, boundary value, min-genome count) | **re-summarize existing — BLOCKED by paywall** | tettelin-2008 note is a **low-recoverability stub**: Elsevier all-rights-reserved, only abstract readable; secondary sources give *incompatible* conventions (`N^γ` open if γ>0 vs new-genes `∝N^(−α)` open if α≤1 vs "exponent<1") — deliberately **not** backfilled | **The one genuine Phase-5 target.** Re-summarizing Tettelin 2008 is impossible without licensed full text → **find an open-access surrogate** (a CC/OA pangenome-openness review stating the inequality + min-genome count). Until then the referee correctly refuses to certify any specific inequality. |

**Silent gaps** — real-skill content no ingested note surfaced, all by-design (a Family-B referee
doesn't do tool-selection): PEPPAN (Zhou 2020), GET_HOMOLOGUES, PGGB (Garrison 2024), vg/Giraffe
(Sirén 2024), PanGenie (Ebler 2022), PGR-TK/PANGEA, Scoary/pyseer, Bakta, ClonalFrameML — cited in
References but **never ingested**. Scoping caveat, not a confabulation risk for the Mold. The vg CLI
(item 3) is a genuine coverage hole *only if* the referee had to validate exact invocations — it
doesn't; it audits conclusions.

**Honest Phase-5 assessment:** near-empty, with **one real target** the siblings lacked — the
**paywalled openness rule** (Tettelin 2008). Unlike the synteny probe (where the missing threshold
was merely absent-from-primary → convention), here the load-bearing referee threshold *exists in a
specific primary that is paywalled*, so an OA surrogate is the correct Phase-5 move. Everything else
is convention (B1 cutoff) or confabulation the skill invented (PANGEA, Eren-2021, vg-flags, 30–50%,
HPRC numbers).

## 4. What the Foundry adds — with an honest premise-correction

The candidate Mold makes a **checkable, note-cited gate discipline with an executable oracle** where
the SKILL.md states the same knowledge as scattered, untraceable prose:

- **Per-claim traceability.** Every gate names its note (`[[tonkin-hill-2020-panaroo]]`,
  `[[gautreau-2020-ppanggolin]]`, …) and its failure signature; the SKILL.md's "Per-Tool Failure
  Modes," "Reconciliation," and "Anticipated Reviewer Pushback" tables assert rules as **unsourced
  imperatives**.
- **Four gates more correct than the skill** (§2 items 4–7): B1 (real tenfold vs skill's 30–50%),
  B3 (flags cloud-to-Tettelin / shell-to-PPanGGOLiN mis-attribution the skill asserts), B5
  (BMM+EM+MRF vs "Hidden Markov partition"), E1 (MC reference-anchored + reference-relative VCF vs
  the skill's interchangeable-builder framing). A referee run of the Mold against a claim carrying
  these skill errors flags each; the SKILL.md self-certifies them.
- **GAP-refusal as anti-invention** where it's encoded: B4's eval property
  (`catch-underpowered-openness-verdict`) **explicitly forbids** the referee from inventing an
  open/closed inequality or a hard min-genome threshold — the exact void the skill would otherwise
  fill.
- **Executable oracle:** `eval.md` (13 llm-judged catch-the-flaw properties +
  `incomplete-when-provenance-missing`) + `scenarios.md` (15 planted-flaw fixtures + 1 clean
  negative control) make each rule a discriminating test.

**Premise-correction (honest limit).** The compare framing assumed an "anti-invention eval that
would refuse the PANGEA / vg-flag / HPRC-number claims." **This candidate does not encode a general
anti-invention property** — unlike the synteny sibling, whose eval carried explicit
`anti-invention-thresholds-and-citations` + `no-invented-inflation-magnitude` properties. Here the
anti-invention discipline is **narrow**: it lives only inside B4 (openness rule) and B5
(method-mischaracterization). Consequently:
- The Mold **would** catch the confabulations that surface as **method/threshold claims** on
  ingested notes (PPanGGOLiN-as-HMM, shell/cloud band attribution, and — if the number were the
  submitted claim — the 30–50% and 90-haplotype/6.4M drifts).
- The Mold would **not** reliably refuse a **confabulated tool (PANGEA), a wrong citation
  (Eren 2021), or invented vg flags** — those are outside the notes' coverage and outside every
  encoded gate. They are **silent on both sides**. If the Foundry wants the anti-invention edge the
  framing presumes, this candidate should port the synteny sibling's explicit
  anti-invention-of-tools/citations property; as written, it doesn't have it.

## 5. Where bioSkills leads (credit honestly)

Genuine bioSkills strengths the Foundry candidate captures **none** of:

- **Breadth:** 18+ tools across **both** bacterial gene-content and eukaryotic-graph axes in one
  Algorithmic Taxonomy (Panaroo, PPanGGOLiN, PEPPAN, Roary, GET_HOMOLOGUES, anvi'o, MC, PGGB, vg,
  PanGenie, PGR-TK, Heaps/Tettelin, Scoary, pyseer, PIRATE) with approach/output/strength/fails-when
  each; a 20-row experimental-scenario decision tree; a Cohort-Gotchas list. The Mold audits a slice.
- **CLI + version rigor:** version-compat block pinning Panaroo 1.5.1+/PPanGGOLiN 2.2.0+/MC/PGGB
  0.7.5+/vg 1.59.0+ etc., introspection commands (`panaroo --version`, `vg version`), expected error
  strings (`Bakta annotation incompatible`, `GFF file inconsistent`, `vg index version mismatch`),
  **4 runnable pipelines**, install recipes. The Mold has **zero operational layer**.
- **Embedded statistics:** a working `tettelin_partition` + `heaps_law` Python implementation —
  genuine executable method the referee only *audits*.
- **Honest self-labeling of *some* thresholds:** the Quantitative Thresholds table tags several
  sources as "pragmatic" / "Empirical" / "Default" rather than over-citing; and the References list
  **self-corrects** a prior QUAST-LG mis-attribution. The confabulations (PANGEA, Eren-2021, 30–50%,
  HPRC numbers, HMM) are the exception, not the rule — this is **not** a blanket citation-fabricator.
- **The 80%/80% PPanGGOLiN clustering coverage is real** — traces to ppanggolin §7. Not every
  PPanGGOLiN number is wrong; only the "HMM" method label and the "5–95% band" are.

**Do not overclaim.** On tool breadth, dual-axis coverage (bacterial + eukaryotic), CLI/version
discipline, runnable pipelines, and embedded stats, **bioSkills is well ahead here.** The Foundry
captures the validity referee and — on four gates — corrects the skill; it does not do
tool-selection, and (unlike the synteny sibling) it does **not** yet encode a general anti-invention
guard for confabulated tools/citations.

## Bottom line

Sharpest **recovered-traceably win:** the validity axis reconstructs in full and self-defends, and
on **four gates the Mold is more correct than the skill** (real ~tenfold inflation vs 30–50%; flags
the Tettelin-cloud / PPanGGOLiN-shell band mis-attributions the skill asserts; BMM+EM+MRF vs "Hidden
Markov partition"; MC reference-anchored vs interchangeable-builder). Sharpest **honest limits, two
of them:** (1) the doer layer — 18+ tools, decision tree, per-tool CLI, version-compat, 4 pipelines
— is entirely out of a Family-B referee's scope; (2) the candidate lacks a general anti-invention
property, so the **three silent tool/citation/CLI confabulations (PANGEA, Eren-2021, vg-flags) are
uncaught on both sides** — the framing's presumption that the Mold "would refuse" them does not hold
as written. The **one genuine Phase-5 sourcing target** is unique among the probes: an **OA
surrogate for the paywalled Tettelin-2008 open/closed rule** (Gate B4). Cross-probe pattern holds:
confabulated tool/citation/CLI details (PANGEA, Eren-2021, `--ref-graph`) + threshold drift (30–50%,
90-hap/6.4M, cloud-<15%-Tettelin) sit atop a validity axis that recovers well and self-defends. The
content was never the moat; the trace is.
