import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';

// Shared marked instance for loose vault docs (glossary, design records).
// KaTeX renders $inline$ and $$display$$ math; throwOnError:false degrades
// gracefully on malformed expressions instead of failing the build.
marked.use(markedKatex({ throwOnError: false, output: 'html' }));

export { marked };
