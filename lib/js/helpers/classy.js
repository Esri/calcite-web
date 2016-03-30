// Cool Helpers
import * as dom from './dom';

// ┌────────────────────┐
// │ Class Manipulation │
// └────────────────────┘

// check if an element has a specific class
export function has (domNode, className) {
  var elementClass = ' ' + domNode.className + ' ';
  return elementClass.indexOf(' ' + className + ' ') !== -1;
}

// add one or more classes to an element
export function add (domNode, classes) {
  classes.split(' ').forEach(function (c) {
    if (!has(domNode, c)) {
      domNode.className += ' ' + c;
    }
  });
}

// remove one or more classes from an element
export function remove (domNode, classes) {
  var elementClass = ' ' + domNode.className + ' ';
  classes.split(' ').forEach(function (c) {
    elementClass = elementClass.replace(' ' + c + ' ', ' ');
  });
  domNode.className = elementClass.trim();
}

// if domNode has the class, remove it, else add it
export function toggle (domNode, className) {
  if (has(domNode, className)) {
    remove(domNode, className);
  } else {
    add(domNode, className);
  }
}

// remove 'is-active' class from every element in an array
export function removeActive (array) {
  array = dom.nodeListToArray(array);
  array.forEach(function (item) {
    remove(item, 'is-active');
  });
}

// add 'is-active' class from every element in an array
export function addActive (array) {
  array = dom.nodeListToArray(array);
  array.forEach(function (item) {
    add(item, 'is-active');
  });
}

// remove 'is-active' class from every element in an array, add to one element
export function toggleActive (array, el) {
  removeActive(array);
  add(el, 'is-active');
}
