<h1 id="javascript-overview" class="leader-0">Calcite JavaScript</h1>

`calcite-web.js` is a lightweight and dependency-free library made to enabling behaviors for [JavaScript dependent patterns]({{relativePath}}patterns/#javascript-dependent). It also allows for [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) node and class manipulation. `calcite-web.js` can be used in place of jQuery, Dojo, or other large frameworks for a handful of common tasks.

| function | action |
| -------- | ------ |
| `calcite.dom.event()` | Returns standard interaction event (click). Touch support will be added soon. |
| `calcite.dom.addEvent(domNode, event, fn)` | Adds a callback function to an event on an element. |
| `calcite.dom.removeEvent(domNode, event, fn)` | Removes a callback function from an event on an element. |
| `calcite.dom.eventTarget()` | Returns the target element of an event. |
| `calcite.dom.preventDefault(event)` | Prevents default behavior of an event. |
| `calcite.dom.stopPropagation(event)` | Stops an event from bubbling up the DOM tree. |
| `calcite.dom.hasClass(event)` | Checks if an element has a specific class. Returns boolean. |
| `calcite.dom.addClass(domNode, className)` | Adds one or more classes to an element. |
| `calcite.dom.removeClass(domNode, classes)` | Removes one or more classes from an element. |
| `calcite.dom.closest(domNode, classes)` | Returns closest element up the DOM tree matching a given class. Returns DOM node. |
| `calcite.dom.getAttr(className, context)` | Returns the value of an element's attribute. |
| `calcite.dom.nodeListToArray(domNodeList)` | Takes a DOM node list and returns an array. |
| `calcite.arr.indexOf(obj, arr, offset)` | Returns the index of an object in an array with optional offset. Returns number. |
| `calcite.dom.isTouch()` | Detects touch. Could be improved for more coverage. Returns boolean. |
