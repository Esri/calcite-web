Rather than load a specific font for code blocks, Calcite Web is designed to use a system font. For users that have Consolas installed, it is the preferred face for code blocks. Designed by Microsoft's Lucas DeGroot, [Consolas](http://www.fonts.com/font/microsoft-corporation/consolas) is a clean, readable, and simple monospace face for documenting code blocks.

### Consolas

<h2 class="code-face type-sample"> Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz</h2>

```js
// Example JavaScript rendered in Consolas
function $initHighlight (classes) {
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined) {
      console.log('undefined');
    }
  }
}

$initHighlight(["class1", "class1", "class1"]);
```
