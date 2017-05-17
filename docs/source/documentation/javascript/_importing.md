Calcite Web can be imported using ES6 modules, CommonJS, AMD, or just a plain IIFE.

### ES6 Module

If your bundler supports the ES6 module syntax you can import calcite as an ES6 module with named exports:

```js
import * as calcite from 'calcite-web/es6';
calcite.init();
```

If your bundler uses the `module` field in `package.json` (Rollup, Webpack 2) leave off the `es6`:

```js
import * as calcite from 'calcite-web';
calcite.init();
```

With named imports you can also just import what you need:

```js
import {drawer} from 'calcite-web';
drawer(); // initialize only instances of the drawer pattern
```

This is a great way to cut down on the size of your build!

### CommonJS

```js
var calcite = require('calcite-web');
calcite.init();
```

#### AMD

```js
require(['path/to/calcite-web.js'], function(calcite){
  // use calcite
  calcite.init();
});
```

#### IIFE

If `calcite-web.js` is used on a page with no module syntax, it will just attach itself to `window.calcite`. Here is an example which initializes Calcite from a hosted file on S3:

```html
<body>
  ...
  <script src="https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/{{data.pkg.version}}/js/calcite-web.min.js"></script>
  <script>
     calcite.init()
  </script>
</body>
```

### Initializing

While all of the examples above use the main `init()` method, you can also initialize individual patterns. For example, initialize only instances of the tab pattern like this:

```
calcite.tabs();
```
