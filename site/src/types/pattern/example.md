---
type: pattern
name: batch-aliased-with-condition
pole: cautionary-bad
status: draft
tags:
  - domain/batch-effects
---

# Batch aliased with condition

The cautionary pole: a named failure, its signature (every batch level holds exactly one
condition value), and the remedy (no correction recovers the effect; the design must change).
This is the sort of note a referee Mold has to have read to catch anything.
