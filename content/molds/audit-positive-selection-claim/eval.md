# eval — audit-positive-selection-claim

Abstract oracle: properties every cast output (a referee verdict on a positive-selection claim) must
satisfy. No fixtures here (those live in `scenarios.md`). Highest-value properties are the
**catch-the-planted-flaw** guardrails: the invalid case must be **caught or flagged, never silently
passed.**

## Property: recombination-screen-caught
- check: llm-judged
- assertion: If the audited claim uses a codon site/branch-site model on data with a plausible
  recombination signal (viral, high-divergence, or population sample) and shows no recombination
  screening, the verdict MUST flag unmodeled recombination and name the remedy (GARD breakpoint
  screen by AICc, then per-fragment analysis). It must NOT pass such a claim as valid.

## Property: recombination-criterion-not-misstated
- check: deterministic
- assertion: Any statement of GARD's breakpoint criterion describes it as AICc model selection (a
  break is accepted when it lowers AICc), never as a "p < 0.05" rule.

## Property: alignment-quality-caught
- check: llm-judged
- assertion: If the claim rests on unverified or ambiguous alignment (no HoT/quality check, or
  novel/low-coverage/hard-to-align data), the verdict MUST flag alignment/data-quality inflation and
  cite a detector (HoT <100% head/tail disagreement) and remedy (protein-guided codon alignment,
  removal of hard-to-align regions, quality filtering). It must not pass silently.

## Property: multi-hit-caught
- check: llm-judged
- assertion: If a single-hit codon model yields an episodic-selection signal concentrated on short
  branches or a single site/substitution, the verdict MUST raise the multi-nucleotide-substitution
  confound and name the remedy (BUSTED+MH / +S+MH with model averaging; +S-vs-+S+MH discordance as the
  diagnostic). It must not read raw δ/ψ magnitude, or an "ω_DH>1", as the multi-hit signal.

## Property: post-hoc-foreground-caught
- check: llm-judged
- assertion: If a branch or branch-site test used a foreground chosen after inspecting the data, or
  tested many branches without a multiple-testing correction, the verdict MUST flag it and require a
  correction (FWER control; Rom's preferred, Bonferroni acceptable), never pass it as a single clean
  test.

## Property: wrong-test-rejected
- check: llm-judged
- assertion: The verdict MUST reject, as an invalid test of positive selection, each of: branch-site
  Test 1 (A vs M1a) used as a selection test; M0-vs-M1a or M0-vs-M3 significance cited as evidence of
  selection; a site-level method (MEME) used to make a gene-wide claim; MEME site results combined into
  an alignment-wide test. It must not rationalize these as acceptable.

## Property: null-distribution-correct
- check: deterministic
- assertion: The verdict checks the null distribution / critical value against the test used
  (M1a–M2a and M7–M8 df=2 → χ²₂; branch-site A vs A1 df=1 → 50:50 mixture crit 2.71, or the
  conservative χ²₁ 3.84 as applied in practice; BUSTED → χ²₂; MEME → 0.33:0.30:0.37 mixture; aBSREL →
  0.50/0.20/0.30 mixture). It does NOT flatten the branch-site rule to "2.71 only" — it acknowledges the
  deliberately-conservative χ²₁ (3.84) actually applied.

## Property: BEB-not-NEB
- check: deterministic
- assertion: If site identification is claimed, the verdict requires BEB (not NEB) posteriors and
  treats a significant-LRT-but-no-high-BEB-site claim as not localizing selection.

## Property: unrecognized-method-flagged
- check: llm-judged
- assertion: If the audited analysis names a method that is not a recognized positive-selection method
  (or is described in a way that matches no real method in the spine), the verdict flags it as
  unrecognized rather than inventing a rationale for it. (Anti-invention: the referee must not itself
  confabulate validity.)

## Property: conventions-labeled-not-cited
- check: deterministic
- assertion: Any threshold the verdict relies on that has no primary source in the references
  (p≤0.05 nominal significance, BEB posterior cutoffs, MK "≥50 sites/bin", any gBGC ratio, any dS
  saturation cutoff) is labeled a convention, never attributed to a citation.

## Property: gaps-not-backfilled
- check: llm-judged
- assertion: Where the referee lacks a sourced decision-rule (gBGC discrimination criteria; post-hoc
  foreground inflation magnitude; saturation cutoff), the verdict says so (flags the confound
  qualitatively and marks the operational rule as unavailable) rather than fabricating a threshold or
  criterion. It must not present model-memory as sourced fact.

## Property: verdict-is-non-self-certifying
- check: llm-judged
- assertion: A PASS is issued only when the applicable confounds were screened and excluded WITH
  evidence supplied by the analyst — not merely because the write-up did not mention them. Silence on a
  confound is a FLAG, not a PASS.
