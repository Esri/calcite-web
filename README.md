**CAUTION: UNDER ACTIVE DEVELOPMENT**

![](https://camo.githubusercontent.com/4a7cf94aedbd23c13cc2d75fdc3b2af5c816c208/687474703a2f2f7374617469632e646967672e636f6d2f7374617469632f696d616765732f6469676765722e676966)

(don't use this yet unless you really know what you're doing)

---

# Calcite-Web

Authoritative font-end development resources for Calcite design initiative. Includes extendable base components and styles, as well as a modular and effecient framework for ArcGIS properties.

# Using Calcite-Web

There are two main ways to use Calcite-Web: copying static files into your project and installing via a package manager. Whatever your flavor, we probably have you covered.

## Static Files

This is probably the easiest way. If you're looking to get up and running quickly, just [download the latest release](https://github.com/ArcGIS/calcite-web/releases) and move the zipped files to wherever you keep you assets. Be sure to use [the documentation site](http://arcgis.github.io/calcite-web/) to copy and paste patterns, components, and even a sample html boilerplate.

## Ruby Gem

To install Calcite-Web as a ruby gem, add a reference to your the gem to your Gemfile:

```
gem "calcite-web", :git => "https://github.com/ArcGIS/calcite-web.git", :tag => "v0.0.0"
```

Be sure to use the most up to date tag.

Then in your project's sass file, just import it:

```
@import "calcite-web";
```

That will give you everything including sass utilities. You will also need to copy over the javascript and image assets to your static folder (see above).

## NPM

To install Calcite Web with npm, type:

```
npm install --save-dev git://github.com/ArcGIS/calcite-web.git
```

You can also use a specific release by appending the version number to the end:

```
npm install --save-dev git://github.com/ArcGIS/calcite-web.git#v0.0.1
```

Then, if you're using sass, be sure to add `node_modules/calcite-web/dist/sass/` to your load path. If you're using `grunt-contrib-sass` you add that like this:

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

# Contributing to Calcite-Web

## Installing

If you don't have Node yet, [install it here](http://nodejs.org/). Then install the project's dependencies:

1. `npm install -g grunt-cli` to install Grunt.
2. `npm install` to install javascript dependencies.

## Development

To run a dev environment, just type `grunt`. You should have a copy of the documentation site live at `localhost:8888`.

As you develop features and fix bugs, be sure to write notes in `CHANGELOG.md`.

# Releasing a New Version

Calcite-Web uses SemVer (Semantic Versioning) for its releases. This means that version numbers are basically formatted like `MAJOR.MINOR.PATCH`. If you're well aquainted with SemVer you should skip to 'Bumping the Version' below.

#### Major

Breaking changes are signified with a new **first** number. For example, moving from 1.0.0 to 2.0.0 implies breaking changes.

#### Minor

New components, new helper classes, or substantial visual changes to existing components and patterns are *minor releases*. These are signified by the second number changing. So from 1.1.2 to 1.2.0 there are minor changes.

#### Patches

The final number signifies patches such as fixing a pattern or component in a certain browser, or fixing an existing bug. Small changes to the documentation site and the tooling around the Calcite-Web library are also considered patches.

## Bumping the Version

1. Change the version number in `package.json` to the desired version number.
2. Write a description of the changes, additions, and bug fixes in `CHANGELOG.md`.
3. Make sure `ArcGIS/calcite-web` is up-to-date with your changes.
5. Run `grunt release` and enter your userame and password in the command prompt.

# Updating the Documentation Site

To update the documentation site, just make sure you have push access to the `ArcGIS/calcite-web` repo and type `grunt deploy`. This will build the site and deploy to gh-pages.

The site should be updated at http://arcgis.github.io/calcite-web/ in just a few moments.
