// Cool Helpers
import * as dom from '../helpers/dom';
import * as classy from '../helpers/classy';
import * as aria from '../helpers/aria';
import * as event from '../helpers/event';

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

function accordion () {
  var accordions = dom.findElements('.js-accordion');
  bus.on('accordion:bind', bindAccordions);
  bus.on('accordion:toggle', handleToggle);

  function bindAccordions (options) {
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
      sectionTitle.setAttribute('role', 'tab');
      sectionTitle.setAttribute('tabindex', '0');
      if (classy.has(section, 'is-active')) {
        section.setAttribute('aria-expanded', 'true');
      }
      event.add(sectionTitle, event.click(), toggleClick);
      event.add(section, 'keyup', function (e) {
        if (e.keyCode === 13) {
          toggleClick(e);
        }
      });
    });
  }

  function toggleClick (e) {
    event.stopPropagation(e);
    var parent = dom.closest('accordion-section', event.target(e));
    bus.emit('accordion:toggle', {node: parent});
  }

  function handleToggle (options) {
    classy.toggle(options.node, 'is-active');
    aria.toggleExpanded(options.node);
  }

  bus.emit('accordion:bind');
}

export default accordion;
