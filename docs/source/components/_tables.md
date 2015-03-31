## Tables

Tables have been styled by default. No extra classes are required, although there are some modifer classes available for specific flavors.

By default, a large table breaking your layout will horizontally scroll when it is too large for the layout. You can solve this problem by wrapping a table in a `<div>` with the `.overflow-auto` helper class:

```
<div class="overflow-auto">
  <table>...</table>
</div>
```

Tables that are too wide for the layout will be constrained and scroll horizontally.
