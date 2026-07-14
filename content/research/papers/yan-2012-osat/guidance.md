# Guidance — yan-2012-osat (paper)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note: the ONLY method-establishing primary for constrained sample-to-batch assignment.
> It is what the Family-A doer executes; designit re-implements its score. The doer half of
> batch-design was previously uncollected — this closes it.

> **License posture: license-aware (CC-BY-2.0 → verbatim-ok).** Short load-bearing verbatim quotes
> permitted, marked. Objective-function formulas, function/argument names, and numbers stay verbatim.

## Must capture (procedure spine — this is the doer's method)
- The **objective function OSAT optimizes**. Write it out. What exactly is being minimized/maximized
  (an expected-vs-observed count discrepancy across batch × factor cells)? Reproduce the formula and
  define every symbol.
- The **algorithm**: how does OSAT search the assignment space (block randomization? random shuffling
  + optimization? how many iterations)? Give the exact procedure a reader could re-implement.
- **How multiple variables are handled at once** — the paper's own words on balancing several
  biological/confounding factors (and any variable-weighting scheme) simultaneously.
- The **R API as the paper presents it**: the setup-object construction and the shuffle/optimize call,
  with exact function names and argument names verbatim. (Downstream we must confirm the skill's claim
  that there is no bare `osat()` function and that `optimal.shuffle()` is the entry point — capture
  whatever function names the paper actually uses, do not normalize them.)
- Any **defaults**: iteration counts, sample-size/batch-size assumptions, tie-breaking.

## Must capture (validity / limits — the honest boundary)
- Does the paper state what happens when **batches cannot hold at least one of each condition**, or
  when a factor cannot be balanced? Quote any such statement.
- Does the paper make any claim about designs that are **already** confounded, or about post-hoc
  correction? Quote it if so; record a confident silence if not.
- What does it **validate against** (simulation? a real dataset? a comparison to random or manual
  assignment)? Capture the exact comparison and any reported numbers.

## Must-quote
- The sentence stating OSAT's goal/objective (even distribution of groups and confounders across batches).
- Any sentence prescribing balance at design time.
- Any explicitly stated limitation.

## Silences to record explicitly
- Does the paper address **sequencing/RNA-seq** or only array/genotyping platforms? Say which
  technologies it names.
- Does it address run-order / position-within-batch (plate wells), or only batch membership?

## Pin
- Bioconductor OSAT package version named in the paper, if any, + access date.
