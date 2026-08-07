---
title: "Count: evolutionary analysis of phylogenetic profiles with parsimony and likelihood"
type: paper
source_id: csuros-2010-count
source_url: https://academic.oup.com/bioinformatics/article/26/15/1910/189891
doi: 10.1093/bioinformatics/btq315
access_date: "2026-07-03"
license: LicenseRef-all-rights-reserved
attribution: "Csűrös M. Count: evolutionary analysis of phylogenetic profiles with parsimony and likelihood. Bioinformatics 26(15):1910-1912, 2010. DOI 10.1093/bioinformatics/btq315. Oxford University Press article page; summarized in own words."
derived: own-words-summary
tags:
  - domain/gene-family-evolution
  - domain/ancestral-reconstruction
---

# Count: evolutionary analysis of phylogenetic profiles with parsimony and likelihood

## 1. Citation
Csűrös M. 2010. "Count: evolutionary analysis of phylogenetic profiles with parsimony and
likelihood." *Bioinformatics* 26(15):1910–1912. DOI 10.1093/bioinformatics/btq315.
Publisher URL: https://academic.oup.com/bioinformatics/article/26/15/1910/189891
Copyright line on the article page: "© The Author 2010. Published by Oxford University Press.
All rights reserved." Access date: 2026-07-03.

## 2. Access note
Read via the OUP article page (WebFetch). Retrieved the abstract plus the extractable body text
(method descriptions, availability/implementation section). This is a two-page Applications Note;
figures and any dense equation typesetting are not fully captured. Where the page text did not
supply a detail (e.g. concrete input file formats), that is recorded as a confident silence in §10,
not filled from memory. No facts imported from the Count manual/website — paper only.

## 3. Thesis (1 sentence)
Count is a Java software package that performs ancestral reconstruction and lineage/family-specific
inference on integer-valued phylogenetic profiles (chiefly gene-family phyletic distributions),
implementing both parsimony (Dollo/Wagner) and probabilistic birth-and-death methods.

## 4. Problem & context
Gene-content evolution is studied via phyletic (presence–absence) profiles of homologous gene
families across taxa on a phylogeny. Count generalizes presence–absence to numerical profiles
Φ: 𝒳 ↦ {0, 1, 2, …} (integer family sizes / copy numbers), and reconstructs how those characters
changed along an evolutionary tree, inferring family- and lineage-specific characteristics. It
targets databases of clustered homolog families such as COG.

## 5. Method / approach
Given an evolutionary tree T with terminal taxa 𝒳 and a numerical profile, Count computes ancestral
states ξ[u] at internal nodes u ∈ T and reconstructs character history. Two method families:

- **Parsimony methods** (functional strings verbatim):
  - **Dollo parsimony** (cited to Farris)
  - **Wagner parsimony** (cited to Farris)
  - **Asymmetric Wagner parsimony** — penalizes gains and losses with different weights.
  - **Propensity for Gene Loss (PGL)** — computed by Count, cited to Krylov et al. 2003;
    associated with Dollo parsimony in the abstract.

- **Probabilistic / likelihood method**:
  - A **phylogenetic birth-and-death model** (the paper's repeated phrasing), built on
    **linear birth-death-immigration processes** (cited to Kendall, 1949).
  - Per-edge continuous-time Markov character evolution; each edge *uv* has a length τ.
  - Three branch-specific rate parameters (functional strings verbatim): gene **loss rate μ**,
    gene **duplication rate λ**, and **gain rate κ**.
  - Count allows rate variation across branches and across gene families.
  - Rate optimization (fitting the model) and ancestral reconstruction are the two main
    computational components.

Interface / implementation (functional strings verbatim):
- Written entirely in **Java (Java SE 6)**; tested on Windows, MacOS X and Linux.
- Rich **GUI** supporting multiple datasets/models, session saving, and tab-delimited export.
- The main components (rate optimization and ancestral reconstruction) can also be launched from
  the **command line**.
- Distributed as a stand-alone Java application, a MacOS X application bundle, and via Java Webstart;
  ships with test data and a User's Guide. Distributed under a **BSD-style license**; source
  available on request.

## 6. Key claims / findings
- Count handles integer-valued profiles Φ ∈ {0,1,2,…}, not just binary presence–absence.
- It implements Dollo, Wagner, and asymmetric Wagner parsimony, plus PGL.
- It implements a probabilistic phylogenetic birth-and-death model with per-branch loss/duplication/
  gain rates (μ, λ, κ) and supports rate variation across branches and families.
- **Per-family output**: number of branches where a family was lost, gained, expanded, and
  contracted — under the probabilistic model these are **estimated as expectations, hence fractional
  values**.
- **Per-lineage (aggregate) output**: counts of families lost, gained, expanded, and contracted on
  each branch.
- **Ancestral reconstruction output**: inferred **probabilities for family presence and absence at
  ancestral nodes** (posterior probabilities conditioned on observed profiles), displayed on the tree.
- Availability: http://www.iro.umontreal.ca/~csuros/gene_content/count.html.

## 7. Load-bearing statements (RESTRICTIVE license → own-words paraphrase; functional strings verbatim)
Mode: article is "All rights reserved," so the statements below are paraphrased in own words;
only functional strings (method names, Java version, rate symbols, the "expectations/fractional
values" mechanism) are reproduced verbatim.

- Count is a software package for analyzing numerical profiles on a phylogeny, primarily phyletic
  distributions of homologous gene families, but usable for any integer-valued evolutionary
  character. It performs ancestral reconstruction and infers family- and lineage-specific
  characteristics along the tree. (paraphrase of abstract)
- It implements methods common in gene-content analysis — **Dollo and Wagner parsimony**,
  **propensity for gene loss** — as well as probabilistic methods using a **phylogenetic
  birth-and-death model**. (paraphrase of abstract; named methods verbatim)
- The probabilistic model rests on **linear birth-death-immigration processes (Kendall, 1949)**;
  character evolution on each edge *uv* of length τ is stochastically determined. (paraphrase;
  model term + τ verbatim)
- Aggregate family-specific branch counts (lost/gained/expanded/contracted) are **"estimated as
  expectations, hence the fractional values"** (verbatim functional phrase).
- Ancestral display: the tree shows inferred **probabilities for family presence and absence at
  ancestral nodes** (paraphrase; the "presence and absence at ancestral nodes" phrasing is the
  substance).
- Written in **Java (Java SE 6)**; distributed under a **BSD-style license** (functional strings).

## 8. Stated scope, assumptions, limitations
- Scope: integer-valued ("numerical") profiles on a phylogeny; primary application is gene-family
  phyletic distributions, but explicitly generalizable to any integer-valued evolutionary character.
- The probabilistic model assumes character evolution as a continuous-time Markov birth-death-
  immigration process along tree edges parameterized by edge length τ and rates μ/λ/κ.
- Rate variation is allowed across branches and across gene families.
- The paper does not state input-tree constraints (see §9/§10).

## 9. Failure modes / invalidity patterns
The paper is an applications note and does **not** enumerate failure modes, diagnostics, error
messages, or invalidity conditions. In particular:
- **No stated requirement that the input tree be ultrametric, time-scaled, or clock-like.** The only
  tree/edge statement found is that "character evolution on each edge *uv* with length τ is
  stochastically determined" — i.e. edges carry a length τ used as the parameter of the per-edge
  process, but the paper gives no ultrametricity or non-negativity constraint on those lengths.
- No statement about negative branch lengths or how they would be handled.
- No stated symptom, threshold, or diagnostic value. [summarizer note: absence is the finding here,
  not an inference.]

## 10. What the source does NOT address (confident silences)
- **Concrete input file formats** — no Newick / tab-delimited / specific format for either the tree
  or the profile table is specified in the article text (tab-delimited is mentioned only as an
  *export* option from the GUI).
- **Tree/branch-length requirements** — ultrametricity, time-scaling, molecular clock, and negative
  branch lengths are never discussed (words "ultrametric," "time," "molecular clock" do not appear;
  "branch length"/edge length τ does).
- **Parsimony-vs-likelihood bias** — the paper makes no comparative claim that parsimony under- or
  over-estimates gains or losses relative to likelihood.
- **Exact CLI syntax / flag names** (e.g. any `--ancestral_counts`-style option) — not given;
  the paper only says the main components "can also be launched from the command line."
- **Output file names** — not specified.
- **Scalability / dataset-size limits / runtime performance** — not discussed.
- **Software version** — the paper describes the 2010 release; it pins no version number in text.

## 11. Open questions / ambiguities
- Whether branch lengths τ must be strictly positive / how the birth-death likelihood behaves for
  zero or negative edge lengths — unresolved by the paper.
- Exact input/output file conventions and CLI invocation — deferred to the (separate) User's Guide,
  which this note does not read.
- Whether "expansion/contraction" counts apply to both parsimony and probabilistic modes or only the
  latter — the fractional-expectation phrasing implies the probabilistic mode, but the paper is not
  fully explicit.

## 12. Guidance answers
- **What Count does / methods & outputs**: Ancestral reconstruction of integer-valued gene-content
  (phyletic) profiles on a phylogeny, via BOTH parsimony — **Dollo**, **Wagner**, **asymmetric
  Wagner**, plus **Propensity for Gene Loss (PGL)** — AND a probabilistic **phylogenetic
  birth-and-death model** (linear birth-death-immigration, Kendall 1949) with per-branch rates
  μ (loss), λ (duplication), κ (gain). Outputs: per-family branch counts of families
  lost/gained/expanded/contracted (probabilistic values are **expectations → fractional**);
  per-lineage aggregate counts of families lost/gained/expanded/contracted per branch; and ancestral
  **posterior probabilities of family presence/absence at internal nodes**. (§5, §6)
- **Tree requirement (ultrametric / branch lengths / negative-length failure)**: The paper does
  **NOT** state that the input tree must be ultrametric or time-scaled. It refers only to each edge
  having a length τ used as the per-edge birth-death process parameter. No mention of negative
  branch lengths. → The skill's claim "Count requires ultrametric" is **not supported by this
  paper**; if the skill needs that constraint it must be sourced elsewhere (manual/website) or
  labeled convention, not cited to this paper. (§9)
- **Parsimony vs. likelihood under/over-estimating gains or losses**: The paper makes **no such
  comparative statement**. → The reconciliation-table claim "parsimony underestimates losses" is
  **not sourced from this paper**; treat as the skill's inference or a community convention, not a
  Csűrös-2010 fact. (§10)
- **Input format / CLI / output file names / Java**: It **is** a Java application (Java SE 6),
  GUI + command-line, BSD-style license. The paper does **not** specify input file formats, CLI flag
  names, or output file names. → CLI details like `--ancestral_counts` / `Count.jar` **cannot be
  corroborated from this paper**. (§5, §10)
- **Version pin**: Paper is the 2010 release and pins no version; the skill's "Count 11.0319+" pin
  postdates this paper — version-specific behavior is not sourceable here. (§10)
- **Must-quote functional strings captured verbatim**: Dollo parsimony, Wagner parsimony, asymmetric
  Wagner parsimony, Propensity for Gene Loss (PGL), phylogenetic birth-and-death model, linear
  birth-death-immigration, rates μ/λ/κ, edge length τ, Java SE 6, BSD-style license,
  "estimated as expectations, hence the fractional values."
