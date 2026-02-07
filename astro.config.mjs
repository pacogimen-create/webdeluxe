import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel(),
    build: {
        inlineStylesheets: 'auto',
    },
    vite: {
        build: {
            cssMinify: true,
        },
    },
});
