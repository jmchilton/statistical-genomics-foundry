# Vanneste, Van de Peer & Maere 2013 — Inference of genome duplications from age distributions revisited

## 1. Citation
- Vanneste K, Van de Peer Y, Maere S. "Inference of Genome Duplications from Age Distributions Revisited." *Molecular Biology and Evolution* 30(1):177–190, January 2013 (advance access 2012). DOI: 10.1093/molbev/mss214.
- PubMed: PMID 22936721. OUP URL: https://academic.oup.com/mbe/article/30/1/177/1021633.
- PMC id: none found (searched; no free PMC copy located — see Access note).

## 2. Access note
- Full text read via the OUP HTML article page (WebFetch). The page returned the verbatim abstract plus substantial Results / Methods / Discussion sentences and numeric values; extractions were cross-checked across multiple independent fetches and were internally consistent (same specific numbers reproduced), which supports genuine full-text access rather than model synthesis.
- No open-access / PMC / author-PDF copy was found. License posture: OUP, treated as **all-rights-reserved → own-words note**; functional strings (numbers, thresholds, model names, equation forms) reproduced verbatim as facts.
- Figures/tables not directly inspected; figure-derived numbers below are as reported in text.
- Two equation forms (§7) came from a single fetch and may be transcription-garbled — flagged.

## 3. Thesis (1 sentence)
Because K_S (synonymous substitutions per synonymous site) is used as a proxy for paralog age, both the stochastic scatter of synonymous substitutions and K_S saturation systematically distort duplicate age distributions — and saturation alone can generate a spurious peak in the distribution tail that mimics a whole-genome duplication (WGD), so K_S effects must be explicitly accounted for or WGD inferences can be false.

## 4. Problem & context
- WGDs are commonly inferred from **duplicate age distributions**, where a WGD shows up as a **peak** rising above a **small-scale-duplication (SSD) background**.
- Age is proxied by K_S. Two problems degrade this proxy with increasing age: (a) **stochasticity** — synonymous substitution is a random process, so uncertainty in K_S grows with true age; (b) **saturation** — evolutionary models cannot fully correct for multiple/back substitutions at the same site, so estimated K_S plateaus below true divergence.
- Convention: only K_S < 1 treated as reliable; most authors cap age distributions at a K_S cutoff of 1 or 2. The paper revisits whether that convention is right and what artifacts arise past it.

## 5. Method / approach
- **Simulation of synonymous evolution** using a simplified **Goldman & Yang (1994) codon model (GY94)** as described by Yang & Nielsen (2000); a Markov chain over codons with transition/transversion ratio κ (weighted average across gene families) and codon equilibrium frequencies π_j (genome-wide, F3x4).
- The Markov chain was advanced in steps equivalent to an **expected K_S increase of 0.1** up to a total simulation time of **∼K_S = 25**, then K_S re-estimated (maximum likelihood, CODEML / PAML under the same model). This yields, per true synonymous age (bin λ), an **empirical frequency distribution of estimated K_S** capturing both saturation bias and stochastic spread.
- These empirical per-age K_S distributions were folded into population-dynamics / age-distribution models of duplicate retention to see how true underlying age structure maps to an *observed* K_S distribution.
- **Redundancy weighting within duplication events:** paralogs clustered by average-linkage hierarchical clustering; for each split (duplication event) the m pairwise K_S estimates between child clades were each added with weight **1/m** (so large gene families don't dominate).
- Applied across species including *Arabidopsis thaliana*, *Danio rerio*, *Candida albicans*, *Kluyveromyces lactis*.

## 6. Key claims / findings (atomic)
- **K_S stays usable well past the conventional K_S<1 cutoff.** For a synonymous age of 1, the mode of estimated K_S equals the expected K_S; at a synonymous age of 2 the mode still equals expected K_S. Saturation/stochastic effects "remain fairly acceptable until at least a synonymous age of 2."
- **Saturation bias becomes visible by age ~3.** At a synonymous age of 3, the mode of estimated K_S has already shifted down to **2.6** (underestimation).
- **Underestimation grows sharply at high ages** (*A. thaliana*): mode (geometric mean) of estimated K_S at true synonymous ages 5, 10, 15, 20 = **3.6 (4.0), 4.8 (5.1), 5.2 (5.4), 5.4 (5.6)**.
- **Stochastic spread grows with age.** Lower/upper standard deviations: at age 1 ≈ **0.24 / 0.30**; at ages 5, 10, 15, 20 ≈ **0.94/1.24, 1.16/1.50, 1.21/1.56, 1.26/1.62**.
- **The "saturation peak" (cardinal artifact).** Saturation compresses old duplicates onto smaller estimated K_S values, piling them up and producing an artificial peak in the tail of the distribution that can be mistaken for a WGD peak — even with no WGD present. It is an artifact of the K_S estimation process, not a real burst of duplication.
- **Saturation-peak location depends on the modeled timespan, not on a real event.** For *A. thaliana*, the mode of the saturation peak shifts from **∼2.8 to 4.4** as the simulated evolutionary timespan goes from 5 to 20.
- **Saturation onset is species-specific.** In *D. rerio*, *C. albicans*, *K. lactis* the saturation peak sits at a smaller K_S than in other species (they saturate faster), driven by differences in transition bias and codon usage.
- **Old real WGD peaks fade.** Genuine peaks from older WGDs are progressively flattened and dispersed by stochasticity/saturation and gradually blend into the L-shaped SSD background — i.e., real ancient WGDs can *disappear*, the complement of the false-peak problem.
- **Mixture modeling has a hard reliability ceiling.** Mixture-model inference of WGDs from age distributions is only reliable for synonymous distances lower than **2–2.5** (species-dependent).
- **Overall:** K_S effects must be properly accounted for; failure to do so can lead to false WGD inferences.

## 7. Load-bearing statements — OWN-WORDS paraphrase (restrictive license; functional strings verbatim)
Mode used: all-rights-reserved → paraphrase of prose; numeric/threshold/model/equation strings kept verbatim.
1. **Conventional reliability threshold:** only K_S estimates below 1 are usually considered reliable, beyond which saturation is expected to matter; most authors simply cap the distribution at a K_S cutoff of "1 or 2." (Intro.)
2. **Saturation peak definition:** old duplicates are "deposited at earlier synonymous distances because of K_S saturation effects," producing what the paper names the **saturation peak** — an artificial tail peak. (Results.)
3. **Saturation-peak mobility:** for *A. thaliana* the saturation-peak mode moves from **∼2.8 to 4.4** as the simulated timespan grows from 5 to 20 — its position tracks the modeled age range, not a duplication event. (Results.)
4. **Mixture-model ceiling:** mixture-model WGD inference is reliable only for synonymous distances below **2–2.5**. (Discussion.)
5. **Old-peak erosion:** peaks from older WGDs are progressively flattened/dispersed and blend into the **L-shaped SSD background**. (Discussion.)
6. **1/m weighting (functional):** for each duplication-event split, the m child-clade pairwise K_S estimates are each added to the distribution with weight **1/m**. (Methods.)

**Equation forms (flagged — single-fetch, possibly transcription-garbled, verify against PDF before reuse):**
- Simulation-time / K_S relation to sites, reported roughly as `t = K_S × (S / Lc)` (S = synonymous sites, Lc = codons). [summarizer-flagged: exact form unverified]
- Observed-distribution transform combining true age-bin distribution with empirical per-age K_S frequency: `D'(x, t_n) = Σ_λ D_tot(λ, t_n) · f_λ(x)`, where f_λ(x) is the empirical estimated-K_S frequency distribution for true-age bin λ. [summarizer-flagged: exact form unverified]

## 8. Stated scope, assumptions, limitations (source's own)
- Saturation onset and thus saturation-peak position are **species-specific**, governed by transition bias and codon usage — no single universal K_S threshold applies across taxa.
- The K_S < 1 convention is shown to be overly conservative in one direction (K_S remains linearly informative to age ~2) yet the reliability ceiling for *mixture-model peak inference* is ~2–2.5.
- Codon model assumes a constant ω (dN/dS) per pairwise comparison; κ and π_j taken as (weighted/genome-wide) averages.

## 9. Failure modes / invalidity patterns (referee-relevant)
- **False positive (cardinal sin):** a tail peak at high K_S (roughly K_S ≳ 2.5, up to ~4–5 depending on species/timespan) may be a **saturation peak**, not a WGD. Detector/symptom: the peak's K_S position tracks the *modeled age span / saturation ceiling* rather than a biologically dated event, and it appears even in pure-SSD (no-WGD) simulations.
- **False negative:** genuinely ancient WGD peaks flatten and merge into the L-shaped SSD background and can vanish from the distribution.
- **Over-reach of mixture modeling:** fitting mixture components to age distributions beyond synonymous distance ~2–2.5 is unreliable; components fit there may be describing saturation/stochastic structure, not events.
- **Small-sample artifacts:** smaller distributions give a "rugged" density curve with spurious local maxima that can masquerade as peaks.
- **Threshold misuse:** blindly applying a K_S<1 cutoff discards usable signal (to ~age 2); blindly trusting peaks past ~2.5 invites saturation-peak false positives.

## 10. What the source does NOT address (confident silences)
- Does not endorse a single fixed universal K_S cutoff — explicitly makes it species-dependent.
- Non-synonymous / dN or protein-distance-based dating not the focus; the critique is specific to K_S proxies.
- Downstream phylogenomic / gene-tree WGD placement methods are outside its scope (it targets age-distribution / mixture-model inference).

## 11. Open questions / ambiguities the source leaves unresolved
- Exact operational recipe to *separate* a saturation peak from a real WGD peak in an empirical dataset (it diagnoses the artifact and bounds reliability rather than giving a turnkey corrected estimator).
- Precise per-species K_S saturation-onset values are illustrated for a few taxa, not tabulated universally.

## 12. Guidance answers
1. **How saturation biases old-WGD peak placement/shape; Ks where dating becomes unreliable — ANSWERED.** Saturation causes estimated K_S to underestimate true divergence, "depositing" old duplicates at smaller K_S; underestimation is negligible to synonymous age ~2, visible by age 3 (mode 2.6 vs expected 3), and severe by ages 5–20 (mode 3.6→5.4 vs expected 5→20). Mixture-model inference reliable only below synonymous distance 2–2.5. Full saturation region simulated to ∼K_S = 25.
2. **Can saturation/stochasticity CREATE an artificial peak mistakable for a WGD? — ANSWERED (yes).** Yes: the named **saturation peak** is an artifact in the distribution tail arising purely from K_S saturation (old duplicates compressed onto smaller K_S), which can be mistaken for a WGD peak; for *A. thaliana* its mode moves 2.8→4.4 with modeled timespan 5→20, proving it tracks the modeling window, not a real event.
3. **SSD background shaping the distribution independent of WGD — ANSWERED.** SSD-retained duplicates give a typically **L-shaped** background (many recent, few old) because most new duplicates are eventually lost; WGD peaks ride atop this decaying background, and old WGD peaks blend back into it.
4. **Numeric bounds — ANSWERED (captured verbatim above):** conventional reliable cutoff K_S<1; common analysis cap 1 or 2; K_S linearly informative to age ~2; mode shift begins by age 3 (→2.6); mixture-model reliability ceiling 2–2.5; saturation-peak mode 2.8→4.4 (timespan 5→20); simulation to ∼K_S=25 in 0.1 steps; stddevs 0.24/0.30 (age 1) → 1.26/1.62 (age 20). **Bin-width effects on peak detection: not explicitly quantified** — small-sample "rugged"/spurious-maxima effect noted but no bin-width number found. Mark partially ABSENT for bin width.
5. **Mixture-component counts / correction / node-weighting defaults — PARTIALLY ANSWERED.** Node/redundancy weighting: **1/m** weight per duplication-event split (default described). It gives a reliability *ceiling* (K_S<2–2.5) for mixture modeling rather than a recommended component count; a specific default number of mixture components was **not found** in accessible text → ABSENT. No turnkey saturation-correction estimator prescribed.
6. **Exact citation — CONFIRMED.** Kevin Vanneste, Yves Van de Peer, Steven Maere; *Mol Biol Evol* 30(1):177–190; issue Jan 2013 (advance access 2012); DOI 10.1093/molbev/mss214; PMID 22936721.
