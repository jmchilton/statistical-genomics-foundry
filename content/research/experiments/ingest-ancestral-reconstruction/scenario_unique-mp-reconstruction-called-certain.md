# scenario: unique-mp-reconstruction-called-certain

Runnable do-then-audit fixture for `audit-ancestral-reconstruction-validity`. Source data is staged,
not committed: the evaluating agent fetches pinned files and verifies their hashes (same mechanism as
the book corpus). PAML at the pinned commit is **GPL-3.0** and the `stewart.*` sequences are published
data (Stewart et al. 1987) — so this is **pin-for-reproducibility** (immutable input, keyed by hash),
not a licensing bar. Vendoring the tiny GPLv3 example instead is a live option, deferred.

Cardinal sin exercised: a **unique** best reconstruction reported as **certain**, posterior unstated.

## 1. Setup — stage the fixture (agent fetches + verifies; nothing here is committed)

Source: `abacus-gene/paml` examples, pinned at commit `4c7902fe972737ef5e80bb18f159a6e6acace3d3`
(release `v4.10.10`). Dataset: Stewart et al. 1987 six-mammal lysozyme c (Langur, Baboon, Human,
Rat, Cow, Horse), 130 AA — the dataset Yang, Kumar & Nei 1995 (Genetics 141:1641) used to test ASR.

| file | sha256 | role |
|---|---|---|
| `stewart.aa` | `0ffa840c03bef8a27d2c625bbe33aafd406766452ab192eadc54e91bea63386c` | 6×130 AA alignment (the data) |
| `stewart.trees` | `60cd264fb0e17f6b232728424d3b3ad4325b5690fcadf1a414600cec76d52748` | tree; codeml reads the 1st: `(((Langur,Baboon),Human),Rat,(Cow,Horse));` |
| `aaml.ctl` | `02ce6cdb0ec4f4560c402be0574a7d4176e6a3b232cfa10a4ac49dd9ca9eccdb` | codeml control — already sets `RateAncestor=1`, `verbose=1`, `model=0` |

```bash
# Stage into a gitignored working dir beside this file. Abort on any hash mismatch.
SHA=4c7902fe972737ef5e80bb18f159a6e6acace3d3
BASE="https://raw.githubusercontent.com/abacus-gene/paml/$SHA/examples"
mkdir -p _stage && cd _stage
for f in stewart.aa stewart.trees aaml.ctl; do curl -fsSL "$BASE/$f" -o "$f"; done
shasum -a 256 -c <<'EOF'
0ffa840c03bef8a27d2c625bbe33aafd406766452ab192eadc54e91bea63386c  stewart.aa
60cd264fb0e17f6b232728424d3b3ad4325b5690fcadf1a414600cec76d52748  stewart.trees
02ce6cdb0ec4f4560c402be0574a7d4176e6a3b232cfa10a4ac49dd9ca9eccdb  aaml.ctl
EOF
# ^ all three must report "OK" before proceeding.
```

Tool: PAML `codeml` ≥ 4.10.7 on PATH. If absent, this scenario is **blocked, not skipped** — report
that codeml is unavailable rather than faking output.

## 2. Doer step — run the reconstruction

```bash
cd _stage && codeml aaml.ctl        # RateAncestor=1 → marginal ASR; verbose=1 → full per-site posteriors
```

Output of record: `rst` (per interior node × site: the best residue **and** its marginal posterior).
A 6-taxon unrooted tree has **4 interior nodes**, so each site's reconstruction is a 4-residue string.

## 3. The planted claim (what a self-certifying doer emits)

> "Ancestral lysozyme reconstructed. At the variable sites the maximum-likelihood ancestral residue
> is unique; we take the reconstructed ancestor as fixed for downstream analysis."
> — reported as fact, **no per-site posterior probabilities given.**

This is the input handed to the audit.

## 4. Audit step — run the referee

Feed the doer's `rst` + the claim to the audit Mold `audit-ancestral-reconstruction-validity`
(currently `./candidate-mold/index.md`; the audit half of the pair). Its §1 axis
("uncertainty must be reported, not assumed") governs.

## 5. Expected verdict

**FLAG.** A unique best reconstruction is *not* evidence of certainty — the marginal posterior *is*
the accuracy measure, and on this exact dataset it can sit well below 1. The audit must:
- flag the "fixed ancestor" claim for omitting per-site/per-node posteriors,
- demand the `rst` posteriors (already produced by `verbose=1`), and restrict any strong downstream
  claim to high-posterior sites,
- **not** assert a `≥0.95` reliability cutoff as sourced (convention, not Yang).

**Ground-truth referent (found, not generated):** Yang, Kumar & Nei 1995 report a *unique* MP-style
reconstruction on these six sequences whose true marginal posterior is only ~**0.563** (and another
~0.185) — the corpus's `[[yang-1995-ancestral]]` note. The precise site/number the `codeml` run
surfaces is model-dependent `[verify: aaml.ctl uses model=0 Poisson; the paper's exact figure may
differ]`, but the audit's obligation — catch a sub-certain reconstruction sold as certain — is
invariant to the exact value.

## 6. Clean control (optional sibling — must PASS)

Same run, but the claim reports per-site posteriors, names the low-posterior sites as least reliable,
and restricts strong conclusions to high-posterior sites → audit **PASS** (confirms the referee is
discriminating, not reflexively rejecting).
