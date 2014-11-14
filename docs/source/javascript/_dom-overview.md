## Dom Overview
The following functions allow for basic dom manipulation and traversal. These helpers are used by javascript-dependant patterns, and can be included in any custom javsacript in Calcite Web projects.

| function | action |
| -------- | ------ |
| `dom.addEvent()` | Returns standard interaction event, later will add touch support. |
| `dom.removeEvent(el, event, fn)` | Add a callback function to an event on an element. |
| `dom.eventTarget(el, event, fn)` | Remove an event and its bindings. |
| `dom.preventDefault(event)` | Get the target element of an event. |
| `dom.stopPropagation(event)` | Prevent default behavior of an event. |
| `dom.hasClass(event)` | Stop and event from bubbling up the DOM tree. Returns boolean. |
| `dom.addClass(elem, className)` | Check if an element has a specific class. |
| `dom.removeClass(elem, classes)` | Add one or more classes to an element. |
| `dom.closest(elem, classes)` | Remove one or more classes from an element. Returns dom node. |
| `dom.getAttr(className, context)` | Returns closest element up the DOM tree matching a given class. Returns attribute string. |
| `dom.indexOf(obj, arr, offset)` | Return the index of an object in an array with optional offset. Returns number. |
| `dom.makeArray(object)` | Make an object into an array. Returns array. |
| `dom.isTouch()` | Detect touch, could be improved for more coverage. Returns boolean. |