// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkWikiLinks from './src/lib/remark-wiki-links.ts';

const base = '/statistical-genomics-foundry';

export default defineConfig({
  site: 'https://jmchilton.github.io',
  base,
  integrations: [pagefind()],
  markdown: {
    remarkPlugins: [remarkMath, [remarkWikiLinks, { base }]],
    rehypePlugins: [rehypeKatex],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
