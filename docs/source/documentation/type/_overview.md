Calcite Web primarily uses Avenir Next, but also provides a system monospace stack. All font-weights and faces can be set either with [helper classes](#avenir) or [Sass mixins](../sass/#font-families).

### Internationalization

Almost every major language is styled for you, automatically. In most latin-based languages, everything can be rendered in Avenir Next. Some languages, however, use characters that aren't included in Avenir Next. For each of these languages, Calcite Web will load a font that maintains a similar look and feel.

Non-latin character sets are pulled in only when needed, so if your application is in English, the browser will only load the files it needs for displaying English. This is accomplished by using the `unicode-range` property in the `@font-face` declaration. To learn more about internationalization and to see all of the languages that Calcite Web supports, check out the [i18n example page](../../examples/i18n/).

### Use Behind a Firewall

Fonts in Calcite Web are loaded from the Esri CDN, but if you are working on an Esri product that will be deployed behind a firewall, you can also host the files yourself, locally.

For more instructions on setting up locally-hosted fonts, view the [Calcite Fonts](https://github.com/ArcGIS/calcite-fonts) project. *Note:* due to license restrictions these files can only be made available for Esri product teams.

### Vertical Rhythm

Vertical rhythm is maintained in the Calcite Web Type System by the use of the `$baseline` variable. `$baseline` sets a standard and regular leading in relation to the body copy – 1.5rem. This variable is used for any measurement on the vertical axis in the page, including the [leader and trailer grid helper classes](../grid/#leader-and-trailer) and padding for [components like buttons](../components/#buttons) which use standard measurements like `3/$baseline` and `2/$baseline`.

### Proportional Scales

Text sizes are defined by a [modular scale](http://alistapart.com/article/more-meaningful-typography). The scale is defined by two base sizes for type - body at 1rem and small at 0.95rem - and extrapolates a series of larger type sizes based on a single ratio; 1.25, or a major third interval. All type sizes are [set in rems](http://snook.ca/archives/html_and_css/font-size-with-rem), which have [more than acceptable browser support](http://caniuse.com/#feat=rem). Rems are used for type sizing and all vertical measurements, defined either by the `$baseline` variable or the [modular scale](../sass/#modular-scale) and [font size](../sass/#font-size) mixins. This prevents odd sizing issues with nested content, unpredictable results with scaling, and provides a solid anchor for determining sizes.