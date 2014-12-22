**CAUTION: UNDER ACTIVE DEVELOPMENT**

![](https://camo.githubusercontent.com/4a7cf94aedbd23c13cc2d75fdc3b2af5c816c208/687474703a2f2f7374617469632e646967672e636f6d2f7374617469632f696d616765732f6469676765722e676966)

(don't use this yet unless you really know what you're doing)

---

# Calcite-Web

Authoritative font-end development resources for Calcite design initiative. Includes extendable base components and styles, as well as a modular and efficient framework for Esri properties.

# Using Calcite-Web

There are two main ways to use Calcite-Web: copying static files into your project and installing via a package manager. Whatever your flavor, we probably have you covered.

## Static Files

This is probably the easiest way. If you're looking to get up and running quickly, just [download the latest release](https://github.com/esri/calcite-web/releases) and move the zipped files to wherever you keep you assets. Be sure to use [the documentation site](http://esri.github.io/calcite-web/) to copy and paste patterns, components, and even a sample html boilerplate.

## Ruby Gem

To install Calcite-Web as a ruby gem, add a reference to your the gem to your Gemfile:

```
gem "calcite-web", :git => "https://github.com/Esri/calcite-web.git", :tag => "v0.0.0"
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
npm install --save-dev git://github.com/Esri/calcite-web.git
```

You can also use a specific release by appending the version number to the end:

```
npm install --save-dev git://github.com/Esri/calcite-web.git#v0.0.1
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

# Contributing to Calcite Web

Installing Calcite Web was designed to be fairly painless. If you have any problems, be sure to [submit an issue](https://github.com/Esri/calcite-web/issues/).

### Install Dependencies

Calcite Web has three main dependencies. If you already have these on your computer, you can skip these steps:

1. Visit [nodejs.org](http://nodejs.org/) to install Node.
2. `npm install -g grunt-cli` to install Grunt.
3. `gem install sass` to install SASS.

### Fork the Repository

All the code for Calcite Web lives [on GitHub](https://github.com/esri/calcite-web). We use the [fork and pull model](https://help.github.com/articles/using-pull-requests/) to manage contribution.

1. Fork the repository so you have your own copy (`your-username/calcite-web`)
2. Clone the repo locally with `git clone https://github.com/your-username/calcite-web`
3. Move into the clone repo:  `cd calcite-web`
4. Install project dependencies: `npm install`

You should also add `Esri/calcite-web` as a remote at this point. We generally call this remote branch 'upstream':

```
git remote add upstream https://github.com/Esri/calcite-web
```

## Development

To run a development environment, just type `grunt`. You should have a copy of the documentation site live at [localhost:8888](http://localhost:8888). As you develop features and fix bugs, be sure to write notes in `CHANGELOG.md`.

### How We Use GitHub

All the code for Calcite Web lives [on GitHub](https://github.com/esri/calcite-web). We use the [fork and pull model](https://help.github.com/articles/using-pull-requests/) to manage contribution. To contribute, you should:

1. Commit your changes.
2. Note your changes in `CHANGELOG.md`
3. Make sure your copy is up to date: `git pull upstream master`
4. Push your changes to your fork: `/your-username/calcite-web`
5. Open a pull-request from your fork (`/your-username/calcite-web`) to the 'upstream' fork (`/Esri/calcite-web`).

# Releasing a New Version

Calcite-Web uses SemVer (Semantic Versioning) for its releases. This means that version numbers are basically formatted like `MAJOR.MINOR.PATCH`. If you're well acquainted with SemVer you should skip to 'Bumping the Version' below.

#### Major

Breaking changes are signified with a new **first** number. For example, moving from 1.0.0 to 2.0.0 implies breaking changes.

#### Minor

New components, new helper classes, or substantial visual changes to existing components and patterns are *minor releases*. These are signified by the second number changing. So from 1.1.2 to 1.2.0 there are minor changes.

#### Patches

The final number signifies patches such as fixing a pattern or component in a certain browser, or fixing an existing bug. Small changes to the documentation site and the tooling around the Calcite-Web library are also considered patches.

## Bumping the Version

1. Change the version number in `package.json` to the desired version number.
2. Write a description of the changes, additions, and bug fixes in `CHANGELOG.md`.
3. Make sure `Esri/calcite-web` is up-to-date with your changes.
5. Run `grunt release` and enter your username and password in the command prompt.

# Updating the Documentation Site

To update the documentation site, just make sure you have push access to the `Esri/calcite-web` repo and type `grunt deploy`. This will build the site and deploy to gh-pages.

The site should be updated at http://esri.github.io/calcite-web/ in just a few moments.



# Calcite Web - An Introduction

Calcite Web is a web design framework that implements the Esri Brand Guidelines and Calcite design framework for browser-based properties and products. Calcite Web is written in [Sass](http://sass-lang.com/), using the [Libsass](http://libsass.org/) compiler. The project also includes a dependency-free JavaScript library for use with interactive patterns, and a css implementation of the framework for the simplest levels of use.

The primary goal of Calcite Web is create a unified visual language for all *.esri.com and *.arcgis.com projects. The secondary goal of Calcite Web is to make it as easy, simple, and painless as possible to implement high quality design patterns in a way that is appropriate to both the project at hand, and the accepted, branded design strategies of Esri as a whole.

Calcite Web was built for developers. It is meant to be flexible enough that you can accomplish 80% of your website with the default patterns writing only html markup. If you use Calcite Web as a Sass library, you'll also get a set of very helpful mixins to help you make new patterns and components that fit in with the Calcite methodology and aesthetic.

## Using Calcite Web Statically
This is the simplest way to use Calcite Web in a project. The static `.css` files distributed under Calcite Web – current in the [Github Repo](https://github.com/Esri/calcite-web) with a CDN is being planned for future releases – allow a developer to use the broad array of helper classes, components, patterns, and javascript classes documented at the [Calcite Web doc site](http://esri.github.io/calcite-web/). Branded assets, such as logos, icons, and fonts, are packaged in this system and will work by default.

Using the Calcite Web static assets will allow the quick and painless creation of simple branded projects while writing the minimal amount of custom css possible.

## Using Calcite Web Sass library
Using the Calcite Web Sass library allows a developer to access a powerful array of mixins, variables, and helpers that facilitate the creation of custom component, patterns, or projects that are aesthetically in line with the Calcite visual language. All of the underlying styles that make Calcite Web a Calcite project are available as Sass variables and extendable classes. This includes a very wide array of typographic and grid tools.

The Sass library will allow developers to create brand new design solutions for specific projects that are still in line and inherit from the primary Calcite vision.

## Calcite Web as a Framework Dependency
Calcite Web has the abillity to exist exclusively as a Sass library, not generating a single line of css. Including the framework in this way may seem counter intuitive - the whole project would compile to an empty file - but allows for some powerful and meaningful applications. Using Calcite Web in this way allows for the creation of new frameworks or themes for any given structure that duplicates no stylistic code or decisions. This means that a project like Calclite for Dojo or Calcite for Bootstrap can each use different patterns of HTML markup to achieve components that are identical to their Calcite Web counterparts.

For example, a Bootstrap button would simply extend the existing Calcite Web buttons instead of recreating the css that controls the styles like so:

```
.btn {
	@include btn();
}
.bnt-default {
	@include btn-color($blue, $dark-blue);
}
```

## Calcite Web vs. Other Frameworks
Calcite Web, while still a CSS Framework, has some profound and subtle differneces from projects like [Bootstrap](http://getbootstrap.com/) or [Foundation](http://foundation.zurb.com/). Where Bootstrap and Foundation both aim to provide a robust set of patterns and utillities for the general, third party developer, Calcite Web **only** concerns itself with Esri projects. Calcite Web is not designed for a developer who is not directly working for Esri on Esri products or properties.

Functionally this means any project using Calcite Web will look like it comes from Esri. This is ideal for our ecosystem of websites and products, while limiting with projects like [Open Data](https://opendata.arcgis.com/about) which have users and external organizations like [Data Driven Detroit](http://d3.d3.opendata.arcgis.com/) create their own branded experience within the project. [Story Maps](http://storymaps.arcgis.com/en/) is another project where the final user-facing product requires third party branding.

For projects like these, using Calcite Web as a dependancy for something like Calcite for Bootstrap would be the best strategy. Each of these projects have aspects that are Esri branded, and need to fit within our aestheric and voice.


