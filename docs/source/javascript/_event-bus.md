The event bus is used to help interactive patterns communicate with each other and the rest of your application.

Each pattern has a set of bus channels that it emits on and listens for. A set of common bus events are documented below:

| Event | Description | Emits |
| --- | --- | --- |
| keyboard:return | The `return` key was pressed. | n/a |
| keyboard:escape | The `escape` key was pressed. | n/a |
| scrolling | The page is scrolling | ScrollYOffset |