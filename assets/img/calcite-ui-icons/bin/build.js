const optimize = require('./optimize');
const generatePathFile = require('./path-data');

module.exports = function () {
  return optimize(['*.svg'], './')
    .then(function (result) {
      return optimize(['icons/*.svg'], 'icons/', true);
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
      return files;
    });
}
