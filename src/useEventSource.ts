import { useEffect, useState } from "react";

export function useEventSource<T = unknown>(
  url: string | URL,
  eventHandler: (data: T) => void
) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource(url);
    setIsConnected(true);

    eventSource.onmessage = (e: MessageEvent<T>) => eventHandler(e.data);

    // Clean up function
    return () => {
      // Close the EventSource connection
      eventSource.close();
      setIsConnected(false);
    };
  }, [url, eventHandler]);

  return { isConnected };
}
