import fs from 'node:fs';
import { describe, it, expect } from 'vitest';

import { WIKI_LINK_SCAN_RE, parseWikiLink, resolveWikiLink, slugify } from '@galaxy-foundry/wiki-links';

import { markdownFiles } from '../src/lib/corpus-files';
import { contentPath } from '../src/lib/frontmatter-schema';
import { DESIGN_DOCS } from '../src/lib/design-docs';
import { buildWikiLinkMap } from '../src/lib/wiki-links';

// Wiki links written in prose have to point at something.
//
// Nothing resolved them, and the gap was wider than this file's absence: `registry-drift.test.ts`
// reads every Mold's `references` and holds each entry's `kind` and `mode` to the registries, but
// never asks whether the TARGET names a note — so frontmatter links went unchecked in the same
// way. This file closes the body half. The frontmatter half is still open.
//
// Unresolved is not invisible — the remark plugin renders a link it cannot resolve as bold text
// rather than dropping it, so the failure is on the page. But it is on the page in a form that
// reads as emphasis, on whichever page the reader is not currently on, and the corpus had no way
// to enumerate them. `pnpm validate` should answer "which links are broken" without anyone
// browsing for bold words.
//
// It found a live one immediately, which is the argument for the check better than any example:
// `noteIds` stripped `/index.md` and nothing else, so the flat-file `meta` kind keyed every design
// record with its extension attached — `architecturemd` — and all twelve were unreachable. Every
// `[[architecture]]` in the corpus had been rendering bold. A check that resolves links finds that
// on its first run; a corpus that renders them finds it when a reader wonders why a word is bold.
//
// The grammar and the lookup rule come from @galaxy-foundry/wiki-links, the same package the
// renderer and the remark plugin use. That is the point rather than an implementation detail: a
// check with its own regex would drift from the resolver it is checking, and would eventually
// report links the site renders fine, or pass links the site cannot resolve.
//
// WHAT IS SCANNED, and the three exclusions, each of which costs something:
//
//   - Frontmatter is skipped. Its links are the reference contract's business, and they carry
//     structure — kind, load, mode — that a bare resolution check would report on twice.
//   - Fenced blocks are skipped. A fence is an illustration, and its links are meant to be
//     unreal: `content/meta/mold-spec.md` shows the shape of a `references:` entry with
//     `[[double-dipping-in-single-cell]]` in the slot, a pattern that does not exist and is not
//     supposed to. Demanding it resolve would make the spec unable to show its own syntax.
//   - Inline code spans are skipped, and this is the exclusion with a cost worth naming. A
//     backticked `[[Target]]` is not a link — the rewriter walks text nodes and never enters a
//     code span — so demanding it resolve would fail every passage that names the SYNTAX, which
//     `content/meta/content-model.md` does repeatedly and correctly.
//
//     The cost is that a backticked link stays unchecked in both directions: it does not render
//     as a link, and it is not reported here, so it can name a note that never existed and say so
//     in a fixed-width font forever. That hole is real and this check does not close it. It is
//     why the content model tells authors to wrap a wiki link in backticks only when the literal
//     token IS the subject — a template slot, a frontmatter field shape, or a construct like
//     `[[:space:]]` that is not a wiki link at all. The rule is the mitigation; there is no
//     mechanical one that does not also flag every correct mention of the syntax.
//
// What this does NOT cover, stated so it is not mistaken for coverage: anchors. `[[Target#part]]`
// resolves on the target alone, because a heading is not addressable from here without rendering
// the target first. A link to a real note and a section it does not have passes this check.

/** The design-doc slugs are part of the map, so a link to an untyped research page resolves. */
const LINK_MAP = buildWikiLinkMap(DESIGN_DOCS);

/**
 * Links to units this Foundry intends to build and has not built.
 *
 * A source note's "Grounds:" line names the referee a paper backs, and those referees were named
 * during the research phase before any Mold existed. The link is not a mistake — it is the corpus
 * saying which Mold this evidence is FOR, which is the whole reason the source note was written.
 * Rewriting them to plain text to satisfy this check would delete that, and would trade a
 * checkable claim for an unfindable one.
 *
 * So they are declared instead, each with where the unit is registered as planned. Keyed by
 * slugified target, the same normalization the resolver applies, so an aliased or differently
 * cased write of the same link lands on the same entry.
 *
 * Both directions are guarded below: an entry stops being legal the moment its target EXISTS, so
 * authoring the Mold breaks this file and the allowance leaves with the same commit — and an entry
 * no link writes any more is equally a failure. Neither can rot into a permanent exemption.
 */
const PLANNED: Record<string, string> = {
  'assess-batch-effects-and-confounding':
    'protocol-altitude referee, named as planned by patterns/batch-aliased-with-condition and molds/audit-method-validity',
  'map-question-to-established-method':
    'Family-A construct Mold, carried as a TODO by patterns/method-applicability-errors',
  'deseq2-basics': 'skill 8 in research/05-skill-backing-references.md, not yet a Mold',
  'review-experimental-design':
    'construct Mold named beside the two above in leek-2010, and registered nowhere else — the weakest of these, and the one to confirm or drop first',
};

/** The link target, normalized the way the resolver normalizes it. */
const targetSlug = (link: string) => slugify(parseWikiLink(link)?.target ?? '');

const FENCE = /^\s*```/;
/** Inline code spans, backtick runs matched to their own length. */
const CODE_SPAN = /(`+)[\s\S]*?\1/g;

/**
 * The shared scanner's own grammar, in a fresh instance.
 *
 * `WIKI_LINK_SCAN_RE` is exported global and therefore stateful — `lastIndex` survives between
 * calls. Reusing the exported object across files would make each scan start wherever the last
 * one stopped, which fails as skipped links rather than as an error.
 */
const scanner = () => new RegExp(WIKI_LINK_SCAN_RE.source, 'g');

/** Every body wiki link a file writes, with the line it is written on. */
function bodyWikiLinks(contentRelPath: string): { link: string; line: number }[] {
  const text = fs.readFileSync(contentPath(contentRelPath), 'utf8');
  const lines = text.split(/\r?\n/);
  const found: { link: string; line: number }[] = [];
  let inFence = false;

  // Frontmatter is a leading `---` block; a file without one starts at the body.
  let start = 0;
  if (lines[0]?.trim() === '---') {
    const close = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
    if (close > 0) start = close + 1;
  }

  for (let index = start; index < lines.length; index += 1) {
    const line = lines[index] ?? '';
    if (FENCE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const prose = line.replace(CODE_SPAN, '');
    for (const match of prose.matchAll(scanner())) {
      const inner = match[1]?.trim();
      if (inner) found.push({ link: `[[${inner}]]`, line: index + 1 });
    }
  }

  return found;
}

/** Every body wiki link the corpus writes, once per site. */
const allLinks = () =>
  markdownFiles().flatMap((rel) =>
    bodyWikiLinks(rel).map(({ link, line }) => ({ rel, link, line })),
  );

describe('body wiki links in content resolve', () => {
  it('every [[link]] in prose names a note or design doc that exists', () => {
    const broken = allLinks()
      .filter(({ link }) => !resolveWikiLink(link, LINK_MAP) && !(targetSlug(link) in PLANNED))
      .map(({ rel, link, line }) => `content/${rel}:${line}: ${link}`);

    expect(broken, `\nbody wiki links that do not resolve:\n  ${broken.join('\n  ')}`).toEqual([]);
  });

  // The allowance is for a unit that does not exist. Once it does, the link resolves on its own
  // and the entry is not deferral any more — it is a stale note about history, sitting in the one
  // place a reader would trust for what is still outstanding.
  it('every PLANNED entry names a target that is still absent', () => {
    const arrived = Object.keys(PLANNED).filter((slug) => LINK_MAP.has(slug));

    expect(arrived, `\nplanned units that now exist — drop the allowance:\n  ${arrived.join('\n  ')}`).toEqual([]);
  });

  // And the mirror: an entry no link writes any more has stopped describing anything, and the next
  // reader cannot tell it from one still doing work.
  it('every PLANNED entry is still a link the corpus writes', () => {
    const written = new Set(allLinks().map(({ link }) => targetSlug(link)));
    const unused = Object.keys(PLANNED).filter((slug) => !written.has(slug));

    expect(unused, `\nallowed but no longer linked:\n  ${unused.join('\n  ')}`).toEqual([]);
  });
});
