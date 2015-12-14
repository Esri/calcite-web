# Calcite Web

Calcite Web is a web design framework that implements the Esri Brand Guidelines and Calcite design framework for browser-based properties and products. Calcite Web is written in [Sass](http://sass-lang.com/), and is compatible with both the standard Sass ruby gem and the [Libsass](http://libsass.org/) compiler. The project also includes a dependency-free JavaScript library for use with interactive patterns.

# Using Calcite Web

There are two main ways to use Calcite Web: copying static files into your project and installing via a package manager. Whatever your flavor, we probably have you covered.

## Static Files

This is probably the easiest way. If you're looking to get up and running quickly, just [download the latest release](https://github.com/esri/calcite-web/releases) and move the zipped files to wherever you keep you assets. Be sure to use [the documentation site](http://esri.github.io/calcite-web/) to copy and paste patterns, components, and even a sample html boilerplate.

## Ruby Gem

To install Calcite Web as a ruby gem, reference the gem from your `Gemfile`:

```
gem "calcite-web", :git => "https://github.com/Esri/calcite-web.git", :tag => "current.tag.version"
```

Be sure to use the replace `current.tag.version` with [the most up to date tag](https://github.com/Esri/calcite-web/releases).

This makes Calcite Web available as a Compass extension. To use Calcite Web, make sure you require the gem in your compass config file (usually found at `config/compass.rb`). an example config file might look like this:

```ruby
require 'calcite-web'

css_dir = "stylesheets"
sass_dir = "sass"
```

Then in your project's sass files, just import it:

```
@import "calcite-web";
```

That will give you everything including sass utilities. You will also need to copy over the JavaScript and image assets to your static folder (see above). If you're installing Calcite Web as a gem, it will automatically inc


## NPM

To install Calcite Web with npm, type:

```
npm install --save-dev Esri/calcite-web#v1.0.0-beta
```

You must add the current version in order to get the `dist/` folder.

If you're using sass, be sure to add `node_modules/calcite-web/dist/sass/` to your load path. If you're using `grunt-contrib-sass` you add that like this:

```
'sass': {
  target: {
    options: {
      loadPath: 'node_modules/calcite-web/dist/sass/'
    },
    files: {
      'path/to.css': 'path/to.scss'
    }
  }
}
```

Then in your main `.scss` file, you can just require the framework: `@import "calcite-web";`.


# Why Calcite Web?

The primary goal of Calcite Web is create a unified visual language for all esri.com and arcgis.com projects. The secondary goal of Calcite Web is to make it as easy as possible to implement high quality design patterns in a way that is appropriate to both the project at hand and the design strategies of Esri as a whole.

Calcite Web was built for developers. It is meant to be flexible enough that you can accomplish 80% of your website with the default patterns writing only html markup. If you use Calcite Web as a Sass library, you'll also get a set of very helpful mixins to help you make new patterns and components that fit in with the Calcite methodology and aesthetic.

## Calcite Web as a Framework Dependency

Calcite Web has the ability to exist exclusively as a Sass library, not generating a single line of CSS. Including the framework in this way may seem counter intuitive - the whole project would compile to an empty file - but allows for some powerful and meaningful applications. Using Calcite Web in this way allows for the creation of new frameworks or themes for any given structure that duplicates no stylistic code or decisions. This means that a project like Calcite for Dojo or Calcite for Bootstrap can each use different patterns of HTML markup to achieve components that are identical to their Calcite Web counterparts.

For example, a Bootstrap button would simply extend the existing Calcite Web buttons instead of recreating the CSS that controls the styles like so:

```
.btn {
	@include btn();
}
.bnt-default {
	@include btn-color($blue, $dark-blue);
}
```

## Calcite Web vs. Other Frameworks

Calcite Web, while still a CSS Framework, has some profound  differences from projects like [Bootstrap](http://getbootstrap.com/) or [Foundation](http://foundation.zurb.com/). Where Bootstrap and Foundation both aim to provide a robust set of patterns and utilities for the general, third party developer, Calcite Web **only** concerns itself with Esri projects. Calcite Web is not designed for a developer who is not directly working for Esri on Esri products or properties. In other words, every project created with Calcite Web will look like an Esri-branded site.


