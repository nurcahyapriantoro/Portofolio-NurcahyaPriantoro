import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://nurcahyapriantoro.github.io',
  base: '/Portofolio-NurcahyaPriantoro',
  trailingSlash: 'ignore',
  integrations: [sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    responsiveStyles: true,
  },
});
