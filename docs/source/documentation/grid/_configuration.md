If you are using Calcite Web as a Sass library, you can customize the grid with Sass variables. Below are the different settings you have access to and their default values:

| Variable                    | Default              | Description                                       |
| --------------------------- | ------------------   | ------------------------------------------------- |
| `$small`                    | 480px                | Smallest (phone) breakpoint size in pixels        |
| `$medium`                   | 860px                | Medium (tablet) breakpoint size in pixels         |
| `$large`                    | 1450px               | Default (desktop) breakpoint size in pixels      |
| `$vw-ratio`                 | 0.95                  | Amount of screen used by grid (0 - 1)             |
| `$column-gutter`            | 1rem                 | Space between columns                             |
| `$ie8-support`              | false                | Whether you'd like to support Internet Explorer 8 |
| `$container-width` | 95vw                | Fluid container size                              |
| `$column-gutter-fallback`   | 20px                 | Fallback for space between columns for IE8        |
| `$container-width-fallback` | 960px                | Fixed container size                              |
| `$large-class`              | large               | Prefix word desktop size columns                  |
| `$large-column-count`       | 36                   | How many columns to use past the desktop breakpoint |
| `$default-column-count`       | 24                   | How many columns to use on the desktop breakpoint |
| `$medium-class`             | tablet               | Prefix word for tablet breakpoint                 |
| `$medium-column-count`      | 12                   | How many columns to use on tablet breakpoint      |
| `$small-class`              | phone                | Prefix word for phone breakpoint                  |
| `$small-column-count`       | 6                    | How many columns to use for phone breakpoint      |
| `$vertical-range`           | 6                    | How many leader and trailer classes to generate   |


You can override these values to create a custom, project-specific grid in your own project. For example, to use a 16 column grid instead of the default 24 columns, you would set the `$default-column-count` variable before importing the library:

```
$default-column-count: 16;
@import calcite-web;
```

