// The tag surface: one chip for one concept, and a corpus that links back into it.
//
// Tags are the only navigation on this site that is not a route — they are the cross-cut, the
// thing that puts a paper next to the mold that cites it. Both halves of that fail silently. A
// chip spelled out at the call site renders on the right page, in the right place, with the right
// text, and is simply a different chip. A collection that carries tags and renders none builds,
// validates, and quietly leaves its entries reachable only from the tag pages they never mention.
//
// Both had shipped. The old local chip drew a bordered mono pill in utilities and never touched
// `.tag`, while `.tag` itself named the provenance pills — so the one thing here that IS a tag was
// the one thing not using the class called `tag`. And of five tagged collections, only Molds
// rendered chips: the tag pages listed papers, tutorials, books and patterns, and none of those
// pages said what they were tagged with.
//
// The sibling instance carries the first rule too, against the same failure. It does not carry the
// second: it renders tags from one note header shared by every page, so there is no per-collection
// wiring that can be forgotten.

import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { DETAIL_ROUTES } from '../src/lib/detail-routes';
import { SITE_SRC, siteRelative, siteSourceCode, siteSourceFiles } from './site-sources';

const STYLESHEET = 'src/styles/global.css';

/**
 * Anchors whose href names a SPECIFIC tag page.
 *
 * The trailing exclusion matters: `${base}/tags/` on its own is the index, and the per-tag pages
 * link back to it. That link is not a chip and must not be held to a chip's rule.
 */
const TAG_LINK = /<a\s[^>]*\/tags\/(?![`'"])/g;
const STATIC_CLASS = /class="([^"]*)"/g;

/** The class used by this repo's tag-browse cards. Note-page chips belong to site-kit. */
const CHIP_CLASS = 'tag';

/**
 * The count today. Its job is not the number: it is that a regex which quietly stops matching
 * would make every assertion below vacuously true, and a chip rule with no chips to check reports
 * the same PASS as a site with no drift.
 */
const MIN_TAG_LINKS = 1;

/** Every `<a … /tags/<tag>… >` in a file, with the markup it encloses and its own attributes. */
function tagLinks(file: string): { file: string; markup: string; opening: string }[] {
  const code = siteSourceCode(file);
  return [...code.matchAll(TAG_LINK)].map((match) => {
    const end = code.indexOf('</a>', match.index);
    // An anchor cannot nest, so the first close is this one's. An unclosed anchor is a real
    // defect; reporting the tail is how it surfaces rather than silently matching nothing.
    const markup = end === -1 ? code.slice(match.index) : code.slice(match.index, end);
    const close = markup.indexOf('>');
    return { file, markup, opening: close === -1 ? markup : markup.slice(0, close) };
  });
}

const classesIn = (markup: string): string[] =>
  [...markup.matchAll(STATIC_CLASS)].flatMap((match) => (match[1] ?? '').split(/\s+/));

describe('the tag chip', () => {
  const links = siteSourceFiles().flatMap(tagLinks);

  it('is asked for by every link to a tag page', () => {
    expect(links.length).toBeGreaterThanOrEqual(MIN_TAG_LINKS);

    const inline = links
      .filter((link) => !classesIn(link.markup).includes(CHIP_CLASS))
      .map((link) => siteRelative(link.file));

    expect(
      [...new Set(inline)].sort(),
      `\nlinks to a tag page that do not carry \`${CHIP_CLASS}\` — they render a chip of their` +
        ` own, which will drift from the one in ${STYLESHEET} without anything failing. A dynamic` +
        ' `class={…}` lands here too: the rule cannot read it, and a call site a rule cannot read' +
        ' is not a call site a rule covers.',
    ).toEqual([]);
  });

  it('lights up on hover in whichever way its call sites nest it', () => {
    // `a:hover .tag` is a descendant selector, so an anchor that IS the chip can never satisfy it:
    // the chip keeps its transition and loses the thing to transition to. No warning — a chip that
    // does not react looks like a chip nobody moused over. Both nestings are legitimate and this
    // site uses both, so the requirement is derived from the markup rather than declared: delete
    // either selector and this names what goes quiet.
    const css = readFileSync(path.join(SITE_SRC, '..', STYLESHEET), 'utf-8');
    const selectorFor = { self: 'a.tag:hover', descendant: 'a:hover .tag' };

    const missing = links
      .filter((link) => classesIn(link.markup).includes(CHIP_CLASS))
      .map((link): keyof typeof selectorFor =>
        classesIn(link.opening).includes(CHIP_CLASS) ? 'self' : 'descendant',
      )
      .filter((nesting) => !css.includes(selectorFor[nesting]))
      .map((nesting) => selectorFor[nesting]);

    expect(
      [...new Set(missing)].sort(),
      `\nnestings the markup uses that ${STYLESHEET} has no hover rule for. The chips render` +
        ' correctly and simply do not respond, which is invisible unless the two forms happen to' +
        ' sit on one page.',
    ).toEqual([]);
  });
});

describe('the tag surface', () => {
  // `lib/tags.ts` imports `astro:content`, so it is read rather than imported. The list is taken
  // from `COLLECTION_LABEL` because that is the same map the tag pages group by — a collection
  // added there starts appearing on /tags immediately, which is exactly when its detail page
  // needs to point back.
  const tagsLib = siteSourceCode(path.join(SITE_SRC, 'lib', 'tags.ts'));
  const labels = /COLLECTION_LABEL[^=]*=\s*\{([^}]*)\}/.exec(tagsLib)?.[1] ?? '';
  const collections = [...labels.matchAll(/^\s*([a-z]+)\s*:/gm)].map((m) => m[1] as string);

  it('names collections to check', () => {
    // Guards the guard: a rename in lib/tags.ts that this regex stopped matching would turn the
    // rule below into an assertion about an empty list.
    expect(collections.length).toBeGreaterThanOrEqual(5);
  });

  it('is entered from the one route that renders them all', () => {
    // This walked `src/pages/<collection>/` per collection and asked whether anything underneath
    // rendered chips — the right question while five directories could answer it five different
    // ways, and four of them answered no. One route renders every note now, so the question has a
    // single answer and the rule reads it where it is given.
    //
    // Shorter, and strictly stronger. The walk could only find collections it knew to look for,
    // and it passed for a collection whose directory happened to contain some OTHER page carrying
    // the string. Neither is available here.
    const route = siteSourceCode(path.join(SITE_SRC, 'pages', '[collection]', '[...slug].astro'));
    // The chip implementation is shared by @galaxy-foundry/site-kit now. This site owns the
    // routing decision: the common note frame must receive this corpus's tags and tag base.
    // Appearance and link markup are package contracts, tested with the component itself there;
    // the built-site assertions below prove that SGF supplied the values correctly.
    expect(route, '\nthe detail route does not use the shared content frame.').toContain('<ContentNote');
    expect(route, '\nthe detail route does not pass its note tags to the shared frame.').toContain(
      'tags={tags}',
    );
    expect(route, '\nthe detail route does not give shared chips a tag route.').toContain('tagBase=');

    const uncovered = collections.filter((collection) => !(collection in DETAIL_ROUTES));
    expect(
      uncovered.sort(),
      '\ncollections the tag pages list that the detail route generates no page for — every' +
        ' entry the tag pages offer for them is a link to nothing.',
    ).toEqual([]);
  });
});
