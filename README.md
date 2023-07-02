# React Mercure

React hook that make working with [Mercure](https://mercure.rocks/) easy

## Installation

```bash
  npm install react-mercure
```

## Quickstart

```jsx
import { useMercure} from 'react-mercure';

const url = "http://example.com/events";

function Example() {
  const { data, isConnected } = useMercure<string>(url, ['topic1', 'topic2']);

  return (
    <div>
      <span role="status">
        {isConnected ? "Connected to Mercure" : "Connecting..."}
      </span>
      <span role="alert" aria-live="assertive">
        {data ? `Data received: ${data}` : "No data"}
      </span>
    </div>
  );
}
```


## Author

- [@Fabious](https://www.github.com/Fabious)

