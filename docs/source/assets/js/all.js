// On document ready
window.onload = function () {
  // Initialize all calcite.js patterns
  console.log('Initializing calcite!');

  var viewTogglers = window.calcite.nodeListToArray(document.querySelectorAll('.js-view-toggle'));

  viewTogglers.map(function (toggle) {
    window.calcite.addEvent(toggle, 'click', clickHandler);
  });

  window.calcite.bus.on('view:toggle', setView);

  function clickHandler (e) {
    e.preventDefault();
    var set = e.target.getAttribute('data-toggle-set');
    var target = e.target.getAttribute('data-toggle');
    window.calcite.bus.emit('view:toggle', set, target);
  }

  function setView (set, target) {
    var nodes = window.calcite.nodeListToArray(document.querySelectorAll('[data-toggle-set=' + set + ']'));
    nodes.map(function (node) {
      window.calcite.removeClass(node, 'is-active');
    });
    var setNodes = window.calcite.nodeListToArray(document.querySelectorAll('[data-toggle=' + target + ']'));
    setNodes.map(function (node) {
      window.calcite.addClass(node, 'is-active');
    });
  }

  window.calcite.init();
};
