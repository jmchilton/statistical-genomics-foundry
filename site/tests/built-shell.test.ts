// The document shell's contract, asserted on what the build actually emitted.
//
// The shell has no unit behaviour worth testing — it is markup. What it DOES have is a contract
// with the reader that no other check can see: a skip link that lands somewhere, a theme applied
// before first paint, and a stylesheet that actually carries the utilities the markup names. Every
// one of those fails green. The page builds, the HTML is well-formed, and the site is broken.
//
// This was written against the hand-rolled Base/Header/Footer, deliberately BEFORE they moved to
// @galaxy-foundry/site-kit, because a test written after a swap proves nothing about what the swap
// changed. It passed unaltered afterwards — the assertions below are the ones that were here, and
// the swap is what they were for.
//
// The stylesheet assertion is the one to understand before editing, and the move is what armed it.
// Tailwind 4 emits a utility only where it finds the class in a source file it was told to scan,
// and it does not look inside node_modules — which is exactly where the shell now lives. So the
// canary is no longer a hypothetical about markup that might one day move: `min-h-dvh` is named by
// the KIT and by nothing in this repo, and its presence in the emitted CSS is the only evidence
// that `@source` in global.css points where it claims to. Delete that line, or misspell it, and
// every page still references the class while no rule for it exists. Nothing errors.
//
// Which makes one older line in global.css load-bearing in a way it was not before. This directory
// sits INSIDE the Vite root, so automatic source detection scans it, and naming `min-h-dvh` below
// was once enough to put the class in the stylesheet by itself: the assertion passed with the class
// deleted from the layout. `@source not "../../tests"` is what stops this file from answering its
// own question — and now that the only other place the class is named is a package Tailwind reaches
// solely through the `@source` line, that exclusion is the whole of what keeps the canary honest.

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

import {
  contentReaderStyleGaps,
  licenseBadgeStyleGaps,
  licenseFileStyleGaps,
  noteHeaderStyleGaps,
  referenceStyleGaps,
} from '@galaxy-foundry/site-kit';
import { sharesPage, specimenPath } from '@galaxy-foundry/site-kit/specimens';
import yaml from 'js-yaml';
import { beforeAll, describe, expect, it } from 'vitest';

import { noteFiles, noteIds } from '../src/lib/corpus-files';
import { contentReader } from '../src/lib/content-reader';
import { COLLECTION_NAMES, contentPath, type CollectionName } from '../src/lib/frontmatter-schema';
import { ALL_SPECIMENS, SGF_SPECIMENS } from '../src/lib/gallery';
import { SITE_IDENTITY } from '../src/lib/site-identity';

const { footerLinks: FOOTER_LINKS, navLinks: NAV_LINKS, repoUrl: REPO_URL } = SITE_IDENTITY;

const SITE = new URL('../', import.meta.url).pathname;
const DIST = path.join(SITE, 'dist');

/** A utility class named by the kit and by nothing in this repo — see the header comment. */
const KIT_ONLY_UTILITY = 'min-h-dvh';

function newestMtime(dir: string): number {
  return readdirSync(dir).reduce((newest, entry) => {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    return Math.max(newest, stat.isDirectory() ? newestMtime(full) : stat.mtimeMs);
  }, 0);
}

/**
 * The environment for the child build, with vitest's own removed.
 *
 * Vitest mirrors `import.meta.env` into `process.env` — `MODE`, `DEV`, `PROD`, `SSR`, and
 * `BASE_URL=/`. A child `astro build` inherits all five, and takes `BASE_URL` over the `base` in
 * `astro.config.mjs`: every link on every page comes out root-relative, and this suite asserts
 * against a site that is not the one being shipped. It built cleanly, every page, for as long as
 * this file has existed. Nothing noticed until an assertion read an href.
 */
function buildEnv(): NodeJS.ProcessEnv {
  const { BASE_URL, MODE, DEV, PROD, SSR, ...rest } = process.env;
  return rest;
}

/**
 * Build only when `dist/` is missing or older than the sources.
 *
 * Asserting against a stale `dist/` is worse than not asserting: it reports on a site nobody is
 * shipping, and it reports PASS. Reusing a fresh one keeps the suite quick on a repeat run.
 */
function ensureBuilt(): void {
  const landmark = path.join(DIST, 'index.html');
  // The corpus counts as a source, and not only for tidiness: the rules below read a note's
  // frontmatter and ask whether the built page shows it. Watching `src/` alone, an edit to a
  // note is compared against the page built before it — the two disagree, and the rule reports
  // the site as broken or as fine depending on which way the edit went.
  const fresh =
    existsSync(landmark) &&
    statSync(landmark).mtimeMs >
      Math.max(newestMtime(path.join(SITE, 'src')), newestMtime(path.join(SITE, contentPath(''))));
  if (fresh) return;
  execFileSync('pnpm', ['run', 'build'], { cwd: SITE, stdio: 'inherit', env: buildEnv() });
}

function builtPages(dir: string = DIST): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (entry === 'pagefind' || entry === '_astro') return [];
    if (statSync(full).isDirectory()) return builtPages(full);
    return entry.endsWith('.html') ? [full] : [];
  });
}

const rel = (file: string) => path.relative(DIST, file);
const read = (file: string) => readFileSync(file, 'utf-8');

/**
 * A collection's notes as (id, frontmatter), read from the corpus rather than from the build.
 *
 * Every claim below of the form "the page shows what the note declares" needs the second half
 * from somewhere the page cannot have influenced. The reader pairs `noteIds` with `noteFiles`
 * positionally — both are the one walk, mapped — so the id that names a built page and the file
 * its frontmatter comes from are the same note by construction rather than by string surgery here.
 */
function noteFrontmatter(collection: CollectionName): { id: string; data: Frontmatter }[] {
  const files = noteFiles(collection);
  return noteIds(collection).map((id, index) => {
    const front = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(read(contentPath(files[index]!)))?.[1];
    return { id, data: front ? ((yaml.load(front) as Frontmatter | undefined) ?? {}) : {} };
  });
}

interface Frontmatter {
  tags?: string[];
  summary?: string;
  status?: string;
  pole?: string;
  record_kind?: string;
  references?: unknown[];
}

/** The page a routed note built to. Every collection routes to `<collection>/<id>/`. */
const notePage = (collection: string, id: string): string =>
  read(path.join(DIST, collection, id, 'index.html'));

const STANDALONE_SPECIMEN_PAGES = ALL_SPECIMENS.filter(
  (group) => !sharesPage(group),
).flatMap((group) =>
  group.specimens.map((specimen) => `gallery/${specimenPath(group, specimen)}/index.html`),
);

// Isolated specimens intentionally render one component in an otherwise bare document. Document
// specimens are SiteShell itself and continue satisfying the ordinary shell assertions.
const BARE_SPECIMEN_PAGES = ALL_SPECIMENS.filter(
  (group) => group.surface === 'isolated',
).flatMap((group) =>
  group.specimens.map((specimen) => `gallery/${specimenPath(group, specimen)}/index.html`),
);

let pages: string[];
let home: string;

beforeAll(() => {
  ensureBuilt();
  pages = builtPages();
  home = read(path.join(DIST, 'index.html'));
}, 600_000);

describe('the document shell, on every page the build emitted', () => {
  it('emits one page for every routed note', () => {
    const targets = contentReader.noteTargets();
    expect(targets.length, 'the routed-note coverage check found no notes').toBeGreaterThan(0);

    const built = new Set(pages.map(rel));
    const missing = targets
      .filter(({ target }) => !built.has(`${target.path}/index.html`))
      .map(({ collection, id }) => `${collection}:${id}`);
    expect(missing, `\nrouted notes with no built page: ${missing.join(', ')}`).toEqual([]);
  });

  it('offers a skip link that lands on a target that exists', () => {
    const broken = pages.filter((file) => {
      if (BARE_SPECIMEN_PAGES.includes(rel(file))) return false;
      const html = read(file);
      return !html.includes('href="#main"') || !html.includes('id="main"');
    });
    expect(broken.map(rel), '\npages missing the skip link or its target').toEqual([]);
  });

  it('applies the theme before first paint, and tells pagefind which one', () => {
    // Scoped to <head> deliberately. Inline and in <head> is the whole point: run this after the
    // browser has painted and the reader watches the page flash white on the way to dark.
    //
    // The first version of this searched the WHOLE page, and passed with the pre-paint script
    // deleted — the theme TOGGLE in the header sets the same two things on click, so the strings
    // were still there while the behaviour was gone. Two scripts, one contract each; only this
    // one runs before paint.
    const broken = pages.filter((file) => {
      const head = read(file).split('</head>')[0] ?? '';
      return (
        !head.includes('localStorage.theme') ||
        !head.includes('pfTheme') ||
        !head.includes('matchMedia')
      );
    });
    expect(broken.map(rel), '\npages with no pre-paint theme script in <head>').toEqual([]);
  });

  it('carries a header and a footer', () => {
    const broken = pages.filter((file) => {
      if (BARE_SPECIMEN_PAGES.includes(rel(file))) return false;
      const html = read(file);
      return !html.includes('<header') || !html.includes('<footer');
    });
    expect(broken.map(rel), '\npages missing the header or the footer').toEqual([]);
  });
});

describe('the document skeleton', () => {
  it('declares a language, a title and the social metadata', () => {
    expect(home).toContain('<html lang="en"');
    expect(home).toMatch(/<title>[^<]+ - Statistical Genomics Foundry<\/title>/);
    expect(home).toContain('property="og:title"');
    expect(home).toContain('property="og:description"');
  });
});

/**
 * The eyebrow's own words, with the rule span and Astro's scoping attributes taken out.
 *
 * Three spans open here — the eyebrow, the decorative rule, the label — so the words are what
 * is left once the markup is removed, up to whatever the frame renders next.
 */
function eyebrowOf(html: string): string {
  const start = html.search(/<span class="note-eyebrow[ "]/);
  if (start === -1) return '';
  const region = html.slice(start, html.indexOf('</header>', start));
  return (region.split(/<h1|<p class="note-summary|<div class="note-tags/)[0] ?? '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

/** The tags a page's chips actually point at, in render order. */
/** The frame's summary paragraph: its attributes, and the text it renders. */
const NOTE_SUMMARY = /<p class="note-summary[^"]*"([^>]*)>([\s\S]*?)<\/p>/;

const decodeText = (html: string): string =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();

function chipsOn(html: string, base: string): string[] {
  return [...html.matchAll(/<a\s([^>]*)>/g)]
    .map((match) => match[1] ?? '')
    .filter((attrs) => /class="[^"]*\bcontent-tag\b/.test(attrs))
    .flatMap((attrs) => {
      const href = /href="([^"]*)"/.exec(attrs)?.[1] ?? '';
      const prefix = `${base}/tags/`;
      return href.startsWith(prefix) ? [href.slice(prefix.length).replace(/\/$/, '')] : [href];
    });
}

describe('the shared content frame', () => {
  it('links a note tag back into this corpus tag surface', () => {
    const paper = read(path.join(DIST, 'papers/kirilenko-2023-toga/index.html'));
    expect(paper).toContain(
      'href="/statistical-genomics-foundry/tags/domain/comparative-annotation/"',
    );
    expect(paper).toContain('class="content-tag"');
  });

  // The rule the frame's adoption had to give up, restored against the build.
  //
  // It used to walk `src/pages/<collection>/` and ask whether anything under each rendered chips
  // — a source-level question, and the one that caught four of five tagged collections rendering
  // none. Once the chips moved into the package the source says only that the route passes
  // `tags={tags}` somewhere, which is true of a route that passes an empty array, and true of one
  // whose gate quietly excludes a collection. The corpus states what each note is tagged with and
  // the built page states what it shows; nothing in between gets a vote.
  //
  // Both halves are read from the build, including which collections the tag surface groups. A
  // list written here would be a third copy of a vocabulary that already exists twice.
  it('shows every tag a note declares, in every collection the tag pages list', () => {
    const listed = new Set<string>();
    for (const file of pages.filter((page) => rel(page).startsWith('tags/'))) {
      for (const match of read(file).matchAll(/id="tag-([a-z]+)"/g)) listed.add(match[1]!);
    }

    expect(
      [...listed],
      '\nno collection groups on the built tag pages — has the tag surface changed shape?',
    ).not.toEqual([]);

    const base = baseFrom(home);
    const rows = [...listed].sort().flatMap((collection) =>
      noteFrontmatter(collection as CollectionName).map((note) => ({
        page: `${collection}/${note.id}`,
        declared: note.data.tags ?? [],
        shown: chipsOn(notePage(collection, note.id), base),
      })),
    );

    // Guards the guard, and this one earns it twice over: the comparison below is satisfied by a
    // corpus that declares no tags AND by a page that renders none, which is the exact state the
    // rule exists to catch. Counted across collections, so a single collection going silent
    // cannot hide behind the other four.
    expect(
      rows.filter((row) => row.declared.length > 0).length,
      '\nno note in any listed collection declares a tag',
    ).toBeGreaterThan(50);
    expect(
      new Set(rows.map((row) => row.page.split('/')[0])).size,
      '\nfewer collections carrying notes than the tag pages list',
    ).toBe(listed.size);

    const wrong = rows.filter((row) => row.declared.join(' ') !== row.shown.join(' '));

    expect(
      wrong,
      '\nnotes whose page does not show the tags it declares. A collection listed on the tag' +
        ' pages whose own notes render no chips is reachable from a surface it never mentions,' +
        ' which looks complete from both ends.',
    ).toEqual([]);
  });

  it('says what kind of note this is, above every note', () => {
    const blank = contentReader
      .noteTargets()
      .filter(({ target }) => !eyebrowOf(read(path.join(DIST, target.path, 'index.html'))))
      .map(({ target }) => target.path);

    expect(
      blank,
      '\nnotes framed with an empty eyebrow. The frame draws the accent rule whether or not it' +
        ' was given words to put beside it, so a missing label renders as a stray dash rather' +
        ' than as nothing.',
    ).toEqual([]);
  });

  // `record_kind` and `pole` say what the note IS, so they read as part of the kind rather than
  // as pills beside the status. Moving them there is only safe if the distinctions survive: two
  // design records on different shelves must not arrive at the same line, and a pattern that
  // names its pole must still show it — the corpus is entirely cautionary today, so a pole that
  // stopped rendering would look exactly like a corpus that never had one.
  it('carries the shelf a design record sits on', () => {
    const byShelf = new Map<string, Set<string>>();
    for (const note of noteFrontmatter('meta')) {
      const shelf = note.data.record_kind ?? '';
      const seen = byShelf.get(shelf) ?? new Set<string>();
      seen.add(eyebrowOf(notePage('meta', note.id)));
      byShelf.set(shelf, seen);
    }

    expect(byShelf.size, '\nonly one shelf in the corpus — this rule is vacuous').toBeGreaterThan(1);

    const eyebrows = [...byShelf.values()].flatMap((set) => [...set]);
    expect(
      eyebrows.length,
      `\nshelves that read identically above a note: ${eyebrows.join(' / ')}`,
    ).toBe(new Set(eyebrows).size);
  });

  it('carries the pole a pattern declares', () => {
    const poled = noteFrontmatter('patterns').filter((note) => note.data.pole);
    expect(poled.length, '\nno pattern declares a pole — this rule is vacuous').toBeGreaterThan(0);

    const dropped = poled
      .filter((note) => !eyebrowOf(notePage('patterns', note.id)).includes(note.data.pole!))
      .map((note) => `patterns/${note.id}`);
    expect(dropped, '\npatterns whose pole does not reach the page').toEqual([]);
  });

  // The seam the kit leaves open: the frame draws the pill and the instance colours it, keyed on
  // the value, so a status added to a schema here costs no release upstream. The cost of the seam
  // is that a value with no rule renders as bare text — legible, unremarkable, and indistinguishable
  // from a status that was styled on purpose.
  it('draws every status the corpus uses as a status, not as bare text', () => {
    const declared = (['meta', 'patterns'] as const).flatMap((collection) =>
      noteFrontmatter(collection)
        .filter((note) => note.data.status)
        .map((note) => ({ page: `${collection}/${note.id}`, status: note.data.status! })),
    );

    expect(declared.length, '\nno note declares a status — this rule is vacuous').toBeGreaterThan(5);

    const unmarked = declared
      .filter((row) => {
        const [collection, ...rest] = row.page.split('/');
        return !notePage(collection!, rest.join('/')).includes(`data-status="${row.status}"`);
      })
      .map((row) => row.page);
    expect(unmarked, '\nnotes declaring a status the page does not mark').toEqual([]);

    const css = emittedCss();
    const unstyled = [...new Set(declared.map((row) => row.status))]
      .filter((status) => !new RegExp(`\\[data-status=["']?${status}["']?\\]`).test(css))
      .sort();
    expect(
      unstyled,
      '\nstatus values with no rule in this stylesheet. The frame gives the pill everything but' +
        ' its colour; unkeyed, it renders as bare text beside the tags.',
    ).toEqual([]);
  });

  // The summary is the note's own one-line answer, and the frame weights it at 10 so it outranks
  // any page that mentions the term in passing. That weight sits on an element no page here draws,
  // so it is reachable only by handing the frame a summary — and the summary used to be gated on
  // the same flag as the heading, which is one answer to two questions. Molds declare a required
  // summary and were showing none of it.
  it('shows the summary of every note that declares one, weighted above its body', () => {
    const declared = COLLECTION_NAMES.flatMap((collection) =>
      noteFrontmatter(collection)
        .filter((note) => typeof note.data.summary === 'string')
        .map((note) => ({ collection, id: note.id, summary: note.data.summary! })),
    );

    expect(declared.length, '\nno note declares a summary — this rule is vacuous').toBeGreaterThan(10);
    expect(
      new Set(declared.map((note) => note.collection)).size,
      '\nevery summary in this corpus belongs to one collection, so a rule that reached only that' +
        ' collection would read as covering the site.',
    ).toBeGreaterThan(1);

    const missing = declared
      .filter(({ collection, id, summary }) => {
        const found = NOTE_SUMMARY.exec(notePage(collection, id));
        return (
          !found ||
          !found[1]!.includes('data-pagefind-weight="10"') ||
          decodeText(found[2]!) !== summary
        );
      })
      .map(({ collection, id }) => `${collection}/${id}`);

    expect(
      missing,
      '\nnotes whose declared summary does not reach the page as a weighted summary. Pagefind' +
        ' indexes what the page shows, so a summary the frame never received ranks nowhere.',
    ).toEqual([]);
  });
});

describe('the component gallery', () => {
  it('is emitted and linked from the design surface', () => {
    const gallery = path.join(DIST, 'gallery', 'index.html');
    expect(existsSync(gallery)).toBe(true);

    const design = read(path.join(DIST, 'design', 'index.html'));
    expect(design).toContain(`href="${baseFrom(home)}/gallery/"`);
  });

  it('renders every shared and SGF specimen case', () => {
    const gallery = read(path.join(DIST, 'gallery', 'index.html'));
    const expectedCases = ALL_SPECIMENS.reduce(
      (total, group) => total + group.specimens.length,
      0,
    );

    expect(
      [...gallery.matchAll(/class="gallery-specimen"/g)],
      'the gallery dropped a specimen case',
    ).toHaveLength(expectedCases);

    for (const group of ALL_SPECIMENS) {
      expect(gallery).toContain(`id="${group.id}"`);
      expect(gallery).toContain(`data-gallery-component="${group.component}"`);
    }

    for (const group of SGF_SPECIMENS) {
      expect(gallery).toContain(`id="${group.id}"`);
      expect(gallery).toContain('data-gallery-origin="sgf"');
    }
  });

  it('builds and frames every specimen that cannot share the gallery page', () => {
    const gallery = read(path.join(DIST, 'gallery', 'index.html'));
    const built = new Set(pages.map(rel));

    expect(STANDALONE_SPECIMEN_PAGES.length).toBeGreaterThan(0);
    expect(
      STANDALONE_SPECIMEN_PAGES.filter((page) => !built.has(page)),
      'standalone specimen routes missing from the build',
    ).toEqual([]);

    for (const page of STANDALONE_SPECIMEN_PAGES) {
      const route = page.replace(/index\.html$/, '');
      expect(gallery).toContain(`src="${baseFrom(home)}/${route}"`);
      expect(read(path.join(DIST, page))).not.toContain('data-pagefind-body');
    }
  });

  it('keeps isolated component routes out of the normal document shell', () => {
    for (const page of BARE_SPECIMEN_PAGES) {
      const html = read(path.join(DIST, page));
      expect(html).toContain('<meta name="robots" content="noindex">');
      expect(html).not.toContain('<footer');
    }
  });

  it('shows both outcomes of the SGF referee loop', () => {
    const gallery = read(path.join(DIST, 'gallery', 'index.html'));
    expect(gallery).toContain('data-referee-loop');
    expect(gallery).toContain('data-verdict="pass"');
    expect(gallery).toContain('data-verdict="revise"');
    expect(gallery).toContain('data-referee-step="gate"');
  });
});

/** Every stylesheet the build emitted, concatenated. The shell's styles are split across several. */
const emittedCss = (): string =>
  readdirSync(path.join(DIST, '_astro'))
    .filter((entry) => entry.endsWith('.css'))
    .map((entry) => read(path.join(DIST, '_astro', entry)))
    .join('\n');

/**
 * Only the `:root` declarations — which is where a token being ALIVE is decided.
 *
 * A token redeclared under `.dark` emits from that rule whichever way, because a class is not
 * tree-shaken. So any question of the form "did this token reach the stylesheet" has to be asked
 * of `:root` alone; asked of the whole file it answers yes for a token nothing reads, on the
 * strength of the dark override sitting right beside the dead declaration.
 */
const rootCss = (): string => (emittedCss().match(/:root[^{]*\{[^}]*\}/g) ?? []).join('');

// Here rather than in a file of its own because it asserts on the same built `dist/`, and a second
// suite that spawns its own `astro build` would double the slowest thing in this repo's test run.
describe('the palette this stylesheet declares', () => {
  // Tailwind 4 emits an `@theme` token only where it finds a reference, so a token nothing uses
  // reaches no stylesheet and costs no bytes — which is why they accumulate unnoticed. Two had:
  // `--color-border`, beside the `--color-border-subtle` that every border on this site actually
  // uses, and `--color-accent-hover` for an accent with no hover state. The first is the shape that
  // matters: a plausible name for a decision this site never took, one line above the real one.
  //
  // `:root` is the load-bearing part — see the note on `rootCss`.
  it('declares no token that reaches no stylesheet', () => {
    const source = read(path.join(SITE, 'src/styles/global.css'));
    const block = source.slice(
      source.indexOf('@theme'),
      source.indexOf('\n}', source.indexOf('@theme')),
    );
    const declared = [...block.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]!);

    const root = rootCss();
    const dead = declared.filter((token) => !root.includes(`${token}:`));

    expect(
      declared.length,
      '\nno tokens parsed out of @theme — has the block moved?',
    ).toBeGreaterThan(10);
    expect(
      dead,
      '\nthese are declared in `@theme` and referenced by nothing, so Tailwind emitted no' +
        ' declaration for them. Delete them, or use them. A token carrying a value that is also' +
        " some other token's is the worst kind: it reads as the right name for a colour that is" +
        ' actually spelled elsewhere.\n\n  ' +
        dead.join('\n  ') +
        '\n',
    ).toEqual([]);
  });
});

describe('the colours this stylesheet asks for', () => {
  // The other direction of the rule above, and the one that had a live case. `--color-galaxy-dark`
  // was the hover colour of the tag chip, inherited from the sibling instance along with the rule
  // — and it is not a token in this palette, which renames every colour for the role it plays
  // here. An undeclared custom property is not an error: the declaration is dropped and the chip
  // keeps whatever colour it had, so the chip reacts to a hover by changing its background and
  // nothing else. The dead-token rule above cannot see this, because the name it names is one
  // nothing ever declared.
  it('declares every token it references', () => {
    const source = read(path.join(SITE, 'src/styles/global.css'));
    // One pass, and the declaration half is what follows the name rather than a second pattern:
    // two regexes over one file are two chances to disagree about what a token name looks like.
    const uses = [...source.matchAll(/(--color-[\w-]+)(\s*:)?/g)];
    const declared = new Set(uses.filter((use) => use[2]).map((use) => use[1]!));
    const referenced = uses.filter((use) => !use[2]).map((use) => use[1]!);

    expect(referenced.length, '\nno token references parsed — has the file moved?').toBeGreaterThan(
      10,
    );

    const undeclared = [...new Set(referenced.filter((token) => !declared.has(token)))].sort();
    expect(
      undeclared,
      '\ntokens this stylesheet reads and never declares. The property resolves to nothing, the' +
        ' declaration is dropped, and the rule around it still applies — so the element keeps' +
        ' whatever it had and looks like a decision.\n\n  ' +
        undeclared.join('\n  ') +
        '\n',
    ).toEqual([]);
  });
});

describe('the stylesheet the shell depends on', () => {
  it('emits a utility that only the kit names', () => {
    const css = emittedCss();

    expect(css).not.toHaveLength(0);
    expect(
      css.includes(KIT_ONLY_UTILITY),
      `\n\`${KIT_ONLY_UTILITY}\` is referenced by the built markup but has no rule in any` +
        ` emitted stylesheet. Tailwind did not scan the package that declares it — check the` +
        ` \`@source\` line in global.css, and see the header comment. The pages will render` +
        ` unstyled, and nothing else reports this.`,
    ).toBe(true);
  });
});

const region = (html: string, open: string, close: string): string =>
  html.slice(html.indexOf(open), html.indexOf(close) + close.length);
const hrefsIn = (nav: string): string[] =>
  [...nav.matchAll(/<a\s[^>]*href="([^"]+)"/g)].flatMap((m) => (m[1] ? [m[1]] : []));
const activeIn = (nav: string): string[] =>
  [...nav.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*aria-current="page"/g)].flatMap((m) =>
    m[1] ? [m[1]] : [],
  );
/** The wordmark is the first link in the header, and it points at the site root. */
const baseFrom = (html: string): string =>
  (/<a\s[^>]*href="([^"]+)"/.exec(region(html, '<header', '</header>'))?.[1] ?? '/').replace(
    /\/$/,
    '',
  );

describe('the navigation', () => {
  // `NAV_LINKS` is data: a path and a label, nothing callable. Which link is active is DERIVED
  // from the path rather than declared per entry, and one derivation now stands in for the
  // per-entry matchers both instances used to carry — so the derivation is what gets asserted,
  // against built pages.
  //
  // Both halves fail quietly. A destination that points at no route renders as a perfectly good
  // link to a 404, and a section that never lights up looks like a page the reader navigated to
  // some other way. Neither shows up in a build log.

  it('emits links under the base the site is configured to deploy at', () => {
    // The assertion that found the `BASE_URL` leak above, stated directly so the next one names
    // itself instead of surfacing as "no section is ever marked active". The pages are served
    // from a subpath; a build that forgets it produces links that all 404 on the deployed site
    // and all resolve locally.
    const configured = /\bbase\s*[:=]\s*["']([^"']+)["']/.exec(
      read(path.join(SITE, 'astro.config.mjs')),
    )?.[1];

    expect(configured, '\nno base in astro.config.mjs — has the config moved?').toBeTruthy();
    expect(baseFrom(home)).toBe(configured);
  });

  it('points every destination at a section the build emitted', () => {
    const missing = NAV_LINKS.filter(
      (link) => !existsSync(path.join(DIST, link.path, 'index.html')),
    );
    expect(
      missing.map((link) => link.path),
      '\nnav destinations with no built index',
    ).toEqual([]);
  });

  it('renders every destination it declares, on the bar or under More', () => {
    // The bar is a slice of the list, so a wrong cut point drops links off the end of the header
    // rather than erroring. Count and membership both, since a duplicate would satisfy the count.
    //
    // Every destination fits on the bar here and the More group renders nothing — which is why
    // this asserts on the set the nav emits rather than on where each link ended up. It holds
    // either way, and it is the assertion that would catch a seventh link going missing.
    const rendered = new Set(hrefsIn(region(home, '<nav', '</nav>')));
    const declared = NAV_LINKS.map((link) => `${baseFrom(home)}${link.path}`);

    expect(declared.filter((href) => !rendered.has(href)), '\ndeclared but not rendered').toEqual(
      [],
    );
    expect(rendered.size).toBe(NAV_LINKS.length);
  });

  it('marks the section the reader is in, and marks no other', () => {
    const base = baseFrom(home);
    const wrong = NAV_LINKS.flatMap((link) => {
      const href = `${base}${link.path}`;
      const under = pages.filter((file) => rel(file).startsWith(link.path.slice(1)));
      // The section index and the last page under it. The rule is "this page or anything beneath
      // it", and the second sample is the half a plain equality check would get wrong.
      return [under[0], under[under.length - 1]]
        .filter((file): file is string => Boolean(file))
        .map((file) => ({
          page: rel(file),
          marked: activeIn(region(read(file), '<nav', '</nav>')),
        }))
        .filter((seen) => seen.marked.length !== 1 || seen.marked[0] !== href);
    });
    expect(wrong, '\npages whose header does not mark exactly their own section').toEqual([]);
  });
});

describe('the footer', () => {
  it('links to the repository and to every extra destination it declares', () => {
    const links = hrefsIn(region(home, '<footer', '</footer>'));
    const declared = FOOTER_LINKS.map((link) => `${baseFrom(home)}${link.path}`);

    expect(links, '\nthe repository link is missing from the footer').toContain(REPO_URL);
    expect(declared.filter((href) => !links.includes(href)), '\ndeclared but not rendered').toEqual(
      [],
    );
    expect(
      FOOTER_LINKS.filter((link) => !existsSync(path.join(DIST, link.path, 'index.html'))).map(
        (link) => link.path,
      ),
      '\nfooter destinations with no built index',
    ).toEqual([]);
  });

  it('puts no clock in the output', () => {
    // The copyright line used to read `© ${new Date().getFullYear()}`, which runs at BUILD time:
    // the page reported when it was last deployed, and the same commit rendered differently on
    // either side of a new year. Every check this shell has is a diff against built output, and a
    // build that is not reproducible from its source makes those diffs unreadable.
    const stamped = pages.filter((file) => /\b(19|20)\d{2}\b/.test(region(read(file), '<footer', '</footer>')));
    expect(stamped.map(rel), '\npages whose footer carries a year').toEqual([]);
  });
});

describe('the container width', () => {
  // One decision, so it is asserted as one: the three regions have to agree, and a width that
  // disagrees in one of them reads as a subtly misaligned page and as nothing else. The kit now
  // holds the measure as a single constant, which is what makes them agree — so what this catches
  // is a region that lost the class on the way to the page, not three copies drifting apart.
  const widthsIn = (html: string, open: string, close: string): string[] => {
    const region = html.slice(html.indexOf(open), html.indexOf(close) + close.length);
    return [...region.matchAll(/max-w-(\d?xl|none|full)/g)].map((m) => m[0]);
  };

  it('is the same in the header, the main column and the footer', () => {
    const main = /<main[^>]*\bclass="([^"]*)"/.exec(home)?.[1] ?? '';
    const mainWidth = /max-w-\S+/.exec(main)?.[0];

    expect(mainWidth, '\nno max-w-* on <main>').toBeDefined();
    expect(new Set(widthsIn(home, '<header', '</header>'))).toEqual(new Set([mainWidth]));
    expect(new Set(widthsIn(home, '<footer', '</footer>'))).toEqual(new Set([mainWidth]));
  });
});

/** Pages the search box will never return: framed specimen routes, not reader destinations. */
const UNSEARCHABLE: string[] = [...STANDALONE_SPECIMEN_PAGES].sort();

describe('what the search box can find', () => {
  // Pagefind's rule is all-or-nothing and runs BACKWARDS from what the attribute looks like. Mark
  // no page with `data-pagefind-body` and every page is indexed from its `<body>`. Mark ONE and
  // every unmarked page leaves the index entirely.
  //
  // Nine routes carried it here, and the index held 168 of these 213 pages. The missing 45 were
  // all 38 tag pages, the six section landing pages, and the home page — every listing route on
  // the site, which is where a reader who does not already know a note's name would look.
  //
  // Nothing reported it. The build log prints "Pagefind indexed 213 pages" whichever way, because
  // it counts pages processed rather than pages indexed. No warning, no diff, no page that looks
  // wrong; the only symptom is a search answering "no results" for words plainly on the page.
  //
  // So this asserts on the emitted INDEX rather than on the markup. A source-level check confirms
  // the attribute was written; only the index confirms a reader can find the page.
  const indexedPageCount = (): number => {
    const entry = JSON.parse(read(path.join(DIST, 'pagefind/pagefind-entry.json'))) as {
      languages: Record<string, { page_count: number }>;
    };
    return Object.values(entry.languages).reduce((total, lang) => total + lang.page_count, 0);
  };

  it('holds every page the build emitted, less the ones declared unsearchable', () => {
    expect(indexedPageCount()).toBe(pages.length - UNSEARCHABLE.length);
  });

  it('marks the main column rather than falling back to the whole body', () => {
    const unmarked = pages.filter((file) => !read(file).includes('data-pagefind-body'));
    expect(unmarked.map(rel).sort(), '\nemitted but unfindable').toEqual(UNSEARCHABLE);
  });

  it('puts the attribute on <main>, so chrome stays out of the excerpt', () => {
    // One decision in the layout, rather than nine wrappers each route had to remember. Marking
    // `<main>` also keeps the nav and footer out of every result's excerpt, which the per-route
    // wrappers were already doing and the `<body>` fallback would not.
    expect(home).toMatch(/<main[^>]*\sdata-pagefind-body/);
  });
});

/**
 * What each Mold's `references:` declares, read from the corpus.
 *
 * Counted from the frontmatter rather than pinned as a number, because the claim is that every
 * reference an author wrote reaches the page. A pinned total keeps passing while a twelfth Mold's
 * manifest goes nowhere, which is the failure this whole block exists to name.
 */
function declaredReferences(): Map<string, number> {
  return new Map(
    noteFrontmatter('molds').map((note) => [note.id, note.data.references?.length ?? 0]),
  );
}

describe('the reference manifest a Mold declares', () => {
  // This site loaded `@galaxy-foundry/reference-contract`, composed its own `kinds` against the
  // four inherited vocabularies, wired the result into the kind context, and validated every
  // entry of every Mold's `references:` at build time — including two cross-field rules. Then it
  // rendered none of it. Eleven Molds, 104 typed references, and no component that read one.
  //
  // Nothing failed. The schema is a gate, not a view, so a manifest that passes validation and
  // reaches no page looks exactly like a manifest that reaches a page: the build is green, the
  // Mold's prose renders, and the only symptom is a section that was never there to miss.
  //
  // The card is `@galaxy-foundry/site-kit`'s, not this repo's. The parent Foundry had written one
  // and this one had written nothing, which is the same defect twice — a package that shipped the
  // vocabulary and left the view to whoever got round to it.
  const cardsOn = (id: string): number =>
    read(path.join(DIST, 'molds', id, 'index.html')).match(/class="reference-card"/g)?.length ?? 0;

  it('has manifests worth asserting about', () => {
    // Guards the guard. Every assertion below is vacuously true against a corpus that declares
    // nothing, and this block would then report green on the very state it exists to catch.
    const declared = [...declaredReferences().values()];
    expect(declared.filter((count) => count > 0).length).toBeGreaterThan(5);
    expect(declared.reduce((total, count) => total + count, 0)).toBeGreaterThan(100);
  });

  it('renders one card per entry, on every Mold that declares one', () => {
    const missing = [...declaredReferences()]
      .map(([id, declared]) => ({ mold: id, declared, rendered: cardsOn(id) }))
      .filter((row) => row.rendered !== row.declared);
    expect(missing, '\nMolds whose page shows a different number of references than it declares')
      .toEqual([]);
  });

  it('shows each term as the vocabulary labels it, not as the key it was authored with', () => {
    // The chips are looked up through the contract, so a card that renders raw keys is a card
    // that got the manifest and lost the vocabulary — which reads as a styling choice rather
    // than as a broken lookup.
    const page = read(path.join(DIST, 'molds/audit-wgd-inference/index.html'));
    expect(page).toContain('Corpus Observed');
    expect(page).toContain('Research');
  });

  it('declares an evidence term\'s standing as data rather than by its name', () => {
    // `corpus-observed` and `cast-validated` are both grounded, and a stylesheet that lists the
    // two term names instead has no opinion at all about the third the day it is authored.
    const page = read(path.join(DIST, 'molds/audit-wgd-inference/index.html'));
    expect(page).toMatch(/data-standing="grounded"/);
  });

  it('supplies every colour the shared card names', () => {
    // The kit's own contract, asked here rather than restated: a component under `node_modules`
    // names role tokens this repo has to define, and a missing one renders as an invisible chip
    // on a page that is otherwise fine.
    //
    // Asked of `:root`, not of the whole stylesheet. The first version of this passed with all
    // four `--color-evidence-*` tokens tree-shaken out of `:root`, on the strength of the `.dark`
    // overrides beside them — the trap the palette block above was written about, walked straight
    // into one screen below it.
    expect(
      referenceStyleGaps(rootCss()),
      '\nrole tokens the shared reference card reads and this stylesheet does not declare',
    ).toEqual([]);
  });

  it('supplies every colour the shared licence components name', () => {
    // The same contract, two more components. These three were literals in this stylesheet —
    // `#16a34a`, `#d97706`, `#dc2626` — and the identical three sat in a sibling instance's
    // component. Naming them is what let the chip move; declaring them is now ours, and an
    // undeclared property inside `color-mix()` is a chip with no background and no error.
    expect(
      licenseBadgeStyleGaps(rootCss()),
      '\nrole tokens the licence badge reads and this stylesheet does not declare',
    ).toEqual([]);
    expect(
      licenseFileStyleGaps(rootCss()),
      '\nrole tokens the licence-file body reads and this stylesheet does not declare',
    ).toEqual([]);
  });

  it('supplies every colour the shared content frame names', () => {
    expect(
      contentReaderStyleGaps(rootCss()),
      '\nrole tokens the shared content frame reads and this stylesheet does not declare',
    ).toEqual([]);
  });

  it('supplies every colour the shared note frame names', () => {
    // The widest blast radius of the four: the frame sits above the body of every note in the
    // corpus, so a token it reads and this stylesheet never declares is a rule missing from every
    // note page at once — and each one still renders, which is why nothing else reports it.
    expect(
      noteHeaderStyleGaps(rootCss()),
      '\nrole tokens the shared note frame reads and this stylesheet does not declare',
    ).toEqual([]);
  });
});
