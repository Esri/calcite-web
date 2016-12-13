Contrary to other flexible-width grid systems, Calcite Grid columns do not change behavior when nested. Because a column is a constant measurement relative to the size of the viewport, nested columns still span the same width as their non-nested counterparts. An element with `.column-6` nested within an element with `.column-12` is the same size as an un-nested `.column-6`. Further, clearing of the column-gutter is automatically done for you with `:first-child` and `:last-child` psuedo-selectors on all column classes.

Column-folding behavior is almost entirely automatic. The only exception is gutter clearing behaviors on deeply nested items after column folding occurs - in some situations we can not know what columns are now first or last in their rows. This will cause the column to be inset from the edge of the container. The example below solves this by introducing `first-column` classes, along with `tablet-first-column` and `phone-first-column`.

<div class="grid-example clearfix">
  <div class="column-8">
    <span>column-8</span>
    <div class="column-4">
      <span>column-4</span>
    </div>
    <div class="column-4">
      <span>column-4</span>
    </div>
  </div>
</div>

```
<div class="column-8">
  <span>column-8</span>
  <div class="column-4">
    <span>column-4</span>
  </div>
  <div class="column-4">
    <span>column-4</span>
  </div>
</div>
```


[View the example]({{relativePath}}/examples/grid/#nested-columns)
