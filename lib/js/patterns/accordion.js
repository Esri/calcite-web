// Cool Helpers
import * as dom from '../helpers/dom';
import * as classy from '../helpers/classy';
import * as aria from '../helpers/aria';
import * as event from '../helpers/event';
import Guid from '../helpers/guid';

import bus from '../helpers/bus';
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
  event.stopPropagation(e);
  var parent = dom.closest('accordion-section', event.target(e));
  bus.emit('accordion:toggle', {node: parent});
}

function handleToggle (options) {
  classy.toggle(options.node, 'is-active');
  var sectionTitle = options.node.querySelector('.accordion-title');
  aria.toggleExpanded(sectionTitle);
}

function checkKeyCode (e) {
  if (e.keyCode === 13 && classy.has(event.target(e), 'accordion-title')) {
    toggleClick(e);
  }
}

function bindAccordions (options) {
  var accordions = dom.findElements('.js-accordion');
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
  dom.nodeListToArray(accordion.children).forEach(function (section) {
    var sectionTitle = section.querySelector('.accordion-title');
    var sectionContent = section.querySelector('.accordion-content');
    var id = sectionContent.id || Guid.raw();
    sectionContent.id = id;
    sectionTitle.setAttribute('role', 'tab');
    sectionTitle.setAttribute('tabindex', '0');
    sectionTitle.setAttribute('aria-controls', id);
    if (classy.has(section, 'is-active')) {
      sectionTitle.setAttribute('aria-expanded', 'true');
    }
    // check if the event was already added
    var eventExists = false;
    event.boundEvents.accordions.forEach(function (e) {
      if (e.target === sectionTitle && e.event === event.click() && e.fn === toggleClick) {
        eventExists = true;
      }
    });
    if (!eventExists) {
      event.boundEvents.accordions.push({target: sectionTitle, event: event.click(), fn: toggleClick});
      event.boundEvents.accordions.push({target: section, event: 'keyup', fn: checkKeyCode});
      event.add(sectionTitle, event.click(), toggleClick);
      event.add(section, 'keyup', checkKeyCode);
    }
  });
}

function addListeners () {
  bus.on('accordion:bind', bindAccordions);
  bus.on('accordion:toggle', handleToggle);
  listenersAdded = true;
}

var listenersAdded = false;

export default function accordion () {
  // only add the listeners if they haven't been added already
  if (!listenersAdded) {
    addListeners();
  }
  bus.emit('accordion:bind');
}
