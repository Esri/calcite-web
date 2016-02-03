import classy from '../helpers/classy'
import dom from '../helpers/dom'
import event from '../helpers/event'


// ┌──────────┐
// │ Dropdown │
// └──────────┘
// show and hide dropdown menus
function dropdown () {
  var toggles = dom.findElements('.js-dropdown-toggle');
  var dropdowns = dom.findElements('.js-dropdown');

  function closeAllDropdowns () {
    event.remove(document.body, click(), closeAllDropdowns);
    dropdowns.forEach(function (dropdown) {
      classy.remove(dropdown, 'is-active');
    });
  }

  function bindToggle (toggle) {
    event.add(toggle, event.click(), function (e) {
      preventDefault(e);
      stopPropagation(e);
      var dropdown = dom.closest('js-dropdown', toggle);
      var isOpen = classy.has(dropdown, 'is-active');
      closeAllDropdowns();
      if (!isOpen) {
        classy.add(dropdown, 'is-active');
      }
      event.add(document.body, event.click(), closeAllDropdowns);
    });
  }

  toggles.forEach(bindToggle);
};

export default dropdown