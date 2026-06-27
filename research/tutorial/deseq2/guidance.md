# Guidance — deseq2 (DESeq2 vignette, tutorial)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Reason this file exists: the first ungiuded pass dropped the "Model matrix not full rank" section,
> which is skill-3's operational detector for unfixable batch/condition aliasing (see issue #7).

## Must capture (the gap the first pass missed)
- The **"Model matrix not full rank"** section in full: the **linear-combinations** case and the
  **levels-without-samples** case. What does each mean operationally?
- What does the vignette say happens to estimability when one variable (e.g. batch) is a linear
  combination of / fully confounded with the variable of interest (e.g. condition)? Quote it.
- The remedies it offers for a non-full-rank design (drop redundant columns; relevel; collapse/group
  replicates; supply a custom model matrix; re-design). Quote the recommended fixes.

## Also capture (batch / skill-3 relevant)
- The batch-in-design pattern `~ batch + condition`; variable-of-interest-last and reference-level
  rules (verbatim).
- The raw, un-normalized counts input rule (verbatim); that vst/rlog are for QC/visualisation, not testing.
- results() defaults: independent filtering on; the `alpha` default; BH correction.

## Must-quote
- The un-normalized-counts input sentence.
- At least one sentence from the "Model matrix not full rank" section.

## Pin
- Record the exact DESeq2 version stated in the vignette + access date.
