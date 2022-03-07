import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    envDir: process.cwd(),
    build: {
        outDir: 'dist/main',
        lib: {
            entry: 'package/main/src/main.ts',
            name: '[name].cjs',
            formats:['cjs'],
        },
        sourcemap: false,
        minify: false,
        emptyOutDir: true,
        rollupOptions: {
            external: [
                'electron'
            ],
            output: {
                entryFileNames: 'index.cjs'
            }
        }
    }    
})