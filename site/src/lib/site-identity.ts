// What makes this site THIS site, in one place.
//
// The shell — Base, Header, Footer — is within a handful of lines of the parent Foundry's, and
// every one of those lines is a value rather than a decision: the name in the wordmark, the name
// in the footer, the description, the width of the column. Naming them here is worth doing on its
// own terms, and it is also what would have to happen first if the shell were ever to be shared:
// what remains after this is markup, and markup is the part that could move.
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
 * The measure of the reading column, as a Tailwind class.
 *
 * Written out in full because Tailwind finds utilities by scanning source text: assembled from
 * pieces (`max-w-${size}`) it would find nothing and emit no rule, and the page would build clean
 * and render full-bleed. Base, Header and Footer had a copy of this each, free to disagree —
 * `tests/built-shell.test.ts` now asserts the three agree, which is what makes this safe to move.
 */
export const CONTAINER = 'max-w-5xl';
