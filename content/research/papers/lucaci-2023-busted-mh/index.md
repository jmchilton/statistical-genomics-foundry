---
title: "Evolutionary Shortcuts via Multinucleotide Substitutions and Their Impact on Natural Selection Analyses"
type: paper
source_id: lucaci-2023-busted-mh
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC10336034/
doi: 10.1093/molbev/msad150
access_date: "2026-07-05"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Lucaci AG, Zehr JD, Enard D, Thornton JW, Kosakovsky Pond SL. Molecular Biology and Evolution 40(7):msad150, 2023. DOI 10.1093/molbev/msad150. PMID 37395787; PMCID PMC10336034. Published MBE version read via Europe PMC full-text XML, Open Access under CC-BY 4.0 (preprint bioRxiv 10.1101/2022.12.02.518889 was CC BY-NC; MBE version is canonical here)."
derived: license-aware-summary
tags:
  - domain/dnds
  - domain/molecular-evolution
---

# Evolutionary shortcuts via multinucleotide substitutions and their impact on natural selection analyses (Lucaci et al. 2023)

## 0. Citation-identity warning (read first)

The invocation supplied DOI **10.1101/2022.12.02.518889** but paired it with the title
*"Extra base hits: Widespread empirical support for instantaneous multiple-nucleotide changes."*
**These do not match.** Per the bioRxiv/journal record:

- DOI `10.1101/2022.12.02.518889` is the preprint of **"Evolutionary shortcuts via multinucleotide
  substitutions and their impact on natural selection analyses"** — the BUSTED+MH / BUSTED+S+MH paper.
  This is the source summarized here (matches the dir id `busted-mh`, year 2023, and the guidance topic).
- *"Extra base hits: widespread empirical support for instantaneous multiple-nucleotide changes"* is a
  **separate, earlier paper** by an overlapping author set: Lucaci AG, Wisotsky SR, Shank SD, Weaver S,
  Kosakovsky Pond SL. bioRxiv `10.1101/2020.05.13.091652` → **PLoS ONE 2021;16(3):e0248337**. It is the
  35,000-alignment "1H/2H/3H model preference" survey, and it is *cited within* the present paper (as
  Lucaci et al. 2021) as prior work. It is NOT this source.

The title in the invocation is a paste error; the DOI is authoritative and points to the paper below.

## 1. Citation

- **Authors:** Alexander G. Lucaci, Jordan D. Zehr, David Enard, Joseph W. Thornton, Sergei L. Kosakovsky Pond.
- **Title (published):** "Evolutionary Shortcuts via Multinucleotide Substitutions and Their Impact on
  Natural Selection Analyses." (preprint spelled it "multi-nucleotide"; journal spells "Multinucleotide").
- **Venue read:** *Molecular Biology and Evolution* 40(7):msad150. Published 3 Jul 2023 (collection date
  2023 Jul). PMID 37395787; PMCID PMC10336034. DOI **10.1093/molbev/msad150**.
- **Preprint:** bioRxiv `10.1101/2022.12.02.518889`. v1 posted 2022-12-03 (author list Lucaci, Zehr,
  Kosakovsky Pond); v2 & v3 posted 2023-03-10 (v3 author order: Lucaci, Zehr, Enard, Thornton,
  Kosakovsky Pond). Preprint license **CC-BY-NC**.
- **Access date:** 2026-07-05.
- **Supersession:** The peer-reviewed MBE version supersedes the preprint. **I read the published MBE
  version** (freely readable, more permissive license). Preprint recorded above for pinning; not re-read
  line-by-line — treat MBE msad150 as canonical.

## 2. Access note

Full text obtained via Europe PMC full-text XML for PMC10336034 (complete article body, tables, methods,
references). bioRxiv HTML/PDF was Cloudflare-blocked; the biorxiv REST API supplied version/date/license
metadata. No paywall boundary — the entire published article was read. Figures were read as captions
only (image content not inspected).

## 3. License / quoting mode

**Version read (MBE msad150) is Open Access under Creative Commons Attribution License (CC-BY 4.0)** —
"permits unrestricted reuse, distribution, and reproduction in any medium, provided the original work is
properly cited." This is permissive → **short verbatim load-bearing quotes are allowed** (§7). (The
bioRxiv preprint is the more restrictive CC-BY-NC, but the canonical version I quote is CC-BY.)

## 4. Thesis (1 sentence)

Failing to model instantaneous multinucleotide (multi-hit, MH) substitutions and site-to-site synonymous
rate variation (SRV) jointly biases dN/dS-based selection tests toward false positives; the authors build
an integrated BUSTED-class framework (+S, +MH, +S+MH) plus a model-averaging procedure that controls
false positives while retaining power, and recommend routine inclusion of MH.

## 5. Problem & context

- dN/dS (ω) codon-substitution models are the workhorse of selection detection but rest on decades-old
  simplifying assumptions. Two are known to be violated: (a) synonymous rate is constant across sites
  (SRV violation), and (b) all multinucleotide instantaneous substitutions have zero rate.
- Standard codon models set the instantaneous rate for **every** multinucleotide substitution to zero,
  forcing e.g. `ACC → AGG` to be explained as successive single-nucleotide steps `ACC → ACG → AGG`.
- Empirically, replication errors produce multinucleotide (MH) mutations accounting for **~1–3% of all
  mutations** via several mechanisms (e.g. polymerase ζ). Prior work showed a few-percent MH rate yields
  uncontrolled false-positive rates for episodic diversifying selection (EDS).
- Gap addressed: MH and SRV had not been modeled **jointly**, and no framework existed to test positive
  selection while simultaneously accommodating both.

## 6. Method / approach

**Four nested BUSTED-class models** (each a random-effects branch–site test for a nonzero fraction of
branch–site combinations with ω>1):
- **BUSTED** — baseline; K(=3)-bin discrete ω distribution; no SRV; no MH.
- **+S** — adds site-to-site synonymous rate variation (L(=3)-bin unit-mean GDD on synonymous rate αₛ).
- **+MH** — adds alignment-wide double- (δ) and triple- (ψ) nucleotide substitution rates; no SRV.
- **+S+MH** — adds both SRV and MH. (This paper's net-new model.)
- Nesting: `BUSTED ⊂ +S ⊂ +S+MH` and `BUSTED ⊂ +MH ⊂ +S+MH`. Compared via AICc or nested LRTs.
- Defaults: K=3 ω categories, L=3 synonymous categories (user-tunable). GTR nucleotide model (5 θ params,
  θ_AG=1). Codon frequencies via CF3×4. ω distribution: `0 ≤ ω1 ≤ ω2 ≤ 1 ≤ ω3`.

**Rate-matrix parameterization** (instantaneous rate q_ij between sense codons):
- 1-step syn: `αₛ θ_ij π_j`; 1-step nonsyn: `αₛ ω_bs θ_ij π_j`.
- 2-step syn: `δ αₛ ∏θ π`; 2-step nonsyn: `δ αₛ ω_bs ∏θ π`.
- 3-step syn: `ψ αₛ ∏θ π`; 3-step nonsyn: `ψ αₛ ω_bs ∏θ π`.
- **A single ω_bs multiplies ALL nonsynonymous rates (1H, 2H, and 3H alike).** There is no separate
  "omega" for double or triple hits; MH is carried entirely by the scalar rates δ (2H) and ψ (3H).

**EDS test:** LRT of full model vs. constrained model with `ω3 := 1`. Critical values from a 50:50
mixture of χ²₀ and χ²₂. `+S+MH` reduces to `+S` by setting MH rates to 0. Test that δ=ψ=0 uses a
conservative χ²₂.

**Model averaging** (recommended endpoint): `p_MA = Σ_m p_m w_m`, where p_m is model m's EDS p-value and
w_m is its Akaike weight `w_m = exp(−ΔAICc_m/2)` normalized to sum to 1 over the four models. Interprets
as ~P(model=m | data)-weighted p-value. Averages away a discordant EDS call from a credible alternative.

**Interpreting MH magnitude:** δ, ψ raw values are **not** directly biologically interpretable (rate
matrix terms are further multiplied by nucleotide-rate and frequency terms). Biologically meaningful
quantities are the **fractions of total branch length attributable to 2H and 3H**: `B_2H/B` and `B_3H/B`,
where `B(·)=Σ_{i≠j} q_ij π_j` and B_2H/B_3H restrict the sum to codon pairs differing at 2/3 positions.

**Data:**
- 21 diverse benchmark alignments (historically important selection-analysis datasets; viral, vertebrate,
  mammalian, plant, bacterial).
- Large empirical screen: **9,861** orthologous coding alignments, 24 mammalian species, from Enard et al.
  2016 (viruses-drive-mammalian-protein-adaptation dataset). Trees via RAxML.
  [Note: the published Introduction states "9,181" once — an internal typo; Methods, Results, and Table 4
  consistently use **9,861**, which is the correct dataset size.]
- Simulations: 4-taxon null/power sims (800 codons, HKY85 κ=2) varying δ, ψ, branch lengths, ω3;
  plus empirical-driven sims from the benchmark and Enard datasets.

**Software:** Implemented in **HyPhy version 2.5.42 or later** (BUSTED+MH, +S+MH in the standard HyPhy
library). Snakemake model-testing wrapper `BUSTED_ModelTest` at https://github.com/veg/BUSTED_ModelTest;
HBL source at https://github.com/veg/hyphy. Enard data at Dryad doi:10.5061/dryad.fs756; synthetic data
at https://data.hyphy.org/web/busteds-mh/.

## 7. Load-bearing statements — VERBATIM (permissive CC-BY 4.0; short quotes)

1. **Mechanism of false ω>1 from MH** (Introduction): "when a standard model 'crams' multiple
   nonsynonymous single-nucleotide substitutions onto a short branch to explain a nonsynonymous MH
   substitution, the dN/dS ratio estimate will be artificially inflated to accommodate this."
2. **δ / ψ definitions** (Methods): "δ is the rate for two substitutions relative to the one substitution
   synonymous rate (baseline), ψ is the relative rate for nonsynonymous three substitutions."
3. **δ/ψ not directly interpretable** (Methods): "Parameter values of δ, ψ are not directly biologically
   interpretable, because the corresponding q_ij rate matrix terms are additionally multiplied by
   nucleotide rate parameters and frequency terms."
4. **CLI (functional string)** (Implementation): "You can run this option using the '--multiple-hits'
   option from the command line with either 'Double' to consider DH substitutions or 'Double+Triple' to
   consider DH and TH substitutions."
5. **Absorption → false positives** (Results): "the +S model appears to 'absorb' unmodeled multiple-hit
   substitutions into biased ω estimates, which leads to catastrophically high rates of false positives."

## 8. Key claims / findings (atomic)

- Both MH and SRV are **ubiquitous** in empirical alignments; incorporating them gives a **~1.4-fold
  reduction** in whether positive selection is detected and shifts inferred rate distributions.
- SRV (+S) support is strong for **all 21** benchmark datasets; further MH support (+S+MH preferred by
  AICc) in **12/21**. EDS-detection count falls from **14/21 (BUSTED)** to **9/21 (+S+MH)**.
- In **every** substantively discordant benchmark case, **+S+MH did not detect selection while +S did** —
  i.e. adding MH makes the test more conservative. Manual inspection points to MH along **shorter tree
  branches** as the driver of the difference. Model agreement across all four models: 15/21; best two
  models (+S, +S+MH): 17/21 (Cohen's κ = 0.63, "substantial").
- Simulations: as 2H rate δ rises, **+S false-positive rate climbs to 100%** with increasingly biased ω3;
  **+S+MH and the model-averaged approach keep FPR nominal/conservative**. Same pattern for 3H rate ψ.
  FPR inflation is worst at **short branches (~0.05)** — long branches reach 2H via consecutive 1H steps,
  so gain little from instantaneous 2H; very short branches carry no signal.
- Power: when δ=0, +S+MH loses a little power vs +S, but model-averaging rescues most of it. When δ>0,
  +S's apparent extra power comes at the cost of dramatically upward-biased ω3.
- Large screen (9,861 mammalian alignments): best-fit model counts (rank 1) — **+S 8,943; +S+MH 821;
  BUSTED 93; +MH 4.** ~10% of alignments best fit by an MH-supporting model. 2H/3H substitution fraction
  means: **0.3% / 0.07%** overall; **6.2% / 5.6%** among MH-best-fit alignments.
- Raw EDS detection rates on the screen: **BUSTED 28.4% (2,805/9,861); +S 26.4%; +MH 8.4% (826);
  +S+MH 10.0% (984); best-model 24.6% (2,425); model-averaged 19.3% (1,908).** Only **515** alignments
  are called by all six criteria.
- Under FDR correction (Benjamini-Hochberg, q≤0.2): BUSTED/+S essentially unchanged; **+MH and +S+MH drop
  ~3-fold**; model-averaged drops modestly 19.3%→15.5%.
- ~**80% of positively selected genes are still robustly detected** when MH is accounted for via model
  averaging — MH confounding is framed as a "second-order" effect vs SRV (which affects nearly all genes),
  but still worth routine inclusion.
- EDS detection is driven by very few sites: median **~3 sites** and **~20–30 (branch,site) pairs** carry
  the majority of EDS signal per alignment; for ~5–10% of detections most support comes from a **single
  site**.
- Runtime (24-seq alignments, 4 cores AMD EPYC 7702), relative to BUSTED: +S 3.3×, +MH 6.1×,
  **+S+MH 28.6×**.
- **Practical recommendation:** fit multiple BUSTED-class models and use the **model-averaged** EDS call
  (better power/FPR tradeoff than picking the single best-fit model or requiring model consensus).

## 9. Failure modes / invalidity patterns (referee-relevant)

- **Primary invalidity:** standard single-hit codon models (BUSTED, and +S which lacks MH) produce
  **false-positive EDS and inflated ω** whenever real 2H/3H substitutions are present, especially
  concentrated on **short branches**. Symptom: ω3 estimate balloons; FPR up to 100% in simulation.
- **Diagnostic — model discordance:** +S detects EDS but +S+MH (better or comparable AICc) does not →
  the +S signal is suspect (likely MH-driven). In this paper's discordant cases, higher δ/ψ MLEs and
  large ω3(+S) − ω3(+S+MH) gaps (median 24.7 vs 0.01) accompany the false +S calls.
- **Diagnostic — single-site/single-substitution dependence:** worked HIV-1 *vif* example — a **single
  triple-nucleotide substitution `CAG (Q) → GCA (A)` on a terminal branch at codon 6** carries the bulk
  of the +S EDS signal; **masking that one codon (GCA) with gaps makes +S EDS nonsignificant**, and +S+MH
  already removes the signal. Rule of thumb offered: if only a few (branch,site) pairs give empirical
  Bayes factors >100, or a single site supplies >80% of the alignment-wide LRT statistic, and +S+MH shows
  no EDS → **manually inspect for local alignment error / MH artifact**. They flagged 172 such screen
  datasets.
- **Site/branch support tools:** evidence ratios (ER; ratio of per-site likelihoods between two models)
  identify sites preferring MH models; empirical Bayes factors (EBF) locate branch–site "hot-spots" for
  ω3>1, δ>0, or ψ>0. EBFs are **noisy — exploratory use only**.
- **Overfitting guard:** the +S+MH / +MH implementation warns the user when rate categories collapse to
  near-identical values or very low frequencies. β-globin is a worked overfitting case where +S+MH's loss
  of significance is *not* a real MH signal (not supported by AICc or nested LRT, P≈0.5).
- **Parameter-misreading trap:** interpreting the raw δ or ψ magnitude (or expecting an "ω_DH">1) as the
  MH signal is wrong — δ/ψ are not directly interpretable; use B_2H/B and B_3H/B fractions. Do not read
  δ>1 as "multi-hit present."

## 10. What the source does NOT address (confident silences)

- **MH substitutions spanning codon boundaries** are explicitly **not** modeled (a deliberate,
  conservative simplification preserving codon-level site independence).
- **ω that depends on the amino acids exchanged** (amino-acid preference/exchangeability heterogeneity)
  is not modeled; flagged as an open parameterization problem.
- **Transversion enrichment of MNMs** (MNMs skew toward transversions → nonsynonymous) is not incorporated,
  though acknowledged as another FPR-inflating factor.
- **Alignment generation / data-quality assurance** is out of scope (only post-hoc robustness tools given).
- No claim that MH is concentrated in any specific named taxon such as *Plasmodium* or *Trypanosoma*
  (see §12) — the paper's stance is that MH occurs broadly across diverse taxonomic groups.

## 11. Open questions / ambiguities left unresolved

- Which biological mechanisms and mutational-spectrum details underlie MH in natural populations
  (calls for experimental / CRISPR-informed follow-up).
- How to incorporate codon-boundary-spanning MH, amino-acid-dependent ω, and transversion bias into a
  tractable Markov model without intractable computation.
- General thresholds for the single-site-dependence heuristics (EBF>100, 80%-of-LRT) are offered as
  rules of thumb, not calibrated cutoffs.

## 12. Guidance answers

**Q1 — Mechanism: how do MNMs create false ω>1 in single-hit codon models?**
Single-hit models set every multinucleotide instantaneous rate to zero, so a real 2H/3H change (e.g. a
nonsynonymous double substitution within a codon) must be explained as several successive single-nucleotide
steps. When those forced intermediate steps are nonsynonymous and are packed onto a **short branch**, the
model inflates ω to accommodate them (§7 quote 1). Verbatim: "when a standard model 'crams' multiple
nonsynonymous single-nucleotide substitutions onto a short branch to explain a nonsynonymous MH
substitution, the dN/dS ratio estimate will be artificially inflated to accommodate this." Confirmed in
simulation: +S "absorbs" unmodeled MH into biased ω, driving FPR up to 100% (§7 quote 5). Long branches
are largely immune (multiple consecutive 1H steps are already easy), so **short branches carrying MH are
the specific hazard.**

**Q2 — What BUSTED-MH adds; the CLI option; the multi-hit rate parameter name & interpretation.**
- The models are named **BUSTED+MH** (MH without SRV) and **BUSTED+S+MH** (MH with SRV) — not literally
  "BUSTED-MH". They add two alignment-wide scalar rates: **δ (delta) = double-hit (2H) rate** and
  **ψ (psi) = triple-hit (3H) rate**, both relative to the single-substitution synonymous baseline (§7
  quote 2, verbatim).
- **CLI (functional string, verbatim):** `--multiple-hits` with argument `Double` (double hits only) or
  `Double+Triple` (double + triple). The guidance's `--multiple-hits Double+Triple` matches exactly.
  HyPhy ≥ 2.5.42.
- **Correction to the skill's claim "omega_DH>1 indicates multi-hit":** there is **no parameter named
  omega_DH** (or any per-hit ω). A **single ω (ω_bs)** multiplies all nonsynonymous rates regardless of
  1/2/3 hits; multi-hit is captured by **δ and ψ**, not by an omega. Moreover δ and ψ are **not directly
  biologically interpretable** (§7 quote 3, verbatim) — their raw magnitude is not a clean "MH present"
  threshold. The interpretable quantities are the branch-length fractions **B_2H/B** and **B_3H/B** (the
  fraction of substitutions attributable to 2H / 3H). So a correct restatement is: "nonzero δ (and/or ψ),
  and a non-trivial B_2H/B (B_3H/B) fraction, indicate multi-hit," and MH's practical effect is to
  **lower** inferred ω and remove spurious EDS, not to be read off an ω>1 on double hits.

**Q3 — Diagnostics for when MNMs drive a signal; which taxa/genes most affected.**
- Diagnostics (see §9): +S-vs-+S+MH EDS **discordance**; nonzero δ/ψ MLEs with meaningful 2H/3H fractions;
  **evidence ratios** and **empirical Bayes factors** to localize MH-driven sites/branches; the
  single-site heuristic (few (branch,site) pairs with EBF>100, or one site >80% of the LRT) prompting
  manual alignment inspection; the HIV-1 *vif* codon-masking demonstration.
- Taxa/genes: the paper reports MH occurs **broadly across diverse taxonomic groups** and does **not**
  single out the guidance's hypothesized viral/*Plasmodium*/*Trypanosoma* set. Empirically, high-divergence
  **viral** alignments show strong MH (e.g. tick-borne **Flavivirus NS5** — a high-divergence alignment
  with 51 inferred triple-nucleotide events; **Streptococcus PTS** had notably high 3H fractions;
  SARS-CoV-2 S, IAV H1N1/H3N2, HIV rt/vif, Hepatitis D antigen, rbcL (plant), mammalian mtDNA also
  feature). **No mention of *Plasmodium* or *Trypanosoma*** — that part of the guidance hypothesis is
  unsupported by this source.

**Must-quote (license check):** Done — I read the **CC-BY 4.0** published MBE version, so short verbatim
quotes are permitted (§7). CLI flags and δ/ψ parameter names are functional strings, reproduced verbatim
regardless of license.
