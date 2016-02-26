// Cool Helpers
import * as dom from '../helpers/dom';
import * as classy from '../helpers/classy';
import * as event from '../helpers/event';

// ┌───────────────────┐
// │ Expanding Section │
// └───────────────────┘
// show and hide exanding nav located under topnav
function expander () {
  var toggles = dom.findElements('.js-expand-toggle');
  var sections = document.querySelectorAll('.js-expand');

  toggles.forEach(function (toggle) {
    event.add(toggle, event.click(), function (e) {
      event.preventDefault(e);

      var sectionId = toggle.getAttribute('data-expand');
      var section = document.querySelector('.js-expand[data-expand="' + sectionId + '"]');
      var isOpen = classy.has(section, 'is-active');
      var shouldClose = classy.has(section, 'is-active');

      classy.toggleActive(sections, section);

      if (isOpen && shouldClose) {
        classy.remove(section, 'is-active');
      } else {
        classy.add(section, 'is-active');
      }
    });
  });
}

export default expander;
