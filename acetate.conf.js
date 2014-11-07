var folder = require('acetate-folder');
var partial = require('acetate-partial');

function config(acetate) {
  acetate.global('config', {
    environment: 'dev',
  });

  acetate.layout('**/*', 'layouts/_layout');

  acetate.options.src = 'docs/source';
  acetate.options.dest = 'docs/build';

  acetate.use(folder());
  acetate.use(partial());
}

module.exports = config;