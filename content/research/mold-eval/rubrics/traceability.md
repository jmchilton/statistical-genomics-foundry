# Traceability — does the content trace to recoverable sources?

The standing-metric form of the `/ingest-bioskill` recoverability probe: distills a
`comparison.md` into a grade. It asks, per load-bearing claim, *does this trace to a real,
resolving, ideally open-access source* — vs. a confabulated citation, an invented CLI detail, or a
convention dressed as a citation.

Distinct from **note recoverability** (AGENTS.md: can the skill be rebuilt from *our captured
notes*?). That is the upstream enabler — a claim is only Traceable-with-citation if some
recoverable source carries it. This axis grades the **skill's claims against the literature**;
note recoverability grades **our notes against the skill's needs**.

## Scored dimensions (the layers a probe decomposes)

| Dimension | Earns credit when | Evidence source |
|---|---|---|
| Validity axis | the cardinal sin the referee guards traces to a clean, ideally-OA primary | `comparison.md` |
| Doer procedure spine | the method choices trace to method-*establishing* papers, not fluent invention | `comparison.md` (blind-doer diff) |
| Defaults / thresholds | numbers trace to a primary that *states them* (not convention-mislabeled) | `comparison.md` |
| Citations resolve | every cited paper actually exists at the given locus | per-citation check |
| CLI / mechanism correct | commands run; flags exist; tools wired as the primary describes | tool README/man `[verify]` |
| Sources open-access | the load-bearing primaries are reachable without a paywall | source access check |

## Bands

- **A** — validity axis and procedure spine both trace to resolving, OA primaries; thresholds are
  either sourced or honestly labeled convention; no confabulated citation or CLI detail survives.
- **B** — validity axis traces cleanly; a few thresholds are convention-mislabeled or one primary
  is paywalled, but nothing is *confabulated*.
- **C** — mix of traceable and invented: real citations sit beside ≥1 that doesn't resolve, or ≥1
  CLI flag that doesn't exist — indistinguishable to a reader without per-claim checking.
- **D** — the validity axis itself does not trace; load-bearing claims rest on invented sources.
- **F** — pervasive confabulation; the skill is fluent invention with citation-shaped decoration.

## Assessments

_No skills assessed yet._

## Open calibration questions

1. One confabulated *load-bearing* citation → hard cap at C? Or weight by how central the claim is?
2. Convention honestly self-labeled (credit) vs convention dressed as citation (penalty) — how many
   band steps apart?
3. Does a paywalled-but-real primary (traceable, not reachable) score with an OA one, or half-step
   below? Traceability and open-access are arguably two sub-axes.
