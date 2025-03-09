import { copyFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  const isLibrary = mode === 'library';
  const buildFormat = process.env.VITE_BUILD_FORMAT || 'es';
  const shouldMinify = process.env.VITE_BUILD_MINIFY === 'true';

  const copyUmdFile = () => {
    const umdFile = resolve(__dirname, 'dist/snap-carousel.umd.min.js');
    // Copy to src directory
    copyFileSync(umdFile, resolve(__dirname, 'src/snap-carousel.umd.js'));
    // Copy to docs directory
    copyFileSync(umdFile, resolve(__dirname, 'docs/snap-carousel.umd.js'));
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
            // Ensure UMD build is copied to src directory after build
            chunkFileNames: 'chunks/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash][extname]',
            // Add auto-registration code for UMD builds
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
            // Only copy files when building UMD format and not minified
            if (buildFormat === 'umd' && !shouldMinify) {
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
    build: {
      outDir: '../docs',
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        input: resolve(__dirname, 'src/index.html'),
        preserveEntrySignatures: 'strict',
        output: {
          assetFileNames: `assets/[name].[hash].[ext]`
        },
        external: [/\.js$/]
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
        name: 'copy-umd-after-build',
        closeBundle() {
          // Copy UMD file after docs build
          copyUmdFile();
        }
      }
    ]
  };
});
