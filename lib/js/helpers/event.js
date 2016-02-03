// ┌──────────────────────┐
// │ DOM Event Management │
// └──────────────────────┘

// returns standard interaction event, later will add touch support
function click () {
  return 'click';
}

// add a callback function to an event on a DOM node
function add (domNode, e, fn) {
  // push into events registry
  calcite.events.push({
    domNode: domNode,
    e: e,
    fn: fn
  });

  if (domNode.addEventListener) {
    return domNode.addEventListener(e, fn, false);
  } else if (domNode.attachEvent) {
    return domNode.attachEvent('on' + e, fn);
  }
}

// remove a specific function binding from a DOM node event
function remove (domNode, e, fn) {
  calcite.events = calcite.events.filter(function (ev) {
    // if the event, domNode, and function match, remove from events registry
    var shouldRemove = ev.domNode === domNode && ev.e === e && ev.fn === fn
    return !shouldRemove;
  });

  if (domNode.removeEventListener) {
    return domNode.removeEventListener(e, fn, false);
  } else if (domNode.detachEvent) {
    return domNode.detachEvent('on' + e,  fn);
  }
}

// get the target element of an event
function target (e) {
  return e.target || e.srcElement;
}

// prevent default behavior of an event
function preventDefault (e) {
  if (e.preventDefault) {
    return e.preventDefault();
  } else if (e.returnValue) {
    e.returnValue = false;
  }
}

// stop and event from bubbling up the DOM tree
function stopPropagation (e) {
  e = e || window.event;
  if (e.stopPropagation) {
    return e.stopPropagation();
  }
  if (e.cancelBubble) {
    e.cancelBubble = true;
  }
}

// return a funciton that will only execute
// once it is NOT called for delay milliseconds
function throttle(fn, time, context) {
  var lock, args, wrapperFn, later;

  later = function () {
    // reset lock and call if queued
    lock = false;
    if (args) {
      wrapperFn.apply(context, args);
      args = false;
    }
  };

  wrapperFn = function () {
    if (lock) {
      // called too soon, queue to call later
      args = arguments;
    } else {
      // call and lock until later
      fn.apply(context, arguments);
      setTimeout(later, time);
      lock = true;
    }
  };

  return wrapperFn;
}

export default {
  click,
  add,
  remove,
  target,
  preventDefault,
  stopPropagation,
  throttle
}