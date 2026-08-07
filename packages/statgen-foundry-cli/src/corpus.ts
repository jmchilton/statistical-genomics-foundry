// The corpus as a caster sees it: every note, by the slug a wiki link names it with.
//
// The site answers the same question in site/src/lib/corpus-files.ts, and this is deliberately
// NOT that function. `contentPath` there is cwd-relative — `../content`, correct only when the
// process started in `site/` — because it is imported by content.config.ts, which Astro loads
// before an absolute anchor would resolve. A caster runs from the repo root, so it takes the
// root as an argument and walks from there.
//
// What IS shared is the part worth sharing: which directories hold notes and what counts as one
// live in the site's COLLECTIONS table, and the slug rule ships in @galaxy-foundry/wiki-links.
// Copying the table would let the caster and the site disagree about what the corpus contains;
// copying the slug rule would let a `[[link]]` resolve on the site and miss in a cast.

import fs from 'node:fs';
import path from 'node:path';

import { readMarkdown, type Frontmatter } from '@galaxy-foundry/cast';
import { matchesCollection } from '@galaxy-foundry/kind-schema/collections';
import { slugify } from '@galaxy-foundry/wiki-links';
import {
  COLLECTION_NAMES,
  COLLECTION_ROUTES,
} from 'statistical-genomics-foundry-site/lib/collection-routes';

/** Where notes live under the repo root. The site's `CONTENT_DIR` says the same from `site/`. */
const CONTENT = 'content';

/** Every file under a content-relative directory, as content-relative POSIX paths. */
function walk(repoRoot: string, dir: string): string[] {
  const abs = path.join(repoRoot, CONTENT, dir);
  if (!fs.existsSync(abs)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = dir ? `${dir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(repoRoot, rel));
    else if (entry.isFile()) out.push(rel);
  }
  return out;
}

/**
 * The note id the site routes a file by: its path from the collection base, without extension.
 *
 * Both note shapes lose their extension. Stripping only `/index.md` would leave the flat `meta`
 * records — `architecture.md` — slugged as `architecturemd`, unreachable by every `[[link]]`
 * that names them. The site learned this once; the rule is restated here against the same
 * fixture rather than re-derived.
 */
function noteId(rel: string, base: string): string {
  return rel.slice(base.length + 1).replace(/(?:\/index)?\.md$/, '');
}

/** What a cast reads the corpus for: where a slug points, and what each note declares. */
export interface StatgenCorpus {
  readonly slugMap: ReadonlyMap<string, string>;
  readonly metaByPath: ReadonlyMap<string, Frontmatter>;
}

/**
 * Read every routed note under `content/`, keyed the way a wiki link names it.
 *
 * Paths are REPO-relative, because that is the frame a provenance record is written in — a
 * record naming `patterns/x/index.md` would be ambiguous the moment anything outside `content/`
 * became citable.
 */
export function readCorpus(repoRoot: string): StatgenCorpus {
  const slugMap = new Map<string, string>();
  const metaByPath = new Map<string, Frontmatter>();

  for (const name of COLLECTION_NAMES) {
    const row = COLLECTION_ROUTES[name];
    for (const rel of walk(repoRoot, row.base).sort()) {
      if (!matchesCollection(rel, row)) continue;
      const repoRel = `${CONTENT}/${rel}`;
      const slug = slugify(noteId(rel, row.base).replace(/\//g, '-'));
      // First wins, and collisions are reported rather than silently resolved: two notes
      // answering one `[[link]]` is a corpus fault, and picking one would hide it.
      if (slugMap.has(slug) && slugMap.get(slug) !== repoRel) {
        throw new Error(
          `two notes claim the slug \`${slug}\`: ${slugMap.get(slug) ?? ''} and ${repoRel}`,
        );
      }
      slugMap.set(slug, repoRel);
      metaByPath.set(repoRel, readMarkdown(path.join(repoRoot, repoRel)).meta);
    }
  }

  return { slugMap, metaByPath };
}
