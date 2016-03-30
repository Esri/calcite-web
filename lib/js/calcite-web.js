// ┌─────────┐
// │ Helpers │
// └─────────┘
// utilities for working with dom, and removing browser inconsistencies
// with support back to IE9+
import * as dom from './helpers/dom';
import * as classy from './helpers/classy';
import * as aria from './helpers/aria';
import * as event from './helpers/event';

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
import expander from './patterns/expander';
import filterDropdown from './patterns/filter-dropdown';
import modal from './patterns/modal';
import search from './patterns/search';
import sticky from './patterns/sticky';
import tabs from './patterns/tabs';
import thirdNav from './patterns/third-nav';

// ┌──────────────────────┐
// │ Emit Keyboard Events │
// └──────────────────────┘
// emit presses of escape and return keys
event.add(document, 'keyup', translateKeypress);
function translateKeypress (e) {
  if (e.keyCode === 27) {
    bus.emit('keyboard:escape', payload);
  } else if (e.keyCode === 13) {
    bus.emit('keyboard:return');
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
function init () {
  accordion();
  dropdown();
  drawers();
  expander();
  filterDropdown();
  modal();
  search();
  sticky();
  tabs();
  thirdNav();
}

// ┌────────────┐
// │ Public API │
// └────────────┘
// define all public api methods
export default {
  version: '1.0.0-beta.7',
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
  expander: expander,
  filterDropdown: filterDropdown,
  modal: modal,
  search: search,
  sticky: sticky,
  tabs: tabs,
  thirdNav: thirdNav,
  init
};
