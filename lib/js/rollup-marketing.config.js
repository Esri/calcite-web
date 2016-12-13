import babel from 'rollup-plugin-babel';

export default {
  entry: './lib/js/calcite-web-marketing.js',
  dest: 'docs/build/assets/js/libs/calcite-web-marketing.js',
  format: 'umd',
  moduleName: 'calciteMarketing',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
