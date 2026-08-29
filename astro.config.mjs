import { defineConfig } from 'astro/config';

const base = process.env.BASE_PATH || '/';
const siteUrl = process.env.SITE_URL;

export default defineConfig({
  output: 'static',
  site: siteUrl,
  base,
  build: {
    format: 'directory',
  },
});
