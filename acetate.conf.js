var acetateKSS = require('acetate-kss');
var styleguide = require('acetate-kss/styleguide');

function config(acetate) {
  acetate.global('config', {
    environment: 'dev',
  });

  acetate.layout('**/*', 'layouts/_layout:content');

  acetate.options.src = 'docs/source';
  acetate.options.dest = 'docs/build';

  acetate.use(acetateKSS({
    sassDir: 'lib/sass/',
    markdown: true
  }));

  acetate.use(styleguide({
    template: 'partials/_styleguide_block.html'
  }));
}

module.exports = config;