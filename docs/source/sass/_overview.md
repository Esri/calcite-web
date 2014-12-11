<h1 class="leader-0" id="overview">SASS</h1>

Using Calcite Web as a SASS library is very powerful. After you successfully import the library (see [the getting started page](../) you can fully customize and use all of the Calcite Web Framework.

## Custom Build

Calcite comes with the ability to only generate the css you actually need for your project. Class generation is controlled by setting the following variables to `true` or `false`. Setting all of these variables to `false` will prevent Calcite Web from generating **any** css classes while still exposing the complete set of mixins.

For example, if didn't want to export the css for any of the type helpers, you would simply set the `$include-type` variable to false:

```
@import "calcite-web";
$include-type: false;
```

Now in your project, you still have access to type mixins like `word-spacing()` and `tracking()` but your generated css file will have none of the generated static classes. Below are a list of all the configurable 'include' variables and a description of what they toggle on and off.

| Variable                    | Description                                                              |
| --------------------------- | ------------------------------------------------------------------------ |
| `$include-grid`             | Everything grid related (viewport grid, block grid, and responsive grid) |
| `$fold-grid`                | Responsive grid classes and media queries                                |
| `$block-grid`               | Block grid classes and media queries                                     |
| `$include-type`             | All type related classes                                                 |
| `$include-header-family`    | Header family classes                                                    |
| `$include-body-family`      | Body family classes                                                      |
| `$include-secondary-family` | Secondary family classes                                                 |
| `$include-code-family`      | Code family classes                                                      |
| `$include-type-defaults`    | All default styles for type elements                                     |
| `$include-icons`            | All icon sets, colors, and sizes                                         |
| `$include-one-color-icons`  | The monochromatic icon set                                               |
| `$include-color-icons`      | The full color icon set                                                  |
| `$include-alerts`           | Alert styles and color modifier classes                                  |
| `$include-tables`           | Table styles and modifier classes                                        |
| `$include-panel`            | Panel styles and color modifier classes                                  |
| `$include-button`           | Button styles and all modifier classes (size, colors, disabled, etc)     |
| `$include-breadcrumbs`      | Breadcrumb styles and modifier classes                                   |
| `$include-tooltip`          | Tooltip styles and modifier classes                                      |
| `$include-footer`           | Footer styles                                                            |
| `$include-pagination`       | Pagination styles                                                        |
| `$include-side-nav`         | Side nav styles                                                          |
| `$include-sub-nav`          | Sub Nav styles and modifiers                                             |
| `$include-third-nav`        | Third nav styles and modifiers                                           |
| `$include-top-nav`          | All top navigation elements, media queries, and encompassed patterns     |
| `$include-tabs`             | Tab styles and modifier classes                                          |
| `$include-modal`            | Modal styles                                                             |
| `$include-accordion`        | Accordian styles                                                         |

## Custom Selectors

All classes are styled by mixins of the same name, meaning that the `btn` class is simply including the `btn()` mixin. You can style your own elements or classnames to match exactly that of the existing classes by including these mixins.

```scss
.my-button-class {
  @include btn()
}

.my-colored-button-class {
  @include btn()
  @include btn-color($value, $hover-value);
}
```

In this manner you can extend the classnames of some other existing framework with the visual style of the Calcite Web framework.
