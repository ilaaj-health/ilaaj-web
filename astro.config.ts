import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.ilaaj.ai',
  output: 'static',
  adapter: vercel(),
  compressHTML: true,
  integrations: [],
  i18n: {
    defaultLocale: 'pk',
    locales: ['pk', 'en', 'ur'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
