function config(acetate) {
  acetate.global('config', {
    environment: 'dev',
  });

  acetate.layout('**/*', 'layouts/_doc');
  acetate.layout('page-layouts/*.html', 'layouts/_blank:content');

  acetate.metadata('**/*', {
    data: {
      table_of_contents: 'table_of_contents.yml',
      icons: 'icons.json',
      font: 'icon-font.json'
    }
  });

  acetate.src = 'source';
  acetate.dest = 'build';

  acetate.notFound = '404.html';
}

module.exports = config;
