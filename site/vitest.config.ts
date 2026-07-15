import { defineConfig } from 'vitest/config';

// The repo's first test runner (issue #89 rung 3), matching the parent Foundry's vitest
// setup. Tests import the shared frontmatter contract (src/lib/frontmatter-schema.ts)
// directly — no Astro runtime — so they double as the standalone validator.
export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
