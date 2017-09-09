var svg = require('./source/data/svg-icon.js');
var font = require('./source/data/icon-font.js');
var icons = require('./source/data/icon-social.js');
var colors = require('./source/data/colors.js');
var repo = require('./source/data/repo.js');

module.exports = function (acetate) {
  acetate.load('**/*.+(md|html)');
  acetate.layout('documentation/**/*', 'layouts/_doc');
  acetate.layout('examples/**/*', 'layouts/_examples');
  acetate.data('table_of_contents', 'table_of_contents.yml');
  acetate.data('stats', 'data/stats.json');
  acetate.data('pkg', '../../package.json');
  acetate.data('colors', colors);
  acetate.data('icons', icons);
  acetate.data('font', font);
  acetate.data('svg', svg);
  acetate.data('repo', repo);
};
