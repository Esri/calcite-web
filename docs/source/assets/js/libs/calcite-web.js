/* calcite-web - v0.0.1 - 2014-08-31
*  https://github.com/ArcGIS/calcite-web
*  Copyright (c) 2014 Environmental Systems Research Institute, Inc.
*  Apache 2.0 License */
(function Calcite () {

var C = {
  version: '0.0.1'
};

// ┌───────────────┐
// │ DOM utilities │
// └───────────────┘

var dom = C.utils = {};

// ┌──────────────────────┐
// │ DOM event management │
// └──────────────────────┘

// returns standard interaction event, later will add touch support
dom.event = function () {
  return "click";
};

// add a callback function to an event on an element
dom.addEvent = function (el, event, fn) {
  if (el.addEventListener) {
    return el.addEventListener(event, fn, false);
  }
  if (el.attachEvent) {
    return el.attachEvent('on' + event, fn);
  }
};

// remove an event and its bindings
dom.removeEvent = function (el, event, fn) {
  if (el.removeEventListener) {
    return el.removeEventListener(event, fn, false);
  }
  if (el.detachEvent) {
    return el.detachEvent('on' + event,  fn);
  }
};

// get the target element of an event
dom.eventTarget = function (event) {
  if (!event.target) {
    return event.srcElement;
  }
  if (event.target) {
    return event.target;
  }
};

// prevent default behavior of an event
dom.preventDefault = function (event) {
  if (event.preventDefault) {
    return event.preventDefault();
  }
  if (event.returnValue) {
    event.returnValue = false;
  }
};

// stop and event from bubbling up the DOM tree
dom.stopPropagation = function (event) {
  event = event || window.event;
  if (event.stopPropagation) {
    return event.stopPropagation();
  }
  if (event.cancelBubble) {
    event.cancelBubble = true;
  }
};

// ┌────────────────────┐
// │ class manipulation │
// └────────────────────┘

// check if an element has a specific class
dom.hasClass = function (elem, className) {
  var exp = new RegExp(' ' + className + ' ');
  if (exp.test(' ' + elem.className + ' ')) {
    return true;
  }

  return false;
};

// add one or more classes to an element
dom.addClass = function (elem, classes) {
  classes = classes.split(' ');

  for (var i = 0; i < classes.length; i++) {
    if (!dom.hasClass(elem, classes[i])) {
      elem.className += ' ' + classes[i];
    }
  }
};

// remove one or more classes from an element
dom.removeClass = function (elem, classes) {
  classes = classes.split(' ');

  for (var i = 0; i < classes.length; i++) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';

    if (dom.hasClass(elem, classes[i])) {
      while (newClass.indexOf(' ' + classes[i] + ' ') >= 0) {
        newClass = newClass.replace(' ' + classes[i] + ' ', ' ');
      }

      elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  }
};

// ┌───────────────┐
// │ DOM traversal │
// └───────────────┘

// returns closest element up the DOM tree matching a given class
dom.closest = function (className, context) {
  var result, current;
  for (current = context; current; current = current.parentNode) {
    if (current.nodeType === 1 && dom.hasClass(current, className)) {
      result = current;
      break;
    }
  }
  return current;
};

// get an attribute for an element
dom.getAttr = function(el, attr) {
  if (el.getAttribute) {
    return el.getAttribute(attr);
  }

  var result;
  var attrs = el.attributes;

  for (var i = 0; i < attrs.length; i++) {
    if (attrs[i].nodeName === attr) {
      result = attrs[i].nodeValue;
    }
  }

  return result;
};

// ┌───────────────┐
// │ array helpers │
// └───────────────┘

// return the index of an object in an array with optional offset
dom.indexOf = function (obj, arr, offset) {
  var i = offset || 0;

  if (arr.indexOf) {
    return arr.indexOf(obj, i);
  }

  for (i; i < arr.length; i++) {
    if (arr[i] === obj) {
      return i;
    }
  }

  return -1;
};

// make an object into an array
dom.makeArray = function (object) {
  var array = [];
  for (var i = 0; i < object.length; i++) {
    array.push(object[i]);
  }
  return array;
};

// ┌───────────────────┐
// │ feature detection │
// └───────────────────┘
// detect features like touch, ie, etc.

// detect touch, could be improved for more coverage
dom.isTouch = function () {
  if (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)) {
    return true;
  }
  return false;
};

// ┌───────────────┐
// │ JS Patterns   │
// └───────────────┘
// javascript logic for ui patterns

// ┌─────────┐
// │ Example │
// └─────────┘
// description of the example

C.example = function () {
  // write any logic for the 'example' ui to function
};

// ┌─────────────────────┐
// │ Initialize Calcite  │
// └─────────────────────┘
// start up Calcite and attach all the patterns
// optionally pass an array of patterns you'd like to watch

C.init = function (patterns) {

  if (patterns) {
    for (var i = 0; i < patterns.length; i++) {
      H[patterns[i]]();
    }
  } else {
    H.tabs();
  }

  // add a touch class to the body
  if ( dom.isTouch() ) {
    dom.addClass(document.body, 'Calcite-touch');
  }
};

// ┌───────────────────┐
// │ Expose Calcite.js │
// └───────────────────┘
// implementation borrowed from Leaflet

function expose () {
  var oldC = window.C;

  C.noConflict = function () {
    window.C = oldC;
    return this;
  };

  window.C = C;
}

// define Calcite for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = C;
}

// define Calcite as an AMD module
else if (typeof define === 'function' && define.amd) {
  define(C);
}

// define Calcite as a global H variable, saving the original H to restore later if needed
else {
  expose();
}

})();