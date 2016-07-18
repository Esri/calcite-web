var rollup = require('rollup');
var glob = require('glob');
var path = require('path');

glob('./lib/js/**.js', {}, compile)

function compile (err, files) {
  if (err) {
    console.error('oh no trubs!', err)
    return
  }
  files.forEach(function (file) {
    var filename = path.basename(file);
    rollup.rollup({
      entry: './dist/js/' + filename,
    }).then( function ( bundle ) {
      bundle.write({
        format: 'umd',
        dest: './dist/js/' + filename
      });
    });
  })
}
