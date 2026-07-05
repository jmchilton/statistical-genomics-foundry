# Recoverability probe: `comparative-genomics/synteny-analysis`

> Phase-4 compare. Real bioSkills SKILL.md (`bio-comparative-genomics-synteny-analysis`,
> `primary_tool: MCScanX`) vs. blind-assembled candidate Mold `audit-synteny-claim` (Family-B
> referee, 11 gates + 9 eval properties + 10 scenarios, 6 literal `[GAP]` markers), built from 10
> ingested notes (5 new: wang/goel/lovell/tang/fitch; 5 reused: song/li/marcais/kent/armstrong).
> **Domain twist — same as the two siblings:** this is a **tool-orchestration doer** (13+ tools
> catalogued, per-tool CLI, version-compat, runnable pipelines). The Mold captures only the
> **validity referee** (artifact-read-as-synteny-biology), not the doer breadth. **Key contrast with
> the WGA probe:** here the *primary tool's* numeric defaults (MCScanX) genuinely trace to Wang 2012,
> so the defaults layer is **not uniformly Low**.

## 0. Known-context verification (against the SKILL.md text)

| Claim in skill | What the primary/notes say | Verdict |
|---|---|---|
| **"Fitch 1976 J Mol Evol 7:271 distinction"** (description l.21 + References l.447) for synteny-vs-collinearity | fitch-1976 note: **citation does NOT resolve.** No Fitch paper in J Mol Evol vol 7; page 271 = Zuckerkandl 7:269-311 (protein-evolution, off-topic). Synteny commonly → Renwick 1971; Fitch's real terminology paper = 1970 Syst Zool 19:99 (ortholog/paralog). | **confabulated citation** (sharpest) |
| **`AnchorWave proali mode with ploidy` / `proali with explicit ploidy specification`** (decision tree l.59, cohort-gotchas l.161, reviewer-pushback l.399) | song-2022 §10/§12: **NO `--ploidy` flag.** WGD depth is `-R`/`-Q` (maize<->sorghum `-R 1 -Q 2`). Cross-skill repeat of the WGA skill's identical confabulation. | **confabulated flag (cross-skill)** |
| **"unmasked TEs produce ~100x more false anchor pairs"** (description l.21; failure-mode l.79 "> 10x expected") | wang-2012 §10/§12: **ABSENT** — mechanism + masking/tandem-collapse remedy described but **NO fold/magnitude** quantified. "~100x" traces to no ingested primary. | **over-claim (invented magnitude)** |
| **JCVI `--cscore 0.7/0.95/0.99`** attributed to MCScan/Tang-2008 lineage (taxonomy l.35, thresholds l.173, reconciliation l.370) | tang-2008 §10: strings "cscore/c-score/reciprocal" **absent from full text.** JCVI-software feature; 2008 controls stringency via E-value/best-5/score-300. | **mis-attribution (software, not paper)** |
| **"GENESPACE minimum syntenic block 5 orthogroups (Lovell 2022 default)"** (thresholds l.177) | lovell-2022 §5/§6: blkSize default **5** confirmed, but unit = "**unique HITS**," NOT orthogroups. | **number-right / unit-wrong** |
| **GENESPACE ">30 genomes slow / less rigorous for non-plant clades"** (taxonomy l.36) | lovell-2022 §10/§12 Q6: **no >30 limit, no plant-only restriction.** Paper runs 15 vertebrates + 8 grasses; boundary is genome **complexity**, not clade. | **over-claim (not in paper)** |
| **SyRI INV >=5 kb** as a "biological significance" threshold (thresholds l.175; failure-mode l.131; reconciliation l.369) | goel-2019 §12 Q4: **NO minimum inversion/SV calling size.** "117 translocations >1 kb" is a validation-set descriptor, not a cutoff. INV>=5 kb is asserted un-hedged ("alignment noise dominates"). | **convention-mislabeled** |
| **SyRI TRANS >=1 kb** (thresholds l.176, "standard convention") | goel-2019: no minimum calling size either — but the skill **self-labels it "standard convention."** | **convention, correctly labeled** (credit) |
| **MCScanX `-s 5 / -m 25 / -k 50 / -e 1e-5`; tandem collapse within 5** (pipeline l.213; thresholds l.168-174) | wang-2012 §5/§6: match score **50**, gap penalty -1, gaps **<25**, block score **>250 = >=5 pairs**, E **1e-5**, tandem collapse **within 5 genes** — **all trace.** (Nuance: the CLI flag *letters* `-s/-m/-k/-e` are manual, not the paper.) | **traces correctly (WIN)** |
| **GENESPACE OrthoFinder pin 2.5.4** (failure-mode l.141; install l.443) | lovell-2022 §6: OrthoFinder **v2.5.4**, DIAMOND v2.0.8.146 — **traces.** | **traces correctly** |
| **minimap2 `asm5 <5% / asm10 ~10% / asm20 ~20%`** (thresholds l.180, "minimap2 docs") | li-2018: honest "docs" source, but suffix-as-hard-%-ceiling misreads man-page semantics (asm10 ~1% avg, asm20 ~several % avg; only asm5 has the 5%-non-extension ceiling). Carryover from WGA probe. | **imprecise (source honest)** |
| **nucmer "sensitive only above ~70% identity" (MUMmer4 manual)** (taxonomy l.45); decision-tree "<70% identity → i-ADHoRe/LASTZ" (l.61) | marcais-2018: **no ~70% identity floor** in Marçais 2018. Over-claim carried from WGA probe. | **over-claim** |
| **">=90% TE families masked" / "N50 >=1 Mb"** (thresholds l.167,183; reviewer-pushback) | No ingested primary. armstrong soft-mask precondition (no %), SyRI graceful-degrade N50>500 kb (not a 1 Mb floor). Convention. | **convention (unsourced)** |
| **Reference-guided-scaffold circular reasoning** (failure-mode l.83, decision-tree l.66, reconciliation l.375) | Traces to NO ingested primary — SyRI *permits* pseudo-chromosome-by-homology but states no circularity criterion. Real validity axis; convention/untraceable. | **convention (honest, distinctive)** |
| **macrosynteny half-life ~150 Myr → Naruse 2004/Murat 2010; microsynteny ~1 Gyr → Slot & Rokas 2010** (thresholds l.178-179) | Not ingested; single decorative numbers attributed to real, topically-correct papers. Attribution *looks* honest but unverified. | **decorative (plausibly honest, unverified)** |

**NEW mismatches found reading SKILL.md against the notes (not in the established list):**

| NEW | Claim in skill | What the note says | Verdict |
|---|---|---|---|
| **N1** | **"MCScanX-h \| Within-genome variant for WGD detection \| Self-comparison blocks"** (taxonomy l.34) | wang-2012 §5 supports only: `MCScanX_h` = "takes **precomputed homology instead of BLASTP**" (the `-h` = homology-input path). MCScanX_h is in practice used for within-genome/paranome WGD work, so the framing is not field-false — but the "WGD variant" description is **not attributable to Wang 2012** (the paper defines `-h` as the homology-input mode). | **description not note-attributable** |
| **N2** | **"JCVI / MCScan Python (Tang 2008 GR 18:1944)"** (taxonomy l.35; References l.449 "MCScan Python") | tang-2008 note §1 explicit: "This is the **ORIGINAL MCscan** paper — **not** the later Python JCVI port." GR 18:1944 is the C-MCscan / ancient-hexaploidy biology paper. Attributing the Python JCVI toolkit's provenance to 18:1944 is a lineage mis-attribution (the same paper the cscore error rides on). | **mis-attribution (paper != software)** |
| **N3** | decision-tree "Distantly related species (**<70% identity**) → i-ADHoRe/LASTZ" (l.61); ">=95% identity → nucmer" (l.60) | marcais/li: no such identity-routing thresholds in any ingested primary; same absent-70% family as the nucmer over-claim. | **convention (unsourced threshold)** |

## 1. Recoverability by layer

| Layer (tool-orchestration skill) | Grade | Evidence |
|---|:---:|---|
| **Procedure spine** = tool-selection + per-tool CLI + version-compat (13+ tools, decision tree 20 rows, MCScanX/JCVI/GENESPACE/SyRI/AnchorWave invocations, install recipes) | **Low as skill-spine; High as *referee-audit* spine** | Mold is a Family-B referee, out-of-scope for the doer catalogue by design. What recovers traceably is the artifact-audit walk: Gate 0 provenance → Gate 1 route-by-method → Gate 2 TE/repeat anchors (wang classifier + kent/armstrong masking) → 3 tandem inflation (wang within-5 / tang <50 kb) → 4 fragmentation (goel N50>500 kb + li/marcais sensitivity) → 5 circular-scaffold → 6 micro/macro (wang >250/>=5, lovell blkSize 5) → 7 WGD depth (song -R/-Q, tang depth-vs-history) → 8 stringency (cscore-absent) → 9 small-INV noise → 10 terminology/citation → verdict. |
| **Validity axis** = artifact-read-as-synteny-biology (unmasked-TE, tandem, fragmentation, circular-scaffold, WGD-collapse, stringency-flip, small-INV, micro/macro, definitional-citation) | **High** | Every artifact class note-traced. Strongest layer; mirrors both siblings + research/05. Two gates land **more correct than the skill**: Gate 7 names real `-R`/`-Q` and flags `--ploidy`; Gate 10 flags the Fitch non-resolution. Gate 8 correctly grounds "cscore ABSENT from Tang-2008." The distinctive **circular-scaffold** axis is carried (Gate 5) but honestly labeled unsourced. |
| **Defaults / thresholds** = concrete numbers | **Medium (the contrast)** — split by tool | **Unlike the WGA probe, the primary tool's numbers trace.** Recovered *with citation*: MCScanX 50/-1/<25/>250/>=5/1e-5/tandem-5 (wang), Tang-2008 min(log10E,50)/-1-per-10kb/>300/E<1e-10/<50 kb, GENESPACE blkSize 5-unique-hits/nGaps 5/synBuff 100/OF 2.5.4 (lovell), Song `-R 1 -Q 2`/`y` 0.6/`e` 1/<20 bp. **Refused via 6 `[GAP]`:** >=1 Mb N50 floor (Gate 4), circular-scaffold criterion (5), decay/half-life (6), >=5 kb INV floor (9), Fitch-resolution + >=70%/>=5kb/--ploidy/cscore-Tang/blkSize-orthogroups (10), combined-confidence rubric (verdict). The refused set splits cleanly: **confabulate/contradict** (`--ploidy`, Fitch) vs **absent→convention** (>=5 kb, >=70%, >=1 Mb, ~100x, half-life). Both correctly held. |

**Recovered traceably:** the entire referee/validity spine, each gate citing a verified note — *and* the
MCScanX/GENESPACE/Tang/Song default numbers (the WGA probe couldn't recover its primary-tool numbers;
this one can). **Not recovered:** the doer breadth (13+ tool taxonomy, decision tree, per-tool CLI,
version-compat block, 4 runnable pipelines, install recipes) and the invented thresholds (correctly held
as convention/confabulation, not fabricated).

## 2. GAP taxonomy → next actions

**The Mold's 6 literal `[GAP]` markers, sorted:**

| GAP (Gate) | Bucket | Accessibility | Action |
|---|---|---|---|
| 4: no hard >=1 Mb chromosome-level N50 floor | **convention / absent-from-primary** | n/a (SyRI gives N50>500 kb graceful-degrade only) | Label convention; keep qualitative. Nothing to hunt. |
| 5: reference-guided-scaffold circularity criterion | **convention, not citable** | n/a (no ingested primary states it) | Encode the check; label the criterion unsourced/convention, not cited. Distinctive validity axis with no primary. |
| 6: no synteny decay-rate / half-life | **convention, not citable** | Naruse 2004/Murat 2010/Slot&Rokas 2010 **not ingested** (paywalled-likely) | Optional Phase-5: ingest one decay-rate primary *if* the referee needs to argue expected micro-erosion. Low priority. |
| 9: >=5 kb INV filter | **convention, not citable** | n/a (goel states no minimum) | Label convention. Re-summarizing SyRI docs would source the *software* default, not a Goel-2019 claim. |
| 10a: Fitch-1976 synteny/collinearity definition | **new-source (definitional primary needed)** | Renwick 1971 (Annu Rev Genet 5:81) / Fitch 1970 (Syst Zool 19:99) — both likely paywalled | The one genuine net-new target: a resolvable synteny-vs-collinearity primary. But the *referee* only needs to flag unverified citations, so even this is optional. |
| 10b: >=70% / >=5 kb / --ploidy / cscore-Tang / blkSize-orthogroups | **convention + confabulation** | n/a — primaries **explicitly state none** | Keep as anti-invention flags. Nothing to source. |
| verdict: combined-confidence rubric | **convention, not citable** | n/a | Design synthesis; flag pending a source defining combined scoring. |

**Silent gaps** — real-skill content no ingested note surfaced (all by-design, not by-miss): the entire
doer layer — i-ADHoRe/Proost 2012, SynNet/Zhao 2017, ntSynt, plotsr/Goel 2022, MashMap/Jain 2018 —
cited in References but **never ingested**, because a Family-B referee doesn't do tool-selection. Scoping
caveat, not confabulation risk. The MCScanX/JCVI **CLI flag letters** (`-s/-m/-k/-e/-w`) live in the
MCScanX manual, not Wang 2012 — a genuine coverage hole *if* the referee needed to validate exact
invocations (it doesn't; it audits conclusions).

**Honest Phase-5 assessment:** as with both siblings, **near-empty**. Most failed-to-trace numbers are
absent-from-primary → convention (>=1 Mb, ~100x, >=5 kb, >=70%, half-life — none exist in any ingested
primary). The single net-new sourcing target is a **synteny/collinearity definitional primary** (Renwick
1971 or Fitch 1970) to close Gate 10a — and even that is optional for a referee whose job is to *flag*
the unresolvable citation, which it already does. Everything else is convention or confabulation.

## 3. Citation-integrity findings (ranked by severity)

1. **Confabulated citation (sharpest — harder than a wrong number).** "Fitch 1976 J Mol Evol 7:271" for
   the skill's **opening definitional claim** (description) and References list. The citation **does not
   resolve** — no Fitch in J Mol Evol vol 7; page 271 is a Zuckerkandl protein-evolution paper (verified
   by full CrossRef/PubMed enumeration). A fabricated citation propping the skill's first substantive
   sentence. The Mold's Gate 10 flags it, refuses to assert a corrected citation as sourced, and notes
   Renwick-1971/Fitch-1970 as the likely real attributions. Strictly harder to catch than a numeric
   over-claim: the *paper does not exist* at that locus.
2. **Confabulated CLI flag (cross-skill repeat).** `proali` "with ploidy" — a nonexistent flag presented
   across decision-tree, cohort-gotchas, and reviewer-pushback. Real control `-R`/`-Q` (song §7, verified
   against current AnchorWave README in the WGA sibling). **Same confabulation the whole-genome-alignment
   skill carries** — now visible as cross-skill propagation. Mold Gate 7 names `-R`/`-Q` and flags any
   `--ploidy` citation as confabulated.
3. **Over-claim: invented magnitude.** "~100x more false anchor pairs" (headline + failure-mode "> 10x").
   Wang 2012 describes the TE mechanism + masking/tandem remedy but **quantifies no fold**. Mold's
   `no-invented-inflation-magnitude` property refuses exactly this: state direction, never a number.
4. **Over-claim: numbers/limits attributed to a paper that gives none.** (a) GENESPACE ">30 genomes /
   less rigorous non-plant" — Lovell runs vertebrates+grasses, states no such limit. (b) nucmer ">=70%
   identity → MUMmer4 manual" — Marçais states none. (c) minimap2 "~70% floor." All "refs real, glosses
   wrong."
5. **Mis-attribution (paper != software lineage).** (a) `--cscore` → Tang-2008 (absent from full text;
   JCVI-software only). (b) **NEW:** GR 18:1944 labeled "MCScan Python" — it is the original
   C-MCscan/hexaploidy paper. (c) **NEW:** MCScanX-h described as a "within-genome WGD variant" — it is
   the homology-input program.
6. **Convention-mislabeled as cited.** SyRI "INV >=5 kb / TRANS >=1 kb" (Goel states no minimum size);
   GENESPACE "blkSize 5 **orthogroups**" (unit is unique *hits*, number right).
7. **Imprecise (source honest).** minimap2 asm5/10/20 suffix-as-hard-ceiling vs man-page
   average-divergence semantics — skill honestly cites "minimap2 docs."
8. **Traces correctly (credit).** MCScanX `-s 5/-m 25/-k 50/-e 1e-5` + tandem-within-5 → Wang 2012;
   OrthoFinder 2.5.4 pin → Lovell 2022. **The primary-tool numbers here are real** — unlike the WGA skill.

## 4. What the Foundry adds

The candidate Mold makes a **checkable, note-cited gate discipline with an executable oracle** where the
SKILL.md states the same knowledge as scattered, untraceable prose:

- **Anti-invention discipline** (`anti-invention-thresholds-and-citations` + `no-invented-inflation-magnitude`)
  would catch the skill's own errors: it explicitly refuses a resolved Fitch-1976 definition, the
  `--ploidy` flag, cscore-attributed-to-Tang, blkSize-as-orthogroups, >=5 kb INV floor, >=70% identity
  floor, >=1 Mb N50, and the ~100x magnitude. A Foundry referee run against this SKILL.md flags every
  one; the SKILL.md self-certifies them.
- **WGD-depth gate (7) more correct than the skill.** The skill states the failure but with the
  confabulated `--ploidy`; the Mold states the real `-R`/`-Q` and flags `--ploidy` citations. Rare case
  where the referee is not just more traceable but **more correct** (the AnchorWave analog of the WGA
  probe's same win).
- **Terminology/citation gate (10) catches the fabricated primary** the skill leads with — no skill
  analog; the skill *asserts* Fitch 1976.
- **Circular-scaffold gate (5)** grounds the skill's own distinctive insight in a checkable oracle *and
  honestly labels the criterion unsourced* — where the skill asserts it as a rule.
- **Stringency-flip gate (8) + `stringency-flip-must-be-flagged`** convert the skill's "Reconciliation"
  table (unsourced imperatives) into a fixture-bound catch-the-flaw test grounded in cscore-absent-from-Tang.

The skill has **no executable oracle** — its "Reviewer Pushback," "Reconciliation," and "Common Errors"
tables assert rules as unsourced imperatives. The Mold's eval.md (9 llm-judged properties incl.
`clean-input-can-pass` to prevent reflexive rejection and `provenance-restated-before-verdict`) +
scenarios.md (9 planted-flaw fixtures + 1 clean negative control) make each a discriminating,
catch-the-flaw test.

## 5. Where bioSkills leads (credit honestly)

Genuine bioSkills strength the Foundry candidate captures **none** of:

- **Breadth:** 13+ tools in one taxonomy (MCScanX, MCScanX-h, JCVI, GENESPACE, i-ADHoRe, AnchorWave,
  SyRI, plotsr, ntSynt, SynNet, Satsuma/Cactus, LASTZ, nucmer, MashMap) with approach/output/strength/
  fails-when each. The Mold audits a slice.
- **CLI + version rigor:** pins MCScanX/JCVI 1.4.21+/GENESPACE 1.4.0+/SyRI 1.7.1+/AnchorWave 1.2.5+/
  OrthoFinder 3.0+ etc., introspection commands, expected error strings (`MCScanX: argument bad format`,
  `syri: input alignment file missing required columns`), 4 runnable pipelines, install recipes. The Mold
  has zero operational layer.
- **The genuinely-traceable MCScanX/GENESPACE numbers** — the skill's primary-tool defaults are real and
  correctly used (credit; this is *not* a naive citation-fabricator across the board).
- **The distinctive reference-guided-circularity insight** — a real validity axis the skill surfaces
  (failure-mode + decision-tree row + reconciliation row) that traces to no primary; the Mold adopts it
  but can only label it convention.
- **Honest self-labeling** of a large fraction of thresholds ("Standard convention," "minimap2 docs,"
  "UCSC convention" analogs) — the confabulations (Fitch, `--ploidy`, ~100x) are the exception, not the rule.
- **The Fitch-1976 *intent*** — the synteny-vs-collinearity distinction is a real, useful conceptual point
  even though the *citation* is fabricated. Credit the concept, flag the provenance.

Do not overclaim: on tool breadth, CLI discipline, and runnable-pipeline coverage, **bioSkills is well
ahead here.** The Foundry captures the validity referee and self-defends; it does not do tool-selection.

## 6. Bottom line

Sharpest **recovered-traceably win:** the validity axis reconstructs in full and self-defends — and on
two axes the Mold is **more correct than the skill** (names real `-R`/`-Q` vs the confabulated `proali
--ploidy`; flags the non-resolving Fitch-1976 citation the skill opens with). Uniquely among the three
probes, the **primary-tool defaults also recover with citation** (MCScanX 50/<25/>250/>=5/1e-5/tandem-5 →
Wang 2012; blkSize/OF-pin → Lovell 2022), so the anti-invention eval discriminates real-traceable numbers
from invented ones rather than refusing the whole layer. Sharpest **honest limit:** the doer layer — 13+
tools, decision tree, per-tool CLI, version-compat, 4 pipelines — is entirely out of a Family-B referee's
scope; the one net-new sourcing target (a synteny/collinearity definitional primary) is optional. Of the
skill's **referee-relevant** content, **~85-90% recovers traceably** (validity axis High; primary-tool
defaults traced; conventions correctly held; Gate 7/10 *exceeding* the skill's correctness); of the
**whole** skill — overwhelmingly a tool-orchestration doer — far less.

**Cross-skill pattern now visible across all three probes** (WGA, annotation-projection, synteny):
confabulated CLI/citation details (`proali --ploidy` twice; Fitch-1976 fabricated citation) + threshold
over-claims (~100x, >=70%, >=5 kb, half-lives) sit on top of a validity axis that recovers well and
self-defends. The content was never the moat; the trace is.
