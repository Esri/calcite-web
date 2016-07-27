// Cool Helpers
import * as dom from '../helpers/dom';
import * as classy from '../helpers/classy';
import * as event from '../helpers/event';

// ┌───────────┐
// │ Third Nav │
// └───────────┘
// sticks things to the window

function thirdNav () {
  var nav = dom.findElements('.js-nav-overflow')[0];
  var leftBtn = dom.findElements('.js-overflow-left')[0];
  var rightBtn = dom.findElements('.js-overflow-right')[0];

  function scroll (distance) {
    nav.scrollLeft += distance;
  }

  function resize () {
    classy.remove(leftBtn, 'is-active');
    classy.remove(rightBtn, 'is-active');
    if (nav.scrollLeft > 0) classy.add(leftBtn, 'is-active');
    if (nav.scrollLeft + nav.clientWidth + 5 < nav.scrollWidth) classy.add(rightBtn, 'is-active');
  }

  if (nav) {
    if (leftBtn) {
      event.add(leftBtn, event.click(), scroll.bind(null, -40));
    }
    if (rightBtn) {
      event.add(rightBtn, event.click(), scroll.bind(null, 40));
    }
    event.add(nav, 'scroll', resize);
    event.add(window, 'resize', resize);
    resize();
  }
}

export default thirdNav;
