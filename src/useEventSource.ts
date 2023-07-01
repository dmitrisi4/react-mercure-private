import { useEffect, useState } from "react";

export function useEventSource<T = unknown>(
  url: string | URL,
  eventHandler: (data: T) => void
) {
  const [status, setStatus] = useState<0 | 1 | 2>(EventSource.CONNECTING);

  useEffect(() => {
    const eventSource = new EventSource(url);
    setStatus(EventSource.OPEN);

    eventSource.onmessage = (e: MessageEvent<T>) => eventHandler(e.data);

    // Clean up function
    return () => {
      // Close the EventSource connection
      eventSource.close();
      setStatus(EventSource.CLOSED);
    };
  }, [url, eventHandler]);

  return { status };
}
