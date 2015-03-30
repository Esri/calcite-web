## Ruby Gem

To install Calcite Web as a ruby gem, add a reference of the gem to your Gemfile:

```ruby
gem "calcite-web", :git => "https://github.com/Esri/calcite-web.git", :tag => "v0.0.10"
```

Be sure to use the most [up-to-date tag](https://github.com/Esri/calcite-web/releases).

Then in your project's Sass file, just import it:

```scss
@import "calcite-web";
```

That will give you everything including Sass utilities. You will also need to copy over the JavaScript and image assets to your static folder [(see above)](/#static-files).

Calcite Web has a built in library of mixins that cover everything from animation to font-size. To be sure you're building your site in the easiest way (and the most visually consistent way) read up on everything that's available on the [Sass Page](./sass).
