import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';

// The typed-reference vocabulary lives at the repo root (../reference_contract.yml),
// outside the Astro project, so the schema grammar and any future validator share one
// source. Adapted from galaxyproject/foundry's reference_contract.yml.
const CONTRACT_FILE = path.resolve('../reference_contract.yml');

interface Vocab {
  version: number;
  kinds: Record<string, unknown>;
  used_at: Record<string, unknown>;
  load: Record<string, unknown>;
  modes: Record<string, unknown>;
  evidence: Record<string, unknown>;
}

let cached: Vocab | undefined;

function load(): Vocab {
  if (!cached) cached = yaml.load(fs.readFileSync(CONTRACT_FILE, 'utf-8')) as Vocab;
  return cached;
}

const keys = (o: Record<string, unknown>): [string, ...string[]] => {
  const k = Object.keys(o);
  if (k.length === 0) throw new Error('reference_contract.yml: empty vocabulary block');
  return k as [string, ...string[]];
};

export const referenceKinds = () => keys(load().kinds);
export const referenceUsedAt = () => keys(load().used_at);
export const referenceLoad = () => keys(load().load);
export const referenceModes = () => keys(load().modes);
export const referenceEvidence = () => keys(load().evidence);
