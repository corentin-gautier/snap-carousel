import { defineConfig } from 'vite';

export default defineConfig({
  root: 'docs',
  base: '/',
  server: {
    port: 10001,
    open: '/index.html',
    cors: true
  },
  preview: {
    port: 10002,
    open: true
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "sass:math"; @use "sass:color";'
      }
    }
  }
});
