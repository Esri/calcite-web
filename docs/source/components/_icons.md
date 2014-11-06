## Icons

Calcite Web provides several sets of icons for use on the web. Each set is a thematic grouping of icons. For color icons, each icon is simply a class that adds a specific `.svg` file as a background image.

For monochromatic icons, the icons are built and distributed as an icon font. In this way, you can change the icon's color by using the `color` property in css.

Icons produce a fair bit of css (one line for each icon). Because of this, if you're using sass, it's recommended that you only include the icon sets that you actually plan on using. You can do this in your configuration file by setting the following variables:

```scss
$include-icons:             true;
  $include-one-color-icons: true;
  $include-color-icons:     true;
```

If you set these to false,