# Full SEO Audit Report — ilaaj.ai
**Date:** 2026-04-15 | **Auditor:** Claude Code SEO Suite | **Branch:** new-v2
**Platform:** Vercel Static HTML | **Business Type:** AI Telemedicine / Digital Health (Pakistan)

---

## Executive Summary

**Overall SEO Health Score: 52 / 100**

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 61/100 | 22% | 13.4 |
| Content Quality / E-E-A-T | 38/100 | 23% | 8.7 |
| On-Page SEO | 58/100 | 20% | 11.6 |
| Schema / Structured Data | 62/100 | 10% | 6.2 |
| Performance (CWV) | 55/100 | 10% | 5.5 |
| AI Search Readiness | 72/100 | 10% | 7.2 |
| Images | 40/100 | 5% | 2.0 |
| **TOTAL** | | **100%** | **54.6 / 100** |

---

### Business Context

Ilaaj AI is Pakistan's first AI-powered telemedicine platform. Users describe symptoms via chat (Urdu/English/Roman Urdu), an AI triages the case, and a licensed doctor reviews and approves the prescription at Rs. 250 per consultation. This is a **YMYL (Your Money or Life) site** — Google applies its strictest quality evaluation to health platforms.

### Top 5 Critical Issues

1. **E-E-A-T failure** — no named medical authors, Gmail contact email, no About page; "Ilaaj AI" as organization-author on health content violates YMYL standards
2. **DOM duplication bug** — H1 duplicated on blog posts, all H2s duplicated on Roman Urdu post; template-level defect degrading content signals
3. **Schema price inaccuracy** — `WebApplication` declares `"price": "0"` but actual price is Rs. 250; factually incorrect
4. **Internal links use `.html` extensions** — all nav/footer links trigger redirect chains instead of clean-URL direct crawls
5. **Non-www redirect is 307 Temporary** — should be 301 Permanent for link equity consolidation

### Top 5 Quick Wins

1. Fix `.html` → clean URL internal links across all pages (30 min, high SEO impact)
2. Delete duplicate `gtag.js` from `index.html` body — GA4 double-fires (5 min)
3. Delete broken font preload line in `index.html` line 68 (2 min, LCP improvement)
4. Apply `media="print"` non-blocking font loading to `blog.html` and all 8 blog posts (20 min)
5. Correct `"price": "0"` to `"250"` in WebApplication schema (5 min)

---

## Section 1 — Technical SEO (Score: 61/100)

### 1.1 Crawlability

**[CRITICAL] Internal links use `.html` extensions**

Every nav and footer link across all pages references `.html` paths:
- `<a href="blog.html">` — navbar (desktop + mobile)
- `<a href="privacy-policy.html">` — footer
- `<a href="terms-and-conditions.html">` — footer
- `<a href="support.html">` — footer

Vercel rewrites serve clean URLs, but the redirects block maps `.html` → clean URL with a 308. Every click triggers: `request /blog.html → 308 redirect → /blog → rewrite → blog.html served`. Googlebot crawls both the `.html` URL and the clean URL, splitting link equity.

**Fix:** Change all hrefs to root-relative clean paths (`/blog`, `/support`, etc.) in `index.html`, `blog.html`, and all blog post templates.

---

### 1.2 Indexability

**[HIGH] Non-www redirect is 307 Temporary**

`ilaaj.ai` → `307 Temporary Redirect` → `https://www.ilaaj.ai/`

A 307 does not consolidate PageRank with the same reliability as a 301. Google may recrawl the apex domain repeatedly.

**Fix:** In Vercel dashboard or `vercel.json`, configure the apex-to-www redirect as `permanent: true` (301).

**Canonical tags** — correctly implemented on all pages inspected. ✓

**robots.txt** — well-structured, allows all major AI crawlers, disallows `/old-v1/`, declares sitemap. ✓

**[MEDIUM] Crawl-delay in Googlebot block** — Google ignores `Crawl-delay`. Remove from the Googlebot stanza.

**Sitemap** — 11 URLs (homepage, blog index, 3 utility, 8 posts). All `<lastmod>` dates are `2026-04-15` (today) regardless of actual modification date — Google will ignore this signal as inaccurate.

**Fix:** Use actual per-URL modification dates from `article:modified_time` in each blog post.

---

### 1.3 Security

**[HIGH] Five security headers missing**

Headers not present on any response:
- `Content-Security-Policy` — XSS protection
- `X-Frame-Options` — clickjacking prevention
- `X-Content-Type-Options` — MIME sniffing protection
- `Referrer-Policy` — referrer data leak prevention
- `Permissions-Policy` — browser feature access control

For a health platform handling medical queries, X-Frame-Options and CSP are especially critical.

**Fix:** Add all five to the `headers` block in `vercel.json`.

**[MEDIUM] `Access-Control-Allow-Origin: *`** — wildcard CORS on HTML documents is unnecessarily permissive. Scope to `https://app.ilaaj.ai/chat`.

**HSTS present** — `Strict-Transport-Security: max-age=63072000` ✓

---

### 1.4 Analytics

**[HIGH] GA4 double-fires on homepage**

GTM (GTM-5XKTHF96) is loaded in `<head>` — GTM container almost certainly fires GA4 (G-KNTMD61HWL). A second direct `gtag.js` script at bottom of body also fires GA4. Blog pages only use the direct tag — no duplicate. Homepage has both.

**Fix:** Remove the direct `gtag.js` block from `index.html` body. GA4 should fire exclusively through GTM.

---

### 1.5 URL & Redirects

**[MEDIUM] `og:locale` is `en_US` for a Pakistani platform**

Platform targets Pakistan, supports Urdu. `og:locale: en_US` is wrong.

**Fix:** `en_PK` with `og:locale:alternate: ur_PK`.

**[LOW] No hreflang tags** despite multilingual content (English, Roman Urdu, mixed).

**Fix (minimum):** Add `hreflang="en-PK"` and `x-default` to all pages now. Full `ur-PK` hreflang when Urdu URL paths exist.

**[LOW] No IndexNow implementation** — new blog posts rely on Bing crawl discovery, potentially taking days/weeks.

---

### 1.6 Passing Technical Checks

- ✅ HTTPS enforced with HSTS
- ✅ Canonical tags on all pages pointing to clean URLs
- ✅ Clean URL rewrites via Vercel
- ✅ `X-Robots-Tag: index, follow` in both headers and meta
- ✅ robots.txt correctly disallows `/old-v1/`
- ✅ Static HTML — Googlebot sees full content on first request, zero JS dependency
- ✅ Google Search Console verified
- ✅ PWA manifest + theme color
- ✅ Geo meta tags (`geo.region: PK`, `geo.placename: Pakistan`)

---

## Section 2 — Content Quality / E-E-A-T (Score: 38/100)

### 2.1 YMYL / E-E-A-T Assessment

This site is classified under Google's highest YMYL tier (medical advice). E-E-A-T failures here carry maximum ranking risk.

| E-E-A-T Factor | Score | Assessment |
|---|---|---|
| Experience | 12/100 | No first-hand clinical signals, no patient outcomes, no real cases |
| Expertise | 15/100 | No named expert authors, "Ilaaj AI" not a credentialed person |
| Authoritativeness | 22/100 | MedicalOrganization schema present but unverified; no third-party citations |
| Trustworthiness | 30/100 | Gmail contact, no About page, no physical address, no professional email |

**[CRITICAL] No named medical authors or reviewers**

All content is attributed to "Ilaaj AI" — an organization, not a named human with verifiable medical credentials. Google's QRG explicitly requires verifiable human expertise for YMYL medical content. This is the single highest-risk SEO issue on the site.

**[CRITICAL] Cancer 101 references "Bayhealth"** — a Delaware, USA hospital. For a Pakistan-targeted health platform, citing a foreign US hospital signals aggregated/adapted content rather than original expert writing.

**[HIGH] Gmail contact email** (`ilaaj.health.ai@gmail.com`) signals an unestablished organization. The `llms.txt` uses `support@ilaaj.ai` — this inconsistency compounds the trust problem.

**[HIGH] No About page** — quality raters cannot determine who is responsible for medical content.

**[HIGH] No medical disclaimer** — a legally and SEO-prudent "consult a licensed doctor" disclaimer is absent from content.

---

### 2.2 Content Quality

**[CRITICAL] DOM duplication bugs across blog templates**

- `cancer-101-what-you-need-to-know`: duplicate `<h1>` in DOM
- `online-doctor-pakistan-mein`: all H2s appear twice in DOM

These are template-level rendering defects. Every affected page has halved heading signal strength and broken accessibility. Audit all 8 blog posts.

**[HIGH] Homepage H1 in mixed Urdu/English**

`"Apni Sehat Ke Baare Mein Baat Karein. Affordable, Doctor-Verified Prescriptions."`

Mixed-language H1 without hreflang forces Google to guess page language. The H1 does not contain the primary target keyword ("telemedicine Pakistan" or "online doctor Pakistan"). The Urdu phrase is not in Urdu script (it's romanized) so it doesn't serve Urdu-script searchers either.

**[HIGH] Roman Urdu post under `lang="en"`**

`online-doctor-pakistan-mein` is entirely in Roman Urdu but the `<html>` tag declares `lang="en"`. Google misclassifies the page language.

**[MEDIUM] Thin content library**

8 articles is insufficient for topical authority in a health niche. A minimum viable health content library targeting Pakistan telemedicine queries should be 30-50 articles organized into topical clusters.

---

## Section 3 — On-Page SEO (Score: 58/100)

### 3.1 Title Tags

| Page | Title | Length | Issue |
|------|-------|--------|-------|
| Homepage | "Ilaaj AI \| Pakistan's AI-Powered Health Platform" | 46 chars | Underutilizes space; no primary action keyword |
| Blog index | "Health Blog – AI Health Tips & Medical Advice \| Ilaaj AI" | 57 chars | "Tips" reduces expertise signal |
| Cancer 101 | "Cancer 101: What You Need to Know \| Ilaaj AI" | 45 chars | Generic, no Pakistan signal |
| Urdu post | "Online Doctor Pakistan Mein – Sasti Aur Asaan Medical Advice" | 61 chars | Roman Urdu title under `lang="en"` |

### 3.2 Meta Descriptions

- Homepage: 146 chars — well-crafted ✓
- Blog index: well-structured ✓
- Blog posts: generally good ✓

### 3.3 Keywords Meta

**[HIGH] Homepage keywords meta has 30+ terms** — Google has ignored this tag since 2009; Bing uses it as a spam signal. Remove or trim to 5 brand terms.

### 3.4 Heading Structure

- H1 strategy: mixed-language on homepage; duplicated on blog posts
- Blog index H1 ("Health & Wellness Articles") is generic — misses Pakistan/expertise signals
- Blog card titles use H2 appropriately ✓
- Blog post H3s used for subsections ✓

### 3.5 Internal Linking

- All nav/footer links use `.html` extensions (see Critical Technical issue)
- Navbar `Blog` link points to `blog.html` not `/blog`
- No breadcrumb navigation visible on blog posts
- No contextual internal links between related articles

---

## Section 4 — Schema / Structured Data (Score: 62/100)

### 4.1 Current Implementation

| Schema | Page | Status |
|--------|------|--------|
| MedicalOrganization | Homepage | Present — validation errors |
| WebApplication | Homepage | Present — critical price error |
| FAQPage | Homepage | Present — no Google rich result (commercial site restriction since Aug 2023), GEO value remains |
| CollectionPage + ItemList | Blog index | Present — ListItem missing `name` |
| BlogPosting | Blog posts | Present — author not Person type |
| BreadcrumbList | Blog posts | Present — missing from blog index |

### 4.2 Critical Schema Errors

**[CRITICAL] `WebApplication.price: "0"` — factually wrong**

The actual price is Rs. 250. Schema says free. Inaccurate price data is a trust signal failure for both Google and AI assistants.

**[CRITICAL] `MedicalOrganization.description` says "free"** — same factual inaccuracy.

**[HIGH] `MedicalOrganization.logo` is a string URL** — must be `ImageObject` with `width` and `height` for Knowledge Panel eligibility.

**[HIGH] `medicalSpecialty: "General Practice"` is a plain string** — must be `MedicalSpecialty` enumeration URI: `"https://schema.org/GeneralPractice"`.

**[HIGH] No `MedicalWebPage` type on health articles** — critical missed opportunity for YMYL E-E-A-T signals.

**[HIGH] No `WebSite` schema with `SearchAction`** — missing sitelinks searchbox opportunity.

**[HIGH] `WebApplication.url` points to homepage** — should be `https://app.ilaaj.ai/chat`.

**[MEDIUM] `email` on `ContactPoint`** — not a Schema.org property there; move to `Organization` level.

**[MEDIUM] `availableOnDevice`** — not a valid Schema.org property; remove from WebApplication.

**[MEDIUM] ItemList entries missing `name` property** on blog CollectionPage.

### 4.3 Email Inconsistency

Schema/footer/contact: `ilaaj.health.ai@gmail.com`
llms.txt: `support@ilaaj.ai`

These must be unified. `support@ilaaj.ai` (custom domain) is strongly preferred for all trust signals.

---

## Section 5 — Performance / Core Web Vitals (Score: 55/100)

### 5.1 Estimated CWV Status

| Metric | Estimate | Target | Status |
|--------|----------|--------|--------|
| LCP | 2.5–3.5s mobile | < 2.5s | Needs Improvement |
| INP | < 200ms | < 200ms | Good |
| CLS | < 0.1 | < 0.1 | Good |

### 5.2 Render-Blocking Issues

**[CRITICAL] GTM synchronous in `<head>` on all pages**

The GTM snippet executes synchronously before the parser discovers CSS/images. Estimated impact: -150–300ms LCP on mobile.

**Fix:** Move GTM snippet to first line after `<body>` opens.

**[HIGH] Broken font preload in `index.html` line 68**

```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/...">
```

This is redundant (font is already loaded via the `media="print"` trick on line 73) and partially undoes the non-blocking benefit by fetching at high priority.

**Fix:** Delete line 68 entirely.

**[HIGH] Blog pages use blocking Google Fonts**

`blog.html` and all 8 blog posts load Google Fonts via a standard render-blocking `<link rel="stylesheet">`. The homepage uses the correct `media="print" onload` pattern — the blog templates do not.

**Fix:** Apply the same non-blocking pattern from `index.html` to `blog.html` and all 8 blog post HTML files.

### 5.3 Image Issues

**[HIGH] Hero image: JPEG only, no WebP/AVIF, no srcset**

`hero-app.jpeg` is the LCP element. Serving JPEG without responsive formats or sizes costs ~25–40% extra bytes vs WebP and serves the same full-size image to mobile.

**Fix:** Generate 320w and 640w WebP variants, update `<img>` with `srcset` + `sizes`, update the `<link rel="preload">` to use `imagesrcset` / `imagesizes`.

**[MEDIUM] `ilaaj-logo.jpg` is 125 KB** — a logo served at that file size is ~100x oversized. Should be < 10 KB as WebP or an SVG.

**[MEDIUM] `Icon-192.png` used as navbar logo** — 192×192 PNG rendered at 36×36px. Replace with inline SVG or purpose-built 36px WebP (~1 KB).

**[MEDIUM] No `Cache-Control` headers for static assets** — without fingerprinted filenames, assets must revalidate on every repeat visit. Add long-cache headers in `vercel.json` for `/assets/` and `/css/`.

### 5.4 Passing Performance Checks

- ✅ LCP image has `fetchpriority="high"` attribute
- ✅ Hero image has explicit `width="320" height="693"` — no CLS
- ✅ Below-fold images use `loading="lazy"`
- ✅ Blog post images served via Cloudinary with `f_auto,q_auto,w_800`
- ✅ Tawk.to live chat deferred until scroll/interaction
- ✅ GA4 via `<script async>` on blog pages

---

## Section 6 — AI Search Readiness (Score: 72/100)

### 6.1 llms.txt Assessment (Score: 7.5/10)

**Strengths:**
- File exists at `/llms.txt` — crawled by ChatGPT, Perplexity, Claude.ai ✓
- Clear About section with platform description and accurate pricing ✓
- All 8 blog articles listed with absolute URLs ✓
- Citation guidance provided — most important GEO signal ✓
- Contact section present ✓

**Gaps:**
- `support@ilaaj.ai` in llms.txt conflicts with `ilaaj.health.ai@gmail.com` everywhere else — HIGH
- No article summaries — AI systems benefit from one-sentence summaries per article — Medium
- No `llms-full.txt` for extended AI context — Medium
- No language declaration (`Languages: Urdu, English`) — Low

### 6.2 AI Crawler Access

robots.txt correctly allows: GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Applebot, Amazonbot, anthropic-ai, cohere-ai, meta-externalagent. CCBot is blocked (appropriate). ✓

### 6.3 AI Citation Readiness

| Signal | Present | Notes |
|--------|---------|-------|
| MedicalOrganization schema | ✓ | Errors present but recognized |
| FAQPage schema | ✓ | No Google rich result but AI assistants cite FAQ content |
| Named human expert author | ✗ | AI systems prefer citing named individuals |
| llms.txt with citation guidance | ✓ | Strong signal |
| Clear content hierarchy | Partial | DOM duplication reduces extraction reliability |
| BreadcrumbList on blog posts | ✓ | |
| Original Pakistan health data/statistics | ✗ | High AI citation value if added |
| MedicalWebPage type | ✗ | Critical gap for health content AI extraction |

---

## Section 7 — Images (Score: 40/100)

| Image | Format | Size Est. | srcset | Alt Text | Issues |
|-------|--------|-----------|--------|----------|--------|
| hero-app.jpeg | JPEG | ~60 KB | No | "Ilaaj AI App" ✓ | No WebP, no srcset |
| login-app.jpeg | JPEG | Unknown | No | "Ilaaj AI Login Screen" ✓ | No WebP |
| chat-app.jpeg | JPEG | Unknown | No | "Ilaaj AI Chat Screen" ✓ | No WebP |
| prescription.jpeg | JPEG | Unknown | No | "Ilaaj AI Prescription Screen" ✓ | No WebP |
| ilaaj-logo.jpg | JPEG | 125 KB | No | "Ilaaj AI" ✓ | Severely oversized |
| Icon-192.png | PNG | 7.9 KB | No | "Ilaaj AI" ✓ | 192px rendered at 36px |
| Blog images (Cloudinary) | Auto (f_auto) | ~varies | No | Article titles ✓ | Missing width/height in schema |
| og:image (homepage) | JPEG | Unknown | N/A | Logo only | Wrong asset for OG — use branded card |

**All alt texts are present** — no missing alt text issues found. ✓

**Primary gaps:** Format (JPEG throughout, no WebP), size (logo), no srcset, OG image is a logo not a preview card.

---

## Key Files Referenced

All in `D:/products/ilaaj/ilaaj_flutter_node/ilaaj-ai-web/`:
- `index.html` — Homepage
- `blog.html` — Blog index
- `blog/cancer-101-what-you-need-to-know.html` — Sample blog post
- `blog/online-doctor-pakistan-mein.html` — Roman Urdu blog post
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `vercel.json`
