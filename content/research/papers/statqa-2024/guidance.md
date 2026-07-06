# Guidance — statqa-2024 (paper + benchmark)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> This is the PRIMARY grounding for the [[method-applicability-errors]] taxonomy node (the leaf the
> [[audit-method-validity]] referee consults for "is this method real and appropriate?"). The
> recoverability target is the **applicability taxonomy itself** — the data-condition → applicable-
> method mapping and the error-type definitions must be rebuildable from the note alone.

## Must capture
- **The statistical-method taxonomy.** Enumerate the method categories/families StatQA covers
  (e.g. correlation analysis, distribution-compliance/normality tests, variance tests, contingency-
  table tests, descriptive stats, …). How many categories, their exact names, and — critically —
  the **data-condition → applicable-method mapping** (which methods are valid under which data
  characteristics: sample size, normality, variance homogeneity, variable type). This mapping is
  the load-bearing artifact; capture it concretely, not just "it has a taxonomy."
- **The error-type definitions (the headline).** Exact definitions of "**applicability error**"
  vs "**statistical task confusion**" (and any third type). The human-vs-LLM contrast: who makes
  which error type, and by how much. Capture the exact framing + any numbers/percentages.
- **Benchmark construction.** How the 11,623 examples were built — from what source tabular
  datasets; how the ground-truth "applicable methods" per question were labeled (rule-based on
  assumptions? expert?); the columns/format of a StatQA item; how "not applicable" is represented.
- **The sub-abilities tested.** Does StatQA separate (a) selecting the applicable method from
  (b) checking whether the data satisfy a method's assumptions/preconditions? Capture how each is
  scored. The assumption-checking framing is what grounds the referee's "appropriate to this data
  regime."
- **Scores.** Best model + score (is it GPT-4o 64.83%?), other models, the human baseline, and any
  per-category / per-difficulty breakdown. Pin exact numbers.
- **The invented/hallucinated-method boundary (honest scope).** Does StatQA test *selection among
  known real methods* only, or does it also probe *fabricating a non-existent method*? If it is
  selection-among-real-methods only, say so plainly — the referee's `UNRECOGNIZED-METHOD` /
  invented-method case would then be OUT of StatQA's scope (a gap we must source elsewhere). Do not
  paper over this boundary.

## Must-quote (license permitting — see access note; pin the license first)
- The definitions of applicability error vs task-confusion error.
- The applicability-vs-task-confusion human/LLM finding sentence.
- The enumerated list of statistical-method categories (a functional list, keep verbatim if allowed).

## Access / version notes
- Zhu, Du, Li, Luo & Tang, "Are Large Language Models Good Statisticians?", NeurIPS 2024
  Datasets & Benchmarks Track. arXiv:2406.07815; proceedings hash 729786203d…; site
  https://statqa.github.io/ ; code/data https://github.com/HKUSTDial/StatQA .
- **Pin the license before quoting.** arXiv PDF is readable; check the arXiv license (often
  arXiv-nonexclusive, not CC) AND the GitHub repo LICENSE (dataset/code may be MIT/CC — different
  from the paper). Quote verbatim only if the read source's license permits; else own-words +
  verbatim functional strings only (category names, error-type labels, numeric scores).
- The taxonomy/label schema may be clearest in the **GitHub repo** (data files, README) rather than
  the paper prose — read both; note which source each captured fact came from.
