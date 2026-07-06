---
title: "PAML Manual — codeml ancestral reconstruction"
type: tutorial
source_id: paml-manual
source_url: https://raw.githubusercontent.com/abacus-gene/paml/master/doc/pamlDOC.pdf
version: "4.10.8"
access_date: "2026-07-03"
license: GPL-3.0-only
attribution: "Yang Z. PAML Manual, version 4.10.8, November 2024. Manual bundled with the PAML software package and distributed under GNU GPL v3 per the source note. Package citation: Yang Z. PAML 4: Phylogenetic analysis by maximum likelihood. Molecular Biology and Evolution 24:1586-1591, 2007."
derived: own-words-summary
---

# PAML manual — codeml ancestral reconstruction (source note)

## 1. Citation
Yang Z. *PAML Manual* (`pamlDOC.pdf`), bundled with the PAML software package.
Version summarized: **Version 4.10.8 (November 2024)** (title page line: "Version 4.10.8 (November 2024)").
Software authored/maintained by Ziheng Yang. Package citation given in the manual:
Yang, Z. 2007. "PAML 4: Phylogenetic analysis by maximum likelihood." *Mol Biol Evol* 24:1586–1591.
Source repository: github.com/abacus-gene/paml, `doc/pamlDOC.pdf`.
Copyright line: "© Copyright 1993-2023 by Ziheng Yang". License: package (incl. source, examples, executables, and this documentation) "distributed under the GNU GPL v3."
Access: fetched the raw PDF from `raw.githubusercontent.com/abacus-gene/paml/master/doc/pamlDOC.pdf` on **2026-07-03**; extracted text via `pdftotext -layout`. 70 pages.

## 2. Access note
Full PDF obtained and read (not paywalled). Content here is drawn from the codeml / baseml
control-file and ancestral-reconstruction portions of the manual (roughly the `codeml.ctl`,
`baseml.ctl` variable descriptions and the "Output" subsections). Page numbers cited are the
manual's own printed page numbers (24–39). Some target strings the guidance asked for (literal
`rst` output section headers) are **not present** in the manual PDF — flagged in §9, §12.

## 3. Thesis (1 sentence)
codeml/baseml perform maximum-likelihood / empirical-Bayes reconstruction of ancestral
sequences and per-site rates, controlled by plain-text `.ctl` control files; ancestral
reconstruction is switched on with `RateAncestor = 1` and its results are written to the file `rst`.

## 4. Problem & context
PAML programs use an old command-line interface: you run a program by typing its name; each
program reads a default control file (`codeml.ctl` for codeml, `baseml.ctl` for baseml) that
names the sequence/tree/output files and sets model options. codeml handles codon and amino-acid
sequences; baseml handles nucleotides. Ancestral sequence reconstruction (ASR) and per-site rate
estimation are optional analyses layered on top of the ML tree/branch-length estimation.

## 5. Method / recommended procedure + exact default parameters

### How to run
- Run by typing the program name from the command line; it reads `codeml.ctl` by default.
- A control file can be passed as an argument, e.g. `codeml tmp2.ctl` (manual example, p. for mcmctree/estbranches).
- Output files have fixed names — `rst`, `rates`, `rub`, `lnf`, `rst1`, `mlc`, `2ML.dS`,
  `2ML.dN` — and will be overwritten; do not name your own files these.

### `codeml.ctl` default example (verbatim option values, manual p. 33)
```
      seqfile = stewart.aa
      outfile = mlc
     treefile = stewart.trees
        noisy = 9
      verbose = 0     * 1: detailed output, 0: concise output
      runmode = 0     * 0: user tree; 1: semi-automatic; 2: automatic; 3: StepwiseAddition; (4,5):PerturbationNNI; -2: pairwise
      seqtype = 2     * 1:codons; 2:AAs; 3:codons-->AAs
    CodonFreq = 2     * 0:1/61 each, 1:F1X4, 2:F3X4, 3:codon table
        clock = 0     * 0:no clock, 1:clock; 2:local clock
       aaDist = 0
   aaRatefile = wag.dat   * only used for aa seqs with model=empirical(_F); dayhoff.dat, jones.dat, wag.dat, mtmam.dat, or your own
        model = 2
      NSsites = 0     * 0:one w;1:neutral;2:selection;3:discrete;4:freqs;5:gamma;6:2gamma;7:beta;8:beta&w;9:beta&gamma;10:beta&gamma+1;11:beta&normal>1;12:0&2normal>1;13:3normal>0
        icode = 0     * 0:universal code; 1:mammalian mt; 2-11:see below
        Mgene = 0     * 0:rates, 1:separate
    fix_kappa = 0     * 1: kappa fixed, 0: kappa to be estimated
        kappa = 2     * initial or fixed kappa
    fix_omega = 0     * 1: omega or omega_1 fixed, 0: estimate
        omega = .4    * initial or fixed omega
    fix_alpha = 1     * 0: estimate gamma shape parameter; 1: fix it at alpha
        alpha = 0.    * initial or fixed alpha, 0:infinity (constant rate)
       Malpha = 0
        ncatG = 3     * # of categories in dG of NSsites models
      fix_rho = 1
          rho = 0.
        getSE = 0     * 0: don't want them, 1: want S.E.s of estimates
 RateAncestor = 0     * (0,1,2): rates (alpha>0) or ancestral states (1 or 2)
   Small_Diff = .5e-6
    cleandata = 0     * remove sites with ambiguity data (1:yes, 0:no)?
  fix_blength = 0     * 0: ignore, -1: random, 1: initial, 2: fixed, 3: proportional
       method = 0     * 0: simultaneous; 1: one branch at a time
```
(Above reproduces the manual's default-example option spellings/values verbatim as functional
strings; the shipped default sets `seqtype = 2`, `RateAncestor = 0`, `getSE = 0`, `cleandata` shown commented at 0.)

### To turn ON ancestral reconstruction
Set `RateAncestor = 1`. Results are written to `rst`. Genetic-code option `icode` requires
`RateAncestor = 1` to take effect.

## 6. Key claims / findings (atomic)
- `RateAncestor = 0 or 1`; "Usually use 0." Setting `= 1` forces **two additional analyses**:
  (a) under a variable-rates-across-sites model (e.g. gamma), it computes rates for individual
  sites, written to the file `rates`, using an empirical-Bayes procedure (Yang and Wang 1995);
  (b) it performs empirical-Bayesian **reconstruction of ancestral sequences**
  (Yang et al. 1995b; Koshi and Goldstein 1996; Yang 2006 pp. 119–124). ASR outputs are listed
  by site in the file `rst`.
- ML/empirical-Bayes ASR vs parsimony: likelihood-based reconstruction "has two advantages over
  parsimony": it uses branch-length and relative-substitution-rate information, and it provides
  posterior probabilities as a measure of uncertainty for reconstructed states.
- `verbose` controls ASR output detail: `verbose = 0` lists only the single best (highest
  posterior probability) character at each node at each site; `verbose = 1` lists the full
  posterior probability distribution from the **marginal** reconstruction ("try 2 if 1 does not work").
- Marginal vs joint reconstruction: **marginal** considers one interior node at a time, best =
  highest-posterior character (Yang et al. 1995b eq. 4). **joint** considers all ancestral nodes
  simultaneously, best = highest-posterior set of characters across all interior nodes (eq. 2);
  joint algorithm is Pupko et al. (2000).
- Model dependence of which reconstructions are produced: if the model is homogeneous
  (`nhomo = 0, 1`) and assumes one rate for all sites, **both** joint and marginal reconstructions
  are calculated; if the model assumes variable rates among sites (gamma), **only marginal** is
  calculated. The joint algorithm works only under the one-rate model (also works under partition
  models). Under nonhomogeneous models (`nhomo = 3, 4, 5` with `model = 3..7`), only **joint**
  reconstruction is available (marginal algorithm does not work there); nonhomogeneous joint works
  only for one-rate-for-all-sites, not gamma or partition models.
- The manual explicitly warns against a common misuse: using reconstructed ancestral sequences
  "as if they were real observed data" for further analysis — "resist this irresistible
  temptation and use full likelihood methods if they are available (e.g., Yang 2002)." It points
  to Yang (2006) section 4.4.4 for a discussion of **systematic biases in ancestral reconstruction**.
- `seqtype`: `1` = codon sequences (program is then codonml); `2` = amino-acid sequences (aaml);
  `3` = codon sequences to be translated into proteins for analysis.
- `CodonFreq`: `0` = equal (1/61 each for standard code); `1` = F1X4 (from average nucleotide
  freqs); `2` = F3X4 (from average nucleotide freqs at the three codon positions); `3` = codon
  table (free parameters). Number of parameters: 0, 3, 9, 60 respectively (universal code).
- `model` (codons): `0` = one ratio for all branches; `1` = one ratio per branch (free-ratio);
  `2` = arbitrary number of ratios (2-ratio/3-ratio models; branches grouped with `#`/`$` labels;
  with `model = 2`, `fix_omega` fixes the last ratio). `model` (AAs/codon-translated AAs):
  `0` = Poisson; `1` = proportional; `2` = Empirical (rate matrix from `aaRatefile`);
  `3` = Empirical+F; `5` = FromCodon0; `6` = FromCodon1; `8` = REVaa_0; `9` = REVaa(nr=189).
- `NSsites = m` corresponds to site-model M*m* of Yang et al. (2000b). Several models can be run
  in one batch, e.g. `NSsites = 0 1 2 3 7 8`; posterior probabilities for site classes and
  expected omega per site are written to `rst`. `ncatG` sets number of categories (default in the
  shipped ctl is `3`).
- Combined branch-site / clade specifications: Branch-site **Model A** = `model = 2, NSsites = 2,
  fix_omega = 0`; null **Model A1** = `model = 2, NSsites = 2, fix_omega = 1, omega = 1`.
  **Model C** = `model = 3, NSsites = 2`; **Model D** = `model = 3, NSsites = 3, ncatG = 2`.
- `getSE = 0, 1, or 2`: standard errors of estimated parameters via the curvature method (invert
  matrix of second derivatives, computed by difference method); "crude" and "not always reliable";
  the likelihood-ratio test "should always be preferred"; the option is not available and you must
  choose `getSE = 0` when tree-search is performed.
- `cleandata = 1` removes sites with ambiguity characters (undetermined nucleotides such as N, ?,
  W, R, Y — anything other than the four nucleotides) or alignment gaps from all sequences
  (faster). `cleandata = 0` (**default**) uses those sites; ambiguity characters make likelihood
  calculation slower.
- `aaRatefile` names the empirical amino-acid rate matrix file; shipped files include `dayhoff.dat`,
  `jones.dat` (also written `jtt.dat` for JTT), `wag.dat`, `mtmam.dat`, `mtREV24.dat`. Only used
  for aa sequences with an empirical model (`model = 2` / `3`).
- `icode` selects the genetic code (`0`–`10` = GenBank transl_table 1–11; `0` universal,
  `1` mammalian mt, etc.; `11` = "Yang's regularized code"). Using `icode` requires
  `RateAncestor = 1`. In baseml, `icode` takes `0..11` (12 codes) for amino-acid inference from
  nucleotide triplets.
- `Small_Diff` default `.5e-6`; recommended range 1e-8 to 1e-5, check results insensitive to it.
- `method = 0` = update all parameters/branch lengths simultaneously (old algorithm);
  `method = 1` = update branch lengths one at a time (does not work under clock models).
- `runmode = -2` (with `seqtype = 1`) does pairwise ML estimation of dS and dN, collected into
  files `2ML.dS` and `2ML.dN`; initial branch lengths use Nei & Gojobori (1986) counting (dS, dN,
  dN/dS) — these are not MLEs.
- From version 4.10 a `maintree` option was added (mentioned p. for codon-model tree handling).

## 7. Load-bearing statements — OWN-WORDS mode (functional strings verbatim)
License is actually GNU GPL v3 (permissive; verbatim would be allowable), but per task directive
this note uses **own-words paraphrase for expressive prose** and reproduces only **functional
strings verbatim** (control-file keywords, option values, file names, numeric defaults). Mode: own-words.

- On the ASR switch (paraphrase): reconstruction of ancestral sequences and per-site rates is an
  optional add-on triggered by `RateAncestor = 1`; with it off (`= 0`, the usual/default choice)
  those extra analyses are skipped. Functional strings verbatim: `RateAncestor = 0 or 1`; results
  go to the file `rst`; per-site rates go to the file `rates`.
- On verbose detail (paraphrase): the amount of ancestral-state output is set by `verbose` —
  best-character-only at `verbose = 0`, full marginal posterior distribution at `verbose = 1`
  ("try 2 if 1 does not work" — verbatim).
- On misuse (paraphrase): treating reconstructed ancestral sequences as if they were observed data
  is discouraged; prefer full-likelihood methods; see Yang (2006) §4.4.4 on systematic biases.

## 8. Stated scope, assumptions, limitations (source's own caveats)
- Standard-error estimates are crude and not always reliable; SE-based tests rely on normal
  approximation and "should be taken with caution"; LRT preferred; SEs unavailable during tree search.
- Joint reconstruction is limited to one-rate-for-all-sites models (plus partition models);
  under gamma variable-rates only marginal is available; under nonhomogeneous models only joint.
- Ancestral reconstruction has **systematic biases** (pointer to Yang 2006 §4.4.4); using
  reconstructed sequences as data for downstream analysis is explicitly cautioned against.
- Site-pattern ("P format") input disables some outputs including ancestral sequence
  reconstruction and per-site rate estimation.
- `Small_Diff`-dependent derivative approximations may be unstable; user must check sensitivity.

## 9. Failure modes / invalidity patterns
- **Wrong `RateAncestor` value** → no `rst` produced / no ancestral reconstruction. Symptom: the
  `rst` file is absent or lacks reconstruction output. Detector: presence and content of `rst`.
- **`icode` set without `RateAncestor = 1`** → the genetic-code option for ancestral
  reconstruction is not applied (manual: "To use the option icode, you have to choose RateAncestor = 1").
- **`getSE` during tree search** → not available; must be `getSE = 0`. SE values that are
  sensitive to `Small_Diff` are unreliable (manual).
- **`method = 1` under a clock model** (`clock = 1, 2, 3`) → does not work.
- **Specifying both `NSsites` and `alpha`** → "The program should abort if you specify both
  NSsites and alpha."
- **`cleandata = 0` with much ambiguity** → slower likelihood calculation; ambiguity/gap-heavy
  sites retained (may affect reconstruction reliability — the manual notes ambiguity characters
  "both underestimate sequence divergences").
- **Overwriting reserved output names** (`rst`, `rates`, `rub`, `lnf`, etc.): the manual warns not
  to name your own files these or they are overwritten.
- **Reusing reconstructed ancestral sequences as data**: named misuse with systematic-bias risk.
- No numeric dS / branch-length **saturation cutoff** is stated (see §9 note + §12). The manual
  does not name a value at which ASR becomes unreliable; it only points to Yang (2006) §4.4.4.

## 10. What the source does NOT address (confident silences)
- No literal `rst` output-file **section-header strings** are printed in the manual (e.g. it does
  not show "Prob distribution at node" or "List of extant and reconstructed sequences" as text).
  The manual describes `rst` content in prose only.
- No numeric saturation / reliability threshold for dS or branch length (no "< 1.0", no "dS > 3").
- No `--version` command-line flag documented for codeml (the version appears only on the manual
  title page: "Version 4.10.8 (November 2024)").
- No explicit statement about `rst` output-**format stability across versions** (4.9 → 4.10);
  the only version-delta noted near ASR is the added `maintree` option "From version 4.10".

## 11. Open questions / ambiguities
- `RateAncestor = 2`: the control-file comment allows `(0,1,2)` "ancestral states (1 or 2)", but
  the prose only describes `0` and `1` ("RateAncestor = 0 or 1. Usually use 0."). What `= 2`
  produces beyond `= 1` is not spelled out in the read text.
- Exact `rst` layout / field order for a parser: not derivable from the manual; must be obtained
  from an actual codeml run's `rst` output.

## 12. Guidance answers
- **`RateAncestor=1` vs `=0`**: Answered. `= 0` (usual/default) skips the extra analyses. `= 1`
  forces (a) per-site rate estimation → file `rates` (empirical Bayes, Yang & Wang 1995), and
  (b) empirical-Bayesian ancestral-sequence reconstruction → file `rst`, listed by site. Verbatim
  option form: `RateAncestor = 0 or 1`; control-file comment `(0,1,2): rates (alpha>0) or
  ancestral states (1 or 2)`.
- **ASR-relevant `codeml.ctl` fields / defaults**: Answered with verbatim spellings/values — see
  §5 and §6. `seqtype` (1 codons/codonml, 2 AAs/aaml, 3 codons-->AAs); `model`; `NSsites` (Mm
  models, batch allowed); `CodonFreq` (0/1/2/3 = 1/61-each / F1X4 / F3X4 / codon-table; params
  0/3/9/60); `aaRatefile` (`wag.dat` default in example; `dayhoff.dat`, `jones.dat`, `mtmam.dat`,
  `mtREV24.dat`); `cleandata` (1 remove ambiguity/gaps, **0 default** keep); `getSE` (0/1/2, must
  be 0 during tree search). Defaults in the shipped example ctl: `seqtype = 2`, `CodonFreq = 2`,
  `model = 2`, `NSsites = 0`, `RateAncestor = 0`, `getSE = 0`, `ncatG = 3`, `Small_Diff = .5e-6`,
  `method = 0`.
- **`rst` section-header strings the parser keys on**: **NOT in the source.** The manual does not
  reproduce the literal `rst` output headers (no "Prob distribution at node", no "List of extant
  and reconstructed sequences"). It only states that ASR results and NSsites posterior
  probabilities are "collected in the file rst" and listed by site. → GAP: header strings must be
  captured from an actual codeml `rst` file, not this manual.
- **Saturation / reliability limits ("dS/branch length < 1.0", "dS > 3 unreliable")**: **NOT in
  the source as numbers.** The manual states no such cutoffs. It only flags "systematic biases in
  ancestral reconstruction" (pointer to Yang 2006 §4.4.4) and cautions against reusing
  reconstructed sequences as data. → The 1.0 / 3.0 thresholds are **convention / external**, not
  the PAML manual — label as convention, do not cite this manual for them.
- **Version notes / output-format stability / `--version` flag**: Version read = **4.10.8
  (November 2024)**. The manual does **not** discuss 4.9→4.10 output-format stability and does
  **not** document a `--version` flag. Only version-delta noted near ASR: `maintree` option added
  "From version 4.10". Control file is passed positionally (`codeml tmp2.ctl`); no version flag.
