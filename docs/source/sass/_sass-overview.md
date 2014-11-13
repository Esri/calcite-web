# SASS

Using Calcite Web as a SASS library is very powerful. After you successfully import the library (see [the getting started page]({{relativepath}})) you can fully customize and use all of the Calcite Web Framework.

## Custom Build

Calcite comes with the ability to only generate the css you actually need for your project. Class generation is controlled by setting the following variables to `true` or `false`. Setting all of these variables to `false` will prevent Calcite Web from generating **any** css classes while still exposing the complete set of mixins.

```scss
$include-grid:                        true    !default;
  $fold-grid:                         true    !default;
  $block-grid:                        true    !default;

$include-type:                        true    !default;
  $include-header-family:             true    !default;
  $include-body-family:               true    !default;
  $include-secondary-family:          true    !default;
  $include-code-family:               true    !default;
  $include-type-defaults:             true    !default;

// Icons
$include-icons:                       true    !default;
  $include-one-color-icons:           true    !default;
  $include-color-icons:               true    !default;

// Components
$include-alerts:                      true    !default;
$include-tables:                      true    !default;
$include-panel:                       true    !default;
$include-button:                      true    !default;
$include-breadcrumbs:                 true    !default;
$include-tooltip:                     true    !default;

// Patterns
$include-footer:                      true    !default;
$include-pagination:                  true    !default;
$include-side-nav:                    true    !default;
$include-sub-nav:                     true    !default;
$include-third-nav:                   true    !default;
$include-top-nav:                     true    !default;

// Javascript Patterns
$include-tabs:                        true    !default;
$include-modal:                       true    !default;
$include-accordion:                   true    !default;
$include-accordion:                   true    !default;
```


All classes are styled by mixins of the same name, meaning that the `btn` class is simply including the `btn()` mixin. You can style your own elements or classnames to match exactly of the existing classes by including these mixins.

```scss
.my-button-class {
  @include btn()
}

.my-colored-button-class {
  @include btn()
  @include btn-color($value, $hover-value);
}
```
