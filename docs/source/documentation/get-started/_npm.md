To install Calcite Web with npm, type:

```
npm install --save-dev Esri/calcite-web#v{{data.pkg.version}}
```

You must add the current version in order to get the `dist/` folder.

Now, in your main `.scss` file, you can just require the framework:

```
@import "node_modules/calcite-web/dist/sass/calcite-web";
```