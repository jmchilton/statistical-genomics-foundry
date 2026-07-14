# Guidance — Stoeckius et al. 2018, Cell Hashing (Genome Biology)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note: our only demultiplexing primary ([[kang-2018-demuxlet]]) requires external genotypes
> for every donor, offers no genotype-free route, and runs no head-to-head against barcoding. This
> source is the candidate alternative. **We need the route AND the choice between routes — not a
> verdict on which is better.**

> **License posture: license-aware (CC-BY-4.0 → verbatim-ok).** Short load-bearing quotes, marked.
> Thresholds, quantiles, error rates and software names are functional strings and stay verbatim.

## Must capture (the method — recoverable, not gestural)
- What is physically attached to the cells, against which surface proteins, and at what step of the
  workflow? What extra library is sequenced, and what fraction of sequencing cost does the source say
  it adds? Give the number.
- The classification procedure end to end: normalization of HTO counts, clustering step, the
  distribution fitted to background, and **the exact numeric cutoff** used to call a barcode
  "positive". Quote the threshold.
- How are singlets / multiplets / negatives defined from the positive calls?
- What is "super-loading", and what doublet rates does the source report with and without it?
- Named software and versions; the counting pipeline; input/output artifacts.

## Must capture (the comparison — this is why we are here)
- Does the source compare Cell Hashing head-to-head against genotype-based demultiplexing? If so:
  **whose data, whose analysis, and who ran which arm?** Capture the *design* of the comparison, not
  just the conclusion.
- Quote every sentence that states an advantage or a requirement of EITHER route (genotype-based or
  hashing). **We want both columns of the trade-off, in the source's own words.**
- **Does the source state a rule for WHEN to use which route?** Quote it verbatim if so. If it only
  calls the approaches "complementary" without a rule, say that plainly.
- Where the two methods disagreed, what explanation does the source give, and what does it report as
  the sequencing depth of its own experiment relative to the other method's stated requirement?
  Capture the numbers — **and flag that this is the hashing authors assessing the other method** (they
  own one arm; this is not a neutral benchmark).

## Must capture (limitations / failure modes)
- Cells or samples for which hashing cannot work (surface epitopes, cell type, species).
- Ambient/background HTO signal; what does it cause, and what is the stated mitigation?
- Doublets the method CANNOT detect. Quote.
- Anything said about batch/technical effects being reduced by pooling — quote it exactly and note what
  evidence backs it (**do not accept a bare claim as an evidenced one**).

## Pin
- Journal, volume, article number, DOI, publication date, license text verbatim, access date,
  GEO/SRA accessions for the data.
