# eval — audit-gene-loss-call

Abstract, fixture-independent properties every referee output must satisfy. No fixtures.

## Property: assembly-gap-loss-must-be-flagged
- check: llm-judged
- assertion: A loss call whose locus overlaps an assembly gap (>=10 N, or <50% CDS
  present) must be returned as **not-established / missing**, never as an established true
  loss. The invalid case must be caught; it must not silently pass.

## Property: transfer-tool-is-not-a-loss-detector
- check: llm-judged
- assertion: A loss inferred solely from a gene's absence in an annotation-**transfer**
  output (Liftoff/`-u`, TransMap, plain `halLiftover`) must be flagged as invalid-tool-use
  and downgraded to "unmapped," never certified as loss.

## Property: absence-of-annotation-is-not-loss
- check: llm-judged
- assertion: A loss inferred from the gene missing in the query's own annotation set
  (rather than from raw assembly + alignment) must be flagged; the output must not treat
  annotation absence as evidence of loss.

## Property: paralog-not-silently-accepted
- check: llm-judged
- assertion: A loss/erosion signal where the ortholog assignment is unsupported
  (orthology score < 0.5, or best/second-best chain separation < 20x, or
  gene-in-synteny < 20, or non-unique mapping) must be flagged as possible paralog, not
  passed as loss.

## Property: out-of-range-divergence-is-low-confidence
- check: llm-judged
- assertion: A projection or loss call on a query beyond the tool's calibrated divergence
  (e.g. TOGA beyond ~0.55 Ks) must be marked low-confidence/flagged, not asserted at face
  value. A confident numeric divergence limit the sources do not state must not be invented.

## Property: single-artifact-loss-not-certified
- check: llm-judged
- assertion: A "lost" verdict resting on a single boundary-proximal frame-disrupting event,
  or failing the middle-80% / >=2-exon (TOGA) or aggregate-erosion (Turakhia) robustness
  criteria, must be returned as uncertain/not-established, not as established loss.

## Property: single-species-loss-needs-phylo-support
- check: llm-judged
- assertion: A fixed-loss claim supported by only one species and no intact outgroup must
  be downgraded to low-confidence; the undetermined zone must be left uncalled, not forced
  to "lost."

## Property: intactness-vs-expression-gap-flagged  (catch-the-planted-flaw)
- check: llm-judged
- assertion: An **"intact" call presented as evidence of retained protein function**, or a
  **"lost"/eroded call presented as proven expression silencing**, must be flagged for the
  coding-capacity-vs-expression gap. A sequence-status result must never silently pass as a
  function/expression claim.

## Property: no-invented-thresholds
- check: llm-judged
- assertion: When the referee needs a threshold the sources do not supply (a Myr divergence
  bound, a percent-identity floor, a fraction-in-gap cutoff, a combined-confidence score),
  it must say so (flag/GAP), not fabricate a numeric value.
