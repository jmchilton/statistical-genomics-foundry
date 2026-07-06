# Guidance — lucaci-2023-busted-mh (paper / preprint)

> Attention-directing. Answer from the source; if unaddressed, say so. Backs the multi-nucleotide-
> substitution (MNM / multi-hit) confounder and the BUSTED-MH remedy.

## Must capture
- The **mechanism**: how do multi-nucleotide substitutions (instantaneous double/triple hits at a
  codon) create false ω>1 signal in single-hit codon models? State exactly.
- What **BUSTED-MH** adds: double- and triple-hit rate parameters. Capture the HyPhy CLI option
  (e.g. `--multiple-hits Double+Triple`) verbatim, and the output parameter name for the multi-hit
  rate. (A skill claims "omega_DH>1 indicates multi-hit"; report the paper's ACTUAL parameter name
  and its interpretation.)
- Any diagnostic for when MNMs are driving a signal; which taxa/genes are most affected (e.g. viral,
  Plasmodium, Trypanosoma). Quote if stated.

## Must-quote
- bioRxiv preprint — check the posted CC license (CC-BY / CC-BY-NC-ND). If CC, short verbatim quotes
  allowed; else own-words. CLI flags and parameter names are functional strings → verbatim regardless.

## Access / version notes
- Cite: Lucaci AG, et al. 2023. "Evolutionary shortcuts via multinucleotide substitutions and their
  impact on natural selection analyses" (BUSTED+MH). *Mol Biol Evol* 40(7):msad150. Published CC-BY
  version supersedes bioRxiv 2022.12.02.518889 (DOI 10.1101/2022.12.02.518889). Read the journal
  version (PMC10336034). NOTE: an earlier draft of this guidance mis-titled the DOI as "Extra base
  hits" — that is a *different*, earlier Lucaci paper (PLoS ONE 2021;16(3):e0248337), cited here as
  prior work; the DOI above is the correct BUSTED+MH source.
