(function () {
  var q = window.location.search.substring(3);
  var regex = new RegExp(q, 'g');

  function toArray (domList) {
    return Array.prototype.slice.call(domList);
  }

  function containsTerm (domNode, term) {
    return domNode.textContent.indexOf(term) > -1;
  }

  function encode (string) {
    return string.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
      return '&#'+i.charCodeAt(0)+';';
    });
  }

  // Add term to the top search bar
  document.querySelector('.js-sub-nav-search').value = q;
  document.querySelector('.js-search-toggle').classList.add('hide');

  // Hide all content and only show them if they match search query
  var items = toArray(document.querySelectorAll('.js-search-item'))
  .map(function (item) {
    item.classList.add('hide');
    return item;
  })
  .filter(function (item) {
    var content = item.querySelector('.js-search-item-content');
    return containsTerm(content, q);
  })
  .map(function (item) {
    item.classList.remove('hide');
    item.setAttribute('data-rank', (item.textContent.match(regex) || []).length);
    return item;
  })
  .map(function (item) {
    // just show the part of the content with the search term in it and wrap the term in a label
    var snippet = toArray(item.querySelector('.js-search-item-content').children)
    .filter(function (child) {
      return containsTerm(child, q);
    })
    .map(function (child) {
      var encoded = encode(child.textContent);
      var highlighted = encoded.replace(regex, '<mark>' + q + '</mark>');
      var position = highlighted.indexOf(q);
      // if index of character - 100 is not the beginning, add ellipsis
      var ellipsis = position - 100 > 0 ? '&hellip;' : '';
      return ellipsis + highlighted.substring(position - 300, position + 300);
    })
    .shift();

    item.querySelector('.js-search-item-snippet').innerHTML = snippet;
    return item;
  });

  // Render data to elements
  document.querySelector('.js-term').innerHTML = '"' + q + '"';
  toArray(document.querySelectorAll('.js-results-length')).forEach(function (item) {
    item.innerHTML = items.length;
  });

  if (items.length === 0) {
    document.querySelector('.js-no-results').classList.remove('hide');
  }

  // Reorder elements based on how many times the search term occurs
  var list = document.querySelector('.js-search-list');
  var sortedItems = toArray(list.children)
  .sort(function (a, b) {
    return parseInt(b.getAttribute('data-rank'), 10) - parseInt(a.getAttribute('data-rank'), 10);
  })
  .reduce(function (prev, curr) {
    return prev + curr.outerHTML;
  }, '');
  list.innerHTML = sortedItems;
})();
