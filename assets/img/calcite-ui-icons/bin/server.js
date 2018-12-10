#!/usr/bin/env node
const build = require('./build');
const pathData = require('./path-data');
const optimize = require('./optimize');
const debounce = require('debounce');
const bs = require('browser-sync').create();
const fs = require('fs');
const options = {
  awaitWriteFinish: true,
  ignoreInitial: true
};

console.log('🗜  optimizing icons...')

build()
  .then(() => {
    bs.init({
      server: './docs',
      notify: false,
      ui: false,
      port: 8080
    });
    bs.watch('icons/*.svg', options, onChange);
    bs.watch('docs/keywords.json', options, onChange);

    function onChange (event, file) {
      if (event === 'add') {
        console.log('🗜  new icon detected, optimizing...')
        optimize([file], 'icons/', true).then(() => {});
      } else {
        update();
      }
    }

    const update = debounce(function () {
      pathData()
        .then(files => {
          console.log('✨  path file updated');
          bs.reload();
        });
    }, 300);
  });
