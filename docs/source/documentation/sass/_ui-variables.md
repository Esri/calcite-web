Controls specific aspects and behaviors across the UI.

```scss
$transition: 150ms linear;
$box-shadow: 0 0 16px 0 rgba(0,0,0,0.05) !default;
$easing-function: cubic-bezier(0.215, 0.440, 0.420, 0.880) !default;
$namespace-tables: true !default;
```

`$transition` is a speed and easing function used throughout the framework for motion effects.

`$box-shadow` ensures consistent box shadow effects for adding depths to elements.

`$easing-function` is a default timing function used by moving elements like modals. If you'd like to change how modals move in, you can tweak this variable (or use a browser-supplied funciton like `linear`)

`$namespace-tables` scopes `<table>` styles to the `.table` class. To mimic the behavior of previous versions (where we automatically style raw `table` elements), set this to `false`.
