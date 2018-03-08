let path = require('path');
let fs = require('fs');
let sqwish = require('sqwish');
let pkg = require('../package.json');
let banner = `/*!
 * Calcite Web - Calcite Design Components in CSS, JS and HTML
 * @version v${pkg.version}
 * @license Apache-2.0
 * @copyright 2018 Esri
 * @link https://github.com/Esri/calcite-web
 */
`;

fs.readdir('./dist/css/', function (er, files) {
  files.filter(filename => filename.indexOf('.css') > -1 && filename.indexOf('.min.css') === -1)
  .forEach(filename => {
    var filePath = `./dist/css/${filename}`;
    var minifiedPath = filePath.replace('.css', '.min.css');
    var contents = fs.readFileSync(`./dist/css/${filename}`, 'utf8');
    var minifiedContents = sqwish.minify(contents);
    fs.writeFileSync(minifiedPath, banner + minifiedContents);
    fs.writeFileSync(filePath, banner + contents);
  });
});
