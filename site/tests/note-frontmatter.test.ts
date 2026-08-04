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

import { describe, expect, it } from 'vitest';

import { siteRelative, siteSourceCode, siteSourceFiles } from './site-sources';

// `e.data as any`, `(entry.data as any)` — any receiver, any spacing.
const ERASES_FRONTMATTER = /\.data\s+as\s+any\b/;

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
});
