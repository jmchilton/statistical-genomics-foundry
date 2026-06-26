# The Referee Loop

> **Net-new doc** (no parent equivalent — this is the project's defining architecture). The parent Foundry has an `author → validate → fix` loop gated by a deterministic CLI; this generalizes it into `analyze → referee → revise` gated by an empirical, Mold-borne referee. This is where the principle **Doing Never Self-Certifies** (`GUIDING_PRINCIPLES.md`) becomes structure.
>
> Status: design sketch. Open decisions are flagged inline and collected at the end. Nothing here is implemented.

## 1. The problem it solves

An LLM doing statistical genomics is the only judge in its own loop. It produces a result, narrates why the result is sound, and stops. When the method is invalid — double-dipped, confounded, assumption-violating, or outright invented — the narration is exactly as fluent as when the method is sound. Self-consistency is not validity. The loop has no external check, so nothing catches the failure.

The fix is not "make the model reason harder about validity" — reasoning is what failed. The fix is **structural**: separate *doing* from *refereeing*, and forbid doing from certifying itself.

## 2. The loop

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
- **REVISE** — on a fail, the analysis is sent back with the referee's specific finding. Bounded (§5).

## 3. The gate obligation

> **A Family-A protocol may not terminate in self-certification. It must hand off to a Family-B referee whose verdict gates certification.**

This is the one invariant the whole project is built to enforce. It is the precise structural answer to the motivating failure: the agent that invented a method, blessed it, and reported results had *no gate* — doing and certifying were the same step.

Encoding (open — §6): most likely a protocol-level convention plus a `[gate]`-style phase (borrowing the parent's open phase-kind set), possibly validator-checked ("every `analyze` protocol resolves to a terminal referee phase"). It is encoded at the **protocol/pipeline altitude, not as a property on a Mold** — deliberately reusing the parent's validation-loop abstraction rather than inventing a Mold-type axis (see `ARCHITECTURE.md` §5).

## 4. What makes our referee distinct (the two-novelty summary)

The referee loop has close prior art; our two differentiators are precise (see `POSITIONING.md`):

- **The referee node is a Mold, not infrastructure.** *vs. the parent Foundry.* Galaxy's gate is `gxwf` — a deterministic CLI that parses. No CLI ships for "is this statistical method valid," so our referee is *authored knowledge cast into a skill* — and partly *constructs* its own check (the calibrate role). The gate becomes a deliverable.
- **The referee judges method validity, not a hypothesis.** *vs. POPPER.* POPPER referees a hypothesis-against-data and controls error over the *falsification decision*, while assuming each experiment yields a *valid p-value* (its Assumption 1). Our referee judges the layer POPPER trusts as input: is the method producing that p-value itself valid — assumptions met, no double-dipping, named method real and appropriate, error rate actually controlled? We sit beneath the p-value.

## 5. The referee's two sub-roles

The REFEREE box is not monolithic. From `MOLDS.md`, Family B splits in two, and the loop uses them differently:

- **Critique** — *reason about* validity against known invalidity patterns (`audit-method-validity`, `review-experimental-design`, `multiple-testing-strategy`). Fast, catches the named failures (double-dipping, confounding, naive correction). Risk: it is itself model reasoning, so it is necessary but not sufficient.
- **Calibrate** — *construct and run* an empirical check (`derive-null-and-calibration`, `design-simulation-study`, `power-and-sample-size`). Slower, but it is the *external* verdict — permutation under the null, simulation against known truth, calibration of the test statistic. This is the part that is not self-certification.

The strong form of the gate requires **at least one calibrate pass**, not critique alone — because critique is reasoning, and reasoning is what we don't trust. Critique narrows what to calibrate; calibrate delivers the verdict. (Open: is critique-only ever sufficient for low-stakes analyses? §6.)

## 6. Convergence and termination

`REVISE` must terminate. Borrowing two ideas:
- **Bounded, decreasing, escalating** (from the parent's topology-repair convergence): each revise cycle must reduce a countable set of open validity findings; under a hard cap, the loop escalates to a human rather than spinning. A referee that keeps finding new fatal flaws is itself a signal ("this analysis is not salvageable; escalate").
- **Sequential evidence with error control** (from POPPER's mechanism): where the referee accumulates empirical evidence across calibrate passes, aggregate it with a sequential test (e-values / Type-I control) so repeated checking doesn't itself inflate error. *Open decision (§ARCHITECTURE.md §5): build on POPPER's framework vs. roll our own.*

Termination states: **CERTIFY** (referee passed, provenance records which checks ran), **REVISE** (bounded retry with a specific finding), **ESCALATE** (cap hit, or an unfixable finding like batch aliased with condition → hand to a human with the finding).

## 7. Worked sketch (illustrative — not a spec)

A user asks an agent to find differentially expressed genes between two conditions, but the conditions are confounded with sequencing batch.

1. **ANALYZE** — `map-question-to-established-method` picks DESeq2 (established, appropriate). `run-analysis-reproducibly` produces results + a method description.
2. **REFEREE / critique** — `review-experimental-design` + `assess-batch-effects-and-confounding` detect that batch is *aliased* with condition. Mechanical: the design matrix is rank-deficient for separating the two.
3. **Verdict: FAIL → ESCALATE.** This is unfixable by revision (no analysis can separate aliased factors). The referee returns the finding to the human rather than letting the agent "correct for batch" and proceed — which is exactly the plausible-but-invalid move the loop exists to stop.

Contrast the failure mode without the loop: the agent corrects for batch, gets a clean-looking result, narrates it confidently, certifies. No gate, no catch.

## 8. Open decisions
- **Gate mechanism**: `[gate]` phase vs protocol convention vs validator-enforced invariant.
- **Strong vs weak gate**: always require a calibrate pass, or allow critique-only for low-stakes work?
- **Sequential-error math**: adopt POPPER's e-value framework or independent.
- **Where revision lives**: does the loop re-enter ANALYZE (re-run the method) or a narrower repair (adjust one choice)? (Parallels the parent's draft-vs-topology-repair distinction.)
- **Referee independence**: is the referee a *separate* cast skill / agent instance from the analyzer (stronger non-self-certification), or the same agent in a different role? (Analyst-Inspector's two-agent design is the relevant prior art for "separate is stronger.")
