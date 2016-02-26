// Cool Helpers
import * as dom from '../helpers/dom';
import * as classy from '../helpers/classy';
import * as event from '../helpers/event';

// ┌────────┐
// │ Search │
// └────────┘
// Expanding search bar that lives in the top nav.
function search () {
  var searchForms = dom.findElements('.js-site-search');

  function toggleForm (e) {
    var searchContainer = dom.closest('js-site-search', e.target);
    var isOpen = classy.has(searchContainer, 'is-active');

    if (isOpen) {
      classy.remove(searchContainer, 'is-active');
      e.target.value = '';
    } else {
      classy.add(searchContainer, 'is-active');
    }
  }

  searchForms.forEach(function (search) {
    event.add(search, 'focusin', toggleForm);
    event.add(search, 'focusout', toggleForm);
  });
}

export default search;
