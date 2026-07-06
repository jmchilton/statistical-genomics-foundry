# Guidance — murrell-2015-busted (paper)

> Attention-directing. Answer from the source; if unaddressed, say so. Backs BUSTED — the HyPhy
> gene-wide test for episodic diversifying selection (does ANY branch have ANY site under selection).

## Must capture
- The **exact question** BUSTED answers and its **null model** (constrained ω ≤ 1 across the
  distribution vs the alternative allowing an ω>1 class). State precisely how the LRT is formed.
- The **codon substitution model** used (e.g. MG94×REV / GTR). Capture the model name.
- The **test statistic + significance threshold** the paper recommends (LRT p-value); is a specific
  cutoff stated by the paper, or left to the user? Report exactly.
- What BUSTED does **not** do (it does not localize WHICH sites/branches — that's MEME/aBSREL);
  capture the paper's own statement of scope if present.
- Output-JSON field names a downstream parser keys on (e.g. `test results` p-value), if documented.

## Must-quote
- OUP *MBE* — **all-rights-reserved → own-words prose**; model names, option/JSON field names, and
  numeric thresholds are functional strings → verbatim.

## Access / version notes
- Cite: Murrell B, et al. 2015. "Gene-wide identification of episodic selection." *Mol Biol Evol*
  32(5):1365–1371. DOI 10.1093/molbev/msv035. Pin HyPhy ≥2.5.x if a version is stated. If paywalled,
  summarize abstract + readable portion and mark the boundary.
