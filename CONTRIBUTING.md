# Contributing

Calcite Web is open to all types of contributions from across Esri. Things you can do to contribute include:

1. Report a bug ([open an issue](https://github.com/Esri/calcite-web/issues/new))
2. Suggest a new pattern or component ([open an issue](https://github.com/Esri/calcite-web/issues/new))
3. Fork the repository and fix one of the [open issues](https://github.com/Esri/calcite-web/issues)
4. Report problems with the [documentation](http://esri.github.io/calcite-web/).

### Install Dependencies

1. Visit [nodejs.org](http://nodejs.org/) to install Node.
2. In the Calcite Web project repository, `npm install` to install development dependencies.
3. `npm start` to run a development server for Calcite Web

#### Working with the Icon Font

Changing the icon font requires further dependencies - Python and Fontforge.

1. [Install Python](https://www.python.org/downloads/)
2. `brew install ttfautohint fontforge --with-python`
3. `npm run font`

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

We distribute the source files as Sass and ES6 JavaScript, and also compiled files that are usable directly in the browser as CSS and ES5 JavaScript. There is some serious tooling that automates this entire process.

### Docs

The website that creates the [Calcite Web Framework site](http://esri.github.io/calcite-web/) lives in here. This includes all the documentation of patterns, components, the JavaScript library, sample code, guides, and usage examples.

#### Docs / build

Like `/dist`, `/build` is a generated, untracked folder full of compiled files ready to host on GitHub Pages, and no files in here should be directly edited.

#### Docs / source

The source files for the Documentation site live in here. There are a number of things to note:

- The `table_of_contents.yml` file contains a complete listing of the entire framework, with logical divisions, lists of patterns and components, and variations for each.

- The `/documentation` folder contains the markdown and html required to render the doc for each segment in the framework. Each item in the table of contents needs both a markdown file for written documentation, and a sample code html file for rendering and copy-pasting.

- The `/examples` folder contains larger sets of sample html for both complex page layouts for the core framework, and the large UI patterns enabled by the extensions. The extensions are not documented anywhere other than this `/examples` folder, and should therefor be restricted to very specific and comprehensive UI patterns.

## Development

To run a development environment, just type `npm start`. You should have a copy of the documentation site live at [localhost:8888](http://localhost:8888). As you develop features and fix bugs, be sure to write notes in `CHANGELOG.md`.

### Accessibility

WCAAG and 508 compliance is very important in Calcite Web. You must follow all standards! Follow these [aria standards.](https://www.w3.org/TR/wai-aria-practices/#aria_ex)

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
5. Run `npm run release`. If prompted enter your GitHub credentials and your s3 access key/secret.

# Updating the Documentation Site

To update the documentation site, just make sure you have push access to the `Esri/calcite-web` repo and type `npm run deploy`. This will build the site and deploy to gh-pages.

The site should be updated at http://esri.github.io/calcite-web/ in just a few moments.
