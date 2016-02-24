The event bus is used to help interactive patterns communicate with each other and the rest of your application.

Along with a set of common bus events, each pattern has a set of channels that it emits on and listens for. These events can be emitted or listened for by the larger application.

### Common Event Channels

| Event | Description | Emits |
| --- | --- | --- |
| keyboard:return | The `return` key was pressed. | n/a |
| keyboard:escape | The `escape` key was pressed. | n/a |
| scrolling | The page is scrolling | ScrollYOffset |

### Pattern-Specific Event Channels

#### Accordions

| Event | Description | Emits | Function |
| --- | --- | --- | --- |
| accordion:bind | Binds Dom nodes on the page to their listeners | n/a | `bindToggles()` |
| accordion:toggle | Toggles an accordion section open and closed. | Dom Node | `handleToggle()` |

#### Drawers

| Event | Description | Emits | Function |
| --- | --- | --- | --- |

#### Dropdown

| Event | Description | Emits | Function |
| --- | --- | --- | --- |

#### Filter Dropdown

| Event | Description | Emits | Function |
| --- | --- | --- | --- |

#### Modal

| Event | Description | Emits | Function |
| --- | --- | --- | --- |

#### Sticky

| Event | Description | Emits | Function |
| --- | --- | --- | --- |

#### Tabs

| Event | Description | Emits | Function |
| --- | --- | --- | --- |


