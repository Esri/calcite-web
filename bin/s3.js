var s3 = require('s3');
var conf = require('./aws-credentials.json');
var pkg = require('../package.json');

var client = s3.createClient({
  s3Options: conf
});

var destination = 'files/calcite-web/' + pkg.version + '/';

var versioned = {
  localDir: './dist',
  s3Params: {
    ACL: 'public-read',
    Bucket: 'patterns.esri.com',
    Prefix: destination
  }
};

var latest = {
  localDir: './dist',
  s3Params: {
    ACL: 'public-read',
    Bucket: 'patterns.esri.com',
    Prefix: 'files/calcite-web/latest/'
  }
};

var uploader = client.uploadDir(versioned);

uploader.on('error', function (err) {
  console.error('unable to sync:', err.stack);
});

uploader.on('progress', function () {
  console.log('progress', uploader.progressAmount, uploader.progressTotal);
});

uploader.on('end', function () {
  console.log('done uploading');
});

var latestUpload = client.uploadDir(latest);

uploader.on('error', function (err) {
  console.error('unable to sync:', err.stack);
});

uploader.on('progress', function () {
  console.log('progress', uploader.progressAmount, uploader.progressTotal);
});

uploader.on('end', function () {
  console.log('done uploading');
});
