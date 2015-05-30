## Icon Font

The monochromatic icon set is delivered as an icon font. Icon fonts have several advantages such as the ability to quickly change their color, and the fact that icon fonts size themselves to be proportional to the text you place them with.

Monochromatic icons are generally 'interface' icons, and are named after the *action* you'd like to illustrate, instead of the *noun* the icon represents. For example, the delete icon has a class of `icon-delete` (the action) and not `icon-trash` (the noun). The reason for this is that if we decide another icon describes the action or idea better than the current one, we can change it without breaking existing code.

Icons in the icon font will be scaled to the text size of whatever element you add the class to. Below are all of the icons available in the icon font.

<div class="block-group block-group-3-up">
{% for icon in font.icons %}
<div class="block">
<span href="" class="font-size-4 icon-ui-{{icon.properties.name}}" aria-label="{{icon.properties.name}}"></span>
<p class="trailer-1"><code>.icon-ui-{{icon.properties.name}}</code></p>
</div>
{% endfor %}
</div>
