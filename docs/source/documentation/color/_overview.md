An extensive set of color variables are set up inside of config. Color names are generally semantic and simple, making them very easy to remember. Color variables are references like any other Sass variable:

```scss
.element-to-style {
  color: $gray;
}
```

There is also a dark theme which you can import using:

```scss
@import "calcite-web-dark";
```

<div class="panel panel-white leader-1 trailer-1 inline-block">
{% icon 'article', size=24, classes="svg-icon margin-right-half" %} To find out more about color usage and guidelines, read the guide: <a href="{{relativePath}}/guides/color/" class="btn btn-clear margin-left-half">Color guide{% icon 'launch', size=16, classes="svg-icon svg-icon-after" %}</a>
</div>
