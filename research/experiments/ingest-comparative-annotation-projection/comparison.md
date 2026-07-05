# Recoverability probe: `comparative-genomics/comparative-annotation-projection`

> Phase-4 compare. Real bioSkills SKILL.md (`bio-comparative-genomics-comparative-annotation-projection`)
> vs. blind-assembled candidate Mold `audit-gene-loss-call` (Family-B referee, 8 gates + 5 `[GAP]`
> markers), built from 6 ingested notes. Produced by `/ingest-bioskill`. **Domain twist:** this is a
> **tool-orchestration** skill — its spine is tool-selection + CLI, so the Foundry candidate captures
> only the *validity referee* (avoid artifactual false-loss), not the doer breadth. That asymmetry
> drives every finding below.

## 0. Known-context verification (against the SKILL.md text)

| Claim to verify | Verdict | Evidence in SKILL.md |
|---|---|---|
| **CAT citation confabulated** ("Smith LP et al 2024") | **CONFIRMED** | References line: "Smith LP et al 2024 (Comparative Annotation Toolkit updates)". No such paper. Real CAT primary = **Fiddes et al. 2018, Genome Res 28(7):1029, doi:10.1101/gr.233460.117** (fiddes note §1). SKILL never cites Fiddes. |
| **CESAR 2.0 misattributed** to NAR 45:8369 | **CONFIRMED** | Body, taxonomy table, Quantitative-Thresholds, and References all cite "Sharma & Hiller 2017 NAR 45:8369 (CESAR 2.0)". NAR 45(14):8369 is a real but *different* Sharma & Hiller 2017 paper; real CESAR 2.0 = **Sharma, Schwede & Hiller 2017, Bioinformatics 33(24):3985, doi:10.1093/bioinformatics/btx527** (cesar note §1) — never cited. |
| **CAT = Snakemake + "AUGUSTUS + TransMap + LiftOff"** | **CONFIRMED wrong on both** | Taxonomy table ("Snakemake workflow integrating Augustus + LiftOff + TransMap"), CAT section (`snakemake --use-conda …`), decision tree ("CAT (Snakemake)"). Fiddes note §5/§12: CAT uses **Luigi + Toil** (not Snakemake); integrates TransMap + AUGUSTUS (TM/TMR/CGP/PB) + homGeneMapping; **LiftOff (2020) post-dates CAT (2018) and is not a component** — the word "LiftOff" appears nowhere in the paper. |
| **LiftOff defaults 80% cov / 70% id + 50 kb window + ~80% id floor** | **CONFIRMED wrong** | Thresholds table: "LiftOff coverage ≥80% \| Default", "identity ≥70% \| Default", "Tandem cluster window 50 kb \| Default", "Maximum divergence for LiftOff ~80% nt identity". liftoff note §5/§12: real defaults **`-a 0.5` / `-s 0.5`** (50/50), `-sc` copy-id 1.0, **no 50 kb window** (copies governed by `-sc` + non-overlap), **no numeric divergence/identity floor** (only "limited by divergence" in prose). |
| **TOGA "posterior > 0.9"; "~300 Myr"** (classes I/PI/UL/L/M/PM checked separately) | **posterior/Myr CONFIRMED don't-trace; codes are fine** | Thresholds table ("Intact confidence \| ML classifier posterior > 0.9 \| Kirilenko 2023 supp"; "Maximum divergence for TOGA \| ~300 Myr"). kirilenko note §6/§12: classifier uses an **orthology score ≥0.5** (XGBoost), *not* posterior >0.9 (0.9 appears only in graph pruning); divergence stated as **≤0.55 Ks, NO Myr figure** (and the TOGA README carries no Myr figure either). Input is **LASTZ chains**, not "Cactus HAL → halSynteny." **The `I/PI/UL/L/M/PM` codes are NOT an error** — they are TOGA's own `loss_summ_data.tsv` output labels, which the skill already cites to "TOGA repo"; only the *paper* uses word labels (intact / partially intact / missing / uncertain loss / lost), and `PM` is uncorroborated even in the note (a tool-doc convention, not a confirmed invention). |
| **CESAR "~150 Myr (vertebrate)"** attributed to Sharma & Hiller 2017 | **CONFIRMED convention/external** | Thresholds table row. cesar note §12: paper gives **no Myr figure and no % identity window** — only an in-silico 0.1–1 subs/site range with no reliability cutoff drawn. |
| **halSynteny in TOGA workflow** | **CONFIRMED not in Cactus primary** | SKILL workflow: `halSynteny output.hal … > query.synteny.psl` → axtChain → TOGA. armstrong note §10/§12: **`halSynteny` is not named in the Cactus paper**; only `halLiftover`/`hal2maf` are. (And TOGA consumes pairwise LASTZ chains, not HAL — kirilenko §12.) |
| **Probe's OWN Phase-1 misattributed the gene-loss source** | **CONFIRMED (method-validation event)** | turakhia note header: Phase-1 proposed "Sharma & Hiller 2020 / gkaa562"; blind fetch found NAR 48(16):e91 = **Turakhia, Chen, Marcovitz & Bejerano 2020, doi:10.1093/nar/gkaa550** (aggregate-erosion, not single-event; gkaa562 is an unrelated bacterial-helicase paper). Directory renamed. The pipeline caught its own upstream memory-gloss via the clean fetch — mirrors the ASR probe's parsimony-direction find. |

---

## 1. Recoverability by layer

| Layer (this being a tool-orchestration skill) | Grade | One-line evidence |
|---|:---:|---|
| **Procedure spine** = tool-selection + CLI (WGA-anchored TOGA vs ortholog-anchored LiftOff; per-tool invocations; version-compat) | **Low as skill-spine; High as *referee audit* spine** | The Mold is a Family-B **referee**, not a doer — it recovers none of the decision-tree/CLI/version layer (out of scope by design). What it *does* recover traceably is the 8-gate audit walk: claim→tool (Gate 0), tool-appropriateness (1a, liftoff §5/§9), assembly-gap (1b, kirilenko §6 M-vs-D ≥10 N + turakhia §5 masking), annotation-absence (2, turakhia >30% vs <10% ablation), ortholog/paralog (3, turakhia 20×/synteny-20/unique + kirilenko orthology-score 0.5), divergence (4, kirilenko 0.55 Ks + armstrong F1 0.989→0.795), exon-projection (5, cesar splice-shift + kirilenko middle-80%/≥2-exon), phylo support (6, turakhia ≥2 species + outgroup), intactness-vs-expression (7). |
| **Validity axis** = avoiding artifactual false-loss (the cardinal sin the referee exists to catch) | **High** | Every artifact class note-traced: assembly-gap-as-loss (kirilenko §6, turakhia §7 q4), annotation-absence-as-loss (turakhia §6 ablation FPR >30%→<10%), paralog-as-ortholog (turakhia §5/§7 q3), out-of-range divergence (kirilenko §8, armstrong §9), splice-shift projection artifact (cesar §9), single-event/boundary false signal (turakhia §5 aggregate + first/last-2-AA; kirilenko middle-80%), private-mutation/reference-bias (turakhia §5 phylo filter), intactness≠expression (kirilenko §10, turakhia §8 "nearly impossible … no transcript"). Strongest layer — same pattern as research/05 #1 and the ASR probe. |
| **Defaults / thresholds** = concrete numbers | **Low as numbers; recovered as *discipline*** | The Mold refuses every threshold the sources don't state and **labels it**: 5 `[GAP]` markers (fraction-in-gap cutoff, Myr/​%-identity divergence bound, general lineage-support rule, expression-loss method, combined-confidence rubric) + eval `no-invented-thresholds`. The recovered numbers are exactly the ones the primaries *do* state (0.55 Ks, ≥10 N, orthology-score 0.5, 20×, gene-in-synteny 20, MD 15/5, `-a`/`-s` 0.5); the refused ones split two ways — those that **contradict a real value** (LiftOff 80/70 vs `-a`/`-s` 0.5; the 50 kb window; posterior-0.9-as-intactness-cutoff) and those **attributed to a primary but absent from it** (300 Myr, 150 Myr — convention). Both are correctly refused. |

**Recovered traceably:** the entire referee/validity spine — a cast Mold flags exactly the false-loss
failure modes, each flag citing a verified note. **Not recovered:** the skill's doer breadth
(tool-selection decision tree, per-tool CLI, GeMoMa/CAT/liftOver orchestration, version-compat) and
the invented threshold numbers (correctly held as convention, not fabricated).

---

## 2. GAP taxonomy → next actions

**The Mold's 5 literal `[GAP]` markers, sorted:**

| GAP (artifact) | Bucket | Accessibility | Action |
|---|---|---|---|
| Gate 1b: no quantitative "% of exon bases in gap" cutoff beyond TOGA's `<50% CDS→missing` binary + `≥10 N` gap def | **convention, not citable** | n/a (absent from primary) | Label as workflow convention; don't cite. Nothing to hunt. |
| Gate 4: no **Myr** divergence or **% identity** floor for any tool (CESAR + Liftoff explicitly give none; TOGA is in Ks) | **convention / absent-from-primary** | n/a | Keep in Ks; flag any Myr/%-id bound as unsourced. **Not paywalled** — CESAR (restrictive-license/all-rights-reserved, readable via OUP HTML, already ingested own-words) and Liftoff papers *state no such number*, so re-summarizing wins nothing. |
| Gate 6: no *general* cross-tool minimum-lineage-support rule (MD is Turakhia-specific; covariance μ,S not recovered) | **re-summarize existing** (partial) + convention | turakhia = **OA (CC BY-NC)** | The μ,S covariance detail sat in LaTeX-heavy equations (turakhia §11) — a re-summarize could recover it. But the general rule is method-specific → treat "≥2 species + intact outgroup" as anchored convention. |
| Gate 7: none of the 6 notes gives a **method** for establishing expression loss (RNA-seq/proteomic) | **new source note** | **accessible** (OA) | Genuine new-source gap: PseudoPipe (Zhang 2006 GR 16:1041), RetroFinder (Baertsch 2008), or an RNA-/Ribo-seq expression-evidence primary — all outside the 6 and OA. The one real Phase-5 target. |
| Verdict synthesis: no **integration rubric** to weigh gates into one confidence score | **convention, not citable** | n/a | Design synthesis across sources; flag pending a source that defines combined-confidence scoring. |

**Silent gaps** — real-skill content no ingested note surfaced, so the blind Mold could not flag it at
all (highest value):

1. **Gate 6 (phylogenetic support) exists only because Turakhia carries it — the SKILL.md itself lacks it.** The skill has no "loss must be fixed across ≥2 lineages + intact outgroup" rule; its nearest content ("Multi-reference consensus ≥2 references agreeing") is about *reference choice*, not lineage support for the loss. So this is a Foundry *addition*, not a silent gap — but note the inversion: the referee is stricter than the skill here.
2. **Gate 2 (annotation-absence ≠ loss) likewise has no clean SKILL.md analog** — it comes entirely from Turakhia's >30%-vs-<10% ablation. Another place the referee out-covers the skill.
3. **The whole doer layer is silent by design, not by miss:** GeMoMa (Keilwagen 2019), UCSC liftOver, BRAKER3/Funannotate/MAKER, the WGA-anchored-vs-ortholog decision tree, per-tool CLI, and version-compat pins are absent from the Mold — because a Family-B referee doesn't do tool-selection. Scoping caveat, not a confabulation risk.
4. **Chain-generation cascade** (SKILL's `Cactus HAL → halSynteny → axtChain → chainNet → TOGA`) is *both* uncovered by the notes *and* partly wrong in the skill (halSynteny absent from the Cactus primary; TOGA actually consumes LASTZ chains). A memory model states this pipeline confidently; the traceable Mold correctly never asserts it.

**Honest Phase-5 assessment:** unlike a stats skill where thresholds hide behind paywalls, here **most
failed-to-trace numbers are absent-from-primary → convention** (300 Myr, 150 Myr, 80/70, 50 kb,
posterior 0.9 — none exist in *any* primary, real or paywalled). So **Phase 5 has little to hunt.** The
single genuine new-source target is Gate 7's expression-loss method (accessible/OA). CESAR 2.0 is
restrictive-license (all-rights-reserved, readable via OUP HTML) but already ingested own-words and
states no divergence number — re-summarizing it buys nothing for the validity axis.

---

## 3. Citation-integrity findings

This skill is a textbook case of the "citations/thresholds from memory" failure the probe exists to
catch. Three distinct classes, all confirmed against the SKILL.md text:

- **Confabulated citation.** "Smith LP et al 2024 (Comparative Annotation Toolkit updates)" is a
  non-existent paper standing in for CAT's real primary (Fiddes et al. 2018), which the skill never
  cites. A memory-written skill invented a plausible byline+year for a real tool.
- **Misattributed citation (real-but-wrong-paper).** CESAR 2.0 pinned to "NAR 45:8369" — a real 2017
  Sharma & Hiller paper on a *different* topic (alignment sensitivity); the actual CESAR 2.0
  (Bioinformatics 33(24):3985) is never cited. This is the exact "refs real, glosses wrong" asymmetry
  research/05 documents — indistinguishable from correct without the trace.
- **Thresholds that don't trace to their cited source.** Two flavors. (a) **Numbers that contradict the
  real value:** LiftOff "≥80% cov / ≥70% id" defaults (real: `-a`/`-s` 0.5), the "50 kb tandem window"
  (doesn't exist), and TOGA "posterior > 0.9" as an intactness cutoff (real: orthology score ≥0.5) — cited
  "Default"/"Kirilenko 2023 supp". (b) **Conventions attributed to a primary that states none:** TOGA
  "~300 Myr" (cited "Kirilenko 2023"; paper gives Ks only) and CESAR "~150 Myr" (cited "Sharma & Hiller
  2017"; no Myr in the paper). The Foundry `no-invented-thresholds` eval names both as the anti-pattern.
  (The `I/PI/UL/L/M/PM` codes are **not** in this list — they trace to the TOGA repo the skill cites; only
  the *paper* uses word labels.)
- **The probe's own Phase-1 misattribution (method-validation).** Our Phase-1 memory-gloss cited the
  gene-loss source as "Sharma & Hiller 2020 / gkaa562"; the clean-context blind fetch corrected it to
  Turakhia et al. 2020 (gkaa550) — a *different lab, different method* (Bejerano aggregate-erosion, not
  Hiller single-event). The pipeline caught its own upstream error via the fetch it mandates. This is
  the strongest evidence that the trace works: the blind-fetch discipline detected the same failure
  class in *our own* first pass that it detects in the skill.

---

## 4. What the Foundry adds

The candidate Mold implies a **checkable, note-cited gate discipline** where the SKILL.md states the
same knowledge as scattered, untraceable prose. Specific prose→gate mappings:

- **Assembly-gap gate (1b)** ⟵ SKILL "TOGA intactness classification false negatives" ("assembly gaps
  … can cause false-loss calls"; **Fix: manual review of TOGA Lost calls**) and "Many PI classifications
  | Assembly fragmentation." The skill's remedy is "manual review"; the Mold makes it an executable
  criterion (`≥10 N` gap, `<50% CDS → missing`, kirilenko §6 + turakhia gap-masking §5).
- **Tool-appropriateness gate (1a)** ⟵ SKILL Reconciliation "TOGA Lost vs LiftOff Mapped | LiftOff more
  permissive … Trust TOGA for loss claims" and taxonomy "LiftOff … not for gene loss detection." The
  Mold makes it a routing gate keyed on Liftoff's `-u` unmapped-file mechanism (liftoff §5/§9).
- **Phylogenetic-support gate (6)** — no SKILL.md analog (the skill's ≥2 is about *reference* consensus).
  Pure Foundry add from turakhia §5 (≥2 eroded sister species + intact outgroup; 5<MD≤15 left uncalled).
- **Intactness-vs-expression gate (7)** ⟵ SKILL "Pseudogenization vs gene loss distinction" ("TOGA
  detects loss of coding capacity … doesn't directly identify pseudogenization … a pseudogene with
  intact reading frame may be classified Intact"; **Fix: combine with RNA-Seq**). The cleanest map: the
  skill *states* the gap as a failure mode; the Mold makes it a verdict-downgrade gate (kirilenko §10,
  turakhia §8 concession) — and its `intactness-vs-expression-gap-flagged` eval is a catch-the-planted-
  flaw oracle (scenarios: `intact-call-as-retained-function`, `eroded-call-as-expression-silencing`).
- **Reference-choice-bias gate (8)** ⟵ SKILL "Reference choice bias" failure mode, verbatim.
- **Annotation-absence gate (2)** — again no clean SKILL analog; from turakhia's >30%/<10% ablation.
- **Anti-invention discipline.** The `no-invented-thresholds` eval would have caught the skill's own
  errors: it explicitly refuses a Myr divergence bound, a %-identity floor, and a fraction-in-gap cutoff
  — the exact numbers the SKILL.md states without a traceable source (300 Myr, 80/70, 50 kb). A Foundry
  referee run against this SKILL.md flags them; the SKILL.md self-certifies.

The skill has **no executable oracle** — its "Anticipated Reviewer Pushback" and "Reconciliation" tables
assert the rules as unsourced imperatives. The Mold's eval.md + scenarios.md make each a fixture-bound,
catch-the-flaw test with a `clean-established-loss` negative control so the referee isn't tuned to reject
everything.

---

## 5. Where bioSkills leads (credit honestly)

This SKILL.md is a **strong** showcase of bioSkills' signature CLI-integration rigor, and the Foundry
candidate captures **none** of it — that breadth is a genuine bioSkills strength here, not our edge:

- **Version-compat + introspection block:** pins TOGA 1.1.7+, CESAR 2.0, LiftOff 1.6.3+, CAT 2.4+,
  GeMoMa 1.9+, Cactus 2.9.1+, plus `toga.py --help` / `cesar --help` / `liftoff --version` /
  `pip show liftoff` introspection commands and expected error strings (`TOGA chain file missing`,
  `CESAR fragment not found`). The Mold has zero operational layer.
- **Per-tool failure-mode table:** 11 mechanism→symptom→fix entries spanning CESAR misalignment,
  LiftOff tandem ambiguity, polyploid handling, scaffold-level fragmentation. Practitioner depth the
  Mold audits only a slice of.
- **Decision-tree-by-scenario:** 20 rows of tool-selection ("hundreds of mammals → TOGA + Cactus HAL";
  "fragmented draft → LiftOff"; "plant from Arabidopsis → LiftOff plant options"). Pure doer knowledge;
  the Mold does no tool-selection.
- **Reconciliation-when-methods-disagree** and **Common Errors** tables, tool-installation recipes.
  Broad, useful, and out of the referee's scope.

The Foundry candidate captures the **validity referee** (avoid artifactual false-loss) and self-defends
via evals; it does **not** capture the tool-selection/CLI-orchestration coverage that is the bulk of
this skill. Do not overclaim: on CLI discipline and doer breadth, bioSkills is ahead here.

---

## 6. Bottom line

Sharpest **recovered-traceably win:** the validity axis reconstructs in full and *self-defends* — the
Mold's `no-invented-thresholds` eval would catch the skill's own un-traceable numbers (80/70 and the
50 kb window that contradict LiftOff's real defaults; the 300/150 Myr limits attributed to primaries
that state only Ks), and the CAT-confabulation + CESAR-misattribution are precisely the
memory-written-citation failure the trace exists to prevent. The probe's **own** Phase-1 error (Turakhia
mis-cited as Sharma/gkaa562), caught by the mandated blind fetch, is the same failure class detected in
our own pipeline — the strongest validation that the trace works. Sharpest **honest limit:** unlike
stats skills, almost nothing here is a paywalled hunt — the un-traceable thresholds are *absent from
every primary* → convention, so **Phase 5 has essentially one real target** (Gate 7's expression-loss
method, OA-accessible). Of the skill's **referee-relevant** content, ~85–90% recovers traceably
(validity axis High, thresholds correctly held as convention, two gates even *exceeding* the skill's own
coverage); of the **whole** skill — which is overwhelmingly a tool-orchestration doer — far less, since
the CLI/decision-tree/version layer is out of scope for a Family-B referee. Consistent with the project
thesis: the content was never the moat; the trace is.
