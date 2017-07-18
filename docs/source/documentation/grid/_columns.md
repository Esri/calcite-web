A column is a constant unit of measurement. The width of a column is dynamic, but always between a fixed range. Columns will never get too large or too small. As the viewport gets smaller the Calcite Grid System will simply put less columns on the page.

By default, large screens hold 24 columns, medium tablet-sized screens hold 12, and phone-sized screens hold 6. The grid will fold columns at these breakpoints. That means an element that is 3 columns wide will always be 3 columns wide, no matter how big or small the screen.

On large screens, 3 columns out of 24 is proportionally a small piece of screen real estate. On Phones, the Grid will leave the element at 3 columns wide -- proportionally more real estate, as 3/6 columns is more significant than 3/24.

To center a single column inside a grid container, you can use the helper class `center-column`.

<div class="grid-example clearfix">
  <div class="column-17">
    <span>column-17</span>
    <div class="column-8">
      <span>column-8</span>
    </div>
    <div class="column-9 tablet-first-column">
      <span>column-9</span>
    </div>
  </div>
</div>

```
<div class="column-17">
  <span>column-17</span>
  <div class="column-8">
    <span>column-8</span>
  </div>
  <div class="column-9 tablet-first-column">
    <span>column-9</span>
  </div>
</div>
```

[View the full example]({{relativePath}}/examples/grid/#columns)
