Calcite Web includes a small JavaScript library. `calcite-web.js` is a lightweight and dependency-free library made to enable interactive behaviors for certain [patterns](../patterns/) and [components](../components).

Currently, the following components and patterns rely on `calcite-web.js`:

- [Dropdowns](../components/#dropdowns)
- [Modals](../patterns/#modals)
- [Tabs](../patterns/#tabs)
- [Accordions](../patterns/#accordions)
- [Drawers](../patterns/#drawers)
- [Expanding Nav](../patterns/#expanding-nav)

### Loading Calcite as a Module

If you don't use a module loader (you probably should...), Calcite will be available as `window.calcite`. If you do, both flavors of module loaders are also covered below.

#### CommonJS

```js
var calcite = require('calcite-web');
```

#### AMD

```js
require(['path/to/calcite-web.js'], function(calcite){
  // use calcite
});
```

### Initializing

To use `calcite-web.js` simply [include a reference to it in your html](../patterns#basic-html-page) and then run the `calcite.init()` method. For example, say your JavaScript was located in a file called `script.js`. You can bind all the JavaScript patterns from `script.js` like this:

```js
// On document ready
window.onload = function () {
  // Initialize all calcite.js patterns
  calcite.init();
};
```

To only initialize some patterns, you can pass an array of patterns, and only those will be initialized:

```js
calcite.init(['modal', 'drawer']);
```

You can also initialize individual patterns by their own method, for example:

```
calcite.tabs()
```

Finally, an element can be passed to a pattern method, and only the patterns within that element will be initialized. Like this:

```
var tabs = document.querySelector('.my-tab-class')
calcite.tabs(tabs)
```

This is helpful if you are using a different JavaScript framework and you need to rebind event listeners for a particular pattern or DOM node.
