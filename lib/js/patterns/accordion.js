// Cool Helpers
import * as dom from '../helpers/dom'
import * as classy from '../helpers/classy'
import * as aria from '../helpers/aria'
import * as event from '../helpers/event'

import bus from '../helpers/bus'
// ┌───────────┐
// │ Accordion │
// └───────────┘
// collapsible accordion list
// Listens to a 'accordion:bind' takes a node
// Emits and listens on the 'accordion:open' channel. Takes a node
// Emits and listens to on the 'accorion:close' channel. Takes an node
// Emitting a modal id toggle that modals state.
// Emitting false or null closes all modals.
function accordion () {
  var accordions =  dom.findElements('.js-accordion')
  bus.on('addordion:toggle', toggleClick)
  bus.on('accordion:bind', bindAccordions)

  function bindAccordions (node) {
    if (!node) {
      console.log('bind all accordions')
      accordions.forEach(function (accordion) {
        setUpAccordion(accordion)
      });
    } else {
      console.log('bind one accordion')
      setUpAccordion(node)
    }
  }

  function setUpAccordion (accordion) {
    console.log(`set up accordion ${accordion}`)
    accordion.setAttribute('aria-live', 'polite');
    accordion.setAttribute('role', 'tablist');
    dom.nodeListToArray(accordion.children).forEach(function (child) {
      // var firstChild = child.children[0];
      // firstChild.setAttribute('role', 'tab');
      // firstChild.setAttribute('tabindex', '0');
      // if (classy.has(child, 'is-active')) {
      //   child.setAttribute('aria-expanded', 'true');
      // } else {
      //   child.setAttribute('aria-expanded', 'false');
      // }

      var sectionTitle = child.querySelector('.accordion-title');
      event.add(sectionTitle, event.click(), toggleClick);
      event.add(child, 'keyup', function(e) {
        if (e.keyCode === 13) {
          toggleClick(e)
        }
      });
    });
  }

  function toggleClick (e) {
    event.stopPropagation(e)
    console.log(e)
    var parent = dom.closest('accordion-section', event.target(e));
    console.log(`toggle click on ${parent}`)
    bus.emit('addordion:toggle', parent)
  }

  bus.emit('accordion:bind')
};

export default accordion
