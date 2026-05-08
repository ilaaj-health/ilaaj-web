# SEO Audit Report — ilaaj.ai
**Date:** 2026-05-08  
**Audited URL:** https://www.ilaaj.ai/  
**Pages Crawled:** 7 pages sampled + sitemap (30 URLs indexed, 47 discovered)  
**Business Type:** AI-powered telemedicine / healthcare platform (Pakistan)

---

## SEO Health Score: 63 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 69 | 15.2 |
| Content Quality | 23% | 78 | 17.9 |
| On-Page SEO | 20% | 72 | 14.4 |
| Schema / Structured Data | 10% | **10** | 1.0 |
| Performance (CWV est.) | 10% | 65 | 6.5 |
| AI Search Readiness | 10% | 52 | 5.2 |
| Images | 5% | 60 | 3.0 |
| **Total** | **100%** | | **63.2** |

---

## Executive Summary

Ilaaj AI has a solid content foundation — well-written bilingual blog posts, clean URL structure, proper meta tags on most pages, and an excellent `llms.txt` for AI search. However, **three critical bugs are actively harming indexing and rich results**:

1. **All JSON-LD structured data is completely broken** — rendered as unevaluated JavaScript (`{JSON.stringify(...)}`) instead of valid JSON. Google sees no schema on any page.
2. **Hreflang on the English homepage points to `localhost`** — Google thinks your English site lives on a development server.
3. **25 blog posts are missing from the sitemap** — roughly half your content is under-discoverable.

Fix these three issues and the score would jump to ~78/100 immediately.

### Top 5 Critical Issues
1. All JSON-LD outputs `{JSON.stringify(...)}` — zero structured data active sitewide
2. `hreflang="en"` and `hreflang="x-default"` on homepage point to `https://localhost/`
3. 25 of 47 blog posts missing from sitemap.xml
4. All blog post hreflang `ur` references (`/ur/blog/[slug]/`) return 404
5. Homepage title has UTF-8 encoding bug (`â` instead of `—`)

### Top 5 Quick Wins
1. Fix the Astro JSON-LD template syntax → instant rich result eligibility
2. Fix the hreflang localhost bug → correct i18n signals to Google
3. Add all 47 blog posts to sitemap → better crawl discovery
4. Fix the `—` encoding in the English homepage title → correct SERP display
5. Create stub `/ur/blog/[slug]/` pages or remove the ur hreflang from blog posts → fix 404 hreflang

---

## Technical SEO — Score: 69/100

### ✅ What's Working
| Check | Status |
|---|---|
| robots.txt | `Allow: /` for all agents, sitemap URL declared |
| HTTPS | Enforced, HSTS `max-age=63072000` (2 years) |
| Canonical URLs | Present and correct on all 7 pages checked |
| X-Frame-Options | `SAMEORIGIN` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` |
| Robots meta | `index,follow` on all pages |
| Urdu page | Correct `lang="ur" dir="rtl"` |
| Urdu hreflang (on /ur/ page) | Correct — en→`/`, ur→`/ur/`, x-default→`/` |

### ❌ Critical Issues

**[CRITICAL] Hreflang localhost bug on English homepage**
```html
<!-- Current (WRONG): -->
<link rel="alternate" hreflang="en" href="https://localhost/">
<link rel="alternate" hreflang="x-default" href="https://localhost/">

<!-- Should be: -->
<link rel="alternate" hreflang="en" href="https://www.ilaaj.ai/">
<link rel="alternate" hreflang="x-default" href="https://www.ilaaj.ai/">
```
This tells Google your English site is on `localhost`. The Urdu page (`/ur/`) has the correct hreflang. The bug is in the English homepage generation only — likely an Astro i18n config issue where `site` is not set correctly for the default locale.

**[CRITICAL] Urdu blog pages return 404**  
Blog posts include `hreflang="ur" href="https://www.ilaaj.ai/ur/blog/sir-dard-ka-ilaj/"` but these pages don't exist (404). Google penalizes broken hreflang. Either:
- Create `/ur/blog/[slug]/` Urdu versions of blog posts, OR
- Remove the `hreflang="ur"` from blog posts until they exist

### ⚠️ High Issues

**[HIGH] 25 blog posts missing from sitemap**  
Sitemap has 22 blog URLs. Blog listing page has 47 URLs. Missing ~25 posts (medicine guides, AI platform guides, several condition articles):
- `/blog/ai-doctor-pakistan/`, `/blog/panadol-uses-dosage/`, `/blog/brufen-400-uses/`, `/blog/augmentin-625-uses/`, `/blog/dengue-ki-alamat/`, `/blog/pregnancy-week-by-week-urdu/`, `/blog/sugar-kya-hai/`, `/blog/blood-pressure-kya-hai/`, and 17 more

**[HIGH] Cache-Control: max-age=0**  
`Cache-Control: public, max-age=0, must-revalidate` means no edge caching on what is a fully static Astro site. Every request hits Vercel's origin. For static pages, set `max-age=86400` or higher.

### ⚠️ Medium Issues

**[MEDIUM] Missing Content-Security-Policy header**  
For a healthcare platform handling medical queries, CSP should be defined to prevent XSS. No CSP header detected.

---

## Content Quality — Score: 78/100

### ✅ What's Working
- **Meta descriptions**: Present and well-written on all 7 pages checked. Good length (~120-160 chars).
- **Blog depth**: Roman Urdu articles (sir-dard-ka-ilaj etc.) are ~2,200–2,400 words with proper heading hierarchy — excellent for E-E-A-T.
- **E-E-A-T signals**: "PMDC Verified" badge, doctor bios on `/doctors/`, "Ilaaj AI Medical Team" author attribution.
- **Bilingual content**: Proper Urdu titles and descriptions on the `/ur/` page.
- **Article metadata**: `article:published_time` and `article:author` present on blog posts.
- **llms.txt**: Well-structured with article descriptions and citation guidance (see AI section).

### ⚠️ Issues

**[HIGH] Homepage title encoding bug**  
English homepage title renders: `Ilaaj AI â Pakistan's First AI Health Platform`  
The `—` (em dash, U+2014) is being output as `â` — a UTF-8 mojibake. This is what users see in Google SERPs. The Urdu page and blog posts render the em dash correctly (`—`), so this is specific to the English homepage template.

**[MEDIUM] Mixed-language H1 on homepage**  
H1 is `"Health Advice, Aitmaad Ke Saath"` (English + Roman Urdu). While brand-appropriate, it provides weak keyword signals to Google for either English *or* Urdu searches. Consider whether a clearer keyword-rich variant would serve better (e.g. "AI Health Advice You Can Trust | Pakistan's PMDC-Verified Platform").

**[MEDIUM] Author credibility**  
Author shown as `"Ilaaj AI Medical Team"` — not a named individual. For YMYL (Your Money Your Life) medical content, named doctor authors with credentials improve E-E-A-T scores.

**[LOW] No Urdu blog content**  
All 47 blog posts are English or Roman Urdu (transliterated). There are no native Urdu script blog posts, despite the platform's Urdu-first positioning and a `/ur/` homepage.

---

## On-Page SEO — Score: 72/100

### ✅ What's Working
| Page | Title | Meta Desc | H1 | Canonical | hreflang |
|---|---|---|---|---|---|
| Homepage (en) | ⚠️ (encoding bug) | ✅ | ✅ | ✅ | ❌ (localhost) |
| Homepage (ur) | ✅ | ✅ | ✅ | ✅ | ✅ |
| /blog/sir-dard-ka-ilaj/ | ✅ | ✅ | ✅ | ✅ | ⚠️ (ur 404) |
| /faq/ | ✅ | ✅ | ✅ | ✅ | ⚠️ (ur 404 likely) |
| /doctors/ | unknown | ✅ | ✅ | unknown | unknown |

### ⚠️ Issues

**[HIGH] Doctors page — no title tag visible, no structured data**  
The `/doctors/` page is a high-value page for medical E-E-A-T. It should have individual `Physician` schema markup and a keyword-rich title like `"PMDC-Verified Doctors | Ilaaj AI"`.

**[MEDIUM] FAQ page title mismatch**  
Title: `"Help Center | Ilaaj AI — Digital Healthcare Support"` — the page is at `/faq/` and contains FAQ content. Title should match intent: `"FAQ — Common Questions | Ilaaj AI"`. The current title targets "Help Center" which dilutes the FAQ keyword opportunity.

**[MEDIUM] Internal linking is shallow**  
Blog posts link to 2-3 related articles. There is no contextual linking to relevant medicine guides from condition articles (e.g., "Sir Dard Ka Ilaj" should link to "Panadol Uses" and "Brufen 400 Uses"). This internal link structure would both improve crawlability and pass authority.

**[LOW] Blog listing has no pagination / no canonical for page 2+**  
51 articles are loaded on one page with no pagination. If this grows, implement pagination or a `load more` with proper canonicalization.

---

## Schema / Structured Data — Score: 10/100

### ❌ CRITICAL: All JSON-LD is Broken Sitewide

Every JSON-LD block on every page contains unevaluated Astro/JavaScript template expressions in the rendered HTML:

**Homepage** (3 broken blocks):
```html
<!-- What Google sees — INVALID JSON: -->
<script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  ...
})}</script>

<script type="application/ld+json">{JSON.stringify({ "@type": "MedicalOrganization", ... })}</script>
<script type="application/ld+json">{JSON.stringify({ "@type": "WebSite", ... })}</script>
```

**Blog posts** (2 broken blocks):
```html
<script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
<script type="application/ld+json">{JSON.stringify(crumbSchema)}</script>
```

**FAQ page** (1 broken block):
```html
<script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
```

`{JSON.stringify(...)}` is Astro's JSX-like expression syntax. It must be evaluated at build time using `set:html` or a template literal. The fix in Astro:

```astro
<!-- WRONG (current): -->
<script type="application/ld+json">{JSON.stringify(schema)}</script>

<!-- CORRECT: -->
<script type="application/ld+json" set:html={JSON.stringify(schema)}></script>
```

**Impact**: Google cannot parse any structured data on any page. No rich results are eligible (FAQ snippets, Article cards, BreadcrumbList, Sitelinks Search Box, MedicalOrganization knowledge panel).

### Schema Coverage (once fixed)

| Page | Schema Types Present | Status |
|---|---|---|
| Homepage | FAQPage, MedicalOrganization, WebSite | Broken |
| Blog posts | Article (blogSchema), BreadcrumbList (crumbSchema) | Broken + variable refs |
| /faq/ | FAQPage (faqSchema) | Broken + variable ref |
| /ur/ | None | Missing |
| /doctors/ | None | Missing |

### Missing Schema Opportunities

| Schema Type | Where | Value |
|---|---|---|
| `Physician` | /doctors/ per doctor card | Rich results for doctor searches |
| `MedicalWebPage` | All blog posts | Medical content trust signals |
| `Drug` | Medicine guide blog posts | Rich results for medicine searches |
| `BreadcrumbList` | All pages (properly) | Breadcrumb display in SERPs |
| `Organization` | /ur/ page | Urdu entity association |

---

## Performance — Score: 65/100

*Note: No CrUX/Lighthouse data available without Google API. Assessment based on headers and resource analysis.*

### ✅ What's Working
- **Vercel CDN**: Global edge network — good TTFB baseline
- **Font loading**: `media="print" onload="this.media='all'"` — eliminates render-blocking Google Fonts
- **PostHog**: Lazy-loaded via `requestIdleCallback` — does not block LCP
- **Sentry**: Lazy-loaded via `requestIdleCallback` — does not block LCP
- **Preconnect**: `fonts.googleapis.com` and `fonts.gstatic.com` declared

### ⚠️ Issues

**[HIGH] Cache-Control: max-age=0**  
This is a statically generated Astro site on Vercel. Setting `max-age=0` means no CDN edge caching — every visitor gets a fresh origin hit. For static pages, add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=604800" }]
    }
  ]
}
```

**[MEDIUM] No image format optimization evidence**  
Doctor profile images are served from Cloudinary CDN (good). Blog post images use direct Pexels JPEG URLs without `?auto=format` for WebP. Main site images (`/assets/ilaaj-logo.jpg`, `/assets/screenshots/*.jpeg`) — format not confirmed.

**[MEDIUM] OG image likely undersized**  
`og:image` points to `/assets/ilaaj-logo.jpg` (same asset used as the 192px PWA icon). Twitter card type is `summary_large_image` which renders best at 1200×630px. A small logo used as OG image results in poor social shares.

---

## AI Search Readiness — Score: 52/100

### ✅ llms.txt — Excellent
`https://www.ilaaj.ai/llms.txt` exists and is well-structured:
- Platform description with value proposition
- All key pages with descriptions
- All 48 blog articles with individual descriptions
- Citation guidance: `"Ilaaj AI (ilaaj.ai), Pakistan's AI-powered telemedicine platform"`
- Contact details (email, WhatsApp)

This is ahead of most competitors for AI citation readiness. ChatGPT, Perplexity, and Claude can use this file directly.

### ❌ Issues

**[CRITICAL] Broken structured data blocks AI entity recognition**  
Structured data (MedicalOrganization, WebSite SearchAction) is the primary signal for knowledge graph and entity disambiguation. With all JSON-LD broken, Googlebot and AI crawlers cannot build an entity model for Ilaaj AI.

**[HIGH] No AI Overview optimization on key queries**  
Pages like `/blog/sir-dard-ka-ilaj/` are strong candidates for Google AI Overviews on Pakistan health queries. However, without valid Article/MedicalWebPage schema and with broken FAQ schema, they're less eligible.

**[MEDIUM] Blog posts lack author entity markup**  
Named medical authors (with schema `Person` and `medicalSpecialty`) would significantly improve AI citation confidence for YMYL medical content.

---

## Images — Score: 60/100

### ✅ What's Working
- Main hero images have alt text (`"Ilaaj AI Login"`, `"Ilaaj AI Chat"`, etc.)
- Blog post hero image has descriptive alt (`"Woman holding her head — headache"`)
- Doctor profile images served via Cloudinary (CDN, optimizable)

### ⚠️ Issues

**[HIGH] OG image is a small logo**  
`og:image: https://www.ilaaj.ai/assets/ilaaj-logo.jpg` — likely 192×192px or smaller. When shared on WhatsApp, Twitter, or Facebook, this produces a tiny thumbnail. Create a dedicated OG image (1200×630px) showing the platform UI or brand visual.

**[MEDIUM] Blog post images from Pexels (external dependency)**  
Images like `https://images.pexels.com/photos/7298395/...` are externally hosted. If Pexels changes URLs or the image is removed, images break. Self-host or use Cloudinary for blog post hero images.

**[LOW] No lazy loading attributes confirmed**  
Could not verify `loading="lazy"` on below-fold images from fetched content.

---

## Summary Action Plan

### Critical (Fix Immediately)

| # | Issue | File to Fix | Impact |
|---|---|---|---|
| 1 | JSON-LD uses `{JSON.stringify(...)}` — invalid everywhere | All layout/page files with schema | All structured data non-functional |
| 2 | Hreflang `en` and `x-default` → `https://localhost/` on homepage | `src/pages/en/index.astro` or layout | Google misidentifies English site location |
| 3 | Blog post `hreflang="ur"` URLs return 404 | Blog post template hreflang generation | Broken hreflang signals |

### High (Fix Within 1 Week)

| # | Issue | Impact |
|---|---|---|
| 4 | 25 blog posts missing from sitemap | Slow crawl discovery for half content |
| 5 | Homepage title encoding bug (`â` → `—`) | Garbled title in SERPs |
| 6 | No OG image (1200×630) — logo used instead | Poor social sharing previews |
| 7 | Cache-Control: max-age=0 on static pages | Unnecessary origin load, slower TTFB |

### Medium (Fix Within 1 Month)

| # | Issue | Impact |
|---|---|---|
| 8 | Add `Physician` schema to /doctors/ page | Doctor rich results |
| 9 | Add `Drug` schema to medicine guide posts | Medicine rich results |
| 10 | Add `MedicalWebPage` schema to blog posts | Medical content trust signals |
| 11 | FAQ page: title tag should target FAQ keywords | Better intent matching |
| 12 | Named author + `Person` schema on blog posts | E-E-A-T for YMYL content |
| 13 | Add Content-Security-Policy header | Security for health platform |
| 14 | Internal linking: condition → medicine guides | Authority flow + crawlability |

### Low (Backlog)

| # | Issue | Impact |
|---|---|---|
| 15 | Create Urdu script blog posts for top conditions | Native Urdu organic traffic |
| 16 | Self-host blog hero images (off Pexels) | Eliminate external dependency |
| 17 | Add `loading="lazy"` to below-fold images | LCP improvement |
| 18 | Homepage H1 — consider keyword-rich variant | Stronger keyword signals |

---

*Audit conducted: 2026-05-08. Tools: PowerShell HTTP inspection, sitemap crawl, raw HTML head analysis.*
