const fs = require('fs-extra');

fs.copySync('node_modules/@esri/calcite-colors/colors.scss', 'lib/sass/calcite-web/base/_calcite-colors.scss');
fs.copySync('node_modules/@esri/calcite-ui-icons/', 'lib/img/calcite-ui-icons');
fs.copySync('node_modules/@esri/calcite-ui-icons/docs/icons.json', 'docs/build/assets/js/icons.json');

if (process.argv[2] && process.argv[2] === '--dist') {
  fs.copySync('lib/sass/', 'dist/sass/');
  fs.copySync('lib/img/', 'dist/img/');
  fs.copySync('docs/build/assets/js/libs/', 'dist/js/');
} else {
  fs.copySync('node_modules/esri-global-nav/', 'docs/build/assets/global-nav/');
  fs.copySync('lib/img', 'docs/build/assets/img/');
  fs.copySync('docs/source/assets/', 'docs/build/assets/');
}
