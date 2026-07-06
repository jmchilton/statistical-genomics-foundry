---
title: "Genome analysis of multiple pathogenic isolates of Streptococcus agalactiae: implications for the microbial pan-genome"
type: paper
source_id: tettelin-2005-pangenome
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC1216834/
doi: 10.1073/pnas.0506758102
access_date: "2026-07-05"
license: LicenseRef-all-rights-reserved
attribution: "Tettelin H, Masignani V, Cieslewicz MJ, Donati C, Medini D, et al. Genome analysis of multiple pathogenic isolates of Streptococcus agalactiae: implications for the microbial pan-genome. PNAS 102(39):13950-13955, 2005. DOI 10.1073/pnas.0506758102. Own-words summary from the PMC full text."
derived: own-words-summary
---

# Tettelin et al. 2005 — the microbial "pan-genome"

## 1. Citation
Tettelin H, Masignani V, Cieslewicz MJ, Donati C, Medini D, Ward NL, Angiuoli SV, Crabtree J,
Jones AL, Durkin AS, DeBoy RT, Davidsen TM, Mora M, Scarselli M, Margarit y Ros I, Peterson JD,
Hauser CR, Sundaram JP, Nelson WC, Madupu R, Brinkac LM, Dodson RJ, Rosovitz MJ, Sullivan SA,
Daugherty SC, Haft DH, Selengut J, Gwinn ML, Zhou L, Zafar N, Khouri H, Radune D, Dimitrov G,
Watkins K, O'Connor KJB, Smith S, Utterback TR, White O, Rubens CE, Grandi G, Madoff LC, Kasper
DL, Telford JL, Wessels MR, Rappuoli R, Fraser CM. 2005. "Genome analysis of multiple pathogenic
isolates of *Streptococcus agalactiae*: implications for the microbial 'pan-genome'." *PNAS*
102(39):13950–13955. DOI 10.1073/pnas.0506758102. Open text: PMC1216834
(https://pmc.ncbi.nlm.nih.gov/articles/PMC1216834/).

## 2. Access note
Full text read via PMC (open access on PMC). License posture: © 2005 National Academy of Sciences,
freely readable → **own-words summary**; verbatim reproduced ONLY for functional strings (defined
terms this project must extract, equation forms, numeric parameter values). No paywall boundary hit;
figure images (Figs. 2 and 3) were not viewed directly — their fitted parameters are taken from the
text/legends as reported.

## 3. Thesis (1 sentence)
A single genome cannot represent a bacterial species; the species is better described by a
**pan-genome** — a core genome shared by all strains plus a dispensable genome of variably-present
genes — and for *S. agalactiae* (group B *Streptococcus*, GBS) this pan-genome is mathematically
**open**, growing with each additional strain sequenced.

## 4. Problem & context
Whole-genome sequencing of single isolates was becoming routine, but the authors argue one genome
underrepresents a species' gene content because strains differ substantially in gene complement.
They sequenced multiple GBS isolates to quantify how much new gene content each additional genome
reveals and whether the total gene repertoire of the species converges (closed) or keeps growing
(open). GBS is a human/animal pathogen (neonatal sepsis/meningitis).

## 5. Method / approach
- **Strains analyzed: 8 total.** Six newly sequenced in this study — draft genomes at 8× coverage
  for strains 515, H36B, 18RS21, COH1, CJB111, and a full/complete genome for A909 — combined with
  two already-published genomes, 2603V/R and NEM316.
- Predicted genes across all 8 genomes were clustered into orthologous groups to partition genes
  into **core** (present in all strains) vs **dispensable/strain-specific**.
- **Combinatorial counting over strain orderings:** for each number of genomes *n*, they averaged
  over combinations of which strains are included, computing (a) how many genes remain core and
  (b) how many *new* genes a novel genome adds, as a function of *n*.
- **Curve fitting / extrapolation:** exponential-decay functions fitted to the averaged curves to
  extrapolate asymptotic behavior as *n* → large (Figs. 2 and 3).

## 6. Key claims / findings
- **Pan-genome partition (2005 definition):** pan-genome = **core genome** (genes present in *all*
  strains) + **dispensable genome** (genes absent from one or more strains, plus genes unique to a
  single strain). Only a two-way partition; no intermediate frequency classes.
- **Core threshold is 100% presence.** Core = present in *all* strains. No fractional/percentage
  cutoff (no ≥95% / ≥99% convention) is used or stated in this paper.
- **New genes per added genome decline but do not vanish:** ~161 new genes when a 2nd genome is
  added, dropping to ~54 after five genomes; the 8th genome still adds new genes.
- **Strain-specific gene discovery curve** fitted as
  `Fs = κs exp[–n/τs] + tg(θ)` with κs = 476 ± 62, τs = 1.51 ± 0.15, tg(θ) = 33 ± 3.5,
  r² = 0.995. The nonzero asymptote **tg(θ) ≈ 33 new genes** (95% CI = 22–42) means each additional
  genome is predicted to keep contributing ~33 previously-unseen genes indefinitely.
- **Core genome convergence curve** fitted as
  `Fc = κc exp[–n/τc] + Ω` with κc = 610 ± 38, τc = 2.16 ± 0.28, Ω = 1,806 ± 16, r² = 0.990. The
  core converges to a minimum **Ω ≈ 1,806 genes** (95% CI = 1,750–1,841), ≈80% of an average single
  genome.
- **Verdict: OPEN pan-genome.** Because the new-gene curve asymptotes to a *nonzero* value, the
  total gene repertoire grows without bound as more strains are added.
- **Sampling adequacy:** 8 genomes are not enough to capture all species genes; the model predicts
  even *hundreds* of genomes may be insufficient to exhaust the pan-genome.
- **358 strain-specific genes** across the 8 strains, distributed unevenly:
  137 (NEM316), 61 (H36B), 47 (2603V/R), 35 (COH1), 31 (515), 20 (CJB111), 14 (A909), 13 (18RS21).

## 7. Load-bearing statements (functional strings — verbatim; defined terms + equations + numeric extrapolations, per license posture)
- **Pan-genome definition (verbatim):** "a bacterial species can be described by its 'pan-genome'
  (pan, from the Greek word παν, meaning whole), which includes a core genome containing genes
  present in all strains and a dispensable genome composed of genes absent from one or more strains
  and genes that are unique to each strain."
- **Strain-specific-gene decay equation (verbatim form):** `Fs = κs exp[–n/τs] + tg(θ)`
  (κs = 476 ± 62; τs = 1.51 ± 0.15; tg(θ) = 33 ± 3.5; r² = 0.995).
- **Core-genome decay equation (verbatim form):** `Fc = κc exp[–n/τc] + Ω`
  (κc = 610 ± 38; τc = 2.16 ± 0.28; Ω = 1,806 ± 16; r² = 0.990).
- **New-genes asymptote (verbatim):** "the extrapolated curve reaches a nonzero asymptotic value of
  33 new genes (95% confidence interval = 22–42)."
- **Openness verdict (verbatim):** "the GBS pan-genome is open and that its size grows with the
  number of independent strains sequenced."
- **Sampling-adequacy statement (verbatim):** "the eight genomes are not enough to identify all
  genes present in this species, and mathematical modeling made the surprising prediction that even
  hundreds of genomes might not be sufficient."

## 8. Stated scope, assumptions, limitations
- The quantitative conclusions are for *S. agalactiae* (GBS) from 8 strains; open/closed status is a
  species-specific empirical finding, not asserted as universal.
- Extrapolations depend on exponential-decay curve fits over combinatorial averages of a *small*
  sample (n up to 8); the asymptotes are model predictions, not observed plateaus.
- Some genomes are drafts (8× coverage), which can affect gene-content completeness
  [summarizer-inferred that draft status is a caveat; paper reports coverage but the note here does
  not attribute an explicit limitation statement to the authors].

## 9. Failure modes / invalidity patterns
- **"One genome = the species" is the failure the paper opposes.** A single reference genome
  systematically undercounts species gene content; how much depends on whether the pan-genome is
  open.
- **Sample-size dependence:** because the pan-genome is open, any count of "total species genes" is
  a function of how many strains were sequenced and will keep rising — a reported pan-genome size is
  only a lower bound at the current sampling.
- **Detector named by the source:** the sign of an open vs closed pan-genome is whether the fitted
  new-gene curve asymptotes to a **nonzero** value (open) vs zero (closed) — i.e. the tg(θ) term.
  Nonzero ⇒ open.

## 10. What the source does NOT address
- Does not define intermediate gene-frequency classes ("shell", "cloud", "soft core") — not present.
- Does not use a fractional core threshold (95%/99%); core is strictly 100%.
- Does not use the term "distributed genome."
- Does not invoke "Heaps' law" by name.
- Does not (in the read text) provide a per-genome exact gene count / average genome size beyond the
  qualitative "similar" statement and the ≈80% (~1,806-gene) core fraction.

## 11. Open questions / ambiguities
- Whether draft-quality genomes bias the strain-specific-gene counts is not quantitatively resolved.
- The power-law vs exponential-decay debate about gene-discovery curves is not engaged here; the
  paper commits to an exponential-decay-plus-constant form.

## 12. Guidance answers
1. **Definitions of pan/core/dispensable:** Answered — verbatim definition in §7 (pan-genome =
   core [genes present in all strains] + dispensable [genes absent from one or more strains + genes
   unique to each strain]). The paper's term is "dispensable genome"; the phrase "character genome"
   was **not** observed in the read text.
2. **Numeric presence threshold for core:** Answered — **core = present in *all* strains (100%)**.
   No ≥95%/≥99% or any fractional convention is stated; those are later.
3. **Extrapolation equation for new genes:** Answered — `Fs = κs exp[–n/τs] + tg(θ)`
   (κs = 476 ± 62, τs = 1.51 ± 0.15, tg(θ) = 33 ± 3.5, r² = 0.995); exponential-decay-plus-constant
   form. Core analogue: `Fc = κc exp[–n/τc] + Ω` (Ω = 1,806 ± 16). See §7.
4. **Open or closed + evidence:** Answered — **OPEN**; verbatim: "the GBS pan-genome is open and
   that its size grows with the number of independent strains sequenced." Evidence = nonzero
   asymptote (33 new genes) from 8 sequenced genomes.
5. **Genome count + how many more needed:** Answered — **8 genomes** used (6 newly sequenced + 2
   published). Explicit sampling-adequacy statement: 8 are insufficient and "even hundreds of
   genomes might not be sufficient" (§7).
6. **"Distributed genome" phrase:** **Absent** — not used or attributed anywhere in the read text.
7. **"Heaps' law" by name:** **Absent** — not named; the 2005 paper uses only the exponential-decay
   fit. (Confirms the suspicion that Heaps-law framing is a later import.)
- **Silence to record (shell/cloud):** Confirmed — the 2005 partition is **only core vs dispensable**;
  no "shell" or "cloud" classes are defined.
