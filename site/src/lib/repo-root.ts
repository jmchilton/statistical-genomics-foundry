// Where the repository is, for site modules that read something off disk outside `site/`.
//
// `astro:config/server` gives the project directory as Astro computed it, which is the one anchor
// that does not depend on where a module ended up. Counting `../` from `import.meta.url` does:
// `astro build` collapses pages, components and lib modules alike into a single chunk directory
// four levels below the repo root, so a hop count written against a source path agrees with it
// only where the source is four deep too. The two Mold pages were, and were right by luck. In the
// parent Foundry two modules were three deep and were not — a components file reporting every
// Mold as missing its `eval.md`, and a lib file rendering `Casts = 0` with 54 of them committed.
// `tests/root-anchoring.test.ts` holds the rule so neither repo has to learn it a third time.
//
// A module of its own because the import only resolves inside an Astro build. Anything worth
// testing outside one should take a directory rather than reach for this — which is why
// `frontmatter-schema.ts` keeps its own cwd-relative `CONTENT_DIR`: it is imported by
// `content.config.ts`, which Astro loads before this import would resolve.

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { root } from 'astro:config/server';

/** Absolute path of the repository root. `root` is the site directory; the repo is its parent. */
export const REPO_ROOT = fileURLToPath(new URL('../', root));

/** A repo-root-relative path, resolved absolutely. */
export const repoPath = (...segments: string[]): string => path.join(REPO_ROOT, ...segments);
