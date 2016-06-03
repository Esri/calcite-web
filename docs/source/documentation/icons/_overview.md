There are several sets of icons made available as part of Calcite Web. While they use two separate technologies (SVG vs. Icon Fonts) their API's are largely the same. To add an icon to a page, just add a class to an element, like this:

```
<span class="icon-ui-close" aria-label="close icon"></span>
```

This will automatically add the icon to the page. In the icon font, the icon will be added as a `:before` pseudo element in the same color and size as the text you're currently using. If the icon class is a social icon or a multi-colored icon from the Calcite set it will be added as a background image to the element. Social icons and Calcite icons have a specific size and color which can't be modified.
