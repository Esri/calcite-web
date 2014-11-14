## Container

The `.container` class is required to contain the grid. Using the  [column](#columns) classes without them being nested in a containing `div` will cause unexpected results.

The container class applies a max width to the content it contains, and handles the columns relationship with the viewport window, preventing collusions with scroll bars or other exciting bugs.

```html
<div class="container">
	<div class="column-24">
		<blockquote>Contain the Columns</blockquote>
	</div>
</div>
```