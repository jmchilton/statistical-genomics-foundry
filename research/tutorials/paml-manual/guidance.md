# Guidance — paml-manual (tutorial / tool documentation)

> Attention-directing. Backs the codeml ancestral-reconstruction implementation defaults the skill's
> Python wrapper encodes, and the dS/branch-length saturation guidance. Treat as tool documentation;
> capture exact control-file syntax verbatim (functional strings).

## Must capture
- The `RateAncestor` control-file option: what `RateAncestor=1` produces (the `rst` file with
  per-site posteriors and ancestral sequences) vs `=0`. Capture verbatim option names/values.
- The codeml control-file fields relevant to ASR and their meaning/defaults: `seqtype` (1=codon,
  2=aa, 3=codon-translated), `model`, `NSsites`, `CodonFreq`, `aaRatefile`, `cleandata`, `getSE`.
  Capture exact spellings and accepted values.
- The `rst` output format: section headers the parser depends on (e.g. "Prob distribution at node",
  "List of extant and reconstructed sequences"). Capture verbatim — the skill's regex depends on them.
- Any manual guidance on SATURATION / reliability limits (the skill cites "dS/branch length < 1.0"
  and dS>3 unreliable). Report what the manual actually states; if 1.0/3.0 are not in the manual,
  flag as convention.
- Version notes: PAML 4.9→4.10 output-format stability; whether codeml has a --version flag.

## Must-quote (PAML manual — treat license as restrictive/unknown → own-words prose; but control-file
   keywords, option values, rst section headers, and numeric thresholds are functional strings →
   verbatim)
- The `RateAncestor=1` behavior.
- The rst section-header strings the parser keys on.

## Access / version notes
- PAML manual bundled with the source (github.com/abacus-gene/paml, doc/pamlDOC.pdf). Pin the exact
  PAML version summarized (skill targets 4.10.7+) and record access date. This is the recoverability
  anchor for the skill's PAML code block — capture control-file syntax exactly.
