Controls specific aspects and behaviors across the UI.

```scss
$transition: 150ms linear;
$box-shadow: 0 0 16px 0 rgba(0,0,0,0.05) !default;
$drawer-width: 280px !default;
$easing-function: cubic-bezier(0.215, 0.440, 0.420, 0.880) !default;
$prefix-tables: true !default;
```

`$transition` is a speed and easing function used throughout the framework for motion effects.

`$box-shadow` ensures consistent box shadow effects for adding depths to elements.

`$drawer-width` controls the width of the hidden left and right drawers.

`$easing-function` should be documented here.

`$prefix-tables` scopes `<table>` styles to the `.table` class. To mimic the behavior of previous versions, set this to `false`.
