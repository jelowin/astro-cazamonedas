// @ts-check
import { defineConfig } from 'astro/config';
import auth from 'auth-astro';
import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), auth()],
  output: 'server',
  adapter: vercel(),
});