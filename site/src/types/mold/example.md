---
type: mold
name: audit-batch-confounding
summary: Check whether a study's batch structure is confounded with the biological condition of interest.
tags:
  - family/b
  - role/critique
references:
  - kind: research
    ref: leek-2010
    used_at: cast-time
    load: upfront
    mode: verbatim
    evidence: corpus-observed
    purpose: Grounds the definition of batch confounding and why it cannot be regressed away.
  - kind: pattern
    ref: batch-aliased-with-condition
    used_at: runtime
    load: on-demand
    mode: verbatim
    evidence: corpus-observed
    trigger: When the design table shows any batch level with a single condition value.
---

# Audit batch confounding

A Family-B (referee) Mold: it critiques rather than produces, and it does not self-certify. The
on-demand reference names the exact condition under which the cast should read it.
