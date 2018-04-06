// Cool Helpers
import * as dom from '../helpers/dom';
import * as classy from '../helpers/classy';
import * as event from '../helpers/event';
import bus from '../helpers/bus';

// ┌─────────────────┐
// │ Filter Dropdown │
// └─────────────────┘
// Select one or many from a searchable list

function filterDropdown () {
  bus.on('filterDropdown:bind', bindFilterDropdowns);
  bus.on('filterDropdown:select', toggleItem);
  bus.on('filterDropdown:select', emitActive);
  bus.on('filterDropdown:select:remove', removeItem);
  bus.on('filterDropdown:active', drawActive);
  bus.on('filterDropdown:active:clear', clearActive);
  bus.on('filterDropdown:toggle', toggleDropdown);
  bus.on('filterDropdown:open', openList);
  bus.on('filterDropdown:close', closeList);
  bus.on('keyboard:escape', closeList);

  function bindFilterDropdowns () {
    var dropdowns = dom.findElements('.js-filter-dropdown');
    dropdowns.forEach(function (dropdown) {
      var dropdownId = dropdown.getAttribute('data-filter-dropdown');
      var input = dropdown.querySelector('.filter-dropdown-input');
      event.add(input, 'focus', inputFocus);

      var opens = dropdown.querySelectorAll('.js-filter-dropdown-open');
      for (let i = 0; i < opens.length; i++) {
        var open = opens[i];
        open.setAttribute('data-id', dropdownId);
        event.add(open, event.click(), toggleClick);
      }
      var closes = dropdown.querySelectorAll('.js-filter-dropdown-close');
      for (let i = 0; i < closes.length; i++) {
        var close = closes[i];
        close.setAttribute('data-id', dropdownId);
        event.add(close, event.click(), toggleClick);
      }

      var items = dropdown.querySelectorAll('.filter-dropdown-link');
      for (let i = 0; i < items.length; i++) {
        var item = items[i];
        item.setAttribute('data-item-id', i);
        event.add(item, event.click(), itemClick);
      }

      event.add(input, 'keyup', function (e) {
        var itemsArray = dom.nodeListToArray(items);
        itemsArray.forEach(function (item) {
          classy.add(item, 'hide');
        });

        dom.filterArray(input.value, itemsArray).forEach(function (item) {
          classy.remove(item, 'hide');
        });
      });
    });
  }

  function getOptions (e) {
    var parent = dom.closest('js-filter-dropdown', e.target);
    return {
      parent: parent,
      id: parent.getAttribute('data-filter-dropdown'),
      item: e.target
    };
  }

  function inputFocus (e) {
    event.stopPropagation(e);
    var options = getOptions(e);
    bus.emit('filterDropdown:input:focus', options);
  }

  function itemClick (e) {
    event.preventDefault(e);
    event.stopPropagation(e);
    var options = getOptions(e);
    bus.emit('filterDropdown:select', options);
  }

  function toggleClick (e) {
    e.preventDefault();
    var options = getOptions(e);
    classy.toggle(e.target, 'is-active');
    bus.emit('filterDropdown:toggle', options);
  }

  function toggleDropdown (options) {
    var list = options.parent.querySelector('.filter-dropdown-list');
    if (classy.has(list, 'is-active')) {
      bus.emit('filterDropdown:close', options);
    } else {
      bus.emit('filterDropdown:open', options);
    }
  }

  function toggleItem (options) {
    classy.toggle(options.item, 'is-active');
  }

  function removeItem (options) {
    var activeItems = options.parent.querySelectorAll('.filter-dropdown-link.is-active');
    var toRemove = activeItems[options.i];
    classy.remove(toRemove, 'is-active');

    var newActiveItems = options.parent.querySelectorAll('.filter-dropdown-link.is-active');

    var emit = {
      parent: options.parent,
      id: options.id,
      active: newActiveItems
    };
    bus.emit('filterDropdown:active', emit);
  }

  function openList (options) {
    closeList();
    var list = options.parent.querySelector('.filter-dropdown-list');
    classy.add(list, 'is-active');

    var closes = dom.findElements('.js-filter-dropdown-close', options.parent);
    var opens = dom.findElements('.js-filter-dropdown-open', options.parent);
    opens.forEach(el => classy.remove(el, 'is-active'));
    closes.forEach(el => classy.add(el, 'is-active'));
  }

  function closeList (e) {
    var lists = document.querySelectorAll('.filter-dropdown-list');
    classy.removeActive(lists);

    var opens = dom.findElements('.js-filter-dropdown-open');
    var closes = dom.findElements('.js-filter-dropdown-close');
    opens.forEach(el => classy.add(el, 'is-active'));
    closes.forEach(el => classy.remove(el, 'is-active'));
  }

  function emitActive (options) {
    var activeItems = options.parent.querySelectorAll('.filter-dropdown-link.is-active');
    var emit = {
      parent: options.parent,
      id: options.id,
      active: activeItems
    };
    bus.emit('filterDropdown:active', emit);
  }

  function drawActive (options) {
    bus.emit('filterDropdown:active:clear', options);

    var placeholder = options.parent.querySelector('.js-filter-dropdown-no-filters');
    if (options.active.length > 0) {
      classy.add(placeholder, 'hide');
    } else {
      classy.remove(placeholder, 'hide');
    }

    for (let i = 0; i < options.active.length; i++) {
      var item = options.active[i];
      var template = `<span class="filter-dropdown-active">
        ${item.innerHTML}
        <a class="filter-dropdown-remove" href="#" data-item-id='${i}'>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32" class="svg-icon"><path d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z"/></svg>
        </a>
      </span>`;
      options.parent.insertAdjacentHTML('beforeend', template);
      var removeLink = options.parent.querySelector(`.filter-dropdown-remove[data-item-id="${i}"]`);
      event.add(removeLink, event.click(), removeClick);
    }
  }

  function removeClick (e) {
    e.preventDefault();
    var options = getOptions(e);
    options.i = e.target.getAttribute('data-item-id');
    bus.emit('filterDropdown:select:remove', options);
  }

  function clearActive (options) {
    var current = options.parent.querySelectorAll('.filter-dropdown-active');
    for (let i = 0; i < current.length; i++) {
      options.parent.removeChild(current[i]);
    }
  }

  bus.emit('filterDropdown:bind');
}

export default filterDropdown;
