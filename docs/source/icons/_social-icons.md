<h1 class="leader-0" id="overview">Social Icons</h1>

A set of social icons are provided as part of calcite-web. Just use the `icon-social-X` class on an element. It is suggested you add an aria-label to help the visually impaired understand what the element with the icon represents as they won't be able to see the Facebook logo, for example:

```html
<span class="icon-social-facebook" aria-label="Facebook"></span>
```

Below are the current social icons. More sizes are planned. For now only 30x30 pixel square icons are available.

<div class="block-group block-group-3-up">
{% for icon in icons.social %}
<div class="block">
<a href="" class="icon-social-{{icon}}" aria-label="{{icon}}"></a>
<p class="trailer-1"><code>.icon-social-{{icon}}</code></p>
</div>
{% endfor %}
</div>
