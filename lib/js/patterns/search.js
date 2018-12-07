// Cool Helpers
import * as dom from '../helpers/dom';
import * as classy from '../helpers/classy';
import * as event from '../helpers/event';
import bus from '../helpers/bus';

// ┌────────┐
// │ Search │
// └────────┘
// Expanding search bar that lives in the top nav.
function search () {
  var toggles = dom.findElements('.js-search-toggle');
  var overlay = dom.findElements('.js-search')[0];

  bus.on('search:bind', bindSearches);
  bus.on('search:toggle', toggleSearch);
  bus.on('keyboard:escape', closeSearch);
  bus.on('search:focus', focusSearch);

  function bindSearches (node) {
    if (!node) {
      toggles.forEach(function (toggle) {
        event.add(toggle, event.click(), toggleClick);
      });
    } else {
      event.add(node, event.click(), toggleClick);
    }
  }

  function toggleSearch (node) {
    var openIcon = node.querySelector('.js-search-icon');
    var closeIcon = node.querySelector('.js-close-icon');
    classy.toggle(openIcon, 'hide');
    classy.toggle(closeIcon, 'hide');
    classy.toggle(overlay, 'is-active');
    classy.toggle(document.body, 'overflow-hidden');
    bus.emit('search:focus');
  }

  function focusSearch () {
    let input = document.querySelector('.js-search-input');
    input.focus();
  }

  function closeSearch () {
    if (overlay && classy.has(overlay, 'is-active')) {
      classy.remove(overlay, 'is-active');
      classy.remove(document.body, 'overflow-hidden');
      let toggleNodes = dom.nodeListToArray(toggles);
      toggleNodes.forEach(toggleSearch);
      let input = document.querySelector('.js-search-input');
      if (input) {
        input.blur();
      }
    }
  }

  function toggleClick (e) {
    event.preventDefault(e);
    bus.emit('search:toggle', e.target);
  }

  bus.emit('search:bind');
}

export default search;
