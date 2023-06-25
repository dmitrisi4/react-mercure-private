import { useEffect, useState } from "react";

export function useMercure(url: string | URL) {
  const [messages, setMessages] = useState<MessageEvent[]>([]);

  useEffect(() => {
    const source = new EventSource(url);
    source.onmessage = (e) => {
      console.log(JSON.parse(e.data));
      setMessages((prevMessages) => [...prevMessages, e]);
    };

    return () => {
      source.close();
    };
  }, [url]);

  return { messages };
}
