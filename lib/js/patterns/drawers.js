import aria from '../helpers/aria'
import classy from '../helpers/classy'
import dom from '../helpers/dom'
import event from '../helpers/event'

// ┌────────┐
// │ Drawer │
// └────────┘
// show and hide drawers
function drawer () {
  var wrapper = document.querySelector('.wrapper');
  var footer = document.querySelector('.footer');
  var toggles = dom.findElements('.js-drawer-toggle');
  var drawers = dom.findElements('.js-drawer');
  var lastOn;

  function fenceDrawer (e) {
    if ( !dom.closest('js-drawer', e.target)) {
      drawers.forEach(function (drawer) {
        if (classy.has(drawer, 'is-active')) {
          drawer.focus();
        }
      });
    }
  }

  function escapeCloseDrawer (e) {
    if (e.keyCode === 27) {
      drawers.forEach(function (drawer) {
        classy.remove(drawer, 'is-active');
        drawer.removeAttribute('tabindex');
      });
      aria.toggleHidden([wrapper, footer]);
      event.remove(document, 'keyup', escapeCloseDrawer);
      event.remove(document, 'focusin', fenceDrawer);
      lastOn.focus();
    }
  }

  function bindDrawerToggle (e) {
    event.preventDefault(e);
    var toggle = e.target;
    var drawerId = toggle.getAttribute('data-drawer');
    var drawer = document.querySelector('.js-drawer[data-drawer="' + drawerId + '"]');
    var isOpen = classy.has(drawer, 'is-active');

    classy.toggleActive(drawers, drawer);
    aria.toggleHidden([wrapper, footer]);

    if (isOpen) {
      event.remove(document, 'keyup', escapeCloseDrawer);
      event.remove(document, 'focusin', fenceDrawer);
      lastOn.focus();
      drawer.removeAttribute('tabindex');
    } else {
      event.add(document, 'keyup', escapeCloseDrawer);
      event.add(document, 'focusin', fenceDrawer);

      lastOn = toggle;
      drawer.setAttribute('tabindex', 0);
      drawer.focus();
    }
  }

  toggles.forEach(function (toggle) {
    event.add(toggle, event.click(), bindDrawerToggle);
  });

  drawers.forEach(function (drawer) {
    event.add(drawer, event.click(), function (e) {
      if (classy.has(event.target(e), 'drawer')) {
        classy.toggleActive(drawers, drawer);
        aria.toggleHidden([wrapper, footer]);
        event.remove(document, 'keyup', escapeCloseDrawer);
      }
    });
  });
};

export default drawer