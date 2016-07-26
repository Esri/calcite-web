// Cool Helpers
import * as dom from '../helpers/dom';
import * as classy from '../helpers/classy';
import * as event from '../helpers/event';
import bus from '../helpers/bus';

// ┌──────────┐
// │ Dropdown │
// └──────────┘
// show and hide dropdown menus
function closeAllDropdowns (options) {
  event.remove(document.body, event.click(), closeAllDropdowns);
  dom.findElements('.js-dropdown').forEach(function (dropdown) {
    classy.remove(dropdown, 'is-active');
  });
  dom.findElements('.js-dropdown-toggle').forEach(function (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
  });
}

function toggleDropdown (options) {
  if (!options) return;
  var isOpen = classy.has(options.node, 'is-active');
  bus.emit('dropdown:close');
  if (!isOpen) {
    classy.add(options.node, 'is-active');
    if (options.target) {
      options.target.setAttribute('aria-expanded', 'true');
    }
  }
  if (classy.has(options.node, 'is-active')) {
    event.add(document.body, event.click(), closeAllDropdowns);
  }
}

function bindDropdowns (options) {
  // attach the new events
  var toggles = dom.findElements('.js-dropdown-toggle');
  toggles.forEach(function (toggle) {
    // check if the event was already added
    var eventExists = false;
    event.boundEvents.dropdowns.forEach(function (e) {
      if (e.target === toggle && e.event === event.click() && e.fn === toggleClick) {
        eventExists = true;
      }
    });
    if (!eventExists) {
      event.boundEvents.dropdowns.push({target: toggle, event: event.click(), fn: toggleClick});
      event.add(toggle, event.click(), toggleClick);
    }
  });
}

function toggleClick (e) {
  event.preventDefault(e);
  event.stopPropagation(e);
  var dropdown = dom.closest('js-dropdown', e.target);
  bus.emit('dropdown:toggle', {node: dropdown, target: e.target});
}

function addListeners () {
  bus.on('dropdown:toggle', toggleDropdown);
  bus.on('dropdown:close', closeAllDropdowns);
  bus.on('keyboard:escape', closeAllDropdowns);
  listenersAdded = true;
}

var listenersAdded = false;

export default function dropdown () {
  // only add the listeners if they haven't been added already
  if (!listenersAdded) {
    addListeners();
  }
  bindDropdowns();
}
