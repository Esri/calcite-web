var folder = require('acetate-folder');
var partial = require('acetate-partial');

function config(acetate) {
  acetate.global('config', {
    environment: 'dev',
  });

  acetate.layout('**/*', 'layouts/_layout');

  acetate.src = 'docs/source';
  acetate.dest = 'docs/build';

  acetate.use(folder());
  acetate.use(partial());
}

module.exports = config;