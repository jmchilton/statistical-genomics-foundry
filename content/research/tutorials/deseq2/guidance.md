# Guidance — deseq2 (DESeq2 vignette, tutorial)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Reason this file exists: the first unguided pass dropped the "Model matrix not full rank" section,
> which is skill-3's operational detector for unfixable batch/condition aliasing (see issue #7).

> **License posture: own-words.** The vignette is LGPL-3.0-or-later (copyleft); to keep the KB
> uniformly permissive, paraphrase all explanatory prose. Keep **functional strings** verbatim as
> facts only: the exact full-rank error text, parameter/function/argument names, numeric thresholds
> (`alpha` default, count threshold), design formulas, and code idioms.

## Must capture (the gap the first pass missed)
- The **"Model matrix not full rank"** section in full: the **linear-combinations** case and the
  **levels-without-samples** case. What does each mean operationally?
- What does the vignette say happens to estimability when one variable (e.g. batch) is a linear
  combination of / fully confounded with the variable of interest (e.g. condition)? Capture it
  (own-words).
- The remedies it offers for a non-full-rank design (drop redundant columns; relevel; collapse/group
  replicates; supply a custom model matrix; re-design). Capture the recommended fixes, keeping the
  function/argument names and code idioms verbatim.

## Also capture (batch / skill-3 relevant)
- The batch-in-design pattern `~ batch + condition`; variable-of-interest-last and reference-level rules.
- The raw, un-normalized counts input rule; that vst/rlog are for QC/visualisation, not testing.
- results() defaults: independent filtering on; the `alpha` default; BH correction.

## Must capture verbatim (functional strings only)
- The exact full-rank error message text.
- The `alpha` default and the DESeq2 version string.

## Also capture (batch-design ingest, 2026-07 — unwanted-variation handling)

> **Correction (2026-07-13): an earlier draft of this section asserted the DESeq2 vignette has a
> "Removing hidden batch effects" section. It does not — and never did.** The re-summarization pass
> verified zero hits for `svaseq(` / `sva(` / `RUVg(` / `surrogate` / `num.sv` across DESeq2 1.52.0
> *and* seven archived releases (1.50.2 → 1.34.0). That section lives in the **rnaseqGene workflow**,
> a different Bioconductor document, which the DESeq2 vignette explicitly defers to. The
> `svaseq()`/`RUVg()`/`design(ddssva)` idioms are therefore sourced from [[rnaseqgene]], not here.
> The false premise is recorded rather than deleted: it is the kind of plausible-but-wrong locator a
> memory-written note would have silently laundered.

Capture from *this* vignette only what it actually says:

- How the vignette says **unwanted variation is corrected** — by inclusion in the **design**, whether
  the batch variable is known directly or *estimated* (it names `svaseq`/`sva` and the `RUVSeq`
  functions as estimators whose output is "easily included in the DESeq2 design"). Capture the
  mechanism statement; note that the vignette gives **no code** for it.
- Any mention of `limma::removeBatchEffect` and what the vignette says it is (and is **not**) for —
  including the scope conditions it attaches (which assay it operates on, what it terminates in,
  whether it requires `design`, and whether it is scoped to balanced batches).
- Whether the vignette ever **warns against subtracting** estimated batch/surrogate effects before
  testing, or against testing on a "cleaned" matrix. **Record the silence if it is silent** — do not
  manufacture the prohibition. (Positional support — correction prescribed as design inclusion,
  testing directed at raw counts, corrected matrices confined to visualization — is not the same as
  an explicit rule, and must not be reported as one.)
- What `counts(dds, normalized=TRUE)` does and does not correct for.
- The vignette's own stated *why*: what it says happens if additional technical variation is not modeled.

## Pin
- Record the exact DESeq2 version stated in the vignette + access date.
- At re-summarization, re-record the DESeq2 version + Bioconductor release + access date, and note
  the delta vs the version pinned in the previous pass.
