# react-embed

[CodeSandbox](https://codesandbox.io/s/484v6jk309)

```ts
import * as React from 'react'
import WidgetBot, { API } from '@widgetbot/react-embed'

class App extends React.Component {
  api: API

  onAPI(api: API) {
    this.api = api
    api.on('signIn', user => {
      console.log(`Signed in as ${user.name}`, user)
    })
  }

  handleClick() {
    this.api.emit('sendMessage', `Hello world! from \`@widgetbot/react-embed\``)
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>
          {`Send "Hello world"`}
        </button>
        <WidgetBot
          server="299881420891881473"
          channel="355719584830980096"
          onAPI={this.onAPI.bind(this)}
        />
      </div>
    )
  }
}

export default App
```

## Telegram

`shard` is **required** — point it at your deployed Telegram widget host.

```tsx
import * as React from 'react'
import { TelegramWidget } from '@widgetbot/react-embed'

export default function App() {
  return (
    <TelegramWidget
      chat="-1003784217881"
      shard="https://your-telegram-widget.example.com"
      width={400}
      height={600}
      onAPI={(api) => {
        api.on('ready', () => console.log('ready'))
        api.on('signIn', (user) => console.log('signed in', user))
      }}
    />
  )
}
```

Props:

- `shard` (required) — URL of the deployed Telegram widget host
- `chat` (required) — Telegram chat ID
- `topic` (optional) — Topic ID for supergroup forums
- `token` (optional) — Platform auth token
- `width`, `height`, `style`, `className` — Standard styling
- `onAPI` — Receives the `Client` instance for parent ↔ iframe communication

