# Assessability — is it clear how to assess the skill?

Grades whether a Family-A doer skill ships a **fixture-bound test that drives it**: a small,
unrestricted dataset, broad coverage of the skill's surface, a real `scenarios.md`, and known
ground truth. This is the axis the ingestions most visibly lacked — "they don't have clean/clear
scenarios that drive the skill" is precisely a low Assessability grade.

The outside view of the `scenarios.md` / `eval.md` contract (`docs/MOLD_SPEC.md`): that contract
says *what a good test is*; this rubric says *how close a given skill gets*.

## Scored dimensions

| Dimension | Earns credit when | Evidence source |
|---|---|---|
| Fixture exists | a concrete input the skill can run against is named/stageable | `scenario_*.md` / SKILL.md |
| Small | runs in seconds–minutes on a laptop, not a cluster job | dataset size |
| Unrestricted | license permits pin/stage (OA, CC, published data) — recoverable | dataset LICENSE `[verify]` |
| Coverage | the fixture(s) exercise much of the skill's decision surface, not one path | scenario set vs skill scope |
| Real `scenarios.md` | planted-invalid + clean control, each with an **expected verdict** | `scenarios.md` |
| Ground truth | expected output is a *known* number/verdict, not "looks right" | a cited referent |

The two load-bearing ones are **`scenarios.md` quality** and **ground truth** — a fixture with no
expected verdict tests nothing, and a scenario whose "correct" answer is the model's own opinion is
self-certification wearing a test's clothes.

## Bands

- **A** — small, unrestricted fixture; a `scenarios.md` with ≥1 planted-invalid **and** a clean
  control, each with an expected verdict traced to a **known** ground truth; coverage spans the
  skill's main branches.
- **B** — the above but coverage is narrow (one cardinal sin / one path), or ground truth is
  model-dependent and flagged as such.
- **C** — a fixture exists and runs, but no planted-invalid/clean-control pair, or no expected
  verdict (a demo, not a test).
- **D** — fixture named but not stageable (paywalled/oversized/unspecified), or scenarios are prose
  descriptions of a *class* with no instantiated input.
- **F** — no way to exercise the skill at all.

## Assessments

_No skills assessed yet._

## Open calibration questions

1. Does a clean control alone (no planted-invalid) cap at C, or can a rich control set reach B?
2. How is "coverage" measured against a `mixed` skill with many independent tool paths — fraction
   of branches touched, or of cardinal sins guarded?
3. Should ground-truth that is *itself* from the tool under test (circular) be disallowed, or
   allowed if independently published?
