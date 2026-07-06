# Guidance — Gautreau 2020 (PPanGGOLiN)

Citation: Gautreau G et al. 2020. "PPanGGOLiN: Depicting microbial diversity via a partitioned
pangenome graph." *PLoS Comput Biol* 16(3):e1007732. DOI 10.1371/journal.pcbi.1007732. Open URL:
https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1007732.

License posture: CC BY 4.0 → **verbatim load-bearing quotes permitted**.

Questions (direct attention, do not confirm conclusions):

1. What statistical model does PPanGGOLiN use to PARTITION gene families into classes? Quote the
   method sentence verbatim. (We need to confirm/deny a claim of an "HMM partition" — is it a
   hidden Markov model, a Markov random field, an expectation-maximization mixture, or something
   else? Capture the exact model name.)
2. What class NAMES does PPanGGOLiN assign (persistent / shell / cloud)? Quote the definitions of
   each.
3. CRITICAL: does PPanGGOLiN define classes by a fixed percent-of-genomes band (e.g. shell =
   5–95% or 15–95%)? Or is class membership determined statistically WITHOUT a fixed %-threshold?
   Quote the relevant sentence. (A claim under test asserts "shell 5–95% / coverage 80% default" —
   we need to know if PPanGGOLiN actually uses such bands or whether that is a Tettelin/Roary-style
   rule mis-attributed to PPanGGOLiN.)
4. Are there default numeric parameters for clustering (sequence identity, coverage)? Capture exact
   defaults and their flag/parameter names verbatim (e.g. `--identity`, `--coverage`, and defaults).
5. What input does the `ppanggolin all` / `ppanggolin workflow` subcommand expect (annotation TSV
   vs FASTA list)? Capture the exact expected input format string.
6. Does the paper claim PPanGGOLiN scales to more genomes than Roary/Panaroo? Quote any scaling
   claim with numbers.

Must-extract functional strings: the partition-model name; the persistent/shell/cloud definitions;
whether fixed %-bands are used; clustering default params + flag names; subcommand input format.

Version pin: skill pins PPanGGOLiN 2.2.0+ — record the version the paper describes.
