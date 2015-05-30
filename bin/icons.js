#!/usr/bin/env node
// Builds a .scss file with all site icons
var glob = require('glob')
var fs = require('fs')
var path = require('path')
var format = require('util').format
var mkdir = require('mkdirp')

mkdir('lib/sass/calcite-web/icons/sets/')

var sets = ['calcite', 'calcite-large', 'social']

function comma (index, array) {
  var needsComma = index !== array.length - 1
  return needsComma ? ',' : ''
}

function formatLine (files, i) {
  var icon = path.basename(files[i], '.svg')
  return format('\n    "%s"%s', icon, comma(i, files))
}

function parseFiles (setName, index) {
  var files = glob.sync(format('lib/img/icons/%s/*.svg', setName))
  var sassStream = fs.createWriteStream(format('lib/sass/calcite-web/icons/sets/%s.scss', setName), 'utf8')

  dataStream.write(format('\n  "%s": [', setName))
  sassStream.write(format('$%s-icons:', setName))

  files.forEach(function (file, i) {
    var line = formatLine(files, i)
    dataStream.write(line)
    sassStream.write(line)
  })
  sassStream.end(';')
  dataStream.write(format('\n  ]%s', comma(index, sets)))
}

var dataStream = fs.createWriteStream('docs/source/icons.json', 'utf8')
dataStream.write('{')
sets.forEach(parseFiles)
dataStream.end('\n}')
