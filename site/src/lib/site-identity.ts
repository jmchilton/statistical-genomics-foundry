// What makes this site THIS site, in one place.
//
// The shell — Base, Header, Footer — is within a handful of lines of the parent Foundry's, and
// every one of those lines is a value rather than a decision: the name in the wordmark, the name
// in the footer, the description, the width of the column, where the nav goes. Naming them here is
// worth doing on its own terms, and it is also what would have to happen first if the shell were
// ever to be shared: what remains after this is markup, and markup is the part that could move.
//
// Base.astro and Header.astro are now byte-identical to the parent's. That is the measure of how
// much of the shell was ever this site's: two files, and the difference between them was entirely
// the values below.
//
// The two names are one string here and two over there — that instance is "Foundry" in its own
// header and "Galaxy Workflow Foundry" at the bottom of the page. Both are declared anyway, so
// the two files have the same shape and a reader comparing them is comparing values.

/** Short name: the header wordmark and the `<title>` suffix. */
export const SITE_NAME = 'Statistical Genomics Foundry';

/** Full name: the footer, and the first words of the description. */
export const SITE_FULL_NAME = 'Statistical Genomics Foundry';

/** Default `<meta name="description">`, and the og/twitter pair built from it. */
export const SITE_DESCRIPTION =
  'Statistical Genomics Foundry — a knowledge base for productive, statistically honest genomics analysis.';

export const REPO_URL = 'https://github.com/jmchilton/statistical-genomics-foundry';

/**
 * A destination in the shell's chrome.
 *
 * `path` is site-absolute and carries no base — `BASE_URL` is applied where the link is rendered.
 * That keeps these plain lists: no closures, nothing an environment variable has to resolve, so
 * they can be serialized, read from a file, or handed to a shared component as props.
 */
export type ShellLink = { path: string; label: string };

/**
 * The primary navigation, in order.
 *
 * Active state is DERIVED from `path`: a link is active on its own page and on everything under
 * it. Every entry used to carry that rule as its own `match` closure, and fifteen of the sixteen
 * across the two instances were the same single line — all six here among them. The sixteenth, on
 * the parent's Pipelines entry, excluded a route pair that has never existed in either repo.
 */
export const NAV_LINKS: ShellLink[] = [
  { path: '/books/', label: 'Books' },
  { path: '/papers/', label: 'Papers' },
  { path: '/tutorials/', label: 'Tutorials' },
  { path: '/design/', label: 'Design' },
  { path: '/tags/', label: 'Tags' },
  { path: '/glossary/', label: 'Glossary' },
];

/**
 * How many of them stay on the bar. Everything after goes under "More".
 *
 * A count, not a claim about which sections matter — it is set by what fits, and what fits differs
 * between the two instances because the wordmark does. This one is 279px against the parent's
 * 75px, about four links' worth, which is why the parent overflows at five and this bar carries
 * all six: measured against the built page at the 1152px bound, six links plus the search box
 * still leave 189px of slack.
 *
 * So the "More" group is here and renders nothing, which is the intended state and not a stub. Add
 * a seventh destination without touching this number and the seventh is the one that moves.
 */
export const NAV_VISIBLE = 6;

/**
 * Destinations the footer offers beside the repository, which it always links.
 *
 * One entry here, and none in the parent. That is the whole of what the two footers disagreed
 * about once the copyright line went: the corpus this site is built around has an obvious front
 * door, so the footer names it a second time; the parent's has no single equivalent.
 *
 * The list renders in order, before the repository link.
 */
export const FOOTER_LINKS: ShellLink[] = [{ path: '/books/', label: 'Books' }];

/**
 * The measure of the reading column, as a Tailwind class.
 *
 * NOT this site's to choose, unlike everything above it — both instances now carry the same value.
 * This one used to be one step narrower than the parent's, and that difference was never
 * decided: this shell was copied from that one two months later, and the width changed in the same
 * edit as the name and the description. Neither repo touched it again.
 *
 * Nor does either corpus defend a value. The prose measure is set by narrowing locally on the
 * pages that want it — this instance does that a dozen times, two and three steps in, across
 * eight index pages — so this is only the outer bound for tables and grids, where the parent has
 * the heavier load.
 *
 * It lives here because it has to live somewhere until the shell is shared, and it is the first
 * thing that should LEAVE this file when it is: a shared component can hold one measure and take
 * no prop for it.
 *
 * Two notes on spelling, one mechanism behind both: Tailwind finds utilities by scanning source
 * TEXT, comments included. So the value is written out in full rather than assembled — from
 * pieces (`max-w-${size}`) it would find nothing, emit no rule, and the page would build clean and
 * render full-bleed. And the widths above are described rather than named, because this file
 * briefly shipped a rule for a width nothing used, on the strength of a comment mentioning it.
 *
 * Base, Header and Footer each carried a copy of this, free to disagree —
 * `tests/built-shell.test.ts` asserts the three agree.
 */
export const CONTAINER = 'max-w-6xl';
