# Cross-probe synthesis: what three /ingest-bioskill runs found

> Synthesis across the three executed recoverability probes, all in the `comparative-genomics`
> category of GPTomics/bioSkills:
> - `ingest-comparative-annotation-projection/` (Mold `audit-gene-loss-call`; issue #105 filed)
> - `ingest-whole-genome-alignment/` (Mold `audit-whole-genome-alignment`; commit d362796)
> - `ingest-synteny-analysis/` (Mold `audit-synteny-claim`; commit fb5862f)
>
> Each probe took ONE SKILL.md, ingested the primaries its claims should trace to as clean-context
> notes, blind-assembled a Family-B referee Mold from those notes alone, then diffed Mold vs skill.
> This note is the **cross-probe pattern** — positioning evidence, not a fourth probe. All findings
> below are **probe-observed** (in the three committed `comparison.md` files) unless marked
> `[design-inference]`. Honest scope: **N=3, all tool-orchestration skills** in one category — not
> the stats-validity core the Foundry ultimately targets. See `content/research/05-skill-backing-references.md`
> for the pre-probe recoverability framework this tests empirically.

## 1. The recurring failure signature

Every probe surfaced the same four defect classes, in the same rough severity order. The sharpest
are not wrong *numbers* — they are wrong *pointers*: a command that doesn't run, a citation that
doesn't resolve. Those are invisible without checking each against its source, and indistinguishable
from correct to a reader (or a model regenerating from memory).

### (a) Confabulated CLI / mechanism details — the command doesn't run or the tool is mis-wired
| Skill | Confabulation | Reality (source) |
|---|---|---|
| WGA **and** synteny | `anchorwave proali --ploidy N` | **No `--ploidy` flag** (verified vs current AnchorWave master README); WGD depth is `-R`/`-Q`, e.g. `-R 1 -Q 2` (`song-2022-anchorwave`) |
| CAP | CAT is a "Snakemake workflow" (`snakemake --use-conda`) | CAT is orchestrated by **Luigi + Toil** (`fiddes-2018-cat`) |
| CAP | CAT integrates "AUGUSTUS + LiftOff + TransMap" | **TransMap + AUGUSTUS + homGeneMapping**; LiftOff (2020) postdates CAT (2018) |

### (b) Confabulated citations — the pointer resolves to nothing, or to the wrong paper
| Skill | Cited as | Reality |
|---|---|---|
| synteny | synteny-vs-collinearity ← "Fitch 1976, J Mol Evol 7:271" | **Does not resolve** — no Fitch in J Mol Evol vol 7; p.271 = a Zuckerkandl paper (CrossRef/PubMed enumeration). Distinction is properly Renwick 1971 / Fitch 1970 |
| CAP | CAT ← "Smith LP et al 2024" | **Does not resolve** — no such paper. Real: Fiddes et al. 2018, Genome Res 28:1029 |
| CAP | "CESAR 2.0 ← Sharma & Hiller 2017 NAR 45:8369" | That DOI is a **different, real** Sharma & Hiller paper ("Increased alignment sensitivity…"); CESAR 2.0 is Sharma, Schwede, Hiller 2017, **Bioinformatics 33:3985** |

### (c) Threshold over-claims — a number attributed to a primary that states none
| Skill | Claim | Primary actually says |
|---|---|---|
| WGA | Cactus memory "8–32 GB/genome → Armstrong 2020"; per-clade `branchScale` | Armstrong gives only instance/core-hours; **"branchScale" never appears** |
| WGA / synteny | "nucmer ≥70% identity → Marçais 2018" | Marçais states **no minimum identity** |
| WGA / synteny | "minimap2 ~70% identity floor" | **Absent** from paper AND man page |
| synteny | "unmasked TEs → ~100× more false anchors" | Wang 2012 gives the mechanism + remedy, **no fold/magnitude** |
| synteny | "SyRI INV ≥5 kb biological significance" | Goel 2019 states **no minimum calling size** |
| synteny | GENESPACE ">30 genomes / plant-only" | Lovell runs vertebrates + grasses; **no such limit** |
| CAP | TOGA "posterior > 0.9"; "~300 Myr"; CESAR "~150 Myr" | TOGA uses XGBoost orthology score **≥0.5**, divergence in **Ks (≤0.55)**, **no Myr** in either paper |
| CAP | LiftOff "80% coverage / 70% identity" | Real defaults `-a 0.5` / `-s 0.5` (**50% / 50%**) |

### (d) Convention-mislabeled / absent-from-primary — the honest gap layer
Community thresholds with no defining primary, sometimes self-labeled honestly (credit), sometimes
dressed as cited: ≥90% TE masking, N50 ≥1 Mb, LASTZ 5000-bp chain ("UCSC convention", not in Kent
2003), `<70%`/`≥95%` identity routing, macrosynteny half-lives. The Foundry answer is the same
throughout: **label as convention, never fabricate a citation.**

## 2. What recovers reliably vs what varies

| Layer | CAP | WGA | Synteny | Pattern |
|---|:---:|:---:|:---:|---|
| **Validity axis** (the cardinal sin the referee guards) | High | High | High | **Always recovers.** Reference-bias, false-absence-below-sensitivity, masking/TE artifact, WGD-depth collapse, circular-scaffold, artifact-read-as-biology — each traces to a clean (often OA) primary. This is the asset (matches `content/research/05` finding #1). |
| **Defaults / thresholds** | Low | Low | **Medium** | **Skill-dependent.** WGA's primary-tool numbers (memory, branchScale) are *absent from the primary*; synteny's primary-tool numbers (MCScanX → Wang 2012; blkSize + OrthoFinder-2.5.4 → Lovell 2022) **genuinely trace**. So the defaults layer is not uniformly un-recoverable — it depends whether the tool's paper actually states its defaults. |
| **Doer spine** (tool catalogue, per-tool CLI, version-compat, runnable pipelines) | Low* | Low* | Low* | *Out of a Family-B referee's scope **by design**, not by miss — these are orchestration skills; the referee audits conclusions, not tool-selection. This is a scoping caveat, not a Foundry deficiency. |

**Takeaway:** the validity axis — the layer bioSkills carries as untraceable prose — is exactly the
most recoverable-with-citation layer, in all three probes. The threshold layer is where recovery is
genuinely variable, and the probe's job there is to *discriminate* traceable numbers from invented
ones (synteny showed both, side by side), not to refuse the layer wholesale.

## 3. Two structural observations

**Cross-skill corpus reuse works, and it's cheap.** The synteny probe reused **five** notes ingested
for WGA (`armstrong-2020-cactus`, `kent-2003-chain-net`, `li-2018-minimap2`, `marcais-2018-mummer4`,
`song-2022-anchorwave`) wholesale — half its backing came free. The reuse-triage step ("cite a note
ingested for a *different* skill") fired for real. `[design-inference]` This is the corpus-first
thesis paying off: a governed note is written once and amortized across every skill that needs it,
where each SKILL.md re-states (and re-mis-states) the same facts independently.

**Confabulations propagate across skills; a governed source would fix once.** The *identical*
`proali --ploidy` fabricated flag appears in both the WGA and synteny skills. `[design-inference]`
Two independently-authored SKILL.md files carry the same defect — consistent with memory-written
content sharing a memory-level error. In a cast-from-source model, correcting the `song-2022-anchorwave`
note once would propagate to every downstream cast; in the artifact-is-source model, each skill must
be found and fixed separately.

## 4. Method integrity — the probe catches its own errors

The clean-context + verify-don't-assert discipline caught upstream mistakes mid-pipeline, which is
the strongest evidence the isolation is real:
- **CAP:** the Phase-1 research subagent mis-cited the gene-loss primary as "Sharma & Hiller 2020 /
  gkaa562"; the blind clean-context summarizer fetched the actual paper and corrected it to
  **Turakhia et al. 2020 / gkaa550** (a different lab, different method). The pipeline overrode its
  own upstream memory-gloss.
- **Synteny:** the orchestrator supplied two **wrong PMC ids** (GENESPACE, SyRI); both clean-context
  summarizers detected the mismatch (the id resolved to an unrelated paper) and **self-corrected via
  DOI lookup** — PMC9462846 and PMC6913012 respectively.
- **Assembler isolation held:** the synteny review found the candidate Mold used facts *more specific
  than the SKILL.md* (`onlyOgAnchors`, TRF `period ≤12`, `-R 1 -Q 2`) — sourced from notes, not the
  skill the assembler never saw.

## 5. Implication for the Foundry thesis

`[design-inference]` Three probes, one conclusion, consistent with the project premise: **the content
was never the moat; the trace is.** bioSkills is genuinely strong where the probes credit it — tool
breadth, CLI/version-compat rigor, honest self-labeling of many thresholds as convention, and
occasionally fully-traceable primary-tool numbers (synteny). What it structurally cannot supply is
per-claim traceability: a reader cannot tell the confabulated `proali --ploidy` / `Fitch 1976` /
`Smith 2024` from the real citations sitting beside them without re-checking each against its source.
The Foundry's candidate Molds encode exactly that check as a first-class, executable discipline: an
`anti-invention` eval property that refuses any threshold/citation with no source in the references,
and — on two occasions (WGA and synteny AnchorWave gates) — a referee that is not merely more
traceable but **more correct** than the skill it audits.

**Honest limits.** N=3, all in one category, all tool-orchestration doers rather than the
stats-validity referees the Foundry is really built for; the doer layer is out of scope by design;
the propagation and reuse claims are inferences from three cases, not a systematic audit. The next
useful data point is a **stats-validity** skill, where the Family-B referee operates on its home turf.

## Sources
- `content/research/experiments/ingest-comparative-annotation-projection/comparison.md` (+ `gap-closing.md`)
- `content/research/experiments/ingest-whole-genome-alignment/comparison.md` (+ `gap-closing.md`)
- `content/research/experiments/ingest-synteny-analysis/comparison.md` (+ `gap-closing.md`)
- `content/research/05-skill-backing-references.md` (the pre-probe recoverability framework)
- GitHub issue: https://github.com/GPTomics/bioSkills/issues/105 (CAP citation + CAT-mechanism findings)
