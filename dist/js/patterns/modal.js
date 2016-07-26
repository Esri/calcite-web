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
  // Cool nodes
  var wrapper = document.querySelector('.wrapper');
  var footer = document.querySelector('.footer');
  var toggles = dom.findElements('.js-modal-toggle');
  var modals = dom.findElements('.js-modal');

  // Bus events
  bus.on('modal:open', openModal);
  bus.on('keyboard:escape', closeModal);
  bus.on('modal:close', closeModal);
  bus.on('modal:bind', bindModals);

  function openModal (modalId) {
    bus.emit('modal:close');
    if (!modalId) return;
    var modal = document.querySelector(`.js-modal[data-modal="${modalId}"]`);
    modal.removeAttribute('tabindex');
    event.add(document, 'focusin', fenceModal);
    classy.add(modal, 'is-active');
    aria.hide([wrapper, footer]);
    modal.focus();
  }

  function closeModal (modalId) {
    if (!modalId) return classy.removeActive(modals);
    var modal = document.querySelector(`.js-modal[data-modal="${modalId}"]`);
    classy.remove(modal, 'is-active');
    modal.setAttribute('tabindex', 0);
    event.remove(document, 'focusin', fenceModal);
    aria.show([wrapper, footer]);
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
    if (!dom.closest('js-modal', e.target)) {
      modals.forEach(function (modal) {
        if (classy.has(modal, 'is-active')) {
          modal.focus();
        }
      });
    }
  }

  function toggleClick (e) {
    event.preventDefault(e);
    var modalId = e.target.dataset.modal;
    bus.emit('modal:open', modalId);
  }

  bus.emit('modal:bind');
}

export default modal;
