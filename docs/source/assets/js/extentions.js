window.onload = function () {
  console.log(calcite.bus)

  var viewTogglers = calcite.nodeListToArray(document.querySelectorAll('.js-view-toggle'));

  viewTogglers.map(function (toggle) {
    calcite.addEvent(toggle, 'click', clickHandler);
  });

  calcite.bus.on('view:toggle', setView);

  function clickHandler (e) {
    e.preventDefault();
    var set = e.target.getAttribute('data-toggle-set');
    var target = e.target.getAttribute('data-toggle');
    calcite.bus.emit('view:toggle', set, target);
  }

  function setView (set, target) {
    var nodes = calcite.nodeListToArray(document.querySelectorAll('[data-toggle-set=' + set + ']'));
    nodes.map(function (node) {
      console.log(node)
      calcite.removeClass(node, 'is-active');
    });
    var setNodes = calcite.nodeListToArray(nodes.querySelectorAll('[data-toggle=' + target + ']'));
    setNodes.map(function (node) {
      console.log(setNodes)
      calcite.addClass(node, 'is-active');
    });
  }
};
