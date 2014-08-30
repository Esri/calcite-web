function config(press) {
  press.global('config', {
    environment: 'dev'
  });

  press.global('rootUrl', 'http://site.com');

  //press.ignore('ignore-me.html');

  //press.collection('blog', 'posts/**/*');

  press.layout('**/*', 'layouts/_layout:content');
  //press.layout('posts/**/*', 'layouts/_post:post');

}

config.options = {
  src: 'docs/source',
  dest: 'docs/build'
};

module.exports = config;