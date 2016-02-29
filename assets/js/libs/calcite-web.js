/* calcite-web - v1.0.0-beta.6 - 2016-02-29
*  https://github.com/esri/calcite-web
*  Copyright (c) 2016 Environmental Systems Research Institute, Inc.
*  Apache 2.0 License */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('calcite-web', factory) :
  (global.calcite = factory());
}(this, function () { 'use strict';

  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

  // ┌────────────────────┐
  // │ Class Manipulation │
  // └────────────────────┘

  // check if an element has a specific class
  function has(domNode, className) {
    var elementClass = ' ' + domNode.className + ' ';
    return elementClass.indexOf(' ' + className + ' ') !== -1;
  }

  // add one or more classes to an element
  function add(domNode, classes) {
    classes.split(' ').forEach(function (c) {
      if (!has(domNode, c)) {
        domNode.className += ' ' + c;
      }
    });
  }

  // remove one or more classes from an element
  function remove(domNode, classes) {
    var elementClass = ' ' + domNode.className + ' ';
    classes.split(' ').forEach(function (c) {
      elementClass = elementClass.replace(' ' + c + ' ', ' ');
    });
    domNode.className = elementClass.trim();
  }

  // if domNode has the class, remove it, else add it
  function toggle(domNode, className) {
    if (has(domNode, className)) {
      remove(domNode, className);
    } else {
      add(domNode, className);
    }
  }

  // remove 'is-active' class from every element in an array
  function removeActive(array) {
    array = nodeListToArray(array);
    array.forEach(function (item) {
      remove(item, 'is-active');
    });
  }

  // add 'is-active' class from every element in an array
  function addActive(array) {
    array = nodeListToArray(array);
    array.forEach(function (item) {
      add(item, 'is-active');
    });
  }

  function toggleActive(array, el) {
    var isActive = has(el, 'is-active');
    if (isActive) {
      remove(el, 'is-active');
    } else {
      removeActive(array);
      add(el, 'is-active');
    }
  }

  // ┌─────┐
  // │ DOM │
  // └─────┘
  // Handles dom nodes

  // returns closest element up the DOM tree matching a given class
  function closest(className, context) {
    var current;
    for (current = context; current; current = current.parentNode) {
      if (current.nodeType === 1 && has(current, className)) {
        break;
      }
    }
    return current;
  }

  // turn a domNodeList into an array
  function nodeListToArray(domNodeList) {
    if (Array.isArray(domNodeList)) {
      return domNodeList;
    } else {
      return Array.prototype.slice.call(domNodeList);
    }
  }

  // Finds all the elements inside a node, or the document and returns them as an array
  function findElements(query, domNode) {
    var context = domNode || document;
    var elements = context.querySelectorAll(query);
    return nodeListToArray(elements);
  }

  function filterArray(value, array) {
    var results = array.filter(function (item) {
      var val = value.toLowerCase();
      var t = item.innerHTML.toLowerCase();
      return t.indexOf(val) !== -1;
    });
    return results;
  }

  // ┌────────────────┐
  // │ Aria Adjusters │
  // └────────────────┘
  // utilities to help manage aria properties

  // toggles `aria-hidden` on a domNode
  function toggleHidden(array) {
    array.forEach(function (node) {
      var hidden = node.getAttribute('aria-hidden');
      if (hidden !== 'true') {
        node.setAttribute('aria-hidden', true);
      } else {
        node.removeAttribute('aria-hidden');
      }
    });
  }

  // adds `aria-hidden` on a domNode
  function hide(array) {
    array.forEach(function (node) {
      node.setAttribute('aria-hidden', true);
    });
  }

  // removes `aria-hidden` on a domNode
  function show(array) {
    array.forEach(function (node) {
      node.removeAttribute('aria-hidden');
    });
  }

  function toggleExpanded(domNode) {
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

  // returns standard interaction event, later will add touch support
  function click() {
    return 'click';
  }

  // add a callback function to an event on a DOM node
  function add$1(domNode, e, fn) {
    if (domNode.addEventListener) {
      return domNode.addEventListener(e, fn, false);
    } else if (domNode.attachEvent) {
      return domNode.attachEvent('on' + e, fn);
    }
  }

  // remove a specific function binding from a DOM node event
  function remove$1(domNode, e, fn) {
    if (domNode.removeEventListener) {
      return domNode.removeEventListener(e, fn, false);
    } else if (domNode.detachEvent) {
      return domNode.detachEvent('on' + e, fn);
    }
  }

  // get the target element of an event
  function target(e) {
    return e.target || e.srcElement;
  }

  // prevent default behavior of an event
  function preventDefault(e) {
    if (e.preventDefault) {
      return e.preventDefault();
    } else if (e.returnValue) {
      e.returnValue = false;
    }
  }

  // stop and event from bubbling up the DOM tree
  function stopPropagation(e) {
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
  function throttle(fn, time, context) {
    var lock, args, wrapperFn, later;

    later = function later() {
      // reset lock and call if queued
      lock = false;
      if (args) {
        wrapperFn.apply(context, args);
        args = false;
      }
    };

    wrapperFn = function wrapperFn() {
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

  var index = __commonjs(function (module) {
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
      };

      listener._ = callback
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
          if (evts[i].fn !== callback && evts[i].fn._ !== callback)
            liveEvents.push(evts[i]);
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

  module.exports = E;
  });

  var Emitter = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);

  var bus = new Emitter();

  // ┌───────────┐
  // │ Accordion │
  // └───────────┘
  // collapsible accordion list
  // Listens to a 'accordion:bind' Obj.node = DOMNode
  // Emits and listens on the 'accordion:open' channel. Obj.node = DOMNode
  // Emits and listens to on the 'accorion:close' channel. Obj.node = DOMNode
  // Emitting a modal id toggle that modals state.
  // Emitting false or null closes all modals.

  function accordion() {
    var accordions = findElements('.js-accordion');
    bus.on('accordion:bind', bindAccordions);
    bus.on('accordion:toggle', handleToggle);

    function bindAccordions(options) {
      if (!options) {
        accordions.forEach(function (accordion) {
          setUpAccordion(accordion);
        });
      } else {
        setUpAccordion(options.node);
      }
    }

    function setUpAccordion(accordion) {
      accordion.setAttribute('aria-live', 'polite');
      accordion.setAttribute('role', 'tablist');
      nodeListToArray(accordion.children).forEach(function (section) {
        var sectionTitle = section.querySelector('.accordion-title');
        sectionTitle.setAttribute('role', 'tab');
        sectionTitle.setAttribute('tabindex', '0');
        if (has(section, 'is-active')) {
          section.setAttribute('aria-expanded', 'true');
        }
        add$1(sectionTitle, click(), toggleClick);
        add$1(section, 'keyup', function (e) {
          if (e.keyCode === 13) {
            toggleClick(e);
          }
        });
      });
    }

    function toggleClick(e) {
      stopPropagation(e);
      var parent = closest('accordion-section', target(e));
      bus.emit('accordion:toggle', { node: parent });
    }

    function handleToggle(options) {
      toggle(options.node, 'is-active');
      toggleExpanded(options.node);
    }

    bus.emit('accordion:bind');
  }

  // ┌──────────┐
  // │ Dropdown │
  // └──────────┘
  // show and hide dropdown menus
  function dropdown() {
    var toggles = findElements('.js-dropdown-toggle');
    var dropdowns = findElements('.js-dropdown');

    bus.on('dropdown:toggle', toggleDropdown);
    bus.on('dropdown:close', closeAllDropdowns);
    bus.on('keyboard:escape', closeAllDropdowns);
    bus.on('dropdown:bind', bindDropdowns);

    function closeAllDropdowns(options) {
      remove$1(document.body, click(), closeAllDropdowns);
      dropdowns.forEach(function (dropdown) {
        remove(dropdown, 'is-active');
      });
    }

    function toggleDropdown(options) {
      if (!options) return;
      toggle(options.node, 'is-active');
      if (has(options.node, 'is-active')) {
        add$1(document.body, click(), closeAllDropdowns);
      }
    }

    function bindDropdowns(options) {
      toggles.forEach(function (toggle) {
        add$1(toggle, click(), toggleClick);
      });
    }

    function toggleClick(e) {
      preventDefault(e);
      stopPropagation(e);
      var dropdown = closest('js-dropdown', e.target);
      bus.emit('dropdown:toggle', { node: dropdown });
    }

    bus.emit('dropdown:bind');
  }

  // ┌────────┐
  // │ Drawer │
  // └────────┘
  // show and hide drawers
  function drawer() {
    var wrapper = document.querySelector('.wrapper');
    var footer = document.querySelector('.footer');
    var toggles = findElements('.js-drawer-toggle');
    var drawers = findElements('.js-drawer');
    var lastOn;

    // Bus events
    bus.on('drawer:open', openDrawer);
    bus.on('keyboard:escape', closeDrawer);
    bus.on('drawer:close', closeDrawer);
    bus.on('drawer:bind', bindDrawers);

    function openDrawer(options) {
      bus.emit('drawer:close');
      var drawer = document.querySelector('.js-drawer[data-drawer="' + options.id + '"]');
      drawer.setAttribute('tabindex', 0);
      add(drawer, 'is-active');
      toggleHidden([wrapper, footer]);
      add$1(drawer, click(), closeClick);
      add$1(document, 'focusin', fenceDrawer);
    }

    function closeDrawer(options) {
      if (!options) {
        drawers.forEach(function (drawer) {
          drawer.removeAttribute('tabindex');
          remove(drawer, 'is-active');
        });
      } else {
        var drawer = document.querySelector('.js-drawer[data-drawer="' + options.id + '"]');
        drawer.removeAttribute('tabindex');
        remove(drawer, 'is-active');
      }
      hide([wrapper, footer]);
      remove$1(document, 'focusin', fenceDrawer);
      if (lastOn) lastOn.focus();
    }

    function fenceDrawer(e) {
      if (!closest('js-drawer', e.target)) {
        drawers.forEach(function (drawer) {
          if (has(drawer, 'is-active')) {
            drawer.focus();
          }
        });
      }
    }

    function bindDrawers(options) {
      if (!options) {
        toggles.forEach(function (toggle) {
          add$1(toggle, click(), toggleClick);
        });
      } else {
        add$1(options.node, click(), toggleClick);
      }
    }

    function closeClick() {
      bus.emit('drawer:close');
    }

    function toggleClick(e) {
      preventDefault(e);
      var drawerId = e.target.getAttribute('data-drawer');
      bus.emit('drawer:open', { id: drawerId });
    }

    bus.emit('drawer:bind');
  }

  // ┌───────────────────┐
  // │ Expanding Section │
  // └───────────────────┘
  // show and hide exanding nav located under topnav
  function expander() {
    var toggles = findElements('.js-expand-toggle');
    var sections = document.querySelectorAll('.js-expand');

    toggles.forEach(function (toggle) {
      add$1(toggle, click(), function (e) {
        preventDefault(e);

        var sectionId = toggle.getAttribute('data-expand');
        var section = document.querySelector('.js-expand[data-expand="' + sectionId + '"]');
        var isOpen = has(section, 'is-active');
        var shouldClose = has(section, 'is-active');

        toggleActive(sections, section);

        if (isOpen && shouldClose) {
          remove(section, 'is-active');
        } else {
          add(section, 'is-active');
        }
      });
    });
  }

  // ┌─────────────────┐
  // │ Filter Dropdown │
  // └─────────────────┘
  // Select one or many from a searchable list

  function filterDropdown() {
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

    function bindFilterDropdowns() {
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
        for (var i = 0; i < closes.length; i++) {
          var close = closes[i];
          close.setAttribute('data-id', dropdownId);
          add$1(close, click(), toggleClick);
        }

        var items = dropdown.querySelectorAll('.filter-dropdown-link');
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          item.setAttribute('data-item-id', i);
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

    function getOptions(e) {
      var parent = closest('js-filter-dropdown', e.target);
      return {
        parent: parent,
        id: parent.getAttribute('data-filter-dropdown'),
        item: e.target
      };
    }

    function inputFocus(e) {
      stopPropagation(e);
      var options = getOptions(e);
      bus.emit('filterDropdown:input:focus', options);
    }

    function itemClick(e) {
      preventDefault(e);
      stopPropagation(e);
      var options = getOptions(e);
      bus.emit('filterDropdown:select', options);
    }

    function toggleClick(e) {
      e.preventDefault();
      var options = getOptions(e);
      toggle(e.target, 'is-active');
      bus.emit('filterDropdown:toggle', options);
    }

    function toggleDropdown(options) {
      var list = options.parent.querySelector('.filter-dropdown-list');
      if (has(list, 'is-active')) {
        bus.emit('filterDropdown:close', options);
      } else {
        bus.emit('filterDropdown:open', options);
      }
    }

    function toggleItem(options) {
      toggle(options.item, 'is-active');
    }

    function removeItem(options) {
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

    function openList(options) {
      closeList();
      var list = options.parent.querySelector('.filter-dropdown-list');
      add(list, 'is-active');

      var closes = findElements('.js-filter-dropdown-close', options.parent);
      var opens = findElements('.js-filter-dropdown-open', options.parent);
      opens.forEach(function (el) {
        return remove(el, 'is-active');
      });
      closes.forEach(function (el) {
        return add(el, 'is-active');
      });
    }

    function closeList(e) {
      var lists = document.querySelectorAll('.filter-dropdown-list');
      removeActive(lists);

      var opens = findElements('.js-filter-dropdown-open');
      var closes = findElements('.js-filter-dropdown-close');
      opens.forEach(function (el) {
        return add(el, 'is-active');
      });
      closes.forEach(function (el) {
        return remove(el, 'is-active');
      });
    }

    function emitActive(options) {
      var activeItems = options.parent.querySelectorAll('.filter-dropdown-link.is-active');
      var emit = {
        parent: options.parent,
        id: options.id,
        active: activeItems
      };
      bus.emit('filterDropdown:active', emit);
    }

    function drawActive(options) {
      bus.emit('filterDropdown:active:clear', options);

      var placeholder = options.parent.querySelector('.js-flilter-dropdown-no-filters');
      if (options.active.length > 0) {
        add(placeholder, 'hide');
      } else {
        remove(placeholder, 'hide');
      }

      for (var i = 0; i < options.active.length; i++) {
        var item = options.active[i];
        var template = '<span class="filter-dropdown-active">' + item.innerHTML + '<a class="filter-dropdown-remove" href="#" data-item-id=\'' + i + '\'></a></span>';
        options.parent.insertAdjacentHTML('beforeend', template);
        var remove$$ = options.parent.querySelector('.filter-dropdown-remove[data-item-id="' + i + '"]');
        add$1(remove$$, click(), removeClick);
      }
    }

    function removeClick(e) {
      e.preventDefault();
      var options = getOptions(e);
      options.i = e.target.getAttribute('data-item-id');
      bus.emit('filterDropdown:select:remove', options);
    }

    function clearActive(options) {
      var current = options.parent.querySelectorAll('.filter-dropdown-active');
      for (var i = 0; i < current.length; i++) {
        options.parent.removeChild(current[i]);
      }
    }

    bus.emit('filterDropdown:bind');
  }

  // ┌───────┐
  // │ Modal │
  // └───────┘
  // show and hide modal dialogues
  // Listens to a 'modal:bind' optionally takes a node
  // Emits and listens on the 'modal:open' channel. Takes a data-modal attr
  // Emits and listens to on the 'modal:close' channel. Optionally takes a data-modal
  // Emitting a modal id toggle that modals state.
  // Emitting false or null closes all modals.

  function modal() {
    // Cool nodes
    var wrapper = document.querySelector('.wrapper');
    var footer = document.querySelector('.footer');
    var toggles = findElements('.js-modal-toggle');
    var modals = findElements('.js-modal');

    // Bus events
    bus.on('modal:open', openModal);
    bus.on('keyboard:escape', closeModal);
    bus.on('modal:close', closeModal);
    bus.on('modal:bind', bindModals);

    function openModal(modalId) {
      bus.emit('modal:close');
      if (!modalId) return;
      var modal = document.querySelector('.js-modal[data-modal="' + modalId + '"]');
      modal.removeAttribute('tabindex');
      add$1(document, 'focusin', fenceModal);
      add(modal, 'is-active');
      hide([wrapper, footer]);
      modal.focus();
    }

    function closeModal(modalId) {
      if (!modalId) return removeActive(modals);
      var modal = document.querySelector('.js-modal[data-modal="' + modalId + '"]');
      remove(modal, 'is-active');
      modal.setAttribute('tabindex', 0);
      remove$1(document, 'focusin', fenceModal);
      show([wrapper, footer]);
    }

    function bindModals(node) {
      if (!node) {
        toggles.forEach(function (toggle) {
          add$1(toggle, click(), toggleClick);
        });
      } else {
        add$1(node, click(), toggleClick);
      }
    }

    function fenceModal(e) {
      if (!closest('js-modal', e.target)) {
        modals.forEach(function (modal) {
          if (has(modal, 'is-active')) {
            modal.focus();
          }
        });
      }
    }

    function toggleClick(e) {
      preventDefault(e);
      var modalId = e.target.dataset.modal;
      bus.emit('modal:open', modalId);
    }

    bus.emit('modal:bind');
  }

  // ┌────────┐
  // │ Search │
  // └────────┘
  // Expanding search bar that lives in the top nav.
  function search() {
    var searchForms = findElements('.js-site-search');

    function toggleForm(e) {
      var searchContainer = closest('js-site-search', e.target);
      var isOpen = has(searchContainer, 'is-active');

      if (isOpen) {
        remove(searchContainer, 'is-active');
        e.target.value = '';
      } else {
        add(searchContainer, 'is-active');
      }
    }

    searchForms.forEach(function (search) {
      add$1(search, 'focusin', toggleForm);
      add$1(search, 'focusout', toggleForm);
    });
  }

  var guid = __commonjs(function (module) {
  (function () {
    var validator = new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$", "i");

    function gen(count) {
      var out = "";
      for (var i=0; i<count; i++) {
        out += (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      }
      return out;
    }

    function Guid(guid) {
      if (!guid) throw new TypeError("Invalid argument; `value` has no value.");
        
      this.value = Guid.EMPTY;
      
      if (guid && guid instanceof Guid) {
        this.value = guid.toString();

      } else if (guid && Object.prototype.toString.call(guid) === "[object String]" && Guid.isGuid(guid)) {
        this.value = guid;
      }
      
      this.equals = function(other) {
        // Comparing string `value` against provided `guid` will auto-call
        // toString on `guid` for comparison
        return Guid.isGuid(other) && this.value == other;
      };

      this.isEmpty = function() {
        return this.value === Guid.EMPTY;
      };
      
      this.toString = function() {
        return this.value;
      };
      
      this.toJSON = function() {
        return this.value;
      };
    };

    Guid.EMPTY = "00000000-0000-0000-0000-000000000000";

    Guid.isGuid = function(value) {
      return value && (value instanceof Guid || validator.test(value.toString()));
    };

    Guid.create = function() {
      return new Guid([gen(2), gen(1), gen(1), gen(1), gen(3)].join("-"));
    };

    Guid.raw = function() {
      return [gen(2), gen(1), gen(1), gen(1), gen(3)].join("-");
    };

    if(typeof module != 'undefined' && module.exports) {
      module.exports = Guid;
    }
    else if (typeof window != 'undefined') {
      window.Guid = Guid;
    }
  })();
  });

  var Guid = (guid && typeof guid === 'object' && 'default' in guid ? guid['default'] : guid);

  // ┌────────┐
  // │ Sticky │
  // └────────┘
  // sticks things to the window

  function sticky() {
    bus.on('scrolling:at', scrollHandler);
    bus.on('sticky:stick', stickItem);
    bus.on('sticky:unstick', unstickItem);

    var elements = findElements('.js-sticky');
    var stickies = elements.map(function (el) {
      var offset = el.offsetTop;
      var dataTop = el.getAttribute('data-top') || 0;
      el.style.top = dataTop + 'px';
      var hasId = el.getAttribute('data-sticky-id');
      if (!hasId) createShim(el);
      return {
        top: offset - parseInt(dataTop, 0),
        element: el
      };
    });

    function createShim(el) {
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

    function stickItem(item) {
      var id = item.element.getAttribute('data-sticky-id');
      var shim = document.querySelector('.js-shim[data-sticky-id="' + id + '"]');
      add(item.element, 'is-sticky');
      shim.style.display = '';
    }

    function unstickItem(item) {
      var id = item.element.getAttribute('data-sticky-id');
      var shim = document.querySelector('.js-shim[data-sticky-id="' + id + '"]');
      remove(item.element, 'is-sticky');
      shim.style.display = 'none';
    }

    function scrollHandler(pageYOffset) {
      stickies.forEach(function (item) {
        var referenceElement = item.element;
        if (has(item.element, 'is-sticky')) {
          var id = item.element.getAttribute('data-sticky-id');
          referenceElement = document.querySelector('.js-shim[data-sticky-id="' + id + '"]');
        }
        var dataTop = referenceElement.getAttribute('data-top') || 0;
        item.top = referenceElement.offsetTop - parseInt(dataTop, 0);

        if (item.top < pageYOffset) {
          bus.emit('sticky:stick', item);
        } else {
          bus.emit('sticky:unstick', item);
        }
      });
    }
  }

  // ┌──────┐
  // │ Tabs │
  // └──────┘
  // tabbed content pane
  function tabs() {
    bus.on('tabs:bind', bindTabs);
    bus.on('tabs:active', setTab);

    function bindTabs() {
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
        add$1(tab, 'keyup', enterTab);
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

    function groupId(tab) {
      var hasId = tab.getAttribute('data-tab');
      if (hasId) {
        return hasId;
      } else {
        var id = Guid.raw();
        tab.setAttribute('data-tab', id);
        return id;
      }
    }

    function setTab(options) {
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
    }

    function getOptions(e) {
      var tab = e.target;
      var group = closest('js-tab-group', tab);
      var id = groupId(group);
      return {
        parent: group,
        id: id,
        active: tab
      };
    }

    function clickTab(e) {
      e.preventDefault();
      var options = getOptions(e);
      bus.emit('tabs:active', options);
    }

    function enterTab(e) {
      var options = getOptions(e);
      if (e.keycode === 13) {
        bus.emit('tabs:active', options);
      }
    }

    bus.emit('tabs:bind');
  }

  // ┌───────────┐
  // │ Third Nav │
  // └───────────┘
  // sticks things to the window

  function thirdNav() {
    var nav = findElements('.js-nav-overflow')[0];
    var leftBtn = findElements('.js-overflow-left')[0];
    var rightBtn = findElements('.js-overflow-right')[0];

    function scroll(distance) {
      nav.scrollLeft += distance;
    }

    function resize() {
      remove(leftBtn, 'is-active');
      remove(rightBtn, 'is-active');
      if (nav.scrollLeft > 0) add(leftBtn, 'is-active');
      if (nav.scrollLeft + nav.clientWidth + 5 < nav.scrollWidth) add(rightBtn, 'is-active');
    }

    if (nav) {
      add$1(leftBtn, click(), scroll.bind(null, -40));
      add$1(rightBtn, click(), scroll.bind(null, 40));
      add$1(nav, 'scroll', resize);
      add$1(window, 'resize', resize);
      resize();
    }
  }

  // ┌──────────────────────┐
  // │ Emit Keyboard Events │
  // └──────────────────────┘
  // emit presses of escape and return keys
  add$1(document, 'keyup', translateKeypress);
  function translateKeypress(e) {
    if (e.keyCode === 27) {
      bus.emit('keyboard:escape');
    } else if (e.keyCode === 13) {
      bus.emit('keyboard:return');
    }
  }

  // ┌────────────────────┐
  // │ Emit Scroll Events │
  // └────────────────────┘
  // throttled for performance
  add$1(window, 'scroll', throttle(isScrolling, 100));
  function isScrolling() {
    bus.emit('scrolling:at', window.pageYOffset);
  }

  // ┌────────────────────┐
  // │ Initialize Calcite │
  // └────────────────────┘
  // start up Calcite and attach all the patterns
  // optionally pass an array of patterns you'd like to watch
  function init() {
    accordion();
    dropdown();
    drawer();
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
  var calciteWeb = {
    version: '1.0.0-beta.6',
    click: click,
    addEvent: add$1,
    removeEvent: remove$1,
    eventTarget: target,
    preventDefault: preventDefault,
    stopPropagation: stopPropagation,
    throttle: throttle,
    hasClass: has,
    addClass: add,
    removeClass: remove,
    toggleClass: toggle,
    removeActive: removeActive,
    addActive: addActive,
    toggleActive: toggleActive,
    toggleAriaHidden: toggleHidden,
    toggleAriaExpanded: toggleExpanded,
    closest: closest,
    nodeListToArray: nodeListToArray,
    findElements: findElements,
    bus: bus,
    accordion: accordion,
    dropdown: dropdown,
    drawers: drawer,
    expander: expander,
    filterDropdown: filterDropdown,
    modal: modal,
    search: search,
    sticky: sticky,
    tabs: tabs,
    thirdNav: thirdNav,
    init: init
  };

  return calciteWeb;

}));
//# sourceMappingURL=calcite-web.js.map