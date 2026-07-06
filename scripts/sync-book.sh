#!/usr/bin/env bash
# Deterministic sync of a book's raw chapters into its gitignored raw/ staging dir.
# Reads content/research/books/<id>/manifest.tsv (<num><TAB><url>), writes raw/<num>.html,
# and pins SHA256SUMS. We do NOT redistribute source text — raw/ is gitignored; the
# committed pin (manifest.tsv + SHA256SUMS) is the reproducible provenance record.
# Own-words / license-aware summaries derived from the source live beside it as chap<n>/index.md.
#
# Usage:
#   scripts/sync-book.sh <book-id>          # fetch + verify against SHA256SUMS (default)
#   scripts/sync-book.sh <book-id> update   # fetch + (re)write SHA256SUMS (repin)
set -euo pipefail

id="${1:?usage: scripts/sync-book.sh <book-id> [verify|update]}"
mode="${2:-verify}"
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
base="$root/content/research/books/$id"
raw="$base/raw"
manifest="$base/manifest.tsv"
sums="$base/SHA256SUMS"
ua="statistical-genomics-foundry corpus sync (non-commercial research)"

[[ -f "$manifest" ]] || { echo "no manifest: $manifest" >&2; exit 1; }
sha() { if command -v sha256sum >/dev/null 2>&1; then sha256sum "$@"; else shasum -a 256 "$@"; fi; }
mkdir -p "$raw"

while IFS=$'\t' read -r num url; do
  [[ "${num:-}" =~ ^# ]] && continue
  [[ -z "${num:-}" ]] && continue
  out="$raw/${num}.html"
  echo "fetch ch${num} <- ${url}"
  curl -fsSL --max-time 60 -A "$ua" -o "$out" "$url"
done < "$manifest"

cd "$raw"
# shellcheck disable=SC2035
files=$(ls *.html | sort)

if [[ "$mode" == "update" ]]; then
  # shellcheck disable=SC2086
  sha $files > "$sums"
  echo "wrote pin: $sums"
elif [[ -f "$sums" ]]; then
  sha -c "$sums"
  echo "verified against pin: $sums"
else
  echo "no SHA256SUMS to verify against — first run? do: scripts/sync-book.sh $id update" >&2
  exit 1
fi
