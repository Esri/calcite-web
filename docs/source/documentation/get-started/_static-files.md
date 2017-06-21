This is probably the easiest way, but you won't get any of the helpful Sass mixins. If you're looking to get up and running quickly, just [download the latest release](https://github.com/ArcGIS/calcite-web/releases) and move the zipped files to wherever you keep your assets (CSS, JavaScript, images). Be sure to use [the documentation site](http://esri.github.io/calcite-web/) to copy and paste patterns, components, and even a sample html boilerplate.

You can also use a hosted version of Calcite Web:

```
<!-- In the head -->
<link rel="stylesheet" href="https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/{{data.pkg.version}}/css/calcite-web.min.css">

<!-- Just before end of body -->
<script src="https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/{{data.pkg.version}}/js/calcite-web.min.js"></script>
```
