import type { APIRoute } from 'astro';
import { posts } from '../data/blog-posts';
import { doctors } from '../data/doctors';
import fs from 'node:fs';
import path from 'node:path';

export const prerender = true;

const SITE = 'https://www.ilaaj.ai';
const TODAY = new Date().toISOString().split('T')[0];

type Alt = { hreflang: string; loc: string };

// Build one <url> block with reciprocal hreflang alternates for the whole cluster.
function url(loc: string, lastmod: string, changefreq: string, priority: string, alts: Alt[]) {
  const links = alts
    .map(a => `\n    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${SITE}${a.loc}" />`)
    .join('');
  return `\n  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>${links}\n  </url>`;
}

// Static pages: en + pk (+ ur for home). x-default points to en.
const staticPages = [
  { en: '/', pk: '/pk', ur: '/ur', priority: '1.0', changefreq: 'daily' },
  { en: '/blog', pk: '/pk/blog', ur: undefined, priority: '0.9', changefreq: 'weekly' },
  { en: '/doctors', pk: '/pk/doctors', ur: undefined, priority: '0.8', changefreq: 'monthly' },
  { en: '/faq', pk: '/pk/faq', ur: undefined, priority: '0.7', changefreq: 'monthly' },
  { en: '/support', pk: '/pk/support', ur: undefined, priority: '0.5', changefreq: 'monthly' },
  { en: '/privacy-policy', pk: '/pk/privacy-policy', ur: undefined, priority: '0.3', changefreq: 'yearly' },
  { en: '/terms-and-conditions', pk: '/pk/terms-and-conditions', ur: undefined, priority: '0.3', changefreq: 'yearly' },
];

function clusterAlts(en: string, pk: string, ur?: string): Alt[] {
  const alts: Alt[] = [{ hreflang: 'en', loc: en }, { hreflang: 'en-PK', loc: pk }];
  if (ur) alts.push({ hreflang: 'ur', loc: ur });
  alts.push({ hreflang: 'x-default', loc: en });
  return alts;
}

const hasEn = (slug: string) => fs.existsSync(path.join(process.cwd(), 'blog', 'en', `${slug}.html`));

export const GET: APIRoute = () => {
  const staticEntries = staticPages
    .flatMap(p => {
      const alts = clusterAlts(p.en, p.pk, p.ur);
      const locs = [p.en, p.pk, ...(p.ur ? [p.ur] : [])];
      return locs.map(loc => url(loc, TODAY, p.changefreq, p.priority, alts));
    })
    .join('');

  // Posts: pk version always indexable; en version only when an EN source file exists.
  // Skip posts still scheduled for the future — no point submitting a URL Google will
  // just find noindex on (see blog/[slug].astro's isFuture check).
  const postEntries = posts
    .filter(p => !p.scheduled || p.scheduled <= TODAY)
    .flatMap(p => {
      const lastmod = p.scheduled ?? new Date(p.date).toISOString().split('T')[0];
      const enLoc = `/blog/${p.slug}`;
      const pkLoc = `/pk/blog/${p.slug}`;
      const en = hasEn(p.slug);
      const alts: Alt[] = [{ hreflang: 'en-PK', loc: pkLoc }];
      if (en) { alts.unshift({ hreflang: 'en', loc: enLoc }); alts.push({ hreflang: 'x-default', loc: enLoc }); }
      else { alts.push({ hreflang: 'x-default', loc: pkLoc }); }
      const out = [url(pkLoc, lastmod, 'monthly', '0.6', alts)];
      if (en) out.unshift(url(enLoc, lastmod, 'monthly', '0.6', alts));
      return out;
    })
    .join('');

  const doctorEntries = doctors
    .flatMap(d => {
      const en = `/doctors/${d.slug}`;
      const pk = `/pk/doctors/${d.slug}`;
      const alts = clusterAlts(en, pk);
      return [url(en, TODAY, 'monthly', '0.6', alts), url(pk, TODAY, 'monthly', '0.6', alts)];
    })
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${staticEntries}${postEntries}${doctorEntries}\n</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
