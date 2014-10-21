
# Typography

## Overview
The Calcite Type System uses a combination of mixins and helper classes to achieve a clear visual style, focusing primarily on simplifying typesetting processes. Using the mixins and classes properly will ensure that all properties are consistent, beutiful, and robust.

## Typefaces
We expose four sets of type families for use in Calcite Web; a Header Family, a Body Family, a Secondary Family, and a Code Family. Each of these type families have a set of weights and styles, defined by their application. For example, the Header Family has more weights than the Body family, reflecting its role as primary UI face, and heavy lifting header face.

The typographic pallete for Calcite Web differs slightly from the official Esri branding document. All typefaces are examined in detail below.

### Header - Avenir Next
[Avenir Next](http://www.fonts.com/font/linotype/avenir-next) is a recut of the classic Avenir typeface, by Adrian Frutiger and Akira Kobayashi. It has been reworked for use on the web, and contains more weights, styles, and other improvements. Avenir Next improves on Avenir in specifically web settings.

Applies the the header face, along with a set of smart weight interactions and typographic defaults, to an element.

```scss
@include header-face();
<!-- or -->
@extend .header-face;
```

```html
<span class="header-face">Avenir Next</span>
```

### Body - Frutiger
While there is no official Esri brand typeface for long for applications, Calcite Web employs [Frutiger](http://www.fonts.com/font/linotype/frutiger?QueryFontType=Web) for this purpose. Frutiger evokes some of the stronger qualities of our default typefaces - Lucida Grande and Segoe UI - while presenting a consistent voice across platforms. Frutiger pairs remarkably well with Avenir, as they are both designed by Adrian Frutiger, with strong influences from Univers.

```scss
@include body-face();
<!-- or -->
@extend .body-face;
```

```html
<span class="body-face">Frutiger</span>
```

### Secondary - ITC Charter
[ITC Charter](http://www.fonts.com/font/itc/itc-charter), designer by Mathew Carter, is used as a Serif alternative to the sans-serif body face. While usage should be sparse, Charter provides the opportunity to add variation and contrast to a pages pallete.

```scss
@include secondary-face();
<!-- or -->
@extend .secondary-face;
```

```html
<span class="secondary-face">ITC Charter</span>
```

### Code - Consolas
Designed by Microsoft's Lucas DeGroot, [Consolas](http://www.fonts.com/font/microsoft-corporation/consolas) is a clean, readable, and simple monospace face for documenting code blocks.

```scss
@include code-face();
<!-- or -->
@extend .code-face;
```

```html
<span class="code-face">Consolas</span>
```

## Weights
Calcite Web provides a set of weights for each typeface. These are used by either using the helper class in html, or the writing sass to include the mixin, or extending the helper class. The available weights for each face are below.

```html
<!-- Avenir Next -->
<span class="header-light">Avenir Next Light</span>
<span class="header-face">Avenir Next Regular</span>
<span class="header-demi">Avenir Next Demi</span>
<span class="header-bold">Avenir Next Bold</span>
<!-- Frutiger -->
<span class="body-face">Frutiger Regular</span>
<span class="body-bold">Frutiger Bold</span>
<!-- ITC Charter -->
<span class="secondary-face">ITC Charter Regular</span>
<span class="secondary-bold">ITC Charter Bold</span>
<!-- Consolas -->
<span class="code-face">Consolas</span>
```

## Styles
Proper care has been taken to ensure that all type systems used by Calcite avoid faux-bold and faux-italics styled by the browser.

# Type Modifiers

## Colors

## Weights

## Styles

## Alignment