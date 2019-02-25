/*!
 * Calcite Web - Calcite Design Components in CSS, JS and HTML
 * @version v1.2.5
 * @license Apache-2.0
 * @copyright 2018 Esri
 * @link https://github.com/Esri/calcite-web
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.calcite = factory());
}(this, (function () { 'use strict';

// ┌─────┐
// │ DOM │
// └─────┘
// Handles dom nodes

// returns closest element up the DOM tree matching a given class
function closest (className, context) {
  var current;
  for (current = context; current; current = current.parentNode) {
    var currentClass = (current && current.getAttribute && current.getAttribute('class')) || '';
    var hasClass = new RegExp('(\\s|^)' + className + '(\\s|$)').test(currentClass);
    if (current.nodeType === 1 && hasClass) {
      break;
    }
  }
  return current;
}

// turn a domNodeList into an array
function nodeListToArray (domNodeList) {
  if (Array.isArray(domNodeList)) {
    return domNodeList;
  } else {
    return Array.prototype.slice.call(domNodeList);
  }
}

// Finds all the elements inside a node, or the document and returns them as an array
function findElements (query, domNode) {
  var context = domNode || document;
  var elements = context.querySelectorAll(query);
  return nodeListToArray(elements);
}

function filterArray (value, array) {
  var results = array.filter(function (item) {
    var val = value.toLowerCase();
    var t = item.innerHTML.toLowerCase();
    return t.indexOf(val) !== -1;
  });
  return results;
}

// Cool Helpers

// ┌────────────────────┐
// │ Class Manipulation │
// └────────────────────┘

// check if an element has a specific class
function has (domNode, className) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(domNode.getAttribute('class'));
}

// add one or more classes to an element
function add (domNode, classes) {
  classes.split(' ').forEach(function (c) {
    if (!has(domNode, c)) {
      var existingClass = domNode.getAttribute('class') || '';
      domNode.setAttribute('class', existingClass + ' ' + c);
    }
  });
}

// remove one or more classes from an element
function remove (domNode, classes) {
  classes.split(' ').forEach(function (c) {
    var removedClass = (domNode.getAttribute('class') || '').replace(new RegExp('(\\s|^)' + c + '(\\s|$)', 'g'), '$2');
    if (has(domNode, c)) {
      domNode.setAttribute('class', removedClass);
    }
  });
}

// if domNode has the class, remove it, else add it
function toggle (domNode, className) {
  if (has(domNode, className)) {
    remove(domNode, className);
  } else {
    add(domNode, className);
  }
}

// remove 'is-active' class from every element in an array
function removeActive (array) {
  array = nodeListToArray(array);
  array.forEach(function (item) {
    remove(item, 'is-active');
  });
}

// add 'is-active' class from every element in an array
function addActive (array) {
  array = nodeListToArray(array);
  array.forEach(function (item) {
    add(item, 'is-active');
  });
}

// remove 'is-active' class from every element in an array, add to one element
function toggleActive (array, el) {
  removeActive(array);
  add(el, 'is-active');
}

// ┌────────────────┐
// │ Aria Adjusters │
// └────────────────┘
// utilities to help manage aria properties

// toggles `aria-hidden` on a domNode
function toggleHidden (array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    var hidden = node.getAttribute('aria-hidden');
    if (hidden !== 'true') {
      node.setAttribute('aria-hidden', true);
    } else {
      node.removeAttribute('aria-hidden');
    }
  });
}

// adds `aria-hidden` on a domNode
function hide (array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    node.setAttribute('aria-hidden', true);
  });
}

// removes `aria-hidden` on a domNode
function show (array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    node.removeAttribute('aria-hidden');
  });
}

function toggleExpanded (domNode) {
  if (!domNode) {
    return;
  }
  var isExpanded = domNode.getAttribute('aria-expanded');
  if (isExpanded) {
    domNode.removeAttribute('aria-expanded');
  } else {
    domNode.setAttribute('aria-expanded', 'true');
  }
}

// ┌──────────────────────┐
// │ DOM Event Management │
// └──────────────────────┘

var boundEvents = {
  dropdowns: [],
  accordions: [],
  modals: []
};

// returns standard interaction event, later will add touch support
function click () {
  return 'click';
}

// add a callback function to an event on a DOM node
function add$1 (domNode, e, fn) {
  if (domNode.addEventListener) {
    return domNode.addEventListener(e, fn, false);
  } else if (domNode.attachEvent) {
    return domNode.attachEvent('on' + e, fn);
  }
}

// remove a specific function binding from a DOM node event
function remove$1 (domNode, e, fn) {
  if (domNode.removeEventListener) {
    return domNode.removeEventListener(e, fn, false);
  } else if (domNode.detachEvent) {
    return domNode.detachEvent('on' + e, fn);
  }
}

// get the target element of an event
function target (e) {
  return e.target || e.srcElement;
}

// prevent default behavior of an event
function preventDefault (e) {
  if (e.preventDefault) {
    return e.preventDefault();
  } else if (e.returnValue) {
    e.returnValue = false;
  }
}

// stop and event from bubbling up the DOM tree
function stopPropagation (e) {
  e = e || window.event;
  if (e.stopPropagation) {
    return e.stopPropagation();
  }
  if (e.cancelBubble) {
    e.cancelBubble = true;
  }
}

// return a function that will only execute
// once it is NOT called for delay milliseconds
function throttle (fn, time, context) {
  var lock, args, wrapperFn, later;

  later = function () {
    // reset lock and call if queued
    lock = false;
    if (args) {
      wrapperFn.apply(context, args);
      args = false;
    }
  };

  wrapperFn = function () {
    if (lock) {
      // called too soon, queue to call later
      args = arguments;
    } else {
      // call and lock until later
      fn.apply(context, arguments);
      setTimeout(later, time);
      lock = true;
    }
  };

  return wrapperFn;
}

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
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

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];
    return this;
  }
};

var bus = new E();

// Cool Helpers

function clipboard () {
  var copyBtns = findElements('.js-copy-to-clipboard');
  bus.on('clipboard:bind', bindButtons);

  function bindButtons (options) {
    if (!options) {
      copyBtns.forEach(function (btn) {
        add$1(btn, 'click', copy);
      });
    } else {
      add$1(options.node, 'click', copy);
    }
  }

  function copy (e) {
    e.preventDefault();
    var target$$1 = e.target.getAttribute('data-clipboard-target');
    document.querySelector(target$$1).select();
    document.execCommand('copy');
  }

  bus.emit('clipboard:bind');
}

var validator = new RegExp('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$', 'i');

function gen (count) {
  var out = '';
  for (var i = 0; i < count; i++) {
    out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return out;
}

function Guid (guid) {
  if (!guid) { throw new TypeError('Invalid argument `value` has no value.'); }
  this.value = Guid.EMPTY;
  if (guid && guid instanceof Guid) {
    this.value = guid.toString();
  } else if (guid && Object.prototype.toString.call(guid) === '[object String]' && Guid.isGuid(guid)) {
    this.value = guid;
  }
  this.equals = function (other) {
    return Guid.isGuid(other) && this.value === other;
  };
  this.isEmpty = function () {
    return this.value === Guid.EMPTY;
  };
  this.toString = function () {
    return this.value;
  };
  this.toJSON = function () {
    return this.value;
  };
}

Guid.EMPTY = '00000000-0000-0000-0000-000000000000';
Guid.isGuid = function (value) {
  return value && (value instanceof Guid || validator.test(value.toString()));
};
Guid.create = function () {
  return new Guid([gen(2), gen(1), gen(1), gen(1), gen(3)].join('-'));
};
Guid.raw = function () {
  return [gen(2), gen(1), gen(1), gen(1), gen(3)].join('-');
};

// Cool Helpers
// ┌───────────┐
// │ Accordion │
// └───────────┘
// collapsible accordion list
// Listens to a 'accordion:bind' Obj.node = DOMNode
// Emits and listens on the 'accordion:open' channel. Obj.node = DOMNode
// Emits and listens to on the 'accorion:close' channel. Obj.node = DOMNode
// Emitting a modal id toggle that modals state.
// Emitting false or null closes all modals.

function toggleClick (e) {
  stopPropagation(e);
  var parent = closest('accordion-section', target(e));
  bus.emit('accordion:toggle', {node: parent});
}

function handleToggle (options) {
  toggle(options.node, 'is-active');
  var sectionTitle = options.node.querySelector('.accordion-title');
  toggleExpanded(sectionTitle);
}

function checkKeyCode (e) {
  if ((e.keyCode === 13 || e.keyCode === 32) && has(target(e), 'accordion-title')) {
    preventDefault(e);
    stopPropagation(e);
    toggleClick(e);
  }
}

function bindAccordions (options) {
  var accordions = findElements('.js-accordion');
  if (!options) {
    accordions.forEach(function (accordion) {
      setUpAccordion(accordion);
    });
  } else {
    setUpAccordion(options.node);
  }
}

function setUpAccordion (accordion) {
  accordion.setAttribute('aria-live', 'polite');
  accordion.setAttribute('role', 'tablist');
  nodeListToArray(accordion.children).forEach(function (section) {
    var sectionTitle = section.querySelector('.accordion-title');
    var sectionContent = section.querySelector('.accordion-content');
    var id = sectionContent.id || Guid.raw();
    sectionContent.id = id;
    sectionTitle.setAttribute('role', 'tab');
    sectionTitle.setAttribute('tabindex', '0');
    sectionTitle.setAttribute('aria-controls', id);
    if (has(section, 'is-active')) {
      sectionTitle.setAttribute('aria-expanded', 'true');
    }
    // check if the event was already added
    var eventExists = false;
    boundEvents.accordions.forEach(function (e) {
      if (e.target === sectionTitle && e.event === click() && e.fn === toggleClick) {
        eventExists = true;
      }
    });
    if (!eventExists) {
      boundEvents.accordions.push({target: sectionTitle, event: click(), fn: toggleClick});
      boundEvents.accordions.push({target: section, event: 'keydown', fn: checkKeyCode});
      add$1(sectionTitle, click(), toggleClick);
      add$1(section, 'keydown', checkKeyCode);
    }
  });
}

function addListeners () {
  bus.on('accordion:bind', bindAccordions);
  bus.on('accordion:toggle', handleToggle);
  listenersAdded = true;
}

var listenersAdded = false;

function accordion () {
  // only add the listeners if they haven't been added already
  if (!listenersAdded) {
    addListeners();
  }
  bus.emit('accordion:bind');
}

// Cool Helpers

// ┌──────────┐
// │ Dropdown │
// └──────────┘
// show and hide dropdown menus
function closeAllDropdowns (options) {
  remove$1(document.body, click(), closeAllDropdowns);
  findElements('.js-dropdown').forEach(function (dropdown) {
    remove(dropdown, 'is-active');
  });
  findElements('.js-dropdown-toggle').forEach(function (toggle$$1) {
    toggle$$1.setAttribute('aria-expanded', 'false');
  });
  remove$1(document, 'keydown', seizeArrows);
  remove$1(document.body, 'focusin', checkFocus);
}

function checkFocus (e) {
  // if the new focus element is outside the dropdown, close the dropdown
  if (e.target && !closest('js-dropdown', e.target)) {
    bus.emit('dropdown:close');
  }
}

function toggleDropdown (options) {
  if (!options) { return; }
  var isOpen = has(options.node, 'is-active');
  bus.emit('dropdown:close');
  if (!isOpen) {
    add(options.node, 'is-active');
    if (options.target) {
      options.target.setAttribute('aria-expanded', 'true');
    }
    add$1(document, 'keydown', seizeArrows);
  }
  if (has(options.node, 'is-active')) {
    add$1(document.body, click(), closeAllDropdowns);
    add$1(document.body, 'focusin', checkFocus);
  }
}

function seizeArrows (e) {
  if (e.keyCode === 40 | e.keyCode === 38) {
    e.preventDefault();
  }
}

function bindDropdowns (options) {
  // attach the new events
  var toggles = findElements('.js-dropdown-toggle');
  toggles.forEach(function (toggle$$1) {
    // check if the event was already added
    var eventExists = false;
    boundEvents.dropdowns.forEach(function (e) {
      if (e.target === toggle$$1 && e.event === click() && e.fn === toggleClick$1) {
        eventExists = true;
      }
    });
    if (!eventExists) {
      boundEvents.dropdowns.push({target: toggle$$1, event: click(), fn: toggleClick$1});
      add$1(toggle$$1, click(), toggleClick$1);
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
  var current = options.links.indexOf(activeLink);
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
    var links = findElements('.dropdown-link', dropdown)
      .filter(function (link) { return link.offsetParent !== null; });
    bus.emit('dropdown:focus', {links: links, forward: true});
  }
}

function arrowUp () {
  var dropdown = dropdownIsOpen();
  if (dropdown) {
    var links = findElements('.dropdown-link', dropdown)
      .filter(function (link) { return link.offsetParent !== null; });
    bus.emit('dropdown:focus', {links: links, forward: false});
  }
}

function toggleClick$1 (e) {
  preventDefault(e);
  stopPropagation(e);
  var dropdown = closest('js-dropdown', e.target);
  bus.emit('dropdown:toggle', {node: dropdown, target: e.target});
}

function addListeners$1 () {
  bus.on('dropdown:toggle', toggleDropdown);
  bus.on('dropdown:close', closeAllDropdowns);
  bus.on('keyboard:escape', closeAllDropdowns);
  bus.on('keyboard:arrow:down', arrowDown);
  bus.on('keyboard:arrow:up', arrowUp);
  bus.on('dropdown:focus', dropownFocusOn);
  listenersAdded$1 = true;
}

var listenersAdded$1 = false;

function dropdown () {
  // only add the listeners if they haven't been added already
  if (!listenersAdded$1) {
    addListeners$1();
  }
  bindDropdowns();
}

// Cool Helpers

// ┌────────┐
// │ Drawer │
// └────────┘
// show and hide drawers
function drawer () {
  var html = document.documentElement;
  var body = document.body;
  var wrapper = document.querySelector('.wrapper');
  var footer = document.querySelector('.footer');
  var toggles = findElements('.js-drawer-toggle');
  var drawers = findElements('.js-drawer');

  // Bus events
  bus.on('drawer:open', openDrawer);
  bus.on('keyboard:escape', closeDrawer);
  bus.on('drawer:close', closeDrawer);
  bus.on('drawer:bind', bindDrawers);

  function openDrawer (options) {
    bus.emit('drawer:close', {fromOpen: true});
    var drawer = document.querySelector((".js-drawer[data-drawer=\"" + (options.id) + "\"]"));

    drawer.setAttribute('tabindex', 0);
    add(drawer, 'is-active');
    add(html, 'overflow-hidden');

    // if there is a scrollbar, set scroll on body so scroll width remains
    if (html.offsetHeight > html.clientHeight) {
      add(body, 'overflow-scroll');
    }

    hide([wrapper, footer]);
    add$1(drawer, click(), closeClick);
    add$1(document, 'focusin', fenceDrawer);
  }

  function closeDrawer (options) {
    if (!options || options.all) {
      drawers.forEach(function (drawer) {
        drawer.removeAttribute('tabindex');
        remove(drawer, 'is-active');
      });
    } else {
      var drawer = document.querySelector((".js-drawer[data-drawer=\"" + (options.id) + "\"]"));
      if (drawer) {
        drawer.removeAttribute('tabindex');
        remove(drawer, 'is-active');
      }
    }
    show([wrapper, footer]);
    remove$1(document, 'focusin', fenceDrawer);
    remove(document.documentElement, 'drawer-no-overflow');

    if (options && !options.fromOpen) {
      setTimeout(function () {
        remove(html, 'overflow-hidden');
        remove(body, 'overflow-scroll');
      }, 300);
    }
  }

  function fenceDrawer (e) {
    if (!closest('js-drawer', e.target)) {
      drawers.forEach(function (drawer) {
        if (has(drawer, 'is-active')) {
          drawer.focus();
        }
      });
    }
  }

  function bindDrawers (options) {
    if (!options) {
      toggles.forEach(function (toggle$$1) {
        add$1(toggle$$1, click(), toggleClick);
      });
    } else {
      add$1(options.node, click(), toggleClick);
    }
  }

  function closeClick (e) {
    if (has(e.target, 'js-drawer')) {
      bus.emit('drawer:close', {fromOpen: false, all: true});
    }
  }

  function toggleClick (e) {
    preventDefault(e);
    var drawerId = e.target.getAttribute('data-drawer');
    bus.emit('drawer:open', {id: drawerId});
  }

  bus.emit('drawer:bind');
}

// Cool Helpers

// ┌─────────────────┐
// │ Filter Dropdown │
// └─────────────────┘
// Select one or many from a searchable list

function filterDropdown () {
  bus.on('filterDropdown:bind', bindFilterDropdowns);
  bus.on('filterDropdown:select', toggleItem);
  bus.on('filterDropdown:select', emitActive);
  bus.on('filterDropdown:select:remove', removeItem);
  bus.on('filterDropdown:active', drawActive);
  bus.on('filterDropdown:active:clear', clearActive);
  bus.on('filterDropdown:toggle', toggleDropdown);
  bus.on('filterDropdown:open', openList);
  bus.on('filterDropdown:close', closeList);
  bus.on('keyboard:escape', closeList);

  function bindFilterDropdowns () {
    var dropdowns = findElements('.js-filter-dropdown');
    dropdowns.forEach(function (dropdown) {
      var dropdownId = dropdown.getAttribute('data-filter-dropdown');
      var input = dropdown.querySelector('.filter-dropdown-input');
      add$1(input, 'focus', inputFocus);

      var opens = dropdown.querySelectorAll('.js-filter-dropdown-open');
      for (var i = 0; i < opens.length; i++) {
        var open = opens[i];
        open.setAttribute('data-id', dropdownId);
        add$1(open, click(), toggleClick);
      }
      var closes = dropdown.querySelectorAll('.js-filter-dropdown-close');
      for (var i$1 = 0; i$1 < closes.length; i$1++) {
        var close = closes[i$1];
        close.setAttribute('data-id', dropdownId);
        add$1(close, click(), toggleClick);
      }

      var items = dropdown.querySelectorAll('.filter-dropdown-link');
      for (var i$2 = 0; i$2 < items.length; i$2++) {
        var item = items[i$2];
        item.setAttribute('data-item-id', i$2);
        add$1(item, click(), itemClick);
      }

      add$1(input, 'keyup', function (e) {
        var itemsArray = nodeListToArray(items);
        itemsArray.forEach(function (item) {
          add(item, 'hide');
        });

        filterArray(input.value, itemsArray).forEach(function (item) {
          remove(item, 'hide');
        });
      });
    });
  }

  function getOptions (e) {
    var parent = closest('js-filter-dropdown', e.target);
    return {
      parent: parent,
      id: parent.getAttribute('data-filter-dropdown'),
      item: e.target
    };
  }

  function inputFocus (e) {
    stopPropagation(e);
    var options = getOptions(e);
    bus.emit('filterDropdown:input:focus', options);
  }

  function itemClick (e) {
    preventDefault(e);
    stopPropagation(e);
    var options = getOptions(e);
    bus.emit('filterDropdown:select', options);
  }

  function toggleClick (e) {
    e.preventDefault();
    var options = getOptions(e);
    toggle(e.target, 'is-active');
    bus.emit('filterDropdown:toggle', options);
  }

  function toggleDropdown (options) {
    var list = options.parent.querySelector('.filter-dropdown-list');
    if (has(list, 'is-active')) {
      bus.emit('filterDropdown:close', options);
    } else {
      bus.emit('filterDropdown:open', options);
    }
  }

  function toggleItem (options) {
    toggle(options.item, 'is-active');
  }

  function removeItem (options) {
    var activeItems = options.parent.querySelectorAll('.filter-dropdown-link.is-active');
    var toRemove = activeItems[options.i];
    remove(toRemove, 'is-active');

    var newActiveItems = options.parent.querySelectorAll('.filter-dropdown-link.is-active');

    var emit = {
      parent: options.parent,
      id: options.id,
      active: newActiveItems
    };
    bus.emit('filterDropdown:active', emit);
  }

  function openList (options) {
    closeList();
    var list = options.parent.querySelector('.filter-dropdown-list');
    add(list, 'is-active');

    var closes = findElements('.js-filter-dropdown-close', options.parent);
    var opens = findElements('.js-filter-dropdown-open', options.parent);
    opens.forEach(function (el) { return remove(el, 'is-active'); });
    closes.forEach(function (el) { return add(el, 'is-active'); });
  }

  function closeList (e) {
    var lists = document.querySelectorAll('.filter-dropdown-list');
    removeActive(lists);

    var opens = findElements('.js-filter-dropdown-open');
    var closes = findElements('.js-filter-dropdown-close');
    opens.forEach(function (el) { return add(el, 'is-active'); });
    closes.forEach(function (el) { return remove(el, 'is-active'); });
  }

  function emitActive (options) {
    var activeItems = options.parent.querySelectorAll('.filter-dropdown-link.is-active');
    var emit = {
      parent: options.parent,
      id: options.id,
      active: activeItems
    };
    bus.emit('filterDropdown:active', emit);
  }

  function drawActive (options) {
    bus.emit('filterDropdown:active:clear', options);

    var placeholder = options.parent.querySelector('.js-filter-dropdown-no-filters');
    if (options.active.length > 0) {
      add(placeholder, 'hide');
    } else {
      remove(placeholder, 'hide');
    }

    for (var i = 0; i < options.active.length; i++) {
      var item = options.active[i];
      var template = "<span class=\"filter-dropdown-active\">\n        " + (item.innerHTML) + "\n        <a class=\"filter-dropdown-remove\" href=\"#\" data-item-id='" + i + "'>\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 32 32\" class=\"svg-icon\"><path d=\"M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z\"/></svg>\n        </a>\n      </span>";
      options.parent.insertAdjacentHTML('beforeend', template);
      var removeLink = options.parent.querySelector((".filter-dropdown-remove[data-item-id=\"" + i + "\"]"));
      add$1(removeLink, click(), removeClick);
    }
  }

  function removeClick (e) {
    e.preventDefault();
    var options = getOptions(e);
    options.i = e.target.getAttribute('data-item-id');
    bus.emit('filterDropdown:select:remove', options);
  }

  function clearActive (options) {
    var current = options.parent.querySelectorAll('.filter-dropdown-active');
    for (var i = 0; i < current.length; i++) {
      options.parent.removeChild(current[i]);
    }
  }

  bus.emit('filterDropdown:bind');
}

// Cool Helpers

// ┌───────┐
// │ Modal │
// └───────┘
// show and hide modal dialogues
// Listens to a 'modal:bind' optionally takes a node
// Emits and listens on the 'modal:open' channel. Takes a data-modal attr
// Emits and listens to on the 'modal:close' channel. Optionally takes a data-modal
// Emitting a modal id toggle that modals state.
// Emitting false or null closes all modals.

function modal () {
  var html = document.documentElement;
  var body = document.body;
  var wrapper = document.querySelector('.wrapper');
  var footer = document.querySelector('.footer');
  var toggles = findElements('.js-modal-toggle');
  var modals = findElements('.js-modal');
  var firstFocusableElement, lastFocusableElement;

  // Bus events
  bus.on('modal:open', openModal);
  bus.on('keyboard:escape', closeModal);
  bus.on('modal:close', closeModal);
  bus.on('modal:bind', bindModals);

  function dependentNodes () {
    var nodes = [];
    if (wrapper) {
      nodes.push(wrapper);
    }
    if (footer) {
      nodes.push(footer);
    }
    return nodes;
  }

  function openModal (options) {
    bus.emit('modal:close', {fromOpen: true});
    if (!options || !options.id) { return; }
    var modal = document.querySelector((".js-modal[data-modal=\"" + (options.id) + "\"]"));
    modal.removeAttribute('tabindex');
    add$1(document, 'keydown', fenceModal);
    add(modal, 'is-active');
    add(html, 'overflow-hidden');
    // if there is a scrollbar, set scroll on body so scroll width remains
    if (html.offsetHeight > html.clientHeight) {
      add(body, 'overflow-scroll');
    }
    hide(dependentNodes());
    var interactiveQuery = 'button, [href], input, select, textarea, [tabindex]';
    var focusableElements = findElements(interactiveQuery, modal).filter(function (el) {
      return !el.disabled && el.tabIndex !== -1 && el.offsetHeight > 0;
    });
    firstFocusableElement = focusableElements.shift();
    lastFocusableElement = focusableElements.pop();
    firstFocusableElement && firstFocusableElement.focus();
  }

  function closeModal (options) {
    if (!options || !options.id) {
      removeActive(modals);
    } else {
      var modal = document.querySelector((".js-modal[data-modal=\"" + (options.id) + "\"]"));
      remove(modal, 'is-active');
      modal.setAttribute('tabindex', 0);
      remove$1(document, 'keydown', fenceModal);
      show(dependentNodes());
    }

    // delay swapping the overflow classes to avoid modal moving into space vacated by scroll bar
    if (!options || !options.fromOpen) {
      setTimeout(function () {
        remove(html, 'overflow-hidden');
        remove(body, 'overflow-scroll');
      }, 300);
    }
  }

  function bindModals (node) {
    if (!node) {
      toggles.forEach(function (toggle$$1) {
        var eventExists = false;
        boundEvents.modals.forEach(function (e) {
          if (e.target === toggle$$1 && e.event === click() && e.fn === toggleClick$2) {
            eventExists = true;
          }
        });

        if (!eventExists) {
          boundEvents.modals.push({target: toggle$$1, event: click(), fn: toggleClick$2});
          add$1(toggle$$1, click(), toggleClick$2);
        }
      });
    } else {
      add$1(node, click(), toggleClick$2);
    }
  }

  function fenceModal (e) {
    var isTabPressed = (e.key === 'Tab' || e.keyCode === 9);
    if (!isTabPressed) {
      return;
    }
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement && lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement && firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  }

  bus.emit('modal:bind');
}

function toggleClick$2 (e) {
  preventDefault(e);
  var toggle$$1 = closest('js-modal-toggle', e.target);
  var modalId = toggle$$1.getAttribute('data-modal');
  var modal = document.querySelector((".js-modal[data-modal=\"" + modalId + "\"]"));
  if (modal && !has(modal, 'is-active')) {
    bus.emit('modal:open', {id: modalId});
  } else {
    bus.emit('modal:close');
  }
}

// Cool Helpers

// ┌────────┐
// │ Search │
// └────────┘
// Expanding search bar that lives in the top nav.
function search () {
  var toggles = findElements('.js-search-toggle');
  var overlay = findElements('.js-search')[0];

  bus.on('search:bind', bindSearches);
  bus.on('search:toggle', toggleSearch);
  bus.on('keyboard:escape', closeSearch);
  bus.on('search:focus', focusSearch);

  function bindSearches (node) {
    if (!node) {
      toggles.forEach(function (toggle$$1) {
        add$1(toggle$$1, click(), toggleClick);
      });
    } else {
      add$1(node, click(), toggleClick);
    }
  }

  function toggleSearch (node) {
    var openIcon = node.querySelector('.js-search-icon');
    var closeIcon = node.querySelector('.js-close-icon');
    toggle(openIcon, 'hide');
    toggle(closeIcon, 'hide');
    toggle(overlay, 'is-active');
    toggle(document.body, 'overflow-hidden');
    bus.emit('search:focus');
  }

  function focusSearch () {
    var input = document.querySelector('.js-search-input');
    input.focus();
  }

  function closeSearch () {
    if (overlay && has(overlay, 'is-active')) {
      remove(overlay, 'is-active');
      remove(document.body, 'overflow-hidden');
      var toggleNodes = nodeListToArray(toggles);
      toggleNodes.forEach(toggleSearch);
      var input = document.querySelector('.js-search-input');
      if (input) {
        input.blur();
      }
    }
  }

  function toggleClick (e) {
    preventDefault(e);
    bus.emit('search:toggle', e.target);
  }

  bus.emit('search:bind');
}

function selectNav () {
  bus.on('selectnav:bind', bindSelects);

  var selects = findElements('.js-select-nav');

  function bindSelects () {
    selects.forEach(function (select) {
      add$1(select, 'change', selectPage);
    });
  }

  function selectPage (e) {
    window.location.assign(e.currentTarget.value);
  }

  bus.emit('selectnav:bind');
}

// Cool Helpers
// ┌────────┐
// │ Sticky │
// └────────┘
// sticks things to the window

function sticky () {
  bus.on('scrolling:at', scrollHandler);
  bus.on('sticky:stick', stickItem);
  bus.on('sticky:unstick', unstickItem);

  var elements = findElements('.js-sticky');
  var stickies = elements.map(function (el) {
    var offset = el.offsetTop;
    var dataTop = el.getAttribute('data-top') || 0;
    el.style.top = dataTop + 'px';
    var hasId = el.getAttribute('data-sticky-id');
    if (!hasId) { createShim(el); }
    return {
      top: offset - parseInt(dataTop, 0),
      element: el
    };
  });

  function createShim (el) {
    var guid = Guid.raw();
    el.setAttribute('data-sticky-id', guid);
    var parent = el.parentNode;
    var shim = el.cloneNode('deep');
    add(shim, 'js-shim');
    remove(shim, 'js-sticky');
    shim.setAttribute('data-sticky-id', guid);
    shim.style.visibility = 'hidden';
    shim.style.display = 'none';
    parent.insertBefore(shim, el);
  }

  function stickItem (item) {
    var id = item.element.getAttribute('data-sticky-id');
    var shim = document.querySelector((".js-shim[data-sticky-id=\"" + id + "\"]"));
    if (id && shim) {
      add(item.element, 'is-sticky');
      shim.style.display = '';
    }
  }

  function unstickItem (item) {
    var id = item.element.getAttribute('data-sticky-id');
    var shim = document.querySelector((".js-shim[data-sticky-id=\"" + id + "\"]"));
    if (id && shim) {
      remove(item.element, 'is-sticky');
      shim.style.display = 'none';
    }
  }

  function scrollHandler (pageYOffset) {
    stickies.forEach(function (item) {
      var referenceElement = item.element;
      if (has(item.element, 'is-sticky')) {
        var id = item.element.getAttribute('data-sticky-id');
        referenceElement = document.querySelector((".js-shim[data-sticky-id=\"" + id + "\"]"));
      }

      if (referenceElement) {
        var dataTop = referenceElement.getAttribute('data-top') || 0;
        item.top = referenceElement.offsetTop - parseInt(dataTop, 0);
      }

      if (item.top < pageYOffset) {
        bus.emit('sticky:stick', item);
      } else {
        bus.emit('sticky:unstick', item);
      }
    });
  }
}

// Cool Helpers

// ┌──────┐
// │ Tabs │
// └──────┘
// tabbed content pane
function tabs () {
  bus.on('tabs:bind', bindTabs);
  bus.on('tabs:active', setTab);

  function bindTabs () {
    var tabs = findElements('.js-tab');
    var tabGroups = findElements('.js-tab-group');
    var tabSections = findElements('.js-tab-section');

    // set max width for each tab
    tabGroups.forEach(function (tab) {
      tab.setAttribute('aria-live', 'polite');
      groupId(tab);
      tab.children[0].setAttribute('role', 'tablist');
      var tabsInGroup = tab.querySelectorAll('.js-tab');
      var percent = 100 / tabsInGroup.length;
      for (var i = 0; i < tabsInGroup.length; i++) {
        tabsInGroup[i].style.maxWidth = percent + '%';
      }
    });

    tabs.forEach(function (tab) {
      tab.setAttribute('aria-expanded', 'false');
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', '0');
      add$1(tab, click(), clickTab);
      add$1(tab, 'keydown', enterTab);
    });

    tabSections.forEach(function (section) {
      section.setAttribute('role', 'tabpanel');
      var isOpen = has(section, 'is-active');
      if (isOpen) {
        section.setAttribute('aria-expanded', true);
      } else {
        section.setAttribute('aria-expanded', false);
      }
    });
  }

  function groupId (tab) {
    var hasId = tab.getAttribute('data-tab');
    if (hasId) {
      return hasId;
    } else {
      var id = Guid.raw();
      tab.setAttribute('data-tab', id);
      return id;
    }
  }

  function setTab (options) {
    var group = options.parent;
    var tabs = nodeListToArray(group.querySelectorAll('.js-tab'));
    var activeTab = options.active;

    var sections = nodeListToArray(group.querySelectorAll('.js-tab-section'));
    var index = tabs.indexOf(activeTab);
    var activeSection = sections[index];

    tabs.forEach(function (t) {
      t.setAttribute('aria-expanded', false);
    });
    activeTab.setAttribute('aria-expanded', true);
    toggleActive(tabs, activeTab);

    sections.forEach(function (s) {
      s.setAttribute('aria-expanded', false);
    });
    activeSection.setAttribute('aria-expanded', true);
    toggleActive(sections, activeSection);
    activeTab.focus();
  }

  function getOptions (e) {
    var tab = e.target;
    if (!has(tab, 'js-tab')) {
      tab = e.currentTarget;
    }
    var group = closest('js-tab-group', tab);
    var id = groupId(group);
    return {
      parent: group,
      id: id,
      active: tab
    };
  }

  function clickTab (e) {
    e.preventDefault();
    var options = getOptions(e);
    bus.emit('tabs:active', options);
  }

  function enterTab (e) {
    var options = getOptions(e);
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      bus.emit('tabs:active', options);
    }

    if (e.keyCode === 39 || e.keyCode === 37) {
      var tabs = nodeListToArray(options.parent.querySelectorAll('.js-tab'));
      var currentIndex = tabs.indexOf(document.activeElement);
      if (currentIndex > -1 && has(document.activeElement, 'js-tab')) {
        var nextTab = tabs[currentIndex + 1] || tabs[0];
        var previousTab = tabs[currentIndex - 1] || tabs[tabs.length - 1];
        var tab = e.keyCode === 39 ? nextTab : previousTab;
        tab.focus();
      }
    }
  }

  bus.emit('tabs:bind');
}

// ┌─────────┐

// ┌──────────────────────┐
// │ Emit Keyboard Events │
// └──────────────────────┘
// emit presses of escape and return keys
add$1(document, 'keyup', translateKeypress);
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
add$1(window, 'scroll', throttle(isScrolling, 100));
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
  drawer,
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
    Object.assign = function (target$$1) {
      var arguments$1 = arguments;

      if (target$$1 == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      target$$1 = Object(target$$1);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments$1[index];
        if (source != null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target$$1[key] = source[key];
            }
          }
        }
      }
      return target$$1;
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
var version = '1.2.5';
var click$1 = click;
var addEvent = add$1;
var removeEvent = remove$1;
var eventTarget = target;
var preventDefault$1 = preventDefault;
var stopPropagation$1 = stopPropagation;
var throttle$1 = throttle;
var hasClass = has;
var addClass = add;
var removeClass = remove;
var toggleClass = toggle;
var removeActive$1 = removeActive;
var addActive$1 = addActive;
var toggleActive$1 = toggleActive;
var toggleAriaHidden = toggleHidden;
var toggleAriaExpanded = toggleExpanded;
var closest$1 = closest;
var nodeListToArray$1 = nodeListToArray;
var findElements$1 = findElements;

// ┌────────┐

var calciteWeb = {
  version: version,
  click: click$1,
  addEvent: addEvent,
  removeEvent: removeEvent,
  eventTarget: eventTarget,
  preventDefault: preventDefault$1,
  stopPropagation: stopPropagation$1,
  throttle: throttle$1,
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  removeActive: removeActive$1,
  addActive: addActive$1,
  toggleActive: toggleActive$1,
  toggleAriaHidden: toggleAriaHidden,
  toggleAriaExpanded: toggleAriaExpanded,
  closest: closest$1,
  nodeListToArray: nodeListToArray$1,
  findElements: findElements$1,
  bus: bus,
  accordion: accordion,
  dropdown: dropdown,
  drawer: drawer,
  filterDropdown: filterDropdown,
  modal: modal,
  search: search,
  selectNav: selectNav,
  sticky: sticky,
  tabs: tabs,
  extend: extend,
  init: init
};

return calciteWeb;

})));
