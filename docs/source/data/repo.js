var request = require('request');
var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

module.exports = function getRelease (cb) {
  // https://developer.github.com/v3/repos/#get
  return request({
    method: 'GET',
    url: 'https://api.github.com/repos/Esri/calcite-web',
    json: true,
    headers: {
      'User-Agent': 'request'
    }
  }, function (err, resp, body) {
    var date = new Date(body.pushed_at);
    body.pushed_at = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    return cb(err, body);
  });
};
