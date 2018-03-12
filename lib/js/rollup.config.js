import buble from 'rollup-plugin-buble';
import minify from 'rollup-plugin-babel-minify';

let pkg = require('../../package.json');
let banner = `/*!
 * Calcite Web - Calcite Design Components in CSS, JS and HTML
 * @version v${pkg.version}
 * @license Apache-2.0
 * @copyright 2018 Esri
 * @link https://github.com/Esri/calcite-web
 */`;

export default [{
  input: './lib/js/calcite-web.js',
  output: {
    file: 'docs/build/assets/js/libs/calcite-web.js',
    format: 'umd',
    name: 'calcite',
    banner: banner
  },
  plugins: [
    buble({
      exclude: ['node_modules/**', '*.json']
    })
  ]
}, {
  input: './lib/js/calcite-web-marketing.js',
  output: {
    file: 'docs/build/assets/js/libs/calcite-web-marketing.js',
    format: 'umd',
    name: 'calciteMarketing',
    banner: banner
  },
  plugins: [
    buble({
      exclude: ['node_modules/**', '*.json']
    })
  ]
}, {
  input: './lib/js/calcite-web.js',
  output: {
    file: 'docs/build/assets/js/libs/calcite-web.min.js',
    format: 'umd',
    name: 'calcite'
  },
  plugins: [
    buble({
      exclude: ['node_modules/**', '*.json']
    }),
    minify({
      banner: banner,
      comments: false
    })
  ]
}, {
  input: './lib/js/calcite-web-marketing.js',
  output: {
    file: 'docs/build/assets/js/libs/calcite-web-marketing.min.js',
    format: 'umd',
    name: 'calciteMarketing'
  },
  plugins: [
    buble({
      exclude: ['node_modules/**', '*.json']
    }),
    minify({
      banner: banner,
      comments: false
    })
  ]
}];
