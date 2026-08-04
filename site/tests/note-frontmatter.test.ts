// A note's frontmatter is read as the union it is, all the way to the page.
//
// This rule has never been broken here, and it is written down anyway. The detail route asks
// `entry.collection` and each branch reads the fields that collection's schema declares, so the
// union has always arrived intact — but nothing said it had to. What keeps it true today is that
// six collections and two components are few enough to hold in your head while editing, which is
// a property of the corpus's size and not of anything this repo decided.
//
// The sibling instance is where it went wrong, and the shape of it is worth having on record
// because none of it looked like a mistake from inside the file that had it. Twenty-two files
// there opened with `const data = entry.data as any`, and under that cast:
//
//   - a label table keyed `Record<string, string>` covered eight of ten kinds, with the raw type
//     string as the fallback. Two kinds printed `cli-tool` and `prompt` as their own labels, on
//     every one of their pages.
//   - "what do I call this note" was answered six times privately. Five of the six omitted a
//     branch the sixth had, so a whole kind was titled from its slug everywhere except its own
//     header — `Add`, `List`, `Convert`, `Validate`, each unqualified in a list of links.
//   - a component re-described a nine-field frontmatter shape that the schema already built,
//     because the package had widened it to `unknown` on the way out.
//
// Every one of those builds green. The cast is what makes them invisible: an absent field reads
// as undefined and renders as nothing, which is indistinguishable from a corpus that has nothing
// to render.
//
// The rule is the ERASURE, not the correct expression. A component that renders one collection
// takes that collection's entry and needs no cast; a reader that ranges over collections narrows
// with `in`. So any site of this is either a component that has not said what it renders, or a
// field no schema declares.
//
// TWO SPELLINGS, and the second is here because the sibling shipped the first alone and eleven
// live sites survived it — four in files that same change had just edited. `entry.data as any` is
// the obvious form. `(ref: any) =>` on a callback over a value that came from frontmatter, and
// `phases: any[]` as a component prop, erase the same thing one line further from the word `data`;
// the prop was the worst of them, because the caller had already got the type right and the
// component threw it away on arrival. Rather than chase spellings, the second rule asks where
// `any` appears in type position at all.
//
// The expected list is empty here, and there is no exception list, because nothing on this site
// walks a shape this repo does not define. The sibling exempts exactly one module — the one that
// renders a JSON Schema, whose nodes really are whatever the document says. Should a module here
// ever need that, it earns a named entry and a comment, not a loosened pattern.
//
// ONE THING NEITHER RULE ASKS, recorded because the sibling measured it and this site relies on
// the answer without saying so. `in` narrows the VALUE and never checks the KEY: `'nope' in d &&
// d.nope` compiles, yielding `unknown`. The detail route asks `'title' in d`, `'tags' in d` and
// `'summary' in d`, and a key renamed in every schema that declared it would survive all three —
// each is caught instead by what it flows INTO, because `Base`'s title and description are
// `string` and `TagChips` takes `string[]`. That is real protection and it is incidental: the day
// one of those values feeds a truthiness check instead of a typed prop, it stops. The sibling hit
// exactly that with its license box and now writes such keys as `'license' satisfies NoteField`.
// Three call sites did not justify importing the machinery here; a fourth that reads a field into
// a boolean would.

import { describe, expect, it } from 'vitest';

import { siteRelative, siteSourceCode, siteSourceFiles } from './site-sources';

// `e.data as any`, `(entry.data as any)` — any receiver, any spacing.
const ERASES_FRONTMATTER = /\.data\s+as\s+any\b/;

// `any` in TYPE POSITION: `as any`, `: any`, `any[]`, `Record<string, any>`. Not the English word
// — `siteSourceCode` removes comments but not the prose a page renders, and page copy says "any".
const ERASES_BY_ANNOTATION = /\bas any\b|:\s*any\b|\bany\[\]|,\s*any>/;

describe("a note's frontmatter", () => {
  it('is never read through `any`', () => {
    const erasers = siteSourceFiles()
      .filter((file) => ERASES_FRONTMATTER.test(siteSourceCode(file)))
      .map(siteRelative)
      .sort();

    expect(
      erasers,
      '\nthese read note frontmatter through `any`. A component that renders one collection should' +
        " declare it — `entry: CollectionEntry<'molds'>` — and a reader that ranges over" +
        ' collections should narrow with `in`. Under `any` a field no schema declares reads as' +
        ' undefined and renders as nothing.\n\n  ' +
        erasers.join('\n  ') +
        '\n',
    ).toEqual([]);
  });

  it('is not erased a second time by an untyped callback or prop', () => {
    const sayers = siteSourceFiles()
      .filter((file) => ERASES_BY_ANNOTATION.test(siteSourceCode(file)))
      .map(siteRelative)
      .sort();

    expect(
      sayers,
      '\n`any` in type position. The rule above catches `entry.data as any` and nothing else, so' +
        ' it does not see `(ref: any) =>` over a value read from frontmatter, or `any[]` as a' +
        ' prop — the same erasure, one line further from the word `data`. If a module genuinely' +
        ' walks a shape this repo does not define, give it a named exception here and say why.' +
        '\n\n  ' +
        sayers.join('\n  ') +
        '\n',
    ).toEqual([]);
  });
});
