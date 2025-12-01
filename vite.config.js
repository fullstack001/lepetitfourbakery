import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

const isLocal = process.env.NODE_ENV === 'development';

const getScrambledTimestamp = () => {
    const timestamp = Date.now().toString();

    return timestamp
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');
};

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            ssr: 'resources/js/ssr.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    ...(isLocal ? {
        server: {
            cors: true,
            host: '127.0.0.1',
        },
    } : {}),
    build: {
        rollupOptions: {
            output: {
                // entryFileNames: () => `[hash]-${getScrambledTimestamp()}.js`,
                chunkFileNames: () => `assets/[hash]-${getScrambledTimestamp()}.js`,
                assetFileNames: () => `assets/[hash]-${getScrambledTimestamp()}.[ext]`,
            },
        },
    },
});
