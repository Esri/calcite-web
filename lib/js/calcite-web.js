(function Calcite () {

var calcite = {
  version: '0.0.6'
};

// ┌───────────────┐
// │ DOM utilities │
// └───────────────┘

calcite.dom = {};

// ┌──────────────────────┐
// │ DOM event management │
// └──────────────────────┘

// returns standard interaction event, later will add touch support
calcite.dom.event = function () {
  return "click";
};

// add a callback function to an event on a DOM node
calcite.dom.addEvent = function (domNode, event, fn) {
  if (domNode.addEventListener) {
    return domNode.addEventListener(event, fn, false);
  }
  if (domNode.attachEvent) {
    return domNode.attachEvent('on' + event, fn);
  }
};

// remove a specific function binding from a DOM node event
calcite.dom.removeEvent = function (domNode, event, fn) {
  if (domNode.removeEventListener) {
    return domNode.removeEventListener(event, fn, false);
  }
  if (domNode.detachEvent) {
    return domNode.detachEvent('on' + event,  fn);
  }
};

// get the target element of an event
calcite.dom.eventTarget = function (event) {
  if (!event.target) {
    return event.srcElement;
  }
  if (event.target) {
    return event.target;
  }
};

// prevent default behavior of an event
calcite.dom.preventDefault = function (event) {
  if (event.preventDefault) {
    return event.preventDefault();
  }
  if (event.returnValue) {
    event.returnValue = false;
  }
};

// stop and event from bubbling up the DOM tree
calcite.dom.stopPropagation = function (event) {
  event = event || window.event;
  if (event.stopPropagation) {
    return event.stopPropagation();
  }
  if (event.cancelBubble) {
    event.cancelBubble = true;
  }
};

// ┌────────────────────┐
// │ class manipulation │
// └────────────────────┘

// check if an element has a specific class
calcite.dom.hasClass = function (domNode, className) {
  var exp = new RegExp(' ' + className + ' ');
  if (exp.test(' ' + domNode.className + ' ')) {
    return true;
  }

  return false;
};

// add one or more classes to an element
calcite.dom.addClass = function (domNode, classes) {
  classes = classes.split(' ');

  for (var i = 0; i < classes.length; i++) {
    if (!calcite.dom.hasClass(domNode, classes[i])) {
      domNode.className += ' ' + classes[i];
    }
  }
};

// remove one or more classes from an element
calcite.dom.removeClass = function (domNode, classes) {
  classes = classes.split(' ');

  for (var i = 0; i < classes.length; i++) {
    var newClass = ' ' + domNode.className.replace( /[\t\r\n]/g, ' ') + ' ';

    if (calcite.dom.hasClass(domNode, classes[i])) {
      while (newClass.indexOf(' ' + classes[i] + ' ') >= 0) {
        newClass = newClass.replace(' ' + classes[i] + ' ', ' ');
      }

      domNode.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  }
};

// ┌───────────────┐
// │ DOM traversal │
// └───────────────┘

// returns closest element up the DOM tree matching a given class
calcite.dom.closest = function (className, context) {
  var result, current;
  for (current = context; current; current = current.parentNode) {
    if (current.nodeType === 1 && calcite.dom.hasClass(current, className)) {
      result = current;
      break;
    }
  }
  return current;
};

// get an attribute for an element
calcite.dom.getAttr = function(domNode, attr) {
  if (domNode.getAttribute) {
    return domNode.getAttribute(attr);
  }

  var result;
  var attrs = domNode.attributes;

  for (var i = 0; i < attrs.length; i++) {
    if (attrs[i].nodeName === attr) {
      result = attrs[i].nodeValue;
    }
  }

  return result;
};

// ┌───────────────────┐
// │ object conversion │
// └───────────────────┘

// turn a domNodeList into an array
calcite.dom.nodeListToArray = function (domNodeList) {
  var array = [];
  for (var i = 0; i < domNodeList.length; i++) {
    array.push(domNodeList[i]);
  }
  return array;
};

// ┌────────────────────┐
// │ array manipulation │
// └────────────────────┘

calcite.arr = {};

// return the index of an object in an array with optional offset
calcite.arr.indexOf = function (obj, arr, offset) {
  var i = offset || 0;

  if (arr.indexOf) {
    return arr.indexOf(obj, i);
  }

  for (i; i < arr.length; i++) {
    if (arr[i] === obj) {
      return i;
    }
  }

  return -1;
};

// ┌───────────────────────────┐
// │ browser feature detection │
// └───────────────────────────┘
// detect features like touch, ie, etc.

calcite.browser = {};

// detect touch, could be improved for more coverage
calcite.browser.isTouch = function () {
  if (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)) {
    return true;
  }
  return false;
};

// ┌─────────────┐
// │ JS Patterns │
// └─────────────┘
// javascript logic for ui patterns

// ┌───────────┐
// │ ACCORDION │
// └───────────┘
// Collapsible accordion list

calcite.accordion = function () {
  var accordions = document.querySelectorAll('.js-accordion');

  if (accordions.length > 0) {
    for (var i = 0; i < accordions.length; i++) {
      var children = accordions[i].children;
      for (var j = 0; j < children.length; j++) {
        calcite.dom.addEvent(children[j], calcite.dom.event(), toggleAccordion);
      }
    }
  } else {
    return;
  }

  function toggleAccordion (event) {
    var parent = calcite.dom.closest('accordion-section', calcite.dom.eventTarget(event));
    var children = calcite.dom.closest('accordion', parent).children;

    for (var i = 0; i < children.length; i++){
      calcite.dom.removeClass(children[i], 'is-active');
    }

    calcite.dom.addClass(parent, 'is-active');
}

};

// ┌──────────┐
// │ Dropdown │
// └──────────┘
// show and hide dropdown menus

calcite.dropdown = function () {

  var toggles = calcite.dom.nodeListToArray(document.querySelectorAll('.js-dropdown-toggle'));
  var dropdowns = calcite.dom.nodeListToArray(document.querySelectorAll('.js-dropdown'));

  if (dropdowns.length === 0) {
    return;
  }

  function closeAllDropdowns () {
    for (var i = 0; i < dropdowns.length; i++) {
      calcite.dom.removeClass(dropdowns[i].parentElement, 'is-active');
    }
  }

  function toggleDropdown (dropdown) {
    var isActive = calcite.dom.hasClass(dropdown, 'is-active');
    if (isActive) {
      calcite.dom.removeClass(dropdown, 'is-active');
    } else {
      calcite.dom.stopPropagation();
      closeAllDropdowns();
      calcite.dom.addClass(dropdown, 'is-active');
      calcite.dom.addEvent(document.body, calcite.dom.event(), function(event) {
        closeAllDropdowns();
      });
    }
  }

  function bindDropdown (toggle) {
    calcite.dom.addEvent(toggle, calcite.dom.event(), function(event) {
      calcite.dom.preventDefault(event);
      var parent = calcite.dom.eventTarget(event).parentElement;
      toggleDropdown(parent);
    });
  }

  for (var i = 0; i < toggles.length; i++) {
    bindDropdown(toggles[i]);
  }
};

// ┌────────┐
// │ Drawer │
// └────────┘
// show and hide drawers
calcite.drawer = function () {

  var toggles = calcite.dom.nodeListToArray(document.querySelectorAll('.js-drawer-toggle'));
  var drawers = calcite.dom.nodeListToArray(document.querySelectorAll('.js-drawer'));

  if (drawers.length === 0) {
    return;
  }

  function closeAllDrawers () {
    for (var i = 0; i < drawers.length; i++) {
      calcite.dom.removeClass(drawers[i], 'is-active');
    }
  }

  function toggleDrawer (drawer) {
    var isActive = calcite.dom.hasClass(drawer, 'is-active');
    if (isActive) {
      calcite.dom.removeClass(drawer, 'is-active');
    } else {
      closeAllDrawers();
      calcite.dom.addClass(drawer, 'is-active');
    }
  }

  function bindToggle (toggle) {
    calcite.dom.addEvent(toggle, calcite.dom.event(), function(event) {
      calcite.dom.preventDefault(event);
      var target = calcite.dom.getAttr(toggle, 'data-drawer');
      for (var i = 0; i < drawers.length; i++) {
        var drawer = drawers[i];
        var isTarget = calcite.dom.getAttr(drawers[i], 'data-drawer');
        if (target == isTarget) {
         toggleDrawer(drawer);
        }
      }
    });
  }

  function bindDrawer (drawer) {
    calcite.dom.addEvent(drawer, calcite.dom.event(), function(event) {
      calcite.dom.preventDefault(event);
      toggleDrawer(drawer);
    });
  }

  for (var i = 0; i < toggles.length; i++) {
    bindToggle(toggles[i]);
  }
  for (var j = 0; j < drawers.length; j++) {
    bindDrawer(drawers[j]);
  }
};

// ┌───────────────┐
// │ Expanding Nav │
// └───────────────┘
// show and hide exanding nav located under topnav
calcite.expandingNav = function () {
  var toggles = calcite.dom.nodeListToArray(document.querySelectorAll('.js-expanding-toggle'));
  var expanders = calcite.dom.nodeListToArray(document.querySelectorAll('.js-expanding'));

  if (expanders.length === 0) {
    return;
  }

  function closeAllExpanders () {
    for (var i = 0; i < expanders.length; i++) {
      calcite.dom.removeClass(expanders[i], 'is-active');
    }
  }

  function toggleExpander (expander) {
    var isActive = calcite.dom.hasClass(expander, 'is-active');
    if (isActive) {
      calcite.dom.removeClass(expander, 'is-active');
    } else {
      closeAllExpanders();
      calcite.dom.addClass(expander, 'is-active');
    }
  }

  function bindToggle (toggle) {
    calcite.dom.addEvent(toggle, calcite.dom.event(), function(event) {
      calcite.dom.preventDefault(event);
      var target = calcite.dom.getAttr(toggle, 'data-expanding-nav');
      for (var i = 0; i < expanders.length; i++) {
        var expander = expanders[i];
        var isTarget = calcite.dom.getAttr(expanders[i], 'data-expanding-nav');
        if (target == isTarget) {
         toggleExpander(expander);
        }
      }
    });
  }

  for (var i = 0; i < toggles.length; i++) {
    bindToggle(toggles[i]);
  }
};

// ┌───────┐
// │ Modal │
// └───────┘
// show and hide modal dialogues

calcite.modal = function () {

  var toggles = calcite.dom.nodeListToArray(document.querySelectorAll('.js-modal-toggle'));
  var modals = calcite.dom.nodeListToArray(document.querySelectorAll('.js-modal'));

  if (modals.length === 0) {
    return;
  }

  function closeAllModals () {
    for (var i = 0; i < modals.length; i++) {
      calcite.dom.removeClass(modals[i], 'is-active');
    }
  }

  function toggleModal (modal) {
    var isActive = calcite.dom.hasClass(modal, 'is-active');
    if (isActive) {
      calcite.dom.removeClass(modal, 'is-active');
    } else {
      closeAllModals();
      calcite.dom.addClass(modal, 'is-active');
    }
  }

  function bindToggle (toggle) {
    calcite.dom.addEvent(toggle, calcite.dom.event(), function(event) {
      calcite.dom.preventDefault(event);
      var target = calcite.dom.getAttr(toggle, 'data-modal');
      for (var i = 0; i < modals.length; i++) {
        var modal = modals[i];
        var isTarget = calcite.dom.getAttr(modals[i], 'data-modal');
        if (target == isTarget) {
         toggleModal(modal);
        }
      }
    });
  }

  function bindModal (modal) {
    calcite.dom.addEvent(modal, calcite.dom.event(), function(event) {
      calcite.dom.preventDefault(event);
      toggleModal(modal);
    });
  }

  for (var i = 0; i < toggles.length; i++) {
    bindToggle(toggles[i]);
  }
  for (var j = 0; j < modals.length; j++) {
    bindModal(modals[j]);
  }
};


// ┌──────┐
// │ TABS │
// └──────┘
// tabbed content pane

calcite.tabs = function () {
  var tabs = document.querySelectorAll('.js-tab');
  if (tabs.length > 0) {
    // variables to be used in loops
    var i, j, k, tab, group, tabsInGroup, percent;
    var tabGroups = document.querySelectorAll('.js-tab-group');

    // Attach the switchTab event to all tabs
    for (i = 0; i < tabs.length; i++) {
      tab = tabs[i];
      calcite.dom.addEvent(tab, calcite.dom.event(), switchTab);
    }

    for (j = 0; j < tabGroups.length; j++) {
      group = tabGroups[j];
      tabsInGroup = group.querySelectorAll('.js-tab');
      percent = 100 / tabsInGroup.length;

      for (k = 0; k < tabsInGroup.length; k++){
        tabsInGroup[k].style.maxWidth = percent + "%";
      }
    }
  }

  function switchTab (event) {
    calcite.dom.preventDefault(event);

    var tab;
    var target = calcite.dom.eventTarget(event);
    if (calcite.dom.hasClass(target, 'js-tab')) {
      tab = target;
    } else {
      tab = calcite.dom.closest('js-tab', target);
    }
    var tabs = calcite.dom.closest('tab-nav', tab).querySelectorAll('.js-tab');
    var index = calcite.arr.indexOf(tab, tabs);
    var contents = calcite.dom.closest('js-tab-group', tab).querySelectorAll('.js-tab-section');

    for (var i = 0; i < tabs.length; i++){
      calcite.dom.removeClass(tabs[i], 'is-active');
      calcite.dom.removeClass(contents[i], 'is-active');
    }

    calcite.dom.addClass(tab, 'is-active');
    calcite.dom.addClass(contents[index], 'is-active');
  }
};

// ┌────────────────────┐
// │ Scroll Visibillity │
// └────────────────────┘
// Hide or show elements based on scroll position

calcite.scrollVisibillity = function () {
  var shows = calcite.dom.nodeListToArray(document.querySelectorAll('.js-show'));

  if (shows.length === 0) {
    return;
  }

  var showItems = {};

  for (var j = 0; j < shows.length; j++) {
    var top = shows[j].offsetTop;
    if (shows[j].dataset.top) {
      top = top - parseInt(shows[j].dataset.top, 0);
    }
    showItems[j] = {
      visible: false,
      top: top
    };
  }

  function handleShow(index, offset) {
    var item = showItems[index];
    var elem = shows[index];
    var distance = item.top - offset;
    var isVisible = item.visible;

    if (distance < 1 && !isVisible) {
      calcite.dom.removeClass(elem, 'hide');
      calcite.dom.addClass(elem, 'show');
      item.visible = true;
    } else if (distance > 1 && !isVisible) {
      calcite.dom.addClass(elem, 'hide');
      calcite.dom.removeClass(elem, 'show');
      item.visible = false;
    } else if (isVisible && offset < item.top){
      calcite.dom.addClass(elem, 'hide');
      calcite.dom.removeClass(elem, 'show');
      item.visible = false;
    }
  }

  if (window.addEventListener) {
    window.addEventListener("scroll", function(evt) {
      var offset = window.pageYOffset;
      for (var j = 0; j < shows.length; j++) {
        handleShow(j, offset);
      }
    });
  }
  if (window.attachEvent) {
    window.attachEvent(on + "scroll", function(evt) {
      var offset = window.pageYOffset;
      for (var j = 0; j < shows.length; j++) {
        handleShow(j, offset);
      }
    });
  }
};

// ┌────────┐
// │ STICKY │
// └────────┘
// Sticks things to the window

calcite.sticky = function () {
  var stickies = calcite.dom.nodeListToArray(document.querySelectorAll('.js-sticky'));

  if (stickies === 0) {
    return;
  }

  var stickyItems = {};

  for (var i = 0; i < stickies.length; i++) {
    var top = stickies[i].offsetTop;
    if (stickies[i].dataset.top) {
      top = top - parseInt(stickies[i].dataset.top, 0);
    }
    stickyItems[i] = {
      active: false,
      top: top,
      shim: stickies[i].cloneNode('deep')
    };

  }

  function handleScroll(index, offset) {
    var item = stickyItems[index];
    var elem = stickies[index];
    var parent = elem.parentNode;
    var distance = item.top - offset;

    if (distance < 1 && !item.active) {
      item.shim.style.visibility = 'hidden';
      parent.insertBefore(item.shim, elem);
      calcite.dom.addClass(elem, 'is-sticky');
      item.active = true;
      elem.style.top = elem.dataset.top + 'px';
    } else if (item.active && offset < item.top){
      parent.removeChild(item.shim);
      calcite.dom.removeClass(elem, 'is-sticky');
      elem.style.top = null;
      item.active = false;
    }
  }

  if (window.addEventListener) {
    window.addEventListener("scroll", function(evt) {
      var offset = window.pageYOffset;
      for (var i = 0; i < stickies.length; i++) {
        handleScroll(i, offset);
      }
    });
  }
  if (window.attachEvent) {
    window.attachEvent(on + "scroll", function(evt) {
      var offset = window.pageYOffset;
      for (var i = 0; i < stickies.length; i++) {
        handleScroll(i, offset);
      }
    });
  }

};

// ┌────────────────────┐
// │ Initialize Calcite │
// └────────────────────┘
// start up Calcite and attach all the patterns
// optionally pass an array of patterns you'd like to watch

calcite.init = function (patterns) {
  if (patterns) {
    for (var i = 0; i < patterns.length; i++) {
      calcite[patterns[i]]();
    }
  } else {
    calcite.modal();
    calcite.dropdown();
    calcite.drawer();
    calcite.expandingNav();
    calcite.tabs();
    calcite.accordion();
    calcite.sticky();
    calcite.scrollVisibillity();
  }

  // add a touch class to the body
  if ( calcite.browser.isTouch() ) {
    calcite.dom.addClass(document.body, 'calcite-touch');
  }
};

// ┌───────────────────┐
// │ Expose Calcite.js │
// └───────────────────┘
// implementation borrowed from Leaflet

// define calcite as a global variable, saving the original to restore later if needed
function expose () {
  var oldCalcite = window.calcite;

  calcite.noConflict = function () {
    window.calcite = oldCalcite;
    return this;
  };

  window.calcite = calcite;
}

// No NPM/AMD for now because it just causes issues
// @TODO: bust them into AMD & NPM distros

// // define Calcite for CommonJS module pattern loaders (NPM, Browserify)
// if (typeof module === 'object' && typeof module.exports === 'object') {
//   module.exports = calcite;
// }

// // define Calcite as an AMD module
// else if (typeof define === 'function' && define.amd) {
//   define(calcite);
// }

expose();

})();
