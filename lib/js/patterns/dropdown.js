// Cool Helpers
import * as dom from '../helpers/dom';
import * as classy from '../helpers/classy';
import * as event from '../helpers/event';
import bus from '../helpers/bus';

// ┌──────────┐
// │ Dropdown │
// └──────────┘
// show and hide dropdown menus
function dropdown () {
  var toggles = dom.findElements('.js-dropdown-toggle');
  var dropdowns = dom.findElements('.js-dropdown');

  bus.on('dropdown:toggle', toggleDropdown);
  bus.on('dropdown:close', closeAllDropdowns);
  bus.on('keyboard:escape', closeAllDropdowns);
  bus.on('dropdown:bind', bindDropdowns);

  function closeAllDropdowns (options) {
    event.remove(document.body, event.click(), closeAllDropdowns);
    dropdowns.forEach(function (dropdown) {
      classy.remove(dropdown, 'is-active');
    });
  }

  function toggleDropdown (options) {
    if (!options) return;
    classy.toggle(options.node, 'is-active');
    if (classy.has(options.node, 'is-active')) {
      event.add(document.body, event.click(), closeAllDropdowns);
    }
  }

  function bindDropdowns (options) {
    toggles.forEach(function (toggle) {
      event.add(toggle, event.click(), toggleClick)
    })
  }

  function toggleClick (e) {
    event.preventDefault(e);
    event.stopPropagation(e);
    var dropdown = dom.closest('js-dropdown', e.target);
    bus.emit('dropdown:toggle', {node: dropdown});
  }

  bus.emit('dropdown:bind');
}

export default dropdown;
