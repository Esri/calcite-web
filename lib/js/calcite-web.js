(function Calcite () {

  // ┌────────────┐
  // │ Public API │
  // └────────────┘
  // define all public api methods (excluding patterns)
  var calcite = {
    version: 'v0.5.0',
    click: click,
    addEvent: addEvent,
    removeEvent: removeEvent,
    eventTarget: eventTarget,
    preventDefault: preventDefault,
    stopPropagation: stopPropagation,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    closest: closest,
    nodeListToArray: nodeListToArray,
    init: init
  };

  // ┌──────────────────────┐
  // │ DOM Event Management │
  // └──────────────────────┘

  // returns standard interaction event, later will add touch support
  function click () {
    return 'click';
  }

  // add a callback function to an event on a DOM node
  function addEvent (domNode, e, fn) {
    if (domNode.addEventListener) {
      return domNode.addEventListener(e, fn, false);
    } else if (domNode.attachEvent) {
      return domNode.attachEvent('on' + e, fn);
    }
  }

  // remove a specific function binding from a DOM node event
  function removeEvent (domNode, e, fn) {
    if (domNode.removeEventListener) {
      return domNode.removeEventListener(e, fn, false);
    } else if (domNode.detachEvent) {
      return domNode.detachEvent('on' + e,  fn);
    }
  }

  // get the target element of an event
  function eventTarget (e) {
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

  // turn a domNodeList into an array
  function nodeListToArray (domNodeList) {
    return Array.prototype.slice.call(domNodeList);
  }

  // ┌─────────────┐
  // │ JS Patterns │
  // └─────────────┘
  // helper functions for ui patterns

  // return an array of elements matching a query
  function findElements (query, domNode) {
    var context = domNode || document;
    var elements = context.querySelectorAll(query);
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
  calcite.accordion = function (domNode) {
    findElements('.js-accordion', domNode).forEach(function (accordion) {
      nodeListToArray(accordion.children).forEach(function (child) {
        addEvent(child, click(), toggleAccordion);
      });
    });

    function toggleAccordion (e) {
      var parent = closest('accordion-section', eventTarget(e));
      toggleClass(parent, 'is-active');
    }
  };

  // ┌──────────┐
  // │ Dropdown │
  // └──────────┘
  // show and hide dropdown menus
  calcite.dropdown = function (domNode) {
    var toggles = findElements('.js-dropdown-toggle', domNode);
    var dropdowns = findElements('.js-dropdown', domNode);

    function closeAllDropdowns () {
      removeEvent(document.body, click(), closeAllDropdowns);
      dropdowns.forEach(function (dropdown) {
        removeClass(dropdown, 'is-active');
      });
    }

    function bindToggle (toggle) {
      addEvent(toggle, click(), function (e) {
        preventDefault(e);
        stopPropagation(e);
        var dropdown = closest('js-dropdown', toggle);
        closeAllDropdowns();
        addClass(dropdown, 'is-active');
        addEvent(document.body, click(), closeAllDropdowns);
      });
    }

    toggles.forEach(bindToggle);
  };

  // ┌────────┐
  // │ Drawer │
  // └────────┘
  // show and hide drawers
  calcite.drawer = function (domNode) {
    var toggles = findElements('.js-drawer-toggle', domNode);
    var drawers = findElements('.js-drawer', domNode);

    toggles.forEach(function (toggle) {
      addEvent(toggle, click(), function (e) {
        preventDefault(e);
        var drawerId = toggle.getAttribute('data-drawer');
        var drawer = document.querySelector('.js-drawer[data-drawer="' + drawerId + '"');
        toggleActive(drawers, drawer);
      });
    });

    drawers.forEach(function (drawer) {
      addEvent(drawer, click(), function (e) {
        if (hasClass(eventTarget(e), 'drawer')) {
          toggleActive(drawers, drawer);
        }
      });
    });
  };

  // ┌───────────────┐
  // │ Expanding Nav │
  // └───────────────┘
  // show and hide exanding nav located under topnav
  calcite.expandingNav = function (domNode) {
    var toggles = findElements('.js-expanding-toggle', domNode);
    var expanders = findElements('.js-expanding', domNode);
    var sections = document.querySelectorAll('.js-expanding-nav');

    toggles.forEach(function (toggle) {
      addEvent(toggle, click(), function (e) {
        preventDefault(e);

        var sectionId = toggle.getAttribute('data-expanding-nav');
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
  calcite.modal = function (domNode) {
    var toggles = findElements('.js-modal-toggle', domNode);
    var modals = findElements('.js-modal', domNode);

    toggles.forEach(function (toggle) {
      addEvent(toggle, click(), function (e) {
        preventDefault(e);
        var modal;
        var modalId = toggle.getAttribute('data-modal');
        if (modalId) {
          modal = document.querySelector('.js-modal[data-modal="' + modalId + '"');
        } else {
          modal = closest('js-modal', toggle);
        }
        toggleActive(modals, modal);
      });
    });

    modals.forEach(function (modal) {
      addEvent(modal, click(), function (e) {
        stopPropagation(e);
        if (eventTarget(e) === modal) {
          toggleActive(modals, modal);
        }
      });
    });
  };

  // ┌──────┐
  // │ Tabs │
  // └──────┘
  // tabbed content pane
  calcite.tabs = function (domNode) {
    var tabs = findElements('.js-tab', domNode);
    var tabGroups = findElements('.js-tab-group', domNode);

    // set max width for each tab
    tabGroups.forEach(function (tab) {
      var tabsInGroup = tab.querySelectorAll('.js-tab');
      var percent = 100 / tabsInGroup.length;
      for (var i = 0; i < tabsInGroup.length; i++) {
        tabsInGroup[i].style.maxWidth = percent + '%';
      }
    });

    function switchTab (e) {
      preventDefault(e);

      var tab = closest('js-tab', eventTarget(e));
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
      addEvent(tab, click(), switchTab);
    });
  };

  // ┌────────┐
  // │ Sticky │
  // └────────┘
  // sticks things to the window
  calcite.sticky = function () {
    var elements = findElements('.js-sticky');
    var stickies = elements.map(function (el) {
      var offset = el.offsetTop;
      var dataTop = el.getAttribute('data-top') || 0;
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
      var dataTop = el.getAttribute('data-top');

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
    patterns = patterns || ['accordion', 'dropdown', 'drawer', 'expandingNav', 'modal', 'tabs', 'sticky'];
    patterns.forEach(function (pattern) {
      calcite[pattern]();
    });
  }

  // ┌────────────────┐
  // │ Expose Calcite │
  // └────────────────┘
  // make calcite available to amd, common-js, or globally
  if (typeof define === 'function' && define.amd) {
    define(function () { return calcite; });
  } else if (typeof exports === 'object') {
    module.exports = calcite;
  } else {
    // if something called calcite already exists,
    // save it for recovery via calcite.noConflict()
    var oldCalcite = window.calcite;
    calcite.noConflict = function () {
      window.calcite = oldCalcite;
      return this;
    };
    window.calcite = calcite;
  }

})();
