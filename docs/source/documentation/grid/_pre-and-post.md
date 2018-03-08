Pre and Post classes are used to move your columns laterally across the grid by defining how many columns they should be from their neighbors on either side.

Pre and Post classes do not responsively fold. This prevents a `pre-5` from pushing content off the edge of the screen on phone sizes. Responsive `tablet-` and `phone-` classes are exposed for defining pre and post behavior on breakpoints.

Pre and post helpers are available from `.pre-1` and `.post-1` to `.pre-24` and `.post-24`.

<div class="grid-example clearfix">
  <div class="column-8 pre-2">
    <span>column-8 pre-2</span>
  </div>
</div>

```
<div class="column-8 pre-2">
  <span>column-8 pre-2</span>
</div>
```
[View the example]({{relativePath}}/examples/grid/#pre-and-post)
