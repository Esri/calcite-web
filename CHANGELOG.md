## v0.0.11

### Modified
- Alerts now are colored better, higher z-index, and subtle drop shadow
- Sass now rendered with [grunt-sass](https://github.com/sindresorhus/grunt-sass)

### Added
- `.table-blue.table-striped`

## v0.0.10

### Modified
- Change bold styles on body from Frutiger 65 to Frutiger 55

## v0.0.9

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

## v0.0.8

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

## v0.0.7

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

## v0.0.6

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

## v0.0.5

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

## v0.0.4

Documentation and small style additions.

### Added
- Favicon
- `img` tags now get max width of 100%
- Typography documentation

## v0.0.3

Additional styles, beginning documentation site.

### Modified
- Change color of border-bottom on third-nav
- Fixed font weight on active third nav link
- Adding structure for documentation

### Added
- `<code>` styles for code blocks and inline code

## v.0.0.2

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

## v0.0.1

Begin foundational sass for the framework.

### Modified
- New grayscale color values

### Added
- Colors
- Type Styles
- Grid
- Sass Utils
- Breadcrumbs

## v0.0.0

### Added
- Documentation Site
- KSS Parser
- CSS Reset
- Grunt Workflows
