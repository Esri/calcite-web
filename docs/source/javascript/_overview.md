<h1 class="leader-0" id="overview">JavaScript</h1>

Calcite Web includes a small JavaScript library. `calcite-web.js` is a lightweight and dependency-free library made to enable behaviors for [JavaScript dependent patterns](../patterns/#javascript-dependent).

To use `calcite-web.js` simply [include a reference to it in your html](../patterns#basic-html-page) and then run the `calcite.init()` method. For example, say your JavaScript was located in a file called `script.js`. You can bind all the JavaScript patterns from `script.js` like this:

```js
// On document ready
window.onload = function () {
  // Initialize all calcite.js patterns
  calcite.init();
};
```
