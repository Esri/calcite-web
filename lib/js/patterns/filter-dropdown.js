// Cool Helpers
import * as dom from '../helpers/dom'
import * as classy from '../helpers/classy'
import * as aria from '../helpers/aria'
import * as event from '../helpers/event'
import bus from '../helpers/bus'

import Guid from 'guid'

// ┌─────────────────┐
// │ Filter Dropdown │
// └─────────────────┘
// Select one or many from a searchable list

function filterDropdown () {
  bus.on('filterDropdown:select', toggleItem)
  bus.on('filterDropdown:select', emitActive)
  bus.on('filterDropdown:select:remove', removeItem)
  bus.on('filterDropdown:active', drawActive)
  bus.on('filterDropdown:active:clear', clearActive)
  bus.on('filterDropdown:toggle', toggleDropdown)
  bus.on('filterDropdown:open', openList)
  bus.on('filterDropdown:open', uiToggle)
  bus.on('filterDropdown:close', closeList)
  bus.on('filterDropdown:close', uiToggle)
  bus.on('filterDropdown:clear', clearItems)
  bus.on('keyboard:escape', closeList)

  var dropdowns = dom.findElements('.js-filter-dropdown');
  dropdowns.forEach(function (dropdown) {
    var dropdownId = dropdown.getAttribute('data-filter-dropdown')
    var input = dropdown.querySelector('.filter-dropdown-input');
    event.add(input, 'focus', inputFocus)

    // var clearButton = dropdown.querySelector('.js-filter-dropdown-clear');
    // event.add(clearButton, event.click(), clearClick)

    var opens = dropdown.querySelectorAll('.js-filter-dropdown-open')
    for (let i = 0; i < opens.length; i++) {
      var open = opens[i]
      open.setAttribute('data-id', dropdownId)
      event.add(open, event.click(), toggleClick);
    }
    var closes = dropdown.querySelectorAll('.js-filter-dropdown-close')
    for (let i = 0; i < closes.length; i++) {
      var close = closes[i]
      close.setAttribute('data-id', dropdownId)
      event.add(close, event.click(), toggleClick);
    }


    var items = dropdown.querySelectorAll('.filter-dropdown-link');
    for (let i = 0; i < items.length; i++) {
      var item = items[i];
      item.setAttribute('data-item-id', i);
      event.add(item, event.click(), itemClick);
    }
  });

  function getOptions (e) {
    var parent = dom.closest('js-filter-dropdown', e.target)
    return {
      parent: parent,
      id: parent.getAttribute('data-filter-dropdown'),
      item: e.target
    }
  }

  function clearClick (e) {
    var options = getOptions(e)
    bus.emit('filterDropdown:active:clear', options)
    bus.emit('filterDropdown:clear', options)
  }

  function clearItems (options) {
    var items = options.parent.querySelectorAll('.filter-dropdown-link')
    classy.removeActive(items)
  }

  function inputFocus (e) {
    event.stopPropagation(e)
    var options = getOptions(e)
    bus.emit('filterDropdown:input:focus', options)
  }

  function itemClick (e) {
    event.preventDefault(e)
    event.stopPropagation(e)
    var options = getOptions(e)
    bus.emit('filterDropdown:select', options)
  }

  function toggleClick (e) {
    var options = getOptions(e)
    classy.toggle(e.target, 'is-active')
    bus.emit('filterDropdown:toggle', options)
  }

  function toggleDropdown (options) {
    var list = options.parent.querySelector('.filter-dropdown-list');
    // console.log(list, classy.has(list, 'is-active'))
    if (classy.has(list, 'is-active')) {
      bus.emit('filterDropdown:close', options)
    } else {
      bus.emit('filterDropdown:open', options)
    }
  }

  function toggleItem (options) {
    classy.toggle(options.item, 'is-active')
  }

  function removeItem (options) {
    var activeItems = options.parent.querySelectorAll('.filter-dropdown-link.is-active')
    var toRemove = activeItems[options.i]
    classy.remove(toRemove, 'is-active')

    var newActiveItems = options.parent.querySelectorAll('.filter-dropdown-link.is-active')

    var emit = {
      parent: options.parent,
      id: options.id,
      active: newActiveItems
    }
    bus.emit('filterDropdown:active', emit)
  }

  function uiToggle(options) {
    var opens = options.parent.querySelectorAll('.js-filter-dropdown-open')
    for (let i = 0; i < opens.length; i++) {
      var open = opens[i]
      classy.toggle(open, 'is-active')
    }
    var closes = options.parent.querySelectorAll('.js-filter-dropdown-close')
    for (let i = 0; i < closes.length; i++) {
      var close = closes[i]
      classy.toggle(close, 'is-active')
    }
  }
  function uiToClose (options) {
    var closes = document.querySelectorAll('.js-filter-dropdown-close')
    classy.clearActive(closes)
    var opens = document.querySelectorAll('.js-filter-dropdown-open')
    classy.addActive(opens)
  }

  function openList (options) {
    closeList()
    var list = options.parent.querySelector('.filter-dropdown-list');
    classy.add(list, 'is-active')
  }

  function closeList (e) {
    var lists = document.querySelectorAll('.filter-dropdown-list');
    classy.removeActive(lists)
  }

  function emitActive (options) {
    var activeItems = options.parent.querySelectorAll('.filter-dropdown-link.is-active')
    var emit = {
      parent: options.parent,
      id: options.id,
      active: activeItems
    }
    bus.emit('filterDropdown:active', emit)
  }

  function drawActive (options) {
    bus.emit('filterDropdown:active:clear', options)
    clearActive(options)
    for (let i = 0; i < options.active.length; i++) {
      var item = options.active[i]
      var template = `<span class="filter-dropdown-active">${item.innerHTML}<a class="filter-dropdown-remove" href="#" data-item-id='${i}'></a></span>`
      options.parent.insertAdjacentHTML('beforeend', template);
      var remove = options.parent.querySelector(`.filter-dropdown-remove[data-item-id="${i}"]`)
      event.add(remove, event.click(), removeClick)
    }
  }

  function removeClick (e) {
    var options = getOptions(e)
    options.i = e.target.getAttribute('data-item-id')
    bus.emit('filterDropdown:select:remove', options)
  }

  function clearActive (options) {
    var current = options.parent.querySelectorAll('.filter-dropdown-active')
    for (let i = 0; i < current.length; i++) {
      options.parent.removeChild(current[i])
    }
  }
};

export default filterDropdown