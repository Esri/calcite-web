// ┌─────┐
// │ DOM │
// └─────┘
// Handles dom nodes

// returns closest element up the DOM tree matching a given class
function closest (className, context) {
  var result, current;
  for (current = context; current; current = current.parentNode) {
    if (current.nodeType === 1 && hasClass(current, className)) {
      result = current;
      break;
    }
  }
  return current;
}

// turn a domNodeList into an array
function nodeListToArray (domNodeList) {
  return Array.prototype.slice.call(domNodeList);
}

// Finds all the elements inside a node, or the document and returns them as an array
function findElements (query, domNode) {
  var context = domNode || document;
  var elements = context.querySelectorAll(query);
  return nodeListToArray(elements);
}

export default {
  closest,
  nodeListToArray,
  findElements
}