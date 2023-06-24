const url = new URL("https://localhost/.well-known/mercure");
url.searchParams.append("topic", "foo");

const eventSource = new EventSource(url);
eventSource.onmessage = (e) => console.log(e); // do something with the payload

function App() {
  return (
    <div>
      <h1>React Mercure demo:</h1>
    </div>
  );
}

export default App;
