# Guidance — zhang-2020-combat-seq (paper)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note: TWO jobs. (1) It backs the decision-table row "ComBat-seq: known batch, integer
> counts." (2) It is the ONLY way to settle a claim the skill makes that our corpus flatly cannot
> support: the skill attaches the "Nygaard caveat if unbalanced" to ComBat-seq, but [[nygaard-2016]]
> is verifiably SILENT on RNA-seq/count data (its note records that "RNA-seq", "sequencing", and
> "count" never appear). So: does ComBat-seq's own paper say anything about unbalanced designs and
> inflated false positives? **Attention-directing only — the answer may be "no", and "no" is a finding.**

> **License posture: license-aware (CC-BY-4.0 → verbatim-ok, license_file required).**

## Must capture (method)
- The **model**: what negative-binomial / count model does ComBat-seq fit, and how does it differ
  from ComBat's Gaussian empirical-Bayes model? Capture the equations and the estimated parameters.
- The **inputs and outputs**: exactly what `ComBat_seq` takes (raw integer counts? normalized?) and
  what it returns (adjusted counts?). Quote it. Capture the function signature and the `group` /
  covariate argument and its stated purpose.
- Whether the paper says the adjusted counts may be fed directly into a standard DE pipeline.
  Quote the exact sentence — this is the correct-then-test question.

## Must capture (the unbalanced-design question — attention, not conclusion)
- **Does the paper discuss unbalanced batch–group designs at all?** If it does, capture exactly what
  it says about false positives / inflated confidence / type-I error under imbalance, and quote it.
  If it does NOT, record that as an explicit confident silence (search the full text for "unbalanced",
  "confounded", "imbalance", "type I", "false positive" and report what you find).
- **Does the paper cite or respond to Nygaard et al. 2016?** If yes, quote the response verbatim.
  If no, say so plainly.
- What does the paper report about performance when batch is **confounded** with the biological
  condition? Any simulation covering that regime? Capture the setup and the numbers.

## Must capture (evidence)
- The benchmarking setup: simulations (dispersion/batch-effect parameters, sample sizes, balance) and
  any real datasets. Capture reported type-I error / FDR / sensitivity numbers with their conditions.
- Stated assumptions and limitations (small batches, EB shrinkage behavior, when NOT to use it).

## Must-quote
- The statement of what data ComBat-seq is for (integer counts).
- Any statement about unbalanced or confounded designs (or the confirmed absence of one).
- Any stated limitation.

## Pin
- sva package version providing `ComBat_seq()` as named in the paper; DOI 10.1093/nargab/lqaa078.
