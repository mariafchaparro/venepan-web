import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [preact()],

  adapter: vercel(),
});
