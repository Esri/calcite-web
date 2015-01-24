(function Calcite () {

var calcite = {
  version: '0.0.6'
};

// ┌───────────────┐
// │ DOM Utilities │
// └───────────────┘

calcite.dom = {};

// ┌──────────────────────┐
// │ DOM Event Management │
// └──────────────────────┘

// returns standard interaction event, later will add touch support
calcite.dom.event = function () {
  return 'click';
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
// │ Class Manipulation │
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
// │ DOM Traversal │
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
// │ Object Conversion │
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
// │ Array Manipulation │
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
// │ Browser Feature Detection │
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

function findElements (className) {
  var elements = document.querySelectorAll(className);
  if (elements.length) {
    return calcite.dom.nodeListToArray(elements);
  } else {
    return false;
  }
}

// remove 'is-active' class from every element in an array
function removeActive (array) {
  if (typeof array == 'object') {
    array = calcite.dom.nodeListToArray(array);
  }
  array.forEach(function (item) {
    calcite.dom.removeClass(item, 'is-active');
  });
}

// remove 'is-active' from array, add to element
function toggleActive (array, el) {
  var isActive = calcite.dom.hasClass(el, 'is-active');
  if (isActive) {
    calcite.dom.removeClass(el, 'is-active');
  } else {
    removeActive(array);
    calcite.dom.addClass(el, 'is-active');
  }
}

// ┌───────────┐
// │ Accordion │
// └───────────┘
// collapsible accordion list

calcite.accordion = function () {
  var accordions = findElements('.js-accordion');

  if (!accordions) {
    return;
  }

  for (var i = 0; i < accordions.length; i++) {
    var children = accordions[i].children;
    for (var j = 0; j < children.length; j++) {
      calcite.dom.addEvent(children[j], calcite.dom.event(), toggleAccordion);
    }
  }

  function toggleAccordion (event) {
    var parent = calcite.dom.closest('accordion-section', calcite.dom.eventTarget(event));
    if (calcite.dom.hasClass(parent, 'is-active')) {
      calcite.dom.removeClass(parent, 'is-active');
    } else {
      calcite.dom.addClass(parent, 'is-active');
    }
  }

};

// ┌──────────┐
// │ Carousel │
// └──────────┘
// show carousel with any number of slides

calcite.carousel = function () {

  var carousels = findElements('.js-carousel');

  if (!carousels) {
    return;
  }

  for (var i = 0; i < carousels.length; i++) {

    var carousel = carousels[i];
    var wrapper = carousel.querySelectorAll('.carousel-slides')[0];
    var slides = carousel.querySelectorAll('.carousel-slide');
    var toggles = calcite.dom.nodeListToArray(carousel.querySelectorAll('.js-carousel-link'));

    wrapper.style.width = slides.length * 100 + '%';

    calcite.dom.addClass(slides[0], 'is-active');
    calcite.dom.addClass(carousel, 'is-first-slide');

    for (var k = 0; k < slides.length; k++) {
      slides[k].style.width = 100 / slides.length + '%';
    }

    for (var j = 0; j < toggles.length; j++) {
      calcite.dom.addEvent(toggles[j], calcite.dom.event(), toggleSlide);
    }

  }

  function toggleSlide (e) {
    calcite.dom.preventDefault(e);
    var link = calcite.dom.eventTarget(e);
    var index = calcite.dom.getAttr(link, 'data-slide');
    var carousel = calcite.dom.closest('carousel', link);
    var current = carousel.querySelectorAll('.carousel-slide.is-active')[0];
    var slides = carousel.querySelectorAll('.carousel-slide');
    var wrapper = carousel.querySelectorAll('.carousel-slides')[0];

    if (index == 'prev') {
      index = calcite.arr.indexOf(current, slides);
      if (index === 0) { index = 1; }
    } else if (index == 'next') {
      index = calcite.arr.indexOf(current, slides) + 2;
      if (index > slides.length) { index = slides.length; }
    }

    calcite.dom.removeClass(carousel, 'is-first-slide is-last-slide');

    if (index == slides.length) { calcite.dom.addClass(carousel, 'is-last-slide'); }
    if (index == 1) { calcite.dom.addClass(carousel, 'is-first-slide'); }

    removeActive(slides);
    calcite.dom.addClass(slides[index - 1], 'is-active');
    var offset = (index - 1)/slides.length * -100 + '%';
    wrapper.style.transform= 'translate3d(' + offset + ',0,0)';
  }

};

// ┌──────────┐
// │ Dropdown │
// └──────────┘
// show and hide dropdown menus

calcite.dropdown = function () {

  var toggles = findElements('.js-dropdown-toggle');
  var dropdowns = findElements('.js-dropdown');

  if (!dropdowns) {
    return;
  }

  function closeAllDropdowns () {
    for (var i = 0; i < dropdowns.length; i++) {
      calcite.dom.removeClass(dropdowns[i], 'is-active');
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
      var dropdown = calcite.dom.closest('js-dropdown', toggle);
      toggleDropdown(dropdown);
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

  var toggles = findElements('.js-drawer-toggle');
  var drawers = findElements('.js-drawer');

  if (!drawers) {
    return;
  }

  function bindToggle (toggle) {
    calcite.dom.addEvent(toggle, calcite.dom.event(), function(event) {
      calcite.dom.preventDefault(event);
      var target = calcite.dom.getAttr(toggle, 'data-drawer');
      for (var i = 0; i < drawers.length; i++) {
        var drawer = drawers[i];
        var isTarget = calcite.dom.getAttr(drawers[i], 'data-drawer');
        if (target == isTarget) {
         toggleActive(drawers, drawer);
        }
      }
    });
  }

  function bindDrawer (drawer) {
    calcite.dom.addEvent(drawer, calcite.dom.event(), function(event) {
      calcite.dom.preventDefault(event);
      toggleActive(drawers, drawer);
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
  var toggles = findElements('.js-expanding-toggle');
  var expanders = findElements('.js-expanding');

  if (!expanders) {
    return;
  }

  function bindToggle (toggle) {
    calcite.dom.addEvent(toggle, calcite.dom.event(), function(event) {
      calcite.dom.preventDefault(event);

      var sectionName = calcite.dom.getAttr(toggle, 'data-expanding-nav');
      var sections = document.querySelectorAll('.js-expanding-nav');
      var section = document.querySelectorAll('.js-expanding-nav[data-expanding-nav="' + sectionName + '"]')[0];
      var expander = calcite.dom.closest('js-expanding', section);
      var isOpen = calcite.dom.hasClass(expander, 'is-active');
      var shouldClose = calcite.dom.hasClass(section, 'is-active');

      if (isOpen) {
        if (shouldClose) {
          calcite.dom.removeClass(expander, 'is-active');
        }
        toggleActive(sections, section);
      } else {
        toggleActive(sections, section);
        calcite.dom.addClass(expander, 'is-active');
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

  var toggles = findElements('.js-modal-toggle');
  var modals = findElements('.js-modal');

  if (!modals) {
    return;
  }

  function bindToggle (toggle) {
    calcite.dom.addEvent(toggle, calcite.dom.event(), function(event) {
      calcite.dom.preventDefault(event);
      var target = calcite.dom.getAttr(toggle, 'data-modal');
      for (var i = 0; i < modals.length; i++) {
        var modal = modals[i];
        var isTarget = calcite.dom.getAttr(modals[i], 'data-modal');
        if (target == isTarget) {
         toggleActive(modals, modal);
        }
      }
    });
  }

  function bindModal (modal) {
    calcite.dom.addEvent(modal, calcite.dom.event(), function(event) {
      calcite.dom.preventDefault(event);
      toggleActive(modals, modal);
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
// │ Tabs │
// └──────┘
// tabbed content pane

calcite.tabs = function () {
  var tabs = findElements('.js-tab');
  var tabGroups = findElements('.js-tab-group');

  if (!tabs) {
    return;
  }

  // set max width for each tab
  for (var j = 0; j < tabGroups.length; j++) {
    var tabsInGroup = tabGroups[j].querySelectorAll('.js-tab');
    var percent = 100 / tabsInGroup.length;
    for (var k = 0; k < tabsInGroup.length; k++){
      tabsInGroup[k].style.maxWidth = percent + '%';
    }
  }

  function switchTab (event) {
    calcite.dom.preventDefault(event);

    var tab = calcite.dom.closest('js-tab', calcite.dom.eventTarget(event));
    var tabGroup = calcite.dom.closest('js-tab-group', tab);
    var tabs = tabGroup.querySelectorAll('.js-tab');
    var contents = tabGroup.querySelectorAll('.js-tab-section');
    var index = calcite.arr.indexOf(tab, tabs);

    removeActive(tabs);
    removeActive(contents);

    calcite.dom.addClass(tab, 'is-active');
    calcite.dom.addClass(contents[index], 'is-active');
  }

  // attach the switchTab event to all tabs
  for (var i = 0; i < tabs.length; i++) {
    calcite.dom.addEvent(tabs[i], calcite.dom.event(), switchTab);
  }

};

// ┌────────┐
// │ Sticky │
// └────────┘
// sticks things to the window

calcite.sticky = function () {
  var elements = findElements('.js-sticky');

  if (!elements) {
    return;
  }

  var stickies = [];

  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var top = el.offsetTop;
    if (el.dataset.top) {
      top = top - parseInt(el.dataset.top, 0);
    }
    stickies.push({
      active: false,
      top: top,
      shim: el.cloneNode('deep'),
      element: el
    });
  }

  function handleScroll(item, offset) {
    var elem = item.element;
    var parent = elem.parentNode;
    var distance = item.top - offset;

    if (distance < 1 && !item.active) {
      item.shim.style.visiblity = 'hidden';
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

  calcite.dom.addEvent(window, 'scroll', function() {
    var offset = window.pageYOffset;
    for (var i = 0; i < stickies.length; i++) {
      handleScroll(stickies[i], offset);
    }
  });

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
    calcite.carousel();
    calcite.sticky();
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

// no NPM/AMD for now because it just causes issues
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
