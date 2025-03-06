import terser from '@rollup/plugin-terser';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'docs',
  server: {
    port: 10001,
    open: '/index.html',
    cors: true
  },
  publicDir: '../build',
  build: {
    outDir: '../build',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/snap-carousel.js'),
      name: 'SnapCarousel',
      fileName: (format) => `snap-carousel.min.js`,
      formats: ['iife']
    },
    rollupOptions: {
      external: ['window', 'document', 'Array', 'Object', 'Element', 'IntersectionObserver', 'clearTimeout', 'setTimeout', 'requestIdleCallback'],
      output: {
        globals: {
          window: 'window',
          document: 'document',
          Array: 'Array',
          Object: 'Object',
          Element: 'Element',
          IntersectionObserver: 'IntersectionObserver',
          clearTimeout: 'clearTimeout',
          setTimeout: 'setTimeout',
          requestIdleCallback: 'requestIdleCallback'
        }
      },
      plugins: [terser()]
    }
  }
});
