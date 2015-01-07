var folder = require('acetate-folder');
var partial = require('acetate-partial');

function config(acetate) {
  acetate.global('config', {
    environment: 'dev',
  });

  acetate.layout('**/*', 'layouts/_layout');

  acetate.metadata('index.html', {
    data: {
      table_of_contents: 'table_of_contents.yml'
    }
  });

  acetate.src = 'source';
  acetate.dest = 'build';

  acetate.use(folder());
  acetate.use(partial());
}

module.exports = config;