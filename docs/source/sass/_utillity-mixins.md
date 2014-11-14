## Utillity Mixins
Utillity mixins are used to construct complicated behaviors for [components]({{RelativePath}}components) and [patterns]({{RelativePath}}patterns), provide baseline functionallity for doc elements, and take care of browser prefixing. The following mixins are available for use when using the Calcite Web sass library.

Most utillity mixins are borrowed from [Bourbon](http://bourbon.io/). Where mixins share a name, they are the same code base.

```scss
@mixin appearance ($value)
@mixin box-sizing ($box)
@mixin calc($property, $value)
@mixin clearfix()
@mixin prefixer ($property, $value, $prefixes)
@mixin respond-to($max, $mi, $type)
@mixin transform($property)
@mixin transform-origin($axes)
@mixin transform-style ($style)
@mixin transition ($value)
@mixin transition-property ($value)
@mixin transition-duration ($value)
@mixin transition-timing-function ($value)
@mixin transition-delay ($value)
@mixin show()
@mixin hide()
```