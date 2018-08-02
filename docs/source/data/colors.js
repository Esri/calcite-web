var scssToJson = require('scss-to-json');
var path = require('path');
var colors = scssToJson('lib/sass/calcite-web/base/_colors.scss');

Object.keys(colors).forEach(key => {
  // convert three digit hex codes to six digits
  if (colors[key].length < 5) {
    colors[key] = colors[key] + colors[key].substr(-3);
  }
})

module.exports = function (callback) {
  callback(null, colors);
};
