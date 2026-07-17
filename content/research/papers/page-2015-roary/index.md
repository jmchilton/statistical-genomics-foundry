---
title: "Roary: rapid large-scale prokaryote pan genome analysis"
type: paper
source_id: page-2015-roary
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC4817141/
doi: 10.1093/bioinformatics/btv421
access_date: "2026-07-05"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Page AJ, Cummins CA, Hunt M, Wong VK, Reuter S, Holden MTG, Fookes M, Falush D, Keane JA, Parkhill J. Roary: rapid large-scale prokaryote pan genome analysis. Bioinformatics 31(22):3691-3693, 2015. DOI 10.1093/bioinformatics/btv421. Summary derived from the open-access PMC full text."
derived: license-aware-summary
tags:
  - domain/pangenomics
---

# Roary: rapid large-scale prokaryote pan genome analysis (Page et al. 2015)

## 1. Citation
Page AJ, Cummins CA, Hunt M, Wong VK, Reuter S, Holden MTG, Fookes M, Falush D,
Keane JA, Parkhill J. 2015. "Roary: rapid large-scale prokaryote pan genome analysis."
*Bioinformatics* 31(22):3691–3693. DOI 10.1093/bioinformatics/btv421.
Open access: https://pmc.ncbi.nlm.nih.gov/articles/PMC4817141/ (also
https://academic.oup.com/bioinformatics/article/31/22/3691/240757).

## 2. Access note
Read via PMC full text (PMC4817141). This is a short "Applications Note" (~3 pages).
Full body text, abstract, and Tables 1–2 read. Supplementary material NOT accessed — some
implementation details (exact CD-HIT iterative step values, full command-line flag list) are
not in the main text and may live only in the supplement or the software docs; flagged below
where relevant.

## 3. Thesis (1 sentence)
Roary rapidly builds large-scale prokaryote pan genomes — identifying core and accessory genes
across thousands of same-species samples — on a standard desktop without compromising accuracy.

## 4. Problem & context
Prokaryote population sequencing studies now routinely contain hundreds to thousands of isolates.
Existing pan-genome tools do not scale to such datasets (paper shows several competitors failing to
complete within 5 days on 1000 samples; see §6). Roary targets that computational-infeasibility gap
while preserving accuracy.

## 5. Method / approach
Pipeline (as described in the main text):
1. Coding regions extracted from input and converted to protein sequences; **filtered to remove
   partial sequences**.
2. Protein sequences **iteratively pre-clustered with CD-HIT** (the specific iterative percent-identity
   step values are NOT given in the main text — likely supplement/software; [summarizer-inferred] gap).
3. **All-against-all comparison with BLASTP** on the reduced sequences at a **user-defined percentage
   sequence identity, default 95%**.
4. Sequences clustered with **MCL**.
5. CD-HIT pre-clustering results **merged** with MCL results.
6. Using **conserved gene neighborhood information**, homologous groups containing paralogs are
   **split into groups of true orthologs**.
7. A **graph** is constructed of cluster relationships based on order of occurrence in the input.
8. **Isolates are clustered based on gene presence in the accessory genome.**

Input: **one annotated assembly per sample in GFF3 format**, such as produced by **Prokka**, where
**all samples are from the same species**.

Default parameter of record: **BLASTP percentage sequence identity default = 95%** (user-configurable).
NOTE: the main-text passage read does not print the command-line flag name (guidance expected `-i`);
flag not stated in the article body — do not import from software docs (see §12 Q1).

Output/tooling: "A suite of command line tools is provided to interrogate the dataset providing
union, intersection and complement." (Specific output filenames not enumerated in main text.)

## 6. Key claims / findings
- **Scaling**: "Using a single CPU Roary can produce a pan genome consisting of 1000 isolates in
  4.5 hours using 13 GB of RAM, with further speedups possible using multiple processors." (Abstract)
- **Runtime vs competitors** (real *S. typhi* data, Table 2):
  - 8 samples: Roary 44 s; PanOCT 1,457 s; LS-BSR 2,585 s; PGAP 41,397 s.
  - 1000 samples: Roary 15,465 s (≈4.5 h); PGAP and PanOCT **failed to complete within 5 days**.
- **Accuracy on simulated 12-genome data** (Table 1): Roary 994 core / 1017 total, 0 incorrect splits,
  0 incorrect merges; PGAP 991/1012, 0 splits, 4 merges; PanOCT 993/1015, 1 split, 1 merge;
  LS-BSR 974/994, 0 splits, 23 merges.
- **Core definition**: "Core is defined as a gene being in at least 99% of samples." (This is the ONLY
  presence threshold/band the paper states — see §9 and §12 Q2.)

## 7. Load-bearing statements (VERBATIM — license permits; CC BY, see §License)
1. "An all-against-all comparison is performed with BLASTP on the reduced sequences with a user
   defined percentage sequence identity (default 95%)." — Methods.
2. "The input to Roary is one annotated assembly per sample in GFF3 format ... such as that produced
   by Prokka ... where all samples are from the same species." — Methods.
3. "Core is defined as a gene being in at least 99% of samples." — Methods/results.
4. "Using a single CPU Roary can produce a pan genome consisting of 1000 isolates in 4.5 hours using
   13 GB of RAM, with further speedups possible using multiple processors." — Abstract.
5. "Roary is implemented in Perl and is freely available under an open source GPLv3 license." — availability.

## 8. Stated scope, assumptions, limitations
- **Same-species assumption**: input samples are expected to be "from the same species."
- Input must be **pre-annotated** (GFF3, e.g. from Prokka) — Roary consumes annotations rather than
  producing them.
- Accuracy claims benchmarked on 12 simulated genomes (Table 1) and *S. typhi* real data (Table 2);
  no broader taxonomic generality claimed in-text.

## 9. Failure modes / invalidity patterns
- The paper does NOT state any explicit handling of annotation errors or annotation inconsistency; it
  assumes annotated GFF3 input of the same species (see §12 Q3). It makes no in-text claim to detect,
  correct, or be robust to mis-annotation — a confident silence, relevant to downstream inflation
  critiques but not addressed by this source itself.
- Paralog handling is the named accuracy mechanism: "homologous groups containing paralogs are split
  into groups of true orthologs" via conserved gene neighborhood. Table 1 frames accuracy as
  incorrect splits / incorrect merges — those two counts are the paper's own accuracy diagnostics.

## 10. What the source does NOT address
- **No soft-core / shell / cloud percent bands.** The terms "soft core," "shell," "cloud" do NOT appear;
  no bands such as 95–99%, 15–95%, or <15% are stated. Only "core = ≥99% of samples" is given.
- No explicit command-line flag names in the main text (no `-i`/`-cd` printed in body read).
- Exact CD-HIT iterative identity step values not given in main text.
- No annotation-error handling / robustness claims.
- Output filenames not enumerated.

## 11. Open questions / ambiguities
- Whether the 95% default is applied only at the BLASTP stage or also gates CD-HIT pre-clustering
  (text ties the 95% default specifically to BLASTP).
- The provenance of the widely-cited soft-core/shell/cloud bands: NOT in this paper; likely software
  docs or later convention (not resolved here — do not attribute to this source).

## 12. Guidance answers
**Q1 — default BLASTP(P) identity threshold + flag?** Default = **95%**, user-defined, applied at the
BLASTP all-against-all step (verbatim §7 #1). The **flag name is NOT printed in the article body**
(guidance anticipated `-i`); not stated here — do not import from software docs.

**Q2 — core/soft-core/shell/cloud presence bands?** Only **"Core = gene in ≥99% of samples"** is in the
paper. **Soft-core, shell, and cloud bands are NOT stated** — the terms and their percent bands
(e.g. soft-core 95–99%, shell 15–95%, cloud <15%) **do not appear in this paper**. This paper is NOT
a citable origin for the full four-band convention; only the ≥99% core cutoff is sourced here.

**Q3 — annotation-error handling vs clean-annotation assumption?** The paper states no error handling;
it assumes annotated GFF3 input "from the same species" (verbatim §7 #2). No claim of robustness to
mis-annotation. (Faithful capture of what THIS paper says about its own assumptions.)

**Q4 — expected input?** "one annotated assembly per sample in GFF3 format ... such as that produced by
Prokka ... where all samples are from the same species" (verbatim §7 #2).

**Q5 — scaling numbers?** 1000 isolates in **4.5 h using 13 GB RAM** on a single CPU (verbatim §7 #4).
Table 2: 8 samples in 44 s; 1000 samples in 15,465 s; competitors PGAP/PanOCT failed within 5 days.

## License
**CC BY (Creative Commons Attribution License).** Article page states: "© The Author 2015. Published by
Oxford University Press. This is an Open Access article distributed under the terms of the Creative
Commons Attribution License." Software itself is GPLv3. **Mode used: verbatim quoting permitted** —
§7 contains short verbatim load-bearing quotes.
