// ┌─────────┐
// │ Helpers │
// └─────────┘
// utilities for working with dom, and removing browser inconsistencies
// with support back to IE9+
import * as dom from './lib/js/helpers/dom';
import * as classy from './lib/js/helpers/classy';
import * as aria from './lib/js/helpers/aria';
import * as event from './lib/js/helpers/event';
import clipboard from './lib/js/helpers/clipboard';

// ┌─────┐
// │ Bus │
// └─────┘
// all event passing takes place over a bus
// this is just an instance of tinyEmitter
import bus from './lib/js/helpers/bus';

// ┌─────────────────┐
// │ Import Patterns │
// └─────────────────┘
// import all interactive patterns
import accordion from './lib/js/patterns/accordion';
import dropdown from './lib/js/patterns/dropdown';
import filterDropdown from './lib/js/patterns/filter-dropdown';
import modal from './lib/js/patterns/modal';
import search from './lib/js/patterns/search';
import selectNav from './lib/js/patterns/select-nav';
import sticky from './lib/js/patterns/sticky';
import tabs from './lib/js/patterns/tabs';

// ┌──────────────────────┐
// │ Emit Keyboard Events │
// └──────────────────────┘
// emit presses of escape and return keys
event.add(document, 'keyup', translateKeypress);
function translateKeypress (e) {
  if (e.keyCode === 27) {
    bus.emit('keyboard:escape');
  } else if (e.keyCode === 13) {
    bus.emit('keyboard:return');
  } else if (e.keyCode === 32) {
    bus.emit('keyboard:space');
  } else if (e.keyCode === 38) {
    bus.emit('keyboard:arrow:up');
  } else if (e.keyCode === 40) {
    bus.emit('keyboard:arrow:down');
  } else if (e.keyCode === 37) {
    bus.emit('keyboard:arrow:left');
  } else if (e.keyCode === 39) {
    bus.emit('keyboard:arrow:right');
  }
}

// ┌────────────────────┐
// │ Emit Scroll Events │
// └────────────────────┘
// throttled for performance
event.add(window, 'scroll', event.throttle(isScrolling, 100));
function isScrolling () {
  bus.emit('scrolling:at', window.pageYOffset);
}

// ┌────────────────────┐
// │ Initialize Calcite │
// └────────────────────┘
// start up Calcite and attach all the patterns
// optionally pass an array of patterns you'd like to watch
var patterns = [
  accordion,
  clipboard,
  dropdown,
  filterDropdown,
  modal,
  search,
  selectNav,
  sticky,
  tabs
];

function init () {
  patterns.forEach(function (pattern) {
    pattern();
  });
}

function extend (plugin) {
  // Object Assign Polyfill
  if (typeof Object.assign !== 'function') {
    Object.assign = function (target) {
      'use strict';
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      target = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source != null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
  }
  for (var key in plugin) {
    patterns.push(plugin[key]);
  }
  Object.assign(this, plugin);
}

// ┌────────────┐
// │ Public API │
// └────────────┘
// define all public api methods
var version = '1.1.0';
var click = event.click;
var addEvent = event.add;
var removeEvent = event.remove;
var eventTarget = event.target;
var preventDefault = event.preventDefault;
var stopPropagation = event.stopPropagation;
var throttle = event.throttle;
var hasClass = classy.has;
var addClass = classy.add;
var removeClass = classy.remove;
var toggleClass = classy.toggle;
var removeActive = classy.removeActive;
var addActive = classy.addActive;
var toggleActive = classy.toggleActive;
var toggleAriaHidden = aria.toggleHidden;
var toggleAriaExpanded = aria.toggleExpanded;
var closest = dom.closest;
var nodeListToArray = dom.nodeListToArray;
var findElements = dom.findElements;

export {
  version,
  click,
  addEvent,
  removeEvent,
  eventTarget,
  preventDefault,
  stopPropagation,
  throttle,
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  removeActive,
  addActive,
  toggleActive,
  toggleAriaHidden,
  toggleAriaExpanded,
  closest,
  nodeListToArray,
  findElements,
  bus,
  accordion,
  dropdown,
  filterDropdown,
  modal,
  search,
  selectNav,
  sticky,
  tabs,
  extend,
  init
};
