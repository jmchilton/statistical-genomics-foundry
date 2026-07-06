# Guidance — cunningham-1999-asr-limitations (paper)

> Attention-directing. Backs "parsimony over-reconstructs the rarer state under asymmetric rates"
> and the broader caution that single-model ASR overstates confidence. Part of the 1999 Syst Biol
> ASR symposium (Pagel 48:612; Schultz & Churchill 48:651 are companion pieces — note them, don't
> summarize here).

## Must capture
- The specific limitation(s) the paper states about reconstructing ancestral character states when
  testing evolutionary hypotheses — capture the paper's own enumeration.
- The parsimony-vs-ML behavior under ASYMMETRIC forward/reverse rates: does parsimony (implicitly
  symmetric) bias toward the rarer state at ancestors? Capture the paper's own statement of the
  direction and cause of the bias.
- Any statement on how much UNCERTAINTY remains in ancestral reconstructions and whether hypothesis
  tests conditioned on a single reconstruction are unreliable. Quote it.
- Any recommendation: model comparison (ER/SYM/ARD-style), reporting uncertainty, not over-
  interpreting a point reconstruction.

## Must-quote (OUP Syst Biol ARR → own-words paraphrase)
- The statement of parsimony's bias under rate asymmetry.
- The caution against treating a single ancestral reconstruction as certain.

## CRITICAL — direction of the parsimony bias is contested downstream (resolve on full text)
A first-pass note (p.665 only) could not capture pp.666–674, and a surrogate search found the
assumed direction may be **backwards**. Do NOT carry any pre-formed direction into the summary.
Capture Cunningham's **exact** statement of:
- Under asymmetric forward/reverse (gain/loss) rates, which METHOD (unordered parsimony vs
  likelihood/ML) over- or under-reconstructs which STATE (the common/favoured vs the rare/unfavoured
  ancestral state)? Quote the sentence verbatim — the direction is the whole point.
- Context: a downstream skill glosses this as "parsimony over-reconstructs the rarer state," but
  an OA data point (Sci Rep 2020, PMC7203120) reports error concentrating on *recovering the
  rare/unfavoured* ancestral state (methods lean toward the common state), and the ML "sink"
  behavior points the opposite way. Report what Cunningham *actually* says; flag if it contradicts
  the gloss. (Attention only — do not confirm either direction; extract the source's.)

## Companion OA sources (for whoever obtains the full text — cite these to THEM, not to Cunningham)
- Joy, Liang, McCloskey, Nguyen, Poon 2016, "Ancestral Reconstruction," PLoS Comput Biol
  12(7):e1004763 (CC BY) — parsimony's equal-rates assumption; single-point-estimate inadequacy.
- Harmon, *Phylogenetic Comparative Methods* (2019) ch.8 (CC BY) — ER-vs-ASY(ARD) model comparison
  via LRT/AIC + marginal-uncertainty reporting; the methodological recommendation cleanly lives here.
- Sci Rep 2020 (PMC7203120), "Accuracy of ancestral state reconstruction for non-neutral traits"
  (CC BY) — asymmetric-rate error mechanism as an independent data point.

## Access / version notes
- Syst Biol 48(3):665–674, 1999. ARR. Verify the exact page range (record 665 from the source, not
  memory). Distinguish from Cunningham, Omland & Oakley 1998 TREE 13:361 "Reconstructing ancestral
  character states: a critical reappraisal" — a DIFFERENT paper; do not merge.
