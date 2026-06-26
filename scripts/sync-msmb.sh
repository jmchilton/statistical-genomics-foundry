#!/usr/bin/env bash
# Deterministic sync of Modern Statistics for Modern Biology (MSMB) raw chapters.
# Source: https://www.huber.embl.de/msmb/  (CC BY-NC-SA 2.0 — LICENSES/msmb.LICENSE)
#
# Raw HTML is gitignored: we do NOT redistribute the book. The committed,
# reproducible pin is manifest.tsv (source URLs) + SHA256SUMS (content hashes).
# Foundry notes derived from this work are our own-words summaries.
#
# Usage:
#   scripts/sync-msmb.sh           # fetch + verify against SHA256SUMS (default)
#   scripts/sync-msmb.sh update    # fetch + (re)write SHA256SUMS (repin)
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
base="$root/corpus-import/msmb"
raw="$base/raw"
manifest="$base/manifest.tsv"
sums="$base/SHA256SUMS"
mode="${1:-verify}"
ua="statistical-genomics-foundry corpus sync (non-commercial research)"

sha() { if command -v sha256sum >/dev/null 2>&1; then sha256sum "$@"; else shasum -a 256 "$@"; fi; }

mkdir -p "$raw"

while IFS=$'\t' read -r num url; do
  [[ "${num:-}" =~ ^# ]] && continue
  [[ -z "${num:-}" ]] && continue
  out="$raw/${num}-chap.html"
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
  echo "no SHA256SUMS to verify against — first run? do: scripts/sync-msmb.sh update" >&2
  exit 1
fi
