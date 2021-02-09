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

// remove 'is-active' class from every element in an array, add to one element
function toggleActive (array, el) {
  removeActive(array);
  add(el, 'is-active');
}

// ┌────────────────┐

function toggleExpanded (domNode) {
  if (!domNode) {
    return;
  }
  var expanded = domNode.getAttribute('aria-expanded');
  if (expanded === 'true') {
    domNode.setAttribute('aria-expanded', 'false');
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
    sectionTitle.setAttribute('aria-expanded', has(section, 'is-active') ? 'true' : 'false');
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

// Cool Helpers

// Cool Helpers

// Cool Helpers

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

// ┌────────┐

function init$1 () {
  [accordion,dropdown,sticky,tabs].forEach(function (pattern) {
    pattern();
  });
}

var calciteWeb = {
  bus: bus,
  accordion: accordion,
  dropdown: dropdown,
  sticky: sticky,
  tabs: tabs,
  init: init$1
};

return calciteWeb;

})));
