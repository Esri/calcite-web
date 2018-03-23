You can set the font family and weight via the following Sass mixins:

```
@include avenir-light();   // font-weight: 300
@include avenir-regular(); // font-weight: 400
@include avenir-italic();  // font-style: italic
@include avenir-bold();    // font-weight: 700
@include code-face();      // font-family: $code-family
```

When changing between styles of Avenir Next, you can also simply set the `font-weight` and `font-style` properties in CSS and the correct font will also be rendered. The corresponding CSS property values have been noted as comments in the list above.


