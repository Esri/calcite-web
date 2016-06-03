Modals are meant to "take over" the screen and focus users attention on a dialog which presents the user with an opportunity to add, modify or create content. A modal should always be centered both vertically and horizontally within the browser window. When a modal is opened, the interface darkens and disables all other user interface elements in order to force a user to take an action required by their workflow. Two modals can't be open at once.

To create a link or button that opens a modal, you must add a `js-modal-toggle` class to the element, along with a `data-modal` attribute specifying the name of the modal that should open. The modal should also get a `data-modal` attribute with the same name.

Elements with the `js-modal-toggle` that are inside a modal don't need the `data-modal` attribute as they will just close the modal they are in.
