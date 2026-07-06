# Guidance — wen-2025 (paper)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> This is the PRIMARY that closes the `search-then-quantify-same-data` `[GAP]` in [[double-dipping]]
> (the DIA-proteomics signature; a confirmed review-orphan, `[[double-dipping-survey]]`). Recovery
> target: the entrapment methodology + the quantified FDR-underestimation numbers + the same-spectra-
> reuse mechanism. Source is CC-BY — short verbatim load-bearing quotes are allowed.

## Must capture
- **The headline claim + numbers.** Do DIA tools control FDR? At which levels (precursor / peptide /
  protein)? Pin the entrapment-measured inflation figures exactly (e.g. ~6.7% precursor / 4.7%
  protein at an estimated 1–2% FDP on a normal dataset; ~48.3% precursor / 44.2% protein on
  single-cell DIA) — which tool, which dataset, which level for each number. Which tools tested
  (DIA-NN, Spectronaut, EncyclopeDIA?) and across how many datasets.
- **The entrapment methodology.** They classify the entrapment-FDR-validation methods in use — capture
  which is *invalid*, which gives only a *lower bound*, and which is *valid but underpowered*, and
  WHY each. Capture the **paired entrapment** method they introduce (the tighter valid bound) and how
  entrapment FDP is actually estimated (how entrapment sequences are added, how hits are counted).
- **The data-reuse / double-dipping MECHANISM (load-bearing for our signature).** How does reusing the
  same spectra across search + ML rescoring (Percolator-style semisupervised) misuse the target/decoy
  label and break the target-decoy assumption → anticonservative (deflated) reported FDR? Quote the
  "multiple spectra … from the same peptide species" sentence and any statement tying rescoring/data
  reuse to FDR underestimation.
- **The remedy.** Entrapment validation as the correct *external* audit (vs internal target-decoy
  self-report); the paired-entrapment method; FDRBench tooling; any recommendation on proper control
  (run-specific decoys, cross-validation of the rescorer, two-pass/global FDR).
- **The operational detector** we could reuse: the entrapment procedure as a null-style empirical check
  (add known-absent sequences; if they are identified above the claimed FDR, control has failed).

## Must-quote (CC-BY — verbatim allowed for load-bearing statements)
- The mechanism sentence (same-spectra reuse / target-decoy misuse under rescoring).
- The headline inflation figures + the three-validation-methods classification.
- The definition of entrapment / entrapment-based FDR validation.

## Access / version notes
- Wen B, Freestone J, Riffle M, MacCoss MJ, Noble WS, Keich U. "Assessment of false discovery rate
  control in tandem mass spectrometry analysis using entrapment." *Nature Methods* 22(7):1454–1463,
  2025. DOI 10.1038/s41592-025-02719-x. PMID 40524023.
- **Open access, CC-BY 4.0** — read the free full text at PMC12240826
  (https://pmc.ncbi.nlm.nih.gov/articles/PMC12240826/). bioRxiv preprint 10.1101/2024.06.01.596967.
  Software FDRBench: github.com/Noble-Lab/FDRBench. Read the PMC full text (main + methods + any
  entrapment-procedure detail); note if figures/tables (pixel content) or supplement were not read.
