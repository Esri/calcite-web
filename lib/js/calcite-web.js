// ┌────────┐
// │ Bundle │
// └────────┘
// This file imports all the named ES6 exports
// and attaches them to the same object (calcite).
// For more information about using the bundle vs. using individual
// ES6 modules, see esri.github.io/calcite-web/documentation/javascript/#importing
import {
  bus,
  accordion,
  dropdown,
  sticky,
  tabs
} from '../../es6';

function init () {
  [accordion,dropdown,sticky,tabs].forEach(function (pattern) {
    pattern();
  })
}

export default {
  bus,
  accordion,
  dropdown,
  sticky,
  tabs,
  init
};
