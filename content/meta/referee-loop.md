---
type: meta
title: "The Referee Loop"
record_kind: foundation
order: 3
tags:
  - meta
status: reviewed
created: 2026-06-26
revised: 2026-08-02
revision: 2
summary: "How doing and refereeing compose \u2014 critique and calibration gating a result before it is trusted."
---

This record owns the Foundry's defining structure: the `analyze → referee → revise` loop, and the gate obligation that keeps doing from certifying itself. It is where the principle *Doing Never Self-Certifies* ([[guiding-principles]]) becomes architecture.

**Nothing here is implemented.** It is a design sketch; the open decisions are flagged as they arise and collected at the end.

## The problem it solves

An LLM doing statistical genomics is the only judge in its own loop. It produces a result, narrates why the result is sound, and stops. When the method is invalid — double-dipped, confounded, assumption-violating, or outright invented — the narration is exactly as fluent as when the method is sound. Self-consistency is not validity. The loop has no external check, so nothing catches the failure.

The fix is not "make the model reason harder about validity" — reasoning is what failed. The fix is **structural**: separate *doing* from *refereeing*, and forbid doing from certifying itself.

## The loop

```
            ┌─────────────────────────────────────────────┐
            │                                             │
            ▼                                             │
   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
   │   ANALYZE    │────▶│   REFEREE    │────▶│   verdict    │
   │  (Family A)  │     │  (Family B)  │     │              │
   └──────────────┘     └──────────────┘     └──────┬───────┘
                                                     │
                          pass ──────────────────────┼─────▶ CERTIFY
                          fail / revise ─────────────┘  (revise, bounded)
```

- **ANALYZE (Family A)** — frame the question, review the design, select an *established* method, run it. Produces a result *plus the method description the referee will judge*.
- **REFEREE (Family B)** — audit the method's validity and/or construct the empirical check the field trusts. Returns a verdict, not an opinion.
- **The gate** — analysis cannot reach CERTIFY except through a referee pass. This is **the gate obligation**.
- **REVISE** — on a fail, the analysis is sent back with the referee's specific finding, under the bound described below.

## The gate obligation

> **A Family-A protocol may not terminate in self-certification. It must hand off to a Family-B referee whose verdict gates certification.**

This is the one invariant the whole project is built to enforce. It is the precise structural answer to the motivating failure: the agent that invented a method, blessed it, and reported results had *no gate* — doing and certifying were the same step.

How it gets encoded is open: most likely a protocol-level convention plus a `[gate]`-style phase, possibly validator-checked — "every `analyze` protocol resolves to a terminal referee phase." It belongs at the **protocol altitude, not as a property on a Mold**. Putting it on the Mold would make every Mold carry a field about a composition it may never take part in, and Molds stand alone here ([[architecture]]).

## What makes this referee distinct

The referee loop has close prior art; the two differentiators are precise ([[positioning]] holds the evidence):

- **The referee node is a Mold, not infrastructure.** *vs. the parent Foundry.* Galaxy's gate is `gxwf` — a deterministic CLI that parses. No CLI ships for "is this statistical method valid," so our referee is *authored knowledge cast into a skill* — and partly *constructs* its own check (the calibrate role). The gate becomes a deliverable.
- **The referee judges method validity, not a hypothesis.** *vs. POPPER.* POPPER referees a hypothesis-against-data and controls error over the *falsification decision*, while assuming each experiment yields a *valid p-value* (its Assumption 1). Our referee judges the layer POPPER trusts as input: is the method producing that p-value itself valid — assumptions met, no double-dipping, named method real and appropriate, error rate actually controlled? We sit beneath the p-value.

## The referee's two sub-roles

The REFEREE box is not monolithic. Family B splits into the two roles [[molds]] defines, and the loop uses them differently:

- **Critique** — *reason about* validity against known invalidity patterns. Fast, and it catches the named failures: double-dipping, confounding, naive correction. Its risk is that it is itself model reasoning, which makes it necessary but not sufficient. This is the role every authored Mold currently fills.
- **Calibrate** — *construct and run* an empirical check: a permutation under the null, a simulation against known truth, a calibration of the test statistic. Slower, but it is the *external* verdict, and therefore the part that is not self-certification. No Mold has calibration as its whole job yet; [[molds]] tracks it as direction.

The strong form of the gate requires **at least one calibrate pass**, not critique alone — because critique is reasoning, and reasoning is what failed. Critique narrows what to calibrate; calibrate delivers the verdict. Whether critique alone is ever sufficient for low-stakes work is open, and collected below.

## Convergence and termination

`REVISE` must terminate, on two borrowed ideas:

- **Bounded, decreasing, escalating**, from the parent Foundry's topology-repair convergence. Each revise cycle must reduce a countable set of open validity findings, and under a hard cap the loop escalates to a human rather than spinning. A referee that keeps finding new fatal flaws is itself a signal: this analysis is not salvageable.
- **Sequential evidence with error control**, from POPPER's mechanism. Where the referee accumulates empirical evidence across calibrate passes, aggregate it with a sequential test (e-values, Type-I control) so that repeated checking does not itself inflate error. Whether to build on POPPER's framework or roll an independent one is open.

Termination states: **CERTIFY** (referee passed, provenance records which checks ran), **REVISE** (bounded retry with a specific finding), **ESCALATE** (cap hit, or an unfixable finding like batch aliased with condition → hand to a human with the finding).

## Worked sketch

Illustrative, not a spec, and the Molds it names are the intended set rather than the authored one. A user asks an agent to find differentially expressed genes between two conditions, but the conditions are confounded with sequencing batch.

1. **ANALYZE** — a method-selection Mold picks DESeq2, established and appropriate; a reproducible-run Mold produces the results plus the method description the referee will judge.
2. **REFEREE, critique** — a design auditor detects that batch is *aliased* with condition. This part is mechanical: the design matrix is rank-deficient for separating the two.
3. **Verdict: FAIL → ESCALATE.** No revision fixes it, because no analysis can separate aliased factors. The referee returns the finding to the human rather than letting the agent "correct for batch" and proceed — exactly the plausible-but-invalid move the loop exists to stop.

Contrast the failure mode without the loop: the agent corrects for batch, gets a clean-looking result, narrates it confidently, certifies. No gate, no catch.

## Open decisions
- **Gate mechanism**: `[gate]` phase vs protocol convention vs validator-enforced invariant.
- **Strong vs weak gate**: always require a calibrate pass, or allow critique-only for low-stakes work?
- **Sequential-error math**: adopt POPPER's e-value framework or independent.
- **Where revision lives**: does the loop re-enter ANALYZE (re-run the method) or a narrower repair (adjust one choice)? (Parallels the parent's draft-vs-topology-repair distinction.)
- **Referee independence**: is the referee a *separate* cast skill / agent instance from the analyzer (stronger non-self-certification), or the same agent in a different role? (Analyst-Inspector's two-agent design is the relevant prior art for "separate is stronger.")
