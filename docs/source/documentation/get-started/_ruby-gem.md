To install Calcite-Web as a ruby gem, reference the gem from your `Gemfile`:

```
gem "calcite-web", :git => "https://github.com/Esri/calcite-web.git", :tag => "v{{data.pkg.version}}"
```

This makes Calcite Web available as a Compass extension. To use Calcite Web, make sure you require the gem in your compass config file (usually found at `config/compass.rb`). An example config file might look like this:

```ruby
require "calcite-web"

css_dir = "stylesheets"
sass_dir = "sass"
```

Then in your project's sass files, just import it:

```
@import "calcite-web";
```

That will give you everything including Sass utilities. You will also need to copy over the JavaScript and image assets to your static folder [(see above)](./#static-files).

Calcite Web has a built in library of mixins that cover everything from animation to font-size. To be sure you're building your site in the easiest way (and the most visually consistent way) read up on everything that's available on the [Sass Page](./sass).
