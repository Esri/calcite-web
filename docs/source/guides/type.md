---
title: Typography
description: Guidelines for styling text on the web
layout: layouts/_guide:text
---

## Introduction

Most websites are primarily text, so good typography can make a huge difference in improving your user experience. Calcite Web aims to provide good default styles out of the box as well as some helpful tools to make setting type quicker and more convenient.

Read on for a quick overview of the current typeface as well as some general guidelines for designing with type.

### Avenir Next

<div class="column-24">
  <p class="font-size-8 column-12">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz</p>
  <p class="column-8 pre-1 font-size--1 leader-4">Avenir, created by Adrian Frutiger, is Esri's core brand typeface. In Calcite Web we use an updated version (Avenir Next) which has some improvements that make it much better suited to screen-based applications.</p>
</div>

#### Using Avenir from the CDN

Calcite Web provides Esri's fonts automatically as part of the framework through our CDN. However, if you are a developer outside Esri, you may not have a license for them. To find out if you can use these fonts, please check 2.2 section C of Esri's <a href="https://www.esri.com/en-us/legal/terms/full-master-agreement/mla-e204-e300-english">master agreement</a>.</p>

#### Self-hosting

If you are working on an Esri product that will be deployed behind a firewall, you can also host the files yourself. For more instructions on setting up locally-hosted fonts, see the [Calcite Fonts](https://github.com/ArcGIS/calcite-fonts) project (private).

---

After you're up and running and have all the typefaces loading in correctly, the below guidelines will help ensure type in your project is readable and well-considered.

## 1. Use type sizes and styles meaningfully

Type size can help users understand what is most important in your design. Try to ensure that the most essential and top-level information is in larger type, while ancillary or supplemental information remains smaller. While contrived, the below example demonstrates the idea:

<div class="column-16">
  <div class="column-8 first-column">
    <span class="label label-red">Incorrect:</span>
    <div class="panel panel-white leader-half trailer-quarter">
      <p>Most important</p>
      <p>Least important</p>
    </div>
  </div>
  <div class="column-8 trailer-1">
    <span class="label label-green">Correct:</span>
    <div class="panel panel-white leader-half trailer-quarter">
      <p class="font-size-3 trailer-half">Most important</p>
      <p class="font-size-0">Least important</p>
    </div>
  </div>
</div>

<div class="column-16">
  <hr>
  <div class="column-6 leader-5 tablet-leader-0">
    <h2>Type scale</h2>
    <p>Text sizes in Calcite Web are defined by a <a href="http://alistapart.com/article/more-meaningful-typography">modular scale</a>. Font sizes range from <code>-3</code> to <code>8</code>, <code>0</code> is the default. You can use the <a href="../../documentation/type/#text-size">helper classes</a> or the <code>font-size()</code> <a href="../sass/#font-size">mixin</a> to leverage the typographic scale.</p>
    <p>As a general rule try not to use type smaller than <code>-1</code> for long-form text as it's hard to read small text for long periods of time.</p>
  </div>

  <div class="column-10">
    <p class="text-right trailer-quarter font-size--3">font-size--3</p>
    <p class="text-right trailer-quarter font-size--2">font-size--2</p>
    <p class="text-right trailer-quarter font-size--1">font-size--1</p>
    <p class="text-right trailer-quarter font-size-0">font-size-0</p>
    <p class="text-right trailer-quarter font-size-1">font-size-1</p>
    <p class="text-right trailer-quarter font-size-2">font-size-2</p>
    <p class="text-right trailer-quarter font-size-3">font-size-3</p>
    <p class="text-right trailer-quarter font-size-4">font-size-4</p>
    <p class="text-right trailer-quarter font-size-5">font-size-5</p>
    <p class="text-right trailer-quarter font-size-6">font-size-6</p>
    <p class="text-right trailer-quarter font-size-7">font-size-7</p>
    <p class="text-right trailer-quarter font-size-8">font-size-8</p>
  </div>

  <hr class="column-16">
</div>

### Weight and style

In addition to text size, the weight of the text (how bold or light it appears) and style (italic vs. roman) are additional tools that can help to build meaningful hierarchy into your designs. Weight and style can be used via [helper classes](../../documentation/type/#avenir) (below), or through the [font-family mixins](../../documentation/sass/#font-families). Use bold to help users identify points of emphasis and selected states.

<table class="table table-plain trailer-0">
  <thead>
    <th>Font families</th>
  </thead>
  <tbody>
    <tr>
      <td><p class="font-size-2 trailer-0 avenir-light">avenir-light</p></td>
      <td><p class="font-size-2 trailer-0 avenir-regular">avenir-regular</p></td>
      <td><p class="font-size-2 trailer-0 avenir-italic">avenir-italic</p></td>
      <td><p class="font-size-2 trailer-0 avenir-bold">avenir-bold</p></td>
    </tr>
  </tbody>
</table>

<hr class="column-16 trailer-3">

## 2. Use a readable line length

When displaying large passages of text, it's important to ensure that the line length (how many characters display before wrapping) not be too long or too short. Long line lengths make blocks of text very difficult to read. Try to keep line-length between 50-90 characters long if possible. If you're using the default 24-column grid, consider 17 columns the largest width for a readable line length.

<div class="column-24 first-column">
  <div class="column-24">
    <span class="label label-red">Incorrect:</span>
    <div class="panel panel-white leader-half trailer-quarter">
      <p class="trailer-0">This paragraph is inside a <code>column-24</code>. This text is <code>font-size-0</code>. At the largest screen size, when the <code>grid-container</code> is maximized, a column-24 is over 1400 pixels wide. Because of this, it can fit over 180 characters in a line. You may notice while reading this that it feels more difficult to find the next line and stay focused on the content.</p>
    </div>
  </div>
</div>
<div class="column-17 first-column trailer-3">
  <div class="column-3 trailer-1 leader-1">
    <span class="label label-red">Incorrect:</span>
    <div class="panel panel-white leader-half trailer-quarter">
      <p class="trailer-0">This text is in a <code>column-3</code>. At only 15-25 characters, it is too short.</p>
    </div>
  </div>
  <div class="column-9 trailer-1 leader-1">
    <span class="label label-green">Correct:</span>
    <div class="panel panel-white leader-half trailer-quarter">
      <p class="trailer-0">This text is in a <code>column-9</code>. At the max size it will fit about 55-70 characters, placing it well within the correct range for readable line length.</p>
    </div>
  </div>
</div>

## 3. Use vertical space to aid comprehension

Line height (or leading) is the vertical space between lines of text. Calcite Web by default provides a generous line height. Most of the time you won't have to mess with line-height. If you do need to alter line-height, the `leading($n)` [mixin](../../documentation/sass/#leading) allows you to change line-height while still maintaining Calcite Web's vertical rhythm.

Another way to help users quickly parse content is to add vertical space between distinct controls and elements. Using whitespace enables you to communicate to the user what elements should be grouped and related. In Calcite Web you can use the [leader and trailer modifier classes](../../documentation/grid/#leader-and-trailer) to quickly add space above and below an element.

The below example helps illustrate these concepts:

<div class="column-16 first-column trailer-2">
  <div class="column-8">
    <span class="label label-red">Incorrect:</span>
    <div class="panel panel-white leader-half trailer-quarter">
      <h4 class="trailer-1">First Thing</h4>
      <p style="line-height: .875;" class="trailer-0">This is the first element, which should be grouped with its header. Notice that when the vertical space is not intentional, it's hard to know which header describes which paragraph.</p>
      <h4 class="trailer-1">Second Thing</h4>
      <p style="line-height: .875;">This is the second element, and it is described by this paragraph.</p>
    </div>
  </div>
  <div class="column-8 trailer-1">
    <span class="label label-green">Correct:</span>
    <div class="panel panel-white leader-half trailer-quarter">
      <h4 class="trailer-quarter">First Thing</h4>
      <p class="trailer-1">This is the first element, which should be grouped with its header. Notice that we are reducing the space between the header and the paragraph and increasing space between the two paragraphs.</p>
      <h4 class="trailer-quarter">Second Thing</h4>
      <p>By using the standard line-height, we also made it much easier to read. With these examples combined you can see how vertical space can have a substantial impact on a user's experience.</p>
    </div>
  </div>
</div>


## 4. Avoid centering long form text

Lastly, if you have more than one or two sentences, avoid centering the text. Centered text is much harder to read and comprehend due to the ragged-left edge.

<div class="column-16 first-column">
  <div class="column-8">
    <span class="label label-red">Incorrect:</span>
    <div class="panel panel-white leader-half trailer-quarter">
      <p class="trailer-0 text-center font-size--1">This text is centered inside of its container. Because the beginning of each line takes place in a different horizontal location, longer passages will take users much longer to read.</p>
    </div>
  </div>
  <div class="column-8 trailer-1">
    <span class="label label-green">Correct:</span>
    <div class="panel panel-white leader-half trailer-quarter">
      <p class="font-size--1 trailer-0">Left alignment is much easier for users to read. In addition to practical concerns, ragged-right also fits in better stylistically as it subtly reinforces the more modern aesthetic of Avenir.</p>
    </div>
  </div>
</div>

It's also a good idea to avoid mixing centering and left-alignment in the same element (example: a header that's centered with left-aligned body copy).
