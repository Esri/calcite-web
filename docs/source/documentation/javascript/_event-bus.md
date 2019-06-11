The event bus is used to help interactive patterns communicate with each other and the rest of your application.

Along with a set of common bus events, each pattern has a set of channels that it emits on and listens for. These events can be emitted or listened for by the larger application.

You can trigger or react to events by using the `on` and `emit` methods on the bus:

```js
// do something when a modal opens
calcite.bus.on('modal:open', function (options) {
  console.log(options.id) // => "my_modal"
})

// open a modal (must pass data-modal name as "id")
calcite.bus.emit('modal:open', {id: "my_modal"})
```

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
| scrolling:at | The page is scrolling | `ScrollYOffset` |

### Pattern-Specific Event Channels

#### Accordions

| Event | Description | Emits | Function |
| --- | --- | --- | --- |
| accordion:bind | Binds Dom nodes on the page to their listeners | n/a | `bindToggles()` |
| accordion:toggle | Toggles an accordion section open and closed. | `{node: domNode}` | `handleToggle()` |

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

