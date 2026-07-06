# comparison — audit-positive-selection-claim (Mold) vs bioSkills `comparative-genomics/positive-selection` (SKILL.md)

> Phase 4 of the ingest-positive-selection probe. The candidate Mold was blind-assembled from 13
> notes; this diff sees everything (SKILL.md + usage-guide.md + examples/selection_analysis.py +
> the notes). Skill fetched 2026-07-06 (curl, HTTP 200; WebFetch summarizer refused verbatim, so
> raw pulled). Grades mirror `research/05`'s three-layer shape.

## 1. Recoverability by layer

| Layer | Recoverability | Recovered with real citation | Partial | Didn't |
|---|:---:|---|---|---|
| **Procedure spine** | **High** | codeml control-file fields, NSsites↔M table + #params, LRT pairs & df (M1a-M2a/M7-M8 df=2; branch-site A-vs-A1 df=1), M8a-vs-M8, branch/branch-site setup, BEB-only-M2a/M8/A — all from `[[paml-manual]]` (GPL) + `[[alvarez-carretero-2023-paml-guide]]` (CC-BY). HyPhy levels (BUSTED gene-wide, MEME site, aBSREL branch) from `[[murrell-2015-busted]]`/`[[murrell-2012-meme]]`/`[[smith-2015-absrel]]` (PMC OA). MK/asymptotic-α from `[[messer-petrov-2013]]` (PNAS OA). | Clade models C/D, free-ratio, RELAX, BUSTED-S/PH, FUBAR/FEL/SLAC named in Mold spine only in passing (deferred tail). | Convergence tests (CSUBST/RERconverge/PhyloAcc), DFE battery (polyDFE/GRAPES/DFE-alpha), noncoding (phyloP) — deferred, not ingested. |
| **Validity axis** (cardinal sins) | **High** (2 holes) | recombination (`[[anisimova-2003-recombination]]` abs. type-I to 98% + `[[pond-2006-gard]]` AICc remedy); alignment error (`[[schneider-2009-alignment-error]]` 1.6×/7.2×); multi-hit (`[[lucaci-2023-busted-mh]]` FPR→100% short branches, δ/ψ carrier); post-hoc foreground / multiplicity (`[[anisimova-yang-2007]]` FWER≈25% worst, Rom's; `[[smith-2015-absrel]]` Holm-Bonf); linked-selection/MK (`[[messer-petrov-2013]]`); wrong-level & NEB-vs-BEB (`[[murrell-*]]`/`[[zhang-2005-branch-site]]`/`[[paml-manual]]`). | gBGC — confound recovered as *existence only*; discrimination criteria a GAP (`[[galtier-duret-2007-gbgc]]` abstract-only). | **Convergent-substitution-as-confound** — the skill's own failure mode; **no note covers it, Mold omits it entirely** (silent gap, §2). |
| **Defaults / thresholds** | **Low** | χ² critical values (3.84/5.99, 6.63/9.21) and the 2.71/5.41 mixture — High, from `[[paml-manual]]`. BEB `*`>95%/`**`>99% markers — from manual. aBSREL Holm-Bonferroni — from `[[smith-2015-absrel]]`. | p≤0.1 site (skill self-labels "Datamonkey convention"); BEB used-as-cutoff. | dS<1.5/dS<3; ≥50 sites/bin; W→S>1.5; ≥8 seqs; ≥20 lineages / ≥4 background; ENC<35 — **none has a defining primary in the notes; several actively mis-cited by the skill** (§3). |

Matches `research/05` cross-cutting findings exactly: validity axis is the most-recoverable layer; the gap is always defaults/thresholds. Positive-selection-specific twist — the defaults layer here isn't merely un-citable, it is **actively mis-attributed to real, specific primaries** (dS→PAML manual, ≥50/bin→Messer-Petrov, omega_DH→Lucaci, GARD-p<0.05→Pond). That is the blind-regeneration failure mode caught in the act: fluent citations that don't check out.

## 2. GAP taxonomy → next actions

Assembler's explicit `[GAP]` markers plus silent gaps found in the diff. Access flag marks Phase-5 surrogate targets.

| Gap | Type | Load-bearing primary | Access |
|---|---|---|---|
| **gBGC discrimination criteria / W→S mechanism / threshold** (Mold 2d GAP) | re-summarize existing OR new note | Galtier-Duret 2007 body (paywalled) → surrogate: OA gBGC review (Galtier 2013 *TIG*; or Duret & Galtier 2009 *Annu Rev Genomics*) | **paywalled** (prime Phase-5 target, already flagged) |
| **Convergent substitution mimics branch-site selection** (SILENT — skill asserts, Mold omits, no note) | **new source note** | Fukushima & Pollock 2023 CSUBST (*Nat Ecol Evol* 7:155); RERconverge Kowalczyk 2019 | likely **paywalled** (Nat Eco Evo) |
| **dS/branch-length saturation operational cutoff** (Mold 3-table GAP) | **new source note** | no primary defines dS<1.5/3 (confirmed absent from manual, §3) → a saturation-diagnostic source (e.g. codon-model saturation methodology) | to determine |
| **Post-hoc (a-posteriori) foreground inflation magnitude** (Mold 2e GAP) | **new source note** | none quantifies choosing foreground *after* inspection; `[[anisimova-yang-2007]]` tests many branches (FWER), `[[zhang-2005-branch-site]]` assumes correct a-priori | needs a source simulating post-hoc foreground choice |
| **Exact recombination downstream FP inflation factor** (Mold 2a GAP) | re-summarize existing | `[[pond-2006-gard]]` Fig. 3 (not accessed) OR use `[[anisimova-2003-recombination]]` absolute rates (already have: to 98%) | Fig. 3 accessible (OUP OA) — re-fetch |
| ≥8 seqs / ≥20 lineages / ≥4 background branches | convention, not citable (skill mis-cites "Yang 2007" / "Anisimova 2001") | not in `[[paml-manual]]` note (superset) → label convention | n/a |
| ENC<35, p≤0.1 site, BEB 0.95/0.99-as-cutoff, ≥50 sites/bin, W→S>1.5 | convention, not citable | — | n/a |

## 3. Confabulation / mismatch audit (the sharp end)

Each verified against the actual note, not `_resume`.

1. **dS<1.5 / dS<3 "Yang 2007 PAML manual"** — **CONFABULATION (mis-cited convention).** Skill threshold table + "Saturated synonymous sites" fix both cite the manual. `[[paml-manual]]` §10/§12: **CONFIRMED ABSENT** — no "dS<1.5," "dS<3," or "saturation" anywhere in the v4.10.8 manual. The citation is fabricated authority for a community convention.

2. **Branch-site "2.71 NOT 3.84"** — **WRONG FRAMING; inverts the sources' own recommendation.** Skill ("LRT critical value confusion" + threshold table + usage-guide) insists 2.71, "NOT 3.84," and states "chi-square df=1 directly is wrong and inflates Type-I." But `[[paml-manual]]` §5d verbatim: null *is* the 50:50 mixture (2.71), **"We recommend that you use χ²₁ (with critical values 3.84 and 5.99) instead of the mixture to guard against violations of model assumptions"**; `[[zhang-2005-branch-site]]` presents both and adopts the conservative 3.84. So both primaries present both cutoffs and **actively lean to 3.84** — the skill's "NOT 3.84" is backwards. Worse, 3.84 (plain χ²₁) is *more* conservative than 2.71, so the skill's claim that df=1/3.84 "inflates Type-I" is directionally inverted. (The Mold gets this right: threshold table carries both rows and eval `null-distribution-correct` forbids flattening to "2.71 only.") Also an **internal skill inconsistency**: `selection_analysis.py` uses 3.84 for M8a-vs-M8 (same mixture null) while the prose insists on 2.71 for branch-site.

3. **"omega_DH > 1 indicates multi-hit | Lucaci 2023"** — **CONFABULATED PARAMETER.** `[[lucaci-2023-busted-mh]]` §12-Q2: there is **no parameter named omega_DH** and no per-hit ω; a single ω_bs multiplies all nonsyn rates, MH is carried by scalars **δ (2H) / ψ (3H)**, which are "not directly biologically interpretable," and adding MH **lowers** ω. The skill's aggregate Python compounds it: `omega_DH = fits['Unconstrained model']['omega3']` wires the invented name to the positive-selection ω class — so "omega_DH>1" is just re-reading the EDS signal (circular). The correct reading is B_2H/B, B_3H/B fractions + `--multiple-hits Double+Triple`. (Mold 2c states this correctly and eval `multi-hit-caught` bans reading raw δ/ψ or an "ω_DH".)

4. **GARD "p < 0.05"** — **CONFABULATION.** Skill threshold table + recombination fix say partition when GARD breakpoint "p < 0.05." `[[pond-2006-gard]]` §12: criterion is **AICc model selection** (accept a break when Aᵢ < A₀); the only p-values in the paper are the *optional* SH incongruence test (P<0.01 Bonferroni) and downstream FEL site classification (P<0.1). "p<0.05 gloss not supported." (Mold 2a + eval `recombination-criterion-not-misstated` deterministic-guard exactly this.)

5. **Inflation-magnitude glosses — all three wrong:**
   - SKILL header: **"inflates Type-I error to ~20-50% (Anisimova & Yang 2007; Pond 2006)."** Doubly wrong: `[[anisimova-yang-2007]]` worst case is **FWER≈25%** (≈23% w/ χ²₁) at 5× under model violation, ≈4-5% correct-model — no "20-50%"; and it is about branch multiple-testing, not "skipping a pre-screen." Pond 2006/GARD gives no such number. The paper that *does* have the big recombination numbers (`[[anisimova-2003-recombination]]`, to 98%) is **not** the one cited.
   - usage-guide: **"recombination breakpoints inflate false positives 5-50x."** `[[anisimova-2003-recombination]]` §12 states **no fold-multiplier**; absolute type-I to 98% (M0-M3), 80% (M1-M2), 20% (M7-M8) — "a fixed 5-50× figure is not supported by, and is narrower than, the paper's own numbers."
   - SKILL foreground fix: **"post hoc specification inflates Type-I by ~5x."** No note quantifies a-posteriori foreground inflation — unsourced (Mold flags this as GAP 2e).

6. **MK "≥50 sites per frequency bin | Messer & Petrov 2013"** — **CONFABULATION (mis-cited).** `[[messer-petrov-2013]]` §12: "no explicit minimum sites-per-frequency-bin and no '≥50 sites/bin' threshold… not supported by this source — report as convention." Sim used 100 chromosomes; fit is over x≥0.1 bins with 1,000-bootstrap CIs. (Mold labels it convention.)

7. **gBGC "W→S ratio > 1.5 | Galtier 2013"** — **convention, mis-attributed.** `[[galtier-duret-2007-gbgc]]` is abstract-only (no number); the "1.5" is cited to a "Galtier 2013" that is not the ingested source and not in the notes. Unsourced convention dressed as a citation. (Mold labels convention + GAPs the mechanism.)

**Where the skill is correct and traceable (no manufactured mismatch):** ω<1/=1/>1 interpretation (Yang & Bielawski 2000); M1a-M2a & M7-M8 as df=2 selection tests, M8a-vs-M8 as the cleaner df=1 test; the branch-site Python `0.5*(1-chi2.cdf(lrt,df=1))` computes the mixture *correctly*; M7-vs-M8 df=2 crit 5.99; aBSREL Holm-Bonferroni internal FWER; PRANK codon-aware + PREQUAL/HmmCleaner *segment-over-block* filtering (Di Franco 2019); NEB-unusable/use-BEB; BEB `*`>95%/`**`>99% markers. The **kinds** of confound the skill names (recombination, alignment, multi-hit, gBGC, post-hoc foreground, saturation, multiplicity) are the right ones — it is the numbers and citations on top that break. One caveat: skill says PAML upper bound "999"; `[[paml-manual]]` gives ω bound **99** (999 is the rate bound) — a probable version/parameter mismatch, low-stakes.

## 4. What the Foundry adds

The skill *has* the confound list and even a "Operational rule for publication" checklist + "Anticipated Reviewer Pushback" table — but these are **self-certifying prose**: the skill declares the checklist; nothing verifies the analyst actually screened, and one pushback row ("trust BUSTED-MH") rests on the confabulated omega_DH. Per the glossary, that is exactly `self-certification` — "blessing its own validity in the same breath, with fluent rationale and no external check." The Mold encodes the Family-B teeth the skill lacks:
- **Non-self-certifying PASS** (Mold §5 + eval `verdict-is-non-self-certifying`): silence on a confound is a FLAG, never a PASS; a PASS demands analyst-supplied evidence of exclusion.
- **Catch-the-planted-flaw guardrails** — `eval.md`'s deterministic + llm-judged properties bound each cardinal sin to a required verdict, and `scenarios.md` ships 11 planted-invalid fixtures + 1 valid control drawn from documented failure modes. This is the `Calibrate`-adjacent discipline (run the check, don't reason to a blessing).
- **Convention-vs-citation honesty** (eval `conventions-labeled-not-cited`, `gaps-not-backfilled`): the exact discipline the skill violates six times over in §3. The Mold labels dS-cutoff/≥50-bin/W→S/BEB-cutoffs as convention and marks gBGC/post-hoc/saturation as unavailable rather than fabricating.
- **Traceability**: every Mold claim carries a `[[note]]` a reader can check back to a governed source; the skill mixes verified and fabricated citations indistinguishably — no line traces.

## 5. Where bioSkills leads (honest credit)

- **CLI/version-compat rigor** — the `## Version Compatibility` block (PAML 4.10.7+, HyPhy 2.5.62+, …), verify-before-use instruction, and introspection commands (`codeml /dev/null`, `hyphy --version`, `packageVersion('RERconverge')`). The Mold has nothing here; this is bioSkills' genuine signature strength (per `project-bioskills.md`, a value the Foundry shares, not contrasts).
- **Embedded runnable code** — control-file generator, LRT, BEB parser, aggregate+FDR pipeline (`false_discovery_control`), ete4 foreground tagging, asymptoticMK/RERconverge R. The Mold is audit-only.
- **Coverage breadth** — ~30 tools/methods incl. convergence (CSUBST/RERconverge/PhyloAcc), DFE (polyDFE/GRAPES/DFE-alpha/impMKT), noncoding (phyloP), RELAX, FUBAR-MH. Mold covers the core spine; tail deferred.
- **PAML-vs-HyPhy reconciliation table** — genuinely useful operational concordance guidance the Mold doesn't attempt (caveat: one row leans on the mis-stated omega_DH).

**Shared, not our edge:** the confound *taxonomy itself* (recombination / alignment / multi-hit / gBGC / post-hoc foreground / saturation / multiplicity) is common to both. The Foundry edge is only the traceability + non-self-certifying verification on top — not a better confound list or better prose.

## 6. Bottom line

Sharpest recovered-traceably win: the branch-site null and the M-model/df spine recover **High** from GPL/CC-BY/OA primaries, and the Mold's convention-labeling caught, at authoring time, four skill claims that turn out to be **fabricated citations to real papers** — dS<1.5→PAML-manual (absent), ≥50-sites/bin→Messer-Petrov (absent), omega_DH→Lucaci (no such parameter), GARD-p<0.05→Pond (it's AICc). Sharpest gap: the **convergent-substitution-as-confound** validity axis — a cardinal sin the skill states and the Mold cannot even flag because no ingested note covers it (silent gap → new note, likely paywalled), alongside gBGC, whose operational criterion stays unrecoverable until a Phase-5 OA surrogate replaces the abstract-only Galtier-Duret source.

---

**Files:** real skill at `github.com/GPTomics/bioSkills/.../positive-selection/{SKILL.md, usage-guide.md, examples/selection_analysis.py}` (usage-guide + Python confirmed to *also* carry confabs 2/3/5/6/7). Candidate Mold at `research/experiments/ingest-positive-selection/candidate-mold/{index,eval,scenarios}.md`. Note: `usage-guide.md` initially 429'd on WebFetch; retrieved via curl. WebFetch summarizer refused the SKILL.md verbatim pull (quote-limit guard) — raw curl used instead.
