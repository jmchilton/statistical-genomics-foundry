#!/usr/bin/env tsx
// The byte-identity gate: re-cast every Mold that has been cast, and fail if anything moved.
//
// This is what makes a committed bundle a claim rather than a snapshot. A cast is a pure
// function of the Mold, the notes it cites and the target, so re-running it must reproduce the
// bytes on disk — and where it does not, either the source changed and the bundle is stale, or
// the caster changed and every bundle is.
//
// Only Molds with a bundle are checked. An uncast Mold is not drift: this corpus casts what it
// has cast on purpose, and a gate that demanded all of them would turn "we have not cast that
// one yet" into a failure every run.

import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { main as cast } from './statgen-foundry-build.js';

const repoRoot = process.cwd();
const bundles = path.join(repoRoot, 'casts', 'claude', 'skills');

if (!existsSync(bundles)) {
  console.log('no casts to check');
  process.exit(0);
}

const names = readdirSync(bundles, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

let failed = 0;
for (const name of names) {
  // Each Mold is checked in its own run so one drifted bundle names itself and the rest still
  // report. `main` sets `process.exitCode` rather than exiting, which is what makes that possible.
  process.exitCode = 0;
  await cast([name, '--check', '--root', repoRoot]);
  if (process.exitCode !== 0) failed += 1;
}

process.exitCode = failed === 0 ? 0 : 1;
if (failed) console.error(`${failed} of ${names.length} cast(s) drifted`);
else console.log(`${names.length} cast(s) clean`);
