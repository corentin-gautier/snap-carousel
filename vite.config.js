import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const isLibraryBuild = command === 'build' && process.env.NODE_ENV !== 'development';

  return {
    root: 'docs',
    base: './',
    server: {
      port: 10001,
      open: '/index.html',
      cors: true
    },
    preview: {
      port: 10002,
      open: true
    },
    publicDir: 'public',
    build: isLibraryBuild ? {
      outDir: 'build',
      lib: {
        entry: resolve(__dirname, 'src/snap-carousel.js'),
        name: 'SnapCarousel',
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
          },
          entryFileNames: 'snap-carousel[hash].js',
          chunkFileNames: '[name].[hash].js',
          assetFileNames: '[name].[hash][extname]'
        }
      },
      sourcemap: false,
      minify: true
    } : {
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
  };
});
