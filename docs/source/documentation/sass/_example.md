```
// custom-build.scss
$generate-css: false;
$include-content-family: true;
$include-secondary-family: true;
$include-code-family: true;
$include-type: true;
$include-type-defaults: true;
$include-type-helpers: true;
$include-grid: true;
$fold-grid:  true;
$block-grid: true;
$include-leader-trailer: true;
$include-gutter: true;
$include-left-right: true;
$include-show-hide: true;
$include-sticky: true;
@import 'calcite-web'
```

The above sass will import the framework, import all the type options (Avenir, Kepler, Frutiger, and Consolas), and build css that provides access to the type helpers and grid system.
