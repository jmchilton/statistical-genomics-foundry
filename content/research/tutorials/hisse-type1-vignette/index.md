---
title: 'hisse vignette — "Type I errors, Model rejection, & HiSSE vs. FiSSE"'
type: tutorial
source_id: hisse-type1-vignette
source_url: http://speciationextinction.info/articles/hisse-fisse-type1-vignette.html
version: "hisse 2.1.11"
access_date: "2026-07-03"
license: GPL-2.0-or-later
attribution: "Beaulieu JM. Type I errors, Model rejection, & HiSSE vs. FiSSE. hisse package vignette, rendered 2023-02-16; version pinned from CRAN hisse v2.1.11 in the source note. Rendered vignette and companion Rmd consulted."
derived: own-words-summary
---

# hisse vignette — "Type I errors, Model rejection, & HiSSE vs. FiSSE"

## 1. Citation
- Author: Jeremy M. Beaulieu (HiSSE package author).
- Title: "Type I errors, Model rejection, & HiSSE vs. FiSSE."
- Source type: R package vignette, `hisse` (GPL; see §7 license note).
- Rendered: http://speciationextinction.info/articles/hisse-fisse-type1-vignette.html (page footer: "built on Feb. 16, 2023").
- Raw Rmd: https://rdrr.io/cran/hisse/f/vignettes/hisse-fisse-type1-vignette.Rmd
- Companion consulted for the current-interface API/code: a newer, faster HiSSE function (`hisse-new-vignette.Rmd`),
  https://rdrr.io/cran/hisse/f/vignettes/hisse-new-vignette.Rmd
- Version pin: `hisse` CRAN v2.1.11 (published ~2023-02-11 per CRAN); rendered vignette built 2023-02-16.
  [summarizer-inferred] exact vignette-to-version mapping — the vignette text carries no in-body version string;
  pinned from CRAN + the rendered build date.
- Access date: 2026-07-03.

## 2. Access note
Read the rendered HTML (speciationextinction.info) and the raw Rmd of both this vignette and the companion
`hisse-new-vignette` via a summarizing fetcher that returns excerpts, not always the full file. Prose quotes and
the reported numbers below were pulled directly and cross-checked across two fetches of the rendered page; one
number (§6, the 13/34 figure) was re-fetched verbatim to resolve a conflict between fetches. The reconstruction /
plotting section of the companion vignette could not be retrieved cleanly — some model-averaging function names are
therefore left **unconfirmed and flagged** (§5, §9). This note summarizes only what was actually read.

## 3. Thesis (1 sentence)
Trait-dependent diversification models (BiSSE/HiSSE) should not be judged against a constant-rate null; they must be
compared against *character-independent-diversification* (CID) null models of matched complexity, and once those
nulls are in the candidate set the alarming Type-I / false-positive rates reported for these methods largely
collapse.

## 4. Problem & context
- SSE models (State Speciation and Extinction; Maddison et al. 2007) infer whether an observed binary character
  affects speciation/extinction rates.
- Rabosky & Goldberg (2015) raised the concern that these models produce false support for trait-dependent
  diversification when the true diversification rate is heterogeneous but *independent* of the focal trait.
- Rabosky & Goldberg (2017) proposed **FiSSE**, a nonparametric test for a binary character's effect on
  diversification, and re-tested HiSSE under trait-independent scenarios.
- The vignette's stance: the *fair* comparison for a trait-dependent model is not a constant-rate (Yule /
  birth-death) null but a null that permits rate heterogeneity across the tree while remaining independent of the
  observed trait — this is what the CID models supply.

## 5. Method / approach — recommended procedure + exact interface (functional strings verbatim)

**Core idea.** Always include CID null models in the model set alongside BiSSE/HiSSE, then compare by AIC / model
weights. A trait-dependent model "winning" is only meaningful if it also beats a matched-complexity
character-independent null.

**Current (`hisse()` "new") interface — confirmed function/argument names, verbatim:**

`hisse()` key arguments: `phy=`, `data=`, `f=` (sampling fraction), `turnover=`, `eps=` (a.k.a.
`extinction.fraction`), `hidden.states=` (logical), `trans.rate=`, `sann=` (simulated-annealing optimization;
default `TRUE` — two-step SANN+subplex; `sann=FALSE` reverts to the original optimizer). `root.p` / `root.type`
also exist as root-state settings (arguments confirmed present; specific defaults not stated in read text).

Transition-matrix builder: `TransMatMakerHiSSE(hidden.traits=, make.null=)`.
- `TransMatMakerHiSSE(hidden.traits=0)` → BiSSE-style (no hidden state).
- `TransMatMakerHiSSE(hidden.traits=1)` → HiSSE (one hidden trait → 2 hidden classes).
- `TransMatMakerHiSSE(hidden.traits=1, make.null=TRUE)` → **CID-2** transition structure.
- `TransMatMakerHiSSE(hidden.traits=3, make.null=TRUE)` → **CID-4** transition structure (3 hidden traits → 4
  hidden classes).

**CID-2 setup (verbatim vectors):**
```r
turnover <- c(1, 1, 2, 2)
extinction.fraction <- rep(1, 4)
f <- c(1, 1)
trans.rate <- TransMatMakerHiSSE(hidden.traits=1, make.null=TRUE)
```

**CID-4 setup (verbatim vectors):**
```r
turnover <- c(1, 1, 2, 2, 3, 3, 4, 4)
extinction.fraction <- rep(1, 8)
trans.rate <- TransMatMakerHiSSE(hidden.traits=3, make.null=TRUE)
```

**Example BiSSE fit (verbatim shape):**
```r
dull.null <- hisse(phy=phy, data=sim.dat, f=f, turnover=turnover,
                   eps=extinction.fraction, hidden.states=FALSE,
                   trans.rate=trans.rates.bisse)
```
The `turnover` index vector encodes how speciation/turnover parameters are tied across (observed × hidden) classes:
in a CID model the turnover index depends *only* on the hidden class, never on the observed state — e.g. `c(1,1,2,2)`
gives the two observed states of hidden-class-A the same index (1) and the two observed states of hidden-class-B the
same index (2). This is the code-level expression of "character-independent."

**Ancestral reconstruction / model-averaging functions (partially confirmed):**
- `marginReconHiSSE()` — **confirmed to exist** (package man page: ancestral-state estimation via marginal
  reconstruction for the HiSSE model). Its argument list was NOT visible in the vignette text read here — **flagged
  unconfirmed** (`phy`, `data`, `f`, `pars`, `hidden.states`, `aic`, `n.cores` are plausible but unverified from
  source).
- `modelAveRates()` — listed as "Model average rates at tips and nodes" (current-interface model-averaging helper).
- `GetAICWeights()` — listed as "Compute model weights."
- `plotHisse()` — listed as plotting function for `hisse.states` objects; signature not shown.
- `GetModelAveNodeRates()` / `GetModelAveTipRates()` — **could NOT be confirmed** in the vignette code/text
  actually read (an early fetch mentioned them, but a direct token search of the companion vignette returned
  "not in code"). Treat these names as **unconfirmed**; the current-interface averaging function seen is
  `modelAveRates()`. [flag]

## 6. Key claims / findings (atomic)

Distinguish two sources of numbers — the vignette mixes them:

**(A) Recap of the authors' OWN simulation study (Beaulieu & O'Meara 2016; "we/our" throughout — NOT a re-analysis of
Rabosky & Goldberg):**
- In a "worst-case" scenario (trees simulated with heterogeneous speciation rate, a *neutral* binary character
  painted on), **BiSSE had substantial support ~80% of the time** when no CID model was in the candidate set.
- Adding just **CID-2** dropped substantial BiSSE support to **~1%** on those same data sets.
- Testing the **full set (BiSSE + CID-2 + HiSSE + CID-4)** left **~16%** with substantial support for BiSSE *or*
  HiSSE — still above the 5% nominal error rate (the vignette concedes this).

**(B) Re-analysis of Rabosky & Goldberg (2017)'s own simulated datasets (explicit re-fits, code kindly provided
by Rabosky and Goldberg (2017)):**
- Re-fitting the same BiSSE + CID-2 + HiSSE set with the updated optimizer, on the trait-independent ("non-SDD")
  scenarios they did slightly *worse* than the original study: **of the 34 non-SDD scenarios, 13 had false-positive
  rates exceeding 25%** — attributed to optimization failures in the previous HiSSE version.
- After adding **CID-4** to the set: statistical power to detect *genuine* trait-dependent diversification stays
  unchanged, and **three scenarios remain problematic (scenarios 37, 41, 42; Fig. 2B)**.
- Example turnaround: **scenario 50** (density-dependent tree, fast-evolving neutral trait, q=10) went from
  **84% → 8%** trait-dependent support once CID-4 was included.
- HiSSE's model rejection used by R&G (2017) had included three transition rates — the vignette flags the model
  parameterization used against HiSSE as not matching what the authors intended.

**FiSSE comparison:**
- FiSSE's model-rejection performance is called "encouraging."
- With CID-4 in the set, HiSSE's power remains entirely unchanged and shows greater statistical power compared
  to FiSSE (Fig. 2A).

## 7. Load-bearing statements — own-words. `hisse` is GPL-2.0-or-later (copyleft); per license-policy.yml a source note takes own-words rather than carrying copyleft prose into casts. Numeric facts kept verbatim.
1. Null-model argument: a fairer comparison needs a "null" model with the same diversification-parameter
   complexity but independent of the focal character's evolution, so any complex trait-dependent model
   can be compared against it.
2. CID concept: character-independent (CID) models assume a binary character's evolution is independent
   of the diversification process, without forcing that process to be constant across the whole tree.
3. CID-2 definition: contains four diversification-process parameters (two speciation and two extinction
   rates).
4. CID-4 definition: contains the same number of diversification parameters as the general HiSSE model,
   linked across four hidden states.
5. The ~80% → 1% result (authors' own simulation): without CID models in the candidate set, BiSSE had
   substantial support nearly 80% of the time; adding just the CID-2 model dropped that to 1% on the
   same data sets.

Additional numeric facts (verbatim as facts): full-set false-support rate ~16% (still above the 5%
nominal error rate — "eror" is misspelled in the source); of the 34 non-SDD scenarios, 13 had "false
positive" rates exceeding 25%; scenarios 37, 41, and 42 remain problematic for HiSSE (Fig. 2B);
scenario 50 went from 84% of data sets supporting a trait-dependent model to 8% support once CID-4 is
included; HiSSE's power to detect trait-dependent diversification is unchanged and exceeds FiSSE
(Fig. 2A).

## 8. Stated scope, assumptions, limitations (the source's OWN caveats)
- The vignette concedes the CID fix is not perfect: ~16% (own worst-case set) and 3 scenarios (37, 41, 42) in the R&G
  reanalysis remain above the nominal/25% false-positive bar even with CID-4 included.
- The 13/34 elevated false positives are attributed to optimizer failures in the earlier version of HiSSE —
  i.e. partly a software/optimizer issue, not solely a model-adequacy issue; the updated `sann=TRUE` optimizer is
  the remedy claimed.
- The vignette does not dispute R&G (2017)'s *reported* results; it disputes how HiSSE was *configured* in that test
  (not carried out quite in the way the authors intended), notably the three-transition-rate HiSSE and the
  absence of CID-4.
- CID nulls hold diversification *complexity/parameter count* matched to the trait-dependent model while forcing
  rates to depend only on hidden (unobserved) classes, not the observed focal trait.

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Testing a trait-diversification model against a trivial (constant-rate / Yule / birth-death) null is the core
  invalidity.** A BiSSE/HiSSE "win" over such a null is not evidence of trait-dependent diversification, because a
  neutral trait on a rate-heterogeneous tree produces ~80% false support. Detector: is a matched-complexity CID null
  in the candidate set? If not, the comparison is unfair by construction.
- **Optimization failure inflates false positives.** The 13/34 (>25% FP) result is blamed on optimizer failures in
  the prior HiSSE; symptom = elevated false-positive rate that improves under the two-step `sann=TRUE` routine.
  Referee cue: results from an older HiSSE optimizer / single-step optimization are suspect.
- **Residual non-zero false positives even with CID.** ~16% (own set) and scenarios 37/41/42 (R&G set) still exceed
  nominal error — so "CID included" reduces but does not eliminate the risk; a single significant trait-dependent
  result should not be over-trusted.
- **Model misconfiguration against the null.** Under-parameterizing HiSSE (e.g. three transition rates) or omitting
  CID-4 changes conclusions — the parameterization of the models compared is itself a failure surface.

## 10. What the source does NOT address (confident silences)
- **No ancestral-STATE-reconstruction-accuracy claim.** The vignette provides marginal-reconstruction machinery
  (`marginReconHiSSE`, model-averaged rates) but makes **no claim that hidden-state models reconstruct ancestral
  character states more accurately** than single-rate/observed-state methods. Its focus is Type-I error / model
  rejection for *diversification*, not state-reconstruction accuracy. (Any accuracy claim belongs elsewhere, e.g.
  corHMM / Beaulieu et al. 2013 — a different source; do not import it here.)
- Does not give a full worked reconstruction+plotting code walkthrough in the portion read (that lives in the
  companion new/old HiSSE vignettes).
- Does not restate the original Beaulieu & O'Meara (2016) simulation design in full — it recaps headline numbers.
- Does not provide the exact argument defaults for `root.p` / `root.type` / `marginReconHiSSE` in read text.

## 11. Open questions / ambiguities
- Exact `hisse()` and `marginReconHiSSE()` default argument values (root prior, `n.cores`, upper bounds) not
  recoverable from the read text.
- Whether the current-interface model-averaged **node/tip** rate accessor is `modelAveRates()` (confirmed listed) vs
  `GetModelAveNodeRates()` / `GetModelAveTipRates()` (unconfirmed) — see §5 flag.
- The `hisse` version that exactly produced this rendered vignette is inferred, not stated in-body.
- "Substantial support" threshold (an AIC/weight cutoff) is referenced qualitatively; the exact numeric criterion
  used for the 80%/1%/16% tallies was not captured from the read text.

## 12. Guidance answers
- **Null-model argument** — captured. The vignette's own sentence (§7 quote 1) says a fair comparison needs a null of
  *matched diversification complexity* that is *independent of the focal character*, allowing rate heterogeneity
  across the tree but not driven by the observed trait. CID models supply exactly this; a constant-rate (Yule/BD)
  null is the unfair comparison it rejects.
- **CID-2 / CID-4 exact parameterization** — captured (§5 code, §7 quotes 3–4). CID-2: 1 hidden trait → 2 hidden
  classes, 4 diversification parameters (2 speciation + 2 extinction), turnover `c(1,1,2,2)`,
  `extinction.fraction rep(1,4)`, `TransMatMakerHiSSE(hidden.traits=1, make.null=TRUE)` — BiSSE-equivalent in
  complexity. CID-4: 3 hidden traits → 4 hidden classes, diversification parameter count matched to the general
  HiSSE model, turnover `c(1,1,2,2,3,3,4,4)`, `extinction.fraction rep(1,8)`,
  `TransMatMakerHiSSE(hidden.traits=3, make.null=TRUE)` — HiSSE-equivalent in complexity. In both, turnover indices
  depend only on hidden class, never the observed state (= character-independent).
- **False-positive / Type-I numbers + provenance** — captured with the key distinction (§6). The **~80% → ~1%
  (CID-2) and ~16% (full set)** figures are a **recap of the authors' OWN 2016 simulation** ("we/our"), NOT a
  re-analysis of Rabosky & Goldberg. The **re-analysis numbers** are specifically of **Rabosky & Goldberg (2017)**'s
  datasets: **13 of 34** non-SDD scenarios >25% FP; scenarios **37, 41, 42** remain problematic; scenario **50:
  84% → 8%** with CID-4. So: the vignette contains BOTH an original-simulation recap and R&G-2017 re-analyses — do
  not blanket-label all numbers as "re-analyses."
- **Citation-year correction (guidance said "Rabosky & Goldberg 2015")** — the vignette cites **both**: R&G **2015**
  first raised the concern; R&G **2017** proposed FiSSE and ran the HiSSE re-test that the vignette re-analyzes. The
  Type-I re-analysis is of **2017**, not 2015. Flagging because the guidance note pointed only to 2015.
- **API / function names** — mostly confirmed (§5): `hisse()`, `TransMatMakerHiSSE(..., make.null=TRUE)`,
  `marginReconHiSSE()` (exists; args unconfirmed), `modelAveRates()`, `GetAICWeights()`, `plotHisse()`.
  `GetModelAveNodeRates()` / `GetModelAveTipRates()` could **not** be confirmed from the read text — flagged.
- **Ancestral-STATE-accuracy claim** — **confirmed absent** (§10). The vignette supplies reconstruction machinery but
  makes no state-reconstruction-accuracy claim; its subject is diversification Type-I error / model rejection.
