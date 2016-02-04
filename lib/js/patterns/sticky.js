// Cool Helpers
import * as dom from '../helpers/dom'
import * as classy from '../helpers/classy'
import * as aria from '../helpers/aria'
import * as event from '../helpers/event'

// ┌────────┐
// │ Sticky │
// └────────┘
// sticks things to the window
function sticky () {
  var elements = dom.findElements('.js-sticky');

  var stickies = elements.map(function (el) {
    var offset = el.offsetTop;
    var dataTop = el.getAttribute('data-top') || 0;
    el.style.top = dataTop + 'px';
    var parent = el.parentNode;
    var shim = el.cloneNode('deep');
    shim.style.visibility = 'hidden';
    shim.style.display = 'none';
    parent.insertBefore(shim, el);

    return {
      top: offset - parseInt(dataTop, 0),
      shim: shim,
      element: el
    };
  });

  function scrollHandler () {
    stickies.forEach(function (item) {
      var referenceElement = item.element;
      if (classy.has(item.element, 'is-sticky')) {
        referenceElement = item.shim;
      }

      var dataTop = referenceElement.getAttribute('data-top') || 0;
      item.top = referenceElement.offsetTop - parseInt(dataTop, 0);

      if (item.top < window.pageYOffset) {
        classy.add(item.element, 'is-sticky');
        item.shim.style.display = '';
      } else {
        classy.remove(item.element, 'is-sticky');
        item.shim.style.display = 'none';
      }
    });
  }

  if (elements) {
    event.add(window, 'scroll', event.throttle(scrollHandler, 100));
    event.add(window, 'resize', event.throttle(scrollHandler, 100));
    event.add(document.body, 'click', scrollHandler);
  }
};

export default sticky