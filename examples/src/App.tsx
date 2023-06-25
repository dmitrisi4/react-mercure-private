import { useMercure } from "../../src/useMercure";
const url = new URL("https://localhost/.well-known/mercure");
url.searchParams.append("topic", "foo");

function App() {
  const { messages } = useMercure(url);

  return (
    <div>
      <h1>React Mercure demo:</h1>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>Message pinged!</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
