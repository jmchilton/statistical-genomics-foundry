# Guidance — leek-storey-2007-sva (paper)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note: the method-establishing primary for SVA. `leek-2010` NAMES SVA but (per its own
> §10) gives no algorithmic specification — this is the source that does. Also the only candidate
> primary for the "SVs go INTO the model, they are not subtracted from the data" rule.

> **License posture: license-aware (PLOS CC-BY-2.5 → verbatim-ok).** Short load-bearing verbatim
> quotes permitted, marked. Equations, estimator steps, and function names stay verbatim.

## Must capture (procedure spine)
- The **SVA algorithm, step by step**, in enough detail to re-implement: how the primary-variable
  signal is removed, how the residual expression matrix is decomposed, how significant surrogate
  signatures are identified, and how the surrogate variables are constructed.
- The role of the **full model (`mod`) and the null model (`mod0`)** — what each is and why both are
  needed. Quote the paper's framing.
- **How the number of surrogate variables is determined** in the paper (what test/criterion, what
  significance level). This is the `num.sv()` question — capture whatever the paper actually
  specifies, and if it defers the choice, say so.
- **How the surrogate variables are USED downstream.** This is load-bearing: does the paper say the
  SVs are **included as covariates in the model** for the significance analysis? Or does it ever
  describe subtracting them from the data to make a "cleaned" matrix? Quote the exact sentences.
  If the paper is silent on the subtract-then-test variant, record that as a confident silence.

## Must capture (validity axis)
- What does the paper say happens when the **hidden/unmodeled factor is correlated (or perfectly
  correlated) with the primary variable of interest**? Does SVA still work? Quote any statement about
  surrogate variables absorbing the biological signal under confounding. (The skill claims
  "surrogate variables can absorb biology if confounded" — we need to know if the paper says it.)
- Stated assumptions (independence/orthogonality assumptions, linear-model framing, number of
  features vs samples).
- What is SVA validated on (simulation + which real datasets), and what are the reported gains
  (e.g. in power / reproducibility / false-discovery behavior)? Capture the numbers.

## Must-quote
- The definition of a surrogate variable.
- The sentence stating how SVs enter the downstream analysis.
- Any stated limitation about confounding between the hidden factor and the variable of interest.

## Silences to record explicitly
- Does it address count/RNA-seq data at all (2007 — expect microarray only)? Name the data types used.
- Does it give any numeric threshold for "too much confounding to proceed"?

## Pin
- Record whether the paper describes software; if a package/version is named, capture it verbatim.
