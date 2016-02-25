import * as classy from './classy'

// ┌─────┐
// │ DOM │
// └─────┘
// Handles dom nodes

// returns closest element up the DOM tree matching a given class
export function closest (el, className) {
  while ((el = el.parentElement) && !classy.has(el, className));
  return el;
}

// turn a domNodeList into an array
export function nodeListToArray (domNodeList) {
  if (Array.isArray(domNodeList)) {
    return domNodeList
  }
  return Array.prototype.slice.call(domNodeList)
}

// Finds all the elements inside a node, or the document and returns them as an array
export function findElements (query, domNode) {
  var context = domNode || document
  var elements = context.querySelectorAll(query)
  return nodeListToArray(elements)
}
