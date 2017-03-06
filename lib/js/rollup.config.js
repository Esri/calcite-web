import buble from 'rollup-plugin-buble';

export default {
  entry: './lib/js/calcite-web.js',
  dest: 'docs/build/assets/js/libs/calcite-web.js',
  format: 'umd',
  moduleName: 'calcite',
  plugins: [
    buble({
      exclude: ['node_modules/**', '*.json']
    })
  ]
};
