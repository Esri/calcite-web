import babel from 'rollup-plugin-babel';

export default {
  entry: './lib/js/calcite-web.js',
  dest: 'docs/build/assets/js/libs/calcite-web.js',
  format: 'umd',
  moduleName: 'calcite',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
