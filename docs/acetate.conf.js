module.exports = function (acetate) {
  acetate.layout('documentation/**/*', 'layouts/_doc');
  acetate.layout('examples/*', 'layouts/_examples');
  acetate.layout('page-layouts/*.html', 'layouts/_blank:content');
  acetate.data('table_of_contents', 'table_of_contents.yml');
  acetate.data('icons', 'icon-social.js');
  acetate.data('font', 'icon-font.js');
};
