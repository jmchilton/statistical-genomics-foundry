# Guidance — Wang 2012 (MCScanX)

Attention-directing questions (ask for what the source states; do not confirm our claims):

1. Does the paper state DEFAULT VALUES for the collinearity parameters? Give each verbatim:
   MATCH_SCORE (`-k`), MATCH_SIZE / minimum #anchors per block (`-s`), GAP_PENALTY,
   MAX_GAPS (`-m`), E_VALUE (`-e`), OVERLAP_WINDOW / tandem window (`-w`). Record any it omits.
2. What is the EXACT required input? Quote the `.gff` column layout — is it the 4-column
   `species_chr  gene_id  start  end` (tab-delimited, species prefix on chr)? And the `.blast`
   expectation (BLAST/DIAMOND `-outfmt 6`, all-vs-all incl. self)? Reproduce format verbatim.
3. Does the paper describe the dynamic-programming collinearity scoring (score function, how gaps
   are penalized, e-value assigned per block)? Quote the `.collinearity` block header format if given
   (e.g. `## Alignment N: score= e_value= N=`).
4. Does the paper QUANTIFY repeat/TE-driven false collinearity — any "~100x", fold, or numeric
   statement that unmasked repeats inflate false anchor pairs? Quote it, or record ABSENT.
5. How are TANDEM duplicates detected and collapsed? What is the default gene-distance window?
   Does `-w` control it? Quote the rule.
6. Does the paper tie block size / `-s` to micro- vs macro-synteny, or give an anchor-count
   threshold for "significant" collinearity? Quote any numbers.
7. How does the toolkit CLASSIFY genes (singleton / dispersed / proximal / tandem / WGD-segmental)?
   Name the classifier program and categories verbatim.
8. What BLAST e-value does it recommend for input (1e-5 / 1e-10)? Is that in-paper or left to user?
9. What companion programs ship with it (duplicate_gene_classifier, MCScanX-transposed, etc.)?

Must-extract functional strings: default `-s -m -k -e -w` values; the 4-column `.gff` format;
`.blast` outfmt-6 requirement; parameter names MATCH_SCORE/MATCH_SIZE/GAP_PENALTY/MAX_GAPS/E_VALUE;
`.collinearity` header string; classifier category names.

Version pin: note the software version described (repo `wyp1125/MCScanX`); skill pins "1.0+ (2020 commit)".
License: NAR is open-access (CC BY-NC / CC BY per article) — short load-bearing verbatim quotes
permitted; confirm the article's license line and state which mode you used.
