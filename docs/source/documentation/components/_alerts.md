<div class="panel panel-gray leader-1 trailer-1">
<mark class='label label-blue'>Calcite Web 2.0 Update</mark>
<p class='leader-half trailer-0 font-size--1'>
The dom structure of alerts has changed. To migrate your alerts, follow the structure below for arranging your elements.
</p>
</div>

Alerts are used to inform users of state changes, errors, or successful actions. Alerts are only visible if they have the `is-active` class. Without as `is-active` class, the alert will be set to `display: none;`

Calcite Web does not manage class assignment, invocation, or dismissal logic for alerts - you will have to write your own JavaScript handlers for this.

An alert can consist of up to three children - `alert-icon`, `alert-content`, and `alert-close`. At a minimum, an alert must contain an `alert-content` child.  

#### Alert Icons
It's recommended to pair a status icon with your alert. Pairing an alert status with an icon helps reinforce the intent of the message, and ensures accessibility.

<div class="alert alert-red is-active">
<div class="alert-icon">
  {% icon 'check-circle', size=24 %}
</div>
<div class="alert-content">
  You don't have enough credits for that.
</div>
<button class="alert-close" aria-label="Close">
  {% icon 'x', size=24 %}
</button>
</div>
&nbsp;

#### Alert Actions
Sometimes it can be useful to provide a follow-up action or contextual link to a user within an alert. Place a `btn-link` element in a trailing position to your alert copy.

<div class="alert alert-yellow is-active">
<div class="alert-content">
  You don't have enough credits to perform that action.
  <a class="btn-link">Get more credits.</a>
</div>
<button class="alert-close" aria-label="Close">
  {% icon 'x', size=24 %}
</button>
</div>
&nbsp;

<div class="alert alert-green is-active">
<div class="alert-icon">
  {% icon 'check-circle', size=24 %}
</div>
<div class="alert-content">
   You successfully invited 4 members to the feature layer  <a class="btn-link">2019 Franchise Location Sales Map</a>
</div>
<button class="alert-close" aria-label="Close">
  {% icon 'x', size=24 %}
</button>
</div>
&nbsp;

#### Auto-dismissal
It's recommended to use an explicit close button. If you decide to auto-dismiss alerts, ensure the duration of the alert's visibility is long enough for a user to read it. Don't place any follow-up actions in an auto-dismissable alert.

<div class="alert alert-red is-active">
<div class="alert-icon">
  {% icon 'exclamation-mark-triangle', size=24 %}
</div>
<div class="alert-content">
  You don't have enough credits for that.
</div>
</div>
&nbsp;