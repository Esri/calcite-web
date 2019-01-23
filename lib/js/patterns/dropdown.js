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
  event.remove(document, 'keydown', seizeArrows);
  event.remove(document.body, 'focusin', checkFocus);
}

function checkFocus (e) {
  // if the new focus element is outside the dropdown, close the dropdown
  if (e.target && !dom.closest('js-dropdown', e.target)) {
    bus.emit('dropdown:close');
  }
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
    event.add(document, 'keydown', seizeArrows);
  }
  if (classy.has(options.node, 'is-active')) {
    event.add(document.body, event.click(), closeAllDropdowns);
    event.add(document.body, 'focusin', checkFocus);
  }
}

function seizeArrows (e) {
  if (e.keyCode === 40 | e.keyCode === 38) {
    e.preventDefault();
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

function dropdownIsOpen () {
  var dropdown = document.querySelector('.js-dropdown.is-active');
  if (dropdown) {
    return dropdown;
  } else {
    return false;
  }
}

function dropownFocusOn (options) {
  var activeLink = document.activeElement;
  let current = options.links.indexOf(activeLink);
  if (current === -1) {
    if (options.forward) {
      current = 0;
    } else {
      current = options.links.length - 1;
    }
  } else {
    if (options.forward) {
      current += 1;
      if (current === options.links.length) {
        current = 0;
      }
    } else {
      current -= 1;
      if (current === -1) {
        current = options.links.length - 1;
      }
    }
  }
  options.links[current].focus();
}

function arrowDown () {
  var dropdown = dropdownIsOpen();
  if (dropdown) {
    var links = dom.findElements('.dropdown-link', dropdown)
      .filter(link => link.offsetParent !== null);
    bus.emit('dropdown:focus', {links: links, forward: true});
  }
}

function arrowUp () {
  var dropdown = dropdownIsOpen();
  if (dropdown) {
    var links = dom.findElements('.dropdown-link', dropdown)
      .filter(link => link.offsetParent !== null);
    bus.emit('dropdown:focus', {links: links, forward: false});
  }
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
  bus.on('keyboard:arrow:down', arrowDown);
  bus.on('keyboard:arrow:up', arrowUp);
  bus.on('dropdown:focus', dropownFocusOn);
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
