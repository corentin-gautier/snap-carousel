import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  const isLibrary = mode === 'library';

  return {
    root: 'src',
    base: isLibrary ? '/' : '',
    build: isLibrary ? {
      lib: {
        entry: resolve(__dirname, 'src/snap-carousel.js'),
        name: 'SnapCarousel',
        formats: ['es', 'iife'],
        fileName: (format) => `snap-carousel${format === 'iife' ? '.min' : ''}.js`
      },
      rollupOptions: {
        external: ['window', 'document'],
        output: {
          globals: {
            window: 'window',
            document: 'document'
          }
        }
      },
      minify: 'esbuild',
      sourcemap: false
    } : {
      outDir: '../docs',
      emptyOutDir: true
    },
    server: {
      open: '/index.html'
    },
    preview: {
      open: true
    }
  };
});
