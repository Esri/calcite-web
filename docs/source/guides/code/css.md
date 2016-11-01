---
title: CSS Styleguide
description: CSS Styleguide for Calcite Web
layout: layouts/_styleguide:text
---

# CSS Styleguide

>All code in any code base should look like a single person typed it, no matter how many people contributed. - The Golden Rule

Below is an effort to standardize the syntax used in all projects. The hope is to make these decisions easy, and keep codebases clean and sensible. This styleguide is a fork of [mdo's html and css guide](https://github.com/mdo/code-guide) with some minor adjustments.

## General Guidelines

- Use soft-tabs with two spaces
- Include one space before the opening brace of declaration blocks
- When grouping selectors, keep individual selectors to a  single line
- Place closing braces of declaration blocks on a new line
- Include one space after ``` : ``` in each property
- Each declaration should appear on its own line
- End all declarations with a semi-colon
- Comma-separated values should include a space after each comma
- Don't include spaces after commas in RGB or RGBa colors, and don't preface values with a leading zero
- Lowercase all hex values, e.g., #ffffff instead of #FFFFFF
- Quote attribute values in selectors, e.g., input[type="text"]
- Avoid specifying units for zero values, e.g., ```margin: 0;``` instead of ```margin: 0px;```

#### Incorrect example: ####

```
.selector, .selector-secondary, .selector[type=text] {
  padding:15px;
  margin:0px 0px 15px;
  background-color:rgba(0, 0, 0, 0.5);
  box-shadow:0 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}
```

#### Correct example: ####

```css
.selector,
.selector-secondary,
.selector[type="text"] {
  padding: 15px;
  margin: 0 0 15px;
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

### Declaration order

Related declarations should be grouped together, placing positioning and box-model properties closest to the top, followed by typographic and visual properties.

You can remember the order with the following acronym: **"PB&amp;J"**. That stands for:

- **P**ositioning
- **B**ox Model
- Typography **&** Appearance
- **J**azz (extras, transitions)

```css
.declaration-order {
  /* - - - - Positioning - - - - */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: block;

  /* - - - - Box-model - - - - */
  float: right;
  width: 100px;
  height: 100px;

  /* - - - - Typography - - - - */
  font-family: sans-serif;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* - - - - Appearance - - - - */
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;

  /* - - - - Jazz - - - - - - - */
  animation: 100ms all linear;
}
```

### Rules with single declarations

In instances where several rules are present with only one declaration each, consider removing new line breaks for readability and faster editing.

```css
.span1 { width: 60px; }
.span2 { width: 140px; }
.span3 { width: 220px; }

.sprite {
  display: inline-block;
  width: 16px;
  height: 15px;
  background-image: url(../img/sprite.png);
}

.icon           { background-position: 0 0; }
.icon-home      { background-position: 0 -20px; }
.icon-account   { background-position: 0 -40px; }
```

### Human readable

Code is written and maintained by people. Ensure your code is descriptive, well commented, and approachable by others.

### Comments

Great code comments convey context or purpose and should not just reiterate a component or class name.

Bad example:

```css
/* Modal header */
.modal-header {
  ...
}
```

Good example:

```css
/* Wrapping element for .modal-title and .modal-close */
.modal-header {
  ...
}
```

### Class names

- Keep classes lowercase and use dashes (not underscores or camelCase)
- Avoid arbitrary shorthand notation
- Keep classes as short and succinct as possible
- Use meaningful names; use structural or component names
- Prefix classes based on the closest parent component's base class

Bad example:

```css
.m { ... }
.modal_close { ... }
.openButton { ...}
.header { ... }
```

Good example:

```css
.modal { ... }
.modal-close { ... }
.open-button { ... }
.modal-header { ... }
```

### Selectors

- Use classes over generic element tags
- Keep them short and limit the number of elements in each selector to three
- Scope classes to the closest parent when necessary (e.g., when not using prefixed classes)

Bad example:

```css
span { ... }
.page-container #stream .stream-item .tweet .tweet-header .username { ... }
.avatar { ... }
```

Good example:

```css
.avatar { ... }
.tweet-header .username { ... }
.tweet .avatar { ... }
```

### Organization

- Organize sections of code by component
- If using multiple CSS files, break them down by component

## SASS

The same rules apply in sass, but there are a few more sass-specific rules:

- Never nest more than three selectors deep
- Mixins that don't accept input should be extendable classes
- If a color or property is defined as a variable, use the variable, do not rewrite the class.
- If a property or set of properties is used over and over, make it an extendable class so it's easier to manage.

#### Bad Example:

```scss
$white: #fff !default;

@mixin full-width {
  width: 100%;
}

.nav {
  color: #fff;
  .nav-header {
    color: #fff;
    a.nav-link {
      .toggle-link {
        color: #fff;
        @include full-width();
      }
    }
  }
}
```

#### Good Example:

```scss
$white: #fff !default;

%white {
  color: $white;
}

%full-width {
  width: 100%;
}

.nav {
  @extend %white;
}

.nav-header {
  @extend %white;
  .toggle-link {
    @extend %full-width;
  }
}
```

It's tempting to use indentation to organize your code, but remember, the generated css will have every selector above it, making it very bloated and way too specific. Although the above is more lines of sass, it is far more extendable and generates much less css.
