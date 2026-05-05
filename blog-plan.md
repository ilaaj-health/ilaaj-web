# Blog Publishing Plan — Ilaaj AI

**Strategy:** 3 articles per day for 13 days, May 5 → May 17, 2026. Drip-feed mimics organic publishing rhythm and avoids spam-detection flags.

**Today (May 4, 2026): 3 articles live.** The remaining 37 are written, deployed as files, but hidden from `blog.html` grid, `sitemap.xml`, and schema.org `ItemList` via `<!-- SCHEDULED:DATE -->` comments. Each scheduled article also has `<meta name="robots" content="noindex,follow">` so search engines don't index it before its publish day.

---

## Live now (May 4, 2026)

| # | Slug | Tier | Topic |
|---|---|---|---|
| 1 | sir-dard-ka-ilaj | Tier 2 | Headache treatment |
| 2 | pet-dard-ka-ilaj | Tier 2 | Stomach pain treatment |
| 3 | bukhar-ka-ilaj | Tier 2 | Fever (mosmi, dengue, typhoid) |

---

## Schedule

Each row = 1 day. Run `python3 publish-today.py` in the morning (or set up a cron job — see "Automation" below).

| Date | # | Slugs |
|---|---|---|
| **2026-05-05** | 4-6 | khansi-ka-ilaj, sugar-ka-ilaj, blood-pressure-ka-ilaj |
| **2026-05-06** | 7-9 | acne-ka-ilaj, baal-jhadne-ka-ilaj, periods-irregular-ka-ilaj |
| **2026-05-07** | 10-12 | depression-ka-ilaj, kamar-dard-ka-ilaj, gala-kharab-ka-ilaj |
| **2026-05-08** | 13-15 | qabz-ka-ilaj, allergy-ka-ilaj, motapa-kam-karne-ka-tarika |
| **2026-05-09** | 16-18 | panadol-uses-dosage, panadol-extra-uses, brufen-400-uses |
| **2026-05-10** | 19-21 | augmentin-625-uses, risek-20-uses, flagyl-tablet-uses |
| **2026-05-11** | 22-24 | arinac-forte-uses, calpol-syrup-dose, metformin-500-uses-urdu |
| **2026-05-12** | 25-27 | ponstan-tablet-uses, disprin-uses, ventolin-inhaler-uses |
| **2026-05-13** | 28-30 | imodium-capsule-uses, loprin-75-uses, velosef-500-uses |
| **2026-05-14** | 31-33 | ai-doctor-pakistan, ai-symptom-checker-pakistan, ai-prescription-pakistan |
| **2026-05-15** | 34-36 | chat-with-ai-doctor, ai-health-assistant-urdu, ilaaj-vs-marham-vs-oladoc |
| **2026-05-16** | 37-39 | sugar-kya-hai, blood-pressure-kya-hai, dengue-ki-alamat |
| **2026-05-17** | 40 | pregnancy-week-by-week-urdu *(last 1)* |

---

## How to publish each day

### Option A — automated (recommended)

```bash
cd /path/to/ilaaj-ai-web
python3 publish-today.py
git add -A && git commit -m "Publish blog posts for $(date +%F)" && git push
```

The script reads today's date, finds articles scheduled for today, and:

1. Removes `<!-- SCHEDULED:DATE -->` wrappers around the cards in `blog.html`
2. Removes wrappers around the `<url>` entries in `sitemap.xml` and updates `<lastmod>` to today
3. Removes the `<meta name="robots" content="noindex,follow">` tag from the article HTML files
4. Adds the new entries to the schema.org `ItemList` in `blog.html`

**Test before running for real:**
```bash
python3 publish-today.py --dry-run            # see today's plan
python3 publish-today.py 2026-05-07           # preview a future date
python3 publish-today.py 2026-05-07 --dry-run # both combined
```

### Option B — manual

If you'd rather hand-edit, the script is doing exactly this for each scheduled slug:

1. **`blog.html`** — find the block:
   ```html
   <!-- SCHEDULED:YYYY-MM-DD -->
   <!--
     <a href="blog/SLUG.html" class="blog-card">...</a>
   -->
   <!-- /SCHEDULED -->
   ```
   Strip the SCHEDULED comment markers. Leave the `<a>` tag in place.
2. **`blog.html` schema** — inside the `"itemListElement": [...]` array, add a new entry:
   ```json
   {"@type": "ListItem", "position": N+1, "url": "https://www.ilaaj.ai/blog/SLUG"}
   ```
3. **`sitemap.xml`** — same pattern as blog.html cards. Strip the wrappers. Update `<lastmod>` to today's date.
4. **`blog/SLUG.html`** — find this line near the top of `<head>`:
   ```html
   <meta name="robots" content="noindex,follow" data-scheduled="1">
   ```
   Replace with:
   ```html
   <meta name="robots" content="index, follow">
   ```

---

## Automation: daily cron / GitHub Action

If you want to fully automate this, add a GitHub Actions workflow `.github/workflows/publish-daily.yml`:

```yaml
name: Publish scheduled blog posts
on:
  schedule:
    - cron: '0 4 * * *'   # 09:00 PKT daily (04:00 UTC)
  workflow_dispatch:
jobs:
  publish:
    runs-on: ubuntu-latest
    permissions: { contents: write }
    steps:
      - uses: actions/checkout@v4
      - run: python3 publish-today.py
      - run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config user.name "Ilaaj Publish Bot"
            git config user.email "bot@ilaaj.ai"
            git add -A
            git commit -m "Publish blog posts for $(date +%F)"
            git push
          fi
```

Set this up once and ignore until May 18.

---

## After all 40 are published (May 18+)

- Re-submit `sitemap.xml` to Google Search Console (`https://search.google.com/search-console/sitemaps`)
- Run a fresh Semrush audit to verify zero errors
- Start tracking which articles get the most impressions/clicks in GSC
- Begin guest-post outreach (the next phase of the SEO plan)

---

## If something goes wrong

- **Script reports 0 articles for today** — either today's date doesn't have anything scheduled (check the table above), or the `<!-- SCHEDULED:DATE -->` markers were edited manually. Run `python3 publish-today.py YYYY-MM-DD --dry-run` for a specific past date to diagnose.
- **A card gets duplicated in `blog.html`** — happens if you run `publish-today.py` twice for the same day. The wrappers are gone after the first run, so the second run finds nothing to publish but won't duplicate.
- **You want to rearrange the schedule** — open `blog.html` and `sitemap.xml`, search for `SCHEDULED:` and edit the dates inline. The script reads dates from those markers, not from this doc.
- **You want to add an entirely new article** — generate it (same template as existing ones), wrap its card / sitemap entry in the `SCHEDULED:DATE` markers manually, add the noindex meta tag, and `publish-today.py` will pick it up on its date.

---

## Why 3 per day?

The "3 per day" cap isn't an official Google guideline — there's no documented limit. But going from 7 published articles to 47 in one day is a *spam-detection signal*. Google's algorithm flags publishing patterns that don't match natural human pace, especially in YMYL (medical) content. A drip of 3 per day for 13 days reads as "small content team consistently shipping" — which is what you want Google to think.

3 is also a useful rate practically — your PMDC doctors can review 3 articles overnight, leaving the morning for other work.
