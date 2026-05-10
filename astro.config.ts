import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ilaaj.ai',
  compressHTML: true,
  i18n: {
    defaultLocale: 'pk',
    locales: ['pk', 'en', 'ur'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
