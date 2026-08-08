#!/usr/bin/env tsx
// The byte-identity gate: re-cast every Mold that has been cast, and fail if anything moved.
//
// This is what makes a committed bundle a claim rather than a snapshot. A cast is a pure
// function of the Mold, the notes it cites and the target, so re-running it must reproduce the
// bytes on disk — and where it does not, either the source changed and the bundle is stale, or
// the caster changed and every bundle is.
//
// The LOOP is no longer here. Sweeping is the same in every Foundry that casts, and writing it
// per instance is how this one ended up printing a `clean` line per Mold while the parent stayed
// silent — neither by choice, both by building the sweep out of N runs of the single-Mold
// command and inheriting its per-run reporting N times. `castSweep` casts each Mold and returns
// what it found; `sweepReport` decides what to say. Silence on success is the shared convention
// now, and this file no longer resets `process.exitCode` between iterations to read a verdict
// out of a global.
//
// WHAT to sweep is still ours, which is the half that legitimately differs. Only Molds with a
// bundle are checked. An uncast Mold is not drift: this corpus casts what it has cast on
// purpose, and a gate that demanded all of them would turn "we have not cast that one yet" into
// a failure every run. The parent Foundry passes its Mold slugs instead, and the caster does not
// care which of us is right.

import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { castSweep, sweepReport } from '@galaxy-foundry/cast/command';

import { statgenSpec } from './statgen-foundry-build.js';

const repoRoot = process.cwd();
const bundles = path.join(repoRoot, 'casts', 'claude', 'skills');

if (!existsSync(bundles)) {
  console.log('no casts to check');
  process.exit(0);
}

const molds = readdirSync(bundles, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

// `--write` re-casts the bundles instead of checking them, which is how a caster upgrade is
// absorbed: the same list, run for its output rather than its verdict. Casting a Mold for the
// FIRST time is `pnpm cast <mold>` — it has no bundle yet, so nothing here enumerates it.
const write = process.argv.slice(2).includes('--write');

const result = await castSweep(statgenSpec(repoRoot), {
  molds,
  root: repoRoot,
  check: !write,
});

const verdict = sweepReport(result, {
  repoRoot,
  check: !write,
  remediation: [
    "Drift is fixed by 'pnpm casts' + commit;",
    'an error (unresolved ref, bad declaration) is fixed at the source.',
  ],
});

for (const line of verdict.err) console.error(line);
for (const line of verdict.out) console.log(line);
process.exitCode = verdict.exitCode;
