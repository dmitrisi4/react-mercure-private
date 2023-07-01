import { useState } from "react";
import { useMercure } from "../../src/useMercure";

const MERCURE_HUB_URL = "https://localhost/.well-known/mercure";

function App() {
  const [mount, setMount] = useState(false);

  return (
    <div>
      <h1>React Mercure demo:</h1>
      <button onClick={() => setMount((s) => !s)}>
        Mount component with Mercure
      </button>
      {mount && <MercureComponent />}
    </div>
  );
}

function MercureComponent() {
  const { messages, status } = useMercure(MERCURE_HUB_URL, ["foo"]);

  return (
    <div>
      <h2>Connection status: {status}</h2>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>
            Message received!
            <pre>{JSON.stringify(msg, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
