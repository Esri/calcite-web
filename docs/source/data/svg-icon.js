var path = require('path');
var fs = require('fs');

module.exports = function (callback) {
  return fs.readdir('lib/img/icons/ui', function (er, files) {
    files = files.filter(function (filename) {
      return filename.indexOf("svg") > -1;
    }).map(function (filename) {
      var name = path.basename(filename, '.svg');
      var source = fs.readFileSync('lib/img/icons/ui/' + filename, 'utf8');
      return {name: name, source: source}
    });
    callback(er, files);
  });
};
