var scssToJson = require('masa-scss-to-json/masa-scss-to-json');
var colors = scssToJson(process.cwd(), 'lib/sass/calcite-web/base/_colors.scss');

Object.keys(colors).forEach(key => {
  // convert three digit hex codes to six digits
  if (colors[key].length < 5) {
    colors[key] = colors[key] + colors[key].substr(-3);
  }
});

module.exports = function (callback) {
  return callback(null, colors);
};
