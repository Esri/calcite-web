Calcite Web is a CSS framework built with [Sass](http://sass-lang.com/). A dependency-free JavaScript library for use with interactive patterns like tabs and modals is also included.

Calcite Web is a web adaptation of Calcite, the desktop framework developed for ArcGIS Pro. The idea is to have designs be consistent, but also embrace the characteristics that make each medium unique.

Calcite Web was built *for* developers. It is meant to be flexible enough that you can accomplish 80% of your website with the default patterns. If you use Calcite Web as a Sass library, you'll also get a set of very helpful mixins to help you make new patterns and components that fit in with the Calcite methodology and aesthetic.

## Using Calcite Web

There are three ways to use Calcite Web:

- (a) copying static files into your project
- (b) installing via a package manager
- (c) loading files from the cdn

By default, Calcite Web expects image files to be located at `../`. If your fonts are elsewhere, set the `$font-path` variable

Using this framework as a Sass library will give you the most power, but whatever your flavor, we have you covered.

If you are migrating from Tailcoat, checkout the [migration guide]({{relativePath}}/guides/migration-guide/).

Calcite Web is an open project, that anyone can use to make web apps. However, some of our resources are not. Using Calcite Web on any project that does not live at an Esri or ArcGIS domain will not have access to any of Esri's brand typefaces. You can load a version of the framework without typefaces by using `calcite-web-no-fonts.css`.
