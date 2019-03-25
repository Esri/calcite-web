const Acetate = require('acetate');
const serve = require('acetate/lib/modes/server');
const build = require('acetate/lib/modes/builder');
const path = require('path');
const fs = require('fs-extra');

var acetateOptions = {
  config: 'docs/acetate.config.js',
  sourceDir: 'docs/source',
  outDir: 'docs/build',
  log: 'error'
};

if (process.argv[2] && process.argv[2] === '--watch') {
  var browserSyncOptions = {
    port: 8888,
    logLevel: 'warn',
    socket: {
      domain: 'localhost:8888'
    },
    ui: false,
    notify: false
  };
  var server = serve(new Acetate(acetateOptions), browserSyncOptions);
  // watch static assets and copy them to build when they change
  server.browserSync.watch('docs/source/assets/**/*.{js,jpg,svg,png,ico,gif}', function (event, file) {
    if (event === 'change' || event === 'add') {
      fs.copySync(file, file.replace('docs/source/', 'docs/build/'));
    }
  });
} else {
  acetateOptions.log = 'info';
  var builder = build(new Acetate(acetateOptions));
}