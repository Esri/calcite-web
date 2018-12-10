const imagemin = require('imagemin');
const imageminSvgo = require('imagemin-svgo');
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

/**
 * Optimize a set of icons
 * @param {array}    files       Array of glob patters
 * @param {string}   output      Relative file path to desired output location
 * @param {boolean}  removeIds   Remove id attributes from output
 * @return {promise}             Formatted object with all icon metadata
 */
module.exports = function (files, output, removeIds) {
  if (!files) {
    return Promise.resolve(true);
  }
  options.plugins[0] = {cleanupIDs: {remove: removeIds}};
  return imagemin(files, output, { use: [imageminSvgo(options)] });
}
