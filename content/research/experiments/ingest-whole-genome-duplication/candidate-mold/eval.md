# eval — audit-wgd-inference

Abstract, fixture-independent properties every referee output must satisfy. No fixtures named.
Family-B guardrails are framed as **catch-the-planted-flaw**: the invalid case must be caught or
flagged; it must never silently pass.

## Property: saturation-peak-never-passed
- check: deterministic (comparison) + llm-judged (reasoning)
- assertion: An ancient-WGD claim resting on a Ks peak in the saturation region (species-dependent;
  roughly Ks ≳ 2–2.5, up to ~4–5), with no independent corroboration (rate-adjusted date, syntenic
  depth, external calibration), must be FLAGGED as a possible saturation artifact — never passed.
  The deterministic sub-check: if claimed-peak-Ks exceeds the analysis's own stated saturation
  cutoff, output must flag.

## Property: no-invented-universal-Ks-cutoff
- check: llm-judged
- assertion: The referee must treat the Ks saturation boundary as **species-specific**; it must not
  assert a single universal numeric Ks cutoff as if sourced. Where it lacks a per-species value it
  must say so, not fabricate one. (Anti-invention: the project's own failure mode.)

## Property: uncorrected-cross-lineage-placement-flagged
- check: llm-judged
- assertion: A before/after-speciation or shared/lineage-specific WGD placement built from
  **uncorrected** Ks across differently-evolving lineages must be FLAGGED, with rate correction
  (branch decomposition via outgroup) demanded — never passed as a valid placement.

## Property: paranome-peak-without-anchor-flagged
- check: llm-judged
- assertion: A WGD claim from a raw-paranome Ks peak with no synteny-anchor (anchor-Ks) confirmation
  and no tandem/proximal removal must be FLAGGED as possible small-scale/tandem contamination —
  especially at low Ks. Clearing evidence named: peak persists in the anchor-Ks distribution.

## Property: ploidy-claim-requires-depth
- check: llm-judged
- assertion: A specific-ploidy claim (duplication vs triplication / higher) resting on a single Ks
  peak with no multi-genome syntenic-depth (multiplicity) support must be FLAGGED as under-supported.

## Property: false-tool-identity-caught
- check: deterministic (string/fact match)
- assertion: A stated-but-false method fact must be FLAGGED, not rationalized. Minimal set the
  referee must catch: "wgd v2 uses MCScanX" (it uses i-ADHoRe); a DupGen "segmental" class or
  "tandem=5 / proximal 5–25" windows (DupGen: five modes, tandem=adjacency, proximal `-d` default
  10); a `--cscore` attributed to Tang-2008 MCscan (absent there).

## Property: fade-not-treated-as-absence
- check: llm-judged
- assertion: The referee must not accept "no peak past Ks ~2.5" as evidence of no ancient WGD;
  genuine old WGD peaks fade into the L-shaped SSD background. Absence-of-peak reasoning at high Ks
  must be marked inconclusive, not passed as a negative result.

## Property: expansion-burst-corroboration-is-bounded
- check: llm-judged
- assertion: If a gene-family expansion burst is offered as WGD corroboration, the referee must
  (a) require an assembly/annotation error model when assembly quality is uncertain (raw-count
  bursts are inflated) and (b) note that CAFE per-family p-values are uncorrected for multiple
  testing — i.e. it must not let an uncontrolled expansion signal alone certify a WGD.

## Property: gate-obligation-honored
- check: llm-judged
- assertion: The referee output never self-certifies a WGD by fluent restatement; every PASS is
  conditioned on the axes actually cleared, and every unmet axis produces a named flag with the
  clearing evidence stated.
