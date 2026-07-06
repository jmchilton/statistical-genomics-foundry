# Gap-closing — pangenome-analysis probe (Phase 5)

> Closes the residue from `comparison.md` §3. The candidate Mold marked **2 `[GAP]`s**; only one
> is a hunt target. Per the probe contract this does NOT re-open the Phase-3 candidate Mold — it
> enriches the corpus for the eventual human-authored Mold and records what *newly* recovers.

## Reuse-triage of the gap residue (before any external hunt)
Re-checked the four Phase-2 bacterial notes for the open/closed rule. **None carries it:**
- `tettelin-2005-pangenome` — uses an **exponential-decay-plus-constant** form
  (`Fs = κs·exp[−n/τs] + tg(θ)`); its openness criterion is a **nonzero asymptote** (tg(θ)≈33),
  *not* a power-law exponent inequality. Explicitly records that "Heaps' law" is absent. Wrong
  functional family — does not supply the rule.
- `tettelin-2008-openness` — the paywalled primary itself (abstract-only stub).
- `gautreau-2020-ppanggolin` — partition classes, not openness.
- `page-2015-roary` — core ≥99% threshold, not openness.

→ genuinely absent + paywalled ⇒ external OA surrogate hunt warranted.

## Work-list

| GAP (Gate) | Status | Detail |
|---|---|---|
| **B1 — numeric inflation / tool-gap cutoff** | **convention — not hunted** | `tonkin-hill-2020-panaroo` gives qualitative signatures (grows-with-N; large inter-tool gap; ~59% fragmentation, ~10% inconsistent-calls) and case numbers (~tenfold) but **no general cutoff**. A convention has no primary to recover; the label is the answer. Keep as a judgment call in the Mold. |
| **B4 — open/closed decision rule** | **closed-by-surrogate (partial)** | New note `[[snipen-2015-micropan]]` (CC BY 2.0) states the rule unambiguously. Sub-facts: rule + boundary **closed**; closed-form equation + min-genome count **still-open**. |

## B4 — what newly recovers (via `snipen-2015-micropan`, ingested Phase 5)

- **The decision rule (recovered, citable).** Author-written CRAN `heaps()` doc, verbatim:
  **"If 'alpha>1.0' the pan-genome is closed, if 'alpha<1.0' it is open."** Exponent symbol =
  **`alpha` (α)**; boundary = **1.0**; open side = **below 1.0**. Worked example in the paper:
  **α = 0.82 → open** (threshold 1.0).
- **Provenance (blocks laundering).** This is **micropan's OWN implementation** of the approach,
  which the paper attributes to Tettelin et al. 2008 (ref `[28]`). Cite the rule to
  **`snipen-2015-micropan`**, *never* laundered into a citation of the paywalled Tettelin 2008.
- **Still-open sub-facts:**
  - *Closed-form equation.* Neither the paper nor the CRAN doc prints the algebraic Heaps
    expression (`new_genes ∝ N^(−α)`); only the parameter α and the rule appear. Recovering the
    exact functional form still needs a source that prints it (Tettelin 2008 or an equivalent).
  - *Minimum-genome count.* **Not stated** in micropan. The only "minimum" is on `n.perm`
    (permutations, default 100) — a floor on permutations, not on genomes. The Mold's Gate-B4
    `[GAP]` on min-genomes remains open.

## Conflict surfaced (method-validation find — recorded, not smoothed)

Two OA sources state the openness rule with **different symbol AND boundary**:
- **micropan** (new-gene decay form): exponent **α**, open if **α < 1.0** (boundary **1.0**).
- **Xiao et al. 2019, *Front. Microbiol.* 10:834** (PMC6491781, CC BY; pan-genome **size** form
  `n = κ·N^γ`): exponent **γ**, verbatim "for γ < 0 … closed … for γ > 0 … open" (boundary **0**).

These are mathematically reconcilable (**α ≈ 1 − γ**, so α<1 ⟺ γ>0 — both say "open"), **but the
two are different surface forms**; a referee that cites "α < 1" must not re-render it as a γ-rule
without the α = 1 − γ conversion. Xiao 2019 is recorded here as the **hold/supporting** citation
for the alternative convention; it was **not ingested** (the micropan recommend closes the rule).

## Net Phase-5 result
- **Ingested (recommend):** 1 — `papers/snipen-2015-micropan` (CC BY 2.0).
- **Hold (recorded, not ingested):** `papers/xiao-2019-pangenome-size` (Front. Microbiol., CC BY) —
  the γ-convention citation.
- **Still-open:** the closed-form Heaps equation and the minimum-genome count (both need the
  paywalled primary's own text or an equivalent that prints them).
- **Not hunted:** Gate-B1 cutoff (convention).

Per contract, the Phase-3 candidate Mold is left as-is; its Gate-B4 `[GAP]` is now *partially*
closable by a human author citing `[[snipen-2015-micropan]]` for the rule + boundary (with the
convention flagged), while correctly leaving the min-genome sub-gap open.
