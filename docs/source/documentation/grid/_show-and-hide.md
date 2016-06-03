These convenience classes are meant to help with quick responsive layout. Below are the classes and what breakpoints they are visible on:

| Helper Class | Visible on Phone | Visible on Tablet | Visible on Desktop |
| ------------ | ---------------- | ----------------- | ------------------ |
| phone-hide   | no               | yes               | yes                |
| tablet-hide  | no               | no                | yes                |
| phone-show   | yes              | no                | no                 |
| tablet-show  | yes              | yes               | no                 |
| tablet-only  | no               | yes               | no                 |

#### Show Helpers

Essentially, the show classes will show that breakpoint and the breakpoint below it. So if you'd like something to be visible only on a phone, you would use `phone-show`. If you used `tablet-show`, the element would be visible on tablet and phone.

#### Hide Helpers

Hide helpers are very similar to show helpers. A responsive hide class will hide that breakpoint and the breakpoint below it. So if you wanted something to be visible on only desktop, you could use `tablet-hide`, hiding the element on tablet and phone. Or if you wanted something to be hidden only on a phone, `phone-hide` would hide it on the phone only.

#### Visual Hiding Helpers

Sometimes it is desireable for accessibility reasons to hide something visually but leave it accessable to screenreaders. You can use the `visually-hidden` class to achive this. If you want your hidden element to remain focusable my the keyboard add `visually-hidden-focusable` in addition to `visually-hidden`.
