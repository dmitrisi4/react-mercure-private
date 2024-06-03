import { useEffect, useState } from "react";
import { EventSourcePolyfill } from 'event-source-polyfill';

export function useEventSource<T = unknown>(
  url: string,
  eventHandler: (data: T) => void,
  token: string
) {
  const [isConnected, setIsConnected] = useState(false);

  const eventSourceInitDict = {
    headers: { 'Authorization': `Bearer ${token}` }
  };

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(url, eventSourceInitDict);
    setIsConnected(true);

    const customHandler = (e: MessageEvent<T>) => {
      eventHandler(e.data);
    };

    eventSource.onmessage = customHandler as any;

    // Clean up function
    return () => {
      // Close the EventSource connection
      eventSource.close();
      setIsConnected(false);
    };
  }, [url, eventHandler]);

  return { isConnected };
}
