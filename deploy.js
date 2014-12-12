// ┌───────────────┐
// │ Deploy Script │
// └───────────────┘
// Builds a json file with all site content

yaml = require('js-yaml');
fs   = require('fs');
jf   = require('jsonfile');
path = require('path');

var file = 'dist/content.json';
var response = [];

function constructItem(content, meta) {

  var item = {
    group: meta.group,
    groupOrder: meta.group_order,
    page: meta.page,
    page_order: meta.page_order,
    page_slug: meta.page_slug,
    title: content.title,
    slug: content.link,
    tags: ['calcite-web', 'web', content.title, meta.group, meta.page],
    order: meta.order
  }

  var markdownPath = path.join('docs', 'source', item.page_slug, '_' + item.slug + '.md');
  var markdown = fs.readFileSync(markdownPath, 'utf8');

  item.description = JSON.stringify(markdown);

  if (content.modifiers) {
    item.modifiers = content.modifiers;
    var samplePath = path.join('docs', 'source', item.page_slug, 'sample-code', '_' + item.slug + '.html');
    var sample = fs.readFileSync(samplePath, 'utf8');
    item.sample_code = JSON.stringify(sample);
  }

  response.push(item);
}

var contents = yaml.safeLoad(fs.readFileSync('data/table_of_contents.yml', 'utf8'));
var counter = 0;

for (var key in contents) {
  var meta = {
    page: contents[key].title,
    page_slug: contents[key].base,
    page_order: counter
  };
  contents[key].navigation.forEach(function (group, index){
    meta.group = group.group;
    meta.group_order = index;
    group.pages.forEach(function (element, i){
      meta.order = i;
      constructItem(element, meta);
    });
  });
  counter++;
}

jf.writeFileSync(file, response);
