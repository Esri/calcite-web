(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.calciteMarketing = factory());
}(this, (function () { 'use strict';

// Cool Helpers
// ┌────────────────────┐
// │ Class Manipulation │
// └────────────────────┘

// check if an element has a specific class
function has(domNode, className) {
  var elementClass = ' ' + domNode.className + ' ';
  return elementClass.indexOf(' ' + className + ' ') !== -1;
}

// add one or more classes to an element
function add(domNode, classes) {
  classes.split(' ').forEach(function (c) {
    if (!has(domNode, c)) {
      domNode.className += ' ' + c;
    }
  });
}

// remove one or more classes from an element
function remove(domNode, classes) {
  var elementClass = ' ' + domNode.className + ' ';
  classes.split(' ').forEach(function (c) {
    elementClass = elementClass.replace(' ' + c + ' ', ' ');
  });
  domNode.className = elementClass.trim();
}

// remove 'is-active' class from every element in an array
function removeActive(array) {
  array = nodeListToArray(array);
  array.forEach(function (item) {
    remove(item, 'is-active');
  });
}

// add 'is-active' class from every element in an array
function addActive(array) {
  array = nodeListToArray(array);
  array.forEach(function (item) {
    add(item, 'is-active');
  });
}

// turn a domNodeList into an array
function nodeListToArray(domNodeList) {
  if (Array.isArray(domNodeList)) {
    return domNodeList;
  } else {
    return Array.prototype.slice.call(domNodeList);
  }
}

// Finds all the elements inside a node, or the document and returns them as an array
function findElements(query, domNode) {
  var context = domNode || document;
  var elements = context.querySelectorAll(query);
  return nodeListToArray(elements);
}

// add a callback function to an event on a DOM node
function add$1(domNode, e, fn) {
  if (domNode.addEventListener) {
    return domNode.addEventListener(e, fn, false);
  } else if (domNode.attachEvent) {
    return domNode.attachEvent('on' + e, fn);
  }
}

function E() {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function on(name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function once(name, callback, ctx) {
    var self = this;
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function emit(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function off(name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) {
          liveEvents.push(evts[i]);
        }
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    liveEvents.length ? e[name] = liveEvents : delete e[name];
    return this;
  }
};

var bus = new E();

// Cool Helpers
function switcher() {
  var toggles = findElements('.js-view-toggle');

  bus.on('switcher:bind', bind);
  bus.on('switcher:toggle', handleToggle);

  function bind(options) {
    if (!options) {
      toggles.forEach(function (toggle) {
        setUp(toggle);
      });
    } else {
      setUp(options.node);
    }
  }

  function setUp(toggle) {
    add$1(toggle, 'click', toggleClick);
  }

  function toggleClick(e) {
    e.preventDefault();
    var options = {
      set: e.target.getAttribute('data-set'),
      target: e.target.getAttribute('data-view')
    };

    bus.emit('switcher:toggle', options);
  }

  function handleToggle(options) {
    var viewSet = findElements('.js-view[data-set=' + options.set + ']');
    var viewTarget = findElements('.js-view[data-set=' + options.set + '][data-view=' + options.target + ']');
    var toggleSet = findElements('.js-view-toggle[data-set=' + options.set + ']');
    var toggleTarget = findElements('.js-view-toggle[data-set=' + options.set + '][data-view=' + options.target + ']');
    removeActive(viewSet);
    removeActive(toggleSet);
    addActive(viewTarget);
    addActive(toggleTarget);
  }

  bus.emit('switcher:bind');
}

var calciteWebMarketing = {
  viewSwitcher: switcher
};

return calciteWebMarketing;

})));