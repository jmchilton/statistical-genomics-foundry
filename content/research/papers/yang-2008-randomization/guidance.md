# Guidance — Yang et al. 2008, Randomization in Laboratory Procedure (PLoS ONE)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note: neither allocation tool we hold ([[yan-2012-osat]], [[tutorials/designit]]) models run
> order or processing sequence **at all** — the concept is absent from both objective functions. We need
> to know whether "randomize the processing order" is an authored, evidenced rule or an unsourced habit.
> **Report what is there.**

> **License posture: license-aware (Creative Commons Attribution → verbatim-ok).** Record the **exact**
> license wording and version printed on the article (PLOS ONE 2008-era is typically CC-BY-2.5 — verify,
> do not assume). Gene counts and design numbers stay verbatim.

## Must capture (the rule)
- Does the source make an explicit recommendation about how samples should be **assigned to processing
  batches**, and about the **order in which they are processed within a batch**? Quote every such
  sentence verbatim — **including any sentence recommending AGAINST a common practice.**
- What exactly is randomized in their recommended design — batch membership, day, hybridization order,
  wash/stain order, scan order? **Enumerate each level the source names.**
- Reproduce their prescribed design for the example experiment as a concrete recipe (batch sizes, what
  is balanced, what is randomized within what).

## Must capture (the evidence)
- The experiment: how many labs, how many samples, what factors (strain/sex), what platform, how many
  processing runs. Be precise.
- **For EACH center:** what did they do with processing order, and what was the consequence in DE-gene
  counts? Give the numbers and the comparison the source draws. Which centers confounded which
  biological factor with which procedural step?
- Any statement about how much variance is attributable to processing/batch vs biology. Numbers.

## Must capture (scope + silences — load-bearing)
- Which procedural steps does the source treat as **batch-generating** (RNA extraction, labelling,
  hybridization day, wash/stain, scanner, scan date)? List every one it names.
- **Does it discuss instrument RUN ORDER / injection order within a single run, or continuous temporal
  drift across a run** — as opposed to discrete processing batches? Quote, or **record the silence
  explicitly.** We must not stretch this source to cover MS injection order if it does not reach there.
- Does it discuss randomization vs **blocking** (deliberately balancing) — does it recommend one over
  the other, or both together? Quote.
- Does it say anything about statistically **adjusting** for batch after the fact vs designing it out?
  Quote or record silence.

## Pin
- Journal, article number, DOI, date, the exact license wording and version, GEO accession, access date.
