## 1.1.2

### Fixed
- Add `platform` property as a fallback for social media classes (#134)
- Use `rel=noopener` on social links
- When only search is used, divider is now hidden (#200)
- remove text decoration from `header-brand-link`

## 1.1.1

### Fixed
- remove non-unique ids (accessibility violation)
- social link markup structure now more accessible
- fix missing ids for aria labels
- hide inline search toggle when using normal search (and vice sersa)
- set profile image alt tag to user's name

## 1.1.0

### Added
- notifications UI (#33)
- now can set links to active with `active: true`
- inline search pattern (for suggestions, top results)

### Modified
- Social icons open in new window
- App Switcher now expects svg path data instead of url to image

### Fixed
- IE 11 browser fixes
- Fixed several spacing/alignment inconsistencies
- small accessibility fixes
- fixed bugs with images rendering with `undefined` id attribute

## 1.0.8

### Added
- Distributor Logo
- Drag and Drop in the App Switcher

## 1.0.7

### Fixed
- fix `brandText` when used with Calcite Web
- fix `brandText` spacing if used with brand `image`

## 1.0.6

### Fixed
- fix "app mode" hamburger alignment
- fix inconsistent spacing

### Added
- added ability to set title as text if no logo is available (#27)

## 1.0.5

### Fixed
- fix drawer misalignment
- fix `sublist--featured` grid missing padding
- fix input styles when used with Calcite Web
- fix link styles when used with Calcite Web
- fix social link color on hover

## 1.0.4

### Modified
- Made a few tweaks to improve screen reader performance
- Resolved issue with top navigation centering the menu


## 1.0.3

### Modified
- Bundled CSS and JS files in `dist` are now available after install
- Component is bundled as UMD instead of IIFE by default

## 1.0.2

### Added
Top Stripe
Images to nav items

### Modified
Build

### Breaking
Nothing hopefully


## 1.0.1

### Added
New gulp build

### Modified
Folder structure and removed several unneeded files

### Breaking
Nothing hopefully
