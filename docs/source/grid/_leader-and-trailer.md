## Leader and Trailer

The leader and trailer classes are designed for quick vertical adjustments with markup. The standard `leader-n` and `trailer-n` classes add top and bottom margin to the element, as multiples of the `$baseline` variable, or 1.5rem.

The `padding-` prefix adds lines of padding instead of margin, and both classes can be used in conjunction.

Clacite Web provides a `$vertical-range` variable that sets the maximum value of `n` for the `leader-n` and `trailer-n` classes at 6.