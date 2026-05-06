import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ilaaj.ai',
  compressHTML: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
