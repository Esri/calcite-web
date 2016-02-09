// Cool Helpers
import * as dom from './helpers/dom'
import * as classy from './helpers/classy'
import * as aria from './helpers/aria'
import * as event from './helpers/event'

// Bus
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


// Create keyboard event bus
event.add(document, 'keyup', translateKeypress);
function translateKeypress (e) {
  console.log(e.keyCode)
  if (e.keyCode === 27) {
    bus.emit('keyboard:escape')
  } else if (e.keyCode === 13) {
    bus.emit('keyboard:return')
  }

}

// ┌────────────────────┐
// │ Initialize Calcite │
// └────────────────────┘
// start up Calcite and attach all the patterns
// optionally pass an array of patterns you'd like to watch
function init () {
  accordion()
  dropdown()
  drawers()
  expander()
  modal()
  search()
  sticky()
  tabs()
  thirdNav()
}

// ┌────────────┐
// │ Public API │
// └────────────┘
// define all public api methods

export default {
  version: '1.0.0-beta.6',
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
  bus,
  init
};

