# Guidance — limma package documentation (reference manual + User's Guide)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note: the corpus *enacts* the anti-subtraction rule ([[deseq2]], [[rnaseqgene]],
> [[tutorials/sva]]) but never *asserts* it for a tool's own output. limma's docs are the candidate
> first-party assertion. Read them; do not recall them.

> **License posture: license-aware, COPYLEFT (GPL-2.0-or-later → verbatim-ok, isolate).** Quote
> verbatim with the license notice; do **not** paraphrase-to-launder (own-words is not a way around
> copyleft). Signatures/defaults are functional strings.

> **Source of truth is the Bioconductor reference manual PDF.** Do NOT read rdrr.io or other mirrors:
> they serve a stale signature and a truncated Note.

## Must capture (the prohibition — the reason this note exists)
- The `removeBatchEffect` man page. Reproduce the **Description, Details, Value, and Note sections in
  full, verbatim.** Does the documentation state anything about whether the returned matrix may or may
  not be used as input to downstream linear modelling / differential-expression testing? Quote whatever
  it says, in either direction, and say which section it appears in.
- If a reason is given, quote the reason verbatim — **what quantity is claimed to go wrong?**
- **Scope check — load-bearing.** Does the statement mention any method OTHER than
  `removeBatchEffect`/`lmFit` (e.g. ComBat, surrogate variables, RUV)? **Record explicitly whether the
  docs generalize the prohibition beyond this one function, or are silent on the others.** Silence is
  the answer we need if that is what is there — we must not stretch this into an SV claim.
- The full current signature with every argument and default. What are `design` and `group` for, and
  what does the doc say happens if they are omitted?
- The `05.Normalization` overview topic: what one-line role does it assign `removeBatchEffect`?

## Must capture (the User's Guide, separately — a NEGATIVE result is a result)
- Search the User's Guide full text for `removeBatchEffect`. **Report the hit count.** If it is zero,
  say so plainly and prominently — we need to know whether the User's Guide is a citable venue for this
  rule or not. (Our own `05-skill-backing-references.md` previously cited it; that venue is disputed.)
- What the User's Guide *does* say about batch effects (the Blocking / `duplicateCorrelation` section).
  Quote the model-formula idiom verbatim.
- Does the User's Guide anywhere discuss producing a batch-corrected matrix? Quote or record silence.

## Must-quote (functional strings)
- `removeBatchEffect` signature with defaults; the `~Block+Treatment` / `duplicateCorrelation` idioms.

## Pin
- limma version, `Date` field, Bioconductor release, manual generation date, User's Guide "last revised"
  date, access date. Defaults and wording drift across releases — flag that explicitly.
