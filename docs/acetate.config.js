var calciteUIIcons = require('@esri/calcite-ui-icons');
var icons = require('./source/data/icons.js');
var socialIcons = require('./source/data/icon-social.js');
var colors = require('./source/data/colors.js');
var repo = require('./source/data/repo.js');
var stats = require('./source/data/stats.js');
var MarkdownIt = require('markdown-it');
var prism = require('prismjs');
var loadLanguages = require('prismjs/components/');
loadLanguages(['scss', 'bash', 'ruby']);
prism.hooks.add('wrap', env => env.classes = env.classes.map(c => c.indexOf('prism-') === 0 ? c : 'prism-' + c));

module.exports = function (acetate) {
  /**
   * Load all markdown and html files
   */
  acetate.load('**/*.+(md|html)');

  /**
   * Set default layouts
   */
  acetate.layout('documentation/**/*', 'layouts/_doc');

  /**
   * Load site data
   */
  acetate.data('table_of_contents', 'table_of_contents.yml');
  acetate.data('pkg', '../../package.json');
  acetate.data('stats', stats);
  acetate.data('icons', icons);
  acetate.data('socialIcons', socialIcons);
  acetate.data('colors', colors);
  acetate.data('repo', repo);

  /**
   * Customize markdown so that it adds tabindex='0' to code element
   */
  var customMarkdown = new MarkdownIt({
    html: true,
    linkify: true,
    langPrefix: '',
    highlight: function (code, lang) {
      if (lang === 'html' || !lang || !prism.languages[lang]) {
        lang = 'markup';
      }
      var html = prism.highlight(code, prism.languages[lang], lang);
      return `<pre><code class="${lang}" tabindex="0">${html}</code></pre>`;
    }
  });
  customMarkdown.renderer.rules.table_open = () => '<table class="table">';
  acetate.markdown = customMarkdown;

  /**
   * Helper for rendering icons from calcite-ui-icon set
   * @param  {string}  name                     Name of icon
   * @param  {integer} context.options.size     Which size to use (16|24|32)
   * @param  {string}  context.options.style    Style to use ('outline', 'filled')
   * @param  {string}  context.options.classes  Additional classes to add to svg element (space separated)
   * @param  {boolean} context.options.escape   Set true to escape html entities (for displaying source)
   * @return {string}                           Formatted svg element string
   * @example
   * {% icon '2d-explore', size=24, ecape=true %}
   */
  acetate.helper('icon', function (context, name) {
    var size = context.options.size;
    var style = context.options.style;
    var icon = calciteUIIcons.icons[name][style][size];
    var paths = icon.map(path => `<path d="${path}"></path>`).join('');
    var svg = `<svg width="${size}" viewBox="0 0 ${size} ${size}" class="${context.options.classes}" fill="currentColor">${paths}</svg>`;
    return context.options.escape ? hljs.highlight('html', svg).value : svg;
  }, {
    size: 16,
    style: 'outline',
    classes: '',
    escape: false
  });
};
