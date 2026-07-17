---
type: pattern
name: garden-of-forking-paths
pole: cautionary-bad
status: stub
tags:
  - domain/experimental-design
  - domain/multiple-testing
---

# Garden of forking paths (researcher degrees of freedom / undeclared analysis family)

> **Stub.** Corpus-first: starts minimal, grows only when a real case demands it
> (`GUIDING_PRINCIPLES.md`). The boundary table below is the load-bearing content — this leaf exists
> mainly to be *distinguished* from its siblings. Each signature is added only when its primary is
> read into a `content/research/papers/<id>/` note. Frontmatter contract for patterns deferred to repo standup.

**Phenomenon (one line):** analytic choices — which comparison, which subgroup, which covariates,
which exclusions, which transformation, which outcome coding — are made **contingent on the observed
data**, so the reported test is one of *many implicit forks* that could have been taken. The p-value
is computed as if the analysis were pre-specified; it is not, so it lies. (term: Gelman & Loken
2013/2014; "researcher degrees of freedom": Simmons, Nelson & Simonsohn 2011.)

**The load-bearing subtlety (why this is not just "multiple testing").** Error inflates EVEN WHEN
- only a **single** test is actually run (no fishing, no p-hacking), AND
- the research hypothesis **was posited ahead of time**

— because under different data a *different fork* would have been chosen. The multiplicity is
**latent** (the paths not taken), not manifest. This is Gelman & Loken's central claim and the
whole reason the term exists; do not reduce it to "they ran too many tests."

## Boundary — vs the sibling leaves (draw this sharply; they genuinely overlap)

| Leaf | Mechanism | Detector |
|---|---|---|
| **`[[garden-of-forking-paths]]`** (this) | analysis *specification* chosen post-hoc; test family undeclared. Latent multiplicity even at N=1 test. | **provenance**: were the comparisons / subgroups / covariates / exclusions / outcome pre-specified before seeing data? |
| **`[[double-dipping]]`** | a specific structural circularity: the same data *selects* a feature then *tests* it; non-independence under the null | **structural**: is there a selection step feeding a test on the same data? |
| p-hacking / fishing | **manifest** multiplicity: many analyses run, the best reported | many tests + selective reporting |

- **`[[double-dipping]]` ⊂ forking-paths conceptually** (a data-contingent selection *is* one fork),
  but it is sharper and *structurally* detectable, so it earns its own leaf. This leaf is the
  **residual**: post-hoc choices that are not a single clean select-then-test — subgroup fishing,
  covariate/model selection, outcome switching, flexible exclusions.
- **forking-paths ≠ p-hacking** — the working-paper title says so verbatim ("even when there is no
  'fishing expedition' or 'p-hacking'"). p-hacking is manifest multiplicity; forking-paths is latent.

## Signatures (each added when its primary is read)
- **undeclared-family** — a test reported with no pre-specified analysis family (which comparisons /
  subgroups were candidates?). *[mold scenario: `forking-paths-post-hoc-interaction`]*
- **post-hoc subgroup / interaction** chosen after seeing which cut "worked."
- **data-contingent covariate / model / transformation / exclusion** choices.
- **outcome or coding switched** to the version that reached significance.

## Primary sources to summarize (→ `content/research/papers/<id>/`)
Sourcing pre-verified in `content/research/05-skill-backing-references.md` §10 (`[VS]`).
**`✓ ingested`** = note exists at `content/research/papers/<slug>/` and wiki-links back here.

- **Gelman & Loken 2014, _American Scientist_ 102(6):460** ("The Statistical Crisis in Science") +
  the **2013 Columbia working paper** ("The garden of forking paths: Why multiple comparisons can be
  a problem, even when there is no 'fishing expedition' or 'p-hacking' and the research hypothesis was
  posited ahead of time"). The definition + the **latent-multiplicity** mechanism (procedure #3,
  *T(y; φ(y))*); offers *no* quantitative inflation figure (deferred to future work). → `✓ ingested`
  `[[gelman-loken-2014]]`
- **Simmons, Nelson & Simonsohn 2011, _Psychological Science_ 22(11):1359–1366**
  (DOI 10.1177/0956797611417632) — coins "**researcher degrees of freedom**"; **quantifies** the
  inflation Gelman-Loken leaves open (single flexibilities ≈9.5–12.6% at *p*<.05; all four combined
  **60.7%**); the six-requirement disclosure remedy. → `✓ ingested` `[[simmons-2011]]`

## Remedy (what the referee demands)
- **Pre-specification / pre-registration**: declare the analysis family (comparisons, subgroups,
  covariates, exclusions, primary outcome) *before* seeing the data.
- **Report across forks**: multiverse analysis / specification-curve (`content/research/04`: Steegen &
  Gelman 2016 `multiverse`; Simonsohn 2020 `specr`).
- **Disclosure requirements** — Simmons et al.'s **six author requirements** (Table 2: pre-set +
  reported stopping rule; ≥20/cell; list all variables; report all conditions incl. failed; report
  results with excluded obs *included*; report results *without* the covariate). *(The compact
  "21-word solution" sentence is **later** work, not in Simmons 2011 — see `[[simmons-2011]]` §11.)*
  For subgroups: interaction tests + credibility criteria (Sun et al. 2010, `content/research/05` §10 →
  subgroup-analysis skill).

## Adjacent (cross-link — do not absorb)
- `[[double-dipping]]`, `[[batch-aliased-with-condition]]`, `[[method-applicability-errors]]` —
  sibling `[[audit-method-validity]]` leaves.
- `[[multiple-testing-strategy]]` (protocol) — handles **manifest** multiplicity + correction;
  forking-paths is the **latent** case a correction on the reported tests does not cover.

<!-- design-inference: the boundary table (forking-paths vs double-dipping vs p-hacking) and the
     "double-dipping ⊂ forking-paths but sharper, so it earns its own leaf" framing are this project's
     synthesis. Each signature becomes corpus-observed only when its primary above is read into a note. -->
