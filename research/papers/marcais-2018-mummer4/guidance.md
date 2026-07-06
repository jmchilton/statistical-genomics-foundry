# Guidance — Marçais et al. 2018, MUMmer4 (PLoS Comput Biol 14:e1005944)

License: PLoS = CC BY → short verbatim load-bearing quotes ALLOWED.

## Direct the summarizer's attention to:
- nucmer procedure: maximal-exact-match anchoring → clustering → gapped extension; capture the
  stage ordering and the delta output format name.
- Identity range: does the paper state a minimum sequence identity at which nucmer is reliable,
  or a range it targets? Quote it. (The skill attributes ">=70% identity" to THIS paper — find
  the actual stated range or record that no 70% floor appears here; likely an over-claim.)
- --maxmatch vs --mum vs --mumreference: what does each do re: repeats/uniqueness? Capture.
- Any speed/identity tradeoff statement (fast at high identity, slow/less sensitive at low).

## Must-capture verbatim (CC BY, short quotes ok):
- Any identity-range / minimum-identity statement (or its absence). nucmer anchor-mode
  definitions. delta format name.

## Version-pinning: MUMmer 4.0.0+ (skill pins 4.0.0+).
