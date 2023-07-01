import { useEffect } from "react";

export function useEventSource(url: string | URL, eventHandler: any) {
  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (e) => eventHandler(e.data);

    // Clean up function
    return () => {
      // Close the EventSource connection
      eventSource.close();
    };
  }, [url, eventHandler]);
}
