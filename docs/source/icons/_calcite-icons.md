Color icons can't be delivered as an icon font, so they are delivered as basic SVG files. These icons generally describe specific tools.

You cannot change the colors of these icons, but you can change the size. Full color icons are provided at two specific sizes. Adding either the `icon-calcite-large-X` or `icon-calcite-X` class to an element will add a pseudo element before that element with the correct icon at the correct size. Below are the current set of Calcite icons as classes in Calcite Web.

<div class="block-group block-group-3-up">
{% for icon in data.icons.calcite %}
<div class="block">
<a href="" class="icon-calcite-large-{{icon}}" aria-label="{{icon}}"></a>
<a href="" class="gutter-left-1 icon-calcite-{{icon}}" aria-label="{{icon}}"></a>
<p class="trailer-1"><code class="font-size--3">.icon-calcite-{{icon}}</code></p>
</div>
{% endfor %}
</div>
