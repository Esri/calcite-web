import buble from 'rollup-plugin-buble';

export default {
  entry: './lib/js/calcite-web-marketing.js',
  dest: 'docs/build/assets/js/libs/calcite-web-marketing.js',
  format: 'umd',
  moduleName: 'calciteMarketing',
  plugins: [
    buble({
      exclude: ['node_modules/**', '*.json']
    })
  ]
};
