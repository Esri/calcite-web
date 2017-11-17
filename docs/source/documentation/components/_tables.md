Tables have not been styled by default. To style your tables, you must add the `table` class. If you'd like to style `<table>` elements without a class, you can set the `$namespace-tables` Sass variable to `false`. For more information on setting Sass variables see the [custom build documentation](../sass/#custom-build).

By default, a large table will break your layout horizontally. You can solve this problem by wrapping a table in a `<div>` with the `.overflow-auto` helper class:

```
<div class="overflow-auto">
  <table class="table">...</table>
</div>
```

Tables that are too wide for the layout will be constrained and scroll horizontally. This is especially helpful for responsive designs which scale down to be smaller than the table's minimum width.
