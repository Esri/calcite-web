The Calcite Web type system uses a modular typographic scale to ensure a consistent tonal range within all text elements. This modular scale is created from the body size of the type, and a second, smaller size. These two type sizes anchor the scale, and using a precise ratio can be expanded to an entire set of sizes for all typographic needs.

The `font-size($n)` mixin takes an integer, positive or negative, and sets all type within the element to the size defined by traversing that number of steps up or down the typographic scale.

'0' represents the normal text size while '-1' is a type size smaller, and '1' is a type size larger. So if you'd like to have a very large pull-quote or something of that nature, you could use `@include font-size(6)`. This means that the text you've styled will be six steps up the typographic scale from the normal body size.

The `font-size($n)` mixin relies on the `modular-scale($n)` mixin to define the scale, and apply it to typographic elements.
