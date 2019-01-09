---
title: Mobile
description: Helpful tips for using Calcite Web to develop responsive experiences
layout: layouts/_guide:text
---

Making your web experiences mobile friendly can be challenging, but Calcite Web can help! Below are some easy ways you can improve your site for mobile, along with some tips and resources to dig in further.

## 1. Use Calcite Web's responsive classes

There are lots of helper classes built in to Calcite Web meant to assist developers in making their sites responsive.

### Grid

Calcite Web's twenty-four column grid will do a lot of the heavy-lifting for you in terms of responsive design. Column widths and counts are automatically shifted on both tablet and phone sizes to accommodate less screen real estate. In this way Calcite Web provides a good "best guess" on things should scale and fold across viewport sizes.

However, sometimes you'll need to dictate exactly how wide elements should be on phone and tablet, to do this, use the [responsive column classes](../../documentation/grid/#responsive-columns). For example:

```html
<div class="column-6 tablet-column-3 phone-column-6">
```

### Block groups

Block groups don't reformat themselves on different screen sizes, so it's important to use the [responsive block group classes](../../documentation/grid/#responsive-block-groups) to specify how many blocks you'd like in each row at different screen sizes:

```html
<div class="block-group block-group-5-up tablet-block-group-3-up phone-block-group-1-up">
```

### Show Hide

The `show` and `hide` classes also have [responsive versions](../../documentation/grid/#show-and-hide) to customize what appears on screen for different devices:

```html
<div class="hide tablet-hide">
```

### Floats

Sometimes, on desktop you'll have room to float something to the right, but on smaller screen sizes aligning flush left with the rest of the content works better. To do this you can use the [responsive left and right classes](../../documentation/grid/#left-and-right):

```html
<div class="right phone-left">
```

## 2. For navigation, use Esri's global-nav

The [Esri global-nav](https://esri.github.io/global-nav/) provides the top navigation and footer for many Esri properties and products including Esri.com and ArcGIS Online. By using the global-nav your navigation will be mobile-friendly automatically, and no further work will be required.

To use the global-nav, add it as a dependency to your app and call the library with a dom node (where the navigation should be added) along with an object (the structure of your navigation). Multiple levels of navigation hierarchy or a flat list are both supported. For more information see the [global-nav documentation](https://esri.github.io/global-nav/).

## 3. Check performance

A big part of experiences feeling right on a phone is keeping the performance quick and snappy. Mobile users are often on spotty connections with significantly less processing power at their disposal, so any performance improvements will go a long way towards helping your app feel mobile-ready.

One of the best ways to find performance improvements is to using any number of auditing tools and follow the recommendations. Chrome has recently added a very nice set of tools for just this. Open the developer tools in Chrome, navigate to the "Audits" tab, and click "Run Audits". This will run several audits for accessibility, SEO, progressive web apps, and general best practices. While you may not need to build a fully-fledged PWA with service workers, following the general performance recommendations will help your users have a good experience on mobile

## 4. Use responsive images

A large part of a site's weight will often be from images. Even after compression, transferring desktop-sized images over mobile networks is not a great experience. To fix this, generate multiple sizes of your images and use them in conjunction with the `srcset` `sizes` attributes:

```html
<img srcset="image-name-320.jpg 320w,
             image-name-480.jpg 480w,
             image-name-800.jpg 800w"
     sizes="(max-width: 320px) 300px,
            (max-width: 480px) 450px,
            800px"
     src="image-name-800.jpg" alt="Description of the image">
```

`srcset` declares what images are available, while `sizes` specifies media queries and what size the image will be when that condition is true. So in the example above, we're telling the browser that on a 480 pixel screen we'll need an image that is 450 pixels wide, while on a smaller 320 pixel screen will only need an image that is 300 pixels wide. This information helps the browser select the correct source image for the screen size.

For more information on responsive images, check out the [MDN Guide](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) on the topic.


## 5. Ensure interactive targets are touch-friendly

Obviously touch devices are fundamentally different than desktops in the way users activate interactive elements. A mouse can be very specific, while fingers are larger and need more room around elements to easily tap. Ensuring that interactive elements are at least 44 pixels wide and tall will help people using phones to successfully get where they need to go.

Lastly, be careful of adding critical information on hover. A mobile user won't have a hover state, so they won't get to see this information.

