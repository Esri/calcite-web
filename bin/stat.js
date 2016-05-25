var stats = require('../dist/css/stats.json')

console.log('size:      ' + stats.humanizedSize)
console.log('gzipped:   ' + stats.humanizedGzipSize)
console.log('rules:     ' + stats.rules.total)
console.log('selectors: ' + stats.selectors.total)
