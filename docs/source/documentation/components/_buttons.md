Buttons are created by adding a class of `btn` to either a `<button>` or `<a>` element. `btn-{color}` classes can be mixed with `btn-{style}` classes.

```html
<a href="#" class="btn"> Button </a>
<button class="btn">  Button </button>
<button class="btn btn-red btn-arrow">  Red Button with Arrow </button>
```

#### Button Links

Sometimes, the proper semantic element is a button, but you would rather the element look more like a link. In these instances, Calcite Web provides an alternate class `btn-link` which styles a button element as if it were a simple anchor:

<button class="btn-link">This is a button</button>
```html
<button class="btn-link">This is a button</button>
```
