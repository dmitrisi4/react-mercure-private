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
  const { data, status } = useMercure(MERCURE_HUB_URL, [
    "https://example.com/my-private-topic"
  ]);

  return (
    <div>
      <h2>Connection status: {status}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
