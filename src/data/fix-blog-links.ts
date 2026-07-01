import { posts } from './blog-posts';

// Legacy blog bodies (blog/**.html) contain old flat links like
// `../acne-ka-ilaj.html` (resolves to a dead root URL) or `bukhar-ka-ilaj.html`.
// This rewrites them to the current Astro routes so no internal link 404s.

const valid = new Set(posts.map((p) => p.slug));

// Renamed/merged posts → canonical slug.
const ALIAS: Record<string, string> = {
  'diabetes-ka-ilaj': 'sugar-ka-ilaj',
};

// Non-blog pages that appear as legacy `.html` links.
const PAGES = new Set([
  'privacy-policy', 'terms-and-conditions', 'support', 'doctors', 'faq',
  'pricing', 'refund-policy', 'return-policy', 'shipping-policy',
]);

// base: '' for en (root), '/pk' or '/ur' for localized routes.
export function fixBlogLinks(html: string, base = ''): string {
  const resolve = (raw: string, b: string): string => {
    const slug = ALIAS[raw] ?? raw;
    if (slug === 'index') return b || '/';
    if (slug === 'blog') return `${b}/blog`;
    if (PAGES.has(slug)) return `${b}/${slug}`;
    if (valid.has(slug)) return `${b}/blog/${slug}`;
    return `${b}/blog`; // safe fallback — never 404
  };

  return html
    // absolute links to a dead/renamed post (leave valid ones untouched);
    // keep each link's own locale prefix (/pk, /ur or none).
    .replace(/href="https:\/\/www\.ilaaj\.ai(\/pk|\/ur)?\/blog\/([a-z0-9-]+)"/g,
      (m, loc, s) => (valid.has(s) ? m : `href="${resolve(s, loc || '')}"`))
    // relative `../…/[pk|ur/]blog/slug.html`
    .replace(/href="(?:\.\.\/)+(?:(pk|ur)\/)?blog\/([a-z0-9-]+)\.html"/g,
      (_m, loc, s) => `href="${resolve(s, loc ? '/' + loc : '')}"`)
    // relative `../…/slug.html`
    .replace(/href="(?:\.\.\/)+([a-z0-9-]+)\.html"/g,
      (_m, s) => `href="${resolve(s, base)}"`)
    // plain relative `slug.html`
    .replace(/href="([a-z0-9-]+)\.html"/g,
      (_m, s) => `href="${resolve(s, base)}"`);
}
