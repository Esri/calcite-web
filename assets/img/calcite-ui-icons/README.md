# calcite-ui-icons

A collection of UI SVG icons created by Esri for mapping applications.
https://esri.github.io/calcite-ui-icons/

## Installation

`npm install @esri/calcite-ui-icons --save`

## Description

Icons come in two styles:

* **filled**
* **outlined**

and 3 sizes:

* **16x16**
* **24x24**
* **32x32**

### Why 3 Sizes?

More info on what happens when you scale vector based icons [here](https://github.com/Esri/calcite-ui-icons/wiki/What-Happens-When-You-Scale-Vector-Based-Icons)

### Outline icons are the standard
Outline icons have the default name. For eample, `trash-16.svg` will render the default outline icon.

If needed, appending `-f` (`trash-16-f.svg`) will render the filled version.

**Outline icons should be the primary icons to be used.**

### Sprite packages
Furtheremore, sprites are available in 6 packages and live ouside the `icons/` directory:

* sprite-16.svg
* sprite-16-f.svg
* sprite-24.svg
* sprite-24-f.svg
* sprite-32.svg
* sprite-32-f.svg

Filenames that contain `-f` contain filled icons only.
Icons in the sprite have an `id` of the individual SVG file name.

### JSON Format

All icons are also provided as part of a JSON file. If you installed via npm, requiring the library will give you access to all the icons and their path data:

```js
var calciteIcons = require('@esri/calcite-ui-icons');
```

This will give you an object containing all the icons in the library at all sizes in outlined and filled styles:

```js
{
  version: '{current version number}',
  icons: {
    blog: {
      alias: ['social'],
      category: 'Social-Media',
      filled: {
        16:['M15.541...'],
        24:['M23.756...'],
        32:['M31.618...']
      },
      outline: {
        16:['M15.541...'],
        24:['M23.756...'],
        32:['M31.618...']
      }
    },
    ...
  }
}
```
_Note: path data ommitted for brevity_.

### Individual icons structure
All the individual SVG icons have a common file structure.

This is what the `close-16.svg` looks like:

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <path d="M0 10V7h10.965l-5-5H9.5L16 8.5 9.5 15H5.964l5-5H0z"/>
</svg>
```

None of the icons have `stroke` attributes. The `fill` attribute can be defined with css:

```
svg {
  fill: gray;
}
```

All the other styling properties applicable to the whole svg element are applicable.

```
svg:hover {
  fill: blue;
}
```

## Licensing

COPYRIGHT © 2018 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

## Contributing
Please read the [contribute document](CONTRIBUTE.md).
