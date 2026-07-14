# Gap-closing — `experimental-design/batch-design`

> Phase 5 of the `/ingest-bioskill` probe, 2026-07-13. The Phase-3 candidate pair is **left as-is** —
> gap-closing enriches the corpus for eventual human-authored Molds and records what *newly* recovers;
> it does **not** re-open the probe. Re-blind-assembling against surrogate-enriched notes would
> contaminate the recoverability measurement.
>
> **21 of 29 GAPs were labeled *convention, not citable* and were NOT hunted.** A convention has no
> primary to recover — the label is the answer. Only facts truly absent from the corpus *and* blocked on
> an inaccessible primary reached the surrogate hunt.

## Result

| Gap | Surrogate | License | Status |
|---|---|---|---|
| **1. Anti-subtraction prohibition unsourced** | [[tutorials/limma]] — `removeBatchEffect` man page | GPL-2.0-or-later (copyleft) | **CLOSED — narrowly** |
| **2. OSAT operational details** | [[tutorials/osat]] — vignette + refman 1.60.0 | Artistic-2.0 | **CLOSED** |
| **3. No genotype-free demux route** | [[stoeckius-2018-cell-hashing]] | CC-BY-4.0 | **CLOSED (route); decision rule STILL-OPEN**|
| **4. `be` vs `leek` estimator choice** | [[leek-2011-asymptotic-csvd]] | all-rights-reserved (own-words) | **PARTIAL — choice rule STILL-OPEN** |
| **5. Reference/bridge sample per batch** | [[brenes-2019-multibatch-tmt]] | CC-BY | **CLOSED — not convention after all** |
| **6. Run-order randomization** | [[yang-2008-randomization]] | CC-BY | **CLOSED for processing batches; STILL-OPEN for injection order** |

**Both of the probe's "fluent invented doing" rows turn out to have real primaries** (bridge samples →
Brenes; run-order → Yang). The skill was not wrong to include them — it was wrong to state them
uncited, and it stated them in a form the primaries do not support (below).

## Gap 1 — the prohibition exists, and its scope is *narrower than anyone assumes*

**Recovered, verbatim, first-party** (limma reference manual, `removeBatchEffect` **Note**, p. 214 —
author-written docs about the author's own function):

> "This function is intended for plotting and data exploration purposes. This function is not intended
> to be used to prepare data for linear modeling by lmFit. For linear modeling, it is better to include
> the batch factors in the linear model so that lmFit can correctly assess the standard errors of the
> linear model parameters."

Two things this **does not** license:

1. **It does not generalize.** Full-text search of both limma PDFs: **ComBat = 0 hits, RUV = 0 hits, the
   `sva` package = 0 hits.** The Note names exactly `removeBatchEffect` and `lmFit`. limma's *own* SV
   function (`wsva`) carries **no Note and no warning** and only states positively that SVs "can be
   included in the design matrix." **The SV case remains STILL-OPEN.** Any skill asserting "don't
   subtract SVs before testing" is still inventing — the corpus *enacts* it ([[tutorials/rnaseqgene]],
   [[tutorials/deseq2]]) and never asserts it.
2. **The stated mechanism is the standard errors** — an inference/SE argument, **not** a claim about
   biased coefficients or fold-changes. Phrase any downstream rule accordingly.

> **⚠️ Corpus-hygiene defect, fixed.** `05-skill-backing-references.md` cited the **limma User's Guide**
> for this rule. The User's Guide **never mentions `removeBatchEffect`** — hit count **zero**, verified
> twice across ~552 kB of extracted text. The rule lives *only* in the reference manual man page. The
> venue was corrected in `05` in this pass. A citation to a real document that does not contain the
> claim is precisely the failure this project referees — and we had one.

**Reuse-existing correction:** the probe's framing ("our corpus only *enacts* the prohibition") is true
for limma/DESeq2/sva but **false for [[nygaard-2016]]**, which *asserts* it for ComBat-style adjustment:
*"our primary advice would be to account for batch in the statistical analysis… the batch-adjusted data
should not be trusted to be 'batch effect free', even when a diagnostic tool might claim so."*

## Gap 2 — OSAT: the spelling, and a live footgun

- **Spelling settled — and the typo is *not* the paper's alone.** `optimal.block` is the export
  (NAMESPACE, man topic, `See Also`, the `fun="optimal.block"` string). But the **published 1.60.0
  vignette prose** still prints **`optimal.blcok`** (§3.2). The 2012 paper's transposition propagated
  into the package docs and survives today. Both spellings recorded verbatim; not normalized.
- **The footgun.** Coded defaults are `optimal.shuffle(x, nSim=100, k=2)` and `optimal.block(x,
  nSim=100)` — while *every* worked example carries the comment `# demonstration only. nSim=5000 or more
  are commonly used.` and the prose says "usually in the tens of thousands." **The default is 50× to
  ~1000× below the docs' own recommendation**, and `create.optimized.setup()` has **no `nSim` formal** —
  omit it and you silently get 100 iterations. `man/optimal.shuffle.Rd`'s `\usage` doesn't even show the
  default.
- **Silences confirmed:** no run-order/date/position term in the objective; **no acceptance threshold**
  (no χ², p, or objective cutoff — `QC()` prints and renders no verdict); **no confounding warning** —
  and the one sentence addressing degenerate cases is **`%`-commented out of the vignette source**, so a
  published reader never sees it.

## Gap 3 — a genotype-free route exists; a *decision rule* does not

[[stoeckius-2018-cell-hashing]] closes the route (CLR-normalized HTO counts; k-medoids; negative-binomial
background per HTO; **q = 0.99 quantile** as the positive threshold; ~**2–5%** added sequencing cost).

**But no decision rule exists.** The source calls the approaches "complementary … with each having unique
advantages" and never composes requirement + advantage into an if/then. Its only directional guidance is
one-sided and self-favoring.

> **Provenance, flagged not smoothed.** The head-to-head is **the hashing authors' own** — their donors,
> their genotyping, and *they ran the demuxlet arm themselves*. Two authors hold a patent application;
> a co-author is employed by the exclusive licensee. Where the methods disagreed they attributed misses
> to demuxlet, at their own ~24,115 reads/cell, which they call "below the recommended depth" — **a depth
> the paper never states.** This is not a neutral benchmark and must never be cited as one.
> Its batch-effect *motivation* is also **unevidenced**: no experiment measures batch-effect reduction.

## Gap 4 — PARTIAL, and it surfaced a tool/primary divergence

[[leek-2011-asymptotic-csvd]] defines the `"leek"` method — and the headline is a **contradiction**:

- **The `leek` method is not a permutation test.** It is a thresholded eigenvalue count
  (`r̂ = Σ 1{λ_k(W_m) ≥ c_m}`, `c_m = a·m^(−η)`). **It produces no p-values and performs zero
  permutations.** The only significance level in the entire paper is the **Bonferroni-corrected 0.05**
  that belongs to **Buja & Eyuboglu** — i.e. to the *other* method.
- Meanwhile sva's **`be`** implementation uses **`B = 20`** permutations and a **`p ≤ 0.10`** cutoff,
  and *not* the Bonferroni-0.05 that Leek 2011 attributes to Buja & Eyuboglu. **The implementation
  diverges from the primary's description of the method it implements.** Surfaced, not resolved.

  > **⚠️ Citation discipline on that `0.10`.** The cutoff is **real** — read off the sva R source
  > (`R/num.sv.R`: `nsv <- sum(psv <= 0.10)`, hard-coded, not a parameter; Artistic-2.0). But it is
  > **documented in neither [[tutorials/sva]] (man page + vignette) nor [[leek-2011-asymptotic-csvd]]**,
  > and this note must not cite either of them for it. **Until the sva *source* is itself ingested as a
  > note, `0.10` is an uncited number and may not be used load-bearing** — which is exactly what the
  > candidate pair's own `no-invented-acceptance-threshold` property forbids. Recorded here as a
  > *pointer to an unclosed sourcing task*, not as a citable fact. (Caught by the Operability
  > hardening pass; the first draft of this file cited it to [[tutorials/sva]] and was wrong.)
- **STILL-OPEN: when to prefer `be` over `leek`.** No source states it — **not even convention**, because
  the package contradicts *itself* (`num.sv()` defaults to `"be"`; every documented example passes
  `"leek"`; `sva()`'s internal auto-estimate uses `"be"`). Anything a skill says here is invention unless
  it cites the disagreement.
- **Buja & Eyuboglu 1992** is paywalled with no OA route → **still-open as a primary**. Its method is
  nonetheless recoverable from Leek 2011's *description of it* (labeled as such, never laundered) plus
  the Artistic-2.0 sva source.
- **Provenance:** Leek 2011's comparative verdict is *the author of `leek` grading his own estimator on
  his own simulations with his own tuning.* Recorded as the paper's claim about its own method. Never a
  benchmark.

## Gap 5 — the bridge sample is NOT convention. But the *word* is.

[[brenes-2019-multibatch-tmt]] is a real, evidenced primary (CC-BY), with the recommendation verbatim and
the numbers to back it: within-batch CV **1.72%** → cross-batch **11.03%** (6.4× worse) → after
reference-channel normalization **2.96%**. Reference sample belongs in channel **126C or 127N** (avoiding
primary reporter-ion interference). Conditions **alternated**, not grouped.

> **Terminology finding: the paper never says "bridge."** The only "bridge" strings in the whole article
> are *"Xbridge"* (a chromatography column) and *"Faulconbridge"* (an author surname). Its terms are
> **"internal reference sample," "common reference line," "reference channel."** So: **the design is
> citable to Brenes 2019; the term "bridge" is community shorthand and must be labeled, not cited.**

It also carries a **reimplementable known-truth fixture** — 65 Y-chromosome-specific peptides across 21
batches; **median 89%** of a batch's Y-peptides are also "quantified" in **female** channels, worst case
**97.5%** — and these false positives sit *inside* the fold-change range of real biology, so a
fold-change cutoff cannot separate them.

**Anti-subtraction in proteomics dress: total silence.** Zero hits for `t-test`, `p-value`, `hypothesis`,
`differential`, `linear model`. The paper supports **neither** direction. It also never checks whether
batch structure survives its own normalization (residual CV 2.96% vs 1.72% is non-zero).

## Gap 6 — run-order: sourced for processing batches, NOT for injection order

[[yang-2008-randomization]] is an authored, evidenced rule from a 4-center, 16-sample designed experiment:

> "It is a common practice to organize samples having similar characteristics in groups that are
> processed together. **We strongly recommend against this practice.**"

The evidence is sharp: centers that held male arrays at 4 °C while females were washed/stained reported
**18,910 / 17,475** sex-DE genes vs the randomized center's **6,360**; centers that hybridized *by strain
across days* inflated strain-DE to **~6,362 / 5,361** with **π₀ ≈ 0.42** (i.e. ~58% of all genes called
DE). Sharpest fingerprint: **within-day contrasts stay clean while across-day contrasts inflate.**

> **⚠️ Scope caveat — do not stretch it.** Yang 2008 randomizes **discrete processing batches** (day,
> hybridization, wash/stain, scan). **It never addresses instrument run order / injection order or
> continuous temporal drift** — `"drift"`, `"carryover"`, `"run order"`, `"position"` = **zero
> occurrences**. The skill's run-order row cites *"LC-MS, plate edge"* gradients; **that reach is still
> unsourced.** The one source that models injection order (Broadhurst 2018, metabolomics QC) *corrects*
> drift against it and **never prescribes randomizing biological samples across it** — the literature's
> move there is measure-and-correct, not randomize. **A skill citing one source for both is wrong.**

## Still-open (never fake-closed)

1. **"Don't test on an SV-residualized matrix."** No source asserts it. limma's Note is scoped to
   `removeBatchEffect`/`lmFit`; [[nygaard-2016]] is scoped to ComBat-style adjustment on **microarrays**.
   The SV case is enacted everywhere and asserted nowhere.
2. **`be` vs `leek` choice rule.** No source. The package contradicts itself.
3. **Buja & Eyuboglu 1992** — paywalled, no OA route.
4. **Injection-order / MS temporal-drift randomization** — unsourced as a *prescription*.
5. **"Bridge" as a term** — the design is sourced; the word is not.
6. **[[kang-2018-demuxlet]]'s Author Correction** (Nat Biotechnol 38(11):1356) — **paywalled, unread.**
   Every threshold from that note stays under `[re-check]`. Propagated into the candidate-doer in this
   pass (it had been dropped — see `comparison.md`).

## Corpus changes made this pass

- `license-policy.yml`: added **CC-BY-2.0, CC-BY-2.5, Artistic-2.0** (Phase 2) and **GPL-2.0-or-later**
  (Phase 5). Without them these sources fell to the `default` row → own-words-only + `defect: true`,
  which would have *forbidden* carrying the very limma sentence Gap 1 exists to capture.
  **This is a CROSS-REPO change** — `license-policy.yml`'s own header says the source of truth is
  `galaxyproject/foundry-pattern#4` and the Galaxy Foundry keeps an identical copy. **Mirror it there.**
- `LICENSES/`: vendored CC-BY-2.0, CC-BY-2.5, Artistic-2.0, MIT, GPL-2.0-or-later (SPDX plaintext);
  README table updated.
- `05-skill-backing-references.md`: limma venue corrected (User's Guide → reference manual man page).
- `tutorials/deseq2/guidance.md`: the false "Removing hidden batch effects" premise corrected in place,
  recorded rather than deleted, and redirected to [[tutorials/rnaseqgene]].
