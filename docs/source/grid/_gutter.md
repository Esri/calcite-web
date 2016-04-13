Adds padding the the left or right of an element. For example, `<div class="gutter-left-3">` will receive three units of padding on its left side.

Responsive `tablet-` and `phone-` classes are exposed for defining gutter and gutter behavior on breakpoints.

**Note:** While a single DOM element *can* have both gutter-left and gutter-right helpers, putting both on a single node can cause problems when switching a layout for right to left languages.

If problems occur in a layout, use the `rtl-` prefix to explicitly assign `gutter` classes to the right to left layout.

