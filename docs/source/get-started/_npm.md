To install Calcite Web with npm, type:

```bash
npm install --save-dev git://github.com/Esri/calcite-web.git
```

You can also use a specific release by appending the version number to the end:

```bash
npm install --save-dev git://github.com/Esri/calcite-web.git#v0.0.10
```

Then, if you're using sass, be sure to add `node_modules/calcite-web/dist/sass/` to your load path along with the `list-files.rb` script (used for automatically generating sass from a folder of icons. If you're using `grunt-contrib-sass` you add that like this:

```js
'sass': {
  target: {
    options: {
      loadPath: 'node_modules/calcite-web/dist/sass/',
      require: './lib/list-files.rb'
    },
    files: {
      'path/to.css': 'path/to.scss'
    }
  }
}
```

Then in your main `.scss` file, you can just require the framework: `@import "calcite-web";`. Everything mentioned about mixins above in the [Ruby gem section](/#ruby-gem) applies to the Node module as well, so scroll up a bit and learn more about how Calcite Web functions as a Sass library;
