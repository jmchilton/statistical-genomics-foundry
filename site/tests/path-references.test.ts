import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { markdownFiles } from '../src/lib/content-files';
import { CONTENT_DIR, contentPath } from '../src/lib/frontmatter-schema';

// Paths written in prose have to point at something.
//
// Nothing checked them, and the corpus paid for it in the one way that is hard to notice: a file
// MOVES and every path that named it stays exactly as correct-looking as it was. When the design
// records went from `docs/*.md` to `content/meta/<slug>.md` they gained a directory level, and
// `content/meta/positioning.md`'s "see `../positioning.md`" — correct for as long as the file sat
// one level deep — silently began resolving to `content/positioning.md`. Git carried the line
// through the rename byte for byte, because a rename is the one edit that cannot read.
//
// So: resolve them. Every markdown file under content/, every path it names, against the disk.
//
// WHICH paths, precisely, is the whole design of this check. A note's prose is full of tokens
// that look like paths and are not this repo's: upstream layouts (`docs/vignette`), file names in
// the abstract (`modules.nf`), a tool's own tree. Demanding those resolve would make the check
// noise, and a noisy check gets an allowance entry per complaint until it means nothing. The rule
// that separates them is ANCHORING — a path is a claim about THIS repo when it says so:
//
//   `./x`, `../x`   relative to the citing file
//   `content/x`     relative to the repo root
//
// and three further narrowings, each earned by a real token in the corpus rather than assumed:
//
//   - inside a fenced block, nothing is checked. A fence is an illustration; the layout tree in
//     `architecture.md` §6 is explicitly a PROVISIONAL plan, and half of what it draws is meant
//     not to exist yet. Checking it would be checking the plan against the thing it plans.
//   - a token carrying `<`, `*` or `{` is a template, not a path — `content/molds/<slug>/`,
//     `rubrics/{operability,assessability}.md`.
//   - a token has to NAME something: a trailing slash or a file extension. `content/research/05`
//     is prose shorthand for a numbered note, not a path anyone could open.
//
// What this does NOT cover, stated so it is not mistaken for coverage: prose that describes a
// location without writing one ("the renderer runs over content/ + docs/"), and markdown outside
// content/ — README.md and AGENTS.md carry their own stale directory names and always will until
// something reads them too.

/** The repo root, in the frame `CONTENT_DIR` is written in. */
const REPO_ROOT = path.join(CONTENT_DIR, '..');

/**
 * Anchored paths that are real, but not here.
 *
 * Files, never directories. An area allowance outlives the area it describes and goes on
 * covering every future stray beneath it, which is the silence this check exists to end.
 */
const ELSEWHERE: Record<string, string> = {
  'content/pattern/standing-up-a-foundry.instructions.txt':
    'the shared tag-registry spec, in galaxyproject/foundry-pattern — cited beside a link to that repo',
};

const FENCE = /^\s*```/;
/** Inline code spans: `../x` or `content/x`. */
const CODE_SPAN = /`((?:\.\.?\/|content\/)[^`\s]+)`/g;
/** Markdown link targets, any shape — anchoring is what decides whether one is checked. */
const LINK_TARGET = /\]\(([^)\s]+)\)/g;

const isAnchored = (token: string) =>
  token.startsWith('./') || token.startsWith('../') || token.startsWith('content/');
const isTemplate = (token: string) => /[<*{]/.test(token);
/** Names a file or a directory, rather than gesturing at a prefix. */
const namesSomething = (token: string) => token.endsWith('/') || /\.[A-Za-z0-9]+$/.test(token);

/** Every anchored path a file claims, with the line it is claimed on. */
function anchoredPaths(contentRelPath: string): { token: string; line: number }[] {
  const text = fs.readFileSync(contentPath(contentRelPath), 'utf8');
  const found: { token: string; line: number }[] = [];
  let inFence = false;

  text.split(/\r?\n/).forEach((line, index) => {
    if (FENCE.test(line)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;

    const tokens = [
      ...[...line.matchAll(CODE_SPAN)].map((m) => m[1]),
      // A trailing #anchor addresses a heading inside the target, not a different file.
      ...[...line.matchAll(LINK_TARGET)].map((m) => m[1].split('#')[0]),
    ];

    for (const token of tokens) {
      if (!token || isTemplate(token) || !isAnchored(token) || !namesSomething(token)) continue;
      found.push({ token, line: index + 1 });
    }
  });

  return found;
}

/** Where an anchored path lands on disk, given the file that wrote it. */
function resolveFrom(contentRelPath: string, token: string): string {
  const base = token.startsWith('.') ? path.dirname(contentPath(contentRelPath)) : REPO_ROOT;
  return path.normalize(path.join(base, token.replace(/\/$/, '')));
}

describe('anchored paths in content resolve', () => {
  it('every ./, ../ and content/ path names a file that exists', () => {
    const broken: string[] = [];

    for (const rel of markdownFiles()) {
      for (const { token, line } of anchoredPaths(rel)) {
        if (token in ELSEWHERE) continue;
        if (!fs.existsSync(resolveFrom(rel, token))) broken.push(`content/${rel}:${line}: ${token}`);
      }
    }

    expect(broken, `\nanchored paths that do not resolve:\n  ${broken.join('\n  ')}`).toEqual([]);
  });

  // An allowance nobody needs any more is an allowance that has stopped describing anything, and
  // the next reader has no way to tell it apart from one still doing work.
  it('every ELSEWHERE entry is still a path the corpus writes', () => {
    const cited = new Set(
      markdownFiles().flatMap((rel) => anchoredPaths(rel).map(({ token }) => token)),
    );
    const unused = Object.keys(ELSEWHERE).filter((token) => !cited.has(token));

    expect(unused, `\nallowed but no longer cited:\n  ${unused.join('\n  ')}`).toEqual([]);
  });
});
