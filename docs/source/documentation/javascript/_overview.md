Calcite Web includes a small JavaScript library. `calcite-web.js` is a lightweight and dependency-free library made to enable interactive behaviors for certain [patterns](../patterns/) and [components](../components).

Currently, the following components and patterns rely on `calcite-web.js`:

- [Dropdowns](../components/#dropdowns)
- [Modals](../patterns/#modals)
- [Tabs](../patterns/#tabs)
- [Accordions](../patterns/#accordions)
- [Drawers](../patterns/#drawers)

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

To use `calcite-web.js` simply [include a reference to it in your html]({{relativePath}}guides/quickstart/) and then run the `calcite.init()` method. For example, say your JavaScript was located in a file called `script.js`. You can bind all the JavaScript patterns from `script.js` like this:

```js
// On document ready
window.onload = function () {
  // Initialize all calcite.js patterns
  calcite.init();
};
```

You can initialize individual patterns by their own method, for example:

```
calcite.tabs()
```

