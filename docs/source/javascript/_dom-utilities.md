# DOM utilities

The following functions allow for basic DOM manipulation and traversal. These helpers are used by JavaScript dependent patterns, and can be included in any custom JavaScript in Calcite Web projects.

## Events

### calcite.dom.event()

Returns interaction event for the current browser environment. Currently only returns `'click'`. Will be more useful when touch support is added.

```js
var event = calcite.dom.event(); // => 'click'
```

### calcite.dom.addEvent(domNode, event, fn)

Adds a callback function to an event on an element.

```js
var event = calcite.dom.event();
var node = document.getElementsByTagName('body')[0];

function action (event) {
  console.log('hola');
};

calcite.dom.addEvent(node, event, action); // action will now fire when body is clicked
```

### calcite.dom.removeEvent(domNode, event, fn)

Removes a callback function from an event on an element.

```js
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

```js
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

```js
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

```js
var event = calcite.dom.event();
var node = document.getElementsByTagName('a')[0];

function action (event) {
  calcite.dom.stopPropagation(event);
};

calcite.dom.addEvent(node, event, action);
```

If, for example, the `<body>` DOM node also has a function bound to a click event, this will prevent a user's click from triggering it.

## Manipulation & Traversal

### calcite.dom.hasClass(node, class)

Checks if the `node` currently has the provided `class`. For example, given the following html:

```html
<div class="apple" id="test"></div>
```

The `hasClass` utility can be used as follows:

```js
var node = document.getElementById('test');
var isApple = calcite.dom.hasClass(node, 'apple');
console.log(isApple); // true
```

### calcite.dom.addClass(domNode, classes)

Adds one or more classes to a given element. Multiple classes should be passed as a space-separated string, like this:

```js
var node = document.getElementById('test');
calcite.dom.addClass(node, 'apples bananas oranges');
```

### calcite.dom.removeClass(domNode, event, fn)

Removes one or more classes from an element. Like `addClass`, multiple classes should be separated with a space and passed as a single string:

```js
var node = document.getElementById('test');
calcite.dom.removeClass(node, 'apples bananas oranges');
```

### calcite.dom.closest(class, element)

Searches up the DOM tree to find the closest parent element with a given class.

```js
var nodes = document.querySelector('.child-element');

function clickHandler (event) {
  var closestNode = dom.closest('parent-class', event.target);
  console.log(closestElement);
}

for (var i = 0; i < nodes.length; i++) {
  dom.addEvent(nodes[i], dom.event(), clickHandler);
}
```

### calcite.dom.getAttr(element, attribute)

For a given element, get the value of a specific attribute.

```js
var node = document.getElementsByTagName('input')[0];
var value = calcite.dom.getAttr(node, 'value');
console.log(value);
```

### calcite.dom.nodeListToArray(domNodeList)

Turn a node list (usually returned from a query) into an array.

```js
var nodes = document.getElementsByTagName('a');
var nodeArray = calcite.dom.nodeListToArray(nodes);
```

