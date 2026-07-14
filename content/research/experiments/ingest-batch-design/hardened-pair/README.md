# Hardened pair — post-probe, **non-blind**

> **These are NOT the probe's measurement.** The measurement is `../candidate-doer/` and
> `../candidate-audit/` — assembled **blind** (from the notes alone, never having seen the SKILL.md) and
> **frozen**. Their `[GAP:]` markers are the evidence `../comparison.md` cites; editing them would
> retroactively rewrite the result. Per `/ingest-bioskill` Phase 5: *"never re-blind-assemble the Mold
> after ingesting surrogates; it would contaminate the recoverability measurement."*
>
> **This directory is the *deliverable*** — the blind pair advanced toward runnable/testable using the
> Phase-5 surrogates and the operational facts they closed. It is explicitly **non-blind** and makes no
> recoverability claim.

## What changed, and why

Two hardening passes, one per assessment axis
(`content/research/mold-eval/rubrics/{operability,assessability}.md`).

### Operability — the pair named ~7 tools and gave **zero install guidance**

| Change | Why |
|---|---|
| **New Phase 0 — stand up the toolchain** | The largest clarity deficit. Exact pins (designit 0.5.0, OSAT 1.60.0, sva 3.60.0, DESeq2 1.52.0, limma 3.68.4, rnaseqGene 1.36.0), the `BiocManager::install(version="3.23")` route, and `stopifnot(packageVersion(...) == pin)` assertions. **Pins, not `>=` floors** — designit's API churned *within* 0.x. |
| **`designit` flagged as the hardest dependency** | It is the **primary** allocation tool and is **not on bioconda or conda-forge** (both 404, checked) ⇒ **no biocontainer**. A cast assuming the bioconda path fails to resolve its primary tool. Three concrete remedies given; the OSAT substitution must be *declared*, never silent. |
| **bioconda cannot deliver the pins** | Checked: bioconda's latest are **one Bioconductor release below every pin**. A doer that says "install from bioconda" and quotes 3.60.0 signatures **got 3.58.0**. |
| **Corrected: OSAT `nSim` default is 100, not 5000** | The blind doer inherited "5000-attempt default" from the **2012 paper** (which states no defaults at all). The shipped package's coded default is **100** — **50×–1000× below its own docs' recommendation** — and `create.optimized.setup()` has **no `nSim` formal**, so omitting it silently inherits 100. A plausible-but-wrong operational number, caught only by reading the package. |
| **Determinism section** | Three stochastic steps (designit shuffle; OSAT block+swap; `num.sv(method="be")`), each seeded and each reported. `"leek"` is **deterministic** and needs no seed — grade the two differently. |
| **Provenance block** | `sessionInfo()`, the install route *actually taken*, every contested default written out, seeds, and the **console-string detectors** (`Using null model in ComBat-seq.`, the not-full-rank error, designit's first-iteration-only NA warning). |
| **`[[limma]]` added, with a SCOPE FENCE** | GAP-1 closed: limma's `removeBatchEffect` **Note** is the one first-party *assertion* that a corrected matrix must not feed `lmFit`. **But it does not generalize** — ComBat/RUV/sva = **0 hits** across both limma PDFs. The SV prohibition remains a GAP. |

### Assessability — scenarios now bind **real fixtures to known ground truth**

The rubric's two load-bearing dimensions are `scenarios.md` quality (planted-invalid **+ clean control**,
each with an expected verdict) and **ground truth** (a *known* verdict, not the model's own opinion —
otherwise it is "self-certification wearing a test's clothes").

Fixtures now bound, in order of cheapness:

| Fixture | Ground truth | Small? | Unrestricted? |
|---|---|---|---|
| **Aliased design matrix** → rank deficiency → the exact DESeq2 error string | **Deterministic, data-free.** The cheapest real test that exists. | trivial | yes (no data) |
| **Nygaard null-data simulation** (20k genes, N(0,1), batch effect on 10%, splits 1:5 / 5:1, n=12/120/1200) | **KNOWN-ZERO: true DE = 0 by construction.** ComBat-then-test must inflate; the referee must catch it. Clean control: the **balanced** split must PASS. | yes | yes (synthetic) |
| **Brenes Y-peptide fixture** — 65 Y-chromosome peptides across 21 TMT batches | **REAL-DATA known truth:** Y-peptides *physically cannot* be in **female** channels, yet **median 89%** are "quantified" there (worst 97.5%) — and they sit *inside* the fold-change range of real biology, so **a fold-change cutoff cannot separate them.** | yes | CC-BY |
| **airway** (rnaseqGene) — 8 samples, GSE52778 | **Published reproducible endpoint:** 16,637 rows → **2362 up / 2019 down at padj<0.1.** A clean control the doer must reproduce. | yes | OA |
| **designit `set.seed(17)`, 31 subjects, 3 batches** | The package's **own seeded counter-example** to "just randomize". Exactly reproducible. | yes | MIT |
| **Zhang polyester sim** (918 genes, 2×2, 300 reps) | Over-correction **FPR 0.059–0.067** when the batch effect is mean-only; clean control at 3× dispersion (ComBat-seq correct). | yes | CC-BY |

**Demoted, honestly:** the OSAT 576-row allocation case was **not stageable** (its per-variable marginals
live in an unread supplement) — it became a *reported-analysis* case, where the numbers are the doer's
output rather than something we reproduce. **A fixture whose reader must invent the input is not a test.**

**Judgment-only, and labelled as such — not faked into tests:** the correction-method *decision table*,
in-context collider *identification*, and both demuxlet cases (whose every number sits under the
`[re-check]` Author-Correction flag and **may not be used load-bearing**).

## Still-open (carried forward, never fake-closed)

- **"Don't test on an SV-residualized matrix"** — still unsourced. limma's Note is fenced to
  `removeBatchEffect`/`lmFit`; `[[nygaard-2016]]` is fenced to ComBat-style adjustment on *microarrays*.
- **`be` vs `leek` choice rule** — no source; the package contradicts itself. (And sva's hard-coded
  `p ≤ 0.10` cutoff is documented in *neither* the man page nor Leek 2011 — it is real but **uncited**
  until the sva R source is itself ingested. See `../gap-closing.md`.)
- **`[[kang-2018-demuxlet]]`'s Author Correction** — paywalled, unread. Every threshold from that note
  stays under `[re-check]`.
- **21 of the probe's 29 GAPs are "convention, not citable"** — no confounding cutoff, no allocation
  acceptance threshold, no rule for how many SVs. **The unanimous silence of five independent primaries is
  itself the evidence.** Label them; never cite them.
