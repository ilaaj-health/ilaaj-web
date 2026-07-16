# New blog batch — July 2026 (45 posts, 15 days, 3/day)

Orchestrator plan. Two agents work off this file: **writer** (content) and
**imager** (sourcing). They do not depend on each other — the writer bakes in
a deterministic S3 image URL that the imager's approved image will later be
uploaded to at that exact key.

## Site architecture (read this before writing anything)

- Live blog is **Astro** (`astro build` → Vercel), NOT the old static-HTML/`publish-today.py` system (that's finished/retired).
- Every post = **one metadata entry** in `src/data/blog-posts.ts` (a `Post` object) **+ one or two article-body HTML files**:
  - `blog/{slug}.html` — Roman-Urdu / Pakistani-audience body. Rendered at `/pk/blog/{slug}`.
  - `blog/en/{slug}.html` — English body. Rendered at `/blog/{slug}` (the canonical, indexable URL). **Required** — without this file, `/blog/{slug}` renders `noindex` (see `src/pages/blog/[slug].astro`: `noindex={!hasEnVersion || isFuture}`). Every one of the 45 new posts needs BOTH files.
- Only the `<article>…</article>` element is extracted from each HTML file at build time (see `readArticle()` in `[slug].astro`) — everything outside `<article>` in these files is ignored by the Astro build, but keep full valid `<head>`/schema for consistency with the file being human-readable and matching the existing 154 files' structure exactly (open any existing file as your template — see "Templates to copy" below).
- **Scheduling is data-driven**, not marker-based. `posts[i].scheduled = 'YYYY-MM-DD'` (ISO date). If present and in the future, `index.astro` hides the card from the grid, and `[slug].astro`/`pk/blog/[slug].astro` sets `noindex,nofollow` on the page (I just fixed this gap in the templates — the fix depends on this field being set correctly). If `scheduled` is **omitted entirely**, the post is always live (this is what "Day 1 / today" posts should do — do NOT set `scheduled` for those 3).
- `sitemap.xml` (dynamic, `src/pages/sitemap.xml.ts`) auto-excludes future-scheduled posts. Nothing to do there.

## Templates to copy (read these full files before writing)

- Roman-Urdu condition post: `blog/acne-ka-ilaj.html` + its English twin `blog/en/acne-ka-ilaj.html`
- Medicine/tablet-uses post: `blog/brufen-400-uses.html` + `blog/en/brufen-400-uses.html`
- English-first informational post: `blog/en/ai-doctor-pakistan.html` (+ its pk twin `blog/ai-doctor-pakistan.html`)
- `blog-posts.ts` — read the `Post` interface (line 1) and 10-15 entries for exact field usage, especially `enTitle`/`enExcerpt` (used for the /blog card+meta; falls back to `title`/`excerpt` if absent — **always** set both `enTitle`+`enExcerpt` since these posts must read well in English).

Copy the exact `<head>` structure: SEO meta, canonical, hreflang, `og:*`, Twitter card,
`BlogPosting`/`MedicalWebPage`/`BreadcrumbList`/`FAQPage` JSON-LD (adapt content, keep
structure), `<meta name="robots">` (see note below on scheduled posts), navbar/footer
markup verbatim (do not touch nav/footer HTML — component structure is shared/expected
to be byte-similar across all blog files per the codebase convention).

**Do not introduce the known DOM-duplication bug** (SEO-AUDIT/FULL-AUDIT-REPORT flagged
existing posts with a duplicate `<h1>` or duplicated `<h2>` blocks — audit your own output,
each heading must appear exactly once).

## Content requirements (medical accuracy, YMYL)

- Match the existing posts' structure: TL;DR box, clear H2 sections, a "when to see a
  doctor" / red-flag section, a short FAQ block (3-5 Q&A, matches `FAQPage` schema),
  a medical disclaimer ("for informational purposes only, consult a licensed doctor"),
  and a CTA to `https://app.ilaaj.ai/chat`.
- Pakistan-specific context throughout (local brand names for medicines, PKR pricing
  where relevant, PMDC-doctor framing, common local terminology).
- **Do not fabricate statistics** ("1 in 4 Pakistanis…") unless the existing corpus
  already uses a similar generic framing for that exact claim — when unsure, use
  qualitative language ("very common in Pakistan") instead of inventing a number.
- For medicine posts: dosage, common brand names in Pakistan, contraindications,
  interactions, and an explicit pregnancy/breastfeeding note where relevant — mirror
  the rigor of `blog/dicloran-tablet-uses.html` or `blog/citanew-tablet-uses.html`.
- Length/depth: match existing files (roughly 25-40KB per HTML file, i.e. a full
  1200-2000 word article) — do not pad artificially, but do not thin out either.

## Image (do NOT skip — every post needs this baked in)

Every post's hero/og/card image is this **exact deterministic S3 URL** (no width
variants, single image reused everywhere — a human will upload the actual file to
this key later, so the URL must be typed exactly right):

```
https://ilaaj.s3.ap-southeast-2.amazonaws.com/blog/{slug}.jpg
```

Use it for: `og:image` meta, `blog-post__featured-image` `<img src>`, and the
`img:` field in the `blog-posts.ts` entry. Write an accurate, specific `alt` text
(and `og:image:alt`) describing what the image *should* show for this topic (e.g.
"Box of Omeprazole 20mg capsules" not "medicine") — the image-sourcing agent will
use your alt text as its search brief, so be precise and topic-accurate.

## The 45 topics, scheduled 3/day from today (2026-07-16)

**Day 1 — TODAY, do NOT set a `scheduled` field on these 3 (always live):**
| slug | cluster | language | brief |
|---|---|---|---|
| thyroid-ka-ilaj | condition | pk+en | Thyroid disorders (hypo/hyperthyroidism) — symptoms, causes, treatment in Pakistan |
| omeprazole-tablet-uses | medicine | pk+en | Omeprazole (PPI) — acidity/GERD/ulcer uses, dosage, brands in Pakistan |
| online-doctor-islamabad | city | pk+en | Online doctor access for Islamabad residents — like the existing Karachi/Lahore posts |

**Day 2 — `scheduled: '2026-07-17'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| gathiya-arthritis-ka-ilaj | condition | pk+en | Arthritis/joint inflammation — types, treatment, Pakistan context |
| deltacortril-tablet-uses | medicine | pk+en | Deltacortril (prednisolone) — corticosteroid uses, tapering warning |
| online-doctor-rawalpindi | city | pk+en | Online doctor access for Rawalpindi |

**Day 3 — `scheduled: '2026-07-18'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| fatty-liver-ka-ilaj | condition | pk+en | Fatty liver disease — causes, diet, reversal |
| ativan-tablet-uses | medicine | pk+en | Ativan (lorazepam) — anxiety, controlled-substance dependence warning |
| cbc-test-kya-hai | lab | pk+en | Complete Blood Count test explained — what it measures, normal ranges, when ordered |

**Day 4 — `scheduled: '2026-07-19'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| eczema-ka-ilaj | condition | pk+en | Eczema/atopic dermatitis — triggers, treatment, skincare |
| tramadol-tablet-uses-pakistan | medicine | pk+en | Tramadol — pain use, controlled-substance/addiction risk, legal status |
| online-doctor-faisalabad | city | pk+en | Online doctor access for Faisalabad |

**Day 5 — `scheduled: '2026-07-20'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| psoriasis-chambal-ka-ilaj | condition | pk+en | Psoriasis — chronic autoimmune skin condition, triggers, management |
| klaricid-tablet-uses | medicine | pk+en | Klaricid (clarithromycin) — antibiotic uses, interactions |
| hba1c-test-kya-hai | lab | pk+en | HbA1c test — diabetes monitoring, target ranges, how often to test |

**Day 6 — `scheduled: '2026-07-21'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| chakkar-vertigo-ka-ilaj | condition | pk+en | Vertigo/dizziness — causes (BPPV, Meniere's), treatment |
| cefspan-capsule-uses | medicine | pk+en | Cefspan (cefixime) — antibiotic uses in children/adults |
| online-doctor-multan | city | pk+en | Online doctor access for Multan |

**Day 7 — `scheduled: '2026-07-22'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| gardan-dard-ka-ilaj | condition | pk+en | Neck pain — posture, cervical spondylosis, treatment/exercises |
| ors-ghol-tareeqa | medicine | pk+en | ORS (oral rehydration solution) — correct mixing, use in dehydration/diarrhea, children |
| lft-test-kya-hai | lab | pk+en | Liver Function Test explained — what each marker means |

**Day 8 — `scheduled: '2026-07-23'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| ghutno-ka-dard-ka-ilaj | condition | pk+en | Knee pain — osteoarthritis, injury, treatment options |
| ferrous-sulphate-tablet-uses | medicine | pk+en | Ferrous sulphate (iron tablet) — anaemia treatment, side effects, absorption tips |
| online-doctor-peshawar | city | pk+en | Online doctor access for Peshawar |

**Day 9 — `scheduled: '2026-07-24'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| hernia-ka-ilaj | condition | pk+en | Hernia — types, symptoms, when surgery is needed |
| becosule-capsule-uses | medicine | pk+en | Becosule (B-complex + vitamin C) — supplement uses |
| lipid-profile-test-kya-hai | lab | pk+en | Lipid profile test — cholesterol/triglycerides explained |

**Day 10 — `scheduled: '2026-07-25'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| motia-cataract-ka-ilaj | condition | pk+en | Cataract (motia) — symptoms, surgery, elderly care in Pakistan |
| gaviscon-syrup-uses | medicine | pk+en | Gaviscon — acid reflux/heartburn relief, pregnancy safety |
| online-doctor-gujranwala | city | pk+en | Online doctor access for Gujranwala |

**Day 11 — `scheduled: '2026-07-26'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| daad-ringworm-ka-ilaj | condition | pk+en | Ringworm (daad) — fungal skin infection, treatment, contagion |
| panadol-syrup-bachon | medicine | pk+en | Panadol syrup for children — dosing by weight/age, safety |
| thyroid-tsh-test-kya-hai | lab | pk+en | TSH test — thyroid function screening explained |

**Day 12 — `scheduled: '2026-07-27'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| barss-vitiligo-ka-ilaj | condition | pk+en | Vitiligo (barss) — skin depigmentation, treatment, social stigma note |
| seretide-inhaler-uses | medicine | pk+en | Seretide inhaler — asthma/COPD maintenance, correct inhaler technique |
| online-doctor-sialkot | city | pk+en | Online doctor access for Sialkot |

**Day 13 — `scheduled: '2026-07-28'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| prostate-ka-ilaj | condition | pk+en | Prostate enlargement (BPH) — symptoms in older men, treatment |
| amoxil-capsule-uses | medicine | pk+en | Amoxil (amoxicillin) — common antibiotic uses, dosage, allergy warning |
| urine-test-kya-hai | lab | pk+en | Urine test (urine R/E) — what it screens for, UTI/kidney/diabetes |

**Day 14 — `scheduled: '2026-07-29'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| heartburn-ka-ilaj | condition | pk+en | Heartburn/acid reflux — triggers, lifestyle, when it's GERD |
| flagyl-syrup-bachon | medicine | pk+en | Flagyl syrup (metronidazole) for children — parasitic/bacterial infection use |
| online-mashwara-kaise-len | app | pk+en | How to get an online medical consultation via Ilaaj AI — step-by-step |

**Day 15 — `scheduled: '2026-07-30'`:**
| slug | cluster | language | brief |
|---|---|---|---|
| dexamethasone-tablet-uses | medicine | pk+en | Dexamethasone — steroid uses, dengue/COVID context, tapering warning |
| online-medicine-delivery-pakistan | app | pk+en | Online medicine delivery in Pakistan — how it works, safety of ordering online |
| ai-health-app-kaise-kaam-karta-hai | app | pk+en | How Ilaaj AI's triage + doctor-verification flow actually works |

## Deliverables (writer agent)

1. All 45 `blog/{slug}.html` + 45 `blog/en/{slug}.html` files (90 files total).
2. 45 new entries appended to `posts` array in `src/data/blog-posts.ts`, each with
   `slug, title, excerpt, date, img, alt, scheduled?, enTitle, enExcerpt` — `date`
   should read naturally e.g. `'July 16, 2026'`; omit `scheduled` only for the 3 Day-1 posts.
3. Run `astro build` yourself at the end and fix any build errors before finishing.
4. Report back: the final list of 45 slugs with their assigned image alt text (so
   the image-sourcing agent's briefs can be cross-checked), and confirm the build passed.

## Deliverables (image-sourcing agent — separate agent, works in parallel)

Source ONE accurate image per topic for all **51 targets**: the 45 new slugs above
(use the `brief` column for topic — an accurate alt text will also be produced by
the writer agent in parallel; if you start before that's ready, use the brief column)
PLUS these **6 existing posts with a dead/404 source image that need a replacement**:

| slug | topic | replaces dead photo id |
|---|---|---|
| folic-acid-tablet-uses | Folic acid supplement (pregnancy vitamin) tablets | pexels 3936593 |
| surbex-z-uses | Surbex Z (B-complex + zinc) supplement tablets | pexels 3958483 |
| azomax-tablet-uses | Azomax (azithromycin) antibiotic tablets | pexels 5327462 |
| leflox-tablet-uses | Leflox (levofloxacin) antibiotic tablets | pexels 5327462 |
| librax-tablet-uses | Librax tablets (IBS/anxiety medicine) | pexels 5491946 |
| motilium-tablet-uses | Motilium (domperidone) tablets | pexels 5959862 |

**Accuracy is non-negotiable**: a medicine post needs a real pill/tablet/blister-pack/
medicine-box image (ideally matching the actual drug class — an NSAID post should not
show a syringe); a condition post needs a genuinely relevant clinical/patient-context
image (e.g. vertigo → person holding head/dizzy, not an unrelated stock photo of a
"healthy" person); a city post needs a Pakistan-relevant telehealth/consultation image;
lab-test posts need an actual blood-draw/lab/test-tube image relevant to that specific
test. No generic "doctor with stethoscope smiling" filler unless the topic is genuinely
generic (e.g. the 3 app/SEO posts, where a telehealth-app-on-phone image is appropriate).

Source from Pexels or Unsplash (free, matches this site's existing convention) —
capture the source URL and license for each. Download full-resolution files to
`/Users/faisal/Documents/GitHub/ilaaj-web/blog-images-review/{slug}.jpg`.

**Do NOT upload anywhere.** Build a single self-contained HTML gallery at
`/Users/faisal/Documents/GitHub/ilaaj-web/blog-images-review/review.html` — a grid
showing, per slug: thumbnail, slug, topic/brief, the proposed alt text, image
dimensions, source URL, and license. This is for human approval before upload.

Report back when done: the gallery path, total images sourced, and flag any topic
you weren't confident finding an accurate image for (better to flag than guess).
