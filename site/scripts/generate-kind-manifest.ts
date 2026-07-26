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

import { buildKindManifest } from '../src/lib/kind-manifest';

const TYPES_DIR = path.resolve('src/types');
const OUTPUT = path.join(TYPES_DIR, 'kinds.generated.json');
const INSTANCE = 'statistical-genomics-foundry';

/** kind name -> kind.md body, read from the directories the barrel enumerates. */
function loadDocs(): Record<string, string> {
  const docs: Record<string, string> = {};
  for (const entry of fs.readdirSync(TYPES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    docs[entry.name] = fs.readFileSync(path.join(TYPES_DIR, entry.name, 'kind.md'), 'utf-8').trim();
  }
  return docs;
}

const rendered = `${JSON.stringify(buildKindManifest(INSTANCE, loadDocs()), null, 2)}\n`;
const relative = path.relative(process.cwd(), OUTPUT);

if (process.argv.includes('--check')) {
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
