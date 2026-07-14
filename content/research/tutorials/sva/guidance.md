# Guidance — sva (Bioconductor vignette, tutorial)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note: the PAPER (leek-storey-2007-sva) establishes the method; this note captures the API
> and the version-pinned DEFAULTS the doer actually types. Per `05-skill-backing-references.md`
> finding #2, tool defaults are where a memory-written skill goes wrong — read them, do not recall them.

> **License posture: license-aware (Artistic-2.0 → verbatim-ok).** Function signatures, argument
> names, and defaults are functional strings and stay verbatim regardless.

## Must capture (API + defaults — read them off the vignette, do NOT assert from memory)
- `num.sv()`: full signature, every argument, and **the default estimation method** (the vignette
  offers more than one; state which is the default and what the alternatives are). What does each
  method actually do?
- `sva()`: full signature and defaults (including `n.sv`, iteration count, and whether `n.sv` is
  auto-estimated when omitted).
- `svaseq()`: does it exist, and **what is it for**? Specifically: does the vignette say `sva()` is
  for (log-)normalized data and `svaseq()` for **count** data? Quote it. (The skill's code calls
  `sva()` on an `expr_normalized` matrix and never mentions `svaseq()` — we need to know whether
  that is correct for counts.)
- `ComBat()` vs `ComBat_seq()`: signatures, and what input each expects (log-normalized vs integer
  counts). Quote the vignette's statement. Capture the `mod`/covariate argument and its meaning.
- The `f.pvalue()` / significance-analysis helper and **how the vignette says to use the SVs
  downstream** — as columns appended to the design matrix, or otherwise. Quote it.
- Any statement in the vignette about **removing/subtracting** batch or surrogate effects from the
  data versus **adjusting in the model**. Quote whatever it says, either way.

## Must capture (validity)
- The vignette's **random-number / null-data sanity check** (Nygaard 2016 states they adapted one from
  the sva user guide). Is such a check present? If so, capture it in full — the procedure and what a
  correct result looks like. This is a directly reusable referee diagnostic.
- Any warnings about applying these functions when batch is confounded with the outcome.

## Must-quote (functional strings only)
- Every function signature named above, with defaults.
- The exact sva package version + Bioconductor release stated in the vignette.

## Pin
- sva version (expect 3.6x on current Bioconductor release), Bioconductor release number, R version,
  access date. Flag explicitly that defaults drift across releases.
