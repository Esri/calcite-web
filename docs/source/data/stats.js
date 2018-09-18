var sass = require('node-sass');
var cssstats = require('cssstats');

module.exports = function (callback) {
  var options = {
    file: "lib/sass/calcite-web.scss"
  };
  sass.render(options, function(err, result) {
    callback(err, cssstats(result));
  });
}
