# Esri Global Navigation [<img src="https://avatars2.githubusercontent.com/u/628795" alt="" width="90" height="90" align="right">][Esri Global Navigation]

[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]

[Esri Global Navigation] is a branded presentation layer for Esri site and
account navigation. It provides platform-wide alignment and brand cohesion,
allowing visitors to explore new content and products through a familiar and
consistent experience

As a centralized microapp, this repo will reduce the duplicated work any given
developer needs to implement persistent navigation, while providing a
centralized location for distributing rapid updates, new features, and
resolving issues with shared ownership.

![Image of Esri Global Navigation](readme-screenshots/esri-global-nav-desktop.png)

[View it live](https://esri.github.io/global-nav/)

## Getting Started

To begin, clone this repository to your computer:

```sh
git clone git@github.com:Esri/global-nav.git
```

From the global-nav directory, install the component’s dependencies:

```sh
npm install
```

Next, start one of the navigation modules:

```sh
# to launch the global navigation
npm start
```

## Modules

[Esri Global Navigation] is composed of 2 modules; [Header], [Footer].

### [Header]

[Header] is the presentation layer of the top-level navigation for Esri's web
pages and SAAS applications. It consists of the markup (HTML), styles (CSS),
and functionality (JS) for UI interactions.

### [Footer]

[Footer] is the presentation layer of the bottom-level navigation for Esri's
web pages and SAAS applications. It consists of the markup (HTML), styles
(CSS), and functionality (JS) for UI interactions.

---

## Framework Integrations

### Dojo
 Install Git Repo as a Submodule
 ```sh
 > git submodule add git@github.com:Esri/global-nav.git ./esri-global-nav
 > cd esri-global-nav
 > npm install
 ```

Setup Repo for use with Dojo
- Open `package.json` with a text editor
- Edit the following line in the `gulpConfig` object
```json
"gulp_config": {
    ...
    "js_module_format": "amd"
}
```
- `npm build`
- `npm start`
- Verify that the global nav demo is correctly displayed in the browser
- The file `/dist/esri-global-nav.js` should now be ready to import

Example: Import the new AMD Module for use within a Dijit

```js
define([
  "esri-global-nav/dist/esri-global-nav.js"
], function (globalNav) {
  return {
    init: function () {
      var navStructure = this._getNavStructure();
      globalNav.create(navStructure);
    }

    _getNavStructure: function () {
      return {
        // See '/src/demo.js' for an example
      }
    }
});
```

---

## Advanced Usage

### Listening for Events

The global nav dispatches custom events to each of its modules (Header and Footer).

```js
// You can Listen for events on the element generated from the create method
globalNav.create(yourGlobalNavStructure);
var esriHeader = document.querySelector('.esri-header-barrier');
esriHeader.addEventListener("header:click:search", function () { ... });
```

Important Events
- header:click:account
- header:click:search
- header:click:signin
- header:click:signout
- header:click:switch
- header:menu:toggle

### Configuring Links to Open in a New Tab

Links, within a menu, can be configured to open in a new tab.
- As of now, this only works for links within dropdown submenus

```js
yourGlobalNavStructure = {
  theme: 'web',
  menus: [[
    {
      label: 'Special Page',
      href: '../Special.html',
      newContext: true // boolean - new context is fancy talk for a new tab
    }
  ]]
}
```

### Adding Data Attributes to Links

Menu links can receive data attributes too. Here, we create a special page link that has an an attribute of "data-id" that's equal to "1" and "data-show-link" that's equal to "true".
- As of now, this only works for links within dropdown submenus

```js
yourGlobalNavStructure = {
  theme: 'web',
  menus: [[
    {
      label: 'Special Page',
      href: '../Special.html',
      data: {
        'id': "1",
        'show-link': "true"
      }
    }
  ]]
}
```

### Working with Complex Structures & Hiding/Showing Links

In the example below, we want to hide the My Account link if the user is on the account page. We also want the account page to open in a new tab.

```js
  // Here we define our blueprint for a basic link
  var GlobalNavLink = {
    init: function (label, attributes) {
      this.label = label.replace("_", " ");
      this.href = attributes.href ? (typeof attributes.href === "function" ? attributes.href() : attributes.href) : "#";
      if (attributes.openInNewTab) { this.newcontext = attributes.openInNewTab; }
      return this;
    }
  }

  // We will use this function to decide whether to hide or show our link
  function showAccountLink() {
    return window.location.pathname !== "/account.html";
  }

  // Our filter function below uses this info to generate our array of links
  var navLinksDictionary = {
    "My_Profile": { href: "./user.html" },
    "Home_Link": { href: "./index.html"},
    "Help":      { href: "./help.html" },
    "My_Account": {
      href: "./account.html", // string
      show: showAccountLink(), // boolean
      openInNewTab: true // boolean
    }
  }

  // Loop through our array:
  // - Links without a show property, or with a show property equal to true, will be added to the array
  function filterAndCreateLinks (links) {
    var linkArr = [];
    links.forEach(function (link) {
      var attributes = navLinksDictionary[link];
      if (attributes && (!("show" in attributes) || attributes.show)) {
        linkArr.push( Object.create(GlobalNavLink).init(link, attributes) );
      }
    }, this);
    return linkArr;
  }

  // menuLinks will serve as our primary links in the nav bar
  var menuLinks = ["Home_Link", "My_Account"];
  // accountDropdownLinks will be located within the account dropdown
  var accountDropdownLinks = ["My_Profile", "Help"];

  // Set our filtered array of links to the correct parameter within our global nav object
  yourGlobalNavStructure.menus = [this.filterAndCreateLinks(menuLinks)];
  yourGlobalNavStructure.account.menus = this.filterAndCreateLinks(accountDropdownLinks);

  // Create our new nav bar!
  var esriHeader = globalNav.create(globalNavStructure);
```

---

## Resources

- [ArcGIS for JavaScript API Resource Center](https://developers.arcgis.com/javascript/)
- [ArcGIS Blog](https://blogs.esri.com/esri/arcgis/)
- [twitter@esri](https://twitter.com/esri)

## Issues

Find a bug or want to request a new feature? Please let us know by
[submitting an issue](issues).

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our
[guidelines for contributing](https://github.com/esri/contributing).

## Licensing

[Esri Global Navigation] uses the Apache License, Version 2.0 (the "License").
You may obtain a copy of the License at
https://www.apache.org/licenses/LICENSE-2.0, which is also available in the
repository's [LICENSE.md][lic-url].

[Esri Global Navigation]: https://github.com/Esri/global-nav

[cli-url]: https://travis-ci.org/Esri/global-nav
[cli-img]: https://travis-ci.org/Esri/global-nav.svg?branch=master
[lic-url]: LICENSE.md
[lic-img]: https://img.shields.io/badge/license-Apache%202.0-blue.svg
