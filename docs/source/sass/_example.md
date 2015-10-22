```
// custom-build.scss
$generate-css: false;
$include-content-family: true;
$include-secondary-family: true;
$include-code-family: true;
@include-type: true;
@include-grid: true;

@import 'calcite-web'
```

The above sass will import the framework, import all the type options (Avenir, Kepler, Frutiger, and Consolas), and build css that provides access to the type helpers and grid system.