The Calcite Type System uses a combination of mixins and helper classes to achieve a clear visual style, focusing primarily on simplifying typesetting processes. Using the mixins and classes properly will ensure that all properties are consistent, beautiful, and robust.

### Typefaces

We expose four type families for use in Calcite Web; Avenir Next, Kepler, Frutiger, and Consolas. Each of these type families have a set of weights and styles, defined by their application. For example, Avenir Next has more weights than Frutiger family, reflecting its role as primary UI face, and heavy lifting header face.

The typographic palette for Calcite Web differs slightly from the official Esri branding document. All typefaces are examined in detail below.

Calcite Web provides a set of weights for each typeface. These are used by either using the helper class in html, or writing sass to include the mixin, or extending the helper class. The available weights for each face are below. Proper care has been taken to ensure that all type systems used by Calcite avoid faux-bold and faux-italics styled by the browser.

By default, Calcite Web expects font files to be located at `../`. If your fonts are elsewhere, set the `$font-path` variable

### Vertical Rhythm

Vertical rhythm is maintained in the Calcite Web Type System by the use of the `$baseline` variable. `$baseline` sets a standard and regular leading in relation to the body copy – 1.5rem. This variable is used for any measurement on the vertical axis in the page, including the [leader and trailer grid helper classes](../grid/#leader-and-trailer) and padding for [components like buttons](../components/#buttons) which use standard measurements like `3/$baseline` and `2/$baseline`.

### Proportional Scales

Text sizes are defined by a simple [modular scale](http://alistapart.com/article/more-meaningful-typography). The scale is defined by two base sizes for type - body at 1rem and small at 0.95rem - and extrapolates a series of larger type sizes based on a single ratio; 1.25, or a major third interval. All type sizes are [set in rems](http://snook.ca/archives/html_and_css/font-size-with-rem), which have [more than acceptable browser support](http://caniuse.com/#feat=rem). Rems are used for type sizing and all vertical measurements, defined either by the `$baseline` variable or the [modular scale](../sass/#modular-scale) and [font size](../sass/#font-size) mixins. This prevents odd sizing issues with nested content, unpredictable results with scaling, and provides a solid anchor for determining sizes.
