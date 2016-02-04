// Cool Helpers
import * as dom from '../helpers/dom'
import * as classy from '../helpers/classy'
import * as aria from '../helpers/aria'
import * as event from '../helpers/event'
import bus from '../helpers/bus'

// ┌───────┐
// │ Modal │
// └───────┘
// show and hide modal dialogues
// Emits and listens on the 'pattern:modal' channel
// Emitting a modal id toggle that modals state.
// Emitting false or null closes all modals.

function modal () {
  var wrapper = document.querySelector('.wrapper');
  var footer = document.querySelector('.footer');
  var toggles = dom.findElements('.js-modal-toggle');
  var modals = dom.findElements('.js-modal');

  function fenceModal (e) {
    if ( !dom.closest('js-modal', e.target)) {
      modals.forEach(function (modal) {
        if (classy.has(modal, 'is-active')) {
          modal.focus();
        }
      });
    }
  }

  function escapeCloseModal (e) {
    if (e.keyCode === 27) {
      bus.emit('pattern:modal', null)
    }
  }

  function controlModal (modalId) {
    if (!modalId) {
      classy.removeActive(modals)
      return
    }
    var modal = document.querySelector('.js-modal[data-modal="' + modalId + '"]');
    var isOpen = classy.has(modal, 'is-active');
    classy.toggleActive(modals, modal);
    aria.toggleHidden([wrapper, footer]);
    if (isOpen) {
      event.remove(document, 'keyup', escapeCloseModal);
      event.remove(document, 'focusin', fenceModal);
      modal.removeAttribute('tabindex');
    } else {
      event.add(document, 'keyup', escapeCloseModal);
      event.add(document, 'focusin', fenceModal);
      modal.setAttribute('tabindex', 0);
      modal.focus();
    }
  }

  function bindModalToggle (e) {
    event.preventDefault(e);
    var toggle = e.target;
    var modal;
    var modalId = toggle.getAttribute('data-modal');
    if (modalId) {
      modal = document.querySelector('.js-modal[data-modal="' + modalId + '"]');
    } else {
      modal = dom.closest('js-modal', toggle);
      modalId = modal.getAttribute('data-modal');
    }
    bus.emit('pattern:modal', modalId)
  }

  toggles.forEach(function (toggle) {
    event.add(toggle, event.click(), bindModalToggle);
  });

  bus.on('pattern:modal', controlModal)
};

export default modal