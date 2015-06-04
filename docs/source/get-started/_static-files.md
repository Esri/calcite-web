This is probably the easiest way, but you won't get any of the helpful Sass mixins. If you're looking to get up and running quickly, just [download the latest release](https://github.com/ArcGIS/calcite-web/releases) and move the zipped files to wherever you keep your assets (CSS, JavaScript, images). Be sure to use [the documentation site](http://esri.github.io/calcite-web/) to copy and paste patterns, components, and even a sample html boilerplate.

*A CDN is being planned for future releases, allowing you to reference Calcite Web static assets on a server.*

When used statically, one very helpful thing to know is that Calcite Web comes bundled with several modifier classes. For example, if you need to add some margin to the top of an element, instead of writing a class and adding it yourself, you can use the built in `leader-X` class:

```html
<div class="leader-3">
  This item will get three 'lines' of margin at the top.
</div>
```

This will keep spacing consistent and you won't have to write any CSS! There are modifier classes for virtually everything: padding, margin, text-color, background-color, etc. Be sure to read [the documentation](http://esri.github.io/calcite-web/grid/) to learn what is possible.
