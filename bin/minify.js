var glob = require('glob')
var minifier = require('minifier')

glob('./dist/css/**.css', {ignore: './dist/css/**.min.css'}, minify)
glob('./dist/js/**.js', {ignore: './dist/js/**.min.js'}, minify)

function minify (err, files) {
  if (err) {
    console.error('Oh no trubs!', err);
    return;
  }
  files.forEach(function (file) {
    minifier.minify(file);
  });
}