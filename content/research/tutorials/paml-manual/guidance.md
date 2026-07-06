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

## Must capture — SELECTION layer (re-summarize; RETAIN all ASR questions above)
> The existing note was ingested for ancestral reconstruction. Re-ingest to ALSO capture the codon
> **positive-selection** machinery. Keep every ASR question above; add these.
- The `NSsites` site-model codes and which map to M0/M1a/M2a/M3/M7/M8/M8a. Does the manual state the
  **number of free parameters / df** for each, and which model PAIRS form a valid nested LRT
  (M1a vs M2a; M7 vs M8; M8 vs M8a)? Quote the `NSsites = ...` comment line verbatim (functional
  string).
- Branch-site **Model A** (`model=2 NSsites=2 fix_omega=0`) and null **A1** (`fix_omega=1 omega=1`) —
  capture exact control-file settings verbatim (already partly captured; confirm).
- Does the manual describe the **`chi2` utility** and the branch-site LRT **null distribution**? Does
  it state the **2.71** critical value or the **50:50 mixture** (½χ²₀ + ½χ²₁)? Quote exactly if
  present; if the manual only says "use χ²" without the mixture, say so explicitly.
- **BEB** (Bayes Empirical Bayes) output in `rst` for NSsites models: which posterior-probability
  columns/labels does the manual document? Are **0.95 / 0.99** cutoffs stated by the manual, or only
  `*` / `**` markers? Report exactly; if the numeric cutoffs are absent, flag as convention.
- `omega` upper bound (the internal "infinity", often `999`): does the manual state it and what
  hitting it means? Quote the number verbatim.
- **Re-confirm the dS-saturation finding**: the skill cites "dS<1.5 / dS<3, Yang 2007 PAML manual".
  The prior note found NO such number in the manual — re-verify and, if still absent, keep the
  explicit "NOT in manual → convention, mis-cited" finding.
