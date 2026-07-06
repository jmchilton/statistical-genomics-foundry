# Guidance — mendes-2020-cafe5 (paper)

> Attention-directing. The primary tool of this skill (CAFE5 = primary_tool). Applications note;
> short. License posture UNKNOWN/restrictive by default (Oxford Bioinformatics) → own-words for
> prose; reproduce FUNCTIONAL STRINGS verbatim (CLI flags, option names, output-file names).
> Confirm CC-BY status from the article page before allowing prose quotes.

## Must capture
- What CAFE5 adds over earlier CAFE versions: gamma-distributed rate categories modelling
  rate variation AMONG gene families. Capture the exact mechanism (discrete gamma, alpha estimated
  by ML, posterior probability of each family's rate category) in the paper's own terms.
- The error-model feature: what the error/annotation-uncertainty mode does and how error rates enter.
  Capture the exact option names/flags if the note states them (functional strings).
- CLI functional strings the skill depends on — capture ONLY what the paper states, mark the rest as
  not-in-paper (manual-level): `-i`, `-t`, `-p`, `-k` (gamma categories; is 4 stated as default?),
  `-e` / `-e<errormodel>` (error model; does the paper document flag-argument concatenation?),
  `-o`. Output artifact names (Base_results.txt, Base_clade_results.txt, Base_asr.tre,
  Base_change.tab) — does the paper name any of these, or are they manual-only? Report which.
- CLAIMS THE SKILL ATTRIBUTES TO THIS PAPER — verify each against the source, quote or refute:
  1. "explicit Type-I error control" — does the paper claim CAFE5 controls Type-I error / false
     positives? Quote the exact language, or state the paper makes no such claim.
  2. "needs > 100 orthogroups (preferably > 1000)" — does the paper state ANY minimum number of
     gene families required? Quote it, or state the paper gives no minimum. (Skill's threshold table
     cites this to "Mendes et al 2020" — we need the ground truth; it may be convention.)
  3. per-family p-value vs. global-lambda-only — does CAFE5 (per this paper) report per-family
     significance, and against what null?
- What "lambda" (birth-death rate) is and what the reported outputs are (global vs per-family vs
  per-clade lambda).

## Must-capture / must-quote items (functional strings verbatim regardless of license)
- Any exact CLI flag, option name, default value, or output-file name stated in the paper.
- The exact phrasing of any Type-I-error / false-positive-control claim (or its absence).

## Access / version notes
- Bioinformatics 36(22-23):5516-5518, Dec 2020; DOI 10.1093/bioinformatics/btaa1022; PMID 33325502.
  NOTE: authors/venue correct; the skill's References mis-dates this "2021" — use 2020.
- Applications note is short; if paywalled, summarize abstract + any OA author manuscript (PMC) and
  mark the boundary. Distinguish paper-stated behavior from CAFE5-manual behavior (manual is a
  separate potential source; do not import manual facts into this note).
