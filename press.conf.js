var pressKSS = require('press-kss');
var styleguide = require('press-kss/styleguide');

function config(press) {
  press.global('config', {
    environment: 'dev'
  });

  //press.ignore('ignore-me.html');

  press.layout('**/*', 'layouts/_layout:content');

  press.use(pressKSS({
    sassDir: 'lib/sass/',
    markdown: true
  }));

  press.use(styleguide({
    template: 'partials/_styleguide_block.html'
  }));
}

config.options = {
  src: 'docs/source',
  dest: 'docs/build'
};

module.exports = config;