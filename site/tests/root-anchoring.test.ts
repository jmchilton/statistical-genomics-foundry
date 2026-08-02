// A site module may not find the repository root by counting `../` from its own source depth.
//
// The same lesson `path-references.test.ts` holds for prose, one layer down: a path that looks
// correct is not the same thing as a path that resolves, and the dangerous kind is the one that
// keeps looking correct after the ground moves under it. There the ground moves when a file is
// renamed. Here it moves at build time.
//
// `astro build` collapses every site module — page, component and lib alike — into one bundled
// chunk directory. Measured on astro 7 / vite 8 by printing `import.meta.url` from all three
// positions into the built HTML, that directory is:
//
//     site/dist/.prerender/chunks/
//
// which sits exactly four levels below the repository root. A `../` count written against a
// module's source path is therefore correct after the build only when that source is also four
// deep — and whether it is depends on nothing but which directory the file happens to live in.
//
// Both Mold pages here were four deep, so both were right by that coincidence. The parent Foundry
// was not so lucky twice: `MoldHealth.astro` (`site/src/components/`, three hops) reported
// "eval.md not written yet" on all 47 Mold pages while 33 had one, and `casts.ts`
// (`site/src/lib/`, three hops) rendered `Casts = 0` against 54 committed skills while quietly
// dropping 54 pages from a green build.
//
// So this does not assert that the paths are right today. It asserts that they are not right BY
// LUCK, because the failure is silent in every direction: no error, no missing file, just an
// empty list where content should be. The anchor that does not depend on where a module ended up
// is `root` from `astro:config/server` — see `src/lib/repo-root.ts`.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

import { describe, it, expect } from 'vitest';

const SITE_SRC = new URL('../src/', import.meta.url).pathname;
const SCANNED_EXTENSIONS = ['.ts', '.astro', '.mts', '.js', '.mjs'];

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return SCANNED_EXTENSIONS.includes(path.extname(full)) ? [full] : [];
  });
}

// Stripped first, so a module is free to DESCRIBE the mistake — `repo-root.ts` and this file both
// do, at length, and neither is a violation.
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

/** A FIXED hop count. Walking up one directory at a time until something is found is fine. */
const PARENT_HOP = /(['"`])\.\.[/'"`]/;

describe('anchoring a site module to the repository root', () => {
  it('never counts ../ from import.meta.url', () => {
    const offenders = sourceFiles(SITE_SRC)
      .filter((file) => {
        const code = stripComments(readFileSync(file, 'utf-8'));
        return code.includes('import.meta.url') && PARENT_HOP.test(code);
      })
      .map((file) => path.relative(path.join(SITE_SRC, '..'), file));

    expect(
      offenders,
      '\nThese resolve against a bundled chunk after `astro build`, not against their own source' +
        ' path — correct today only where the hop count and the chunk depth happen to agree.' +
        ' Anchor on `root` from astro:config/server instead; see src/lib/repo-root.ts.' +
        `\n\n  ${offenders.join('\n  ')}\n`,
    ).toEqual([]);
  });
});
