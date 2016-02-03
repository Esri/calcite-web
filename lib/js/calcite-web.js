// Cool Helpers
import dom from './helpers/dom'
import classy from './helpers/classy'
import aria from './helpers/aria'
import event from './helpers/event'
import bus from './helpers/bus'
// Cool Patterns
import accordion from './patterns/accordion'
import dropdown from './patterns/dropdown'
import drawers from './patterns/drawers'
import expander from './patterns/expander'
import modal from './patterns/modal'
import search from './patterns/search'
import sticky from './patterns/sticky'
import tabs from './patterns/tabs'
import thirdNav from './patterns/third-nav'

// ┌────────────────────┐
// │ Initialize Calcite │
// └────────────────────┘
// start up Calcite and attach all the patterns
// optionally pass an array of patterns you'd like to watch
function init () {
  patterns = [
    'sticky',
    'accordion',
    'dropdown',
    'drawer',
    'expandingNav',
    'modal',
    'tabs',
    'siteSearch',
    'thirdNav'
  ];
  patterns.forEach(function (pattern) {
    // this.[pattern]();
    // `${pattern}`()
    console.log(pattern)
  });
}

// ┌────────────┐
// │ Public API │
// └────────────┘
// define all public api methods

window.calcite = {
  version:            '1.0.0-beta.6',
  click:              event.click,
  addEvent:           event.add,
  removeEvent:        event.remove,
  eventTarget:        event.target,
  preventDefault:     event.preventDefault,
  stopPropagation:    event.stopPropagation,
  throttle:           event.throttle,
  hasClass:           classy.has,
  addClass:           classy.add,
  removeClass:        classy.remove,
  toggleClass:        classy.toggle,
  removeActive:       classy.removeActive,
  addActive:          classy.addActive,
  toggleActive:       classy.toggleActive,
  toggleAriaHidden:   aria.toggleHidden,
  toggleAriaExpanded: aria.toggleExpanded,
  closest:            dom.closest,
  nodeListToArray:    dom.nodeListToArray,
  findElements:       dom.findElements,
  eventTracker,
  init
};
