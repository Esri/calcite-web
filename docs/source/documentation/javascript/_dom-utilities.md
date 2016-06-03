The following functions allow for basic DOM manipulation and traversal. These helpers are used by JavaScript dependent patterns, and can be included in any custom JavaScript in Calcite Web projects.

## Events

### calcite.click()

Returns interaction event for the current browser environment. Currently only returns `'click'`. Will be more useful when touch support is added.

```js
var click = calcite.click(); // => 'click'
```

### calcite.addEvent(domNode, event, fn)

Adds a callback function to an event on an element.

```js
var click = calcite.click();
var node = document.querySelector('body');

function action (event) {
  console.log('hola');
};

calcite.addEvent(node, click, action); // action will now fire when body is clicked
```

### calcite.removeEvent(domNode, event, fn)

Removes a callback function from an event on an element.

```js
var click = calcite.click();
var node = document.querySelector('body');

function action (event) {
  console.log('hola');
};

calcite.addEvent(node, click, action); // action will now fire when body is clicked
calcite.removeEvent(node, event, action); // action has been removed from body click event
```

### calcite.eventTarget(event)

Returns the target DOM node of an event.

```js
var click = calcite.click();
var node = document.querySelector('body');

function action (event) {
  var target = calcite.eventTarget(event);
  console.log(target);
};

calcite.addEvent(node, click, action);
```

Clicking the body will now log the contents of the `<body>` DOM node.

### calcite.preventDefault(event)

Prevents default behavior of an event.

```js
var click = calcite.click();
var node = document.getElementsByTagName('a')[0];

function action (event) {
  calcite.preventDefault(event);
};

calcite.addEvent(node, click, action);
```

This will prevent the first `<a>` DOM node in the document from performing its default behavior (sending the user to the link in its `href` attribute).

### calcite.stopPropagation(event)

Stops an event from bubbling up the DOM tree. This is useful if events have been bound to both a parent DOM node and a child DOM node.

```js
var click = calcite.click();
var node = document.getElementsByTagName('a')[0];

function action (event) {
  calcite.stopPropagation(event);
};

calcite.addEvent(node, click, action);
```

If, for example, the `<body>` DOM node also has a function bound to a click event, this will prevent a user's click from triggering it.

## Manipulation & Traversal

### calcite.hasClass(node, class)

Checks if the `node` currently has the provided `class`. For example, given the following html:

```html
<div class="apple" id="test"></div>
```

The `hasClass` utility can be used as follows:

```js
var node = document.getElementById('test');
var isApple = calcite.hasClass(node, 'apple');
console.log(isApple); // true
```

### calcite.addClass(domNode, classes)

Adds one or more classes to a given element. Multiple classes should be passed as a space-separated string, like this:

```js
var node = document.getElementById('test');
calcite.addClass(node, 'apples bananas oranges');
```

### calcite.removeClass(domNode, classes)

Removes one or more classes from an element. Like `addClass`, multiple classes should be separated with a space and passed as a single string:

```js
var node = document.getElementById('test');
calcite.removeClass(node, 'apples bananas oranges');
```

### calcite.toggleClass(domNode, className)

Adds the class to the element if it doesn't have the class, otherwise, remove it:

```js
var node = document.querySelector('.test');
calcite.toggleClass(node, 'test'); // remove test class
calcite.toggleClass(node, 'test'); // add test class
```

### calcite.closest(class, element)

Searches up the DOM tree to find the closest parent element with a given class.

```js
var nodes = document.querySelector('.child-element');

function clickHandler (event) {
  var closestNode = calcite.closest('parent-class', event.target);
}

for (var i = 0; i < nodes.length; i++) {
  calcite.addEvent(nodes[i], calcite.click(), clickHandler);
}
```

### calcite.nodeListToArray(domNodeList)

Turn a node list (usually returned from a query) into an array.

```js
var nodes = document.getElementsByTagName('a');
var nodeArray = calcite.nodeListToArray(nodes);
```

