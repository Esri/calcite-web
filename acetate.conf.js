var folder = require('acetate-folder');

function config(acetate) {
  acetate.global('config', {
    environment: 'dev',
  });

  acetate.layout('**/*', 'layouts/_layout:content');

  acetate.options.src = 'docs/source';
  acetate.options.dest = 'docs/build';

  acetate.use(folder());
}

module.exports = config;