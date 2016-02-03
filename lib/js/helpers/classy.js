// ┌────────────────────┐
// │ Class Manipulation │
// └────────────────────┘

// check if an element has a specific class
function has (domNode, className) {
  var elementClass = ' ' + domNode.className + ' ';
  return elementClass.indexOf(' ' + className + ' ') !== -1;
}

// add one or more classes to an element
function add (domNode, classes) {
  classes.split(' ').forEach(function (c) {
    if (!hasClass(domNode, c)) {
      domNode.className += ' ' + c;
    }
  });
}

// remove one or more classes from an element
function remove (domNode, classes) {
  var elementClass = ' ' + domNode.className + ' ';
  classes.split(' ').forEach(function (c) {
    elementClass = elementClass.replace(' ' + c + ' ', ' ');
  });
  domNode.className = elementClass.trim();
}

// if domNode has the class, remove it, else add it
function toggle (domNode, className) {
  if (hasClass(domNode, className)) {
    removeClass(domNode, className);
  } else {
    addClass(domNode, className);
  }
}

// remove 'is-active' class from every element in an array
function removeActive (array) {
  if (typeof array == 'object') {
    array = nodeListToArray(array);
  }
  array.forEach(function (item) {
    removeClass(item, 'is-active');
  });
}

// add 'is-active' class from every element in an array
function addActive (array) {
  if (typeof array == 'object') {
    array = nodeListToArray(array);
  }
  array.forEach(function (item) {
    addClass(item, 'is-active');
  });
}

function toggleActive (array, el) {
  var isActive = has(el, 'is-active');
  if (isActive) {
    remove(el, 'is-active');
  } else {
    removeActive(array);
    add(el, 'is-active');
  }
}

export default {
  has,
  add,
  remove,
  toggle,
  removeActive,
  addActive,
  toggleActive,
}