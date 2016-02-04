// Cool Helpers
import * as dom from '../helpers/dom'
import * as classy from '../helpers/classy'
import * as aria from '../helpers/aria'
import * as event from '../helpers/event'

// ┌───────────┐
// │ Accordion │
// └───────────┘
// collapsible accordion list
function accordion () {
  dom.findElements('.js-accordion').forEach(function (accordion) {
    accordion.setAttribute('aria-live', 'polite');
    accordion.setAttribute('role', 'tablist');
    dom.nodeListToArray(accordion.children).forEach(function (child) {
      var firstChild = child.children[0];
      firstChild.setAttribute('role', 'tab');
      firstChild.setAttribute('tabindex', '0');
      if (classy.has(child, 'is-active')) {
        child.setAttribute('aria-expanded', 'true');
      } else {
        child.setAttribute('aria-expanded', 'false');
      }
      var sectionTitle = child.querySelector('.accordion-title');
      event.add(sectionTitle, event.click(), toggleAccordion);
      event.add(child, 'keyup', function(e) {
        if (e.keyCode === 13) {
          toggleAccordion(e);
        }
      });
    });
  });

  function toggleAccordion (e) {
    var parent = dom.closest('accordion-section', event.target(e));
    classy.toggle(parent, 'is-active');
    aria.toggleExpanded(parent);
  }
};

export default accordion
