import aria from '../helpers/aria'
import classy from '../helpers/classy'
import dom from '../helpers/dom'
import event from '../helpers/event'

// ┌───────┐
// │ Modal │
// └───────┘
// show and hide modal dialogues
function modal () {
  var wrapper = document.querySelector('.wrapper');
  var footer = document.querySelector('.footer');
  var toggles = dom.findElements('.js-modal-toggle');
  var modals = dom.findElements('.js-modal');
  var lastOn;

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
      modals.forEach(function (modal) {
        classy.remove(modal, 'is-active');
        modal.removeAttribute('tabindex');
      });
      lastOn.focus();
      aria.toggleHidden([wrapper, footer]);
      event.remove(document, 'keyup', escapeCloseModal);
      event.remove(document, 'focusin', fenceModal);
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
    }

    var isOpen = classy.has(modal, 'is-active');
    classy.toggleActive(modals, modal);
    aria.toggleHidden([wrapper, footer]);

    if (isOpen) {
      event.remove(document, 'keyup', escapeCloseModal);
      event.remove(document, 'focusin', fenceModal);
      lastOn.focus();
      modal.removeAttribute('tabindex');
    } else {
      event.add(document, 'keyup', escapeCloseModal);
      event.add(document, 'focusin', fenceModal);
      lastOn = toggle;
      modal.setAttribute('tabindex', 0);
      modal.focus();
    }
  }

  toggles.forEach(function (toggle) {
    event.add(toggle, event.click(), bindModalToggle);
  });
};

export default modal