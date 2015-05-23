(function Calcite () {

  // ┌────────────┐
  // │ Public API │
  // └────────────┘
  // define all public api methods (excluding patterns)
  var calcite = {
    version: 'v0.2.2',
    event: event,
    addEvent: addEvent,
    removeEvent: removeEvent,
    eventTarget: eventTarget,
    preventDefault: preventDefault,
    stopPropagation: stopPropagation,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    closest: closest,
    getAttr: getAttr,
    nodeListToArray: nodeListToArray,
    patterns: {},
    init: init
  };

  // ┌──────────────────────┐
  // │ DOM Event Management │
  // └──────────────────────┘

  // returns standard interaction event, later will add touch support
  function event () {
    return 'click';
  }

  // add a callback function to an event on a DOM node
  function addEvent (domNode, event, fn) {
    if (domNode.addEventListener) {
      return domNode.addEventListener(event, fn, false);
    } else if (domNode.attachEvent) {
      return domNode.attachEvent('on' + event, fn);
    }
  }

  // remove a specific function binding from a DOM node event
  function removeEvent (domNode, event, fn) {
    if (domNode.removeEventListener) {
      return domNode.removeEventListener(event, fn, false);
    } else if (domNode.detachEvent) {
      return domNode.detachEvent('on' + event,  fn);
    }
  }

  // get the target element of an event
  function eventTarget (event) {
    return event.target || event.srcElement;
  }

  // prevent default behavior of an event
  function preventDefault (event) {
    if (event.preventDefault) {
      return event.preventDefault();
    } else if (event.returnValue) {
      event.returnValue = false;
    }
  }

  // stop and event from bubbling up the DOM tree
  function stopPropagation (event) {
    event = event || window.event;
    if (event.stopPropagation) {
      return event.stopPropagation();
    }
    if (event.cancelBubble) {
      event.cancelBubble = true;
    }
  }

  // ┌────────────────────┐
  // │ Class Manipulation │
  // └────────────────────┘

  // check if an element has a specific class
  function hasClass (domNode, className) {
    var elementClass = ' ' + domNode.className + ' ';
    return elementClass.indexOf(' ' + className + ' ') !== -1;
  }

  // add one or more classes to an element
  function addClass (domNode, classes) {
    classes.split(' ').forEach(function (c) {
      if (!hasClass(domNode, c)) {
        domNode.className += ' ' + c;
      }
    });
  }

  // remove one or more classes from an element
  function removeClass (domNode, classes) {
    var elementClass = ' ' + domNode.className + ' ';
    classes.split(' ').forEach(function (c) {
      elementClass = elementClass.replace(' ' + c + ' ', ' ');
    });
    domNode.className = elementClass.trim();
  }

  // if domNode has the class, remove it, else add it
  function toggleClass (domNode, className) {
    if (hasClass(domNode, className)) {
      removeClass(domNode, className);
    } else {
      addClass(domNode, className);
    }
  }

  // ┌─────┐
  // │ DOM │
  // └─────┘

  // returns closest element up the DOM tree matching a given class
  function closest (className, context) {
    var result, current;
    for (current = context; current; current = current.parentNode) {
      if (current.nodeType === 1 && hasClass(current, className)) {
        result = current;
        break;
      }
    }
    return current;
  }

  // get an attribute for an element
  function getAttr (domNode, attr) {
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
  }

  // turn a domNodeList into an array
  function nodeListToArray (domNodeList) {
    var array = [];
    for (var i = 0; i < domNodeList.length; i++) {
      array.push(domNodeList[i]);
    }
    return array;
  }

  // ┌─────────────┐
  // │ JS Patterns │
  // └─────────────┘
  // helper functions for ui patterns

  // return an array of elements matching a query
  function findElements (query) {
    var elements = document.querySelectorAll(query);
    return nodeListToArray(elements);
  }

  // remove 'is-active' class from every element in an array
  function removeActive (array) {
    if (typeof array == 'object') {
      array = nodeListToArray(array);
    }
    array.forEach(function (item) {
      removeClass(item, 'is-active');
    });
  }

  // remove 'is-active' from array, add to element
  function toggleActive (array, el) {
    var isActive = hasClass(el, 'is-active');
    if (isActive) {
      removeClass(el, 'is-active');
    } else {
      removeActive(array);
      addClass(el, 'is-active');
    }
  }

  // ┌───────────┐
  // │ Accordion │
  // └───────────┘
  // collapsible accordion list
  calcite.patterns.accordion = function () {
    findElements('.js-accordion').forEach(function (accordion) {
      nodeListToArray(accordion.children).forEach(function (child) {
        addEvent(child, event(), toggleAccordion);
      });
    });

    function toggleAccordion (event) {
      var parent = closest('accordion-section', eventTarget(event));
      toggleClass(parent, 'is-active');
    }
  };

  // ┌──────────┐
  // │ Dropdown │
  // └──────────┘
  // show and hide dropdown menus
  calcite.patterns.dropdown = function () {
    var toggles = findElements('.js-dropdown-toggle');
    var dropdowns = findElements('.js-dropdown');

    function closeAllDropdowns () {
      removeEvent(document.body, event(), closeAllDropdowns);
      dropdowns.forEach(function (dropdown) {
        removeClass(dropdown, 'is-active');
      });
    }

    function bindToggle (toggle) {
      addEvent(toggle, event(), function (event) {
        preventDefault(event);
        stopPropagation(event);
        var dropdown = closest('js-dropdown', toggle);
        closeAllDropdowns();
        addClass(dropdown, 'is-active');
        addEvent(document.body, event(), closeAllDropdowns);
      });
    }

    toggles.forEach(bindToggle);
  };

  // ┌────────┐
  // │ Drawer │
  // └────────┘
  // show and hide drawers
  calcite.patterns.drawer = function () {
    var toggles = findElements('.js-drawer-toggle');
    var drawers = findElements('.js-drawer');

    toggles.forEach(function (toggle) {
      addEvent(toggle, event(), function (event) {
        preventDefault(event);
        var drawerId = getAttr(toggle, 'data-drawer');
        var drawer = document.querySelector('.js-drawer[data-drawer="' + drawerId + '"');
        toggleActive(drawers, drawer);
      });
    });

    drawers.forEach(function (drawer) {
      addEvent(drawer, event(), function (event) {
        if (hasClass(event.target, 'drawer')) {
          toggleActive(drawers, drawer);
        }
      });
    });
  };

  // ┌───────────────┐
  // │ Expanding Nav │
  // └───────────────┘
  // show and hide exanding nav located under topnav
  calcite.patterns.expandingNav = function () {
    var toggles = findElements('.js-expanding-toggle');
    var expanders = findElements('.js-expanding');
    var sections = document.querySelectorAll('.js-expanding-nav');

    toggles.forEach(function (toggle) {
      addEvent(toggle, event(), function (event) {
        preventDefault(event);

        var sectionId = getAttr(toggle, 'data-expanding-nav');
        var section = document.querySelector('.js-expanding-nav[data-expanding-nav="' + sectionId + '"]');
        var expander = closest('js-expanding', section);
        var isOpen = hasClass(expander, 'is-active');
        var shouldClose = hasClass(section, 'is-active');

        toggleActive(sections, section);

        if (isOpen && shouldClose) {
          removeClass(expander, 'is-active');
        } else {
          addClass(expander, 'is-active');
        }
      });
    });
  };

  // ┌───────┐
  // │ Modal │
  // └───────┘
  // show and hide modal dialogues
  calcite.patterns.modal = function () {
    var toggles = findElements('.js-modal-toggle');
    var modals = findElements('.js-modal');

    toggles.forEach(function (toggle) {
      addEvent(toggle, event(), function(event) {
        preventDefault(event);
        var modal;
        var modalId = getAttr(toggle, 'data-modal');
        if (modalId) {
          modal = document.querySelector('.js-modal[data-modal="' + modalId + '"');
        } else {
          modal = closest('js-modal', toggle);
        }
        toggleActive(modals, modal);
      });
    });

    modals.forEach(function (modal) {
      addEvent(modal, event(), function(event) {
        stopPropagation(event);
        if (eventTarget(event) === modal) {
          toggleActive(modals, modal);
        }
      });
    });
  };

  // ┌──────┐
  // │ Tabs │
  // └──────┘
  // tabbed content pane
  calcite.patterns.tabs = function () {
    var tabs = findElements('.js-tab');
    var tabGroups = findElements('.js-tab-group');

    // set max width for each tab
    tabGroups.forEach(function (tab) {
      var tabsInGroup = tab.querySelectorAll('.js-tab');
      var percent = 100 / tabsInGroup.length;
      for (var i = 0; i < tabsInGroup.length; i++) {
        tabsInGroup[i].style.maxWidth = percent + '%';
      }
    });

    function switchTab (event) {
      preventDefault(event);

      var tab = closest('js-tab', eventTarget(event));
      var tabGroup = closest('js-tab-group', tab);
      var tabs = tabGroup.querySelectorAll('.js-tab');
      var contents = tabGroup.querySelectorAll('.js-tab-section');
      var index = nodeListToArray(tabs).indexOf(tab);

      removeActive(tabs);
      removeActive(contents);

      addClass(tab, 'is-active');
      addClass(contents[index], 'is-active');
    }

    tabs.forEach(function (tab) {
      addEvent(tab, event(), switchTab);
    });
  };

  // ┌────────┐
  // │ Sticky │
  // └────────┘
  // sticks things to the window
  calcite.patterns.sticky = function () {
    var elements = findElements('.js-sticky');
    var stickies = elements.map(function (el) {
      var offset = el.offsetTop;
      var dataTop = getAttr(el, 'data-top') || 0;
      return {
        active: false,
        top: offset - parseInt(dataTop, 0),
        shim: el.cloneNode('deep'),
        element: el
      };
    });

    function handleScroll(item, offset) {
      var el = item.element;
      var parent = el.parentNode;
      var distance = item.top - offset;
      var dataTop = getAttr(el, 'data-top');

      if (distance < 1 && !item.active) {
        item.shim.style.visiblity = 'hidden';
        parent.insertBefore(item.shim, el);
        addClass(el, 'is-sticky');
        item.active = true;
        el.style.top = dataTop + 'px';
      } else if (item.active && offset < item.top) {
        parent.removeChild(item.shim);
        removeClass(el, 'is-sticky');
        el.style.top = null;
        item.active = false;
      }
    }

    addEvent(window, 'scroll', function () {
      var offset = window.pageYOffset;
      stickies.forEach(function (sticky) {
        handleScroll(sticky, offset);
      });
    });

  };

  // ┌────────────────────┐
  // │ Initialize Calcite │
  // └────────────────────┘
  // start up Calcite and attach all the patterns
  // optionally pass an array of patterns you'd like to watch

  function init (patterns) {
    patterns = patterns || Object.keys(calcite.patterns);
    patterns.forEach(function (pattern) {
      calcite.patterns[pattern]();
    });
  }

  // ┌────────────────┐
  // │ Expose Calcite │
  // └────────────────┘

  if (typeof define === 'function' && define.amd) {
    define(function () { return calcite; });
  } else if (typeof exports === 'object') {
    module.exports = calcite;
  } else {
    window.calcite = calcite;
  }

})();
