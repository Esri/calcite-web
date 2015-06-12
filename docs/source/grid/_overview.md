The Calcite Grid System includes a full, responsive, and configurable grid with columns, a container, and a 'Block Group' grid. The main grid is different from standard css grid systems in two key ways:

1. Column widths are defined by the viewport size rather than percentage of their containers.
2. Built-in smart defaults for responsive sizing puts less columns across the screen at smaller sizes, rather than smaller columns.

These two principles mean that a column becomes a standard unit of measurement, creating a constant and abstracted grid system that stands behind the content of a page rather than within it.

On very large screens like the apple cinema display, an extra large 36 column grid can be optionally used. This grid has no max width, and is useful for full screen web applications.

### The Grid

| Max Width | Breakpoint | No. Columns |
| --------- | ---------- | ----------- |
| n/a       | Cinema Display    | 36   |
| 1450px    | Desktop    | 24          |
| 860px     | Tablet     | 12          |
| 480px     | Phone      | 6           |
