import { buildWikiLinkMap, resolveWikiLink, type WikiLinkTarget } from './wiki-links';
import { DESIGN_DOCS } from './design-docs';

// Rewrites `[[wiki links]]` in content-collection markdown (papers/tutorials/molds/
// books/patterns) that Astro renders via `<Content />`. The `marked`-based vault-doc
// path (glossary/design docs) handles its own resolution; this is the remark twin so
// the two pipelines share one link map + resolver. Backtick-wrapped `[[x]]` (the
// citation-token style) resolves too — inlineCode nodes whose whole value is a single
// wiki link become monospace links.

const WIKI = /\[\[([^\[\]]+)\]\]/g;
const WIKI_ONLY = /^\[\[([^\[\]]+)\]\]$/;

type MdNode = {
  type: string;
  value?: string;
  url?: string;
  children?: MdNode[];
};

function linkNode(
  inner: string,
  map: Map<string, WikiLinkTarget>,
  base: string,
  asCode: boolean,
): MdNode {
  const { href, label } = resolveWikiLink(`[[${inner}]]`, map, base);
  const leaf: MdNode = asCode ? { type: 'inlineCode', value: label } : { type: 'text', value: label };
  if (href) return { type: 'link', url: href, children: [leaf] };
  // Unresolved: drop the brackets (no raw `[[…]]` leak); bold for prose, keep mono for code.
  return asCode ? leaf : { type: 'strong', children: [leaf] };
}

function splitText(value: string, map: Map<string, WikiLinkTarget>, base: string): MdNode[] {
  const out: MdNode[] = [];
  let last = 0;
  const re = new RegExp(WIKI.source, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(value))) {
    if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
    out.push(linkNode(m[1], map, base, false));
    last = m.index + m[0].length;
  }
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
  return out;
}

function transform(node: MdNode, map: Map<string, WikiLinkTarget>, base: string): void {
  if (!node.children) return;
  const out: MdNode[] = [];
  for (const child of node.children) {
    if (child.type === 'text' && child.value && child.value.includes('[[')) {
      out.push(...splitText(child.value, map, base));
    } else if (child.type === 'inlineCode' && child.value) {
      const only = child.value.trim().match(WIKI_ONLY);
      out.push(only ? linkNode(only[1], map, base, true) : child);
    } else {
      transform(child, map, base);
      out.push(child);
    }
  }
  node.children = out;
}

export default function remarkWikiLinks({ base = '' }: { base?: string } = {}) {
  const map = buildWikiLinkMap(DESIGN_DOCS);
  return (tree: MdNode) => transform(tree, map, base);
}
