// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkWikiLinks from './src/lib/remark-wiki-links.ts';

const base = '/statistical-genomics-foundry';

export default defineConfig({
  site: 'https://jmchilton.github.io',
  base,
  // Astro 7 defaults this to 'jsx', which drops the whitespace between inline elements that
  // sit on their own source lines. Pinned to the pre-7 behaviour.
  compressHTML: true,
  integrations: [pagefind()],
  // Astro 7 renders markdown with Sätteri by default, which runs no remark or rehype plugins.
  // Math (remark-math + rehype-katex) and `[[wiki-links]]` are both load-bearing here, so the
  // remark pipeline is opted back into explicitly.
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, [remarkWikiLinks, { base }]],
      rehypePlugins: [rehypeKatex],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
