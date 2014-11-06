## Ruby Gem

To install Calcite-Web as a ruby gem, add a reference to the gem to your Gemfile:

```ruby
gem "calcite-web", :git => "https://github.com/ArcGIS/calcite-web.git", :tag => "v0.0.0"
```

Be sure to use the most up to date tag.

Then in your project's sass file, just import it:

```scss
@import "calcite-web";
```

That will give you everything including sass utilities. You will also need to copy over the javascript and image assets to your static folder (see above).

Calcite Web has a built in library of mixins that cover everything from animation to font-size. To be sure you're building your site in the easiest way (and the most visually consistent way) read up on everything that's available on the [SASS Page](./sass).