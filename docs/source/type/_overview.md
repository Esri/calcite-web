<h1 class="leader-0">Calcite Type System</h1>

The Calcite Type System uses a combination of mixins and helper classes to achieve a clear visual style, focusing primarily on simplifying typesetting processes. Using the mixins and classes properly will ensure that all properties are consistent, beautiful, and robust.

## Typefaces

We expose four sets of type families for use in Calcite Web; a Header Family, a Body Family, a Secondary Family, and a Code Family. Each of these type families have a set of weights and styles, defined by their application. For example, the Header Family has more weights than the Body family, reflecting its role as primary UI face, and heavy lifting header face.
The typographic pallete for Calcite Web differs slightly from the official Esri branding document. All typefaces are examined in detail below.
Calcite Web provides a set of weights for each typeface. These are used by either using the helper class in html, or the writing sass to include the mixin, or extending the helper class. The available weights for each face are below. Proper care has been taken to ensure that all type systems used by Calcite avoid faux-bold and faux-italics styled by the browser.