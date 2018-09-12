var colors = require('@esri/calcite-colors');

Object.keys(colors).forEach(key => {
  // convert three digit hex codes to six digits
  if (colors[key].length < 5) {
    colors[key] = colors[key] + colors[key].substr(-3);
  }
})

module.exports = function (callback) {
  callback(null, colors);
};
