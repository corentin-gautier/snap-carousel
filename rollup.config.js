import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import html from 'rollup-plugin-html';
import postCss from 'rollup-plugin-postcss';

const minSettings = {
  mangle: {
    properties: {
      regex: /^_/,
    },
  }
};

export default {
  input: 'src/snap-carousel.js',
  output: [
    {
      file: 'docs/snap-carousel.dev.js',
      format: 'iife',
      plugins: [
        livereload({
          port: 7746
        })
      ]
    },
    {
      file: 'build/snap-carousel.js',
      format: 'iife',
      plugins: []
    },
    {
      file: 'build/snap-carousel.min.js',
      plugins: [terser(minSettings)]
    }
  ],
  format: 'es',
  plugins: [
    postCss({
      inject: false,
      minimize: true
    }),
    html({
      include: './src/**/*.html',
      htmlMinifierOptions: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: false,
        removeComments: true,
      }
    }),
    serve({
      contentBase: './docs'
    })
  ]
}
