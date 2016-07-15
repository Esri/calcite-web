module.exports = function (acetate) {
  acetate.layout('index.html', 'layouts/_layout');
  acetate.layout('documentation/**/*', 'layouts/_doc');
  acetate.layout('examples/*', 'layouts/_examples');
  acetate.layout('page-layouts/*.html', 'layouts/_blank:content');
  acetate.data('table_of_contents', 'table_of_contents.yml');
  acetate.data('icons', 'icon-social.js');
  acetate.data('font', 'icon-font.js');
  acetate.data('pkg', '../../package.json');
  acetate.data('stats', '../../dist/css/stats.json');
};
