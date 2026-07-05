# Guidance — csuros-2010-count (paper)

> Attention-directing. The secondary gene-content ASR doer (Count) and the source of two
> referee-relevant facts: the ultrametric/branch-length requirement, and parsimony-vs-likelihood
> for gene-content reconstruction. Oxford Bioinformatics applications note — restrictive/unknown
> license → own-words; functional strings verbatim.

## Must capture
- What Count does: ancestral reconstruction of gene-content / phyletic (presence-absence, integer
  count) profiles on a phylogeny, via BOTH parsimony (Dollo, Wagner) AND probabilistic
  birth-death/likelihood methods. Capture which methods are named and what each outputs
  (per-branch gains/losses, D and L counts, ancestral counts at internal nodes).
- The tree requirement: does the paper state the input tree must be ultrametric / time-scaled, or
  how branch lengths are used? Capture any statement relevant to "negative branch length" failure
  (the skill claims "Count requires ultrametric" — verify what the paper actually says).
- Parsimony vs. likelihood contrast: does the paper say anything about parsimony
  UNDER/OVER-estimating gains or losses relative to likelihood? (Skill's reconciliation table
  claims "parsimony underestimates losses" — capture whether this paper supports that or if it is
  the skill's inference / convention.)
- Input format and any CLI/GUI invocation details, output file names (functional strings) if stated.
  Note it is a Java application.

## Must-capture (functional strings verbatim)
- Named parsimony methods (Dollo, Wagner), the birth-death/likelihood method name.
- Any exact input/output format or file-name string.

## Access / version notes
- Bioinformatics 26(15):1910-1912, Aug 2010; DOI 10.1093/bioinformatics/btq315.
  Skill pins "Count 11.0319+" and cites "26:1910" — citation locus correct; version pin is later
  than the 2010 paper, so version-specific behavior can't be sourced from this paper — flag if the
  skill's CLI (`--ancestral_counts`, Count.jar) can't be corroborated from the note.
- Restrictive/unknown license: own-words for prose; functional strings verbatim.
