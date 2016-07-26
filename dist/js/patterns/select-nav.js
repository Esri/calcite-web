import * as dom from '../helpers/dom';
import * as event from '../helpers/event';
import bus from '../helpers/bus';

function selectNav () {
  bus.on('selectnav:bind', bindSelects);

  var selects = dom.findElements('.js-select-nav');

  function bindSelects () {
    selects.forEach(function (select) {
      event.add(select, 'change', selectPage);
    });
  }

  function selectPage (e) {
    window.location.assign(e.currentTarget.value);
  }

  bus.emit('selectnav:bind');
}

export default selectNav;
