// ┌─────┐
// │ DOM │
// └─────┘
// Handles dom nodes

// returns closest element up the DOM tree matching a given class
export function closest (className, context) {
  var current;
  for (current = context; current; current = current.parentNode) {
    var hasClass = new RegExp('(\\s|^)' + className + '(\\s|$)').test(current.getAttribute('class'));
    if (current.nodeType === 1 && hasClass) {
      break;
    }
  }
  return current;
}

// turn a domNodeList into an array
export function nodeListToArray (domNodeList) {
  if (Array.isArray(domNodeList)) {
    return domNodeList;
  } else {
    return Array.prototype.slice.call(domNodeList);
  }
}

// Finds all the elements inside a node, or the document and returns them as an array
export function findElements (query, domNode) {
  var context = domNode || document;
  var elements = context.querySelectorAll(query);
  return nodeListToArray(elements);
}

export function filterArray (value, array) {
  var results = array.filter(function (item) {
    var val = value.toLowerCase();
    var t = item.innerHTML.toLowerCase();
    return t.indexOf(val) !== -1;
  });
  return results;
}
