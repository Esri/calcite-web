
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


module.exports = function (cb) {
  require('child_process').exec('git log --pretty=format:"%ad" -n 1', function(err, stdout) {
    var date = new Date(stdout.trim());
    var pushed_at = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    return cb(err, {pushed_at});
  });
}
