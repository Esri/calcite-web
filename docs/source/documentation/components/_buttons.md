Buttons are created by adding a class of `btn` to either a `<button>` or `<a>` element. `btn-{color}` classes can be mixed with `btn-{style}` classes.

```html
<a href="#" class="btn"> Button </a>
<button class="btn">  Button </button>
<button class="btn btn-red btn-arrow">  Red Button with Arrow </button>
```

#### Active Buttons

A button can have the active (hover) state by adding a class of `active` to your `btn`:

<button class="btn active">Active button</button>

```html
<button class="btn active">Active button</button>
```

The difference is more obvious with buttons whose hover state and normal state have a more dramatic difference (e.g. `btn-clear`):

<button class="btn btn-clear active">One</button>
<button class="btn btn-clear">Two</button>
<button class="btn btn-clear">Three</button>

```html
<button class="btn btn-clear active">One</button>
<button class="btn btn-clear">Two</button>
<button class="btn btn-clear">Three</button>
```

#### Button Links

Sometimes, the proper semantic element is a button, but you would rather the element look more like a link. In these instances, Calcite Web provides an alternate class `btn-link` which styles a button element as if it were a simple anchor:

<button class="btn-link">This is a button</button>
```html
<button class="btn-link">This is a button</button>
```
