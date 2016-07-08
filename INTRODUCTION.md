# Working on the Calcite Web framework

This document assumes you’ve read the `README.md` and `CONTRIBUTING.md` files, and have the project installed and running in your development environment.

## Structures

Making additions and edits to Calcite Web is a process with a number of structural requirements, designed to keep the codebase clean, DRY,  and self-documenting. The overall project structure has a number of facets that need to be understood before getting started. The following directory structure highlights some of the key structures:

```
/calcite-web
    📄 CHANGELOG.md
    /lib
        /js
            📄 calcite-web.js
            📄 calcite-web-[extension].js
            /helpers
            /patterns
        /sass
            📄 calcite-web.scss
            📄 calcite-web-[extension].scss
            /calcite-web
                /components
                /patterns
                /extensions
    /dist
    /docs
        /source
            📄 table_of_contents.yml
            /documentation
                /components
                /patterns
                    📄 _[pattern].md
                    /sample-code
                        📄 _[pattern].html
        /build
```


### Changelog

The Changelog is an important document, both for developers working together to improve Calcite Web and developers who need to manage updating their projects to newer versions of the framework. Being as clear as possible to what progress you’ve made in the Changeling is essential — particularly if you remove or alter the functionality of any part of the framework.

Keep this updated with either the current version number, to the  `Unreleased` header. Make sure you add to the Changelog before you open a pull request.

### Lib

The source code for the framework itself lives in this directory. All of the final library deliverables are in here.

### Lib / js

This is where all the source code for the Javascript library is kept. This includes the Calcite Web Core `calcite-web.js`, along with any JavaScript files that may be needed to power any extensions, such as `calcite-web-marketing.js`. These files are written in ES6 to take advantage of the module system.

The `/helpers` directory contains a number of ES6 modules that enable common behavior needed across the library - class and dom manipulation, the event bus, and aria handling functions. The `/patterns` directory contains modules that enable UI behavior of the discreet patterns.

### Lib / sass

All the core CSS for the framework is in this folder, written as  SASS. Sass is primary used to enable a module system, similar to our implementation of ES6 for JavaScript.

The `calcite-web.scss` file contains the core framework in it’s entirety, and is by itself just a pile of default variables and references to the modules that make up the actual representational codebase.

Extensions and custom builds live next to this file. An extension like `calcite-web-marketing.scss` references the modules that are required for adding new UI patterns to a project without duplicating any core core, while builds like `calcite-web-no-fonts.scss` are intended to be used in replace of the core framework. Extensions make the framework larger, custom builds make the framework smaller.

#### Lib / sass / components

There are a number of folders in the `/sass` directory which cover the entire framework, but the `/components` and `/patterns` are the ones that hold the most UI pattern content.

Component modules look like `_[component].scss`. Each file should contain only the representation code necessary for a single, specific and discrete UI component.

The term `component` is meant to be small, singular dom nodes or UI patterns that are incredibly flexible and have very little opinion about their surrounding markup.

#### Lib / sass / patterns

Patterns are more involved than components, and require significantly more markup to achieve. Patterns can be composed entirely out of smaller components, with no markup of their own. More complicated UI elements like modals and tabs are considered patterns, and need significant JavaScript to make functional and accessible.

Pattern modules look like `_[pattern].scss`. Each file should contain only the representation code necessary for a single, specific and discrete UI component.

### Dist

The `/dist` directory is what gets delivered to the end user when the framework is downloaded or installed via package manager. Every file in the `/dist` is generated, and editing files in here is futile. Its not tracked by git, so any changes made in the `/dist` folder can not be checked in to source control. Any changes made to any file in this folder will be overwritten by the build process.

We distribute the source files as Sass and ES6 JavaScript, and also compiled files that are usable directly in the browser as CSS and ES5 Javascript. There is some serious tooling that automates this entire process.

### Docs

The website that creates the [Calcite Web Framework site](http://esri.github.io/calcite-web/) lives in here. This includes all the documentation of patterns, components, the JavaScript library, sample code, guides, and usage examples.

#### Docs / build

Like `/dist`, `/build` is a generated, untracked folder full of compiled files ready to host on GitHub Pages, and no files in here should be directly edited.

#### Docs / source

The source files for the Documentation site live in here. There are a number of things to note:

- The `table_of_contents.yml` file contains a complete listing of the entire framework, with logical divisions, lists of patterns and components, and variations for each.

- The `/documentation` folder contains the markdown and html required to render the doc for each segment in the framework. Each item in the table of contents needs both a markdown file for written documentation, and a sample code html file for rendering and copy-pasting.

- The `/examples` folder contains larger sets of sample html for both complex page layouts for the core framework, and the large UI patterns enabled by the extensions. The extensions are not documented anywhere other than this `/examples` folder, and should therefor be restricted to very specific and comprehensive UI patterns.

