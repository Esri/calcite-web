var scssToJson = require('scss-to-json');
var path = require('path');
var colors = scssToJson('lib/sass/calcite-web/base/_colors.scss');

module.exports = function (callback) {
  callback(null, colors);
};
