The width of elements can be explicitly defined for breakpoints where columns would normally fold by default. This can be done with the `phone-column-n` and `tablet-column-n` classes. For example, `.column-12` would default to the full 12/12 column width at a tablet size. Adding to the same element `.tablet-column-6` would prevent the default behavior, and at a tablet viewport, the element would be 6/12 columns.

<div class="grid-example clearfix">
  <div class="column-8 tablet-column-2 phone-column-3">
    <span class="tablet-hide">column-8</span>
    <span class="tablet-only">tablet-column-2</span>
    <span class="phone-show">phone-column-3</span>
  </div>
</div>

```
<div class="column-8 tablet-column-2 phone-column-3">
  <span class="tablet-hide">column-8</span>
  <span class="tablet-only">tablet-column-2</span>
  <span class="phone-show">phone-column-3</span>
</div>
```

[View the full example]({{relativePath}}/examples/grid/#responsive-columns)
