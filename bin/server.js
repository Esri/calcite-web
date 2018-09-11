const Acetate = require('acetate');
const serve = require('acetate/lib/modes/server');
const build = require('acetate/lib/modes/builder');
const path = require('path');
const fs = require('fs-extra');

// copy over global-nav assets
fs.copySync('node_modules/esri-global-nav/', 'docs/build/assets/global-nav/');

var acetateOptions = {
  root: 'docs/',
  config: 'acetate.config.js',
  sourceDir: 'source',
  outDir: 'build',
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
  fs.copySync('lib/img', 'docs/build/assets/img/');
  fs.copySync('docs/source/assets/', 'docs/build/assets/');
  acetateOptions.log = 'info';
  var builder = build(new Acetate(acetateOptions));
}
