---
type: pattern
name: batch-aliased-with-condition
pole: cautionary-bad
status: stub
---

# Batch aliased with condition (confounding / non-identifiability / correct-then-test)

> **Stub.** Corpus-first: this page starts minimal and grows only when a real case demands it
> (`GUIDING_PRINCIPLES.md`). Below is the one-line phenomenon, the two regimes that share the
> mechanism, and the primary-source outline to summarize next. Each concrete signature is added
> only when its primary is read into a `content/research/papers/<id>/` note. Frontmatter contract for
> patterns is deferred to repo standup (AGENTS.md).

**Phenomenon (one line):** a technical/batch factor co-varies with the biological contrast. When
they are **perfectly aliased**, the design matrix is **rank-deficient** and the batch and
biological effects are **non-identifiable** — no correction can separate them. When **partially**
confounded, the common "correct-then-test" move (remove the batch effect, then test as if it were
never there) **inflates significance**. No error is thrown; the effect estimate or its p/q-value
simply lies.

**Why two regimes, not one.** Same confounding, two clothes — and they earn opposite verdicts,
which is exactly why this pattern is the [[audit-method-validity]] referee's **ESCALATE** anchor
(double-dipping is its REVISE anchor — fixable; this one has an *unfixable* extreme):

- **Perfect aliasing → ESCALATE (unfixable).** Every case in batch 1, every control in batch 2:
  the contrast column and the batch column span the same subspace, the design is rank-deficient,
  the coefficients are non-identifiable. *No* method — ComBat, covariate adjustment, surrogate
  variables — can recover the separation; the only fix is a redesign. *[corpus-observed anchor:
  Leek 2010's bladder/sTCC case — biology (CIS status) confounded with processing date; even the
  control samples clustered perfectly by date, proving the split was batch, and "statistical
  adjustment cannot recover it." The strict "rank-deficient ⇒ non-identifiable" restatement is a
  linear-algebra fact — see the convention flag below.]*
- **Partial confounding → "correct-then-test" inflation.** Two-step batch adjustment (e.g. ComBat
  to "clean" the data, then a naive test that ignores the adjustment) inflates false-positive and
  false-discovery rates, catastrophically under **unbalanced** group-batch designs. The remedy is
  a one-step model that carries batch as a covariate (`~ batch + condition`), not correct-then-test.
  *[corpus-observed: Nygaard et al. 2016 — reanalyses 2011 vs 11 and 1003 vs 377 DE genes
  (correct-then-test vs batch-blocked); inflation is a fixed factor set by design imbalance, not
  sample size; corroborated by limma/DESeq2 tool docs]*

## Primary sources to summarize (→ `content/research/papers/<id>/`)

Sourcing pre-verified in `content/research/05-skill-backing-references.md` §3 (`[VS]` = search-confirmed
venue/DOI). **`✓ ingested`** = note exists at `content/research/papers/<slug>/` and wiki-links back here.

**Spine / validity axis — the correct-then-test cardinal sin (highest recoverability value)**
- **Nygaard, Rødland & Hovig 2016, _Biostatistics_ 17(1):29–39** (DOI 10.1093/biostatistics/kxv027;
  PMID 26272994; CC BY 4.0) — "Methods that remove batch effects while retaining group differences
  may lead to exaggerated confidence in downstream analyses." Grounds the **correct-then-test**
  signature + the unbalanced-design inflation + the one-step-model remedy (`~ batch + condition`).
  The portable null detector: ComBat + F-test on N(0,1) data with the *real design retained* yields a
  non-uniform p-value distribution / inflated F. **Silent on RNA-seq counts** — do not assume the NB
  case transfers. → `✓ ingested` [[nygaard-2016]]

**Overview / awareness + the confounded-with-outcome example**
- **Leek, Scharpf, Corrada Bravo, Simcha, Langmead, Johnson, Geman, Baggerly & Irizarry 2010,
  _Nature Reviews Genetics_ 11(10):733–739** (DOI 10.1038/nrg2825) — "Tackling the widespread and
  critical impact of batch effects in high-throughput data." Grounds prevalence (32.1–99.5% of
  features batch-associated; 12.2–100% confounding R² across 9 datasets) + the **unfixable
  confounded-design anchor** (bladder/sTCC: controls cluster by date ⇒ batch-driven; adjustment
  cannot recover). **Paywalled publisher version; read via the open NIH author manuscript
  (PMC3880143), all-rights-reserved → own-words note.** → `✓ ingested` [[leek-2010]]

## Convention — flag, don't cite (no clean primary)
- **"Complete (perfect) confounding is uncorrectable."** This is a design-of-experiments /
  linear-algebra fact (rank-deficient design ⇒ non-identifiable coefficients). Both ingested notes
  speak to it *qualitatively* — Leek's bladder/sTCC anchor + own-words "adjustment cannot recover
  it"; Nygaard's balance condition (no inflation iff each batch reproduces the overall group ratio,
  ν₀ = ν) — but **no single crisp citable "complete confounding is uncorrectable" sentence** exists
  in either (`content/research/05-skill-backing-references.md` §3). Label it as convention; cite Nygaard +
  Leek jointly for the surrounding claim, never as the source of this exact sentence.

## Tool-doc corroboration (community guidance, not primaries)
- **limma `removeBatchEffect`** doc: use for plots/EDA only, *not* before linear modelling.
- **DESeq2** vignette: model batch as `~ batch + condition`; don't correct-then-test.

## Adjacent (belongs to sibling leaves, cross-link — do not absorb here)
- The *diagnostic* that detects aliasing (cross-tabulate batch × condition; check design-matrix
  rank) is a protocol-altitude referee → `[[assess-batch-effects-and-confounding]]`, not this note.
- Surrogate-variable / unwanted-variation methods (sva, RUVSeq) target **unknown/unmeasured**
  confounders — a different regime than a *measured* batch aliased with the contrast. Cross-link,
  don't merge.

<!-- design-inference: the two-regime split (perfect-aliasing→ESCALATE vs partial→correct-then-test)
     and the convention-flag on uncorrectability are this project's synthesis from
     content/research/05-skill-backing-references.md §3. Both regime anchors are now corpus-observed (Leek
     2010 bladder/sTCC; Nygaard 2016 reanalyses); the strict rank-deficiency restatement remains the
     flagged convention. -->
