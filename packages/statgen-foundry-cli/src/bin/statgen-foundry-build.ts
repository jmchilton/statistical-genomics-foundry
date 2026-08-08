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
import { castCommand, parseCastArgs, type CastCommandSpec } from '@galaxy-foundry/cast/command';
import { SUPPORTED_MODES } from 'statistical-genomics-foundry-site/lib/reference-contract';

import { readCorpus } from '../corpus.js';
import { kindLabels, statgenHooks } from '../hooks.js';

// No subcommand: this binary only casts. The parent Foundry's `foundry-build` dispatches several,
// so its usage line carries a `cast` verb. Carrying one here named an argument nothing reads —
// `pnpm cast <mold>` sent `cast` through as a second positional, so the command never ran.
const USAGE = 'pnpm cast';
const CONTRACT = 'reference_contract.yml';
const NARROW = { modes: SUPPORTED_MODES } as const;

/**
 * What this Foundry contributes to a cast, whether one Mold or all of them.
 *
 * A value rather than something each entry point assembles, because there are two entry points
 * now: this binary casts one Mold, and check-casts.ts sweeps every bundle. The spec is what a
 * Foundry IS, and two copies of it are two chances to disagree about it.
 *
 * The kind labels a cast writes into its reference rows come from the contract, so it is read
 * here as well as inside the caster. Both reads pass the same narrowing, which is what keeps the
 * second one from becoming a second answer; a mismatch fails in the caster rather than silently.
 */
export function statgenSpec(repoRoot: string): CastCommandSpec {
  let labels: ReadonlyMap<string, string> = new Map();
  try {
    const contract = loadCastReferenceContract(path.join(repoRoot, CONTRACT), { narrow: NARROW });
    labels = kindLabels(contract.contract);
  } catch {
    // A bad contract reaches the caster next, which re-reads the same file and reports it
    // properly. Reporting here as well would say it twice; falling through with no labels never
    // reaches a cast.
  }

  return {
    usage: USAGE,
    defaultTarget: 'claude',
    contractPath: CONTRACT,
    narrow: NARROW,
    hooks: statgenHooks(labels),
    corpus: readCorpus,
  };
}

export async function main(argv = process.argv.slice(2)): Promise<void> {
  let repoRoot = process.cwd();
  try {
    repoRoot = path.resolve(parseCastArgs(argv, { usage: USAGE, defaultTarget: 'claude' }).root ?? '.');
  } catch {
    // Bad flags reach `castCommand` next, which re-reads the same argv and prints the usage line
    // once.
  }

  await castCommand(argv, statgenSpec(repoRoot));
}

// Only when this file IS the command. check-casts.ts imports the spec, and a bare call here would
// fire on that import with the wrong argv.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
