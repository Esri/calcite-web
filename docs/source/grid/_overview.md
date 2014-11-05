<h1 class="leader-0">Calcite Grid System</h1>

The Calcite Grid System is based on an open source project from Esri PDX called [viewport grid](http://esripdx.github.io/viewport-grid/). This grid system is different from standard css grid systems in two key ways;

00. Column widths are defined by the viewport size rather than percentage of their containers.
00. Built-in smart defaults for responsive sizing puts less columns across the screen at smaller sizes, rather than smaller columns.

These two principles mean that a column becomes standard unit of measurement, creating a constant and abstracted grid system that stands behind the content of a page rather than within it.

### The Grid
| Max Width | Breakpoint | No. Columns |
| --------- | ---------- | ----------- |
| 1280px    | Desktop    | 24          |
| 860px     | Tablet     | 12          |
| 480px     | Phone      | 6           |
