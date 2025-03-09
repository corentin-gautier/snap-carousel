import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  const isLibrary = mode === 'library';
  const buildFormat = process.env.VITE_BUILD_FORMAT || 'es';
  const shouldMinify = process.env.VITE_BUILD_MINIFY === 'true';

  const copyUmdFile = () => {
    const umdFile = resolve(__dirname, 'dist/snap-carousel.umd.min.js');
    // Copy to public directory
    copyFileSync(umdFile, resolve(__dirname, 'src/public/snap-carousel.umd.min.js'));
  };

  if (isLibrary) {
    return {
      root: 'src',
      base: '/',
      build: {
        lib: {
          entry: resolve(__dirname, 'src/snap-carousel.js'),
          formats: [buildFormat],
          fileName: (format, entryName) => {
            const formatSuffix = format === 'es' ? 'esm' : format;
            const minSuffix = shouldMinify ? '.min' : '';
            return `${entryName}.${formatSuffix}${minSuffix}.js`;
          },
          name: 'SnapCarousel'
        },
        outDir: '../dist',
        sourcemap: false,
        minify: shouldMinify ? 'terser' : false,
        rollupOptions: {
          output: {
            chunkFileNames: 'chunks/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash][extname]',
            footer: (chunk) => {
              if (buildFormat === 'umd' && chunk.isEntry) {
                return `
                  if (typeof window !== 'undefined') {
                    window.addEventListener('DOMContentLoaded', function() {
                      if (!customElements.get('snap-carousel')) {
                        customElements.define('snap-carousel', SnapCarousel.default);
                      }
                    });
                  }`.replace(/^\s+/gm, '');
              }
              return '';
            }
          }
        }
      },
      plugins: [
        {
          name: 'copy-umd',
          closeBundle() {
            if (buildFormat === 'umd' && shouldMinify) {
              copyUmdFile();
            }
          }
        }
      ]
    };
  }

  return {
    root: 'src',
    base: '',
    publicDir: 'public',
    build: {
      outDir: '../docs',
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        input: resolve(__dirname, 'src/index.html'),
        preserveEntrySignatures: 'strict',
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
    },
    plugins: [
      {
        name: 'copy-umd-to-assets',
        buildStart() {
          // Create assets directory if it doesn't exist
          const assetsDir = resolve(__dirname, 'docs/assets');
          if (!existsSync(assetsDir)) {
            mkdirSync(assetsDir, { recursive: true });
          }
        },
        generateBundle() {
          // Copy UMD file if it exists
          const umdFile = resolve(__dirname, 'dist/snap-carousel.umd.min.js');
          if (existsSync(umdFile)) {
            copyUmdFile();
          }
        }
      },
      {
        name: 'handle-external-scripts',
        transformIndexHtml(html) {
          // Don't transform external script tags
          return html;
        }
      }
    ]
  };
});
