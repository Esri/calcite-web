// Cool Helpers
import * as dom from '../helpers/dom';
import * as classy from '../helpers/classy';
import * as aria from '../helpers/aria';
import * as event from '../helpers/event';
import bus from '../helpers/bus';

// ┌───────┐
// │ Modal │
// └───────┘
// show and hide modal dialogues
// Listens to a 'modal:bind' optionally takes a node
// Emits and listens on the 'modal:open' channel. Takes a data-modal attr
// Emits and listens to on the 'modal:close' channel. Optionally takes a data-modal
// Emitting a modal id toggle that modals state.
// Emitting false or null closes all modals.

function modal () {
  var html = document.documentElement;
  var wrapper = document.querySelector('.wrapper');
  var footer = document.querySelector('.footer');
  var toggles = dom.findElements('.js-modal-toggle');
  var modals = dom.findElements('.js-modal');
  var firstFocusableElement, lastFocusableElement;

  // Bus events
  bus.on('modal:open', openModal);
  bus.on('keyboard:escape', closeModal);
  bus.on('modal:close', closeModal);
  bus.on('modal:bind', bindModals);

  function dependentNodes () {
    var nodes = [];
    if (wrapper) {
      nodes.push(wrapper);
    }
    if (footer) {
      nodes.push(footer);
    }
    return nodes;
  }

  function openModal (modalId) {
    bus.emit('modal:close');
    if (!modalId || !modalId.id) return;
    var modal = document.querySelector(`.js-modal[data-modal="${modalId.id}"]`);
    modal.removeAttribute('tabindex');
    event.add(document, 'keydown', fenceModal);
    classy.add(modal, 'is-active');
    classy.add(html, 'drawer-no-overflow');
    aria.hide(dependentNodes());
    let interactiveQuery = 'button, [href], input, select, textarea, [tabindex]';
    let focusableElements = dom.findElements(interactiveQuery, modal).filter(el => {
      return !el.disabled && el.tabIndex !== -1 && el.offsetHeight > 0;
    });
    firstFocusableElement = focusableElements.shift();
    lastFocusableElement = focusableElements.pop();
    firstFocusableElement && firstFocusableElement.focus();
  }

  function closeModal (modalId) {
    if (classy.has(html, 'drawer-no-overflow')) {
      classy.remove(html, 'drawer-no-overflow');
    }
    if (!modalId) return classy.removeActive(modals);
    var modal = document.querySelector(`.js-modal[data-modal="${modalId.id}"]`);
    classy.remove(modal, 'is-active');
    modal.setAttribute('tabindex', 0);
    event.remove(document, 'keydown', fenceModal);
    aria.show(dependentNodes());
  }

  function bindModals (node) {
    if (!node) {
      toggles.forEach(function (toggle) {
        event.add(toggle, event.click(), toggleClick);
      });
    } else {
      event.add(node, event.click(), toggleClick);
    }
  }

  function fenceModal (e) {
    var isTabPressed = (e.key === 'Tab' || e.keyCode === 9);
    if (!isTabPressed) {
      return;
    }
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement && lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement && firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  }

  function toggleClick (e) {
    event.preventDefault(e);
    var modalId = e.target.getAttribute('data-modal');
    bus.emit('modal:open', {id: modalId});
  }

  bus.emit('modal:bind');
}

export default modal;
