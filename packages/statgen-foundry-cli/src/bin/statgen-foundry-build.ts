#!/usr/bin/env tsx
// This Foundry's casting binary.
//
// Almost all of it is `@galaxy-foundry/cast/command`: the flags, the four endings a run can
// have, and the exit code each deserves are the same wherever casting happens, and were a
// second copy of the parent Foundry's argument parser until they moved. What is left below is
// only what this instance knows — where its notes are, what its kinds are called, and which
// modes it admits.

import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { loadCastReferenceContract } from '@galaxy-foundry/cast';
import { castCommand, parseCastArgs } from '@galaxy-foundry/cast/command';
import { SUPPORTED_MODES } from 'statistical-genomics-foundry-site/lib/reference-contract';

import { readCorpus } from '../corpus.js';
import { kindLabels, statgenHooks } from '../hooks.js';

// No subcommand: this binary only casts. The parent Foundry's `foundry-build` dispatches several,
// so its usage line carries a `cast` verb. Carrying one here named an argument nothing reads —
// `pnpm cast <mold>` sent `cast` through as a second positional, so the command never ran.
const USAGE = 'pnpm cast';
const CONTRACT = 'reference_contract.yml';
const NARROW = { modes: SUPPORTED_MODES } as const;

export async function main(argv = process.argv.slice(2)): Promise<void> {
  // The kind labels a cast writes into its reference rows come from the contract, and the hooks
  // that use them are a value `castCommand` is handed rather than something it builds — so the
  // contract is read here too. Both reads pass the same narrowing, which is what keeps a second
  // read from becoming a second answer; a mismatch would fail in `castCommand`, not silently.
  let labels: ReadonlyMap<string, string> = new Map();
  try {
    const args = parseCastArgs(argv, { usage: USAGE, defaultTarget: 'claude' });
    const repoRoot = path.resolve(args.root ?? '.');
    const contract = loadCastReferenceContract(path.join(repoRoot, CONTRACT), { narrow: NARROW });
    labels = kindLabels(contract.contract);
  } catch {
    // Bad flags or a bad contract both reach `castCommand` next, which re-reads the same argv
    // and the same file and reports either one properly. Reporting here as well would print the
    // usage line twice; falling through with no labels never reaches a cast.
  }

  await castCommand(argv, {
    usage: USAGE,
    defaultTarget: 'claude',
    contractPath: CONTRACT,
    narrow: NARROW,
    hooks: statgenHooks(labels),
    corpus: readCorpus,
  });
}

// Only when this file IS the command. check-casts.ts imports `main` to run one Mold at a time,
// and a bare call here would fire on that import with the wrong argv.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
