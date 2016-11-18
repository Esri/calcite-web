// ┌─────────┐
// │ Helpers │
// └─────────┘
// utilities for working with dom, and removing browser inconsistencies
// with support back to IE9+
import * as dom from './helpers/dom';
import * as classy from './helpers/classy';
import * as aria from './helpers/aria';
import * as event from './helpers/event';
import clipboard from './helpers/clipboard';

// ┌─────┐
// │ Bus │
// └─────┘
// all event passing takes place over a bus
// this is just an instance of tinyEmitter
import bus from './helpers/bus';

// ┌─────────────────┐
// │ Import Patterns │
// └─────────────────┘
// import all interactive patterns
import accordion from './patterns/accordion';
import dropdown from './patterns/dropdown';
import drawers from './patterns/drawers';
import filterDropdown from './patterns/filter-dropdown';
import modal from './patterns/modal';
import search from './patterns/search';
import selectNav from './patterns/select-nav';
import sticky from './patterns/sticky';
import tabs from './patterns/tabs';
import thirdNav from './patterns/third-nav';

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
  drawers,
  filterDropdown,
  modal,
  search,
  selectNav,
  sticky,
  tabs,
  thirdNav
];

function init () {
  patterns.forEach(function (pattern) {
    pattern();
  });
}

function extend (plugin) {
  for (var key in plugin) {
    patterns.push(plugin[key]);
  }
  Object.assign(this, plugin);
}

// ┌────────────┐
// │ Public API │
// └────────────┘
// define all public api methods
export default {
  version: '1.0.0',
  click: event.click,
  addEvent: event.add,
  removeEvent: event.remove,
  eventTarget: event.target,
  preventDefault: event.preventDefault,
  stopPropagation: event.stopPropagation,
  throttle: event.throttle,
  hasClass: classy.has,
  addClass: classy.add,
  removeClass: classy.remove,
  toggleClass: classy.toggle,
  removeActive: classy.removeActive,
  addActive: classy.addActive,
  toggleActive: classy.toggleActive,
  toggleAriaHidden: aria.toggleHidden,
  toggleAriaExpanded: aria.toggleExpanded,
  closest: dom.closest,
  nodeListToArray: dom.nodeListToArray,
  findElements: dom.findElements,
  bus: bus,
  accordion: accordion,
  dropdown: dropdown,
  drawers: drawers,
  filterDropdown: filterDropdown,
  modal: modal,
  search: search,
  selectNav: selectNav,
  sticky: sticky,
  tabs: tabs,
  thirdNav: thirdNav,
  extend,
  init
};
