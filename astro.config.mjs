import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel/serverless';

import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel({
    mode: 'standalone',
    webAnalytics: { enabled: true }
  }),
  integrations: [svelte(), tailwind()],
});

