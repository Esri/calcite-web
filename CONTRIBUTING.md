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
