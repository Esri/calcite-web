By default, using the Calcite Web sass files will build css  for the complete framework. This build can be customized, or entirely turned off for sass-only applications.

Setting the `$generate-css` variable to false in your sass files will prevent any css from being generated, while exposing all the underlying sass styles of the framework. Setting specific variables like `$include-alerts` to false will preclude only that components css from being built.

Additionally, font imports are controlled this way. By default, Calcite Web requests Avenir Next from a cdn. You can import `calcite-web-no-fonts.scss` if you don't want the fonts.

```
// Sass Output
$include-colors:                 true    !default;
$generate-css:                   true    !default;

// Language Helpers
$include-right-to-left:          $generate-css    !default;

// Grid Output
$include-reset:                  $generate-css    !default;
$include-utils:                  $generate-css    !default;

$include-grid:                   $generate-css    !default;
  $fold-grid:                    $generate-css    !default;
  $block-grid:                   $generate-css    !default;

// Grid Utilities Output
$include-leader-trailer:         $generate-css    !default;
$include-gutter:                 $generate-css    !default;
$include-left-right:             $generate-css    !default;
$include-show-hide:              $generate-css    !default;
$include-sticky:                 $generate-css    !default;

// Type Output
$include-type:                   $generate-css    !default;
  $include-primary-family:       true             !default;
  $include-code-family:          $generate-css    !default;
  $include-i18n:                 $generate-css    !default;
  $include-type-defaults:        $generate-css    !default;
  $include-type-helpers:         $generate-css    !default;

// Icons
$include-icons:                  $generate-css    !default;
  $include-calcite-icons:        $generate-css    !default;
  $include-social-icons:         $generate-css    !default;
  $include-icon-font:            $generate-css    !default;

// Components
$include-alerts:                 $generate-css    !default;
$include-badges:                 $generate-css    !default;
$include-labels:                 $generate-css    !default;
$include-tables:                 $generate-css    !default;
$include-panel:                  $generate-css    !default;
$include-button:                 $generate-css    !default;
$include-dropdowns:              $generate-css    !default;
$include-breadcrumbs:            $generate-css    !default;
$include-tooltip:                $generate-css    !default;
$include-forms:                  $generate-css    !default;
$include-input-groups:           $generate-css    !default;
$include-loader:                 $generate-css    !default;
$include-skip-to-content:        $generate-css    !default;
$include-logo:                   $generate-css    !default;
$include-card:                   $generate-css    !default;
$include-animation:              $generate-css    !default;

// Patterns
$include-footer:                 $generate-css    !default;
$include-sticky-footer:          $generate-css    !default;
$include-pagination:             $generate-css    !default;
$include-side-nav:               $generate-css    !default;
$include-sub-nav:                $generate-css    !default;
$include-third-nav:              $generate-css    !default;
$include-top-nav:                $generate-css    !default;
$include-user-nav:               $generate-css    !default;
$include-app-switcher:           $generate-css    !default;

// Javascript
$include-tabs:                   $generate-css    !default;
$include-modal:                  $generate-css    !default;
$include-accordion:              $generate-css    !default;
$include-drawers:                $generate-css    !default;
$include-sticky:                 $generate-css    !default;
$include-filter-dropdown:        $generate-css    !default;
```
