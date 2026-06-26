import fs from 'node:fs';
import { marked } from './marked';
import { resolveWikiLink, type WikiLinkTarget } from './wiki-links';

/** Replace `[[wiki links]]` with resolved markdown links (bold fallback when unresolved). */
export function resolveWikiLinks(
  raw: string,
  linkMap: Map<string, WikiLinkTarget>,
  base: string,
): string {
  return raw.replace(/\[\[([^\[\]]+)\]\]/g, (_, inner) => {
    const { href, label } = resolveWikiLink(`[[${inner}]]`, linkMap, base);
    return href ? `[${label}](${href})` : `**${label}**`;
  });
}

/**
 * Load a loose markdown vault doc (e.g. glossary), resolve [[wiki links]], render to HTML,
 * and inject anchor ids on **Term** paragraphs so #term links resolve.
 */
export function renderVaultDoc(
  absPath: string,
  linkMap: Map<string, WikiLinkTarget>,
  base: string,
): string {
  const raw = fs.readFileSync(absPath, 'utf-8');
  const withLinks = resolveWikiLinks(raw, linkMap, base);
  const html = marked.parse(withLinks, { async: false }) as string;
  return addBoldTermAnchors(html);
}

function slugifyTerm(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Glossary entries are paragraphs starting with **Term**. Inject an id on the
// containing <p> so #term anchor links resolve.
function addBoldTermAnchors(html: string): string {
  return html.replace(/<p>(\s*)<strong>([^<]+)<\/strong>/g, (match, ws, term) => {
    const id = slugifyTerm(term);
    if (!id) return match;
    return `<p id="${id}">${ws}<strong>${term}</strong>`;
  });
}
