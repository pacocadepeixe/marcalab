// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://marcalab.com.br',
  integrations: [
    sitemap({
      // Exclui páginas noindex (pós-contato, 404) do sitemap
      filter: (page) => !page.includes('/obrigado'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
