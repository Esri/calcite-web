Tables have been styled by default. No extra classes are required, although there are some modifier classes available for specific flavors.

By default, a large table will break your layout horizontally. You can solve this problem by wrapping a table in a `<div>` with the `.overflow-auto` helper class:

```
<div class="overflow-auto">
  <table>...</table>
</div>
```

Tables that are too wide for the layout will be constrained and scroll horizontally. This is especially helpful for responsive designs which scale down to be smaller than the table's minimum width.
