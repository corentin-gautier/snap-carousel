import { resolve } from 'path';
import { terser } from 'rollup-plugin-terser';
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  const isLibrary = mode === 'library';

  return {
    root: 'src',
    base: isLibrary ? '/' : '',
    build: isLibrary ? {
      lib: {
        entry: {
          'snap-carousel': resolve(__dirname, 'src/snap-carousel.js'),
          'base-carousel': resolve(__dirname, 'src/base-carousel.js'),
          'features/controls': resolve(__dirname, 'src/features/controls.js'),
          'features/nav': resolve(__dirname, 'src/features/nav.js'),
          'features/pager': resolve(__dirname, 'src/features/pager.js')
        },
        formats: ['es'],
        fileName: (format, entryName) => `${entryName}.${format}.js`
      },
      outDir: '../dist',
      rollupOptions: {
        external: ['window', 'document', 'IntersectionObserver', 'MutationObserver', 'CustomEvent', 'requestIdleCallback'],
        output: {
          preserveModules: true,
          ...(mode === 'library' && {
            format: 'iife',
            name: 'SnapCarousel',
            entryFileNames: '[name].iife.js',
            extend: true,
            globals: {
              window: 'window',
              document: 'document',
              IntersectionObserver: 'IntersectionObserver',
              MutationObserver: 'MutationObserver',
              CustomEvent: 'CustomEvent',
              requestIdleCallback: 'requestIdleCallback'
            }
          })
        },
        plugins: [
          terser({
            format: {
              comments: false
            }
          })
        ]
      },
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
