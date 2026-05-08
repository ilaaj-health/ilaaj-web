import type { APIRoute } from 'astro';
import { posts } from '../data/blog-posts';

export const prerender = true;

const SITE = 'https://www.ilaaj.ai';
const TODAY = new Date().toISOString().split('T')[0];

const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/blog', priority: '0.9', changefreq: 'weekly' },
  { loc: '/doctors', priority: '0.8', changefreq: 'monthly' },
  { loc: '/ur', priority: '0.8', changefreq: 'weekly' },
  { loc: '/faq', priority: '0.7', changefreq: 'monthly' },
  { loc: '/support', priority: '0.5', changefreq: 'monthly' },
  { loc: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { loc: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' },
];

function entry(loc: string, lastmod: string, changefreq: string, priority: string) {
  return `\n  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

export const GET: APIRoute = () => {
  const published = posts;

  const staticEntries = staticPages
    .map(p => entry(p.loc, TODAY, p.changefreq, p.priority))
    .join('');

  const postEntries = published
    .map(p => {
      const lastmod = p.scheduled ?? new Date(p.date).toISOString().split('T')[0];
      return entry(`/blog/${p.slug}`, lastmod, 'monthly', '0.6');
    })
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticEntries}${postEntries}\n</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
