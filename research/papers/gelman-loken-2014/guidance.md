# Guidance — gelman-loken-2014 (paper + working paper)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> This is the ORIGIN source for the [[garden-of-forking-paths]] pattern — capture the definition and
> the *latent-multiplicity* mechanism precisely; the boundary vs p-hacking is the load-bearing part.

## Must capture
- The exact definition of "the garden of forking paths," in the authors' own framing.
- **The load-bearing claim:** does the source state that the problem arises EVEN WHEN (a) only a
  single analysis is run — no fishing / no p-hacking — and (b) the hypothesis was posited ahead of
  time? Capture how they argue error inflates from the *paths not taken* (the analysis that WOULD
  have been done under different data), not from analyses actually performed. This is the distinction
  from p-hacking — pull it exactly, quote the working-paper title if useful.
- Concrete examples of forks (which comparison / subgroup / covariate / interaction / exclusion /
  coding choice, made after seeing the data). Capture at least the specific worked examples they use.
- Why a reported p-value is uninterpretable when the analysis was data-contingent (the null
  distribution / reference set is undefined because the analysis family is undeclared).
- The recommended remedy: pre-registration / pre-specification of the analysis; and any mention of
  multiverse / specification-style reporting.
- Whether they distinguish this from classic multiple-comparisons correction (why correcting the
  tests you ran does not fix the latent multiplicity).

## Must-quote (own-words if license restrictive — Am Sci is all-rights-reserved)
- The definition of the garden of forking paths.
- The "even when there is no fishing expedition or p-hacking" claim (the working-paper title carries it).

## Access / version notes
- Gelman A, Loken E. "The Statistical Crisis in Science." *American Scientist* 102(6):460, 2014
  (DOI/URL: americanscientist.org). Plus the 2013 Columbia Statistics working paper "The garden of
  forking paths: Why multiple comparisons can be a problem, even when there is no 'fishing expedition'
  or 'p-hacking' and the research hypothesis was posited ahead of time" (open PDF on Gelman's Columbia
  page; a copy at psychology.mcmaster.ca/bennett/psy710/readings/gelman-loken-2014.pdf).
- Both are freely readable; likely all-rights-reserved (Sigma Xi / author working paper) → own-words
  mode, functional strings verbatim. Read the working paper for the mechanism/examples (fuller) and
  the Am Sci article for the published framing; note which source each captured fact came from.
