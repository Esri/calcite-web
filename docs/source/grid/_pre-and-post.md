## Pre and Post

Pre and Post classes are used to move your columns laterally across the grid by defining how many columns they should be from their neighbors on either side.

Pre and Post classes do not responsively fold. This prevents a `pre-5` from pushing content off the edge of the screen on phone sizes. Responsive `tablet-` and `phone-` classes are exposed for defining pre and post behavior on breakpoints.

Pre and post helpers are available from `.pre-1` and `.post-1` to `.pre-24` and `.post-24`.

<!-- Closes out extant column and container divs -->
</div>
</div>

<div class="container grid-example leader-1">
<div class="column-1"><span>col</span></div>
<div class="column-2 pre-21 tablet-pre-9 phone-pre-3"><span>.pre-21</span></div>
</div>
<div class="container grid-example leader-1">
<div class="column-2 post-21 tablet-post-9 phone-post-3"><span>.post-21</span></div>
<div class="column-1"><span>col</span></div>
</div>

<!-- Reopens container and column for the continuation of the doc. -->
<div class="container">
	<div class="column-15 pre-7">