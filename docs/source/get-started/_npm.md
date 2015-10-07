To install Calcite Web with npm, type:

```
npm install --save-dev Esri/calcite-web#v0.14.1
```

You must add the current version in order to get the `dist/` folder.

Then, if you're using sass, be sure to add `node_modules/calcite-web/dist/sass/` to your load path. If you're using `grunt-contrib-sass` you add that like this:

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
