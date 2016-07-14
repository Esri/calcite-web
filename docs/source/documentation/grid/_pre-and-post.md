Pre and Post classes are used to move your columns laterally across the grid by defining how many columns they should be from their neighbors on either side.

Pre and Post classes do not responsively fold. This prevents a `pre-5` from pushing content off the edge of the screen on phone sizes. Responsive `tablet-` and `phone-` classes are exposed for defining pre and post behavior on breakpoints.

Pre and post helpers are available from `.pre-1` and `.post-1` to `.pre-24` and `.post-24`.

**Note:** While a single DOM element *can* have both pre and post helpers, putting both on a single node can cause problems when switching a layout for right to left languages.

If problems occur in a layout, use the `rtl-` prefix to explicitly assign `pre` and `post` classes to the right to left layout.

[View the example]({{relativePath}}page-layouts/grid#pre-and-post)
