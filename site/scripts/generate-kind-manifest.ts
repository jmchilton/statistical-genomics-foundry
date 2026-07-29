// Regenerate the kind manifest — site/src/types/kinds.generated.json.
//
// Usage (from site/):
//   npm run kinds          # write
//   npm run check:kinds    # exit non-zero if the committed file is stale
//
// The manifest is the machine-readable answer to "what note kinds does this Foundry define,
// and what metadata does each require". Its `fields` are derived from the zod shapes, so the
// file cannot drift from the schema — only from the schema's last regeneration, which is what
// --check catches in CI.
//
// It is committed rather than built on demand because its consumer is another repository: the
// foundry-pattern site renders both instances' manifests side by side as a kind catalog, and
// it must be able to read them from a checkout without installing either instance's toolchain.

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { loadKindDocs } from '@galaxy-foundry/kind-schema/docs';

import { buildKindManifest } from '../src/lib/kind-manifest';
import { KINDS } from '../src/types/index';

// Relative, not resolved: it is the directory `loadKindDocs` names in its error, and this
// script only ever runs from site/ — the npm scripts pass a cwd-relative path to vite-node, so
// there is no invocation where an absolute base would read better.
const TYPES_DIR = 'src/types';
const OUTPUT = path.join(TYPES_DIR, 'kinds.generated.json');
const INSTANCE = 'statistical-genomics-foundry';

/**
 * Read each kind's `kind.md`, or say which one is missing and stop.
 *
 * The READING is not ours — it ships in @galaxy-foundry/kind-schema, because the other instance
 * wrote the same loader beside the same manifest call. What stays here is the decision to exit:
 * the package throws, deliberately, so a library never takes a command's exit for it.
 */
function loadDocs(): Record<string, string> {
  try {
    return loadKindDocs(KINDS, TYPES_DIR);
  } catch (e) {
    console.error((e as Error).message);
    process.exit(1);
  }
}

const flags = process.argv.slice(2);
// An unrecognized flag is an error, not a no-op: `--chekc` must not silently fall through to
// the write branch and overwrite the file the caller asked us to check.
const unknown = flags.filter((f) => f !== '--check');
if (unknown.length) {
  console.error(`Usage: vite-node scripts/generate-kind-manifest.ts [--check]`);
  process.exit(2);
}

const rendered = `${JSON.stringify(buildKindManifest(INSTANCE, loadDocs()), null, 2)}\n`;
const relative = path.relative(process.cwd(), OUTPUT);

if (flags.includes('--check')) {
  const current = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf-8') : '';
  if (current !== rendered) {
    console.error(`${relative} is stale — run \`npm run kinds\` and commit the result.`);
    process.exit(1);
  }
  console.log(`${relative} is up to date.`);
} else {
  fs.writeFileSync(OUTPUT, rendered);
  console.log(`Wrote ${relative}.`);
}
