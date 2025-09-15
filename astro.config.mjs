import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import node from '@astrojs/node'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact()],
  output: 'static',
  adapter: node({
    mode: 'standalone'
  })
});