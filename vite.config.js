import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import components from 'unplugin-vue-components/vite';
import autoImport from 'unplugin-auto-import/vite';
import { VarletUIResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '~@': resolve(__dirname, './src'),
        },
    },
    plugins: [
        vue(),
        components({
            resolvers: [VarletUIResolver()],
        }),
        autoImport({
            resolvers: [VarletUIResolver({ autoImport: true })],
        }),
    ],
    server: {
        host: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8080/',
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
