The leader and trailer classes are designed for quick vertical adjustments with markup. The standard `leader-n` and `trailer-n` classes add top and bottom margin to the element, as multiples of the `$baseline` variable, or 1.5rem.

The `padding-` prefix adds lines of padding instead of margin, and both classes can be used in conjunction.

Calcite Web provides a `$vertical-range` variable that sets the maximum value of `n` for the `leader-n` and `trailer-n` classes at 6.

Leader and trailer classes also have additional responsive `tablet-` and `phone-` prefix classes. These allow you to add different amounts of space above and below an element at different screen sizes.

For example, if you wanted an element to have 3 lines of margin above it on desktop, but that was too much on a phone, you could use responsive classes to specify that:

```
<div class="leader-3 phone-leader-1"></div>
```

These also apply to `padding-leader` and `padding-trailer`
