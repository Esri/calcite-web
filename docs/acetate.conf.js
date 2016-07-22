module.exports = function (acetate) {
  acetate.layout('documentation/**/*', 'layouts/_doc');
  acetate.layout('examples/**/*', 'layouts/_examples');

  acetate.data('table_of_contents', 'table_of_contents.yml');
  acetate.data('stats', '../../dist/css/stats.json');
  acetate.data('pkg', '../../package.json');
  acetate.data('icons', './data/icon-social.js');
  acetate.data('font', './data/icon-font.js');
  acetate.data('repo', './data/repo.js');
};
