// Cool Helpers
import * as dom from './dom';

// ┌────────────────────┐
// │ Class Manipulation │
// └────────────────────┘

// check if an element has a specific class
export function has (domNode, className) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(domNode.getAttribute('class'));
}

// add one or more classes to an element
export function add (domNode, classes) {
  classes.split(' ').forEach(function (c) {
    if (!has(domNode, c)) {
      var existingClass = domNode.getAttribute('class') || '';
      domNode.setAttribute('class', existingClass + ' ' + c);
    }
  });
}

// remove one or more classes from an element
export function remove (domNode, classes) {
  classes.split(' ').forEach(function (c) {
    var removedClass = (domNode.getAttribute('class') || '').replace(new RegExp('(\\s|^)' + c + '(\\s|$)', 'g'), '$2');
    if (has(domNode, c)) {
      domNode.setAttribute('class', removedClass);
    }
  });
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
