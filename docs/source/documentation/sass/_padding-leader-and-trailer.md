If you'd prefer this space be added using padding instead of margin, use the `padding-leader` mixins:

```scss
// pass the amount of space you'd like to the mixin:
@include padding-leader(2);
@include padding-trailer(6);

// for smaller amounts, use the following with no argument passed in
@include padding-leader-half();
@include padding-leader-quarter();
@include padding-trailer-half();
@include padding-trailer-quarter();
```
