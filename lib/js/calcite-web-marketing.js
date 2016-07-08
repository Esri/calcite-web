function foo () {
  return 'bar';
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory()
  : typeof define === 'function' && define.amd ? define(factory)
  : (global.calciteMarketing = factory());
}(this, function () { 'use strict';

  var marketing = {
    foo: foo
  }

  return marketing

}));