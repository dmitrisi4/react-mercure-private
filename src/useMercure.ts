import { useEffect, useState } from "react";

export function useMercure(url: string | URL, topic: string[]) {
  const [status, setStatus] = useState<number>(EventSource.CONNECTING);
  const [messages, setMessages] = useState<MessageEvent[]>([]);

  useEffect(() => {
    // Construct url and append all topics
    const mercureURL = new URL(url);
    topic.forEach((t) => {
      mercureURL.searchParams.append("topic", t);
    });

    const source = new EventSource(mercureURL);

    source.onopen = () => {
      setStatus(EventSource.OPEN);
    };

    source.onmessage = (e) => {
      setMessages((prevMessages) => [...prevMessages, e.data]);
    };

    return () => {
      source.close();
    };
  }, [topic, url]);

  return { messages, status };
}
