# Guidance — korthauer-dmrseq-2019 (paper)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Grounds the methylation select-extreme-then-test signature of [[double-dipping]] and its remedy:
> a permutation null that re-runs region DETECTION under the null. Capture the null construction exactly.

## Must capture
- The double-dipping signature in DMR detection: detecting candidate regions by scanning the genome
  and then testing those SAME regions inflates false discoveries. Does the paper state that naive
  region-detection-then-test approaches FAIL to control FDR? Capture any stated magnitude / comparison.
- The dmrseq remedy — the permutation procedure with a POOLED null distribution: how is the null
  built? Capture that sample labels are permuted, candidate regions are RE-DETECTED under each
  permutation (so the null accounts for the selection/scanning step), and a region-level statistic
  is recomputed. Capture exactly what is pooled and how the region-level p-value is formed.
- The "as few as two biological replicates" claim — capture it precisely (and the pooling that makes
  it possible).
- The region-level test statistic (what it summarizes across CpGs in a region) and how FDR is
  controlled (Benjamini–Hochberg on the permutation-based region p-values).
- Stated scope/assumptions: WGBS data; smoothing; what the method assumes about replicates/coverage.
- Software: Bioconductor package name and the key function + any load-bearing parameter names/defaults.

## Must-quote (apply license-aware rule; default to own-words if license unknown — Oxford paywall likely)
- The naive-method FDR-miscontrol statement.
- The "re-run/permute to build a pooled null" mechanism statement.
- The "two biological replicates" minimum.

## Access / version notes
- Biostatistics 20(3):367–383, 2019; DOI 10.1093/biostatistics/kxy007. Publisher paywalled. Open
  preprint: bioRxiv 183210 (https://www.biorxiv.org/content/10.1101/183210v1.full). Prefer the
  bioRxiv full text; check its license before quoting. Summarize only what you can actually read.
