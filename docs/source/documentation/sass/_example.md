```
// custom-build.scss
$generate-css: false;
$include-type: true;
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

The above sass will import the framework, import the type styles, and build css that provides access to the type helpers and grid system. Notice that the variable declarations are *before* the import.
