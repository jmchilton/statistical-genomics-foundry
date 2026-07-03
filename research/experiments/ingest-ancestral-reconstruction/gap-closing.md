# Gap-closing pass: paywalled primaries → open-access surrogates

> Follow-up to `comparison.md`. Two ingested primaries were paywall-limited (beaulieu-omeara body;
> cunningham-1999 pp.666–674). A retrieval subagent searched OA reviews / package vignettes / free
> textbooks for the missing load-bearing content. This records what recovered, what didn't, and two
> corrections the search surfaced. **No source notes were authored here** — surrogates must be
> ingested via `/summarize-source` in clean context; this is the work-list, not the ingest.

## Gap 1 — HiSSE (beaulieu-omeara-2016): mostly closeable via a GPL vignette

The **hisse vignette "Type I errors, Model rejection, & HiSSE vs. FiSSE"** (GPL; authored by Beaulieu,
so it faithfully mirrors the framework's own argument) carries, citably:

| Sub-item | Status | Carried by |
|---|---|---|
| 1a CID-as-null argument | **found** | vignette Intro (verbatim: a "null" model with the same diversification complexity but independent of the focal character) |
| 1b CID-2 / CID-4 parameterization | **found** | vignette: CID-2 = BiSSE-equivalent complexity on a hidden trait; CID-4 = HiSSE-equivalent complexity, character-independent. Code: `TransMatMakerHiSSE(hidden.traits=, make.null=TRUE)`, `turnover<-c(1,1,2,2)` / `c(1,1,2,2,3,3,4,4)` |
| 1c Type-I numbers | **found (surrogate's re-analysis, not the 2016 primary's own)** | vignette: BiSSE "substantial support ~80%" → "1%" once CID-2 added; 9/34 scenarios >25% false-positive |
| 1d function names | **found** | `hisse()`, `TransMatMakerHiSSE(make.null=TRUE)`, `marginReconHiSSE()`, `GetModelAveNodeRates()`. (`MakeHiSSE`/`GetNullmodel`/`makeHiSSELikelihood` were NOT confirmed real — do not cite.) |
| 1e ASR-**accuracy** claim under hidden vs single rate | **not in this paper (genuine absence)** | HiSSE 2016 is diversification inference only. |

**Correction (1e) — a mis-target the candidate Mold half-inherited.** An "ancestor silently wrong under
a hidden-rate model" claim does NOT belong to HiSSE 2016; it traces to **Beaulieu et al. 2013,
"Identifying hidden rate changes…" (corHMM)**. The candidate Mold already marked HiSSE as
`evidence: hypothesis` + unverified (index §6) and did not assert an ASR-accuracy claim from it — so
it stayed honest — but the fix is to source that claim to the 2013 corHMM paper if it is needed at all.

**Action:** ingest `tutorials/hisse-type1-vignette` (rendered: speciationextinction.info) for 1a/1b/1d
and the decision rule → this can be cited **instead of** the paywalled 2016 primary for those facts.
Re-summarize the 2016 primary from full text only if its *own* original Type-I numbers are specifically
needed. If an ASR-accuracy claim is wanted, source Beaulieu et al. 2013 (corHMM) — a new note.

## Gap 2 — Cunningham 1999: the crux does NOT close on surrogates (and may be backwards)

| Sub-item | Status | Note |
|---|---|---|
| 2a direction of parsimony bias under asymmetric rates | **NOT closed — CONFLICT** | see below |
| 2b single-point-reconstruction is overconfident/inadequate | **found (surrogate-attributable)** | Joy 2016 (nonconvex likelihood surface → a point estimate is inadequate); Harmon ch8 (priors can dominate) |
| 2c compare ER vs ARD, report uncertainty | **found (Harmon-attributable)** | Harmon PCM ch8 §8.6: nested ER vs ASY compared by LRT/AIC/BIC; worked squamate example |

**The high-value finding — 2a is unverified and possibly inverted.** The direction "unordered parsimony
over-reconstructs the **rarer** state under asymmetric rates" entered via the Phase-1 decomposition as a
memory-gloss. Accessible surrogates do **not** confirm it and one contradicts it:
- Sci Rep 2020 (PMC7203120): error is worst when the true ancestral state is the **un-favoured (rarer)**
  state and the away-rate is high — i.e. methods lean toward the **common** state and **under**-reconstruct
  the rare ancestral state.
- The classic likelihood "sink" behavior implicates **ML** (not parsimony) as the method that recovers a
  labile rarer ancestral state.

So the gloss may have the method and/or the direction wrong. **2a cannot be closed from a surrogate** — it
requires the Cunningham 1999 full text (pp.666–674), extracting the exact method×state×direction sentence.
The `cunningham-1999` guidance has been updated to make this the primary attention target.

**Why this matters (method validation).** The blind-assembler left 2a as an explicit `[GAP]` because the
note faithfully held only p.665. Result: the possibly-backwards direction **never entered the candidate
Mold**. The memory-gloss got into an upstream *decomposition*; the flag-don't-fill discipline kept it out
of the *artifact*. This is the failure mode the whole pipeline exists to catch, caught.

## Work-list
- **[DONE]** `tutorials/hisse-type1-vignette` — ingested (GPL). Closes HiSSE 1a/1b/1d and most of 1c.
  Faithfulness corrections the note surfaced: (i) the Type-I figures are **two** sources — ~80%→1%
  (CID-2) / ~16% (full set) are the authors' **own 2016 simulation** (recap), while the true
  re-analyses are of **Rabosky & Goldberg 2017**'s datasets (13/34 non-SDD scenarios >25% FP;
  scenario 50 84%→8% with CID-4); (ii) our earlier "R&G 2015" ref should be **2017** for the
  re-analysis; (iii) function-name fixes — `modelAveRates()` is the real averaging fn (NOT
  `GetModelAveNodeRates`/`GetModelAveTipRates`); `marginReconHiSSE()` exists but args unrecovered.
  1e confirmed absent (no ASR-accuracy claim).
- **[DONE]** `papers/joy-2016-ancestral-reconstruction` — ingested (CC BY). Closes 2b (single-point-
  estimate inadequacy) + parsimony's equal-rates assumption, both verbatim. Review states **no**
  general asymmetric-rate bias direction — 2a stays open (see below).
- **(A) still open** re-summarize `cunningham-1999` from full text — the ONLY way to close 2a; resolve
  the direction. Blocked on paywall access.
- **(held)** `books/harmon-pcm/chapter8` (CC BY) — carries 2c (ER-vs-ARD comparison) + 2b (priors
  caution). Held pending the books-path reconciliation (books use the own-words books path, not
  `/summarize-source`).
- **(optional)** `papers/sci-rep-2020-asr-accuracy-nonneutral` (CC BY) — independent data point on the
  asymmetric-rate error mechanism; attribute to it, do not launder into Cunningham.
- **(new, if needed)** Beaulieu et al. 2013 (corHMM) — only if an ASR-accuracy-under-hidden-rates claim
  is actually needed.

## Attribution discipline (carried forward)
The HiSSE false-positive %s and the ER/ARD recommendation are **surrogate-attributable** (vignette / Harmon),
NOT citations of the paywalled primaries. Only HiSSE 1a/1b are carried by an author-written surrogate that
faithfully mirrors the primary's own framework. Do not launder a review's restatement into a citation of the
paywalled paper.
