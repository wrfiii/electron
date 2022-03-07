import { defineConfig } from "vite";

export default defineConfig({
    envDir: process.cwd(),
    build: {
        outDir: 'dist/preload',
        lib: {
            entry: 'package/preload/src/main.ts',
            formats: ['cjs'],
        },
        sourcemap: false,
        minify: false,
        rollupOptions: {
            external: [
                'electron'
            ],
            output: {
                entryFileNames: 'index.cjs'
            }
        }
    },
})