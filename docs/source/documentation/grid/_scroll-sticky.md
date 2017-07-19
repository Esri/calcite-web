Elements that become position fixed as they reach a certain position in the viewport are refered to as 'sticky'. The `js-sticky` class takes an `data-top=x` attribute that defines the point from the top of the window the sticky element will stick.

For example, the following `<div>` will become fixed when it is 46 pixels from the top of the viewport:

```
<div class="js-sticky" data-top="46">
  <a href="#" class="btn btn-clear">Back to Top</a>
</div>
```