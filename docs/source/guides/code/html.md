---
title: HTML Styleguide
description: HTML Styleguide for Calcite Web
layout: layouts/_styleguide:text
---

# HTML Styleguide

>All code in any code base should look like a single person typed it, no matter how many people contributed. - The Golden Rule

Below is an effort to standardize the syntax used in all projects. The hope is to make these decisions easy, and keep codebases clean and sensible.

## General Guidelines

- Use soft-tabs with two spaces
- Nested elements should be indented once (2 spaces)
- Always use double quotes, never single quotes
- Don't include a trailing slash in self-closing elements

Incorrect example:

```html
<!DOCTYPE html>
<html>
<head>
<title>Page title</title>
</head>
<body>
<img src='images/company-logo.png' alt='Company' />
<h1 class='hello-world'>Hello, world!</h1>
</body>
</html>
```

Correct example:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page title</title>
  </head>
  <body>
    <img src="images/company-logo.png" alt="Company">
    <h1 class="hello-world">Hello, world!</h1>
  </body>
</html>
```

### Pragmatism over semantics

Strive to maintain HTML standards and semantics, but don't sacrifice pragmatism. Use the least amount of markup with the fewest intricacies whenever possible.

### Attribute order

HTML attributes should come in this particular order for easier reading of code:

- class
- id
- data-*
- for|type|href

Such that your markup looks like:

```html
<a class="" id="" data-modal="" href="">Example link</a>
```
