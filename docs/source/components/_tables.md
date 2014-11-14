## Tables

Tables have beens styled by default. No extra classes are required, although there are some modifer classes available for specific flavors.

By default, a large table breaking your layout will horizontally scroll when it is too large for the layout. You can solve this problem by wrapping a table in a `<div>` with the `.overflow-auto` helper class:

```
<div class="overflow-auto">
  <table>...</table>
</div>
```

This causes tables that are too wide for the layout to be constrained and scroll horizontally.