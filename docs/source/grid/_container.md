The `.grid-container` class is required to contain the grid. Using the  [column](#columns) classes without them being nested in a containing `div` will cause unexpected results.

The container class applies a max width to the content it contains and handles the column relationship with the viewport window, preventing collisions with scroll bars or other exciting bugs.

```html
<div class="grid-container">
	<div class="column-24">
		<blockquote>Contain the Columns</blockquote>
	</div>
</div>
```
