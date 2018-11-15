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
  var body = document.body;
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

  function openModal (options) {
    bus.emit('modal:close', {fromOpen: true});
    if (!options || !options.id) return;
    var modal = document.querySelector(`.js-modal[data-modal="${options.id}"]`);
    modal.removeAttribute('tabindex');
    event.add(document, 'keydown', fenceModal);
    classy.add(modal, 'is-active');
    classy.add(html, 'overflow-hidden');
    // if there is a scrollbar, set scroll on body so scroll width remains
    if (html.offsetHeight > html.clientHeight) {
      classy.add(body, 'overflow-scroll');
    }
    aria.hide(dependentNodes());
    let interactiveQuery = 'button, [href], input, select, textarea, [tabindex]';
    let focusableElements = dom.findElements(interactiveQuery, modal).filter(el => {
      return !el.disabled && el.tabIndex !== -1 && el.offsetHeight > 0;
    });
    firstFocusableElement = focusableElements.shift();
    lastFocusableElement = focusableElements.pop();
    firstFocusableElement && firstFocusableElement.focus();
  }

  function closeModal (options) {
    if (!options || !options.id) {
      classy.removeActive(modals);
    } else {
      var modal = document.querySelector(`.js-modal[data-modal="${options.id}"]`);
      classy.remove(modal, 'is-active');
      modal.setAttribute('tabindex', 0);
      event.remove(document, 'keydown', fenceModal);
      aria.show(dependentNodes());
    }

    // delay swapping the overflow classes to avoid modal moving into space vacated by scroll bar
    if (!options || !options.fromOpen) {
      setTimeout(function () {
        classy.remove(html, 'overflow-hidden');
        classy.remove(body, 'overflow-scroll');
      }, 300);
    }
  }

  function bindModals (node) {
    if (!node) {
      toggles.forEach(function (toggle) {
        var eventExists = false;
        event.boundEvents.modals.forEach(function (e) {
          if (e.target === toggle && e.event === event.click() && e.fn === toggleClick) {
            eventExists = true;
          }
        });

        if (!eventExists) {
          event.boundEvents.modals.push({target: toggle, event: event.click(), fn: toggleClick});
          event.add(toggle, event.click(), toggleClick);
        }
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

  bus.emit('modal:bind');
}

function toggleClick (e) {
  event.preventDefault(e);
  var toggle = dom.closest('js-modal-toggle', e.target);
  var modalId = toggle.getAttribute('data-modal');
  var modal = document.querySelector(`.js-modal[data-modal="${modalId}"]`);
  if (modal && !classy.has(modal, 'is-active')) {
    bus.emit('modal:open', {id: modalId});
  } else {
    bus.emit('modal:close');
  }
}

export default modal;
