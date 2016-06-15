`calcite-web.js` also has methods for [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) traversal and manipulation. If the needs of a project are not too complex it can be used in place of jQuery, Dojo, or other large frameworks.

| function | action |
| -------- | ------ |
| [`calcite.click()`](#calcite-event-) | Returns standard interaction event (click). Touch support will be added soon. |
| [`calcite.addEvent(domNode, event, fn)`](#calcite-addevent-domnode-event-fn-) | Adds a callback function to an event on an element. |
| [`calcite.removeEvent(domNode, event, fn)`](#calcite-removeevent-domnode-event-fn-) | Removes a callback function from an event on an element. |
| [`calcite.eventTarget()`](#calcite-eventtarget-event-) | Returns the target element of an event. |
| [`calcite.preventDefault(event)`](#calcite-preventdefault-event-) | Prevents default behavior of an event. |
| [`calcite.stopPropagation(event)`](#calcite-stoppropagation-event-) | Stops an event from bubbling up the DOM tree. |
| [`calcite.hasClass(event)`](#calcite-hasclass-node-class-) | Checks if an element has a specific class. Returns boolean. |
| [`calcite.addClass(domNode, className)`](#calcite-addclass-domnode-classes-) | Adds one or more classes to an element. |
| [`calcite.removeClass(domNode, classes)`](#calcite-removeclass-domnode-classes-) | Removes one or more classes from an element. |
| [`calcite.toggleClass(domNode, className)`](#calcite-toggleclass-domnode-classname-) | Toggles one class on an element. |
| [`calcite.closest(domNode, classes)`](#calcite-closest-class-element-) | Returns closest element up the DOM tree matching a given class. Returns DOM node. |
| [`calcite.nodeListToArray(domNodeList)`](#calcite-nodelisttoarray-domnodelist-) | Takes a DOM node list and returns an array. |
