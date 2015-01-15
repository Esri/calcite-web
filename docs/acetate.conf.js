var partial = require('acetate-partial');

function config(acetate) {
  acetate.global('config', {
    environment: 'dev',
  });

  acetate.layout('**/*', 'layouts/_layout');
  acetate.layout('page-layouts/*.html', 'layouts/_blank:content');

  acetate.metadata('**/index.html', {
    data: {
      table_of_contents: 'table_of_contents.yml'
    }
  });

  acetate.src = 'source';
  acetate.dest = 'build';

  acetate.notFound = '404.html';

  acetate.use(partial());
}

module.exports = config;