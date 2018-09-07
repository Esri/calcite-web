var path = require('path');
var fs = require('fs');
var icons = require('@esri/calcite-ui-icons').icons;

module.exports = function (callback) {
  var iconArray = Object.keys(icons).map(key => {
    var icon = icons[key];
    icon.name = key;
    return icon;
  });
  callback(null, iconArray);
};
