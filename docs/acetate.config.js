var svg = require('./source/data/svg-icon.js');
var font = require('./source/data/icon-font.js');
var icons = require('./source/data/icon-social.js');
var colors = require('./source/data/colors.js');
var repo = require('./source/data/repo.js');
var MarkdownIt = require('markdown-it');
var hljs = require('highlight.js');

module.exports = function (acetate) {
  acetate.load('**/*.+(md|html)');
  acetate.layout('documentation/**/*', 'layouts/_doc');
  acetate.layout('examples/**/*', 'layouts/_examples');
  acetate.data('table_of_contents', 'table_of_contents.yml');
  acetate.data('stats', 'data/stats.json');
  acetate.data('pkg', '../../package.json');
  acetate.data('colors', colors);
  acetate.data('icons', icons);
  acetate.data('font', font);
  acetate.data('svg', svg);
  acetate.data('repo', repo);
  var customMarkdown = new MarkdownIt({
    html: true,
    linkify: true,
    langPrefix: '',
    highlight: function (code, lang) {
      if (lang === 'text' || lang === 'plain') {
        return code;
      }
      return (lang) ? '<pre><code class="' + lang + '" tabindex="0">' + hljs.highlight(lang, code).value + '</code></pre>' : '<pre><code tabindex="0">' + hljs.highlightAuto(code).value + '</code></pre>';
    }
  });
  customMarkdown.renderer.rules.table_open = () => '<table class="table">';
  acetate.markdown = customMarkdown;
};
