import type { SiteIdentity } from '@galaxy-foundry/site-kit';

// What makes this site THIS site, in one place.
//
// The shell itself is no longer here. Base, Header and Footer became byte-identical to the parent
// Foundry's, one value at a time, and then moved to @galaxy-foundry/site-kit — so what is left in
// this repo is the composition point in `layouts/Base.astro` and the values below. The kit ships
// the shape; this file is the whole of the answer.
//
// The two names are one string here and two over there — that instance is "Foundry" in its own
// header and "Galaxy Workflow Foundry" at the bottom of the page. Both are declared anyway, so
// the two files have the same shape and a reader comparing them is comparing values.
//
// The container width used to live here and does not any more. Both instances had converged on the
// same measure before the shell moved, so the kit holds it and takes no prop for it; see CONTAINER
// there for why re-opening it as a parameter would be the wrong trade.

export const SITE_IDENTITY: SiteIdentity = {
  /** Short name: the header wordmark and the `<title>` suffix. */
  name: 'Statistical Genomics Foundry',

  /** Full name: the footer, and the first words of the description. */
  fullName: 'Statistical Genomics Foundry',

  /** Default `<meta name="description">`, and the og/twitter pair built from it. */
  description:
    'Statistical Genomics Foundry — a knowledge base for productive, statistically honest genomics analysis.',

  repoUrl: 'https://github.com/jmchilton/statistical-genomics-foundry',

  /**
   * The primary navigation, in order.
   *
   * Active state is DERIVED from `path`: a link is active on its own page and on everything under
   * it. Every entry used to carry that rule as its own `match` closure, and fifteen of the sixteen
   * across the two instances were the same single line — all six here among them. The sixteenth, on
   * the parent's Pipelines entry, excluded a route pair that has never existed in either repo.
   */
  navLinks: [
    { path: '/books/', label: 'Books' },
    { path: '/papers/', label: 'Papers' },
    { path: '/tutorials/', label: 'Tutorials' },
    { path: '/design/', label: 'Design' },
    { path: '/tags/', label: 'Tags' },
    { path: '/glossary/', label: 'Glossary' },
  ],

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
  navVisible: 6,

  /**
   * Destinations the footer offers beside the repository, which it always links.
   *
   * One entry here, and none in the parent. That is the whole of what the two footers disagreed
   * about once the copyright line went: the corpus this site is built around has an obvious front
   * door, so the footer names it a second time; the parent's has no single equivalent.
   *
   * The list renders in order, before the repository link.
   */
  footerLinks: [{ path: '/books/', label: 'Books' }],
};
