# Guidance — pond-2006-gard (paper)

> Attention-directing. Answer from the source; if unaddressed, say so. Backs GARD, the recombination
> breakpoint pre-screen a positive-selection pipeline runs before codon tests.

## Must capture
- What GARD does: the genetic-algorithm search for recombination breakpoints, and the
  **model-selection criterion** used to accept a breakpoint. State exactly (is it AIC-c? a
  Kishino–Hasegawa / KH test? both?).
- Does GARD call breakpoints via a **p-value threshold** (a skill claims "p<0.05"), or via
  model-selection (AIC-c improvement / KH test)? Report the paper's actual criterion precisely —
  this probes a likely mis-gloss; do not confirm "p<0.05" unless the paper states it.
- The magnitude by which **unmodeled recombination inflates false positives** in downstream
  selection inference. Capture exact numbers.
- Any stated runtime/scaling caveat (e.g. slow beyond a sequence count).

## Must-quote
- OUP *MBE* — **all-rights-reserved → own-words prose**; criterion names, thresholds, and output/JSON
  field names are **functional strings → verbatim**.

## Access / version notes
- Cite: Kosakovsky Pond SL, Posada D, Gravenor MB, Woelk CH, Frost SDW. 2006. "Automated Phylogenetic
  Detection of Recombination Using a Genetic Algorithm." *Mol Biol Evol* 23(10):1891–1901.
  DOI 10.1093/molbev/msl051 (CC BY-NC — full text open). NOTE: an earlier draft of this guidance
  mis-titled this "GARD: a genetic algorithm for recombination detection" — that is a *separate*
  Bioinformatics software note (22(24):3096–3098, PMID 17110367). The DOI above is the MBE methods
  paper (the correct algorithmic source).
