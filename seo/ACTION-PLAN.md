# SEO Action Plan — ilaaj.ai
**Generated:** 2026-04-15 | **Overall Score:** 52/100
**30-day target:** 68-72/100 | **90-day target:** 78-82/100

---

## CRITICAL — Fix Immediately (Blocks Rankings / Trust)

### C1. Fix Schema Price Inaccuracy
**Files:** `index.html`
**Effort:** 5 min
`WebApplication` declares `"price": "0"` and `MedicalOrganization.description` says "free" — actual price is Rs. 250.
```json
// WebApplication offers — change to:
"offers": { "@type": "Offer", "price": "250", "priceCurrency": "PKR", "description": "Doctor-verified prescription per consultation" }
// MedicalOrganization description — remove the word "free"
```

### C2. Fix DOM Duplication Bug in Blog Templates
**Files:** All 8 blog post HTML files
**Effort:** 1-2 hours
`cancer-101` has a duplicate `<h1>`; `online-doctor-pakistan-mein` has all H2s duplicated. Audit all 8 posts — this likely affects more than the two identified. Template-level defect halves heading signals and blocks featured snippet extraction.

### C3. Fix Internal Links (.html → clean URLs)
**Files:** `index.html`, `blog.html`, all blog post HTML files
**Effort:** 30 min
All nav/footer links trigger a 308 redirect chain (`.html` → clean URL), diluting link equity on every crawl.
```html
blog.html        → /blog
privacy-policy.html      → /privacy-policy
terms-and-conditions.html → /terms-and-conditions
support.html     → /support
```

### C4. Fix Non-www Redirect to 301 Permanent
**File:** Vercel Dashboard or `vercel.json`
**Effort:** 10 min
`ilaaj.ai → 307 Temporary` does not consolidate PageRank reliably.
```json
{
  "source": "/(.*)",
  "has": [{ "type": "host", "value": "ilaaj.ai" }],
  "destination": "https://www.ilaaj.ai/$1",
  "permanent": true
}
```

### C5. Add Named Medical Authors to All Health Content
**Files:** All 8 blog post HTML files; create `/authors/` pages
**Effort:** 1-2 weeks (requires recruiting)
Highest YMYL E-E-A-T risk. "Ilaaj AI" as organization-author on health content violates Google QRG for medical content.
- Partner with MBBS/FCPS licensed Pakistani doctors
- Add byline with name, credentials, and photo to every article
- Create `/authors/{name}` profile pages with credential details
- Update `BlogPosting.author` from Organization to `Person` type with `sameAs` links

### C6. Replace Gmail with Professional Domain Email Everywhere
**Files:** `index.html` (schema + footer), `support.html`
**Effort:** 15 min (once mailbox is active)
`ilaaj.health.ai@gmail.com` signals unestablished organization. `hello@ilaaj.ai` already used in llms.txt — standardize everywhere.
- Update schema ContactPoint email
- Update footer email display
- Ensure `hello@ilaaj.ai` mailbox is active and monitored

---

## HIGH — Fix Within 1 Week (Significant Ranking Impact)

### H1. Add 5 Missing Security Headers
**File:** `vercel.json`
**Effort:** 30 min
Missing CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
```json
{ "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.tawk.to; img-src 'self' data: https: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none';" },
{ "key": "X-Frame-Options", "value": "DENY" },
{ "key": "X-Content-Type-Options", "value": "nosniff" },
{ "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
{ "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
```

### H2. Remove Duplicate GA4 Tag from Homepage
**File:** `index.html` (bottom of body)
**Effort:** 5 min
GTM already fires GA4. Direct `gtag.js` at bottom of body causes double event firing, corrupting analytics.
- Remove the `<script async src=".../gtag/js?id=G-KNTMD61HWL">` block and `gtag('config', ...)` from `index.html` body only
- Blog pages are fine — they don't have GTM + direct tag duplication

### H3. Move GTM from `<head>` to `<body>` (All Pages)
**Files:** `index.html`, `blog.html`, all blog post HTML files
**Effort:** 20 min
GTM in `<head>` adds 150–300ms to LCP on mobile. Move snippet to first line after `<body>` tag opens.

### H4. Delete Broken Font Preload in Homepage
**File:** `index.html` line 68
**Effort:** 2 min
```html
<!-- DELETE this line — it re-blocks the non-blocking font load pattern: -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap">
```

### H5. Fix Blocking Font Load on Blog Pages
**Files:** `blog.html`, all 8 blog post HTML files
**Effort:** 20 min
Blog pages use render-blocking `<link rel="stylesheet">` for Google Fonts. Estimated cost: -200–400ms LCP per page.
```html
<!-- Replace the blocking link with: -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"></noscript>
```

### H6. Fix MedicalOrganization Schema
**File:** `index.html`
**Effort:** 15 min
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": "https://www.ilaaj.ai/#organization",
  "name": "Ilaaj AI",
  "url": "https://www.ilaaj.ai",
  "logo": { "@type": "ImageObject", "url": "https://www.ilaaj.ai/assets/Icon-192.png", "width": 192, "height": 192 },
  "description": "Pakistan's first AI-powered telemedicine platform offering doctor-verified prescriptions in Urdu and English at Rs. 250 per consultation.",
  "email": "hello@ilaaj.ai",
  "address": { "@type": "PostalAddress", "addressCountry": "PK" },
  "contactPoint": { "@type": "ContactPoint", "telephone": "+92-324-819-9663", "contactType": "customer support", "availableLanguage": ["English", "Urdu"] },
  "sameAs": ["https://www.instagram.com/ilaaj_ai/", "https://www.facebook.com/profile.php?id=61588590745625", "https://x.com/ilaajai"],
  "areaServed": { "@type": "Country", "name": "Pakistan" },
  "medicalSpecialty": { "@type": "MedicalSpecialty", "@id": "https://schema.org/GeneralPractice" }
}
```

### H7. Fix WebApplication Schema
**File:** `index.html`
**Effort:** 10 min
- Change `url` to `https://app.ilaaj.ai/chat`
- Change `price` to `"250"`
- Remove `availableOnDevice` (invalid property)
- Add `"publisher": {"@id": "https://www.ilaaj.ai/#organization"}`

### H8. Add WebSite Schema with SearchAction
**File:** `index.html`
**Effort:** 10 min
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.ilaaj.ai/#website",
  "name": "Ilaaj AI",
  "url": "https://www.ilaaj.ai",
  "publisher": {"@id": "https://www.ilaaj.ai/#organization"},
  "potentialAction": {
    "@type": "SearchAction",
    "target": {"@type": "EntryPoint", "urlTemplate": "https://www.ilaaj.ai/blog?q={search_term_string}"},
    "query-input": "required name=search_term_string"
  }
}
```

### H9. Add MedicalWebPage to Blog Post Schema
**Files:** All 8 blog post HTML files
**Effort:** 30 min
```json
"mainEntityOfPage": {
  "@type": "MedicalWebPage",
  "@id": "https://www.ilaaj.ai/blog/[slug]",
  "medicalAudience": {"@type": "MedicalAudience", "audienceType": "Patient"},
  "lastReviewed": "YYYY-MM-DD",
  "reviewedBy": {"@type": "Organization", "name": "Ilaaj AI Medical Team", "url": "https://www.ilaaj.ai"}
}
```
Update `reviewedBy` to `Person` type once named doctors are onboarded.

### H10. Add About Page
**Target:** Create `about.html` → `/about`
**Effort:** 1-2 days
Quality raters ask "who is responsible for this content?" There is currently no answer.
- Founding story and team bios
- Medical advisory board (if any)
- How the AI+doctor system works (transparency)
- Add to sitemap, nav, and footer

---

## MEDIUM — Fix Within 1 Month

### M1. Fix Sitemap lastmod Dates
**File:** `sitemap.xml`
All 11 URLs show today's date — Google ignores uniform lastmod as inaccurate.
Use actual `article:modified_time` values from each blog post meta tag.

### M2. Fix og:locale
**Files:** `index.html`, `blog.html`, blog post files
```html
<meta property="og:locale" content="en_PK">
<meta property="og:locale:alternate" content="ur_PK">
```

### M3. Create Branded OG Image (1200×630px)
**Files:** `index.html`, `blog.html`
Current `og:image` is the logo — wrong size and asset for social preview cards.
Design a 1200×630 branded card (app screenshot + brand + tagline), save as `/assets/og-homepage.jpg`, align `og:image` and `twitter:image` to same URL.

### M4. Remove / Reduce Homepage Keywords Meta
**File:** `index.html`
30+ term keywords meta signals spam to Bing; Google ignores it. Remove entirely or trim to 5 terms.

### M5. Compress ilaaj-logo.jpg (125 KB → < 10 KB)
**File:** `assets/ilaaj-logo.jpg`
Convert to WebP or SVG. Add `width` and `height` attributes to all footer `<img>` tags using this asset.

### M6. Convert Screenshots to WebP with srcset
**Files:** `assets/screenshots/` (hero-app.jpeg, login-app.jpeg, chat-app.jpeg, prescription.jpeg)
Generate WebP variants at 320w and 640w. Update `<img>` tags with `srcset` + `sizes`. Update hero preload to use `imagesrcset`.

### M7. Add Cache-Control Headers for Static Assets
**File:** `vercel.json`
```json
{ "source": "/assets/(.*)", "headers": [{"key": "Cache-Control", "value": "public, max-age=31536000, immutable"}] },
{ "source": "/css/(.*)", "headers": [{"key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=604800"}] }
```

### M8. Fix ItemList name on Blog Schema
**File:** `blog.html`
Add `"name": "Article Title"` to each `ListItem` in the CollectionPage `itemListElement`.

### M9. Add BreadcrumbList to Blog Index
**File:** `blog.html`
```json
{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
  {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.ilaaj.ai/"},
  {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.ilaaj.ai/blog"}
]}
```

### M10. Add Service Schema to Homepage
**File:** `index.html`
Add a `Service` entity describing the telemedicine consultation with pricing, language, area served, and a link to `https://app.ilaaj.ai/chat`.

### M11. Scope CORS Header
**File:** `vercel.json`
Restrict `Access-Control-Allow-Origin: *` to only apply to asset paths that require CORS (fonts, images) — not HTML documents.

### M12. Fix Blog Post lang/dir Attributes
**Files:** All blog post HTML files
- Add `dir="ltr"` to all blog post `<html>` tags where missing
- Change `lang="en"` to `lang="ur"` on `online-doctor-pakistan-mein.html`

### M13. Enrich llms.txt
**File:** `llms.txt`
- Add one-sentence summaries per blog article
- Add `Languages: English, Urdu, Roman Urdu`
- Consider adding `/llms-full.txt` with expanded content

### M14. Remove Crawl-delay from Googlebot in robots.txt
**File:** `robots.txt`
Google ignores `Crawl-delay` — remove from the Googlebot stanza (harmless but misleading).

### M15. Remove / Localize Bayhealth Reference in Cancer 101
**File:** `blog/cancer-101-what-you-need-to-know.html`
Replace US hospital reference with a Pakistani institution (Aga Khan University Hospital, JPMC, Shaukat Khanum) to demonstrate Pakistan-specific expertise.

---

## LOW — Backlog

### L1. Implement IndexNow for Bing
Register an IndexNow key, ping `https://api.indexnow.org/indexnow` with new URLs on each deploy. Provides instant Bing discovery vs days of sitemap crawl wait.

### L2. Add hreflang Tags (Minimum Viable)
```html
<link rel="alternate" hreflang="en-PK" href="https://www.ilaaj.ai/">
<link rel="alternate" hreflang="x-default" href="https://www.ilaaj.ai/">
```
Full `ur-PK` implementation when Urdu-script URL paths are added.

### L3. Add Visible Breadcrumbs to Blog Posts
BreadcrumbList schema already present — add the visible UI navigation element too.

### L4. Expand Content Library (30-50 articles)
Topical clusters needed:
- Common Pakistan conditions (dengue, typhoid, diabetes, hypertension, malaria)
- Medication guides
- Telemedicine how-to
- Pakistan health system context
Each article requires a named medical author/reviewer.

### L5. Add Patient Testimonials / Social Proof
Experience signals for E-E-A-T; anonymized real outcomes demonstrate the platform works.

### L6. Pursue Pakistani Media Coverage
Off-site authority signals: Dawn, Geo Health, Tribune, Samaa Tech.

### L7. Add Medical Disclaimer to All Health Content
"This article is for informational purposes only. Consult a licensed doctor for medical advice." Required for YMYL trust and legal prudence.

### L8. Add og:image for Blog Index (Separate from Homepage)
Create a blog-specific OG card (different from homepage) for blog index page shares.

---

## Effort Summary

| Priority | Issues | Est. Total Effort |
|----------|--------|-------------------|
| Critical | 6 | 3-5 days (C5 requires recruiting) |
| High | 10 | ~1 week |
| Medium | 15 | 2-3 weeks |
| Low | 8 | Ongoing |

## Fastest 1-Hour Sprint (Code Changes Only)

These 6 changes can be shipped in under 1 hour and together will improve LCP, fix analytics, and correct the most damaging schema errors:

1. Delete broken font preload line from `index.html` (H4)
2. Remove duplicate `gtag.js` from `index.html` body (H2)
3. Move GTM snippet from `<head>` to `<body>` on all pages (H3)
4. Fix `"price": "0"` → `"250"` in WebApplication schema (C1)
5. Change all `.html` nav/footer hrefs to clean paths in `index.html` (C3)
6. Apply non-blocking font loading to `blog.html` (H5 — homepage only for speed)
