---
title: Icons
description: Guidelines for using icons in Calcite Web
layout: layouts/_guide:text
---

Icons are an extremely powerful tool for creating clear and concise interfaces. Below we'll provide an overview of how to integrate icons into your project, as well as guidelines for using icons effectively.

## Using SVG

Icons in Calcite Web are available exclusively as SVG's. There are several ways to use SVGS, but the examples below use _inline_ svgs. This method is as simple as pasting the markup for the SVG into your HTML file directly:

```html
<svg width="16" viewbox="0 0 16 16" class="svg-icon">
  <path d="...path data">
</svg>
```

The `svg-icon` class will align the icon properly alongside text and set the fill color to whatever the text color is. This class was created to offer a simple one-size-fits-most helper for the most common icon scenario (vertically centered with text, same color, no pointer events).

#### Static Sites

If you are using a static site generator or a server framework you can create a helper to add this markup for you. This documentation site [does just that](https://github.com/Esri/calcite-web/blob/master/docs/acetate.config.js#L50), leveraging [the JSON](https://github.com/Esri/calcite-ui-icons/blob/master/docs/icons.json) distributed by the calcite-ui-icons library.

#### Single Page Apps

If you're developing a single-page application, most frameworks have libraries to help with adding SVG code. These include [ember-svg-jar](https://www.npmjs.com/package/ember-svg-jar) for Ember apps, [angular-svg-icon](https://www.npmjs.com/package/angular-svg-icon) for Angular apps, or [react-svg](https://www.npmjs.com/package/react-svg) for React apps. These libraries generally provide the ability to point at an svg file, and take care of the inlining for you. In this case you can install and use svgs from [calcite-ui-icons](https://github.com/esri/calcite-ui-icons/) directly.

### Sizing an SVG

If you use inline SVG to show your icons, then the `<svg>` element will define the size in your app:

```html
<svg width="32" height="32"></svg>
```

This element will take up 32 pixels in the layout. CSS styles will override these attributes:


```html
<svg width="32" height="32" class="my-icon"></svg>
```

```css
.my-icon {
  width: 40px;
}
```

_The SVG will now be 40 pixels wide._

#### Viewbox

The aspect ratio of an SVG is defined with the `viewbox` attribute. It is recommended that you always provide a `viewbox` (in the format `x y width height`) for the original size the icon was meant to be viewed at. For example, a 32 pixel icon should use:

```html
<svg width="32" height="32" viewbox="0 0 32 32"></svg>
```

This tells the browser that the coordinates for any `path` inside this SVG should be on a 32 pixel wide, 32 pixel tall grid which begins at `0,0`. If you use a `viewbox`, you can omit the `height` as the icon will scale to be automatically the correct ratio:

```html
<svg width="32" viewbox="0 0 32 32"></svg>
```

### Setting color

Making icons a certain color is done using the `fill` attribute:

```html
<svg width="32" viewbox="0 0 32 32" fill="#007ac2"></svg>
```

If the `path` elements inside this SVG don't have a fill declared, they will all be blue. Much like `width` this can also be set with CSS:

```css
.my-svg {
  fill: #007ac2;
}
```

### currentColor

One great way to set the color of an icon is to use the `currentColor` variable:

```html
<svg width="32" viewbox="0 0 32 32" fill="currentColor"></svg>
```

This will make the icon the same color as the text color of the element it's inside. This is very helpful as it also will change if text color changes (as in responding to `:hover`). When paired with Calcite Web's [text color classes]({{relativePath/documentation/type/#text-color}}), you can easily color icons using Calcite Web's color palette.

### Spacing an SVG

SVG elements can utilize the [grid helper classes]({{relativePath}}documentation/grid/#grid-helpers) just like any other element. A common use case is having an icon to the left of type:

```html
<p>
  <svg width="32" viewbox="0 0 32 32" class="svg-icon margin-right-quarter"></svg> Text
</p>
```

## Guidelines

Now that you know how to integrate icons into your project, below are some guidelines and suggestions for using icons more effectively.

### Use both text _and_ icon

When you have the room in the interface, it is generally a good idea to use both the text _and_ the icon rather than just an icon. Depending on how widely used the icon is, a user may not be able to intuit the concept an icon stands for immediately. Using text and an icon (or a tooltip) helps to lower the cognitive load a user is forced to take on.

### Make SVG accessible

If screen real estate is at a premium and the icon won't be labeled with text, it's important to ensure the icon can be understood by screen readers. Note: _this is not necessary if the icon is used purely decoratively_.

The most common use case is an icon being used as a button or link:

```html
<!-- edit button -->
<button class="btn btn-transparent" aria-label="Edit">
  <svg width="32" viewbox="0 0 32 32" class="svg-icon"></svg>
</button>
```

Notice the `aria-label` is added to a focusable element and explains to non-sighted users what the icon makes clear to sighted users.

If your icon is more than decorative but is not in a control, you can utilize the `title` and `description` elements _inside_ the SVG, or a `figure` plus a `figcaption`. See Heather Migliorisi's [Accessible SVGs](https://css-tricks.com/accessible-svgs/#article-header-id-6) for more on those techniques.

### Use outlined style

The calcite-ui icon set comes with both filled and outlined styles. Generally, the _outlined_ style is considered the default. If you are in doubt about which style icons you should use in your site or app, it's recommended you use the outlined style.

### Use color in icons with purpose

Much like other UI elements, color plays an important role in icons. In your application you should try to be judicious in your use of colored icons. Icons should be colored to communicate concepts like using green for _success_ and red for _error_. Blue is often used for showing an active state in the UI. For more detail about how colors are used in Calcite Web, read the [color guide](../color/).

### Don't scale icons

The icons from the calcite-ui set were constructed to be pixel-perfect at their original size. This means that straight lines will appear crisp and solid when they are displayed at the size they were meant for. When an icon that was constructed on a 16x16 grid is displayed at 17px wide, it will cause the icon to be pixel hinted and lose the sharp edges it was meant to have. Read [what happens when you scale vector icons](https://github.com/Esri/calcite-ui-icons/wiki/What-Happens-When-You-Scale-Vector-Based-Icons) for a more in-depth explanation.
