# Mold Spec (adapted from the Galaxy Workflow Foundry)

> Adapted from the parent's `docs/MOLD_SPEC.md`. The **source layout** and the **eval/scenario/usage/refinement** discipline carry over almost verbatim — they're domain-neutral and load-bearing. Two things change: the required **`axis`** field (a conversion concept) is **dropped/deferred** in favor of soft family/role tags, and the eval guardrails reframe from *hallucination* to **referee correctness** (which is our analog). Status: adaptation; open decisions flagged inline.

## Source Layout

A Mold source unit is a directory under `content/molds/<slug>/`. **Unchanged from the parent.**

Required:
- `index.md` — the only frontmatter-bearing Mold source file. Owns the Mold contract and the operational `references:` manifest.

Strongly recommended (warning-only):
- `eval.md` — abstract, fixture-independent property checks about cast output (the *how-to-judge*). Never packaged into casts.
- `scenarios.md` — concrete fixtures + expected values exercised by the `eval.md` oracle. Never packaged.

Optional: `usage.md` (illustration), `refinement.md` + `refinements/` (design questions + journal), `casting.md` (cast-time guidance), `cast-skill-verification.md`, `changes.md`, `examples/`.

Top-level Mold `.md` files carry no frontmatter except `index.md` (and the `refinements/` journal entries, which carry small structured frontmatter). File roles and packaging are exactly the parent's:

| File | Audience | Packaged into cast? |
|---|---|---|
| `index.md` | Mold contract + casting manifest | Body rendered into generated skills |
| `eval.md` / `scenarios.md` | maintainers (oracle / cases) | Never |
| `usage.md` / `refinement.md` / `refinements/` | authors / `/refine-mold` | Never |
| `casting.md` | casting LLM | Read at cast time |
| `examples/` | `index.md`, `eval.md` | Only if referenced |

`index.md` body discipline is unchanged: the body is procedural content rendered into the generated skill; keep author-facing meta-content (changelogs, redundant manifest restatements, open scope questions) out of the body so it doesn't leak into runtime artifacts.

## Index Contract — **adapted**

`index.md` must declare:
- `type: mold`
- `name`
- `references:` entries for operational dependencies
- **Family + role tags** (soft, not a schema enum yet — see below). Provisionally: a `family/a` or `family/b` tag, and a role hint via naming (`audit-*`, `review-*`, `derive-*`, plain verbs).

**Dropped from the parent: the `axis` enum** (`source-specific | target-specific | tool-specific | generic`). That axis describes a *conversion* (source→target), which is not our shape. Per `ARCHITECTURE.md` §5 and `GUIDING_PRINCIPLES.md` (corpus-first), we do **not** mint a replacement role-enum before ~6–10 Molds exist. Until then, family/role lives in **tags**, not required typed fields. Promote to a schema field only when the distinction has proven itself in content. *(Open: exact tag vocabulary for family/role.)*

## Typed Reference Manifest — mostly inherited, kinds adapted

`references:` is the operational dependency manifest; each entry is object-shaped (unchanged shape):

```yaml
references:
  - kind: research          # e.g. a methods-literature / negative-example note
    ref: "[[double-dipping-in-single-cell]]"
    used_at: runtime
    load: on-demand
    trigger: "when the analysis clusters then tests on the same data"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the double-dipping audit in the established remedy (countsplit)."
```

Required fields unchanged: `kind`, `ref`, `used_at`, `load` (`on-demand` requires `trigger`), `mode` (`verbatim | condense | sidecar`), `evidence` (`hypothesis | corpus-observed | cast-validated`; `hypothesis` requires `verification`). `purpose` strongly recommended.

**Kind adaptations:**
- `pattern` — statistical-method patterns *and* invalidity patterns (double-dipping, confounding, naive multiple-testing). High use.
- `research` — methods-literature and **cautionary negative-example** notes (see `CORPUS.md`). The corpus-grounding kind; high use.
- `cli-command` — our tool ecosystem (R/Bioconductor, PLINK/regenie, statsmodels, simulators), not gxwf/planemo. Author lazily, when a real action Mold needs an exact command.
- `schema` — **demoted** (per `ARCHITECTURE.md` §3). Our outputs are prose-shaped critiques/protocols; schemas are rare, reserved for genuinely structured artifacts (e.g. a power-calc result). Still supported, just uncommon.
- `prompt`, `example` — unchanged.

**The `evidence` field matters more for us than for the parent.** Our failure mode is plausible invented authority; a reference tagged `corpus-observed` or `cast-validated` is earned, `hypothesis` is a flag. Reviewers should weight `hypothesis`-evidence references heavily — they are where our own invention risk lives.

## Eval / Scenario / Usage / Refinement — inherited split, referee-flavored

The four-file split carries over unchanged (it's domain-neutral and the misfiling failure mode is the same): `eval.md` = abstract oracle (properties), `scenarios.md` = concrete cases (fixtures + expected), `usage.md` = illustration, `refinement.md` = open questions. Two tests, verbatim from the parent: names a specific fixture/magic value? → `scenarios.md`. Has no pass/fail edge? → usage or refinement, not eval.

### Eval Contract — **referee-correctness guardrails are first-class** (our analog of the parent's hallucination guardrails)

`eval.md` is the abstract oracle: properties every cast output must satisfy, no fixtures named. Property block shape unchanged:

```markdown
## Property: short-name
- check: deterministic | llm-judged
- assertion: observable property every conforming output must satisfy
```

The parent's highest-value evals are *hallucination guardrails* ("invented Tool Shed IDs must be flagged, not silently used"). **Our highest-value evals are referee-correctness guardrails** — the direct analog, because our whole reason for existing is catching plausible-but-invalid statistics:

- **For Family B (referee) Molds — catch-the-planted-flaw properties.** "Any analysis where feature selection and inference share data must be flagged as double-dipping, never passed." "A method whose null is mis-specified must fail calibration, not be blessed." "An invented/non-existent method must be flagged as unrecognized, not rationalized." Frame as: *the invalid case must be caught or flagged; it must not silently pass.* (The mirror of the parent's "X must appear or be flagged; must not silently vanish.")
- **For Family A (do) Molds — anti-invention + honesty properties.** "When no established method fits, the output must say so and escalate, not invent one." "Low-confidence method choices must be marked, not asserted."
- **Calibrate Molds carry deterministic properties.** "The constructed null yields uniform p-values on negative-control data." "The simulation recovers the planted truth within the stated error rate." These are mechanically checkable — the empirical gate as an eval property.

What still doesn't belong (unchanged): restating the procedural body; concrete fixtures/magic values (→ `scenarios.md`).

### Scenario Contract — unchanged shape; planted-invalid cases

`scenarios.md` holds concrete cases (`## Case:` with `fixture:` + `expect:`). For us, the richest scenarios are **planted-invalid fixtures**: a deliberately double-dipped analysis, a confounded design, an invented method with a fluent derivation — each bound to its expected referee verdict. **StatQA** (11,623 method-applicability cases) and known cautionary examples are ready scenario sources. The `eval.md` oracle ("must catch the flaw") applies to each scenario's output; the scenario adds the fixture-bound expected verdict.

### Usage / Refinement — unchanged.

## Validator Checklist — adapted

Carries over the parent's checks, minus conversion-specific ones, plus our discipline:
- Mold dir + `index.md` exist; only `index.md` has frontmatter; frontmatter validates.
- ~~axis/source/target/tool coherence~~ → **family/role tag coherence** (once a vocabulary exists).
- `references:` resolve by kind; `on-demand` refs have `trigger`; `hypothesis`-evidence refs have `verification`.
- `eval.md` exists, declares ≥1 `## Property:`, uses no `## Case:`, identifies deterministic vs llm-judged (warning-only).
- `scenarios.md` exists, cases bind a fixture (warning-only).
- **New (our discipline): every Family-B Mold's `eval.md` should carry at least one catch-the-planted-flaw property** (warning-only). A referee with no "must catch X" property isn't refereeing.
- Mold dir contains only allowlisted files; `refinements/*.md` carry their frontmatter.
- CLI-command checks apply only once we author CLI notes.
- Pipeline/protocol membership: **relaxed** (per `ARCHITECTURE.md` §3, Molds may stand alone) — no "unused Mold" warning by default.

## Later Work
- Family/role tag vocabulary (then maybe a schema field).
- Whether calibrate-Mold deterministic properties run an actual harness (R/Python) or describe a protocol.
- Referee-independence: does a Family-B eval run the referee as a *separate* cast from the analyzer? (See `REFEREE_LOOP.md` §8.)
- Full cast execution/eval harness.
