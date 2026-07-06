# Guidance — Page 2015 (Roary)

Citation: Page AJ et al. 2015. "Roary: rapid large-scale prokaryote pan genome analysis."
*Bioinformatics* 31(22):3691–3693. DOI 10.1093/bioinformatics/btv421.

License posture: **verify** — Roary paper is open access, commonly CC BY. Confirm the license line;
if CC BY, verbatim allowed; else own-words + functional strings.

Questions (direct attention, do not confirm conclusions):

1. What is Roary's DEFAULT protein BLAST(P) identity threshold for clustering? Capture the exact
   number and flag verbatim (commonly cited as 95% via `-i`).
2. What presence threshold does Roary use to define "core" vs "soft-core" vs "shell" vs "cloud"?
   Capture the exact percent bands verbatim (e.g. core ≥99%, soft-core 95–99%, shell 15–95%,
   cloud <15%). This is the candidate origin of the %-band convention.
3. Does Roary claim any handling of annotation errors, or does it assume clean, consistent
   annotation? Quote its stated assumption (relevant to the later Panaroo-vs-Roary inflation
   argument — capture only what THIS paper states about its own assumptions).
4. What input does Roary expect (GFF3 from Prokka)? Capture the exact expected input format.
5. Does the paper state any scaling numbers (genomes/hour, memory)? Capture verbatim.

Must-extract functional strings: default identity threshold + `-i` flag; the exact core/soft-core/
shell/cloud percent bands + their labels; input format; any stated annotation-consistency assumption.
