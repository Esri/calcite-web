## Columns

A column is a constant unit of measure. The width of a column is dynamic, but always between a fixed range. Columns will never get too large or or too small. As the viewport get smaller, and the columns near the bottom of their range, the Calcite Grid System will simply put less columns on the page. By default, large screens hold 24 columns, medium tablet-sized screens hold 12, and phone-sized screens hold 6. The grid will fold columns at these breakpoints. That means an element that is 3 columns wide will always be 3 columns wide, no matter how big or small the screen.

On large screens, 3 columns out of 24 is proportionally a small peice of screen real estate. On Phones, VW Grid will still leave the element at 3 columns wide -- only now it's proportionally more real estate, as 3/6 columns is more significant than 3/24.

```html
<div class="container grid-example leader-1">
     <div class="column-1">1</div>
     <div class="column-23">.column-23</div>
     <div class="column-2">2</div>
     <div class="column-22">.column-22</div>
     <div class="column-3">3</div>
     <div class="column-21">.column-21</div>
     <div class="column-4">4</div>
     <div class="column-20">.column-20</div>
     <div class="column-5">.column-5</div>
     <div class="column-19">.column-19</div>
     <div class="column-6">.column-6</div>
     <div class="column-18">.column-18</div>
     <div class="column-7">.column-7</div>
     <div class="column-17">.column-17</div>
     <div class="column-8">.column-8</div>
     <div class="column-16">.column-16</div>
     <div class="column-9">.column-9</div>
     <div class="column-15">.column-15</div>
     <div class="column-10">.column-10</div>
     <div class="column-14">.column-14</div>
     <div class="column-11">.column-11</div>
     <div class="column-13">.column-13</div>
     <div class="column-12">.column-12</div>
     <div class="column-12">.column-12</div>
 </div>
```

</div>
</div>

<div class="container grid-example leader-1">
	<div class="column-1"><span>1</span></div>
	<div class="column-23"><span>.column-23</span></div>
	<div class="column-2"><span>2</span></div>
	<div class="column-22"><span>.column-22</span></div>
	<div class="column-3"><span>3</span></div>
	<div class="column-21"><span>.column-21</span></div>
	<div class="column-4"><span>4</span></div>
	<div class="column-20"><span>.column-20</span></div>
	<div class="column-5"><span>.column-5</span></div>
	<div class="column-19"><span>.column-19</span></div>
	<div class="column-6"><span>.column-6</span></div>
	<div class="column-18"><span>.column-18</span></div>
	<div class="column-7"><span>.column-7</span></div>
	<div class="column-17"><span>.column-17</span></div>
	<div class="column-8"><span>.column-8</span></div>
	<div class="column-16"><span>.column-16</span></div>
	<div class="column-9"><span>.column-9</span></div>
	<div class="column-15"><span>.column-15</span></div>
	<div class="column-10"><span>.column-10</span></div>
	<div class="column-14"><span>.column-14</span></div>
	<div class="column-11"><span>.column-11</span></div>
	<div class="column-13"><span>.column-13</span></div>
	<div class="column-12"><span>.column-12</span></div>
	<div class="column-12"><span>.column-12</span></div>
</div>

<div class="container">
	<div class="column-15 pre-7">
