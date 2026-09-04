import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: '404.html',
            precompress: false,
            strict: false,
        }),
        prerender: {
            handleHttpError: ({ path, message }) => {
                if (
                    path.startsWith('/Xcratch') ||
                    path.startsWith('/pages/Xcratch')
                ) {
                    return;
                }
                throw new Error(message);
            },
        },
    },
};

export default config;
