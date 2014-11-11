## Rows

Because columns can now be nested without changing their behavior, we don't need rows, really. However, you still may find that a tall, narrow column with a short wide neighbor can cause float issues with subsequent columns.

With this grid you can wrap the first two columns in a 24 column grid, which will act in the same manner as a row.

</div></div>
<div class="container grid-example">
<div class="column-2"><span>.column-2 With a lot of content, so it pushes down.</span></div>
<div class="column-22"><span>.column-22</span></div>
<div class="column-4"><span>.column-4</span></div>
<div class="column-4"><span>.column-4</span></div>
<div class="column-4"><span>.column-4</span></div>
<div class="container"><div class="column-24"><div class="column-15 pre-7">

The above set of column-4 divs are snapping up next to the very tall column-2 div. Wrapping each row of columns in a single div with a width of the row length creates proper row behevior.

</div></div></div>
<div class="column-24">
<div class="column-2"><span>.column-2 With a lot of content, so it pushes down.</span></div>
<div class="column-22 tablet-first-column"><span>.column-22</span></div>
</div>
<div class="column-4"><span>.column-4</span></div>
<div class="column-4"><span>.column-4</span></div>
<div class="column-4"><span>.column-4</span></div>
</div>

<div class="container"><div class="column-15 pre-7">