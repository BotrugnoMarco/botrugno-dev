// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import lastmod from './integrations/lastmod.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://botrugno.dev',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: {
        defaultLocale: 'it',
        locales: { it: 'it-IT', en: 'en-US' },
      },
    }),
    // dopo sitemap(): aggiunge <lastmod> al file che sitemap() ha appena scritto
    lastmod(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});