#!/usr/bin/env node
// ┌────────────────┐
// │ Icon Fontifier │
// └────────────────┘
// Takes a big pile of .svg and makes a usable set of webfonts

var path = require('path')
var fs = require('fs')
var webfontsGenerator = require('webfonts-generator')

var target  = path.join(process.cwd(), 'lib/img/icons/ui/')
var dest    = path.join(process.cwd(), 'lib/fonts/')
var cssDest = path.join(process.cwd(), 'lib/sass/calcite-web/icons/_font.scss')
var cssTemplate = path.join(process.cwd(), 'bin/webfont-template.hbs')

fs.readdir(target, function (err, files) {
    if (err) {
      throw err
    }
    files = files.map(function (file) {
      return path.join(target, file);
    })
    generate(files)
});

var generate = function(files) {
  webfontsGenerator({
    files: files,
    dest: dest,
    fontName: 'calcite-ui',
    css: true,
    cssDest: cssDest,
    cssTemplate: cssTemplate
  }, function(error) {
    if (error) console.log('Fail!', error)
    else console.log('Done!')
  })
}
