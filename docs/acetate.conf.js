var partial = require('acetate-partial');

function config(acetate) {
  acetate.global('config', {
    environment: 'dev',
  });

  acetate.layout('**/*', 'layouts/_layout');

  acetate.metadata('**/index.html', {
    data: {
      table_of_contents: 'table_of_contents.yml'
    }
  });

  acetate.src = 'docs/source';
  acetate.dest = 'docs/build';

  acetate.use(partial());
}

module.exports = config;