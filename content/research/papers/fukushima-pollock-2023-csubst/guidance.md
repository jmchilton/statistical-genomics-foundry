# Guidance — fukushima-pollock-2023-csubst (tool method, convergence surrogate)

> Phase-5 surrogate for the SILENT gap: convergent/parallel molecular substitution as a confounder
> that can make a standard branch-site test misread shared/convergent selection as branch-specific
> positive selection. No corpus note covers this. CSUBST supplies the detection statistic (ω_C).

License / routing: the primary (Fukushima & Pollock 2023, *Nature Ecology & Evolution* 7:155–170)
is **paywalled** → summarize from the **author-written CSUBST repo/docs (github.com/kfuku52/csubst,
MIT license, author Kenji Fukushima — confirmed)** for the ω_C definition and method, and anchor the
"ω_C > 1 = convergence beyond neutrality, analogous to but distinct from ω>1 selection" framing to
the **CC-BY 4.0** application at PMC12849823. Own-words for anything drawn from the paywalled
primary; `ω_C` / `dN_C` / `dS_C` and CLI/parameter names are functional strings → verbatim.
**Label every fact's provenance:** method-authors' own (MIT repo docs) vs a CC-BY application's
restatement.

## Must capture (attention-directing)
- How is **ω_C (dN_C/dS_C)** defined and **computed** — over what unit (per-site? per
  branch-combination?), and what neutral expectation is it normalized against? Quote the definition.
- What **decision rule** separates genuine convergent adaptation from neutral/false convergence
  (e.g. ω_C > 1)? Quote it.
- Does the source state that **convergent/parallel substitutions across INDEPENDENT lineages can
  produce a FALSE branch-specific positive-selection or accelerated-dN/dS signal** under standard
  branch-site (codeml / HyPhy) models? Quote the confound statement.
- What **input** does the method need (codon alignment, tree, ancestral states) and what are its
  stated limitations / false-positive modes?
- Does it require **pre-specifying foreground** lineages, or is it hypothesis-free across branch
  combinations? Quote. Capture the CLI invocation / key parameter names verbatim.

## Access / version notes
- Method cite: Fukushima K, Pollock DD. 2023. "Detecting macroevolutionary genotype–phenotype
  associations using error-corrected rates of protein convergence" / CSUBST. *Nat Ecol Evol*
  7:155–170. DOI 10.1038/s41559-022-01932-7. (Title confirmed from the repo citation block; the
  earlier tentative "…non-parametric phylogenetic regression" title in this guidance was WRONG —
  corrected here. Primary body paywalled.)
- OA surrogates actually summarized: CSUBST repo/docs github.com/kfuku52/csubst (MIT); ω_C framing
  restated in the CC-BY 4.0 application **Barua et al. 2026, MBE 43(1):msag015** (verified from PMC —
  supersedes the tentative "PMC12849823 teleost" pointer). Cite each as itself — do NOT launder the
  repo or the application into a citation of the paywalled Nat Ecol Evol paper.
