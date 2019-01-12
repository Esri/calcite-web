To add space on either the right or left side, use the `gutter` mixins:

```scss
// add space in increments of 1 $baseline
@include gutter-left($n);
@include margin-gutter-left($n);
@include gutter-right($n);
@include margin-gutter-right($n);

// common fractional gutters (call without arguments)
@include gutter-left-quarter();
@include margin-gutter-left-quarter();
@include gutter-right-quarter();
@include margin-gutter-right-quarter();
@include gutter-left-third();
@include margin-gutter-left-third();
@include gutter-right-third();
@include margin-gutter-right-third();
@include gutter-left-half();
@include margin-gutter-left-half();
@include gutter-right-half();
@include margin-gutter-right-half();
```
