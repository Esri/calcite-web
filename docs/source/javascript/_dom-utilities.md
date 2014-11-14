# DOM utilities

The following functions allow for basic DOM manipulation and traversal. These helpers are used by JavaScript dependent patterns, and can be included in any custom JavaScript in Calcite Web projects.

## events

### calcite.dom.event()

Returns interaction event for the current browser environment. Currently only returns `'click'`. Will be more useful when touch support is added.

```
var event = calcite.dom.event(); // => 'click'
```

### calcite.dom.addEvent(domNode, event, fn)

Adds a callback function to an event on an element.

```
var event = calcite.dom.event();
var node = document.getElementsByTagName('body')[0];

function action (event) {
  console.log('hola');
};

calcite.dom.addEvent(node, event, action); // action will now fire when body is clicked
```

### calcite.dom.removeEvent(domNode, event, fn)

Removes a callback function from an event on an element.

```
var event = calcite.dom.event();
var node = document.getElementsByTagName('body')[0];

function action (event) {
  console.log('hola');
};

calcite.dom.addEvent(node, event, action); // action will now fire when body is clicked
calcite.dom.removeEvent(node, event, action); // action has been removed from body click event
```

### calcite.dom.eventTarget(event)

Returns the target DOM node of an event.

```
var event = calcite.dom.event();
var node = document.getElementsByTagName('body')[0];

function action (event) {
  var target = calcite.dom.eventTarget(event);
  console.log(target);
};

calcite.dom.addEvent(node, event, action);
```

Clicking the body will now log the contents of the `<body>` DOM node.

### calcite.dom.preventDefault(event)

Prevents default behavior of an event.

```
var event = calcite.dom.event();
var node = document.getElementsByTagName('a')[0];

function action (event) {
  calcite.dom.preventDefault(event);
};

calcite.dom.addEvent(node, event, action);
```

This will prevent the first `<a>` DOM node in the document from performing its default behavior (sending the user to the link in its `href` attribute).

### calcite.dom.stopPropagation(event)

Stops an event from bubbling up the DOM tree. This is useful if events have been bound to both a parent DOM node and a child DOM node.

```
var event = calcite.dom.event();
var node = document.getElementsByTagName('a')[0];

function action (event) {
  calcite.dom.stopPropagation(event);
};

calcite.dom.addEvent(node, event, action);
```

If, for example, the `<body>` DOM node also has a function bound to a click event, this will prevent a user's click from triggering it.

## manipulation & traversal

### calcite.dom.hasClass(event)
### calcite.dom.addClass(domNode, event, fn)
### calcite.dom.removeClass(domNode, event, fn)
### calcite.dom.closest(domNode, classes)
### calcite.dom.getAttr(className, context)
### calcite.dom.nodeListToArray(domNodeList)
