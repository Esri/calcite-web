var rollup = require('rollup');
var glob = require('glob');
var path = require('path');
var babel = require('rollup-plugin-babel');

glob('./lib/js/**.js', {}, compile)

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function compile (err, files) {
  if (err) {
    console.error('oh no trubs!', err)
    return
  }
  files.forEach(function (file) {

    var filename = path.basename(file);
    var arr = filename.split('-')
    var moduleName = arr[0]
    var extension = arr[arr.length - 1]

    if (extension != 'web.js') {
      extension = extension.split('.')[0]
      moduleName = moduleName + capitalize(extension)
    }
    rollup.rollup({
      entry: './lib/js/' + filename,
      plugins: [
        babel({exclude: 'node_modules/**'})
      ]
    }).then( function ( bundle ) {
      bundle.write({
        format: 'umd',
        moduleName: moduleName,
        dest: './dist/js/' + filename
      });
    });
  })
}
