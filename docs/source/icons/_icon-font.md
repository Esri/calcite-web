The monochromatic icon set is delivered as an icon font. Icon fonts have several advantages such as the ability to quickly change their color, and the fact that icon fonts size themselves to be proportional to the text you place them with.

Monochromatic icons are generally 'interface' icons, and are named after the *action* you'd like to illustrate, instead of the *noun* the icon represents. For example, the delete icon has a class of `icon-delete` (the action) and not `icon-trash` (the noun). The reason for this is that if we decide another icon describes the action or idea better than the current one, we can change it without breaking existing code.

Icons in the icon font will be scaled to the text size of whatever element you add the class to. Below are all of the icons available in the icon font.

<div class="block-group block-group-3-up">
{% for icon in data.font.icons %}
<div class="block">
<span class="font-size-5 icon-ui-{{icon.properties.name}}" aria-label="{{icon.properties.name}}"></span>
<p class="trailer-1 leader-half"><code>icon-ui-{{icon.properties.name}}</code></p>
</div>
{% endfor %}
</div>

#### Icon Font Colors
<div class="block-group block-group-3-up">
<div class="block">
<span class="font-size-5 icon-ui-check-mark icon-ui-green" aria-label="check-mark "></span>
<p class="trailer-1 leader-half"><code>icon-ui-check-mark icon-ui-green</code></p>
</div>
<div class="block">
<span class="font-size-5 icon-ui-check-mark icon-ui-blue" aria-label="check-mark "></span>
<p class="trailer-1 leader-half"><code>icon-ui-check-mark icon-ui-blue</code></p>
</div>
<div class="block">
<span class="font-size-5 icon-ui-check-mark icon-ui-purple" aria-label="check-mark "></span>
<p class="trailer-1 leader-half"><code>icon-ui-check-mark icon-ui-purple</code></p>
</div>
<div class="block">
<span class="font-size-5 icon-ui-check-mark icon-ui-orange" aria-label="check-mark "></span>
<p class="trailer-1 leader-half"><code>icon-ui-check-mark icon-ui-orange</code></p>
</div>
<div class="block">
<span class="font-size-5 icon-ui-check-mark icon-ui-gray" aria-label="check-mark "></span>
<p class="trailer-1 leader-half"><code>icon-ui-check-mark icon-ui-gray</code></p>
</div>
<div class="block">
<span class="font-size-5 icon-ui-check-mark icon-ui-red" aria-label="check-mark "></span>
<p class="trailer-1 leader-half"><code>icon-ui-check-mark icon-ui-red</code></p>
</div>
</div>