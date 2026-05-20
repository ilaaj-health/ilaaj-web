# ilaaj-web — Project Rules

## Stack
- **Framework**: Astro (static site generation)
- **Styling**: Plain CSS (no Tailwind, no CSS-in-JS)
- **Deployment**: Vercel
- **Languages**: English (`en`) + Urdu (`ur`) — Astro i18n routing

## Code Rules
- **Max 100 lines per file** — no exceptions. Split components if needed.
- No inline styles. All styles in `/src/styles/` or component-scoped `<style>` blocks.
- No JavaScript unless absolutely necessary. Astro is zero-JS by default — keep it that way.
- Clean, semantic HTML only.

## Project Structure
```
src/
  components/     # Reusable .astro components (<100 lines each)
  layouts/        # Page layouts (BaseLayout, BlogLayout)
  pages/
    en/           # English pages
    ur/           # Urdu pages
  i18n/           # Translation strings (en.ts, ur.ts)
  styles/         # Global CSS files
public/           # Static assets (images, icons, fonts)
```

## i18n Rules
- All user-facing strings must go through the i18n system — never hardcode text in components.
- Translation files: `src/i18n/en.ts` and `src/i18n/ur.ts`
- Urdu pages use `dir="rtl"` on `<html>`.
- Default language: `en`. Urdu at `/ur/...`.
- Use Astro's built-in i18n routing (`astro.config.ts` i18n config).

## Analytics & Scripts
- PostHog, GTM, Sentry scripts go in `BaseLayout.astro` only — never in individual pages.
- Ad traffic redirect script (fbclid/gclid → app.ilaaj.ai/chat) goes in BaseLayout head.

## SEO
- Every page must have: `<title>`, `<meta name="description">`, `<link rel="canonical">`, hreflang tags for en/ur.
- SEO meta handled via a dedicated `<SEO />` component.

## Blog
- Blog posts as Astro Content Collections (`src/content/blog/`).
- Frontmatter: `title`, `description`, `lang`, `slug`, `pubDate`, `author`.
- Separate collections or `lang` field to distinguish en/ur posts.

## Do Not
- Do not use React, Vue, or any other UI framework.
- Do not use Tailwind.
- Do not put scripts or styles inline in page files.
- Do not create files over 100 lines.
