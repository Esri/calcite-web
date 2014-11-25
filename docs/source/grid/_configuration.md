## Configuration

If you are using Calcite Web as a SASS library, you can customize the grid with SASS variables. Below are the different settings you have access to and their default values:

```scss
// Breakpoints
$small:                    480px;
$medium:                   860px;
$large:                    1280px;

// Grid Settings
$vw-ratio:                 0.9;
$container-width:          $vw-ratio * 100vw;
$container-min:            0;
$container-max:            $large * $vw-ratio;
$column-gutter:            1rem;

// Grid Fallback Options
$ie8-support:              false;
$column-gutter-fallback:   20px;
$container-width-fallback: 960px;

// Folding Grid Options

// Large
$large-class:              'column';
$large-column-count:       24;

// Medium
$medium-class:             'tablet';
$medium-column-count:      12;

// Small
$small-class:              'phone';
$small-column-count:       6;

// Vertical Rhythm
$vertical-range:           6;
$baseline:                 1.5rem;
```

In your own project, you can override these values to create a custom, project-specific grid. For example, to use a 16 column grid instead of the default 24 columns, you would set the `$large-column-count` variable after importing the library:

```
@import calcite-web;
$large-column-count: 16;
```

