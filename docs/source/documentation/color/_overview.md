An extensive set of color variables are set up inside of config. Color names are generally semantic and simple, making them very easy to remember. Color variables are references like any other Sass variable:

```scss
.element-to-style{
  color: $gray;
}
```

There is also a dark theme which you can import using:

```
@import "calcite-web-dark";
```

<div class="panel panel-blue leader-2 inline-block">
  <span class="margin-right-half icon-ui-idea"> To find accessible color combinations that pass WCAG 2.0 AA guidelines, try the</span> <a href="{{relativePath}}/guides/a11y#color-finder" class="btn btn-white margin-left-">Color Finder</a></div>
