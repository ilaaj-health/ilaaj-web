# GitHub Actions for Ilaaj Web

## daily-rebuild.yml — Auto-publish scheduled blog posts

This workflow triggers a Vercel deploy every day at **midnight Pakistan time** (00:01 PKT / 19:01 UTC).

Combined with the `scheduled` field on each blog post in `src/data/blog-posts.ts`, this means new posts auto-publish on their scheduled date with **zero manual work** — both the live HTML and the sitemap/Schema.org metadata get refreshed automatically.

### One-time setup (do this once, never again)

**1. Create a Vercel Deploy Hook**

- Open your Vercel project dashboard: <https://vercel.com/dashboard>
- Click your **ilaaj-web** project
- Go to **Settings** → **Git** → scroll to **Deploy Hooks**
- Click **Create Hook**
  - **Hook name**: `daily-blog-rebuild` (any name is fine)
  - **Git branch name**: `main` (or whatever branch Vercel deploys from — usually `main`)
- Click **Create Hook**
- **Copy the URL** that appears (looks like `https://api.vercel.com/v1/integrations/deploy/prj_xxx/yyyyy`)

**2. Add the URL as a GitHub secret**

- Open this repo on GitHub
- Go to **Settings** → **Secrets and variables** → **Actions**
- Click **New repository secret**
  - **Name**: `VERCEL_DEPLOY_HOOK` (must match this exact name)
  - **Secret**: paste the URL from step 1
- Click **Add secret**

**3. Test it (optional but recommended)**

- Go to the **Actions** tab in this repo
- Click **Daily Rebuild (auto-publish scheduled blog posts)** in the left sidebar
- Click **Run workflow** (top right) → **Run workflow**
- Wait ~30 seconds, then check Vercel — you should see a new deployment in the **Deployments** tab

That's it. From now on the site rebuilds automatically every night at midnight Pakistan time, and any blog posts whose `scheduled` date has passed go live in both the visible UI and the SEO metadata (sitemap, JSON-LD CollectionPage).

### How to schedule a new batch of articles

In `src/data/blog-posts.ts`, just add the entry with a `scheduled` field:

```ts
{
  slug: 'my-new-article',
  title: '...',
  excerpt: '...',
  date: 'June 7, 2026',         // displayed date (set to match scheduled)
  scheduled: '2026-06-07',      // ISO date, post unlocks at this date
  img: '...',
  alt: '...',
}
```

The post stays hidden until midnight PKT on June 7, then appears automatically.

### How to change the time

Edit the `cron:` line in `daily-rebuild.yml`. GitHub Actions cron syntax uses **UTC**.

- `'1 19 * * *'` = 19:01 UTC = 00:01 Pakistan time (current setting)
- `'0 0 * * *'` = midnight UTC = 05:00 Pakistan time
- `'0 1 * * *'` = 01:00 UTC = 06:00 Pakistan time

### What if I want to rebuild on demand?

Two options:
1. **GitHub UI**: Actions tab → Daily Rebuild → **Run workflow** button
2. **curl**: `curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_xxx/yyy"` (the deploy hook URL)
