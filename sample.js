var nunjucks = require('nunjucks');
var fs = require('fs');

function NunjucksSample() {

  this.tags = ['sample'];

  this.parse = function(parser, nodes, lexer) {
    // get the tag token
    var tok = parser.nextToken();

    // parse the args and move after the block end. passing true
    // as the second arg is required if there are no parentheses
    var args = parser.parseSignature(null, true);
    var section = args.children[0].value;
    parser.advanceAfterBlockEnd(tok.value);

    // parse the body then call the extension
    var body = parser.parseUntilBlocks('endsample');
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, 'run', args, [body]);

  };

  this.run = function(context, file, classes, body) {

    var response = '';
    var codeBlock = fs.readFileSync(file, 'utf8');

    classes.forEach( function(className) {
      var sample = codeBlock.replace(/modifer-class/g, className);
      response += sample;
    });

    console.log(response);
    return response;

  };
}

module.exports = function () {
  return function (acetate, callback){
    acetate.nunjucks.addExtension('sample', new NunjucksSample());
    callback(undefined, acetate);
  };
};