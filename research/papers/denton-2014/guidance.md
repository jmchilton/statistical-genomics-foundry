# Guidance — denton-2014 (paper)

> Attention-directing. THE eukaryotic annotation-error primary: draft/fragmented genome assemblies
> produce extensive error in inferred gene NUMBER — the eukaryotic analog of the prokaryotic
> Panaroo finding, and the source that grounds "assembly fragmentation → false gene-family
> contractions" and the completeness-filtering rationale. A Hahn-lab paper (same group as CAFE /
> Hahn-2005 birth-death), so watch for explicit statements about downstream gene-family / gain-loss
> inference. PLoS Comput Biol = CC BY → short verbatim load-bearing quotes ARE allowed (with location).

## Must capture
- The study design: draft assemblies compared against HIGHER-QUALITY versions of the SAME genome.
  Capture the exact species/assemblies used (chicken, chimpanzee), the sequencing technologies, and
  what "high-quality reference" meant. This is what makes the error measurable rather than inferred.
- The headline magnitude: what FRACTION of genes have the wrong number of copies in draft assemblies?
  Capture the exact numbers ("more than half" / percentages), per assembly if the paper breaks it out.
- BOTH error DIRECTIONS — this is load-bearing for the referee use:
  - **Under-counting / missing genes** (genes absent from a fragmented/incomplete assembly →
    apparent gene-family CONTRACTION / loss). Capture the mechanism and any numbers.
  - **Over-counting / gene fragmentation** (one real gene split across contigs into multiple partial
    gene models → apparent DUPLICATION / expansion). Capture the mechanism and any numbers.
  Capture which direction dominates and under what conditions (assembly contiguity / N50 / coverage).
- The dependence of error on ASSEMBLY QUALITY: does error scale with N50 / contiguity / completeness?
  Does the paper name or use a completeness metric (e.g. CEGMA / core-gene completeness)? Capture any
  quantitative assembly-quality → gene-count-error relationship. (This is the rationale behind a
  completeness filter like BUSCO≥90%, though the paper predates BUSCO — capture what it actually uses.)
- DOWNSTREAM-INFERENCE warning (the referee-relevant payoff): does the paper explicitly state that
  this gene-number error corrupts comparative / evolutionary inference — gene-family size evolution,
  lineage-specific expansions/contractions, gene gain/loss rates, birth-death (CAFE) analyses? Quote
  any such statement. If the paper only shows the error and does NOT connect it to gene-family
  evolution inference, say so explicitly (don't infer the connection for it).
- Any recommendation the paper makes: use high-quality assemblies, error-aware models, filtering,
  validation. Capture the paper's OWN prescription and any threshold it states.

## Must-quote (CC BY → short verbatim allowed, with section/figure location)
- The headline sentence quantifying how many genes have the wrong copy number in draft assemblies.
- Any explicit statement that this error affects gene-family-evolution / gene-gain-loss / duplication
  analyses (or the absence of such a statement).

## Access / version notes
- PLoS Computational Biology 10(12):e1003998, 2014; DOI 10.1371/journal.pcbi.1003998; PMC4256071.
  Fully OA, CC BY. Authors: Denton, Lugo-Martinez, Tucker, Schrider, Warren, Hahn.
- Do not import facts from Panaroo or CAFE — work only from THIS paper. Preserve the paper's own
  numbers and species; do not generalize beyond what it tested (it is eukaryote/vertebrate-scoped).
