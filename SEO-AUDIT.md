# Ilaaj AI — SEO Audit & Global Strategy

_Prepared June 8, 2026. Scope: technical SEO of the codebase + live build, content positioning, and the path to "global English" traffic for "online doctor."_

---

## 0. Strategy — Pakistan-first, with global reach as a byproduct

**Decision (June 8):** dominate **Pakistan first**, target the **Pakistani diaspora** as the one genuinely global segment we can serve, and let the medicine/symptom library pull international traffic on its own. We are *not* chasing the generic global "online doctor" head term. Here's the reasoning that drove that call:

**The constraint isn't SEO difficulty — it's that the site, and the business, is Pakistan-bound:**

- Every prescription is signed by a **PMDC-registered doctor**. A PMDC license is only valid for patients in Pakistan. If a user in the US, UK, or Nigeria searches "online doctor," lands on you, and gets a prescription, that prescription is **not legally valid in their country** and no pharmacy will fill it. So even if you rank, you can't convert or fulfill.
- The keyword **"online doctor"** globally is one of the most contested medical queries on the internet — Teladoc, Amwell, PlushCare, Sesame, MDLIVE, Babylon, the NHS, Push Doctor. These spend millions and have years of domain authority and medical-review E-E-A-T. A new ilaaj.ai page will not crack page 1 for the bare term in any English market for a long time.
- Google treats "online doctor" as **YMYL** (Your Money or Your Life). It demands strong author credentials, medical review, and brand trust signals tied to the user's jurisdiction. A Pakistan-licensed brand will be filtered down in, say, US/UK results.

**Where global English actually works for you (recommended framing):**

1. **Pakistani diaspora** — Pakistanis in the UK, US, Canada, Gulf, and Saudi searching for *Urdu-speaking online doctor*, *Pakistan online doctor for family back home*, *send prescription to Pakistan pharmacy*. Low competition, you genuinely serve it (the patient/family is in Pakistan), high intent. This is the real global win.
2. **Top-of-funnel informational content** that ranks anywhere — "augmentin 625 uses," "panadol dosage," "dengue symptoms," "metformin side effects." These pull global English + Roman-Urdu traffic and you already have ~50 such posts. This builds domain authority that *then* helps everything else.
3. **Brand + product queries** — "ilaaj ai," "AI doctor," "AI symptom checker" — winnable globally because the competition is thin and you have a genuine product angle.

**The plan:** **(a)** lock down Pakistan + diaspora as the conversion engine, **(b)** scale the medicine/symptom informational library for global organic reach and authority, and **(c)** revisit the head term "online doctor" only after we have domain authority *and* a credentialing/fulfillment model for at least one non-PK market. The technical fixes in this audit support this path; none of the work is market-specific, so it stays valid if priorities shift later.

---

## 1. Critical — fix immediately (blocking your stated goal)

**1.1 Google Search Console verification is a broken placeholder.**
`src/components/SEO.astro` line 31 ships on **every page**:
```html
<meta name="google-site-verification" content="REPLACE_WITH_GSC_VERIFICATION_CODE" />
```
If you verified GSC another way (DNS/file) you're fine, but the meta method is dead. You literally asked to "connect to GSC" — this is step zero. Get the real code from Search Console → Settings → Ownership verification, or verify via DNS TXT record (more robust for a multi-subdomain setup with `app.ilaaj.ai`). Until GSC is verified you have **zero** query/impression/click data, no index-coverage reports, and no way to submit the sitemap.

**1.2 Decide the canonical domain and confirm one is enforced.**
Site is set to `https://www.ilaaj.ai`. Make sure `ilaaj.ai` (non-www) and any `http://` 301-redirect to it (Vercel usually handles this — verify in GSC once connected). Mixed signals here silently split ranking.

---

## 2. Technical SEO findings

**2.1 Structured data — mostly strong, but inconsistent.**
Good news: the site already ships rich schema — `MedicalOrganization`, `Physician`, `BlogPosting`, `MedicalWebPage`, `FAQPage`, `BreadcrumbList`, `WebSite` + `SearchAction`. That's better than most health sites and a real asset. **But** spot-checks found some rendered blog posts (e.g. `/blog/online-doctor-lahore/`, `/blog/bukhar-ka-ilaj/`) shipping **no** Article/Medical schema, while others have full markup. The `src/pages/blog/[slug].astro` renderer extracts only the `<article>` body from the source HTML and **strips the `<head>` JSON-LD**. Result: schema coverage is patchy. Fix: generate `BlogPosting` + `MedicalWebPage` schema in the Astro template itself (from the post frontmatter) so every post gets it uniformly, including `author` with real credentials and `reviewedBy` a named doctor — this is the single biggest E-E-A-T lever for medical content.

**2.2 hreflang is incomplete and slightly mislabeled.**
Current output: `hreflang="en"`, `hreflang="ur-PK"` (the `/pk` Roman-Urdu pages), `x-default`. Issues:
- The Nastaliq Urdu pages (`/ur/`) only emit an `ur` tag when `hasUrdu` is true, so most templates omit `/ur` from the cluster entirely.
- `/pk` (Roman Urdu in Latin script) is tagged `ur-PK`, which technically means Urdu-script. For Roman Urdu there's no perfect code; `ur-PK` is defensible, but be consistent.
- For global English, the `en` (no region) tag is correct — keep it. Just make sure **every** language variant lists **all** siblings reciprocally, or Google ignores the annotations.

**2.3 Sitemap gaps.**
`src/pages/sitemap.xml.ts` omits: the `/ur/` pages, the `/pk/blog/<slug>` posts, and contains **no hreflang annotations** (`<xhtml:link>`). For a multilingual site, hreflang-in-sitemap is the most reliable signal. Also it lists all posts at `/blog/<slug>` even when that path is `noindex` (posts without an EN version canonicalize to `/pk/blog/...` and are noindexed) — you're advertising noindex URLs in the sitemap, which wastes crawl budget. Emit each post at its indexable URL only.

**2.4 Homepage title is Pakistan-locked.**
`<title>Ilaaj AI — Pakistan's First AI Health Platform</title>`. Perfect for Pakistan/diaspora, actively harmful for generic global ranking. If you keep the global ambition, the homepage `<title>` and `<h1>` need to lead with the *value/intent* ("AI Doctor Online — Chat & Get a Doctor-Verified Prescription") and place "Pakistan" as a served-market detail, not the headline. (But see §0 — I'd keep Pakistan front-and-center and win that first.)

**2.5 Stale/low-value tags.**
`<meta name="keywords">` is still emitted — Google has ignored it since 2009 and it leaks your keyword targets to competitors. Remove it.

**2.6 Performance / Core Web Vitals.**
Good engineering: all third-party tags (PostHog, GTM, Sentry, Clarity, Meta Pixel, Tawk.to) are lazy-loaded after interaction/idle. That protects LCP. Watch two things: the Tawk.to chat widget (heavy, loads at 4s) and the `ipinfo.io` geo-fetch on load. Run the live pages through PageSpeed Insights once GSC is connected and track CWV in the Search Console report.

**2.7 Robots & llms.txt — fine.**
`robots.txt` is clean and points to the sitemap. The `llms.txt` is a nice forward-looking touch for AI-search visibility (ties into Ahrefs Brand Radar / AI-citation tracking below).

---

## 3. Content & keyword strategy for the goal

**3.1 You're already sitting on the right asset.** ~50 medicine + symptom posts (Roman Urdu/English: "augmentin 625 uses," "panadol dosage," "metformin side effects," "dengue symptoms"). These are **globally searchable, lower-competition, and they build the domain authority** that head terms require. Prioritize expanding and polishing these over chasing "online doctor."

**3.2 Target the winnable clusters, in order:**
1. **Diaspora intent:** "online doctor for parents in Pakistan," "Urdu speaking online doctor UK," "online prescription Pakistan from abroad."
2. **City/long-tail (you have these):** "online doctor Karachi/Lahore" — expand to Islamabad, Faisalabad, Rawalpindi, Multan, Peshawar.
3. **Medicine/condition library:** the single most scalable global-organic play. One post per common drug and per common condition, each with doctor review + schema.
4. **Comparison/brand:** "ilaaj vs marham vs oladoc," "best AI health app Pakistan," "AI symptom checker" — you already rank-ready content here.

**3.3 E-E-A-T is non-negotiable for medical.** Add visible author bylines with credentials, a "medically reviewed by Dr. X (PMDC #…)" line and date on every post, and link author names to their `/doctors/<slug>` profile (you already have Physician schema there). This is what lets a smaller site outrank bigger ones in YMYL.

---

## 4. Recommended tools / connectors

There is **no first-party Google Search Console MCP** in the registry, so GSC data comes in one of two ways: connect it inside Semrush/Ahrefs, or pull it via an aggregator (Supermetrics). I surfaced three with Connect buttons in chat:

- **Semrush** — keyword research, organic/competitor research, site audit, position tracking. Best all-rounder for building the keyword map and watching Marham/Oladoc.
- **Ahrefs** — backlinks (your weakest area as a newer domain), plus "Brand Radar" for AI-search/LLM citation tracking, which pairs with your `llms.txt`.
- **Supermetrics** — pipes **Google Search Console + Google Analytics + Google Ads** data into reports; this is your practical route to GSC numbers here.
- **Microsoft Clarity** — already connected (heatmaps + session recordings); useful for conversion/UX once traffic lands.

You don't need all three paid tools. Start with **one** (Semrush *or* Ahrefs) + verify GSC, then layer Supermetrics if you want automated reporting.

---

## 5. Prioritized action list

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | Verify GSC (DNS TXT preferred) + submit sitemap; replace the placeholder meta | Unblocks all data | XS |
| 2 | Generate `BlogPosting` + `MedicalWebPage` + `reviewedBy` schema in `[slug].astro` for every post | High (E-E-A-T, rich results) | M |
| 3 | Add visible "medically reviewed by Dr. X" bylines linked to doctor profiles | High (YMYL trust) | S |
| 4 | Fix sitemap: add hreflang annotations, include `/ur` + `/pk/blog`, drop noindex URLs | Medium | S |
| 5 | Lock hreflang reciprocity across en / pk / ur; remove `meta keywords` | Medium | S |
| 6 | Connect one SEO tool + build the diaspora + medicine keyword map | High (direction) | M |
| 7 | Expand city pages + medicine/condition library (highest-ROI content) | High (scalable traffic) | Ongoing |
| 8 | Re-title homepage only if committing to global; otherwise keep Pakistan-led | Strategic | S |

---

_Next step suggestion: connect GSC + one SEO tool, then I can pull your current impressions/keywords and turn §3 into a concrete 90-day content calendar. I can also start implementing items 1–5 directly in the codebase now if you want._
