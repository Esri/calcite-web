const imagemin = require('imagemin');
const imageminSvgo = require('imagemin-svgo');
const generatePathFile = require('./path-data');
let options = {
  plugins: [
    {cleanupIDs: {remove: false}},
    {removeStyleElement: true},
    {removeUselessDefs: true},
    {removeUselessStrokeAndFill: true},
    {removeHiddenElems: true},
    {removeEmptyText: true},
    {convertShapeToPath: true},
    {removeEmptyAttrs: true},
    {removeEmptyContainers: true},
    {mergePaths: true},
    {removeTitle: true},
    {removeDesc: true},
    {removeDimensions: true},
    {removeAttrs: {attrs: ['class', '(stroke|fill)']}}
  ],
  multipass: true
};

imagemin(['*.svg'], './', { use: [imageminSvgo(options)] })
  .then(function (result) {
    options.plugins[0] = {cleanupIDs: {remove: true}};
    return imagemin(['icons/*.svg'], 'icons/', { use: [imageminSvgo(options)] });
  })
  .catch(error => {
    console.error('🚨  Error while optimizing icons');
    throw error;
  })
  .then(function (result) {
    console.log('✨  icons optimized successfully');
    return generatePathFile();
  })
  .catch(error => {
    console.error('🚨  Error while generating icons.json');
    throw error;
  })
  .then(function (files) {
    console.log('✨  path file generated at ./docs/icons.json');
  });
