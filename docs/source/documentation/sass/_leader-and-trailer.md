To add space above and below content, you can use the `leader` and `trailer` mixins. These mixins utilize the `$baseline` unit, and will scale with your base type size and baseline.

```scss
@include leader(3);         // add three units of margin above element
@include leader-half();
@include leader-quarter();
@include trailer(2);        // add two units of margin below element
@include trailer-half();
@include trailer-quarter();
```
