---
title: "wgd v2: a suite of tools to uncover and date ancient polyploidy and whole-genome duplication"
type: paper
source_id: chen-2024-wgd
source_url: https://doi.org/10.1093/bioinformatics/btae272
doi: 10.1093/bioinformatics/btae272
version: "wgd v2.0.38"
access_date: "2026-07-05"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Chen H, Zwaenepoel A, Van de Peer Y. wgd v2: a suite of tools to uncover and date ancient polyploidy and whole-genome duplication. Bioinformatics 40(5):btae272, 2024. DOI 10.1093/bioinformatics/btae272. Summary also uses wgd v2.0.38 CLI source facts."
derived: license-aware-summary
tags:
  - domain/whole-genome-duplication
  - domain/molecular-evolution
---

# wgd v2 — faithful source note

## 1. Citation
Chen H, Zwaenepoel A, Van de Peer Y. "wgd v2: a suite of tools to uncover and date ancient
polyploidy and whole-genome duplication." *Bioinformatics* 40(5):btae272 (2024). Application Note.
DOI: 10.1093/bioinformatics/btae272. Open access (CC-BY 4.0).
Code: https://github.com/heche-psb/wgd

Software version pinned for CLI defaults: **wgd v2.0.38** (git tag `v2.0.38`; `setup.py` → `version='2.0.38'`),
accessed 2026-07-05. CLI entry point at that tag is `cli.py` (the v2 command set: `dmd`, `ksd`, `syn`,
`mix`, `viz`, `focus`, `peak`). Note: the repo default `master` branch still ships an older `wgd_cli.py`
(`setup.py` → `version='1.2'`, subcommands `dmd/ksd/syn/kde/mix/viz`, no `focus`/`peak`); defaults below are
taken from the **v2.0.38 `cli.py`**, which matches the paper's described feature set. wgd v2 CLI evolves —
re-pin on re-use.

## 2. Access note
Full paper text read via the OUP Bioinformatics page (academic.oup.com redirect from DOI). Paper prose
quotes below were transcribed through an automated fetch; the load-bearing content (tool names, version
numbers, parameter defaults) is corroborated against the v2.0.38 CLI source, which I read directly. CLI
defaults are read verbatim from `cli.py` at tag v2.0.38. I did NOT read the ReadTheDocs manual (it serves
v1.0.1 content / the CLI page 404'd); CLI facts come from source, not docs.

## 3. Thesis (1 sentence)
wgd v2 is a major update of the `wgd` suite that constructs Ks age distributions, unravels WGD-derived
collinearity, fits mixture models, corrects for substitution-rate variation, and dates ancient WGDs via
phylogenetic (molecular-clock) dating, to detect and time remnants of ancient polyploidy.

## 4. Problem & context
Growth in assembled genomes creates demand for tooling to find remnants of ancient whole-genome
duplication (WGD)/polyploidy. wgd v2 substantially improves and expands on its predecessor (the 2018
`wgd` of Zwaenepoel & Van de Peer) — adding orthogroup/RBH inference, synteny, rate correction, and
absolute dating pipelines.

## 5. Method / approach — pipeline and subcommands
Typical ordering: paranome/orthogroup delineation (`wgd dmd`) → Ks distribution (`wgd ksd`) → synteny
anchors (`wgd syn`) → mixture modeling (`wgd mix`) / peak+CI dating prep (`wgd peak`) → visualization
(`wgd viz`); `wgd focus` runs the gene-tree/species-tree/absolute-dating pipeline.

- **`wgd dmd`** — "All-vs-all diamond blastp + MCL clustering." Does the DIAMOND search, bit-score/gene-length
  normalization, and MCL clustering to delineate the whole paranome (1 input) or RBH orthologs (multiple
  inputs). Also hosts orthogroup inference (`--orthoinfer`), global MRBH, gene assignment, BUSCO-guided
  families, collinear coalescence.
- **`wgd ksd`** — "Paranome and one-to-one ortholog Ks distribution inference pipeline." Three steps: MSA
  building, maximum-likelihood Ks estimation (CODEML), and gene-tree construction for node weighting.
  Hosts ELMM plotting (`--plotelmm`), anchor-Ks GMM plotting (`--plotapgmm`), rate correction
  (`--speciestree`/`--reweight`), and Ks-tree inference.
- **`wgd syn`** — "Co-linearity and anchor inference using I-ADHoRe." Builds the gene table from GFF(s),
  configures and runs i-ADHoRe, extracts multiplicons/anchors/segments, and produces dot plots and
  anchor-Ks distributions.
- **`wgd mix`** — "Mixture modeling of Ks distributions." Fits GMM or BGMM to the (node-averaged) Ks
  histogram; selects via AIC/BIC (GMM).
- **`wgd peak`** — "Infer peak and CI of Ks distribution." KDE peak finding + GMM/BGMM on anchor pairs,
  confidence-interval and highest-density-region estimation to select Ks range for dating.
- **`wgd focus`** — gene-tree inference, species-tree inference (concatenation and/or coalescence), and
  absolute dating (MCMCTree / BEAST / r8s) of orthologous families containing anchor pairs.
- **`wgd viz`** — visualization of Ks distributions and collinearity results.

## 6. Key claims / findings (with exact defaults, verbatim functional strings)

Collinearity engine (the flagged question):
- `wgd syn` uses **i-ADHoRe**, NOT MCScanX. Command docstring: "Co-linearity and anchor inference using
  **I-ADHoRe**." Source calls `configure_adhore`, `run_adhore`, checks `can_i_run_software(['i-adhore'])`,
  and logs "I-ADHoRe 3.0 options". Paper: "Multiplicons are reconstructed from collinearity searches
  conducted with **i-ADHoRe (v3.0.01)**." MCScanX does not appear anywhere.

`wgd dmd` defaults (bit-score/gene-length normalization, MCL, E-value):
- `--inflation/-I` default `2.0` (MCL inflation factor)
- `--eval/-e` default `1e-10` (e-value cut-off for similarity)
- `--bins/-bs` default `100` (bins for gene length normalization)
- `--normalizedpercent/-np` default `5` (percentage of upper hits used for normalization)
- `--nonormalization/-nn` flag to disable normalization
- `--cscore/-c` default `None` (c-score to delineate homologs)
- `--tree_method/-tree` default `fasttree` (choices: fasttree, iqtree, mrbayes)
- `--msogcut/-mc` default `0.8`; `--nthreads/-n` default `4`

`wgd ksd` defaults (aligner, Ks estimator, tree, node weighting):
- `--aligner/-a` default `mafft` (choices: mafft, muscle, prank)
- `--aln_options` default `--auto` (MAFFT `--auto`)
- Ks estimator: **CODEML** (hard-wired: `KsDistributionBuilder`; paper: "CODEML program from the PAML
  (v4.9j) package"); MAFFT reported as v7.310.
- `--tree_method/-tree` default `fasttree` (choices: cluster, fasttree, iqtree) — "Tree inference method
  for node weighting". For 2 sequences (RBH) forced to `cluster`.
- Node weighting: **node-weighted by default**; `--node_average` flag switches to "node-average way of
  de-redundancy instead of node-weighted". (Paper: weights of a single duplication event sum to 1 under
  node-weighting; node-averaging represents an event by a single averaged Ks.)
- `--components/-c` default `(1, 4)` (anchor-Ks mixture components range)
- `--pairwise` flag (run codeml on all gene pairs separately); `--nthreads/-n` default `4`
- `--bootstrap/-bs` default `200`

`wgd syn` defaults (segment/gene thresholds):
- `--minlen/-ml` default `-1` (min length of a genomic element/scaffold for dotplot)
- `--maxsize/-ms` default `200` (max family size to include)
- `--minseglen/-mg` default `10000` ("minimum length of segments in ratio if <= 1")
- `--mingenenum/-mgn` default `30` (min number of genes on a segment to be considered)
- `--ks_range/-r` default `(0, 5)`
- i-ADHoRe extra options example string: `gap_size=30,q_value=0.75,prob_cutoff=0.05` (these are the
  documented i-ADHoRe knobs, passed via `--iadhore_options`, not wgd defaults)

`wgd mix` defaults (GMM/BGMM):
- `--method` default `gmm` (choices: gmm, bgmm)
- `--components/-n` default `(1, 4)` (range of number of components to fit)
- `--bins/-b` default `50`; `--filters/-f` default `300` (alignment length)
- `--ks_range/-r` default `(0, 5)`; `--gamma/-g` default `1e-3` (BGMM)
- `--n_init/-ni` default `200`; `--max_iter/-mi` default `200`
- Component selection: GMM inspected by AIC and BIC (`inspect_aic`, `inspect_bic`, `plot_aic_bic`); BGMM
  "unable to choose best model" (takes model with most components). Mixtures fitted to **node-averaged**
  (not weighted) histograms.

`wgd peak` defaults (dating / CI / saturation):
- `--method/-m` default `gmm` (choices: gmm, bgmm)
- `--components/-n` default `(1, 4)`
- `--kscutoff/-kc` default `5` ("Ks Saturation cutoff for genes in Dating")
- `--ci` default `95`; `--hdr` default `95`
- `--kstodate/-kd` default `(0.5, 1.5)`; `--ksrange/-r` default `(0, 5)`
- `--seed` default `2352890`; `--em_iter/-ei` default `200`; `--n_init/-ni` default `200`
- `--boots` default `200`; `--bin_width/-bw` default `0.1`
- `--bw_method/-bm` default `silverman` (choices: silverman, ISJ)
- `--kdemethod/-km` default `scipy`; `--prominence_cutoff/-prct` default `0.1`; `--rel_height/-rh` default `0.4`

`wgd focus` defaults (dating pipeline):
- `--aligner/-a` default `mafft`; `--tree_method/-tree` default `fasttree`
- `--dating/-d` default `none` (choices: beast, mcmctree, r8s, none)
- `--aamodel/-am` default `poisson` (choices: poisson, wag, lg, dayhoff)
- `--annotation` default `none` (choices: none, eggnog, hmmpfam, interproscan)
- `--evalue/-e` default `1e-10` (annotation E-value; also the HMMER/hmmscan threshold when
  `--annotation hmmpfam` or gene-assignment via hmmer is used)

Mixture models — GMM vs ELMM:
- **GMM**: log-scale Gaussian mixture, component number chosen via AIC/BIC over the `--components` range
  (default min=1, max=4).
- **ELMM** (exponential-lognormal mixture): fits the log-transformed whole-paranome Ks to a mixture of one
  exponential component plus **up to five normal components**. Invoked via `wgd ksd --plotelmm/-pem` (not
  via `wgd mix`, which offers only gmm/bgmm).

External dependencies (from source `can_i_run_software` checks + paper): DIAMOND, MCL, MAFFT (v7.310;
muscle/prank optional), PAML/CODEML (v4.9j), FastTree or IQ-TREE (mrbayes optional), i-ADHoRe (v3.0.01),
MCMCTree; optional BEAST, r8s, eggNOG, InterProScan, HMMER, ASTRAL-Pro.

## 7. Load-bearing statements — VERBATIM (permissive: CC-BY 4.0)
Mode: license permits reproduction → short verbatim quotes + functional strings.

1. Paper (Methods): "Multiplicons are reconstructed from collinearity searches conducted with i-ADHoRe
   (v3.0.01)." — settles the collinearity engine.
2. `cli.py` `syn` docstring (v2.0.38): "Co-linearity and anchor inference using I-ADHoRe." (functional string)
3. `cli.py` `dmd` option (v2.0.38): `--inflation`, `-I`, `default=2.0`, help "inflation factor for MCL";
   `--eval`, `-e`, `default=1e-10`. (functional strings)
4. `cli.py` `dmd` options: `--bins`, `-bs`, `default=100`, "bins for gene length normalization";
   `--normalizedpercent`, `-np`, `default=5`, "percentage of upper hits used for normalization". (functional strings)
5. `cli.py` `ksd` option: `--node_average` "node-average way of de-redundancy instead of node-weighted"
   (⇒ node-weighted is the default); `--aligner`/`-a` `default='mafft'`, `--aln_options default='--auto'`. (functional strings)
6. `cli.py` `mix` docstring: "mixture models are fitted to node-averaged (not weighted) histograms."
7. Paper: license — "This is an Open Access article distributed under the terms of the Creative Commons
   Attribution License (https://creativecommons.org/licenses/by/4.0/) …" (verbatim, license notice)

## 8. Stated scope, assumptions, limitations
- Ks estimation is subject to saturation at high divergence; a Ks saturation cutoff (paper: "typically 2
  or 3") is applied via `--kscutoff` to filter anchor pairs (CLI default `5`, more permissive than the
  paper's recommendation).
- Mixture-model interpretation is cautioned: source repeatedly logs "interpret best model with caution"
  and "Please interpret mixture model results with caution."
- BGMM cannot self-select the best model ("unable to choose best model").
- The two key `wgd dmd` parameters (e-value cutoff, MCL inflation) are explicitly flagged as needing
  exploration: "It is advised to explore the effects of them on your analysis."

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Ks saturation**: at high Ks, synonymous substitutions saturate → unreliable dating. Detector: the
  `--kscutoff` filter (recommended 2–3; default 5). Anchor pairs above the cutoff are excluded from dating.
- **No synteny found**: source warns "No anchors found, terminating! Please inspect your input files and
  the I-ADHoRe results …" — invalid synteny run (bad GFF feature/attribute keys, fragmented assembly).
- **GFF parsing mismatch**: "No genes from families file `{}` found in the GFF file for `feature={}` and
  `attribute={}`" → hard exit; and a soft warning when <1000 genes matched ("better Double check your
  command"). Symptom of wrong `--feature`/`--attribute` keys.
- **All singleton families**: "All families are singleton families, No Ks can be calculated" → exit.
- **Mixture over-fitting / mis-selection**: node-averaged vs node-weighted histogram choice and component
  count materially change conclusions; GMM best-model by AIC/BIC can mislead — flagged by the "interpret
  with caution" warnings. BGMM offers no automatic best model.
- **Family-size explosion**: `--max_pairwise` (ksd, default 10000) and `--maxsize` (syn, default 200)
  filter oversized families that would otherwise dominate compute.

## 10. What the source does NOT address (confident silences)
- No verbatim naming of the predecessor repository as "arzwa/wgd" was confirmed from the text I read; the
  paper names the predecessor as the 2018 `wgd` (Zwaenepoel & Van de Peer) but the specific GitHub org/repo
  string "arzwa/wgd" is unverified here.
- No BIC-based automatic component selection is stated for **ELMM** (only "up to five normal components");
  AIC/BIC selection is documented for GMM.
- No benchmark accuracy numbers, runtime tables, or comparison-vs-MCScanX are reported in the extracted text.

## 11. Open questions / ambiguities
- Exact i-ADHoRe default parameter set actually written into the config by `configure_adhore` (gap_size,
  cluster_gap, q_value, prob_cutoff, anchor_points, level_2_only, etc.) is not exposed as wgd CLI defaults;
  only overrides via `--iadhore_options` are shown. The min-block-size / anchor-pair minimum is an i-ADHoRe
  setting, not a wgd default.
- CLI-vs-paper drift: `wgd mix` in v2.0.38 exposes only `gmm`/`bgmm`; ELMM lives under `wgd ksd --plotelmm`.
- `--kscutoff` default (5) vs paper recommendation (2–3) — which governs a given analysis depends on the
  subcommand and user setting.

## 12. Guidance answers
1. **Pipeline ordering & per-subcommand action** — ANSWERED. dmd (diamond+normalization+MCL) → ksd (MSA +
   CODEML ML Ks + gene tree for node weighting) → syn (i-ADHoRe collinearity/anchors) → mix (GMM/BGMM;
   ELMM via ksd) → viz; focus does dating. See §5/§6, with verbatim docstrings.
2. **Collinearity engine (flagged discrepancy)** — ANSWERED, DEFINITIVE: **i-ADHoRe**, not MCScanX. Paper:
   "collinearity searches conducted with i-ADHoRe (v3.0.01)"; CLI docstring "Co-linearity and anchor
   inference using I-ADHoRe"; source runs `run_adhore` / checks `i-adhore`. A downstream skill claiming
   MCScanX is **wrong** for wgd v2. MCScanX appears nowhere.
3. **Ks construction defaults** — ANSWERED. Aligner MAFFT (`--auto`, v7.310); Ks estimator CODEML (PAML
   v4.9j), not yn00; tree method default FastTree (IQ-TREE optional); redundancy removal **node-weighted by
   default**, `--node_average` for node-averaging.
4. **Mixture modeling** — ANSWERED (partial on ELMM selection). GMM on log scale, components selected by
   AIC/BIC over range default (1,4). ELMM = 1 exponential + up to 5 normal components; no explicit BIC rule
   stated for ELMM. `wgd mix` default method gmm, components (1,4), n_init 200, max_iter 200.
5. **Every default parameter** — ANSWERED (see §6): bins=100 & top-%=5 for normalization; MCL inflation=2.0;
   E-value=1e-10; min segment length `--minseglen`=10000; min genes/segment `--mingenenum`=30; min genomic
   element `--minlen`=-1; max family size `--maxsize`=200; max_pairwise=10000. **Anchor-pair min block size:
   ABSENT as a wgd default** — it is an i-ADHoRe config setting, not surfaced by the wgd CLI.
6. **Saturation caveat / Ks cutoff** — ANSWERED. Paper: saturation cutoff "typically 2 or 3" via
   `--kscutoff`; CLI default 5.
7. **Citation + v1 predecessor** — ANSWERED (partial). Citation confirmed (btae272, CC-BY 4.0). Predecessor
   = 2018 `wgd` (Zwaenepoel & Van de Peer); the specific repo string "arzwa/wgd" as the deprecated v1 was
   NOT verified from the read text (see §10) — v2 lives at github.com/heche-psb/wgd.
