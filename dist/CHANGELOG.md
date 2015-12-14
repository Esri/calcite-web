## 1.0.0-beta

### Added
- `margin-left`, `padding-left`, `margin-right`, and `padding-right` alias classes for gutters.
- `margin-gutter()` mixins for margin-left/right support.

### Fixed
- Removed underlines on `:hover` for icons inside of links
- Zero margin on `p:empty`
- Style <select multiple>

### Modified
- Changes hover and active on side nav to subtle blue backgrounds
- Darkened sidenav link color to meeet WCAGAA with the new active state background.
- Bottom margin on `<figure>` set to 1 baseline from 2.

### Removed
- **BREAKING** Removed automatic button style inheritance for `input[type='button']`. Using the `.btn` class is now required.

## 0.15.1

### Fixed
- Greater specificity for input group inputs

## 0.15.0

### Added
- `esri-icon-light-blue`
- `icon-ui-light-blue`
- `esri-icon-dark-blue`
- `icon-ui-dark-blue`

### Fixed
- Set vietnamese to Helvetica
- Set max width on selects
- Dont override focus on input type submit

### Modified
- Default behavior is now always 24 columns with a width defined by `$container-width`. Default is 1450px, but can be set to 960px for a 960 grid.
- Clicking on modal overlay no longer closes modal
- Slightly less padding on panels

### Removed
- Filter dropdown pattern

## 0.14.6

### Fixed
- Hard pixel values blend with grid system

## 0.14.5

### Modified
- Base tool chain for generating icon font and documentation switched to Fontforge (python).
- Variableify Avenir Next font imports
- Document include variables for custom build

### Added
- `dropdown-title`

### Fixed
- Sticky elements will now recalculate their height correctly when elements change


## 0.14.4

### Fixed
- fix weird bug in Chrome for Windows on elements with `scroll: auto` (https://github.com/ArcGIS/arcgis-for-developers/issues/3082#issuecomment-149293246)

### Modified
- Hover state for side nav link
- Panel links vibrant blue
- `is-active` state on side nav links reverted
- Better size and positioning for arrows on dropdowns
- icons should inherit line height, not declare it

## 0.14.3

### Fixed
- `overflow: auto` removed from tab sections, which caused a bug on pre's when zoomed in.

### Modified
- `<code>` in `.panel` background white
- Default body weight set to regular from light
- Update fonts.com to allow access to *.cybertech.com

## 0.14.2

### Fixed
- Resolved breaking change in icons

## 0.14.1

### Fixed

- Alignment of items in top nav with top of page
- Filter dropdowns work inside modals
- Syntax bug in small last column right to left support
- Ruby gem uses /dist instead of /lib

### Modified

- Made user image in top nav smaller and with less padding
- Changes font name for icon font
- Pre and Code line heights, sizes
- Pre and Code blocks inside tabs
- Nested lists dont need margin bottom
- Updated Google Plus social icon
- A hair of padding top added to `<textarea>` to match text input

### Fixed
- No clear button doesnt destroy app

### Added
- `alert-yellow`

## 0.14.0

### Fixed
- `.top-nav-link` `:hover` and `.is-active` state fallback for IE8 & 9

### Modified
- Changed build process for icon fonts
- Changed unicode mapping for icon glyphs

## 0.13.3

### Modified
- Pixel perfect search submit button

### Fixed
- Fix nested media query bug for ie in the grid

## 0.13.2

### Added
- `.btn-clear-disabled`
- `.icon-ui-small` modifier to make icons about 3/4 existing size
- `.icon-ui-flush` modifier to remove any padding
-  Minimal `<dl>` styles

### Modified
- `.panel-light-blue` is now slightly darker with light text
- `.nav-bar-title` is now slightly larger with less right margin
- Search icon baked into search-submit button, padding cleared
- Transparent button underlines like links
- Links hover darker

### Fixed
- Line height has been fixed for `h2`'s and `h4`'s with multiple lines
- Text alignment helpers support rtl
- Modal supports rtl properly

## 0.13.1

### Modified
- Filter dropdown item close button unique and solitary entity.
- Dropdown button down arrow positioned absolute to work with `text-ellipsis`
- Slight change to user navigation example markup

### Fixed
- Browser bugs for filter dropdown

### Added
- `.btn-clear-disabled`
- Right to left support
- Polyfill for `focusin` events
- Polyfill for `strinc.includes()`
- Some cool new icons
- Codeblocks inside tab styles other than `tabs-gray` are now styled normally.
- Make import variables more granular

## 0.13.0

### Fixed
- `include` rather than `extend` clearfix in column base and grid container. Fixes error of invalid sass in ruby.
- Include column base in the `column` mixin rather than extend a class that doesn't exist.

### Modified
- Dark blue hover slightly desaturated.

### Added
- `.filter-dropdown` interactive pattern.

## 0.12.1

### Added
- Panel Black

### Fixed
- Surpise! Blue and Red really accessible now.

## 0.12.0

### Fixed
- Bug where long dropdowns wrapped just the arrow to the next line
- Cursor should be pointer on side nav
- Bug where hovering on a third nav caused text to flicker strangely

### Modified
- Top nav links get same style on `:hover` and `:focus`, remove default outline
- Buttons are one step lighter, get darker on hover

### Added
- `.label` component for calling out text
- Grid columns turn themselves off for printing

## 0.11.7

### Fixed
- Accordion binds to specified class, not section siblings.

## 0.11.6

### Modified
- Dropdown button gets `cursor: pointer`

### Added
- Optional prefix for grid system
- No `text-indent` on third nav

### Fixed
- Don't set fixed height on `textarea` elements
- Check for elements before binding to elements.

## 0.11.5

### Fixed
- add icon_names for social icons to API (#328)

## 0.11.4

### Removed
- Unicode Sass variables

### Fixed
- Correct user-nav pattern
- Set height on buttons in input groups
- Fix form elements in ie9, ie10, firefox, and safari (#270)
- Small fix to tooltips ie9, ie10, firefox, and safari

### Modified
- All patterns that used unicode characters now use icons from ui font

### Added
- `fade-in` class for fading in elements on page load
- Responsive Javascript for the third nav.

## 0.11.3

### Fixed
- Sticky elements show up twice (#314)
- JavaScript patterns bind in sticky elements (#315)

## 0.11.2

### Removed
- Bin script for calcite icons
- `column-base` now has no margin

### Fixed
- Responsive `pre` and `post` apply to correct screen sizes
- Columns with medium but no small column render properly
- Breadcrumb separator no longer gets underlined

### Modified
- `column`, `pre`, and `post` at standard size apply at large size

### Added
- `breadcrumbs-white` modifier for light-on-dark breadcrumbs

## 0.11.1

### Removed
- No dependency on patterns-color repo (variables are added by hand)
- Carousel configuration
- No calcite icon scss

### Modified
- Codeblocks inside tabs are automatically formatted correctly
- Minor changes to `pre > code` elements (slightly smaller type size)
- Vertical align `input-group-input`
- Cool plus and minuses on accordions
- Simplified expanding nav

### Fixed
- Leader and trailer classes were being imported twice
- Only bind close click on accordion section title
- Init `sticky` first so other patterns bind to duplicated nodes

## 0.11.0

### Removed
- Calcite color icons are not a thing we're including. Removing the doc space for this.

### Added
- Set `video` to 100% max width
- Document hero subnav.
- Loader bar container div relative

### Modified
- `.panel` uses `$off-white` instead of `$lightest-gray`
- Add proper icons to accordion
- Overflow-x scroll and no-wrap on third-nav
- Expanding nav and search pattern

## 0.10.5

### Added
- `.link-light-blue`

### Fixed
- Style links inside of panels
- Pre and Post scoping properly

## 0.10.4

### Fixed
- `.esri-logo` uses `$image-path` instead of hard-coded location

## 0.10.3

### Fixed
- Columns collapse properly without a max-width
- Minor documentation fixes
- Sticky.js no longer relies on scroll, solving window resize bugs

### Added
- Multiple languages for type treatments
- Cyrillic font face declarations
- More intentional responsive design for subnav pattern

### Removed
- Removed the `max-width` declaration in the `column` and `column-width` mixins

## 0.10.2

### Modified
- Tabs get same style on hover and focus
- `inline` helper class is now named `inline-block`
- Links now have `text-decoration: underline` on hover instead of cool background hack
- Updated footer with legal copyright information
- List style type disc rather than circle

### Added
- `list-plain` for plain unordered lists (no bullets)

### Fixed
- Fix bug with columns inside panels

## 0.10.1

### Modified
- Fix Bugs

## 0.10.0

### Modified
- No button borders except on hover
- Darken button colors for accessibility.
- Top Nav finalized

### Added
- `btn-white`
- `placeholder` mixin
- Site Search pattern

### Removed
- `btn-orange`

### Fixed
- Clicking a dropdown button when the dropdown is open closes the dropdown
- Ie9 Shim for `<main>`
- Ie9 Shim for `<input>` line height
- Ie9 Shim for `.tooltip` line height
- Prefixerize transform property in tooltips
- Resizing window recalculates and rebind stickies


## 0.9.2

### Modified
- Sample code for form input include text for accessibility.
- Minor doc fixes
- Tab hover moved to above element
- Top nav active state above element
- Top nav hover blue
- Top nav font size one step down scale

## 0.9.1

### Modified
- Accordion meets accessibility requirements
- Tabs meet accessibility requirements
- Tab hover has blue bar above

## 0.9.0

### Added
- Documentation and structural patterns have proper `aria-role` and other required attributes
- Grid documentation for large columns
- Updated type documentation
- Skip to Content component

### Modified
- `imports` is now accessed at `calcite-web/imports`
- Links darker blue, with underline on hover
- Alert text color transparent black
- Icon font setting font family on `:before`
- Modal meets accessibility requirements
- Drawer meets accessibility requirements
- Dropdown meets accessibility requirements
- Icon font standardized, more icons added

### Fixed
- `$generate-css: false` now generates no CSS

## 0.8.0

### Modified
- Removed margin-top on `sub-nav-list`
- Fix accordion hover
- Side-nav and accordion borders fixed in all states
- Tighten up sub-nav vertically
- Panels have padding and border by default
- Improve panel colors
- Improve vertical-spacing of sub-nav

### Added
- Automatically remove margin-bottom on the last element in a panel
- `panel-no-border` and `panel-no-padding` classes for panels
- Add `is-active` state for side navigation

## 0.7.0

- General documentation improvements/updates

### Added

- `input-group` component
- `action-bar` component

## 0.6.1

### Added
- Badges

### Modified
- Icon font has baked-in padding right

## 0.6.0

### Fixed
- Modals not blurry

### Modified
- `.text-rule` color is now the same as `<hr>`
- `<hr>` elements now have slightly less margin top and bottom
- `sub-nav-title` is no longer floated left (enables larger banner-like subnavs)

### Added
- Styled list items by default

### Removed
- `.bulleted-list` removed as bulleted lists are default

## 0.5.2

### Added
- `calcite-web/scss/imports` for all sass with no css

### Modified
- Inputs have small inset box-shadow

### Fixed
- Fonts now included in dist

### Improvements
- Focus states for form controls now consistent

## 0.5.1

### Added
- `.grid-full` for opt-in to 26 column system
- Block groups to 8 up

### Modified
- Default grid behavior centers column-24 on large screen sizes
- Changed edge padding back to .04vw from 0.01.vw

## 0.5.0

### Added
- First version of icon font
- `$font-path` variable for configuration of font folder

### Modified
- Updated Patterns Color dependency to v0.1.1
- Calcite color icons now referenced with `icon-calcite-` and `icon-calcite-large` icon classes

### Removed
- Removed vecticons in favor of icon font

## 0.4.0

### Added
- Social media icons
- `$image-path` variable for configuration of image folder
- `calcite.toggleClass()` exposed on public calcite-web.js api

### Breaking Changes
- Removed `calcite.getAttr()` as `Element.getAttribute()` support is IE8+

## 0.3.1

### Improvements
- `calcite-web.js` patterns can be passed a specific dom node as context when they are initialized.
- Updated JavaScript documentation
- Proper registration as CommonJS module

## 0.3.0

### Improvements
- Removed ~ 230 LOC from calcite-web.js

### Fixed
- Fixed interpolation of variables in the `keyframes` mixin
- Fixed modals always closing on any click if open
- Document modals properly

### Modified
- Increase large breakpoint to 1450px
- Add `extra-large-leader-n`
	- Trailer
	- Padding-leader
	- Padding-trailer
- Add `extra-large-column-n` to 36 columns
- Remove `container-max` and `container-min`
- `extra-large-hide` and `-only`

### Removed
- Remove carousel pattern (will be its own project)

## 0.2.3

### Modified
- Pair Avenir Demi with Avenir Light for default strong
behavior
- Clicking in drawer while drawer is open will not close drawer

### Fixed
- Fix dropdowns in IE9

## 0.2.2

### Fixed
- Set avenir face on buttons
- Use `https` for font imports
- Table rows now have the same `font-weight` as the body
- Selects have more right padding

### Added
- Tailcoat migration guide
- Code style guides (CSS, HTML, JS)

### Modified
- Wrap navigation patterns in a `column-24`
- Fix typography documentation

## 0.2.1

### Modified
- `.footer` has default `padding-top`

### Fixed
- Fix tooling for deploy and s3
- Fix problem with font loading

## 0.2.0

### Modified
- Tooltips use `aria-label` for tooltip text
- Modify tooltip styles
- Multi-line tooltips
- Custom `select` style

### Removed
- `label.required`

## 0.1.2

### Added
- `files` key in `package.json`

## 0.1.1

### Added
- Color dependency copied out of `node_modules` and into `dist` on release.

### Modified
- `.block` extends new default typeface.

## 0.1.0

### Modified
- `.container` class now `.grid-container`
- Alerts now are colored better, higher z-index, and subtle drop shadow
- Sass now rendered with [grunt-sass](https://github.com/sindresorhus/grunt-sass)
- Panels work with columns
- Avenir Next Light is default body typeface
- Avenir no longer variablized
- `header-face` => `avenir-regular`
- `body-face` => `content-face`

### Added
- Third nav hover state
- `label.required`
- `.input-warning`
- `.input-success`
- `.table-blue.table-striped`
- Additional panel options
- IE9 bugfixes
	- `.gif` fallback for loader component
	- `transform2d` for drawers, modals


## 0.0.10

### Modified
- Change bold styles on body from Frutiger 65 to Frutiger 55

## 0.0.9

Animations, bug fixes, and general cleanup.

### Modified
- Clicking accordion sections toggles only that accordion
section
- Expanding nav now animates and takes up full screen
- Changed location of the `js-dropdown` class
- Visual changes to user dropdown
- Finessed default type styles for raw markdown
- Modals are more in line with best-practices

### Added
- Blockquote styles
- Sticky footer
- Sub Nav documentation
- Assets uploaded to s3 on release
- Deploy script works from grunt

## 0.0.8

Sample page layouts, typography.

### Added
- Added `esri-logo-condensed` class
- Blog layout
- Homepage layout
- Documentation layout
- Api reference layout
- `.font-size-x`
- `.gutter-left-x` and `.gutter-right-x`

### Modified
- Esri logo modified to fit in navigation better
- Removed `preventDefault` from `bindDrawer()` function.
- Small accordion and tab padding tweaks

## 0.0.7

JavaScript, documentation, and more patterns.

### Added
- Sticky scroll
- Sticky show
- JavScript for interactive patterns
- Invisible class
- Carousel pattern
- `transition-prefixed()` mixin

### Modified
- Minor padding right compression on .top-nav-title
- User nav now a real thing
- Move from Sass to LibSass
- Make default body size larger
- Minor adjustments on font-size at values less than 0
- Alpha counters on nested `ol`
- ITC Charter to Kepler
- Major rework of documentation tech stack

### Removed
- Color Map

## 0.0.6

More documentation, new JavaScript components, working icon tooling prototype.

### Added
- Inline helper class
- Drawers
- Expanding nav
- Search bar component
- User login component
- Esri logo component
- Button group support for all button styles
- `.sign-in` class for sign in + sign out buttons in top nav
- Modals
- Dropdowns

### Modified
- Disabled button style to look less clickable
- Tweak form styles
- Tighten panel padding
- Nav patterns now responsive

## 0.0.5

Forms, table improvements, type changes, in progress icon tooling, more documentation.

### Added
- Inputs
- Selects
- Radio Buttons
- Checkboxes
- Labels
- Legends
- `overflow-auto` - Helper class can wrap elements that break layout
- `input-error` - Outlines an input in red for user feedback

### Modified
- Nav patterns & Buttons no longer default to `.header-light` on retina.
- Buttons have a one pixel stroke
- Change header font of tables to Avenir Next
- Changed body font to Frutiger Light
- Make tables more compact
- Javascript namespace changed from `C` to `calcite`
- Renamed `dom.makeArray()` function to `dom.nodeListToArray`
- Added `arr` and `browser` subsets to `calcite` functions
- Moved `isTouch()` from `dom` to `browser`
- Moved `indexOf` from `dom` to `arr`
- Fixed `hr` border
- Added some usage examples to JS doc
- Copy editing

## 0.0.4

Documentation and small style additions.

### Added
- Favicon
- `img` tags now get max width of 100%
- Typography documentation

## 0.0.3

Additional styles, beginning documentation site.

### Modified
- Change color of border-bottom on third-nav
- Fixed font weight on active third nav link
- Adding structure for documentation

### Added
- `<code>` styles for code blocks and inline code

## 0.0.2

Lots of foundational styles.

### Modified
- Type adjustments

### Added
- Alerts
- Pagination
- Tables
- Tabs
- Modal
- Accordion
- Block Grid
- Code Styles

### Fixes
- Type Helpers Cascade Properly
- Leader-Trailer Helpers Cascade Properly
- Grid troubles

## 0.0.1

Begin foundational sass for the framework.

### Modified
- New grayscale color values

### Added
- Colors
- Type Styles
- Grid
- Sass Utils
- Breadcrumbs

## 0.0.0

### Added
- Documentation Site
- KSS Parser
- CSS Reset
- Grunt Workflows
