// Cool Helpers
import * as dom from '../helpers/dom';
import * as event from '../helpers/event';
import bus from '../helpers/bus';

export default function clipboard () {
  var copyBtns = dom.findElements('.js-copy-to-clipboard');
  bus.on('clipboard:bind', bindButtons);

  function bindButtons (options) {
    if (!options) {
      copyBtns.forEach(function (btn) {
        event.add(btn, 'click', copy);
      });
    } else {
      event.add(options.node, 'click', copy);
    }
  }

  function copy (e) {
    e.preventDefault();
    var target = e.target.getAttribute('data-clipboard-target');
    document.querySelector(target).select();
    document.execCommand('copy');
  }

  bus.emit('clipboard:bind');
}
