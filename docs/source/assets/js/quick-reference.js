(function () {
  function toArray (domList) {
    return Array.prototype.slice.call(domList);
  }

  function containsTerm (domNode, term) {
    return domNode.innerHTML.toLowerCase().indexOf(term.toLowerCase()) > -1;
  }

  function filterClasses (e) {
    var items = toArray(document.querySelectorAll('.js-class'))
    .map(function (item) {
      item.classList.add('hide');
      return item;
    })
    .filter(function (item) {
      var content = item.querySelector('.js-class-name');
      return containsTerm(content, e.target.value);
    })
    .map(function (item) {
      item.classList.remove('hide');
      item.parentNode.parentNode.classList.remove('hide')
      return item;
    });
  }

  var filterInput = document.querySelector('.js-class-filter');
  filterInput.addEventListener('input', filterClasses);
})();
