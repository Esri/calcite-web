---
title: Migration Guide
description: Everything you need to know about migrating from Tailcoat at Calcite-Web
section: 'get-started'
layout: layouts/_guide:text
---

# Tailcoat Migration Guide

Migrating from Tailcoat to Calcite Web is fairly straightforward. Most of the structures and basic ideas between the two frameworks are quite similar. For example, while class names and recommended markup for something like the side navigation pattern have changed, there is still a like-for-like replacement for the tailcoat pattern. From a user experience perspective, almost all of the patterns and use cases covered in Tailcoat have simply been improved and reimplemented in Calcite Web.

While it will not be trivial to update an entire code base to Calcite Web, it will be a fairly straight forward experience of updating class names and markup. Occasionally you will need to re-imagine a layout or pattern, but we have created Calcite Web with a fairly clear migration path in mind.

## Why Migrate?

There are several reasons to migrate to Calcite Web.

#### Visually Cohesive

There is a large effort underway to improve and solidify the visual design of all websites and digital experiences at Esri. By using Calcite Web you are will be contributing to that effort and ultimately helping our customers.

#### Accessible

Calcite Web was created with accessibility in mind. We are undergoing a review for full 508 compliance and consider accessibility a hard requirement for a version one release.

Because of this, when you use Calcite Web you will automatically be largely compliant with accessibility standards without doing any extra work.

#### Configurable

While Tailcoat had several different variables you could customize, you always got the full CSS bundle when you compiled Tailcoat.

Calcite Web was created so that you could get as little or as much of the CSS as you needed. You can turn every font, pattern, and component on or off depending on your needs.

#### Easier Integration

Tailcoat was a compass plugin. This meant to use it you needed Sass, Compass, Ruby, a Gemfile, and probably Bundler.

Calcite Web is much easier to integrate into a variety of tech stacks. In fact, it has no strict Ruby dependency *at all*. You can still use it as a compass extension, but you can also install it with npm, as a Ruby gem, load it from a CDN, or download a release directly from GitHub.

#### Faster Builds

Calcite Web supports and is built with LibSass, meaning that it can be used with regular Sass, or with any of the LibSass wrapping libraries (like Node-Sass). Now that there is less Sass to compile (no Compass) and you can compile with LibSass compiling the library to CSS is orders of magnitude faster than Tailcoat.

#### Feature Rich

Commonly asked for patterns have been added to Calcite Web that were not part of Tailcoat. Things like sticky elements, carousels, pagination, and expanding (or 'mega-menu') navigation have all been standardized and added so site authors don't need to reinvent the wheel when they need these patterns.

## Key Differences

Now that you're (hopefully) convinced to start using Calcite Web, there are a few general differences between the two frameworks that will not only help you understand how to update your code, but also give you insight into *why* Calcite Web has implemented these things differently.

#### CSS Selectors

Calcite Web follows a few rules when naming css selectors:

1. No `id` selectors (`#footer {}`)
2. No nested tag selectors (`.footer a`)
3. Namespaced classes (`.btn-red` not `.red`)
4. Keep selectors as shallow as possible (`.footer-link` not `.footer a.link`)
5. Classes that are for JavaScript functionality are prefixed with `js-` (`js-accordion` not `accordion`)

These guidelines help to avoid unintended naming clashes and over-specific or unwieldy selectors. Most of what needs to change from Tailcoat to Calcite Web will be small changes in selector convention, so it's important to understand that these changes are worth it as they will drastically reduce the probability of visual bugs and regressions down the road.

#### Semantic HTML

Wherever possible, semantic elements like `nav` and `aside` are now used when constructing patterns. This is important for things like screen readers, accessibility, and SEO. There are several patterns that will need to be upgraded to use semantic HTML.

#### Grid

The implementation of the new Calcite Web grid is very different from the Tailcoat grid. Things like the block grid, responsive classes, columns, pre and post are all *named* pretty much the same, but columns are now the same size regardless of what they are nested under. In Tailcoat a `column-12` inside of a `column-12` was actually only as wide as a `column-6`. In Calcite Web a `column-6` will be the same size as any other `column-6` regardless of what contains it.

#### Typography

Everything is in Avenir Next with the exception of code blocks, and long form material. This is a substantial change from the current typefaces in Tailcoat, but it is more visual in nature and shouldn't require much work to change over.

## Breaking Changes

Below is a list of things that will need to be changed to migrate to Calcite Web. It may look daunting, but most of the changes are fairly superficial. If anything is unclear in this list please [open an issue](https://github.com/Esri/calcite-web/issues). We are also happy to help via phone, chat, and email! Good luck!

### Type

1. Text modifiers are now formatted `.text-{MODIFIER}` instead of `.{MODIFIER}-text`. Below is a list of new modifiers:
  - `.center-text` => `.text-center`
  - `.white-text` => `.text-white`
  - `.red-text` => `.text-red`
  - `.error-text` => `.text-red`
  - `.green-text` => `.text-green`
  - `.success-text` => `.text-green`
  - `.overflow-ellipsis` => `.text-ellipses`
2. Removed `.show-visited-links`

### Grid

1. There are no rows. If you need to group columns you can just put columns inside of a `column-24`
2. `container` is now `grid-container`. This solved problems with other technologies also using a `container` class.
3. Columns are always the same size, so layouts with nested columns will need to redone.
4. Behavior of columns at responsive sizes has changed. By default Calcite Web tries to resize columns intelligently, but you can still specify column counts at certain breakpoints as in Tailcoat.

### Layout

1. Removed `full` class
2. Removed `clear` class
3. Removed all `square-X` classes

### Color

1. Several colors use the same class, but the colors are slightly different
2. Tan was removed
3. `lightest-` and `lighter-` purple and green were removed

### Icons

1. Icons are a completely different set. Most Tailcoat icons have a counterpart in Calcite Web, but some don't.
2. Icons use the class prefix `.icon-ui-` not just `.icon-`
3. Some color classes have been removed, while others have been added

### Components

##### Buttons
1. `success`, `delete`, `cancel`, `gray`, `orange` classes all removed
2. Modifier classes formatted `btn-X` instead of `X`

##### Tooltips
1. Tooltip markup has been greatly simplified. Just add an `aria-label` and the `tooltip` class to the element you'd like to have a tooltip

##### Dropdowns
1. Dropdowns now happen on click and require JavaScript
2. Classes and markup have both changed (see [dropdown documentation](../documentation/components/#dropdowns))

##### Alerts
1. Icons named after colors not conditions (ie. `success` => `alert-green`)
2. Markup is different
3. Alerts are meant to fade in, must add the `is-active` class to see them.

##### Breadcrumbs
1. Breadcrumbs are now a `nav` element with anchors inside
2. Anchors must have `breadcrumb` class

##### Pagination
Pagination as a defined pattern, but there are no special classes for it anymore. It's just made up of other components. See the [pagination documentation](../documentation/patterns/#pagination).

##### Loader
1. Loader requires one less `div`
2. `loading-word` => `loader-text`
3. Hidden by default, must add `is-active` class to see it

##### Panels
1. `primary` => `panel-light-blue`
2. `compact`, `drop-shadow` removed
3. Colors should be prefixed with `panel-`

##### Tables
1. `blue` => `table-blue`
2 `striped` => `table-striped`

##### Table Cells
No modifiers

##### Forms
1. `.error` => `.input-error` (or `select-error`)
2. No modifiers on `textareas`
3. Removed `input-list`

### Patterns

Rather than list out exactly what has changed in each pattern, it will be easier for you to just reference the documentation on the patterns and reimplement your UI with Calcite Web patterns.

Below is a summary of what has changed.

1. Markup for basic page has been updated slightly
2. Top Nav markup has changed a lot: [top nav](../documentation/patterns/#top-nav)
3. Navigation Bar is now [Sub Nav](../documentation/patterns/#sub-nav)
4. Search Bar removed (we are still assessing the search design)
5. Content Area removed
6. Feature Block Removed (replace with column layouts or [cards](../documentation/components/#card))
7. Sidebar Navigation is now [Side Nav](../documentation/patterns/#side-nav) and uses different markup
8. Footer uses mostly other components and modifier classes, now, so markup is fairly different
9. Sticky footer removed as footer is now sticky by default

### Javascript
1. Modal markup has updated, and the toggles now must use `js-modal` classes with data attributes, see [modals](../documentation/patterns/#modals)
2. Must use `js-` classes for interactivity. Modifier classes are prefixed. See [tabs](../documentation/patterns/#tabs)
3. [Accordion markup](../documentation/patterns/#accordions) is sustantially different (plus the above changes).
5. Dropdowns and click dropdowns are now the same thing, just [dropdowns](../documentation/components/#dropdowns)
6. Site Dropdown removed due to very poor user testing
7. Responsive Nav Bar removed

## Conclusion

It's a large effort to migrate, but because Calcite Web is in many ways just an evolution of Tailcoat, most of the ideas are still represented. If at any point you have questions, comments, or patterns you really need from Tailcoat that you don't feel are covered, *please* [open an issue](https://github.com/Esri/calcite-web/issues/new) on Calcite Web and we'll be sure to hop on and try to help!
