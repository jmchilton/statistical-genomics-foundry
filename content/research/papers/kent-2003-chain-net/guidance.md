# Guidance — Kent et al. 2003, chains & nets (PNAS 100:11484)

License: PNAS, freely readable (>=6 mo) but all-rights-reserved → own-words; keep tool/format
names and any numeric thresholds verbatim as functional strings.

## Direct the summarizer's attention to:
- The chain/net ALGORITHM ordering: how are local alignments assembled into chains (co-linear),
  then chains selected into a net (one best per region)? Capture the definitions of "chain" and
  "net" in the paper's own terms.
- Reference asymmetry: does the paper state the net is built RELATIVE TO one reference/target
  genome (i.e. target-net vs query-net are different)? Quote any statement that makes the method
  reference-anchored / directional. (Backs the reference-bias validity axis.)
- Does the paper specify any minimum chain length or score threshold? (The skill cites "5000 bp"
  as UCSC convention — check whether ANY such number appears here; if not, record its absence so
  we keep 5000 bp labeled convention, not cited to Kent.)
- Repeat handling: does the paper discuss masking / repeat-driven spurious chains?

## Must-capture verbatim:
- Definitions of chain and net; any statement of reference-directionality; any numeric chain
  score/length threshold (or confirmed absence of the 5000 bp figure).
