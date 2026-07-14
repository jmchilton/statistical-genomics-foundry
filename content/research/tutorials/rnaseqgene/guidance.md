# Guidance — rnaseqgene (Bioconductor RNA-seq workflow, tutorial)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note exists: it is the **corrected locator**. The batch-design ingest first asked
> [[deseq2]] for the "Removing hidden batch effects" content; re-summarization proved that section is
> **not in the DESeq2 vignette** (zero hits across 1.52.0 and seven archived releases) — it is *here*,
> in the rnaseqGene workflow, which the DESeq2 vignette explicitly defers to. This is the only
> corpus-reachable source for the **exact code idioms** by which estimated surrogate variables /
> unwanted-variation factors enter a DE model.

> **License posture: DETERMINE IT FROM THE SOURCE.** This is a Bioconductor *workflow* package, not
> DESeq2 — do **not** assume LGPL. Find the package's actual license (DESCRIPTION / landing page) and
> record it. Apply the matching posture. Function names, argument names, defaults, and design formulas
> are **functional strings** and stay verbatim regardless of posture.

## Must capture (the reason for this note — the SV/RUV idioms)
- The **"Removing hidden batch effects"** section in full. Specifically:
  - Which function estimates the surrogate variables on **count** data — `svaseq()` vs `sva()`? Keep
    the exact call verbatim, **including how the counts are transformed/normalized first** and how the
    gene-filtering (if any) is done before the call.
  - How `n.sv` is chosen in this workflow (is a number passed? estimated? quote what it does).
  - **How the estimated SVs then enter the analysis.** This is THE load-bearing fact. Capture the exact
    idiom verbatim: are the SVs assigned onto `colData` and added to the `design()` formula
    (the `design(ddssva) <- ~ SV1 + SV2 + <condition>` pattern), or is a corrected/"cleaned" matrix
    produced and tested? Keep the design-formula line **verbatim**.
  - The parallel **RUVSeq** example (`RUVg` with empirical control genes): same two questions — the
    exact call, and exactly how the resulting factors enter the design.
- Does the workflow anywhere **warn against subtracting** estimated batch/surrogate effects from the
  data before testing, or against running the hypothesis test on a batch-"cleaned" matrix? Quote it if
  so. **If it is silent, record the silence explicitly** — do not manufacture the prohibition. We need
  to know whether the anti-subtraction rule is *asserted* or merely *implied by placement*.
- Any use of `limma::removeBatchEffect` and what the workflow says it is (and is not) for.

## Must capture (surrounding context, briefly)
- What dataset the workflow uses (airway?) and how it is obtained — a fixture we could stage.
- Where in the pipeline the batch/unwanted-variation step sits relative to the DE test.

## Must-quote (functional strings — verbatim regardless of license)
- The `svaseq()` call and its arguments.
- The `RUVg()` call and its arguments.
- The design-formula reassignment line(s).
- The exact package/workflow version and Bioconductor release stated on the page.

## Silences to record explicitly
- Does it state what to do when batch is **confounded** with the condition of interest? (Expect
  silence — record it.)
- Does it give any rule for **how many** SVs to keep?

## Pin
- rnaseqGene workflow version + Bioconductor release + access date. Note that this workflow tracks
  DESeq2 releases, so re-pin whenever [[deseq2]] is re-pinned.
