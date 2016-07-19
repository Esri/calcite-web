// Cool Helpers
import * as dom from '../helpers/dom';
import * as event from '../helpers/event';
import * as classy from '../helpers/classy';

import bus from '../helpers/bus';

function switcher () {
  var toggles = dom.findElements('.js-view-toggle');

  bus.on('switcher:bind', bind);
  bus.on('switcher:toggle', handleToggle);

  function bind (options) {
    if (!options) {
      toggles.forEach(function (toggle) {
        setUp(toggle);
      });
    } else {
      setUp(options.node);
    }
  }

  function setUp (toggle) {
    event.add(toggle, 'click', toggleClick);
  }

  function toggleClick (e) {
    e.preventDefault();
    var options = {
      set: e.target.getAttribute('data-set'),
      target: e.target.getAttribute('data-view')
    };

    bus.emit('switcher:toggle', options);
  }

  function handleToggle (options) {
    var viewSet = dom.findElements(`.js-view[data-set=${options.set}]`);
    var viewTarget = dom.findElements(`.js-view[data-set=${options.set}][data-view=${options.target}]`);
    var toggleSet = dom.findElements(`.js-view-toggle[data-set=${options.set}]`);
    var toggleTarget = dom.findElements(`.js-view-toggle[data-set=${options.set}][data-view=${options.target}]`);
    classy.removeActive(viewSet);
    classy.removeActive(toggleSet);
    classy.addActive(viewTarget);
    classy.addActive(toggleTarget);
  }

  bus.emit('switcher:bind');
}

export default switcher;
