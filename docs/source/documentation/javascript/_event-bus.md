The event bus is used to help interactive patterns communicate with each other and the rest of your application.

Along with a set of common bus events, each pattern has a set of channels that it emits on and listens for. These events can be emitted or listened for by the larger application.

You can trigger or react to events by using the `on` and `emit` methods on the bus:

```js
// assuming calcite-web.js is available as calcite

### Common Event Channels

| Event | Description | Emits |
| --- | --- | --- |
| keyboard:return | The `return` key was pressed | n/a |
| keyboard:escape | The `escape` key was pressed | n/a |
| keyboard:space | The `space` key was pressed      | n/a |
| keyboard:arrow:up | The `↑` key was pressed   | n/a |
| keyboard:arrow:down | The `↓` key was pressed | n/a |
| keyboard:arrow:left | The `←` key was pressed | n/a |
| keyboard:arrow:right | The `→` key was pressed | n/a |
| scrolling:at | The page is scrolling | ScrollYOffset |

### Pattern-Specific Event Channels

#### Accordions

| Event | Description | Emits | Function |
| --- | --- | --- | --- |
| accordion:bind | Binds Dom nodes on the page to their listeners | n/a | `bindToggles()` |
| accordion:toggle | Toggles an accordion section open and closed. | `{node: domNode}` | `handleToggle()` |

#### Dropdown

| Event | Description | Emits | Function |
| --- | --- | --- | --- |
| dropdown:bind | Binds dom to event listeners | n/a | `bindDropdowns()` |
| dropdown:toggle | Toggles a dropdown open and closed | `{node: domNode}` | `toggleDropdown()` |
| dropdown:close | Closes all the dropdowns | n/a | `closeAllDropdowns()` |
| keyboard:escape | Closes all the dropdowns when the escape key is pressed. | n/a | `closeAllDropdowns()` |


#### Filter Dropdown

Many of the filter dropdown channels emit and listen for the following options object:

```js
{
  parent: domNode,
  id: filterDropdownId,
  item: domNode
}
```

| Event | Description | Emits | Function |
| --- | --- | --- | --- |
| filterDropdown:bind | Binds the dom to event listeners | n/a | `bindFilterDropdowns()` |
| filterDropdown:select | An item in the dropdown list has been selected. | Options Object | `toggleItem()`, `emitActive()` |
| filterDropdown:select:remove | Removes a specific selection from the list of active items. | Options Object | `removeItem()` |
| filterDropdown:active | Emits all the currently selected items from the component. | Options Object. Replaces `item` with `active` Array of items. | `drawActive()` |
| filterDropdown:active:clear | Clear all active items from the dropdown | Options Object | `clearActive()` |
| filterDropdown:toggle | Toggle a dropdown open and closed | Options Object | `toggleDropdown()` |
| filterDropdown:open | Open a specific dropdown | Options Object | `openList()` |
| filterDropdown:close | Closes all dropdowns | n/a | `closeList()` |
| keyboard:escape | Closes all dropdowns | n/a | `closeList()` |

#### Modal

| Event | Description | Emits | Function |
| --- | --- | --- | --- |
| modal:bind | Binds dom to event listeners | n/a | `bindModals()` |
| modal:open | Opens a modal specified by data-modal attribute | `{id: modalid}` |  `openModal()` |
| modal:close | Closes open modal | n/a | `closeModal()` |
| keyboard:escape | Closes all modals | n/a | `closeModal()` |

#### Sticky

| Event | Description | Emits | Function |
| --- | --- | --- | --- |
| sticky:stick | Dom Node to stick in place | Dom Node | `stickItem()` |
| sticky:unstick | Dom Node to unstick and return to normal | Dom Node | `unstickItem()` |
| scrolling:at | Current offset y position on scroll | `OffsetY` Number | `scrollHandler()` |

#### Tabs

Tab events emit and listen for an Options Object.

```js
{
  id: tabId // data-tab attribute
  active: domNode
}
```

| Event | Description | Emits | Function |
| --- | --- | --- | --- |
| tabs:bind | Binds dom to event listeners | n/a | `bindTabs()` |
| tabs:active | A tab to set as active | Options Object | `setTab()` |

