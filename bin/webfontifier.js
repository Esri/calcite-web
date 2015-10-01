#!/usr/bin/env node
// ┌────────────────┐
// │ Icon Fontifier │
// └────────────────┘
// Takes a big pile of .svg and makes a usable set of webfonts

var webfontsGenerator = require('webfonts-generator')

webfontsGenerator({
  files: [
    '../lib/img/icon/ui/announcement.svg',
    '../lib/img/icon/ui/attachment.svg',
  ],
  dest: '../lib/fonts/
}, function(error) {
  if (error) console.log('Fail!', error)
  else console.log('Done!')
})