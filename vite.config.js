import terser from '@rollup/plugin-terser';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// Native private fields and class fields, no down-levelling helpers
const target = 'es2022';

// Strip line breaks and indentation from imported HTML templates
const minifyHtml = {
  name: 'minify-html',
  transform(code, id) {
    if (id.endsWith('.html?raw')) return code.replace(/\\n\s*/g, '');
  }
};

export default defineConfig(({ mode }) => {
  if (mode === 'library') {
    return {
      root: 'src',
      publicDir: false,
      build: {
        target,
        lib: {
          // Each entry is a public import path, features stay in their own
          // files so SnapCarousel can load them on demand
          entry: {
            'snap-carousel': resolve(__dirname, 'src/snap-carousel.js'),
            'base': resolve(__dirname, 'src/base-carousel.js'),
            'features/controls': resolve(__dirname, 'src/features/controls.js'),
            'features/nav': resolve(__dirname, 'src/features/nav.js'),
            'features/pager': resolve(__dirname, 'src/features/pager.js')
          },
          formats: ['es'],
          fileName: (format, entryName) => `${entryName}.js`
        },
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: false,
        // Vite keeps whitespace in ES library builds, terser does the full job
        minify: false,
        cssMinify: true,
        rollupOptions: {
          output: {
            chunkFileNames: 'chunks/[name]-[hash].js',
            plugins: [terser({ module: true, ecma: 2022 })]
          }
        }
      },
      plugins: [minifyHtml]
    };
  }

  return {
    root: 'src',
    base: '',
    publicDir: 'public',
    build: {
      target,
      outDir: '../docs',
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        input: resolve(__dirname, 'src/index.html'),
        output: {
          assetFileNames: `assets/[name].[ext]`
        }
      }
    },
    server: {
      open: '/index.html'
    },
    preview: {
      open: true
    }
  };
});
