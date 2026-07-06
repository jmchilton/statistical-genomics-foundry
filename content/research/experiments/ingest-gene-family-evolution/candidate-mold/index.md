---
type: mold
name: audit-gene-family-birth-death
tags:
  - family/b
  - role/critique
  - domain/gene-family-evolution
references:
  - kind: research
    ref: "[[hahn-2005]]"
    used_at: runtime
    load: on-demand
    trigger: "when the analysis fits a birth-death process to gene-family sizes over a species tree and flags 'rapidly evolving' / lineage-specific families"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the core model (single per-gene rate λ, λ=μ) and its stated invalidity patterns: single-global-rate assumption, gene-independence broken by WGD/polyploidy, TE outliers, uniform-root-prior bias, and the by-chance false-positive baseline (35/1254 expected at P<0.01)."
  - kind: research
    ref: "[[de-bie-2006-cafe]]"
    used_at: runtime
    load: on-demand
    trigger: "when the named tool is CAFE (v1) or the analysis reports per-family / per-branch p-values from a fitted single-global-λ birth-death model"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the tool's real requirements (Newick, rooted + bifurcating tree, branch lengths in units of time), the Monte-Carlo per-family p-value, the three branch-attribution methods (Viterbi / branch cutting / likelihood-ratio test), and the confident silence: CAFE performs NO multiple-testing / FDR correction across families."
  - kind: research
    ref: "[[mendes-2020-cafe5]]"
    used_at: runtime
    load: on-demand
    trigger: "when the named tool is CAFE5 or the analysis claims per-family p-values / Type-I error control / a minimum orthogroup count from CAFE5"
    mode: condense
    evidence: corpus-observed
    purpose: "Bound what CAFE5 does (gamma rate-categories among families, K chosen a priori, empirical-Bayes posterior rate-category probability) vs. what it does NOT claim (no per-family p-value, no Type-I error control, no stated minimum #families). Anti-mis-attribution reference."
  - kind: research
    ref: "[[csuros-2010-count]]"
    used_at: runtime
    load: on-demand
    trigger: "when the named tool is Count or ancestral gene-content states (Dollo/Wagner parsimony or likelihood BD) are reconstructed and used as if observed"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the alternative ASR toolkit (Dollo/Wagner/asymmetric-Wagner parsimony, PGL, phylogenetic birth-death-immigration with per-branch μ/λ/κ) and that its probabilistic branch counts are expectations → fractional. Also records that Count states NO ultrametric/time-scaling tree requirement."
  - kind: research
    ref: "[[tonkin-hill-2020-panaroo]]"
    used_at: runtime
    load: on-demand
    trigger: "when the family-size matrix comes from a PROKARYOTIC pangenome and was not polished for annotation error before the birth-death fit"
    mode: condense
    evidence: hypothesis
    verification: "Panaroo grounds annotation-error inflation of gene-family-size differences ONLY for prokaryotic pangenomes; it explicitly does NOT generalize to eukaryotes or to CAFE-style BD models (its sole eukaryote mention is a Denton-et-al. citation, not a Panaroo claim). Using this as a general audit trigger beyond bacterial pangenomes is our inference; verify per input organism before flagging. See [GAP] in body."
    purpose: "Ground the cautionary pattern: fragmented assemblies / contamination / mis-assembly / inconsistent per-isolate calls inflate apparent gene-family-size differences, and error scales with sample size (accessory genome grows with #genomes) — a garbage-in driver of spurious 'unusual' families upstream of any BD model."
  - kind: research
    ref: "[[msmb-chap6]]"
    used_at: runtime
    load: on-demand
    trigger: "when many families/branches are tested at once, or when p-value calibration / null adequacy is in question"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the multiple-testing remedy (BH-FDR, Bonferroni/FWER, FWER blow-up at scale), the p-value-histogram diagnostic, the integer-count discreteness artifact that breaks null p-value uniformity, and pseudoreplication (dependence masquerading as more data)."
  - kind: research
    ref: "[[denton-2014]]"
    used_at: runtime
    load: on-demand
    trigger: "when the family-size matrix comes from a EUKARYOTIC draft / fragmented / incomplete genome assembly and was not audited for gene-number annotation error before the birth-death fit"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the eukaryotic garbage-in pattern: draft assemblies mis-size >40% of gene families in BOTH directions — fragmentation (one gene split across contigs) and split alleles (haplotypes) over-count → false EXPANSION; missing / incomplete genes under-count → false CONTRACTION (fosmid outlier: >half of families missing copies). Warning signal = low CEGMA core-gene completeness / low contiguity (predates BUSCO, prescribes NO numeric cutoff, relationship reported only categorically); remedy = RNA-Seq to reconnect fragmented gene models. Scope: eukaryote-only (chicken/chimp/Drosophila-Daphnia sim), and Denton itself does NOT name CAFE / birth-death — it grounds wrong family SIZES; the bridge to inflated BD RATES is carried by [[han-2013-cafe3]]."
  - kind: research
    ref: "[[han-2013-cafe3]]"
    used_at: runtime
    load: on-demand
    trigger: "when the birth-death fit is run on gene-family sizes from error-prone (fragmented / incomplete) assemblies without a measurement-error model, or when the named tool is CAFE 3 / the analysis claims error-corrected gain-loss rates"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground error-aware birth-death: uncorrected annotation/assembly error makes gene-family gain/loss (λ) rates be CONSISTENTLY OVERESTIMATED (abstract-verified), and CAFE 3's measurement-error model — error matrix Θ = P(observe w | true x) with rate ε, entering Felsenstein pruning at the leaf nodes, estimated via `caferror.py` grid-search and applied via the `errormodel` command — recovers accurate rates. Simulation magnitudes (true λ=0.0012 → ~2.3x inflation at ε=0.1, ~7.5x at ε=0.4; corrected to within ~2%) are BODY-TEXT and RETRIEVAL-UNCERTAIN (note §2): cite as illustrative simulation values, not verified thresholds, and re-check the PDF before making any threshold load-bearing. Han states NO ε cutoff above which correction is mandatory; correction validity rests on stated assumptions (i.i.d. families; error depends on observed-minus-true count, not true size; stationary error)."
---

# audit-gene-family-birth-death

Family-B referee. Audits the *method validity* of a gene-family birth-death (BD) analysis
(λ birth-death dynamics of gene-family sizes across a species tree). Judges whether assumptions
are met, whether the named method is real and appropriate, and whether the error rate is actually
controlled — it does **not** re-run or bless the analysis. Every flag is grounded in a note below;
where the notes don't ground a needed check, the step emits `[GAP: …]` rather than inventing.

## The audit walk

### 1. Is the named method real and appropriate?
Confirm the method named by the analysis is one the corpus actually describes:
the Hahn-2005 BD framework `[[hahn-2005]]`, **CAFE** `[[de-bie-2006-cafe]]`, **CAFE 3**
`[[han-2013-cafe3]]`, **CAFE5** `[[mendes-2020-cafe5]]`, or **Count** `[[csuros-2010-count]]`. An
invented / unrecognized method name with a fluent derivation → **flag as unrecognized**, never
rationalized.
Match the method to the *claim*: CAFE / Hahn produce a **per-family p-value** (accelerated
gain-loss under a fitted single-global-λ null); CAFE5 produces an **empirical-Bayes posterior
rate-category probability**, **not** a per-family p-value `[[mendes-2020-cafe5]]`; Count does
**ancestral reconstruction** (parsimony or likelihood), not a per-family significance test
`[[csuros-2010-count]]`. A claim of "CAFE5 p-values" or "CAFE5 Type-I error control" is a
**mis-attribution → flag** (the CAFE5 note records no such claim). **CAFE 3**'s distinctive feature
is a **measurement-error layer** that corrects gain/loss rates for annotation error `[[han-2013-cafe3]]`;
the CAFE 3 note does **not** establish what significance output (per-family p-value, Viterbi, separate
λ/μ) CAFE 3 itself reports, so do not attribute those to the CAFE 3 note.
`[GAP: CAFE 3's significance/output claims are a confident silence in the note (§10: "do not backfill
from CAFE5/CAFE manuals") — treat CAFE 3 as corpus-recognized for error-aware rate estimation only,
not as a source for per-family p-values.]`

### 2. Tree / branch-length requirements
If the tool is **CAFE**, the input tree must be **rooted, bifurcating, with branch lengths in
units of time** `[[de-bie-2006-cafe]]`. An unrooted, multifurcating, or non-time-branch-length
tree → **flag**. Branch lengths scale the BD process (time t on each branch enters the
likelihood), so wrong/miscalibrated branch lengths distort every family's likelihood
`[[hahn-2005]]`.
**Do NOT flag "tree is not ultrametric."** `[GAP: no note grounds an ultrametricity / molecular-clock
requirement — Hahn-2005 explicitly makes no ultrametricity claim (tips are contemporaneous, branch
lengths in My, but no stated requirement), and Count explicitly states none. Asserting "ultrametric
required" as sourced would be invention.]`

### 3. Is the single-global-λ null appropriate? (assumption audit)
The base model (Hahn, CAFE) assumes **one global rate λ with λ=μ** (equal birth and death)
`[[hahn-2005]]` `[[de-bie-2006-cafe]]`. The fitted global λ is itself the reference for every
family's p-value, so a poorly-fitting global rate biases all of them. Check whether single-λ is
defensible; Hahn's own stated violations of the single-rate / gene-independence assumptions
`[[hahn-2005]]`:
- **Whole-genome duplication / polyploidy** act on many family members at once → families that
  change *together* are mis-scored; a lineage's flagged families may be artifacts of one genomic
  event → **flag** when a WGD/polyploid lineage is present.
- **Transposable elements** multiply non-Mendelianly → spurious "rapidly evolving" outliers → **flag**.
- **Very large families** may violate the constant-per-gene-rate assumption (rate may scale with
  size) → over/under-calling → **flag**.
If the analysis needs among-family rate variation, CAFE5's gamma rate-categories are the corpus
remedy `[[mendes-2020-cafe5]]`.
`[GAP: no note supplies a concrete diagnostic/detector or threshold for identifying WGD/polyploidy,
TE-driven families, or "too large" families in the data — Hahn names these failure modes but gives
no test. The referee can flag the concern when the design signals it, but cannot cite a sourced
detection procedure.]`

### 4. Was multiple testing across families handled?
A BD analysis tests **thousands** of families (Hahn: 3517 families; 1254 changed; De Bie: "one to
thousands"). **CAFE performs no multiple-testing / FDR correction — it reports raw per-family
p-values and leaves any correction to the user** `[[de-bie-2006-cafe]]`. Hahn shows the baseline
directly: at **P<0.01, ~35 of 1254 flags are expected by chance**; only the *excess* (58 observed
vs 35 expected) is evidence `[[hahn-2005]]`. So:
- Raw per-family p-values thresholded (e.g. P<0.05) with **no correction** across thousands of
  families → **flag** (naive multiple testing; FWER → 1 at scale) `[[msmb-chap6]]`.
- The corpus remedy: **BH-FDR** (screening for candidates) or **Bonferroni/FWER** (when any single
  false positive is costly), per `[[msmb-chap6]]`.
- The same applies to **per-branch** attribution tests (Viterbi / branch-cutting / LRT run across
  every branch): the De Bie note flags as an open question whether per-branch p-values are
  themselves corrected `[[de-bie-2006-cafe]]` — untreated per-branch testing across all branches
  → **flag** `[[msmb-chap6]]`.
`[GAP: no note prescribes a specific FDR target or significance threshold to require. Hahn's P<0.01
is an example used in one dataset, not a prescription; MSMB states "nothing special about 0.05."
The referee flags the *absence* of correction, but must not assert a specific sourced threshold.]`

### 5. Is the null actually calibrated? (p-value validity)
CAFE p-values are **Monte-Carlo** (simulation under the fitted model), i.e. approximate
`[[de-bie-2006-cafe]]`. Validity check the field trusts `[[msmb-chap6]]`:
- **p-value histogram** is the key diagnostic — flat uniform null + peak near 0 = healthy; a hump
  in the middle / near 1, or no peak near 0, signals mis-calibration, dependence, wrong null, or
  discreteness. A multiple-testing analysis with **no p-value histogram inspected** → **flag**.
- **Integer-count discreteness**: gene-family sizes are counts, and discrete statistics break null
  p-value uniformity (spikes near 1), biasing FDR estimates `[[msmb-chap6]]`. A count-based BD
  analysis that assumes clean uniform nulls without addressing discreteness → **flag**.
- The De Bie note gives no default Monte-Carlo sample count or precision bound `[[de-bie-2006-cafe]]`;
  very small p-values from too-few samples are untrustworthy.
  `[GAP: no note supplies a required Monte-Carlo sample size or p-value precision floor.]`

### 6. Garbage-in: were family sizes polished for annotation error? (input validity)
For a **prokaryotic pangenome** input, apparent gene-family-size *differences* can be dominated by
annotation error — **fragmented assemblies (~59% of one case-study discrepancy), inconsistent
per-isolate gene calls (~10%), contamination, mis-assembly** — and the error **scales with sample
size** (accessory genome inflates as more genomes are added) `[[tonkin-hill-2020-panaroo]]`. A BD
"rapidly evolving family" result computed on an **unpolished** prokaryotic pangenome → **flag**:
the size variation may be annotation noise, not biology. Diagnostic signal: accessory-genome size
that grows with #genomes, or a large gap between clustering tools' reported sizes. Remedy:
population-wide graph polishing (e.g. Panaroo) before the BD fit.
For a **EUKARYOTIC** input (draft / fragmented / incomplete assembly — the setting of most CAFE/CAFE5
use), the same garbage-in risk is now grounded directly by Denton: across draft assemblies **>40% of
gene families are the wrong size** vs. a higher-quality version of the *same* genome, and the error runs
in **BOTH directions** `[[denton-2014]]`:
- **Fragmentation** (one real gene split across contigs → predicted as ≥2 partial genes) and **split
  alleles** (the two haplotypes assembled as separate genes) **over-count** → false apparent
  DUPLICATION / gene-family **EXPANSION** `[[denton-2014]]`.
- **Missing / incomplete genes** in low-coverage assemblies **under-count** → false apparent LOSS /
  gene-family **CONTRACTION** (Denton's 2X fosmid outlier: >half of families missing gene copies)
  `[[denton-2014]]`.
So a "rapidly evolving / expanded / contracted family" result computed on an **unaudited eukaryotic
draft assembly** → **flag**: the size change may be an assembly artifact, not biology. Warning signal
Denton endorses: **low core-gene completeness (CEGMA) / low contiguity** (genes commonly exceed contig
length — chicken mean gene 27.8 kb). Remedy Denton endorses: **RNA-Seq evidence to reconnect fragmented
gene models** before trusting counts, plus closely-related high-quality references.
`[GAP: Denton prescribes NO numeric completeness/contiguity cutoff (CEGMA %, N50, coverage) above which
gene-count inference is "safe" — it predates BUSCO, gives no threshold, and reports the
error-vs-quality relationship only categorically (no correlation/regression statistic). The referee
flags low completeness/contiguity as a warning but must NOT assert a sourced numeric cutoff. Also:
Denton itself does NOT name CAFE / birth-death — it grounds wrong family SIZES; the bridge from wrong
sizes to inflated BD RATES is carried by [[han-2013-cafe3]] (step 7 below), not Denton.]`

### 7. Was measurement error modeled in the rate estimate? (error-aware birth-death)
Step 6 establishes family *sizes* may be miscounted; this step audits whether the *rate* estimate
accounts for it. Uncorrected annotation/assembly error makes gene-family gain/loss rates be
**consistently overestimated** — an abstract-verified finding, the known *direction* of the bias is
upward `[[han-2013-cafe3]]`. In simulation (true λ=0.0012) the uncorrected estimate inflates **~2.3× at
ε=0.1** and **~7.5× at ε=0.4**, while the correct error model recovers λ to within ~2% `[[han-2013-cafe3]]`
(these magnitudes are illustrative simulation values carrying **retrieval uncertainty** per the note's
access boundary — do not cite them as verified thresholds). So:
- A BD analysis on error-prone (fragmented / incomplete) assemblies that reports gain/loss **rates**
  with **no measurement-error model** → **flag**: the rates are likely inflated `[[han-2013-cafe3]]`.
- The corpus remedy is **CAFE 3's error model** `[[han-2013-cafe3]]`: an error matrix **Θ** =
  P(observe w | true x) with error rate **ε**, entering Felsenstein pruning at the **leaf nodes** only
  (internal nodes keep the birth-death transition probabilities). ε is estimated three ways —
  (1) compare draft vs. high-quality reference genome (ML error matrix); (2) compare two error-prone
  assemblies (only slightly less accurate); (3) no external data → **grid-search over ε** maximizing
  the (pseudo)likelihood, automated by **`caferror.py`**, applied via the **`errormodel`** command.
- Stated practical limit: estimating the error matrix from external data with **more than four
  parameters** failed to converge — an over-parameterized error model is itself a flaw `[[han-2013-cafe3]]`.
`[GAP: Han states NO ε cutoff above which an error model becomes mandatory — it shows material inflation
already at ε=0.1 but prescribes no threshold, so the referee flags the *absence* of an error model on
error-prone input but must NOT assert a sourced ε (or completeness) trigger. The correction's own
validity rests on Han's stated assumptions — i.i.d. families; error depends only on (observed − true)
count, not true size; stationary error across families/time — so do not present the error model as
unconditionally sufficient. (The note marks the assumption→failure-mode mapping [summarizer-inferred].)]`

### 8. Pseudoreplication / dependence
The independence assumption is load-bearing: treating dependent observations as independent shrinks
p-values spuriously `[[msmb-chap6]]`. In BD, gene-independence is broken by the large-scale events
in step 3; more broadly, correlated families/lineages counted as independent tests inflate
significance → **flag** when dependence structure is ignored.

### 9. Ancestral-state over-reading
If the analysis treats reconstructed ancestral family sizes as observed facts: Count's probabilistic
branch counts are **expectations (fractional)**, and its ancestral outputs are **posterior
probabilities of presence/absence**, not certainties `[[csuros-2010-count]]`; CAFE ancestral sizes
are **Viterbi (most-likely) assignments** `[[de-bie-2006-cafe]]`. Point estimates asserted without
their uncertainty → **flag**.

## Verdict
Emit, per flaw found: the invalidity pattern, the grounding note, and the remedy. If assumptions are
met, the named method is real and appropriate, correction and calibration are present, and no
`[GAP]`-blocked concern is being asserted as clean → **pass**. The referee never self-certifies a
concern it cannot ground; it emits `[GAP]` instead.
