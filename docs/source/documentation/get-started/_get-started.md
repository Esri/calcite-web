Calcite Web is a CSS framework built with [Sass](http://sass-lang.com/). 

Calcite Web was built *for* developers. It is meant to be flexible enough that you can accomplish 80% of your website with the default patterns. If you use Calcite Web as a Sass library, you'll also get a set of very helpful mixins to help you make new patterns and components that fit in with the Calcite methodology and aesthetic.

<div class="panel panel-white leader-1 trailer-2 inline-block">
{% icon 'article', size=24, classes="svg-icon margin-right-half" %} First time using Calcite Web? Check out the guide: <a href="{{relativePath}}/guides/quickstart/" class="btn btn-clear margin-left-half">Quickstart guide{% icon 'launch', size=16, classes="svg-icon svg-icon-after" %}</a>
</div>

## Using Calcite Web

There are three ways to use Calcite Web:

- (a) copying static files into your project
- (b) installing via a package manager
- (c) loading files from the cdn

By default, Calcite Web expects image files to be located at `../`. If your fonts are elsewhere, set the `$font-path` variable

Using this framework as a Sass library will give you the most power, but whatever your flavor, we have you covered.

If you are migrating from Tailcoat, checkout the [migration guide]({{relativePath}}/guides/migration-guide/).

Calcite Web is an open project, that anyone can use to make web apps. However, some of our resources are not. Using Calcite Web on any project that does not live at an Esri or ArcGIS domain will not have access to any of Esri's brand typefaces. You can load a version of the framework without typefaces by using `calcite-web-no-fonts.css`.
